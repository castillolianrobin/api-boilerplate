import { Request, Response } from "express";
import { DriverException  } from '@mikro-orm/core';
// Base Controller
import { APIController } from "../../controllers/Api.contoller";
// Helper
import authHelper from "../helpers/auth.helper"; 
// Entities
import { User } from "../entities/User.entity";
import { UserInfo } from "../entities/UserInfo.entity";
import { UserType } from "../entities/UserType.entity";
// Services
import { validate, z } from "../../services/zod/validation";
import { generateJwtToken } from "../../services/passport/localStrategy";
import { passport } from "../../services/passport/localStrategy";



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
    passport.authenticate('local', (err: any, user: User, info: { message: string })=>{
      if (err || !user)
        return this.error(res, info.message, data.email);
      else
        return this.success(res, info.message, { user })
    })(req, res);
  }

  register = async (req: Request, res: Response) => {
    // Validation
    const { data, errors, success } = validate(req.body, z.object({
      email: z.string().email(),
      password: z.string().min(6).max(50),
      firstName: z.string(),
      lastName: z.string(),
      middleName: z.string().optional(),
      birthday: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
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
    const userInfo = new UserInfo(
      data.firstName,
      data.lastName,
      data.middleName,
      // new Date(data.birthday),
    )
    // User Authentication
    const hashedPass = await authHelper.encrypt(data.password)

    if (!hashedPass?.hashedPassword || !hashedPass?.salt) {
      return this.error(
        res, 
        'There was a problem saving your data. Please try again'
      );
    }
    
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
      this.success(res, 'Successfully registered', user);
    } catch(e) {
      const error = e as DriverException;
      let message = 'A problem occured';
      let data: any = e;
      if (error.code && error?.code === 'ER_DUP_ENTRY') {
        data = null;
        message = 'User already exists'; 
      }
      this.error(res, message, data);
    }
  }
}

/** __TYPE DEFINITION__ */

interface UserRegistration extends User, UserInfo {
 userTypeId: number; 
}