import { Migration } from '@mikro-orm/migrations';

export class Migration20230512092025 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table `product` modify `photo` varchar(255) null;');
  }

  async down(): Promise<void> {
    this.addSql('alter table `product` modify `photo` varchar(255) not null;');
  }

}
