import { Migration } from '@mikro-orm/migrations';

export class Migration20240503083525 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "order_item" alter column "additional_info" type varchar(255) using ("additional_info"::varchar(255));');
    this.addSql('alter table "order_item" alter column "additional_info" drop not null;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "order_item" alter column "additional_info" type varchar(255) using ("additional_info"::varchar(255));');
    this.addSql('alter table "order_item" alter column "additional_info" set not null;');
  }

}
