import { Request, Response } from "express";
import { CRUDController } from "../../controllers/Api.contoller";
import { findAndPaginate } from "../../helpers/pagination.helper";
import { Product } from "../entities/Product.entity";
import { ProductCategory } from "../entities/ProductCategory.entity";

export class ProductController extends CRUDController {
	index = async (req: Request, res: Response) => {
		const product = await findAndPaginate(
			Product,
			{ ...req.query },
			{ findOptions: { populate: ['productCategory']} }
		);
		await this.json(res, product)
	}

	show = async (req: Request<{ id: number }>, res: Response) => {
		const { id } = req.params;
		const orm = await this.orm();
		const product = await orm.findOne(
			Product,
			{ id },
			{ populate: ['productCategory'] }
		);

		if (!product) {
			await this.success(res, 'Product not found', null, 204)
			return;
		}
		await this.json(res, product)
	}

	create = async (req: Request, res: Response) => {
		const { code, name, description, photo, price, product_category  } = req.body;
		const orm = await this.orm();
		const productCategory = await orm.findOne(
			ProductCategory,
			{ id: +product_category }
		);
		if (!productCategory) {
			await this.success(res, 'Product category not found', null, 204);
			return;
		}
		const product = new Product(code, name, description, photo, price, productCategory);
		await orm.persistAndFlush(product);
		await this.success(res, 'Product created successfully', product)
	}
}