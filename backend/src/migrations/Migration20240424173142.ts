import { Migration } from '@mikro-orm/migrations';

export class Migration20240424173142 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "product" ("id" serial primary key, "created_at" timestamptz not null, "updated_at" timestamptz not null, "purpose" varchar(255) not null, "wings_type" varchar(255) not null, "image" varchar(255) not null);');
    this.addSql('create index "product_id_index" on "product" ("id");');
    this.addSql('alter table "product" add constraint "product_purpose_wings_type_unique" unique ("purpose", "wings_type");');
  }

  async down(): Promise<void> {
    this.addSql('drop table if exists "product" cascade;');
  }

}
