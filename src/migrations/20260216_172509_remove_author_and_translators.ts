import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_grants_blocks_feat_crd_title_alignment" AS ENUM('left', 'right');
  CREATE TYPE "public"."enum__grants_v_blocks_feat_crd_title_alignment" AS ENUM('left', 'right');
  CREATE TYPE "public"."enum_pages_blocks_feat_crd_title_alignment" AS ENUM('left', 'right');
  CREATE TYPE "public"."enum__pages_v_blocks_feat_crd_title_alignment" AS ENUM('left', 'right');
  CREATE TYPE "public"."enum_blog_blocks_feat_crd_title_alignment" AS ENUM('left', 'right');
  CREATE TYPE "public"."enum__blog_v_blocks_feat_crd_title_alignment" AS ENUM('left', 'right');
  CREATE TYPE "public"."enum_reports_blocks_feat_crd_title_alignment" AS ENUM('left', 'right');
  CREATE TYPE "public"."enum__reports_v_blocks_feat_crd_title_alignment" AS ENUM('left', 'right');
  CREATE TYPE "public"."enum_mmedia_blocks_feat_crd_title_alignment" AS ENUM('left', 'right');
  CREATE TYPE "public"."enum__mmedia_v_blocks_feat_crd_title_alignment" AS ENUM('left', 'right');
  CREATE TYPE "public"."enum_homepage_blocks_feat_crd_title_alignment" AS ENUM('left', 'right');
  CREATE TYPE "public"."enum__homepage_v_blocks_feat_crd_title_alignment" AS ENUM('left', 'right');
  ALTER TABLE "grants_blocks_feat_crd" ADD COLUMN "title_alignment" "enum_grants_blocks_feat_crd_title_alignment" DEFAULT 'left';
  ALTER TABLE "_grants_v_blocks_feat_crd" ADD COLUMN "title_alignment" "enum__grants_v_blocks_feat_crd_title_alignment" DEFAULT 'left';
  ALTER TABLE "pages_blocks_feat_crd" ADD COLUMN "title_alignment" "enum_pages_blocks_feat_crd_title_alignment" DEFAULT 'left';
  ALTER TABLE "_pages_v_blocks_feat_crd" ADD COLUMN "title_alignment" "enum__pages_v_blocks_feat_crd_title_alignment" DEFAULT 'left';
  ALTER TABLE "blog_blocks_feat_crd" ADD COLUMN "title_alignment" "enum_blog_blocks_feat_crd_title_alignment" DEFAULT 'left';
  ALTER TABLE "_blog_v_blocks_feat_crd" ADD COLUMN "title_alignment" "enum__blog_v_blocks_feat_crd_title_alignment" DEFAULT 'left';
  ALTER TABLE "reports_blocks_feat_crd" ADD COLUMN "title_alignment" "enum_reports_blocks_feat_crd_title_alignment" DEFAULT 'left';
  ALTER TABLE "_reports_v_blocks_feat_crd" ADD COLUMN "title_alignment" "enum__reports_v_blocks_feat_crd_title_alignment" DEFAULT 'left';
  ALTER TABLE "mmedia_blocks_feat_crd" ADD COLUMN "title_alignment" "enum_mmedia_blocks_feat_crd_title_alignment" DEFAULT 'left';
  ALTER TABLE "_mmedia_v_blocks_feat_crd" ADD COLUMN "title_alignment" "enum__mmedia_v_blocks_feat_crd_title_alignment" DEFAULT 'left';
  ALTER TABLE "homepage_blocks_feat_crd" ADD COLUMN "title_alignment" "enum_homepage_blocks_feat_crd_title_alignment" DEFAULT 'left';
  ALTER TABLE "_homepage_v_blocks_feat_crd" ADD COLUMN "title_alignment" "enum__homepage_v_blocks_feat_crd_title_alignment" DEFAULT 'left';`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "grants_blocks_feat_crd" DROP COLUMN "title_alignment";
  ALTER TABLE "_grants_v_blocks_feat_crd" DROP COLUMN "title_alignment";
  ALTER TABLE "pages_blocks_feat_crd" DROP COLUMN "title_alignment";
  ALTER TABLE "_pages_v_blocks_feat_crd" DROP COLUMN "title_alignment";
  ALTER TABLE "blog_blocks_feat_crd" DROP COLUMN "title_alignment";
  ALTER TABLE "_blog_v_blocks_feat_crd" DROP COLUMN "title_alignment";
  ALTER TABLE "reports_blocks_feat_crd" DROP COLUMN "title_alignment";
  ALTER TABLE "_reports_v_blocks_feat_crd" DROP COLUMN "title_alignment";
  ALTER TABLE "mmedia_blocks_feat_crd" DROP COLUMN "title_alignment";
  ALTER TABLE "_mmedia_v_blocks_feat_crd" DROP COLUMN "title_alignment";
  ALTER TABLE "homepage_blocks_feat_crd" DROP COLUMN "title_alignment";
  ALTER TABLE "_homepage_v_blocks_feat_crd" DROP COLUMN "title_alignment";
  DROP TYPE "public"."enum_grants_blocks_feat_crd_title_alignment";
  DROP TYPE "public"."enum__grants_v_blocks_feat_crd_title_alignment";
  DROP TYPE "public"."enum_pages_blocks_feat_crd_title_alignment";
  DROP TYPE "public"."enum__pages_v_blocks_feat_crd_title_alignment";
  DROP TYPE "public"."enum_blog_blocks_feat_crd_title_alignment";
  DROP TYPE "public"."enum__blog_v_blocks_feat_crd_title_alignment";
  DROP TYPE "public"."enum_reports_blocks_feat_crd_title_alignment";
  DROP TYPE "public"."enum__reports_v_blocks_feat_crd_title_alignment";
  DROP TYPE "public"."enum_mmedia_blocks_feat_crd_title_alignment";
  DROP TYPE "public"."enum__mmedia_v_blocks_feat_crd_title_alignment";
  DROP TYPE "public"."enum_homepage_blocks_feat_crd_title_alignment";
  DROP TYPE "public"."enum__homepage_v_blocks_feat_crd_title_alignment";`)
}
