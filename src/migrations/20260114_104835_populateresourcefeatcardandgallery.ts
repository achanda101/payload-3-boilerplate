import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "grants_blocks_resource_feat_card" ADD COLUMN "filter_by_doc_type_id" integer;
  ALTER TABLE "_grants_v_blocks_resource_feat_card" ADD COLUMN "filter_by_doc_type_id" integer;
  ALTER TABLE "pages_blocks_resource_feat_card" ADD COLUMN "filter_by_doc_type_id" integer;
  ALTER TABLE "pages_blocks_resource_gallery" ADD COLUMN "add_all_resources" boolean;
  ALTER TABLE "pages_blocks_resource_gallery" ADD COLUMN "filter_by_doc_type_id" integer;
  ALTER TABLE "_pages_v_blocks_resource_feat_card" ADD COLUMN "filter_by_doc_type_id" integer;
  ALTER TABLE "_pages_v_blocks_resource_gallery" ADD COLUMN "add_all_resources" boolean;
  ALTER TABLE "_pages_v_blocks_resource_gallery" ADD COLUMN "filter_by_doc_type_id" integer;
  ALTER TABLE "blog_blocks_resource_feat_card" ADD COLUMN "filter_by_doc_type_id" integer;
  ALTER TABLE "blog_blocks_resource_gallery" ADD COLUMN "add_all_resources" boolean;
  ALTER TABLE "blog_blocks_resource_gallery" ADD COLUMN "filter_by_doc_type_id" integer;
  ALTER TABLE "_blog_v_blocks_resource_feat_card" ADD COLUMN "filter_by_doc_type_id" integer;
  ALTER TABLE "_blog_v_blocks_resource_gallery" ADD COLUMN "add_all_resources" boolean;
  ALTER TABLE "_blog_v_blocks_resource_gallery" ADD COLUMN "filter_by_doc_type_id" integer;
  ALTER TABLE "reports_blocks_resource_feat_card" ADD COLUMN "filter_by_doc_type_id" integer;
  ALTER TABLE "reports_blocks_resource_gallery" ADD COLUMN "add_all_resources" boolean;
  ALTER TABLE "reports_blocks_resource_gallery" ADD COLUMN "filter_by_doc_type_id" integer;
  ALTER TABLE "_reports_v_blocks_resource_feat_card" ADD COLUMN "filter_by_doc_type_id" integer;
  ALTER TABLE "_reports_v_blocks_resource_gallery" ADD COLUMN "add_all_resources" boolean;
  ALTER TABLE "_reports_v_blocks_resource_gallery" ADD COLUMN "filter_by_doc_type_id" integer;
  ALTER TABLE "mmedia_blocks_resource_feat_card" ADD COLUMN "filter_by_doc_type_id" integer;
  ALTER TABLE "mmedia_blocks_resource_gallery" ADD COLUMN "add_all_resources" boolean;
  ALTER TABLE "mmedia_blocks_resource_gallery" ADD COLUMN "filter_by_doc_type_id" integer;
  ALTER TABLE "_mmedia_v_blocks_resource_feat_card" ADD COLUMN "filter_by_doc_type_id" integer;
  ALTER TABLE "_mmedia_v_blocks_resource_gallery" ADD COLUMN "add_all_resources" boolean;
  ALTER TABLE "_mmedia_v_blocks_resource_gallery" ADD COLUMN "filter_by_doc_type_id" integer;
  ALTER TABLE "homepage_blocks_resource_feat_card" ADD COLUMN "filter_by_doc_type_id" integer;
  ALTER TABLE "homepage_blocks_resource_gallery" ADD COLUMN "add_all_resources" boolean;
  ALTER TABLE "homepage_blocks_resource_gallery" ADD COLUMN "filter_by_doc_type_id" integer;
  ALTER TABLE "_homepage_v_blocks_resource_feat_card" ADD COLUMN "filter_by_doc_type_id" integer;
  ALTER TABLE "_homepage_v_blocks_resource_gallery" ADD COLUMN "add_all_resources" boolean;
  ALTER TABLE "_homepage_v_blocks_resource_gallery" ADD COLUMN "filter_by_doc_type_id" integer;
  ALTER TABLE "grants_blocks_resource_feat_card" ADD CONSTRAINT "grants_blocks_resource_feat_card_filter_by_doc_type_id_doctypes_id_fk" FOREIGN KEY ("filter_by_doc_type_id") REFERENCES "public"."doctypes"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_grants_v_blocks_resource_feat_card" ADD CONSTRAINT "_grants_v_blocks_resource_feat_card_filter_by_doc_type_id_doctypes_id_fk" FOREIGN KEY ("filter_by_doc_type_id") REFERENCES "public"."doctypes"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_resource_feat_card" ADD CONSTRAINT "pages_blocks_resource_feat_card_filter_by_doc_type_id_doctypes_id_fk" FOREIGN KEY ("filter_by_doc_type_id") REFERENCES "public"."doctypes"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_resource_gallery" ADD CONSTRAINT "pages_blocks_resource_gallery_filter_by_doc_type_id_doctypes_id_fk" FOREIGN KEY ("filter_by_doc_type_id") REFERENCES "public"."doctypes"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_resource_feat_card" ADD CONSTRAINT "_pages_v_blocks_resource_feat_card_filter_by_doc_type_id_doctypes_id_fk" FOREIGN KEY ("filter_by_doc_type_id") REFERENCES "public"."doctypes"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_resource_gallery" ADD CONSTRAINT "_pages_v_blocks_resource_gallery_filter_by_doc_type_id_doctypes_id_fk" FOREIGN KEY ("filter_by_doc_type_id") REFERENCES "public"."doctypes"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "blog_blocks_resource_feat_card" ADD CONSTRAINT "blog_blocks_resource_feat_card_filter_by_doc_type_id_doctypes_id_fk" FOREIGN KEY ("filter_by_doc_type_id") REFERENCES "public"."doctypes"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "blog_blocks_resource_gallery" ADD CONSTRAINT "blog_blocks_resource_gallery_filter_by_doc_type_id_doctypes_id_fk" FOREIGN KEY ("filter_by_doc_type_id") REFERENCES "public"."doctypes"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_blog_v_blocks_resource_feat_card" ADD CONSTRAINT "_blog_v_blocks_resource_feat_card_filter_by_doc_type_id_doctypes_id_fk" FOREIGN KEY ("filter_by_doc_type_id") REFERENCES "public"."doctypes"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_blog_v_blocks_resource_gallery" ADD CONSTRAINT "_blog_v_blocks_resource_gallery_filter_by_doc_type_id_doctypes_id_fk" FOREIGN KEY ("filter_by_doc_type_id") REFERENCES "public"."doctypes"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "reports_blocks_resource_feat_card" ADD CONSTRAINT "reports_blocks_resource_feat_card_filter_by_doc_type_id_doctypes_id_fk" FOREIGN KEY ("filter_by_doc_type_id") REFERENCES "public"."doctypes"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "reports_blocks_resource_gallery" ADD CONSTRAINT "reports_blocks_resource_gallery_filter_by_doc_type_id_doctypes_id_fk" FOREIGN KEY ("filter_by_doc_type_id") REFERENCES "public"."doctypes"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_reports_v_blocks_resource_feat_card" ADD CONSTRAINT "_reports_v_blocks_resource_feat_card_filter_by_doc_type_id_doctypes_id_fk" FOREIGN KEY ("filter_by_doc_type_id") REFERENCES "public"."doctypes"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_reports_v_blocks_resource_gallery" ADD CONSTRAINT "_reports_v_blocks_resource_gallery_filter_by_doc_type_id_doctypes_id_fk" FOREIGN KEY ("filter_by_doc_type_id") REFERENCES "public"."doctypes"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "mmedia_blocks_resource_feat_card" ADD CONSTRAINT "mmedia_blocks_resource_feat_card_filter_by_doc_type_id_doctypes_id_fk" FOREIGN KEY ("filter_by_doc_type_id") REFERENCES "public"."doctypes"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "mmedia_blocks_resource_gallery" ADD CONSTRAINT "mmedia_blocks_resource_gallery_filter_by_doc_type_id_doctypes_id_fk" FOREIGN KEY ("filter_by_doc_type_id") REFERENCES "public"."doctypes"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_mmedia_v_blocks_resource_feat_card" ADD CONSTRAINT "_mmedia_v_blocks_resource_feat_card_filter_by_doc_type_id_doctypes_id_fk" FOREIGN KEY ("filter_by_doc_type_id") REFERENCES "public"."doctypes"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_mmedia_v_blocks_resource_gallery" ADD CONSTRAINT "_mmedia_v_blocks_resource_gallery_filter_by_doc_type_id_doctypes_id_fk" FOREIGN KEY ("filter_by_doc_type_id") REFERENCES "public"."doctypes"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "homepage_blocks_resource_feat_card" ADD CONSTRAINT "homepage_blocks_resource_feat_card_filter_by_doc_type_id_doctypes_id_fk" FOREIGN KEY ("filter_by_doc_type_id") REFERENCES "public"."doctypes"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "homepage_blocks_resource_gallery" ADD CONSTRAINT "homepage_blocks_resource_gallery_filter_by_doc_type_id_doctypes_id_fk" FOREIGN KEY ("filter_by_doc_type_id") REFERENCES "public"."doctypes"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_homepage_v_blocks_resource_feat_card" ADD CONSTRAINT "_homepage_v_blocks_resource_feat_card_filter_by_doc_type_id_doctypes_id_fk" FOREIGN KEY ("filter_by_doc_type_id") REFERENCES "public"."doctypes"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_homepage_v_blocks_resource_gallery" ADD CONSTRAINT "_homepage_v_blocks_resource_gallery_filter_by_doc_type_id_doctypes_id_fk" FOREIGN KEY ("filter_by_doc_type_id") REFERENCES "public"."doctypes"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "grants_blocks_resource_feat_card_filter_by_doc_type_idx" ON "grants_blocks_resource_feat_card" USING btree ("filter_by_doc_type_id");
  CREATE INDEX "_grants_v_blocks_resource_feat_card_filter_by_doc_type_idx" ON "_grants_v_blocks_resource_feat_card" USING btree ("filter_by_doc_type_id");
  CREATE INDEX "pages_blocks_resource_feat_card_filter_by_doc_type_idx" ON "pages_blocks_resource_feat_card" USING btree ("filter_by_doc_type_id");
  CREATE INDEX "pages_blocks_resource_gallery_filter_by_doc_type_idx" ON "pages_blocks_resource_gallery" USING btree ("filter_by_doc_type_id");
  CREATE INDEX "_pages_v_blocks_resource_feat_card_filter_by_doc_type_idx" ON "_pages_v_blocks_resource_feat_card" USING btree ("filter_by_doc_type_id");
  CREATE INDEX "_pages_v_blocks_resource_gallery_filter_by_doc_type_idx" ON "_pages_v_blocks_resource_gallery" USING btree ("filter_by_doc_type_id");
  CREATE INDEX "blog_blocks_resource_feat_card_filter_by_doc_type_idx" ON "blog_blocks_resource_feat_card" USING btree ("filter_by_doc_type_id");
  CREATE INDEX "blog_blocks_resource_gallery_filter_by_doc_type_idx" ON "blog_blocks_resource_gallery" USING btree ("filter_by_doc_type_id");
  CREATE INDEX "_blog_v_blocks_resource_feat_card_filter_by_doc_type_idx" ON "_blog_v_blocks_resource_feat_card" USING btree ("filter_by_doc_type_id");
  CREATE INDEX "_blog_v_blocks_resource_gallery_filter_by_doc_type_idx" ON "_blog_v_blocks_resource_gallery" USING btree ("filter_by_doc_type_id");
  CREATE INDEX "reports_blocks_resource_feat_card_filter_by_doc_type_idx" ON "reports_blocks_resource_feat_card" USING btree ("filter_by_doc_type_id");
  CREATE INDEX "reports_blocks_resource_gallery_filter_by_doc_type_idx" ON "reports_blocks_resource_gallery" USING btree ("filter_by_doc_type_id");
  CREATE INDEX "_reports_v_blocks_resource_feat_card_filter_by_doc_type_idx" ON "_reports_v_blocks_resource_feat_card" USING btree ("filter_by_doc_type_id");
  CREATE INDEX "_reports_v_blocks_resource_gallery_filter_by_doc_type_idx" ON "_reports_v_blocks_resource_gallery" USING btree ("filter_by_doc_type_id");
  CREATE INDEX "mmedia_blocks_resource_feat_card_filter_by_doc_type_idx" ON "mmedia_blocks_resource_feat_card" USING btree ("filter_by_doc_type_id");
  CREATE INDEX "mmedia_blocks_resource_gallery_filter_by_doc_type_idx" ON "mmedia_blocks_resource_gallery" USING btree ("filter_by_doc_type_id");
  CREATE INDEX "_mmedia_v_blocks_resource_feat_card_filter_by_doc_type_idx" ON "_mmedia_v_blocks_resource_feat_card" USING btree ("filter_by_doc_type_id");
  CREATE INDEX "_mmedia_v_blocks_resource_gallery_filter_by_doc_type_idx" ON "_mmedia_v_blocks_resource_gallery" USING btree ("filter_by_doc_type_id");
  CREATE INDEX "homepage_blocks_resource_feat_card_filter_by_doc_type_idx" ON "homepage_blocks_resource_feat_card" USING btree ("filter_by_doc_type_id");
  CREATE INDEX "homepage_blocks_resource_gallery_filter_by_doc_type_idx" ON "homepage_blocks_resource_gallery" USING btree ("filter_by_doc_type_id");
  CREATE INDEX "_homepage_v_blocks_resource_feat_card_filter_by_doc_type_idx" ON "_homepage_v_blocks_resource_feat_card" USING btree ("filter_by_doc_type_id");
  CREATE INDEX "_homepage_v_blocks_resource_gallery_filter_by_doc_type_idx" ON "_homepage_v_blocks_resource_gallery" USING btree ("filter_by_doc_type_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "grants_blocks_resource_feat_card" DROP CONSTRAINT "grants_blocks_resource_feat_card_filter_by_doc_type_id_doctypes_id_fk";
  
  ALTER TABLE "_grants_v_blocks_resource_feat_card" DROP CONSTRAINT "_grants_v_blocks_resource_feat_card_filter_by_doc_type_id_doctypes_id_fk";
  
  ALTER TABLE "pages_blocks_resource_feat_card" DROP CONSTRAINT "pages_blocks_resource_feat_card_filter_by_doc_type_id_doctypes_id_fk";
  
  ALTER TABLE "pages_blocks_resource_gallery" DROP CONSTRAINT "pages_blocks_resource_gallery_filter_by_doc_type_id_doctypes_id_fk";
  
  ALTER TABLE "_pages_v_blocks_resource_feat_card" DROP CONSTRAINT "_pages_v_blocks_resource_feat_card_filter_by_doc_type_id_doctypes_id_fk";
  
  ALTER TABLE "_pages_v_blocks_resource_gallery" DROP CONSTRAINT "_pages_v_blocks_resource_gallery_filter_by_doc_type_id_doctypes_id_fk";
  
  ALTER TABLE "blog_blocks_resource_feat_card" DROP CONSTRAINT "blog_blocks_resource_feat_card_filter_by_doc_type_id_doctypes_id_fk";
  
  ALTER TABLE "blog_blocks_resource_gallery" DROP CONSTRAINT "blog_blocks_resource_gallery_filter_by_doc_type_id_doctypes_id_fk";
  
  ALTER TABLE "_blog_v_blocks_resource_feat_card" DROP CONSTRAINT "_blog_v_blocks_resource_feat_card_filter_by_doc_type_id_doctypes_id_fk";
  
  ALTER TABLE "_blog_v_blocks_resource_gallery" DROP CONSTRAINT "_blog_v_blocks_resource_gallery_filter_by_doc_type_id_doctypes_id_fk";
  
  ALTER TABLE "reports_blocks_resource_feat_card" DROP CONSTRAINT "reports_blocks_resource_feat_card_filter_by_doc_type_id_doctypes_id_fk";
  
  ALTER TABLE "reports_blocks_resource_gallery" DROP CONSTRAINT "reports_blocks_resource_gallery_filter_by_doc_type_id_doctypes_id_fk";
  
  ALTER TABLE "_reports_v_blocks_resource_feat_card" DROP CONSTRAINT "_reports_v_blocks_resource_feat_card_filter_by_doc_type_id_doctypes_id_fk";
  
  ALTER TABLE "_reports_v_blocks_resource_gallery" DROP CONSTRAINT "_reports_v_blocks_resource_gallery_filter_by_doc_type_id_doctypes_id_fk";
  
  ALTER TABLE "mmedia_blocks_resource_feat_card" DROP CONSTRAINT "mmedia_blocks_resource_feat_card_filter_by_doc_type_id_doctypes_id_fk";
  
  ALTER TABLE "mmedia_blocks_resource_gallery" DROP CONSTRAINT "mmedia_blocks_resource_gallery_filter_by_doc_type_id_doctypes_id_fk";
  
  ALTER TABLE "_mmedia_v_blocks_resource_feat_card" DROP CONSTRAINT "_mmedia_v_blocks_resource_feat_card_filter_by_doc_type_id_doctypes_id_fk";
  
  ALTER TABLE "_mmedia_v_blocks_resource_gallery" DROP CONSTRAINT "_mmedia_v_blocks_resource_gallery_filter_by_doc_type_id_doctypes_id_fk";
  
  ALTER TABLE "homepage_blocks_resource_feat_card" DROP CONSTRAINT "homepage_blocks_resource_feat_card_filter_by_doc_type_id_doctypes_id_fk";
  
  ALTER TABLE "homepage_blocks_resource_gallery" DROP CONSTRAINT "homepage_blocks_resource_gallery_filter_by_doc_type_id_doctypes_id_fk";
  
  ALTER TABLE "_homepage_v_blocks_resource_feat_card" DROP CONSTRAINT "_homepage_v_blocks_resource_feat_card_filter_by_doc_type_id_doctypes_id_fk";
  
  ALTER TABLE "_homepage_v_blocks_resource_gallery" DROP CONSTRAINT "_homepage_v_blocks_resource_gallery_filter_by_doc_type_id_doctypes_id_fk";
  
  DROP INDEX "grants_blocks_resource_feat_card_filter_by_doc_type_idx";
  DROP INDEX "_grants_v_blocks_resource_feat_card_filter_by_doc_type_idx";
  DROP INDEX "pages_blocks_resource_feat_card_filter_by_doc_type_idx";
  DROP INDEX "pages_blocks_resource_gallery_filter_by_doc_type_idx";
  DROP INDEX "_pages_v_blocks_resource_feat_card_filter_by_doc_type_idx";
  DROP INDEX "_pages_v_blocks_resource_gallery_filter_by_doc_type_idx";
  DROP INDEX "blog_blocks_resource_feat_card_filter_by_doc_type_idx";
  DROP INDEX "blog_blocks_resource_gallery_filter_by_doc_type_idx";
  DROP INDEX "_blog_v_blocks_resource_feat_card_filter_by_doc_type_idx";
  DROP INDEX "_blog_v_blocks_resource_gallery_filter_by_doc_type_idx";
  DROP INDEX "reports_blocks_resource_feat_card_filter_by_doc_type_idx";
  DROP INDEX "reports_blocks_resource_gallery_filter_by_doc_type_idx";
  DROP INDEX "_reports_v_blocks_resource_feat_card_filter_by_doc_type_idx";
  DROP INDEX "_reports_v_blocks_resource_gallery_filter_by_doc_type_idx";
  DROP INDEX "mmedia_blocks_resource_feat_card_filter_by_doc_type_idx";
  DROP INDEX "mmedia_blocks_resource_gallery_filter_by_doc_type_idx";
  DROP INDEX "_mmedia_v_blocks_resource_feat_card_filter_by_doc_type_idx";
  DROP INDEX "_mmedia_v_blocks_resource_gallery_filter_by_doc_type_idx";
  DROP INDEX "homepage_blocks_resource_feat_card_filter_by_doc_type_idx";
  DROP INDEX "homepage_blocks_resource_gallery_filter_by_doc_type_idx";
  DROP INDEX "_homepage_v_blocks_resource_feat_card_filter_by_doc_type_idx";
  DROP INDEX "_homepage_v_blocks_resource_gallery_filter_by_doc_type_idx";
  ALTER TABLE "grants_blocks_resource_feat_card" DROP COLUMN "filter_by_doc_type_id";
  ALTER TABLE "_grants_v_blocks_resource_feat_card" DROP COLUMN "filter_by_doc_type_id";
  ALTER TABLE "pages_blocks_resource_feat_card" DROP COLUMN "filter_by_doc_type_id";
  ALTER TABLE "pages_blocks_resource_gallery" DROP COLUMN "add_all_resources";
  ALTER TABLE "pages_blocks_resource_gallery" DROP COLUMN "filter_by_doc_type_id";
  ALTER TABLE "_pages_v_blocks_resource_feat_card" DROP COLUMN "filter_by_doc_type_id";
  ALTER TABLE "_pages_v_blocks_resource_gallery" DROP COLUMN "add_all_resources";
  ALTER TABLE "_pages_v_blocks_resource_gallery" DROP COLUMN "filter_by_doc_type_id";
  ALTER TABLE "blog_blocks_resource_feat_card" DROP COLUMN "filter_by_doc_type_id";
  ALTER TABLE "blog_blocks_resource_gallery" DROP COLUMN "add_all_resources";
  ALTER TABLE "blog_blocks_resource_gallery" DROP COLUMN "filter_by_doc_type_id";
  ALTER TABLE "_blog_v_blocks_resource_feat_card" DROP COLUMN "filter_by_doc_type_id";
  ALTER TABLE "_blog_v_blocks_resource_gallery" DROP COLUMN "add_all_resources";
  ALTER TABLE "_blog_v_blocks_resource_gallery" DROP COLUMN "filter_by_doc_type_id";
  ALTER TABLE "reports_blocks_resource_feat_card" DROP COLUMN "filter_by_doc_type_id";
  ALTER TABLE "reports_blocks_resource_gallery" DROP COLUMN "add_all_resources";
  ALTER TABLE "reports_blocks_resource_gallery" DROP COLUMN "filter_by_doc_type_id";
  ALTER TABLE "_reports_v_blocks_resource_feat_card" DROP COLUMN "filter_by_doc_type_id";
  ALTER TABLE "_reports_v_blocks_resource_gallery" DROP COLUMN "add_all_resources";
  ALTER TABLE "_reports_v_blocks_resource_gallery" DROP COLUMN "filter_by_doc_type_id";
  ALTER TABLE "mmedia_blocks_resource_feat_card" DROP COLUMN "filter_by_doc_type_id";
  ALTER TABLE "mmedia_blocks_resource_gallery" DROP COLUMN "add_all_resources";
  ALTER TABLE "mmedia_blocks_resource_gallery" DROP COLUMN "filter_by_doc_type_id";
  ALTER TABLE "_mmedia_v_blocks_resource_feat_card" DROP COLUMN "filter_by_doc_type_id";
  ALTER TABLE "_mmedia_v_blocks_resource_gallery" DROP COLUMN "add_all_resources";
  ALTER TABLE "_mmedia_v_blocks_resource_gallery" DROP COLUMN "filter_by_doc_type_id";
  ALTER TABLE "homepage_blocks_resource_feat_card" DROP COLUMN "filter_by_doc_type_id";
  ALTER TABLE "homepage_blocks_resource_gallery" DROP COLUMN "add_all_resources";
  ALTER TABLE "homepage_blocks_resource_gallery" DROP COLUMN "filter_by_doc_type_id";
  ALTER TABLE "_homepage_v_blocks_resource_feat_card" DROP COLUMN "filter_by_doc_type_id";
  ALTER TABLE "_homepage_v_blocks_resource_gallery" DROP COLUMN "add_all_resources";
  ALTER TABLE "_homepage_v_blocks_resource_gallery" DROP COLUMN "filter_by_doc_type_id";`)
}
