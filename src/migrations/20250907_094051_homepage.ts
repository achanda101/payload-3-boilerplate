import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_homepage_hero_section_cta_button_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__homepage_v_version_hero_section_cta_button_link_type" AS ENUM('reference', 'custom');
  CREATE TABLE "homepage_hero_section_cta_button" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_homepage_hero_section_cta_button_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar
  );
  
  CREATE TABLE "homepage_hero_section_cta_button_locales" (
  	"link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "_homepage_v_version_hero_section_cta_button" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"link_type" "enum__homepage_v_version_hero_section_cta_button_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_homepage_v_version_hero_section_cta_button_locales" (
  	"link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  ALTER TABLE "homepage_locales" ADD COLUMN "hero_section_hero_title" varchar;
  ALTER TABLE "homepage_locales" ADD COLUMN "hero_section_hero_subtitle" varchar;
  ALTER TABLE "_homepage_v_locales" ADD COLUMN "version_hero_section_hero_title" varchar;
  ALTER TABLE "_homepage_v_locales" ADD COLUMN "version_hero_section_hero_subtitle" varchar;
  ALTER TABLE "homepage_hero_section_cta_button" ADD CONSTRAINT "homepage_hero_section_cta_button_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_hero_section_cta_button_locales" ADD CONSTRAINT "homepage_hero_section_cta_button_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage_hero_section_cta_button"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_homepage_v_version_hero_section_cta_button" ADD CONSTRAINT "_homepage_v_version_hero_section_cta_button_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_homepage_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_homepage_v_version_hero_section_cta_button_locales" ADD CONSTRAINT "_homepage_v_version_hero_section_cta_button_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_homepage_v_version_hero_section_cta_button"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "homepage_hero_section_cta_button_order_idx" ON "homepage_hero_section_cta_button" USING btree ("_order");
  CREATE INDEX "homepage_hero_section_cta_button_parent_id_idx" ON "homepage_hero_section_cta_button" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "homepage_hero_section_cta_button_locales_locale_parent_id_unique" ON "homepage_hero_section_cta_button_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_homepage_v_version_hero_section_cta_button_order_idx" ON "_homepage_v_version_hero_section_cta_button" USING btree ("_order");
  CREATE INDEX "_homepage_v_version_hero_section_cta_button_parent_id_idx" ON "_homepage_v_version_hero_section_cta_button" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_homepage_v_version_hero_section_cta_button_locales_locale_parent_id_unique" ON "_homepage_v_version_hero_section_cta_button_locales" USING btree ("_locale","_parent_id");
  ALTER TABLE "homepage" DROP COLUMN "hero_section_hero_title";
  ALTER TABLE "homepage" DROP COLUMN "hero_section_hero_subtitle";
  ALTER TABLE "homepage" DROP COLUMN "hero_section_cta_button_text";
  ALTER TABLE "homepage" DROP COLUMN "hero_section_link_type";
  ALTER TABLE "homepage" DROP COLUMN "hero_section_link_new_tab";
  ALTER TABLE "homepage" DROP COLUMN "hero_section_link_url";
  ALTER TABLE "homepage_locales" DROP COLUMN "hero_section_link_label";
  ALTER TABLE "_homepage_v" DROP COLUMN "version_hero_section_hero_title";
  ALTER TABLE "_homepage_v" DROP COLUMN "version_hero_section_hero_subtitle";
  ALTER TABLE "_homepage_v" DROP COLUMN "version_hero_section_cta_button_text";
  ALTER TABLE "_homepage_v" DROP COLUMN "version_hero_section_link_type";
  ALTER TABLE "_homepage_v" DROP COLUMN "version_hero_section_link_new_tab";
  ALTER TABLE "_homepage_v" DROP COLUMN "version_hero_section_link_url";
  ALTER TABLE "_homepage_v_locales" DROP COLUMN "version_hero_section_link_label";
  DROP TYPE "public"."enum_homepage_hero_section_link_type";
  DROP TYPE "public"."enum__homepage_v_version_hero_section_link_type";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_homepage_hero_section_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__homepage_v_version_hero_section_link_type" AS ENUM('reference', 'custom');
  DROP TABLE "homepage_hero_section_cta_button" CASCADE;
  DROP TABLE "homepage_hero_section_cta_button_locales" CASCADE;
  DROP TABLE "_homepage_v_version_hero_section_cta_button" CASCADE;
  DROP TABLE "_homepage_v_version_hero_section_cta_button_locales" CASCADE;
  ALTER TABLE "homepage" ADD COLUMN "hero_section_hero_title" varchar;
  ALTER TABLE "homepage" ADD COLUMN "hero_section_hero_subtitle" varchar;
  ALTER TABLE "homepage" ADD COLUMN "hero_section_cta_button_text" varchar;
  ALTER TABLE "homepage" ADD COLUMN "hero_section_link_type" "enum_homepage_hero_section_link_type" DEFAULT 'reference';
  ALTER TABLE "homepage" ADD COLUMN "hero_section_link_new_tab" boolean;
  ALTER TABLE "homepage" ADD COLUMN "hero_section_link_url" varchar;
  ALTER TABLE "homepage_locales" ADD COLUMN "hero_section_link_label" varchar;
  ALTER TABLE "_homepage_v" ADD COLUMN "version_hero_section_hero_title" varchar;
  ALTER TABLE "_homepage_v" ADD COLUMN "version_hero_section_hero_subtitle" varchar;
  ALTER TABLE "_homepage_v" ADD COLUMN "version_hero_section_cta_button_text" varchar;
  ALTER TABLE "_homepage_v" ADD COLUMN "version_hero_section_link_type" "enum__homepage_v_version_hero_section_link_type" DEFAULT 'reference';
  ALTER TABLE "_homepage_v" ADD COLUMN "version_hero_section_link_new_tab" boolean;
  ALTER TABLE "_homepage_v" ADD COLUMN "version_hero_section_link_url" varchar;
  ALTER TABLE "_homepage_v_locales" ADD COLUMN "version_hero_section_link_label" varchar;
  ALTER TABLE "homepage_locales" DROP COLUMN "hero_section_hero_title";
  ALTER TABLE "homepage_locales" DROP COLUMN "hero_section_hero_subtitle";
  ALTER TABLE "_homepage_v_locales" DROP COLUMN "version_hero_section_hero_title";
  ALTER TABLE "_homepage_v_locales" DROP COLUMN "version_hero_section_hero_subtitle";
  DROP TYPE "public"."enum_homepage_hero_section_cta_button_link_type";
  DROP TYPE "public"."enum__homepage_v_version_hero_section_cta_button_link_type";`)
}
