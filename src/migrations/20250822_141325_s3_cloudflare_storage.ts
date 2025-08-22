import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "media_cloud" (
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
  
  ALTER TABLE "posts_locales" DROP CONSTRAINT "posts_locales_meta_image_id_media_id_fk";
  
  ALTER TABLE "_posts_v_locales" DROP CONSTRAINT "_posts_v_locales_version_meta_image_id_media_id_fk";
  
  ALTER TABLE "users" DROP CONSTRAINT "users_avatar_id_media_id_fk";
  
  ALTER TABLE "search" DROP CONSTRAINT "search_meta_image_id_media_id_fk";
  
  ALTER TABLE "header" DROP CONSTRAINT "header_logo_id_media_id_fk";
  
  ALTER TABLE "footer" DROP CONSTRAINT "footer_logo_id_media_id_fk";
  
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "media_cloud_id" integer;
  CREATE INDEX "media_cloud_updated_at_idx" ON "media_cloud" USING btree ("updated_at");
  CREATE INDEX "media_cloud_created_at_idx" ON "media_cloud" USING btree ("created_at");
  CREATE UNIQUE INDEX "media_cloud_filename_idx" ON "media_cloud" USING btree ("filename");
  CREATE INDEX "media_cloud_sizes_thumbnail_sizes_thumbnail_filename_idx" ON "media_cloud" USING btree ("sizes_thumbnail_filename");
  CREATE INDEX "media_cloud_sizes_small_sizes_small_filename_idx" ON "media_cloud" USING btree ("sizes_small_filename");
  CREATE INDEX "media_cloud_sizes_medium_sizes_medium_filename_idx" ON "media_cloud" USING btree ("sizes_medium_filename");
  CREATE INDEX "media_cloud_sizes_large_sizes_large_filename_idx" ON "media_cloud" USING btree ("sizes_large_filename");
  CREATE INDEX "media_cloud_sizes_xlarge_sizes_xlarge_filename_idx" ON "media_cloud" USING btree ("sizes_xlarge_filename");
  ALTER TABLE "posts_locales" ADD CONSTRAINT "posts_locales_meta_image_id_media_cloud_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media_cloud"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_posts_v_locales" ADD CONSTRAINT "_posts_v_locales_version_meta_image_id_media_cloud_id_fk" FOREIGN KEY ("version_meta_image_id") REFERENCES "public"."media_cloud"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "users" ADD CONSTRAINT "users_avatar_id_media_cloud_id_fk" FOREIGN KEY ("avatar_id") REFERENCES "public"."media_cloud"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "search" ADD CONSTRAINT "search_meta_image_id_media_cloud_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media_cloud"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_media_cloud_fk" FOREIGN KEY ("media_cloud_id") REFERENCES "public"."media_cloud"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "header" ADD CONSTRAINT "header_logo_id_media_cloud_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media_cloud"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "footer" ADD CONSTRAINT "footer_logo_id_media_cloud_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media_cloud"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_media_cloud_id_idx" ON "payload_locked_documents_rels" USING btree ("media_cloud_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "media_cloud" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "media_cloud" CASCADE;
  ALTER TABLE "posts_locales" DROP CONSTRAINT "posts_locales_meta_image_id_media_cloud_id_fk";
  
  ALTER TABLE "_posts_v_locales" DROP CONSTRAINT "_posts_v_locales_version_meta_image_id_media_cloud_id_fk";
  
  ALTER TABLE "users" DROP CONSTRAINT "users_avatar_id_media_cloud_id_fk";
  
  ALTER TABLE "search" DROP CONSTRAINT "search_meta_image_id_media_cloud_id_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_media_cloud_fk";
  
  ALTER TABLE "header" DROP CONSTRAINT "header_logo_id_media_cloud_id_fk";
  
  ALTER TABLE "footer" DROP CONSTRAINT "footer_logo_id_media_cloud_id_fk";
  
  DROP INDEX "payload_locked_documents_rels_media_cloud_id_idx";
  ALTER TABLE "posts_locales" ADD CONSTRAINT "posts_locales_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_posts_v_locales" ADD CONSTRAINT "_posts_v_locales_version_meta_image_id_media_id_fk" FOREIGN KEY ("version_meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "users" ADD CONSTRAINT "users_avatar_id_media_id_fk" FOREIGN KEY ("avatar_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "search" ADD CONSTRAINT "search_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "header" ADD CONSTRAINT "header_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "footer" ADD CONSTRAINT "footer_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "media_cloud_id";`)
}
