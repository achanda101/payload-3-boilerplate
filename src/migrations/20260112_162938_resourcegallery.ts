import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "pages_blocks_resource_gallery" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_resource_gallery" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "blog_blocks_resource_gallery" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "_blog_v_blocks_resource_gallery" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "reports_blocks_resource_gallery" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "_reports_v_blocks_resource_gallery" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "mmedia_blocks_resource_gallery" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "_mmedia_v_blocks_resource_gallery" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "homepage_blocks_resource_gallery" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "_homepage_v_blocks_resource_gallery" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  ALTER TABLE "pages_blocks_resource_gallery" ADD CONSTRAINT "pages_blocks_resource_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_resource_gallery" ADD CONSTRAINT "_pages_v_blocks_resource_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "blog_blocks_resource_gallery" ADD CONSTRAINT "blog_blocks_resource_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."blog"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_blog_v_blocks_resource_gallery" ADD CONSTRAINT "_blog_v_blocks_resource_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_blog_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "reports_blocks_resource_gallery" ADD CONSTRAINT "reports_blocks_resource_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."reports"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_reports_v_blocks_resource_gallery" ADD CONSTRAINT "_reports_v_blocks_resource_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_reports_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "mmedia_blocks_resource_gallery" ADD CONSTRAINT "mmedia_blocks_resource_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."mmedia"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_mmedia_v_blocks_resource_gallery" ADD CONSTRAINT "_mmedia_v_blocks_resource_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_mmedia_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_blocks_resource_gallery" ADD CONSTRAINT "homepage_blocks_resource_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_homepage_v_blocks_resource_gallery" ADD CONSTRAINT "_homepage_v_blocks_resource_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_homepage_v"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_resource_gallery_order_idx" ON "pages_blocks_resource_gallery" USING btree ("_order");
  CREATE INDEX "pages_blocks_resource_gallery_parent_id_idx" ON "pages_blocks_resource_gallery" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_resource_gallery_path_idx" ON "pages_blocks_resource_gallery" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_resource_gallery_order_idx" ON "_pages_v_blocks_resource_gallery" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_resource_gallery_parent_id_idx" ON "_pages_v_blocks_resource_gallery" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_resource_gallery_path_idx" ON "_pages_v_blocks_resource_gallery" USING btree ("_path");
  CREATE INDEX "blog_blocks_resource_gallery_order_idx" ON "blog_blocks_resource_gallery" USING btree ("_order");
  CREATE INDEX "blog_blocks_resource_gallery_parent_id_idx" ON "blog_blocks_resource_gallery" USING btree ("_parent_id");
  CREATE INDEX "blog_blocks_resource_gallery_path_idx" ON "blog_blocks_resource_gallery" USING btree ("_path");
  CREATE INDEX "_blog_v_blocks_resource_gallery_order_idx" ON "_blog_v_blocks_resource_gallery" USING btree ("_order");
  CREATE INDEX "_blog_v_blocks_resource_gallery_parent_id_idx" ON "_blog_v_blocks_resource_gallery" USING btree ("_parent_id");
  CREATE INDEX "_blog_v_blocks_resource_gallery_path_idx" ON "_blog_v_blocks_resource_gallery" USING btree ("_path");
  CREATE INDEX "reports_blocks_resource_gallery_order_idx" ON "reports_blocks_resource_gallery" USING btree ("_order");
  CREATE INDEX "reports_blocks_resource_gallery_parent_id_idx" ON "reports_blocks_resource_gallery" USING btree ("_parent_id");
  CREATE INDEX "reports_blocks_resource_gallery_path_idx" ON "reports_blocks_resource_gallery" USING btree ("_path");
  CREATE INDEX "_reports_v_blocks_resource_gallery_order_idx" ON "_reports_v_blocks_resource_gallery" USING btree ("_order");
  CREATE INDEX "_reports_v_blocks_resource_gallery_parent_id_idx" ON "_reports_v_blocks_resource_gallery" USING btree ("_parent_id");
  CREATE INDEX "_reports_v_blocks_resource_gallery_path_idx" ON "_reports_v_blocks_resource_gallery" USING btree ("_path");
  CREATE INDEX "mmedia_blocks_resource_gallery_order_idx" ON "mmedia_blocks_resource_gallery" USING btree ("_order");
  CREATE INDEX "mmedia_blocks_resource_gallery_parent_id_idx" ON "mmedia_blocks_resource_gallery" USING btree ("_parent_id");
  CREATE INDEX "mmedia_blocks_resource_gallery_path_idx" ON "mmedia_blocks_resource_gallery" USING btree ("_path");
  CREATE INDEX "_mmedia_v_blocks_resource_gallery_order_idx" ON "_mmedia_v_blocks_resource_gallery" USING btree ("_order");
  CREATE INDEX "_mmedia_v_blocks_resource_gallery_parent_id_idx" ON "_mmedia_v_blocks_resource_gallery" USING btree ("_parent_id");
  CREATE INDEX "_mmedia_v_blocks_resource_gallery_path_idx" ON "_mmedia_v_blocks_resource_gallery" USING btree ("_path");
  CREATE INDEX "homepage_blocks_resource_gallery_order_idx" ON "homepage_blocks_resource_gallery" USING btree ("_order");
  CREATE INDEX "homepage_blocks_resource_gallery_parent_id_idx" ON "homepage_blocks_resource_gallery" USING btree ("_parent_id");
  CREATE INDEX "homepage_blocks_resource_gallery_path_idx" ON "homepage_blocks_resource_gallery" USING btree ("_path");
  CREATE INDEX "_homepage_v_blocks_resource_gallery_order_idx" ON "_homepage_v_blocks_resource_gallery" USING btree ("_order");
  CREATE INDEX "_homepage_v_blocks_resource_gallery_parent_id_idx" ON "_homepage_v_blocks_resource_gallery" USING btree ("_parent_id");
  CREATE INDEX "_homepage_v_blocks_resource_gallery_path_idx" ON "_homepage_v_blocks_resource_gallery" USING btree ("_path");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "pages_blocks_resource_gallery" CASCADE;
  DROP TABLE "_pages_v_blocks_resource_gallery" CASCADE;
  DROP TABLE "blog_blocks_resource_gallery" CASCADE;
  DROP TABLE "_blog_v_blocks_resource_gallery" CASCADE;
  DROP TABLE "reports_blocks_resource_gallery" CASCADE;
  DROP TABLE "_reports_v_blocks_resource_gallery" CASCADE;
  DROP TABLE "mmedia_blocks_resource_gallery" CASCADE;
  DROP TABLE "_mmedia_v_blocks_resource_gallery" CASCADE;
  DROP TABLE "homepage_blocks_resource_gallery" CASCADE;
  DROP TABLE "_homepage_v_blocks_resource_gallery" CASCADE;`)
}
