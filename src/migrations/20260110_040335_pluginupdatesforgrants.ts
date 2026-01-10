import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "redirects_rels" ADD COLUMN "grants_id" integer;
  ALTER TABLE "search_rels" ADD COLUMN "grants_id" integer;
  ALTER TABLE "redirects_rels" ADD CONSTRAINT "redirects_rels_grants_fk" FOREIGN KEY ("grants_id") REFERENCES "public"."grants"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "search_rels" ADD CONSTRAINT "search_rels_grants_fk" FOREIGN KEY ("grants_id") REFERENCES "public"."grants"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "redirects_rels_grants_id_idx" ON "redirects_rels" USING btree ("grants_id");
  CREATE INDEX "search_rels_grants_id_idx" ON "search_rels" USING btree ("grants_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "redirects_rels" DROP CONSTRAINT "redirects_rels_grants_fk";
  
  ALTER TABLE "search_rels" DROP CONSTRAINT "search_rels_grants_fk";
  
  DROP INDEX "redirects_rels_grants_id_idx";
  DROP INDEX "search_rels_grants_id_idx";
  ALTER TABLE "redirects_rels" DROP COLUMN "grants_id";
  ALTER TABLE "search_rels" DROP COLUMN "grants_id";`)
}
