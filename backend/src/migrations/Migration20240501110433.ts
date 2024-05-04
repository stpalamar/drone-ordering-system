import { Migration } from '@mikro-orm/migrations';

export class Migration20240501110433 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "product" add column "base_price" int not null;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "product" drop column "base_price";');
  }

}
