import { Entity, PrimaryKey, Property, BeforeCreate } from "@mikro-orm/core";

@Entity()
export class ProductCategory {
	@PrimaryKey()
	id!: number;

	@Property()
	name!: string;

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

	constructor(name: string) {
		this.name = name;
	}
}