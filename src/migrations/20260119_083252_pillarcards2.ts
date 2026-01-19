import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_grants_blocks_resource_gallery_align" AS ENUM('left', 'center');
  CREATE TYPE "public"."enum_grants_blocks_pillar_card_align" AS ENUM('left', 'center');
  CREATE TYPE "public"."enum__grants_v_blocks_resource_gallery_align" AS ENUM('left', 'center');
  CREATE TYPE "public"."enum__grants_v_blocks_pillar_card_align" AS ENUM('left', 'center');
  CREATE TYPE "public"."enum_blog_blocks_pillar_card_align" AS ENUM('left', 'center');
  CREATE TYPE "public"."enum__blog_v_blocks_pillar_card_align" AS ENUM('left', 'center');
  CREATE TYPE "public"."enum_reports_blocks_pillar_card_align" AS ENUM('left', 'center');
  CREATE TYPE "public"."enum__reports_v_blocks_pillar_card_align" AS ENUM('left', 'center');
  CREATE TYPE "public"."enum_mmedia_blocks_pillar_card_align" AS ENUM('left', 'center');
  CREATE TYPE "public"."enum__mmedia_v_blocks_pillar_card_align" AS ENUM('left', 'center');
  CREATE TABLE "grants_blocks_resource_gallery" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"align" "enum_grants_blocks_resource_gallery_align" DEFAULT 'center',
  	"add_all_resources" boolean,
  	"filter_by_doc_type_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE "grants_blocks_resource_gallery_locales" (
  	"title" varchar,
  	"desc" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "grants_blocks_pillar_card_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"mascot_id" integer
  );
  
  CREATE TABLE "grants_blocks_pillar_card_cards_locales" (
  	"title" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "grants_blocks_pillar_card" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"align" "enum_grants_blocks_pillar_card_align" DEFAULT 'left',
  	"block_name" varchar
  );
  
  CREATE TABLE "grants_blocks_pillar_card_locales" (
  	"title" varchar,
  	"subtitle" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "_grants_v_blocks_resource_gallery" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"align" "enum__grants_v_blocks_resource_gallery_align" DEFAULT 'center',
  	"add_all_resources" boolean,
  	"filter_by_doc_type_id" integer,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_grants_v_blocks_resource_gallery_locales" (
  	"title" varchar,
  	"desc" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_grants_v_blocks_pillar_card_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"mascot_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_grants_v_blocks_pillar_card_cards_locales" (
  	"title" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_grants_v_blocks_pillar_card" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"align" "enum__grants_v_blocks_pillar_card_align" DEFAULT 'left',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_grants_v_blocks_pillar_card_locales" (
  	"title" varchar,
  	"subtitle" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "blog_blocks_pillar_card_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"mascot_id" integer
  );
  
  CREATE TABLE "blog_blocks_pillar_card_cards_locales" (
  	"title" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "blog_blocks_pillar_card" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"align" "enum_blog_blocks_pillar_card_align" DEFAULT 'left',
  	"block_name" varchar
  );
  
  CREATE TABLE "blog_blocks_pillar_card_locales" (
  	"title" varchar,
  	"subtitle" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "_blog_v_blocks_pillar_card_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"mascot_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_blog_v_blocks_pillar_card_cards_locales" (
  	"title" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_blog_v_blocks_pillar_card" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"align" "enum__blog_v_blocks_pillar_card_align" DEFAULT 'left',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_blog_v_blocks_pillar_card_locales" (
  	"title" varchar,
  	"subtitle" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "reports_blocks_pillar_card_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"mascot_id" integer
  );
  
  CREATE TABLE "reports_blocks_pillar_card_cards_locales" (
  	"title" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "reports_blocks_pillar_card" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"align" "enum_reports_blocks_pillar_card_align" DEFAULT 'left',
  	"block_name" varchar
  );
  
  CREATE TABLE "reports_blocks_pillar_card_locales" (
  	"title" varchar,
  	"subtitle" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "_reports_v_blocks_pillar_card_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"mascot_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_reports_v_blocks_pillar_card_cards_locales" (
  	"title" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_reports_v_blocks_pillar_card" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"align" "enum__reports_v_blocks_pillar_card_align" DEFAULT 'left',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_reports_v_blocks_pillar_card_locales" (
  	"title" varchar,
  	"subtitle" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "mmedia_blocks_pillar_card_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"mascot_id" integer
  );
  
  CREATE TABLE "mmedia_blocks_pillar_card_cards_locales" (
  	"title" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "mmedia_blocks_pillar_card" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"align" "enum_mmedia_blocks_pillar_card_align" DEFAULT 'left',
  	"block_name" varchar
  );
  
  CREATE TABLE "mmedia_blocks_pillar_card_locales" (
  	"title" varchar,
  	"subtitle" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "_mmedia_v_blocks_pillar_card_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"mascot_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_mmedia_v_blocks_pillar_card_cards_locales" (
  	"title" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_mmedia_v_blocks_pillar_card" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"align" "enum__mmedia_v_blocks_pillar_card_align" DEFAULT 'left',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_mmedia_v_blocks_pillar_card_locales" (
  	"title" varchar,
  	"subtitle" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  ALTER TABLE "grants_blocks_resource_gallery" ADD CONSTRAINT "grants_blocks_resource_gallery_filter_by_doc_type_id_doctypes_id_fk" FOREIGN KEY ("filter_by_doc_type_id") REFERENCES "public"."doctypes"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "grants_blocks_resource_gallery" ADD CONSTRAINT "grants_blocks_resource_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."grants"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "grants_blocks_resource_gallery_locales" ADD CONSTRAINT "grants_blocks_resource_gallery_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."grants_blocks_resource_gallery"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "grants_blocks_pillar_card_cards" ADD CONSTRAINT "grants_blocks_pillar_card_cards_mascot_id_asset_cloud_id_fk" FOREIGN KEY ("mascot_id") REFERENCES "public"."asset_cloud"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "grants_blocks_pillar_card_cards" ADD CONSTRAINT "grants_blocks_pillar_card_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."grants_blocks_pillar_card"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "grants_blocks_pillar_card_cards_locales" ADD CONSTRAINT "grants_blocks_pillar_card_cards_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."grants_blocks_pillar_card_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "grants_blocks_pillar_card" ADD CONSTRAINT "grants_blocks_pillar_card_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."grants"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "grants_blocks_pillar_card_locales" ADD CONSTRAINT "grants_blocks_pillar_card_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."grants_blocks_pillar_card"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_grants_v_blocks_resource_gallery" ADD CONSTRAINT "_grants_v_blocks_resource_gallery_filter_by_doc_type_id_doctypes_id_fk" FOREIGN KEY ("filter_by_doc_type_id") REFERENCES "public"."doctypes"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_grants_v_blocks_resource_gallery" ADD CONSTRAINT "_grants_v_blocks_resource_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_grants_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_grants_v_blocks_resource_gallery_locales" ADD CONSTRAINT "_grants_v_blocks_resource_gallery_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_grants_v_blocks_resource_gallery"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_grants_v_blocks_pillar_card_cards" ADD CONSTRAINT "_grants_v_blocks_pillar_card_cards_mascot_id_asset_cloud_id_fk" FOREIGN KEY ("mascot_id") REFERENCES "public"."asset_cloud"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_grants_v_blocks_pillar_card_cards" ADD CONSTRAINT "_grants_v_blocks_pillar_card_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_grants_v_blocks_pillar_card"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_grants_v_blocks_pillar_card_cards_locales" ADD CONSTRAINT "_grants_v_blocks_pillar_card_cards_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_grants_v_blocks_pillar_card_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_grants_v_blocks_pillar_card" ADD CONSTRAINT "_grants_v_blocks_pillar_card_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_grants_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_grants_v_blocks_pillar_card_locales" ADD CONSTRAINT "_grants_v_blocks_pillar_card_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_grants_v_blocks_pillar_card"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "blog_blocks_pillar_card_cards" ADD CONSTRAINT "blog_blocks_pillar_card_cards_mascot_id_asset_cloud_id_fk" FOREIGN KEY ("mascot_id") REFERENCES "public"."asset_cloud"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "blog_blocks_pillar_card_cards" ADD CONSTRAINT "blog_blocks_pillar_card_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."blog_blocks_pillar_card"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "blog_blocks_pillar_card_cards_locales" ADD CONSTRAINT "blog_blocks_pillar_card_cards_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."blog_blocks_pillar_card_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "blog_blocks_pillar_card" ADD CONSTRAINT "blog_blocks_pillar_card_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."blog"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "blog_blocks_pillar_card_locales" ADD CONSTRAINT "blog_blocks_pillar_card_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."blog_blocks_pillar_card"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_blog_v_blocks_pillar_card_cards" ADD CONSTRAINT "_blog_v_blocks_pillar_card_cards_mascot_id_asset_cloud_id_fk" FOREIGN KEY ("mascot_id") REFERENCES "public"."asset_cloud"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_blog_v_blocks_pillar_card_cards" ADD CONSTRAINT "_blog_v_blocks_pillar_card_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_blog_v_blocks_pillar_card"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_blog_v_blocks_pillar_card_cards_locales" ADD CONSTRAINT "_blog_v_blocks_pillar_card_cards_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_blog_v_blocks_pillar_card_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_blog_v_blocks_pillar_card" ADD CONSTRAINT "_blog_v_blocks_pillar_card_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_blog_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_blog_v_blocks_pillar_card_locales" ADD CONSTRAINT "_blog_v_blocks_pillar_card_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_blog_v_blocks_pillar_card"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "reports_blocks_pillar_card_cards" ADD CONSTRAINT "reports_blocks_pillar_card_cards_mascot_id_asset_cloud_id_fk" FOREIGN KEY ("mascot_id") REFERENCES "public"."asset_cloud"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "reports_blocks_pillar_card_cards" ADD CONSTRAINT "reports_blocks_pillar_card_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."reports_blocks_pillar_card"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "reports_blocks_pillar_card_cards_locales" ADD CONSTRAINT "reports_blocks_pillar_card_cards_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."reports_blocks_pillar_card_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "reports_blocks_pillar_card" ADD CONSTRAINT "reports_blocks_pillar_card_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."reports"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "reports_blocks_pillar_card_locales" ADD CONSTRAINT "reports_blocks_pillar_card_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."reports_blocks_pillar_card"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_reports_v_blocks_pillar_card_cards" ADD CONSTRAINT "_reports_v_blocks_pillar_card_cards_mascot_id_asset_cloud_id_fk" FOREIGN KEY ("mascot_id") REFERENCES "public"."asset_cloud"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_reports_v_blocks_pillar_card_cards" ADD CONSTRAINT "_reports_v_blocks_pillar_card_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_reports_v_blocks_pillar_card"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_reports_v_blocks_pillar_card_cards_locales" ADD CONSTRAINT "_reports_v_blocks_pillar_card_cards_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_reports_v_blocks_pillar_card_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_reports_v_blocks_pillar_card" ADD CONSTRAINT "_reports_v_blocks_pillar_card_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_reports_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_reports_v_blocks_pillar_card_locales" ADD CONSTRAINT "_reports_v_blocks_pillar_card_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_reports_v_blocks_pillar_card"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "mmedia_blocks_pillar_card_cards" ADD CONSTRAINT "mmedia_blocks_pillar_card_cards_mascot_id_asset_cloud_id_fk" FOREIGN KEY ("mascot_id") REFERENCES "public"."asset_cloud"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "mmedia_blocks_pillar_card_cards" ADD CONSTRAINT "mmedia_blocks_pillar_card_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."mmedia_blocks_pillar_card"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "mmedia_blocks_pillar_card_cards_locales" ADD CONSTRAINT "mmedia_blocks_pillar_card_cards_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."mmedia_blocks_pillar_card_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "mmedia_blocks_pillar_card" ADD CONSTRAINT "mmedia_blocks_pillar_card_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."mmedia"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "mmedia_blocks_pillar_card_locales" ADD CONSTRAINT "mmedia_blocks_pillar_card_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."mmedia_blocks_pillar_card"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_mmedia_v_blocks_pillar_card_cards" ADD CONSTRAINT "_mmedia_v_blocks_pillar_card_cards_mascot_id_asset_cloud_id_fk" FOREIGN KEY ("mascot_id") REFERENCES "public"."asset_cloud"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_mmedia_v_blocks_pillar_card_cards" ADD CONSTRAINT "_mmedia_v_blocks_pillar_card_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_mmedia_v_blocks_pillar_card"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_mmedia_v_blocks_pillar_card_cards_locales" ADD CONSTRAINT "_mmedia_v_blocks_pillar_card_cards_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_mmedia_v_blocks_pillar_card_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_mmedia_v_blocks_pillar_card" ADD CONSTRAINT "_mmedia_v_blocks_pillar_card_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_mmedia_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_mmedia_v_blocks_pillar_card_locales" ADD CONSTRAINT "_mmedia_v_blocks_pillar_card_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_mmedia_v_blocks_pillar_card"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "grants_blocks_resource_gallery_order_idx" ON "grants_blocks_resource_gallery" USING btree ("_order");
  CREATE INDEX "grants_blocks_resource_gallery_parent_id_idx" ON "grants_blocks_resource_gallery" USING btree ("_parent_id");
  CREATE INDEX "grants_blocks_resource_gallery_path_idx" ON "grants_blocks_resource_gallery" USING btree ("_path");
  CREATE INDEX "grants_blocks_resource_gallery_filter_by_doc_type_idx" ON "grants_blocks_resource_gallery" USING btree ("filter_by_doc_type_id");
  CREATE UNIQUE INDEX "grants_blocks_resource_gallery_locales_locale_parent_id_uniq" ON "grants_blocks_resource_gallery_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "grants_blocks_pillar_card_cards_order_idx" ON "grants_blocks_pillar_card_cards" USING btree ("_order");
  CREATE INDEX "grants_blocks_pillar_card_cards_parent_id_idx" ON "grants_blocks_pillar_card_cards" USING btree ("_parent_id");
  CREATE INDEX "grants_blocks_pillar_card_cards_mascot_idx" ON "grants_blocks_pillar_card_cards" USING btree ("mascot_id");
  CREATE UNIQUE INDEX "grants_blocks_pillar_card_cards_locales_locale_parent_id_uni" ON "grants_blocks_pillar_card_cards_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "grants_blocks_pillar_card_order_idx" ON "grants_blocks_pillar_card" USING btree ("_order");
  CREATE INDEX "grants_blocks_pillar_card_parent_id_idx" ON "grants_blocks_pillar_card" USING btree ("_parent_id");
  CREATE INDEX "grants_blocks_pillar_card_path_idx" ON "grants_blocks_pillar_card" USING btree ("_path");
  CREATE UNIQUE INDEX "grants_blocks_pillar_card_locales_locale_parent_id_unique" ON "grants_blocks_pillar_card_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_grants_v_blocks_resource_gallery_order_idx" ON "_grants_v_blocks_resource_gallery" USING btree ("_order");
  CREATE INDEX "_grants_v_blocks_resource_gallery_parent_id_idx" ON "_grants_v_blocks_resource_gallery" USING btree ("_parent_id");
  CREATE INDEX "_grants_v_blocks_resource_gallery_path_idx" ON "_grants_v_blocks_resource_gallery" USING btree ("_path");
  CREATE INDEX "_grants_v_blocks_resource_gallery_filter_by_doc_type_idx" ON "_grants_v_blocks_resource_gallery" USING btree ("filter_by_doc_type_id");
  CREATE UNIQUE INDEX "_grants_v_blocks_resource_gallery_locales_locale_parent_id_u" ON "_grants_v_blocks_resource_gallery_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_grants_v_blocks_pillar_card_cards_order_idx" ON "_grants_v_blocks_pillar_card_cards" USING btree ("_order");
  CREATE INDEX "_grants_v_blocks_pillar_card_cards_parent_id_idx" ON "_grants_v_blocks_pillar_card_cards" USING btree ("_parent_id");
  CREATE INDEX "_grants_v_blocks_pillar_card_cards_mascot_idx" ON "_grants_v_blocks_pillar_card_cards" USING btree ("mascot_id");
  CREATE UNIQUE INDEX "_grants_v_blocks_pillar_card_cards_locales_locale_parent_id_" ON "_grants_v_blocks_pillar_card_cards_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_grants_v_blocks_pillar_card_order_idx" ON "_grants_v_blocks_pillar_card" USING btree ("_order");
  CREATE INDEX "_grants_v_blocks_pillar_card_parent_id_idx" ON "_grants_v_blocks_pillar_card" USING btree ("_parent_id");
  CREATE INDEX "_grants_v_blocks_pillar_card_path_idx" ON "_grants_v_blocks_pillar_card" USING btree ("_path");
  CREATE UNIQUE INDEX "_grants_v_blocks_pillar_card_locales_locale_parent_id_unique" ON "_grants_v_blocks_pillar_card_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "blog_blocks_pillar_card_cards_order_idx" ON "blog_blocks_pillar_card_cards" USING btree ("_order");
  CREATE INDEX "blog_blocks_pillar_card_cards_parent_id_idx" ON "blog_blocks_pillar_card_cards" USING btree ("_parent_id");
  CREATE INDEX "blog_blocks_pillar_card_cards_mascot_idx" ON "blog_blocks_pillar_card_cards" USING btree ("mascot_id");
  CREATE UNIQUE INDEX "blog_blocks_pillar_card_cards_locales_locale_parent_id_uniqu" ON "blog_blocks_pillar_card_cards_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "blog_blocks_pillar_card_order_idx" ON "blog_blocks_pillar_card" USING btree ("_order");
  CREATE INDEX "blog_blocks_pillar_card_parent_id_idx" ON "blog_blocks_pillar_card" USING btree ("_parent_id");
  CREATE INDEX "blog_blocks_pillar_card_path_idx" ON "blog_blocks_pillar_card" USING btree ("_path");
  CREATE UNIQUE INDEX "blog_blocks_pillar_card_locales_locale_parent_id_unique" ON "blog_blocks_pillar_card_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_blog_v_blocks_pillar_card_cards_order_idx" ON "_blog_v_blocks_pillar_card_cards" USING btree ("_order");
  CREATE INDEX "_blog_v_blocks_pillar_card_cards_parent_id_idx" ON "_blog_v_blocks_pillar_card_cards" USING btree ("_parent_id");
  CREATE INDEX "_blog_v_blocks_pillar_card_cards_mascot_idx" ON "_blog_v_blocks_pillar_card_cards" USING btree ("mascot_id");
  CREATE UNIQUE INDEX "_blog_v_blocks_pillar_card_cards_locales_locale_parent_id_un" ON "_blog_v_blocks_pillar_card_cards_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_blog_v_blocks_pillar_card_order_idx" ON "_blog_v_blocks_pillar_card" USING btree ("_order");
  CREATE INDEX "_blog_v_blocks_pillar_card_parent_id_idx" ON "_blog_v_blocks_pillar_card" USING btree ("_parent_id");
  CREATE INDEX "_blog_v_blocks_pillar_card_path_idx" ON "_blog_v_blocks_pillar_card" USING btree ("_path");
  CREATE UNIQUE INDEX "_blog_v_blocks_pillar_card_locales_locale_parent_id_unique" ON "_blog_v_blocks_pillar_card_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "reports_blocks_pillar_card_cards_order_idx" ON "reports_blocks_pillar_card_cards" USING btree ("_order");
  CREATE INDEX "reports_blocks_pillar_card_cards_parent_id_idx" ON "reports_blocks_pillar_card_cards" USING btree ("_parent_id");
  CREATE INDEX "reports_blocks_pillar_card_cards_mascot_idx" ON "reports_blocks_pillar_card_cards" USING btree ("mascot_id");
  CREATE UNIQUE INDEX "reports_blocks_pillar_card_cards_locales_locale_parent_id_un" ON "reports_blocks_pillar_card_cards_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "reports_blocks_pillar_card_order_idx" ON "reports_blocks_pillar_card" USING btree ("_order");
  CREATE INDEX "reports_blocks_pillar_card_parent_id_idx" ON "reports_blocks_pillar_card" USING btree ("_parent_id");
  CREATE INDEX "reports_blocks_pillar_card_path_idx" ON "reports_blocks_pillar_card" USING btree ("_path");
  CREATE UNIQUE INDEX "reports_blocks_pillar_card_locales_locale_parent_id_unique" ON "reports_blocks_pillar_card_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_reports_v_blocks_pillar_card_cards_order_idx" ON "_reports_v_blocks_pillar_card_cards" USING btree ("_order");
  CREATE INDEX "_reports_v_blocks_pillar_card_cards_parent_id_idx" ON "_reports_v_blocks_pillar_card_cards" USING btree ("_parent_id");
  CREATE INDEX "_reports_v_blocks_pillar_card_cards_mascot_idx" ON "_reports_v_blocks_pillar_card_cards" USING btree ("mascot_id");
  CREATE UNIQUE INDEX "_reports_v_blocks_pillar_card_cards_locales_locale_parent_id" ON "_reports_v_blocks_pillar_card_cards_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_reports_v_blocks_pillar_card_order_idx" ON "_reports_v_blocks_pillar_card" USING btree ("_order");
  CREATE INDEX "_reports_v_blocks_pillar_card_parent_id_idx" ON "_reports_v_blocks_pillar_card" USING btree ("_parent_id");
  CREATE INDEX "_reports_v_blocks_pillar_card_path_idx" ON "_reports_v_blocks_pillar_card" USING btree ("_path");
  CREATE UNIQUE INDEX "_reports_v_blocks_pillar_card_locales_locale_parent_id_uniqu" ON "_reports_v_blocks_pillar_card_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "mmedia_blocks_pillar_card_cards_order_idx" ON "mmedia_blocks_pillar_card_cards" USING btree ("_order");
  CREATE INDEX "mmedia_blocks_pillar_card_cards_parent_id_idx" ON "mmedia_blocks_pillar_card_cards" USING btree ("_parent_id");
  CREATE INDEX "mmedia_blocks_pillar_card_cards_mascot_idx" ON "mmedia_blocks_pillar_card_cards" USING btree ("mascot_id");
  CREATE UNIQUE INDEX "mmedia_blocks_pillar_card_cards_locales_locale_parent_id_uni" ON "mmedia_blocks_pillar_card_cards_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "mmedia_blocks_pillar_card_order_idx" ON "mmedia_blocks_pillar_card" USING btree ("_order");
  CREATE INDEX "mmedia_blocks_pillar_card_parent_id_idx" ON "mmedia_blocks_pillar_card" USING btree ("_parent_id");
  CREATE INDEX "mmedia_blocks_pillar_card_path_idx" ON "mmedia_blocks_pillar_card" USING btree ("_path");
  CREATE UNIQUE INDEX "mmedia_blocks_pillar_card_locales_locale_parent_id_unique" ON "mmedia_blocks_pillar_card_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_mmedia_v_blocks_pillar_card_cards_order_idx" ON "_mmedia_v_blocks_pillar_card_cards" USING btree ("_order");
  CREATE INDEX "_mmedia_v_blocks_pillar_card_cards_parent_id_idx" ON "_mmedia_v_blocks_pillar_card_cards" USING btree ("_parent_id");
  CREATE INDEX "_mmedia_v_blocks_pillar_card_cards_mascot_idx" ON "_mmedia_v_blocks_pillar_card_cards" USING btree ("mascot_id");
  CREATE UNIQUE INDEX "_mmedia_v_blocks_pillar_card_cards_locales_locale_parent_id_" ON "_mmedia_v_blocks_pillar_card_cards_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_mmedia_v_blocks_pillar_card_order_idx" ON "_mmedia_v_blocks_pillar_card" USING btree ("_order");
  CREATE INDEX "_mmedia_v_blocks_pillar_card_parent_id_idx" ON "_mmedia_v_blocks_pillar_card" USING btree ("_parent_id");
  CREATE INDEX "_mmedia_v_blocks_pillar_card_path_idx" ON "_mmedia_v_blocks_pillar_card" USING btree ("_path");
  CREATE UNIQUE INDEX "_mmedia_v_blocks_pillar_card_locales_locale_parent_id_unique" ON "_mmedia_v_blocks_pillar_card_locales" USING btree ("_locale","_parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "grants_blocks_resource_gallery" CASCADE;
  DROP TABLE "grants_blocks_resource_gallery_locales" CASCADE;
  DROP TABLE "grants_blocks_pillar_card_cards" CASCADE;
  DROP TABLE "grants_blocks_pillar_card_cards_locales" CASCADE;
  DROP TABLE "grants_blocks_pillar_card" CASCADE;
  DROP TABLE "grants_blocks_pillar_card_locales" CASCADE;
  DROP TABLE "_grants_v_blocks_resource_gallery" CASCADE;
  DROP TABLE "_grants_v_blocks_resource_gallery_locales" CASCADE;
  DROP TABLE "_grants_v_blocks_pillar_card_cards" CASCADE;
  DROP TABLE "_grants_v_blocks_pillar_card_cards_locales" CASCADE;
  DROP TABLE "_grants_v_blocks_pillar_card" CASCADE;
  DROP TABLE "_grants_v_blocks_pillar_card_locales" CASCADE;
  DROP TABLE "blog_blocks_pillar_card_cards" CASCADE;
  DROP TABLE "blog_blocks_pillar_card_cards_locales" CASCADE;
  DROP TABLE "blog_blocks_pillar_card" CASCADE;
  DROP TABLE "blog_blocks_pillar_card_locales" CASCADE;
  DROP TABLE "_blog_v_blocks_pillar_card_cards" CASCADE;
  DROP TABLE "_blog_v_blocks_pillar_card_cards_locales" CASCADE;
  DROP TABLE "_blog_v_blocks_pillar_card" CASCADE;
  DROP TABLE "_blog_v_blocks_pillar_card_locales" CASCADE;
  DROP TABLE "reports_blocks_pillar_card_cards" CASCADE;
  DROP TABLE "reports_blocks_pillar_card_cards_locales" CASCADE;
  DROP TABLE "reports_blocks_pillar_card" CASCADE;
  DROP TABLE "reports_blocks_pillar_card_locales" CASCADE;
  DROP TABLE "_reports_v_blocks_pillar_card_cards" CASCADE;
  DROP TABLE "_reports_v_blocks_pillar_card_cards_locales" CASCADE;
  DROP TABLE "_reports_v_blocks_pillar_card" CASCADE;
  DROP TABLE "_reports_v_blocks_pillar_card_locales" CASCADE;
  DROP TABLE "mmedia_blocks_pillar_card_cards" CASCADE;
  DROP TABLE "mmedia_blocks_pillar_card_cards_locales" CASCADE;
  DROP TABLE "mmedia_blocks_pillar_card" CASCADE;
  DROP TABLE "mmedia_blocks_pillar_card_locales" CASCADE;
  DROP TABLE "_mmedia_v_blocks_pillar_card_cards" CASCADE;
  DROP TABLE "_mmedia_v_blocks_pillar_card_cards_locales" CASCADE;
  DROP TABLE "_mmedia_v_blocks_pillar_card" CASCADE;
  DROP TABLE "_mmedia_v_blocks_pillar_card_locales" CASCADE;
  DROP TYPE "public"."enum_grants_blocks_resource_gallery_align";
  DROP TYPE "public"."enum_grants_blocks_pillar_card_align";
  DROP TYPE "public"."enum__grants_v_blocks_resource_gallery_align";
  DROP TYPE "public"."enum__grants_v_blocks_pillar_card_align";
  DROP TYPE "public"."enum_blog_blocks_pillar_card_align";
  DROP TYPE "public"."enum__blog_v_blocks_pillar_card_align";
  DROP TYPE "public"."enum_reports_blocks_pillar_card_align";
  DROP TYPE "public"."enum__reports_v_blocks_pillar_card_align";
  DROP TYPE "public"."enum_mmedia_blocks_pillar_card_align";
  DROP TYPE "public"."enum__mmedia_v_blocks_pillar_card_align";`)
}
