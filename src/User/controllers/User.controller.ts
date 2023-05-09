import { Request, Response } from 'express';
import { CRUDController } from '../../controllers/Api.contoller';
// Entities
import { User, UserInfo, UserType } from '../entities';
// Helper
import authHelper from '../helpers/auth.helper';
import { findAndPaginate } from '../../helpers/pagination.helper';
import { validate, z } from '../../services/zod/validation';

export class UserController extends CRUDController {
  index = async (req: Request, res: Response) => {
    const user = await findAndPaginate(
      User, 
      { ...req.query },
      { findOptions: { populate: ['userType', 'userInfo'] } }
    );
    await this.json(res, user);
  }

  show = async (req: Request<{ id: number }>, res: Response) => {
    const { id } = req.params;
    const user = await (await this.orm())
      .findOne(User, { id }, { populate: ['userType', 'userInfo'] });
      
    if (!user) {
      await this.error(res, 'User not found', 404);
      return;
    }
    await this.json(res, user);
  }

  create = async (req: Request, res: Response) => {
    const validations = z.object({
      email: z.string().email(),
      password: z.string(),
      verify_password: z.string(),
      userType: z.string(),
      userInfo: z.object({
        firstName: z.string(),
        lastName: z.string(),
        middleName: z.string().optional(),
        birthday: z.string().optional(),
      })
    }) 
    // Add validation for matching password
    .superRefine((data, ctx) => {
      if (data.verify_password !== data.password)
        ctx.addIssue({code: "custom", message: "The passwords did not match"});
    });

    const { data, success, errors } = validate(req.body, validations);
    
    if (!success)
      return this.error(res, 'The data submitted was incorrect', errors);

    const orm = await this.orm();
    
    // User Type 
    const userType = await orm.findOne(
      UserType, 
      { name: data.userType }
    );

    if (!userType) {
      await this.error(res, 'User type not found', 402);
      return;
    }

    //User Info
    const { 
      firstName, lastName, middleName, birthday:brithdayRaw 
    } = data.userInfo;
    const birthday = brithdayRaw ? new Date(brithdayRaw) : undefined
    const userInfo = new UserInfo({ firstName, lastName, middleName, birthday }); 

    
    // User 
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
      userType, 
      userInfo
    })
    
    await orm.persistAndFlush(user);
    await this.success(res, 'User created successfully' + user.id, user);
  }

  // async update(req: Request, res: Response): Promise<void> {
  //   const { id } = req.params;
  //   const { name, email, password } = req.body;
  //   const user = await User.findById(id);
  //   if (!user) {
  //     await this.error(res, 'User not found', 404);
  //     return;
  //   }
  //   user.name = name;
  //   user.email = email;
  //   user.password = password;
  //   await user.save();
  //   await this.success(res, 'User updated successfully');
  // }

  // async delete(req: Request, res: Response): Promise<void> {
  //   const { id } = req.params;
  //   const user = await User.findById(id);
  //   if (!user) {
  //     await this.error(res, 'User not found', 404);
  //     return;
  //   }
  //   await user.remove();
  //   await this.success(res, 'User deleted successfully');
  // }

  sendID = (_: Request, res: Response) => {
    res.send('ID is 3')
  }
}