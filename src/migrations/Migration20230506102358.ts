import { Migration } from '@mikro-orm/migrations';

export class Migration20230506102358 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table `user` add unique `user_email_unique`(`email`);');
  }

  async down(): Promise<void> {
    this.addSql('alter table `user` drop index `user_email_unique`;');
  }

}
