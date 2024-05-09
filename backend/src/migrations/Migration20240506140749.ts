import { Migration } from '@mikro-orm/migrations';

export class Migration20240506140749 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "user_details" ("id" serial primary key, "created_at" timestamptz not null, "updated_at" timestamptz not null, "first_name" varchar(255) not null, "last_name" varchar(255) not null, "phone" varchar(255) not null, "date_of_birth" timestamptz not null, "avatar_id" int null);');
    this.addSql('create index "user_details_id_index" on "user_details" ("id");');
    this.addSql('alter table "user_details" add constraint "user_details_avatar_id_unique" unique ("avatar_id");');

    this.addSql('alter table "user_details" add constraint "user_details_avatar_id_foreign" foreign key ("avatar_id") references "public_file" ("id") on update cascade on delete set null;');

    this.addSql('alter table "user" add column "details_id" int null;');
    this.addSql('alter table "user" add constraint "user_details_id_foreign" foreign key ("details_id") references "user_details" ("id") on update cascade on delete set null;');
    this.addSql('alter table "user" add constraint "user_details_id_unique" unique ("details_id");');
  }

  async down(): Promise<void> {
    this.addSql('alter table "user" drop constraint "user_details_id_foreign";');

    this.addSql('drop table if exists "user_details" cascade;');

    this.addSql('alter table "user" drop constraint "user_details_id_unique";');
    this.addSql('alter table "user" drop column "details_id";');
  }

}
