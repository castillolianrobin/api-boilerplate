import express from 'express';
import { generateAPIResource } from "../helpers/route.helper";
import { UserController } from "./controllers/User.controller";
import { AuthController } from './controllers/Auth.controller';
import multer from 'multer';

const router = express.Router();
// Authentication
const auth = new AuthController();
router.post( '/register', multer().none(), auth.register);
router.post( '/login', multer().none(), auth.login);

// User CRUD
generateAPIResource(new UserController, router);

export default router;