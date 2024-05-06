import { Migration } from '@mikro-orm/migrations';

export class Migration20240506084702 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "subject" add constraint "subject_name_unique" unique ("name");');
  }

  async down(): Promise<void> {
    this.addSql('alter table "subject" drop constraint "subject_name_unique";');
  }

}
