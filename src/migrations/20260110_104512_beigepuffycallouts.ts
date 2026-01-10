import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_grants_blocks_beige_puffy_align" AS ENUM('center', 'left');
  CREATE TYPE "public"."enum__grants_v_blocks_beige_puffy_align" AS ENUM('center', 'left');
  CREATE TYPE "public"."enum_pages_blocks_beige_puffy_align" AS ENUM('center', 'left');
  CREATE TYPE "public"."enum__pages_v_blocks_beige_puffy_align" AS ENUM('center', 'left');
  CREATE TYPE "public"."enum_blog_blocks_beige_puffy_align" AS ENUM('center', 'left');
  CREATE TYPE "public"."enum__blog_v_blocks_beige_puffy_align" AS ENUM('center', 'left');
  CREATE TYPE "public"."enum_reports_blocks_beige_puffy_align" AS ENUM('center', 'left');
  CREATE TYPE "public"."enum__reports_v_blocks_beige_puffy_align" AS ENUM('center', 'left');
  CREATE TYPE "public"."enum_mmedia_blocks_beige_puffy_align" AS ENUM('center', 'left');
  CREATE TYPE "public"."enum__mmedia_v_blocks_beige_puffy_align" AS ENUM('center', 'left');
  CREATE TABLE "grants_blocks_beige_puffy_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "grants_blocks_beige_puffy_items_locales" (
  	"title" varchar,
  	"subtitle" varchar,
  	"description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "grants_blocks_beige_puffy" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"align" "enum_grants_blocks_beige_puffy_align" DEFAULT 'center',
  	"block_name" varchar
  );
  
  CREATE TABLE "grants_blocks_beige_puffy_locales" (
  	"title" varchar,
  	"subtitle" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "_grants_v_blocks_beige_puffy_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_grants_v_blocks_beige_puffy_items_locales" (
  	"title" varchar,
  	"subtitle" varchar,
  	"description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_grants_v_blocks_beige_puffy" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"align" "enum__grants_v_blocks_beige_puffy_align" DEFAULT 'center',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_grants_v_blocks_beige_puffy_locales" (
  	"title" varchar,
  	"subtitle" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "pages_blocks_beige_puffy_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "pages_blocks_beige_puffy_items_locales" (
  	"title" varchar,
  	"subtitle" varchar,
  	"description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_beige_puffy" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"align" "enum_pages_blocks_beige_puffy_align" DEFAULT 'center',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_beige_puffy_locales" (
  	"title" varchar,
  	"subtitle" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_beige_puffy_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_beige_puffy_items_locales" (
  	"title" varchar,
  	"subtitle" varchar,
  	"description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_beige_puffy" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"align" "enum__pages_v_blocks_beige_puffy_align" DEFAULT 'center',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_beige_puffy_locales" (
  	"title" varchar,
  	"subtitle" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "blog_blocks_beige_puffy_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "blog_blocks_beige_puffy_items_locales" (
  	"title" varchar,
  	"subtitle" varchar,
  	"description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "blog_blocks_beige_puffy" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"align" "enum_blog_blocks_beige_puffy_align" DEFAULT 'center',
  	"block_name" varchar
  );
  
  CREATE TABLE "blog_blocks_beige_puffy_locales" (
  	"title" varchar,
  	"subtitle" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "_blog_v_blocks_beige_puffy_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_blog_v_blocks_beige_puffy_items_locales" (
  	"title" varchar,
  	"subtitle" varchar,
  	"description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_blog_v_blocks_beige_puffy" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"align" "enum__blog_v_blocks_beige_puffy_align" DEFAULT 'center',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_blog_v_blocks_beige_puffy_locales" (
  	"title" varchar,
  	"subtitle" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "reports_blocks_beige_puffy_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "reports_blocks_beige_puffy_items_locales" (
  	"title" varchar,
  	"subtitle" varchar,
  	"description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "reports_blocks_beige_puffy" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"align" "enum_reports_blocks_beige_puffy_align" DEFAULT 'center',
  	"block_name" varchar
  );
  
  CREATE TABLE "reports_blocks_beige_puffy_locales" (
  	"title" varchar,
  	"subtitle" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "_reports_v_blocks_beige_puffy_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_reports_v_blocks_beige_puffy_items_locales" (
  	"title" varchar,
  	"subtitle" varchar,
  	"description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_reports_v_blocks_beige_puffy" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"align" "enum__reports_v_blocks_beige_puffy_align" DEFAULT 'center',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_reports_v_blocks_beige_puffy_locales" (
  	"title" varchar,
  	"subtitle" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "mmedia_blocks_beige_puffy_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "mmedia_blocks_beige_puffy_items_locales" (
  	"title" varchar,
  	"subtitle" varchar,
  	"description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "mmedia_blocks_beige_puffy" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"align" "enum_mmedia_blocks_beige_puffy_align" DEFAULT 'center',
  	"block_name" varchar
  );
  
  CREATE TABLE "mmedia_blocks_beige_puffy_locales" (
  	"title" varchar,
  	"subtitle" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "_mmedia_v_blocks_beige_puffy_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_mmedia_v_blocks_beige_puffy_items_locales" (
  	"title" varchar,
  	"subtitle" varchar,
  	"description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_mmedia_v_blocks_beige_puffy" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"align" "enum__mmedia_v_blocks_beige_puffy_align" DEFAULT 'center',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_mmedia_v_blocks_beige_puffy_locales" (
  	"title" varchar,
  	"subtitle" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  ALTER TABLE "grants_blocks_beige_puffy_items" ADD CONSTRAINT "grants_blocks_beige_puffy_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."grants_blocks_beige_puffy"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "grants_blocks_beige_puffy_items_locales" ADD CONSTRAINT "grants_blocks_beige_puffy_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."grants_blocks_beige_puffy_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "grants_blocks_beige_puffy" ADD CONSTRAINT "grants_blocks_beige_puffy_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."grants"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "grants_blocks_beige_puffy_locales" ADD CONSTRAINT "grants_blocks_beige_puffy_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."grants_blocks_beige_puffy"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_grants_v_blocks_beige_puffy_items" ADD CONSTRAINT "_grants_v_blocks_beige_puffy_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_grants_v_blocks_beige_puffy"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_grants_v_blocks_beige_puffy_items_locales" ADD CONSTRAINT "_grants_v_blocks_beige_puffy_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_grants_v_blocks_beige_puffy_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_grants_v_blocks_beige_puffy" ADD CONSTRAINT "_grants_v_blocks_beige_puffy_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_grants_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_grants_v_blocks_beige_puffy_locales" ADD CONSTRAINT "_grants_v_blocks_beige_puffy_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_grants_v_blocks_beige_puffy"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_beige_puffy_items" ADD CONSTRAINT "pages_blocks_beige_puffy_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_beige_puffy"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_beige_puffy_items_locales" ADD CONSTRAINT "pages_blocks_beige_puffy_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_beige_puffy_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_beige_puffy" ADD CONSTRAINT "pages_blocks_beige_puffy_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_beige_puffy_locales" ADD CONSTRAINT "pages_blocks_beige_puffy_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_beige_puffy"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_beige_puffy_items" ADD CONSTRAINT "_pages_v_blocks_beige_puffy_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_beige_puffy"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_beige_puffy_items_locales" ADD CONSTRAINT "_pages_v_blocks_beige_puffy_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_beige_puffy_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_beige_puffy" ADD CONSTRAINT "_pages_v_blocks_beige_puffy_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_beige_puffy_locales" ADD CONSTRAINT "_pages_v_blocks_beige_puffy_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_beige_puffy"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "blog_blocks_beige_puffy_items" ADD CONSTRAINT "blog_blocks_beige_puffy_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."blog_blocks_beige_puffy"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "blog_blocks_beige_puffy_items_locales" ADD CONSTRAINT "blog_blocks_beige_puffy_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."blog_blocks_beige_puffy_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "blog_blocks_beige_puffy" ADD CONSTRAINT "blog_blocks_beige_puffy_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."blog"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "blog_blocks_beige_puffy_locales" ADD CONSTRAINT "blog_blocks_beige_puffy_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."blog_blocks_beige_puffy"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_blog_v_blocks_beige_puffy_items" ADD CONSTRAINT "_blog_v_blocks_beige_puffy_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_blog_v_blocks_beige_puffy"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_blog_v_blocks_beige_puffy_items_locales" ADD CONSTRAINT "_blog_v_blocks_beige_puffy_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_blog_v_blocks_beige_puffy_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_blog_v_blocks_beige_puffy" ADD CONSTRAINT "_blog_v_blocks_beige_puffy_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_blog_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_blog_v_blocks_beige_puffy_locales" ADD CONSTRAINT "_blog_v_blocks_beige_puffy_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_blog_v_blocks_beige_puffy"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "reports_blocks_beige_puffy_items" ADD CONSTRAINT "reports_blocks_beige_puffy_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."reports_blocks_beige_puffy"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "reports_blocks_beige_puffy_items_locales" ADD CONSTRAINT "reports_blocks_beige_puffy_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."reports_blocks_beige_puffy_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "reports_blocks_beige_puffy" ADD CONSTRAINT "reports_blocks_beige_puffy_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."reports"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "reports_blocks_beige_puffy_locales" ADD CONSTRAINT "reports_blocks_beige_puffy_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."reports_blocks_beige_puffy"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_reports_v_blocks_beige_puffy_items" ADD CONSTRAINT "_reports_v_blocks_beige_puffy_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_reports_v_blocks_beige_puffy"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_reports_v_blocks_beige_puffy_items_locales" ADD CONSTRAINT "_reports_v_blocks_beige_puffy_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_reports_v_blocks_beige_puffy_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_reports_v_blocks_beige_puffy" ADD CONSTRAINT "_reports_v_blocks_beige_puffy_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_reports_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_reports_v_blocks_beige_puffy_locales" ADD CONSTRAINT "_reports_v_blocks_beige_puffy_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_reports_v_blocks_beige_puffy"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "mmedia_blocks_beige_puffy_items" ADD CONSTRAINT "mmedia_blocks_beige_puffy_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."mmedia_blocks_beige_puffy"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "mmedia_blocks_beige_puffy_items_locales" ADD CONSTRAINT "mmedia_blocks_beige_puffy_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."mmedia_blocks_beige_puffy_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "mmedia_blocks_beige_puffy" ADD CONSTRAINT "mmedia_blocks_beige_puffy_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."mmedia"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "mmedia_blocks_beige_puffy_locales" ADD CONSTRAINT "mmedia_blocks_beige_puffy_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."mmedia_blocks_beige_puffy"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_mmedia_v_blocks_beige_puffy_items" ADD CONSTRAINT "_mmedia_v_blocks_beige_puffy_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_mmedia_v_blocks_beige_puffy"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_mmedia_v_blocks_beige_puffy_items_locales" ADD CONSTRAINT "_mmedia_v_blocks_beige_puffy_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_mmedia_v_blocks_beige_puffy_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_mmedia_v_blocks_beige_puffy" ADD CONSTRAINT "_mmedia_v_blocks_beige_puffy_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_mmedia_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_mmedia_v_blocks_beige_puffy_locales" ADD CONSTRAINT "_mmedia_v_blocks_beige_puffy_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_mmedia_v_blocks_beige_puffy"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "grants_blocks_beige_puffy_items_order_idx" ON "grants_blocks_beige_puffy_items" USING btree ("_order");
  CREATE INDEX "grants_blocks_beige_puffy_items_parent_id_idx" ON "grants_blocks_beige_puffy_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "grants_blocks_beige_puffy_items_locales_locale_parent_id_uni" ON "grants_blocks_beige_puffy_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "grants_blocks_beige_puffy_order_idx" ON "grants_blocks_beige_puffy" USING btree ("_order");
  CREATE INDEX "grants_blocks_beige_puffy_parent_id_idx" ON "grants_blocks_beige_puffy" USING btree ("_parent_id");
  CREATE INDEX "grants_blocks_beige_puffy_path_idx" ON "grants_blocks_beige_puffy" USING btree ("_path");
  CREATE UNIQUE INDEX "grants_blocks_beige_puffy_locales_locale_parent_id_unique" ON "grants_blocks_beige_puffy_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_grants_v_blocks_beige_puffy_items_order_idx" ON "_grants_v_blocks_beige_puffy_items" USING btree ("_order");
  CREATE INDEX "_grants_v_blocks_beige_puffy_items_parent_id_idx" ON "_grants_v_blocks_beige_puffy_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_grants_v_blocks_beige_puffy_items_locales_locale_parent_id_" ON "_grants_v_blocks_beige_puffy_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_grants_v_blocks_beige_puffy_order_idx" ON "_grants_v_blocks_beige_puffy" USING btree ("_order");
  CREATE INDEX "_grants_v_blocks_beige_puffy_parent_id_idx" ON "_grants_v_blocks_beige_puffy" USING btree ("_parent_id");
  CREATE INDEX "_grants_v_blocks_beige_puffy_path_idx" ON "_grants_v_blocks_beige_puffy" USING btree ("_path");
  CREATE UNIQUE INDEX "_grants_v_blocks_beige_puffy_locales_locale_parent_id_unique" ON "_grants_v_blocks_beige_puffy_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_beige_puffy_items_order_idx" ON "pages_blocks_beige_puffy_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_beige_puffy_items_parent_id_idx" ON "pages_blocks_beige_puffy_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_beige_puffy_items_locales_locale_parent_id_uniq" ON "pages_blocks_beige_puffy_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_beige_puffy_order_idx" ON "pages_blocks_beige_puffy" USING btree ("_order");
  CREATE INDEX "pages_blocks_beige_puffy_parent_id_idx" ON "pages_blocks_beige_puffy" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_beige_puffy_path_idx" ON "pages_blocks_beige_puffy" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_blocks_beige_puffy_locales_locale_parent_id_unique" ON "pages_blocks_beige_puffy_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_beige_puffy_items_order_idx" ON "_pages_v_blocks_beige_puffy_items" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_beige_puffy_items_parent_id_idx" ON "_pages_v_blocks_beige_puffy_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_beige_puffy_items_locales_locale_parent_id_u" ON "_pages_v_blocks_beige_puffy_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_beige_puffy_order_idx" ON "_pages_v_blocks_beige_puffy" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_beige_puffy_parent_id_idx" ON "_pages_v_blocks_beige_puffy" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_beige_puffy_path_idx" ON "_pages_v_blocks_beige_puffy" USING btree ("_path");
  CREATE UNIQUE INDEX "_pages_v_blocks_beige_puffy_locales_locale_parent_id_unique" ON "_pages_v_blocks_beige_puffy_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "blog_blocks_beige_puffy_items_order_idx" ON "blog_blocks_beige_puffy_items" USING btree ("_order");
  CREATE INDEX "blog_blocks_beige_puffy_items_parent_id_idx" ON "blog_blocks_beige_puffy_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "blog_blocks_beige_puffy_items_locales_locale_parent_id_uniqu" ON "blog_blocks_beige_puffy_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "blog_blocks_beige_puffy_order_idx" ON "blog_blocks_beige_puffy" USING btree ("_order");
  CREATE INDEX "blog_blocks_beige_puffy_parent_id_idx" ON "blog_blocks_beige_puffy" USING btree ("_parent_id");
  CREATE INDEX "blog_blocks_beige_puffy_path_idx" ON "blog_blocks_beige_puffy" USING btree ("_path");
  CREATE UNIQUE INDEX "blog_blocks_beige_puffy_locales_locale_parent_id_unique" ON "blog_blocks_beige_puffy_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_blog_v_blocks_beige_puffy_items_order_idx" ON "_blog_v_blocks_beige_puffy_items" USING btree ("_order");
  CREATE INDEX "_blog_v_blocks_beige_puffy_items_parent_id_idx" ON "_blog_v_blocks_beige_puffy_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_blog_v_blocks_beige_puffy_items_locales_locale_parent_id_un" ON "_blog_v_blocks_beige_puffy_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_blog_v_blocks_beige_puffy_order_idx" ON "_blog_v_blocks_beige_puffy" USING btree ("_order");
  CREATE INDEX "_blog_v_blocks_beige_puffy_parent_id_idx" ON "_blog_v_blocks_beige_puffy" USING btree ("_parent_id");
  CREATE INDEX "_blog_v_blocks_beige_puffy_path_idx" ON "_blog_v_blocks_beige_puffy" USING btree ("_path");
  CREATE UNIQUE INDEX "_blog_v_blocks_beige_puffy_locales_locale_parent_id_unique" ON "_blog_v_blocks_beige_puffy_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "reports_blocks_beige_puffy_items_order_idx" ON "reports_blocks_beige_puffy_items" USING btree ("_order");
  CREATE INDEX "reports_blocks_beige_puffy_items_parent_id_idx" ON "reports_blocks_beige_puffy_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "reports_blocks_beige_puffy_items_locales_locale_parent_id_un" ON "reports_blocks_beige_puffy_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "reports_blocks_beige_puffy_order_idx" ON "reports_blocks_beige_puffy" USING btree ("_order");
  CREATE INDEX "reports_blocks_beige_puffy_parent_id_idx" ON "reports_blocks_beige_puffy" USING btree ("_parent_id");
  CREATE INDEX "reports_blocks_beige_puffy_path_idx" ON "reports_blocks_beige_puffy" USING btree ("_path");
  CREATE UNIQUE INDEX "reports_blocks_beige_puffy_locales_locale_parent_id_unique" ON "reports_blocks_beige_puffy_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_reports_v_blocks_beige_puffy_items_order_idx" ON "_reports_v_blocks_beige_puffy_items" USING btree ("_order");
  CREATE INDEX "_reports_v_blocks_beige_puffy_items_parent_id_idx" ON "_reports_v_blocks_beige_puffy_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_reports_v_blocks_beige_puffy_items_locales_locale_parent_id" ON "_reports_v_blocks_beige_puffy_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_reports_v_blocks_beige_puffy_order_idx" ON "_reports_v_blocks_beige_puffy" USING btree ("_order");
  CREATE INDEX "_reports_v_blocks_beige_puffy_parent_id_idx" ON "_reports_v_blocks_beige_puffy" USING btree ("_parent_id");
  CREATE INDEX "_reports_v_blocks_beige_puffy_path_idx" ON "_reports_v_blocks_beige_puffy" USING btree ("_path");
  CREATE UNIQUE INDEX "_reports_v_blocks_beige_puffy_locales_locale_parent_id_uniqu" ON "_reports_v_blocks_beige_puffy_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "mmedia_blocks_beige_puffy_items_order_idx" ON "mmedia_blocks_beige_puffy_items" USING btree ("_order");
  CREATE INDEX "mmedia_blocks_beige_puffy_items_parent_id_idx" ON "mmedia_blocks_beige_puffy_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "mmedia_blocks_beige_puffy_items_locales_locale_parent_id_uni" ON "mmedia_blocks_beige_puffy_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "mmedia_blocks_beige_puffy_order_idx" ON "mmedia_blocks_beige_puffy" USING btree ("_order");
  CREATE INDEX "mmedia_blocks_beige_puffy_parent_id_idx" ON "mmedia_blocks_beige_puffy" USING btree ("_parent_id");
  CREATE INDEX "mmedia_blocks_beige_puffy_path_idx" ON "mmedia_blocks_beige_puffy" USING btree ("_path");
  CREATE UNIQUE INDEX "mmedia_blocks_beige_puffy_locales_locale_parent_id_unique" ON "mmedia_blocks_beige_puffy_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_mmedia_v_blocks_beige_puffy_items_order_idx" ON "_mmedia_v_blocks_beige_puffy_items" USING btree ("_order");
  CREATE INDEX "_mmedia_v_blocks_beige_puffy_items_parent_id_idx" ON "_mmedia_v_blocks_beige_puffy_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_mmedia_v_blocks_beige_puffy_items_locales_locale_parent_id_" ON "_mmedia_v_blocks_beige_puffy_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_mmedia_v_blocks_beige_puffy_order_idx" ON "_mmedia_v_blocks_beige_puffy" USING btree ("_order");
  CREATE INDEX "_mmedia_v_blocks_beige_puffy_parent_id_idx" ON "_mmedia_v_blocks_beige_puffy" USING btree ("_parent_id");
  CREATE INDEX "_mmedia_v_blocks_beige_puffy_path_idx" ON "_mmedia_v_blocks_beige_puffy" USING btree ("_path");
  CREATE UNIQUE INDEX "_mmedia_v_blocks_beige_puffy_locales_locale_parent_id_unique" ON "_mmedia_v_blocks_beige_puffy_locales" USING btree ("_locale","_parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "grants_blocks_beige_puffy_items" CASCADE;
  DROP TABLE "grants_blocks_beige_puffy_items_locales" CASCADE;
  DROP TABLE "grants_blocks_beige_puffy" CASCADE;
  DROP TABLE "grants_blocks_beige_puffy_locales" CASCADE;
  DROP TABLE "_grants_v_blocks_beige_puffy_items" CASCADE;
  DROP TABLE "_grants_v_blocks_beige_puffy_items_locales" CASCADE;
  DROP TABLE "_grants_v_blocks_beige_puffy" CASCADE;
  DROP TABLE "_grants_v_blocks_beige_puffy_locales" CASCADE;
  DROP TABLE "pages_blocks_beige_puffy_items" CASCADE;
  DROP TABLE "pages_blocks_beige_puffy_items_locales" CASCADE;
  DROP TABLE "pages_blocks_beige_puffy" CASCADE;
  DROP TABLE "pages_blocks_beige_puffy_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_beige_puffy_items" CASCADE;
  DROP TABLE "_pages_v_blocks_beige_puffy_items_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_beige_puffy" CASCADE;
  DROP TABLE "_pages_v_blocks_beige_puffy_locales" CASCADE;
  DROP TABLE "blog_blocks_beige_puffy_items" CASCADE;
  DROP TABLE "blog_blocks_beige_puffy_items_locales" CASCADE;
  DROP TABLE "blog_blocks_beige_puffy" CASCADE;
  DROP TABLE "blog_blocks_beige_puffy_locales" CASCADE;
  DROP TABLE "_blog_v_blocks_beige_puffy_items" CASCADE;
  DROP TABLE "_blog_v_blocks_beige_puffy_items_locales" CASCADE;
  DROP TABLE "_blog_v_blocks_beige_puffy" CASCADE;
  DROP TABLE "_blog_v_blocks_beige_puffy_locales" CASCADE;
  DROP TABLE "reports_blocks_beige_puffy_items" CASCADE;
  DROP TABLE "reports_blocks_beige_puffy_items_locales" CASCADE;
  DROP TABLE "reports_blocks_beige_puffy" CASCADE;
  DROP TABLE "reports_blocks_beige_puffy_locales" CASCADE;
  DROP TABLE "_reports_v_blocks_beige_puffy_items" CASCADE;
  DROP TABLE "_reports_v_blocks_beige_puffy_items_locales" CASCADE;
  DROP TABLE "_reports_v_blocks_beige_puffy" CASCADE;
  DROP TABLE "_reports_v_blocks_beige_puffy_locales" CASCADE;
  DROP TABLE "mmedia_blocks_beige_puffy_items" CASCADE;
  DROP TABLE "mmedia_blocks_beige_puffy_items_locales" CASCADE;
  DROP TABLE "mmedia_blocks_beige_puffy" CASCADE;
  DROP TABLE "mmedia_blocks_beige_puffy_locales" CASCADE;
  DROP TABLE "_mmedia_v_blocks_beige_puffy_items" CASCADE;
  DROP TABLE "_mmedia_v_blocks_beige_puffy_items_locales" CASCADE;
  DROP TABLE "_mmedia_v_blocks_beige_puffy" CASCADE;
  DROP TABLE "_mmedia_v_blocks_beige_puffy_locales" CASCADE;
  DROP TYPE "public"."enum_grants_blocks_beige_puffy_align";
  DROP TYPE "public"."enum__grants_v_blocks_beige_puffy_align";
  DROP TYPE "public"."enum_pages_blocks_beige_puffy_align";
  DROP TYPE "public"."enum__pages_v_blocks_beige_puffy_align";
  DROP TYPE "public"."enum_blog_blocks_beige_puffy_align";
  DROP TYPE "public"."enum__blog_v_blocks_beige_puffy_align";
  DROP TYPE "public"."enum_reports_blocks_beige_puffy_align";
  DROP TYPE "public"."enum__reports_v_blocks_beige_puffy_align";
  DROP TYPE "public"."enum_mmedia_blocks_beige_puffy_align";
  DROP TYPE "public"."enum__mmedia_v_blocks_beige_puffy_align";`)
}
