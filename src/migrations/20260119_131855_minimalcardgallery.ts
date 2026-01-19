import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_grants_blocks_min_card_gallery_header_align" AS ENUM('left', 'center');
  CREATE TYPE "public"."enum__grants_v_blocks_min_card_gallery_header_align" AS ENUM('left', 'center');
  CREATE TYPE "public"."enum_pages_blocks_min_card_gallery_header_align" AS ENUM('left', 'center');
  CREATE TYPE "public"."enum__pages_v_blocks_min_card_gallery_header_align" AS ENUM('left', 'center');
  CREATE TYPE "public"."enum_blog_blocks_min_card_gallery_header_align" AS ENUM('left', 'center');
  CREATE TYPE "public"."enum__blog_v_blocks_min_card_gallery_header_align" AS ENUM('left', 'center');
  CREATE TYPE "public"."enum_reports_blocks_min_card_gallery_header_align" AS ENUM('left', 'center');
  CREATE TYPE "public"."enum__reports_v_blocks_min_card_gallery_header_align" AS ENUM('left', 'center');
  CREATE TYPE "public"."enum_mmedia_blocks_min_card_gallery_header_align" AS ENUM('left', 'center');
  CREATE TYPE "public"."enum__mmedia_v_blocks_min_card_gallery_header_align" AS ENUM('left', 'center');
  CREATE TYPE "public"."enum_homepage_blocks_min_card_gallery_header_align" AS ENUM('left', 'center');
  CREATE TYPE "public"."enum__homepage_v_blocks_min_card_gallery_header_align" AS ENUM('left', 'center');
  CREATE TABLE "grants_blocks_min_card_gallery_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"mascot_id" integer
  );
  
  CREATE TABLE "grants_blocks_min_card_gallery_cards_locales" (
  	"title" varchar,
  	"description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "grants_blocks_min_card_gallery" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"header_align" "enum_grants_blocks_min_card_gallery_header_align" DEFAULT 'left',
  	"block_name" varchar
  );
  
  CREATE TABLE "grants_blocks_min_card_gallery_locales" (
  	"header_title" varchar,
  	"header_subtitle" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "_grants_v_blocks_min_card_gallery_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"mascot_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_grants_v_blocks_min_card_gallery_cards_locales" (
  	"title" varchar,
  	"description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_grants_v_blocks_min_card_gallery" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"header_align" "enum__grants_v_blocks_min_card_gallery_header_align" DEFAULT 'left',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_grants_v_blocks_min_card_gallery_locales" (
  	"header_title" varchar,
  	"header_subtitle" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "pages_blocks_min_card_gallery_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"mascot_id" integer
  );
  
  CREATE TABLE "pages_blocks_min_card_gallery_cards_locales" (
  	"title" varchar,
  	"description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_min_card_gallery" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"header_align" "enum_pages_blocks_min_card_gallery_header_align" DEFAULT 'left',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_min_card_gallery_locales" (
  	"header_title" varchar,
  	"header_subtitle" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_min_card_gallery_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"mascot_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_min_card_gallery_cards_locales" (
  	"title" varchar,
  	"description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_min_card_gallery" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"header_align" "enum__pages_v_blocks_min_card_gallery_header_align" DEFAULT 'left',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_min_card_gallery_locales" (
  	"header_title" varchar,
  	"header_subtitle" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "blog_blocks_min_card_gallery_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"mascot_id" integer
  );
  
  CREATE TABLE "blog_blocks_min_card_gallery_cards_locales" (
  	"title" varchar,
  	"description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "blog_blocks_min_card_gallery" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"header_align" "enum_blog_blocks_min_card_gallery_header_align" DEFAULT 'left',
  	"block_name" varchar
  );
  
  CREATE TABLE "blog_blocks_min_card_gallery_locales" (
  	"header_title" varchar,
  	"header_subtitle" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "_blog_v_blocks_min_card_gallery_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"mascot_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_blog_v_blocks_min_card_gallery_cards_locales" (
  	"title" varchar,
  	"description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_blog_v_blocks_min_card_gallery" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"header_align" "enum__blog_v_blocks_min_card_gallery_header_align" DEFAULT 'left',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_blog_v_blocks_min_card_gallery_locales" (
  	"header_title" varchar,
  	"header_subtitle" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "reports_blocks_min_card_gallery_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"mascot_id" integer
  );
  
  CREATE TABLE "reports_blocks_min_card_gallery_cards_locales" (
  	"title" varchar,
  	"description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "reports_blocks_min_card_gallery" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"header_align" "enum_reports_blocks_min_card_gallery_header_align" DEFAULT 'left',
  	"block_name" varchar
  );
  
  CREATE TABLE "reports_blocks_min_card_gallery_locales" (
  	"header_title" varchar,
  	"header_subtitle" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "_reports_v_blocks_min_card_gallery_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"mascot_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_reports_v_blocks_min_card_gallery_cards_locales" (
  	"title" varchar,
  	"description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_reports_v_blocks_min_card_gallery" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"header_align" "enum__reports_v_blocks_min_card_gallery_header_align" DEFAULT 'left',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_reports_v_blocks_min_card_gallery_locales" (
  	"header_title" varchar,
  	"header_subtitle" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "mmedia_blocks_min_card_gallery_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"mascot_id" integer
  );
  
  CREATE TABLE "mmedia_blocks_min_card_gallery_cards_locales" (
  	"title" varchar,
  	"description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "mmedia_blocks_min_card_gallery" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"header_align" "enum_mmedia_blocks_min_card_gallery_header_align" DEFAULT 'left',
  	"block_name" varchar
  );
  
  CREATE TABLE "mmedia_blocks_min_card_gallery_locales" (
  	"header_title" varchar,
  	"header_subtitle" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "_mmedia_v_blocks_min_card_gallery_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"mascot_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_mmedia_v_blocks_min_card_gallery_cards_locales" (
  	"title" varchar,
  	"description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_mmedia_v_blocks_min_card_gallery" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"header_align" "enum__mmedia_v_blocks_min_card_gallery_header_align" DEFAULT 'left',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_mmedia_v_blocks_min_card_gallery_locales" (
  	"header_title" varchar,
  	"header_subtitle" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "homepage_blocks_min_card_gallery_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"mascot_id" integer
  );
  
  CREATE TABLE "homepage_blocks_min_card_gallery_cards_locales" (
  	"title" varchar,
  	"description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "homepage_blocks_min_card_gallery" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"header_align" "enum_homepage_blocks_min_card_gallery_header_align" DEFAULT 'left',
  	"block_name" varchar
  );
  
  CREATE TABLE "homepage_blocks_min_card_gallery_locales" (
  	"header_title" varchar,
  	"header_subtitle" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "_homepage_v_blocks_min_card_gallery_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"mascot_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_homepage_v_blocks_min_card_gallery_cards_locales" (
  	"title" varchar,
  	"description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_homepage_v_blocks_min_card_gallery" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"header_align" "enum__homepage_v_blocks_min_card_gallery_header_align" DEFAULT 'left',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_homepage_v_blocks_min_card_gallery_locales" (
  	"header_title" varchar,
  	"header_subtitle" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  ALTER TABLE "grants_blocks_min_card_gallery_cards" ADD CONSTRAINT "grants_blocks_min_card_gallery_cards_mascot_id_asset_cloud_id_fk" FOREIGN KEY ("mascot_id") REFERENCES "public"."asset_cloud"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "grants_blocks_min_card_gallery_cards" ADD CONSTRAINT "grants_blocks_min_card_gallery_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."grants_blocks_min_card_gallery"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "grants_blocks_min_card_gallery_cards_locales" ADD CONSTRAINT "grants_blocks_min_card_gallery_cards_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."grants_blocks_min_card_gallery_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "grants_blocks_min_card_gallery" ADD CONSTRAINT "grants_blocks_min_card_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."grants"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "grants_blocks_min_card_gallery_locales" ADD CONSTRAINT "grants_blocks_min_card_gallery_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."grants_blocks_min_card_gallery"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_grants_v_blocks_min_card_gallery_cards" ADD CONSTRAINT "_grants_v_blocks_min_card_gallery_cards_mascot_id_asset_cloud_id_fk" FOREIGN KEY ("mascot_id") REFERENCES "public"."asset_cloud"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_grants_v_blocks_min_card_gallery_cards" ADD CONSTRAINT "_grants_v_blocks_min_card_gallery_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_grants_v_blocks_min_card_gallery"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_grants_v_blocks_min_card_gallery_cards_locales" ADD CONSTRAINT "_grants_v_blocks_min_card_gallery_cards_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_grants_v_blocks_min_card_gallery_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_grants_v_blocks_min_card_gallery" ADD CONSTRAINT "_grants_v_blocks_min_card_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_grants_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_grants_v_blocks_min_card_gallery_locales" ADD CONSTRAINT "_grants_v_blocks_min_card_gallery_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_grants_v_blocks_min_card_gallery"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_min_card_gallery_cards" ADD CONSTRAINT "pages_blocks_min_card_gallery_cards_mascot_id_asset_cloud_id_fk" FOREIGN KEY ("mascot_id") REFERENCES "public"."asset_cloud"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_min_card_gallery_cards" ADD CONSTRAINT "pages_blocks_min_card_gallery_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_min_card_gallery"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_min_card_gallery_cards_locales" ADD CONSTRAINT "pages_blocks_min_card_gallery_cards_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_min_card_gallery_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_min_card_gallery" ADD CONSTRAINT "pages_blocks_min_card_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_min_card_gallery_locales" ADD CONSTRAINT "pages_blocks_min_card_gallery_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_min_card_gallery"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_min_card_gallery_cards" ADD CONSTRAINT "_pages_v_blocks_min_card_gallery_cards_mascot_id_asset_cloud_id_fk" FOREIGN KEY ("mascot_id") REFERENCES "public"."asset_cloud"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_min_card_gallery_cards" ADD CONSTRAINT "_pages_v_blocks_min_card_gallery_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_min_card_gallery"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_min_card_gallery_cards_locales" ADD CONSTRAINT "_pages_v_blocks_min_card_gallery_cards_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_min_card_gallery_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_min_card_gallery" ADD CONSTRAINT "_pages_v_blocks_min_card_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_min_card_gallery_locales" ADD CONSTRAINT "_pages_v_blocks_min_card_gallery_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_min_card_gallery"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "blog_blocks_min_card_gallery_cards" ADD CONSTRAINT "blog_blocks_min_card_gallery_cards_mascot_id_asset_cloud_id_fk" FOREIGN KEY ("mascot_id") REFERENCES "public"."asset_cloud"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "blog_blocks_min_card_gallery_cards" ADD CONSTRAINT "blog_blocks_min_card_gallery_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."blog_blocks_min_card_gallery"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "blog_blocks_min_card_gallery_cards_locales" ADD CONSTRAINT "blog_blocks_min_card_gallery_cards_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."blog_blocks_min_card_gallery_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "blog_blocks_min_card_gallery" ADD CONSTRAINT "blog_blocks_min_card_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."blog"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "blog_blocks_min_card_gallery_locales" ADD CONSTRAINT "blog_blocks_min_card_gallery_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."blog_blocks_min_card_gallery"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_blog_v_blocks_min_card_gallery_cards" ADD CONSTRAINT "_blog_v_blocks_min_card_gallery_cards_mascot_id_asset_cloud_id_fk" FOREIGN KEY ("mascot_id") REFERENCES "public"."asset_cloud"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_blog_v_blocks_min_card_gallery_cards" ADD CONSTRAINT "_blog_v_blocks_min_card_gallery_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_blog_v_blocks_min_card_gallery"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_blog_v_blocks_min_card_gallery_cards_locales" ADD CONSTRAINT "_blog_v_blocks_min_card_gallery_cards_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_blog_v_blocks_min_card_gallery_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_blog_v_blocks_min_card_gallery" ADD CONSTRAINT "_blog_v_blocks_min_card_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_blog_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_blog_v_blocks_min_card_gallery_locales" ADD CONSTRAINT "_blog_v_blocks_min_card_gallery_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_blog_v_blocks_min_card_gallery"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "reports_blocks_min_card_gallery_cards" ADD CONSTRAINT "reports_blocks_min_card_gallery_cards_mascot_id_asset_cloud_id_fk" FOREIGN KEY ("mascot_id") REFERENCES "public"."asset_cloud"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "reports_blocks_min_card_gallery_cards" ADD CONSTRAINT "reports_blocks_min_card_gallery_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."reports_blocks_min_card_gallery"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "reports_blocks_min_card_gallery_cards_locales" ADD CONSTRAINT "reports_blocks_min_card_gallery_cards_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."reports_blocks_min_card_gallery_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "reports_blocks_min_card_gallery" ADD CONSTRAINT "reports_blocks_min_card_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."reports"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "reports_blocks_min_card_gallery_locales" ADD CONSTRAINT "reports_blocks_min_card_gallery_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."reports_blocks_min_card_gallery"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_reports_v_blocks_min_card_gallery_cards" ADD CONSTRAINT "_reports_v_blocks_min_card_gallery_cards_mascot_id_asset_cloud_id_fk" FOREIGN KEY ("mascot_id") REFERENCES "public"."asset_cloud"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_reports_v_blocks_min_card_gallery_cards" ADD CONSTRAINT "_reports_v_blocks_min_card_gallery_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_reports_v_blocks_min_card_gallery"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_reports_v_blocks_min_card_gallery_cards_locales" ADD CONSTRAINT "_reports_v_blocks_min_card_gallery_cards_locales_parent_i_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_reports_v_blocks_min_card_gallery_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_reports_v_blocks_min_card_gallery" ADD CONSTRAINT "_reports_v_blocks_min_card_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_reports_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_reports_v_blocks_min_card_gallery_locales" ADD CONSTRAINT "_reports_v_blocks_min_card_gallery_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_reports_v_blocks_min_card_gallery"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "mmedia_blocks_min_card_gallery_cards" ADD CONSTRAINT "mmedia_blocks_min_card_gallery_cards_mascot_id_asset_cloud_id_fk" FOREIGN KEY ("mascot_id") REFERENCES "public"."asset_cloud"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "mmedia_blocks_min_card_gallery_cards" ADD CONSTRAINT "mmedia_blocks_min_card_gallery_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."mmedia_blocks_min_card_gallery"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "mmedia_blocks_min_card_gallery_cards_locales" ADD CONSTRAINT "mmedia_blocks_min_card_gallery_cards_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."mmedia_blocks_min_card_gallery_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "mmedia_blocks_min_card_gallery" ADD CONSTRAINT "mmedia_blocks_min_card_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."mmedia"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "mmedia_blocks_min_card_gallery_locales" ADD CONSTRAINT "mmedia_blocks_min_card_gallery_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."mmedia_blocks_min_card_gallery"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_mmedia_v_blocks_min_card_gallery_cards" ADD CONSTRAINT "_mmedia_v_blocks_min_card_gallery_cards_mascot_id_asset_cloud_id_fk" FOREIGN KEY ("mascot_id") REFERENCES "public"."asset_cloud"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_mmedia_v_blocks_min_card_gallery_cards" ADD CONSTRAINT "_mmedia_v_blocks_min_card_gallery_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_mmedia_v_blocks_min_card_gallery"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_mmedia_v_blocks_min_card_gallery_cards_locales" ADD CONSTRAINT "_mmedia_v_blocks_min_card_gallery_cards_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_mmedia_v_blocks_min_card_gallery_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_mmedia_v_blocks_min_card_gallery" ADD CONSTRAINT "_mmedia_v_blocks_min_card_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_mmedia_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_mmedia_v_blocks_min_card_gallery_locales" ADD CONSTRAINT "_mmedia_v_blocks_min_card_gallery_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_mmedia_v_blocks_min_card_gallery"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_blocks_min_card_gallery_cards" ADD CONSTRAINT "homepage_blocks_min_card_gallery_cards_mascot_id_asset_cloud_id_fk" FOREIGN KEY ("mascot_id") REFERENCES "public"."asset_cloud"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "homepage_blocks_min_card_gallery_cards" ADD CONSTRAINT "homepage_blocks_min_card_gallery_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage_blocks_min_card_gallery"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_blocks_min_card_gallery_cards_locales" ADD CONSTRAINT "homepage_blocks_min_card_gallery_cards_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage_blocks_min_card_gallery_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_blocks_min_card_gallery" ADD CONSTRAINT "homepage_blocks_min_card_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_blocks_min_card_gallery_locales" ADD CONSTRAINT "homepage_blocks_min_card_gallery_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage_blocks_min_card_gallery"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_homepage_v_blocks_min_card_gallery_cards" ADD CONSTRAINT "_homepage_v_blocks_min_card_gallery_cards_mascot_id_asset_cloud_id_fk" FOREIGN KEY ("mascot_id") REFERENCES "public"."asset_cloud"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_homepage_v_blocks_min_card_gallery_cards" ADD CONSTRAINT "_homepage_v_blocks_min_card_gallery_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_homepage_v_blocks_min_card_gallery"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_homepage_v_blocks_min_card_gallery_cards_locales" ADD CONSTRAINT "_homepage_v_blocks_min_card_gallery_cards_locales_parent__fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_homepage_v_blocks_min_card_gallery_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_homepage_v_blocks_min_card_gallery" ADD CONSTRAINT "_homepage_v_blocks_min_card_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_homepage_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_homepage_v_blocks_min_card_gallery_locales" ADD CONSTRAINT "_homepage_v_blocks_min_card_gallery_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_homepage_v_blocks_min_card_gallery"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "grants_blocks_min_card_gallery_cards_order_idx" ON "grants_blocks_min_card_gallery_cards" USING btree ("_order");
  CREATE INDEX "grants_blocks_min_card_gallery_cards_parent_id_idx" ON "grants_blocks_min_card_gallery_cards" USING btree ("_parent_id");
  CREATE INDEX "grants_blocks_min_card_gallery_cards_mascot_idx" ON "grants_blocks_min_card_gallery_cards" USING btree ("mascot_id");
  CREATE UNIQUE INDEX "grants_blocks_min_card_gallery_cards_locales_locale_parent_i" ON "grants_blocks_min_card_gallery_cards_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "grants_blocks_min_card_gallery_order_idx" ON "grants_blocks_min_card_gallery" USING btree ("_order");
  CREATE INDEX "grants_blocks_min_card_gallery_parent_id_idx" ON "grants_blocks_min_card_gallery" USING btree ("_parent_id");
  CREATE INDEX "grants_blocks_min_card_gallery_path_idx" ON "grants_blocks_min_card_gallery" USING btree ("_path");
  CREATE UNIQUE INDEX "grants_blocks_min_card_gallery_locales_locale_parent_id_uniq" ON "grants_blocks_min_card_gallery_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_grants_v_blocks_min_card_gallery_cards_order_idx" ON "_grants_v_blocks_min_card_gallery_cards" USING btree ("_order");
  CREATE INDEX "_grants_v_blocks_min_card_gallery_cards_parent_id_idx" ON "_grants_v_blocks_min_card_gallery_cards" USING btree ("_parent_id");
  CREATE INDEX "_grants_v_blocks_min_card_gallery_cards_mascot_idx" ON "_grants_v_blocks_min_card_gallery_cards" USING btree ("mascot_id");
  CREATE UNIQUE INDEX "_grants_v_blocks_min_card_gallery_cards_locales_locale_paren" ON "_grants_v_blocks_min_card_gallery_cards_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_grants_v_blocks_min_card_gallery_order_idx" ON "_grants_v_blocks_min_card_gallery" USING btree ("_order");
  CREATE INDEX "_grants_v_blocks_min_card_gallery_parent_id_idx" ON "_grants_v_blocks_min_card_gallery" USING btree ("_parent_id");
  CREATE INDEX "_grants_v_blocks_min_card_gallery_path_idx" ON "_grants_v_blocks_min_card_gallery" USING btree ("_path");
  CREATE UNIQUE INDEX "_grants_v_blocks_min_card_gallery_locales_locale_parent_id_u" ON "_grants_v_blocks_min_card_gallery_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_min_card_gallery_cards_order_idx" ON "pages_blocks_min_card_gallery_cards" USING btree ("_order");
  CREATE INDEX "pages_blocks_min_card_gallery_cards_parent_id_idx" ON "pages_blocks_min_card_gallery_cards" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_min_card_gallery_cards_mascot_idx" ON "pages_blocks_min_card_gallery_cards" USING btree ("mascot_id");
  CREATE UNIQUE INDEX "pages_blocks_min_card_gallery_cards_locales_locale_parent_id" ON "pages_blocks_min_card_gallery_cards_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_min_card_gallery_order_idx" ON "pages_blocks_min_card_gallery" USING btree ("_order");
  CREATE INDEX "pages_blocks_min_card_gallery_parent_id_idx" ON "pages_blocks_min_card_gallery" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_min_card_gallery_path_idx" ON "pages_blocks_min_card_gallery" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_blocks_min_card_gallery_locales_locale_parent_id_uniqu" ON "pages_blocks_min_card_gallery_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_min_card_gallery_cards_order_idx" ON "_pages_v_blocks_min_card_gallery_cards" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_min_card_gallery_cards_parent_id_idx" ON "_pages_v_blocks_min_card_gallery_cards" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_min_card_gallery_cards_mascot_idx" ON "_pages_v_blocks_min_card_gallery_cards" USING btree ("mascot_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_min_card_gallery_cards_locales_locale_parent" ON "_pages_v_blocks_min_card_gallery_cards_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_min_card_gallery_order_idx" ON "_pages_v_blocks_min_card_gallery" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_min_card_gallery_parent_id_idx" ON "_pages_v_blocks_min_card_gallery" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_min_card_gallery_path_idx" ON "_pages_v_blocks_min_card_gallery" USING btree ("_path");
  CREATE UNIQUE INDEX "_pages_v_blocks_min_card_gallery_locales_locale_parent_id_un" ON "_pages_v_blocks_min_card_gallery_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "blog_blocks_min_card_gallery_cards_order_idx" ON "blog_blocks_min_card_gallery_cards" USING btree ("_order");
  CREATE INDEX "blog_blocks_min_card_gallery_cards_parent_id_idx" ON "blog_blocks_min_card_gallery_cards" USING btree ("_parent_id");
  CREATE INDEX "blog_blocks_min_card_gallery_cards_mascot_idx" ON "blog_blocks_min_card_gallery_cards" USING btree ("mascot_id");
  CREATE UNIQUE INDEX "blog_blocks_min_card_gallery_cards_locales_locale_parent_id_" ON "blog_blocks_min_card_gallery_cards_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "blog_blocks_min_card_gallery_order_idx" ON "blog_blocks_min_card_gallery" USING btree ("_order");
  CREATE INDEX "blog_blocks_min_card_gallery_parent_id_idx" ON "blog_blocks_min_card_gallery" USING btree ("_parent_id");
  CREATE INDEX "blog_blocks_min_card_gallery_path_idx" ON "blog_blocks_min_card_gallery" USING btree ("_path");
  CREATE UNIQUE INDEX "blog_blocks_min_card_gallery_locales_locale_parent_id_unique" ON "blog_blocks_min_card_gallery_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_blog_v_blocks_min_card_gallery_cards_order_idx" ON "_blog_v_blocks_min_card_gallery_cards" USING btree ("_order");
  CREATE INDEX "_blog_v_blocks_min_card_gallery_cards_parent_id_idx" ON "_blog_v_blocks_min_card_gallery_cards" USING btree ("_parent_id");
  CREATE INDEX "_blog_v_blocks_min_card_gallery_cards_mascot_idx" ON "_blog_v_blocks_min_card_gallery_cards" USING btree ("mascot_id");
  CREATE UNIQUE INDEX "_blog_v_blocks_min_card_gallery_cards_locales_locale_parent_" ON "_blog_v_blocks_min_card_gallery_cards_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_blog_v_blocks_min_card_gallery_order_idx" ON "_blog_v_blocks_min_card_gallery" USING btree ("_order");
  CREATE INDEX "_blog_v_blocks_min_card_gallery_parent_id_idx" ON "_blog_v_blocks_min_card_gallery" USING btree ("_parent_id");
  CREATE INDEX "_blog_v_blocks_min_card_gallery_path_idx" ON "_blog_v_blocks_min_card_gallery" USING btree ("_path");
  CREATE UNIQUE INDEX "_blog_v_blocks_min_card_gallery_locales_locale_parent_id_uni" ON "_blog_v_blocks_min_card_gallery_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "reports_blocks_min_card_gallery_cards_order_idx" ON "reports_blocks_min_card_gallery_cards" USING btree ("_order");
  CREATE INDEX "reports_blocks_min_card_gallery_cards_parent_id_idx" ON "reports_blocks_min_card_gallery_cards" USING btree ("_parent_id");
  CREATE INDEX "reports_blocks_min_card_gallery_cards_mascot_idx" ON "reports_blocks_min_card_gallery_cards" USING btree ("mascot_id");
  CREATE UNIQUE INDEX "reports_blocks_min_card_gallery_cards_locales_locale_parent_" ON "reports_blocks_min_card_gallery_cards_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "reports_blocks_min_card_gallery_order_idx" ON "reports_blocks_min_card_gallery" USING btree ("_order");
  CREATE INDEX "reports_blocks_min_card_gallery_parent_id_idx" ON "reports_blocks_min_card_gallery" USING btree ("_parent_id");
  CREATE INDEX "reports_blocks_min_card_gallery_path_idx" ON "reports_blocks_min_card_gallery" USING btree ("_path");
  CREATE UNIQUE INDEX "reports_blocks_min_card_gallery_locales_locale_parent_id_uni" ON "reports_blocks_min_card_gallery_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_reports_v_blocks_min_card_gallery_cards_order_idx" ON "_reports_v_blocks_min_card_gallery_cards" USING btree ("_order");
  CREATE INDEX "_reports_v_blocks_min_card_gallery_cards_parent_id_idx" ON "_reports_v_blocks_min_card_gallery_cards" USING btree ("_parent_id");
  CREATE INDEX "_reports_v_blocks_min_card_gallery_cards_mascot_idx" ON "_reports_v_blocks_min_card_gallery_cards" USING btree ("mascot_id");
  CREATE UNIQUE INDEX "_reports_v_blocks_min_card_gallery_cards_locales_locale_pare" ON "_reports_v_blocks_min_card_gallery_cards_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_reports_v_blocks_min_card_gallery_order_idx" ON "_reports_v_blocks_min_card_gallery" USING btree ("_order");
  CREATE INDEX "_reports_v_blocks_min_card_gallery_parent_id_idx" ON "_reports_v_blocks_min_card_gallery" USING btree ("_parent_id");
  CREATE INDEX "_reports_v_blocks_min_card_gallery_path_idx" ON "_reports_v_blocks_min_card_gallery" USING btree ("_path");
  CREATE UNIQUE INDEX "_reports_v_blocks_min_card_gallery_locales_locale_parent_id_" ON "_reports_v_blocks_min_card_gallery_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "mmedia_blocks_min_card_gallery_cards_order_idx" ON "mmedia_blocks_min_card_gallery_cards" USING btree ("_order");
  CREATE INDEX "mmedia_blocks_min_card_gallery_cards_parent_id_idx" ON "mmedia_blocks_min_card_gallery_cards" USING btree ("_parent_id");
  CREATE INDEX "mmedia_blocks_min_card_gallery_cards_mascot_idx" ON "mmedia_blocks_min_card_gallery_cards" USING btree ("mascot_id");
  CREATE UNIQUE INDEX "mmedia_blocks_min_card_gallery_cards_locales_locale_parent_i" ON "mmedia_blocks_min_card_gallery_cards_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "mmedia_blocks_min_card_gallery_order_idx" ON "mmedia_blocks_min_card_gallery" USING btree ("_order");
  CREATE INDEX "mmedia_blocks_min_card_gallery_parent_id_idx" ON "mmedia_blocks_min_card_gallery" USING btree ("_parent_id");
  CREATE INDEX "mmedia_blocks_min_card_gallery_path_idx" ON "mmedia_blocks_min_card_gallery" USING btree ("_path");
  CREATE UNIQUE INDEX "mmedia_blocks_min_card_gallery_locales_locale_parent_id_uniq" ON "mmedia_blocks_min_card_gallery_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_mmedia_v_blocks_min_card_gallery_cards_order_idx" ON "_mmedia_v_blocks_min_card_gallery_cards" USING btree ("_order");
  CREATE INDEX "_mmedia_v_blocks_min_card_gallery_cards_parent_id_idx" ON "_mmedia_v_blocks_min_card_gallery_cards" USING btree ("_parent_id");
  CREATE INDEX "_mmedia_v_blocks_min_card_gallery_cards_mascot_idx" ON "_mmedia_v_blocks_min_card_gallery_cards" USING btree ("mascot_id");
  CREATE UNIQUE INDEX "_mmedia_v_blocks_min_card_gallery_cards_locales_locale_paren" ON "_mmedia_v_blocks_min_card_gallery_cards_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_mmedia_v_blocks_min_card_gallery_order_idx" ON "_mmedia_v_blocks_min_card_gallery" USING btree ("_order");
  CREATE INDEX "_mmedia_v_blocks_min_card_gallery_parent_id_idx" ON "_mmedia_v_blocks_min_card_gallery" USING btree ("_parent_id");
  CREATE INDEX "_mmedia_v_blocks_min_card_gallery_path_idx" ON "_mmedia_v_blocks_min_card_gallery" USING btree ("_path");
  CREATE UNIQUE INDEX "_mmedia_v_blocks_min_card_gallery_locales_locale_parent_id_u" ON "_mmedia_v_blocks_min_card_gallery_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "homepage_blocks_min_card_gallery_cards_order_idx" ON "homepage_blocks_min_card_gallery_cards" USING btree ("_order");
  CREATE INDEX "homepage_blocks_min_card_gallery_cards_parent_id_idx" ON "homepage_blocks_min_card_gallery_cards" USING btree ("_parent_id");
  CREATE INDEX "homepage_blocks_min_card_gallery_cards_mascot_idx" ON "homepage_blocks_min_card_gallery_cards" USING btree ("mascot_id");
  CREATE UNIQUE INDEX "homepage_blocks_min_card_gallery_cards_locales_locale_parent" ON "homepage_blocks_min_card_gallery_cards_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "homepage_blocks_min_card_gallery_order_idx" ON "homepage_blocks_min_card_gallery" USING btree ("_order");
  CREATE INDEX "homepage_blocks_min_card_gallery_parent_id_idx" ON "homepage_blocks_min_card_gallery" USING btree ("_parent_id");
  CREATE INDEX "homepage_blocks_min_card_gallery_path_idx" ON "homepage_blocks_min_card_gallery" USING btree ("_path");
  CREATE UNIQUE INDEX "homepage_blocks_min_card_gallery_locales_locale_parent_id_un" ON "homepage_blocks_min_card_gallery_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_homepage_v_blocks_min_card_gallery_cards_order_idx" ON "_homepage_v_blocks_min_card_gallery_cards" USING btree ("_order");
  CREATE INDEX "_homepage_v_blocks_min_card_gallery_cards_parent_id_idx" ON "_homepage_v_blocks_min_card_gallery_cards" USING btree ("_parent_id");
  CREATE INDEX "_homepage_v_blocks_min_card_gallery_cards_mascot_idx" ON "_homepage_v_blocks_min_card_gallery_cards" USING btree ("mascot_id");
  CREATE UNIQUE INDEX "_homepage_v_blocks_min_card_gallery_cards_locales_locale_par" ON "_homepage_v_blocks_min_card_gallery_cards_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_homepage_v_blocks_min_card_gallery_order_idx" ON "_homepage_v_blocks_min_card_gallery" USING btree ("_order");
  CREATE INDEX "_homepage_v_blocks_min_card_gallery_parent_id_idx" ON "_homepage_v_blocks_min_card_gallery" USING btree ("_parent_id");
  CREATE INDEX "_homepage_v_blocks_min_card_gallery_path_idx" ON "_homepage_v_blocks_min_card_gallery" USING btree ("_path");
  CREATE UNIQUE INDEX "_homepage_v_blocks_min_card_gallery_locales_locale_parent_id" ON "_homepage_v_blocks_min_card_gallery_locales" USING btree ("_locale","_parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "grants_blocks_min_card_gallery_cards" CASCADE;
  DROP TABLE "grants_blocks_min_card_gallery_cards_locales" CASCADE;
  DROP TABLE "grants_blocks_min_card_gallery" CASCADE;
  DROP TABLE "grants_blocks_min_card_gallery_locales" CASCADE;
  DROP TABLE "_grants_v_blocks_min_card_gallery_cards" CASCADE;
  DROP TABLE "_grants_v_blocks_min_card_gallery_cards_locales" CASCADE;
  DROP TABLE "_grants_v_blocks_min_card_gallery" CASCADE;
  DROP TABLE "_grants_v_blocks_min_card_gallery_locales" CASCADE;
  DROP TABLE "pages_blocks_min_card_gallery_cards" CASCADE;
  DROP TABLE "pages_blocks_min_card_gallery_cards_locales" CASCADE;
  DROP TABLE "pages_blocks_min_card_gallery" CASCADE;
  DROP TABLE "pages_blocks_min_card_gallery_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_min_card_gallery_cards" CASCADE;
  DROP TABLE "_pages_v_blocks_min_card_gallery_cards_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_min_card_gallery" CASCADE;
  DROP TABLE "_pages_v_blocks_min_card_gallery_locales" CASCADE;
  DROP TABLE "blog_blocks_min_card_gallery_cards" CASCADE;
  DROP TABLE "blog_blocks_min_card_gallery_cards_locales" CASCADE;
  DROP TABLE "blog_blocks_min_card_gallery" CASCADE;
  DROP TABLE "blog_blocks_min_card_gallery_locales" CASCADE;
  DROP TABLE "_blog_v_blocks_min_card_gallery_cards" CASCADE;
  DROP TABLE "_blog_v_blocks_min_card_gallery_cards_locales" CASCADE;
  DROP TABLE "_blog_v_blocks_min_card_gallery" CASCADE;
  DROP TABLE "_blog_v_blocks_min_card_gallery_locales" CASCADE;
  DROP TABLE "reports_blocks_min_card_gallery_cards" CASCADE;
  DROP TABLE "reports_blocks_min_card_gallery_cards_locales" CASCADE;
  DROP TABLE "reports_blocks_min_card_gallery" CASCADE;
  DROP TABLE "reports_blocks_min_card_gallery_locales" CASCADE;
  DROP TABLE "_reports_v_blocks_min_card_gallery_cards" CASCADE;
  DROP TABLE "_reports_v_blocks_min_card_gallery_cards_locales" CASCADE;
  DROP TABLE "_reports_v_blocks_min_card_gallery" CASCADE;
  DROP TABLE "_reports_v_blocks_min_card_gallery_locales" CASCADE;
  DROP TABLE "mmedia_blocks_min_card_gallery_cards" CASCADE;
  DROP TABLE "mmedia_blocks_min_card_gallery_cards_locales" CASCADE;
  DROP TABLE "mmedia_blocks_min_card_gallery" CASCADE;
  DROP TABLE "mmedia_blocks_min_card_gallery_locales" CASCADE;
  DROP TABLE "_mmedia_v_blocks_min_card_gallery_cards" CASCADE;
  DROP TABLE "_mmedia_v_blocks_min_card_gallery_cards_locales" CASCADE;
  DROP TABLE "_mmedia_v_blocks_min_card_gallery" CASCADE;
  DROP TABLE "_mmedia_v_blocks_min_card_gallery_locales" CASCADE;
  DROP TABLE "homepage_blocks_min_card_gallery_cards" CASCADE;
  DROP TABLE "homepage_blocks_min_card_gallery_cards_locales" CASCADE;
  DROP TABLE "homepage_blocks_min_card_gallery" CASCADE;
  DROP TABLE "homepage_blocks_min_card_gallery_locales" CASCADE;
  DROP TABLE "_homepage_v_blocks_min_card_gallery_cards" CASCADE;
  DROP TABLE "_homepage_v_blocks_min_card_gallery_cards_locales" CASCADE;
  DROP TABLE "_homepage_v_blocks_min_card_gallery" CASCADE;
  DROP TABLE "_homepage_v_blocks_min_card_gallery_locales" CASCADE;
  DROP TYPE "public"."enum_grants_blocks_min_card_gallery_header_align";
  DROP TYPE "public"."enum__grants_v_blocks_min_card_gallery_header_align";
  DROP TYPE "public"."enum_pages_blocks_min_card_gallery_header_align";
  DROP TYPE "public"."enum__pages_v_blocks_min_card_gallery_header_align";
  DROP TYPE "public"."enum_blog_blocks_min_card_gallery_header_align";
  DROP TYPE "public"."enum__blog_v_blocks_min_card_gallery_header_align";
  DROP TYPE "public"."enum_reports_blocks_min_card_gallery_header_align";
  DROP TYPE "public"."enum__reports_v_blocks_min_card_gallery_header_align";
  DROP TYPE "public"."enum_mmedia_blocks_min_card_gallery_header_align";
  DROP TYPE "public"."enum__mmedia_v_blocks_min_card_gallery_header_align";
  DROP TYPE "public"."enum_homepage_blocks_min_card_gallery_header_align";
  DROP TYPE "public"."enum__homepage_v_blocks_min_card_gallery_header_align";`)
}
