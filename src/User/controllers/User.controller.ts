import { Request, Response } from 'express';
import { CRUDController } from '../../controllers/Api.contoller';
import { User } from '../entities/User.entity';
import { UserType } from '../entities/UserType.entity';
import { findAndPaginate } from '../../helpers/pagination.helper';
import authHelper from '../helpers/auth.helper';

export class UserController extends CRUDController {
  index = async (req: Request, res: Response) => {
    const user = await findAndPaginate(
      User, 
      { ...req.query },
      { findOptions: { populate: ['userType'] } }
    );
    await this.json(res, user);
  }

  show = async (req: Request<{ id: number }>, res: Response) => {
    const { id } = req.params;
    const user = await (await this.orm())
      .findOne(User, { id }, { populate: ['userType'] });
      
    if (!user) {
      await this.error(res, 'User not found', 404);
      return;
    }
    await this.json(res, user);
  }

  create = async (req: Request, res: Response) => {
    const { email, password,  user_type = 1 } = req.body;
    const orm = await this.orm();
    const userType = await orm.findOne(
      UserType, 
      { id: +user_type }
    );
    if (!userType) {
      await this.error(res, 'User type not found', 402);
      return;
    }
    // User Authentication
    
    const hashedPass = await authHelper.encrypt(password)

    if (!hashedPass?.hashedPassword || !hashedPass?.salt) {
      return this.error(
        res, 
        'There was a problem saving your data. Please try again'
      );
    }

    const user = new User({
      email: email, 
      password: hashedPass?.hashedPassword, 
      password_salt: hashedPass?.salt,
      userType, 
    })
    
    await orm.insert(User, user);
    await this.success(res, 'User created successfully' + user.id);
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