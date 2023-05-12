import { generateAPIResource } from "../helpers/route.helper";
import { ProductController } from "./controllers/Product.controller";

// Product CRUD
export default generateAPIResource(new ProductController)