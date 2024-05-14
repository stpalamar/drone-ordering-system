import { Migration } from '@mikro-orm/migrations';

export class Migration20240514121152 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "product" add column "total_sales" int not null default 0;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "product" drop column "total_sales";');
  }

}
