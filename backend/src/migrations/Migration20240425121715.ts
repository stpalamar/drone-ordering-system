import { Migration } from '@mikro-orm/migrations';

export class Migration20240425121715 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "public_file" ("id" serial primary key, "url" varchar(255) not null, "key" varchar(255) not null);');
    this.addSql('create index "public_file_id_index" on "public_file" ("id");');

    this.addSql('alter table "product" drop column "image";');

    this.addSql('alter table "product" add column "image_id" int not null;');
    this.addSql('alter table "product" add constraint "product_image_id_foreign" foreign key ("image_id") references "public_file" ("id") on update cascade;');
    this.addSql('alter table "product" add constraint "product_image_id_unique" unique ("image_id");');
  }

  async down(): Promise<void> {
    this.addSql('alter table "product" drop constraint "product_image_id_foreign";');

    this.addSql('drop table if exists "public_file" cascade;');

    this.addSql('alter table "product" drop constraint "product_image_id_unique";');
    this.addSql('alter table "product" drop column "image_id";');

    this.addSql('alter table "product" add column "image" varchar(255) not null;');
  }

}
