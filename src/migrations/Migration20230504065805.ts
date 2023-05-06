import { Migration } from '@mikro-orm/migrations';

export class Migration20230504065805 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table `user_type` (`id` int unsigned not null auto_increment primary key, `name` varchar(255) not null, `created_at` datetime not null, `updated_at` datetime not null) default character set utf8mb4 engine = InnoDB;');
    // Add prefilled user types
    this.addSql(`INSERT INTO user_type (name, created_at, updated_at) VALUES ('member', now(), now())`);
    this.addSql(`INSERT INTO user_type (name, created_at, updated_at) VALUES ('admin', now(), now())`);

    this.addSql('alter table `user` add `user_type_id` int unsigned not null;');
    this.addSql('alter table `user` add constraint `user_user_type_id_foreign` foreign key (`user_type_id`) references `user_type` (`id`) on update cascade;');
    this.addSql('alter table `user` add index `user_user_type_id_index`(`user_type_id`);');
  }

  async down(): Promise<void> {
    this.addSql('alter table `user` drop foreign key `user_user_type_id_foreign`;');

    this.addSql('drop table if exists `user_type`;');

    this.addSql('alter table `user` drop index `user_user_type_id_index`;');
    this.addSql('alter table `user` drop `user_type_id`;');
  }

}
