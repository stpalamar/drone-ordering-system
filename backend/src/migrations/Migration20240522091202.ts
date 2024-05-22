import { Migration } from '@mikro-orm/migrations';

export class Migration20240522091202 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "message" alter column "text" type text using ("text"::text);');
  }

  async down(): Promise<void> {
    this.addSql('alter table "message" alter column "text" type varchar(255) using ("text"::varchar(255));');
  }

}
