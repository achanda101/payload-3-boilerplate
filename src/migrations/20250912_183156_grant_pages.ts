import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_grants_blocks_grants_hero_block_hero_buttons_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_grants_blocks_grants_hero_block_badge_type" AS ENUM('info', 'imp');
  CREATE TYPE "public"."enum_grants_blocks_grants_hero_block_header_colour" AS ENUM('blank', 'forest', 'turmeric', 'sky', 'rose');
  CREATE TYPE "public"."enum_grants_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__grants_v_blocks_grants_hero_block_hero_buttons_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__grants_v_blocks_grants_hero_block_badge_type" AS ENUM('info', 'imp');
  CREATE TYPE "public"."enum__grants_v_blocks_grants_hero_block_header_colour" AS ENUM('blank', 'forest', 'turmeric', 'sky', 'rose');
  CREATE TYPE "public"."enum__grants_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__grants_v_published_locale" AS ENUM('en', 'ar', 'bi', 'bn-IN', 'br', 'ch', 'prs-Arab', 'km', 'hi', 'ms', 'ne', 'ps-Arab', 'pcm', 'si', 'tl', 'ta', 'th', 'vi', 'ur');
  CREATE TABLE "grants_blocks_grants_hero_block_hero_buttons" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"button_primary" boolean DEFAULT false,
  	"link_type" "enum_grants_blocks_grants_hero_block_hero_buttons_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
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
  
  CREATE TABLE "grants" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"published_at" timestamp(3) with time zone,
  	"slug" varchar,
  	"slug_lock" boolean DEFAULT true,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_grants_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "grants_locales" (
  	"title" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "grants_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"grants_id" integer,
  	"posts_id" integer
  );
  
  CREATE TABLE "_grants_v_blocks_grants_hero_block_hero_buttons" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"button_primary" boolean DEFAULT false,
  	"link_type" "enum__grants_v_blocks_grants_hero_block_hero_buttons_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
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
  
  CREATE TABLE "_grants_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_published_at" timestamp(3) with time zone,
  	"version_slug" varchar,
  	"version_slug_lock" boolean DEFAULT true,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__grants_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "enum__grants_v_published_locale",
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "_grants_v_locales" (
  	"version_title" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_grants_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"grants_id" integer,
  	"posts_id" integer
  );
  
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "grants_id" integer;
  ALTER TABLE "homepage_blocks_secondarycta" ADD COLUMN "contact_email" varchar;
  ALTER TABLE "homepage_blocks_secondarycta_locales" ADD COLUMN "contact_label" varchar;
  ALTER TABLE "homepage_rels" ADD COLUMN "grants_id" integer;
  ALTER TABLE "_homepage_v_blocks_secondarycta" ADD COLUMN "contact_email" varchar;
  ALTER TABLE "_homepage_v_blocks_secondarycta_locales" ADD COLUMN "contact_label" varchar;
  ALTER TABLE "_homepage_v_rels" ADD COLUMN "grants_id" integer;
  ALTER TABLE "nav_rels" ADD COLUMN "grants_id" integer;
  ALTER TABLE "grants_blocks_grants_hero_block_hero_buttons" ADD CONSTRAINT "grants_blocks_grants_hero_block_hero_buttons_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."grants_blocks_grants_hero_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "grants_blocks_grants_hero_block_hero_buttons_locales" ADD CONSTRAINT "grants_blocks_grants_hero_block_hero_buttons_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."grants_blocks_grants_hero_block_hero_buttons"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "grants_blocks_grants_hero_block" ADD CONSTRAINT "grants_blocks_grants_hero_block_hero_image_id_media_cloud_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "public"."media_cloud"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "grants_blocks_grants_hero_block" ADD CONSTRAINT "grants_blocks_grants_hero_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."grants"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "grants_blocks_grants_hero_block_locales" ADD CONSTRAINT "grants_blocks_grants_hero_block_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."grants_blocks_grants_hero_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "grants_locales" ADD CONSTRAINT "grants_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."grants"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "grants_rels" ADD CONSTRAINT "grants_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."grants"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "grants_rels" ADD CONSTRAINT "grants_rels_grants_fk" FOREIGN KEY ("grants_id") REFERENCES "public"."grants"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "grants_rels" ADD CONSTRAINT "grants_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_grants_v_blocks_grants_hero_block_hero_buttons" ADD CONSTRAINT "_grants_v_blocks_grants_hero_block_hero_buttons_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_grants_v_blocks_grants_hero_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_grants_v_blocks_grants_hero_block_hero_buttons_locales" ADD CONSTRAINT "_grants_v_blocks_grants_hero_block_hero_buttons_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_grants_v_blocks_grants_hero_block_hero_buttons"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_grants_v_blocks_grants_hero_block" ADD CONSTRAINT "_grants_v_blocks_grants_hero_block_hero_image_id_media_cloud_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "public"."media_cloud"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_grants_v_blocks_grants_hero_block" ADD CONSTRAINT "_grants_v_blocks_grants_hero_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_grants_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_grants_v_blocks_grants_hero_block_locales" ADD CONSTRAINT "_grants_v_blocks_grants_hero_block_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_grants_v_blocks_grants_hero_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_grants_v" ADD CONSTRAINT "_grants_v_parent_id_grants_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."grants"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_grants_v_locales" ADD CONSTRAINT "_grants_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_grants_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_grants_v_rels" ADD CONSTRAINT "_grants_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_grants_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_grants_v_rels" ADD CONSTRAINT "_grants_v_rels_grants_fk" FOREIGN KEY ("grants_id") REFERENCES "public"."grants"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_grants_v_rels" ADD CONSTRAINT "_grants_v_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "grants_blocks_grants_hero_block_hero_buttons_order_idx" ON "grants_blocks_grants_hero_block_hero_buttons" USING btree ("_order");
  CREATE INDEX "grants_blocks_grants_hero_block_hero_buttons_parent_id_idx" ON "grants_blocks_grants_hero_block_hero_buttons" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "grants_blocks_grants_hero_block_hero_buttons_locales_locale_parent_id_unique" ON "grants_blocks_grants_hero_block_hero_buttons_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "grants_blocks_grants_hero_block_order_idx" ON "grants_blocks_grants_hero_block" USING btree ("_order");
  CREATE INDEX "grants_blocks_grants_hero_block_parent_id_idx" ON "grants_blocks_grants_hero_block" USING btree ("_parent_id");
  CREATE INDEX "grants_blocks_grants_hero_block_path_idx" ON "grants_blocks_grants_hero_block" USING btree ("_path");
  CREATE INDEX "grants_blocks_grants_hero_block_hero_image_idx" ON "grants_blocks_grants_hero_block" USING btree ("hero_image_id");
  CREATE UNIQUE INDEX "grants_blocks_grants_hero_block_locales_locale_parent_id_unique" ON "grants_blocks_grants_hero_block_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "grants_slug_idx" ON "grants" USING btree ("slug");
  CREATE INDEX "grants_updated_at_idx" ON "grants" USING btree ("updated_at");
  CREATE INDEX "grants_created_at_idx" ON "grants" USING btree ("created_at");
  CREATE INDEX "grants__status_idx" ON "grants" USING btree ("_status");
  CREATE UNIQUE INDEX "grants_title_idx" ON "grants_locales" USING btree ("title","_locale");
  CREATE UNIQUE INDEX "grants_locales_locale_parent_id_unique" ON "grants_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "grants_rels_order_idx" ON "grants_rels" USING btree ("order");
  CREATE INDEX "grants_rels_parent_idx" ON "grants_rels" USING btree ("parent_id");
  CREATE INDEX "grants_rels_path_idx" ON "grants_rels" USING btree ("path");
  CREATE INDEX "grants_rels_grants_id_idx" ON "grants_rels" USING btree ("grants_id");
  CREATE INDEX "grants_rels_posts_id_idx" ON "grants_rels" USING btree ("posts_id");
  CREATE INDEX "_grants_v_blocks_grants_hero_block_hero_buttons_order_idx" ON "_grants_v_blocks_grants_hero_block_hero_buttons" USING btree ("_order");
  CREATE INDEX "_grants_v_blocks_grants_hero_block_hero_buttons_parent_id_idx" ON "_grants_v_blocks_grants_hero_block_hero_buttons" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_grants_v_blocks_grants_hero_block_hero_buttons_locales_locale_parent_id_unique" ON "_grants_v_blocks_grants_hero_block_hero_buttons_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_grants_v_blocks_grants_hero_block_order_idx" ON "_grants_v_blocks_grants_hero_block" USING btree ("_order");
  CREATE INDEX "_grants_v_blocks_grants_hero_block_parent_id_idx" ON "_grants_v_blocks_grants_hero_block" USING btree ("_parent_id");
  CREATE INDEX "_grants_v_blocks_grants_hero_block_path_idx" ON "_grants_v_blocks_grants_hero_block" USING btree ("_path");
  CREATE INDEX "_grants_v_blocks_grants_hero_block_hero_image_idx" ON "_grants_v_blocks_grants_hero_block" USING btree ("hero_image_id");
  CREATE UNIQUE INDEX "_grants_v_blocks_grants_hero_block_locales_locale_parent_id_unique" ON "_grants_v_blocks_grants_hero_block_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_grants_v_parent_idx" ON "_grants_v" USING btree ("parent_id");
  CREATE INDEX "_grants_v_version_version_slug_idx" ON "_grants_v" USING btree ("version_slug");
  CREATE INDEX "_grants_v_version_version_updated_at_idx" ON "_grants_v" USING btree ("version_updated_at");
  CREATE INDEX "_grants_v_version_version_created_at_idx" ON "_grants_v" USING btree ("version_created_at");
  CREATE INDEX "_grants_v_version_version__status_idx" ON "_grants_v" USING btree ("version__status");
  CREATE INDEX "_grants_v_created_at_idx" ON "_grants_v" USING btree ("created_at");
  CREATE INDEX "_grants_v_updated_at_idx" ON "_grants_v" USING btree ("updated_at");
  CREATE INDEX "_grants_v_snapshot_idx" ON "_grants_v" USING btree ("snapshot");
  CREATE INDEX "_grants_v_published_locale_idx" ON "_grants_v" USING btree ("published_locale");
  CREATE INDEX "_grants_v_latest_idx" ON "_grants_v" USING btree ("latest");
  CREATE INDEX "_grants_v_autosave_idx" ON "_grants_v" USING btree ("autosave");
  CREATE INDEX "_grants_v_version_version_title_idx" ON "_grants_v_locales" USING btree ("version_title","_locale");
  CREATE UNIQUE INDEX "_grants_v_locales_locale_parent_id_unique" ON "_grants_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_grants_v_rels_order_idx" ON "_grants_v_rels" USING btree ("order");
  CREATE INDEX "_grants_v_rels_parent_idx" ON "_grants_v_rels" USING btree ("parent_id");
  CREATE INDEX "_grants_v_rels_path_idx" ON "_grants_v_rels" USING btree ("path");
  CREATE INDEX "_grants_v_rels_grants_id_idx" ON "_grants_v_rels" USING btree ("grants_id");
  CREATE INDEX "_grants_v_rels_posts_id_idx" ON "_grants_v_rels" USING btree ("posts_id");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_grants_fk" FOREIGN KEY ("grants_id") REFERENCES "public"."grants"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_rels" ADD CONSTRAINT "homepage_rels_grants_fk" FOREIGN KEY ("grants_id") REFERENCES "public"."grants"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_homepage_v_rels" ADD CONSTRAINT "_homepage_v_rels_grants_fk" FOREIGN KEY ("grants_id") REFERENCES "public"."grants"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "nav_rels" ADD CONSTRAINT "nav_rels_grants_fk" FOREIGN KEY ("grants_id") REFERENCES "public"."grants"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_grants_id_idx" ON "payload_locked_documents_rels" USING btree ("grants_id");
  CREATE INDEX "homepage_rels_grants_id_idx" ON "homepage_rels" USING btree ("grants_id");
  CREATE INDEX "_homepage_v_rels_grants_id_idx" ON "_homepage_v_rels" USING btree ("grants_id");
  CREATE INDEX "nav_rels_grants_id_idx" ON "nav_rels" USING btree ("grants_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "grants_blocks_grants_hero_block_hero_buttons" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "grants_blocks_grants_hero_block_hero_buttons_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "grants_blocks_grants_hero_block" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "grants_blocks_grants_hero_block_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "grants" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "grants_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "grants_rels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_grants_v_blocks_grants_hero_block_hero_buttons" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_grants_v_blocks_grants_hero_block_hero_buttons_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_grants_v_blocks_grants_hero_block" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_grants_v_blocks_grants_hero_block_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_grants_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_grants_v_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_grants_v_rels" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "grants_blocks_grants_hero_block_hero_buttons" CASCADE;
  DROP TABLE "grants_blocks_grants_hero_block_hero_buttons_locales" CASCADE;
  DROP TABLE "grants_blocks_grants_hero_block" CASCADE;
  DROP TABLE "grants_blocks_grants_hero_block_locales" CASCADE;
  DROP TABLE "grants" CASCADE;
  DROP TABLE "grants_locales" CASCADE;
  DROP TABLE "grants_rels" CASCADE;
  DROP TABLE "_grants_v_blocks_grants_hero_block_hero_buttons" CASCADE;
  DROP TABLE "_grants_v_blocks_grants_hero_block_hero_buttons_locales" CASCADE;
  DROP TABLE "_grants_v_blocks_grants_hero_block" CASCADE;
  DROP TABLE "_grants_v_blocks_grants_hero_block_locales" CASCADE;
  DROP TABLE "_grants_v" CASCADE;
  DROP TABLE "_grants_v_locales" CASCADE;
  DROP TABLE "_grants_v_rels" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_grants_fk";
  
  ALTER TABLE "homepage_rels" DROP CONSTRAINT "homepage_rels_grants_fk";
  
  ALTER TABLE "_homepage_v_rels" DROP CONSTRAINT "_homepage_v_rels_grants_fk";
  
  ALTER TABLE "nav_rels" DROP CONSTRAINT "nav_rels_grants_fk";
  
  DROP INDEX "payload_locked_documents_rels_grants_id_idx";
  DROP INDEX "homepage_rels_grants_id_idx";
  DROP INDEX "_homepage_v_rels_grants_id_idx";
  DROP INDEX "nav_rels_grants_id_idx";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "grants_id";
  ALTER TABLE "homepage_blocks_secondarycta" DROP COLUMN "contact_email";
  ALTER TABLE "homepage_blocks_secondarycta_locales" DROP COLUMN "contact_label";
  ALTER TABLE "homepage_rels" DROP COLUMN "grants_id";
  ALTER TABLE "_homepage_v_blocks_secondarycta" DROP COLUMN "contact_email";
  ALTER TABLE "_homepage_v_blocks_secondarycta_locales" DROP COLUMN "contact_label";
  ALTER TABLE "_homepage_v_rels" DROP COLUMN "grants_id";
  ALTER TABLE "nav_rels" DROP COLUMN "grants_id";
  DROP TYPE "public"."enum_grants_blocks_grants_hero_block_hero_buttons_link_type";
  DROP TYPE "public"."enum_grants_blocks_grants_hero_block_badge_type";
  DROP TYPE "public"."enum_grants_blocks_grants_hero_block_header_colour";
  DROP TYPE "public"."enum_grants_status";
  DROP TYPE "public"."enum__grants_v_blocks_grants_hero_block_hero_buttons_link_type";
  DROP TYPE "public"."enum__grants_v_blocks_grants_hero_block_badge_type";
  DROP TYPE "public"."enum__grants_v_blocks_grants_hero_block_header_colour";
  DROP TYPE "public"."enum__grants_v_version_status";
  DROP TYPE "public"."enum__grants_v_published_locale";`)
}
