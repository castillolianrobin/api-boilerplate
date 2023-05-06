import { Migration } from '@mikro-orm/migrations';

export class Migration20230506185417 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table `user` drop foreign key `user_user_info_id_foreign`;');

    this.addSql('alter table `user_type` add unique `user_type_name_unique`(`name`);');

    this.addSql('alter table `user` modify `user_info_id` int unsigned null;');
    this.addSql('alter table `user` add constraint `user_user_info_id_foreign` foreign key (`user_info_id`) references `user_info` (`id`) on update cascade on delete set null;');

    this.addSql(`INSERT INTO user (email, password, password_salt, user_type_id, created_at, updated_at) VALUES ('test@email.com', 'd2d96b1b2963c7fe99cdb898bf9f1b97573887e94f29359a59f4b65aa829d65d', 'e36b89f6c8e1d9de364f4ffb50f73098', 1, now(), now())`);
  }

  async down(): Promise<void> {
    this.addSql('alter table `user` drop foreign key `user_user_info_id_foreign`;');

    this.addSql('alter table `user_type` drop index `user_type_name_unique`;');

    this.addSql('alter table `user` modify `user_info_id` int unsigned not null;');
    this.addSql('alter table `user` add constraint `user_user_info_id_foreign` foreign key (`user_info_id`) references `user_info` (`id`) on update cascade;');
  }

}
