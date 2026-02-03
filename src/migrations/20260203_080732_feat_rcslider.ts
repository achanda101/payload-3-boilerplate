import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_grants_blocks_list_crd_dck_data_source" AS ENUM('manual', 'resources');
  CREATE TYPE "public"."enum__grants_v_blocks_list_crd_dck_data_source" AS ENUM('manual', 'resources');
  CREATE TYPE "public"."enum_pages_blocks_list_crd_dck_data_source" AS ENUM('manual', 'resources');
  CREATE TYPE "public"."enum__pages_v_blocks_list_crd_dck_data_source" AS ENUM('manual', 'resources');
  CREATE TYPE "public"."enum_blog_blocks_list_crd_dck_data_source" AS ENUM('manual', 'resources');
  CREATE TYPE "public"."enum__blog_v_blocks_list_crd_dck_data_source" AS ENUM('manual', 'resources');
  CREATE TYPE "public"."enum_reports_blocks_list_crd_dck_data_source" AS ENUM('manual', 'resources');
  CREATE TYPE "public"."enum__reports_v_blocks_list_crd_dck_data_source" AS ENUM('manual', 'resources');
  CREATE TYPE "public"."enum_mmedia_blocks_list_crd_dck_data_source" AS ENUM('manual', 'resources');
  CREATE TYPE "public"."enum__mmedia_v_blocks_list_crd_dck_data_source" AS ENUM('manual', 'resources');
  CREATE TYPE "public"."enum_homepage_blocks_list_crd_dck_data_source" AS ENUM('manual', 'resources');
  CREATE TYPE "public"."enum__homepage_v_blocks_list_crd_dck_data_source" AS ENUM('manual', 'resources');
  ALTER TABLE "grants_blocks_list_crd_dck" ADD COLUMN "data_source" "enum_grants_blocks_list_crd_dck_data_source" DEFAULT 'manual';
  ALTER TABLE "_grants_v_blocks_list_crd_dck" ADD COLUMN "data_source" "enum__grants_v_blocks_list_crd_dck_data_source" DEFAULT 'manual';
  ALTER TABLE "pages_blocks_list_crd_dck" ADD COLUMN "data_source" "enum_pages_blocks_list_crd_dck_data_source" DEFAULT 'manual';
  ALTER TABLE "_pages_v_blocks_list_crd_dck" ADD COLUMN "data_source" "enum__pages_v_blocks_list_crd_dck_data_source" DEFAULT 'manual';
  ALTER TABLE "blog_blocks_list_crd_dck" ADD COLUMN "data_source" "enum_blog_blocks_list_crd_dck_data_source" DEFAULT 'manual';
  ALTER TABLE "_blog_v_blocks_list_crd_dck" ADD COLUMN "data_source" "enum__blog_v_blocks_list_crd_dck_data_source" DEFAULT 'manual';
  ALTER TABLE "reports_blocks_list_crd_dck" ADD COLUMN "data_source" "enum_reports_blocks_list_crd_dck_data_source" DEFAULT 'manual';
  ALTER TABLE "_reports_v_blocks_list_crd_dck" ADD COLUMN "data_source" "enum__reports_v_blocks_list_crd_dck_data_source" DEFAULT 'manual';
  ALTER TABLE "mmedia_blocks_list_crd_dck" ADD COLUMN "data_source" "enum_mmedia_blocks_list_crd_dck_data_source" DEFAULT 'manual';
  ALTER TABLE "_mmedia_v_blocks_list_crd_dck" ADD COLUMN "data_source" "enum__mmedia_v_blocks_list_crd_dck_data_source" DEFAULT 'manual';
  ALTER TABLE "homepage_blocks_list_crd_dck" ADD COLUMN "data_source" "enum_homepage_blocks_list_crd_dck_data_source" DEFAULT 'manual';
  ALTER TABLE "_homepage_v_blocks_list_crd_dck" ADD COLUMN "data_source" "enum__homepage_v_blocks_list_crd_dck_data_source" DEFAULT 'manual';`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "grants_blocks_list_crd_dck" DROP COLUMN "data_source";
  ALTER TABLE "_grants_v_blocks_list_crd_dck" DROP COLUMN "data_source";
  ALTER TABLE "pages_blocks_list_crd_dck" DROP COLUMN "data_source";
  ALTER TABLE "_pages_v_blocks_list_crd_dck" DROP COLUMN "data_source";
  ALTER TABLE "blog_blocks_list_crd_dck" DROP COLUMN "data_source";
  ALTER TABLE "_blog_v_blocks_list_crd_dck" DROP COLUMN "data_source";
  ALTER TABLE "reports_blocks_list_crd_dck" DROP COLUMN "data_source";
  ALTER TABLE "_reports_v_blocks_list_crd_dck" DROP COLUMN "data_source";
  ALTER TABLE "mmedia_blocks_list_crd_dck" DROP COLUMN "data_source";
  ALTER TABLE "_mmedia_v_blocks_list_crd_dck" DROP COLUMN "data_source";
  ALTER TABLE "homepage_blocks_list_crd_dck" DROP COLUMN "data_source";
  ALTER TABLE "_homepage_v_blocks_list_crd_dck" DROP COLUMN "data_source";
  DROP TYPE "public"."enum_grants_blocks_list_crd_dck_data_source";
  DROP TYPE "public"."enum__grants_v_blocks_list_crd_dck_data_source";
  DROP TYPE "public"."enum_pages_blocks_list_crd_dck_data_source";
  DROP TYPE "public"."enum__pages_v_blocks_list_crd_dck_data_source";
  DROP TYPE "public"."enum_blog_blocks_list_crd_dck_data_source";
  DROP TYPE "public"."enum__blog_v_blocks_list_crd_dck_data_source";
  DROP TYPE "public"."enum_reports_blocks_list_crd_dck_data_source";
  DROP TYPE "public"."enum__reports_v_blocks_list_crd_dck_data_source";
  DROP TYPE "public"."enum_mmedia_blocks_list_crd_dck_data_source";
  DROP TYPE "public"."enum__mmedia_v_blocks_list_crd_dck_data_source";
  DROP TYPE "public"."enum_homepage_blocks_list_crd_dck_data_source";
  DROP TYPE "public"."enum__homepage_v_blocks_list_crd_dck_data_source";`)
}
