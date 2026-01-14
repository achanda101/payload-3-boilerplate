import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "media_cloud_locales" (
  	"caption" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "asset_cloud_locales" (
  	"caption" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "documents_locales" (
  	"caption" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  ALTER TABLE "media_cloud_locales" ADD CONSTRAINT "media_cloud_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."media_cloud"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "asset_cloud_locales" ADD CONSTRAINT "asset_cloud_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."asset_cloud"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "documents_locales" ADD CONSTRAINT "documents_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."documents"("id") ON DELETE cascade ON UPDATE no action;
  CREATE UNIQUE INDEX "media_cloud_locales_locale_parent_id_unique" ON "media_cloud_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "asset_cloud_locales_locale_parent_id_unique" ON "asset_cloud_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "documents_locales_locale_parent_id_unique" ON "documents_locales" USING btree ("_locale","_parent_id");
  ALTER TABLE "media_cloud" DROP COLUMN "caption";
  ALTER TABLE "asset_cloud" DROP COLUMN "caption";
  ALTER TABLE "documents" DROP COLUMN "caption";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "media_cloud_locales" CASCADE;
  DROP TABLE "asset_cloud_locales" CASCADE;
  DROP TABLE "documents_locales" CASCADE;
  ALTER TABLE "media_cloud" ADD COLUMN "caption" varchar;
  ALTER TABLE "asset_cloud" ADD COLUMN "caption" varchar;
  ALTER TABLE "documents" ADD COLUMN "caption" varchar;`)
}
