import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_pillar_card_align" AS ENUM('left', 'center');
  CREATE TYPE "public"."enum__pages_v_blocks_pillar_card_align" AS ENUM('left', 'center');
  CREATE TYPE "public"."enum_homepage_blocks_pillar_card_align" AS ENUM('left', 'center');
  CREATE TYPE "public"."enum__homepage_v_blocks_pillar_card_align" AS ENUM('left', 'center');
  CREATE TABLE "pages_blocks_pillar_card_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"mascot_id" integer
  );
  
  CREATE TABLE "pages_blocks_pillar_card_cards_locales" (
  	"title" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_pillar_card" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"align" "enum_pages_blocks_pillar_card_align" DEFAULT 'left',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_pillar_card_locales" (
  	"title" varchar,
  	"subtitle" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_pillar_card_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"mascot_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_pillar_card_cards_locales" (
  	"title" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_pillar_card" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"align" "enum__pages_v_blocks_pillar_card_align" DEFAULT 'left',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_pillar_card_locales" (
  	"title" varchar,
  	"subtitle" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "homepage_blocks_pillar_card_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"mascot_id" integer
  );
  
  CREATE TABLE "homepage_blocks_pillar_card_cards_locales" (
  	"title" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "homepage_blocks_pillar_card" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"align" "enum_homepage_blocks_pillar_card_align" DEFAULT 'left',
  	"block_name" varchar
  );
  
  CREATE TABLE "homepage_blocks_pillar_card_locales" (
  	"title" varchar,
  	"subtitle" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "_homepage_v_blocks_pillar_card_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"mascot_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_homepage_v_blocks_pillar_card_cards_locales" (
  	"title" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_homepage_v_blocks_pillar_card" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"align" "enum__homepage_v_blocks_pillar_card_align" DEFAULT 'left',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_homepage_v_blocks_pillar_card_locales" (
  	"title" varchar,
  	"subtitle" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  ALTER TABLE "pages_blocks_pillar_card_cards" ADD CONSTRAINT "pages_blocks_pillar_card_cards_mascot_id_asset_cloud_id_fk" FOREIGN KEY ("mascot_id") REFERENCES "public"."asset_cloud"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_pillar_card_cards" ADD CONSTRAINT "pages_blocks_pillar_card_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_pillar_card"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_pillar_card_cards_locales" ADD CONSTRAINT "pages_blocks_pillar_card_cards_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_pillar_card_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_pillar_card" ADD CONSTRAINT "pages_blocks_pillar_card_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_pillar_card_locales" ADD CONSTRAINT "pages_blocks_pillar_card_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_pillar_card"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_pillar_card_cards" ADD CONSTRAINT "_pages_v_blocks_pillar_card_cards_mascot_id_asset_cloud_id_fk" FOREIGN KEY ("mascot_id") REFERENCES "public"."asset_cloud"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_pillar_card_cards" ADD CONSTRAINT "_pages_v_blocks_pillar_card_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_pillar_card"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_pillar_card_cards_locales" ADD CONSTRAINT "_pages_v_blocks_pillar_card_cards_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_pillar_card_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_pillar_card" ADD CONSTRAINT "_pages_v_blocks_pillar_card_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_pillar_card_locales" ADD CONSTRAINT "_pages_v_blocks_pillar_card_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_pillar_card"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_blocks_pillar_card_cards" ADD CONSTRAINT "homepage_blocks_pillar_card_cards_mascot_id_asset_cloud_id_fk" FOREIGN KEY ("mascot_id") REFERENCES "public"."asset_cloud"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "homepage_blocks_pillar_card_cards" ADD CONSTRAINT "homepage_blocks_pillar_card_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage_blocks_pillar_card"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_blocks_pillar_card_cards_locales" ADD CONSTRAINT "homepage_blocks_pillar_card_cards_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage_blocks_pillar_card_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_blocks_pillar_card" ADD CONSTRAINT "homepage_blocks_pillar_card_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_blocks_pillar_card_locales" ADD CONSTRAINT "homepage_blocks_pillar_card_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage_blocks_pillar_card"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_homepage_v_blocks_pillar_card_cards" ADD CONSTRAINT "_homepage_v_blocks_pillar_card_cards_mascot_id_asset_cloud_id_fk" FOREIGN KEY ("mascot_id") REFERENCES "public"."asset_cloud"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_homepage_v_blocks_pillar_card_cards" ADD CONSTRAINT "_homepage_v_blocks_pillar_card_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_homepage_v_blocks_pillar_card"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_homepage_v_blocks_pillar_card_cards_locales" ADD CONSTRAINT "_homepage_v_blocks_pillar_card_cards_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_homepage_v_blocks_pillar_card_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_homepage_v_blocks_pillar_card" ADD CONSTRAINT "_homepage_v_blocks_pillar_card_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_homepage_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_homepage_v_blocks_pillar_card_locales" ADD CONSTRAINT "_homepage_v_blocks_pillar_card_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_homepage_v_blocks_pillar_card"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_pillar_card_cards_order_idx" ON "pages_blocks_pillar_card_cards" USING btree ("_order");
  CREATE INDEX "pages_blocks_pillar_card_cards_parent_id_idx" ON "pages_blocks_pillar_card_cards" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_pillar_card_cards_mascot_idx" ON "pages_blocks_pillar_card_cards" USING btree ("mascot_id");
  CREATE UNIQUE INDEX "pages_blocks_pillar_card_cards_locales_locale_parent_id_uniq" ON "pages_blocks_pillar_card_cards_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_pillar_card_order_idx" ON "pages_blocks_pillar_card" USING btree ("_order");
  CREATE INDEX "pages_blocks_pillar_card_parent_id_idx" ON "pages_blocks_pillar_card" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_pillar_card_path_idx" ON "pages_blocks_pillar_card" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_blocks_pillar_card_locales_locale_parent_id_unique" ON "pages_blocks_pillar_card_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_pillar_card_cards_order_idx" ON "_pages_v_blocks_pillar_card_cards" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_pillar_card_cards_parent_id_idx" ON "_pages_v_blocks_pillar_card_cards" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_pillar_card_cards_mascot_idx" ON "_pages_v_blocks_pillar_card_cards" USING btree ("mascot_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_pillar_card_cards_locales_locale_parent_id_u" ON "_pages_v_blocks_pillar_card_cards_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_pillar_card_order_idx" ON "_pages_v_blocks_pillar_card" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_pillar_card_parent_id_idx" ON "_pages_v_blocks_pillar_card" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_pillar_card_path_idx" ON "_pages_v_blocks_pillar_card" USING btree ("_path");
  CREATE UNIQUE INDEX "_pages_v_blocks_pillar_card_locales_locale_parent_id_unique" ON "_pages_v_blocks_pillar_card_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "homepage_blocks_pillar_card_cards_order_idx" ON "homepage_blocks_pillar_card_cards" USING btree ("_order");
  CREATE INDEX "homepage_blocks_pillar_card_cards_parent_id_idx" ON "homepage_blocks_pillar_card_cards" USING btree ("_parent_id");
  CREATE INDEX "homepage_blocks_pillar_card_cards_mascot_idx" ON "homepage_blocks_pillar_card_cards" USING btree ("mascot_id");
  CREATE UNIQUE INDEX "homepage_blocks_pillar_card_cards_locales_locale_parent_id_u" ON "homepage_blocks_pillar_card_cards_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "homepage_blocks_pillar_card_order_idx" ON "homepage_blocks_pillar_card" USING btree ("_order");
  CREATE INDEX "homepage_blocks_pillar_card_parent_id_idx" ON "homepage_blocks_pillar_card" USING btree ("_parent_id");
  CREATE INDEX "homepage_blocks_pillar_card_path_idx" ON "homepage_blocks_pillar_card" USING btree ("_path");
  CREATE UNIQUE INDEX "homepage_blocks_pillar_card_locales_locale_parent_id_unique" ON "homepage_blocks_pillar_card_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_homepage_v_blocks_pillar_card_cards_order_idx" ON "_homepage_v_blocks_pillar_card_cards" USING btree ("_order");
  CREATE INDEX "_homepage_v_blocks_pillar_card_cards_parent_id_idx" ON "_homepage_v_blocks_pillar_card_cards" USING btree ("_parent_id");
  CREATE INDEX "_homepage_v_blocks_pillar_card_cards_mascot_idx" ON "_homepage_v_blocks_pillar_card_cards" USING btree ("mascot_id");
  CREATE UNIQUE INDEX "_homepage_v_blocks_pillar_card_cards_locales_locale_parent_i" ON "_homepage_v_blocks_pillar_card_cards_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_homepage_v_blocks_pillar_card_order_idx" ON "_homepage_v_blocks_pillar_card" USING btree ("_order");
  CREATE INDEX "_homepage_v_blocks_pillar_card_parent_id_idx" ON "_homepage_v_blocks_pillar_card" USING btree ("_parent_id");
  CREATE INDEX "_homepage_v_blocks_pillar_card_path_idx" ON "_homepage_v_blocks_pillar_card" USING btree ("_path");
  CREATE UNIQUE INDEX "_homepage_v_blocks_pillar_card_locales_locale_parent_id_uniq" ON "_homepage_v_blocks_pillar_card_locales" USING btree ("_locale","_parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "pages_blocks_pillar_card_cards" CASCADE;
  DROP TABLE "pages_blocks_pillar_card_cards_locales" CASCADE;
  DROP TABLE "pages_blocks_pillar_card" CASCADE;
  DROP TABLE "pages_blocks_pillar_card_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_pillar_card_cards" CASCADE;
  DROP TABLE "_pages_v_blocks_pillar_card_cards_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_pillar_card" CASCADE;
  DROP TABLE "_pages_v_blocks_pillar_card_locales" CASCADE;
  DROP TABLE "homepage_blocks_pillar_card_cards" CASCADE;
  DROP TABLE "homepage_blocks_pillar_card_cards_locales" CASCADE;
  DROP TABLE "homepage_blocks_pillar_card" CASCADE;
  DROP TABLE "homepage_blocks_pillar_card_locales" CASCADE;
  DROP TABLE "_homepage_v_blocks_pillar_card_cards" CASCADE;
  DROP TABLE "_homepage_v_blocks_pillar_card_cards_locales" CASCADE;
  DROP TABLE "_homepage_v_blocks_pillar_card" CASCADE;
  DROP TABLE "_homepage_v_blocks_pillar_card_locales" CASCADE;
  DROP TYPE "public"."enum_pages_blocks_pillar_card_align";
  DROP TYPE "public"."enum__pages_v_blocks_pillar_card_align";
  DROP TYPE "public"."enum_homepage_blocks_pillar_card_align";
  DROP TYPE "public"."enum__homepage_v_blocks_pillar_card_align";`)
}
