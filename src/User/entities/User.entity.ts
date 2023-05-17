import {  Entity, ManyToOne, OneToOne, PrimaryKey, Property, Reference, EntityManager } from '@mikro-orm/core';
import { UserType } from './UserType.entity';
import { UserInfo } from './UserInfo.entity';
import { SoftDeletable } from "mikro-orm-soft-delete";
@SoftDeletable(() => User, "deletedAt", () => new Date())
@Entity()
export class User {
  @PrimaryKey()
  id!: number;

  @Property({ nullable: false, unique: true })
  email!: string;

  @Property({ hidden: true })
  password!: string;

  @Property({ hidden: true })
  password_salt!: string;

  @Property()
  status!: UserStatus;
  
  @ManyToOne(() => UserType)
  userType!: UserType;

  @OneToOne(() => UserInfo, { nullable: true })
  userInfo?: UserInfo;

  @Property({ nullable: true })
  token?: string;

  @Property({ type: 'date', nullable: true })
  tokenExpiration?: Date;

  @Property({ type: "date" })
  createdAt = new Date();

  @Property({ onUpdate: () => new Date(), type: "date" })
  updatedAt = new Date();

  @Property({ nullable: true })
  deletedAt?: Date;

  constructor(user: UserConstructParam) {
    this.status = 'new';
    this.email = user.email;
    this.password = user.password;
    this.password_salt = user.password_salt;
    this.userType = user.userType;
    user.userInfo && (this.userInfo = user.userInfo);
  }
}


/** __TYPE DEFINITIONS__ */

interface UserConstructParam { email: string, password: string, password_salt: string, userType: UserType, userInfo?: UserInfo, }

export type UserStatus = 'new' | 'verified' | 'disabled'; 