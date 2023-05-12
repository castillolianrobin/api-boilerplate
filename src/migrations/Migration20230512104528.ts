import { Migration } from '@mikro-orm/migrations';

export class Migration20230512104528 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table `product` modify `updated_at` datetime null;');
  }

  async down(): Promise<void> {
    this.addSql('alter table `product` modify `updated_at` datetime not null;');
  }

}
