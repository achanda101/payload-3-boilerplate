import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_grants_blocks_list_crd_dck_cards_link_type" AS ENUM('reference', 'custom', 'email', 'document');
  CREATE TYPE "public"."enum_grants_blocks_list_crd_dck_buttons_link_type" AS ENUM('reference', 'custom', 'email', 'document');
  CREATE TYPE "public"."enum__grants_v_blocks_list_crd_dck_cards_link_type" AS ENUM('reference', 'custom', 'email', 'document');
  CREATE TYPE "public"."enum__grants_v_blocks_list_crd_dck_buttons_link_type" AS ENUM('reference', 'custom', 'email', 'document');
  CREATE TYPE "public"."enum_homepage_blocks_list_crd_dck_cards_link_type" AS ENUM('reference', 'custom', 'email', 'document');
  CREATE TYPE "public"."enum_homepage_blocks_list_crd_dck_buttons_link_type" AS ENUM('reference', 'custom', 'email', 'document');
  CREATE TYPE "public"."enum__homepage_v_blocks_list_crd_dck_cards_link_type" AS ENUM('reference', 'custom', 'email', 'document');
  CREATE TYPE "public"."enum__homepage_v_blocks_list_crd_dck_buttons_link_type" AS ENUM('reference', 'custom', 'email', 'document');
  CREATE TABLE "grants_blocks_list_crd_dck_cards_tags" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "grants_blocks_list_crd_dck_cards_tags_locales" (
  	"tag" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "grants_blocks_list_crd_dck_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"link_type" "enum_grants_blocks_list_crd_dck_cards_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_download_link" boolean,
  	"link_arrow_link" boolean,
  	"link_pill_solid" boolean,
  	"link_pill_outline" boolean,
  	"link_url" varchar,
  	"link_email" varchar
  );
  
  CREATE TABLE "grants_blocks_list_crd_dck_cards_locales" (
  	"title" varchar,
  	"desc" varchar,
  	"link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "grants_blocks_list_crd_dck_buttons" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_grants_blocks_list_crd_dck_buttons_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_download_link" boolean,
  	"link_arrow_link" boolean,
  	"link_pill_solid" boolean,
  	"link_pill_outline" boolean,
  	"link_url" varchar,
  	"link_email" varchar
  );
  
  CREATE TABLE "grants_blocks_list_crd_dck_buttons_locales" (
  	"link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "grants_blocks_list_crd_dck" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "grants_blocks_list_crd_dck_locales" (
  	"title" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "_grants_v_blocks_list_crd_dck_cards_tags" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_grants_v_blocks_list_crd_dck_cards_tags_locales" (
  	"tag" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_grants_v_blocks_list_crd_dck_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"link_type" "enum__grants_v_blocks_list_crd_dck_cards_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_download_link" boolean,
  	"link_arrow_link" boolean,
  	"link_pill_solid" boolean,
  	"link_pill_outline" boolean,
  	"link_url" varchar,
  	"link_email" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_grants_v_blocks_list_crd_dck_cards_locales" (
  	"title" varchar,
  	"desc" varchar,
  	"link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_grants_v_blocks_list_crd_dck_buttons" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"link_type" "enum__grants_v_blocks_list_crd_dck_buttons_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_download_link" boolean,
  	"link_arrow_link" boolean,
  	"link_pill_solid" boolean,
  	"link_pill_outline" boolean,
  	"link_url" varchar,
  	"link_email" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_grants_v_blocks_list_crd_dck_buttons_locales" (
  	"link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_grants_v_blocks_list_crd_dck" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_grants_v_blocks_list_crd_dck_locales" (
  	"title" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "homepage_blocks_list_crd_dck_cards_tags" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "homepage_blocks_list_crd_dck_cards_tags_locales" (
  	"tag" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "homepage_blocks_list_crd_dck_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"link_type" "enum_homepage_blocks_list_crd_dck_cards_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_download_link" boolean,
  	"link_arrow_link" boolean,
  	"link_pill_solid" boolean,
  	"link_pill_outline" boolean,
  	"link_url" varchar,
  	"link_email" varchar
  );
  
  CREATE TABLE "homepage_blocks_list_crd_dck_cards_locales" (
  	"title" varchar,
  	"desc" varchar,
  	"link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "homepage_blocks_list_crd_dck_buttons" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_homepage_blocks_list_crd_dck_buttons_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_download_link" boolean,
  	"link_arrow_link" boolean,
  	"link_pill_solid" boolean,
  	"link_pill_outline" boolean,
  	"link_url" varchar,
  	"link_email" varchar
  );
  
  CREATE TABLE "homepage_blocks_list_crd_dck_buttons_locales" (
  	"link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "homepage_blocks_list_crd_dck" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "homepage_blocks_list_crd_dck_locales" (
  	"title" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "_homepage_v_blocks_list_crd_dck_cards_tags" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_homepage_v_blocks_list_crd_dck_cards_tags_locales" (
  	"tag" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_homepage_v_blocks_list_crd_dck_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"link_type" "enum__homepage_v_blocks_list_crd_dck_cards_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_download_link" boolean,
  	"link_arrow_link" boolean,
  	"link_pill_solid" boolean,
  	"link_pill_outline" boolean,
  	"link_url" varchar,
  	"link_email" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_homepage_v_blocks_list_crd_dck_cards_locales" (
  	"title" varchar,
  	"desc" varchar,
  	"link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_homepage_v_blocks_list_crd_dck_buttons" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"link_type" "enum__homepage_v_blocks_list_crd_dck_buttons_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_download_link" boolean,
  	"link_arrow_link" boolean,
  	"link_pill_solid" boolean,
  	"link_pill_outline" boolean,
  	"link_url" varchar,
  	"link_email" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_homepage_v_blocks_list_crd_dck_buttons_locales" (
  	"link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_homepage_v_blocks_list_crd_dck" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_homepage_v_blocks_list_crd_dck_locales" (
  	"title" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  ALTER TABLE "grants_blocks_list_crd_dck_cards_tags" ADD CONSTRAINT "grants_blocks_list_crd_dck_cards_tags_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."grants_blocks_list_crd_dck_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "grants_blocks_list_crd_dck_cards_tags_locales" ADD CONSTRAINT "grants_blocks_list_crd_dck_cards_tags_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."grants_blocks_list_crd_dck_cards_tags"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "grants_blocks_list_crd_dck_cards" ADD CONSTRAINT "grants_blocks_list_crd_dck_cards_image_id_media_cloud_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media_cloud"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "grants_blocks_list_crd_dck_cards" ADD CONSTRAINT "grants_blocks_list_crd_dck_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."grants_blocks_list_crd_dck"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "grants_blocks_list_crd_dck_cards_locales" ADD CONSTRAINT "grants_blocks_list_crd_dck_cards_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."grants_blocks_list_crd_dck_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "grants_blocks_list_crd_dck_buttons" ADD CONSTRAINT "grants_blocks_list_crd_dck_buttons_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."grants_blocks_list_crd_dck"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "grants_blocks_list_crd_dck_buttons_locales" ADD CONSTRAINT "grants_blocks_list_crd_dck_buttons_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."grants_blocks_list_crd_dck_buttons"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "grants_blocks_list_crd_dck" ADD CONSTRAINT "grants_blocks_list_crd_dck_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."grants"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "grants_blocks_list_crd_dck_locales" ADD CONSTRAINT "grants_blocks_list_crd_dck_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."grants_blocks_list_crd_dck"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_grants_v_blocks_list_crd_dck_cards_tags" ADD CONSTRAINT "_grants_v_blocks_list_crd_dck_cards_tags_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_grants_v_blocks_list_crd_dck_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_grants_v_blocks_list_crd_dck_cards_tags_locales" ADD CONSTRAINT "_grants_v_blocks_list_crd_dck_cards_tags_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_grants_v_blocks_list_crd_dck_cards_tags"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_grants_v_blocks_list_crd_dck_cards" ADD CONSTRAINT "_grants_v_blocks_list_crd_dck_cards_image_id_media_cloud_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media_cloud"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_grants_v_blocks_list_crd_dck_cards" ADD CONSTRAINT "_grants_v_blocks_list_crd_dck_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_grants_v_blocks_list_crd_dck"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_grants_v_blocks_list_crd_dck_cards_locales" ADD CONSTRAINT "_grants_v_blocks_list_crd_dck_cards_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_grants_v_blocks_list_crd_dck_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_grants_v_blocks_list_crd_dck_buttons" ADD CONSTRAINT "_grants_v_blocks_list_crd_dck_buttons_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_grants_v_blocks_list_crd_dck"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_grants_v_blocks_list_crd_dck_buttons_locales" ADD CONSTRAINT "_grants_v_blocks_list_crd_dck_buttons_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_grants_v_blocks_list_crd_dck_buttons"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_grants_v_blocks_list_crd_dck" ADD CONSTRAINT "_grants_v_blocks_list_crd_dck_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_grants_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_grants_v_blocks_list_crd_dck_locales" ADD CONSTRAINT "_grants_v_blocks_list_crd_dck_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_grants_v_blocks_list_crd_dck"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_blocks_list_crd_dck_cards_tags" ADD CONSTRAINT "homepage_blocks_list_crd_dck_cards_tags_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage_blocks_list_crd_dck_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_blocks_list_crd_dck_cards_tags_locales" ADD CONSTRAINT "homepage_blocks_list_crd_dck_cards_tags_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage_blocks_list_crd_dck_cards_tags"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_blocks_list_crd_dck_cards" ADD CONSTRAINT "homepage_blocks_list_crd_dck_cards_image_id_media_cloud_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media_cloud"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "homepage_blocks_list_crd_dck_cards" ADD CONSTRAINT "homepage_blocks_list_crd_dck_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage_blocks_list_crd_dck"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_blocks_list_crd_dck_cards_locales" ADD CONSTRAINT "homepage_blocks_list_crd_dck_cards_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage_blocks_list_crd_dck_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_blocks_list_crd_dck_buttons" ADD CONSTRAINT "homepage_blocks_list_crd_dck_buttons_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage_blocks_list_crd_dck"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_blocks_list_crd_dck_buttons_locales" ADD CONSTRAINT "homepage_blocks_list_crd_dck_buttons_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage_blocks_list_crd_dck_buttons"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_blocks_list_crd_dck" ADD CONSTRAINT "homepage_blocks_list_crd_dck_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_blocks_list_crd_dck_locales" ADD CONSTRAINT "homepage_blocks_list_crd_dck_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage_blocks_list_crd_dck"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_homepage_v_blocks_list_crd_dck_cards_tags" ADD CONSTRAINT "_homepage_v_blocks_list_crd_dck_cards_tags_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_homepage_v_blocks_list_crd_dck_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_homepage_v_blocks_list_crd_dck_cards_tags_locales" ADD CONSTRAINT "_homepage_v_blocks_list_crd_dck_cards_tags_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_homepage_v_blocks_list_crd_dck_cards_tags"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_homepage_v_blocks_list_crd_dck_cards" ADD CONSTRAINT "_homepage_v_blocks_list_crd_dck_cards_image_id_media_cloud_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media_cloud"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_homepage_v_blocks_list_crd_dck_cards" ADD CONSTRAINT "_homepage_v_blocks_list_crd_dck_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_homepage_v_blocks_list_crd_dck"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_homepage_v_blocks_list_crd_dck_cards_locales" ADD CONSTRAINT "_homepage_v_blocks_list_crd_dck_cards_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_homepage_v_blocks_list_crd_dck_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_homepage_v_blocks_list_crd_dck_buttons" ADD CONSTRAINT "_homepage_v_blocks_list_crd_dck_buttons_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_homepage_v_blocks_list_crd_dck"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_homepage_v_blocks_list_crd_dck_buttons_locales" ADD CONSTRAINT "_homepage_v_blocks_list_crd_dck_buttons_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_homepage_v_blocks_list_crd_dck_buttons"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_homepage_v_blocks_list_crd_dck" ADD CONSTRAINT "_homepage_v_blocks_list_crd_dck_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_homepage_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_homepage_v_blocks_list_crd_dck_locales" ADD CONSTRAINT "_homepage_v_blocks_list_crd_dck_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_homepage_v_blocks_list_crd_dck"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "grants_blocks_list_crd_dck_cards_tags_order_idx" ON "grants_blocks_list_crd_dck_cards_tags" USING btree ("_order");
  CREATE INDEX "grants_blocks_list_crd_dck_cards_tags_parent_id_idx" ON "grants_blocks_list_crd_dck_cards_tags" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "grants_blocks_list_crd_dck_cards_tags_locales_locale_parent_id_unique" ON "grants_blocks_list_crd_dck_cards_tags_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "grants_blocks_list_crd_dck_cards_order_idx" ON "grants_blocks_list_crd_dck_cards" USING btree ("_order");
  CREATE INDEX "grants_blocks_list_crd_dck_cards_parent_id_idx" ON "grants_blocks_list_crd_dck_cards" USING btree ("_parent_id");
  CREATE INDEX "grants_blocks_list_crd_dck_cards_image_idx" ON "grants_blocks_list_crd_dck_cards" USING btree ("image_id");
  CREATE UNIQUE INDEX "grants_blocks_list_crd_dck_cards_locales_locale_parent_id_unique" ON "grants_blocks_list_crd_dck_cards_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "grants_blocks_list_crd_dck_buttons_order_idx" ON "grants_blocks_list_crd_dck_buttons" USING btree ("_order");
  CREATE INDEX "grants_blocks_list_crd_dck_buttons_parent_id_idx" ON "grants_blocks_list_crd_dck_buttons" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "grants_blocks_list_crd_dck_buttons_locales_locale_parent_id_unique" ON "grants_blocks_list_crd_dck_buttons_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "grants_blocks_list_crd_dck_order_idx" ON "grants_blocks_list_crd_dck" USING btree ("_order");
  CREATE INDEX "grants_blocks_list_crd_dck_parent_id_idx" ON "grants_blocks_list_crd_dck" USING btree ("_parent_id");
  CREATE INDEX "grants_blocks_list_crd_dck_path_idx" ON "grants_blocks_list_crd_dck" USING btree ("_path");
  CREATE UNIQUE INDEX "grants_blocks_list_crd_dck_locales_locale_parent_id_unique" ON "grants_blocks_list_crd_dck_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_grants_v_blocks_list_crd_dck_cards_tags_order_idx" ON "_grants_v_blocks_list_crd_dck_cards_tags" USING btree ("_order");
  CREATE INDEX "_grants_v_blocks_list_crd_dck_cards_tags_parent_id_idx" ON "_grants_v_blocks_list_crd_dck_cards_tags" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_grants_v_blocks_list_crd_dck_cards_tags_locales_locale_parent_id_unique" ON "_grants_v_blocks_list_crd_dck_cards_tags_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_grants_v_blocks_list_crd_dck_cards_order_idx" ON "_grants_v_blocks_list_crd_dck_cards" USING btree ("_order");
  CREATE INDEX "_grants_v_blocks_list_crd_dck_cards_parent_id_idx" ON "_grants_v_blocks_list_crd_dck_cards" USING btree ("_parent_id");
  CREATE INDEX "_grants_v_blocks_list_crd_dck_cards_image_idx" ON "_grants_v_blocks_list_crd_dck_cards" USING btree ("image_id");
  CREATE UNIQUE INDEX "_grants_v_blocks_list_crd_dck_cards_locales_locale_parent_id_unique" ON "_grants_v_blocks_list_crd_dck_cards_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_grants_v_blocks_list_crd_dck_buttons_order_idx" ON "_grants_v_blocks_list_crd_dck_buttons" USING btree ("_order");
  CREATE INDEX "_grants_v_blocks_list_crd_dck_buttons_parent_id_idx" ON "_grants_v_blocks_list_crd_dck_buttons" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_grants_v_blocks_list_crd_dck_buttons_locales_locale_parent_id_unique" ON "_grants_v_blocks_list_crd_dck_buttons_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_grants_v_blocks_list_crd_dck_order_idx" ON "_grants_v_blocks_list_crd_dck" USING btree ("_order");
  CREATE INDEX "_grants_v_blocks_list_crd_dck_parent_id_idx" ON "_grants_v_blocks_list_crd_dck" USING btree ("_parent_id");
  CREATE INDEX "_grants_v_blocks_list_crd_dck_path_idx" ON "_grants_v_blocks_list_crd_dck" USING btree ("_path");
  CREATE UNIQUE INDEX "_grants_v_blocks_list_crd_dck_locales_locale_parent_id_unique" ON "_grants_v_blocks_list_crd_dck_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "homepage_blocks_list_crd_dck_cards_tags_order_idx" ON "homepage_blocks_list_crd_dck_cards_tags" USING btree ("_order");
  CREATE INDEX "homepage_blocks_list_crd_dck_cards_tags_parent_id_idx" ON "homepage_blocks_list_crd_dck_cards_tags" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "homepage_blocks_list_crd_dck_cards_tags_locales_locale_parent_id_unique" ON "homepage_blocks_list_crd_dck_cards_tags_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "homepage_blocks_list_crd_dck_cards_order_idx" ON "homepage_blocks_list_crd_dck_cards" USING btree ("_order");
  CREATE INDEX "homepage_blocks_list_crd_dck_cards_parent_id_idx" ON "homepage_blocks_list_crd_dck_cards" USING btree ("_parent_id");
  CREATE INDEX "homepage_blocks_list_crd_dck_cards_image_idx" ON "homepage_blocks_list_crd_dck_cards" USING btree ("image_id");
  CREATE UNIQUE INDEX "homepage_blocks_list_crd_dck_cards_locales_locale_parent_id_unique" ON "homepage_blocks_list_crd_dck_cards_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "homepage_blocks_list_crd_dck_buttons_order_idx" ON "homepage_blocks_list_crd_dck_buttons" USING btree ("_order");
  CREATE INDEX "homepage_blocks_list_crd_dck_buttons_parent_id_idx" ON "homepage_blocks_list_crd_dck_buttons" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "homepage_blocks_list_crd_dck_buttons_locales_locale_parent_id_unique" ON "homepage_blocks_list_crd_dck_buttons_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "homepage_blocks_list_crd_dck_order_idx" ON "homepage_blocks_list_crd_dck" USING btree ("_order");
  CREATE INDEX "homepage_blocks_list_crd_dck_parent_id_idx" ON "homepage_blocks_list_crd_dck" USING btree ("_parent_id");
  CREATE INDEX "homepage_blocks_list_crd_dck_path_idx" ON "homepage_blocks_list_crd_dck" USING btree ("_path");
  CREATE UNIQUE INDEX "homepage_blocks_list_crd_dck_locales_locale_parent_id_unique" ON "homepage_blocks_list_crd_dck_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_homepage_v_blocks_list_crd_dck_cards_tags_order_idx" ON "_homepage_v_blocks_list_crd_dck_cards_tags" USING btree ("_order");
  CREATE INDEX "_homepage_v_blocks_list_crd_dck_cards_tags_parent_id_idx" ON "_homepage_v_blocks_list_crd_dck_cards_tags" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_homepage_v_blocks_list_crd_dck_cards_tags_locales_locale_parent_id_unique" ON "_homepage_v_blocks_list_crd_dck_cards_tags_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_homepage_v_blocks_list_crd_dck_cards_order_idx" ON "_homepage_v_blocks_list_crd_dck_cards" USING btree ("_order");
  CREATE INDEX "_homepage_v_blocks_list_crd_dck_cards_parent_id_idx" ON "_homepage_v_blocks_list_crd_dck_cards" USING btree ("_parent_id");
  CREATE INDEX "_homepage_v_blocks_list_crd_dck_cards_image_idx" ON "_homepage_v_blocks_list_crd_dck_cards" USING btree ("image_id");
  CREATE UNIQUE INDEX "_homepage_v_blocks_list_crd_dck_cards_locales_locale_parent_id_unique" ON "_homepage_v_blocks_list_crd_dck_cards_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_homepage_v_blocks_list_crd_dck_buttons_order_idx" ON "_homepage_v_blocks_list_crd_dck_buttons" USING btree ("_order");
  CREATE INDEX "_homepage_v_blocks_list_crd_dck_buttons_parent_id_idx" ON "_homepage_v_blocks_list_crd_dck_buttons" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_homepage_v_blocks_list_crd_dck_buttons_locales_locale_parent_id_unique" ON "_homepage_v_blocks_list_crd_dck_buttons_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_homepage_v_blocks_list_crd_dck_order_idx" ON "_homepage_v_blocks_list_crd_dck" USING btree ("_order");
  CREATE INDEX "_homepage_v_blocks_list_crd_dck_parent_id_idx" ON "_homepage_v_blocks_list_crd_dck" USING btree ("_parent_id");
  CREATE INDEX "_homepage_v_blocks_list_crd_dck_path_idx" ON "_homepage_v_blocks_list_crd_dck" USING btree ("_path");
  CREATE UNIQUE INDEX "_homepage_v_blocks_list_crd_dck_locales_locale_parent_id_unique" ON "_homepage_v_blocks_list_crd_dck_locales" USING btree ("_locale","_parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "grants_blocks_list_crd_dck_cards_tags" CASCADE;
  DROP TABLE "grants_blocks_list_crd_dck_cards_tags_locales" CASCADE;
  DROP TABLE "grants_blocks_list_crd_dck_cards" CASCADE;
  DROP TABLE "grants_blocks_list_crd_dck_cards_locales" CASCADE;
  DROP TABLE "grants_blocks_list_crd_dck_buttons" CASCADE;
  DROP TABLE "grants_blocks_list_crd_dck_buttons_locales" CASCADE;
  DROP TABLE "grants_blocks_list_crd_dck" CASCADE;
  DROP TABLE "grants_blocks_list_crd_dck_locales" CASCADE;
  DROP TABLE "_grants_v_blocks_list_crd_dck_cards_tags" CASCADE;
  DROP TABLE "_grants_v_blocks_list_crd_dck_cards_tags_locales" CASCADE;
  DROP TABLE "_grants_v_blocks_list_crd_dck_cards" CASCADE;
  DROP TABLE "_grants_v_blocks_list_crd_dck_cards_locales" CASCADE;
  DROP TABLE "_grants_v_blocks_list_crd_dck_buttons" CASCADE;
  DROP TABLE "_grants_v_blocks_list_crd_dck_buttons_locales" CASCADE;
  DROP TABLE "_grants_v_blocks_list_crd_dck" CASCADE;
  DROP TABLE "_grants_v_blocks_list_crd_dck_locales" CASCADE;
  DROP TABLE "homepage_blocks_list_crd_dck_cards_tags" CASCADE;
  DROP TABLE "homepage_blocks_list_crd_dck_cards_tags_locales" CASCADE;
  DROP TABLE "homepage_blocks_list_crd_dck_cards" CASCADE;
  DROP TABLE "homepage_blocks_list_crd_dck_cards_locales" CASCADE;
  DROP TABLE "homepage_blocks_list_crd_dck_buttons" CASCADE;
  DROP TABLE "homepage_blocks_list_crd_dck_buttons_locales" CASCADE;
  DROP TABLE "homepage_blocks_list_crd_dck" CASCADE;
  DROP TABLE "homepage_blocks_list_crd_dck_locales" CASCADE;
  DROP TABLE "_homepage_v_blocks_list_crd_dck_cards_tags" CASCADE;
  DROP TABLE "_homepage_v_blocks_list_crd_dck_cards_tags_locales" CASCADE;
  DROP TABLE "_homepage_v_blocks_list_crd_dck_cards" CASCADE;
  DROP TABLE "_homepage_v_blocks_list_crd_dck_cards_locales" CASCADE;
  DROP TABLE "_homepage_v_blocks_list_crd_dck_buttons" CASCADE;
  DROP TABLE "_homepage_v_blocks_list_crd_dck_buttons_locales" CASCADE;
  DROP TABLE "_homepage_v_blocks_list_crd_dck" CASCADE;
  DROP TABLE "_homepage_v_blocks_list_crd_dck_locales" CASCADE;
  DROP TYPE "public"."enum_grants_blocks_list_crd_dck_cards_link_type";
  DROP TYPE "public"."enum_grants_blocks_list_crd_dck_buttons_link_type";
  DROP TYPE "public"."enum__grants_v_blocks_list_crd_dck_cards_link_type";
  DROP TYPE "public"."enum__grants_v_blocks_list_crd_dck_buttons_link_type";
  DROP TYPE "public"."enum_homepage_blocks_list_crd_dck_cards_link_type";
  DROP TYPE "public"."enum_homepage_blocks_list_crd_dck_buttons_link_type";
  DROP TYPE "public"."enum__homepage_v_blocks_list_crd_dck_cards_link_type";
  DROP TYPE "public"."enum__homepage_v_blocks_list_crd_dck_buttons_link_type";`)
}
