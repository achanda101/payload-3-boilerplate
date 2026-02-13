import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "grants" DROP CONSTRAINT "grants_meta_image_id_asset_cloud_id_fk";
  
  ALTER TABLE "_grants_v" DROP CONSTRAINT "_grants_v_version_meta_image_id_asset_cloud_id_fk";
  
  ALTER TABLE "pages" DROP CONSTRAINT "pages_meta_image_id_asset_cloud_id_fk";
  
  ALTER TABLE "_pages_v" DROP CONSTRAINT "_pages_v_version_meta_image_id_asset_cloud_id_fk";
  
  ALTER TABLE "blog_locales" DROP CONSTRAINT "blog_locales_meta_image_id_media_cloud_id_fk";
  
  ALTER TABLE "_blog_v_locales" DROP CONSTRAINT "_blog_v_locales_version_meta_image_id_media_cloud_id_fk";
  
  ALTER TABLE "reports_locales" DROP CONSTRAINT "reports_locales_meta_image_id_media_cloud_id_fk";
  
  ALTER TABLE "_reports_v_locales" DROP CONSTRAINT "_reports_v_locales_version_meta_image_id_media_cloud_id_fk";
  
  ALTER TABLE "mmedia_locales" DROP CONSTRAINT "mmedia_locales_meta_image_id_media_cloud_id_fk";
  
  ALTER TABLE "_mmedia_v_locales" DROP CONSTRAINT "_mmedia_v_locales_version_meta_image_id_media_cloud_id_fk";
  
  DROP INDEX "grants_meta_meta_image_idx";
  DROP INDEX "_grants_v_version_meta_version_meta_image_idx";
  DROP INDEX "pages_meta_meta_image_idx";
  DROP INDEX "_pages_v_version_meta_version_meta_image_idx";
  DROP INDEX "blog_meta_meta_image_idx";
  DROP INDEX "_blog_v_version_meta_version_meta_image_idx";
  DROP INDEX "reports_meta_meta_image_idx";
  DROP INDEX "_reports_v_version_meta_version_meta_image_idx";
  DROP INDEX "mmedia_meta_meta_image_idx";
  DROP INDEX "_mmedia_v_version_meta_version_meta_image_idx";
  ALTER TABLE "grants_rels" ADD COLUMN "media_cloud_id" integer;
  ALTER TABLE "grants_rels" ADD COLUMN "asset_cloud_id" integer;
  ALTER TABLE "_grants_v_rels" ADD COLUMN "media_cloud_id" integer;
  ALTER TABLE "_grants_v_rels" ADD COLUMN "asset_cloud_id" integer;
  ALTER TABLE "pages_rels" ADD COLUMN "media_cloud_id" integer;
  ALTER TABLE "pages_rels" ADD COLUMN "asset_cloud_id" integer;
  ALTER TABLE "_pages_v_rels" ADD COLUMN "media_cloud_id" integer;
  ALTER TABLE "_pages_v_rels" ADD COLUMN "asset_cloud_id" integer;
  ALTER TABLE "blog" ADD COLUMN "meta_title" varchar;
  ALTER TABLE "blog" ADD COLUMN "meta_description" varchar;
  ALTER TABLE "blog_rels" ADD COLUMN "media_cloud_id" integer;
  ALTER TABLE "blog_rels" ADD COLUMN "asset_cloud_id" integer;
  ALTER TABLE "_blog_v" ADD COLUMN "version_meta_title" varchar;
  ALTER TABLE "_blog_v" ADD COLUMN "version_meta_description" varchar;
  ALTER TABLE "_blog_v_rels" ADD COLUMN "media_cloud_id" integer;
  ALTER TABLE "_blog_v_rels" ADD COLUMN "asset_cloud_id" integer;
  ALTER TABLE "reports" ADD COLUMN "meta_title" varchar;
  ALTER TABLE "reports" ADD COLUMN "meta_description" varchar;
  ALTER TABLE "reports_rels" ADD COLUMN "media_cloud_id" integer;
  ALTER TABLE "reports_rels" ADD COLUMN "asset_cloud_id" integer;
  ALTER TABLE "_reports_v" ADD COLUMN "version_meta_title" varchar;
  ALTER TABLE "_reports_v" ADD COLUMN "version_meta_description" varchar;
  ALTER TABLE "_reports_v_rels" ADD COLUMN "media_cloud_id" integer;
  ALTER TABLE "_reports_v_rels" ADD COLUMN "asset_cloud_id" integer;
  ALTER TABLE "mmedia" ADD COLUMN "meta_title" varchar;
  ALTER TABLE "mmedia" ADD COLUMN "meta_description" varchar;
  ALTER TABLE "mmedia_rels" ADD COLUMN "media_cloud_id" integer;
  ALTER TABLE "mmedia_rels" ADD COLUMN "asset_cloud_id" integer;
  ALTER TABLE "_mmedia_v" ADD COLUMN "version_meta_title" varchar;
  ALTER TABLE "_mmedia_v" ADD COLUMN "version_meta_description" varchar;
  ALTER TABLE "_mmedia_v_rels" ADD COLUMN "media_cloud_id" integer;
  ALTER TABLE "_mmedia_v_rels" ADD COLUMN "asset_cloud_id" integer;
  ALTER TABLE "grants_rels" ADD CONSTRAINT "grants_rels_media_cloud_fk" FOREIGN KEY ("media_cloud_id") REFERENCES "public"."media_cloud"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "grants_rels" ADD CONSTRAINT "grants_rels_asset_cloud_fk" FOREIGN KEY ("asset_cloud_id") REFERENCES "public"."asset_cloud"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_grants_v_rels" ADD CONSTRAINT "_grants_v_rels_media_cloud_fk" FOREIGN KEY ("media_cloud_id") REFERENCES "public"."media_cloud"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_grants_v_rels" ADD CONSTRAINT "_grants_v_rels_asset_cloud_fk" FOREIGN KEY ("asset_cloud_id") REFERENCES "public"."asset_cloud"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_media_cloud_fk" FOREIGN KEY ("media_cloud_id") REFERENCES "public"."media_cloud"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_asset_cloud_fk" FOREIGN KEY ("asset_cloud_id") REFERENCES "public"."asset_cloud"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_media_cloud_fk" FOREIGN KEY ("media_cloud_id") REFERENCES "public"."media_cloud"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_asset_cloud_fk" FOREIGN KEY ("asset_cloud_id") REFERENCES "public"."asset_cloud"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "blog_rels" ADD CONSTRAINT "blog_rels_media_cloud_fk" FOREIGN KEY ("media_cloud_id") REFERENCES "public"."media_cloud"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "blog_rels" ADD CONSTRAINT "blog_rels_asset_cloud_fk" FOREIGN KEY ("asset_cloud_id") REFERENCES "public"."asset_cloud"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_blog_v_rels" ADD CONSTRAINT "_blog_v_rels_media_cloud_fk" FOREIGN KEY ("media_cloud_id") REFERENCES "public"."media_cloud"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_blog_v_rels" ADD CONSTRAINT "_blog_v_rels_asset_cloud_fk" FOREIGN KEY ("asset_cloud_id") REFERENCES "public"."asset_cloud"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "reports_rels" ADD CONSTRAINT "reports_rels_media_cloud_fk" FOREIGN KEY ("media_cloud_id") REFERENCES "public"."media_cloud"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "reports_rels" ADD CONSTRAINT "reports_rels_asset_cloud_fk" FOREIGN KEY ("asset_cloud_id") REFERENCES "public"."asset_cloud"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_reports_v_rels" ADD CONSTRAINT "_reports_v_rels_media_cloud_fk" FOREIGN KEY ("media_cloud_id") REFERENCES "public"."media_cloud"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_reports_v_rels" ADD CONSTRAINT "_reports_v_rels_asset_cloud_fk" FOREIGN KEY ("asset_cloud_id") REFERENCES "public"."asset_cloud"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "mmedia_rels" ADD CONSTRAINT "mmedia_rels_media_cloud_fk" FOREIGN KEY ("media_cloud_id") REFERENCES "public"."media_cloud"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "mmedia_rels" ADD CONSTRAINT "mmedia_rels_asset_cloud_fk" FOREIGN KEY ("asset_cloud_id") REFERENCES "public"."asset_cloud"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_mmedia_v_rels" ADD CONSTRAINT "_mmedia_v_rels_media_cloud_fk" FOREIGN KEY ("media_cloud_id") REFERENCES "public"."media_cloud"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_mmedia_v_rels" ADD CONSTRAINT "_mmedia_v_rels_asset_cloud_fk" FOREIGN KEY ("asset_cloud_id") REFERENCES "public"."asset_cloud"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "grants_rels_media_cloud_id_idx" ON "grants_rels" USING btree ("media_cloud_id");
  CREATE INDEX "grants_rels_asset_cloud_id_idx" ON "grants_rels" USING btree ("asset_cloud_id");
  CREATE INDEX "_grants_v_rels_media_cloud_id_idx" ON "_grants_v_rels" USING btree ("media_cloud_id");
  CREATE INDEX "_grants_v_rels_asset_cloud_id_idx" ON "_grants_v_rels" USING btree ("asset_cloud_id");
  CREATE INDEX "pages_rels_media_cloud_id_idx" ON "pages_rels" USING btree ("media_cloud_id");
  CREATE INDEX "pages_rels_asset_cloud_id_idx" ON "pages_rels" USING btree ("asset_cloud_id");
  CREATE INDEX "_pages_v_rels_media_cloud_id_idx" ON "_pages_v_rels" USING btree ("media_cloud_id");
  CREATE INDEX "_pages_v_rels_asset_cloud_id_idx" ON "_pages_v_rels" USING btree ("asset_cloud_id");
  CREATE INDEX "blog_rels_media_cloud_id_idx" ON "blog_rels" USING btree ("media_cloud_id");
  CREATE INDEX "blog_rels_asset_cloud_id_idx" ON "blog_rels" USING btree ("asset_cloud_id");
  CREATE INDEX "_blog_v_rels_media_cloud_id_idx" ON "_blog_v_rels" USING btree ("media_cloud_id");
  CREATE INDEX "_blog_v_rels_asset_cloud_id_idx" ON "_blog_v_rels" USING btree ("asset_cloud_id");
  CREATE INDEX "reports_rels_media_cloud_id_idx" ON "reports_rels" USING btree ("media_cloud_id");
  CREATE INDEX "reports_rels_asset_cloud_id_idx" ON "reports_rels" USING btree ("asset_cloud_id");
  CREATE INDEX "_reports_v_rels_media_cloud_id_idx" ON "_reports_v_rels" USING btree ("media_cloud_id");
  CREATE INDEX "_reports_v_rels_asset_cloud_id_idx" ON "_reports_v_rels" USING btree ("asset_cloud_id");
  CREATE INDEX "mmedia_rels_media_cloud_id_idx" ON "mmedia_rels" USING btree ("media_cloud_id");
  CREATE INDEX "mmedia_rels_asset_cloud_id_idx" ON "mmedia_rels" USING btree ("asset_cloud_id");
  CREATE INDEX "_mmedia_v_rels_media_cloud_id_idx" ON "_mmedia_v_rels" USING btree ("media_cloud_id");
  CREATE INDEX "_mmedia_v_rels_asset_cloud_id_idx" ON "_mmedia_v_rels" USING btree ("asset_cloud_id");
  ALTER TABLE "grants" DROP COLUMN "meta_image_id";
  ALTER TABLE "_grants_v" DROP COLUMN "version_meta_image_id";
  ALTER TABLE "pages" DROP COLUMN "meta_image_id";
  ALTER TABLE "_pages_v" DROP COLUMN "version_meta_image_id";
  ALTER TABLE "blog_locales" DROP COLUMN "meta_title";
  ALTER TABLE "blog_locales" DROP COLUMN "meta_description";
  ALTER TABLE "blog_locales" DROP COLUMN "meta_image_id";
  ALTER TABLE "_blog_v_locales" DROP COLUMN "version_meta_title";
  ALTER TABLE "_blog_v_locales" DROP COLUMN "version_meta_description";
  ALTER TABLE "_blog_v_locales" DROP COLUMN "version_meta_image_id";
  ALTER TABLE "reports_locales" DROP COLUMN "meta_title";
  ALTER TABLE "reports_locales" DROP COLUMN "meta_description";
  ALTER TABLE "reports_locales" DROP COLUMN "meta_image_id";
  ALTER TABLE "_reports_v_locales" DROP COLUMN "version_meta_title";
  ALTER TABLE "_reports_v_locales" DROP COLUMN "version_meta_description";
  ALTER TABLE "_reports_v_locales" DROP COLUMN "version_meta_image_id";
  ALTER TABLE "mmedia_locales" DROP COLUMN "meta_title";
  ALTER TABLE "mmedia_locales" DROP COLUMN "meta_description";
  ALTER TABLE "mmedia_locales" DROP COLUMN "meta_image_id";
  ALTER TABLE "_mmedia_v_locales" DROP COLUMN "version_meta_title";
  ALTER TABLE "_mmedia_v_locales" DROP COLUMN "version_meta_description";
  ALTER TABLE "_mmedia_v_locales" DROP COLUMN "version_meta_image_id";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "grants_rels" DROP CONSTRAINT "grants_rels_media_cloud_fk";
  
  ALTER TABLE "grants_rels" DROP CONSTRAINT "grants_rels_asset_cloud_fk";
  
  ALTER TABLE "_grants_v_rels" DROP CONSTRAINT "_grants_v_rels_media_cloud_fk";
  
  ALTER TABLE "_grants_v_rels" DROP CONSTRAINT "_grants_v_rels_asset_cloud_fk";
  
  ALTER TABLE "pages_rels" DROP CONSTRAINT "pages_rels_media_cloud_fk";
  
  ALTER TABLE "pages_rels" DROP CONSTRAINT "pages_rels_asset_cloud_fk";
  
  ALTER TABLE "_pages_v_rels" DROP CONSTRAINT "_pages_v_rels_media_cloud_fk";
  
  ALTER TABLE "_pages_v_rels" DROP CONSTRAINT "_pages_v_rels_asset_cloud_fk";
  
  ALTER TABLE "blog_rels" DROP CONSTRAINT "blog_rels_media_cloud_fk";
  
  ALTER TABLE "blog_rels" DROP CONSTRAINT "blog_rels_asset_cloud_fk";
  
  ALTER TABLE "_blog_v_rels" DROP CONSTRAINT "_blog_v_rels_media_cloud_fk";
  
  ALTER TABLE "_blog_v_rels" DROP CONSTRAINT "_blog_v_rels_asset_cloud_fk";
  
  ALTER TABLE "reports_rels" DROP CONSTRAINT "reports_rels_media_cloud_fk";
  
  ALTER TABLE "reports_rels" DROP CONSTRAINT "reports_rels_asset_cloud_fk";
  
  ALTER TABLE "_reports_v_rels" DROP CONSTRAINT "_reports_v_rels_media_cloud_fk";
  
  ALTER TABLE "_reports_v_rels" DROP CONSTRAINT "_reports_v_rels_asset_cloud_fk";
  
  ALTER TABLE "mmedia_rels" DROP CONSTRAINT "mmedia_rels_media_cloud_fk";
  
  ALTER TABLE "mmedia_rels" DROP CONSTRAINT "mmedia_rels_asset_cloud_fk";
  
  ALTER TABLE "_mmedia_v_rels" DROP CONSTRAINT "_mmedia_v_rels_media_cloud_fk";
  
  ALTER TABLE "_mmedia_v_rels" DROP CONSTRAINT "_mmedia_v_rels_asset_cloud_fk";
  
  DROP INDEX "grants_rels_media_cloud_id_idx";
  DROP INDEX "grants_rels_asset_cloud_id_idx";
  DROP INDEX "_grants_v_rels_media_cloud_id_idx";
  DROP INDEX "_grants_v_rels_asset_cloud_id_idx";
  DROP INDEX "pages_rels_media_cloud_id_idx";
  DROP INDEX "pages_rels_asset_cloud_id_idx";
  DROP INDEX "_pages_v_rels_media_cloud_id_idx";
  DROP INDEX "_pages_v_rels_asset_cloud_id_idx";
  DROP INDEX "blog_rels_media_cloud_id_idx";
  DROP INDEX "blog_rels_asset_cloud_id_idx";
  DROP INDEX "_blog_v_rels_media_cloud_id_idx";
  DROP INDEX "_blog_v_rels_asset_cloud_id_idx";
  DROP INDEX "reports_rels_media_cloud_id_idx";
  DROP INDEX "reports_rels_asset_cloud_id_idx";
  DROP INDEX "_reports_v_rels_media_cloud_id_idx";
  DROP INDEX "_reports_v_rels_asset_cloud_id_idx";
  DROP INDEX "mmedia_rels_media_cloud_id_idx";
  DROP INDEX "mmedia_rels_asset_cloud_id_idx";
  DROP INDEX "_mmedia_v_rels_media_cloud_id_idx";
  DROP INDEX "_mmedia_v_rels_asset_cloud_id_idx";
  ALTER TABLE "grants" ADD COLUMN "meta_image_id" integer;
  ALTER TABLE "_grants_v" ADD COLUMN "version_meta_image_id" integer;
  ALTER TABLE "pages" ADD COLUMN "meta_image_id" integer;
  ALTER TABLE "_pages_v" ADD COLUMN "version_meta_image_id" integer;
  ALTER TABLE "blog_locales" ADD COLUMN "meta_title" varchar;
  ALTER TABLE "blog_locales" ADD COLUMN "meta_description" varchar;
  ALTER TABLE "blog_locales" ADD COLUMN "meta_image_id" integer;
  ALTER TABLE "_blog_v_locales" ADD COLUMN "version_meta_title" varchar;
  ALTER TABLE "_blog_v_locales" ADD COLUMN "version_meta_description" varchar;
  ALTER TABLE "_blog_v_locales" ADD COLUMN "version_meta_image_id" integer;
  ALTER TABLE "reports_locales" ADD COLUMN "meta_title" varchar;
  ALTER TABLE "reports_locales" ADD COLUMN "meta_description" varchar;
  ALTER TABLE "reports_locales" ADD COLUMN "meta_image_id" integer;
  ALTER TABLE "_reports_v_locales" ADD COLUMN "version_meta_title" varchar;
  ALTER TABLE "_reports_v_locales" ADD COLUMN "version_meta_description" varchar;
  ALTER TABLE "_reports_v_locales" ADD COLUMN "version_meta_image_id" integer;
  ALTER TABLE "mmedia_locales" ADD COLUMN "meta_title" varchar;
  ALTER TABLE "mmedia_locales" ADD COLUMN "meta_description" varchar;
  ALTER TABLE "mmedia_locales" ADD COLUMN "meta_image_id" integer;
  ALTER TABLE "_mmedia_v_locales" ADD COLUMN "version_meta_title" varchar;
  ALTER TABLE "_mmedia_v_locales" ADD COLUMN "version_meta_description" varchar;
  ALTER TABLE "_mmedia_v_locales" ADD COLUMN "version_meta_image_id" integer;
  ALTER TABLE "grants" ADD CONSTRAINT "grants_meta_image_id_asset_cloud_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."asset_cloud"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_grants_v" ADD CONSTRAINT "_grants_v_version_meta_image_id_asset_cloud_id_fk" FOREIGN KEY ("version_meta_image_id") REFERENCES "public"."asset_cloud"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages" ADD CONSTRAINT "pages_meta_image_id_asset_cloud_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."asset_cloud"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v" ADD CONSTRAINT "_pages_v_version_meta_image_id_asset_cloud_id_fk" FOREIGN KEY ("version_meta_image_id") REFERENCES "public"."asset_cloud"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "blog_locales" ADD CONSTRAINT "blog_locales_meta_image_id_media_cloud_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media_cloud"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_blog_v_locales" ADD CONSTRAINT "_blog_v_locales_version_meta_image_id_media_cloud_id_fk" FOREIGN KEY ("version_meta_image_id") REFERENCES "public"."media_cloud"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "reports_locales" ADD CONSTRAINT "reports_locales_meta_image_id_media_cloud_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media_cloud"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_reports_v_locales" ADD CONSTRAINT "_reports_v_locales_version_meta_image_id_media_cloud_id_fk" FOREIGN KEY ("version_meta_image_id") REFERENCES "public"."media_cloud"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "mmedia_locales" ADD CONSTRAINT "mmedia_locales_meta_image_id_media_cloud_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media_cloud"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_mmedia_v_locales" ADD CONSTRAINT "_mmedia_v_locales_version_meta_image_id_media_cloud_id_fk" FOREIGN KEY ("version_meta_image_id") REFERENCES "public"."media_cloud"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "grants_meta_meta_image_idx" ON "grants" USING btree ("meta_image_id");
  CREATE INDEX "_grants_v_version_meta_version_meta_image_idx" ON "_grants_v" USING btree ("version_meta_image_id");
  CREATE INDEX "pages_meta_meta_image_idx" ON "pages" USING btree ("meta_image_id");
  CREATE INDEX "_pages_v_version_meta_version_meta_image_idx" ON "_pages_v" USING btree ("version_meta_image_id");
  CREATE INDEX "blog_meta_meta_image_idx" ON "blog_locales" USING btree ("meta_image_id","_locale");
  CREATE INDEX "_blog_v_version_meta_version_meta_image_idx" ON "_blog_v_locales" USING btree ("version_meta_image_id","_locale");
  CREATE INDEX "reports_meta_meta_image_idx" ON "reports_locales" USING btree ("meta_image_id","_locale");
  CREATE INDEX "_reports_v_version_meta_version_meta_image_idx" ON "_reports_v_locales" USING btree ("version_meta_image_id","_locale");
  CREATE INDEX "mmedia_meta_meta_image_idx" ON "mmedia_locales" USING btree ("meta_image_id","_locale");
  CREATE INDEX "_mmedia_v_version_meta_version_meta_image_idx" ON "_mmedia_v_locales" USING btree ("version_meta_image_id","_locale");
  ALTER TABLE "grants_rels" DROP COLUMN "media_cloud_id";
  ALTER TABLE "grants_rels" DROP COLUMN "asset_cloud_id";
  ALTER TABLE "_grants_v_rels" DROP COLUMN "media_cloud_id";
  ALTER TABLE "_grants_v_rels" DROP COLUMN "asset_cloud_id";
  ALTER TABLE "pages_rels" DROP COLUMN "media_cloud_id";
  ALTER TABLE "pages_rels" DROP COLUMN "asset_cloud_id";
  ALTER TABLE "_pages_v_rels" DROP COLUMN "media_cloud_id";
  ALTER TABLE "_pages_v_rels" DROP COLUMN "asset_cloud_id";
  ALTER TABLE "blog" DROP COLUMN "meta_title";
  ALTER TABLE "blog" DROP COLUMN "meta_description";
  ALTER TABLE "blog_rels" DROP COLUMN "media_cloud_id";
  ALTER TABLE "blog_rels" DROP COLUMN "asset_cloud_id";
  ALTER TABLE "_blog_v" DROP COLUMN "version_meta_title";
  ALTER TABLE "_blog_v" DROP COLUMN "version_meta_description";
  ALTER TABLE "_blog_v_rels" DROP COLUMN "media_cloud_id";
  ALTER TABLE "_blog_v_rels" DROP COLUMN "asset_cloud_id";
  ALTER TABLE "reports" DROP COLUMN "meta_title";
  ALTER TABLE "reports" DROP COLUMN "meta_description";
  ALTER TABLE "reports_rels" DROP COLUMN "media_cloud_id";
  ALTER TABLE "reports_rels" DROP COLUMN "asset_cloud_id";
  ALTER TABLE "_reports_v" DROP COLUMN "version_meta_title";
  ALTER TABLE "_reports_v" DROP COLUMN "version_meta_description";
  ALTER TABLE "_reports_v_rels" DROP COLUMN "media_cloud_id";
  ALTER TABLE "_reports_v_rels" DROP COLUMN "asset_cloud_id";
  ALTER TABLE "mmedia" DROP COLUMN "meta_title";
  ALTER TABLE "mmedia" DROP COLUMN "meta_description";
  ALTER TABLE "mmedia_rels" DROP COLUMN "media_cloud_id";
  ALTER TABLE "mmedia_rels" DROP COLUMN "asset_cloud_id";
  ALTER TABLE "_mmedia_v" DROP COLUMN "version_meta_title";
  ALTER TABLE "_mmedia_v" DROP COLUMN "version_meta_description";
  ALTER TABLE "_mmedia_v_rels" DROP COLUMN "media_cloud_id";
  ALTER TABLE "_mmedia_v_rels" DROP COLUMN "asset_cloud_id";`)
}
