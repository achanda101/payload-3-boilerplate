import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_grants_blocks_ylw_deck_cards_links_link_type" AS ENUM('reference', 'custom', 'email', 'document');
  CREATE TYPE "public"."enum_grants_blocks_ylw_deck_cards_mascot_pos" AS ENUM('top_left', 'center');
  CREATE TYPE "public"."enum__grants_v_blocks_ylw_deck_cards_links_link_type" AS ENUM('reference', 'custom', 'email', 'document');
  CREATE TYPE "public"."enum__grants_v_blocks_ylw_deck_cards_mascot_pos" AS ENUM('top_left', 'center');
  CREATE TABLE "grants_blocks_ylw_deck_cards_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_grants_blocks_ylw_deck_cards_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_download_link" boolean,
  	"link_arrow_link" boolean,
  	"link_pill_solid" boolean,
  	"link_pill_outline" boolean,
  	"link_url" varchar,
  	"link_email" varchar
  );
  
  CREATE TABLE "grants_blocks_ylw_deck_cards_links_locales" (
  	"desc" varchar,
  	"link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "grants_blocks_ylw_deck_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"mascot_id" integer,
  	"mascot_pos" "enum_grants_blocks_ylw_deck_cards_mascot_pos" DEFAULT 'center'
  );
  
  CREATE TABLE "grants_blocks_ylw_deck_cards_locales" (
  	"title" varchar,
  	"subtitle" varchar,
  	"desc" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "grants_blocks_ylw_deck" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "grants_blocks_ylw_deck_locales" (
  	"title" varchar,
  	"desc" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "_grants_v_blocks_ylw_deck_cards_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"link_type" "enum__grants_v_blocks_ylw_deck_cards_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_download_link" boolean,
  	"link_arrow_link" boolean,
  	"link_pill_solid" boolean,
  	"link_pill_outline" boolean,
  	"link_url" varchar,
  	"link_email" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_grants_v_blocks_ylw_deck_cards_links_locales" (
  	"desc" varchar,
  	"link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_grants_v_blocks_ylw_deck_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"mascot_id" integer,
  	"mascot_pos" "enum__grants_v_blocks_ylw_deck_cards_mascot_pos" DEFAULT 'center',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_grants_v_blocks_ylw_deck_cards_locales" (
  	"title" varchar,
  	"subtitle" varchar,
  	"desc" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_grants_v_blocks_ylw_deck" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_grants_v_blocks_ylw_deck_locales" (
  	"title" varchar,
  	"desc" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  ALTER TABLE "grants_blocks_ylw_deck_cards_links" ADD CONSTRAINT "grants_blocks_ylw_deck_cards_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."grants_blocks_ylw_deck_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "grants_blocks_ylw_deck_cards_links_locales" ADD CONSTRAINT "grants_blocks_ylw_deck_cards_links_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."grants_blocks_ylw_deck_cards_links"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "grants_blocks_ylw_deck_cards" ADD CONSTRAINT "grants_blocks_ylw_deck_cards_mascot_id_asset_cloud_id_fk" FOREIGN KEY ("mascot_id") REFERENCES "public"."asset_cloud"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "grants_blocks_ylw_deck_cards" ADD CONSTRAINT "grants_blocks_ylw_deck_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."grants_blocks_ylw_deck"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "grants_blocks_ylw_deck_cards_locales" ADD CONSTRAINT "grants_blocks_ylw_deck_cards_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."grants_blocks_ylw_deck_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "grants_blocks_ylw_deck" ADD CONSTRAINT "grants_blocks_ylw_deck_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."grants"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "grants_blocks_ylw_deck_locales" ADD CONSTRAINT "grants_blocks_ylw_deck_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."grants_blocks_ylw_deck"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_grants_v_blocks_ylw_deck_cards_links" ADD CONSTRAINT "_grants_v_blocks_ylw_deck_cards_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_grants_v_blocks_ylw_deck_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_grants_v_blocks_ylw_deck_cards_links_locales" ADD CONSTRAINT "_grants_v_blocks_ylw_deck_cards_links_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_grants_v_blocks_ylw_deck_cards_links"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_grants_v_blocks_ylw_deck_cards" ADD CONSTRAINT "_grants_v_blocks_ylw_deck_cards_mascot_id_asset_cloud_id_fk" FOREIGN KEY ("mascot_id") REFERENCES "public"."asset_cloud"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_grants_v_blocks_ylw_deck_cards" ADD CONSTRAINT "_grants_v_blocks_ylw_deck_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_grants_v_blocks_ylw_deck"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_grants_v_blocks_ylw_deck_cards_locales" ADD CONSTRAINT "_grants_v_blocks_ylw_deck_cards_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_grants_v_blocks_ylw_deck_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_grants_v_blocks_ylw_deck" ADD CONSTRAINT "_grants_v_blocks_ylw_deck_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_grants_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_grants_v_blocks_ylw_deck_locales" ADD CONSTRAINT "_grants_v_blocks_ylw_deck_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_grants_v_blocks_ylw_deck"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "grants_blocks_ylw_deck_cards_links_order_idx" ON "grants_blocks_ylw_deck_cards_links" USING btree ("_order");
  CREATE INDEX "grants_blocks_ylw_deck_cards_links_parent_id_idx" ON "grants_blocks_ylw_deck_cards_links" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "grants_blocks_ylw_deck_cards_links_locales_locale_parent_id_unique" ON "grants_blocks_ylw_deck_cards_links_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "grants_blocks_ylw_deck_cards_order_idx" ON "grants_blocks_ylw_deck_cards" USING btree ("_order");
  CREATE INDEX "grants_blocks_ylw_deck_cards_parent_id_idx" ON "grants_blocks_ylw_deck_cards" USING btree ("_parent_id");
  CREATE INDEX "grants_blocks_ylw_deck_cards_mascot_idx" ON "grants_blocks_ylw_deck_cards" USING btree ("mascot_id");
  CREATE UNIQUE INDEX "grants_blocks_ylw_deck_cards_locales_locale_parent_id_unique" ON "grants_blocks_ylw_deck_cards_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "grants_blocks_ylw_deck_order_idx" ON "grants_blocks_ylw_deck" USING btree ("_order");
  CREATE INDEX "grants_blocks_ylw_deck_parent_id_idx" ON "grants_blocks_ylw_deck" USING btree ("_parent_id");
  CREATE INDEX "grants_blocks_ylw_deck_path_idx" ON "grants_blocks_ylw_deck" USING btree ("_path");
  CREATE UNIQUE INDEX "grants_blocks_ylw_deck_locales_locale_parent_id_unique" ON "grants_blocks_ylw_deck_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_grants_v_blocks_ylw_deck_cards_links_order_idx" ON "_grants_v_blocks_ylw_deck_cards_links" USING btree ("_order");
  CREATE INDEX "_grants_v_blocks_ylw_deck_cards_links_parent_id_idx" ON "_grants_v_blocks_ylw_deck_cards_links" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_grants_v_blocks_ylw_deck_cards_links_locales_locale_parent_id_unique" ON "_grants_v_blocks_ylw_deck_cards_links_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_grants_v_blocks_ylw_deck_cards_order_idx" ON "_grants_v_blocks_ylw_deck_cards" USING btree ("_order");
  CREATE INDEX "_grants_v_blocks_ylw_deck_cards_parent_id_idx" ON "_grants_v_blocks_ylw_deck_cards" USING btree ("_parent_id");
  CREATE INDEX "_grants_v_blocks_ylw_deck_cards_mascot_idx" ON "_grants_v_blocks_ylw_deck_cards" USING btree ("mascot_id");
  CREATE UNIQUE INDEX "_grants_v_blocks_ylw_deck_cards_locales_locale_parent_id_unique" ON "_grants_v_blocks_ylw_deck_cards_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_grants_v_blocks_ylw_deck_order_idx" ON "_grants_v_blocks_ylw_deck" USING btree ("_order");
  CREATE INDEX "_grants_v_blocks_ylw_deck_parent_id_idx" ON "_grants_v_blocks_ylw_deck" USING btree ("_parent_id");
  CREATE INDEX "_grants_v_blocks_ylw_deck_path_idx" ON "_grants_v_blocks_ylw_deck" USING btree ("_path");
  CREATE UNIQUE INDEX "_grants_v_blocks_ylw_deck_locales_locale_parent_id_unique" ON "_grants_v_blocks_ylw_deck_locales" USING btree ("_locale","_parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "grants_blocks_ylw_deck_cards_links" CASCADE;
  DROP TABLE "grants_blocks_ylw_deck_cards_links_locales" CASCADE;
  DROP TABLE "grants_blocks_ylw_deck_cards" CASCADE;
  DROP TABLE "grants_blocks_ylw_deck_cards_locales" CASCADE;
  DROP TABLE "grants_blocks_ylw_deck" CASCADE;
  DROP TABLE "grants_blocks_ylw_deck_locales" CASCADE;
  DROP TABLE "_grants_v_blocks_ylw_deck_cards_links" CASCADE;
  DROP TABLE "_grants_v_blocks_ylw_deck_cards_links_locales" CASCADE;
  DROP TABLE "_grants_v_blocks_ylw_deck_cards" CASCADE;
  DROP TABLE "_grants_v_blocks_ylw_deck_cards_locales" CASCADE;
  DROP TABLE "_grants_v_blocks_ylw_deck" CASCADE;
  DROP TABLE "_grants_v_blocks_ylw_deck_locales" CASCADE;
  DROP TYPE "public"."enum_grants_blocks_ylw_deck_cards_links_link_type";
  DROP TYPE "public"."enum_grants_blocks_ylw_deck_cards_mascot_pos";
  DROP TYPE "public"."enum__grants_v_blocks_ylw_deck_cards_links_link_type";
  DROP TYPE "public"."enum__grants_v_blocks_ylw_deck_cards_mascot_pos";`)
}
