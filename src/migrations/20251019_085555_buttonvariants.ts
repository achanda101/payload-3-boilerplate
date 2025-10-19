import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TYPE "public"."enum_grants_hero_buttons_link_type" ADD VALUE 'document';
  ALTER TYPE "public"."enum_grants_blocks_mcol_info_block_multicols_link_type" ADD VALUE 'document';
  ALTER TYPE "public"."enum_grants_blocks_scol_info_blk_col_btns_link_type" ADD VALUE 'document';
  ALTER TYPE "public"."enum_grants_blocks_comparison_blk_buttons_link_type" ADD VALUE 'document';
  ALTER TYPE "public"."enum__grants_v_version_hero_buttons_link_type" ADD VALUE 'document';
  ALTER TYPE "public"."enum__grants_v_blocks_mcol_info_block_multicols_link_type" ADD VALUE 'document';
  ALTER TYPE "public"."enum__grants_v_blocks_scol_info_blk_col_btns_link_type" ADD VALUE 'document';
  ALTER TYPE "public"."enum__grants_v_blocks_comparison_blk_buttons_link_type" ADD VALUE 'document';
  ALTER TYPE "public"."enum_grantcards_card_buttons_link_type" ADD VALUE 'document';
  ALTER TYPE "public"."enum__grantcards_v_version_card_buttons_link_type" ADD VALUE 'document';
  ALTER TYPE "public"."enum_homepage_hero_section_cta_button_link_type" ADD VALUE 'document';
  ALTER TYPE "public"."enum_homepage_blocks_secondarycta_cta_button_link_type" ADD VALUE 'document';
  ALTER TYPE "public"."enum__homepage_v_version_hero_section_cta_button_link_type" ADD VALUE 'document';
  ALTER TYPE "public"."enum__homepage_v_blocks_secondarycta_cta_button_link_type" ADD VALUE 'document';
  ALTER TYPE "public"."enum_nav_menu_items_nav_items_link_type" ADD VALUE 'document';
  ALTER TABLE "grants_rels" ADD COLUMN "documents_id" integer;
  ALTER TABLE "_grants_v_rels" ADD COLUMN "documents_id" integer;
  ALTER TABLE "grantcards_rels" ADD COLUMN "documents_id" integer;
  ALTER TABLE "_grantcards_v_rels" ADD COLUMN "documents_id" integer;
  ALTER TABLE "homepage_rels" ADD COLUMN "documents_id" integer;
  ALTER TABLE "_homepage_v_rels" ADD COLUMN "documents_id" integer;
  ALTER TABLE "nav_rels" ADD COLUMN "documents_id" integer;
  ALTER TABLE "grants_rels" ADD CONSTRAINT "grants_rels_documents_fk" FOREIGN KEY ("documents_id") REFERENCES "public"."documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_grants_v_rels" ADD CONSTRAINT "_grants_v_rels_documents_fk" FOREIGN KEY ("documents_id") REFERENCES "public"."documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "grantcards_rels" ADD CONSTRAINT "grantcards_rels_documents_fk" FOREIGN KEY ("documents_id") REFERENCES "public"."documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_grantcards_v_rels" ADD CONSTRAINT "_grantcards_v_rels_documents_fk" FOREIGN KEY ("documents_id") REFERENCES "public"."documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_rels" ADD CONSTRAINT "homepage_rels_documents_fk" FOREIGN KEY ("documents_id") REFERENCES "public"."documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_homepage_v_rels" ADD CONSTRAINT "_homepage_v_rels_documents_fk" FOREIGN KEY ("documents_id") REFERENCES "public"."documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "nav_rels" ADD CONSTRAINT "nav_rels_documents_fk" FOREIGN KEY ("documents_id") REFERENCES "public"."documents"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "grants_rels_documents_id_idx" ON "grants_rels" USING btree ("documents_id");
  CREATE INDEX "_grants_v_rels_documents_id_idx" ON "_grants_v_rels" USING btree ("documents_id");
  CREATE INDEX "grantcards_rels_documents_id_idx" ON "grantcards_rels" USING btree ("documents_id");
  CREATE INDEX "_grantcards_v_rels_documents_id_idx" ON "_grantcards_v_rels" USING btree ("documents_id");
  CREATE INDEX "homepage_rels_documents_id_idx" ON "homepage_rels" USING btree ("documents_id");
  CREATE INDEX "_homepage_v_rels_documents_id_idx" ON "_homepage_v_rels" USING btree ("documents_id");
  CREATE INDEX "nav_rels_documents_id_idx" ON "nav_rels" USING btree ("documents_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "grants_rels" DROP CONSTRAINT "grants_rels_documents_fk";
  
  ALTER TABLE "_grants_v_rels" DROP CONSTRAINT "_grants_v_rels_documents_fk";
  
  ALTER TABLE "grantcards_rels" DROP CONSTRAINT "grantcards_rels_documents_fk";
  
  ALTER TABLE "_grantcards_v_rels" DROP CONSTRAINT "_grantcards_v_rels_documents_fk";
  
  ALTER TABLE "homepage_rels" DROP CONSTRAINT "homepage_rels_documents_fk";
  
  ALTER TABLE "_homepage_v_rels" DROP CONSTRAINT "_homepage_v_rels_documents_fk";
  
  ALTER TABLE "nav_rels" DROP CONSTRAINT "nav_rels_documents_fk";
  
  ALTER TABLE "grants_hero_buttons" ALTER COLUMN "link_type" SET DATA TYPE text;
  ALTER TABLE "grants_hero_buttons" ALTER COLUMN "link_type" SET DEFAULT 'reference'::text;
  DROP TYPE "public"."enum_grants_hero_buttons_link_type";
  CREATE TYPE "public"."enum_grants_hero_buttons_link_type" AS ENUM('reference', 'custom', 'email');
  ALTER TABLE "grants_hero_buttons" ALTER COLUMN "link_type" SET DEFAULT 'reference'::"public"."enum_grants_hero_buttons_link_type";
  ALTER TABLE "grants_hero_buttons" ALTER COLUMN "link_type" SET DATA TYPE "public"."enum_grants_hero_buttons_link_type" USING "link_type"::"public"."enum_grants_hero_buttons_link_type";
  ALTER TABLE "grants_blocks_mcol_info_block_multicols" ALTER COLUMN "link_type" SET DATA TYPE text;
  ALTER TABLE "grants_blocks_mcol_info_block_multicols" ALTER COLUMN "link_type" SET DEFAULT 'reference'::text;
  DROP TYPE "public"."enum_grants_blocks_mcol_info_block_multicols_link_type";
  CREATE TYPE "public"."enum_grants_blocks_mcol_info_block_multicols_link_type" AS ENUM('reference', 'custom', 'email');
  ALTER TABLE "grants_blocks_mcol_info_block_multicols" ALTER COLUMN "link_type" SET DEFAULT 'reference'::"public"."enum_grants_blocks_mcol_info_block_multicols_link_type";
  ALTER TABLE "grants_blocks_mcol_info_block_multicols" ALTER COLUMN "link_type" SET DATA TYPE "public"."enum_grants_blocks_mcol_info_block_multicols_link_type" USING "link_type"::"public"."enum_grants_blocks_mcol_info_block_multicols_link_type";
  ALTER TABLE "grants_blocks_scol_info_blk_col_btns" ALTER COLUMN "link_type" SET DATA TYPE text;
  ALTER TABLE "grants_blocks_scol_info_blk_col_btns" ALTER COLUMN "link_type" SET DEFAULT 'reference'::text;
  DROP TYPE "public"."enum_grants_blocks_scol_info_blk_col_btns_link_type";
  CREATE TYPE "public"."enum_grants_blocks_scol_info_blk_col_btns_link_type" AS ENUM('reference', 'custom', 'email');
  ALTER TABLE "grants_blocks_scol_info_blk_col_btns" ALTER COLUMN "link_type" SET DEFAULT 'reference'::"public"."enum_grants_blocks_scol_info_blk_col_btns_link_type";
  ALTER TABLE "grants_blocks_scol_info_blk_col_btns" ALTER COLUMN "link_type" SET DATA TYPE "public"."enum_grants_blocks_scol_info_blk_col_btns_link_type" USING "link_type"::"public"."enum_grants_blocks_scol_info_blk_col_btns_link_type";
  ALTER TABLE "grants_blocks_comparison_blk_buttons" ALTER COLUMN "link_type" SET DATA TYPE text;
  ALTER TABLE "grants_blocks_comparison_blk_buttons" ALTER COLUMN "link_type" SET DEFAULT 'reference'::text;
  DROP TYPE "public"."enum_grants_blocks_comparison_blk_buttons_link_type";
  CREATE TYPE "public"."enum_grants_blocks_comparison_blk_buttons_link_type" AS ENUM('reference', 'custom', 'email');
  ALTER TABLE "grants_blocks_comparison_blk_buttons" ALTER COLUMN "link_type" SET DEFAULT 'reference'::"public"."enum_grants_blocks_comparison_blk_buttons_link_type";
  ALTER TABLE "grants_blocks_comparison_blk_buttons" ALTER COLUMN "link_type" SET DATA TYPE "public"."enum_grants_blocks_comparison_blk_buttons_link_type" USING "link_type"::"public"."enum_grants_blocks_comparison_blk_buttons_link_type";
  ALTER TABLE "_grants_v_version_hero_buttons" ALTER COLUMN "link_type" SET DATA TYPE text;
  ALTER TABLE "_grants_v_version_hero_buttons" ALTER COLUMN "link_type" SET DEFAULT 'reference'::text;
  DROP TYPE "public"."enum__grants_v_version_hero_buttons_link_type";
  CREATE TYPE "public"."enum__grants_v_version_hero_buttons_link_type" AS ENUM('reference', 'custom', 'email');
  ALTER TABLE "_grants_v_version_hero_buttons" ALTER COLUMN "link_type" SET DEFAULT 'reference'::"public"."enum__grants_v_version_hero_buttons_link_type";
  ALTER TABLE "_grants_v_version_hero_buttons" ALTER COLUMN "link_type" SET DATA TYPE "public"."enum__grants_v_version_hero_buttons_link_type" USING "link_type"::"public"."enum__grants_v_version_hero_buttons_link_type";
  ALTER TABLE "_grants_v_blocks_mcol_info_block_multicols" ALTER COLUMN "link_type" SET DATA TYPE text;
  ALTER TABLE "_grants_v_blocks_mcol_info_block_multicols" ALTER COLUMN "link_type" SET DEFAULT 'reference'::text;
  DROP TYPE "public"."enum__grants_v_blocks_mcol_info_block_multicols_link_type";
  CREATE TYPE "public"."enum__grants_v_blocks_mcol_info_block_multicols_link_type" AS ENUM('reference', 'custom', 'email');
  ALTER TABLE "_grants_v_blocks_mcol_info_block_multicols" ALTER COLUMN "link_type" SET DEFAULT 'reference'::"public"."enum__grants_v_blocks_mcol_info_block_multicols_link_type";
  ALTER TABLE "_grants_v_blocks_mcol_info_block_multicols" ALTER COLUMN "link_type" SET DATA TYPE "public"."enum__grants_v_blocks_mcol_info_block_multicols_link_type" USING "link_type"::"public"."enum__grants_v_blocks_mcol_info_block_multicols_link_type";
  ALTER TABLE "_grants_v_blocks_scol_info_blk_col_btns" ALTER COLUMN "link_type" SET DATA TYPE text;
  ALTER TABLE "_grants_v_blocks_scol_info_blk_col_btns" ALTER COLUMN "link_type" SET DEFAULT 'reference'::text;
  DROP TYPE "public"."enum__grants_v_blocks_scol_info_blk_col_btns_link_type";
  CREATE TYPE "public"."enum__grants_v_blocks_scol_info_blk_col_btns_link_type" AS ENUM('reference', 'custom', 'email');
  ALTER TABLE "_grants_v_blocks_scol_info_blk_col_btns" ALTER COLUMN "link_type" SET DEFAULT 'reference'::"public"."enum__grants_v_blocks_scol_info_blk_col_btns_link_type";
  ALTER TABLE "_grants_v_blocks_scol_info_blk_col_btns" ALTER COLUMN "link_type" SET DATA TYPE "public"."enum__grants_v_blocks_scol_info_blk_col_btns_link_type" USING "link_type"::"public"."enum__grants_v_blocks_scol_info_blk_col_btns_link_type";
  ALTER TABLE "_grants_v_blocks_comparison_blk_buttons" ALTER COLUMN "link_type" SET DATA TYPE text;
  ALTER TABLE "_grants_v_blocks_comparison_blk_buttons" ALTER COLUMN "link_type" SET DEFAULT 'reference'::text;
  DROP TYPE "public"."enum__grants_v_blocks_comparison_blk_buttons_link_type";
  CREATE TYPE "public"."enum__grants_v_blocks_comparison_blk_buttons_link_type" AS ENUM('reference', 'custom', 'email');
  ALTER TABLE "_grants_v_blocks_comparison_blk_buttons" ALTER COLUMN "link_type" SET DEFAULT 'reference'::"public"."enum__grants_v_blocks_comparison_blk_buttons_link_type";
  ALTER TABLE "_grants_v_blocks_comparison_blk_buttons" ALTER COLUMN "link_type" SET DATA TYPE "public"."enum__grants_v_blocks_comparison_blk_buttons_link_type" USING "link_type"::"public"."enum__grants_v_blocks_comparison_blk_buttons_link_type";
  ALTER TABLE "grantcards_card_buttons" ALTER COLUMN "link_type" SET DATA TYPE text;
  ALTER TABLE "grantcards_card_buttons" ALTER COLUMN "link_type" SET DEFAULT 'reference'::text;
  DROP TYPE "public"."enum_grantcards_card_buttons_link_type";
  CREATE TYPE "public"."enum_grantcards_card_buttons_link_type" AS ENUM('reference', 'custom', 'email');
  ALTER TABLE "grantcards_card_buttons" ALTER COLUMN "link_type" SET DEFAULT 'reference'::"public"."enum_grantcards_card_buttons_link_type";
  ALTER TABLE "grantcards_card_buttons" ALTER COLUMN "link_type" SET DATA TYPE "public"."enum_grantcards_card_buttons_link_type" USING "link_type"::"public"."enum_grantcards_card_buttons_link_type";
  ALTER TABLE "_grantcards_v_version_card_buttons" ALTER COLUMN "link_type" SET DATA TYPE text;
  ALTER TABLE "_grantcards_v_version_card_buttons" ALTER COLUMN "link_type" SET DEFAULT 'reference'::text;
  DROP TYPE "public"."enum__grantcards_v_version_card_buttons_link_type";
  CREATE TYPE "public"."enum__grantcards_v_version_card_buttons_link_type" AS ENUM('reference', 'custom', 'email');
  ALTER TABLE "_grantcards_v_version_card_buttons" ALTER COLUMN "link_type" SET DEFAULT 'reference'::"public"."enum__grantcards_v_version_card_buttons_link_type";
  ALTER TABLE "_grantcards_v_version_card_buttons" ALTER COLUMN "link_type" SET DATA TYPE "public"."enum__grantcards_v_version_card_buttons_link_type" USING "link_type"::"public"."enum__grantcards_v_version_card_buttons_link_type";
  ALTER TABLE "homepage_hero_section_cta_button" ALTER COLUMN "link_type" SET DATA TYPE text;
  ALTER TABLE "homepage_hero_section_cta_button" ALTER COLUMN "link_type" SET DEFAULT 'reference'::text;
  DROP TYPE "public"."enum_homepage_hero_section_cta_button_link_type";
  CREATE TYPE "public"."enum_homepage_hero_section_cta_button_link_type" AS ENUM('reference', 'custom', 'email');
  ALTER TABLE "homepage_hero_section_cta_button" ALTER COLUMN "link_type" SET DEFAULT 'reference'::"public"."enum_homepage_hero_section_cta_button_link_type";
  ALTER TABLE "homepage_hero_section_cta_button" ALTER COLUMN "link_type" SET DATA TYPE "public"."enum_homepage_hero_section_cta_button_link_type" USING "link_type"::"public"."enum_homepage_hero_section_cta_button_link_type";
  ALTER TABLE "homepage_blocks_secondarycta_cta_button" ALTER COLUMN "link_type" SET DATA TYPE text;
  ALTER TABLE "homepage_blocks_secondarycta_cta_button" ALTER COLUMN "link_type" SET DEFAULT 'reference'::text;
  DROP TYPE "public"."enum_homepage_blocks_secondarycta_cta_button_link_type";
  CREATE TYPE "public"."enum_homepage_blocks_secondarycta_cta_button_link_type" AS ENUM('reference', 'custom', 'email');
  ALTER TABLE "homepage_blocks_secondarycta_cta_button" ALTER COLUMN "link_type" SET DEFAULT 'reference'::"public"."enum_homepage_blocks_secondarycta_cta_button_link_type";
  ALTER TABLE "homepage_blocks_secondarycta_cta_button" ALTER COLUMN "link_type" SET DATA TYPE "public"."enum_homepage_blocks_secondarycta_cta_button_link_type" USING "link_type"::"public"."enum_homepage_blocks_secondarycta_cta_button_link_type";
  ALTER TABLE "_homepage_v_version_hero_section_cta_button" ALTER COLUMN "link_type" SET DATA TYPE text;
  ALTER TABLE "_homepage_v_version_hero_section_cta_button" ALTER COLUMN "link_type" SET DEFAULT 'reference'::text;
  DROP TYPE "public"."enum__homepage_v_version_hero_section_cta_button_link_type";
  CREATE TYPE "public"."enum__homepage_v_version_hero_section_cta_button_link_type" AS ENUM('reference', 'custom', 'email');
  ALTER TABLE "_homepage_v_version_hero_section_cta_button" ALTER COLUMN "link_type" SET DEFAULT 'reference'::"public"."enum__homepage_v_version_hero_section_cta_button_link_type";
  ALTER TABLE "_homepage_v_version_hero_section_cta_button" ALTER COLUMN "link_type" SET DATA TYPE "public"."enum__homepage_v_version_hero_section_cta_button_link_type" USING "link_type"::"public"."enum__homepage_v_version_hero_section_cta_button_link_type";
  ALTER TABLE "_homepage_v_blocks_secondarycta_cta_button" ALTER COLUMN "link_type" SET DATA TYPE text;
  ALTER TABLE "_homepage_v_blocks_secondarycta_cta_button" ALTER COLUMN "link_type" SET DEFAULT 'reference'::text;
  DROP TYPE "public"."enum__homepage_v_blocks_secondarycta_cta_button_link_type";
  CREATE TYPE "public"."enum__homepage_v_blocks_secondarycta_cta_button_link_type" AS ENUM('reference', 'custom', 'email');
  ALTER TABLE "_homepage_v_blocks_secondarycta_cta_button" ALTER COLUMN "link_type" SET DEFAULT 'reference'::"public"."enum__homepage_v_blocks_secondarycta_cta_button_link_type";
  ALTER TABLE "_homepage_v_blocks_secondarycta_cta_button" ALTER COLUMN "link_type" SET DATA TYPE "public"."enum__homepage_v_blocks_secondarycta_cta_button_link_type" USING "link_type"::"public"."enum__homepage_v_blocks_secondarycta_cta_button_link_type";
  ALTER TABLE "nav_menu_items_nav_items" ALTER COLUMN "link_type" SET DATA TYPE text;
  ALTER TABLE "nav_menu_items_nav_items" ALTER COLUMN "link_type" SET DEFAULT 'reference'::text;
  DROP TYPE "public"."enum_nav_menu_items_nav_items_link_type";
  CREATE TYPE "public"."enum_nav_menu_items_nav_items_link_type" AS ENUM('reference', 'custom', 'email');
  ALTER TABLE "nav_menu_items_nav_items" ALTER COLUMN "link_type" SET DEFAULT 'reference'::"public"."enum_nav_menu_items_nav_items_link_type";
  ALTER TABLE "nav_menu_items_nav_items" ALTER COLUMN "link_type" SET DATA TYPE "public"."enum_nav_menu_items_nav_items_link_type" USING "link_type"::"public"."enum_nav_menu_items_nav_items_link_type";
  DROP INDEX "grants_rels_documents_id_idx";
  DROP INDEX "_grants_v_rels_documents_id_idx";
  DROP INDEX "grantcards_rels_documents_id_idx";
  DROP INDEX "_grantcards_v_rels_documents_id_idx";
  DROP INDEX "homepage_rels_documents_id_idx";
  DROP INDEX "_homepage_v_rels_documents_id_idx";
  DROP INDEX "nav_rels_documents_id_idx";
  ALTER TABLE "grants_rels" DROP COLUMN "documents_id";
  ALTER TABLE "_grants_v_rels" DROP COLUMN "documents_id";
  ALTER TABLE "grantcards_rels" DROP COLUMN "documents_id";
  ALTER TABLE "_grantcards_v_rels" DROP COLUMN "documents_id";
  ALTER TABLE "homepage_rels" DROP COLUMN "documents_id";
  ALTER TABLE "_homepage_v_rels" DROP COLUMN "documents_id";
  ALTER TABLE "nav_rels" DROP COLUMN "documents_id";`)
}
