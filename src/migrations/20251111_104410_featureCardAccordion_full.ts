import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_grants_blocks_feat_crd_acc_feat_crds_crd_colour" AS ENUM('forest', 'turmeric', 'sky', 'rose', 'lavender', 'fire');
  CREATE TYPE "public"."enum__grants_v_blocks_feat_crd_acc_feat_crds_crd_colour" AS ENUM('forest', 'turmeric', 'sky', 'rose', 'lavender', 'fire');
  CREATE TYPE "public"."enum_homepage_blocks_feat_crd_acc_feat_crds_crd_colour" AS ENUM('forest', 'turmeric', 'sky', 'rose', 'lavender', 'fire');
  CREATE TYPE "public"."enum__homepage_v_blocks_feat_crd_acc_feat_crds_crd_colour" AS ENUM('forest', 'turmeric', 'sky', 'rose', 'lavender', 'fire');
  CREATE TABLE "grants_blocks_feat_crd_acc_feat_crds" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"mascot_id" integer,
  	"crd_colour" "enum_grants_blocks_feat_crd_acc_feat_crds_crd_colour" DEFAULT 'forest'
  );
  
  CREATE TABLE "grants_blocks_feat_crd_acc_feat_crds_locales" (
  	"acc_title" varchar,
  	"acc_content" jsonb,
  	"crd_tag" varchar,
  	"crd_content" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "grants_blocks_feat_crd_acc" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "grants_blocks_feat_crd_acc_locales" (
  	"title" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "_grants_v_blocks_feat_crd_acc_feat_crds" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"mascot_id" integer,
  	"crd_colour" "enum__grants_v_blocks_feat_crd_acc_feat_crds_crd_colour" DEFAULT 'forest',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_grants_v_blocks_feat_crd_acc_feat_crds_locales" (
  	"acc_title" varchar,
  	"acc_content" jsonb,
  	"crd_tag" varchar,
  	"crd_content" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_grants_v_blocks_feat_crd_acc" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_grants_v_blocks_feat_crd_acc_locales" (
  	"title" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "homepage_blocks_feat_crd_acc_feat_crds" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"mascot_id" integer,
  	"crd_colour" "enum_homepage_blocks_feat_crd_acc_feat_crds_crd_colour" DEFAULT 'forest'
  );
  
  CREATE TABLE "homepage_blocks_feat_crd_acc_feat_crds_locales" (
  	"acc_title" varchar,
  	"acc_content" jsonb,
  	"crd_tag" varchar,
  	"crd_content" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "homepage_blocks_feat_crd_acc" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "homepage_blocks_feat_crd_acc_locales" (
  	"title" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "_homepage_v_blocks_feat_crd_acc_feat_crds" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"mascot_id" integer,
  	"crd_colour" "enum__homepage_v_blocks_feat_crd_acc_feat_crds_crd_colour" DEFAULT 'forest',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_homepage_v_blocks_feat_crd_acc_feat_crds_locales" (
  	"acc_title" varchar,
  	"acc_content" jsonb,
  	"crd_tag" varchar,
  	"crd_content" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_homepage_v_blocks_feat_crd_acc" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_homepage_v_blocks_feat_crd_acc_locales" (
  	"title" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  ALTER TABLE "grants_blocks_feat_crd_acc_feat_crds" ADD CONSTRAINT "grants_blocks_feat_crd_acc_feat_crds_mascot_id_asset_cloud_id_fk" FOREIGN KEY ("mascot_id") REFERENCES "public"."asset_cloud"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "grants_blocks_feat_crd_acc_feat_crds" ADD CONSTRAINT "grants_blocks_feat_crd_acc_feat_crds_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."grants_blocks_feat_crd_acc"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "grants_blocks_feat_crd_acc_feat_crds_locales" ADD CONSTRAINT "grants_blocks_feat_crd_acc_feat_crds_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."grants_blocks_feat_crd_acc_feat_crds"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "grants_blocks_feat_crd_acc" ADD CONSTRAINT "grants_blocks_feat_crd_acc_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."grants"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "grants_blocks_feat_crd_acc_locales" ADD CONSTRAINT "grants_blocks_feat_crd_acc_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."grants_blocks_feat_crd_acc"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_grants_v_blocks_feat_crd_acc_feat_crds" ADD CONSTRAINT "_grants_v_blocks_feat_crd_acc_feat_crds_mascot_id_asset_cloud_id_fk" FOREIGN KEY ("mascot_id") REFERENCES "public"."asset_cloud"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_grants_v_blocks_feat_crd_acc_feat_crds" ADD CONSTRAINT "_grants_v_blocks_feat_crd_acc_feat_crds_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_grants_v_blocks_feat_crd_acc"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_grants_v_blocks_feat_crd_acc_feat_crds_locales" ADD CONSTRAINT "_grants_v_blocks_feat_crd_acc_feat_crds_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_grants_v_blocks_feat_crd_acc_feat_crds"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_grants_v_blocks_feat_crd_acc" ADD CONSTRAINT "_grants_v_blocks_feat_crd_acc_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_grants_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_grants_v_blocks_feat_crd_acc_locales" ADD CONSTRAINT "_grants_v_blocks_feat_crd_acc_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_grants_v_blocks_feat_crd_acc"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_blocks_feat_crd_acc_feat_crds" ADD CONSTRAINT "homepage_blocks_feat_crd_acc_feat_crds_mascot_id_asset_cloud_id_fk" FOREIGN KEY ("mascot_id") REFERENCES "public"."asset_cloud"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "homepage_blocks_feat_crd_acc_feat_crds" ADD CONSTRAINT "homepage_blocks_feat_crd_acc_feat_crds_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage_blocks_feat_crd_acc"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_blocks_feat_crd_acc_feat_crds_locales" ADD CONSTRAINT "homepage_blocks_feat_crd_acc_feat_crds_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage_blocks_feat_crd_acc_feat_crds"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_blocks_feat_crd_acc" ADD CONSTRAINT "homepage_blocks_feat_crd_acc_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_blocks_feat_crd_acc_locales" ADD CONSTRAINT "homepage_blocks_feat_crd_acc_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage_blocks_feat_crd_acc"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_homepage_v_blocks_feat_crd_acc_feat_crds" ADD CONSTRAINT "_homepage_v_blocks_feat_crd_acc_feat_crds_mascot_id_asset_cloud_id_fk" FOREIGN KEY ("mascot_id") REFERENCES "public"."asset_cloud"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_homepage_v_blocks_feat_crd_acc_feat_crds" ADD CONSTRAINT "_homepage_v_blocks_feat_crd_acc_feat_crds_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_homepage_v_blocks_feat_crd_acc"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_homepage_v_blocks_feat_crd_acc_feat_crds_locales" ADD CONSTRAINT "_homepage_v_blocks_feat_crd_acc_feat_crds_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_homepage_v_blocks_feat_crd_acc_feat_crds"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_homepage_v_blocks_feat_crd_acc" ADD CONSTRAINT "_homepage_v_blocks_feat_crd_acc_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_homepage_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_homepage_v_blocks_feat_crd_acc_locales" ADD CONSTRAINT "_homepage_v_blocks_feat_crd_acc_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_homepage_v_blocks_feat_crd_acc"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "grants_blocks_feat_crd_acc_feat_crds_order_idx" ON "grants_blocks_feat_crd_acc_feat_crds" USING btree ("_order");
  CREATE INDEX "grants_blocks_feat_crd_acc_feat_crds_parent_id_idx" ON "grants_blocks_feat_crd_acc_feat_crds" USING btree ("_parent_id");
  CREATE INDEX "grants_blocks_feat_crd_acc_feat_crds_mascot_idx" ON "grants_blocks_feat_crd_acc_feat_crds" USING btree ("mascot_id");
  CREATE UNIQUE INDEX "grants_blocks_feat_crd_acc_feat_crds_locales_locale_parent_id_unique" ON "grants_blocks_feat_crd_acc_feat_crds_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "grants_blocks_feat_crd_acc_order_idx" ON "grants_blocks_feat_crd_acc" USING btree ("_order");
  CREATE INDEX "grants_blocks_feat_crd_acc_parent_id_idx" ON "grants_blocks_feat_crd_acc" USING btree ("_parent_id");
  CREATE INDEX "grants_blocks_feat_crd_acc_path_idx" ON "grants_blocks_feat_crd_acc" USING btree ("_path");
  CREATE UNIQUE INDEX "grants_blocks_feat_crd_acc_locales_locale_parent_id_unique" ON "grants_blocks_feat_crd_acc_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_grants_v_blocks_feat_crd_acc_feat_crds_order_idx" ON "_grants_v_blocks_feat_crd_acc_feat_crds" USING btree ("_order");
  CREATE INDEX "_grants_v_blocks_feat_crd_acc_feat_crds_parent_id_idx" ON "_grants_v_blocks_feat_crd_acc_feat_crds" USING btree ("_parent_id");
  CREATE INDEX "_grants_v_blocks_feat_crd_acc_feat_crds_mascot_idx" ON "_grants_v_blocks_feat_crd_acc_feat_crds" USING btree ("mascot_id");
  CREATE UNIQUE INDEX "_grants_v_blocks_feat_crd_acc_feat_crds_locales_locale_parent_id_unique" ON "_grants_v_blocks_feat_crd_acc_feat_crds_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_grants_v_blocks_feat_crd_acc_order_idx" ON "_grants_v_blocks_feat_crd_acc" USING btree ("_order");
  CREATE INDEX "_grants_v_blocks_feat_crd_acc_parent_id_idx" ON "_grants_v_blocks_feat_crd_acc" USING btree ("_parent_id");
  CREATE INDEX "_grants_v_blocks_feat_crd_acc_path_idx" ON "_grants_v_blocks_feat_crd_acc" USING btree ("_path");
  CREATE UNIQUE INDEX "_grants_v_blocks_feat_crd_acc_locales_locale_parent_id_unique" ON "_grants_v_blocks_feat_crd_acc_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "homepage_blocks_feat_crd_acc_feat_crds_order_idx" ON "homepage_blocks_feat_crd_acc_feat_crds" USING btree ("_order");
  CREATE INDEX "homepage_blocks_feat_crd_acc_feat_crds_parent_id_idx" ON "homepage_blocks_feat_crd_acc_feat_crds" USING btree ("_parent_id");
  CREATE INDEX "homepage_blocks_feat_crd_acc_feat_crds_mascot_idx" ON "homepage_blocks_feat_crd_acc_feat_crds" USING btree ("mascot_id");
  CREATE UNIQUE INDEX "homepage_blocks_feat_crd_acc_feat_crds_locales_locale_parent_id_unique" ON "homepage_blocks_feat_crd_acc_feat_crds_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "homepage_blocks_feat_crd_acc_order_idx" ON "homepage_blocks_feat_crd_acc" USING btree ("_order");
  CREATE INDEX "homepage_blocks_feat_crd_acc_parent_id_idx" ON "homepage_blocks_feat_crd_acc" USING btree ("_parent_id");
  CREATE INDEX "homepage_blocks_feat_crd_acc_path_idx" ON "homepage_blocks_feat_crd_acc" USING btree ("_path");
  CREATE UNIQUE INDEX "homepage_blocks_feat_crd_acc_locales_locale_parent_id_unique" ON "homepage_blocks_feat_crd_acc_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_homepage_v_blocks_feat_crd_acc_feat_crds_order_idx" ON "_homepage_v_blocks_feat_crd_acc_feat_crds" USING btree ("_order");
  CREATE INDEX "_homepage_v_blocks_feat_crd_acc_feat_crds_parent_id_idx" ON "_homepage_v_blocks_feat_crd_acc_feat_crds" USING btree ("_parent_id");
  CREATE INDEX "_homepage_v_blocks_feat_crd_acc_feat_crds_mascot_idx" ON "_homepage_v_blocks_feat_crd_acc_feat_crds" USING btree ("mascot_id");
  CREATE UNIQUE INDEX "_homepage_v_blocks_feat_crd_acc_feat_crds_locales_locale_parent_id_unique" ON "_homepage_v_blocks_feat_crd_acc_feat_crds_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_homepage_v_blocks_feat_crd_acc_order_idx" ON "_homepage_v_blocks_feat_crd_acc" USING btree ("_order");
  CREATE INDEX "_homepage_v_blocks_feat_crd_acc_parent_id_idx" ON "_homepage_v_blocks_feat_crd_acc" USING btree ("_parent_id");
  CREATE INDEX "_homepage_v_blocks_feat_crd_acc_path_idx" ON "_homepage_v_blocks_feat_crd_acc" USING btree ("_path");
  CREATE UNIQUE INDEX "_homepage_v_blocks_feat_crd_acc_locales_locale_parent_id_unique" ON "_homepage_v_blocks_feat_crd_acc_locales" USING btree ("_locale","_parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "grants_blocks_feat_crd_acc_feat_crds" CASCADE;
  DROP TABLE "grants_blocks_feat_crd_acc_feat_crds_locales" CASCADE;
  DROP TABLE "grants_blocks_feat_crd_acc" CASCADE;
  DROP TABLE "grants_blocks_feat_crd_acc_locales" CASCADE;
  DROP TABLE "_grants_v_blocks_feat_crd_acc_feat_crds" CASCADE;
  DROP TABLE "_grants_v_blocks_feat_crd_acc_feat_crds_locales" CASCADE;
  DROP TABLE "_grants_v_blocks_feat_crd_acc" CASCADE;
  DROP TABLE "_grants_v_blocks_feat_crd_acc_locales" CASCADE;
  DROP TABLE "homepage_blocks_feat_crd_acc_feat_crds" CASCADE;
  DROP TABLE "homepage_blocks_feat_crd_acc_feat_crds_locales" CASCADE;
  DROP TABLE "homepage_blocks_feat_crd_acc" CASCADE;
  DROP TABLE "homepage_blocks_feat_crd_acc_locales" CASCADE;
  DROP TABLE "_homepage_v_blocks_feat_crd_acc_feat_crds" CASCADE;
  DROP TABLE "_homepage_v_blocks_feat_crd_acc_feat_crds_locales" CASCADE;
  DROP TABLE "_homepage_v_blocks_feat_crd_acc" CASCADE;
  DROP TABLE "_homepage_v_blocks_feat_crd_acc_locales" CASCADE;
  DROP TYPE "public"."enum_grants_blocks_feat_crd_acc_feat_crds_crd_colour";
  DROP TYPE "public"."enum__grants_v_blocks_feat_crd_acc_feat_crds_crd_colour";
  DROP TYPE "public"."enum_homepage_blocks_feat_crd_acc_feat_crds_crd_colour";
  DROP TYPE "public"."enum__homepage_v_blocks_feat_crd_acc_feat_crds_crd_colour";`)
}
