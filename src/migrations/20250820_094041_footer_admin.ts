import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
   CREATE TYPE "public"."enum_footer_sm_links_group_sm_links_sm_type" AS ENUM('fb', 'insta', 'threads', 'mast', 'wa', 'linkedin', 'scloud', 'med', 'sstack');
  ALTER TYPE "public"."enum_header_languages" ADD VALUE 'in';
  ALTER TYPE "public"."enum_header_languages" ADD VALUE 'np';
  ALTER TYPE "public"."enum_header_languages" ADD VALUE 'kh';
  CREATE TABLE IF NOT EXISTS "footer_sm_links_group_sm_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"sm_type" "enum_footer_sm_links_group_sm_links_sm_type",
  	"url" varchar NOT NULL
  );
  
  ALTER TABLE "footer_sm_links" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "footer_sm_links" CASCADE;
  DROP INDEX IF EXISTS "media_sizes_square_sizes_square_filename_idx";
  DO $$ BEGIN
   ALTER TABLE "footer_sm_links_group_sm_links" ADD CONSTRAINT "footer_sm_links_group_sm_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "footer_sm_links_group_sm_links_order_idx" ON "footer_sm_links_group_sm_links" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "footer_sm_links_group_sm_links_parent_id_idx" ON "footer_sm_links_group_sm_links" USING btree ("_parent_id");
  ALTER TABLE "media" DROP COLUMN IF EXISTS "sizes_square_url";
  ALTER TABLE "media" DROP COLUMN IF EXISTS "sizes_square_width";
  ALTER TABLE "media" DROP COLUMN IF EXISTS "sizes_square_height";
  ALTER TABLE "media" DROP COLUMN IF EXISTS "sizes_square_mime_type";
  ALTER TABLE "media" DROP COLUMN IF EXISTS "sizes_square_filesize";
  ALTER TABLE "media" DROP COLUMN IF EXISTS "sizes_square_filename";
  DROP TYPE "public"."enum_footer_sm_links_sm_type";`)
}

export async function down({ payload, req }: MigrateDownArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
   CREATE TYPE "public"."enum_footer_sm_links_sm_type" AS ENUM('fb', 'insta', 'threads', 'mast', 'wa', 'linkedin', 'scloud', 'med', 'sstack');
  CREATE TABLE IF NOT EXISTS "footer_sm_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"sm_type" "enum_footer_sm_links_sm_type",
  	"url" varchar NOT NULL
  );
  
  ALTER TABLE "footer_sm_links_group_sm_links" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "footer_sm_links_group_sm_links" CASCADE;
  ALTER TABLE "media" ADD COLUMN "sizes_square_url" varchar;
  ALTER TABLE "media" ADD COLUMN "sizes_square_width" numeric;
  ALTER TABLE "media" ADD COLUMN "sizes_square_height" numeric;
  ALTER TABLE "media" ADD COLUMN "sizes_square_mime_type" varchar;
  ALTER TABLE "media" ADD COLUMN "sizes_square_filesize" numeric;
  ALTER TABLE "media" ADD COLUMN "sizes_square_filename" varchar;
  DO $$ BEGIN
   ALTER TABLE "footer_sm_links" ADD CONSTRAINT "footer_sm_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "footer_sm_links_order_idx" ON "footer_sm_links" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "footer_sm_links_parent_id_idx" ON "footer_sm_links" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "media_sizes_square_sizes_square_filename_idx" ON "media" USING btree ("sizes_square_filename");
  ALTER TABLE "public"."header_languages" ALTER COLUMN "value" SET DATA TYPE text;
  DROP TYPE "public"."enum_header_languages";
  CREATE TYPE "public"."enum_header_languages" AS ENUM('en', 'th', 'hn');
  ALTER TABLE "public"."header_languages" ALTER COLUMN "value" SET DATA TYPE "public"."enum_header_languages" USING "value"::"public"."enum_header_languages";
  DROP TYPE "public"."enum_footer_sm_links_group_sm_links_sm_type";`)
}
