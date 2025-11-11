import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_grants_blocks_secondarycta_cta_button_link_type" AS ENUM('reference', 'custom', 'email', 'document');
  CREATE TYPE "public"."enum__grants_v_blocks_secondarycta_cta_button_link_type" AS ENUM('reference', 'custom', 'email', 'document');
  CREATE TABLE "grants_blocks_secondarycta_cta_button" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_grants_blocks_secondarycta_cta_button_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_download_link" boolean,
  	"link_arrow_link" boolean,
  	"link_pill_solid" boolean,
  	"link_pill_outline" boolean,
  	"link_url" varchar,
  	"link_email" varchar
  );
  
  CREATE TABLE "grants_blocks_secondarycta_cta_button_locales" (
  	"link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "grants_blocks_secondarycta" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"contact_email" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "grants_blocks_secondarycta_locales" (
  	"cta_title" varchar,
  	"cta_subtitle" varchar,
  	"contact_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "_grants_v_blocks_secondarycta_cta_button" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"link_type" "enum__grants_v_blocks_secondarycta_cta_button_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_download_link" boolean,
  	"link_arrow_link" boolean,
  	"link_pill_solid" boolean,
  	"link_pill_outline" boolean,
  	"link_url" varchar,
  	"link_email" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_grants_v_blocks_secondarycta_cta_button_locales" (
  	"link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_grants_v_blocks_secondarycta" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"contact_email" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_grants_v_blocks_secondarycta_locales" (
  	"cta_title" varchar,
  	"cta_subtitle" varchar,
  	"contact_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  ALTER TABLE "grants_blocks_scol_info_blk_col_btns" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "grants_blocks_scol_info_blk_col_btns_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "grants_blocks_scol_info_blk" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "grants_blocks_scol_info_blk_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_grants_v_blocks_scol_info_blk_col_btns" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_grants_v_blocks_scol_info_blk_col_btns_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_grants_v_blocks_scol_info_blk" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_grants_v_blocks_scol_info_blk_locales" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "grants_blocks_scol_info_blk_col_btns" CASCADE;
  DROP TABLE "grants_blocks_scol_info_blk_col_btns_locales" CASCADE;
  DROP TABLE "grants_blocks_scol_info_blk" CASCADE;
  DROP TABLE "grants_blocks_scol_info_blk_locales" CASCADE;
  DROP TABLE "_grants_v_blocks_scol_info_blk_col_btns" CASCADE;
  DROP TABLE "_grants_v_blocks_scol_info_blk_col_btns_locales" CASCADE;
  DROP TABLE "_grants_v_blocks_scol_info_blk" CASCADE;
  DROP TABLE "_grants_v_blocks_scol_info_blk_locales" CASCADE;
  ALTER TABLE "grants_blocks_mstep_process_steps_details_locales" ALTER COLUMN "bullet" SET DATA TYPE jsonb;
  ALTER TABLE "grants_blocks_mstep_process_steps_locales" ALTER COLUMN "tip" SET DATA TYPE jsonb;
  ALTER TABLE "_grants_v_blocks_mstep_process_steps_details_locales" ALTER COLUMN "bullet" SET DATA TYPE jsonb;
  ALTER TABLE "_grants_v_blocks_mstep_process_steps_locales" ALTER COLUMN "tip" SET DATA TYPE jsonb;
  ALTER TABLE "homepage_blocks_mstep_process_steps_details_locales" ALTER COLUMN "bullet" SET DATA TYPE jsonb;
  ALTER TABLE "homepage_blocks_mstep_process_steps_locales" ALTER COLUMN "tip" SET DATA TYPE jsonb;
  ALTER TABLE "_homepage_v_blocks_mstep_process_steps_details_locales" ALTER COLUMN "bullet" SET DATA TYPE jsonb;
  ALTER TABLE "_homepage_v_blocks_mstep_process_steps_locales" ALTER COLUMN "tip" SET DATA TYPE jsonb;
  ALTER TABLE "grants_blocks_secondarycta_cta_button" ADD CONSTRAINT "grants_blocks_secondarycta_cta_button_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."grants_blocks_secondarycta"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "grants_blocks_secondarycta_cta_button_locales" ADD CONSTRAINT "grants_blocks_secondarycta_cta_button_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."grants_blocks_secondarycta_cta_button"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "grants_blocks_secondarycta" ADD CONSTRAINT "grants_blocks_secondarycta_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."grants"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "grants_blocks_secondarycta_locales" ADD CONSTRAINT "grants_blocks_secondarycta_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."grants_blocks_secondarycta"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_grants_v_blocks_secondarycta_cta_button" ADD CONSTRAINT "_grants_v_blocks_secondarycta_cta_button_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_grants_v_blocks_secondarycta"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_grants_v_blocks_secondarycta_cta_button_locales" ADD CONSTRAINT "_grants_v_blocks_secondarycta_cta_button_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_grants_v_blocks_secondarycta_cta_button"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_grants_v_blocks_secondarycta" ADD CONSTRAINT "_grants_v_blocks_secondarycta_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_grants_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_grants_v_blocks_secondarycta_locales" ADD CONSTRAINT "_grants_v_blocks_secondarycta_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_grants_v_blocks_secondarycta"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "grants_blocks_secondarycta_cta_button_order_idx" ON "grants_blocks_secondarycta_cta_button" USING btree ("_order");
  CREATE INDEX "grants_blocks_secondarycta_cta_button_parent_id_idx" ON "grants_blocks_secondarycta_cta_button" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "grants_blocks_secondarycta_cta_button_locales_locale_parent_id_unique" ON "grants_blocks_secondarycta_cta_button_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "grants_blocks_secondarycta_order_idx" ON "grants_blocks_secondarycta" USING btree ("_order");
  CREATE INDEX "grants_blocks_secondarycta_parent_id_idx" ON "grants_blocks_secondarycta" USING btree ("_parent_id");
  CREATE INDEX "grants_blocks_secondarycta_path_idx" ON "grants_blocks_secondarycta" USING btree ("_path");
  CREATE UNIQUE INDEX "grants_blocks_secondarycta_locales_locale_parent_id_unique" ON "grants_blocks_secondarycta_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_grants_v_blocks_secondarycta_cta_button_order_idx" ON "_grants_v_blocks_secondarycta_cta_button" USING btree ("_order");
  CREATE INDEX "_grants_v_blocks_secondarycta_cta_button_parent_id_idx" ON "_grants_v_blocks_secondarycta_cta_button" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_grants_v_blocks_secondarycta_cta_button_locales_locale_parent_id_unique" ON "_grants_v_blocks_secondarycta_cta_button_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_grants_v_blocks_secondarycta_order_idx" ON "_grants_v_blocks_secondarycta" USING btree ("_order");
  CREATE INDEX "_grants_v_blocks_secondarycta_parent_id_idx" ON "_grants_v_blocks_secondarycta" USING btree ("_parent_id");
  CREATE INDEX "_grants_v_blocks_secondarycta_path_idx" ON "_grants_v_blocks_secondarycta" USING btree ("_path");
  CREATE UNIQUE INDEX "_grants_v_blocks_secondarycta_locales_locale_parent_id_unique" ON "_grants_v_blocks_secondarycta_locales" USING btree ("_locale","_parent_id");
  DROP TYPE "public"."enum_grants_blocks_scol_info_blk_col_btns_link_type";
  DROP TYPE "public"."enum__grants_v_blocks_scol_info_blk_col_btns_link_type";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_grants_blocks_scol_info_blk_col_btns_link_type" AS ENUM('reference', 'custom', 'email', 'document');
  CREATE TYPE "public"."enum__grants_v_blocks_scol_info_blk_col_btns_link_type" AS ENUM('reference', 'custom', 'email', 'document');
  CREATE TABLE "grants_blocks_scol_info_blk_col_btns" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_grants_blocks_scol_info_blk_col_btns_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_download_link" boolean,
  	"link_arrow_link" boolean,
  	"link_pill_solid" boolean,
  	"link_pill_outline" boolean,
  	"link_url" varchar,
  	"link_email" varchar
  );
  
  CREATE TABLE "grants_blocks_scol_info_blk_col_btns_locales" (
  	"link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "grants_blocks_scol_info_blk" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "grants_blocks_scol_info_blk_locales" (
  	"title" varchar,
  	"desc" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "_grants_v_blocks_scol_info_blk_col_btns" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"link_type" "enum__grants_v_blocks_scol_info_blk_col_btns_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_download_link" boolean,
  	"link_arrow_link" boolean,
  	"link_pill_solid" boolean,
  	"link_pill_outline" boolean,
  	"link_url" varchar,
  	"link_email" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_grants_v_blocks_scol_info_blk_col_btns_locales" (
  	"link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_grants_v_blocks_scol_info_blk" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_grants_v_blocks_scol_info_blk_locales" (
  	"title" varchar,
  	"desc" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  ALTER TABLE "grants_blocks_secondarycta_cta_button" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "grants_blocks_secondarycta_cta_button_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "grants_blocks_secondarycta" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "grants_blocks_secondarycta_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_grants_v_blocks_secondarycta_cta_button" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_grants_v_blocks_secondarycta_cta_button_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_grants_v_blocks_secondarycta" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_grants_v_blocks_secondarycta_locales" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "grants_blocks_secondarycta_cta_button" CASCADE;
  DROP TABLE "grants_blocks_secondarycta_cta_button_locales" CASCADE;
  DROP TABLE "grants_blocks_secondarycta" CASCADE;
  DROP TABLE "grants_blocks_secondarycta_locales" CASCADE;
  DROP TABLE "_grants_v_blocks_secondarycta_cta_button" CASCADE;
  DROP TABLE "_grants_v_blocks_secondarycta_cta_button_locales" CASCADE;
  DROP TABLE "_grants_v_blocks_secondarycta" CASCADE;
  DROP TABLE "_grants_v_blocks_secondarycta_locales" CASCADE;
  ALTER TABLE "grants_blocks_mstep_process_steps_details_locales" ALTER COLUMN "bullet" SET DATA TYPE varchar;
  ALTER TABLE "grants_blocks_mstep_process_steps_locales" ALTER COLUMN "tip" SET DATA TYPE varchar;
  ALTER TABLE "_grants_v_blocks_mstep_process_steps_details_locales" ALTER COLUMN "bullet" SET DATA TYPE varchar;
  ALTER TABLE "_grants_v_blocks_mstep_process_steps_locales" ALTER COLUMN "tip" SET DATA TYPE varchar;
  ALTER TABLE "homepage_blocks_mstep_process_steps_details_locales" ALTER COLUMN "bullet" SET DATA TYPE varchar;
  ALTER TABLE "homepage_blocks_mstep_process_steps_locales" ALTER COLUMN "tip" SET DATA TYPE varchar;
  ALTER TABLE "_homepage_v_blocks_mstep_process_steps_details_locales" ALTER COLUMN "bullet" SET DATA TYPE varchar;
  ALTER TABLE "_homepage_v_blocks_mstep_process_steps_locales" ALTER COLUMN "tip" SET DATA TYPE varchar;
  ALTER TABLE "grants_blocks_scol_info_blk_col_btns" ADD CONSTRAINT "grants_blocks_scol_info_blk_col_btns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."grants_blocks_scol_info_blk"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "grants_blocks_scol_info_blk_col_btns_locales" ADD CONSTRAINT "grants_blocks_scol_info_blk_col_btns_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."grants_blocks_scol_info_blk_col_btns"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "grants_blocks_scol_info_blk" ADD CONSTRAINT "grants_blocks_scol_info_blk_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."grants"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "grants_blocks_scol_info_blk_locales" ADD CONSTRAINT "grants_blocks_scol_info_blk_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."grants_blocks_scol_info_blk"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_grants_v_blocks_scol_info_blk_col_btns" ADD CONSTRAINT "_grants_v_blocks_scol_info_blk_col_btns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_grants_v_blocks_scol_info_blk"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_grants_v_blocks_scol_info_blk_col_btns_locales" ADD CONSTRAINT "_grants_v_blocks_scol_info_blk_col_btns_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_grants_v_blocks_scol_info_blk_col_btns"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_grants_v_blocks_scol_info_blk" ADD CONSTRAINT "_grants_v_blocks_scol_info_blk_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_grants_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_grants_v_blocks_scol_info_blk_locales" ADD CONSTRAINT "_grants_v_blocks_scol_info_blk_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_grants_v_blocks_scol_info_blk"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "grants_blocks_scol_info_blk_col_btns_order_idx" ON "grants_blocks_scol_info_blk_col_btns" USING btree ("_order");
  CREATE INDEX "grants_blocks_scol_info_blk_col_btns_parent_id_idx" ON "grants_blocks_scol_info_blk_col_btns" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "grants_blocks_scol_info_blk_col_btns_locales_locale_parent_id_unique" ON "grants_blocks_scol_info_blk_col_btns_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "grants_blocks_scol_info_blk_order_idx" ON "grants_blocks_scol_info_blk" USING btree ("_order");
  CREATE INDEX "grants_blocks_scol_info_blk_parent_id_idx" ON "grants_blocks_scol_info_blk" USING btree ("_parent_id");
  CREATE INDEX "grants_blocks_scol_info_blk_path_idx" ON "grants_blocks_scol_info_blk" USING btree ("_path");
  CREATE UNIQUE INDEX "grants_blocks_scol_info_blk_locales_locale_parent_id_unique" ON "grants_blocks_scol_info_blk_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_grants_v_blocks_scol_info_blk_col_btns_order_idx" ON "_grants_v_blocks_scol_info_blk_col_btns" USING btree ("_order");
  CREATE INDEX "_grants_v_blocks_scol_info_blk_col_btns_parent_id_idx" ON "_grants_v_blocks_scol_info_blk_col_btns" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_grants_v_blocks_scol_info_blk_col_btns_locales_locale_parent_id_unique" ON "_grants_v_blocks_scol_info_blk_col_btns_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_grants_v_blocks_scol_info_blk_order_idx" ON "_grants_v_blocks_scol_info_blk" USING btree ("_order");
  CREATE INDEX "_grants_v_blocks_scol_info_blk_parent_id_idx" ON "_grants_v_blocks_scol_info_blk" USING btree ("_parent_id");
  CREATE INDEX "_grants_v_blocks_scol_info_blk_path_idx" ON "_grants_v_blocks_scol_info_blk" USING btree ("_path");
  CREATE UNIQUE INDEX "_grants_v_blocks_scol_info_blk_locales_locale_parent_id_unique" ON "_grants_v_blocks_scol_info_blk_locales" USING btree ("_locale","_parent_id");
  DROP TYPE "public"."enum_grants_blocks_secondarycta_cta_button_link_type";
  DROP TYPE "public"."enum__grants_v_blocks_secondarycta_cta_button_link_type";`)
}
