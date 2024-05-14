import { Migration } from '@mikro-orm/migrations';

export class Migration20240514080717 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "order" add column "manager_id" int null, add column "customer_id" int null;');
    this.addSql('alter table "order" add constraint "order_manager_id_foreign" foreign key ("manager_id") references "user" ("id") on update cascade on delete set null;');
    this.addSql('alter table "order" add constraint "order_customer_id_foreign" foreign key ("customer_id") references "user" ("id") on update cascade on delete set null;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "order" drop constraint "order_manager_id_foreign";');
    this.addSql('alter table "order" drop constraint "order_customer_id_foreign";');

    this.addSql('alter table "order" drop column "manager_id";');
    this.addSql('alter table "order" drop column "customer_id";');
  }

}
