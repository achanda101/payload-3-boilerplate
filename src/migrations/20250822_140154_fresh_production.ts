import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  // Production Fresh Migration - Drop all existing tables and recreate schema
  
  console.log('🚨 WARNING: Running fresh migration - all data will be lost!')
  console.log('⏳ Dropping all existing tables and enums...')
  
  await payload.db.drizzle.execute(sql`
    -- Drop all existing tables in reverse dependency order
    DROP TABLE IF EXISTS "footer_rels" CASCADE;
    DROP TABLE IF EXISTS "footer_nav_items" CASCADE;
    DROP TABLE IF EXISTS "footer" CASCADE;
    DROP TABLE IF EXISTS "header_rels" CASCADE;
    DROP TABLE IF EXISTS "header_nav_items" CASCADE;
    DROP TABLE IF EXISTS "header" CASCADE;
    DROP TABLE IF EXISTS "navigation_menu_items" CASCADE;
    DROP TABLE IF EXISTS "navigation" CASCADE;
    DROP TABLE IF EXISTS "contact_info_email_contacts" CASCADE;
    DROP TABLE IF EXISTS "contact_info_social_media_links" CASCADE;
    DROP TABLE IF EXISTS "contact_info" CASCADE;
    DROP TABLE IF EXISTS "payload_migrations" CASCADE;
    DROP TABLE IF EXISTS "payload_preferences_rels" CASCADE;
    DROP TABLE IF EXISTS "payload_preferences" CASCADE;
    DROP TABLE IF EXISTS "payload_locked_documents_rels" CASCADE;
    DROP TABLE IF EXISTS "payload_locked_documents" CASCADE;
    DROP TABLE IF EXISTS "search_rels" CASCADE;
    DROP TABLE IF EXISTS "search_categories" CASCADE;
    DROP TABLE IF EXISTS "search" CASCADE;
    DROP TABLE IF EXISTS "form_submissions_submission_data" CASCADE;
    DROP TABLE IF EXISTS "form_submissions" CASCADE;
    DROP TABLE IF EXISTS "forms_emails" CASCADE;
    DROP TABLE IF EXISTS "forms_blocks_textarea" CASCADE;
    DROP TABLE IF EXISTS "forms_blocks_text" CASCADE;
    DROP TABLE IF EXISTS "forms_blocks_state" CASCADE;
    DROP TABLE IF EXISTS "forms_blocks_select_options" CASCADE;
    DROP TABLE IF EXISTS "forms_blocks_select" CASCADE;
    DROP TABLE IF EXISTS "forms_blocks_number" CASCADE;
    DROP TABLE IF EXISTS "forms_blocks_message" CASCADE;
    DROP TABLE IF EXISTS "forms_blocks_email" CASCADE;
    DROP TABLE IF EXISTS "forms_blocks_country" CASCADE;
    DROP TABLE IF EXISTS "forms_blocks_checkbox" CASCADE;
    DROP TABLE IF EXISTS "forms" CASCADE;
    DROP TABLE IF EXISTS "redirects_rels" CASCADE;
    DROP TABLE IF EXISTS "redirects" CASCADE;
    DROP TABLE IF EXISTS "users" CASCADE;
    DROP TABLE IF EXISTS "categories_breadcrumbs" CASCADE;
    DROP TABLE IF EXISTS "categories" CASCADE;
    DROP TABLE IF EXISTS "media" CASCADE;
    DROP TABLE IF EXISTS "_posts_v_rels" CASCADE;
    DROP TABLE IF EXISTS "_posts_v_version_populated_authors" CASCADE;
    DROP TABLE IF EXISTS "_posts_v" CASCADE;
    DROP TABLE IF EXISTS "posts_rels" CASCADE;
    DROP TABLE IF EXISTS "posts_populated_authors" CASCADE;
    DROP TABLE IF EXISTS "posts" CASCADE;
    
    -- Drop all enums
    DROP TYPE IF EXISTS "public"."enum_header_languages" CASCADE;
    DROP TYPE IF EXISTS "public"."enum_navigation_menu_items_link_type" CASCADE;
    DROP TYPE IF EXISTS "public"."enum_footer_nav_items_link_type" CASCADE;
    DROP TYPE IF EXISTS "public"."enum_header_nav_items_link_type" CASCADE;
    DROP TYPE IF EXISTS "public"."enum_forms_confirmation_type" CASCADE;
    DROP TYPE IF EXISTS "public"."enum_redirects_to_type" CASCADE;
    DROP TYPE IF EXISTS "public"."enum_users_role" CASCADE;
    DROP TYPE IF EXISTS "public"."enum__posts_v_version_status" CASCADE;
    DROP TYPE IF EXISTS "public"."enum_posts_status" CASCADE;
  `)
  
  console.log('✅ All existing tables and enums dropped successfully')
  console.log('🏗️  Creating fresh schema...')
  
  // Create fresh schema based on current Payload config
  await payload.db.drizzle.execute(sql`
    -- Create enums first
    CREATE TYPE "public"."enum_posts_status" AS ENUM('draft', 'published');
    CREATE TYPE "public"."enum__posts_v_version_status" AS ENUM('draft', 'published');
    CREATE TYPE "public"."enum_users_role" AS ENUM('admin', 'editor', 'writer');
    CREATE TYPE "public"."enum_redirects_to_type" AS ENUM('reference', 'custom');
    CREATE TYPE "public"."enum_forms_confirmation_type" AS ENUM('message', 'redirect');
    CREATE TYPE "public"."enum_header_nav_items_link_type" AS ENUM('reference', 'custom');
    CREATE TYPE "public"."enum_footer_nav_items_link_type" AS ENUM('reference', 'custom');
    CREATE TYPE "public"."enum_navigation_menu_items_link_type" AS ENUM('reference', 'custom');
    CREATE TYPE "public"."enum_header_languages" AS ENUM('en', 'bi', 'bn-IN', 'br', 'ch', 'prs-Arab', 'km', 'hi', 'ms', 'ne', 'ps-Arab', 'pcm', 'si', 'tl', 'ta', 'th', 'vi', 'ur');
    
    -- Create main tables
    CREATE TABLE IF NOT EXISTS "posts_populated_authors" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "name" varchar
    );
    
    CREATE TABLE IF NOT EXISTS "posts" (
      "id" serial PRIMARY KEY NOT NULL,
      "title" varchar,
      "content" jsonb,
      "meta_title" varchar,
      "meta_image_id" integer,
      "meta_description" varchar,
      "published_at" timestamp(3) with time zone,
      "slug" varchar,
      "slug_lock" boolean DEFAULT true,
      "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
      "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
      "_status" "enum_posts_status" DEFAULT 'draft'
    );
    
    CREATE TABLE IF NOT EXISTS "posts_rels" (
      "id" serial PRIMARY KEY NOT NULL,
      "order" integer,
      "parent_id" integer NOT NULL,
      "path" varchar NOT NULL,
      "posts_id" integer,
      "categories_id" integer,
      "users_id" integer
    );
    
    CREATE TABLE IF NOT EXISTS "_posts_v_version_populated_authors" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "id" serial PRIMARY KEY NOT NULL,
      "_uuid" varchar,
      "name" varchar
    );
    
    CREATE TABLE IF NOT EXISTS "_posts_v" (
      "id" serial PRIMARY KEY NOT NULL,
      "parent_id" integer,
      "version_title" varchar,
      "version_content" jsonb,
      "version_meta_title" varchar,
      "version_meta_image_id" integer,
      "version_meta_description" varchar,
      "version_published_at" timestamp(3) with time zone,
      "version_slug" varchar,
      "version_slug_lock" boolean DEFAULT true,
      "version_updated_at" timestamp(3) with time zone,
      "version_created_at" timestamp(3) with time zone,
      "version__status" "enum__posts_v_version_status" DEFAULT 'draft',
      "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
      "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
      "latest" boolean,
      "autosave" boolean
    );
    
    CREATE TABLE IF NOT EXISTS "_posts_v_rels" (
      "id" serial PRIMARY KEY NOT NULL,
      "order" integer,
      "parent_id" integer NOT NULL,
      "path" varchar NOT NULL,
      "posts_id" integer,
      "categories_id" integer,
      "users_id" integer
    );
    
    CREATE TABLE IF NOT EXISTS "media" (
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
      "sizes_square_url" varchar,
      "sizes_square_width" numeric,
      "sizes_square_height" numeric,
      "sizes_square_mime_type" varchar,
      "sizes_square_filesize" numeric,
      "sizes_square_filename" varchar,
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
    
    CREATE TABLE IF NOT EXISTS "categories_breadcrumbs" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "doc_id" integer,
      "url" varchar,
      "label" varchar
    );
    
    CREATE TABLE IF NOT EXISTS "categories" (
      "id" serial PRIMARY KEY NOT NULL,
      "title" varchar NOT NULL,
      "parent_id" integer,
      "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
      "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
    );
    
    CREATE TABLE IF NOT EXISTS "users" (
      "id" serial PRIMARY KEY NOT NULL,
      "name" varchar,
      "role" "enum_users_role" DEFAULT 'writer',
      "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
      "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
      "email" varchar NOT NULL,
      "reset_password_token" varchar,
      "reset_password_expiration" timestamp(3) with time zone,
      "salt" varchar,
      "hash" varchar,
      "login_attempts" numeric DEFAULT 0,
      "lock_until" timestamp(3) with time zone
    );
    
    CREATE TABLE IF NOT EXISTS "redirects" (
      "id" serial PRIMARY KEY NOT NULL,
      "from" varchar NOT NULL,
      "to_type" "enum_redirects_to_type" DEFAULT 'reference',
      "to_url" varchar,
      "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
      "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
    );
    
    CREATE TABLE IF NOT EXISTS "redirects_rels" (
      "id" serial PRIMARY KEY NOT NULL,
      "order" integer,
      "parent_id" integer NOT NULL,
      "path" varchar NOT NULL,
      "posts_id" integer
    );
    
    CREATE TABLE IF NOT EXISTS "forms_blocks_checkbox" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "_path" text NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "name" varchar NOT NULL,
      "label" varchar,
      "width" numeric,
      "required" boolean,
      "default_value" boolean,
      "block_name" varchar
    );
    
    CREATE TABLE IF NOT EXISTS "forms_blocks_country" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "_path" text NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "name" varchar NOT NULL,
      "label" varchar,
      "width" numeric,
      "required" boolean,
      "block_name" varchar
    );
    
    CREATE TABLE IF NOT EXISTS "forms_blocks_email" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "_path" text NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "name" varchar NOT NULL,
      "label" varchar,
      "width" numeric,
      "required" boolean,
      "block_name" varchar
    );
    
    CREATE TABLE IF NOT EXISTS "forms_blocks_message" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "_path" text NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "message" jsonb,
      "block_name" varchar
    );
    
    CREATE TABLE IF NOT EXISTS "forms_blocks_number" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "_path" text NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "name" varchar NOT NULL,
      "label" varchar,
      "width" numeric,
      "default_value" numeric,
      "required" boolean,
      "block_name" varchar
    );
    
    CREATE TABLE IF NOT EXISTS "forms_blocks_select_options" (
      "_order" integer NOT NULL,
      "_parent_id" varchar NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "label" varchar NOT NULL,
      "value" varchar NOT NULL
    );
    
    CREATE TABLE IF NOT EXISTS "forms_blocks_select" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "_path" text NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "name" varchar NOT NULL,
      "label" varchar,
      "width" numeric,
      "default_value" varchar,
      "required" boolean,
      "block_name" varchar
    );
    
    CREATE TABLE IF NOT EXISTS "forms_blocks_state" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "_path" text NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "name" varchar NOT NULL,
      "label" varchar,
      "width" numeric,
      "required" boolean,
      "block_name" varchar
    );
    
    CREATE TABLE IF NOT EXISTS "forms_blocks_text" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "_path" text NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "name" varchar NOT NULL,
      "label" varchar,
      "width" numeric,
      "default_value" varchar,
      "required" boolean,
      "block_name" varchar
    );
    
    CREATE TABLE IF NOT EXISTS "forms_blocks_textarea" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "_path" text NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "name" varchar NOT NULL,
      "label" varchar,
      "width" numeric,
      "default_value" varchar,
      "required" boolean,
      "block_name" varchar
    );
    
    CREATE TABLE IF NOT EXISTS "forms_emails" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "email_to" varchar,
      "cc" varchar,
      "bcc" varchar,
      "reply_to" varchar,
      "email_from" varchar,
      "subject" varchar DEFAULT 'You''''ve received a new message.' NOT NULL,
      "message" jsonb
    );
    
    CREATE TABLE IF NOT EXISTS "forms" (
      "id" serial PRIMARY KEY NOT NULL,
      "title" varchar NOT NULL,
      "submit_button_label" varchar,
      "confirmation_type" "enum_forms_confirmation_type" DEFAULT 'message',
      "confirmation_message" jsonb,
      "redirect_url" varchar,
      "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
      "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
    );
    
    CREATE TABLE IF NOT EXISTS "form_submissions_submission_data" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "field" varchar NOT NULL,
      "value" varchar NOT NULL
    );
    
    CREATE TABLE IF NOT EXISTS "form_submissions" (
      "id" serial PRIMARY KEY NOT NULL,
      "form_id" integer NOT NULL,
      "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
      "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
    );
    
    CREATE TABLE IF NOT EXISTS "search_categories" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "relation_to" varchar,
      "title" varchar
    );
    
    CREATE TABLE IF NOT EXISTS "search" (
      "id" serial PRIMARY KEY NOT NULL,
      "title" varchar,
      "priority" numeric,
      "slug" varchar,
      "meta_title" varchar,
      "meta_description" varchar,
      "meta_image_id" integer,
      "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
      "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
    );
    
    CREATE TABLE IF NOT EXISTS "search_rels" (
      "id" serial PRIMARY KEY NOT NULL,
      "order" integer,
      "parent_id" integer NOT NULL,
      "path" varchar NOT NULL,
      "posts_id" integer
    );
    
    CREATE TABLE IF NOT EXISTS "payload_locked_documents" (
      "id" serial PRIMARY KEY NOT NULL,
      "global_slug" varchar,
      "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
      "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
    );
    
    CREATE TABLE IF NOT EXISTS "payload_locked_documents_rels" (
      "id" serial PRIMARY KEY NOT NULL,
      "order" integer,
      "parent_id" integer NOT NULL,
      "path" varchar NOT NULL,
      "posts_id" integer,
      "media_id" integer,
      "categories_id" integer,
      "users_id" integer,
      "redirects_id" integer,
      "forms_id" integer,
      "form_submissions_id" integer,
      "search_id" integer
    );
    
    CREATE TABLE IF NOT EXISTS "payload_preferences" (
      "id" serial PRIMARY KEY NOT NULL,
      "key" varchar,
      "value" jsonb,
      "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
      "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
    );
    
    CREATE TABLE IF NOT EXISTS "payload_preferences_rels" (
      "id" serial PRIMARY KEY NOT NULL,
      "order" integer,
      "parent_id" integer NOT NULL,
      "path" varchar NOT NULL,
      "users_id" integer
    );
    
    CREATE TABLE IF NOT EXISTS "payload_migrations" (
      "id" serial PRIMARY KEY NOT NULL,
      "name" varchar,
      "batch" numeric,
      "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
      "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
    );
    
    -- Global tables for Header, Footer, Navigation, ContactInfo
    CREATE TABLE IF NOT EXISTS "header" (
      "id" serial PRIMARY KEY NOT NULL,
      "logo_id" integer,
      "search_enabled" boolean DEFAULT true,
      "languages" "enum_header_languages"[] DEFAULT ARRAY['en']::"enum_header_languages"[],
      "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
      "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
    );
    
    CREATE TABLE IF NOT EXISTS "footer_nav_items" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "link_type" "enum_footer_nav_items_link_type" DEFAULT 'reference',
      "link_new_tab" boolean,
      "link_url" varchar,
      "link_label" varchar NOT NULL
    );
    
    CREATE TABLE IF NOT EXISTS "footer" (
      "id" serial PRIMARY KEY NOT NULL,
      "org_name" varchar NOT NULL,
      "org_description" varchar,
      "show_donate_cta" boolean DEFAULT false,
      "donate_cta_text" varchar,
      "donate_cta_url" varchar,
      "copyright_text" varchar,
      "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
      "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
    );
    
    CREATE TABLE IF NOT EXISTS "footer_rels" (
      "id" serial PRIMARY KEY NOT NULL,
      "order" integer,
      "parent_id" integer NOT NULL,
      "path" varchar NOT NULL,
      "posts_id" integer
    );
    
    CREATE TABLE IF NOT EXISTS "navigation_menu_items" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "link_type" "enum_navigation_menu_items_link_type" DEFAULT 'reference',
      "link_new_tab" boolean,
      "link_url" varchar,
      "link_label" varchar NOT NULL
    );
    
    CREATE TABLE IF NOT EXISTS "navigation" (
      "id" serial PRIMARY KEY NOT NULL,
      "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
      "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
    );
    
    CREATE TABLE IF NOT EXISTS "navigation_rels" (
      "id" serial PRIMARY KEY NOT NULL,
      "order" integer,
      "parent_id" integer NOT NULL,
      "path" varchar NOT NULL,
      "posts_id" integer
    );
    
    CREATE TABLE IF NOT EXISTS "contact_info_email_contacts" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "email" varchar NOT NULL,
      "label" varchar NOT NULL
    );
    
    CREATE TABLE IF NOT EXISTS "contact_info_social_media_links" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "platform" varchar NOT NULL,
      "url" varchar NOT NULL
    );
    
    CREATE TABLE IF NOT EXISTS "contact_info" (
      "id" serial PRIMARY KEY NOT NULL,
      "phone" varchar,
      "address" varchar,
      "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
      "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
    );
  `)
  
  console.log('🔗 Adding foreign key constraints...')
  
  // Add foreign key constraints
  await payload.db.drizzle.execute(sql`
    -- Foreign key constraints
    DO $$ BEGIN
     ALTER TABLE "posts_populated_authors" ADD CONSTRAINT "posts_populated_authors_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
    EXCEPTION
     WHEN duplicate_object THEN null;
    END $$;
    
    DO $$ BEGIN
     ALTER TABLE "posts" ADD CONSTRAINT "posts_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
    EXCEPTION
     WHEN duplicate_object THEN null;
    END $$;
    
    DO $$ BEGIN
     ALTER TABLE "posts_rels" ADD CONSTRAINT "posts_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
    EXCEPTION
     WHEN duplicate_object THEN null;
    END $$;
    
    DO $$ BEGIN
     ALTER TABLE "posts_rels" ADD CONSTRAINT "posts_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
    EXCEPTION
     WHEN duplicate_object THEN null;
    END $$;
    
    DO $$ BEGIN
     ALTER TABLE "posts_rels" ADD CONSTRAINT "posts_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
    EXCEPTION
     WHEN duplicate_object THEN null;
    END $$;
    
    DO $$ BEGIN
     ALTER TABLE "posts_rels" ADD CONSTRAINT "posts_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
    EXCEPTION
     WHEN duplicate_object THEN null;
    END $$;
    
    DO $$ BEGIN
     ALTER TABLE "header" ADD CONSTRAINT "header_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
    EXCEPTION
     WHEN duplicate_object THEN null;
    END $$;
    
    DO $$ BEGIN
     ALTER TABLE "footer_nav_items" ADD CONSTRAINT "footer_nav_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer"("id") ON DELETE cascade ON UPDATE no action;
    EXCEPTION
     WHEN duplicate_object THEN null;
    END $$;
    
    DO $$ BEGIN
     ALTER TABLE "footer_rels" ADD CONSTRAINT "footer_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."footer"("id") ON DELETE cascade ON UPDATE no action;
    EXCEPTION
     WHEN duplicate_object THEN null;
    END $$;
    
    DO $$ BEGIN
     ALTER TABLE "navigation_menu_items" ADD CONSTRAINT "navigation_menu_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."navigation"("id") ON DELETE cascade ON UPDATE no action;
    EXCEPTION
     WHEN duplicate_object THEN null;
    END $$;
    
    DO $$ BEGIN
     ALTER TABLE "navigation_rels" ADD CONSTRAINT "navigation_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."navigation"("id") ON DELETE cascade ON UPDATE no action;
    EXCEPTION
     WHEN duplicate_object THEN null;
    END $$;
    
    DO $$ BEGIN
     ALTER TABLE "contact_info_email_contacts" ADD CONSTRAINT "contact_info_email_contacts_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contact_info"("id") ON DELETE cascade ON UPDATE no action;
    EXCEPTION
     WHEN duplicate_object THEN null;
    END $$;
    
    DO $$ BEGIN
     ALTER TABLE "contact_info_social_media_links" ADD CONSTRAINT "contact_info_social_media_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contact_info"("id") ON DELETE cascade ON UPDATE no action;
    EXCEPTION
     WHEN duplicate_object THEN null;
    END $$;
  `)
  
  console.log('📊 Creating indexes for performance...')
  
  // Create indexes
  await payload.db.drizzle.execute(sql`
    -- Performance indexes
    CREATE INDEX IF NOT EXISTS "posts_slug_idx" ON "posts" USING btree ("slug");
    CREATE INDEX IF NOT EXISTS "posts_updated_at_idx" ON "posts" USING btree ("updated_at");
    CREATE INDEX IF NOT EXISTS "posts_created_at_idx" ON "posts" USING btree ("created_at");
    CREATE INDEX IF NOT EXISTS "posts__status_idx" ON "posts" USING btree ("_status");
    CREATE INDEX IF NOT EXISTS "media_updated_at_idx" ON "media" USING btree ("updated_at");
    CREATE INDEX IF NOT EXISTS "media_created_at_idx" ON "media" USING btree ("created_at");
    CREATE UNIQUE INDEX IF NOT EXISTS "media_filename_idx" ON "media" USING btree ("filename");
    CREATE INDEX IF NOT EXISTS "categories_updated_at_idx" ON "categories" USING btree ("updated_at");
    CREATE INDEX IF NOT EXISTS "categories_created_at_idx" ON "categories" USING btree ("created_at");
    CREATE INDEX IF NOT EXISTS "users_updated_at_idx" ON "users" USING btree ("updated_at");
    CREATE INDEX IF NOT EXISTS "users_created_at_idx" ON "users" USING btree ("created_at");
    CREATE UNIQUE INDEX IF NOT EXISTS "users_email_idx" ON "users" USING btree ("email");
  `)
  
  console.log('✅ Fresh migration completed successfully!')
  console.log('🎉 Database schema is now clean and up-to-date')
}

