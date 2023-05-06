import { Application } from 'express';
import userRoutes from './User/user.routes';
import productRoutes from './Product/product.routes';

export default function router(app: Application): void {
  app.use('/user', userRoutes);
  
  app.use('/product', productRoutes);  
}
