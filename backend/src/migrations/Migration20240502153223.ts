import { Migration } from '@mikro-orm/migrations';

export class Migration20240502153223 extends Migration {

  async up(): Promise<void> {
    this.addSql('create type "entity_status" as enum (\'ACTIVE\', \'DISABLED\');');
    this.addSql('alter table "product" add column "status" "entity_status" not null default \'ACTIVE\';');
  }

  async down(): Promise<void> {
    this.addSql('alter table "product" drop column "status";');

    this.addSql('drop type "entity_status";');
  }

}
