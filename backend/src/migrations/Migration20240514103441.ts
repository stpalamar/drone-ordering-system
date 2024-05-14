import { Migration } from '@mikro-orm/migrations';

export class Migration20240514103441 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "product_price" drop column "color_unit_price";');
    this.addSql('alter table "product_price" drop column "coating_texture_unit_price";');

    this.addSql('alter table "product_price" add column "color_price" int not null, add column "coating_texture_price" int not null;');

    this.addSql('alter table "product" add constraint "product_price_id_unique" unique ("price_id");');
  }

  async down(): Promise<void> {
    this.addSql('alter table "product_price" drop column "color_price";');
    this.addSql('alter table "product_price" drop column "coating_texture_price";');

    this.addSql('alter table "product_price" add column "color_unit_price" int not null, add column "coating_texture_unit_price" int not null;');

    this.addSql('alter table "product" drop constraint "product_price_id_unique";');
  }

}
