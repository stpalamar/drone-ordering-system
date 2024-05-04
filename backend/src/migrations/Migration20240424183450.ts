import { Migration } from '@mikro-orm/migrations';

export class Migration20240424183450 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "order" ("id" serial primary key, "created_at" timestamptz not null, "updated_at" timestamptz not null, "order_number" uuid not null, "first_name" varchar(255) not null, "last_name" varchar(255) not null, "phone" varchar(255) not null, "email" varchar(255) not null, "items" jsonb not null);');
    this.addSql('create index "order_id_index" on "order" ("id");');
    this.addSql('alter table "order" add constraint "order_order_number_unique" unique ("order_number");');
  }

  async down(): Promise<void> {
    this.addSql('drop table if exists "order" cascade;');
  }

}
