import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "grants_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_grants_v_locales" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "grants_locales" CASCADE;
  DROP TABLE "_grants_v_locales" CASCADE;
  ALTER TABLE "grants" ADD COLUMN "title" varchar;
  ALTER TABLE "_grants_v" ADD COLUMN "version_title" varchar;
  CREATE UNIQUE INDEX "grants_title_idx" ON "grants" USING btree ("title");
  CREATE INDEX "_grants_v_version_version_title_idx" ON "_grants_v" USING btree ("version_title");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "grants_locales" (
  	"title" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_grants_v_locales" (
  	"version_title" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  DROP INDEX "grants_title_idx";
  DROP INDEX "_grants_v_version_version_title_idx";
  ALTER TABLE "grants_locales" ADD CONSTRAINT "grants_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."grants"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_grants_v_locales" ADD CONSTRAINT "_grants_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_grants_v"("id") ON DELETE cascade ON UPDATE no action;
  CREATE UNIQUE INDEX "grants_title_idx" ON "grants_locales" USING btree ("title","_locale");
  CREATE UNIQUE INDEX "grants_locales_locale_parent_id_unique" ON "grants_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_grants_v_version_version_title_idx" ON "_grants_v_locales" USING btree ("version_title","_locale");
  CREATE UNIQUE INDEX "_grants_v_locales_locale_parent_id_unique" ON "_grants_v_locales" USING btree ("_locale","_parent_id");
  ALTER TABLE "grants" DROP COLUMN "title";
  ALTER TABLE "_grants_v" DROP COLUMN "version_title";`)
}
