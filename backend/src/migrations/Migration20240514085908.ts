import { Migration } from '@mikro-orm/migrations';

export class Migration20240514085908 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "product_price" add column "base_price" int not null;');

    this.addSql('alter table "product" drop column "base_price";');
  }

  async down(): Promise<void> {
    this.addSql('alter table "product_price" drop column "base_price";');

    this.addSql('alter table "product" add column "base_price" int not null;');
  }

}
