import { Request, Response } from "express";
import { DriverException  } from '@mikro-orm/core';
// Base Controller
import { APIController } from "../../controllers/Api.contoller";
// Entities
import { User, UserInfo, UserType } from "../entities";
// Services
import { validate, z } from "../../services/zod/validation";
import { login, logout, passport } from "../../services/passport/authentication";
// Helper
import authHelper from "../helpers/auth.helper"; 
import { STATUS } from "../../constants";
import { mailer, templates } from "../../services/nodemailer";

export class AuthController extends APIController {
  login = async (req: Request, res: Response) => {
    // Data Validation
    const { errors, data, success } = validate(req.body, z.object({
      email: z.string().email(),
      password: z.string()
    }));
    
    if (!success)
      return this.error(res, 'Login Failed', errors);
    
    // Login Validation
    login(req, res, (err, user, info)=>{
      if (err || !user)
        return this.error(res, info.message, data.email);
      else
        return this.success(res, info.message, user)
    });
  }

  logout = async (req: Request, res: Response) => {
    // Data Validation
    
    // Login Validation
    logout(req, res, async (err, user)=>{
      if (err || !user)
        return this.error(res, STATUS.SERVER_ERROR.MESSAGE, {}, STATUS.SERVER_ERROR.CODE);
      
      const orm = await this.orm();
      user.token = '';
      user.tokenExpiration = undefined;
      try {
        await orm.persistAndFlush(user)
        return this.success(res, 'Logged out successfully', user)
      } catch (e) {
        return this.error(res, STATUS.SERVER_ERROR.MESSAGE, {}, STATUS.SERVER_ERROR.CODE);
      }
    });
  } 

  register = async (req: Request, res: Response) => {
    // Validation
    const { data, errors, success } = validate(req.body, z.object({
      email: z.string().email(),
      password: z.string().min(6).max(50),
      userInfo: z.object({
        firstName: z.string(),
        lastName: z.string(),
        middleName: z.string().optional(),
        birthday: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
      }),
    }));

    if (!success)
      return this.error(res, 'There was a problem with your request', errors)
    
    const orm = await this.orm();
    // User Type
    let userType = await orm.findOne(UserType, { name: 'member' });

    if (!userType) {
      userType = new UserType('member');
      await orm.persistAndFlush(userType);
    } 
    
    // User Info
    const userInfo = new UserInfo({ 
      firstName: data.userInfo.firstName, 
      middleName: data.userInfo.middleName, 
      lastName: data.userInfo.lastName, 
    })
    
    // Password Hashing
    const hashedPass = await authHelper.encrypt(data.password)
    if (!hashedPass?.hashedPassword || !hashedPass?.salt) {
      const message = 'There was a problem saving your data. Please try again'
      return this.error(res, message);
    }
    // User
    const user = new User({
      email: data.email, 
      password: hashedPass?.hashedPassword, 
      password_salt: hashedPass?.salt, 
      userInfo, 
      userType,
    })

    // create user 
    try {
      await orm.persistAndFlush(user);
      var mailOptions = {
        from: 'admin@gmail.com',
        to: user.email,
        subject: 'Email Verification',
        html: templates.emailVerification(user),
      };


      // Send verifiication email
      mailer.sendMail(mailOptions, async (error, info) => {
        if (error) {
          orm.remove(user);
          await orm.flush();
          this.error(res, 'Unable to send verification email. Please try again', error);
        } else {
          this.success(res, 'Successfully registered', user);
          console.log('Email sent: ' + info.response);
        }
      });  
    } catch(e) {
      const error = e as DriverException;
      let message = 'A problem occured';
      let data: any = e;
      // IF already exists
      if (error.code && error?.code === 'ER_DUP_ENTRY') {
        data = null;
        message = 'User already exists'; 
      }
      this.error(res, message, data);
    }
  }
}