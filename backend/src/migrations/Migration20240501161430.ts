import { Migration } from '@mikro-orm/migrations';

export class Migration20240501161430 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "order_item" drop column "coating_texture";');

    this.addSql('alter table "order_item" add column "coating_texture_id" int not null;');
    this.addSql('alter table "order_item" add constraint "order_item_coating_texture_id_foreign" foreign key ("coating_texture_id") references "public_file" ("id") on update cascade;');
    this.addSql('alter table "order_item" add constraint "order_item_coating_texture_id_unique" unique ("coating_texture_id");');
  }

  async down(): Promise<void> {
    this.addSql('alter table "order_item" drop constraint "order_item_coating_texture_id_foreign";');

    this.addSql('alter table "order_item" drop constraint "order_item_coating_texture_id_unique";');
    this.addSql('alter table "order_item" drop column "coating_texture_id";');

    this.addSql('alter table "order_item" add column "coating_texture" varchar(255) not null;');
  }

}
