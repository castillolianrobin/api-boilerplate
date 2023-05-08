import { Application } from 'express';
import {userRoutes, authRoutes} from './User/routes';
import productRoutes from './Product/product.routes';
import { authMiddleware } from './services/passport/authentication';

export default function router(app: Application): void {
  app.use(authRoutes);
  app.use('/user', authMiddleware(), userRoutes);
  app.use('/product', productRoutes);  
}
