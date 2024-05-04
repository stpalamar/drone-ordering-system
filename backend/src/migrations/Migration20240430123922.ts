import { Migration } from '@mikro-orm/migrations';

export class Migration20240430123922 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "order_item" ("id" serial primary key, "created_at" timestamptz not null, "updated_at" timestamptz not null, "product_id" int not null, "length" int not null, "width" int not null, "payload_capacity" int not null, "flight_distance" int not null, "flight_time" int not null, "power_source" varchar(255) not null, "material_type" varchar(255) not null, "additional_equipment" varchar(255) not null, "amount" int not null, "color" varchar(255) not null, "coating_texture" varchar(255) not null, "additional_info" varchar(255) not null);');
    this.addSql('create index "order_item_id_index" on "order_item" ("id");');

    this.addSql('alter table "order_item" add constraint "order_item_product_id_foreign" foreign key ("product_id") references "product" ("id") on update cascade;');

    this.addSql('alter table "order" drop column "items";');
  }

  async down(): Promise<void> {
    this.addSql('drop table if exists "order_item" cascade;');

    this.addSql('alter table "order" add column "items" jsonb not null;');
  }

}
