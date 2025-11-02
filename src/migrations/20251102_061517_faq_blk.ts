import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_grants_blocks_faq_blk_link_type" AS ENUM('reference', 'custom', 'email', 'document');
  CREATE TYPE "public"."enum__grants_v_blocks_faq_blk_link_type" AS ENUM('reference', 'custom', 'email', 'document');
  CREATE TYPE "public"."enum_homepage_blocks_faq_blk_link_type" AS ENUM('reference', 'custom', 'email', 'document');
  CREATE TYPE "public"."enum__homepage_v_blocks_faq_blk_link_type" AS ENUM('reference', 'custom', 'email', 'document');
  CREATE TABLE "grants_blocks_grant_card_grid_block_locales" (
  	"title" varchar,
  	"desc" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "grants_blocks_faq_blk_faqs" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "grants_blocks_faq_blk_faqs_locales" (
  	"question" varchar,
  	"answer" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "grants_blocks_faq_blk" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_grants_blocks_faq_blk_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_download_link" boolean,
  	"link_arrow_link" boolean,
  	"link_pill_solid" boolean,
  	"link_pill_outline" boolean,
  	"link_url" varchar,
  	"link_email" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "grants_blocks_faq_blk_locales" (
  	"title" varchar,
  	"desc" varchar,
  	"link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "_grants_v_blocks_grant_card_grid_block_locales" (
  	"title" varchar,
  	"desc" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_grants_v_blocks_faq_blk_faqs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_grants_v_blocks_faq_blk_faqs_locales" (
  	"question" varchar,
  	"answer" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_grants_v_blocks_faq_blk" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"link_type" "enum__grants_v_blocks_faq_blk_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_download_link" boolean,
  	"link_arrow_link" boolean,
  	"link_pill_solid" boolean,
  	"link_pill_outline" boolean,
  	"link_url" varchar,
  	"link_email" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_grants_v_blocks_faq_blk_locales" (
  	"title" varchar,
  	"desc" varchar,
  	"link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "homepage_blocks_grant_card_grid_block_locales" (
  	"title" varchar,
  	"desc" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "homepage_blocks_faq_blk_faqs" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "homepage_blocks_faq_blk_faqs_locales" (
  	"question" varchar,
  	"answer" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "homepage_blocks_faq_blk" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_homepage_blocks_faq_blk_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_download_link" boolean,
  	"link_arrow_link" boolean,
  	"link_pill_solid" boolean,
  	"link_pill_outline" boolean,
  	"link_url" varchar,
  	"link_email" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "homepage_blocks_faq_blk_locales" (
  	"title" varchar,
  	"desc" varchar,
  	"link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "_homepage_v_blocks_grant_card_grid_block_locales" (
  	"title" varchar,
  	"desc" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_homepage_v_blocks_faq_blk_faqs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_homepage_v_blocks_faq_blk_faqs_locales" (
  	"question" varchar,
  	"answer" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_homepage_v_blocks_faq_blk" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"link_type" "enum__homepage_v_blocks_faq_blk_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_download_link" boolean,
  	"link_arrow_link" boolean,
  	"link_pill_solid" boolean,
  	"link_pill_outline" boolean,
  	"link_url" varchar,
  	"link_email" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_homepage_v_blocks_faq_blk_locales" (
  	"title" varchar,
  	"desc" varchar,
  	"link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  ALTER TABLE "grants_blocks_grant_card_grid_block_locales" ADD CONSTRAINT "grants_blocks_grant_card_grid_block_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."grants_blocks_grant_card_grid_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "grants_blocks_faq_blk_faqs" ADD CONSTRAINT "grants_blocks_faq_blk_faqs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."grants_blocks_faq_blk"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "grants_blocks_faq_blk_faqs_locales" ADD CONSTRAINT "grants_blocks_faq_blk_faqs_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."grants_blocks_faq_blk_faqs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "grants_blocks_faq_blk" ADD CONSTRAINT "grants_blocks_faq_blk_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."grants"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "grants_blocks_faq_blk_locales" ADD CONSTRAINT "grants_blocks_faq_blk_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."grants_blocks_faq_blk"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_grants_v_blocks_grant_card_grid_block_locales" ADD CONSTRAINT "_grants_v_blocks_grant_card_grid_block_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_grants_v_blocks_grant_card_grid_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_grants_v_blocks_faq_blk_faqs" ADD CONSTRAINT "_grants_v_blocks_faq_blk_faqs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_grants_v_blocks_faq_blk"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_grants_v_blocks_faq_blk_faqs_locales" ADD CONSTRAINT "_grants_v_blocks_faq_blk_faqs_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_grants_v_blocks_faq_blk_faqs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_grants_v_blocks_faq_blk" ADD CONSTRAINT "_grants_v_blocks_faq_blk_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_grants_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_grants_v_blocks_faq_blk_locales" ADD CONSTRAINT "_grants_v_blocks_faq_blk_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_grants_v_blocks_faq_blk"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_blocks_grant_card_grid_block_locales" ADD CONSTRAINT "homepage_blocks_grant_card_grid_block_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage_blocks_grant_card_grid_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_blocks_faq_blk_faqs" ADD CONSTRAINT "homepage_blocks_faq_blk_faqs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage_blocks_faq_blk"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_blocks_faq_blk_faqs_locales" ADD CONSTRAINT "homepage_blocks_faq_blk_faqs_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage_blocks_faq_blk_faqs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_blocks_faq_blk" ADD CONSTRAINT "homepage_blocks_faq_blk_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_blocks_faq_blk_locales" ADD CONSTRAINT "homepage_blocks_faq_blk_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage_blocks_faq_blk"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_homepage_v_blocks_grant_card_grid_block_locales" ADD CONSTRAINT "_homepage_v_blocks_grant_card_grid_block_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_homepage_v_blocks_grant_card_grid_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_homepage_v_blocks_faq_blk_faqs" ADD CONSTRAINT "_homepage_v_blocks_faq_blk_faqs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_homepage_v_blocks_faq_blk"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_homepage_v_blocks_faq_blk_faqs_locales" ADD CONSTRAINT "_homepage_v_blocks_faq_blk_faqs_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_homepage_v_blocks_faq_blk_faqs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_homepage_v_blocks_faq_blk" ADD CONSTRAINT "_homepage_v_blocks_faq_blk_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_homepage_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_homepage_v_blocks_faq_blk_locales" ADD CONSTRAINT "_homepage_v_blocks_faq_blk_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_homepage_v_blocks_faq_blk"("id") ON DELETE cascade ON UPDATE no action;
  CREATE UNIQUE INDEX "grants_blocks_grant_card_grid_block_locales_locale_parent_id_unique" ON "grants_blocks_grant_card_grid_block_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "grants_blocks_faq_blk_faqs_order_idx" ON "grants_blocks_faq_blk_faqs" USING btree ("_order");
  CREATE INDEX "grants_blocks_faq_blk_faqs_parent_id_idx" ON "grants_blocks_faq_blk_faqs" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "grants_blocks_faq_blk_faqs_locales_locale_parent_id_unique" ON "grants_blocks_faq_blk_faqs_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "grants_blocks_faq_blk_order_idx" ON "grants_blocks_faq_blk" USING btree ("_order");
  CREATE INDEX "grants_blocks_faq_blk_parent_id_idx" ON "grants_blocks_faq_blk" USING btree ("_parent_id");
  CREATE INDEX "grants_blocks_faq_blk_path_idx" ON "grants_blocks_faq_blk" USING btree ("_path");
  CREATE UNIQUE INDEX "grants_blocks_faq_blk_locales_locale_parent_id_unique" ON "grants_blocks_faq_blk_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "_grants_v_blocks_grant_card_grid_block_locales_locale_parent_id_unique" ON "_grants_v_blocks_grant_card_grid_block_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_grants_v_blocks_faq_blk_faqs_order_idx" ON "_grants_v_blocks_faq_blk_faqs" USING btree ("_order");
  CREATE INDEX "_grants_v_blocks_faq_blk_faqs_parent_id_idx" ON "_grants_v_blocks_faq_blk_faqs" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_grants_v_blocks_faq_blk_faqs_locales_locale_parent_id_unique" ON "_grants_v_blocks_faq_blk_faqs_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_grants_v_blocks_faq_blk_order_idx" ON "_grants_v_blocks_faq_blk" USING btree ("_order");
  CREATE INDEX "_grants_v_blocks_faq_blk_parent_id_idx" ON "_grants_v_blocks_faq_blk" USING btree ("_parent_id");
  CREATE INDEX "_grants_v_blocks_faq_blk_path_idx" ON "_grants_v_blocks_faq_blk" USING btree ("_path");
  CREATE UNIQUE INDEX "_grants_v_blocks_faq_blk_locales_locale_parent_id_unique" ON "_grants_v_blocks_faq_blk_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "homepage_blocks_grant_card_grid_block_locales_locale_parent_id_unique" ON "homepage_blocks_grant_card_grid_block_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "homepage_blocks_faq_blk_faqs_order_idx" ON "homepage_blocks_faq_blk_faqs" USING btree ("_order");
  CREATE INDEX "homepage_blocks_faq_blk_faqs_parent_id_idx" ON "homepage_blocks_faq_blk_faqs" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "homepage_blocks_faq_blk_faqs_locales_locale_parent_id_unique" ON "homepage_blocks_faq_blk_faqs_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "homepage_blocks_faq_blk_order_idx" ON "homepage_blocks_faq_blk" USING btree ("_order");
  CREATE INDEX "homepage_blocks_faq_blk_parent_id_idx" ON "homepage_blocks_faq_blk" USING btree ("_parent_id");
  CREATE INDEX "homepage_blocks_faq_blk_path_idx" ON "homepage_blocks_faq_blk" USING btree ("_path");
  CREATE UNIQUE INDEX "homepage_blocks_faq_blk_locales_locale_parent_id_unique" ON "homepage_blocks_faq_blk_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "_homepage_v_blocks_grant_card_grid_block_locales_locale_parent_id_unique" ON "_homepage_v_blocks_grant_card_grid_block_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_homepage_v_blocks_faq_blk_faqs_order_idx" ON "_homepage_v_blocks_faq_blk_faqs" USING btree ("_order");
  CREATE INDEX "_homepage_v_blocks_faq_blk_faqs_parent_id_idx" ON "_homepage_v_blocks_faq_blk_faqs" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_homepage_v_blocks_faq_blk_faqs_locales_locale_parent_id_unique" ON "_homepage_v_blocks_faq_blk_faqs_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_homepage_v_blocks_faq_blk_order_idx" ON "_homepage_v_blocks_faq_blk" USING btree ("_order");
  CREATE INDEX "_homepage_v_blocks_faq_blk_parent_id_idx" ON "_homepage_v_blocks_faq_blk" USING btree ("_parent_id");
  CREATE INDEX "_homepage_v_blocks_faq_blk_path_idx" ON "_homepage_v_blocks_faq_blk" USING btree ("_path");
  CREATE UNIQUE INDEX "_homepage_v_blocks_faq_blk_locales_locale_parent_id_unique" ON "_homepage_v_blocks_faq_blk_locales" USING btree ("_locale","_parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "grants_blocks_grant_card_grid_block_locales" CASCADE;
  DROP TABLE "grants_blocks_faq_blk_faqs" CASCADE;
  DROP TABLE "grants_blocks_faq_blk_faqs_locales" CASCADE;
  DROP TABLE "grants_blocks_faq_blk" CASCADE;
  DROP TABLE "grants_blocks_faq_blk_locales" CASCADE;
  DROP TABLE "_grants_v_blocks_grant_card_grid_block_locales" CASCADE;
  DROP TABLE "_grants_v_blocks_faq_blk_faqs" CASCADE;
  DROP TABLE "_grants_v_blocks_faq_blk_faqs_locales" CASCADE;
  DROP TABLE "_grants_v_blocks_faq_blk" CASCADE;
  DROP TABLE "_grants_v_blocks_faq_blk_locales" CASCADE;
  DROP TABLE "homepage_blocks_grant_card_grid_block_locales" CASCADE;
  DROP TABLE "homepage_blocks_faq_blk_faqs" CASCADE;
  DROP TABLE "homepage_blocks_faq_blk_faqs_locales" CASCADE;
  DROP TABLE "homepage_blocks_faq_blk" CASCADE;
  DROP TABLE "homepage_blocks_faq_blk_locales" CASCADE;
  DROP TABLE "_homepage_v_blocks_grant_card_grid_block_locales" CASCADE;
  DROP TABLE "_homepage_v_blocks_faq_blk_faqs" CASCADE;
  DROP TABLE "_homepage_v_blocks_faq_blk_faqs_locales" CASCADE;
  DROP TABLE "_homepage_v_blocks_faq_blk" CASCADE;
  DROP TABLE "_homepage_v_blocks_faq_blk_locales" CASCADE;
  DROP TYPE "public"."enum_grants_blocks_faq_blk_link_type";
  DROP TYPE "public"."enum__grants_v_blocks_faq_blk_link_type";
  DROP TYPE "public"."enum_homepage_blocks_faq_blk_link_type";
  DROP TYPE "public"."enum__homepage_v_blocks_faq_blk_link_type";`)
}
