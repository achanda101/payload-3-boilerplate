import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_grants_blocks_ylw_deck_align" AS ENUM('left', 'center');
  CREATE TYPE "public"."enum__grants_v_blocks_ylw_deck_align" AS ENUM('left', 'center');
  CREATE TYPE "public"."enum_homepage_blocks_ylw_deck_align" AS ENUM('left', 'center');
  CREATE TYPE "public"."enum__homepage_v_blocks_ylw_deck_align" AS ENUM('left', 'center');
  ALTER TABLE "grants_blocks_ylw_deck_locales" ALTER COLUMN "desc" SET DATA TYPE jsonb;
  ALTER TABLE "grants_blocks_feat_crd_locales" ALTER COLUMN "desc" SET DATA TYPE jsonb;
  ALTER TABLE "_grants_v_blocks_ylw_deck_locales" ALTER COLUMN "desc" SET DATA TYPE jsonb;
  ALTER TABLE "_grants_v_blocks_feat_crd_locales" ALTER COLUMN "desc" SET DATA TYPE jsonb;
  ALTER TABLE "homepage_blocks_ylw_deck_locales" ALTER COLUMN "desc" SET DATA TYPE jsonb;
  ALTER TABLE "homepage_blocks_feat_crd_locales" ALTER COLUMN "desc" SET DATA TYPE jsonb;
  ALTER TABLE "_homepage_v_blocks_ylw_deck_locales" ALTER COLUMN "desc" SET DATA TYPE jsonb;
  ALTER TABLE "_homepage_v_blocks_feat_crd_locales" ALTER COLUMN "desc" SET DATA TYPE jsonb;
  ALTER TABLE "grants_blocks_ylw_deck" ADD COLUMN "align" "enum_grants_blocks_ylw_deck_align" DEFAULT 'center';
  ALTER TABLE "_grants_v_blocks_ylw_deck" ADD COLUMN "align" "enum__grants_v_blocks_ylw_deck_align" DEFAULT 'center';
  ALTER TABLE "homepage_blocks_ylw_deck" ADD COLUMN "align" "enum_homepage_blocks_ylw_deck_align" DEFAULT 'center';
  ALTER TABLE "_homepage_v_blocks_ylw_deck" ADD COLUMN "align" "enum__homepage_v_blocks_ylw_deck_align" DEFAULT 'center';`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "grants_blocks_ylw_deck_locales" ALTER COLUMN "desc" SET DATA TYPE varchar;
  ALTER TABLE "grants_blocks_feat_crd_locales" ALTER COLUMN "desc" SET DATA TYPE varchar;
  ALTER TABLE "_grants_v_blocks_ylw_deck_locales" ALTER COLUMN "desc" SET DATA TYPE varchar;
  ALTER TABLE "_grants_v_blocks_feat_crd_locales" ALTER COLUMN "desc" SET DATA TYPE varchar;
  ALTER TABLE "homepage_blocks_ylw_deck_locales" ALTER COLUMN "desc" SET DATA TYPE varchar;
  ALTER TABLE "homepage_blocks_feat_crd_locales" ALTER COLUMN "desc" SET DATA TYPE varchar;
  ALTER TABLE "_homepage_v_blocks_ylw_deck_locales" ALTER COLUMN "desc" SET DATA TYPE varchar;
  ALTER TABLE "_homepage_v_blocks_feat_crd_locales" ALTER COLUMN "desc" SET DATA TYPE varchar;
  ALTER TABLE "grants_blocks_ylw_deck" DROP COLUMN "align";
  ALTER TABLE "_grants_v_blocks_ylw_deck" DROP COLUMN "align";
  ALTER TABLE "homepage_blocks_ylw_deck" DROP COLUMN "align";
  ALTER TABLE "_homepage_v_blocks_ylw_deck" DROP COLUMN "align";
  DROP TYPE "public"."enum_grants_blocks_ylw_deck_align";
  DROP TYPE "public"."enum__grants_v_blocks_ylw_deck_align";
  DROP TYPE "public"."enum_homepage_blocks_ylw_deck_align";
  DROP TYPE "public"."enum__homepage_v_blocks_ylw_deck_align";`)
}
