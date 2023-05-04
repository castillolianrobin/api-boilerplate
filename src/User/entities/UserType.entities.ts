import {  Entity, PrimaryKey, Property } from '@mikro-orm/core';

@Entity()
export class UserType {
  @PrimaryKey()
  id!: number;

  @Property({ nullable: false })
  name!: string;

  @Property({ type: "date" })
  createdAt = new Date();

  @Property({ onUpdate: () => new Date(), type: "date" })
  updatedAt = new Date();

  constructor(name: string) {
    this.name = name;
  }
}