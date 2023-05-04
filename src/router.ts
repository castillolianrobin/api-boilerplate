import { Application } from 'express';
import userRoutes from './User/user.routes';

export default function router(app: Application): void {
  app.use('/user', userRoutes());  
}
