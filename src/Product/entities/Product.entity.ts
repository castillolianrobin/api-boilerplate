import { BeforeCreate, Entity, ManyToOne, PrimaryKey, Property } from "@mikro-orm/core";
import { ProductCategory } from "./ProductCategory.entity";

@Entity()
export class Product {
	@PrimaryKey()
	id!: number;

	@Property({ unique: true })
	code!: string;

	@Property()
	name!: string;

	@Property()
	description?: string;

	@Property({ nullable: true })
	photo?: string;

	@Property({ type: "number" })
	price!: number;

	@ManyToOne(() => ProductCategory)
	productCategory!: ProductCategory;

	@Property({ type: "date" })
	createdAt!: Date;

	@BeforeCreate()
	beforeCreate() {
		this.createdAt = new Date();
	}

	@Property({ type: "date", onUpdate: () => new Date() })
	updatedAt?: Date;

	@Property({ nullable: true, type: "date" })
	deletedAt?: Date;

	constructor(code: string, name: string, description: string, photo: string, price: number, productCategory: ProductCategory) {
		this.code = code;
		this.name = name;
		this.description = description;
		this.photo = photo;
		this.price = price;
		this.productCategory = productCategory;
	}
}