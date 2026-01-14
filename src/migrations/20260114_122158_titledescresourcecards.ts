import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_grants_blocks_resource_feat_card_align" AS ENUM('left', 'center');
  CREATE TYPE "public"."enum__grants_v_blocks_resource_feat_card_align" AS ENUM('left', 'center');
  CREATE TYPE "public"."enum_pages_blocks_resource_feat_card_align" AS ENUM('left', 'center');
  CREATE TYPE "public"."enum_pages_blocks_resource_gallery_align" AS ENUM('left', 'center');
  CREATE TYPE "public"."enum__pages_v_blocks_resource_feat_card_align" AS ENUM('left', 'center');
  CREATE TYPE "public"."enum__pages_v_blocks_resource_gallery_align" AS ENUM('left', 'center');
  CREATE TYPE "public"."enum_blog_blocks_resource_feat_card_align" AS ENUM('left', 'center');
  CREATE TYPE "public"."enum_blog_blocks_resource_gallery_align" AS ENUM('left', 'center');
  CREATE TYPE "public"."enum__blog_v_blocks_resource_feat_card_align" AS ENUM('left', 'center');
  CREATE TYPE "public"."enum__blog_v_blocks_resource_gallery_align" AS ENUM('left', 'center');
  CREATE TYPE "public"."enum_reports_blocks_resource_feat_card_align" AS ENUM('left', 'center');
  CREATE TYPE "public"."enum_reports_blocks_resource_gallery_align" AS ENUM('left', 'center');
  CREATE TYPE "public"."enum__reports_v_blocks_resource_feat_card_align" AS ENUM('left', 'center');
  CREATE TYPE "public"."enum__reports_v_blocks_resource_gallery_align" AS ENUM('left', 'center');
  CREATE TYPE "public"."enum_mmedia_blocks_resource_feat_card_align" AS ENUM('left', 'center');
  CREATE TYPE "public"."enum_mmedia_blocks_resource_gallery_align" AS ENUM('left', 'center');
  CREATE TYPE "public"."enum__mmedia_v_blocks_resource_feat_card_align" AS ENUM('left', 'center');
  CREATE TYPE "public"."enum__mmedia_v_blocks_resource_gallery_align" AS ENUM('left', 'center');
  CREATE TYPE "public"."enum_homepage_blocks_resource_feat_card_align" AS ENUM('left', 'center');
  CREATE TYPE "public"."enum_homepage_blocks_resource_gallery_align" AS ENUM('left', 'center');
  CREATE TYPE "public"."enum__homepage_v_blocks_resource_feat_card_align" AS ENUM('left', 'center');
  CREATE TYPE "public"."enum__homepage_v_blocks_resource_gallery_align" AS ENUM('left', 'center');
  CREATE TABLE "grants_blocks_resource_feat_card_locales" (
  	"title" varchar,
  	"desc" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "_grants_v_blocks_resource_feat_card_locales" (
  	"title" varchar,
  	"desc" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "pages_blocks_resource_feat_card_locales" (
  	"title" varchar,
  	"desc" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_resource_gallery_locales" (
  	"title" varchar,
  	"desc" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_resource_feat_card_locales" (
  	"title" varchar,
  	"desc" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_resource_gallery_locales" (
  	"title" varchar,
  	"desc" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "blog_blocks_resource_feat_card_locales" (
  	"title" varchar,
  	"desc" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "blog_blocks_resource_gallery_locales" (
  	"title" varchar,
  	"desc" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "_blog_v_blocks_resource_feat_card_locales" (
  	"title" varchar,
  	"desc" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_blog_v_blocks_resource_gallery_locales" (
  	"title" varchar,
  	"desc" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "reports_blocks_resource_feat_card_locales" (
  	"title" varchar,
  	"desc" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "reports_blocks_resource_gallery_locales" (
  	"title" varchar,
  	"desc" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "_reports_v_blocks_resource_feat_card_locales" (
  	"title" varchar,
  	"desc" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_reports_v_blocks_resource_gallery_locales" (
  	"title" varchar,
  	"desc" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "mmedia_blocks_resource_feat_card_locales" (
  	"title" varchar,
  	"desc" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "mmedia_blocks_resource_gallery_locales" (
  	"title" varchar,
  	"desc" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "_mmedia_v_blocks_resource_feat_card_locales" (
  	"title" varchar,
  	"desc" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_mmedia_v_blocks_resource_gallery_locales" (
  	"title" varchar,
  	"desc" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "homepage_blocks_resource_feat_card_locales" (
  	"title" varchar,
  	"desc" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "homepage_blocks_resource_gallery_locales" (
  	"title" varchar,
  	"desc" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "_homepage_v_blocks_resource_feat_card_locales" (
  	"title" varchar,
  	"desc" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_homepage_v_blocks_resource_gallery_locales" (
  	"title" varchar,
  	"desc" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  ALTER TABLE "grants_blocks_resource_feat_card" ADD COLUMN "align" "enum_grants_blocks_resource_feat_card_align" DEFAULT 'center';
  ALTER TABLE "_grants_v_blocks_resource_feat_card" ADD COLUMN "align" "enum__grants_v_blocks_resource_feat_card_align" DEFAULT 'center';
  ALTER TABLE "pages_blocks_resource_feat_card" ADD COLUMN "align" "enum_pages_blocks_resource_feat_card_align" DEFAULT 'center';
  ALTER TABLE "pages_blocks_resource_gallery" ADD COLUMN "align" "enum_pages_blocks_resource_gallery_align" DEFAULT 'center';
  ALTER TABLE "_pages_v_blocks_resource_feat_card" ADD COLUMN "align" "enum__pages_v_blocks_resource_feat_card_align" DEFAULT 'center';
  ALTER TABLE "_pages_v_blocks_resource_gallery" ADD COLUMN "align" "enum__pages_v_blocks_resource_gallery_align" DEFAULT 'center';
  ALTER TABLE "blog_blocks_resource_feat_card" ADD COLUMN "align" "enum_blog_blocks_resource_feat_card_align" DEFAULT 'center';
  ALTER TABLE "blog_blocks_resource_gallery" ADD COLUMN "align" "enum_blog_blocks_resource_gallery_align" DEFAULT 'center';
  ALTER TABLE "_blog_v_blocks_resource_feat_card" ADD COLUMN "align" "enum__blog_v_blocks_resource_feat_card_align" DEFAULT 'center';
  ALTER TABLE "_blog_v_blocks_resource_gallery" ADD COLUMN "align" "enum__blog_v_blocks_resource_gallery_align" DEFAULT 'center';
  ALTER TABLE "reports_blocks_resource_feat_card" ADD COLUMN "align" "enum_reports_blocks_resource_feat_card_align" DEFAULT 'center';
  ALTER TABLE "reports_blocks_resource_gallery" ADD COLUMN "align" "enum_reports_blocks_resource_gallery_align" DEFAULT 'center';
  ALTER TABLE "_reports_v_blocks_resource_feat_card" ADD COLUMN "align" "enum__reports_v_blocks_resource_feat_card_align" DEFAULT 'center';
  ALTER TABLE "_reports_v_blocks_resource_gallery" ADD COLUMN "align" "enum__reports_v_blocks_resource_gallery_align" DEFAULT 'center';
  ALTER TABLE "mmedia_blocks_resource_feat_card" ADD COLUMN "align" "enum_mmedia_blocks_resource_feat_card_align" DEFAULT 'center';
  ALTER TABLE "mmedia_blocks_resource_gallery" ADD COLUMN "align" "enum_mmedia_blocks_resource_gallery_align" DEFAULT 'center';
  ALTER TABLE "_mmedia_v_blocks_resource_feat_card" ADD COLUMN "align" "enum__mmedia_v_blocks_resource_feat_card_align" DEFAULT 'center';
  ALTER TABLE "_mmedia_v_blocks_resource_gallery" ADD COLUMN "align" "enum__mmedia_v_blocks_resource_gallery_align" DEFAULT 'center';
  ALTER TABLE "homepage_blocks_resource_feat_card" ADD COLUMN "align" "enum_homepage_blocks_resource_feat_card_align" DEFAULT 'center';
  ALTER TABLE "homepage_blocks_resource_gallery" ADD COLUMN "align" "enum_homepage_blocks_resource_gallery_align" DEFAULT 'center';
  ALTER TABLE "_homepage_v_blocks_resource_feat_card" ADD COLUMN "align" "enum__homepage_v_blocks_resource_feat_card_align" DEFAULT 'center';
  ALTER TABLE "_homepage_v_blocks_resource_gallery" ADD COLUMN "align" "enum__homepage_v_blocks_resource_gallery_align" DEFAULT 'center';
  ALTER TABLE "grants_blocks_resource_feat_card_locales" ADD CONSTRAINT "grants_blocks_resource_feat_card_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."grants_blocks_resource_feat_card"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_grants_v_blocks_resource_feat_card_locales" ADD CONSTRAINT "_grants_v_blocks_resource_feat_card_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_grants_v_blocks_resource_feat_card"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_resource_feat_card_locales" ADD CONSTRAINT "pages_blocks_resource_feat_card_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_resource_feat_card"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_resource_gallery_locales" ADD CONSTRAINT "pages_blocks_resource_gallery_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_resource_gallery"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_resource_feat_card_locales" ADD CONSTRAINT "_pages_v_blocks_resource_feat_card_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_resource_feat_card"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_resource_gallery_locales" ADD CONSTRAINT "_pages_v_blocks_resource_gallery_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_resource_gallery"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "blog_blocks_resource_feat_card_locales" ADD CONSTRAINT "blog_blocks_resource_feat_card_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."blog_blocks_resource_feat_card"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "blog_blocks_resource_gallery_locales" ADD CONSTRAINT "blog_blocks_resource_gallery_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."blog_blocks_resource_gallery"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_blog_v_blocks_resource_feat_card_locales" ADD CONSTRAINT "_blog_v_blocks_resource_feat_card_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_blog_v_blocks_resource_feat_card"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_blog_v_blocks_resource_gallery_locales" ADD CONSTRAINT "_blog_v_blocks_resource_gallery_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_blog_v_blocks_resource_gallery"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "reports_blocks_resource_feat_card_locales" ADD CONSTRAINT "reports_blocks_resource_feat_card_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."reports_blocks_resource_feat_card"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "reports_blocks_resource_gallery_locales" ADD CONSTRAINT "reports_blocks_resource_gallery_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."reports_blocks_resource_gallery"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_reports_v_blocks_resource_feat_card_locales" ADD CONSTRAINT "_reports_v_blocks_resource_feat_card_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_reports_v_blocks_resource_feat_card"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_reports_v_blocks_resource_gallery_locales" ADD CONSTRAINT "_reports_v_blocks_resource_gallery_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_reports_v_blocks_resource_gallery"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "mmedia_blocks_resource_feat_card_locales" ADD CONSTRAINT "mmedia_blocks_resource_feat_card_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."mmedia_blocks_resource_feat_card"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "mmedia_blocks_resource_gallery_locales" ADD CONSTRAINT "mmedia_blocks_resource_gallery_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."mmedia_blocks_resource_gallery"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_mmedia_v_blocks_resource_feat_card_locales" ADD CONSTRAINT "_mmedia_v_blocks_resource_feat_card_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_mmedia_v_blocks_resource_feat_card"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_mmedia_v_blocks_resource_gallery_locales" ADD CONSTRAINT "_mmedia_v_blocks_resource_gallery_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_mmedia_v_blocks_resource_gallery"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_blocks_resource_feat_card_locales" ADD CONSTRAINT "homepage_blocks_resource_feat_card_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage_blocks_resource_feat_card"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_blocks_resource_gallery_locales" ADD CONSTRAINT "homepage_blocks_resource_gallery_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage_blocks_resource_gallery"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_homepage_v_blocks_resource_feat_card_locales" ADD CONSTRAINT "_homepage_v_blocks_resource_feat_card_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_homepage_v_blocks_resource_feat_card"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_homepage_v_blocks_resource_gallery_locales" ADD CONSTRAINT "_homepage_v_blocks_resource_gallery_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_homepage_v_blocks_resource_gallery"("id") ON DELETE cascade ON UPDATE no action;
  CREATE UNIQUE INDEX "grants_blocks_resource_feat_card_locales_locale_parent_id_un" ON "grants_blocks_resource_feat_card_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "_grants_v_blocks_resource_feat_card_locales_locale_parent_id" ON "_grants_v_blocks_resource_feat_card_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_resource_feat_card_locales_locale_parent_id_uni" ON "pages_blocks_resource_feat_card_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_resource_gallery_locales_locale_parent_id_uniqu" ON "pages_blocks_resource_gallery_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_resource_feat_card_locales_locale_parent_id_" ON "_pages_v_blocks_resource_feat_card_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_resource_gallery_locales_locale_parent_id_un" ON "_pages_v_blocks_resource_gallery_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "blog_blocks_resource_feat_card_locales_locale_parent_id_uniq" ON "blog_blocks_resource_feat_card_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "blog_blocks_resource_gallery_locales_locale_parent_id_unique" ON "blog_blocks_resource_gallery_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "_blog_v_blocks_resource_feat_card_locales_locale_parent_id_u" ON "_blog_v_blocks_resource_feat_card_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "_blog_v_blocks_resource_gallery_locales_locale_parent_id_uni" ON "_blog_v_blocks_resource_gallery_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "reports_blocks_resource_feat_card_locales_locale_parent_id_u" ON "reports_blocks_resource_feat_card_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "reports_blocks_resource_gallery_locales_locale_parent_id_uni" ON "reports_blocks_resource_gallery_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "_reports_v_blocks_resource_feat_card_locales_locale_parent_i" ON "_reports_v_blocks_resource_feat_card_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "_reports_v_blocks_resource_gallery_locales_locale_parent_id_" ON "_reports_v_blocks_resource_gallery_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "mmedia_blocks_resource_feat_card_locales_locale_parent_id_un" ON "mmedia_blocks_resource_feat_card_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "mmedia_blocks_resource_gallery_locales_locale_parent_id_uniq" ON "mmedia_blocks_resource_gallery_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "_mmedia_v_blocks_resource_feat_card_locales_locale_parent_id" ON "_mmedia_v_blocks_resource_feat_card_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "_mmedia_v_blocks_resource_gallery_locales_locale_parent_id_u" ON "_mmedia_v_blocks_resource_gallery_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "homepage_blocks_resource_feat_card_locales_locale_parent_id_" ON "homepage_blocks_resource_feat_card_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "homepage_blocks_resource_gallery_locales_locale_parent_id_un" ON "homepage_blocks_resource_gallery_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "_homepage_v_blocks_resource_feat_card_locales_locale_parent_" ON "_homepage_v_blocks_resource_feat_card_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "_homepage_v_blocks_resource_gallery_locales_locale_parent_id" ON "_homepage_v_blocks_resource_gallery_locales" USING btree ("_locale","_parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "grants_blocks_resource_feat_card_locales" CASCADE;
  DROP TABLE "_grants_v_blocks_resource_feat_card_locales" CASCADE;
  DROP TABLE "pages_blocks_resource_feat_card_locales" CASCADE;
  DROP TABLE "pages_blocks_resource_gallery_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_resource_feat_card_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_resource_gallery_locales" CASCADE;
  DROP TABLE "blog_blocks_resource_feat_card_locales" CASCADE;
  DROP TABLE "blog_blocks_resource_gallery_locales" CASCADE;
  DROP TABLE "_blog_v_blocks_resource_feat_card_locales" CASCADE;
  DROP TABLE "_blog_v_blocks_resource_gallery_locales" CASCADE;
  DROP TABLE "reports_blocks_resource_feat_card_locales" CASCADE;
  DROP TABLE "reports_blocks_resource_gallery_locales" CASCADE;
  DROP TABLE "_reports_v_blocks_resource_feat_card_locales" CASCADE;
  DROP TABLE "_reports_v_blocks_resource_gallery_locales" CASCADE;
  DROP TABLE "mmedia_blocks_resource_feat_card_locales" CASCADE;
  DROP TABLE "mmedia_blocks_resource_gallery_locales" CASCADE;
  DROP TABLE "_mmedia_v_blocks_resource_feat_card_locales" CASCADE;
  DROP TABLE "_mmedia_v_blocks_resource_gallery_locales" CASCADE;
  DROP TABLE "homepage_blocks_resource_feat_card_locales" CASCADE;
  DROP TABLE "homepage_blocks_resource_gallery_locales" CASCADE;
  DROP TABLE "_homepage_v_blocks_resource_feat_card_locales" CASCADE;
  DROP TABLE "_homepage_v_blocks_resource_gallery_locales" CASCADE;
  ALTER TABLE "grants_blocks_resource_feat_card" DROP COLUMN "align";
  ALTER TABLE "_grants_v_blocks_resource_feat_card" DROP COLUMN "align";
  ALTER TABLE "pages_blocks_resource_feat_card" DROP COLUMN "align";
  ALTER TABLE "pages_blocks_resource_gallery" DROP COLUMN "align";
  ALTER TABLE "_pages_v_blocks_resource_feat_card" DROP COLUMN "align";
  ALTER TABLE "_pages_v_blocks_resource_gallery" DROP COLUMN "align";
  ALTER TABLE "blog_blocks_resource_feat_card" DROP COLUMN "align";
  ALTER TABLE "blog_blocks_resource_gallery" DROP COLUMN "align";
  ALTER TABLE "_blog_v_blocks_resource_feat_card" DROP COLUMN "align";
  ALTER TABLE "_blog_v_blocks_resource_gallery" DROP COLUMN "align";
  ALTER TABLE "reports_blocks_resource_feat_card" DROP COLUMN "align";
  ALTER TABLE "reports_blocks_resource_gallery" DROP COLUMN "align";
  ALTER TABLE "_reports_v_blocks_resource_feat_card" DROP COLUMN "align";
  ALTER TABLE "_reports_v_blocks_resource_gallery" DROP COLUMN "align";
  ALTER TABLE "mmedia_blocks_resource_feat_card" DROP COLUMN "align";
  ALTER TABLE "mmedia_blocks_resource_gallery" DROP COLUMN "align";
  ALTER TABLE "_mmedia_v_blocks_resource_feat_card" DROP COLUMN "align";
  ALTER TABLE "_mmedia_v_blocks_resource_gallery" DROP COLUMN "align";
  ALTER TABLE "homepage_blocks_resource_feat_card" DROP COLUMN "align";
  ALTER TABLE "homepage_blocks_resource_gallery" DROP COLUMN "align";
  ALTER TABLE "_homepage_v_blocks_resource_feat_card" DROP COLUMN "align";
  ALTER TABLE "_homepage_v_blocks_resource_gallery" DROP COLUMN "align";
  DROP TYPE "public"."enum_grants_blocks_resource_feat_card_align";
  DROP TYPE "public"."enum__grants_v_blocks_resource_feat_card_align";
  DROP TYPE "public"."enum_pages_blocks_resource_feat_card_align";
  DROP TYPE "public"."enum_pages_blocks_resource_gallery_align";
  DROP TYPE "public"."enum__pages_v_blocks_resource_feat_card_align";
  DROP TYPE "public"."enum__pages_v_blocks_resource_gallery_align";
  DROP TYPE "public"."enum_blog_blocks_resource_feat_card_align";
  DROP TYPE "public"."enum_blog_blocks_resource_gallery_align";
  DROP TYPE "public"."enum__blog_v_blocks_resource_feat_card_align";
  DROP TYPE "public"."enum__blog_v_blocks_resource_gallery_align";
  DROP TYPE "public"."enum_reports_blocks_resource_feat_card_align";
  DROP TYPE "public"."enum_reports_blocks_resource_gallery_align";
  DROP TYPE "public"."enum__reports_v_blocks_resource_feat_card_align";
  DROP TYPE "public"."enum__reports_v_blocks_resource_gallery_align";
  DROP TYPE "public"."enum_mmedia_blocks_resource_feat_card_align";
  DROP TYPE "public"."enum_mmedia_blocks_resource_gallery_align";
  DROP TYPE "public"."enum__mmedia_v_blocks_resource_feat_card_align";
  DROP TYPE "public"."enum__mmedia_v_blocks_resource_gallery_align";
  DROP TYPE "public"."enum_homepage_blocks_resource_feat_card_align";
  DROP TYPE "public"."enum_homepage_blocks_resource_gallery_align";
  DROP TYPE "public"."enum__homepage_v_blocks_resource_feat_card_align";
  DROP TYPE "public"."enum__homepage_v_blocks_resource_gallery_align";`)
}
