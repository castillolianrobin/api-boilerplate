import express from 'express';
import { generateAPIResource } from "../helpers/route.helper";
import { UserController } from "./controllers/User.controller";

const router = express.Router()

export default function userRoutes() {
    return generateAPIResource(new UserController, router);
}