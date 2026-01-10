import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_grants_blocks_funding_map_items_region_name" AS ENUM('uaf-asia-pacific', 'afghan', 'aus', 'bangla', 'cambodia', 'china', 'india', 'indonesia', 'korea', 'laos', 'malaysia', 'mongolia', 'myanmar', 'nepal', 'pak', 'papua', 'philippines', 'srilanka', 'thailand', 'vietnam');
  CREATE TYPE "public"."enum__grants_v_blocks_funding_map_items_region_name" AS ENUM('uaf-asia-pacific', 'afghan', 'aus', 'bangla', 'cambodia', 'china', 'india', 'indonesia', 'korea', 'laos', 'malaysia', 'mongolia', 'myanmar', 'nepal', 'pak', 'papua', 'philippines', 'srilanka', 'thailand', 'vietnam');
  CREATE TYPE "public"."enum_pages_blocks_funding_map_items_region_name" AS ENUM('uaf-asia-pacific', 'afghan', 'aus', 'bangla', 'cambodia', 'china', 'india', 'indonesia', 'korea', 'laos', 'malaysia', 'mongolia', 'myanmar', 'nepal', 'pak', 'papua', 'philippines', 'srilanka', 'thailand', 'vietnam');
  CREATE TYPE "public"."enum__pages_v_blocks_funding_map_items_region_name" AS ENUM('uaf-asia-pacific', 'afghan', 'aus', 'bangla', 'cambodia', 'china', 'india', 'indonesia', 'korea', 'laos', 'malaysia', 'mongolia', 'myanmar', 'nepal', 'pak', 'papua', 'philippines', 'srilanka', 'thailand', 'vietnam');
  CREATE TYPE "public"."enum_blog_blocks_funding_map_items_region_name" AS ENUM('uaf-asia-pacific', 'afghan', 'aus', 'bangla', 'cambodia', 'china', 'india', 'indonesia', 'korea', 'laos', 'malaysia', 'mongolia', 'myanmar', 'nepal', 'pak', 'papua', 'philippines', 'srilanka', 'thailand', 'vietnam');
  CREATE TYPE "public"."enum__blog_v_blocks_funding_map_items_region_name" AS ENUM('uaf-asia-pacific', 'afghan', 'aus', 'bangla', 'cambodia', 'china', 'india', 'indonesia', 'korea', 'laos', 'malaysia', 'mongolia', 'myanmar', 'nepal', 'pak', 'papua', 'philippines', 'srilanka', 'thailand', 'vietnam');
  CREATE TYPE "public"."enum_reports_blocks_funding_map_items_region_name" AS ENUM('uaf-asia-pacific', 'afghan', 'aus', 'bangla', 'cambodia', 'china', 'india', 'indonesia', 'korea', 'laos', 'malaysia', 'mongolia', 'myanmar', 'nepal', 'pak', 'papua', 'philippines', 'srilanka', 'thailand', 'vietnam');
  CREATE TYPE "public"."enum__reports_v_blocks_funding_map_items_region_name" AS ENUM('uaf-asia-pacific', 'afghan', 'aus', 'bangla', 'cambodia', 'china', 'india', 'indonesia', 'korea', 'laos', 'malaysia', 'mongolia', 'myanmar', 'nepal', 'pak', 'papua', 'philippines', 'srilanka', 'thailand', 'vietnam');
  CREATE TYPE "public"."enum_mmedia_blocks_funding_map_items_region_name" AS ENUM('uaf-asia-pacific', 'afghan', 'aus', 'bangla', 'cambodia', 'china', 'india', 'indonesia', 'korea', 'laos', 'malaysia', 'mongolia', 'myanmar', 'nepal', 'pak', 'papua', 'philippines', 'srilanka', 'thailand', 'vietnam');
  CREATE TYPE "public"."enum__mmedia_v_blocks_funding_map_items_region_name" AS ENUM('uaf-asia-pacific', 'afghan', 'aus', 'bangla', 'cambodia', 'china', 'india', 'indonesia', 'korea', 'laos', 'malaysia', 'mongolia', 'myanmar', 'nepal', 'pak', 'papua', 'philippines', 'srilanka', 'thailand', 'vietnam');
  CREATE TABLE "grants_blocks_funding_map_items_subitems" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "grants_blocks_funding_map_items_subitems_locales" (
  	"statnumber" varchar,
  	"description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "grants_blocks_funding_map_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"region_name" "enum_grants_blocks_funding_map_items_region_name" DEFAULT 'uaf-asia-pacific'
  );
  
  CREATE TABLE "grants_blocks_funding_map" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "grants_blocks_funding_map_locales" (
  	"title" varchar,
  	"subtitle" varchar,
  	"selector_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "_grants_v_blocks_funding_map_items_subitems" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_grants_v_blocks_funding_map_items_subitems_locales" (
  	"statnumber" varchar,
  	"description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_grants_v_blocks_funding_map_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"region_name" "enum__grants_v_blocks_funding_map_items_region_name" DEFAULT 'uaf-asia-pacific',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_grants_v_blocks_funding_map" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_grants_v_blocks_funding_map_locales" (
  	"title" varchar,
  	"subtitle" varchar,
  	"selector_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "pages_blocks_funding_map_items_subitems" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "pages_blocks_funding_map_items_subitems_locales" (
  	"statnumber" varchar,
  	"description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_funding_map_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"region_name" "enum_pages_blocks_funding_map_items_region_name" DEFAULT 'uaf-asia-pacific'
  );
  
  CREATE TABLE "pages_blocks_funding_map" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_funding_map_locales" (
  	"title" varchar,
  	"subtitle" varchar,
  	"selector_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_funding_map_items_subitems" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_funding_map_items_subitems_locales" (
  	"statnumber" varchar,
  	"description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_funding_map_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"region_name" "enum__pages_v_blocks_funding_map_items_region_name" DEFAULT 'uaf-asia-pacific',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_funding_map" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_funding_map_locales" (
  	"title" varchar,
  	"subtitle" varchar,
  	"selector_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "blog_blocks_funding_map_items_subitems" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "blog_blocks_funding_map_items_subitems_locales" (
  	"statnumber" varchar,
  	"description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "blog_blocks_funding_map_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"region_name" "enum_blog_blocks_funding_map_items_region_name" DEFAULT 'uaf-asia-pacific'
  );
  
  CREATE TABLE "blog_blocks_funding_map" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "blog_blocks_funding_map_locales" (
  	"title" varchar,
  	"subtitle" varchar,
  	"selector_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "_blog_v_blocks_funding_map_items_subitems" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_blog_v_blocks_funding_map_items_subitems_locales" (
  	"statnumber" varchar,
  	"description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_blog_v_blocks_funding_map_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"region_name" "enum__blog_v_blocks_funding_map_items_region_name" DEFAULT 'uaf-asia-pacific',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_blog_v_blocks_funding_map" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_blog_v_blocks_funding_map_locales" (
  	"title" varchar,
  	"subtitle" varchar,
  	"selector_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "reports_blocks_funding_map_items_subitems" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "reports_blocks_funding_map_items_subitems_locales" (
  	"statnumber" varchar,
  	"description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "reports_blocks_funding_map_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"region_name" "enum_reports_blocks_funding_map_items_region_name" DEFAULT 'uaf-asia-pacific'
  );
  
  CREATE TABLE "reports_blocks_funding_map" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "reports_blocks_funding_map_locales" (
  	"title" varchar,
  	"subtitle" varchar,
  	"selector_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "_reports_v_blocks_funding_map_items_subitems" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_reports_v_blocks_funding_map_items_subitems_locales" (
  	"statnumber" varchar,
  	"description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_reports_v_blocks_funding_map_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"region_name" "enum__reports_v_blocks_funding_map_items_region_name" DEFAULT 'uaf-asia-pacific',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_reports_v_blocks_funding_map" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_reports_v_blocks_funding_map_locales" (
  	"title" varchar,
  	"subtitle" varchar,
  	"selector_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "mmedia_blocks_funding_map_items_subitems" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "mmedia_blocks_funding_map_items_subitems_locales" (
  	"statnumber" varchar,
  	"description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "mmedia_blocks_funding_map_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"region_name" "enum_mmedia_blocks_funding_map_items_region_name" DEFAULT 'uaf-asia-pacific'
  );
  
  CREATE TABLE "mmedia_blocks_funding_map" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "mmedia_blocks_funding_map_locales" (
  	"title" varchar,
  	"subtitle" varchar,
  	"selector_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "_mmedia_v_blocks_funding_map_items_subitems" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_mmedia_v_blocks_funding_map_items_subitems_locales" (
  	"statnumber" varchar,
  	"description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_mmedia_v_blocks_funding_map_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"region_name" "enum__mmedia_v_blocks_funding_map_items_region_name" DEFAULT 'uaf-asia-pacific',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_mmedia_v_blocks_funding_map" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_mmedia_v_blocks_funding_map_locales" (
  	"title" varchar,
  	"subtitle" varchar,
  	"selector_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  ALTER TABLE "grants_blocks_funding_map_items_subitems" ADD CONSTRAINT "grants_blocks_funding_map_items_subitems_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."grants_blocks_funding_map_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "grants_blocks_funding_map_items_subitems_locales" ADD CONSTRAINT "grants_blocks_funding_map_items_subitems_locales_parent_i_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."grants_blocks_funding_map_items_subitems"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "grants_blocks_funding_map_items" ADD CONSTRAINT "grants_blocks_funding_map_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."grants_blocks_funding_map"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "grants_blocks_funding_map" ADD CONSTRAINT "grants_blocks_funding_map_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."grants"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "grants_blocks_funding_map_locales" ADD CONSTRAINT "grants_blocks_funding_map_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."grants_blocks_funding_map"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_grants_v_blocks_funding_map_items_subitems" ADD CONSTRAINT "_grants_v_blocks_funding_map_items_subitems_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_grants_v_blocks_funding_map_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_grants_v_blocks_funding_map_items_subitems_locales" ADD CONSTRAINT "_grants_v_blocks_funding_map_items_subitems_locales_paren_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_grants_v_blocks_funding_map_items_subitems"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_grants_v_blocks_funding_map_items" ADD CONSTRAINT "_grants_v_blocks_funding_map_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_grants_v_blocks_funding_map"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_grants_v_blocks_funding_map" ADD CONSTRAINT "_grants_v_blocks_funding_map_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_grants_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_grants_v_blocks_funding_map_locales" ADD CONSTRAINT "_grants_v_blocks_funding_map_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_grants_v_blocks_funding_map"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_funding_map_items_subitems" ADD CONSTRAINT "pages_blocks_funding_map_items_subitems_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_funding_map_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_funding_map_items_subitems_locales" ADD CONSTRAINT "pages_blocks_funding_map_items_subitems_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_funding_map_items_subitems"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_funding_map_items" ADD CONSTRAINT "pages_blocks_funding_map_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_funding_map"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_funding_map" ADD CONSTRAINT "pages_blocks_funding_map_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_funding_map_locales" ADD CONSTRAINT "pages_blocks_funding_map_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_funding_map"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_funding_map_items_subitems" ADD CONSTRAINT "_pages_v_blocks_funding_map_items_subitems_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_funding_map_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_funding_map_items_subitems_locales" ADD CONSTRAINT "_pages_v_blocks_funding_map_items_subitems_locales_parent_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_funding_map_items_subitems"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_funding_map_items" ADD CONSTRAINT "_pages_v_blocks_funding_map_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_funding_map"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_funding_map" ADD CONSTRAINT "_pages_v_blocks_funding_map_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_funding_map_locales" ADD CONSTRAINT "_pages_v_blocks_funding_map_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_funding_map"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "blog_blocks_funding_map_items_subitems" ADD CONSTRAINT "blog_blocks_funding_map_items_subitems_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."blog_blocks_funding_map_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "blog_blocks_funding_map_items_subitems_locales" ADD CONSTRAINT "blog_blocks_funding_map_items_subitems_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."blog_blocks_funding_map_items_subitems"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "blog_blocks_funding_map_items" ADD CONSTRAINT "blog_blocks_funding_map_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."blog_blocks_funding_map"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "blog_blocks_funding_map" ADD CONSTRAINT "blog_blocks_funding_map_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."blog"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "blog_blocks_funding_map_locales" ADD CONSTRAINT "blog_blocks_funding_map_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."blog_blocks_funding_map"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_blog_v_blocks_funding_map_items_subitems" ADD CONSTRAINT "_blog_v_blocks_funding_map_items_subitems_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_blog_v_blocks_funding_map_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_blog_v_blocks_funding_map_items_subitems_locales" ADD CONSTRAINT "_blog_v_blocks_funding_map_items_subitems_locales_parent__fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_blog_v_blocks_funding_map_items_subitems"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_blog_v_blocks_funding_map_items" ADD CONSTRAINT "_blog_v_blocks_funding_map_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_blog_v_blocks_funding_map"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_blog_v_blocks_funding_map" ADD CONSTRAINT "_blog_v_blocks_funding_map_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_blog_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_blog_v_blocks_funding_map_locales" ADD CONSTRAINT "_blog_v_blocks_funding_map_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_blog_v_blocks_funding_map"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "reports_blocks_funding_map_items_subitems" ADD CONSTRAINT "reports_blocks_funding_map_items_subitems_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."reports_blocks_funding_map_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "reports_blocks_funding_map_items_subitems_locales" ADD CONSTRAINT "reports_blocks_funding_map_items_subitems_locales_parent__fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."reports_blocks_funding_map_items_subitems"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "reports_blocks_funding_map_items" ADD CONSTRAINT "reports_blocks_funding_map_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."reports_blocks_funding_map"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "reports_blocks_funding_map" ADD CONSTRAINT "reports_blocks_funding_map_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."reports"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "reports_blocks_funding_map_locales" ADD CONSTRAINT "reports_blocks_funding_map_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."reports_blocks_funding_map"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_reports_v_blocks_funding_map_items_subitems" ADD CONSTRAINT "_reports_v_blocks_funding_map_items_subitems_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_reports_v_blocks_funding_map_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_reports_v_blocks_funding_map_items_subitems_locales" ADD CONSTRAINT "_reports_v_blocks_funding_map_items_subitems_locales_pare_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_reports_v_blocks_funding_map_items_subitems"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_reports_v_blocks_funding_map_items" ADD CONSTRAINT "_reports_v_blocks_funding_map_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_reports_v_blocks_funding_map"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_reports_v_blocks_funding_map" ADD CONSTRAINT "_reports_v_blocks_funding_map_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_reports_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_reports_v_blocks_funding_map_locales" ADD CONSTRAINT "_reports_v_blocks_funding_map_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_reports_v_blocks_funding_map"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "mmedia_blocks_funding_map_items_subitems" ADD CONSTRAINT "mmedia_blocks_funding_map_items_subitems_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."mmedia_blocks_funding_map_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "mmedia_blocks_funding_map_items_subitems_locales" ADD CONSTRAINT "mmedia_blocks_funding_map_items_subitems_locales_parent_i_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."mmedia_blocks_funding_map_items_subitems"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "mmedia_blocks_funding_map_items" ADD CONSTRAINT "mmedia_blocks_funding_map_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."mmedia_blocks_funding_map"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "mmedia_blocks_funding_map" ADD CONSTRAINT "mmedia_blocks_funding_map_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."mmedia"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "mmedia_blocks_funding_map_locales" ADD CONSTRAINT "mmedia_blocks_funding_map_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."mmedia_blocks_funding_map"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_mmedia_v_blocks_funding_map_items_subitems" ADD CONSTRAINT "_mmedia_v_blocks_funding_map_items_subitems_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_mmedia_v_blocks_funding_map_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_mmedia_v_blocks_funding_map_items_subitems_locales" ADD CONSTRAINT "_mmedia_v_blocks_funding_map_items_subitems_locales_paren_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_mmedia_v_blocks_funding_map_items_subitems"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_mmedia_v_blocks_funding_map_items" ADD CONSTRAINT "_mmedia_v_blocks_funding_map_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_mmedia_v_blocks_funding_map"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_mmedia_v_blocks_funding_map" ADD CONSTRAINT "_mmedia_v_blocks_funding_map_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_mmedia_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_mmedia_v_blocks_funding_map_locales" ADD CONSTRAINT "_mmedia_v_blocks_funding_map_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_mmedia_v_blocks_funding_map"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "grants_blocks_funding_map_items_subitems_order_idx" ON "grants_blocks_funding_map_items_subitems" USING btree ("_order");
  CREATE INDEX "grants_blocks_funding_map_items_subitems_parent_id_idx" ON "grants_blocks_funding_map_items_subitems" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "grants_blocks_funding_map_items_subitems_locales_locale_pare" ON "grants_blocks_funding_map_items_subitems_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "grants_blocks_funding_map_items_order_idx" ON "grants_blocks_funding_map_items" USING btree ("_order");
  CREATE INDEX "grants_blocks_funding_map_items_parent_id_idx" ON "grants_blocks_funding_map_items" USING btree ("_parent_id");
  CREATE INDEX "grants_blocks_funding_map_order_idx" ON "grants_blocks_funding_map" USING btree ("_order");
  CREATE INDEX "grants_blocks_funding_map_parent_id_idx" ON "grants_blocks_funding_map" USING btree ("_parent_id");
  CREATE INDEX "grants_blocks_funding_map_path_idx" ON "grants_blocks_funding_map" USING btree ("_path");
  CREATE UNIQUE INDEX "grants_blocks_funding_map_locales_locale_parent_id_unique" ON "grants_blocks_funding_map_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_grants_v_blocks_funding_map_items_subitems_order_idx" ON "_grants_v_blocks_funding_map_items_subitems" USING btree ("_order");
  CREATE INDEX "_grants_v_blocks_funding_map_items_subitems_parent_id_idx" ON "_grants_v_blocks_funding_map_items_subitems" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_grants_v_blocks_funding_map_items_subitems_locales_locale_p" ON "_grants_v_blocks_funding_map_items_subitems_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_grants_v_blocks_funding_map_items_order_idx" ON "_grants_v_blocks_funding_map_items" USING btree ("_order");
  CREATE INDEX "_grants_v_blocks_funding_map_items_parent_id_idx" ON "_grants_v_blocks_funding_map_items" USING btree ("_parent_id");
  CREATE INDEX "_grants_v_blocks_funding_map_order_idx" ON "_grants_v_blocks_funding_map" USING btree ("_order");
  CREATE INDEX "_grants_v_blocks_funding_map_parent_id_idx" ON "_grants_v_blocks_funding_map" USING btree ("_parent_id");
  CREATE INDEX "_grants_v_blocks_funding_map_path_idx" ON "_grants_v_blocks_funding_map" USING btree ("_path");
  CREATE UNIQUE INDEX "_grants_v_blocks_funding_map_locales_locale_parent_id_unique" ON "_grants_v_blocks_funding_map_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_funding_map_items_subitems_order_idx" ON "pages_blocks_funding_map_items_subitems" USING btree ("_order");
  CREATE INDEX "pages_blocks_funding_map_items_subitems_parent_id_idx" ON "pages_blocks_funding_map_items_subitems" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_funding_map_items_subitems_locales_locale_paren" ON "pages_blocks_funding_map_items_subitems_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_funding_map_items_order_idx" ON "pages_blocks_funding_map_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_funding_map_items_parent_id_idx" ON "pages_blocks_funding_map_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_funding_map_order_idx" ON "pages_blocks_funding_map" USING btree ("_order");
  CREATE INDEX "pages_blocks_funding_map_parent_id_idx" ON "pages_blocks_funding_map" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_funding_map_path_idx" ON "pages_blocks_funding_map" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_blocks_funding_map_locales_locale_parent_id_unique" ON "pages_blocks_funding_map_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_funding_map_items_subitems_order_idx" ON "_pages_v_blocks_funding_map_items_subitems" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_funding_map_items_subitems_parent_id_idx" ON "_pages_v_blocks_funding_map_items_subitems" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_funding_map_items_subitems_locales_locale_pa" ON "_pages_v_blocks_funding_map_items_subitems_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_funding_map_items_order_idx" ON "_pages_v_blocks_funding_map_items" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_funding_map_items_parent_id_idx" ON "_pages_v_blocks_funding_map_items" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_funding_map_order_idx" ON "_pages_v_blocks_funding_map" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_funding_map_parent_id_idx" ON "_pages_v_blocks_funding_map" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_funding_map_path_idx" ON "_pages_v_blocks_funding_map" USING btree ("_path");
  CREATE UNIQUE INDEX "_pages_v_blocks_funding_map_locales_locale_parent_id_unique" ON "_pages_v_blocks_funding_map_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "blog_blocks_funding_map_items_subitems_order_idx" ON "blog_blocks_funding_map_items_subitems" USING btree ("_order");
  CREATE INDEX "blog_blocks_funding_map_items_subitems_parent_id_idx" ON "blog_blocks_funding_map_items_subitems" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "blog_blocks_funding_map_items_subitems_locales_locale_parent" ON "blog_blocks_funding_map_items_subitems_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "blog_blocks_funding_map_items_order_idx" ON "blog_blocks_funding_map_items" USING btree ("_order");
  CREATE INDEX "blog_blocks_funding_map_items_parent_id_idx" ON "blog_blocks_funding_map_items" USING btree ("_parent_id");
  CREATE INDEX "blog_blocks_funding_map_order_idx" ON "blog_blocks_funding_map" USING btree ("_order");
  CREATE INDEX "blog_blocks_funding_map_parent_id_idx" ON "blog_blocks_funding_map" USING btree ("_parent_id");
  CREATE INDEX "blog_blocks_funding_map_path_idx" ON "blog_blocks_funding_map" USING btree ("_path");
  CREATE UNIQUE INDEX "blog_blocks_funding_map_locales_locale_parent_id_unique" ON "blog_blocks_funding_map_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_blog_v_blocks_funding_map_items_subitems_order_idx" ON "_blog_v_blocks_funding_map_items_subitems" USING btree ("_order");
  CREATE INDEX "_blog_v_blocks_funding_map_items_subitems_parent_id_idx" ON "_blog_v_blocks_funding_map_items_subitems" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_blog_v_blocks_funding_map_items_subitems_locales_locale_par" ON "_blog_v_blocks_funding_map_items_subitems_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_blog_v_blocks_funding_map_items_order_idx" ON "_blog_v_blocks_funding_map_items" USING btree ("_order");
  CREATE INDEX "_blog_v_blocks_funding_map_items_parent_id_idx" ON "_blog_v_blocks_funding_map_items" USING btree ("_parent_id");
  CREATE INDEX "_blog_v_blocks_funding_map_order_idx" ON "_blog_v_blocks_funding_map" USING btree ("_order");
  CREATE INDEX "_blog_v_blocks_funding_map_parent_id_idx" ON "_blog_v_blocks_funding_map" USING btree ("_parent_id");
  CREATE INDEX "_blog_v_blocks_funding_map_path_idx" ON "_blog_v_blocks_funding_map" USING btree ("_path");
  CREATE UNIQUE INDEX "_blog_v_blocks_funding_map_locales_locale_parent_id_unique" ON "_blog_v_blocks_funding_map_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "reports_blocks_funding_map_items_subitems_order_idx" ON "reports_blocks_funding_map_items_subitems" USING btree ("_order");
  CREATE INDEX "reports_blocks_funding_map_items_subitems_parent_id_idx" ON "reports_blocks_funding_map_items_subitems" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "reports_blocks_funding_map_items_subitems_locales_locale_par" ON "reports_blocks_funding_map_items_subitems_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "reports_blocks_funding_map_items_order_idx" ON "reports_blocks_funding_map_items" USING btree ("_order");
  CREATE INDEX "reports_blocks_funding_map_items_parent_id_idx" ON "reports_blocks_funding_map_items" USING btree ("_parent_id");
  CREATE INDEX "reports_blocks_funding_map_order_idx" ON "reports_blocks_funding_map" USING btree ("_order");
  CREATE INDEX "reports_blocks_funding_map_parent_id_idx" ON "reports_blocks_funding_map" USING btree ("_parent_id");
  CREATE INDEX "reports_blocks_funding_map_path_idx" ON "reports_blocks_funding_map" USING btree ("_path");
  CREATE UNIQUE INDEX "reports_blocks_funding_map_locales_locale_parent_id_unique" ON "reports_blocks_funding_map_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_reports_v_blocks_funding_map_items_subitems_order_idx" ON "_reports_v_blocks_funding_map_items_subitems" USING btree ("_order");
  CREATE INDEX "_reports_v_blocks_funding_map_items_subitems_parent_id_idx" ON "_reports_v_blocks_funding_map_items_subitems" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_reports_v_blocks_funding_map_items_subitems_locales_locale_" ON "_reports_v_blocks_funding_map_items_subitems_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_reports_v_blocks_funding_map_items_order_idx" ON "_reports_v_blocks_funding_map_items" USING btree ("_order");
  CREATE INDEX "_reports_v_blocks_funding_map_items_parent_id_idx" ON "_reports_v_blocks_funding_map_items" USING btree ("_parent_id");
  CREATE INDEX "_reports_v_blocks_funding_map_order_idx" ON "_reports_v_blocks_funding_map" USING btree ("_order");
  CREATE INDEX "_reports_v_blocks_funding_map_parent_id_idx" ON "_reports_v_blocks_funding_map" USING btree ("_parent_id");
  CREATE INDEX "_reports_v_blocks_funding_map_path_idx" ON "_reports_v_blocks_funding_map" USING btree ("_path");
  CREATE UNIQUE INDEX "_reports_v_blocks_funding_map_locales_locale_parent_id_uniqu" ON "_reports_v_blocks_funding_map_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "mmedia_blocks_funding_map_items_subitems_order_idx" ON "mmedia_blocks_funding_map_items_subitems" USING btree ("_order");
  CREATE INDEX "mmedia_blocks_funding_map_items_subitems_parent_id_idx" ON "mmedia_blocks_funding_map_items_subitems" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "mmedia_blocks_funding_map_items_subitems_locales_locale_pare" ON "mmedia_blocks_funding_map_items_subitems_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "mmedia_blocks_funding_map_items_order_idx" ON "mmedia_blocks_funding_map_items" USING btree ("_order");
  CREATE INDEX "mmedia_blocks_funding_map_items_parent_id_idx" ON "mmedia_blocks_funding_map_items" USING btree ("_parent_id");
  CREATE INDEX "mmedia_blocks_funding_map_order_idx" ON "mmedia_blocks_funding_map" USING btree ("_order");
  CREATE INDEX "mmedia_blocks_funding_map_parent_id_idx" ON "mmedia_blocks_funding_map" USING btree ("_parent_id");
  CREATE INDEX "mmedia_blocks_funding_map_path_idx" ON "mmedia_blocks_funding_map" USING btree ("_path");
  CREATE UNIQUE INDEX "mmedia_blocks_funding_map_locales_locale_parent_id_unique" ON "mmedia_blocks_funding_map_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_mmedia_v_blocks_funding_map_items_subitems_order_idx" ON "_mmedia_v_blocks_funding_map_items_subitems" USING btree ("_order");
  CREATE INDEX "_mmedia_v_blocks_funding_map_items_subitems_parent_id_idx" ON "_mmedia_v_blocks_funding_map_items_subitems" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_mmedia_v_blocks_funding_map_items_subitems_locales_locale_p" ON "_mmedia_v_blocks_funding_map_items_subitems_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_mmedia_v_blocks_funding_map_items_order_idx" ON "_mmedia_v_blocks_funding_map_items" USING btree ("_order");
  CREATE INDEX "_mmedia_v_blocks_funding_map_items_parent_id_idx" ON "_mmedia_v_blocks_funding_map_items" USING btree ("_parent_id");
  CREATE INDEX "_mmedia_v_blocks_funding_map_order_idx" ON "_mmedia_v_blocks_funding_map" USING btree ("_order");
  CREATE INDEX "_mmedia_v_blocks_funding_map_parent_id_idx" ON "_mmedia_v_blocks_funding_map" USING btree ("_parent_id");
  CREATE INDEX "_mmedia_v_blocks_funding_map_path_idx" ON "_mmedia_v_blocks_funding_map" USING btree ("_path");
  CREATE UNIQUE INDEX "_mmedia_v_blocks_funding_map_locales_locale_parent_id_unique" ON "_mmedia_v_blocks_funding_map_locales" USING btree ("_locale","_parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "grants_blocks_funding_map_items_subitems" CASCADE;
  DROP TABLE "grants_blocks_funding_map_items_subitems_locales" CASCADE;
  DROP TABLE "grants_blocks_funding_map_items" CASCADE;
  DROP TABLE "grants_blocks_funding_map" CASCADE;
  DROP TABLE "grants_blocks_funding_map_locales" CASCADE;
  DROP TABLE "_grants_v_blocks_funding_map_items_subitems" CASCADE;
  DROP TABLE "_grants_v_blocks_funding_map_items_subitems_locales" CASCADE;
  DROP TABLE "_grants_v_blocks_funding_map_items" CASCADE;
  DROP TABLE "_grants_v_blocks_funding_map" CASCADE;
  DROP TABLE "_grants_v_blocks_funding_map_locales" CASCADE;
  DROP TABLE "pages_blocks_funding_map_items_subitems" CASCADE;
  DROP TABLE "pages_blocks_funding_map_items_subitems_locales" CASCADE;
  DROP TABLE "pages_blocks_funding_map_items" CASCADE;
  DROP TABLE "pages_blocks_funding_map" CASCADE;
  DROP TABLE "pages_blocks_funding_map_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_funding_map_items_subitems" CASCADE;
  DROP TABLE "_pages_v_blocks_funding_map_items_subitems_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_funding_map_items" CASCADE;
  DROP TABLE "_pages_v_blocks_funding_map" CASCADE;
  DROP TABLE "_pages_v_blocks_funding_map_locales" CASCADE;
  DROP TABLE "blog_blocks_funding_map_items_subitems" CASCADE;
  DROP TABLE "blog_blocks_funding_map_items_subitems_locales" CASCADE;
  DROP TABLE "blog_blocks_funding_map_items" CASCADE;
  DROP TABLE "blog_blocks_funding_map" CASCADE;
  DROP TABLE "blog_blocks_funding_map_locales" CASCADE;
  DROP TABLE "_blog_v_blocks_funding_map_items_subitems" CASCADE;
  DROP TABLE "_blog_v_blocks_funding_map_items_subitems_locales" CASCADE;
  DROP TABLE "_blog_v_blocks_funding_map_items" CASCADE;
  DROP TABLE "_blog_v_blocks_funding_map" CASCADE;
  DROP TABLE "_blog_v_blocks_funding_map_locales" CASCADE;
  DROP TABLE "reports_blocks_funding_map_items_subitems" CASCADE;
  DROP TABLE "reports_blocks_funding_map_items_subitems_locales" CASCADE;
  DROP TABLE "reports_blocks_funding_map_items" CASCADE;
  DROP TABLE "reports_blocks_funding_map" CASCADE;
  DROP TABLE "reports_blocks_funding_map_locales" CASCADE;
  DROP TABLE "_reports_v_blocks_funding_map_items_subitems" CASCADE;
  DROP TABLE "_reports_v_blocks_funding_map_items_subitems_locales" CASCADE;
  DROP TABLE "_reports_v_blocks_funding_map_items" CASCADE;
  DROP TABLE "_reports_v_blocks_funding_map" CASCADE;
  DROP TABLE "_reports_v_blocks_funding_map_locales" CASCADE;
  DROP TABLE "mmedia_blocks_funding_map_items_subitems" CASCADE;
  DROP TABLE "mmedia_blocks_funding_map_items_subitems_locales" CASCADE;
  DROP TABLE "mmedia_blocks_funding_map_items" CASCADE;
  DROP TABLE "mmedia_blocks_funding_map" CASCADE;
  DROP TABLE "mmedia_blocks_funding_map_locales" CASCADE;
  DROP TABLE "_mmedia_v_blocks_funding_map_items_subitems" CASCADE;
  DROP TABLE "_mmedia_v_blocks_funding_map_items_subitems_locales" CASCADE;
  DROP TABLE "_mmedia_v_blocks_funding_map_items" CASCADE;
  DROP TABLE "_mmedia_v_blocks_funding_map" CASCADE;
  DROP TABLE "_mmedia_v_blocks_funding_map_locales" CASCADE;
  DROP TYPE "public"."enum_grants_blocks_funding_map_items_region_name";
  DROP TYPE "public"."enum__grants_v_blocks_funding_map_items_region_name";
  DROP TYPE "public"."enum_pages_blocks_funding_map_items_region_name";
  DROP TYPE "public"."enum__pages_v_blocks_funding_map_items_region_name";
  DROP TYPE "public"."enum_blog_blocks_funding_map_items_region_name";
  DROP TYPE "public"."enum__blog_v_blocks_funding_map_items_region_name";
  DROP TYPE "public"."enum_reports_blocks_funding_map_items_region_name";
  DROP TYPE "public"."enum__reports_v_blocks_funding_map_items_region_name";
  DROP TYPE "public"."enum_mmedia_blocks_funding_map_items_region_name";
  DROP TYPE "public"."enum__mmedia_v_blocks_funding_map_items_region_name";`)
}
