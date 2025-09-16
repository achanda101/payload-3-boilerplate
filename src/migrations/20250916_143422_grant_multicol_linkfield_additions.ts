import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_grants_blocks_mcol_info_block_multicols_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__grants_v_blocks_mcol_info_block_multicols_link_type" AS ENUM('reference', 'custom');
  CREATE TABLE "grants_blocks_mcol_info_block_multicols" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"add_link" boolean,
  	"link_type" "enum_grants_blocks_mcol_info_block_multicols_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_download_link" boolean,
  	"link_url" varchar
  );
  
  CREATE TABLE "grants_blocks_mcol_info_block_multicols_locales" (
  	"title" varchar,
  	"col_content" jsonb,
  	"link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "grants_blocks_mcol_info_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "_grants_v_blocks_mcol_info_block_multicols" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"add_link" boolean,
  	"link_type" "enum__grants_v_blocks_mcol_info_block_multicols_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_download_link" boolean,
  	"link_url" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_grants_v_blocks_mcol_info_block_multicols_locales" (
  	"title" varchar,
  	"col_content" jsonb,
  	"link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_grants_v_blocks_mcol_info_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  ALTER TABLE "grants_blocks_grants_hero_block_hero_buttons" ADD COLUMN "link_download_link" boolean;
  ALTER TABLE "_grants_v_blocks_grants_hero_block_hero_buttons" ADD COLUMN "link_download_link" boolean;
  ALTER TABLE "homepage_hero_section_cta_button" ADD COLUMN "link_download_link" boolean;
  ALTER TABLE "homepage_blocks_secondarycta_cta_button" ADD COLUMN "link_download_link" boolean;
  ALTER TABLE "_homepage_v_version_hero_section_cta_button" ADD COLUMN "link_download_link" boolean;
  ALTER TABLE "_homepage_v_blocks_secondarycta_cta_button" ADD COLUMN "link_download_link" boolean;
  ALTER TABLE "nav_menu_items_nav_items" ADD COLUMN "link_download_link" boolean;
  ALTER TABLE "grants_blocks_mcol_info_block_multicols" ADD CONSTRAINT "grants_blocks_mcol_info_block_multicols_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."grants_blocks_mcol_info_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "grants_blocks_mcol_info_block_multicols_locales" ADD CONSTRAINT "grants_blocks_mcol_info_block_multicols_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."grants_blocks_mcol_info_block_multicols"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "grants_blocks_mcol_info_block" ADD CONSTRAINT "grants_blocks_mcol_info_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."grants"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_grants_v_blocks_mcol_info_block_multicols" ADD CONSTRAINT "_grants_v_blocks_mcol_info_block_multicols_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_grants_v_blocks_mcol_info_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_grants_v_blocks_mcol_info_block_multicols_locales" ADD CONSTRAINT "_grants_v_blocks_mcol_info_block_multicols_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_grants_v_blocks_mcol_info_block_multicols"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_grants_v_blocks_mcol_info_block" ADD CONSTRAINT "_grants_v_blocks_mcol_info_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_grants_v"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "grants_blocks_mcol_info_block_multicols_order_idx" ON "grants_blocks_mcol_info_block_multicols" USING btree ("_order");
  CREATE INDEX "grants_blocks_mcol_info_block_multicols_parent_id_idx" ON "grants_blocks_mcol_info_block_multicols" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "grants_blocks_mcol_info_block_multicols_locales_locale_parent_id_unique" ON "grants_blocks_mcol_info_block_multicols_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "grants_blocks_mcol_info_block_order_idx" ON "grants_blocks_mcol_info_block" USING btree ("_order");
  CREATE INDEX "grants_blocks_mcol_info_block_parent_id_idx" ON "grants_blocks_mcol_info_block" USING btree ("_parent_id");
  CREATE INDEX "grants_blocks_mcol_info_block_path_idx" ON "grants_blocks_mcol_info_block" USING btree ("_path");
  CREATE INDEX "_grants_v_blocks_mcol_info_block_multicols_order_idx" ON "_grants_v_blocks_mcol_info_block_multicols" USING btree ("_order");
  CREATE INDEX "_grants_v_blocks_mcol_info_block_multicols_parent_id_idx" ON "_grants_v_blocks_mcol_info_block_multicols" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_grants_v_blocks_mcol_info_block_multicols_locales_locale_parent_id_unique" ON "_grants_v_blocks_mcol_info_block_multicols_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_grants_v_blocks_mcol_info_block_order_idx" ON "_grants_v_blocks_mcol_info_block" USING btree ("_order");
  CREATE INDEX "_grants_v_blocks_mcol_info_block_parent_id_idx" ON "_grants_v_blocks_mcol_info_block" USING btree ("_parent_id");
  CREATE INDEX "_grants_v_blocks_mcol_info_block_path_idx" ON "_grants_v_blocks_mcol_info_block" USING btree ("_path");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "grants_blocks_mcol_info_block_multicols" CASCADE;
  DROP TABLE "grants_blocks_mcol_info_block_multicols_locales" CASCADE;
  DROP TABLE "grants_blocks_mcol_info_block" CASCADE;
  DROP TABLE "_grants_v_blocks_mcol_info_block_multicols" CASCADE;
  DROP TABLE "_grants_v_blocks_mcol_info_block_multicols_locales" CASCADE;
  DROP TABLE "_grants_v_blocks_mcol_info_block" CASCADE;
  ALTER TABLE "grants_blocks_grants_hero_block_hero_buttons" DROP COLUMN "link_download_link";
  ALTER TABLE "_grants_v_blocks_grants_hero_block_hero_buttons" DROP COLUMN "link_download_link";
  ALTER TABLE "homepage_hero_section_cta_button" DROP COLUMN "link_download_link";
  ALTER TABLE "homepage_blocks_secondarycta_cta_button" DROP COLUMN "link_download_link";
  ALTER TABLE "_homepage_v_version_hero_section_cta_button" DROP COLUMN "link_download_link";
  ALTER TABLE "_homepage_v_blocks_secondarycta_cta_button" DROP COLUMN "link_download_link";
  ALTER TABLE "nav_menu_items_nav_items" DROP COLUMN "link_download_link";
  DROP TYPE "public"."enum_grants_blocks_mcol_info_block_multicols_link_type";
  DROP TYPE "public"."enum__grants_v_blocks_mcol_info_block_multicols_link_type";`)
}
