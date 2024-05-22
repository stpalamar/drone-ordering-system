import { Migration } from '@mikro-orm/migrations';

export class Migration20240521150035 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "chat" ("id" serial primary key, "created_at" timestamptz not null, "updated_at" timestamptz not null);');
    this.addSql('create index "chat_id_index" on "chat" ("id");');

    this.addSql('create table "message" ("id" serial primary key, "created_at" timestamptz not null, "updated_at" timestamptz not null, "chat_id" int not null, "sender_id" int not null, "recipient_id" int not null, "text" varchar(255) not null);');
    this.addSql('create index "message_id_index" on "message" ("id");');

    this.addSql('create table "chat_users" ("chat_id" int not null, "user_id" int not null, constraint "chat_users_pkey" primary key ("chat_id", "user_id"));');

    this.addSql('alter table "message" add constraint "message_chat_id_foreign" foreign key ("chat_id") references "chat" ("id") on update cascade;');
    this.addSql('alter table "message" add constraint "message_sender_id_foreign" foreign key ("sender_id") references "user" ("id") on update cascade;');
    this.addSql('alter table "message" add constraint "message_recipient_id_foreign" foreign key ("recipient_id") references "user" ("id") on update cascade;');

    this.addSql('alter table "chat_users" add constraint "chat_users_chat_id_foreign" foreign key ("chat_id") references "chat" ("id") on update cascade on delete cascade;');
    this.addSql('alter table "chat_users" add constraint "chat_users_user_id_foreign" foreign key ("user_id") references "user" ("id") on update cascade on delete cascade;');

    this.addSql('alter table "order" add column "chat_id" int null;');
    this.addSql('alter table "order" add constraint "order_chat_id_foreign" foreign key ("chat_id") references "chat" ("id") on update cascade on delete set null;');
    this.addSql('alter table "order" add constraint "order_chat_id_unique" unique ("chat_id");');
  }

  async down(): Promise<void> {
    this.addSql('alter table "order" drop constraint "order_chat_id_foreign";');

    this.addSql('alter table "message" drop constraint "message_chat_id_foreign";');

    this.addSql('alter table "chat_users" drop constraint "chat_users_chat_id_foreign";');

    this.addSql('drop table if exists "chat" cascade;');

    this.addSql('drop table if exists "message" cascade;');

    this.addSql('drop table if exists "chat_users" cascade;');

    this.addSql('alter table "order" drop constraint "order_chat_id_unique";');
    this.addSql('alter table "order" drop column "chat_id";');
  }

}
