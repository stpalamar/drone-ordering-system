import { Migration } from '@mikro-orm/migrations';

export class Migration20240503094034 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "order_item" drop constraint "order_item_coating_texture_id_foreign";');

    this.addSql('alter table "order_item" alter column "coating_texture_id" type int using ("coating_texture_id"::int);');
    this.addSql('alter table "order_item" alter column "coating_texture_id" drop not null;');
    this.addSql('alter table "order_item" add constraint "order_item_coating_texture_id_foreign" foreign key ("coating_texture_id") references "public_file" ("id") on update cascade on delete set null;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "order_item" drop constraint "order_item_coating_texture_id_foreign";');

    this.addSql('alter table "order_item" alter column "coating_texture_id" type int using ("coating_texture_id"::int);');
    this.addSql('alter table "order_item" alter column "coating_texture_id" set not null;');
    this.addSql('alter table "order_item" add constraint "order_item_coating_texture_id_foreign" foreign key ("coating_texture_id") references "public_file" ("id") on update cascade;');
  }

}