export async function down({ payload, req }: MigrateDownArgs): Promise<void> {
  console.log('⚠️  Rolling back fresh migration - this will drop all tables!')
  
  await payload.db.drizzle.execute(sql`
    -- Drop all tables in reverse dependency order
    DROP TABLE IF EXISTS "contact_info_social_media_links" CASCADE;
    DROP TABLE IF EXISTS "contact_info_email_contacts" CASCADE;
    DROP TABLE IF EXISTS "contact_info" CASCADE;
    DROP TABLE IF EXISTS "navigation_rels" CASCADE;
    DROP TABLE IF EXISTS "navigation_menu_items" CASCADE;
    DROP TABLE IF EXISTS "navigation" CASCADE;
    DROP TABLE IF EXISTS "footer_rels" CASCADE;
    DROP TABLE IF EXISTS "footer_nav_items" CASCADE;
    DROP TABLE IF EXISTS "footer" CASCADE;
    DROP TABLE IF EXISTS "header" CASCADE;
    DROP TABLE IF EXISTS "payload_migrations" CASCADE;
    DROP TABLE IF EXISTS "payload_preferences_rels" CASCADE;
    DROP TABLE IF EXISTS "payload_preferences" CASCADE;
    DROP TABLE IF EXISTS "payload_locked_documents_rels" CASCADE;
    DROP TABLE IF EXISTS "payload_locked_documents" CASCADE;
    DROP TABLE IF EXISTS "search_rels" CASCADE;
    DROP TABLE IF EXISTS "search_categories" CASCADE;
    DROP TABLE IF EXISTS "search" CASCADE;
    DROP TABLE IF EXISTS "form_submissions_submission_data" CASCADE;
    DROP TABLE IF EXISTS "form_submissions" CASCADE;
    DROP TABLE IF EXISTS "forms_emails" CASCADE;
    DROP TABLE IF EXISTS "forms_blocks_textarea" CASCADE;
    DROP TABLE IF EXISTS "forms_blocks_text" CASCADE;
    DROP TABLE IF EXISTS "forms_blocks_state" CASCADE;
    DROP TABLE IF EXISTS "forms_blocks_select_options" CASCADE;
    DROP TABLE IF EXISTS "forms_blocks_select" CASCADE;
    DROP TABLE IF EXISTS "forms_blocks_number" CASCADE;
    DROP TABLE IF EXISTS "forms_blocks_message" CASCADE;
    DROP TABLE IF EXISTS "forms_blocks_email" CASCADE;
    DROP TABLE IF EXISTS "forms_blocks_country" CASCADE;
    DROP TABLE IF EXISTS "forms_blocks_checkbox" CASCADE;
    DROP TABLE IF EXISTS "forms" CASCADE;
    DROP TABLE IF EXISTS "redirects_rels" CASCADE;
    DROP TABLE IF EXISTS "redirects" CASCADE;
    DROP TABLE IF EXISTS "users" CASCADE;
    DROP TABLE IF EXISTS "categories_breadcrumbs" CASCADE;
    DROP TABLE IF EXISTS "categories" CASCADE;
    DROP TABLE IF EXISTS "media" CASCADE;
    DROP TABLE IF EXISTS "_posts_v_rels" CASCADE;
    DROP TABLE IF EXISTS "_posts_v_version_populated_authors" CASCADE;
    DROP TABLE IF EXISTS "_posts_v" CASCADE;
    DROP TABLE IF EXISTS "posts_rels" CASCADE;
    DROP TABLE IF EXISTS "posts_populated_authors" CASCADE;
    DROP TABLE IF EXISTS "posts" CASCADE;
    
    -- Drop all enums
    DROP TYPE IF EXISTS "public"."enum_header_languages" CASCADE;
    DROP TYPE IF EXISTS "public"."enum_navigation_menu_items_link_type" CASCADE;
    DROP TYPE IF EXISTS "public"."enum_footer_nav_items_link_type" CASCADE;
    DROP TYPE IF EXISTS "public"."enum_header_nav_items_link_type" CASCADE;
    DROP TYPE IF EXISTS "public"."enum_forms_confirmation_type" CASCADE;
    DROP TYPE IF EXISTS "public"."enum_redirects_to_type" CASCADE;
    DROP TYPE IF EXISTS "public"."enum_users_role" CASCADE;
    DROP TYPE IF EXISTS "public"."enum__posts_v_version_status" CASCADE;
    DROP TYPE IF EXISTS "public"."enum_posts_status" CASCADE;
  `)
  
  console.log('✅ Fresh migration rollback completed')
}