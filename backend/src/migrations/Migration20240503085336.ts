import { Migration } from '@mikro-orm/migrations';

export class Migration20240503085336 extends Migration {

  async up(): Promise<void> {
    this.addSql('create type "order_status" as enum (\'pending\', \'confirmed\', \'in_progress\', \'ready\', \'delivered\', \'cancelled\');');
    this.addSql('alter table "order" add column "status" "order_status" not null;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "order" drop column "status";');

    this.addSql('drop type "order_status";');
  }

}
