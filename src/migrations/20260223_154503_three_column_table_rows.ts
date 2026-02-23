import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "grants_blocks_three_column_table_block_rows" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "grants_blocks_three_column_table_block_rows_locales" (
  	"first_column" jsonb,
  	"second_column" jsonb,
  	"third_column" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "_grants_v_blocks_three_column_table_block_rows" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_grants_v_blocks_three_column_table_block_rows_locales" (
  	"first_column" jsonb,
  	"second_column" jsonb,
  	"third_column" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "pages_blocks_three_column_table_block_rows" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "pages_blocks_three_column_table_block_rows_locales" (
  	"first_column" jsonb,
  	"second_column" jsonb,
  	"third_column" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_three_column_table_block_rows" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_three_column_table_block_rows_locales" (
  	"first_column" jsonb,
  	"second_column" jsonb,
  	"third_column" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "blog_blocks_three_column_table_block_rows" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "blog_blocks_three_column_table_block_rows_locales" (
  	"first_column" jsonb,
  	"second_column" jsonb,
  	"third_column" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "_blog_v_blocks_three_column_table_block_rows" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_blog_v_blocks_three_column_table_block_rows_locales" (
  	"first_column" jsonb,
  	"second_column" jsonb,
  	"third_column" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "reports_blocks_three_column_table_block_rows" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "reports_blocks_three_column_table_block_rows_locales" (
  	"first_column" jsonb,
  	"second_column" jsonb,
  	"third_column" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "_reports_v_blocks_three_column_table_block_rows" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_reports_v_blocks_three_column_table_block_rows_locales" (
  	"first_column" jsonb,
  	"second_column" jsonb,
  	"third_column" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "mmedia_blocks_three_column_table_block_rows" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "mmedia_blocks_three_column_table_block_rows_locales" (
  	"first_column" jsonb,
  	"second_column" jsonb,
  	"third_column" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "_mmedia_v_blocks_three_column_table_block_rows" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_mmedia_v_blocks_three_column_table_block_rows_locales" (
  	"first_column" jsonb,
  	"second_column" jsonb,
  	"third_column" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "homepage_blocks_three_column_table_block_rows" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "homepage_blocks_three_column_table_block_rows_locales" (
  	"first_column" jsonb,
  	"second_column" jsonb,
  	"third_column" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "_homepage_v_blocks_three_column_table_block_rows" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_homepage_v_blocks_three_column_table_block_rows_locales" (
  	"first_column" jsonb,
  	"second_column" jsonb,
  	"third_column" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  ALTER TABLE "users" ALTER COLUMN "role" SET DEFAULT 'editor';
  ALTER TABLE "grants_hero_buttons" ADD COLUMN "link_anchor" varchar;
  ALTER TABLE "grants_blocks_secondarycta_cta_button" ADD COLUMN "link_anchor" varchar;
  ALTER TABLE "grants_blocks_mcol_info_block_multicols" ADD COLUMN "link_anchor" varchar;
  ALTER TABLE "grants_blocks_comparison_blk_buttons" ADD COLUMN "link_anchor" varchar;
  ALTER TABLE "grants_blocks_ylw_deck_cards_links" ADD COLUMN "link_anchor" varchar;
  ALTER TABLE "grants_blocks_feat_crd" ADD COLUMN "link_anchor" varchar;
  ALTER TABLE "grants_blocks_list_crd_dck_cards" ADD COLUMN "link_anchor" varchar;
  ALTER TABLE "grants_blocks_list_crd_dck_buttons" ADD COLUMN "link_anchor" varchar;
  ALTER TABLE "grants_blocks_faq_blk" ADD COLUMN "link_anchor" varchar;
  ALTER TABLE "grants_blocks_pink_puffy_links" ADD COLUMN "link_anchor" varchar;
  ALTER TABLE "_grants_v_version_hero_buttons" ADD COLUMN "link_anchor" varchar;
  ALTER TABLE "_grants_v_blocks_secondarycta_cta_button" ADD COLUMN "link_anchor" varchar;
  ALTER TABLE "_grants_v_blocks_mcol_info_block_multicols" ADD COLUMN "link_anchor" varchar;
  ALTER TABLE "_grants_v_blocks_comparison_blk_buttons" ADD COLUMN "link_anchor" varchar;
  ALTER TABLE "_grants_v_blocks_ylw_deck_cards_links" ADD COLUMN "link_anchor" varchar;
  ALTER TABLE "_grants_v_blocks_feat_crd" ADD COLUMN "link_anchor" varchar;
  ALTER TABLE "_grants_v_blocks_list_crd_dck_cards" ADD COLUMN "link_anchor" varchar;
  ALTER TABLE "_grants_v_blocks_list_crd_dck_buttons" ADD COLUMN "link_anchor" varchar;
  ALTER TABLE "_grants_v_blocks_faq_blk" ADD COLUMN "link_anchor" varchar;
  ALTER TABLE "_grants_v_blocks_pink_puffy_links" ADD COLUMN "link_anchor" varchar;
  ALTER TABLE "grantcards_card_buttons" ADD COLUMN "link_anchor" varchar;
  ALTER TABLE "_grantcards_v_version_card_buttons" ADD COLUMN "link_anchor" varchar;
  ALTER TABLE "etests" ADD COLUMN "is_e_card_is_e_link_link_anchor" varchar;
  ALTER TABLE "etests" ADD COLUMN "not_e_card_not_e_link_link_anchor" varchar;
  ALTER TABLE "_etests_v" ADD COLUMN "version_is_e_card_is_e_link_link_anchor" varchar;
  ALTER TABLE "_etests_v" ADD COLUMN "version_not_e_card_not_e_link_link_anchor" varchar;
  ALTER TABLE "pages_hero_buttons" ADD COLUMN "link_anchor" varchar;
  ALTER TABLE "pages_blocks_secondarycta_cta_button" ADD COLUMN "link_anchor" varchar;
  ALTER TABLE "pages_blocks_mcol_info_block_multicols" ADD COLUMN "link_anchor" varchar;
  ALTER TABLE "pages_blocks_comparison_blk_buttons" ADD COLUMN "link_anchor" varchar;
  ALTER TABLE "pages_blocks_ylw_deck_cards_links" ADD COLUMN "link_anchor" varchar;
  ALTER TABLE "pages_blocks_feat_crd" ADD COLUMN "link_anchor" varchar;
  ALTER TABLE "pages_blocks_list_crd_dck_cards" ADD COLUMN "link_anchor" varchar;
  ALTER TABLE "pages_blocks_list_crd_dck_buttons" ADD COLUMN "link_anchor" varchar;
  ALTER TABLE "pages_blocks_faq_blk" ADD COLUMN "link_anchor" varchar;
  ALTER TABLE "pages_blocks_pink_puffy_links" ADD COLUMN "link_anchor" varchar;
  ALTER TABLE "_pages_v_version_hero_buttons" ADD COLUMN "link_anchor" varchar;
  ALTER TABLE "_pages_v_blocks_secondarycta_cta_button" ADD COLUMN "link_anchor" varchar;
  ALTER TABLE "_pages_v_blocks_mcol_info_block_multicols" ADD COLUMN "link_anchor" varchar;
  ALTER TABLE "_pages_v_blocks_comparison_blk_buttons" ADD COLUMN "link_anchor" varchar;
  ALTER TABLE "_pages_v_blocks_ylw_deck_cards_links" ADD COLUMN "link_anchor" varchar;
  ALTER TABLE "_pages_v_blocks_feat_crd" ADD COLUMN "link_anchor" varchar;
  ALTER TABLE "_pages_v_blocks_list_crd_dck_cards" ADD COLUMN "link_anchor" varchar;
  ALTER TABLE "_pages_v_blocks_list_crd_dck_buttons" ADD COLUMN "link_anchor" varchar;
  ALTER TABLE "_pages_v_blocks_faq_blk" ADD COLUMN "link_anchor" varchar;
  ALTER TABLE "_pages_v_blocks_pink_puffy_links" ADD COLUMN "link_anchor" varchar;
  ALTER TABLE "blog_hero_buttons" ADD COLUMN "link_anchor" varchar;
  ALTER TABLE "blog_blocks_secondarycta_cta_button" ADD COLUMN "link_anchor" varchar;
  ALTER TABLE "blog_blocks_mcol_info_block_multicols" ADD COLUMN "link_anchor" varchar;
  ALTER TABLE "blog_blocks_comparison_blk_buttons" ADD COLUMN "link_anchor" varchar;
  ALTER TABLE "blog_blocks_ylw_deck_cards_links" ADD COLUMN "link_anchor" varchar;
  ALTER TABLE "blog_blocks_feat_crd" ADD COLUMN "link_anchor" varchar;
  ALTER TABLE "blog_blocks_list_crd_dck_cards" ADD COLUMN "link_anchor" varchar;
  ALTER TABLE "blog_blocks_list_crd_dck_buttons" ADD COLUMN "link_anchor" varchar;
  ALTER TABLE "blog_blocks_faq_blk" ADD COLUMN "link_anchor" varchar;
  ALTER TABLE "blog_blocks_pink_puffy_links" ADD COLUMN "link_anchor" varchar;
  ALTER TABLE "_blog_v_version_hero_buttons" ADD COLUMN "link_anchor" varchar;
  ALTER TABLE "_blog_v_blocks_secondarycta_cta_button" ADD COLUMN "link_anchor" varchar;
  ALTER TABLE "_blog_v_blocks_mcol_info_block_multicols" ADD COLUMN "link_anchor" varchar;
  ALTER TABLE "_blog_v_blocks_comparison_blk_buttons" ADD COLUMN "link_anchor" varchar;
  ALTER TABLE "_blog_v_blocks_ylw_deck_cards_links" ADD COLUMN "link_anchor" varchar;
  ALTER TABLE "_blog_v_blocks_feat_crd" ADD COLUMN "link_anchor" varchar;
  ALTER TABLE "_blog_v_blocks_list_crd_dck_cards" ADD COLUMN "link_anchor" varchar;
  ALTER TABLE "_blog_v_blocks_list_crd_dck_buttons" ADD COLUMN "link_anchor" varchar;
  ALTER TABLE "_blog_v_blocks_faq_blk" ADD COLUMN "link_anchor" varchar;
  ALTER TABLE "_blog_v_blocks_pink_puffy_links" ADD COLUMN "link_anchor" varchar;
  ALTER TABLE "reports_hero_buttons" ADD COLUMN "link_anchor" varchar;
  ALTER TABLE "reports_blocks_secondarycta_cta_button" ADD COLUMN "link_anchor" varchar;
  ALTER TABLE "reports_blocks_mcol_info_block_multicols" ADD COLUMN "link_anchor" varchar;
  ALTER TABLE "reports_blocks_comparison_blk_buttons" ADD COLUMN "link_anchor" varchar;
  ALTER TABLE "reports_blocks_ylw_deck_cards_links" ADD COLUMN "link_anchor" varchar;
  ALTER TABLE "reports_blocks_feat_crd" ADD COLUMN "link_anchor" varchar;
  ALTER TABLE "reports_blocks_list_crd_dck_cards" ADD COLUMN "link_anchor" varchar;
  ALTER TABLE "reports_blocks_list_crd_dck_buttons" ADD COLUMN "link_anchor" varchar;
  ALTER TABLE "reports_blocks_faq_blk" ADD COLUMN "link_anchor" varchar;
  ALTER TABLE "reports_blocks_pink_puffy_links" ADD COLUMN "link_anchor" varchar;
  ALTER TABLE "_reports_v_version_hero_buttons" ADD COLUMN "link_anchor" varchar;
  ALTER TABLE "_reports_v_blocks_secondarycta_cta_button" ADD COLUMN "link_anchor" varchar;
  ALTER TABLE "_reports_v_blocks_mcol_info_block_multicols" ADD COLUMN "link_anchor" varchar;
  ALTER TABLE "_reports_v_blocks_comparison_blk_buttons" ADD COLUMN "link_anchor" varchar;
  ALTER TABLE "_reports_v_blocks_ylw_deck_cards_links" ADD COLUMN "link_anchor" varchar;
  ALTER TABLE "_reports_v_blocks_feat_crd" ADD COLUMN "link_anchor" varchar;
  ALTER TABLE "_reports_v_blocks_list_crd_dck_cards" ADD COLUMN "link_anchor" varchar;
  ALTER TABLE "_reports_v_blocks_list_crd_dck_buttons" ADD COLUMN "link_anchor" varchar;
  ALTER TABLE "_reports_v_blocks_faq_blk" ADD COLUMN "link_anchor" varchar;
  ALTER TABLE "_reports_v_blocks_pink_puffy_links" ADD COLUMN "link_anchor" varchar;
  ALTER TABLE "mmedia_hero_buttons" ADD COLUMN "link_anchor" varchar;
  ALTER TABLE "mmedia_blocks_secondarycta_cta_button" ADD COLUMN "link_anchor" varchar;
  ALTER TABLE "mmedia_blocks_mcol_info_block_multicols" ADD COLUMN "link_anchor" varchar;
  ALTER TABLE "mmedia_blocks_comparison_blk_buttons" ADD COLUMN "link_anchor" varchar;
  ALTER TABLE "mmedia_blocks_ylw_deck_cards_links" ADD COLUMN "link_anchor" varchar;
  ALTER TABLE "mmedia_blocks_feat_crd" ADD COLUMN "link_anchor" varchar;
  ALTER TABLE "mmedia_blocks_list_crd_dck_cards" ADD COLUMN "link_anchor" varchar;
  ALTER TABLE "mmedia_blocks_list_crd_dck_buttons" ADD COLUMN "link_anchor" varchar;
  ALTER TABLE "mmedia_blocks_faq_blk" ADD COLUMN "link_anchor" varchar;
  ALTER TABLE "mmedia_blocks_pink_puffy_links" ADD COLUMN "link_anchor" varchar;
  ALTER TABLE "_mmedia_v_version_hero_buttons" ADD COLUMN "link_anchor" varchar;
  ALTER TABLE "_mmedia_v_blocks_secondarycta_cta_button" ADD COLUMN "link_anchor" varchar;
  ALTER TABLE "_mmedia_v_blocks_mcol_info_block_multicols" ADD COLUMN "link_anchor" varchar;
  ALTER TABLE "_mmedia_v_blocks_comparison_blk_buttons" ADD COLUMN "link_anchor" varchar;
  ALTER TABLE "_mmedia_v_blocks_ylw_deck_cards_links" ADD COLUMN "link_anchor" varchar;
  ALTER TABLE "_mmedia_v_blocks_feat_crd" ADD COLUMN "link_anchor" varchar;
  ALTER TABLE "_mmedia_v_blocks_list_crd_dck_cards" ADD COLUMN "link_anchor" varchar;
  ALTER TABLE "_mmedia_v_blocks_list_crd_dck_buttons" ADD COLUMN "link_anchor" varchar;
  ALTER TABLE "_mmedia_v_blocks_faq_blk" ADD COLUMN "link_anchor" varchar;
  ALTER TABLE "_mmedia_v_blocks_pink_puffy_links" ADD COLUMN "link_anchor" varchar;
  ALTER TABLE "users" ADD COLUMN "totp_secret" varchar;
  ALTER TABLE "homepage_cta_button" ADD COLUMN "link_anchor" varchar;
  ALTER TABLE "homepage_blocks_secondarycta_cta_button" ADD COLUMN "link_anchor" varchar;
  ALTER TABLE "homepage_blocks_mcol_info_block_multicols" ADD COLUMN "link_anchor" varchar;
  ALTER TABLE "homepage_blocks_comparison_blk_buttons" ADD COLUMN "link_anchor" varchar;
  ALTER TABLE "homepage_blocks_ylw_deck_cards_links" ADD COLUMN "link_anchor" varchar;
  ALTER TABLE "homepage_blocks_feat_crd" ADD COLUMN "link_anchor" varchar;
  ALTER TABLE "homepage_blocks_list_crd_dck_cards" ADD COLUMN "link_anchor" varchar;
  ALTER TABLE "homepage_blocks_list_crd_dck_buttons" ADD COLUMN "link_anchor" varchar;
  ALTER TABLE "homepage_blocks_faq_blk" ADD COLUMN "link_anchor" varchar;
  ALTER TABLE "homepage_blocks_pink_puffy_links" ADD COLUMN "link_anchor" varchar;
  ALTER TABLE "_homepage_v_version_cta_button" ADD COLUMN "link_anchor" varchar;
  ALTER TABLE "_homepage_v_blocks_secondarycta_cta_button" ADD COLUMN "link_anchor" varchar;
  ALTER TABLE "_homepage_v_blocks_mcol_info_block_multicols" ADD COLUMN "link_anchor" varchar;
  ALTER TABLE "_homepage_v_blocks_comparison_blk_buttons" ADD COLUMN "link_anchor" varchar;
  ALTER TABLE "_homepage_v_blocks_ylw_deck_cards_links" ADD COLUMN "link_anchor" varchar;
  ALTER TABLE "_homepage_v_blocks_feat_crd" ADD COLUMN "link_anchor" varchar;
  ALTER TABLE "_homepage_v_blocks_list_crd_dck_cards" ADD COLUMN "link_anchor" varchar;
  ALTER TABLE "_homepage_v_blocks_list_crd_dck_buttons" ADD COLUMN "link_anchor" varchar;
  ALTER TABLE "_homepage_v_blocks_faq_blk" ADD COLUMN "link_anchor" varchar;
  ALTER TABLE "_homepage_v_blocks_pink_puffy_links" ADD COLUMN "link_anchor" varchar;
  ALTER TABLE "header" ADD COLUMN "banner_link_anchor" varchar;
  ALTER TABLE "nav_menu_items_nav_items" ADD COLUMN "link_anchor" varchar;
  ALTER TABLE "grants_blocks_three_column_table_block_rows" ADD CONSTRAINT "grants_blocks_three_column_table_block_rows_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."grants_blocks_three_column_table_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "grants_blocks_three_column_table_block_rows_locales" ADD CONSTRAINT "grants_blocks_three_column_table_block_rows_locales_paren_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."grants_blocks_three_column_table_block_rows"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_grants_v_blocks_three_column_table_block_rows" ADD CONSTRAINT "_grants_v_blocks_three_column_table_block_rows_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_grants_v_blocks_three_column_table_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_grants_v_blocks_three_column_table_block_rows_locales" ADD CONSTRAINT "_grants_v_blocks_three_column_table_block_rows_locales_pa_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_grants_v_blocks_three_column_table_block_rows"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_three_column_table_block_rows" ADD CONSTRAINT "pages_blocks_three_column_table_block_rows_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_three_column_table_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_three_column_table_block_rows_locales" ADD CONSTRAINT "pages_blocks_three_column_table_block_rows_locales_parent_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_three_column_table_block_rows"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_three_column_table_block_rows" ADD CONSTRAINT "_pages_v_blocks_three_column_table_block_rows_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_three_column_table_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_three_column_table_block_rows_locales" ADD CONSTRAINT "_pages_v_blocks_three_column_table_block_rows_locales_par_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_three_column_table_block_rows"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "blog_blocks_three_column_table_block_rows" ADD CONSTRAINT "blog_blocks_three_column_table_block_rows_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."blog_blocks_three_column_table_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "blog_blocks_three_column_table_block_rows_locales" ADD CONSTRAINT "blog_blocks_three_column_table_block_rows_locales_parent__fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."blog_blocks_three_column_table_block_rows"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_blog_v_blocks_three_column_table_block_rows" ADD CONSTRAINT "_blog_v_blocks_three_column_table_block_rows_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_blog_v_blocks_three_column_table_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_blog_v_blocks_three_column_table_block_rows_locales" ADD CONSTRAINT "_blog_v_blocks_three_column_table_block_rows_locales_pare_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_blog_v_blocks_three_column_table_block_rows"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "reports_blocks_three_column_table_block_rows" ADD CONSTRAINT "reports_blocks_three_column_table_block_rows_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."reports_blocks_three_column_table_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "reports_blocks_three_column_table_block_rows_locales" ADD CONSTRAINT "reports_blocks_three_column_table_block_rows_locales_pare_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."reports_blocks_three_column_table_block_rows"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_reports_v_blocks_three_column_table_block_rows" ADD CONSTRAINT "_reports_v_blocks_three_column_table_block_rows_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_reports_v_blocks_three_column_table_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_reports_v_blocks_three_column_table_block_rows_locales" ADD CONSTRAINT "_reports_v_blocks_three_column_table_block_rows_locales_p_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_reports_v_blocks_three_column_table_block_rows"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "mmedia_blocks_three_column_table_block_rows" ADD CONSTRAINT "mmedia_blocks_three_column_table_block_rows_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."mmedia_blocks_three_column_table_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "mmedia_blocks_three_column_table_block_rows_locales" ADD CONSTRAINT "mmedia_blocks_three_column_table_block_rows_locales_paren_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."mmedia_blocks_three_column_table_block_rows"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_mmedia_v_blocks_three_column_table_block_rows" ADD CONSTRAINT "_mmedia_v_blocks_three_column_table_block_rows_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_mmedia_v_blocks_three_column_table_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_mmedia_v_blocks_three_column_table_block_rows_locales" ADD CONSTRAINT "_mmedia_v_blocks_three_column_table_block_rows_locales_pa_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_mmedia_v_blocks_three_column_table_block_rows"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_blocks_three_column_table_block_rows" ADD CONSTRAINT "homepage_blocks_three_column_table_block_rows_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage_blocks_three_column_table_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_blocks_three_column_table_block_rows_locales" ADD CONSTRAINT "homepage_blocks_three_column_table_block_rows_locales_par_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage_blocks_three_column_table_block_rows"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_homepage_v_blocks_three_column_table_block_rows" ADD CONSTRAINT "_homepage_v_blocks_three_column_table_block_rows_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_homepage_v_blocks_three_column_table_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_homepage_v_blocks_three_column_table_block_rows_locales" ADD CONSTRAINT "_homepage_v_blocks_three_column_table_block_rows_locales__fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_homepage_v_blocks_three_column_table_block_rows"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "grants_blocks_three_column_table_block_rows_order_idx" ON "grants_blocks_three_column_table_block_rows" USING btree ("_order");
  CREATE INDEX "grants_blocks_three_column_table_block_rows_parent_id_idx" ON "grants_blocks_three_column_table_block_rows" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "grants_blocks_three_column_table_block_rows_locales_locale_p" ON "grants_blocks_three_column_table_block_rows_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_grants_v_blocks_three_column_table_block_rows_order_idx" ON "_grants_v_blocks_three_column_table_block_rows" USING btree ("_order");
  CREATE INDEX "_grants_v_blocks_three_column_table_block_rows_parent_id_idx" ON "_grants_v_blocks_three_column_table_block_rows" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_grants_v_blocks_three_column_table_block_rows_locales_local" ON "_grants_v_blocks_three_column_table_block_rows_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_three_column_table_block_rows_order_idx" ON "pages_blocks_three_column_table_block_rows" USING btree ("_order");
  CREATE INDEX "pages_blocks_three_column_table_block_rows_parent_id_idx" ON "pages_blocks_three_column_table_block_rows" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_three_column_table_block_rows_locales_locale_pa" ON "pages_blocks_three_column_table_block_rows_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_three_column_table_block_rows_order_idx" ON "_pages_v_blocks_three_column_table_block_rows" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_three_column_table_block_rows_parent_id_idx" ON "_pages_v_blocks_three_column_table_block_rows" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_three_column_table_block_rows_locales_locale" ON "_pages_v_blocks_three_column_table_block_rows_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "blog_blocks_three_column_table_block_rows_order_idx" ON "blog_blocks_three_column_table_block_rows" USING btree ("_order");
  CREATE INDEX "blog_blocks_three_column_table_block_rows_parent_id_idx" ON "blog_blocks_three_column_table_block_rows" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "blog_blocks_three_column_table_block_rows_locales_locale_par" ON "blog_blocks_three_column_table_block_rows_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_blog_v_blocks_three_column_table_block_rows_order_idx" ON "_blog_v_blocks_three_column_table_block_rows" USING btree ("_order");
  CREATE INDEX "_blog_v_blocks_three_column_table_block_rows_parent_id_idx" ON "_blog_v_blocks_three_column_table_block_rows" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_blog_v_blocks_three_column_table_block_rows_locales_locale_" ON "_blog_v_blocks_three_column_table_block_rows_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "reports_blocks_three_column_table_block_rows_order_idx" ON "reports_blocks_three_column_table_block_rows" USING btree ("_order");
  CREATE INDEX "reports_blocks_three_column_table_block_rows_parent_id_idx" ON "reports_blocks_three_column_table_block_rows" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "reports_blocks_three_column_table_block_rows_locales_locale_" ON "reports_blocks_three_column_table_block_rows_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_reports_v_blocks_three_column_table_block_rows_order_idx" ON "_reports_v_blocks_three_column_table_block_rows" USING btree ("_order");
  CREATE INDEX "_reports_v_blocks_three_column_table_block_rows_parent_id_idx" ON "_reports_v_blocks_three_column_table_block_rows" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_reports_v_blocks_three_column_table_block_rows_locales_loca" ON "_reports_v_blocks_three_column_table_block_rows_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "mmedia_blocks_three_column_table_block_rows_order_idx" ON "mmedia_blocks_three_column_table_block_rows" USING btree ("_order");
  CREATE INDEX "mmedia_blocks_three_column_table_block_rows_parent_id_idx" ON "mmedia_blocks_three_column_table_block_rows" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "mmedia_blocks_three_column_table_block_rows_locales_locale_p" ON "mmedia_blocks_three_column_table_block_rows_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_mmedia_v_blocks_three_column_table_block_rows_order_idx" ON "_mmedia_v_blocks_three_column_table_block_rows" USING btree ("_order");
  CREATE INDEX "_mmedia_v_blocks_three_column_table_block_rows_parent_id_idx" ON "_mmedia_v_blocks_three_column_table_block_rows" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_mmedia_v_blocks_three_column_table_block_rows_locales_local" ON "_mmedia_v_blocks_three_column_table_block_rows_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "homepage_blocks_three_column_table_block_rows_order_idx" ON "homepage_blocks_three_column_table_block_rows" USING btree ("_order");
  CREATE INDEX "homepage_blocks_three_column_table_block_rows_parent_id_idx" ON "homepage_blocks_three_column_table_block_rows" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "homepage_blocks_three_column_table_block_rows_locales_locale" ON "homepage_blocks_three_column_table_block_rows_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_homepage_v_blocks_three_column_table_block_rows_order_idx" ON "_homepage_v_blocks_three_column_table_block_rows" USING btree ("_order");
  CREATE INDEX "_homepage_v_blocks_three_column_table_block_rows_parent_id_idx" ON "_homepage_v_blocks_three_column_table_block_rows" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_homepage_v_blocks_three_column_table_block_rows_locales_loc" ON "_homepage_v_blocks_three_column_table_block_rows_locales" USING btree ("_locale","_parent_id");
  ALTER TABLE "grants_blocks_three_column_table_block_locales" DROP COLUMN "first_column";
  ALTER TABLE "grants_blocks_three_column_table_block_locales" DROP COLUMN "second_column";
  ALTER TABLE "grants_blocks_three_column_table_block_locales" DROP COLUMN "third_column";
  ALTER TABLE "_grants_v_blocks_three_column_table_block_locales" DROP COLUMN "first_column";
  ALTER TABLE "_grants_v_blocks_three_column_table_block_locales" DROP COLUMN "second_column";
  ALTER TABLE "_grants_v_blocks_three_column_table_block_locales" DROP COLUMN "third_column";
  ALTER TABLE "pages_blocks_three_column_table_block_locales" DROP COLUMN "first_column";
  ALTER TABLE "pages_blocks_three_column_table_block_locales" DROP COLUMN "second_column";
  ALTER TABLE "pages_blocks_three_column_table_block_locales" DROP COLUMN "third_column";
  ALTER TABLE "_pages_v_blocks_three_column_table_block_locales" DROP COLUMN "first_column";
  ALTER TABLE "_pages_v_blocks_three_column_table_block_locales" DROP COLUMN "second_column";
  ALTER TABLE "_pages_v_blocks_three_column_table_block_locales" DROP COLUMN "third_column";
  ALTER TABLE "blog_blocks_three_column_table_block_locales" DROP COLUMN "first_column";
  ALTER TABLE "blog_blocks_three_column_table_block_locales" DROP COLUMN "second_column";
  ALTER TABLE "blog_blocks_three_column_table_block_locales" DROP COLUMN "third_column";
  ALTER TABLE "_blog_v_blocks_three_column_table_block_locales" DROP COLUMN "first_column";
  ALTER TABLE "_blog_v_blocks_three_column_table_block_locales" DROP COLUMN "second_column";
  ALTER TABLE "_blog_v_blocks_three_column_table_block_locales" DROP COLUMN "third_column";
  ALTER TABLE "reports_blocks_three_column_table_block_locales" DROP COLUMN "first_column";
  ALTER TABLE "reports_blocks_three_column_table_block_locales" DROP COLUMN "second_column";
  ALTER TABLE "reports_blocks_three_column_table_block_locales" DROP COLUMN "third_column";
  ALTER TABLE "_reports_v_blocks_three_column_table_block_locales" DROP COLUMN "first_column";
  ALTER TABLE "_reports_v_blocks_three_column_table_block_locales" DROP COLUMN "second_column";
  ALTER TABLE "_reports_v_blocks_three_column_table_block_locales" DROP COLUMN "third_column";
  ALTER TABLE "mmedia_blocks_three_column_table_block_locales" DROP COLUMN "first_column";
  ALTER TABLE "mmedia_blocks_three_column_table_block_locales" DROP COLUMN "second_column";
  ALTER TABLE "mmedia_blocks_three_column_table_block_locales" DROP COLUMN "third_column";
  ALTER TABLE "_mmedia_v_blocks_three_column_table_block_locales" DROP COLUMN "first_column";
  ALTER TABLE "_mmedia_v_blocks_three_column_table_block_locales" DROP COLUMN "second_column";
  ALTER TABLE "_mmedia_v_blocks_three_column_table_block_locales" DROP COLUMN "third_column";
  ALTER TABLE "homepage_blocks_three_column_table_block_locales" DROP COLUMN "first_column";
  ALTER TABLE "homepage_blocks_three_column_table_block_locales" DROP COLUMN "second_column";
  ALTER TABLE "homepage_blocks_three_column_table_block_locales" DROP COLUMN "third_column";
  ALTER TABLE "_homepage_v_blocks_three_column_table_block_locales" DROP COLUMN "first_column";
  ALTER TABLE "_homepage_v_blocks_three_column_table_block_locales" DROP COLUMN "second_column";
  ALTER TABLE "_homepage_v_blocks_three_column_table_block_locales" DROP COLUMN "third_column";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "grants_blocks_three_column_table_block_rows" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "grants_blocks_three_column_table_block_rows_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_grants_v_blocks_three_column_table_block_rows" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_grants_v_blocks_three_column_table_block_rows_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_three_column_table_block_rows" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_three_column_table_block_rows_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_three_column_table_block_rows" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_three_column_table_block_rows_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "blog_blocks_three_column_table_block_rows" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "blog_blocks_three_column_table_block_rows_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_blog_v_blocks_three_column_table_block_rows" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_blog_v_blocks_three_column_table_block_rows_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "reports_blocks_three_column_table_block_rows" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "reports_blocks_three_column_table_block_rows_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_reports_v_blocks_three_column_table_block_rows" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_reports_v_blocks_three_column_table_block_rows_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "mmedia_blocks_three_column_table_block_rows" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "mmedia_blocks_three_column_table_block_rows_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_mmedia_v_blocks_three_column_table_block_rows" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_mmedia_v_blocks_three_column_table_block_rows_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "homepage_blocks_three_column_table_block_rows" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "homepage_blocks_three_column_table_block_rows_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_homepage_v_blocks_three_column_table_block_rows" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_homepage_v_blocks_three_column_table_block_rows_locales" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "grants_blocks_three_column_table_block_rows" CASCADE;
  DROP TABLE "grants_blocks_three_column_table_block_rows_locales" CASCADE;
  DROP TABLE "_grants_v_blocks_three_column_table_block_rows" CASCADE;
  DROP TABLE "_grants_v_blocks_three_column_table_block_rows_locales" CASCADE;
  DROP TABLE "pages_blocks_three_column_table_block_rows" CASCADE;
  DROP TABLE "pages_blocks_three_column_table_block_rows_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_three_column_table_block_rows" CASCADE;
  DROP TABLE "_pages_v_blocks_three_column_table_block_rows_locales" CASCADE;
  DROP TABLE "blog_blocks_three_column_table_block_rows" CASCADE;
  DROP TABLE "blog_blocks_three_column_table_block_rows_locales" CASCADE;
  DROP TABLE "_blog_v_blocks_three_column_table_block_rows" CASCADE;
  DROP TABLE "_blog_v_blocks_three_column_table_block_rows_locales" CASCADE;
  DROP TABLE "reports_blocks_three_column_table_block_rows" CASCADE;
  DROP TABLE "reports_blocks_three_column_table_block_rows_locales" CASCADE;
  DROP TABLE "_reports_v_blocks_three_column_table_block_rows" CASCADE;
  DROP TABLE "_reports_v_blocks_three_column_table_block_rows_locales" CASCADE;
  DROP TABLE "mmedia_blocks_three_column_table_block_rows" CASCADE;
  DROP TABLE "mmedia_blocks_three_column_table_block_rows_locales" CASCADE;
  DROP TABLE "_mmedia_v_blocks_three_column_table_block_rows" CASCADE;
  DROP TABLE "_mmedia_v_blocks_three_column_table_block_rows_locales" CASCADE;
  DROP TABLE "homepage_blocks_three_column_table_block_rows" CASCADE;
  DROP TABLE "homepage_blocks_three_column_table_block_rows_locales" CASCADE;
  DROP TABLE "_homepage_v_blocks_three_column_table_block_rows" CASCADE;
  DROP TABLE "_homepage_v_blocks_three_column_table_block_rows_locales" CASCADE;
  ALTER TABLE "users" ALTER COLUMN "role" SET DEFAULT 'writer';
  ALTER TABLE "grants_blocks_three_column_table_block_locales" ADD COLUMN "first_column" jsonb;
  ALTER TABLE "grants_blocks_three_column_table_block_locales" ADD COLUMN "second_column" jsonb;
  ALTER TABLE "grants_blocks_three_column_table_block_locales" ADD COLUMN "third_column" jsonb;
  ALTER TABLE "_grants_v_blocks_three_column_table_block_locales" ADD COLUMN "first_column" jsonb;
  ALTER TABLE "_grants_v_blocks_three_column_table_block_locales" ADD COLUMN "second_column" jsonb;
  ALTER TABLE "_grants_v_blocks_three_column_table_block_locales" ADD COLUMN "third_column" jsonb;
  ALTER TABLE "pages_blocks_three_column_table_block_locales" ADD COLUMN "first_column" jsonb;
  ALTER TABLE "pages_blocks_three_column_table_block_locales" ADD COLUMN "second_column" jsonb;
  ALTER TABLE "pages_blocks_three_column_table_block_locales" ADD COLUMN "third_column" jsonb;
  ALTER TABLE "_pages_v_blocks_three_column_table_block_locales" ADD COLUMN "first_column" jsonb;
  ALTER TABLE "_pages_v_blocks_three_column_table_block_locales" ADD COLUMN "second_column" jsonb;
  ALTER TABLE "_pages_v_blocks_three_column_table_block_locales" ADD COLUMN "third_column" jsonb;
  ALTER TABLE "blog_blocks_three_column_table_block_locales" ADD COLUMN "first_column" jsonb;
  ALTER TABLE "blog_blocks_three_column_table_block_locales" ADD COLUMN "second_column" jsonb;
  ALTER TABLE "blog_blocks_three_column_table_block_locales" ADD COLUMN "third_column" jsonb;
  ALTER TABLE "_blog_v_blocks_three_column_table_block_locales" ADD COLUMN "first_column" jsonb;
  ALTER TABLE "_blog_v_blocks_three_column_table_block_locales" ADD COLUMN "second_column" jsonb;
  ALTER TABLE "_blog_v_blocks_three_column_table_block_locales" ADD COLUMN "third_column" jsonb;
  ALTER TABLE "reports_blocks_three_column_table_block_locales" ADD COLUMN "first_column" jsonb;
  ALTER TABLE "reports_blocks_three_column_table_block_locales" ADD COLUMN "second_column" jsonb;
  ALTER TABLE "reports_blocks_three_column_table_block_locales" ADD COLUMN "third_column" jsonb;
  ALTER TABLE "_reports_v_blocks_three_column_table_block_locales" ADD COLUMN "first_column" jsonb;
  ALTER TABLE "_reports_v_blocks_three_column_table_block_locales" ADD COLUMN "second_column" jsonb;
  ALTER TABLE "_reports_v_blocks_three_column_table_block_locales" ADD COLUMN "third_column" jsonb;
  ALTER TABLE "mmedia_blocks_three_column_table_block_locales" ADD COLUMN "first_column" jsonb;
  ALTER TABLE "mmedia_blocks_three_column_table_block_locales" ADD COLUMN "second_column" jsonb;
  ALTER TABLE "mmedia_blocks_three_column_table_block_locales" ADD COLUMN "third_column" jsonb;
  ALTER TABLE "_mmedia_v_blocks_three_column_table_block_locales" ADD COLUMN "first_column" jsonb;
  ALTER TABLE "_mmedia_v_blocks_three_column_table_block_locales" ADD COLUMN "second_column" jsonb;
  ALTER TABLE "_mmedia_v_blocks_three_column_table_block_locales" ADD COLUMN "third_column" jsonb;
  ALTER TABLE "homepage_blocks_three_column_table_block_locales" ADD COLUMN "first_column" jsonb;
  ALTER TABLE "homepage_blocks_three_column_table_block_locales" ADD COLUMN "second_column" jsonb;
  ALTER TABLE "homepage_blocks_three_column_table_block_locales" ADD COLUMN "third_column" jsonb;
  ALTER TABLE "_homepage_v_blocks_three_column_table_block_locales" ADD COLUMN "first_column" jsonb;
  ALTER TABLE "_homepage_v_blocks_three_column_table_block_locales" ADD COLUMN "second_column" jsonb;
  ALTER TABLE "_homepage_v_blocks_three_column_table_block_locales" ADD COLUMN "third_column" jsonb;
  ALTER TABLE "grants_hero_buttons" DROP COLUMN "link_anchor";
  ALTER TABLE "grants_blocks_secondarycta_cta_button" DROP COLUMN "link_anchor";
  ALTER TABLE "grants_blocks_mcol_info_block_multicols" DROP COLUMN "link_anchor";
  ALTER TABLE "grants_blocks_comparison_blk_buttons" DROP COLUMN "link_anchor";
  ALTER TABLE "grants_blocks_ylw_deck_cards_links" DROP COLUMN "link_anchor";
  ALTER TABLE "grants_blocks_feat_crd" DROP COLUMN "link_anchor";
  ALTER TABLE "grants_blocks_list_crd_dck_cards" DROP COLUMN "link_anchor";
  ALTER TABLE "grants_blocks_list_crd_dck_buttons" DROP COLUMN "link_anchor";
  ALTER TABLE "grants_blocks_faq_blk" DROP COLUMN "link_anchor";
  ALTER TABLE "grants_blocks_pink_puffy_links" DROP COLUMN "link_anchor";
  ALTER TABLE "_grants_v_version_hero_buttons" DROP COLUMN "link_anchor";
  ALTER TABLE "_grants_v_blocks_secondarycta_cta_button" DROP COLUMN "link_anchor";
  ALTER TABLE "_grants_v_blocks_mcol_info_block_multicols" DROP COLUMN "link_anchor";
  ALTER TABLE "_grants_v_blocks_comparison_blk_buttons" DROP COLUMN "link_anchor";
  ALTER TABLE "_grants_v_blocks_ylw_deck_cards_links" DROP COLUMN "link_anchor";
  ALTER TABLE "_grants_v_blocks_feat_crd" DROP COLUMN "link_anchor";
  ALTER TABLE "_grants_v_blocks_list_crd_dck_cards" DROP COLUMN "link_anchor";
  ALTER TABLE "_grants_v_blocks_list_crd_dck_buttons" DROP COLUMN "link_anchor";
  ALTER TABLE "_grants_v_blocks_faq_blk" DROP COLUMN "link_anchor";
  ALTER TABLE "_grants_v_blocks_pink_puffy_links" DROP COLUMN "link_anchor";
  ALTER TABLE "grantcards_card_buttons" DROP COLUMN "link_anchor";
  ALTER TABLE "_grantcards_v_version_card_buttons" DROP COLUMN "link_anchor";
  ALTER TABLE "etests" DROP COLUMN "is_e_card_is_e_link_link_anchor";
  ALTER TABLE "etests" DROP COLUMN "not_e_card_not_e_link_link_anchor";
  ALTER TABLE "_etests_v" DROP COLUMN "version_is_e_card_is_e_link_link_anchor";
  ALTER TABLE "_etests_v" DROP COLUMN "version_not_e_card_not_e_link_link_anchor";
  ALTER TABLE "pages_hero_buttons" DROP COLUMN "link_anchor";
  ALTER TABLE "pages_blocks_secondarycta_cta_button" DROP COLUMN "link_anchor";
  ALTER TABLE "pages_blocks_mcol_info_block_multicols" DROP COLUMN "link_anchor";
  ALTER TABLE "pages_blocks_comparison_blk_buttons" DROP COLUMN "link_anchor";
  ALTER TABLE "pages_blocks_ylw_deck_cards_links" DROP COLUMN "link_anchor";
  ALTER TABLE "pages_blocks_feat_crd" DROP COLUMN "link_anchor";
  ALTER TABLE "pages_blocks_list_crd_dck_cards" DROP COLUMN "link_anchor";
  ALTER TABLE "pages_blocks_list_crd_dck_buttons" DROP COLUMN "link_anchor";
  ALTER TABLE "pages_blocks_faq_blk" DROP COLUMN "link_anchor";
  ALTER TABLE "pages_blocks_pink_puffy_links" DROP COLUMN "link_anchor";
  ALTER TABLE "_pages_v_version_hero_buttons" DROP COLUMN "link_anchor";
  ALTER TABLE "_pages_v_blocks_secondarycta_cta_button" DROP COLUMN "link_anchor";
  ALTER TABLE "_pages_v_blocks_mcol_info_block_multicols" DROP COLUMN "link_anchor";
  ALTER TABLE "_pages_v_blocks_comparison_blk_buttons" DROP COLUMN "link_anchor";
  ALTER TABLE "_pages_v_blocks_ylw_deck_cards_links" DROP COLUMN "link_anchor";
  ALTER TABLE "_pages_v_blocks_feat_crd" DROP COLUMN "link_anchor";
  ALTER TABLE "_pages_v_blocks_list_crd_dck_cards" DROP COLUMN "link_anchor";
  ALTER TABLE "_pages_v_blocks_list_crd_dck_buttons" DROP COLUMN "link_anchor";
  ALTER TABLE "_pages_v_blocks_faq_blk" DROP COLUMN "link_anchor";
  ALTER TABLE "_pages_v_blocks_pink_puffy_links" DROP COLUMN "link_anchor";
  ALTER TABLE "blog_hero_buttons" DROP COLUMN "link_anchor";
  ALTER TABLE "blog_blocks_secondarycta_cta_button" DROP COLUMN "link_anchor";
  ALTER TABLE "blog_blocks_mcol_info_block_multicols" DROP COLUMN "link_anchor";
  ALTER TABLE "blog_blocks_comparison_blk_buttons" DROP COLUMN "link_anchor";
  ALTER TABLE "blog_blocks_ylw_deck_cards_links" DROP COLUMN "link_anchor";
  ALTER TABLE "blog_blocks_feat_crd" DROP COLUMN "link_anchor";
  ALTER TABLE "blog_blocks_list_crd_dck_cards" DROP COLUMN "link_anchor";
  ALTER TABLE "blog_blocks_list_crd_dck_buttons" DROP COLUMN "link_anchor";
  ALTER TABLE "blog_blocks_faq_blk" DROP COLUMN "link_anchor";
  ALTER TABLE "blog_blocks_pink_puffy_links" DROP COLUMN "link_anchor";
  ALTER TABLE "_blog_v_version_hero_buttons" DROP COLUMN "link_anchor";
  ALTER TABLE "_blog_v_blocks_secondarycta_cta_button" DROP COLUMN "link_anchor";
  ALTER TABLE "_blog_v_blocks_mcol_info_block_multicols" DROP COLUMN "link_anchor";
  ALTER TABLE "_blog_v_blocks_comparison_blk_buttons" DROP COLUMN "link_anchor";
  ALTER TABLE "_blog_v_blocks_ylw_deck_cards_links" DROP COLUMN "link_anchor";
  ALTER TABLE "_blog_v_blocks_feat_crd" DROP COLUMN "link_anchor";
  ALTER TABLE "_blog_v_blocks_list_crd_dck_cards" DROP COLUMN "link_anchor";
  ALTER TABLE "_blog_v_blocks_list_crd_dck_buttons" DROP COLUMN "link_anchor";
  ALTER TABLE "_blog_v_blocks_faq_blk" DROP COLUMN "link_anchor";
  ALTER TABLE "_blog_v_blocks_pink_puffy_links" DROP COLUMN "link_anchor";
  ALTER TABLE "reports_hero_buttons" DROP COLUMN "link_anchor";
  ALTER TABLE "reports_blocks_secondarycta_cta_button" DROP COLUMN "link_anchor";
  ALTER TABLE "reports_blocks_mcol_info_block_multicols" DROP COLUMN "link_anchor";
  ALTER TABLE "reports_blocks_comparison_blk_buttons" DROP COLUMN "link_anchor";
  ALTER TABLE "reports_blocks_ylw_deck_cards_links" DROP COLUMN "link_anchor";
  ALTER TABLE "reports_blocks_feat_crd" DROP COLUMN "link_anchor";
  ALTER TABLE "reports_blocks_list_crd_dck_cards" DROP COLUMN "link_anchor";
  ALTER TABLE "reports_blocks_list_crd_dck_buttons" DROP COLUMN "link_anchor";
  ALTER TABLE "reports_blocks_faq_blk" DROP COLUMN "link_anchor";
  ALTER TABLE "reports_blocks_pink_puffy_links" DROP COLUMN "link_anchor";
  ALTER TABLE "_reports_v_version_hero_buttons" DROP COLUMN "link_anchor";
  ALTER TABLE "_reports_v_blocks_secondarycta_cta_button" DROP COLUMN "link_anchor";
  ALTER TABLE "_reports_v_blocks_mcol_info_block_multicols" DROP COLUMN "link_anchor";
  ALTER TABLE "_reports_v_blocks_comparison_blk_buttons" DROP COLUMN "link_anchor";
  ALTER TABLE "_reports_v_blocks_ylw_deck_cards_links" DROP COLUMN "link_anchor";
  ALTER TABLE "_reports_v_blocks_feat_crd" DROP COLUMN "link_anchor";
  ALTER TABLE "_reports_v_blocks_list_crd_dck_cards" DROP COLUMN "link_anchor";
  ALTER TABLE "_reports_v_blocks_list_crd_dck_buttons" DROP COLUMN "link_anchor";
  ALTER TABLE "_reports_v_blocks_faq_blk" DROP COLUMN "link_anchor";
  ALTER TABLE "_reports_v_blocks_pink_puffy_links" DROP COLUMN "link_anchor";
  ALTER TABLE "mmedia_hero_buttons" DROP COLUMN "link_anchor";
  ALTER TABLE "mmedia_blocks_secondarycta_cta_button" DROP COLUMN "link_anchor";
  ALTER TABLE "mmedia_blocks_mcol_info_block_multicols" DROP COLUMN "link_anchor";
  ALTER TABLE "mmedia_blocks_comparison_blk_buttons" DROP COLUMN "link_anchor";
  ALTER TABLE "mmedia_blocks_ylw_deck_cards_links" DROP COLUMN "link_anchor";
  ALTER TABLE "mmedia_blocks_feat_crd" DROP COLUMN "link_anchor";
  ALTER TABLE "mmedia_blocks_list_crd_dck_cards" DROP COLUMN "link_anchor";
  ALTER TABLE "mmedia_blocks_list_crd_dck_buttons" DROP COLUMN "link_anchor";
  ALTER TABLE "mmedia_blocks_faq_blk" DROP COLUMN "link_anchor";
  ALTER TABLE "mmedia_blocks_pink_puffy_links" DROP COLUMN "link_anchor";
  ALTER TABLE "_mmedia_v_version_hero_buttons" DROP COLUMN "link_anchor";
  ALTER TABLE "_mmedia_v_blocks_secondarycta_cta_button" DROP COLUMN "link_anchor";
  ALTER TABLE "_mmedia_v_blocks_mcol_info_block_multicols" DROP COLUMN "link_anchor";
  ALTER TABLE "_mmedia_v_blocks_comparison_blk_buttons" DROP COLUMN "link_anchor";
  ALTER TABLE "_mmedia_v_blocks_ylw_deck_cards_links" DROP COLUMN "link_anchor";
  ALTER TABLE "_mmedia_v_blocks_feat_crd" DROP COLUMN "link_anchor";
  ALTER TABLE "_mmedia_v_blocks_list_crd_dck_cards" DROP COLUMN "link_anchor";
  ALTER TABLE "_mmedia_v_blocks_list_crd_dck_buttons" DROP COLUMN "link_anchor";
  ALTER TABLE "_mmedia_v_blocks_faq_blk" DROP COLUMN "link_anchor";
  ALTER TABLE "_mmedia_v_blocks_pink_puffy_links" DROP COLUMN "link_anchor";
  ALTER TABLE "users" DROP COLUMN "totp_secret";
  ALTER TABLE "homepage_cta_button" DROP COLUMN "link_anchor";
  ALTER TABLE "homepage_blocks_secondarycta_cta_button" DROP COLUMN "link_anchor";
  ALTER TABLE "homepage_blocks_mcol_info_block_multicols" DROP COLUMN "link_anchor";
  ALTER TABLE "homepage_blocks_comparison_blk_buttons" DROP COLUMN "link_anchor";
  ALTER TABLE "homepage_blocks_ylw_deck_cards_links" DROP COLUMN "link_anchor";
  ALTER TABLE "homepage_blocks_feat_crd" DROP COLUMN "link_anchor";
  ALTER TABLE "homepage_blocks_list_crd_dck_cards" DROP COLUMN "link_anchor";
  ALTER TABLE "homepage_blocks_list_crd_dck_buttons" DROP COLUMN "link_anchor";
  ALTER TABLE "homepage_blocks_faq_blk" DROP COLUMN "link_anchor";
  ALTER TABLE "homepage_blocks_pink_puffy_links" DROP COLUMN "link_anchor";
  ALTER TABLE "_homepage_v_version_cta_button" DROP COLUMN "link_anchor";
  ALTER TABLE "_homepage_v_blocks_secondarycta_cta_button" DROP COLUMN "link_anchor";
  ALTER TABLE "_homepage_v_blocks_mcol_info_block_multicols" DROP COLUMN "link_anchor";
  ALTER TABLE "_homepage_v_blocks_comparison_blk_buttons" DROP COLUMN "link_anchor";
  ALTER TABLE "_homepage_v_blocks_ylw_deck_cards_links" DROP COLUMN "link_anchor";
  ALTER TABLE "_homepage_v_blocks_feat_crd" DROP COLUMN "link_anchor";
  ALTER TABLE "_homepage_v_blocks_list_crd_dck_cards" DROP COLUMN "link_anchor";
  ALTER TABLE "_homepage_v_blocks_list_crd_dck_buttons" DROP COLUMN "link_anchor";
  ALTER TABLE "_homepage_v_blocks_faq_blk" DROP COLUMN "link_anchor";
  ALTER TABLE "_homepage_v_blocks_pink_puffy_links" DROP COLUMN "link_anchor";
  ALTER TABLE "header" DROP COLUMN "banner_link_anchor";
  ALTER TABLE "nav_menu_items_nav_items" DROP COLUMN "link_anchor";`)
}
