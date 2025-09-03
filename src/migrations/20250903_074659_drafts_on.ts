import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_homepage_hero_section_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_homepage_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__homepage_v_version_hero_section_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__homepage_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__homepage_v_published_locale" AS ENUM('en', 'ar', 'bi', 'bn-IN', 'br', 'ch', 'prs-Arab', 'km', 'hi', 'ms', 'ne', 'ps-Arab', 'pcm', 'si', 'tl', 'ta', 'th', 'vi', 'ur');
  ALTER TYPE "public"."enum_footer_sm_links_group_sm_links_sm_type" ADD VALUE 'spotify';
  CREATE TABLE "homepage" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"hero_section_hero_title" varchar,
  	"hero_section_hero_subtitle" varchar,
  	"hero_section_cta_button_text" varchar,
  	"hero_section_link_type" "enum_homepage_hero_section_link_type" DEFAULT 'reference',
  	"hero_section_link_new_tab" boolean,
  	"hero_section_link_url" varchar,
  	"_status" "enum_homepage_status" DEFAULT 'draft',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "homepage_locales" (
  	"hero_section_link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "homepage_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"posts_id" integer
  );
  
  CREATE TABLE "_homepage_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version_hero_section_hero_title" varchar,
  	"version_hero_section_hero_subtitle" varchar,
  	"version_hero_section_cta_button_text" varchar,
  	"version_hero_section_link_type" "enum__homepage_v_version_hero_section_link_type" DEFAULT 'reference',
  	"version_hero_section_link_new_tab" boolean,
  	"version_hero_section_link_url" varchar,
  	"version__status" "enum__homepage_v_version_status" DEFAULT 'draft',
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "enum__homepage_v_published_locale",
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "_homepage_v_locales" (
  	"version_hero_section_link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_homepage_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"posts_id" integer
  );
  
  ALTER TABLE "homepage_locales" ADD CONSTRAINT "homepage_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_rels" ADD CONSTRAINT "homepage_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."homepage"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_rels" ADD CONSTRAINT "homepage_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_homepage_v_locales" ADD CONSTRAINT "_homepage_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_homepage_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_homepage_v_rels" ADD CONSTRAINT "_homepage_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_homepage_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_homepage_v_rels" ADD CONSTRAINT "_homepage_v_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "homepage__status_idx" ON "homepage" USING btree ("_status");
  CREATE UNIQUE INDEX "homepage_locales_locale_parent_id_unique" ON "homepage_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "homepage_rels_order_idx" ON "homepage_rels" USING btree ("order");
  CREATE INDEX "homepage_rels_parent_idx" ON "homepage_rels" USING btree ("parent_id");
  CREATE INDEX "homepage_rels_path_idx" ON "homepage_rels" USING btree ("path");
  CREATE INDEX "homepage_rels_posts_id_idx" ON "homepage_rels" USING btree ("posts_id");
  CREATE INDEX "_homepage_v_version_version__status_idx" ON "_homepage_v" USING btree ("version__status");
  CREATE INDEX "_homepage_v_created_at_idx" ON "_homepage_v" USING btree ("created_at");
  CREATE INDEX "_homepage_v_updated_at_idx" ON "_homepage_v" USING btree ("updated_at");
  CREATE INDEX "_homepage_v_snapshot_idx" ON "_homepage_v" USING btree ("snapshot");
  CREATE INDEX "_homepage_v_published_locale_idx" ON "_homepage_v" USING btree ("published_locale");
  CREATE INDEX "_homepage_v_latest_idx" ON "_homepage_v" USING btree ("latest");
  CREATE INDEX "_homepage_v_autosave_idx" ON "_homepage_v" USING btree ("autosave");
  CREATE UNIQUE INDEX "_homepage_v_locales_locale_parent_id_unique" ON "_homepage_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_homepage_v_rels_order_idx" ON "_homepage_v_rels" USING btree ("order");
  CREATE INDEX "_homepage_v_rels_parent_idx" ON "_homepage_v_rels" USING btree ("parent_id");
  CREATE INDEX "_homepage_v_rels_path_idx" ON "_homepage_v_rels" USING btree ("path");
  CREATE INDEX "_homepage_v_rels_posts_id_idx" ON "_homepage_v_rels" USING btree ("posts_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "homepage" CASCADE;
  DROP TABLE "homepage_locales" CASCADE;
  DROP TABLE "homepage_rels" CASCADE;
  DROP TABLE "_homepage_v" CASCADE;
  DROP TABLE "_homepage_v_locales" CASCADE;
  DROP TABLE "_homepage_v_rels" CASCADE;
  ALTER TABLE "footer_sm_links_group_sm_links" ALTER COLUMN "sm_type" SET DATA TYPE text;
  DROP TYPE "public"."enum_footer_sm_links_group_sm_links_sm_type";
  CREATE TYPE "public"."enum_footer_sm_links_group_sm_links_sm_type" AS ENUM('fb', 'insta', 'threads', 'mast', 'wa', 'linkedin', 'scloud', 'med', 'sstack');
  ALTER TABLE "footer_sm_links_group_sm_links" ALTER COLUMN "sm_type" SET DATA TYPE "public"."enum_footer_sm_links_group_sm_links_sm_type" USING "sm_type"::"public"."enum_footer_sm_links_group_sm_links_sm_type";
  DROP TYPE "public"."enum_homepage_hero_section_link_type";
  DROP TYPE "public"."enum_homepage_status";
  DROP TYPE "public"."enum__homepage_v_version_hero_section_link_type";
  DROP TYPE "public"."enum__homepage_v_version_status";
  DROP TYPE "public"."enum__homepage_v_published_locale";`)
}
