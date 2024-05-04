import { Migration } from '@mikro-orm/migrations';

export class Migration20240502174019 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "product" drop column "status";');

    this.addSql('alter table "product" add column "deleted_at" timestamptz null;');
    this.addSql('create index "product_deleted_at_index" on "product" ("deleted_at");');

    this.addSql('drop type "entity_status";');
  }

  async down(): Promise<void> {
    this.addSql('create type "entity_status" as enum (\'ACTIVE\', \'DISABLED\');');
    this.addSql('drop index "product_deleted_at_index";');
    this.addSql('alter table "product" drop column "deleted_at";');

    this.addSql('alter table "product" add column "status" "entity_status" not null default \'ACTIVE\';');
  }

}
