import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_grants_hero_buttons_link_type" AS ENUM('reference', 'custom', 'email');
  CREATE TYPE "public"."enum__grants_v_version_hero_buttons_link_type" AS ENUM('reference', 'custom', 'email');
  CREATE TABLE "grants_hero_buttons" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_grants_hero_buttons_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_download_link" boolean,
  	"link_pill_solid" boolean,
  	"link_pill_outline" boolean,
  	"link_url" varchar,
  	"link_email" varchar
  );
  
  CREATE TABLE "grants_hero_buttons_locales" (
  	"link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "_grants_v_version_hero_buttons" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"link_type" "enum__grants_v_version_hero_buttons_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_download_link" boolean,
  	"link_pill_solid" boolean,
  	"link_pill_outline" boolean,
  	"link_url" varchar,
  	"link_email" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_grants_v_version_hero_buttons_locales" (
  	"link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  ALTER TABLE "grants_buttons" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "grants_buttons_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_grants_v_version_buttons" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_grants_v_version_buttons_locales" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "grants_buttons" CASCADE;
  DROP TABLE "grants_buttons_locales" CASCADE;
  DROP TABLE "_grants_v_version_buttons" CASCADE;
  DROP TABLE "_grants_v_version_buttons_locales" CASCADE;
  ALTER TABLE "grants" ALTER COLUMN "bg_type" SET DATA TYPE text;
  DROP TYPE "public"."enum_grants_bg_type";
  CREATE TYPE "public"."enum_grants_bg_type" AS ENUM('wavy_top', 'wavy_full', 'center_blob');
  ALTER TABLE "grants" ALTER COLUMN "bg_type" SET DATA TYPE "public"."enum_grants_bg_type" USING "bg_type"::"public"."enum_grants_bg_type";
  ALTER TABLE "_grants_v" ALTER COLUMN "version_bg_type" SET DATA TYPE text;
  DROP TYPE "public"."enum__grants_v_version_bg_type";
  CREATE TYPE "public"."enum__grants_v_version_bg_type" AS ENUM('wavy_top', 'wavy_full', 'center_blob');
  ALTER TABLE "_grants_v" ALTER COLUMN "version_bg_type" SET DATA TYPE "public"."enum__grants_v_version_bg_type" USING "version_bg_type"::"public"."enum__grants_v_version_bg_type";
  ALTER TABLE "grants_rels" ADD COLUMN "grantcards_id" integer;
  ALTER TABLE "_grants_v_rels" ADD COLUMN "grantcards_id" integer;
  ALTER TABLE "homepage_rels" ADD COLUMN "grantcards_id" integer;
  ALTER TABLE "_homepage_v_rels" ADD COLUMN "grantcards_id" integer;
  ALTER TABLE "grants_hero_buttons" ADD CONSTRAINT "grants_hero_buttons_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."grants"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "grants_hero_buttons_locales" ADD CONSTRAINT "grants_hero_buttons_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."grants_hero_buttons"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_grants_v_version_hero_buttons" ADD CONSTRAINT "_grants_v_version_hero_buttons_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_grants_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_grants_v_version_hero_buttons_locales" ADD CONSTRAINT "_grants_v_version_hero_buttons_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_grants_v_version_hero_buttons"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "grants_hero_buttons_order_idx" ON "grants_hero_buttons" USING btree ("_order");
  CREATE INDEX "grants_hero_buttons_parent_id_idx" ON "grants_hero_buttons" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "grants_hero_buttons_locales_locale_parent_id_unique" ON "grants_hero_buttons_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_grants_v_version_hero_buttons_order_idx" ON "_grants_v_version_hero_buttons" USING btree ("_order");
  CREATE INDEX "_grants_v_version_hero_buttons_parent_id_idx" ON "_grants_v_version_hero_buttons" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_grants_v_version_hero_buttons_locales_locale_parent_id_unique" ON "_grants_v_version_hero_buttons_locales" USING btree ("_locale","_parent_id");
  ALTER TABLE "grants_rels" ADD CONSTRAINT "grants_rels_grantcards_fk" FOREIGN KEY ("grantcards_id") REFERENCES "public"."grantcards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_grants_v_rels" ADD CONSTRAINT "_grants_v_rels_grantcards_fk" FOREIGN KEY ("grantcards_id") REFERENCES "public"."grantcards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_rels" ADD CONSTRAINT "homepage_rels_grantcards_fk" FOREIGN KEY ("grantcards_id") REFERENCES "public"."grantcards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_homepage_v_rels" ADD CONSTRAINT "_homepage_v_rels_grantcards_fk" FOREIGN KEY ("grantcards_id") REFERENCES "public"."grantcards"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "grants_rels_grantcards_id_idx" ON "grants_rels" USING btree ("grantcards_id");
  CREATE INDEX "_grants_v_rels_grantcards_id_idx" ON "_grants_v_rels" USING btree ("grantcards_id");
  CREATE INDEX "homepage_rels_grantcards_id_idx" ON "homepage_rels" USING btree ("grantcards_id");
  CREATE INDEX "_homepage_v_rels_grantcards_id_idx" ON "_homepage_v_rels" USING btree ("grantcards_id");
  ALTER TABLE "grantcards" DROP COLUMN "show_home";
  ALTER TABLE "grantcards" DROP COLUMN "order";
  ALTER TABLE "_grantcards_v" DROP COLUMN "version_show_home";
  ALTER TABLE "_grantcards_v" DROP COLUMN "version_order";
  DROP TYPE "public"."enum_grants_buttons_link_type";
  DROP TYPE "public"."enum__grants_v_version_buttons_link_type";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_grants_buttons_link_type" AS ENUM('reference', 'custom', 'email');
  CREATE TYPE "public"."enum__grants_v_version_buttons_link_type" AS ENUM('reference', 'custom', 'email');
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
  
  ALTER TABLE "grants_hero_buttons" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "grants_hero_buttons_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_grants_v_version_hero_buttons" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_grants_v_version_hero_buttons_locales" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "grants_hero_buttons" CASCADE;
  DROP TABLE "grants_hero_buttons_locales" CASCADE;
  DROP TABLE "_grants_v_version_hero_buttons" CASCADE;
  DROP TABLE "_grants_v_version_hero_buttons_locales" CASCADE;
  ALTER TABLE "grants_rels" DROP CONSTRAINT "grants_rels_grantcards_fk";
  
  ALTER TABLE "_grants_v_rels" DROP CONSTRAINT "_grants_v_rels_grantcards_fk";
  
  ALTER TABLE "homepage_rels" DROP CONSTRAINT "homepage_rels_grantcards_fk";
  
  ALTER TABLE "_homepage_v_rels" DROP CONSTRAINT "_homepage_v_rels_grantcards_fk";
  
  ALTER TABLE "grants" ALTER COLUMN "bg_type" SET DATA TYPE text;
  DROP TYPE "public"."enum_grants_bg_type";
  CREATE TYPE "public"."enum_grants_bg_type" AS ENUM('wavy_top', 'wavy_full', 'trans_wavy_top', 'blob');
  ALTER TABLE "grants" ALTER COLUMN "bg_type" SET DATA TYPE "public"."enum_grants_bg_type" USING "bg_type"::"public"."enum_grants_bg_type";
  ALTER TABLE "_grants_v" ALTER COLUMN "version_bg_type" SET DATA TYPE text;
  DROP TYPE "public"."enum__grants_v_version_bg_type";
  CREATE TYPE "public"."enum__grants_v_version_bg_type" AS ENUM('wavy_top', 'wavy_full', 'trans_wavy_top', 'blob');
  ALTER TABLE "_grants_v" ALTER COLUMN "version_bg_type" SET DATA TYPE "public"."enum__grants_v_version_bg_type" USING "version_bg_type"::"public"."enum__grants_v_version_bg_type";
  DROP INDEX "grants_rels_grantcards_id_idx";
  DROP INDEX "_grants_v_rels_grantcards_id_idx";
  DROP INDEX "homepage_rels_grantcards_id_idx";
  DROP INDEX "_homepage_v_rels_grantcards_id_idx";
  ALTER TABLE "grantcards" ADD COLUMN "show_home" boolean DEFAULT true;
  ALTER TABLE "grantcards" ADD COLUMN "order" numeric;
  ALTER TABLE "_grantcards_v" ADD COLUMN "version_show_home" boolean DEFAULT true;
  ALTER TABLE "_grantcards_v" ADD COLUMN "version_order" numeric;
  ALTER TABLE "grants_buttons" ADD CONSTRAINT "grants_buttons_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."grants"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "grants_buttons_locales" ADD CONSTRAINT "grants_buttons_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."grants_buttons"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_grants_v_version_buttons" ADD CONSTRAINT "_grants_v_version_buttons_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_grants_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_grants_v_version_buttons_locales" ADD CONSTRAINT "_grants_v_version_buttons_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_grants_v_version_buttons"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "grants_buttons_order_idx" ON "grants_buttons" USING btree ("_order");
  CREATE INDEX "grants_buttons_parent_id_idx" ON "grants_buttons" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "grants_buttons_locales_locale_parent_id_unique" ON "grants_buttons_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_grants_v_version_buttons_order_idx" ON "_grants_v_version_buttons" USING btree ("_order");
  CREATE INDEX "_grants_v_version_buttons_parent_id_idx" ON "_grants_v_version_buttons" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_grants_v_version_buttons_locales_locale_parent_id_unique" ON "_grants_v_version_buttons_locales" USING btree ("_locale","_parent_id");
  ALTER TABLE "grants_rels" DROP COLUMN "grantcards_id";
  ALTER TABLE "_grants_v_rels" DROP COLUMN "grantcards_id";
  ALTER TABLE "homepage_rels" DROP COLUMN "grantcards_id";
  ALTER TABLE "_homepage_v_rels" DROP COLUMN "grantcards_id";
  DROP TYPE "public"."enum_grants_hero_buttons_link_type";
  DROP TYPE "public"."enum__grants_v_version_hero_buttons_link_type";`)
}
