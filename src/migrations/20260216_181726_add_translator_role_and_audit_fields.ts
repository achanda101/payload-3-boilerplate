import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_users_assigned_languages" AS ENUM('en', 'ar', 'bi', 'bn-IN', 'br', 'ch', 'prs-Arab', 'km', 'hi', 'ms', 'ne', 'ps-Arab', 'pcm', 'si', 'tl', 'ta', 'th', 'vi', 'ur');
  ALTER TYPE "public"."enum_users_role" ADD VALUE 'translator';
  CREATE TABLE "users_assigned_languages" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum_users_assigned_languages",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  ALTER TABLE "grants" ADD COLUMN "created_by_id" integer;
  ALTER TABLE "grants" ADD COLUMN "updated_by_id" integer;
  ALTER TABLE "_grants_v" ADD COLUMN "version_created_by_id" integer;
  ALTER TABLE "_grants_v" ADD COLUMN "version_updated_by_id" integer;
  ALTER TABLE "grantcards" ADD COLUMN "created_by_id" integer;
  ALTER TABLE "grantcards" ADD COLUMN "updated_by_id" integer;
  ALTER TABLE "_grantcards_v" ADD COLUMN "version_created_by_id" integer;
  ALTER TABLE "_grantcards_v" ADD COLUMN "version_updated_by_id" integer;
  ALTER TABLE "etests" ADD COLUMN "created_by_id" integer;
  ALTER TABLE "etests" ADD COLUMN "updated_by_id" integer;
  ALTER TABLE "_etests_v" ADD COLUMN "version_created_by_id" integer;
  ALTER TABLE "_etests_v" ADD COLUMN "version_updated_by_id" integer;
  ALTER TABLE "pages" ADD COLUMN "created_by_id" integer;
  ALTER TABLE "pages" ADD COLUMN "updated_by_id" integer;
  ALTER TABLE "_pages_v" ADD COLUMN "version_created_by_id" integer;
  ALTER TABLE "_pages_v" ADD COLUMN "version_updated_by_id" integer;
  ALTER TABLE "blog" ADD COLUMN "created_by_id" integer;
  ALTER TABLE "blog" ADD COLUMN "updated_by_id" integer;
  ALTER TABLE "_blog_v" ADD COLUMN "version_created_by_id" integer;
  ALTER TABLE "_blog_v" ADD COLUMN "version_updated_by_id" integer;
  ALTER TABLE "reports" ADD COLUMN "created_by_id" integer;
  ALTER TABLE "reports" ADD COLUMN "updated_by_id" integer;
  ALTER TABLE "_reports_v" ADD COLUMN "version_created_by_id" integer;
  ALTER TABLE "_reports_v" ADD COLUMN "version_updated_by_id" integer;
  ALTER TABLE "mmedia" ADD COLUMN "created_by_id" integer;
  ALTER TABLE "mmedia" ADD COLUMN "updated_by_id" integer;
  ALTER TABLE "_mmedia_v" ADD COLUMN "version_created_by_id" integer;
  ALTER TABLE "_mmedia_v" ADD COLUMN "version_updated_by_id" integer;
  ALTER TABLE "homepage" ADD COLUMN "created_by_id" integer;
  ALTER TABLE "homepage" ADD COLUMN "updated_by_id" integer;
  ALTER TABLE "_homepage_v" ADD COLUMN "version_created_by_id" integer;
  ALTER TABLE "_homepage_v" ADD COLUMN "version_updated_by_id" integer;
  ALTER TABLE "users_assigned_languages" ADD CONSTRAINT "users_assigned_languages_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "users_assigned_languages_order_idx" ON "users_assigned_languages" USING btree ("order");
  CREATE INDEX "users_assigned_languages_parent_idx" ON "users_assigned_languages" USING btree ("parent_id");
  ALTER TABLE "grants" ADD CONSTRAINT "grants_created_by_id_users_id_fk" FOREIGN KEY ("created_by_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "grants" ADD CONSTRAINT "grants_updated_by_id_users_id_fk" FOREIGN KEY ("updated_by_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_grants_v" ADD CONSTRAINT "_grants_v_version_created_by_id_users_id_fk" FOREIGN KEY ("version_created_by_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_grants_v" ADD CONSTRAINT "_grants_v_version_updated_by_id_users_id_fk" FOREIGN KEY ("version_updated_by_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "grantcards" ADD CONSTRAINT "grantcards_created_by_id_users_id_fk" FOREIGN KEY ("created_by_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "grantcards" ADD CONSTRAINT "grantcards_updated_by_id_users_id_fk" FOREIGN KEY ("updated_by_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_grantcards_v" ADD CONSTRAINT "_grantcards_v_version_created_by_id_users_id_fk" FOREIGN KEY ("version_created_by_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_grantcards_v" ADD CONSTRAINT "_grantcards_v_version_updated_by_id_users_id_fk" FOREIGN KEY ("version_updated_by_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "etests" ADD CONSTRAINT "etests_created_by_id_users_id_fk" FOREIGN KEY ("created_by_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "etests" ADD CONSTRAINT "etests_updated_by_id_users_id_fk" FOREIGN KEY ("updated_by_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_etests_v" ADD CONSTRAINT "_etests_v_version_created_by_id_users_id_fk" FOREIGN KEY ("version_created_by_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_etests_v" ADD CONSTRAINT "_etests_v_version_updated_by_id_users_id_fk" FOREIGN KEY ("version_updated_by_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages" ADD CONSTRAINT "pages_created_by_id_users_id_fk" FOREIGN KEY ("created_by_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages" ADD CONSTRAINT "pages_updated_by_id_users_id_fk" FOREIGN KEY ("updated_by_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v" ADD CONSTRAINT "_pages_v_version_created_by_id_users_id_fk" FOREIGN KEY ("version_created_by_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v" ADD CONSTRAINT "_pages_v_version_updated_by_id_users_id_fk" FOREIGN KEY ("version_updated_by_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "blog" ADD CONSTRAINT "blog_created_by_id_users_id_fk" FOREIGN KEY ("created_by_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "blog" ADD CONSTRAINT "blog_updated_by_id_users_id_fk" FOREIGN KEY ("updated_by_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_blog_v" ADD CONSTRAINT "_blog_v_version_created_by_id_users_id_fk" FOREIGN KEY ("version_created_by_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_blog_v" ADD CONSTRAINT "_blog_v_version_updated_by_id_users_id_fk" FOREIGN KEY ("version_updated_by_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "reports" ADD CONSTRAINT "reports_created_by_id_users_id_fk" FOREIGN KEY ("created_by_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "reports" ADD CONSTRAINT "reports_updated_by_id_users_id_fk" FOREIGN KEY ("updated_by_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_reports_v" ADD CONSTRAINT "_reports_v_version_created_by_id_users_id_fk" FOREIGN KEY ("version_created_by_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_reports_v" ADD CONSTRAINT "_reports_v_version_updated_by_id_users_id_fk" FOREIGN KEY ("version_updated_by_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "mmedia" ADD CONSTRAINT "mmedia_created_by_id_users_id_fk" FOREIGN KEY ("created_by_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "mmedia" ADD CONSTRAINT "mmedia_updated_by_id_users_id_fk" FOREIGN KEY ("updated_by_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_mmedia_v" ADD CONSTRAINT "_mmedia_v_version_created_by_id_users_id_fk" FOREIGN KEY ("version_created_by_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_mmedia_v" ADD CONSTRAINT "_mmedia_v_version_updated_by_id_users_id_fk" FOREIGN KEY ("version_updated_by_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "homepage" ADD CONSTRAINT "homepage_created_by_id_users_id_fk" FOREIGN KEY ("created_by_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "homepage" ADD CONSTRAINT "homepage_updated_by_id_users_id_fk" FOREIGN KEY ("updated_by_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_homepage_v" ADD CONSTRAINT "_homepage_v_version_created_by_id_users_id_fk" FOREIGN KEY ("version_created_by_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_homepage_v" ADD CONSTRAINT "_homepage_v_version_updated_by_id_users_id_fk" FOREIGN KEY ("version_updated_by_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "grants_created_by_idx" ON "grants" USING btree ("created_by_id");
  CREATE INDEX "grants_updated_by_idx" ON "grants" USING btree ("updated_by_id");
  CREATE INDEX "_grants_v_version_version_created_by_idx" ON "_grants_v" USING btree ("version_created_by_id");
  CREATE INDEX "_grants_v_version_version_updated_by_idx" ON "_grants_v" USING btree ("version_updated_by_id");
  CREATE INDEX "grantcards_created_by_idx" ON "grantcards" USING btree ("created_by_id");
  CREATE INDEX "grantcards_updated_by_idx" ON "grantcards" USING btree ("updated_by_id");
  CREATE INDEX "_grantcards_v_version_version_created_by_idx" ON "_grantcards_v" USING btree ("version_created_by_id");
  CREATE INDEX "_grantcards_v_version_version_updated_by_idx" ON "_grantcards_v" USING btree ("version_updated_by_id");
  CREATE INDEX "etests_created_by_idx" ON "etests" USING btree ("created_by_id");
  CREATE INDEX "etests_updated_by_idx" ON "etests" USING btree ("updated_by_id");
  CREATE INDEX "_etests_v_version_version_created_by_idx" ON "_etests_v" USING btree ("version_created_by_id");
  CREATE INDEX "_etests_v_version_version_updated_by_idx" ON "_etests_v" USING btree ("version_updated_by_id");
  CREATE INDEX "pages_created_by_idx" ON "pages" USING btree ("created_by_id");
  CREATE INDEX "pages_updated_by_idx" ON "pages" USING btree ("updated_by_id");
  CREATE INDEX "_pages_v_version_version_created_by_idx" ON "_pages_v" USING btree ("version_created_by_id");
  CREATE INDEX "_pages_v_version_version_updated_by_idx" ON "_pages_v" USING btree ("version_updated_by_id");
  CREATE INDEX "blog_created_by_idx" ON "blog" USING btree ("created_by_id");
  CREATE INDEX "blog_updated_by_idx" ON "blog" USING btree ("updated_by_id");
  CREATE INDEX "_blog_v_version_version_created_by_idx" ON "_blog_v" USING btree ("version_created_by_id");
  CREATE INDEX "_blog_v_version_version_updated_by_idx" ON "_blog_v" USING btree ("version_updated_by_id");
  CREATE INDEX "reports_created_by_idx" ON "reports" USING btree ("created_by_id");
  CREATE INDEX "reports_updated_by_idx" ON "reports" USING btree ("updated_by_id");
  CREATE INDEX "_reports_v_version_version_created_by_idx" ON "_reports_v" USING btree ("version_created_by_id");
  CREATE INDEX "_reports_v_version_version_updated_by_idx" ON "_reports_v" USING btree ("version_updated_by_id");
  CREATE INDEX "mmedia_created_by_idx" ON "mmedia" USING btree ("created_by_id");
  CREATE INDEX "mmedia_updated_by_idx" ON "mmedia" USING btree ("updated_by_id");
  CREATE INDEX "_mmedia_v_version_version_created_by_idx" ON "_mmedia_v" USING btree ("version_created_by_id");
  CREATE INDEX "_mmedia_v_version_version_updated_by_idx" ON "_mmedia_v" USING btree ("version_updated_by_id");
  CREATE INDEX "homepage_created_by_idx" ON "homepage" USING btree ("created_by_id");
  CREATE INDEX "homepage_updated_by_idx" ON "homepage" USING btree ("updated_by_id");
  CREATE INDEX "_homepage_v_version_version_created_by_idx" ON "_homepage_v" USING btree ("version_created_by_id");
  CREATE INDEX "_homepage_v_version_version_updated_by_idx" ON "_homepage_v" USING btree ("version_updated_by_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "users_assigned_languages" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "users_assigned_languages" CASCADE;
  ALTER TABLE "grants" DROP CONSTRAINT "grants_created_by_id_users_id_fk";
  
  ALTER TABLE "grants" DROP CONSTRAINT "grants_updated_by_id_users_id_fk";
  
  ALTER TABLE "_grants_v" DROP CONSTRAINT "_grants_v_version_created_by_id_users_id_fk";
  
  ALTER TABLE "_grants_v" DROP CONSTRAINT "_grants_v_version_updated_by_id_users_id_fk";
  
  ALTER TABLE "grantcards" DROP CONSTRAINT "grantcards_created_by_id_users_id_fk";
  
  ALTER TABLE "grantcards" DROP CONSTRAINT "grantcards_updated_by_id_users_id_fk";
  
  ALTER TABLE "_grantcards_v" DROP CONSTRAINT "_grantcards_v_version_created_by_id_users_id_fk";
  
  ALTER TABLE "_grantcards_v" DROP CONSTRAINT "_grantcards_v_version_updated_by_id_users_id_fk";
  
  ALTER TABLE "etests" DROP CONSTRAINT "etests_created_by_id_users_id_fk";
  
  ALTER TABLE "etests" DROP CONSTRAINT "etests_updated_by_id_users_id_fk";
  
  ALTER TABLE "_etests_v" DROP CONSTRAINT "_etests_v_version_created_by_id_users_id_fk";
  
  ALTER TABLE "_etests_v" DROP CONSTRAINT "_etests_v_version_updated_by_id_users_id_fk";
  
  ALTER TABLE "pages" DROP CONSTRAINT "pages_created_by_id_users_id_fk";
  
  ALTER TABLE "pages" DROP CONSTRAINT "pages_updated_by_id_users_id_fk";
  
  ALTER TABLE "_pages_v" DROP CONSTRAINT "_pages_v_version_created_by_id_users_id_fk";
  
  ALTER TABLE "_pages_v" DROP CONSTRAINT "_pages_v_version_updated_by_id_users_id_fk";
  
  ALTER TABLE "blog" DROP CONSTRAINT "blog_created_by_id_users_id_fk";
  
  ALTER TABLE "blog" DROP CONSTRAINT "blog_updated_by_id_users_id_fk";
  
  ALTER TABLE "_blog_v" DROP CONSTRAINT "_blog_v_version_created_by_id_users_id_fk";
  
  ALTER TABLE "_blog_v" DROP CONSTRAINT "_blog_v_version_updated_by_id_users_id_fk";
  
  ALTER TABLE "reports" DROP CONSTRAINT "reports_created_by_id_users_id_fk";
  
  ALTER TABLE "reports" DROP CONSTRAINT "reports_updated_by_id_users_id_fk";
  
  ALTER TABLE "_reports_v" DROP CONSTRAINT "_reports_v_version_created_by_id_users_id_fk";
  
  ALTER TABLE "_reports_v" DROP CONSTRAINT "_reports_v_version_updated_by_id_users_id_fk";
  
  ALTER TABLE "mmedia" DROP CONSTRAINT "mmedia_created_by_id_users_id_fk";
  
  ALTER TABLE "mmedia" DROP CONSTRAINT "mmedia_updated_by_id_users_id_fk";
  
  ALTER TABLE "_mmedia_v" DROP CONSTRAINT "_mmedia_v_version_created_by_id_users_id_fk";
  
  ALTER TABLE "_mmedia_v" DROP CONSTRAINT "_mmedia_v_version_updated_by_id_users_id_fk";
  
  ALTER TABLE "homepage" DROP CONSTRAINT "homepage_created_by_id_users_id_fk";
  
  ALTER TABLE "homepage" DROP CONSTRAINT "homepage_updated_by_id_users_id_fk";
  
  ALTER TABLE "_homepage_v" DROP CONSTRAINT "_homepage_v_version_created_by_id_users_id_fk";
  
  ALTER TABLE "_homepage_v" DROP CONSTRAINT "_homepage_v_version_updated_by_id_users_id_fk";
  
  ALTER TABLE "users" ALTER COLUMN "role" SET DATA TYPE text;
  ALTER TABLE "users" ALTER COLUMN "role" SET DEFAULT 'writer'::text;
  DROP TYPE "public"."enum_users_role";
  CREATE TYPE "public"."enum_users_role" AS ENUM('admin', 'editor', 'writer');
  ALTER TABLE "users" ALTER COLUMN "role" SET DEFAULT 'writer'::"public"."enum_users_role";
  ALTER TABLE "users" ALTER COLUMN "role" SET DATA TYPE "public"."enum_users_role" USING "role"::"public"."enum_users_role";
  DROP INDEX "grants_created_by_idx";
  DROP INDEX "grants_updated_by_idx";
  DROP INDEX "_grants_v_version_version_created_by_idx";
  DROP INDEX "_grants_v_version_version_updated_by_idx";
  DROP INDEX "grantcards_created_by_idx";
  DROP INDEX "grantcards_updated_by_idx";
  DROP INDEX "_grantcards_v_version_version_created_by_idx";
  DROP INDEX "_grantcards_v_version_version_updated_by_idx";
  DROP INDEX "etests_created_by_idx";
  DROP INDEX "etests_updated_by_idx";
  DROP INDEX "_etests_v_version_version_created_by_idx";
  DROP INDEX "_etests_v_version_version_updated_by_idx";
  DROP INDEX "pages_created_by_idx";
  DROP INDEX "pages_updated_by_idx";
  DROP INDEX "_pages_v_version_version_created_by_idx";
  DROP INDEX "_pages_v_version_version_updated_by_idx";
  DROP INDEX "blog_created_by_idx";
  DROP INDEX "blog_updated_by_idx";
  DROP INDEX "_blog_v_version_version_created_by_idx";
  DROP INDEX "_blog_v_version_version_updated_by_idx";
  DROP INDEX "reports_created_by_idx";
  DROP INDEX "reports_updated_by_idx";
  DROP INDEX "_reports_v_version_version_created_by_idx";
  DROP INDEX "_reports_v_version_version_updated_by_idx";
  DROP INDEX "mmedia_created_by_idx";
  DROP INDEX "mmedia_updated_by_idx";
  DROP INDEX "_mmedia_v_version_version_created_by_idx";
  DROP INDEX "_mmedia_v_version_version_updated_by_idx";
  DROP INDEX "homepage_created_by_idx";
  DROP INDEX "homepage_updated_by_idx";
  DROP INDEX "_homepage_v_version_version_created_by_idx";
  DROP INDEX "_homepage_v_version_version_updated_by_idx";
  ALTER TABLE "grants" DROP COLUMN "created_by_id";
  ALTER TABLE "grants" DROP COLUMN "updated_by_id";
  ALTER TABLE "_grants_v" DROP COLUMN "version_created_by_id";
  ALTER TABLE "_grants_v" DROP COLUMN "version_updated_by_id";
  ALTER TABLE "grantcards" DROP COLUMN "created_by_id";
  ALTER TABLE "grantcards" DROP COLUMN "updated_by_id";
  ALTER TABLE "_grantcards_v" DROP COLUMN "version_created_by_id";
  ALTER TABLE "_grantcards_v" DROP COLUMN "version_updated_by_id";
  ALTER TABLE "etests" DROP COLUMN "created_by_id";
  ALTER TABLE "etests" DROP COLUMN "updated_by_id";
  ALTER TABLE "_etests_v" DROP COLUMN "version_created_by_id";
  ALTER TABLE "_etests_v" DROP COLUMN "version_updated_by_id";
  ALTER TABLE "pages" DROP COLUMN "created_by_id";
  ALTER TABLE "pages" DROP COLUMN "updated_by_id";
  ALTER TABLE "_pages_v" DROP COLUMN "version_created_by_id";
  ALTER TABLE "_pages_v" DROP COLUMN "version_updated_by_id";
  ALTER TABLE "blog" DROP COLUMN "created_by_id";
  ALTER TABLE "blog" DROP COLUMN "updated_by_id";
  ALTER TABLE "_blog_v" DROP COLUMN "version_created_by_id";
  ALTER TABLE "_blog_v" DROP COLUMN "version_updated_by_id";
  ALTER TABLE "reports" DROP COLUMN "created_by_id";
  ALTER TABLE "reports" DROP COLUMN "updated_by_id";
  ALTER TABLE "_reports_v" DROP COLUMN "version_created_by_id";
  ALTER TABLE "_reports_v" DROP COLUMN "version_updated_by_id";
  ALTER TABLE "mmedia" DROP COLUMN "created_by_id";
  ALTER TABLE "mmedia" DROP COLUMN "updated_by_id";
  ALTER TABLE "_mmedia_v" DROP COLUMN "version_created_by_id";
  ALTER TABLE "_mmedia_v" DROP COLUMN "version_updated_by_id";
  ALTER TABLE "homepage" DROP COLUMN "created_by_id";
  ALTER TABLE "homepage" DROP COLUMN "updated_by_id";
  ALTER TABLE "_homepage_v" DROP COLUMN "version_created_by_id";
  ALTER TABLE "_homepage_v" DROP COLUMN "version_updated_by_id";
  DROP TYPE "public"."enum_users_assigned_languages";`)
}
