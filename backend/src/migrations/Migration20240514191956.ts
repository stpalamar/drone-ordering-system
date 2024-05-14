import { Migration } from '@mikro-orm/migrations';

export class Migration20240514191956 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "order" add column "total_price" int not null;');

    this.addSql('alter table "order_item" add column "price" int not null;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "order" drop column "total_price";');

    this.addSql('alter table "order_item" drop column "price";');
  }

}
