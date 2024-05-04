import { Migration } from '@mikro-orm/migrations';

export class Migration20240502174640 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "product" drop constraint "product_purpose_wings_type_unique";');

    this.addSql('create unique index product_purpose_wings_type_deleted_at_null_unique on product (purpose, wings_type) where deleted_at is null;');
  }

  async down(): Promise<void> {
    this.addSql('drop index "product_purpose_wings_type_deleted_at_null_unique";');

    this.addSql('alter table "product" add constraint "product_purpose_wings_type_unique" unique ("purpose", "wings_type");');
  }

}
