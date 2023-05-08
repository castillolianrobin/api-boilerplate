import { Entity, PrimaryKey, Property } from "@mikro-orm/core";


@Entity()
export class UserInfo  {
  @PrimaryKey()
  id!: number;

  @Property()
  firstName!: string;

  @Property()
  lastName!: string;

  @Property({ nullable: true })
  middleName?: string;

  @Property({ type: 'date', nullable: true })
  birthday?: Date;

  constructor(userInfo: { firstName: string, lastName: string, middleName?: string, birthday?: Date }) {
    this.firstName = userInfo.firstName;
    this.lastName = userInfo.lastName;
    userInfo.middleName && (this.middleName = userInfo.middleName);
    userInfo.birthday && (this.birthday = userInfo.birthday);
  }
}