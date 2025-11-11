import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_grants_blocks_secondarycta_ui_type" AS ENUM('lrg_txt_cta', 'md_txt_cta', 'min_cta', 'puffy_beige_cta');
  CREATE TYPE "public"."enum__grants_v_blocks_secondarycta_ui_type" AS ENUM('lrg_txt_cta', 'md_txt_cta', 'min_cta', 'puffy_beige_cta');
  CREATE TYPE "public"."enum_homepage_blocks_secondarycta_ui_type" AS ENUM('lrg_txt_cta', 'md_txt_cta', 'min_cta', 'puffy_beige_cta');
  CREATE TYPE "public"."enum__homepage_v_blocks_secondarycta_ui_type" AS ENUM('lrg_txt_cta', 'md_txt_cta', 'min_cta', 'puffy_beige_cta');
  ALTER TABLE "grants_blocks_secondarycta" ADD COLUMN "ui_type" "enum_grants_blocks_secondarycta_ui_type" DEFAULT 'lrg_txt_cta';
  ALTER TABLE "_grants_v_blocks_secondarycta" ADD COLUMN "ui_type" "enum__grants_v_blocks_secondarycta_ui_type" DEFAULT 'lrg_txt_cta';
  ALTER TABLE "homepage_blocks_secondarycta" ADD COLUMN "ui_type" "enum_homepage_blocks_secondarycta_ui_type" DEFAULT 'lrg_txt_cta';
  ALTER TABLE "_homepage_v_blocks_secondarycta" ADD COLUMN "ui_type" "enum__homepage_v_blocks_secondarycta_ui_type" DEFAULT 'lrg_txt_cta';`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "grants_blocks_secondarycta" DROP COLUMN "ui_type";
  ALTER TABLE "_grants_v_blocks_secondarycta" DROP COLUMN "ui_type";
  ALTER TABLE "homepage_blocks_secondarycta" DROP COLUMN "ui_type";
  ALTER TABLE "_homepage_v_blocks_secondarycta" DROP COLUMN "ui_type";
  DROP TYPE "public"."enum_grants_blocks_secondarycta_ui_type";
  DROP TYPE "public"."enum__grants_v_blocks_secondarycta_ui_type";
  DROP TYPE "public"."enum_homepage_blocks_secondarycta_ui_type";
  DROP TYPE "public"."enum__homepage_v_blocks_secondarycta_ui_type";`)
}
