import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "footer" ADD COLUMN "newsletter_sub_url" varchar DEFAULT 'https://example.com/subscribe';
  ALTER TABLE "footer_locales" ADD COLUMN "newsletter_sub_description" varchar DEFAULT 'Subscribe to our newsletter.';
  ALTER TABLE "footer_locales" ADD COLUMN "newsletter_sub_input_placeholder" varchar DEFAULT 'Enter your email';
  ALTER TABLE "footer_locales" ADD COLUMN "newsletter_sub_button_text" varchar DEFAULT 'Subscribe';`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "footer" DROP COLUMN "newsletter_sub_url";
  ALTER TABLE "footer_locales" DROP COLUMN "newsletter_sub_description";
  ALTER TABLE "footer_locales" DROP COLUMN "newsletter_sub_input_placeholder";
  ALTER TABLE "footer_locales" DROP COLUMN "newsletter_sub_button_text";`)
}
