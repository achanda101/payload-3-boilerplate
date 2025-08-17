import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
   CREATE TYPE "public"."enum_header_languages" AS ENUM('en', 'th', 'hn');
  CREATE TYPE "public"."enum_footer_sm_links_sm_type" AS ENUM('fb', 'insta', 'threads', 'mast', 'wa', 'linkedin', 'scloud', 'med', 'sstack');
  CREATE TYPE "public"."enum_nav_menu_items_nav_items_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_contact_info_emails_email_type" AS ENUM('info', 'grants', 'whistle', 'wsc', 'general');
  CREATE TABLE IF NOT EXISTS "header_languages" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum_header_languages",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "footer_sm_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"sm_type" "enum_footer_sm_links_sm_type",
  	"url" varchar NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "nav_menu_items_nav_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_nav_menu_items_nav_items_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "nav_menu_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "nav" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE IF NOT EXISTS "nav_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"posts_id" integer
  );
  
  CREATE TABLE IF NOT EXISTS "contact_info_emails" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"email" varchar NOT NULL,
  	"email_type" "enum_contact_info_emails_email_type" DEFAULT 'info' NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "contact_info" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  ALTER TABLE "header_nav_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "header_rels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "footer_nav_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "footer_rels" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "header_nav_items" CASCADE;
  DROP TABLE "header_rels" CASCADE;
  DROP TABLE "footer_nav_items" CASCADE;
  DROP TABLE "footer_rels" CASCADE;
  ALTER TABLE "header" ADD COLUMN "logo_id" integer NOT NULL;
  ALTER TABLE "header" ADD COLUMN "search_enabled" boolean DEFAULT true;
  ALTER TABLE "footer" ADD COLUMN "org_name" varchar;
  ALTER TABLE "footer" ADD COLUMN "logo_id" integer NOT NULL;
  DO $$ BEGIN
   ALTER TABLE "header_languages" ADD CONSTRAINT "header_languages_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."header"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "footer_sm_links" ADD CONSTRAINT "footer_sm_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "nav_menu_items_nav_items" ADD CONSTRAINT "nav_menu_items_nav_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."nav_menu_items"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "nav_menu_items" ADD CONSTRAINT "nav_menu_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."nav"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "nav_rels" ADD CONSTRAINT "nav_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."nav"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "nav_rels" ADD CONSTRAINT "nav_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "contact_info_emails" ADD CONSTRAINT "contact_info_emails_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contact_info"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "header_languages_order_idx" ON "header_languages" USING btree ("order");
  CREATE INDEX IF NOT EXISTS "header_languages_parent_idx" ON "header_languages" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "footer_sm_links_order_idx" ON "footer_sm_links" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "footer_sm_links_parent_id_idx" ON "footer_sm_links" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "nav_menu_items_nav_items_order_idx" ON "nav_menu_items_nav_items" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "nav_menu_items_nav_items_parent_id_idx" ON "nav_menu_items_nav_items" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "nav_menu_items_order_idx" ON "nav_menu_items" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "nav_menu_items_parent_id_idx" ON "nav_menu_items" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "nav_rels_order_idx" ON "nav_rels" USING btree ("order");
  CREATE INDEX IF NOT EXISTS "nav_rels_parent_idx" ON "nav_rels" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "nav_rels_path_idx" ON "nav_rels" USING btree ("path");
  CREATE INDEX IF NOT EXISTS "nav_rels_posts_id_idx" ON "nav_rels" USING btree ("posts_id");
  CREATE INDEX IF NOT EXISTS "contact_info_emails_order_idx" ON "contact_info_emails" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "contact_info_emails_parent_id_idx" ON "contact_info_emails" USING btree ("_parent_id");
  DO $$ BEGIN
   ALTER TABLE "header" ADD CONSTRAINT "header_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "footer" ADD CONSTRAINT "footer_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "header_logo_idx" ON "header" USING btree ("logo_id");
  CREATE INDEX IF NOT EXISTS "footer_logo_idx" ON "footer" USING btree ("logo_id");
  DROP TYPE "public"."enum_header_nav_items_link_type";
  DROP TYPE "public"."enum_footer_nav_items_link_type";`)
}

export async function down({ payload, req }: MigrateDownArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
   CREATE TYPE "public"."enum_header_nav_items_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_footer_nav_items_link_type" AS ENUM('reference', 'custom');
  CREATE TABLE IF NOT EXISTS "header_nav_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_header_nav_items_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "header_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"posts_id" integer
  );
  
  CREATE TABLE IF NOT EXISTS "footer_nav_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_footer_nav_items_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "footer_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"posts_id" integer
  );
  
  ALTER TABLE "header_languages" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "footer_sm_links" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "nav_menu_items_nav_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "nav_menu_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "nav" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "nav_rels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "contact_info_emails" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "contact_info" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "header_languages" CASCADE;
  DROP TABLE "footer_sm_links" CASCADE;
  DROP TABLE "nav_menu_items_nav_items" CASCADE;
  DROP TABLE "nav_menu_items" CASCADE;
  DROP TABLE "nav" CASCADE;
  DROP TABLE "nav_rels" CASCADE;
  DROP TABLE "contact_info_emails" CASCADE;
  DROP TABLE "contact_info" CASCADE;
  ALTER TABLE "header" DROP CONSTRAINT "header_logo_id_media_id_fk";
  
  ALTER TABLE "footer" DROP CONSTRAINT "footer_logo_id_media_id_fk";
  
  DROP INDEX IF EXISTS "header_logo_idx";
  DROP INDEX IF EXISTS "footer_logo_idx";
  DO $$ BEGIN
   ALTER TABLE "header_nav_items" ADD CONSTRAINT "header_nav_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."header"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "header_rels" ADD CONSTRAINT "header_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."header"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "header_rels" ADD CONSTRAINT "header_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "footer_nav_items" ADD CONSTRAINT "footer_nav_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "footer_rels" ADD CONSTRAINT "footer_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."footer"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "footer_rels" ADD CONSTRAINT "footer_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "header_nav_items_order_idx" ON "header_nav_items" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "header_nav_items_parent_id_idx" ON "header_nav_items" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "header_rels_order_idx" ON "header_rels" USING btree ("order");
  CREATE INDEX IF NOT EXISTS "header_rels_parent_idx" ON "header_rels" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "header_rels_path_idx" ON "header_rels" USING btree ("path");
  CREATE INDEX IF NOT EXISTS "header_rels_posts_id_idx" ON "header_rels" USING btree ("posts_id");
  CREATE INDEX IF NOT EXISTS "footer_nav_items_order_idx" ON "footer_nav_items" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "footer_nav_items_parent_id_idx" ON "footer_nav_items" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "footer_rels_order_idx" ON "footer_rels" USING btree ("order");
  CREATE INDEX IF NOT EXISTS "footer_rels_parent_idx" ON "footer_rels" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "footer_rels_path_idx" ON "footer_rels" USING btree ("path");
  CREATE INDEX IF NOT EXISTS "footer_rels_posts_id_idx" ON "footer_rels" USING btree ("posts_id");
  ALTER TABLE "header" DROP COLUMN IF EXISTS "logo_id";
  ALTER TABLE "header" DROP COLUMN IF EXISTS "search_enabled";
  ALTER TABLE "footer" DROP COLUMN IF EXISTS "org_name";
  ALTER TABLE "footer" DROP COLUMN IF EXISTS "logo_id";
  DROP TYPE "public"."enum_header_languages";
  DROP TYPE "public"."enum_footer_sm_links_sm_type";
  DROP TYPE "public"."enum_nav_menu_items_nav_items_link_type";
  DROP TYPE "public"."enum_contact_info_emails_email_type";`)
}
