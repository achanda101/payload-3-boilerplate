import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "asset_cloud" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"alt" varchar NOT NULL,
  	"caption" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric,
  	"sizes_thumbnail_url" varchar,
  	"sizes_thumbnail_width" numeric,
  	"sizes_thumbnail_height" numeric,
  	"sizes_thumbnail_mime_type" varchar,
  	"sizes_thumbnail_filesize" numeric,
  	"sizes_thumbnail_filename" varchar,
  	"sizes_small_url" varchar,
  	"sizes_small_width" numeric,
  	"sizes_small_height" numeric,
  	"sizes_small_mime_type" varchar,
  	"sizes_small_filesize" numeric,
  	"sizes_small_filename" varchar,
  	"sizes_medium_url" varchar,
  	"sizes_medium_width" numeric,
  	"sizes_medium_height" numeric,
  	"sizes_medium_mime_type" varchar,
  	"sizes_medium_filesize" numeric,
  	"sizes_medium_filename" varchar,
  	"sizes_large_url" varchar,
  	"sizes_large_width" numeric,
  	"sizes_large_height" numeric,
  	"sizes_large_mime_type" varchar,
  	"sizes_large_filesize" numeric,
  	"sizes_large_filename" varchar,
  	"sizes_xlarge_url" varchar,
  	"sizes_xlarge_width" numeric,
  	"sizes_xlarge_height" numeric,
  	"sizes_xlarge_mime_type" varchar,
  	"sizes_xlarge_filesize" numeric,
  	"sizes_xlarge_filename" varchar
  );
  
  ALTER TABLE "grantcards" DROP CONSTRAINT "grantcards_mascot_id_media_cloud_id_fk";
  
  ALTER TABLE "_grantcards_v" DROP CONSTRAINT "_grantcards_v_version_mascot_id_media_cloud_id_fk";
  
  ALTER TABLE "header" DROP CONSTRAINT "header_logo_id_media_cloud_id_fk";
  
  ALTER TABLE "footer" DROP CONSTRAINT "footer_logo_id_media_cloud_id_fk";
  
  ALTER TABLE "footer" ALTER COLUMN "newsletter_sub_url" SET DEFAULT 'https://list.uafanp.org/subscription/form';
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "asset_cloud_id" integer;
  CREATE INDEX "asset_cloud_updated_at_idx" ON "asset_cloud" USING btree ("updated_at");
  CREATE INDEX "asset_cloud_created_at_idx" ON "asset_cloud" USING btree ("created_at");
  CREATE UNIQUE INDEX "asset_cloud_filename_idx" ON "asset_cloud" USING btree ("filename");
  CREATE INDEX "asset_cloud_sizes_thumbnail_sizes_thumbnail_filename_idx" ON "asset_cloud" USING btree ("sizes_thumbnail_filename");
  CREATE INDEX "asset_cloud_sizes_small_sizes_small_filename_idx" ON "asset_cloud" USING btree ("sizes_small_filename");
  CREATE INDEX "asset_cloud_sizes_medium_sizes_medium_filename_idx" ON "asset_cloud" USING btree ("sizes_medium_filename");
  CREATE INDEX "asset_cloud_sizes_large_sizes_large_filename_idx" ON "asset_cloud" USING btree ("sizes_large_filename");
  CREATE INDEX "asset_cloud_sizes_xlarge_sizes_xlarge_filename_idx" ON "asset_cloud" USING btree ("sizes_xlarge_filename");
  ALTER TABLE "grantcards" ADD CONSTRAINT "grantcards_mascot_id_asset_cloud_id_fk" FOREIGN KEY ("mascot_id") REFERENCES "public"."asset_cloud"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_grantcards_v" ADD CONSTRAINT "_grantcards_v_version_mascot_id_asset_cloud_id_fk" FOREIGN KEY ("version_mascot_id") REFERENCES "public"."asset_cloud"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_asset_cloud_fk" FOREIGN KEY ("asset_cloud_id") REFERENCES "public"."asset_cloud"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "header" ADD CONSTRAINT "header_logo_id_asset_cloud_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."asset_cloud"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "footer" ADD CONSTRAINT "footer_logo_id_asset_cloud_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."asset_cloud"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_asset_cloud_id_idx" ON "payload_locked_documents_rels" USING btree ("asset_cloud_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "asset_cloud" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "asset_cloud" CASCADE;
  ALTER TABLE "grantcards" DROP CONSTRAINT "grantcards_mascot_id_asset_cloud_id_fk";
  
  ALTER TABLE "_grantcards_v" DROP CONSTRAINT "_grantcards_v_version_mascot_id_asset_cloud_id_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_asset_cloud_fk";
  
  ALTER TABLE "header" DROP CONSTRAINT "header_logo_id_asset_cloud_id_fk";
  
  ALTER TABLE "footer" DROP CONSTRAINT "footer_logo_id_asset_cloud_id_fk";
  
  DROP INDEX "payload_locked_documents_rels_asset_cloud_id_idx";
  ALTER TABLE "footer" ALTER COLUMN "newsletter_sub_url" SET DEFAULT 'https://example.com/subscribe';
  ALTER TABLE "grantcards" ADD CONSTRAINT "grantcards_mascot_id_media_cloud_id_fk" FOREIGN KEY ("mascot_id") REFERENCES "public"."media_cloud"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_grantcards_v" ADD CONSTRAINT "_grantcards_v_version_mascot_id_media_cloud_id_fk" FOREIGN KEY ("version_mascot_id") REFERENCES "public"."media_cloud"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "header" ADD CONSTRAINT "header_logo_id_media_cloud_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media_cloud"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "footer" ADD CONSTRAINT "footer_logo_id_media_cloud_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media_cloud"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "asset_cloud_id";`)
}
