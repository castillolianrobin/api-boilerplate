import { Entity, PrimaryKey, Property } from "@mikro-orm/core";


@Entity()
export class UserInfo  {
  @PrimaryKey()
  id!: number;

  @Property()
  firstName!: string;

  @Property()
  lastName!: string;

  @Property()
  middleName?: string;

  @Property({ type: 'date' })
  birthday?: Date;

  contructor(firstName: string, lastName: string, middleName?: string, birthday?: Date) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.middleName = middleName;
    this.birthday = birthday;
  }
}