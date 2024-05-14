import { Migration } from '@mikro-orm/migrations';

export class Migration20240514084810 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "product_price" ("id" serial primary key, "created_at" timestamptz not null, "updated_at" timestamptz not null, "length_unit_price" int not null, "width_unit_price" int not null, "payload_capacity_unit_price" int not null, "flight_distance_unit_price" int not null, "flight_time_unit_price" int not null, "additional_equipment_prices" jsonb not null, "color_unit_price" int not null, "coating_texture_unit_price" int not null);');
    this.addSql('create index "product_price_id_index" on "product_price" ("id");');

    this.addSql('alter table "order_item" alter column "additional_equipment" type jsonb using ("additional_equipment"::jsonb);');
  }

  async down(): Promise<void> {
    this.addSql('drop table if exists "product_price" cascade;');

    this.addSql('alter table "order_item" alter column "additional_equipment" type varchar(255) using ("additional_equipment"::varchar(255));');
  }

}
