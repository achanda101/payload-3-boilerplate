import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_homepage_blocks_secondarycta_cta_button_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__homepage_v_blocks_secondarycta_cta_button_link_type" AS ENUM('reference', 'custom');
  CREATE TABLE "homepage_blocks_secondarycta_cta_button" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"button_primary" boolean DEFAULT false,
  	"link_type" "enum_homepage_blocks_secondarycta_cta_button_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar
  );
  
  CREATE TABLE "homepage_blocks_secondarycta_cta_button_locales" (
  	"link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "homepage_blocks_secondarycta" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "homepage_blocks_secondarycta_locales" (
  	"cta_title" varchar,
  	"cta_subtitle" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "_homepage_v_blocks_secondarycta_cta_button" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"button_primary" boolean DEFAULT false,
  	"link_type" "enum__homepage_v_blocks_secondarycta_cta_button_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_homepage_v_blocks_secondarycta_cta_button_locales" (
  	"link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_homepage_v_blocks_secondarycta" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_homepage_v_blocks_secondarycta_locales" (
  	"cta_title" varchar,
  	"cta_subtitle" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  ALTER TABLE "homepage_blocks_secondarycta_cta_button" ADD CONSTRAINT "homepage_blocks_secondarycta_cta_button_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage_blocks_secondarycta"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_blocks_secondarycta_cta_button_locales" ADD CONSTRAINT "homepage_blocks_secondarycta_cta_button_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage_blocks_secondarycta_cta_button"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_blocks_secondarycta" ADD CONSTRAINT "homepage_blocks_secondarycta_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_blocks_secondarycta_locales" ADD CONSTRAINT "homepage_blocks_secondarycta_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage_blocks_secondarycta"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_homepage_v_blocks_secondarycta_cta_button" ADD CONSTRAINT "_homepage_v_blocks_secondarycta_cta_button_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_homepage_v_blocks_secondarycta"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_homepage_v_blocks_secondarycta_cta_button_locales" ADD CONSTRAINT "_homepage_v_blocks_secondarycta_cta_button_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_homepage_v_blocks_secondarycta_cta_button"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_homepage_v_blocks_secondarycta" ADD CONSTRAINT "_homepage_v_blocks_secondarycta_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_homepage_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_homepage_v_blocks_secondarycta_locales" ADD CONSTRAINT "_homepage_v_blocks_secondarycta_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_homepage_v_blocks_secondarycta"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "homepage_blocks_secondarycta_cta_button_order_idx" ON "homepage_blocks_secondarycta_cta_button" USING btree ("_order");
  CREATE INDEX "homepage_blocks_secondarycta_cta_button_parent_id_idx" ON "homepage_blocks_secondarycta_cta_button" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "homepage_blocks_secondarycta_cta_button_locales_locale_parent_id_unique" ON "homepage_blocks_secondarycta_cta_button_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "homepage_blocks_secondarycta_order_idx" ON "homepage_blocks_secondarycta" USING btree ("_order");
  CREATE INDEX "homepage_blocks_secondarycta_parent_id_idx" ON "homepage_blocks_secondarycta" USING btree ("_parent_id");
  CREATE INDEX "homepage_blocks_secondarycta_path_idx" ON "homepage_blocks_secondarycta" USING btree ("_path");
  CREATE UNIQUE INDEX "homepage_blocks_secondarycta_locales_locale_parent_id_unique" ON "homepage_blocks_secondarycta_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_homepage_v_blocks_secondarycta_cta_button_order_idx" ON "_homepage_v_blocks_secondarycta_cta_button" USING btree ("_order");
  CREATE INDEX "_homepage_v_blocks_secondarycta_cta_button_parent_id_idx" ON "_homepage_v_blocks_secondarycta_cta_button" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_homepage_v_blocks_secondarycta_cta_button_locales_locale_parent_id_unique" ON "_homepage_v_blocks_secondarycta_cta_button_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_homepage_v_blocks_secondarycta_order_idx" ON "_homepage_v_blocks_secondarycta" USING btree ("_order");
  CREATE INDEX "_homepage_v_blocks_secondarycta_parent_id_idx" ON "_homepage_v_blocks_secondarycta" USING btree ("_parent_id");
  CREATE INDEX "_homepage_v_blocks_secondarycta_path_idx" ON "_homepage_v_blocks_secondarycta" USING btree ("_path");
  CREATE UNIQUE INDEX "_homepage_v_blocks_secondarycta_locales_locale_parent_id_unique" ON "_homepage_v_blocks_secondarycta_locales" USING btree ("_locale","_parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "homepage_blocks_secondarycta_cta_button" CASCADE;
  DROP TABLE "homepage_blocks_secondarycta_cta_button_locales" CASCADE;
  DROP TABLE "homepage_blocks_secondarycta" CASCADE;
  DROP TABLE "homepage_blocks_secondarycta_locales" CASCADE;
  DROP TABLE "_homepage_v_blocks_secondarycta_cta_button" CASCADE;
  DROP TABLE "_homepage_v_blocks_secondarycta_cta_button_locales" CASCADE;
  DROP TABLE "_homepage_v_blocks_secondarycta" CASCADE;
  DROP TABLE "_homepage_v_blocks_secondarycta_locales" CASCADE;
  DROP TYPE "public"."enum_homepage_blocks_secondarycta_cta_button_link_type";
  DROP TYPE "public"."enum__homepage_v_blocks_secondarycta_cta_button_link_type";`)
}
