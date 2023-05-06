import { Migration } from '@mikro-orm/migrations';

export class Migration20230506101935 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table `product` drop foreign key `product_category_id_id_foreign`;');

    this.addSql('alter table `product` drop index `product_category_id_id_index`;');
    this.addSql('alter table `product` change `category_id_id` `product_category_id` int unsigned not null;');
    this.addSql('alter table `product` add constraint `product_product_category_id_foreign` foreign key (`product_category_id`) references `product_category` (`id`) on update cascade;');
    this.addSql('alter table `product` add index `product_product_category_id_index`(`product_category_id`);');

    this.addSql('alter table `user_info` modify `middle_name` varchar(255) null, modify `birthday` datetime null;');

    this.addSql('alter table `user` add `password_salt` varchar(255) not null, add `token` varchar(255) null, add `token_expiration` datetime null;');
  }

  async down(): Promise<void> {
    this.addSql('alter table `product` drop foreign key `product_product_category_id_foreign`;');

    this.addSql('alter table `product` drop index `product_product_category_id_index`;');
    this.addSql('alter table `product` change `product_category_id` `category_id_id` int unsigned not null;');
    this.addSql('alter table `product` add constraint `product_category_id_id_foreign` foreign key (`category_id_id`) references `product_category` (`id`) on update cascade;');
    this.addSql('alter table `product` add index `product_category_id_id_index`(`category_id_id`);');

    this.addSql('alter table `user_info` modify `middle_name` varchar(255) not null, modify `birthday` datetime not null;');

    this.addSql('alter table `user` drop `password_salt`;');
    this.addSql('alter table `user` drop `token`;');
    this.addSql('alter table `user` drop `token_expiration`;');
  }

}
