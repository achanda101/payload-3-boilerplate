import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "homepage_hero_section_cta_button" ADD COLUMN "button_primary" boolean DEFAULT false;
  ALTER TABLE "_homepage_v_version_hero_section_cta_button" ADD COLUMN "button_primary" boolean DEFAULT false;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "homepage_hero_section_cta_button" DROP COLUMN "button_primary";
  ALTER TABLE "_homepage_v_version_hero_section_cta_button" DROP COLUMN "button_primary";`)
}
