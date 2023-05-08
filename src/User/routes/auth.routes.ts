import express from 'express';
import { AuthController } from '../controllers/Auth.controller';
import multer from 'multer';

const router = express.Router();
const auth = new AuthController();

router.post( '/register', multer().none(), auth.register);
router.post( '/login', multer().none(), auth.login);

export default router;