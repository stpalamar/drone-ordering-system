import { Migration } from '@mikro-orm/migrations';

export class Migration20240430124030 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "order_item" add column "order_id" int not null;');
    this.addSql('alter table "order_item" add constraint "order_item_order_id_foreign" foreign key ("order_id") references "order" ("id") on update cascade;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "order_item" drop constraint "order_item_order_id_foreign";');

    this.addSql('alter table "order_item" drop column "order_id";');
  }

}
