import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
   CREATE TABLE IF NOT EXISTS "nav_menu_items_nav_items_locales" (
  	"link_label" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	CONSTRAINT "nav_menu_items_nav_items_locales_locale_parent_id_unique" UNIQUE("_locale","_parent_id")
  );
  
  CREATE TABLE IF NOT EXISTS "nav_menu_items_locales" (
  	"label" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	CONSTRAINT "nav_menu_items_locales_locale_parent_id_unique" UNIQUE("_locale","_parent_id")
  );
  
  CREATE TABLE IF NOT EXISTS "contact_info_emails_locales" (
  	"label" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	CONSTRAINT "contact_info_emails_locales_locale_parent_id_unique" UNIQUE("_locale","_parent_id")
  );
  
  DO $$ BEGIN
   ALTER TABLE "nav_menu_items_nav_items_locales" ADD CONSTRAINT "nav_menu_items_nav_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."nav_menu_items_nav_items"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "nav_menu_items_locales" ADD CONSTRAINT "nav_menu_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."nav_menu_items"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "contact_info_emails_locales" ADD CONSTRAINT "contact_info_emails_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contact_info_emails"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  ALTER TABLE "nav_menu_items_nav_items" DROP COLUMN IF EXISTS "link_label";
  ALTER TABLE "nav_menu_items" DROP COLUMN IF EXISTS "label";
  ALTER TABLE "contact_info_emails" DROP COLUMN IF EXISTS "label";`)
}

export async function down({ payload, req }: MigrateDownArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
   DROP TABLE "nav_menu_items_nav_items_locales" CASCADE;
  DROP TABLE "nav_menu_items_locales" CASCADE;
  DROP TABLE "contact_info_emails_locales" CASCADE;
  ALTER TABLE "nav_menu_items_nav_items" ADD COLUMN "link_label" varchar NOT NULL;
  ALTER TABLE "nav_menu_items" ADD COLUMN "label" varchar NOT NULL;
  ALTER TABLE "contact_info_emails" ADD COLUMN "label" varchar NOT NULL;`)
}
