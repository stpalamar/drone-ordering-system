import { Migration } from '@mikro-orm/migrations';

export class Migration20240504105609 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "order" add column "deleted_at" timestamptz null;');
    this.addSql('create index "order_deleted_at_index" on "order" ("deleted_at");');
  }

  async down(): Promise<void> {
    this.addSql('drop index "order_deleted_at_index";');
    this.addSql('alter table "order" drop column "deleted_at";');
  }

}
