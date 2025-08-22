import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "posts_locales" ALTER COLUMN "title" DROP DEFAULT;
  ALTER TABLE "_posts_v_locales" ALTER COLUMN "version_title" DROP DEFAULT;
  ALTER TABLE "nav_menu_items_locales" ALTER COLUMN "label" DROP DEFAULT;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "posts_locales" ALTER COLUMN "title" SET DEFAULT 'Blog Post Title';
  ALTER TABLE "_posts_v_locales" ALTER COLUMN "version_title" SET DEFAULT 'Blog Post Title';
  ALTER TABLE "nav_menu_items_locales" ALTER COLUMN "label" SET DEFAULT 'Menu Item';`)
}
