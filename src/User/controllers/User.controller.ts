import { Request, Response } from 'express';
import { APIController } from '../../controllers/Api.contoller';
import { User } from '../entities/User.entitities';
import { UserType } from '../entities/UserType.entities';
import { findAndPaginate } from '../../helpers/pagination.helper';

export class UserController extends APIController {
  index = async (req: Request, res: Response) => {
    const user = await findAndPaginate(
      User, 
      { ...req.query },
      { findOptions: { populate: ['userType'] } }
    );
    await this.json(res, user);
  }

  show = async (req: Request, res: Response) => {
    const { id } = req.params;
    const user = await (await this.orm())
      .findOne(User, { id: +id }, { populate: ['userType'] });
      
    if (!user) {
      await this.error(res, 'User not found', 404);
      return;
    }
    await this.json(res, user);
  }

  create = async (req: Request, res: Response) => {
    const { email, password, user_type = 1 } = req.body;
    const orm = await this.orm();
    const userType = await orm.findOne(
      UserType, 
      { id: +user_type }
    );
    if (!userType) {
      await this.error(res, 'User type not found', 402);
      return;
    }
    const user = new User(email, password, userType);
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