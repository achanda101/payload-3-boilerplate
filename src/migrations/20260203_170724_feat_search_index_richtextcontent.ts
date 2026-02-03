import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "search" ADD COLUMN "content_data" varchar;
  ALTER TABLE "search" ADD COLUMN "author" varchar;
  ALTER TABLE "search" ADD COLUMN "tags" varchar;
  ALTER TABLE "search" ADD COLUMN "published_date" varchar;
  CREATE INDEX "search_content_data_idx" ON "search" USING btree ("content_data");
  CREATE INDEX "search_author_idx" ON "search" USING btree ("author");
  CREATE INDEX "search_tags_idx" ON "search" USING btree ("tags");
  CREATE INDEX "search_published_date_idx" ON "search" USING btree ("published_date");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP INDEX "search_content_data_idx";
  DROP INDEX "search_author_idx";
  DROP INDEX "search_tags_idx";
  DROP INDEX "search_published_date_idx";
  ALTER TABLE "search" DROP COLUMN "content_data";
  ALTER TABLE "search" DROP COLUMN "author";
  ALTER TABLE "search" DROP COLUMN "tags";
  ALTER TABLE "search" DROP COLUMN "published_date";`)
}
