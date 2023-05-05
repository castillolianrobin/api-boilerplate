import { generateAPIResource } from "../helpers/route.helper";
import { UserController } from "./controllers/User.controller";

export default generateAPIResource(new UserController);