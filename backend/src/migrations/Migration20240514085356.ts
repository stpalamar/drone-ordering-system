import { Migration } from '@mikro-orm/migrations';

export class Migration20240514085356 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "product" add column "price_id" int not null;');
    this.addSql('alter table "product" add constraint "product_price_id_foreign" foreign key ("price_id") references "product_price" ("id") on update cascade;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "product" drop constraint "product_price_id_foreign";');

    this.addSql('alter table "product" drop column "price_id";');
  }

}
