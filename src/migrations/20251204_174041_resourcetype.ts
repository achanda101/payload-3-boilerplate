import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "grants_blocks_rich_content_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "grants_blocks_rich_content_block_locales" (
  	"rich_text" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "_grants_v_blocks_rich_content_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_grants_v_blocks_rich_content_block_locales" (
  	"rich_text" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "doctypes" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "doctypes_locales" (
  	"type" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "categories_locales" (
  	"title" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "doctypes_id" integer;
  ALTER TABLE "grants_blocks_rich_content_block" ADD CONSTRAINT "grants_blocks_rich_content_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."grants"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "grants_blocks_rich_content_block_locales" ADD CONSTRAINT "grants_blocks_rich_content_block_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."grants_blocks_rich_content_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_grants_v_blocks_rich_content_block" ADD CONSTRAINT "_grants_v_blocks_rich_content_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_grants_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_grants_v_blocks_rich_content_block_locales" ADD CONSTRAINT "_grants_v_blocks_rich_content_block_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_grants_v_blocks_rich_content_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "doctypes_locales" ADD CONSTRAINT "doctypes_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."doctypes"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "categories_locales" ADD CONSTRAINT "categories_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "grants_blocks_rich_content_block_order_idx" ON "grants_blocks_rich_content_block" USING btree ("_order");
  CREATE INDEX "grants_blocks_rich_content_block_parent_id_idx" ON "grants_blocks_rich_content_block" USING btree ("_parent_id");
  CREATE INDEX "grants_blocks_rich_content_block_path_idx" ON "grants_blocks_rich_content_block" USING btree ("_path");
  CREATE UNIQUE INDEX "grants_blocks_rich_content_block_locales_locale_parent_id_unique" ON "grants_blocks_rich_content_block_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_grants_v_blocks_rich_content_block_order_idx" ON "_grants_v_blocks_rich_content_block" USING btree ("_order");
  CREATE INDEX "_grants_v_blocks_rich_content_block_parent_id_idx" ON "_grants_v_blocks_rich_content_block" USING btree ("_parent_id");
  CREATE INDEX "_grants_v_blocks_rich_content_block_path_idx" ON "_grants_v_blocks_rich_content_block" USING btree ("_path");
  CREATE UNIQUE INDEX "_grants_v_blocks_rich_content_block_locales_locale_parent_id_unique" ON "_grants_v_blocks_rich_content_block_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "doctypes_updated_at_idx" ON "doctypes" USING btree ("updated_at");
  CREATE INDEX "doctypes_created_at_idx" ON "doctypes" USING btree ("created_at");
  CREATE UNIQUE INDEX "doctypes_locales_locale_parent_id_unique" ON "doctypes_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "categories_locales_locale_parent_id_unique" ON "categories_locales" USING btree ("_locale","_parent_id");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_doctypes_fk" FOREIGN KEY ("doctypes_id") REFERENCES "public"."doctypes"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_doctypes_id_idx" ON "payload_locked_documents_rels" USING btree ("doctypes_id");
  ALTER TABLE "categories" DROP COLUMN "title";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "grants_blocks_rich_content_block" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "grants_blocks_rich_content_block_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_grants_v_blocks_rich_content_block" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_grants_v_blocks_rich_content_block_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "doctypes" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "doctypes_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "categories_locales" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "grants_blocks_rich_content_block" CASCADE;
  DROP TABLE "grants_blocks_rich_content_block_locales" CASCADE;
  DROP TABLE "_grants_v_blocks_rich_content_block" CASCADE;
  DROP TABLE "_grants_v_blocks_rich_content_block_locales" CASCADE;
  DROP TABLE "doctypes" CASCADE;
  DROP TABLE "doctypes_locales" CASCADE;
  DROP TABLE "categories_locales" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_doctypes_fk";
  
  DROP INDEX "payload_locked_documents_rels_doctypes_id_idx";
  ALTER TABLE "categories" ADD COLUMN "title" varchar NOT NULL;
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "doctypes_id";`)
}
