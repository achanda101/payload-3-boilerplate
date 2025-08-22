import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "documents" (
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
  	"focal_y" numeric
  );
  
  CREATE TABLE "users_sessions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"created_at" timestamp(3) with time zone,
  	"expires_at" timestamp(3) with time zone NOT NULL
  );
  
  ALTER TABLE "posts_locales" DROP CONSTRAINT "posts_locales_locale_parent_id_unique";
  ALTER TABLE "_posts_v_locales" DROP CONSTRAINT "_posts_v_locales_locale_parent_id_unique";
  ALTER TABLE "forms_blocks_checkbox_locales" DROP CONSTRAINT "forms_blocks_checkbox_locales_locale_parent_id_unique";
  ALTER TABLE "forms_blocks_country_locales" DROP CONSTRAINT "forms_blocks_country_locales_locale_parent_id_unique";
  ALTER TABLE "forms_blocks_email_locales" DROP CONSTRAINT "forms_blocks_email_locales_locale_parent_id_unique";
  ALTER TABLE "forms_blocks_message_locales" DROP CONSTRAINT "forms_blocks_message_locales_locale_parent_id_unique";
  ALTER TABLE "forms_blocks_number_locales" DROP CONSTRAINT "forms_blocks_number_locales_locale_parent_id_unique";
  ALTER TABLE "forms_blocks_select_options_locales" DROP CONSTRAINT "forms_blocks_select_options_locales_locale_parent_id_unique";
  ALTER TABLE "forms_blocks_select_locales" DROP CONSTRAINT "forms_blocks_select_locales_locale_parent_id_unique";
  ALTER TABLE "forms_blocks_state_locales" DROP CONSTRAINT "forms_blocks_state_locales_locale_parent_id_unique";
  ALTER TABLE "forms_blocks_text_locales" DROP CONSTRAINT "forms_blocks_text_locales_locale_parent_id_unique";
  ALTER TABLE "forms_blocks_textarea_locales" DROP CONSTRAINT "forms_blocks_textarea_locales_locale_parent_id_unique";
  ALTER TABLE "forms_emails_locales" DROP CONSTRAINT "forms_emails_locales_locale_parent_id_unique";
  ALTER TABLE "forms_locales" DROP CONSTRAINT "forms_locales_locale_parent_id_unique";
  ALTER TABLE "search_locales" DROP CONSTRAINT "search_locales_locale_parent_id_unique";
  ALTER TABLE "footer_locales" DROP CONSTRAINT "footer_locales_locale_parent_id_unique";
  ALTER TABLE "nav_menu_items_nav_items_locales" DROP CONSTRAINT "nav_menu_items_nav_items_locales_locale_parent_id_unique";
  ALTER TABLE "nav_menu_items_locales" DROP CONSTRAINT "nav_menu_items_locales_locale_parent_id_unique";
  ALTER TABLE "contact_info_emails_locales" DROP CONSTRAINT "contact_info_emails_locales_locale_parent_id_unique";
  DROP INDEX "redirects_from_idx";
  ALTER TABLE "forms_emails_locales" ALTER COLUMN "subject" SET DEFAULT 'You''ve received a new message.';
  ALTER TABLE "forms_blocks_select" ADD COLUMN "placeholder" varchar;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "documents_id" integer;
  ALTER TABLE "users_sessions" ADD CONSTRAINT "users_sessions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "documents_updated_at_idx" ON "documents" USING btree ("updated_at");
  CREATE INDEX "documents_created_at_idx" ON "documents" USING btree ("created_at");
  CREATE UNIQUE INDEX "documents_filename_idx" ON "documents" USING btree ("filename");
  CREATE INDEX "users_sessions_order_idx" ON "users_sessions" USING btree ("_order");
  CREATE INDEX "users_sessions_parent_id_idx" ON "users_sessions" USING btree ("_parent_id");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_documents_fk" FOREIGN KEY ("documents_id") REFERENCES "public"."documents"("id") ON DELETE cascade ON UPDATE no action;
  CREATE UNIQUE INDEX "posts_locales_locale_parent_id_unique" ON "posts_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "_posts_v_locales_locale_parent_id_unique" ON "_posts_v_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "forms_blocks_checkbox_locales_locale_parent_id_unique" ON "forms_blocks_checkbox_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "forms_blocks_country_locales_locale_parent_id_unique" ON "forms_blocks_country_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "forms_blocks_email_locales_locale_parent_id_unique" ON "forms_blocks_email_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "forms_blocks_message_locales_locale_parent_id_unique" ON "forms_blocks_message_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "forms_blocks_number_locales_locale_parent_id_unique" ON "forms_blocks_number_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "forms_blocks_select_options_locales_locale_parent_id_unique" ON "forms_blocks_select_options_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "forms_blocks_select_locales_locale_parent_id_unique" ON "forms_blocks_select_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "forms_blocks_state_locales_locale_parent_id_unique" ON "forms_blocks_state_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "forms_blocks_text_locales_locale_parent_id_unique" ON "forms_blocks_text_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "forms_blocks_textarea_locales_locale_parent_id_unique" ON "forms_blocks_textarea_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "forms_emails_locales_locale_parent_id_unique" ON "forms_emails_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "forms_locales_locale_parent_id_unique" ON "forms_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "search_locales_locale_parent_id_unique" ON "search_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "payload_locked_documents_rels_documents_id_idx" ON "payload_locked_documents_rels" USING btree ("documents_id");
  CREATE UNIQUE INDEX "footer_locales_locale_parent_id_unique" ON "footer_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "nav_menu_items_nav_items_locales_locale_parent_id_unique" ON "nav_menu_items_nav_items_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "nav_menu_items_locales_locale_parent_id_unique" ON "nav_menu_items_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "contact_info_emails_locales_locale_parent_id_unique" ON "contact_info_emails_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "redirects_from_idx" ON "redirects" USING btree ("from");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "documents" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "users_sessions" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "documents" CASCADE;
  DROP TABLE "users_sessions" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_documents_fk";
  
  DROP INDEX "posts_locales_locale_parent_id_unique";
  DROP INDEX "_posts_v_locales_locale_parent_id_unique";
  DROP INDEX "forms_blocks_checkbox_locales_locale_parent_id_unique";
  DROP INDEX "forms_blocks_country_locales_locale_parent_id_unique";
  DROP INDEX "forms_blocks_email_locales_locale_parent_id_unique";
  DROP INDEX "forms_blocks_message_locales_locale_parent_id_unique";
  DROP INDEX "forms_blocks_number_locales_locale_parent_id_unique";
  DROP INDEX "forms_blocks_select_options_locales_locale_parent_id_unique";
  DROP INDEX "forms_blocks_select_locales_locale_parent_id_unique";
  DROP INDEX "forms_blocks_state_locales_locale_parent_id_unique";
  DROP INDEX "forms_blocks_text_locales_locale_parent_id_unique";
  DROP INDEX "forms_blocks_textarea_locales_locale_parent_id_unique";
  DROP INDEX "forms_emails_locales_locale_parent_id_unique";
  DROP INDEX "forms_locales_locale_parent_id_unique";
  DROP INDEX "search_locales_locale_parent_id_unique";
  DROP INDEX "payload_locked_documents_rels_documents_id_idx";
  DROP INDEX "footer_locales_locale_parent_id_unique";
  DROP INDEX "nav_menu_items_nav_items_locales_locale_parent_id_unique";
  DROP INDEX "nav_menu_items_locales_locale_parent_id_unique";
  DROP INDEX "contact_info_emails_locales_locale_parent_id_unique";
  DROP INDEX "redirects_from_idx";
  ALTER TABLE "forms_emails_locales" ALTER COLUMN "subject" SET DEFAULT 'You''''ve received a new message.';
  CREATE INDEX "redirects_from_idx" ON "redirects" USING btree ("from");
  ALTER TABLE "forms_blocks_select" DROP COLUMN "placeholder";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "documents_id";
  ALTER TABLE "posts_locales" ADD CONSTRAINT "posts_locales_locale_parent_id_unique" UNIQUE("_locale","_parent_id");
  ALTER TABLE "_posts_v_locales" ADD CONSTRAINT "_posts_v_locales_locale_parent_id_unique" UNIQUE("_locale","_parent_id");
  ALTER TABLE "forms_blocks_checkbox_locales" ADD CONSTRAINT "forms_blocks_checkbox_locales_locale_parent_id_unique" UNIQUE("_locale","_parent_id");
  ALTER TABLE "forms_blocks_country_locales" ADD CONSTRAINT "forms_blocks_country_locales_locale_parent_id_unique" UNIQUE("_locale","_parent_id");
  ALTER TABLE "forms_blocks_email_locales" ADD CONSTRAINT "forms_blocks_email_locales_locale_parent_id_unique" UNIQUE("_locale","_parent_id");
  ALTER TABLE "forms_blocks_message_locales" ADD CONSTRAINT "forms_blocks_message_locales_locale_parent_id_unique" UNIQUE("_locale","_parent_id");
  ALTER TABLE "forms_blocks_number_locales" ADD CONSTRAINT "forms_blocks_number_locales_locale_parent_id_unique" UNIQUE("_locale","_parent_id");
  ALTER TABLE "forms_blocks_select_options_locales" ADD CONSTRAINT "forms_blocks_select_options_locales_locale_parent_id_unique" UNIQUE("_locale","_parent_id");
  ALTER TABLE "forms_blocks_select_locales" ADD CONSTRAINT "forms_blocks_select_locales_locale_parent_id_unique" UNIQUE("_locale","_parent_id");
  ALTER TABLE "forms_blocks_state_locales" ADD CONSTRAINT "forms_blocks_state_locales_locale_parent_id_unique" UNIQUE("_locale","_parent_id");
  ALTER TABLE "forms_blocks_text_locales" ADD CONSTRAINT "forms_blocks_text_locales_locale_parent_id_unique" UNIQUE("_locale","_parent_id");
  ALTER TABLE "forms_blocks_textarea_locales" ADD CONSTRAINT "forms_blocks_textarea_locales_locale_parent_id_unique" UNIQUE("_locale","_parent_id");
  ALTER TABLE "forms_emails_locales" ADD CONSTRAINT "forms_emails_locales_locale_parent_id_unique" UNIQUE("_locale","_parent_id");
  ALTER TABLE "forms_locales" ADD CONSTRAINT "forms_locales_locale_parent_id_unique" UNIQUE("_locale","_parent_id");
  ALTER TABLE "search_locales" ADD CONSTRAINT "search_locales_locale_parent_id_unique" UNIQUE("_locale","_parent_id");
  ALTER TABLE "footer_locales" ADD CONSTRAINT "footer_locales_locale_parent_id_unique" UNIQUE("_locale","_parent_id");
  ALTER TABLE "nav_menu_items_nav_items_locales" ADD CONSTRAINT "nav_menu_items_nav_items_locales_locale_parent_id_unique" UNIQUE("_locale","_parent_id");
  ALTER TABLE "nav_menu_items_locales" ADD CONSTRAINT "nav_menu_items_locales_locale_parent_id_unique" UNIQUE("_locale","_parent_id");
  ALTER TABLE "contact_info_emails_locales" ADD CONSTRAINT "contact_info_emails_locales_locale_parent_id_unique" UNIQUE("_locale","_parent_id");`)
}
