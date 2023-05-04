import { generateAPIResource } from "../helpers/route.helper";
import { UserController } from "./controllers/User.controller";

export default function userRoutes() {
  return generateAPIResource(new UserController);
}