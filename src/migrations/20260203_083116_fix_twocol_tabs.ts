import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_grants_blocks_three_column_table_block_column_widths" AS ENUM('f-t-t', 't-f-t', 't-t-f', 'vt-t-f');
  CREATE TYPE "public"."enum__grants_v_blocks_three_column_table_block_column_widths" AS ENUM('f-t-t', 't-f-t', 't-t-f', 'vt-t-f');
  CREATE TYPE "public"."enum_pages_blocks_three_column_table_block_column_widths" AS ENUM('f-t-t', 't-f-t', 't-t-f', 'vt-t-f');
  CREATE TYPE "public"."enum__pages_v_blocks_three_column_table_block_column_widths" AS ENUM('f-t-t', 't-f-t', 't-t-f', 'vt-t-f');
  CREATE TYPE "public"."enum_blog_blocks_three_column_table_block_column_widths" AS ENUM('f-t-t', 't-f-t', 't-t-f', 'vt-t-f');
  CREATE TYPE "public"."enum__blog_v_blocks_three_column_table_block_column_widths" AS ENUM('f-t-t', 't-f-t', 't-t-f', 'vt-t-f');
  CREATE TYPE "public"."enum_reports_blocks_three_column_table_block_column_widths" AS ENUM('f-t-t', 't-f-t', 't-t-f', 'vt-t-f');
  CREATE TYPE "public"."enum__reports_v_blocks_three_column_table_block_column_widths" AS ENUM('f-t-t', 't-f-t', 't-t-f', 'vt-t-f');
  CREATE TYPE "public"."enum_mmedia_blocks_three_column_table_block_column_widths" AS ENUM('f-t-t', 't-f-t', 't-t-f', 'vt-t-f');
  CREATE TYPE "public"."enum__mmedia_v_blocks_three_column_table_block_column_widths" AS ENUM('f-t-t', 't-f-t', 't-t-f', 'vt-t-f');
  CREATE TYPE "public"."enum_homepage_blocks_three_column_table_block_column_widths" AS ENUM('f-t-t', 't-f-t', 't-t-f', 'vt-t-f');
  CREATE TYPE "public"."enum__homepage_v_blocks_three_column_table_block_column_widths" AS ENUM('f-t-t', 't-f-t', 't-t-f', 'vt-t-f');
  CREATE TABLE "grants_blocks_two_column_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "grants_blocks_two_column_block_locales" (
  	"title" varchar,
  	"subtitle" varchar,
  	"left_column" jsonb,
  	"right_column" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "grants_blocks_three_column_table_block_rows_columns" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "grants_blocks_three_column_table_block_rows_columns_locales" (
  	"content" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "grants_blocks_three_column_table_block_rows" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "grants_blocks_three_column_table_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"column_widths" "enum_grants_blocks_three_column_table_block_column_widths" DEFAULT 'f-t-t',
  	"block_name" varchar
  );
  
  CREATE TABLE "grants_blocks_three_column_table_block_locales" (
  	"title" varchar,
  	"subtitle" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "_grants_v_blocks_two_column_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_grants_v_blocks_two_column_block_locales" (
  	"title" varchar,
  	"subtitle" varchar,
  	"left_column" jsonb,
  	"right_column" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_grants_v_blocks_three_column_table_block_rows_columns" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_grants_v_blocks_three_column_table_block_rows_columns_locales" (
  	"content" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_grants_v_blocks_three_column_table_block_rows" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_grants_v_blocks_three_column_table_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"column_widths" "enum__grants_v_blocks_three_column_table_block_column_widths" DEFAULT 'f-t-t',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_grants_v_blocks_three_column_table_block_locales" (
  	"title" varchar,
  	"subtitle" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "pages_blocks_two_column_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_two_column_block_locales" (
  	"title" varchar,
  	"subtitle" varchar,
  	"left_column" jsonb,
  	"right_column" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_three_column_table_block_rows_columns" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "pages_blocks_three_column_table_block_rows_columns_locales" (
  	"content" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_three_column_table_block_rows" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "pages_blocks_three_column_table_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"column_widths" "enum_pages_blocks_three_column_table_block_column_widths" DEFAULT 'f-t-t',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_three_column_table_block_locales" (
  	"title" varchar,
  	"subtitle" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_two_column_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_two_column_block_locales" (
  	"title" varchar,
  	"subtitle" varchar,
  	"left_column" jsonb,
  	"right_column" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_three_column_table_block_rows_columns" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_three_column_table_block_rows_columns_locales" (
  	"content" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_three_column_table_block_rows" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_three_column_table_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"column_widths" "enum__pages_v_blocks_three_column_table_block_column_widths" DEFAULT 'f-t-t',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_three_column_table_block_locales" (
  	"title" varchar,
  	"subtitle" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "blog_blocks_two_column_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "blog_blocks_two_column_block_locales" (
  	"title" varchar,
  	"subtitle" varchar,
  	"left_column" jsonb,
  	"right_column" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "blog_blocks_three_column_table_block_rows_columns" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "blog_blocks_three_column_table_block_rows_columns_locales" (
  	"content" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "blog_blocks_three_column_table_block_rows" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "blog_blocks_three_column_table_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"column_widths" "enum_blog_blocks_three_column_table_block_column_widths" DEFAULT 'f-t-t',
  	"block_name" varchar
  );
  
  CREATE TABLE "blog_blocks_three_column_table_block_locales" (
  	"title" varchar,
  	"subtitle" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "_blog_v_blocks_two_column_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_blog_v_blocks_two_column_block_locales" (
  	"title" varchar,
  	"subtitle" varchar,
  	"left_column" jsonb,
  	"right_column" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_blog_v_blocks_three_column_table_block_rows_columns" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_blog_v_blocks_three_column_table_block_rows_columns_locales" (
  	"content" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_blog_v_blocks_three_column_table_block_rows" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_blog_v_blocks_three_column_table_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"column_widths" "enum__blog_v_blocks_three_column_table_block_column_widths" DEFAULT 'f-t-t',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_blog_v_blocks_three_column_table_block_locales" (
  	"title" varchar,
  	"subtitle" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "reports_blocks_two_column_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "reports_blocks_two_column_block_locales" (
  	"title" varchar,
  	"subtitle" varchar,
  	"left_column" jsonb,
  	"right_column" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "reports_blocks_three_column_table_block_rows_columns" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "reports_blocks_three_column_table_block_rows_columns_locales" (
  	"content" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "reports_blocks_three_column_table_block_rows" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "reports_blocks_three_column_table_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"column_widths" "enum_reports_blocks_three_column_table_block_column_widths" DEFAULT 'f-t-t',
  	"block_name" varchar
  );
  
  CREATE TABLE "reports_blocks_three_column_table_block_locales" (
  	"title" varchar,
  	"subtitle" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "_reports_v_blocks_two_column_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_reports_v_blocks_two_column_block_locales" (
  	"title" varchar,
  	"subtitle" varchar,
  	"left_column" jsonb,
  	"right_column" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_reports_v_blocks_three_column_table_block_rows_columns" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_reports_v_blocks_three_column_table_block_rows_columns_locales" (
  	"content" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_reports_v_blocks_three_column_table_block_rows" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_reports_v_blocks_three_column_table_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"column_widths" "enum__reports_v_blocks_three_column_table_block_column_widths" DEFAULT 'f-t-t',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_reports_v_blocks_three_column_table_block_locales" (
  	"title" varchar,
  	"subtitle" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "mmedia_blocks_two_column_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "mmedia_blocks_two_column_block_locales" (
  	"title" varchar,
  	"subtitle" varchar,
  	"left_column" jsonb,
  	"right_column" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "mmedia_blocks_three_column_table_block_rows_columns" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "mmedia_blocks_three_column_table_block_rows_columns_locales" (
  	"content" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "mmedia_blocks_three_column_table_block_rows" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "mmedia_blocks_three_column_table_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"column_widths" "enum_mmedia_blocks_three_column_table_block_column_widths" DEFAULT 'f-t-t',
  	"block_name" varchar
  );
  
  CREATE TABLE "mmedia_blocks_three_column_table_block_locales" (
  	"title" varchar,
  	"subtitle" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "_mmedia_v_blocks_two_column_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_mmedia_v_blocks_two_column_block_locales" (
  	"title" varchar,
  	"subtitle" varchar,
  	"left_column" jsonb,
  	"right_column" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_mmedia_v_blocks_three_column_table_block_rows_columns" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_mmedia_v_blocks_three_column_table_block_rows_columns_locales" (
  	"content" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_mmedia_v_blocks_three_column_table_block_rows" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_mmedia_v_blocks_three_column_table_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"column_widths" "enum__mmedia_v_blocks_three_column_table_block_column_widths" DEFAULT 'f-t-t',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_mmedia_v_blocks_three_column_table_block_locales" (
  	"title" varchar,
  	"subtitle" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "homepage_blocks_two_column_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "homepage_blocks_two_column_block_locales" (
  	"title" varchar,
  	"subtitle" varchar,
  	"left_column" jsonb,
  	"right_column" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "homepage_blocks_three_column_table_block_rows_columns" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "homepage_blocks_three_column_table_block_rows_columns_locales" (
  	"content" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "homepage_blocks_three_column_table_block_rows" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "homepage_blocks_three_column_table_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"column_widths" "enum_homepage_blocks_three_column_table_block_column_widths" DEFAULT 'f-t-t',
  	"block_name" varchar
  );
  
  CREATE TABLE "homepage_blocks_three_column_table_block_locales" (
  	"title" varchar,
  	"subtitle" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "_homepage_v_blocks_two_column_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_homepage_v_blocks_two_column_block_locales" (
  	"title" varchar,
  	"subtitle" varchar,
  	"left_column" jsonb,
  	"right_column" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_homepage_v_blocks_three_column_table_block_rows_columns" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_homepage_v_blocks_three_column_table_block_rows_columns_locales" (
  	"content" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_homepage_v_blocks_three_column_table_block_rows" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_homepage_v_blocks_three_column_table_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"column_widths" "enum__homepage_v_blocks_three_column_table_block_column_widths" DEFAULT 'f-t-t',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_homepage_v_blocks_three_column_table_block_locales" (
  	"title" varchar,
  	"subtitle" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  ALTER TABLE "grants_blocks_two_column_block" ADD CONSTRAINT "grants_blocks_two_column_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."grants"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "grants_blocks_two_column_block_locales" ADD CONSTRAINT "grants_blocks_two_column_block_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."grants_blocks_two_column_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "grants_blocks_three_column_table_block_rows_columns" ADD CONSTRAINT "grants_blocks_three_column_table_block_rows_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."grants_blocks_three_column_table_block_rows"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "grants_blocks_three_column_table_block_rows_columns_locales" ADD CONSTRAINT "grants_blocks_three_column_table_block_rows_columns_local_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."grants_blocks_three_column_table_block_rows_columns"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "grants_blocks_three_column_table_block_rows" ADD CONSTRAINT "grants_blocks_three_column_table_block_rows_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."grants_blocks_three_column_table_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "grants_blocks_three_column_table_block" ADD CONSTRAINT "grants_blocks_three_column_table_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."grants"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "grants_blocks_three_column_table_block_locales" ADD CONSTRAINT "grants_blocks_three_column_table_block_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."grants_blocks_three_column_table_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_grants_v_blocks_two_column_block" ADD CONSTRAINT "_grants_v_blocks_two_column_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_grants_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_grants_v_blocks_two_column_block_locales" ADD CONSTRAINT "_grants_v_blocks_two_column_block_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_grants_v_blocks_two_column_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_grants_v_blocks_three_column_table_block_rows_columns" ADD CONSTRAINT "_grants_v_blocks_three_column_table_block_rows_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_grants_v_blocks_three_column_table_block_rows"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_grants_v_blocks_three_column_table_block_rows_columns_locales" ADD CONSTRAINT "_grants_v_blocks_three_column_table_block_rows_columns_lo_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_grants_v_blocks_three_column_table_block_rows_columns"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_grants_v_blocks_three_column_table_block_rows" ADD CONSTRAINT "_grants_v_blocks_three_column_table_block_rows_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_grants_v_blocks_three_column_table_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_grants_v_blocks_three_column_table_block" ADD CONSTRAINT "_grants_v_blocks_three_column_table_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_grants_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_grants_v_blocks_three_column_table_block_locales" ADD CONSTRAINT "_grants_v_blocks_three_column_table_block_locales_parent__fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_grants_v_blocks_three_column_table_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_two_column_block" ADD CONSTRAINT "pages_blocks_two_column_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_two_column_block_locales" ADD CONSTRAINT "pages_blocks_two_column_block_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_two_column_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_three_column_table_block_rows_columns" ADD CONSTRAINT "pages_blocks_three_column_table_block_rows_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_three_column_table_block_rows"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_three_column_table_block_rows_columns_locales" ADD CONSTRAINT "pages_blocks_three_column_table_block_rows_columns_locale_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_three_column_table_block_rows_columns"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_three_column_table_block_rows" ADD CONSTRAINT "pages_blocks_three_column_table_block_rows_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_three_column_table_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_three_column_table_block" ADD CONSTRAINT "pages_blocks_three_column_table_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_three_column_table_block_locales" ADD CONSTRAINT "pages_blocks_three_column_table_block_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_three_column_table_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_two_column_block" ADD CONSTRAINT "_pages_v_blocks_two_column_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_two_column_block_locales" ADD CONSTRAINT "_pages_v_blocks_two_column_block_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_two_column_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_three_column_table_block_rows_columns" ADD CONSTRAINT "_pages_v_blocks_three_column_table_block_rows_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_three_column_table_block_rows"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_three_column_table_block_rows_columns_locales" ADD CONSTRAINT "_pages_v_blocks_three_column_table_block_rows_columns_loc_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_three_column_table_block_rows_columns"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_three_column_table_block_rows" ADD CONSTRAINT "_pages_v_blocks_three_column_table_block_rows_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_three_column_table_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_three_column_table_block" ADD CONSTRAINT "_pages_v_blocks_three_column_table_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_three_column_table_block_locales" ADD CONSTRAINT "_pages_v_blocks_three_column_table_block_locales_parent_i_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_three_column_table_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "blog_blocks_two_column_block" ADD CONSTRAINT "blog_blocks_two_column_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."blog"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "blog_blocks_two_column_block_locales" ADD CONSTRAINT "blog_blocks_two_column_block_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."blog_blocks_two_column_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "blog_blocks_three_column_table_block_rows_columns" ADD CONSTRAINT "blog_blocks_three_column_table_block_rows_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."blog_blocks_three_column_table_block_rows"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "blog_blocks_three_column_table_block_rows_columns_locales" ADD CONSTRAINT "blog_blocks_three_column_table_block_rows_columns_locales_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."blog_blocks_three_column_table_block_rows_columns"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "blog_blocks_three_column_table_block_rows" ADD CONSTRAINT "blog_blocks_three_column_table_block_rows_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."blog_blocks_three_column_table_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "blog_blocks_three_column_table_block" ADD CONSTRAINT "blog_blocks_three_column_table_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."blog"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "blog_blocks_three_column_table_block_locales" ADD CONSTRAINT "blog_blocks_three_column_table_block_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."blog_blocks_three_column_table_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_blog_v_blocks_two_column_block" ADD CONSTRAINT "_blog_v_blocks_two_column_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_blog_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_blog_v_blocks_two_column_block_locales" ADD CONSTRAINT "_blog_v_blocks_two_column_block_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_blog_v_blocks_two_column_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_blog_v_blocks_three_column_table_block_rows_columns" ADD CONSTRAINT "_blog_v_blocks_three_column_table_block_rows_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_blog_v_blocks_three_column_table_block_rows"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_blog_v_blocks_three_column_table_block_rows_columns_locales" ADD CONSTRAINT "_blog_v_blocks_three_column_table_block_rows_columns_loca_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_blog_v_blocks_three_column_table_block_rows_columns"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_blog_v_blocks_three_column_table_block_rows" ADD CONSTRAINT "_blog_v_blocks_three_column_table_block_rows_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_blog_v_blocks_three_column_table_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_blog_v_blocks_three_column_table_block" ADD CONSTRAINT "_blog_v_blocks_three_column_table_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_blog_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_blog_v_blocks_three_column_table_block_locales" ADD CONSTRAINT "_blog_v_blocks_three_column_table_block_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_blog_v_blocks_three_column_table_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "reports_blocks_two_column_block" ADD CONSTRAINT "reports_blocks_two_column_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."reports"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "reports_blocks_two_column_block_locales" ADD CONSTRAINT "reports_blocks_two_column_block_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."reports_blocks_two_column_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "reports_blocks_three_column_table_block_rows_columns" ADD CONSTRAINT "reports_blocks_three_column_table_block_rows_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."reports_blocks_three_column_table_block_rows"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "reports_blocks_three_column_table_block_rows_columns_locales" ADD CONSTRAINT "reports_blocks_three_column_table_block_rows_columns_loca_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."reports_blocks_three_column_table_block_rows_columns"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "reports_blocks_three_column_table_block_rows" ADD CONSTRAINT "reports_blocks_three_column_table_block_rows_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."reports_blocks_three_column_table_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "reports_blocks_three_column_table_block" ADD CONSTRAINT "reports_blocks_three_column_table_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."reports"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "reports_blocks_three_column_table_block_locales" ADD CONSTRAINT "reports_blocks_three_column_table_block_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."reports_blocks_three_column_table_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_reports_v_blocks_two_column_block" ADD CONSTRAINT "_reports_v_blocks_two_column_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_reports_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_reports_v_blocks_two_column_block_locales" ADD CONSTRAINT "_reports_v_blocks_two_column_block_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_reports_v_blocks_two_column_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_reports_v_blocks_three_column_table_block_rows_columns" ADD CONSTRAINT "_reports_v_blocks_three_column_table_block_rows_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_reports_v_blocks_three_column_table_block_rows"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_reports_v_blocks_three_column_table_block_rows_columns_locales" ADD CONSTRAINT "_reports_v_blocks_three_column_table_block_rows_columns_l_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_reports_v_blocks_three_column_table_block_rows_columns"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_reports_v_blocks_three_column_table_block_rows" ADD CONSTRAINT "_reports_v_blocks_three_column_table_block_rows_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_reports_v_blocks_three_column_table_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_reports_v_blocks_three_column_table_block" ADD CONSTRAINT "_reports_v_blocks_three_column_table_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_reports_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_reports_v_blocks_three_column_table_block_locales" ADD CONSTRAINT "_reports_v_blocks_three_column_table_block_locales_parent_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_reports_v_blocks_three_column_table_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "mmedia_blocks_two_column_block" ADD CONSTRAINT "mmedia_blocks_two_column_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."mmedia"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "mmedia_blocks_two_column_block_locales" ADD CONSTRAINT "mmedia_blocks_two_column_block_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."mmedia_blocks_two_column_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "mmedia_blocks_three_column_table_block_rows_columns" ADD CONSTRAINT "mmedia_blocks_three_column_table_block_rows_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."mmedia_blocks_three_column_table_block_rows"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "mmedia_blocks_three_column_table_block_rows_columns_locales" ADD CONSTRAINT "mmedia_blocks_three_column_table_block_rows_columns_local_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."mmedia_blocks_three_column_table_block_rows_columns"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "mmedia_blocks_three_column_table_block_rows" ADD CONSTRAINT "mmedia_blocks_three_column_table_block_rows_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."mmedia_blocks_three_column_table_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "mmedia_blocks_three_column_table_block" ADD CONSTRAINT "mmedia_blocks_three_column_table_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."mmedia"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "mmedia_blocks_three_column_table_block_locales" ADD CONSTRAINT "mmedia_blocks_three_column_table_block_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."mmedia_blocks_three_column_table_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_mmedia_v_blocks_two_column_block" ADD CONSTRAINT "_mmedia_v_blocks_two_column_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_mmedia_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_mmedia_v_blocks_two_column_block_locales" ADD CONSTRAINT "_mmedia_v_blocks_two_column_block_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_mmedia_v_blocks_two_column_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_mmedia_v_blocks_three_column_table_block_rows_columns" ADD CONSTRAINT "_mmedia_v_blocks_three_column_table_block_rows_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_mmedia_v_blocks_three_column_table_block_rows"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_mmedia_v_blocks_three_column_table_block_rows_columns_locales" ADD CONSTRAINT "_mmedia_v_blocks_three_column_table_block_rows_columns_lo_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_mmedia_v_blocks_three_column_table_block_rows_columns"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_mmedia_v_blocks_three_column_table_block_rows" ADD CONSTRAINT "_mmedia_v_blocks_three_column_table_block_rows_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_mmedia_v_blocks_three_column_table_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_mmedia_v_blocks_three_column_table_block" ADD CONSTRAINT "_mmedia_v_blocks_three_column_table_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_mmedia_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_mmedia_v_blocks_three_column_table_block_locales" ADD CONSTRAINT "_mmedia_v_blocks_three_column_table_block_locales_parent__fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_mmedia_v_blocks_three_column_table_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_blocks_two_column_block" ADD CONSTRAINT "homepage_blocks_two_column_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_blocks_two_column_block_locales" ADD CONSTRAINT "homepage_blocks_two_column_block_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage_blocks_two_column_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_blocks_three_column_table_block_rows_columns" ADD CONSTRAINT "homepage_blocks_three_column_table_block_rows_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage_blocks_three_column_table_block_rows"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_blocks_three_column_table_block_rows_columns_locales" ADD CONSTRAINT "homepage_blocks_three_column_table_block_rows_columns_loc_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage_blocks_three_column_table_block_rows_columns"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_blocks_three_column_table_block_rows" ADD CONSTRAINT "homepage_blocks_three_column_table_block_rows_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage_blocks_three_column_table_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_blocks_three_column_table_block" ADD CONSTRAINT "homepage_blocks_three_column_table_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_blocks_three_column_table_block_locales" ADD CONSTRAINT "homepage_blocks_three_column_table_block_locales_parent_i_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage_blocks_three_column_table_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_homepage_v_blocks_two_column_block" ADD CONSTRAINT "_homepage_v_blocks_two_column_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_homepage_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_homepage_v_blocks_two_column_block_locales" ADD CONSTRAINT "_homepage_v_blocks_two_column_block_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_homepage_v_blocks_two_column_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_homepage_v_blocks_three_column_table_block_rows_columns" ADD CONSTRAINT "_homepage_v_blocks_three_column_table_block_rows_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_homepage_v_blocks_three_column_table_block_rows"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_homepage_v_blocks_three_column_table_block_rows_columns_locales" ADD CONSTRAINT "_homepage_v_blocks_three_column_table_block_rows_columns__fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_homepage_v_blocks_three_column_table_block_rows_columns"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_homepage_v_blocks_three_column_table_block_rows" ADD CONSTRAINT "_homepage_v_blocks_three_column_table_block_rows_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_homepage_v_blocks_three_column_table_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_homepage_v_blocks_three_column_table_block" ADD CONSTRAINT "_homepage_v_blocks_three_column_table_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_homepage_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_homepage_v_blocks_three_column_table_block_locales" ADD CONSTRAINT "_homepage_v_blocks_three_column_table_block_locales_paren_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_homepage_v_blocks_three_column_table_block"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "grants_blocks_two_column_block_order_idx" ON "grants_blocks_two_column_block" USING btree ("_order");
  CREATE INDEX "grants_blocks_two_column_block_parent_id_idx" ON "grants_blocks_two_column_block" USING btree ("_parent_id");
  CREATE INDEX "grants_blocks_two_column_block_path_idx" ON "grants_blocks_two_column_block" USING btree ("_path");
  CREATE UNIQUE INDEX "grants_blocks_two_column_block_locales_locale_parent_id_uniq" ON "grants_blocks_two_column_block_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "grants_blocks_three_column_table_block_rows_columns_order_idx" ON "grants_blocks_three_column_table_block_rows_columns" USING btree ("_order");
  CREATE INDEX "grants_blocks_three_column_table_block_rows_columns_parent_id_idx" ON "grants_blocks_three_column_table_block_rows_columns" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "grants_blocks_three_column_table_block_rows_columns_locales_" ON "grants_blocks_three_column_table_block_rows_columns_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "grants_blocks_three_column_table_block_rows_order_idx" ON "grants_blocks_three_column_table_block_rows" USING btree ("_order");
  CREATE INDEX "grants_blocks_three_column_table_block_rows_parent_id_idx" ON "grants_blocks_three_column_table_block_rows" USING btree ("_parent_id");
  CREATE INDEX "grants_blocks_three_column_table_block_order_idx" ON "grants_blocks_three_column_table_block" USING btree ("_order");
  CREATE INDEX "grants_blocks_three_column_table_block_parent_id_idx" ON "grants_blocks_three_column_table_block" USING btree ("_parent_id");
  CREATE INDEX "grants_blocks_three_column_table_block_path_idx" ON "grants_blocks_three_column_table_block" USING btree ("_path");
  CREATE UNIQUE INDEX "grants_blocks_three_column_table_block_locales_locale_parent" ON "grants_blocks_three_column_table_block_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_grants_v_blocks_two_column_block_order_idx" ON "_grants_v_blocks_two_column_block" USING btree ("_order");
  CREATE INDEX "_grants_v_blocks_two_column_block_parent_id_idx" ON "_grants_v_blocks_two_column_block" USING btree ("_parent_id");
  CREATE INDEX "_grants_v_blocks_two_column_block_path_idx" ON "_grants_v_blocks_two_column_block" USING btree ("_path");
  CREATE UNIQUE INDEX "_grants_v_blocks_two_column_block_locales_locale_parent_id_u" ON "_grants_v_blocks_two_column_block_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_grants_v_blocks_three_column_table_block_rows_columns_order_idx" ON "_grants_v_blocks_three_column_table_block_rows_columns" USING btree ("_order");
  CREATE INDEX "_grants_v_blocks_three_column_table_block_rows_columns_parent_id_idx" ON "_grants_v_blocks_three_column_table_block_rows_columns" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_grants_v_blocks_three_column_table_block_rows_columns_local" ON "_grants_v_blocks_three_column_table_block_rows_columns_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_grants_v_blocks_three_column_table_block_rows_order_idx" ON "_grants_v_blocks_three_column_table_block_rows" USING btree ("_order");
  CREATE INDEX "_grants_v_blocks_three_column_table_block_rows_parent_id_idx" ON "_grants_v_blocks_three_column_table_block_rows" USING btree ("_parent_id");
  CREATE INDEX "_grants_v_blocks_three_column_table_block_order_idx" ON "_grants_v_blocks_three_column_table_block" USING btree ("_order");
  CREATE INDEX "_grants_v_blocks_three_column_table_block_parent_id_idx" ON "_grants_v_blocks_three_column_table_block" USING btree ("_parent_id");
  CREATE INDEX "_grants_v_blocks_three_column_table_block_path_idx" ON "_grants_v_blocks_three_column_table_block" USING btree ("_path");
  CREATE UNIQUE INDEX "_grants_v_blocks_three_column_table_block_locales_locale_par" ON "_grants_v_blocks_three_column_table_block_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_two_column_block_order_idx" ON "pages_blocks_two_column_block" USING btree ("_order");
  CREATE INDEX "pages_blocks_two_column_block_parent_id_idx" ON "pages_blocks_two_column_block" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_two_column_block_path_idx" ON "pages_blocks_two_column_block" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_blocks_two_column_block_locales_locale_parent_id_uniqu" ON "pages_blocks_two_column_block_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_three_column_table_block_rows_columns_order_idx" ON "pages_blocks_three_column_table_block_rows_columns" USING btree ("_order");
  CREATE INDEX "pages_blocks_three_column_table_block_rows_columns_parent_id_idx" ON "pages_blocks_three_column_table_block_rows_columns" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_three_column_table_block_rows_columns_locales_l" ON "pages_blocks_three_column_table_block_rows_columns_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_three_column_table_block_rows_order_idx" ON "pages_blocks_three_column_table_block_rows" USING btree ("_order");
  CREATE INDEX "pages_blocks_three_column_table_block_rows_parent_id_idx" ON "pages_blocks_three_column_table_block_rows" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_three_column_table_block_order_idx" ON "pages_blocks_three_column_table_block" USING btree ("_order");
  CREATE INDEX "pages_blocks_three_column_table_block_parent_id_idx" ON "pages_blocks_three_column_table_block" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_three_column_table_block_path_idx" ON "pages_blocks_three_column_table_block" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_blocks_three_column_table_block_locales_locale_parent_" ON "pages_blocks_three_column_table_block_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_two_column_block_order_idx" ON "_pages_v_blocks_two_column_block" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_two_column_block_parent_id_idx" ON "_pages_v_blocks_two_column_block" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_two_column_block_path_idx" ON "_pages_v_blocks_two_column_block" USING btree ("_path");
  CREATE UNIQUE INDEX "_pages_v_blocks_two_column_block_locales_locale_parent_id_un" ON "_pages_v_blocks_two_column_block_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_three_column_table_block_rows_columns_order_idx" ON "_pages_v_blocks_three_column_table_block_rows_columns" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_three_column_table_block_rows_columns_parent_id_idx" ON "_pages_v_blocks_three_column_table_block_rows_columns" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_three_column_table_block_rows_columns_locale" ON "_pages_v_blocks_three_column_table_block_rows_columns_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_three_column_table_block_rows_order_idx" ON "_pages_v_blocks_three_column_table_block_rows" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_three_column_table_block_rows_parent_id_idx" ON "_pages_v_blocks_three_column_table_block_rows" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_three_column_table_block_order_idx" ON "_pages_v_blocks_three_column_table_block" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_three_column_table_block_parent_id_idx" ON "_pages_v_blocks_three_column_table_block" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_three_column_table_block_path_idx" ON "_pages_v_blocks_three_column_table_block" USING btree ("_path");
  CREATE UNIQUE INDEX "_pages_v_blocks_three_column_table_block_locales_locale_pare" ON "_pages_v_blocks_three_column_table_block_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "blog_blocks_two_column_block_order_idx" ON "blog_blocks_two_column_block" USING btree ("_order");
  CREATE INDEX "blog_blocks_two_column_block_parent_id_idx" ON "blog_blocks_two_column_block" USING btree ("_parent_id");
  CREATE INDEX "blog_blocks_two_column_block_path_idx" ON "blog_blocks_two_column_block" USING btree ("_path");
  CREATE UNIQUE INDEX "blog_blocks_two_column_block_locales_locale_parent_id_unique" ON "blog_blocks_two_column_block_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "blog_blocks_three_column_table_block_rows_columns_order_idx" ON "blog_blocks_three_column_table_block_rows_columns" USING btree ("_order");
  CREATE INDEX "blog_blocks_three_column_table_block_rows_columns_parent_id_idx" ON "blog_blocks_three_column_table_block_rows_columns" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "blog_blocks_three_column_table_block_rows_columns_locales_lo" ON "blog_blocks_three_column_table_block_rows_columns_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "blog_blocks_three_column_table_block_rows_order_idx" ON "blog_blocks_three_column_table_block_rows" USING btree ("_order");
  CREATE INDEX "blog_blocks_three_column_table_block_rows_parent_id_idx" ON "blog_blocks_three_column_table_block_rows" USING btree ("_parent_id");
  CREATE INDEX "blog_blocks_three_column_table_block_order_idx" ON "blog_blocks_three_column_table_block" USING btree ("_order");
  CREATE INDEX "blog_blocks_three_column_table_block_parent_id_idx" ON "blog_blocks_three_column_table_block" USING btree ("_parent_id");
  CREATE INDEX "blog_blocks_three_column_table_block_path_idx" ON "blog_blocks_three_column_table_block" USING btree ("_path");
  CREATE UNIQUE INDEX "blog_blocks_three_column_table_block_locales_locale_parent_i" ON "blog_blocks_three_column_table_block_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_blog_v_blocks_two_column_block_order_idx" ON "_blog_v_blocks_two_column_block" USING btree ("_order");
  CREATE INDEX "_blog_v_blocks_two_column_block_parent_id_idx" ON "_blog_v_blocks_two_column_block" USING btree ("_parent_id");
  CREATE INDEX "_blog_v_blocks_two_column_block_path_idx" ON "_blog_v_blocks_two_column_block" USING btree ("_path");
  CREATE UNIQUE INDEX "_blog_v_blocks_two_column_block_locales_locale_parent_id_uni" ON "_blog_v_blocks_two_column_block_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_blog_v_blocks_three_column_table_block_rows_columns_order_idx" ON "_blog_v_blocks_three_column_table_block_rows_columns" USING btree ("_order");
  CREATE INDEX "_blog_v_blocks_three_column_table_block_rows_columns_parent_id_idx" ON "_blog_v_blocks_three_column_table_block_rows_columns" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_blog_v_blocks_three_column_table_block_rows_columns_local_1" ON "_blog_v_blocks_three_column_table_block_rows_columns_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_blog_v_blocks_three_column_table_block_rows_order_idx" ON "_blog_v_blocks_three_column_table_block_rows" USING btree ("_order");
  CREATE INDEX "_blog_v_blocks_three_column_table_block_rows_parent_id_idx" ON "_blog_v_blocks_three_column_table_block_rows" USING btree ("_parent_id");
  CREATE INDEX "_blog_v_blocks_three_column_table_block_order_idx" ON "_blog_v_blocks_three_column_table_block" USING btree ("_order");
  CREATE INDEX "_blog_v_blocks_three_column_table_block_parent_id_idx" ON "_blog_v_blocks_three_column_table_block" USING btree ("_parent_id");
  CREATE INDEX "_blog_v_blocks_three_column_table_block_path_idx" ON "_blog_v_blocks_three_column_table_block" USING btree ("_path");
  CREATE UNIQUE INDEX "_blog_v_blocks_three_column_table_block_locales_locale_paren" ON "_blog_v_blocks_three_column_table_block_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "reports_blocks_two_column_block_order_idx" ON "reports_blocks_two_column_block" USING btree ("_order");
  CREATE INDEX "reports_blocks_two_column_block_parent_id_idx" ON "reports_blocks_two_column_block" USING btree ("_parent_id");
  CREATE INDEX "reports_blocks_two_column_block_path_idx" ON "reports_blocks_two_column_block" USING btree ("_path");
  CREATE UNIQUE INDEX "reports_blocks_two_column_block_locales_locale_parent_id_uni" ON "reports_blocks_two_column_block_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "reports_blocks_three_column_table_block_rows_columns_order_idx" ON "reports_blocks_three_column_table_block_rows_columns" USING btree ("_order");
  CREATE INDEX "reports_blocks_three_column_table_block_rows_columns_parent_id_idx" ON "reports_blocks_three_column_table_block_rows_columns" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "reports_blocks_three_column_table_block_rows_columns_local_1" ON "reports_blocks_three_column_table_block_rows_columns_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "reports_blocks_three_column_table_block_rows_order_idx" ON "reports_blocks_three_column_table_block_rows" USING btree ("_order");
  CREATE INDEX "reports_blocks_three_column_table_block_rows_parent_id_idx" ON "reports_blocks_three_column_table_block_rows" USING btree ("_parent_id");
  CREATE INDEX "reports_blocks_three_column_table_block_order_idx" ON "reports_blocks_three_column_table_block" USING btree ("_order");
  CREATE INDEX "reports_blocks_three_column_table_block_parent_id_idx" ON "reports_blocks_three_column_table_block" USING btree ("_parent_id");
  CREATE INDEX "reports_blocks_three_column_table_block_path_idx" ON "reports_blocks_three_column_table_block" USING btree ("_path");
  CREATE UNIQUE INDEX "reports_blocks_three_column_table_block_locales_locale_paren" ON "reports_blocks_three_column_table_block_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_reports_v_blocks_two_column_block_order_idx" ON "_reports_v_blocks_two_column_block" USING btree ("_order");
  CREATE INDEX "_reports_v_blocks_two_column_block_parent_id_idx" ON "_reports_v_blocks_two_column_block" USING btree ("_parent_id");
  CREATE INDEX "_reports_v_blocks_two_column_block_path_idx" ON "_reports_v_blocks_two_column_block" USING btree ("_path");
  CREATE UNIQUE INDEX "_reports_v_blocks_two_column_block_locales_locale_parent_id_" ON "_reports_v_blocks_two_column_block_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_reports_v_blocks_three_column_table_block_rows_columns_order_idx" ON "_reports_v_blocks_three_column_table_block_rows_columns" USING btree ("_order");
  CREATE INDEX "_reports_v_blocks_three_column_table_block_rows_columns_parent_id_idx" ON "_reports_v_blocks_three_column_table_block_rows_columns" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_reports_v_blocks_three_column_table_block_rows_columns_loca" ON "_reports_v_blocks_three_column_table_block_rows_columns_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_reports_v_blocks_three_column_table_block_rows_order_idx" ON "_reports_v_blocks_three_column_table_block_rows" USING btree ("_order");
  CREATE INDEX "_reports_v_blocks_three_column_table_block_rows_parent_id_idx" ON "_reports_v_blocks_three_column_table_block_rows" USING btree ("_parent_id");
  CREATE INDEX "_reports_v_blocks_three_column_table_block_order_idx" ON "_reports_v_blocks_three_column_table_block" USING btree ("_order");
  CREATE INDEX "_reports_v_blocks_three_column_table_block_parent_id_idx" ON "_reports_v_blocks_three_column_table_block" USING btree ("_parent_id");
  CREATE INDEX "_reports_v_blocks_three_column_table_block_path_idx" ON "_reports_v_blocks_three_column_table_block" USING btree ("_path");
  CREATE UNIQUE INDEX "_reports_v_blocks_three_column_table_block_locales_locale_pa" ON "_reports_v_blocks_three_column_table_block_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "mmedia_blocks_two_column_block_order_idx" ON "mmedia_blocks_two_column_block" USING btree ("_order");
  CREATE INDEX "mmedia_blocks_two_column_block_parent_id_idx" ON "mmedia_blocks_two_column_block" USING btree ("_parent_id");
  CREATE INDEX "mmedia_blocks_two_column_block_path_idx" ON "mmedia_blocks_two_column_block" USING btree ("_path");
  CREATE UNIQUE INDEX "mmedia_blocks_two_column_block_locales_locale_parent_id_uniq" ON "mmedia_blocks_two_column_block_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "mmedia_blocks_three_column_table_block_rows_columns_order_idx" ON "mmedia_blocks_three_column_table_block_rows_columns" USING btree ("_order");
  CREATE INDEX "mmedia_blocks_three_column_table_block_rows_columns_parent_id_idx" ON "mmedia_blocks_three_column_table_block_rows_columns" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "mmedia_blocks_three_column_table_block_rows_columns_locales_" ON "mmedia_blocks_three_column_table_block_rows_columns_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "mmedia_blocks_three_column_table_block_rows_order_idx" ON "mmedia_blocks_three_column_table_block_rows" USING btree ("_order");
  CREATE INDEX "mmedia_blocks_three_column_table_block_rows_parent_id_idx" ON "mmedia_blocks_three_column_table_block_rows" USING btree ("_parent_id");
  CREATE INDEX "mmedia_blocks_three_column_table_block_order_idx" ON "mmedia_blocks_three_column_table_block" USING btree ("_order");
  CREATE INDEX "mmedia_blocks_three_column_table_block_parent_id_idx" ON "mmedia_blocks_three_column_table_block" USING btree ("_parent_id");
  CREATE INDEX "mmedia_blocks_three_column_table_block_path_idx" ON "mmedia_blocks_three_column_table_block" USING btree ("_path");
  CREATE UNIQUE INDEX "mmedia_blocks_three_column_table_block_locales_locale_parent" ON "mmedia_blocks_three_column_table_block_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_mmedia_v_blocks_two_column_block_order_idx" ON "_mmedia_v_blocks_two_column_block" USING btree ("_order");
  CREATE INDEX "_mmedia_v_blocks_two_column_block_parent_id_idx" ON "_mmedia_v_blocks_two_column_block" USING btree ("_parent_id");
  CREATE INDEX "_mmedia_v_blocks_two_column_block_path_idx" ON "_mmedia_v_blocks_two_column_block" USING btree ("_path");
  CREATE UNIQUE INDEX "_mmedia_v_blocks_two_column_block_locales_locale_parent_id_u" ON "_mmedia_v_blocks_two_column_block_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_mmedia_v_blocks_three_column_table_block_rows_columns_order_idx" ON "_mmedia_v_blocks_three_column_table_block_rows_columns" USING btree ("_order");
  CREATE INDEX "_mmedia_v_blocks_three_column_table_block_rows_columns_parent_id_idx" ON "_mmedia_v_blocks_three_column_table_block_rows_columns" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_mmedia_v_blocks_three_column_table_block_rows_columns_local" ON "_mmedia_v_blocks_three_column_table_block_rows_columns_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_mmedia_v_blocks_three_column_table_block_rows_order_idx" ON "_mmedia_v_blocks_three_column_table_block_rows" USING btree ("_order");
  CREATE INDEX "_mmedia_v_blocks_three_column_table_block_rows_parent_id_idx" ON "_mmedia_v_blocks_three_column_table_block_rows" USING btree ("_parent_id");
  CREATE INDEX "_mmedia_v_blocks_three_column_table_block_order_idx" ON "_mmedia_v_blocks_three_column_table_block" USING btree ("_order");
  CREATE INDEX "_mmedia_v_blocks_three_column_table_block_parent_id_idx" ON "_mmedia_v_blocks_three_column_table_block" USING btree ("_parent_id");
  CREATE INDEX "_mmedia_v_blocks_three_column_table_block_path_idx" ON "_mmedia_v_blocks_three_column_table_block" USING btree ("_path");
  CREATE UNIQUE INDEX "_mmedia_v_blocks_three_column_table_block_locales_locale_par" ON "_mmedia_v_blocks_three_column_table_block_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "homepage_blocks_two_column_block_order_idx" ON "homepage_blocks_two_column_block" USING btree ("_order");
  CREATE INDEX "homepage_blocks_two_column_block_parent_id_idx" ON "homepage_blocks_two_column_block" USING btree ("_parent_id");
  CREATE INDEX "homepage_blocks_two_column_block_path_idx" ON "homepage_blocks_two_column_block" USING btree ("_path");
  CREATE UNIQUE INDEX "homepage_blocks_two_column_block_locales_locale_parent_id_un" ON "homepage_blocks_two_column_block_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "homepage_blocks_three_column_table_block_rows_columns_order_idx" ON "homepage_blocks_three_column_table_block_rows_columns" USING btree ("_order");
  CREATE INDEX "homepage_blocks_three_column_table_block_rows_columns_parent_id_idx" ON "homepage_blocks_three_column_table_block_rows_columns" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "homepage_blocks_three_column_table_block_rows_columns_locale" ON "homepage_blocks_three_column_table_block_rows_columns_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "homepage_blocks_three_column_table_block_rows_order_idx" ON "homepage_blocks_three_column_table_block_rows" USING btree ("_order");
  CREATE INDEX "homepage_blocks_three_column_table_block_rows_parent_id_idx" ON "homepage_blocks_three_column_table_block_rows" USING btree ("_parent_id");
  CREATE INDEX "homepage_blocks_three_column_table_block_order_idx" ON "homepage_blocks_three_column_table_block" USING btree ("_order");
  CREATE INDEX "homepage_blocks_three_column_table_block_parent_id_idx" ON "homepage_blocks_three_column_table_block" USING btree ("_parent_id");
  CREATE INDEX "homepage_blocks_three_column_table_block_path_idx" ON "homepage_blocks_three_column_table_block" USING btree ("_path");
  CREATE UNIQUE INDEX "homepage_blocks_three_column_table_block_locales_locale_pare" ON "homepage_blocks_three_column_table_block_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_homepage_v_blocks_two_column_block_order_idx" ON "_homepage_v_blocks_two_column_block" USING btree ("_order");
  CREATE INDEX "_homepage_v_blocks_two_column_block_parent_id_idx" ON "_homepage_v_blocks_two_column_block" USING btree ("_parent_id");
  CREATE INDEX "_homepage_v_blocks_two_column_block_path_idx" ON "_homepage_v_blocks_two_column_block" USING btree ("_path");
  CREATE UNIQUE INDEX "_homepage_v_blocks_two_column_block_locales_locale_parent_id" ON "_homepage_v_blocks_two_column_block_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_homepage_v_blocks_three_column_table_block_rows_columns_order_idx" ON "_homepage_v_blocks_three_column_table_block_rows_columns" USING btree ("_order");
  CREATE INDEX "_homepage_v_blocks_three_column_table_block_rows_columns_parent_id_idx" ON "_homepage_v_blocks_three_column_table_block_rows_columns" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_homepage_v_blocks_three_column_table_block_rows_columns_loc" ON "_homepage_v_blocks_three_column_table_block_rows_columns_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_homepage_v_blocks_three_column_table_block_rows_order_idx" ON "_homepage_v_blocks_three_column_table_block_rows" USING btree ("_order");
  CREATE INDEX "_homepage_v_blocks_three_column_table_block_rows_parent_id_idx" ON "_homepage_v_blocks_three_column_table_block_rows" USING btree ("_parent_id");
  CREATE INDEX "_homepage_v_blocks_three_column_table_block_order_idx" ON "_homepage_v_blocks_three_column_table_block" USING btree ("_order");
  CREATE INDEX "_homepage_v_blocks_three_column_table_block_parent_id_idx" ON "_homepage_v_blocks_three_column_table_block" USING btree ("_parent_id");
  CREATE INDEX "_homepage_v_blocks_three_column_table_block_path_idx" ON "_homepage_v_blocks_three_column_table_block" USING btree ("_path");
  CREATE UNIQUE INDEX "_homepage_v_blocks_three_column_table_block_locales_locale_p" ON "_homepage_v_blocks_three_column_table_block_locales" USING btree ("_locale","_parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "grants_blocks_two_column_block" CASCADE;
  DROP TABLE "grants_blocks_two_column_block_locales" CASCADE;
  DROP TABLE "grants_blocks_three_column_table_block_rows_columns" CASCADE;
  DROP TABLE "grants_blocks_three_column_table_block_rows_columns_locales" CASCADE;
  DROP TABLE "grants_blocks_three_column_table_block_rows" CASCADE;
  DROP TABLE "grants_blocks_three_column_table_block" CASCADE;
  DROP TABLE "grants_blocks_three_column_table_block_locales" CASCADE;
  DROP TABLE "_grants_v_blocks_two_column_block" CASCADE;
  DROP TABLE "_grants_v_blocks_two_column_block_locales" CASCADE;
  DROP TABLE "_grants_v_blocks_three_column_table_block_rows_columns" CASCADE;
  DROP TABLE "_grants_v_blocks_three_column_table_block_rows_columns_locales" CASCADE;
  DROP TABLE "_grants_v_blocks_three_column_table_block_rows" CASCADE;
  DROP TABLE "_grants_v_blocks_three_column_table_block" CASCADE;
  DROP TABLE "_grants_v_blocks_three_column_table_block_locales" CASCADE;
  DROP TABLE "pages_blocks_two_column_block" CASCADE;
  DROP TABLE "pages_blocks_two_column_block_locales" CASCADE;
  DROP TABLE "pages_blocks_three_column_table_block_rows_columns" CASCADE;
  DROP TABLE "pages_blocks_three_column_table_block_rows_columns_locales" CASCADE;
  DROP TABLE "pages_blocks_three_column_table_block_rows" CASCADE;
  DROP TABLE "pages_blocks_three_column_table_block" CASCADE;
  DROP TABLE "pages_blocks_three_column_table_block_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_two_column_block" CASCADE;
  DROP TABLE "_pages_v_blocks_two_column_block_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_three_column_table_block_rows_columns" CASCADE;
  DROP TABLE "_pages_v_blocks_three_column_table_block_rows_columns_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_three_column_table_block_rows" CASCADE;
  DROP TABLE "_pages_v_blocks_three_column_table_block" CASCADE;
  DROP TABLE "_pages_v_blocks_three_column_table_block_locales" CASCADE;
  DROP TABLE "blog_blocks_two_column_block" CASCADE;
  DROP TABLE "blog_blocks_two_column_block_locales" CASCADE;
  DROP TABLE "blog_blocks_three_column_table_block_rows_columns" CASCADE;
  DROP TABLE "blog_blocks_three_column_table_block_rows_columns_locales" CASCADE;
  DROP TABLE "blog_blocks_three_column_table_block_rows" CASCADE;
  DROP TABLE "blog_blocks_three_column_table_block" CASCADE;
  DROP TABLE "blog_blocks_three_column_table_block_locales" CASCADE;
  DROP TABLE "_blog_v_blocks_two_column_block" CASCADE;
  DROP TABLE "_blog_v_blocks_two_column_block_locales" CASCADE;
  DROP TABLE "_blog_v_blocks_three_column_table_block_rows_columns" CASCADE;
  DROP TABLE "_blog_v_blocks_three_column_table_block_rows_columns_locales" CASCADE;
  DROP TABLE "_blog_v_blocks_three_column_table_block_rows" CASCADE;
  DROP TABLE "_blog_v_blocks_three_column_table_block" CASCADE;
  DROP TABLE "_blog_v_blocks_three_column_table_block_locales" CASCADE;
  DROP TABLE "reports_blocks_two_column_block" CASCADE;
  DROP TABLE "reports_blocks_two_column_block_locales" CASCADE;
  DROP TABLE "reports_blocks_three_column_table_block_rows_columns" CASCADE;
  DROP TABLE "reports_blocks_three_column_table_block_rows_columns_locales" CASCADE;
  DROP TABLE "reports_blocks_three_column_table_block_rows" CASCADE;
  DROP TABLE "reports_blocks_three_column_table_block" CASCADE;
  DROP TABLE "reports_blocks_three_column_table_block_locales" CASCADE;
  DROP TABLE "_reports_v_blocks_two_column_block" CASCADE;
  DROP TABLE "_reports_v_blocks_two_column_block_locales" CASCADE;
  DROP TABLE "_reports_v_blocks_three_column_table_block_rows_columns" CASCADE;
  DROP TABLE "_reports_v_blocks_three_column_table_block_rows_columns_locales" CASCADE;
  DROP TABLE "_reports_v_blocks_three_column_table_block_rows" CASCADE;
  DROP TABLE "_reports_v_blocks_three_column_table_block" CASCADE;
  DROP TABLE "_reports_v_blocks_three_column_table_block_locales" CASCADE;
  DROP TABLE "mmedia_blocks_two_column_block" CASCADE;
  DROP TABLE "mmedia_blocks_two_column_block_locales" CASCADE;
  DROP TABLE "mmedia_blocks_three_column_table_block_rows_columns" CASCADE;
  DROP TABLE "mmedia_blocks_three_column_table_block_rows_columns_locales" CASCADE;
  DROP TABLE "mmedia_blocks_three_column_table_block_rows" CASCADE;
  DROP TABLE "mmedia_blocks_three_column_table_block" CASCADE;
  DROP TABLE "mmedia_blocks_three_column_table_block_locales" CASCADE;
  DROP TABLE "_mmedia_v_blocks_two_column_block" CASCADE;
  DROP TABLE "_mmedia_v_blocks_two_column_block_locales" CASCADE;
  DROP TABLE "_mmedia_v_blocks_three_column_table_block_rows_columns" CASCADE;
  DROP TABLE "_mmedia_v_blocks_three_column_table_block_rows_columns_locales" CASCADE;
  DROP TABLE "_mmedia_v_blocks_three_column_table_block_rows" CASCADE;
  DROP TABLE "_mmedia_v_blocks_three_column_table_block" CASCADE;
  DROP TABLE "_mmedia_v_blocks_three_column_table_block_locales" CASCADE;
  DROP TABLE "homepage_blocks_two_column_block" CASCADE;
  DROP TABLE "homepage_blocks_two_column_block_locales" CASCADE;
  DROP TABLE "homepage_blocks_three_column_table_block_rows_columns" CASCADE;
  DROP TABLE "homepage_blocks_three_column_table_block_rows_columns_locales" CASCADE;
  DROP TABLE "homepage_blocks_three_column_table_block_rows" CASCADE;
  DROP TABLE "homepage_blocks_three_column_table_block" CASCADE;
  DROP TABLE "homepage_blocks_three_column_table_block_locales" CASCADE;
  DROP TABLE "_homepage_v_blocks_two_column_block" CASCADE;
  DROP TABLE "_homepage_v_blocks_two_column_block_locales" CASCADE;
  DROP TABLE "_homepage_v_blocks_three_column_table_block_rows_columns" CASCADE;
  DROP TABLE "_homepage_v_blocks_three_column_table_block_rows_columns_locales" CASCADE;
  DROP TABLE "_homepage_v_blocks_three_column_table_block_rows" CASCADE;
  DROP TABLE "_homepage_v_blocks_three_column_table_block" CASCADE;
  DROP TABLE "_homepage_v_blocks_three_column_table_block_locales" CASCADE;
  DROP TYPE "public"."enum_grants_blocks_three_column_table_block_column_widths";
  DROP TYPE "public"."enum__grants_v_blocks_three_column_table_block_column_widths";
  DROP TYPE "public"."enum_pages_blocks_three_column_table_block_column_widths";
  DROP TYPE "public"."enum__pages_v_blocks_three_column_table_block_column_widths";
  DROP TYPE "public"."enum_blog_blocks_three_column_table_block_column_widths";
  DROP TYPE "public"."enum__blog_v_blocks_three_column_table_block_column_widths";
  DROP TYPE "public"."enum_reports_blocks_three_column_table_block_column_widths";
  DROP TYPE "public"."enum__reports_v_blocks_three_column_table_block_column_widths";
  DROP TYPE "public"."enum_mmedia_blocks_three_column_table_block_column_widths";
  DROP TYPE "public"."enum__mmedia_v_blocks_three_column_table_block_column_widths";
  DROP TYPE "public"."enum_homepage_blocks_three_column_table_block_column_widths";
  DROP TYPE "public"."enum__homepage_v_blocks_three_column_table_block_column_widths";`)
}
