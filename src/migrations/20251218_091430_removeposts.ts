import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "posts_populated_authors" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "posts" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "posts_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "posts_rels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_posts_v_version_populated_authors" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_posts_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_posts_v_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_posts_v_rels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "categories_breadcrumbs" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "categories" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "categories_locales" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "posts_populated_authors" CASCADE;
  DROP TABLE "posts" CASCADE;
  DROP TABLE "posts_locales" CASCADE;
  DROP TABLE "posts_rels" CASCADE;
  DROP TABLE "_posts_v_version_populated_authors" CASCADE;
  DROP TABLE "_posts_v" CASCADE;
  DROP TABLE "_posts_v_locales" CASCADE;
  DROP TABLE "_posts_v_rels" CASCADE;
  DROP TABLE "categories_breadcrumbs" CASCADE;
  DROP TABLE "categories" CASCADE;
  DROP TABLE "categories_locales" CASCADE;
  ALTER TABLE "grants_rels" DROP CONSTRAINT "grants_rels_posts_fk";
  
  ALTER TABLE "_grants_v_rels" DROP CONSTRAINT "_grants_v_rels_posts_fk";
  
  ALTER TABLE "grantcards_rels" DROP CONSTRAINT "grantcards_rels_posts_fk";
  
  ALTER TABLE "_grantcards_v_rels" DROP CONSTRAINT "_grantcards_v_rels_posts_fk";
  
  ALTER TABLE "etests_rels" DROP CONSTRAINT "etests_rels_posts_fk";
  
  ALTER TABLE "_etests_v_rels" DROP CONSTRAINT "_etests_v_rels_posts_fk";
  
  ALTER TABLE "pages_rels" DROP CONSTRAINT "pages_rels_posts_fk";
  
  ALTER TABLE "_pages_v_rels" DROP CONSTRAINT "_pages_v_rels_posts_fk";
  
  ALTER TABLE "blog_rels" DROP CONSTRAINT "blog_rels_posts_fk";
  
  ALTER TABLE "_blog_v_rels" DROP CONSTRAINT "_blog_v_rels_posts_fk";
  
  ALTER TABLE "reports_rels" DROP CONSTRAINT "reports_rels_posts_fk";
  
  ALTER TABLE "_reports_v_rels" DROP CONSTRAINT "_reports_v_rels_posts_fk";
  
  ALTER TABLE "mmedia_rels" DROP CONSTRAINT "mmedia_rels_posts_fk";
  
  ALTER TABLE "_mmedia_v_rels" DROP CONSTRAINT "_mmedia_v_rels_posts_fk";
  
  ALTER TABLE "redirects_rels" DROP CONSTRAINT "redirects_rels_posts_fk";
  
  ALTER TABLE "search_rels" DROP CONSTRAINT "search_rels_posts_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_posts_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_categories_fk";
  
  ALTER TABLE "homepage_rels" DROP CONSTRAINT "homepage_rels_posts_fk";
  
  ALTER TABLE "_homepage_v_rels" DROP CONSTRAINT "_homepage_v_rels_posts_fk";
  
  ALTER TABLE "nav_rels" DROP CONSTRAINT "nav_rels_posts_fk";
  
  DROP INDEX "grants_rels_posts_id_idx";
  DROP INDEX "_grants_v_rels_posts_id_idx";
  DROP INDEX "grantcards_rels_posts_id_idx";
  DROP INDEX "_grantcards_v_rels_posts_id_idx";
  DROP INDEX "etests_rels_posts_id_idx";
  DROP INDEX "_etests_v_rels_posts_id_idx";
  DROP INDEX "pages_rels_posts_id_idx";
  DROP INDEX "_pages_v_rels_posts_id_idx";
  DROP INDEX "blog_rels_posts_id_idx";
  DROP INDEX "_blog_v_rels_posts_id_idx";
  DROP INDEX "reports_rels_posts_id_idx";
  DROP INDEX "_reports_v_rels_posts_id_idx";
  DROP INDEX "mmedia_rels_posts_id_idx";
  DROP INDEX "_mmedia_v_rels_posts_id_idx";
  DROP INDEX "redirects_rels_posts_id_idx";
  DROP INDEX "search_rels_posts_id_idx";
  DROP INDEX "payload_locked_documents_rels_posts_id_idx";
  DROP INDEX "payload_locked_documents_rels_categories_id_idx";
  DROP INDEX "homepage_rels_posts_id_idx";
  DROP INDEX "_homepage_v_rels_posts_id_idx";
  DROP INDEX "nav_rels_posts_id_idx";
  ALTER TABLE "grants_rels" DROP COLUMN "posts_id";
  ALTER TABLE "_grants_v_rels" DROP COLUMN "posts_id";
  ALTER TABLE "grantcards_rels" DROP COLUMN "posts_id";
  ALTER TABLE "_grantcards_v_rels" DROP COLUMN "posts_id";
  ALTER TABLE "etests_rels" DROP COLUMN "posts_id";
  ALTER TABLE "_etests_v_rels" DROP COLUMN "posts_id";
  ALTER TABLE "pages_rels" DROP COLUMN "posts_id";
  ALTER TABLE "_pages_v_rels" DROP COLUMN "posts_id";
  ALTER TABLE "blog_rels" DROP COLUMN "posts_id";
  ALTER TABLE "_blog_v_rels" DROP COLUMN "posts_id";
  ALTER TABLE "reports_rels" DROP COLUMN "posts_id";
  ALTER TABLE "_reports_v_rels" DROP COLUMN "posts_id";
  ALTER TABLE "mmedia_rels" DROP COLUMN "posts_id";
  ALTER TABLE "_mmedia_v_rels" DROP COLUMN "posts_id";
  ALTER TABLE "redirects_rels" DROP COLUMN "posts_id";
  ALTER TABLE "search_rels" DROP COLUMN "posts_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "posts_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "categories_id";
  ALTER TABLE "homepage_rels" DROP COLUMN "posts_id";
  ALTER TABLE "_homepage_v_rels" DROP COLUMN "posts_id";
  ALTER TABLE "nav_rels" DROP COLUMN "posts_id";
  DROP TYPE "public"."enum_posts_status";
  DROP TYPE "public"."enum__posts_v_version_status";
  DROP TYPE "public"."enum__posts_v_published_locale";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_posts_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__posts_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__posts_v_published_locale" AS ENUM('en', 'ar', 'bi', 'bn-IN', 'br', 'ch', 'prs-Arab', 'km', 'hi', 'ms', 'ne', 'ps-Arab', 'pcm', 'si', 'tl', 'ta', 'th', 'vi', 'ur');
  CREATE TABLE "posts_populated_authors" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar
  );
  
  CREATE TABLE "posts" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"published_at" timestamp(3) with time zone,
  	"slug" varchar,
  	"slug_lock" boolean DEFAULT true,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_posts_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "posts_locales" (
  	"title" varchar,
  	"content" jsonb,
  	"meta_title" varchar,
  	"meta_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "posts_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"locale" "_locales",
  	"posts_id" integer,
  	"categories_id" integer,
  	"media_cloud_id" integer,
  	"asset_cloud_id" integer,
  	"users_id" integer
  );
  
  CREATE TABLE "_posts_v_version_populated_authors" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"name" varchar
  );
  
  CREATE TABLE "_posts_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_published_at" timestamp(3) with time zone,
  	"version_slug" varchar,
  	"version_slug_lock" boolean DEFAULT true,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__posts_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "enum__posts_v_published_locale",
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "_posts_v_locales" (
  	"version_title" varchar,
  	"version_content" jsonb,
  	"version_meta_title" varchar,
  	"version_meta_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_posts_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"locale" "_locales",
  	"posts_id" integer,
  	"categories_id" integer,
  	"media_cloud_id" integer,
  	"asset_cloud_id" integer,
  	"users_id" integer
  );
  
  CREATE TABLE "categories_breadcrumbs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"doc_id" integer,
  	"url" varchar,
  	"label" varchar
  );
  
  CREATE TABLE "categories" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "categories_locales" (
  	"title" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  ALTER TABLE "grants_rels" ADD COLUMN "posts_id" integer;
  ALTER TABLE "_grants_v_rels" ADD COLUMN "posts_id" integer;
  ALTER TABLE "grantcards_rels" ADD COLUMN "posts_id" integer;
  ALTER TABLE "_grantcards_v_rels" ADD COLUMN "posts_id" integer;
  ALTER TABLE "etests_rels" ADD COLUMN "posts_id" integer;
  ALTER TABLE "_etests_v_rels" ADD COLUMN "posts_id" integer;
  ALTER TABLE "pages_rels" ADD COLUMN "posts_id" integer;
  ALTER TABLE "_pages_v_rels" ADD COLUMN "posts_id" integer;
  ALTER TABLE "blog_rels" ADD COLUMN "posts_id" integer;
  ALTER TABLE "_blog_v_rels" ADD COLUMN "posts_id" integer;
  ALTER TABLE "reports_rels" ADD COLUMN "posts_id" integer;
  ALTER TABLE "_reports_v_rels" ADD COLUMN "posts_id" integer;
  ALTER TABLE "mmedia_rels" ADD COLUMN "posts_id" integer;
  ALTER TABLE "_mmedia_v_rels" ADD COLUMN "posts_id" integer;
  ALTER TABLE "redirects_rels" ADD COLUMN "posts_id" integer;
  ALTER TABLE "search_rels" ADD COLUMN "posts_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "posts_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "categories_id" integer;
  ALTER TABLE "homepage_rels" ADD COLUMN "posts_id" integer;
  ALTER TABLE "_homepage_v_rels" ADD COLUMN "posts_id" integer;
  ALTER TABLE "nav_rels" ADD COLUMN "posts_id" integer;
  ALTER TABLE "posts_populated_authors" ADD CONSTRAINT "posts_populated_authors_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_locales" ADD CONSTRAINT "posts_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_rels" ADD CONSTRAINT "posts_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_rels" ADD CONSTRAINT "posts_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_rels" ADD CONSTRAINT "posts_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_rels" ADD CONSTRAINT "posts_rels_media_cloud_fk" FOREIGN KEY ("media_cloud_id") REFERENCES "public"."media_cloud"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_rels" ADD CONSTRAINT "posts_rels_asset_cloud_fk" FOREIGN KEY ("asset_cloud_id") REFERENCES "public"."asset_cloud"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_rels" ADD CONSTRAINT "posts_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_version_populated_authors" ADD CONSTRAINT "_posts_v_version_populated_authors_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v" ADD CONSTRAINT "_posts_v_parent_id_posts_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."posts"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_posts_v_locales" ADD CONSTRAINT "_posts_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_rels" ADD CONSTRAINT "_posts_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_rels" ADD CONSTRAINT "_posts_v_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_rels" ADD CONSTRAINT "_posts_v_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_rels" ADD CONSTRAINT "_posts_v_rels_media_cloud_fk" FOREIGN KEY ("media_cloud_id") REFERENCES "public"."media_cloud"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_rels" ADD CONSTRAINT "_posts_v_rels_asset_cloud_fk" FOREIGN KEY ("asset_cloud_id") REFERENCES "public"."asset_cloud"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_rels" ADD CONSTRAINT "_posts_v_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "categories_breadcrumbs" ADD CONSTRAINT "categories_breadcrumbs_doc_id_categories_id_fk" FOREIGN KEY ("doc_id") REFERENCES "public"."categories"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "categories_breadcrumbs" ADD CONSTRAINT "categories_breadcrumbs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "categories" ADD CONSTRAINT "categories_parent_id_categories_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."categories"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "categories_locales" ADD CONSTRAINT "categories_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "posts_populated_authors_order_idx" ON "posts_populated_authors" USING btree ("_order");
  CREATE INDEX "posts_populated_authors_parent_id_idx" ON "posts_populated_authors" USING btree ("_parent_id");
  CREATE INDEX "posts_slug_idx" ON "posts" USING btree ("slug");
  CREATE INDEX "posts_updated_at_idx" ON "posts" USING btree ("updated_at");
  CREATE INDEX "posts_created_at_idx" ON "posts" USING btree ("created_at");
  CREATE INDEX "posts__status_idx" ON "posts" USING btree ("_status");
  CREATE UNIQUE INDEX "posts_locales_locale_parent_id_unique" ON "posts_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "posts_rels_order_idx" ON "posts_rels" USING btree ("order");
  CREATE INDEX "posts_rels_parent_idx" ON "posts_rels" USING btree ("parent_id");
  CREATE INDEX "posts_rels_path_idx" ON "posts_rels" USING btree ("path");
  CREATE INDEX "posts_rels_locale_idx" ON "posts_rels" USING btree ("locale");
  CREATE INDEX "posts_rels_posts_id_idx" ON "posts_rels" USING btree ("posts_id","locale");
  CREATE INDEX "posts_rels_categories_id_idx" ON "posts_rels" USING btree ("categories_id","locale");
  CREATE INDEX "posts_rels_media_cloud_id_idx" ON "posts_rels" USING btree ("media_cloud_id","locale");
  CREATE INDEX "posts_rels_asset_cloud_id_idx" ON "posts_rels" USING btree ("asset_cloud_id","locale");
  CREATE INDEX "posts_rels_users_id_idx" ON "posts_rels" USING btree ("users_id","locale");
  CREATE INDEX "_posts_v_version_populated_authors_order_idx" ON "_posts_v_version_populated_authors" USING btree ("_order");
  CREATE INDEX "_posts_v_version_populated_authors_parent_id_idx" ON "_posts_v_version_populated_authors" USING btree ("_parent_id");
  CREATE INDEX "_posts_v_parent_idx" ON "_posts_v" USING btree ("parent_id");
  CREATE INDEX "_posts_v_version_version_slug_idx" ON "_posts_v" USING btree ("version_slug");
  CREATE INDEX "_posts_v_version_version_updated_at_idx" ON "_posts_v" USING btree ("version_updated_at");
  CREATE INDEX "_posts_v_version_version_created_at_idx" ON "_posts_v" USING btree ("version_created_at");
  CREATE INDEX "_posts_v_version_version__status_idx" ON "_posts_v" USING btree ("version__status");
  CREATE INDEX "_posts_v_created_at_idx" ON "_posts_v" USING btree ("created_at");
  CREATE INDEX "_posts_v_updated_at_idx" ON "_posts_v" USING btree ("updated_at");
  CREATE INDEX "_posts_v_snapshot_idx" ON "_posts_v" USING btree ("snapshot");
  CREATE INDEX "_posts_v_published_locale_idx" ON "_posts_v" USING btree ("published_locale");
  CREATE INDEX "_posts_v_latest_idx" ON "_posts_v" USING btree ("latest");
  CREATE INDEX "_posts_v_autosave_idx" ON "_posts_v" USING btree ("autosave");
  CREATE UNIQUE INDEX "_posts_v_locales_locale_parent_id_unique" ON "_posts_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_posts_v_rels_order_idx" ON "_posts_v_rels" USING btree ("order");
  CREATE INDEX "_posts_v_rels_parent_idx" ON "_posts_v_rels" USING btree ("parent_id");
  CREATE INDEX "_posts_v_rels_path_idx" ON "_posts_v_rels" USING btree ("path");
  CREATE INDEX "_posts_v_rels_locale_idx" ON "_posts_v_rels" USING btree ("locale");
  CREATE INDEX "_posts_v_rels_posts_id_idx" ON "_posts_v_rels" USING btree ("posts_id","locale");
  CREATE INDEX "_posts_v_rels_categories_id_idx" ON "_posts_v_rels" USING btree ("categories_id","locale");
  CREATE INDEX "_posts_v_rels_media_cloud_id_idx" ON "_posts_v_rels" USING btree ("media_cloud_id","locale");
  CREATE INDEX "_posts_v_rels_asset_cloud_id_idx" ON "_posts_v_rels" USING btree ("asset_cloud_id","locale");
  CREATE INDEX "_posts_v_rels_users_id_idx" ON "_posts_v_rels" USING btree ("users_id","locale");
  CREATE INDEX "categories_breadcrumbs_order_idx" ON "categories_breadcrumbs" USING btree ("_order");
  CREATE INDEX "categories_breadcrumbs_parent_id_idx" ON "categories_breadcrumbs" USING btree ("_parent_id");
  CREATE INDEX "categories_breadcrumbs_locale_idx" ON "categories_breadcrumbs" USING btree ("_locale");
  CREATE INDEX "categories_breadcrumbs_doc_idx" ON "categories_breadcrumbs" USING btree ("doc_id");
  CREATE INDEX "categories_parent_idx" ON "categories" USING btree ("parent_id");
  CREATE INDEX "categories_updated_at_idx" ON "categories" USING btree ("updated_at");
  CREATE INDEX "categories_created_at_idx" ON "categories" USING btree ("created_at");
  CREATE UNIQUE INDEX "categories_locales_locale_parent_id_unique" ON "categories_locales" USING btree ("_locale","_parent_id");
  ALTER TABLE "grants_rels" ADD CONSTRAINT "grants_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_grants_v_rels" ADD CONSTRAINT "_grants_v_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "grantcards_rels" ADD CONSTRAINT "grantcards_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_grantcards_v_rels" ADD CONSTRAINT "_grantcards_v_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "etests_rels" ADD CONSTRAINT "etests_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_etests_v_rels" ADD CONSTRAINT "_etests_v_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "blog_rels" ADD CONSTRAINT "blog_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_blog_v_rels" ADD CONSTRAINT "_blog_v_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "reports_rels" ADD CONSTRAINT "reports_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_reports_v_rels" ADD CONSTRAINT "_reports_v_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "mmedia_rels" ADD CONSTRAINT "mmedia_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_mmedia_v_rels" ADD CONSTRAINT "_mmedia_v_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "redirects_rels" ADD CONSTRAINT "redirects_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "search_rels" ADD CONSTRAINT "search_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_rels" ADD CONSTRAINT "homepage_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_homepage_v_rels" ADD CONSTRAINT "_homepage_v_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "nav_rels" ADD CONSTRAINT "nav_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "grants_rels_posts_id_idx" ON "grants_rels" USING btree ("posts_id");
  CREATE INDEX "_grants_v_rels_posts_id_idx" ON "_grants_v_rels" USING btree ("posts_id");
  CREATE INDEX "grantcards_rels_posts_id_idx" ON "grantcards_rels" USING btree ("posts_id");
  CREATE INDEX "_grantcards_v_rels_posts_id_idx" ON "_grantcards_v_rels" USING btree ("posts_id");
  CREATE INDEX "etests_rels_posts_id_idx" ON "etests_rels" USING btree ("posts_id");
  CREATE INDEX "_etests_v_rels_posts_id_idx" ON "_etests_v_rels" USING btree ("posts_id");
  CREATE INDEX "pages_rels_posts_id_idx" ON "pages_rels" USING btree ("posts_id");
  CREATE INDEX "_pages_v_rels_posts_id_idx" ON "_pages_v_rels" USING btree ("posts_id");
  CREATE INDEX "blog_rels_posts_id_idx" ON "blog_rels" USING btree ("posts_id");
  CREATE INDEX "_blog_v_rels_posts_id_idx" ON "_blog_v_rels" USING btree ("posts_id");
  CREATE INDEX "reports_rels_posts_id_idx" ON "reports_rels" USING btree ("posts_id");
  CREATE INDEX "_reports_v_rels_posts_id_idx" ON "_reports_v_rels" USING btree ("posts_id");
  CREATE INDEX "mmedia_rels_posts_id_idx" ON "mmedia_rels" USING btree ("posts_id");
  CREATE INDEX "_mmedia_v_rels_posts_id_idx" ON "_mmedia_v_rels" USING btree ("posts_id");
  CREATE INDEX "redirects_rels_posts_id_idx" ON "redirects_rels" USING btree ("posts_id");
  CREATE INDEX "search_rels_posts_id_idx" ON "search_rels" USING btree ("posts_id");
  CREATE INDEX "payload_locked_documents_rels_posts_id_idx" ON "payload_locked_documents_rels" USING btree ("posts_id");
  CREATE INDEX "payload_locked_documents_rels_categories_id_idx" ON "payload_locked_documents_rels" USING btree ("categories_id");
  CREATE INDEX "homepage_rels_posts_id_idx" ON "homepage_rels" USING btree ("posts_id");
  CREATE INDEX "_homepage_v_rels_posts_id_idx" ON "_homepage_v_rels" USING btree ("posts_id");
  CREATE INDEX "nav_rels_posts_id_idx" ON "nav_rels" USING btree ("posts_id");`)
}
