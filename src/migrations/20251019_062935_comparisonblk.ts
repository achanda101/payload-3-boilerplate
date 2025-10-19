import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_grants_blocks_comparison_blk_buttons_link_type" AS ENUM('reference', 'custom', 'email');
  CREATE TYPE "public"."enum__grants_v_blocks_comparison_blk_buttons_link_type" AS ENUM('reference', 'custom', 'email');
  CREATE TABLE "grants_blocks_comparison_blk_lft_grp_lft_points" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "grants_blocks_comparison_blk_lft_grp_lft_points_locales" (
  	"point" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "grants_blocks_comparison_blk_rt_grp_rt_points" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "grants_blocks_comparison_blk_rt_grp_rt_points_locales" (
  	"point" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "grants_blocks_comparison_blk_buttons" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_grants_blocks_comparison_blk_buttons_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_download_link" boolean,
  	"link_arrow_link" boolean,
  	"link_pill_solid" boolean,
  	"link_pill_outline" boolean,
  	"link_url" varchar,
  	"link_email" varchar
  );
  
  CREATE TABLE "grants_blocks_comparison_blk_buttons_locales" (
  	"link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "grants_blocks_comparison_blk" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "grants_blocks_comparison_blk_locales" (
  	"title" varchar,
  	"desc" varchar,
  	"lft_grp_title" varchar,
  	"lft_grp_desc" varchar,
  	"rt_grp_title" varchar,
  	"rt_grp_desc" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "_grants_v_blocks_comparison_blk_lft_grp_lft_points" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_grants_v_blocks_comparison_blk_lft_grp_lft_points_locales" (
  	"point" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_grants_v_blocks_comparison_blk_rt_grp_rt_points" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_grants_v_blocks_comparison_blk_rt_grp_rt_points_locales" (
  	"point" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_grants_v_blocks_comparison_blk_buttons" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"link_type" "enum__grants_v_blocks_comparison_blk_buttons_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_download_link" boolean,
  	"link_arrow_link" boolean,
  	"link_pill_solid" boolean,
  	"link_pill_outline" boolean,
  	"link_url" varchar,
  	"link_email" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_grants_v_blocks_comparison_blk_buttons_locales" (
  	"link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_grants_v_blocks_comparison_blk" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_grants_v_blocks_comparison_blk_locales" (
  	"title" varchar,
  	"desc" varchar,
  	"lft_grp_title" varchar,
  	"lft_grp_desc" varchar,
  	"rt_grp_title" varchar,
  	"rt_grp_desc" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  ALTER TABLE "grants_blocks_comparison_blk_lft_grp_lft_points" ADD CONSTRAINT "grants_blocks_comparison_blk_lft_grp_lft_points_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."grants_blocks_comparison_blk"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "grants_blocks_comparison_blk_lft_grp_lft_points_locales" ADD CONSTRAINT "grants_blocks_comparison_blk_lft_grp_lft_points_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."grants_blocks_comparison_blk_lft_grp_lft_points"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "grants_blocks_comparison_blk_rt_grp_rt_points" ADD CONSTRAINT "grants_blocks_comparison_blk_rt_grp_rt_points_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."grants_blocks_comparison_blk"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "grants_blocks_comparison_blk_rt_grp_rt_points_locales" ADD CONSTRAINT "grants_blocks_comparison_blk_rt_grp_rt_points_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."grants_blocks_comparison_blk_rt_grp_rt_points"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "grants_blocks_comparison_blk_buttons" ADD CONSTRAINT "grants_blocks_comparison_blk_buttons_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."grants_blocks_comparison_blk"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "grants_blocks_comparison_blk_buttons_locales" ADD CONSTRAINT "grants_blocks_comparison_blk_buttons_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."grants_blocks_comparison_blk_buttons"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "grants_blocks_comparison_blk" ADD CONSTRAINT "grants_blocks_comparison_blk_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."grants"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "grants_blocks_comparison_blk_locales" ADD CONSTRAINT "grants_blocks_comparison_blk_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."grants_blocks_comparison_blk"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_grants_v_blocks_comparison_blk_lft_grp_lft_points" ADD CONSTRAINT "_grants_v_blocks_comparison_blk_lft_grp_lft_points_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_grants_v_blocks_comparison_blk"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_grants_v_blocks_comparison_blk_lft_grp_lft_points_locales" ADD CONSTRAINT "_grants_v_blocks_comparison_blk_lft_grp_lft_points_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_grants_v_blocks_comparison_blk_lft_grp_lft_points"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_grants_v_blocks_comparison_blk_rt_grp_rt_points" ADD CONSTRAINT "_grants_v_blocks_comparison_blk_rt_grp_rt_points_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_grants_v_blocks_comparison_blk"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_grants_v_blocks_comparison_blk_rt_grp_rt_points_locales" ADD CONSTRAINT "_grants_v_blocks_comparison_blk_rt_grp_rt_points_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_grants_v_blocks_comparison_blk_rt_grp_rt_points"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_grants_v_blocks_comparison_blk_buttons" ADD CONSTRAINT "_grants_v_blocks_comparison_blk_buttons_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_grants_v_blocks_comparison_blk"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_grants_v_blocks_comparison_blk_buttons_locales" ADD CONSTRAINT "_grants_v_blocks_comparison_blk_buttons_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_grants_v_blocks_comparison_blk_buttons"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_grants_v_blocks_comparison_blk" ADD CONSTRAINT "_grants_v_blocks_comparison_blk_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_grants_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_grants_v_blocks_comparison_blk_locales" ADD CONSTRAINT "_grants_v_blocks_comparison_blk_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_grants_v_blocks_comparison_blk"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "grants_blocks_comparison_blk_lft_grp_lft_points_order_idx" ON "grants_blocks_comparison_blk_lft_grp_lft_points" USING btree ("_order");
  CREATE INDEX "grants_blocks_comparison_blk_lft_grp_lft_points_parent_id_idx" ON "grants_blocks_comparison_blk_lft_grp_lft_points" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "grants_blocks_comparison_blk_lft_grp_lft_points_locales_locale_parent_id_unique" ON "grants_blocks_comparison_blk_lft_grp_lft_points_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "grants_blocks_comparison_blk_rt_grp_rt_points_order_idx" ON "grants_blocks_comparison_blk_rt_grp_rt_points" USING btree ("_order");
  CREATE INDEX "grants_blocks_comparison_blk_rt_grp_rt_points_parent_id_idx" ON "grants_blocks_comparison_blk_rt_grp_rt_points" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "grants_blocks_comparison_blk_rt_grp_rt_points_locales_locale_parent_id_unique" ON "grants_blocks_comparison_blk_rt_grp_rt_points_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "grants_blocks_comparison_blk_buttons_order_idx" ON "grants_blocks_comparison_blk_buttons" USING btree ("_order");
  CREATE INDEX "grants_blocks_comparison_blk_buttons_parent_id_idx" ON "grants_blocks_comparison_blk_buttons" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "grants_blocks_comparison_blk_buttons_locales_locale_parent_id_unique" ON "grants_blocks_comparison_blk_buttons_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "grants_blocks_comparison_blk_order_idx" ON "grants_blocks_comparison_blk" USING btree ("_order");
  CREATE INDEX "grants_blocks_comparison_blk_parent_id_idx" ON "grants_blocks_comparison_blk" USING btree ("_parent_id");
  CREATE INDEX "grants_blocks_comparison_blk_path_idx" ON "grants_blocks_comparison_blk" USING btree ("_path");
  CREATE UNIQUE INDEX "grants_blocks_comparison_blk_locales_locale_parent_id_unique" ON "grants_blocks_comparison_blk_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_grants_v_blocks_comparison_blk_lft_grp_lft_points_order_idx" ON "_grants_v_blocks_comparison_blk_lft_grp_lft_points" USING btree ("_order");
  CREATE INDEX "_grants_v_blocks_comparison_blk_lft_grp_lft_points_parent_id_idx" ON "_grants_v_blocks_comparison_blk_lft_grp_lft_points" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_grants_v_blocks_comparison_blk_lft_grp_lft_points_locales_locale_parent_id_unique" ON "_grants_v_blocks_comparison_blk_lft_grp_lft_points_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_grants_v_blocks_comparison_blk_rt_grp_rt_points_order_idx" ON "_grants_v_blocks_comparison_blk_rt_grp_rt_points" USING btree ("_order");
  CREATE INDEX "_grants_v_blocks_comparison_blk_rt_grp_rt_points_parent_id_idx" ON "_grants_v_blocks_comparison_blk_rt_grp_rt_points" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_grants_v_blocks_comparison_blk_rt_grp_rt_points_locales_locale_parent_id_unique" ON "_grants_v_blocks_comparison_blk_rt_grp_rt_points_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_grants_v_blocks_comparison_blk_buttons_order_idx" ON "_grants_v_blocks_comparison_blk_buttons" USING btree ("_order");
  CREATE INDEX "_grants_v_blocks_comparison_blk_buttons_parent_id_idx" ON "_grants_v_blocks_comparison_blk_buttons" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_grants_v_blocks_comparison_blk_buttons_locales_locale_parent_id_unique" ON "_grants_v_blocks_comparison_blk_buttons_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_grants_v_blocks_comparison_blk_order_idx" ON "_grants_v_blocks_comparison_blk" USING btree ("_order");
  CREATE INDEX "_grants_v_blocks_comparison_blk_parent_id_idx" ON "_grants_v_blocks_comparison_blk" USING btree ("_parent_id");
  CREATE INDEX "_grants_v_blocks_comparison_blk_path_idx" ON "_grants_v_blocks_comparison_blk" USING btree ("_path");
  CREATE UNIQUE INDEX "_grants_v_blocks_comparison_blk_locales_locale_parent_id_unique" ON "_grants_v_blocks_comparison_blk_locales" USING btree ("_locale","_parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "grants_blocks_comparison_blk_lft_grp_lft_points" CASCADE;
  DROP TABLE "grants_blocks_comparison_blk_lft_grp_lft_points_locales" CASCADE;
  DROP TABLE "grants_blocks_comparison_blk_rt_grp_rt_points" CASCADE;
  DROP TABLE "grants_blocks_comparison_blk_rt_grp_rt_points_locales" CASCADE;
  DROP TABLE "grants_blocks_comparison_blk_buttons" CASCADE;
  DROP TABLE "grants_blocks_comparison_blk_buttons_locales" CASCADE;
  DROP TABLE "grants_blocks_comparison_blk" CASCADE;
  DROP TABLE "grants_blocks_comparison_blk_locales" CASCADE;
  DROP TABLE "_grants_v_blocks_comparison_blk_lft_grp_lft_points" CASCADE;
  DROP TABLE "_grants_v_blocks_comparison_blk_lft_grp_lft_points_locales" CASCADE;
  DROP TABLE "_grants_v_blocks_comparison_blk_rt_grp_rt_points" CASCADE;
  DROP TABLE "_grants_v_blocks_comparison_blk_rt_grp_rt_points_locales" CASCADE;
  DROP TABLE "_grants_v_blocks_comparison_blk_buttons" CASCADE;
  DROP TABLE "_grants_v_blocks_comparison_blk_buttons_locales" CASCADE;
  DROP TABLE "_grants_v_blocks_comparison_blk" CASCADE;
  DROP TABLE "_grants_v_blocks_comparison_blk_locales" CASCADE;
  DROP TYPE "public"."enum_grants_blocks_comparison_blk_buttons_link_type";
  DROP TYPE "public"."enum__grants_v_blocks_comparison_blk_buttons_link_type";`)
}
