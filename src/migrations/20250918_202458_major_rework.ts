import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_grants_buttons_link_type" AS ENUM('reference', 'custom', 'email');
  CREATE TYPE "public"."enum_grants_page_type" AS ENUM('landing', 'individual');
  CREATE TYPE "public"."enum_grants_bg_type" AS ENUM('wavy_top', 'wavy_full', 'trans_wavy_top', 'blob');
  CREATE TYPE "public"."enum__grants_v_version_buttons_link_type" AS ENUM('reference', 'custom', 'email');
  CREATE TYPE "public"."enum__grants_v_version_page_type" AS ENUM('landing', 'individual');
  CREATE TYPE "public"."enum__grants_v_version_bg_type" AS ENUM('wavy_top', 'wavy_full', 'trans_wavy_top', 'blob');
  CREATE TYPE "public"."enum_grantcards_card_buttons_link_type" AS ENUM('reference', 'custom', 'email');
  CREATE TYPE "public"."enum_grantcards_active_period" AS ENUM('open_all_year', 'specific_period', 'closed');
  CREATE TYPE "public"."enum_grantcards_card_colour" AS ENUM('forest', 'turmeric', 'sky', 'rose', 'lavender', 'fire', 'trans');
  CREATE TYPE "public"."enum_grantcards_badge_type" AS ENUM('info', 'imp', 'inactive');
  CREATE TYPE "public"."enum_grantcards_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__grantcards_v_version_card_buttons_link_type" AS ENUM('reference', 'custom', 'email');
  CREATE TYPE "public"."enum__grantcards_v_version_active_period" AS ENUM('open_all_year', 'specific_period', 'closed');
  CREATE TYPE "public"."enum__grantcards_v_version_card_colour" AS ENUM('forest', 'turmeric', 'sky', 'rose', 'lavender', 'fire', 'trans');
  CREATE TYPE "public"."enum__grantcards_v_version_badge_type" AS ENUM('info', 'imp', 'inactive');
  CREATE TYPE "public"."enum__grantcards_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__grantcards_v_published_locale" AS ENUM('en', 'ar', 'bi', 'bn-IN', 'br', 'ch', 'prs-Arab', 'km', 'hi', 'ms', 'ne', 'ps-Arab', 'pcm', 'si', 'tl', 'ta', 'th', 'vi', 'ur');
  ALTER TYPE "public"."enum_grants_blocks_mcol_info_block_multicols_link_type" ADD VALUE 'email';
  ALTER TYPE "public"."enum__grants_v_blocks_mcol_info_block_multicols_link_type" ADD VALUE 'email';
  ALTER TYPE "public"."enum_homepage_hero_section_cta_button_link_type" ADD VALUE 'email';
  ALTER TYPE "public"."enum_homepage_blocks_secondarycta_cta_button_link_type" ADD VALUE 'email';
  ALTER TYPE "public"."enum__homepage_v_version_hero_section_cta_button_link_type" ADD VALUE 'email';
  ALTER TYPE "public"."enum__homepage_v_blocks_secondarycta_cta_button_link_type" ADD VALUE 'email';
  ALTER TYPE "public"."enum_nav_menu_items_nav_items_link_type" ADD VALUE 'email';
  CREATE TABLE "grants_buttons" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_grants_buttons_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_download_link" boolean,
  	"link_pill_solid" boolean,
  	"link_pill_outline" boolean,
  	"link_url" varchar,
  	"link_email" varchar
  );
  
  CREATE TABLE "grants_buttons_locales" (
  	"link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "grants_locales" (
  	"hero_title" varchar,
  	"hero_subtitle" varchar,
  	"hero_contact_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_grants_v_version_buttons" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"link_type" "enum__grants_v_version_buttons_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_download_link" boolean,
  	"link_pill_solid" boolean,
  	"link_pill_outline" boolean,
  	"link_url" varchar,
  	"link_email" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_grants_v_version_buttons_locales" (
  	"link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_grants_v_locales" (
  	"version_hero_title" varchar,
  	"version_hero_subtitle" varchar,
  	"version_hero_contact_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "grantcards_grant_specs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "grantcards_grant_specs_locales" (
  	"spec" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "grantcards_card_buttons" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_grantcards_card_buttons_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_download_link" boolean,
  	"link_pill_solid" boolean,
  	"link_pill_outline" boolean,
  	"link_url" varchar,
  	"link_email" varchar
  );
  
  CREATE TABLE "grantcards_card_buttons_locales" (
  	"link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "grantcards" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"show_home" boolean DEFAULT true,
  	"order" numeric,
  	"active_period" "enum_grantcards_active_period" DEFAULT 'open_all_year',
  	"start_date" timestamp(3) with time zone,
  	"end_date" timestamp(3) with time zone,
  	"card_colour" "enum_grantcards_card_colour" DEFAULT 'forest',
  	"mascot_id" integer,
  	"badge_type" "enum_grantcards_badge_type" DEFAULT 'info',
  	"slug" varchar,
  	"slug_lock" boolean DEFAULT true,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_grantcards_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "grantcards_locales" (
  	"title" varchar,
  	"desc" varchar,
  	"badge_text" varchar,
  	"grant_uses" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "grantcards_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"grants_id" integer,
  	"posts_id" integer
  );
  
  CREATE TABLE "_grantcards_v_version_grant_specs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_grantcards_v_version_grant_specs_locales" (
  	"spec" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_grantcards_v_version_card_buttons" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"link_type" "enum__grantcards_v_version_card_buttons_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_download_link" boolean,
  	"link_pill_solid" boolean,
  	"link_pill_outline" boolean,
  	"link_url" varchar,
  	"link_email" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_grantcards_v_version_card_buttons_locales" (
  	"link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_grantcards_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_show_home" boolean DEFAULT true,
  	"version_order" numeric,
  	"version_active_period" "enum__grantcards_v_version_active_period" DEFAULT 'open_all_year',
  	"version_start_date" timestamp(3) with time zone,
  	"version_end_date" timestamp(3) with time zone,
  	"version_card_colour" "enum__grantcards_v_version_card_colour" DEFAULT 'forest',
  	"version_mascot_id" integer,
  	"version_badge_type" "enum__grantcards_v_version_badge_type" DEFAULT 'info',
  	"version_slug" varchar,
  	"version_slug_lock" boolean DEFAULT true,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__grantcards_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "enum__grantcards_v_published_locale",
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "_grantcards_v_locales" (
  	"version_title" varchar,
  	"version_desc" varchar,
  	"version_badge_text" varchar,
  	"version_grant_uses" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_grantcards_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"grants_id" integer,
  	"posts_id" integer
  );
  
  ALTER TABLE "grants_blocks_grants_hero_block_hero_buttons" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "grants_blocks_grants_hero_block_hero_buttons_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "grants_blocks_grants_hero_block" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "grants_blocks_grants_hero_block_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_grants_v_blocks_grants_hero_block_hero_buttons" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_grants_v_blocks_grants_hero_block_hero_buttons_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_grants_v_blocks_grants_hero_block" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_grants_v_blocks_grants_hero_block_locales" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "grants_blocks_grants_hero_block_hero_buttons" CASCADE;
  DROP TABLE "grants_blocks_grants_hero_block_hero_buttons_locales" CASCADE;
  DROP TABLE "grants_blocks_grants_hero_block" CASCADE;
  DROP TABLE "grants_blocks_grants_hero_block_locales" CASCADE;
  DROP TABLE "_grants_v_blocks_grants_hero_block_hero_buttons" CASCADE;
  DROP TABLE "_grants_v_blocks_grants_hero_block_hero_buttons_locales" CASCADE;
  DROP TABLE "_grants_v_blocks_grants_hero_block" CASCADE;
  DROP TABLE "_grants_v_blocks_grants_hero_block_locales" CASCADE;
  ALTER TABLE "grants_blocks_mcol_info_block_multicols" ADD COLUMN "link_pill_solid" boolean;
  ALTER TABLE "grants_blocks_mcol_info_block_multicols" ADD COLUMN "link_pill_outline" boolean;
  ALTER TABLE "grants_blocks_mcol_info_block_multicols" ADD COLUMN "link_email" varchar;
  ALTER TABLE "grants" ADD COLUMN "page_type" "enum_grants_page_type" DEFAULT 'landing';
  ALTER TABLE "grants" ADD COLUMN "grant_card_id" integer;
  ALTER TABLE "grants" ADD COLUMN "bg_type" "enum_grants_bg_type";
  ALTER TABLE "grants" ADD COLUMN "hero_contact_email" varchar;
  ALTER TABLE "_grants_v_blocks_mcol_info_block_multicols" ADD COLUMN "link_pill_solid" boolean;
  ALTER TABLE "_grants_v_blocks_mcol_info_block_multicols" ADD COLUMN "link_pill_outline" boolean;
  ALTER TABLE "_grants_v_blocks_mcol_info_block_multicols" ADD COLUMN "link_email" varchar;
  ALTER TABLE "_grants_v" ADD COLUMN "version_page_type" "enum__grants_v_version_page_type" DEFAULT 'landing';
  ALTER TABLE "_grants_v" ADD COLUMN "version_grant_card_id" integer;
  ALTER TABLE "_grants_v" ADD COLUMN "version_bg_type" "enum__grants_v_version_bg_type";
  ALTER TABLE "_grants_v" ADD COLUMN "version_hero_contact_email" varchar;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "grantcards_id" integer;
  ALTER TABLE "homepage_hero_section_cta_button" ADD COLUMN "link_pill_solid" boolean;
  ALTER TABLE "homepage_hero_section_cta_button" ADD COLUMN "link_pill_outline" boolean;
  ALTER TABLE "homepage_hero_section_cta_button" ADD COLUMN "link_email" varchar;
  ALTER TABLE "homepage_blocks_secondarycta_cta_button" ADD COLUMN "link_pill_solid" boolean;
  ALTER TABLE "homepage_blocks_secondarycta_cta_button" ADD COLUMN "link_pill_outline" boolean;
  ALTER TABLE "homepage_blocks_secondarycta_cta_button" ADD COLUMN "link_email" varchar;
  ALTER TABLE "_homepage_v_version_hero_section_cta_button" ADD COLUMN "link_pill_solid" boolean;
  ALTER TABLE "_homepage_v_version_hero_section_cta_button" ADD COLUMN "link_pill_outline" boolean;
  ALTER TABLE "_homepage_v_version_hero_section_cta_button" ADD COLUMN "link_email" varchar;
  ALTER TABLE "_homepage_v_blocks_secondarycta_cta_button" ADD COLUMN "link_pill_solid" boolean;
  ALTER TABLE "_homepage_v_blocks_secondarycta_cta_button" ADD COLUMN "link_pill_outline" boolean;
  ALTER TABLE "_homepage_v_blocks_secondarycta_cta_button" ADD COLUMN "link_email" varchar;
  ALTER TABLE "nav_menu_items_nav_items" ADD COLUMN "link_pill_solid" boolean;
  ALTER TABLE "nav_menu_items_nav_items" ADD COLUMN "link_pill_outline" boolean;
  ALTER TABLE "nav_menu_items_nav_items" ADD COLUMN "link_email" varchar;
  ALTER TABLE "grants_buttons" ADD CONSTRAINT "grants_buttons_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."grants"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "grants_buttons_locales" ADD CONSTRAINT "grants_buttons_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."grants_buttons"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "grants_locales" ADD CONSTRAINT "grants_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."grants"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_grants_v_version_buttons" ADD CONSTRAINT "_grants_v_version_buttons_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_grants_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_grants_v_version_buttons_locales" ADD CONSTRAINT "_grants_v_version_buttons_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_grants_v_version_buttons"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_grants_v_locales" ADD CONSTRAINT "_grants_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_grants_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "grantcards_grant_specs" ADD CONSTRAINT "grantcards_grant_specs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."grantcards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "grantcards_grant_specs_locales" ADD CONSTRAINT "grantcards_grant_specs_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."grantcards_grant_specs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "grantcards_card_buttons" ADD CONSTRAINT "grantcards_card_buttons_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."grantcards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "grantcards_card_buttons_locales" ADD CONSTRAINT "grantcards_card_buttons_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."grantcards_card_buttons"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "grantcards" ADD CONSTRAINT "grantcards_mascot_id_media_cloud_id_fk" FOREIGN KEY ("mascot_id") REFERENCES "public"."media_cloud"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "grantcards_locales" ADD CONSTRAINT "grantcards_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."grantcards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "grantcards_rels" ADD CONSTRAINT "grantcards_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."grantcards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "grantcards_rels" ADD CONSTRAINT "grantcards_rels_grants_fk" FOREIGN KEY ("grants_id") REFERENCES "public"."grants"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "grantcards_rels" ADD CONSTRAINT "grantcards_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_grantcards_v_version_grant_specs" ADD CONSTRAINT "_grantcards_v_version_grant_specs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_grantcards_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_grantcards_v_version_grant_specs_locales" ADD CONSTRAINT "_grantcards_v_version_grant_specs_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_grantcards_v_version_grant_specs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_grantcards_v_version_card_buttons" ADD CONSTRAINT "_grantcards_v_version_card_buttons_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_grantcards_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_grantcards_v_version_card_buttons_locales" ADD CONSTRAINT "_grantcards_v_version_card_buttons_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_grantcards_v_version_card_buttons"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_grantcards_v" ADD CONSTRAINT "_grantcards_v_parent_id_grantcards_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."grantcards"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_grantcards_v" ADD CONSTRAINT "_grantcards_v_version_mascot_id_media_cloud_id_fk" FOREIGN KEY ("version_mascot_id") REFERENCES "public"."media_cloud"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_grantcards_v_locales" ADD CONSTRAINT "_grantcards_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_grantcards_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_grantcards_v_rels" ADD CONSTRAINT "_grantcards_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_grantcards_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_grantcards_v_rels" ADD CONSTRAINT "_grantcards_v_rels_grants_fk" FOREIGN KEY ("grants_id") REFERENCES "public"."grants"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_grantcards_v_rels" ADD CONSTRAINT "_grantcards_v_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "grants_buttons_order_idx" ON "grants_buttons" USING btree ("_order");
  CREATE INDEX "grants_buttons_parent_id_idx" ON "grants_buttons" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "grants_buttons_locales_locale_parent_id_unique" ON "grants_buttons_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "grants_locales_locale_parent_id_unique" ON "grants_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_grants_v_version_buttons_order_idx" ON "_grants_v_version_buttons" USING btree ("_order");
  CREATE INDEX "_grants_v_version_buttons_parent_id_idx" ON "_grants_v_version_buttons" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_grants_v_version_buttons_locales_locale_parent_id_unique" ON "_grants_v_version_buttons_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "_grants_v_locales_locale_parent_id_unique" ON "_grants_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "grantcards_grant_specs_order_idx" ON "grantcards_grant_specs" USING btree ("_order");
  CREATE INDEX "grantcards_grant_specs_parent_id_idx" ON "grantcards_grant_specs" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "grantcards_grant_specs_locales_locale_parent_id_unique" ON "grantcards_grant_specs_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "grantcards_card_buttons_order_idx" ON "grantcards_card_buttons" USING btree ("_order");
  CREATE INDEX "grantcards_card_buttons_parent_id_idx" ON "grantcards_card_buttons" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "grantcards_card_buttons_locales_locale_parent_id_unique" ON "grantcards_card_buttons_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "grantcards_active_period_idx" ON "grantcards" USING btree ("active_period");
  CREATE INDEX "grantcards_mascot_idx" ON "grantcards" USING btree ("mascot_id");
  CREATE INDEX "grantcards_slug_idx" ON "grantcards" USING btree ("slug");
  CREATE INDEX "grantcards_updated_at_idx" ON "grantcards" USING btree ("updated_at");
  CREATE INDEX "grantcards_created_at_idx" ON "grantcards" USING btree ("created_at");
  CREATE INDEX "grantcards__status_idx" ON "grantcards" USING btree ("_status");
  CREATE UNIQUE INDEX "grantcards_title_idx" ON "grantcards_locales" USING btree ("title","_locale");
  CREATE UNIQUE INDEX "grantcards_locales_locale_parent_id_unique" ON "grantcards_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "grantcards_rels_order_idx" ON "grantcards_rels" USING btree ("order");
  CREATE INDEX "grantcards_rels_parent_idx" ON "grantcards_rels" USING btree ("parent_id");
  CREATE INDEX "grantcards_rels_path_idx" ON "grantcards_rels" USING btree ("path");
  CREATE INDEX "grantcards_rels_grants_id_idx" ON "grantcards_rels" USING btree ("grants_id");
  CREATE INDEX "grantcards_rels_posts_id_idx" ON "grantcards_rels" USING btree ("posts_id");
  CREATE INDEX "_grantcards_v_version_grant_specs_order_idx" ON "_grantcards_v_version_grant_specs" USING btree ("_order");
  CREATE INDEX "_grantcards_v_version_grant_specs_parent_id_idx" ON "_grantcards_v_version_grant_specs" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_grantcards_v_version_grant_specs_locales_locale_parent_id_unique" ON "_grantcards_v_version_grant_specs_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_grantcards_v_version_card_buttons_order_idx" ON "_grantcards_v_version_card_buttons" USING btree ("_order");
  CREATE INDEX "_grantcards_v_version_card_buttons_parent_id_idx" ON "_grantcards_v_version_card_buttons" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_grantcards_v_version_card_buttons_locales_locale_parent_id_unique" ON "_grantcards_v_version_card_buttons_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_grantcards_v_parent_idx" ON "_grantcards_v" USING btree ("parent_id");
  CREATE INDEX "_grantcards_v_version_version_active_period_idx" ON "_grantcards_v" USING btree ("version_active_period");
  CREATE INDEX "_grantcards_v_version_version_mascot_idx" ON "_grantcards_v" USING btree ("version_mascot_id");
  CREATE INDEX "_grantcards_v_version_version_slug_idx" ON "_grantcards_v" USING btree ("version_slug");
  CREATE INDEX "_grantcards_v_version_version_updated_at_idx" ON "_grantcards_v" USING btree ("version_updated_at");
  CREATE INDEX "_grantcards_v_version_version_created_at_idx" ON "_grantcards_v" USING btree ("version_created_at");
  CREATE INDEX "_grantcards_v_version_version__status_idx" ON "_grantcards_v" USING btree ("version__status");
  CREATE INDEX "_grantcards_v_created_at_idx" ON "_grantcards_v" USING btree ("created_at");
  CREATE INDEX "_grantcards_v_updated_at_idx" ON "_grantcards_v" USING btree ("updated_at");
  CREATE INDEX "_grantcards_v_snapshot_idx" ON "_grantcards_v" USING btree ("snapshot");
  CREATE INDEX "_grantcards_v_published_locale_idx" ON "_grantcards_v" USING btree ("published_locale");
  CREATE INDEX "_grantcards_v_latest_idx" ON "_grantcards_v" USING btree ("latest");
  CREATE INDEX "_grantcards_v_autosave_idx" ON "_grantcards_v" USING btree ("autosave");
  CREATE INDEX "_grantcards_v_version_version_title_idx" ON "_grantcards_v_locales" USING btree ("version_title","_locale");
  CREATE UNIQUE INDEX "_grantcards_v_locales_locale_parent_id_unique" ON "_grantcards_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_grantcards_v_rels_order_idx" ON "_grantcards_v_rels" USING btree ("order");
  CREATE INDEX "_grantcards_v_rels_parent_idx" ON "_grantcards_v_rels" USING btree ("parent_id");
  CREATE INDEX "_grantcards_v_rels_path_idx" ON "_grantcards_v_rels" USING btree ("path");
  CREATE INDEX "_grantcards_v_rels_grants_id_idx" ON "_grantcards_v_rels" USING btree ("grants_id");
  CREATE INDEX "_grantcards_v_rels_posts_id_idx" ON "_grantcards_v_rels" USING btree ("posts_id");
  ALTER TABLE "grants" ADD CONSTRAINT "grants_grant_card_id_grantcards_id_fk" FOREIGN KEY ("grant_card_id") REFERENCES "public"."grantcards"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_grants_v" ADD CONSTRAINT "_grants_v_version_grant_card_id_grantcards_id_fk" FOREIGN KEY ("version_grant_card_id") REFERENCES "public"."grantcards"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_grantcards_fk" FOREIGN KEY ("grantcards_id") REFERENCES "public"."grantcards"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "grants_grant_card_idx" ON "grants" USING btree ("grant_card_id");
  CREATE INDEX "_grants_v_version_version_grant_card_idx" ON "_grants_v" USING btree ("version_grant_card_id");
  CREATE INDEX "payload_locked_documents_rels_grantcards_id_idx" ON "payload_locked_documents_rels" USING btree ("grantcards_id");
  ALTER TABLE "homepage_hero_section_cta_button" DROP COLUMN "button_primary";
  ALTER TABLE "homepage_blocks_secondarycta_cta_button" DROP COLUMN "button_primary";
  ALTER TABLE "_homepage_v_version_hero_section_cta_button" DROP COLUMN "button_primary";
  ALTER TABLE "_homepage_v_blocks_secondarycta_cta_button" DROP COLUMN "button_primary";
  DROP TYPE "public"."enum_grants_blocks_grants_hero_block_hero_buttons_link_type";
  DROP TYPE "public"."enum_grants_blocks_grants_hero_block_badge_type";
  DROP TYPE "public"."enum_grants_blocks_grants_hero_block_header_colour";
  DROP TYPE "public"."enum__grants_v_blocks_grants_hero_block_hero_buttons_link_type";
  DROP TYPE "public"."enum__grants_v_blocks_grants_hero_block_badge_type";
  DROP TYPE "public"."enum__grants_v_blocks_grants_hero_block_header_colour";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_grants_blocks_grants_hero_block_hero_buttons_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_grants_blocks_grants_hero_block_badge_type" AS ENUM('info', 'imp');
  CREATE TYPE "public"."enum_grants_blocks_grants_hero_block_header_colour" AS ENUM('blank', 'forest', 'turmeric', 'sky', 'rose');
  CREATE TYPE "public"."enum__grants_v_blocks_grants_hero_block_hero_buttons_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__grants_v_blocks_grants_hero_block_badge_type" AS ENUM('info', 'imp');
  CREATE TYPE "public"."enum__grants_v_blocks_grants_hero_block_header_colour" AS ENUM('blank', 'forest', 'turmeric', 'sky', 'rose');
  CREATE TABLE "grants_blocks_grants_hero_block_hero_buttons" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"button_primary" boolean DEFAULT false,
  	"link_type" "enum_grants_blocks_grants_hero_block_hero_buttons_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_download_link" boolean,
  	"link_url" varchar
  );
  
  CREATE TABLE "grants_blocks_grants_hero_block_hero_buttons_locales" (
  	"link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "grants_blocks_grants_hero_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"hero_image_id" integer,
  	"badge_type" "enum_grants_blocks_grants_hero_block_badge_type" DEFAULT 'info',
  	"header_colour" "enum_grants_blocks_grants_hero_block_header_colour" DEFAULT 'blank',
  	"hero_contact_email" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "grants_blocks_grants_hero_block_locales" (
  	"title" varchar,
  	"subtitle" varchar,
  	"badge_text" varchar,
  	"hero_contact_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "_grants_v_blocks_grants_hero_block_hero_buttons" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"button_primary" boolean DEFAULT false,
  	"link_type" "enum__grants_v_blocks_grants_hero_block_hero_buttons_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_download_link" boolean,
  	"link_url" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_grants_v_blocks_grants_hero_block_hero_buttons_locales" (
  	"link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_grants_v_blocks_grants_hero_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"hero_image_id" integer,
  	"badge_type" "enum__grants_v_blocks_grants_hero_block_badge_type" DEFAULT 'info',
  	"header_colour" "enum__grants_v_blocks_grants_hero_block_header_colour" DEFAULT 'blank',
  	"hero_contact_email" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_grants_v_blocks_grants_hero_block_locales" (
  	"title" varchar,
  	"subtitle" varchar,
  	"badge_text" varchar,
  	"hero_contact_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  ALTER TABLE "grants_buttons" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "grants_buttons_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "grants_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_grants_v_version_buttons" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_grants_v_version_buttons_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_grants_v_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "grantcards_grant_specs" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "grantcards_grant_specs_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "grantcards_card_buttons" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "grantcards_card_buttons_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "grantcards" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "grantcards_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "grantcards_rels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_grantcards_v_version_grant_specs" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_grantcards_v_version_grant_specs_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_grantcards_v_version_card_buttons" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_grantcards_v_version_card_buttons_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_grantcards_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_grantcards_v_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_grantcards_v_rels" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "grants_buttons" CASCADE;
  DROP TABLE "grants_buttons_locales" CASCADE;
  DROP TABLE "grants_locales" CASCADE;
  DROP TABLE "_grants_v_version_buttons" CASCADE;
  DROP TABLE "_grants_v_version_buttons_locales" CASCADE;
  DROP TABLE "_grants_v_locales" CASCADE;
  DROP TABLE "grantcards_grant_specs" CASCADE;
  DROP TABLE "grantcards_grant_specs_locales" CASCADE;
  DROP TABLE "grantcards_card_buttons" CASCADE;
  DROP TABLE "grantcards_card_buttons_locales" CASCADE;
  DROP TABLE "grantcards" CASCADE;
  DROP TABLE "grantcards_locales" CASCADE;
  DROP TABLE "grantcards_rels" CASCADE;
  DROP TABLE "_grantcards_v_version_grant_specs" CASCADE;
  DROP TABLE "_grantcards_v_version_grant_specs_locales" CASCADE;
  DROP TABLE "_grantcards_v_version_card_buttons" CASCADE;
  DROP TABLE "_grantcards_v_version_card_buttons_locales" CASCADE;
  DROP TABLE "_grantcards_v" CASCADE;
  DROP TABLE "_grantcards_v_locales" CASCADE;
  DROP TABLE "_grantcards_v_rels" CASCADE;
  ALTER TABLE "grants" DROP CONSTRAINT "grants_grant_card_id_grantcards_id_fk";
  
  ALTER TABLE "_grants_v" DROP CONSTRAINT "_grants_v_version_grant_card_id_grantcards_id_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_grantcards_fk";
  
  ALTER TABLE "grants_blocks_mcol_info_block_multicols" ALTER COLUMN "link_type" SET DATA TYPE text;
  ALTER TABLE "grants_blocks_mcol_info_block_multicols" ALTER COLUMN "link_type" SET DEFAULT 'reference'::text;
  DROP TYPE "public"."enum_grants_blocks_mcol_info_block_multicols_link_type";
  CREATE TYPE "public"."enum_grants_blocks_mcol_info_block_multicols_link_type" AS ENUM('reference', 'custom');
  ALTER TABLE "grants_blocks_mcol_info_block_multicols" ALTER COLUMN "link_type" SET DEFAULT 'reference'::"public"."enum_grants_blocks_mcol_info_block_multicols_link_type";
  ALTER TABLE "grants_blocks_mcol_info_block_multicols" ALTER COLUMN "link_type" SET DATA TYPE "public"."enum_grants_blocks_mcol_info_block_multicols_link_type" USING "link_type"::"public"."enum_grants_blocks_mcol_info_block_multicols_link_type";
  ALTER TABLE "_grants_v_blocks_mcol_info_block_multicols" ALTER COLUMN "link_type" SET DATA TYPE text;
  ALTER TABLE "_grants_v_blocks_mcol_info_block_multicols" ALTER COLUMN "link_type" SET DEFAULT 'reference'::text;
  DROP TYPE "public"."enum__grants_v_blocks_mcol_info_block_multicols_link_type";
  CREATE TYPE "public"."enum__grants_v_blocks_mcol_info_block_multicols_link_type" AS ENUM('reference', 'custom');
  ALTER TABLE "_grants_v_blocks_mcol_info_block_multicols" ALTER COLUMN "link_type" SET DEFAULT 'reference'::"public"."enum__grants_v_blocks_mcol_info_block_multicols_link_type";
  ALTER TABLE "_grants_v_blocks_mcol_info_block_multicols" ALTER COLUMN "link_type" SET DATA TYPE "public"."enum__grants_v_blocks_mcol_info_block_multicols_link_type" USING "link_type"::"public"."enum__grants_v_blocks_mcol_info_block_multicols_link_type";
  ALTER TABLE "homepage_hero_section_cta_button" ALTER COLUMN "link_type" SET DATA TYPE text;
  ALTER TABLE "homepage_hero_section_cta_button" ALTER COLUMN "link_type" SET DEFAULT 'reference'::text;
  DROP TYPE "public"."enum_homepage_hero_section_cta_button_link_type";
  CREATE TYPE "public"."enum_homepage_hero_section_cta_button_link_type" AS ENUM('reference', 'custom');
  ALTER TABLE "homepage_hero_section_cta_button" ALTER COLUMN "link_type" SET DEFAULT 'reference'::"public"."enum_homepage_hero_section_cta_button_link_type";
  ALTER TABLE "homepage_hero_section_cta_button" ALTER COLUMN "link_type" SET DATA TYPE "public"."enum_homepage_hero_section_cta_button_link_type" USING "link_type"::"public"."enum_homepage_hero_section_cta_button_link_type";
  ALTER TABLE "homepage_blocks_secondarycta_cta_button" ALTER COLUMN "link_type" SET DATA TYPE text;
  ALTER TABLE "homepage_blocks_secondarycta_cta_button" ALTER COLUMN "link_type" SET DEFAULT 'reference'::text;
  DROP TYPE "public"."enum_homepage_blocks_secondarycta_cta_button_link_type";
  CREATE TYPE "public"."enum_homepage_blocks_secondarycta_cta_button_link_type" AS ENUM('reference', 'custom');
  ALTER TABLE "homepage_blocks_secondarycta_cta_button" ALTER COLUMN "link_type" SET DEFAULT 'reference'::"public"."enum_homepage_blocks_secondarycta_cta_button_link_type";
  ALTER TABLE "homepage_blocks_secondarycta_cta_button" ALTER COLUMN "link_type" SET DATA TYPE "public"."enum_homepage_blocks_secondarycta_cta_button_link_type" USING "link_type"::"public"."enum_homepage_blocks_secondarycta_cta_button_link_type";
  ALTER TABLE "_homepage_v_version_hero_section_cta_button" ALTER COLUMN "link_type" SET DATA TYPE text;
  ALTER TABLE "_homepage_v_version_hero_section_cta_button" ALTER COLUMN "link_type" SET DEFAULT 'reference'::text;
  DROP TYPE "public"."enum__homepage_v_version_hero_section_cta_button_link_type";
  CREATE TYPE "public"."enum__homepage_v_version_hero_section_cta_button_link_type" AS ENUM('reference', 'custom');
  ALTER TABLE "_homepage_v_version_hero_section_cta_button" ALTER COLUMN "link_type" SET DEFAULT 'reference'::"public"."enum__homepage_v_version_hero_section_cta_button_link_type";
  ALTER TABLE "_homepage_v_version_hero_section_cta_button" ALTER COLUMN "link_type" SET DATA TYPE "public"."enum__homepage_v_version_hero_section_cta_button_link_type" USING "link_type"::"public"."enum__homepage_v_version_hero_section_cta_button_link_type";
  ALTER TABLE "_homepage_v_blocks_secondarycta_cta_button" ALTER COLUMN "link_type" SET DATA TYPE text;
  ALTER TABLE "_homepage_v_blocks_secondarycta_cta_button" ALTER COLUMN "link_type" SET DEFAULT 'reference'::text;
  DROP TYPE "public"."enum__homepage_v_blocks_secondarycta_cta_button_link_type";
  CREATE TYPE "public"."enum__homepage_v_blocks_secondarycta_cta_button_link_type" AS ENUM('reference', 'custom');
  ALTER TABLE "_homepage_v_blocks_secondarycta_cta_button" ALTER COLUMN "link_type" SET DEFAULT 'reference'::"public"."enum__homepage_v_blocks_secondarycta_cta_button_link_type";
  ALTER TABLE "_homepage_v_blocks_secondarycta_cta_button" ALTER COLUMN "link_type" SET DATA TYPE "public"."enum__homepage_v_blocks_secondarycta_cta_button_link_type" USING "link_type"::"public"."enum__homepage_v_blocks_secondarycta_cta_button_link_type";
  ALTER TABLE "nav_menu_items_nav_items" ALTER COLUMN "link_type" SET DATA TYPE text;
  ALTER TABLE "nav_menu_items_nav_items" ALTER COLUMN "link_type" SET DEFAULT 'reference'::text;
  DROP TYPE "public"."enum_nav_menu_items_nav_items_link_type";
  CREATE TYPE "public"."enum_nav_menu_items_nav_items_link_type" AS ENUM('reference', 'custom');
  ALTER TABLE "nav_menu_items_nav_items" ALTER COLUMN "link_type" SET DEFAULT 'reference'::"public"."enum_nav_menu_items_nav_items_link_type";
  ALTER TABLE "nav_menu_items_nav_items" ALTER COLUMN "link_type" SET DATA TYPE "public"."enum_nav_menu_items_nav_items_link_type" USING "link_type"::"public"."enum_nav_menu_items_nav_items_link_type";
  DROP INDEX "grants_grant_card_idx";
  DROP INDEX "_grants_v_version_version_grant_card_idx";
  DROP INDEX "payload_locked_documents_rels_grantcards_id_idx";
  ALTER TABLE "homepage_hero_section_cta_button" ADD COLUMN "button_primary" boolean DEFAULT false;
  ALTER TABLE "homepage_blocks_secondarycta_cta_button" ADD COLUMN "button_primary" boolean DEFAULT false;
  ALTER TABLE "_homepage_v_version_hero_section_cta_button" ADD COLUMN "button_primary" boolean DEFAULT false;
  ALTER TABLE "_homepage_v_blocks_secondarycta_cta_button" ADD COLUMN "button_primary" boolean DEFAULT false;
  ALTER TABLE "grants_blocks_grants_hero_block_hero_buttons" ADD CONSTRAINT "grants_blocks_grants_hero_block_hero_buttons_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."grants_blocks_grants_hero_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "grants_blocks_grants_hero_block_hero_buttons_locales" ADD CONSTRAINT "grants_blocks_grants_hero_block_hero_buttons_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."grants_blocks_grants_hero_block_hero_buttons"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "grants_blocks_grants_hero_block" ADD CONSTRAINT "grants_blocks_grants_hero_block_hero_image_id_media_cloud_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "public"."media_cloud"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "grants_blocks_grants_hero_block" ADD CONSTRAINT "grants_blocks_grants_hero_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."grants"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "grants_blocks_grants_hero_block_locales" ADD CONSTRAINT "grants_blocks_grants_hero_block_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."grants_blocks_grants_hero_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_grants_v_blocks_grants_hero_block_hero_buttons" ADD CONSTRAINT "_grants_v_blocks_grants_hero_block_hero_buttons_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_grants_v_blocks_grants_hero_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_grants_v_blocks_grants_hero_block_hero_buttons_locales" ADD CONSTRAINT "_grants_v_blocks_grants_hero_block_hero_buttons_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_grants_v_blocks_grants_hero_block_hero_buttons"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_grants_v_blocks_grants_hero_block" ADD CONSTRAINT "_grants_v_blocks_grants_hero_block_hero_image_id_media_cloud_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "public"."media_cloud"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_grants_v_blocks_grants_hero_block" ADD CONSTRAINT "_grants_v_blocks_grants_hero_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_grants_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_grants_v_blocks_grants_hero_block_locales" ADD CONSTRAINT "_grants_v_blocks_grants_hero_block_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_grants_v_blocks_grants_hero_block"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "grants_blocks_grants_hero_block_hero_buttons_order_idx" ON "grants_blocks_grants_hero_block_hero_buttons" USING btree ("_order");
  CREATE INDEX "grants_blocks_grants_hero_block_hero_buttons_parent_id_idx" ON "grants_blocks_grants_hero_block_hero_buttons" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "grants_blocks_grants_hero_block_hero_buttons_locales_locale_parent_id_unique" ON "grants_blocks_grants_hero_block_hero_buttons_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "grants_blocks_grants_hero_block_order_idx" ON "grants_blocks_grants_hero_block" USING btree ("_order");
  CREATE INDEX "grants_blocks_grants_hero_block_parent_id_idx" ON "grants_blocks_grants_hero_block" USING btree ("_parent_id");
  CREATE INDEX "grants_blocks_grants_hero_block_path_idx" ON "grants_blocks_grants_hero_block" USING btree ("_path");
  CREATE INDEX "grants_blocks_grants_hero_block_hero_image_idx" ON "grants_blocks_grants_hero_block" USING btree ("hero_image_id");
  CREATE UNIQUE INDEX "grants_blocks_grants_hero_block_locales_locale_parent_id_unique" ON "grants_blocks_grants_hero_block_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_grants_v_blocks_grants_hero_block_hero_buttons_order_idx" ON "_grants_v_blocks_grants_hero_block_hero_buttons" USING btree ("_order");
  CREATE INDEX "_grants_v_blocks_grants_hero_block_hero_buttons_parent_id_idx" ON "_grants_v_blocks_grants_hero_block_hero_buttons" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_grants_v_blocks_grants_hero_block_hero_buttons_locales_locale_parent_id_unique" ON "_grants_v_blocks_grants_hero_block_hero_buttons_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_grants_v_blocks_grants_hero_block_order_idx" ON "_grants_v_blocks_grants_hero_block" USING btree ("_order");
  CREATE INDEX "_grants_v_blocks_grants_hero_block_parent_id_idx" ON "_grants_v_blocks_grants_hero_block" USING btree ("_parent_id");
  CREATE INDEX "_grants_v_blocks_grants_hero_block_path_idx" ON "_grants_v_blocks_grants_hero_block" USING btree ("_path");
  CREATE INDEX "_grants_v_blocks_grants_hero_block_hero_image_idx" ON "_grants_v_blocks_grants_hero_block" USING btree ("hero_image_id");
  CREATE UNIQUE INDEX "_grants_v_blocks_grants_hero_block_locales_locale_parent_id_unique" ON "_grants_v_blocks_grants_hero_block_locales" USING btree ("_locale","_parent_id");
  ALTER TABLE "grants_blocks_mcol_info_block_multicols" DROP COLUMN "link_pill_solid";
  ALTER TABLE "grants_blocks_mcol_info_block_multicols" DROP COLUMN "link_pill_outline";
  ALTER TABLE "grants_blocks_mcol_info_block_multicols" DROP COLUMN "link_email";
  ALTER TABLE "grants" DROP COLUMN "page_type";
  ALTER TABLE "grants" DROP COLUMN "grant_card_id";
  ALTER TABLE "grants" DROP COLUMN "bg_type";
  ALTER TABLE "grants" DROP COLUMN "hero_contact_email";
  ALTER TABLE "_grants_v_blocks_mcol_info_block_multicols" DROP COLUMN "link_pill_solid";
  ALTER TABLE "_grants_v_blocks_mcol_info_block_multicols" DROP COLUMN "link_pill_outline";
  ALTER TABLE "_grants_v_blocks_mcol_info_block_multicols" DROP COLUMN "link_email";
  ALTER TABLE "_grants_v" DROP COLUMN "version_page_type";
  ALTER TABLE "_grants_v" DROP COLUMN "version_grant_card_id";
  ALTER TABLE "_grants_v" DROP COLUMN "version_bg_type";
  ALTER TABLE "_grants_v" DROP COLUMN "version_hero_contact_email";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "grantcards_id";
  ALTER TABLE "homepage_hero_section_cta_button" DROP COLUMN "link_pill_solid";
  ALTER TABLE "homepage_hero_section_cta_button" DROP COLUMN "link_pill_outline";
  ALTER TABLE "homepage_hero_section_cta_button" DROP COLUMN "link_email";
  ALTER TABLE "homepage_blocks_secondarycta_cta_button" DROP COLUMN "link_pill_solid";
  ALTER TABLE "homepage_blocks_secondarycta_cta_button" DROP COLUMN "link_pill_outline";
  ALTER TABLE "homepage_blocks_secondarycta_cta_button" DROP COLUMN "link_email";
  ALTER TABLE "_homepage_v_version_hero_section_cta_button" DROP COLUMN "link_pill_solid";
  ALTER TABLE "_homepage_v_version_hero_section_cta_button" DROP COLUMN "link_pill_outline";
  ALTER TABLE "_homepage_v_version_hero_section_cta_button" DROP COLUMN "link_email";
  ALTER TABLE "_homepage_v_blocks_secondarycta_cta_button" DROP COLUMN "link_pill_solid";
  ALTER TABLE "_homepage_v_blocks_secondarycta_cta_button" DROP COLUMN "link_pill_outline";
  ALTER TABLE "_homepage_v_blocks_secondarycta_cta_button" DROP COLUMN "link_email";
  ALTER TABLE "nav_menu_items_nav_items" DROP COLUMN "link_pill_solid";
  ALTER TABLE "nav_menu_items_nav_items" DROP COLUMN "link_pill_outline";
  ALTER TABLE "nav_menu_items_nav_items" DROP COLUMN "link_email";
  DROP TYPE "public"."enum_grants_buttons_link_type";
  DROP TYPE "public"."enum_grants_page_type";
  DROP TYPE "public"."enum_grants_bg_type";
  DROP TYPE "public"."enum__grants_v_version_buttons_link_type";
  DROP TYPE "public"."enum__grants_v_version_page_type";
  DROP TYPE "public"."enum__grants_v_version_bg_type";
  DROP TYPE "public"."enum_grantcards_card_buttons_link_type";
  DROP TYPE "public"."enum_grantcards_active_period";
  DROP TYPE "public"."enum_grantcards_card_colour";
  DROP TYPE "public"."enum_grantcards_badge_type";
  DROP TYPE "public"."enum_grantcards_status";
  DROP TYPE "public"."enum__grantcards_v_version_card_buttons_link_type";
  DROP TYPE "public"."enum__grantcards_v_version_active_period";
  DROP TYPE "public"."enum__grantcards_v_version_card_colour";
  DROP TYPE "public"."enum__grantcards_v_version_badge_type";
  DROP TYPE "public"."enum__grantcards_v_version_status";
  DROP TYPE "public"."enum__grantcards_v_published_locale";`)
}
