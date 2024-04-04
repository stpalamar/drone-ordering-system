import { Migration } from '@mikro-orm/migrations';

export class Migration20240404161715 extends Migration {
    async up(): Promise<void> {
        this.addSql(
            'create table "user" ("id" serial primary key, "created_at" timestamptz not null, "updated_at" timestamptz not null, "email" varchar(255) not null, "password" varchar(255) not null);',
        );
        this.addSql('create index "user_id_index" on "user" ("id");');
        this.addSql(
            'alter table "user" add constraint "user_email_unique" unique ("email");',
        );
    }

    async down(): Promise<void> {
        this.addSql('drop table if exists "user" cascade;');
    }
}
