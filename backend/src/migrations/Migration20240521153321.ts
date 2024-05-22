import { Migration } from '@mikro-orm/migrations';

export class Migration20240521153321 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "message" drop constraint "message_recipient_id_foreign";');

    this.addSql('alter table "message" drop column "recipient_id";');
  }

  async down(): Promise<void> {
    this.addSql('alter table "message" add column "recipient_id" int not null;');
    this.addSql('alter table "message" add constraint "message_recipient_id_foreign" foreign key ("recipient_id") references "user" ("id") on update cascade;');
  }

}
