import { Migration } from '@mikro-orm/migrations';

export class Migration20240526110040 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "user" add column "deleted_at" timestamptz null;');
    this.addSql('create index "user_deleted_at_index" on "user" ("deleted_at");');
  }

  async down(): Promise<void> {
    this.addSql('drop index "user_deleted_at_index";');
    this.addSql('alter table "user" drop column "deleted_at";');
  }

}
