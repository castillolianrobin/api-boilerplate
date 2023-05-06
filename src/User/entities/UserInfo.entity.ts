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

  constructor(firstName: string, lastName: string, middleName?: string, birthday?: Date) {
    this.firstName = firstName;
    this.lastName = lastName;
    middleName && (this.middleName = middleName);
    birthday && (this.birthday = birthday);
  }
}