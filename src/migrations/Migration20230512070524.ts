import { Migration } from '@mikro-orm/migrations';

export class Migration20230512070524 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table `user` add `status` varchar(255) not null, add `deleted_at` datetime null;');
  }

  async down(): Promise<void> {
    this.addSql('alter table `user` drop `status`;');
    this.addSql('alter table `user` drop `deleted_at`;');
  }

}
