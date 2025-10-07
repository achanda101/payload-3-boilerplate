import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_grants_blocks_mstep_process_steps_icon" AS ENUM('FileText', 'Clock', 'ShieldCheck', 'Vote', 'ScrollText', 'Banknote', 'Rocket', 'FileCheck');
  CREATE TYPE "public"."enum__grants_v_blocks_mstep_process_steps_icon" AS ENUM('FileText', 'Clock', 'ShieldCheck', 'Vote', 'ScrollText', 'Banknote', 'Rocket', 'FileCheck');
  CREATE TABLE "grants_blocks_mstep_process_steps_details" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "grants_blocks_mstep_process_steps_details_locales" (
  	"bullet" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "grants_blocks_mstep_process_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" "enum_grants_blocks_mstep_process_steps_icon" DEFAULT 'FileText'
  );
  
  CREATE TABLE "grants_blocks_mstep_process_steps_locales" (
  	"step_title" varchar,
  	"title" varchar,
  	"tip" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "grants_blocks_mstep_process" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "grants_blocks_mstep_process_locales" (
  	"title" varchar,
  	"subtitle" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "_grants_v_blocks_mstep_process_steps_details" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_grants_v_blocks_mstep_process_steps_details_locales" (
  	"bullet" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_grants_v_blocks_mstep_process_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon" "enum__grants_v_blocks_mstep_process_steps_icon" DEFAULT 'FileText',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_grants_v_blocks_mstep_process_steps_locales" (
  	"step_title" varchar,
  	"title" varchar,
  	"tip" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_grants_v_blocks_mstep_process" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_grants_v_blocks_mstep_process_locales" (
  	"title" varchar,
  	"subtitle" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  ALTER TABLE "grants_blocks_mstep_process_steps_details" ADD CONSTRAINT "grants_blocks_mstep_process_steps_details_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."grants_blocks_mstep_process_steps"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "grants_blocks_mstep_process_steps_details_locales" ADD CONSTRAINT "grants_blocks_mstep_process_steps_details_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."grants_blocks_mstep_process_steps_details"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "grants_blocks_mstep_process_steps" ADD CONSTRAINT "grants_blocks_mstep_process_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."grants_blocks_mstep_process"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "grants_blocks_mstep_process_steps_locales" ADD CONSTRAINT "grants_blocks_mstep_process_steps_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."grants_blocks_mstep_process_steps"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "grants_blocks_mstep_process" ADD CONSTRAINT "grants_blocks_mstep_process_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."grants"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "grants_blocks_mstep_process_locales" ADD CONSTRAINT "grants_blocks_mstep_process_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."grants_blocks_mstep_process"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_grants_v_blocks_mstep_process_steps_details" ADD CONSTRAINT "_grants_v_blocks_mstep_process_steps_details_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_grants_v_blocks_mstep_process_steps"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_grants_v_blocks_mstep_process_steps_details_locales" ADD CONSTRAINT "_grants_v_blocks_mstep_process_steps_details_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_grants_v_blocks_mstep_process_steps_details"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_grants_v_blocks_mstep_process_steps" ADD CONSTRAINT "_grants_v_blocks_mstep_process_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_grants_v_blocks_mstep_process"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_grants_v_blocks_mstep_process_steps_locales" ADD CONSTRAINT "_grants_v_blocks_mstep_process_steps_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_grants_v_blocks_mstep_process_steps"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_grants_v_blocks_mstep_process" ADD CONSTRAINT "_grants_v_blocks_mstep_process_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_grants_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_grants_v_blocks_mstep_process_locales" ADD CONSTRAINT "_grants_v_blocks_mstep_process_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_grants_v_blocks_mstep_process"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "grants_blocks_mstep_process_steps_details_order_idx" ON "grants_blocks_mstep_process_steps_details" USING btree ("_order");
  CREATE INDEX "grants_blocks_mstep_process_steps_details_parent_id_idx" ON "grants_blocks_mstep_process_steps_details" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "grants_blocks_mstep_process_steps_details_locales_locale_parent_id_unique" ON "grants_blocks_mstep_process_steps_details_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "grants_blocks_mstep_process_steps_order_idx" ON "grants_blocks_mstep_process_steps" USING btree ("_order");
  CREATE INDEX "grants_blocks_mstep_process_steps_parent_id_idx" ON "grants_blocks_mstep_process_steps" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "grants_blocks_mstep_process_steps_locales_locale_parent_id_unique" ON "grants_blocks_mstep_process_steps_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "grants_blocks_mstep_process_order_idx" ON "grants_blocks_mstep_process" USING btree ("_order");
  CREATE INDEX "grants_blocks_mstep_process_parent_id_idx" ON "grants_blocks_mstep_process" USING btree ("_parent_id");
  CREATE INDEX "grants_blocks_mstep_process_path_idx" ON "grants_blocks_mstep_process" USING btree ("_path");
  CREATE UNIQUE INDEX "grants_blocks_mstep_process_locales_locale_parent_id_unique" ON "grants_blocks_mstep_process_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_grants_v_blocks_mstep_process_steps_details_order_idx" ON "_grants_v_blocks_mstep_process_steps_details" USING btree ("_order");
  CREATE INDEX "_grants_v_blocks_mstep_process_steps_details_parent_id_idx" ON "_grants_v_blocks_mstep_process_steps_details" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_grants_v_blocks_mstep_process_steps_details_locales_locale_parent_id_unique" ON "_grants_v_blocks_mstep_process_steps_details_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_grants_v_blocks_mstep_process_steps_order_idx" ON "_grants_v_blocks_mstep_process_steps" USING btree ("_order");
  CREATE INDEX "_grants_v_blocks_mstep_process_steps_parent_id_idx" ON "_grants_v_blocks_mstep_process_steps" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_grants_v_blocks_mstep_process_steps_locales_locale_parent_id_unique" ON "_grants_v_blocks_mstep_process_steps_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_grants_v_blocks_mstep_process_order_idx" ON "_grants_v_blocks_mstep_process" USING btree ("_order");
  CREATE INDEX "_grants_v_blocks_mstep_process_parent_id_idx" ON "_grants_v_blocks_mstep_process" USING btree ("_parent_id");
  CREATE INDEX "_grants_v_blocks_mstep_process_path_idx" ON "_grants_v_blocks_mstep_process" USING btree ("_path");
  CREATE UNIQUE INDEX "_grants_v_blocks_mstep_process_locales_locale_parent_id_unique" ON "_grants_v_blocks_mstep_process_locales" USING btree ("_locale","_parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "grants_blocks_mstep_process_steps_details" CASCADE;
  DROP TABLE "grants_blocks_mstep_process_steps_details_locales" CASCADE;
  DROP TABLE "grants_blocks_mstep_process_steps" CASCADE;
  DROP TABLE "grants_blocks_mstep_process_steps_locales" CASCADE;
  DROP TABLE "grants_blocks_mstep_process" CASCADE;
  DROP TABLE "grants_blocks_mstep_process_locales" CASCADE;
  DROP TABLE "_grants_v_blocks_mstep_process_steps_details" CASCADE;
  DROP TABLE "_grants_v_blocks_mstep_process_steps_details_locales" CASCADE;
  DROP TABLE "_grants_v_blocks_mstep_process_steps" CASCADE;
  DROP TABLE "_grants_v_blocks_mstep_process_steps_locales" CASCADE;
  DROP TABLE "_grants_v_blocks_mstep_process" CASCADE;
  DROP TABLE "_grants_v_blocks_mstep_process_locales" CASCADE;
  DROP TYPE "public"."enum_grants_blocks_mstep_process_steps_icon";
  DROP TYPE "public"."enum__grants_v_blocks_mstep_process_steps_icon";`)
}
