import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_header_banner_link_type" AS ENUM('reference', 'custom', 'email', 'document', 'etest');
  CREATE TABLE "header_locales" (
  	"banner_text" varchar,
  	"banner_link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "header_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"grants_id" integer,
  	"pages_id" integer,
  	"blog_id" integer,
  	"reports_id" integer,
  	"mmedia_id" integer,
  	"documents_id" integer,
  	"etests_id" integer
  );
  
  ALTER TABLE "header" ADD COLUMN "banner_link_type" "enum_header_banner_link_type" DEFAULT 'reference';
  ALTER TABLE "header" ADD COLUMN "banner_link_new_tab" boolean;
  ALTER TABLE "header" ADD COLUMN "banner_link_download_link" boolean;
  ALTER TABLE "header" ADD COLUMN "banner_link_arrow_link" boolean;
  ALTER TABLE "header" ADD COLUMN "banner_link_pill_solid" boolean;
  ALTER TABLE "header" ADD COLUMN "banner_link_pill_outline" boolean;
  ALTER TABLE "header" ADD COLUMN "banner_link_url" varchar;
  ALTER TABLE "header" ADD COLUMN "banner_link_email" varchar;
  ALTER TABLE "header_locales" ADD CONSTRAINT "header_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."header"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "header_rels" ADD CONSTRAINT "header_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."header"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "header_rels" ADD CONSTRAINT "header_rels_grants_fk" FOREIGN KEY ("grants_id") REFERENCES "public"."grants"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "header_rels" ADD CONSTRAINT "header_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "header_rels" ADD CONSTRAINT "header_rels_blog_fk" FOREIGN KEY ("blog_id") REFERENCES "public"."blog"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "header_rels" ADD CONSTRAINT "header_rels_reports_fk" FOREIGN KEY ("reports_id") REFERENCES "public"."reports"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "header_rels" ADD CONSTRAINT "header_rels_mmedia_fk" FOREIGN KEY ("mmedia_id") REFERENCES "public"."mmedia"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "header_rels" ADD CONSTRAINT "header_rels_documents_fk" FOREIGN KEY ("documents_id") REFERENCES "public"."documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "header_rels" ADD CONSTRAINT "header_rels_etests_fk" FOREIGN KEY ("etests_id") REFERENCES "public"."etests"("id") ON DELETE cascade ON UPDATE no action;
  CREATE UNIQUE INDEX "header_locales_locale_parent_id_unique" ON "header_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "header_rels_order_idx" ON "header_rels" USING btree ("order");
  CREATE INDEX "header_rels_parent_idx" ON "header_rels" USING btree ("parent_id");
  CREATE INDEX "header_rels_path_idx" ON "header_rels" USING btree ("path");
  CREATE INDEX "header_rels_grants_id_idx" ON "header_rels" USING btree ("grants_id");
  CREATE INDEX "header_rels_pages_id_idx" ON "header_rels" USING btree ("pages_id");
  CREATE INDEX "header_rels_blog_id_idx" ON "header_rels" USING btree ("blog_id");
  CREATE INDEX "header_rels_reports_id_idx" ON "header_rels" USING btree ("reports_id");
  CREATE INDEX "header_rels_mmedia_id_idx" ON "header_rels" USING btree ("mmedia_id");
  CREATE INDEX "header_rels_documents_id_idx" ON "header_rels" USING btree ("documents_id");
  CREATE INDEX "header_rels_etests_id_idx" ON "header_rels" USING btree ("etests_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "header_locales" CASCADE;
  DROP TABLE "header_rels" CASCADE;
  ALTER TABLE "header" DROP COLUMN "banner_link_type";
  ALTER TABLE "header" DROP COLUMN "banner_link_new_tab";
  ALTER TABLE "header" DROP COLUMN "banner_link_download_link";
  ALTER TABLE "header" DROP COLUMN "banner_link_arrow_link";
  ALTER TABLE "header" DROP COLUMN "banner_link_pill_solid";
  ALTER TABLE "header" DROP COLUMN "banner_link_pill_outline";
  ALTER TABLE "header" DROP COLUMN "banner_link_url";
  ALTER TABLE "header" DROP COLUMN "banner_link_email";
  DROP TYPE "public"."enum_header_banner_link_type";`)
}
