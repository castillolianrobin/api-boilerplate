import { Migration } from '@mikro-orm/migrations';

export class Migration20230505105300 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table `product_category` (`id` int unsigned not null auto_increment primary key, `name` varchar(255) not null, `created_at` datetime not null, `updated_at` datetime not null, `deleted_at` datetime null) default character set utf8mb4 engine = InnoDB;');

    this.addSql('create table `product` (`id` int unsigned not null auto_increment primary key, `code` varchar(255) not null, `name` varchar(255) not null, `description` varchar(255) not null, `photo` varchar(255) not null, `price` int not null, `category_id_id` int unsigned not null, `created_at` datetime not null, `updated_at` datetime not null, `deleted_at` datetime null) default character set utf8mb4 engine = InnoDB;');
    this.addSql('alter table `product` add unique `product_code_unique`(`code`);');
    this.addSql('alter table `product` add index `product_category_id_id_index`(`category_id_id`);');

    this.addSql('alter table `product` add constraint `product_category_id_id_foreign` foreign key (`category_id_id`) references `product_category` (`id`) on update cascade;');
  }

  async down(): Promise<void> {
    this.addSql('alter table `product` drop foreign key `product_category_id_id_foreign`;');

    this.addSql('drop table if exists `product_category`;');

    this.addSql('drop table if exists `product`;');
  }

}
