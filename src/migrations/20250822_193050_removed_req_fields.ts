import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "header" ALTER COLUMN "logo_id" DROP NOT NULL;
  ALTER TABLE "footer" ALTER COLUMN "logo_id" DROP NOT NULL;
  ALTER TABLE "nav_menu_items_nav_items_locales" ALTER COLUMN "link_label" DROP NOT NULL;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "header" ALTER COLUMN "logo_id" SET NOT NULL;
  ALTER TABLE "footer" ALTER COLUMN "logo_id" SET NOT NULL;
  ALTER TABLE "nav_menu_items_nav_items_locales" ALTER COLUMN "link_label" SET NOT NULL;`)
}
