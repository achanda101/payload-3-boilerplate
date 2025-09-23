import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "homepage_rels" ADD COLUMN "grantcards_id" integer;
  ALTER TABLE "_homepage_v_rels" ADD COLUMN "grantcards_id" integer;
  ALTER TABLE "homepage_rels" ADD CONSTRAINT "homepage_rels_grantcards_fk" FOREIGN KEY ("grantcards_id") REFERENCES "public"."grantcards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_homepage_v_rels" ADD CONSTRAINT "_homepage_v_rels_grantcards_fk" FOREIGN KEY ("grantcards_id") REFERENCES "public"."grantcards"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "homepage_rels_grantcards_id_idx" ON "homepage_rels" USING btree ("grantcards_id");
  CREATE INDEX "_homepage_v_rels_grantcards_id_idx" ON "_homepage_v_rels" USING btree ("grantcards_id");
  ALTER TABLE "grantcards" DROP COLUMN "show_home";
  ALTER TABLE "grantcards" DROP COLUMN "order";
  ALTER TABLE "_grantcards_v" DROP COLUMN "version_show_home";
  ALTER TABLE "_grantcards_v" DROP COLUMN "version_order";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "homepage_rels" DROP CONSTRAINT "homepage_rels_grantcards_fk";
  
  ALTER TABLE "_homepage_v_rels" DROP CONSTRAINT "_homepage_v_rels_grantcards_fk";
  
  DROP INDEX "homepage_rels_grantcards_id_idx";
  DROP INDEX "_homepage_v_rels_grantcards_id_idx";
  ALTER TABLE "grantcards" ADD COLUMN "show_home" boolean DEFAULT true;
  ALTER TABLE "grantcards" ADD COLUMN "order" numeric;
  ALTER TABLE "_grantcards_v" ADD COLUMN "version_show_home" boolean DEFAULT true;
  ALTER TABLE "_grantcards_v" ADD COLUMN "version_order" numeric;
  ALTER TABLE "homepage_rels" DROP COLUMN "grantcards_id";
  ALTER TABLE "_homepage_v_rels" DROP COLUMN "grantcards_id";`)
}
