import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_homepage_blocks_pink_puffy_links_link_type" AS ENUM('reference', 'custom', 'email', 'document', 'etest');
  CREATE TYPE "public"."enum_homepage_blocks_pink_puffy_align" AS ENUM('center', 'left');
  CREATE TYPE "public"."enum_homepage_blocks_beige_puffy_align" AS ENUM('center', 'left');
  CREATE TYPE "public"."enum_homepage_blocks_funding_map_items_region_name" AS ENUM('uaf-asia-pacific', 'afghan', 'aus', 'bangla', 'cambodia', 'china', 'india', 'indonesia', 'korea', 'laos', 'malaysia', 'mongolia', 'myanmar', 'nepal', 'pak', 'papua', 'philippines', 'srilanka', 'thailand', 'vietnam');
  CREATE TYPE "public"."enum__homepage_v_blocks_pink_puffy_links_link_type" AS ENUM('reference', 'custom', 'email', 'document', 'etest');
  CREATE TYPE "public"."enum__homepage_v_blocks_pink_puffy_align" AS ENUM('center', 'left');
  CREATE TYPE "public"."enum__homepage_v_blocks_beige_puffy_align" AS ENUM('center', 'left');
  CREATE TYPE "public"."enum__homepage_v_blocks_funding_map_items_region_name" AS ENUM('uaf-asia-pacific', 'afghan', 'aus', 'bangla', 'cambodia', 'china', 'india', 'indonesia', 'korea', 'laos', 'malaysia', 'mongolia', 'myanmar', 'nepal', 'pak', 'papua', 'philippines', 'srilanka', 'thailand', 'vietnam');
  CREATE TABLE "grants_blocks_resource_feat_card" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "_grants_v_blocks_resource_feat_card" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_resource_feat_card" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_resource_feat_card" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "blog_blocks_resource_feat_card" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "_blog_v_blocks_resource_feat_card" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "reports_blocks_resource_feat_card" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "_reports_v_blocks_resource_feat_card" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "mmedia_blocks_resource_feat_card" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "_mmedia_v_blocks_resource_feat_card" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "homepage_blocks_pink_puffy_top_row" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "homepage_blocks_pink_puffy_top_row_locales" (
  	"title" varchar,
  	"subtitle" varchar,
  	"description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "homepage_blocks_pink_puffy_bot_row" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "homepage_blocks_pink_puffy_bot_row_locales" (
  	"title" varchar,
  	"description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "homepage_blocks_pink_puffy_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_homepage_blocks_pink_puffy_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_download_link" boolean,
  	"link_arrow_link" boolean,
  	"link_pill_solid" boolean,
  	"link_pill_outline" boolean,
  	"link_url" varchar,
  	"link_email" varchar
  );
  
  CREATE TABLE "homepage_blocks_pink_puffy_links_locales" (
  	"link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "homepage_blocks_pink_puffy" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"align" "enum_homepage_blocks_pink_puffy_align" DEFAULT 'center',
  	"block_name" varchar
  );
  
  CREATE TABLE "homepage_blocks_pink_puffy_locales" (
  	"title" varchar,
  	"subtitle" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "homepage_blocks_beige_puffy_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "homepage_blocks_beige_puffy_items_locales" (
  	"title" varchar,
  	"subtitle" varchar,
  	"description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "homepage_blocks_beige_puffy" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"align" "enum_homepage_blocks_beige_puffy_align" DEFAULT 'center',
  	"block_name" varchar
  );
  
  CREATE TABLE "homepage_blocks_beige_puffy_locales" (
  	"title" varchar,
  	"subtitle" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "homepage_blocks_funding_map_items_subitems" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "homepage_blocks_funding_map_items_subitems_locales" (
  	"statnumber" varchar,
  	"description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "homepage_blocks_funding_map_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"region_name" "enum_homepage_blocks_funding_map_items_region_name" DEFAULT 'uaf-asia-pacific'
  );
  
  CREATE TABLE "homepage_blocks_funding_map" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "homepage_blocks_funding_map_locales" (
  	"title" varchar,
  	"subtitle" varchar,
  	"selector_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "_homepage_v_blocks_pink_puffy_top_row" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_homepage_v_blocks_pink_puffy_top_row_locales" (
  	"title" varchar,
  	"subtitle" varchar,
  	"description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_homepage_v_blocks_pink_puffy_bot_row" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_homepage_v_blocks_pink_puffy_bot_row_locales" (
  	"title" varchar,
  	"description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_homepage_v_blocks_pink_puffy_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"link_type" "enum__homepage_v_blocks_pink_puffy_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_download_link" boolean,
  	"link_arrow_link" boolean,
  	"link_pill_solid" boolean,
  	"link_pill_outline" boolean,
  	"link_url" varchar,
  	"link_email" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_homepage_v_blocks_pink_puffy_links_locales" (
  	"link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_homepage_v_blocks_pink_puffy" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"align" "enum__homepage_v_blocks_pink_puffy_align" DEFAULT 'center',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_homepage_v_blocks_pink_puffy_locales" (
  	"title" varchar,
  	"subtitle" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_homepage_v_blocks_beige_puffy_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_homepage_v_blocks_beige_puffy_items_locales" (
  	"title" varchar,
  	"subtitle" varchar,
  	"description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_homepage_v_blocks_beige_puffy" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"align" "enum__homepage_v_blocks_beige_puffy_align" DEFAULT 'center',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_homepage_v_blocks_beige_puffy_locales" (
  	"title" varchar,
  	"subtitle" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_homepage_v_blocks_funding_map_items_subitems" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_homepage_v_blocks_funding_map_items_subitems_locales" (
  	"statnumber" varchar,
  	"description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_homepage_v_blocks_funding_map_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"region_name" "enum__homepage_v_blocks_funding_map_items_region_name" DEFAULT 'uaf-asia-pacific',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_homepage_v_blocks_funding_map" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_homepage_v_blocks_funding_map_locales" (
  	"title" varchar,
  	"subtitle" varchar,
  	"selector_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  ALTER TABLE "grants_blocks_resource_feat_card" ADD CONSTRAINT "grants_blocks_resource_feat_card_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."grants"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_grants_v_blocks_resource_feat_card" ADD CONSTRAINT "_grants_v_blocks_resource_feat_card_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_grants_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_resource_feat_card" ADD CONSTRAINT "pages_blocks_resource_feat_card_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_resource_feat_card" ADD CONSTRAINT "_pages_v_blocks_resource_feat_card_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "blog_blocks_resource_feat_card" ADD CONSTRAINT "blog_blocks_resource_feat_card_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."blog"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_blog_v_blocks_resource_feat_card" ADD CONSTRAINT "_blog_v_blocks_resource_feat_card_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_blog_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "reports_blocks_resource_feat_card" ADD CONSTRAINT "reports_blocks_resource_feat_card_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."reports"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_reports_v_blocks_resource_feat_card" ADD CONSTRAINT "_reports_v_blocks_resource_feat_card_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_reports_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "mmedia_blocks_resource_feat_card" ADD CONSTRAINT "mmedia_blocks_resource_feat_card_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."mmedia"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_mmedia_v_blocks_resource_feat_card" ADD CONSTRAINT "_mmedia_v_blocks_resource_feat_card_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_mmedia_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_blocks_pink_puffy_top_row" ADD CONSTRAINT "homepage_blocks_pink_puffy_top_row_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage_blocks_pink_puffy"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_blocks_pink_puffy_top_row_locales" ADD CONSTRAINT "homepage_blocks_pink_puffy_top_row_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage_blocks_pink_puffy_top_row"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_blocks_pink_puffy_bot_row" ADD CONSTRAINT "homepage_blocks_pink_puffy_bot_row_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage_blocks_pink_puffy"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_blocks_pink_puffy_bot_row_locales" ADD CONSTRAINT "homepage_blocks_pink_puffy_bot_row_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage_blocks_pink_puffy_bot_row"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_blocks_pink_puffy_links" ADD CONSTRAINT "homepage_blocks_pink_puffy_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage_blocks_pink_puffy"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_blocks_pink_puffy_links_locales" ADD CONSTRAINT "homepage_blocks_pink_puffy_links_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage_blocks_pink_puffy_links"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_blocks_pink_puffy" ADD CONSTRAINT "homepage_blocks_pink_puffy_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_blocks_pink_puffy_locales" ADD CONSTRAINT "homepage_blocks_pink_puffy_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage_blocks_pink_puffy"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_blocks_beige_puffy_items" ADD CONSTRAINT "homepage_blocks_beige_puffy_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage_blocks_beige_puffy"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_blocks_beige_puffy_items_locales" ADD CONSTRAINT "homepage_blocks_beige_puffy_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage_blocks_beige_puffy_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_blocks_beige_puffy" ADD CONSTRAINT "homepage_blocks_beige_puffy_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_blocks_beige_puffy_locales" ADD CONSTRAINT "homepage_blocks_beige_puffy_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage_blocks_beige_puffy"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_blocks_funding_map_items_subitems" ADD CONSTRAINT "homepage_blocks_funding_map_items_subitems_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage_blocks_funding_map_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_blocks_funding_map_items_subitems_locales" ADD CONSTRAINT "homepage_blocks_funding_map_items_subitems_locales_parent_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage_blocks_funding_map_items_subitems"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_blocks_funding_map_items" ADD CONSTRAINT "homepage_blocks_funding_map_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage_blocks_funding_map"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_blocks_funding_map" ADD CONSTRAINT "homepage_blocks_funding_map_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_blocks_funding_map_locales" ADD CONSTRAINT "homepage_blocks_funding_map_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage_blocks_funding_map"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_homepage_v_blocks_pink_puffy_top_row" ADD CONSTRAINT "_homepage_v_blocks_pink_puffy_top_row_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_homepage_v_blocks_pink_puffy"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_homepage_v_blocks_pink_puffy_top_row_locales" ADD CONSTRAINT "_homepage_v_blocks_pink_puffy_top_row_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_homepage_v_blocks_pink_puffy_top_row"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_homepage_v_blocks_pink_puffy_bot_row" ADD CONSTRAINT "_homepage_v_blocks_pink_puffy_bot_row_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_homepage_v_blocks_pink_puffy"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_homepage_v_blocks_pink_puffy_bot_row_locales" ADD CONSTRAINT "_homepage_v_blocks_pink_puffy_bot_row_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_homepage_v_blocks_pink_puffy_bot_row"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_homepage_v_blocks_pink_puffy_links" ADD CONSTRAINT "_homepage_v_blocks_pink_puffy_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_homepage_v_blocks_pink_puffy"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_homepage_v_blocks_pink_puffy_links_locales" ADD CONSTRAINT "_homepage_v_blocks_pink_puffy_links_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_homepage_v_blocks_pink_puffy_links"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_homepage_v_blocks_pink_puffy" ADD CONSTRAINT "_homepage_v_blocks_pink_puffy_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_homepage_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_homepage_v_blocks_pink_puffy_locales" ADD CONSTRAINT "_homepage_v_blocks_pink_puffy_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_homepage_v_blocks_pink_puffy"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_homepage_v_blocks_beige_puffy_items" ADD CONSTRAINT "_homepage_v_blocks_beige_puffy_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_homepage_v_blocks_beige_puffy"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_homepage_v_blocks_beige_puffy_items_locales" ADD CONSTRAINT "_homepage_v_blocks_beige_puffy_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_homepage_v_blocks_beige_puffy_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_homepage_v_blocks_beige_puffy" ADD CONSTRAINT "_homepage_v_blocks_beige_puffy_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_homepage_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_homepage_v_blocks_beige_puffy_locales" ADD CONSTRAINT "_homepage_v_blocks_beige_puffy_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_homepage_v_blocks_beige_puffy"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_homepage_v_blocks_funding_map_items_subitems" ADD CONSTRAINT "_homepage_v_blocks_funding_map_items_subitems_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_homepage_v_blocks_funding_map_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_homepage_v_blocks_funding_map_items_subitems_locales" ADD CONSTRAINT "_homepage_v_blocks_funding_map_items_subitems_locales_par_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_homepage_v_blocks_funding_map_items_subitems"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_homepage_v_blocks_funding_map_items" ADD CONSTRAINT "_homepage_v_blocks_funding_map_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_homepage_v_blocks_funding_map"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_homepage_v_blocks_funding_map" ADD CONSTRAINT "_homepage_v_blocks_funding_map_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_homepage_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_homepage_v_blocks_funding_map_locales" ADD CONSTRAINT "_homepage_v_blocks_funding_map_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_homepage_v_blocks_funding_map"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "grants_blocks_resource_feat_card_order_idx" ON "grants_blocks_resource_feat_card" USING btree ("_order");
  CREATE INDEX "grants_blocks_resource_feat_card_parent_id_idx" ON "grants_blocks_resource_feat_card" USING btree ("_parent_id");
  CREATE INDEX "grants_blocks_resource_feat_card_path_idx" ON "grants_blocks_resource_feat_card" USING btree ("_path");
  CREATE INDEX "_grants_v_blocks_resource_feat_card_order_idx" ON "_grants_v_blocks_resource_feat_card" USING btree ("_order");
  CREATE INDEX "_grants_v_blocks_resource_feat_card_parent_id_idx" ON "_grants_v_blocks_resource_feat_card" USING btree ("_parent_id");
  CREATE INDEX "_grants_v_blocks_resource_feat_card_path_idx" ON "_grants_v_blocks_resource_feat_card" USING btree ("_path");
  CREATE INDEX "pages_blocks_resource_feat_card_order_idx" ON "pages_blocks_resource_feat_card" USING btree ("_order");
  CREATE INDEX "pages_blocks_resource_feat_card_parent_id_idx" ON "pages_blocks_resource_feat_card" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_resource_feat_card_path_idx" ON "pages_blocks_resource_feat_card" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_resource_feat_card_order_idx" ON "_pages_v_blocks_resource_feat_card" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_resource_feat_card_parent_id_idx" ON "_pages_v_blocks_resource_feat_card" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_resource_feat_card_path_idx" ON "_pages_v_blocks_resource_feat_card" USING btree ("_path");
  CREATE INDEX "blog_blocks_resource_feat_card_order_idx" ON "blog_blocks_resource_feat_card" USING btree ("_order");
  CREATE INDEX "blog_blocks_resource_feat_card_parent_id_idx" ON "blog_blocks_resource_feat_card" USING btree ("_parent_id");
  CREATE INDEX "blog_blocks_resource_feat_card_path_idx" ON "blog_blocks_resource_feat_card" USING btree ("_path");
  CREATE INDEX "_blog_v_blocks_resource_feat_card_order_idx" ON "_blog_v_blocks_resource_feat_card" USING btree ("_order");
  CREATE INDEX "_blog_v_blocks_resource_feat_card_parent_id_idx" ON "_blog_v_blocks_resource_feat_card" USING btree ("_parent_id");
  CREATE INDEX "_blog_v_blocks_resource_feat_card_path_idx" ON "_blog_v_blocks_resource_feat_card" USING btree ("_path");
  CREATE INDEX "reports_blocks_resource_feat_card_order_idx" ON "reports_blocks_resource_feat_card" USING btree ("_order");
  CREATE INDEX "reports_blocks_resource_feat_card_parent_id_idx" ON "reports_blocks_resource_feat_card" USING btree ("_parent_id");
  CREATE INDEX "reports_blocks_resource_feat_card_path_idx" ON "reports_blocks_resource_feat_card" USING btree ("_path");
  CREATE INDEX "_reports_v_blocks_resource_feat_card_order_idx" ON "_reports_v_blocks_resource_feat_card" USING btree ("_order");
  CREATE INDEX "_reports_v_blocks_resource_feat_card_parent_id_idx" ON "_reports_v_blocks_resource_feat_card" USING btree ("_parent_id");
  CREATE INDEX "_reports_v_blocks_resource_feat_card_path_idx" ON "_reports_v_blocks_resource_feat_card" USING btree ("_path");
  CREATE INDEX "mmedia_blocks_resource_feat_card_order_idx" ON "mmedia_blocks_resource_feat_card" USING btree ("_order");
  CREATE INDEX "mmedia_blocks_resource_feat_card_parent_id_idx" ON "mmedia_blocks_resource_feat_card" USING btree ("_parent_id");
  CREATE INDEX "mmedia_blocks_resource_feat_card_path_idx" ON "mmedia_blocks_resource_feat_card" USING btree ("_path");
  CREATE INDEX "_mmedia_v_blocks_resource_feat_card_order_idx" ON "_mmedia_v_blocks_resource_feat_card" USING btree ("_order");
  CREATE INDEX "_mmedia_v_blocks_resource_feat_card_parent_id_idx" ON "_mmedia_v_blocks_resource_feat_card" USING btree ("_parent_id");
  CREATE INDEX "_mmedia_v_blocks_resource_feat_card_path_idx" ON "_mmedia_v_blocks_resource_feat_card" USING btree ("_path");
  CREATE INDEX "homepage_blocks_pink_puffy_top_row_order_idx" ON "homepage_blocks_pink_puffy_top_row" USING btree ("_order");
  CREATE INDEX "homepage_blocks_pink_puffy_top_row_parent_id_idx" ON "homepage_blocks_pink_puffy_top_row" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "homepage_blocks_pink_puffy_top_row_locales_locale_parent_id_" ON "homepage_blocks_pink_puffy_top_row_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "homepage_blocks_pink_puffy_bot_row_order_idx" ON "homepage_blocks_pink_puffy_bot_row" USING btree ("_order");
  CREATE INDEX "homepage_blocks_pink_puffy_bot_row_parent_id_idx" ON "homepage_blocks_pink_puffy_bot_row" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "homepage_blocks_pink_puffy_bot_row_locales_locale_parent_id_" ON "homepage_blocks_pink_puffy_bot_row_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "homepage_blocks_pink_puffy_links_order_idx" ON "homepage_blocks_pink_puffy_links" USING btree ("_order");
  CREATE INDEX "homepage_blocks_pink_puffy_links_parent_id_idx" ON "homepage_blocks_pink_puffy_links" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "homepage_blocks_pink_puffy_links_locales_locale_parent_id_un" ON "homepage_blocks_pink_puffy_links_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "homepage_blocks_pink_puffy_order_idx" ON "homepage_blocks_pink_puffy" USING btree ("_order");
  CREATE INDEX "homepage_blocks_pink_puffy_parent_id_idx" ON "homepage_blocks_pink_puffy" USING btree ("_parent_id");
  CREATE INDEX "homepage_blocks_pink_puffy_path_idx" ON "homepage_blocks_pink_puffy" USING btree ("_path");
  CREATE UNIQUE INDEX "homepage_blocks_pink_puffy_locales_locale_parent_id_unique" ON "homepage_blocks_pink_puffy_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "homepage_blocks_beige_puffy_items_order_idx" ON "homepage_blocks_beige_puffy_items" USING btree ("_order");
  CREATE INDEX "homepage_blocks_beige_puffy_items_parent_id_idx" ON "homepage_blocks_beige_puffy_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "homepage_blocks_beige_puffy_items_locales_locale_parent_id_u" ON "homepage_blocks_beige_puffy_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "homepage_blocks_beige_puffy_order_idx" ON "homepage_blocks_beige_puffy" USING btree ("_order");
  CREATE INDEX "homepage_blocks_beige_puffy_parent_id_idx" ON "homepage_blocks_beige_puffy" USING btree ("_parent_id");
  CREATE INDEX "homepage_blocks_beige_puffy_path_idx" ON "homepage_blocks_beige_puffy" USING btree ("_path");
  CREATE UNIQUE INDEX "homepage_blocks_beige_puffy_locales_locale_parent_id_unique" ON "homepage_blocks_beige_puffy_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "homepage_blocks_funding_map_items_subitems_order_idx" ON "homepage_blocks_funding_map_items_subitems" USING btree ("_order");
  CREATE INDEX "homepage_blocks_funding_map_items_subitems_parent_id_idx" ON "homepage_blocks_funding_map_items_subitems" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "homepage_blocks_funding_map_items_subitems_locales_locale_pa" ON "homepage_blocks_funding_map_items_subitems_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "homepage_blocks_funding_map_items_order_idx" ON "homepage_blocks_funding_map_items" USING btree ("_order");
  CREATE INDEX "homepage_blocks_funding_map_items_parent_id_idx" ON "homepage_blocks_funding_map_items" USING btree ("_parent_id");
  CREATE INDEX "homepage_blocks_funding_map_order_idx" ON "homepage_blocks_funding_map" USING btree ("_order");
  CREATE INDEX "homepage_blocks_funding_map_parent_id_idx" ON "homepage_blocks_funding_map" USING btree ("_parent_id");
  CREATE INDEX "homepage_blocks_funding_map_path_idx" ON "homepage_blocks_funding_map" USING btree ("_path");
  CREATE UNIQUE INDEX "homepage_blocks_funding_map_locales_locale_parent_id_unique" ON "homepage_blocks_funding_map_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_homepage_v_blocks_pink_puffy_top_row_order_idx" ON "_homepage_v_blocks_pink_puffy_top_row" USING btree ("_order");
  CREATE INDEX "_homepage_v_blocks_pink_puffy_top_row_parent_id_idx" ON "_homepage_v_blocks_pink_puffy_top_row" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_homepage_v_blocks_pink_puffy_top_row_locales_locale_parent_" ON "_homepage_v_blocks_pink_puffy_top_row_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_homepage_v_blocks_pink_puffy_bot_row_order_idx" ON "_homepage_v_blocks_pink_puffy_bot_row" USING btree ("_order");
  CREATE INDEX "_homepage_v_blocks_pink_puffy_bot_row_parent_id_idx" ON "_homepage_v_blocks_pink_puffy_bot_row" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_homepage_v_blocks_pink_puffy_bot_row_locales_locale_parent_" ON "_homepage_v_blocks_pink_puffy_bot_row_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_homepage_v_blocks_pink_puffy_links_order_idx" ON "_homepage_v_blocks_pink_puffy_links" USING btree ("_order");
  CREATE INDEX "_homepage_v_blocks_pink_puffy_links_parent_id_idx" ON "_homepage_v_blocks_pink_puffy_links" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_homepage_v_blocks_pink_puffy_links_locales_locale_parent_id" ON "_homepage_v_blocks_pink_puffy_links_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_homepage_v_blocks_pink_puffy_order_idx" ON "_homepage_v_blocks_pink_puffy" USING btree ("_order");
  CREATE INDEX "_homepage_v_blocks_pink_puffy_parent_id_idx" ON "_homepage_v_blocks_pink_puffy" USING btree ("_parent_id");
  CREATE INDEX "_homepage_v_blocks_pink_puffy_path_idx" ON "_homepage_v_blocks_pink_puffy" USING btree ("_path");
  CREATE UNIQUE INDEX "_homepage_v_blocks_pink_puffy_locales_locale_parent_id_uniqu" ON "_homepage_v_blocks_pink_puffy_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_homepage_v_blocks_beige_puffy_items_order_idx" ON "_homepage_v_blocks_beige_puffy_items" USING btree ("_order");
  CREATE INDEX "_homepage_v_blocks_beige_puffy_items_parent_id_idx" ON "_homepage_v_blocks_beige_puffy_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_homepage_v_blocks_beige_puffy_items_locales_locale_parent_i" ON "_homepage_v_blocks_beige_puffy_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_homepage_v_blocks_beige_puffy_order_idx" ON "_homepage_v_blocks_beige_puffy" USING btree ("_order");
  CREATE INDEX "_homepage_v_blocks_beige_puffy_parent_id_idx" ON "_homepage_v_blocks_beige_puffy" USING btree ("_parent_id");
  CREATE INDEX "_homepage_v_blocks_beige_puffy_path_idx" ON "_homepage_v_blocks_beige_puffy" USING btree ("_path");
  CREATE UNIQUE INDEX "_homepage_v_blocks_beige_puffy_locales_locale_parent_id_uniq" ON "_homepage_v_blocks_beige_puffy_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_homepage_v_blocks_funding_map_items_subitems_order_idx" ON "_homepage_v_blocks_funding_map_items_subitems" USING btree ("_order");
  CREATE INDEX "_homepage_v_blocks_funding_map_items_subitems_parent_id_idx" ON "_homepage_v_blocks_funding_map_items_subitems" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_homepage_v_blocks_funding_map_items_subitems_locales_locale" ON "_homepage_v_blocks_funding_map_items_subitems_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_homepage_v_blocks_funding_map_items_order_idx" ON "_homepage_v_blocks_funding_map_items" USING btree ("_order");
  CREATE INDEX "_homepage_v_blocks_funding_map_items_parent_id_idx" ON "_homepage_v_blocks_funding_map_items" USING btree ("_parent_id");
  CREATE INDEX "_homepage_v_blocks_funding_map_order_idx" ON "_homepage_v_blocks_funding_map" USING btree ("_order");
  CREATE INDEX "_homepage_v_blocks_funding_map_parent_id_idx" ON "_homepage_v_blocks_funding_map" USING btree ("_parent_id");
  CREATE INDEX "_homepage_v_blocks_funding_map_path_idx" ON "_homepage_v_blocks_funding_map" USING btree ("_path");
  CREATE UNIQUE INDEX "_homepage_v_blocks_funding_map_locales_locale_parent_id_uniq" ON "_homepage_v_blocks_funding_map_locales" USING btree ("_locale","_parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "grants_blocks_resource_feat_card" CASCADE;
  DROP TABLE "_grants_v_blocks_resource_feat_card" CASCADE;
  DROP TABLE "pages_blocks_resource_feat_card" CASCADE;
  DROP TABLE "_pages_v_blocks_resource_feat_card" CASCADE;
  DROP TABLE "blog_blocks_resource_feat_card" CASCADE;
  DROP TABLE "_blog_v_blocks_resource_feat_card" CASCADE;
  DROP TABLE "reports_blocks_resource_feat_card" CASCADE;
  DROP TABLE "_reports_v_blocks_resource_feat_card" CASCADE;
  DROP TABLE "mmedia_blocks_resource_feat_card" CASCADE;
  DROP TABLE "_mmedia_v_blocks_resource_feat_card" CASCADE;
  DROP TABLE "homepage_blocks_pink_puffy_top_row" CASCADE;
  DROP TABLE "homepage_blocks_pink_puffy_top_row_locales" CASCADE;
  DROP TABLE "homepage_blocks_pink_puffy_bot_row" CASCADE;
  DROP TABLE "homepage_blocks_pink_puffy_bot_row_locales" CASCADE;
  DROP TABLE "homepage_blocks_pink_puffy_links" CASCADE;
  DROP TABLE "homepage_blocks_pink_puffy_links_locales" CASCADE;
  DROP TABLE "homepage_blocks_pink_puffy" CASCADE;
  DROP TABLE "homepage_blocks_pink_puffy_locales" CASCADE;
  DROP TABLE "homepage_blocks_beige_puffy_items" CASCADE;
  DROP TABLE "homepage_blocks_beige_puffy_items_locales" CASCADE;
  DROP TABLE "homepage_blocks_beige_puffy" CASCADE;
  DROP TABLE "homepage_blocks_beige_puffy_locales" CASCADE;
  DROP TABLE "homepage_blocks_funding_map_items_subitems" CASCADE;
  DROP TABLE "homepage_blocks_funding_map_items_subitems_locales" CASCADE;
  DROP TABLE "homepage_blocks_funding_map_items" CASCADE;
  DROP TABLE "homepage_blocks_funding_map" CASCADE;
  DROP TABLE "homepage_blocks_funding_map_locales" CASCADE;
  DROP TABLE "_homepage_v_blocks_pink_puffy_top_row" CASCADE;
  DROP TABLE "_homepage_v_blocks_pink_puffy_top_row_locales" CASCADE;
  DROP TABLE "_homepage_v_blocks_pink_puffy_bot_row" CASCADE;
  DROP TABLE "_homepage_v_blocks_pink_puffy_bot_row_locales" CASCADE;
  DROP TABLE "_homepage_v_blocks_pink_puffy_links" CASCADE;
  DROP TABLE "_homepage_v_blocks_pink_puffy_links_locales" CASCADE;
  DROP TABLE "_homepage_v_blocks_pink_puffy" CASCADE;
  DROP TABLE "_homepage_v_blocks_pink_puffy_locales" CASCADE;
  DROP TABLE "_homepage_v_blocks_beige_puffy_items" CASCADE;
  DROP TABLE "_homepage_v_blocks_beige_puffy_items_locales" CASCADE;
  DROP TABLE "_homepage_v_blocks_beige_puffy" CASCADE;
  DROP TABLE "_homepage_v_blocks_beige_puffy_locales" CASCADE;
  DROP TABLE "_homepage_v_blocks_funding_map_items_subitems" CASCADE;
  DROP TABLE "_homepage_v_blocks_funding_map_items_subitems_locales" CASCADE;
  DROP TABLE "_homepage_v_blocks_funding_map_items" CASCADE;
  DROP TABLE "_homepage_v_blocks_funding_map" CASCADE;
  DROP TABLE "_homepage_v_blocks_funding_map_locales" CASCADE;
  DROP TYPE "public"."enum_homepage_blocks_pink_puffy_links_link_type";
  DROP TYPE "public"."enum_homepage_blocks_pink_puffy_align";
  DROP TYPE "public"."enum_homepage_blocks_beige_puffy_align";
  DROP TYPE "public"."enum_homepage_blocks_funding_map_items_region_name";
  DROP TYPE "public"."enum__homepage_v_blocks_pink_puffy_links_link_type";
  DROP TYPE "public"."enum__homepage_v_blocks_pink_puffy_align";
  DROP TYPE "public"."enum__homepage_v_blocks_beige_puffy_align";
  DROP TYPE "public"."enum__homepage_v_blocks_funding_map_items_region_name";`)
}
