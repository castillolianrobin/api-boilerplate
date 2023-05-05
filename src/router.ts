import { Application } from 'express';
import userRoutes from './User/user.routes';
import { UserController } from './User/controllers/User.controller';

export default function router(app: Application): void {
  app.use('/user', userRoutes());
  
  app.get('/send-id', new UserController().sendID)
}
