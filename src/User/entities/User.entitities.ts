import {  Entity, ManyToOne, PrimaryKey, Property } from '@mikro-orm/core';
import { UserType } from './UserType.entities';

@Entity()
export class User {
  @PrimaryKey()
  id!: number;

  @Property({ nullable: false })
  email!: string;

  @Property()
  password!: string;
  
  @ManyToOne(() => UserType)
  userType!: UserType;

  @Property({ type: "date" })
  createdAt = new Date();

  @Property({ onUpdate: () => new Date(), type: "date" })
  updatedAt = new Date();

  constructor(email: string, password: string, userType: UserType) {
    this.email = email;
    this.password = password;
    this.userType = userType;
  }

  onInit() {
    if (!this.userType) {
      this.userType = new UserType('member'); // set default customer with ID of 1
    }
  }
}