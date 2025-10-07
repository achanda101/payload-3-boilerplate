import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "grants_blocks_mcol_info_block_multicols_locales" ALTER COLUMN "col_content" SET DATA TYPE varchar;
  ALTER TABLE "_grants_v_blocks_mcol_info_block_multicols_locales" ALTER COLUMN "col_content" SET DATA TYPE varchar;
  ALTER TABLE "grants_hero_buttons" ADD COLUMN "link_arrow_link" boolean;
  ALTER TABLE "grants_blocks_mcol_info_block_multicols" ADD COLUMN "link_arrow_link" boolean;
  ALTER TABLE "_grants_v_version_hero_buttons" ADD COLUMN "link_arrow_link" boolean;
  ALTER TABLE "_grants_v_blocks_mcol_info_block_multicols" ADD COLUMN "link_arrow_link" boolean;
  ALTER TABLE "grantcards_card_buttons" ADD COLUMN "link_arrow_link" boolean;
  ALTER TABLE "_grantcards_v_version_card_buttons" ADD COLUMN "link_arrow_link" boolean;
  ALTER TABLE "homepage_hero_section_cta_button" ADD COLUMN "link_arrow_link" boolean;
  ALTER TABLE "homepage_blocks_secondarycta_cta_button" ADD COLUMN "link_arrow_link" boolean;
  ALTER TABLE "_homepage_v_version_hero_section_cta_button" ADD COLUMN "link_arrow_link" boolean;
  ALTER TABLE "_homepage_v_blocks_secondarycta_cta_button" ADD COLUMN "link_arrow_link" boolean;
  ALTER TABLE "nav_menu_items_nav_items" ADD COLUMN "link_arrow_link" boolean;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "grants_blocks_mcol_info_block_multicols_locales" ALTER COLUMN "col_content" SET DATA TYPE jsonb;
  ALTER TABLE "_grants_v_blocks_mcol_info_block_multicols_locales" ALTER COLUMN "col_content" SET DATA TYPE jsonb;
  ALTER TABLE "grants_hero_buttons" DROP COLUMN "link_arrow_link";
  ALTER TABLE "grants_blocks_mcol_info_block_multicols" DROP COLUMN "link_arrow_link";
  ALTER TABLE "_grants_v_version_hero_buttons" DROP COLUMN "link_arrow_link";
  ALTER TABLE "_grants_v_blocks_mcol_info_block_multicols" DROP COLUMN "link_arrow_link";
  ALTER TABLE "grantcards_card_buttons" DROP COLUMN "link_arrow_link";
  ALTER TABLE "_grantcards_v_version_card_buttons" DROP COLUMN "link_arrow_link";
  ALTER TABLE "homepage_hero_section_cta_button" DROP COLUMN "link_arrow_link";
  ALTER TABLE "homepage_blocks_secondarycta_cta_button" DROP COLUMN "link_arrow_link";
  ALTER TABLE "_homepage_v_version_hero_section_cta_button" DROP COLUMN "link_arrow_link";
  ALTER TABLE "_homepage_v_blocks_secondarycta_cta_button" DROP COLUMN "link_arrow_link";
  ALTER TABLE "nav_menu_items_nav_items" DROP COLUMN "link_arrow_link";`)
}
