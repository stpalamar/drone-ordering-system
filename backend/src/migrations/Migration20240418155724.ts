import { Migration } from '@mikro-orm/migrations';

export class Migration20240418155724 extends Migration {

  async up(): Promise<void> {
    this.addSql('create type "action" as enum (\'manage\', \'create\', \'read\', \'update\', \'delete\');');
    this.addSql('create table "role" ("id" serial primary key, "name" varchar(255) not null);');
    this.addSql('create index "role_id_index" on "role" ("id");');

    this.addSql('create table "subject" ("id" serial primary key, "name" varchar(255) not null);');
    this.addSql('create index "subject_id_index" on "subject" ("id");');

    this.addSql('create table "permission" ("id" serial primary key, "action" "action" not null, "subject_id" int not null, "condition" jsonb null);');
    this.addSql('create index "permission_id_index" on "permission" ("id");');

    this.addSql('create table "role_permissions" ("role_id" int not null, "permission_id" int not null, constraint "role_permissions_pkey" primary key ("role_id", "permission_id"));');

    this.addSql('create table "user" ("id" serial primary key, "created_at" timestamptz not null, "updated_at" timestamptz not null, "email" varchar(255) not null, "password" varchar(255) not null, "role_id" int not null);');
    this.addSql('create index "user_id_index" on "user" ("id");');
    this.addSql('alter table "user" add constraint "user_email_unique" unique ("email");');

    this.addSql('alter table "permission" add constraint "permission_subject_id_foreign" foreign key ("subject_id") references "subject" ("id") on update cascade;');

    this.addSql('alter table "role_permissions" add constraint "role_permissions_role_id_foreign" foreign key ("role_id") references "role" ("id") on update cascade on delete cascade;');
    this.addSql('alter table "role_permissions" add constraint "role_permissions_permission_id_foreign" foreign key ("permission_id") references "permission" ("id") on update cascade on delete cascade;');

    this.addSql('alter table "user" add constraint "user_role_id_foreign" foreign key ("role_id") references "role" ("id") on update cascade;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "role_permissions" drop constraint "role_permissions_role_id_foreign";');

    this.addSql('alter table "user" drop constraint "user_role_id_foreign";');

    this.addSql('alter table "permission" drop constraint "permission_subject_id_foreign";');

    this.addSql('alter table "role_permissions" drop constraint "role_permissions_permission_id_foreign";');

    this.addSql('drop table if exists "role" cascade;');

    this.addSql('drop table if exists "subject" cascade;');

    this.addSql('drop table if exists "permission" cascade;');

    this.addSql('drop table if exists "role_permissions" cascade;');

    this.addSql('drop table if exists "user" cascade;');

    this.addSql('drop type "action";');
  }

}
