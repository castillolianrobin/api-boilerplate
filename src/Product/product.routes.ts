import { generateAPIResource } from "../helpers/route.helper";
import { ProductController } from "./controllers/Product.controller";

export default generateAPIResource(new ProductController)