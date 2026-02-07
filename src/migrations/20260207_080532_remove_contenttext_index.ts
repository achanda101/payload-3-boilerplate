import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "search" DROP CONSTRAINT "search_meta_image_id_media_cloud_id_fk";
  
  DROP INDEX "search_meta_meta_image_idx";
  DROP INDEX "search_content_data_idx";
  ALTER TABLE "search_rels" ADD COLUMN "media_cloud_id" integer;
  ALTER TABLE "search_rels" ADD COLUMN "asset_cloud_id" integer;
  ALTER TABLE "search_rels" ADD CONSTRAINT "search_rels_media_cloud_fk" FOREIGN KEY ("media_cloud_id") REFERENCES "public"."media_cloud"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "search_rels" ADD CONSTRAINT "search_rels_asset_cloud_fk" FOREIGN KEY ("asset_cloud_id") REFERENCES "public"."asset_cloud"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "search_rels_media_cloud_id_idx" ON "search_rels" USING btree ("media_cloud_id");
  CREATE INDEX "search_rels_asset_cloud_id_idx" ON "search_rels" USING btree ("asset_cloud_id");
  ALTER TABLE "search" DROP COLUMN "meta_image_id";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "search_rels" DROP CONSTRAINT "search_rels_media_cloud_fk";
  
  ALTER TABLE "search_rels" DROP CONSTRAINT "search_rels_asset_cloud_fk";
  
  DROP INDEX "search_rels_media_cloud_id_idx";
  DROP INDEX "search_rels_asset_cloud_id_idx";
  ALTER TABLE "search" ADD COLUMN "meta_image_id" integer;
  ALTER TABLE "search" ADD CONSTRAINT "search_meta_image_id_media_cloud_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media_cloud"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "search_meta_meta_image_idx" ON "search" USING btree ("meta_image_id");
  CREATE INDEX "search_content_data_idx" ON "search" USING btree ("content_data");
  ALTER TABLE "search_rels" DROP COLUMN "media_cloud_id";
  ALTER TABLE "search_rels" DROP COLUMN "asset_cloud_id";`)
}
