import { generateAPIResource } from "../../helpers/route.helper";
import { UserController } from "../controllers/User.controller";

// User CRUD
export default generateAPIResource(new UserController);
