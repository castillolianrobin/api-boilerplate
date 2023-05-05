import { Migration } from '@mikro-orm/migrations';

export class Migration20230505085058 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table `user_info` (`id` int unsigned not null auto_increment primary key, `first_name` varchar(255) not null, `last_name` varchar(255) not null, `middle_name` varchar(255) not null, `birthday` datetime not null) default character set utf8mb4 engine = InnoDB;');

    this.addSql('alter table `user` add `user_info_id` int unsigned not null;');
    this.addSql('alter table `user` add constraint `user_user_info_id_foreign` foreign key (`user_info_id`) references `user_info` (`id`) on update cascade;');
    this.addSql('alter table `user` add unique `user_user_info_id_unique`(`user_info_id`);');
  }

  async down(): Promise<void> {
    this.addSql('alter table `user` drop foreign key `user_user_info_id_foreign`;');

    this.addSql('drop table if exists `user_info`;');

    this.addSql('alter table `user` drop index `user_user_info_id_unique`;');
    this.addSql('alter table `user` drop `user_info_id`;');
  }

}
