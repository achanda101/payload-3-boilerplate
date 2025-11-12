import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_hero_buttons_link_type" AS ENUM('reference', 'custom', 'email', 'document');
  CREATE TYPE "public"."enum_pages_blocks_secondarycta_cta_button_link_type" AS ENUM('reference', 'custom', 'email', 'document');
  CREATE TYPE "public"."enum_pages_blocks_secondarycta_ui_type" AS ENUM('lrg_txt_cta', 'md_txt_cta', 'min_cta', 'puffy_beige_cta');
  CREATE TYPE "public"."enum_pages_blocks_mcol_info_block_multicols_link_type" AS ENUM('reference', 'custom', 'email', 'document');
  CREATE TYPE "public"."enum_pages_blocks_mstep_process_steps_icon" AS ENUM('FileText', 'Clock', 'ShieldCheck', 'Vote', 'ScrollText', 'Banknote', 'Rocket', 'FileCheck');
  CREATE TYPE "public"."enum_pages_blocks_comparison_blk_buttons_link_type" AS ENUM('reference', 'custom', 'email', 'document');
  CREATE TYPE "public"."enum_pages_blocks_ylw_deck_cards_links_link_type" AS ENUM('reference', 'custom', 'email', 'document');
  CREATE TYPE "public"."enum_pages_blocks_ylw_deck_cards_mascot_pos" AS ENUM('top_left', 'center');
  CREATE TYPE "public"."enum_pages_blocks_ylw_deck_align" AS ENUM('left', 'center');
  CREATE TYPE "public"."enum_pages_blocks_feat_crd_link_type" AS ENUM('reference', 'custom', 'email', 'document');
  CREATE TYPE "public"."enum_pages_blocks_feat_crd_acc_feat_crds_crd_colour" AS ENUM('forest', 'turmeric', 'sky', 'rose', 'lavender', 'fire');
  CREATE TYPE "public"."enum_pages_blocks_list_crd_dck_cards_link_type" AS ENUM('reference', 'custom', 'email', 'document');
  CREATE TYPE "public"."enum_pages_blocks_list_crd_dck_buttons_link_type" AS ENUM('reference', 'custom', 'email', 'document');
  CREATE TYPE "public"."enum_pages_blocks_faq_blk_link_type" AS ENUM('reference', 'custom', 'email', 'document');
  CREATE TYPE "public"."enum_pages_bg_type" AS ENUM('wavy_top', 'wavy_full', 'center_blob');
  CREATE TYPE "public"."enum_pages_hero_colour" AS ENUM('forest', 'turmeric', 'sky', 'rose', 'lavender', 'fire', 'trans');
  CREATE TYPE "public"."enum_pages_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__pages_v_version_hero_buttons_link_type" AS ENUM('reference', 'custom', 'email', 'document');
  CREATE TYPE "public"."enum__pages_v_blocks_secondarycta_cta_button_link_type" AS ENUM('reference', 'custom', 'email', 'document');
  CREATE TYPE "public"."enum__pages_v_blocks_secondarycta_ui_type" AS ENUM('lrg_txt_cta', 'md_txt_cta', 'min_cta', 'puffy_beige_cta');
  CREATE TYPE "public"."enum__pages_v_blocks_mcol_info_block_multicols_link_type" AS ENUM('reference', 'custom', 'email', 'document');
  CREATE TYPE "public"."enum__pages_v_blocks_mstep_process_steps_icon" AS ENUM('FileText', 'Clock', 'ShieldCheck', 'Vote', 'ScrollText', 'Banknote', 'Rocket', 'FileCheck');
  CREATE TYPE "public"."enum__pages_v_blocks_comparison_blk_buttons_link_type" AS ENUM('reference', 'custom', 'email', 'document');
  CREATE TYPE "public"."enum__pages_v_blocks_ylw_deck_cards_links_link_type" AS ENUM('reference', 'custom', 'email', 'document');
  CREATE TYPE "public"."enum__pages_v_blocks_ylw_deck_cards_mascot_pos" AS ENUM('top_left', 'center');
  CREATE TYPE "public"."enum__pages_v_blocks_ylw_deck_align" AS ENUM('left', 'center');
  CREATE TYPE "public"."enum__pages_v_blocks_feat_crd_link_type" AS ENUM('reference', 'custom', 'email', 'document');
  CREATE TYPE "public"."enum__pages_v_blocks_feat_crd_acc_feat_crds_crd_colour" AS ENUM('forest', 'turmeric', 'sky', 'rose', 'lavender', 'fire');
  CREATE TYPE "public"."enum__pages_v_blocks_list_crd_dck_cards_link_type" AS ENUM('reference', 'custom', 'email', 'document');
  CREATE TYPE "public"."enum__pages_v_blocks_list_crd_dck_buttons_link_type" AS ENUM('reference', 'custom', 'email', 'document');
  CREATE TYPE "public"."enum__pages_v_blocks_faq_blk_link_type" AS ENUM('reference', 'custom', 'email', 'document');
  CREATE TYPE "public"."enum__pages_v_version_bg_type" AS ENUM('wavy_top', 'wavy_full', 'center_blob');
  CREATE TYPE "public"."enum__pages_v_version_hero_colour" AS ENUM('forest', 'turmeric', 'sky', 'rose', 'lavender', 'fire', 'trans');
  CREATE TYPE "public"."enum__pages_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__pages_v_published_locale" AS ENUM('en', 'ar', 'bi', 'bn-IN', 'br', 'ch', 'prs-Arab', 'km', 'hi', 'ms', 'ne', 'ps-Arab', 'pcm', 'si', 'tl', 'ta', 'th', 'vi', 'ur');
  CREATE TABLE "pages_hero_buttons" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_pages_hero_buttons_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_download_link" boolean,
  	"link_arrow_link" boolean,
  	"link_pill_solid" boolean,
  	"link_pill_outline" boolean,
  	"link_url" varchar,
  	"link_email" varchar
  );
  
  CREATE TABLE "pages_hero_buttons_locales" (
  	"link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_secondarycta_cta_button" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_pages_blocks_secondarycta_cta_button_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_download_link" boolean,
  	"link_arrow_link" boolean,
  	"link_pill_solid" boolean,
  	"link_pill_outline" boolean,
  	"link_url" varchar,
  	"link_email" varchar
  );
  
  CREATE TABLE "pages_blocks_secondarycta_cta_button_locales" (
  	"link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_secondarycta" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"contact_email" varchar,
  	"ui_type" "enum_pages_blocks_secondarycta_ui_type" DEFAULT 'lrg_txt_cta',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_secondarycta_locales" (
  	"cta_title" varchar,
  	"cta_subtitle" varchar,
  	"contact_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_mcol_info_block_multicols" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"add_link" boolean,
  	"link_type" "enum_pages_blocks_mcol_info_block_multicols_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_download_link" boolean,
  	"link_arrow_link" boolean,
  	"link_pill_solid" boolean,
  	"link_pill_outline" boolean,
  	"link_url" varchar,
  	"link_email" varchar
  );
  
  CREATE TABLE "pages_blocks_mcol_info_block_multicols_locales" (
  	"title" varchar,
  	"col_content" varchar,
  	"link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_mcol_info_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_grant_card_grid_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_grant_card_grid_block_locales" (
  	"title" varchar,
  	"desc" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_mstep_process_steps_details" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "pages_blocks_mstep_process_steps_details_locales" (
  	"bullet" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_mstep_process_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" "enum_pages_blocks_mstep_process_steps_icon" DEFAULT 'FileText'
  );
  
  CREATE TABLE "pages_blocks_mstep_process_steps_locales" (
  	"step_title" varchar,
  	"title" varchar,
  	"tip" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_mstep_process" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_mstep_process_locales" (
  	"title" varchar,
  	"subtitle" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_comparison_blk_lft_grp_lft_points" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "pages_blocks_comparison_blk_lft_grp_lft_points_locales" (
  	"point" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_comparison_blk_rt_grp_rt_points" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "pages_blocks_comparison_blk_rt_grp_rt_points_locales" (
  	"point" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_comparison_blk_buttons" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_pages_blocks_comparison_blk_buttons_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_download_link" boolean,
  	"link_arrow_link" boolean,
  	"link_pill_solid" boolean,
  	"link_pill_outline" boolean,
  	"link_url" varchar,
  	"link_email" varchar
  );
  
  CREATE TABLE "pages_blocks_comparison_blk_buttons_locales" (
  	"link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_comparison_blk" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_comparison_blk_locales" (
  	"title" varchar,
  	"desc" varchar,
  	"lft_grp_title" varchar,
  	"lft_grp_desc" varchar,
  	"rt_grp_title" varchar,
  	"rt_grp_desc" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_ylw_deck_cards_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_pages_blocks_ylw_deck_cards_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_download_link" boolean,
  	"link_arrow_link" boolean,
  	"link_pill_solid" boolean,
  	"link_pill_outline" boolean,
  	"link_url" varchar,
  	"link_email" varchar
  );
  
  CREATE TABLE "pages_blocks_ylw_deck_cards_links_locales" (
  	"desc" varchar,
  	"link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_ylw_deck_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"mascot_id" integer,
  	"mascot_pos" "enum_pages_blocks_ylw_deck_cards_mascot_pos" DEFAULT 'center'
  );
  
  CREATE TABLE "pages_blocks_ylw_deck_cards_locales" (
  	"title" varchar,
  	"subtitle" varchar,
  	"desc" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_ylw_deck" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"align" "enum_pages_blocks_ylw_deck_align" DEFAULT 'center',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_ylw_deck_locales" (
  	"title" varchar,
  	"desc" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_feat_crd_tags" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "pages_blocks_feat_crd_tags_locales" (
  	"tag" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_feat_crd" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"link_type" "enum_pages_blocks_feat_crd_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_download_link" boolean,
  	"link_arrow_link" boolean,
  	"link_pill_solid" boolean,
  	"link_pill_outline" boolean,
  	"link_url" varchar,
  	"link_email" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_feat_crd_locales" (
  	"title" varchar,
  	"subtitle" varchar,
  	"desc" jsonb,
  	"link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_feat_crd_acc_feat_crds" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"mascot_id" integer,
  	"crd_colour" "enum_pages_blocks_feat_crd_acc_feat_crds_crd_colour" DEFAULT 'forest'
  );
  
  CREATE TABLE "pages_blocks_feat_crd_acc_feat_crds_locales" (
  	"acc_title" varchar,
  	"acc_content" jsonb,
  	"crd_tag" varchar,
  	"crd_content" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_feat_crd_acc" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_feat_crd_acc_locales" (
  	"title" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_list_crd_dck_cards_tags" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "pages_blocks_list_crd_dck_cards_tags_locales" (
  	"tag" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_list_crd_dck_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"link_type" "enum_pages_blocks_list_crd_dck_cards_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_download_link" boolean,
  	"link_arrow_link" boolean,
  	"link_pill_solid" boolean,
  	"link_pill_outline" boolean,
  	"link_url" varchar,
  	"link_email" varchar
  );
  
  CREATE TABLE "pages_blocks_list_crd_dck_cards_locales" (
  	"title" varchar,
  	"desc" varchar,
  	"link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_list_crd_dck_buttons" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_pages_blocks_list_crd_dck_buttons_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_download_link" boolean,
  	"link_arrow_link" boolean,
  	"link_pill_solid" boolean,
  	"link_pill_outline" boolean,
  	"link_url" varchar,
  	"link_email" varchar
  );
  
  CREATE TABLE "pages_blocks_list_crd_dck_buttons_locales" (
  	"link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_list_crd_dck" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_list_crd_dck_locales" (
  	"title" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_faq_blk_faqs" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "pages_blocks_faq_blk_faqs_locales" (
  	"question" varchar,
  	"answer" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_faq_blk" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_pages_blocks_faq_blk_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_download_link" boolean,
  	"link_arrow_link" boolean,
  	"link_pill_solid" boolean,
  	"link_pill_outline" boolean,
  	"link_url" varchar,
  	"link_email" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_faq_blk_locales" (
  	"title" varchar,
  	"desc" varchar,
  	"link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"bg_type" "enum_pages_bg_type",
  	"hero_colour" "enum_pages_hero_colour" DEFAULT 'forest',
  	"mascot_id" integer,
  	"email" varchar,
  	"published_at" timestamp(3) with time zone,
  	"slug" varchar,
  	"slug_lock" boolean DEFAULT true,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_pages_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "pages_locales" (
  	"hero_title" varchar,
  	"hero_subtitle" varchar,
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "pages_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"grants_id" integer,
  	"posts_id" integer,
  	"pages_id" integer,
  	"documents_id" integer,
  	"grantcards_id" integer
  );
  
  CREATE TABLE "_pages_v_version_hero_buttons" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"link_type" "enum__pages_v_version_hero_buttons_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_download_link" boolean,
  	"link_arrow_link" boolean,
  	"link_pill_solid" boolean,
  	"link_pill_outline" boolean,
  	"link_url" varchar,
  	"link_email" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_version_hero_buttons_locales" (
  	"link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_secondarycta_cta_button" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"link_type" "enum__pages_v_blocks_secondarycta_cta_button_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_download_link" boolean,
  	"link_arrow_link" boolean,
  	"link_pill_solid" boolean,
  	"link_pill_outline" boolean,
  	"link_url" varchar,
  	"link_email" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_secondarycta_cta_button_locales" (
  	"link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_secondarycta" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"contact_email" varchar,
  	"ui_type" "enum__pages_v_blocks_secondarycta_ui_type" DEFAULT 'lrg_txt_cta',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_secondarycta_locales" (
  	"cta_title" varchar,
  	"cta_subtitle" varchar,
  	"contact_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_mcol_info_block_multicols" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"add_link" boolean,
  	"link_type" "enum__pages_v_blocks_mcol_info_block_multicols_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_download_link" boolean,
  	"link_arrow_link" boolean,
  	"link_pill_solid" boolean,
  	"link_pill_outline" boolean,
  	"link_url" varchar,
  	"link_email" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_mcol_info_block_multicols_locales" (
  	"title" varchar,
  	"col_content" varchar,
  	"link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_mcol_info_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_grant_card_grid_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_grant_card_grid_block_locales" (
  	"title" varchar,
  	"desc" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_mstep_process_steps_details" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_mstep_process_steps_details_locales" (
  	"bullet" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_mstep_process_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon" "enum__pages_v_blocks_mstep_process_steps_icon" DEFAULT 'FileText',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_mstep_process_steps_locales" (
  	"step_title" varchar,
  	"title" varchar,
  	"tip" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_mstep_process" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_mstep_process_locales" (
  	"title" varchar,
  	"subtitle" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_comparison_blk_lft_grp_lft_points" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_comparison_blk_lft_grp_lft_points_locales" (
  	"point" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_comparison_blk_rt_grp_rt_points" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_comparison_blk_rt_grp_rt_points_locales" (
  	"point" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_comparison_blk_buttons" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"link_type" "enum__pages_v_blocks_comparison_blk_buttons_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_download_link" boolean,
  	"link_arrow_link" boolean,
  	"link_pill_solid" boolean,
  	"link_pill_outline" boolean,
  	"link_url" varchar,
  	"link_email" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_comparison_blk_buttons_locales" (
  	"link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_comparison_blk" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_comparison_blk_locales" (
  	"title" varchar,
  	"desc" varchar,
  	"lft_grp_title" varchar,
  	"lft_grp_desc" varchar,
  	"rt_grp_title" varchar,
  	"rt_grp_desc" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_ylw_deck_cards_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"link_type" "enum__pages_v_blocks_ylw_deck_cards_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_download_link" boolean,
  	"link_arrow_link" boolean,
  	"link_pill_solid" boolean,
  	"link_pill_outline" boolean,
  	"link_url" varchar,
  	"link_email" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_ylw_deck_cards_links_locales" (
  	"desc" varchar,
  	"link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_ylw_deck_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"mascot_id" integer,
  	"mascot_pos" "enum__pages_v_blocks_ylw_deck_cards_mascot_pos" DEFAULT 'center',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_ylw_deck_cards_locales" (
  	"title" varchar,
  	"subtitle" varchar,
  	"desc" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_ylw_deck" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"align" "enum__pages_v_blocks_ylw_deck_align" DEFAULT 'center',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_ylw_deck_locales" (
  	"title" varchar,
  	"desc" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_feat_crd_tags" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_feat_crd_tags_locales" (
  	"tag" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_feat_crd" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"link_type" "enum__pages_v_blocks_feat_crd_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_download_link" boolean,
  	"link_arrow_link" boolean,
  	"link_pill_solid" boolean,
  	"link_pill_outline" boolean,
  	"link_url" varchar,
  	"link_email" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_feat_crd_locales" (
  	"title" varchar,
  	"subtitle" varchar,
  	"desc" jsonb,
  	"link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_feat_crd_acc_feat_crds" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"mascot_id" integer,
  	"crd_colour" "enum__pages_v_blocks_feat_crd_acc_feat_crds_crd_colour" DEFAULT 'forest',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_feat_crd_acc_feat_crds_locales" (
  	"acc_title" varchar,
  	"acc_content" jsonb,
  	"crd_tag" varchar,
  	"crd_content" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_feat_crd_acc" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_feat_crd_acc_locales" (
  	"title" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_list_crd_dck_cards_tags" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_list_crd_dck_cards_tags_locales" (
  	"tag" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_list_crd_dck_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"link_type" "enum__pages_v_blocks_list_crd_dck_cards_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_download_link" boolean,
  	"link_arrow_link" boolean,
  	"link_pill_solid" boolean,
  	"link_pill_outline" boolean,
  	"link_url" varchar,
  	"link_email" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_list_crd_dck_cards_locales" (
  	"title" varchar,
  	"desc" varchar,
  	"link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_list_crd_dck_buttons" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"link_type" "enum__pages_v_blocks_list_crd_dck_buttons_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_download_link" boolean,
  	"link_arrow_link" boolean,
  	"link_pill_solid" boolean,
  	"link_pill_outline" boolean,
  	"link_url" varchar,
  	"link_email" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_list_crd_dck_buttons_locales" (
  	"link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_list_crd_dck" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_list_crd_dck_locales" (
  	"title" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_faq_blk_faqs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_faq_blk_faqs_locales" (
  	"question" varchar,
  	"answer" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_faq_blk" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"link_type" "enum__pages_v_blocks_faq_blk_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_download_link" boolean,
  	"link_arrow_link" boolean,
  	"link_pill_solid" boolean,
  	"link_pill_outline" boolean,
  	"link_url" varchar,
  	"link_email" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_faq_blk_locales" (
  	"title" varchar,
  	"desc" varchar,
  	"link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_title" varchar,
  	"version_bg_type" "enum__pages_v_version_bg_type",
  	"version_hero_colour" "enum__pages_v_version_hero_colour" DEFAULT 'forest',
  	"version_mascot_id" integer,
  	"version_email" varchar,
  	"version_published_at" timestamp(3) with time zone,
  	"version_slug" varchar,
  	"version_slug_lock" boolean DEFAULT true,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__pages_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "enum__pages_v_published_locale",
  	"latest" boolean
  );
  
  CREATE TABLE "_pages_v_locales" (
  	"version_hero_title" varchar,
  	"version_hero_subtitle" varchar,
  	"version_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"grants_id" integer,
  	"posts_id" integer,
  	"pages_id" integer,
  	"documents_id" integer,
  	"grantcards_id" integer
  );
  
  ALTER TABLE "grants_rels" ADD COLUMN "pages_id" integer;
  ALTER TABLE "_grants_v_rels" ADD COLUMN "pages_id" integer;
  ALTER TABLE "grantcards_rels" ADD COLUMN "pages_id" integer;
  ALTER TABLE "_grantcards_v_rels" ADD COLUMN "pages_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "pages_id" integer;
  ALTER TABLE "homepage_rels" ADD COLUMN "pages_id" integer;
  ALTER TABLE "_homepage_v_rels" ADD COLUMN "pages_id" integer;
  ALTER TABLE "nav_rels" ADD COLUMN "pages_id" integer;
  ALTER TABLE "pages_hero_buttons" ADD CONSTRAINT "pages_hero_buttons_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_hero_buttons_locales" ADD CONSTRAINT "pages_hero_buttons_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_hero_buttons"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_secondarycta_cta_button" ADD CONSTRAINT "pages_blocks_secondarycta_cta_button_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_secondarycta"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_secondarycta_cta_button_locales" ADD CONSTRAINT "pages_blocks_secondarycta_cta_button_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_secondarycta_cta_button"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_secondarycta" ADD CONSTRAINT "pages_blocks_secondarycta_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_secondarycta_locales" ADD CONSTRAINT "pages_blocks_secondarycta_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_secondarycta"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_mcol_info_block_multicols" ADD CONSTRAINT "pages_blocks_mcol_info_block_multicols_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_mcol_info_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_mcol_info_block_multicols_locales" ADD CONSTRAINT "pages_blocks_mcol_info_block_multicols_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_mcol_info_block_multicols"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_mcol_info_block" ADD CONSTRAINT "pages_blocks_mcol_info_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_grant_card_grid_block" ADD CONSTRAINT "pages_blocks_grant_card_grid_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_grant_card_grid_block_locales" ADD CONSTRAINT "pages_blocks_grant_card_grid_block_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_grant_card_grid_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_mstep_process_steps_details" ADD CONSTRAINT "pages_blocks_mstep_process_steps_details_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_mstep_process_steps"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_mstep_process_steps_details_locales" ADD CONSTRAINT "pages_blocks_mstep_process_steps_details_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_mstep_process_steps_details"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_mstep_process_steps" ADD CONSTRAINT "pages_blocks_mstep_process_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_mstep_process"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_mstep_process_steps_locales" ADD CONSTRAINT "pages_blocks_mstep_process_steps_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_mstep_process_steps"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_mstep_process" ADD CONSTRAINT "pages_blocks_mstep_process_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_mstep_process_locales" ADD CONSTRAINT "pages_blocks_mstep_process_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_mstep_process"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_comparison_blk_lft_grp_lft_points" ADD CONSTRAINT "pages_blocks_comparison_blk_lft_grp_lft_points_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_comparison_blk"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_comparison_blk_lft_grp_lft_points_locales" ADD CONSTRAINT "pages_blocks_comparison_blk_lft_grp_lft_points_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_comparison_blk_lft_grp_lft_points"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_comparison_blk_rt_grp_rt_points" ADD CONSTRAINT "pages_blocks_comparison_blk_rt_grp_rt_points_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_comparison_blk"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_comparison_blk_rt_grp_rt_points_locales" ADD CONSTRAINT "pages_blocks_comparison_blk_rt_grp_rt_points_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_comparison_blk_rt_grp_rt_points"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_comparison_blk_buttons" ADD CONSTRAINT "pages_blocks_comparison_blk_buttons_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_comparison_blk"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_comparison_blk_buttons_locales" ADD CONSTRAINT "pages_blocks_comparison_blk_buttons_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_comparison_blk_buttons"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_comparison_blk" ADD CONSTRAINT "pages_blocks_comparison_blk_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_comparison_blk_locales" ADD CONSTRAINT "pages_blocks_comparison_blk_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_comparison_blk"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_ylw_deck_cards_links" ADD CONSTRAINT "pages_blocks_ylw_deck_cards_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_ylw_deck_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_ylw_deck_cards_links_locales" ADD CONSTRAINT "pages_blocks_ylw_deck_cards_links_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_ylw_deck_cards_links"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_ylw_deck_cards" ADD CONSTRAINT "pages_blocks_ylw_deck_cards_mascot_id_asset_cloud_id_fk" FOREIGN KEY ("mascot_id") REFERENCES "public"."asset_cloud"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_ylw_deck_cards" ADD CONSTRAINT "pages_blocks_ylw_deck_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_ylw_deck"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_ylw_deck_cards_locales" ADD CONSTRAINT "pages_blocks_ylw_deck_cards_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_ylw_deck_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_ylw_deck" ADD CONSTRAINT "pages_blocks_ylw_deck_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_ylw_deck_locales" ADD CONSTRAINT "pages_blocks_ylw_deck_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_ylw_deck"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_feat_crd_tags" ADD CONSTRAINT "pages_blocks_feat_crd_tags_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_feat_crd"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_feat_crd_tags_locales" ADD CONSTRAINT "pages_blocks_feat_crd_tags_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_feat_crd_tags"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_feat_crd" ADD CONSTRAINT "pages_blocks_feat_crd_image_id_media_cloud_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media_cloud"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_feat_crd" ADD CONSTRAINT "pages_blocks_feat_crd_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_feat_crd_locales" ADD CONSTRAINT "pages_blocks_feat_crd_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_feat_crd"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_feat_crd_acc_feat_crds" ADD CONSTRAINT "pages_blocks_feat_crd_acc_feat_crds_mascot_id_asset_cloud_id_fk" FOREIGN KEY ("mascot_id") REFERENCES "public"."asset_cloud"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_feat_crd_acc_feat_crds" ADD CONSTRAINT "pages_blocks_feat_crd_acc_feat_crds_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_feat_crd_acc"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_feat_crd_acc_feat_crds_locales" ADD CONSTRAINT "pages_blocks_feat_crd_acc_feat_crds_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_feat_crd_acc_feat_crds"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_feat_crd_acc" ADD CONSTRAINT "pages_blocks_feat_crd_acc_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_feat_crd_acc_locales" ADD CONSTRAINT "pages_blocks_feat_crd_acc_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_feat_crd_acc"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_list_crd_dck_cards_tags" ADD CONSTRAINT "pages_blocks_list_crd_dck_cards_tags_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_list_crd_dck_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_list_crd_dck_cards_tags_locales" ADD CONSTRAINT "pages_blocks_list_crd_dck_cards_tags_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_list_crd_dck_cards_tags"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_list_crd_dck_cards" ADD CONSTRAINT "pages_blocks_list_crd_dck_cards_image_id_media_cloud_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media_cloud"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_list_crd_dck_cards" ADD CONSTRAINT "pages_blocks_list_crd_dck_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_list_crd_dck"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_list_crd_dck_cards_locales" ADD CONSTRAINT "pages_blocks_list_crd_dck_cards_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_list_crd_dck_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_list_crd_dck_buttons" ADD CONSTRAINT "pages_blocks_list_crd_dck_buttons_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_list_crd_dck"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_list_crd_dck_buttons_locales" ADD CONSTRAINT "pages_blocks_list_crd_dck_buttons_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_list_crd_dck_buttons"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_list_crd_dck" ADD CONSTRAINT "pages_blocks_list_crd_dck_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_list_crd_dck_locales" ADD CONSTRAINT "pages_blocks_list_crd_dck_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_list_crd_dck"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_faq_blk_faqs" ADD CONSTRAINT "pages_blocks_faq_blk_faqs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_faq_blk"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_faq_blk_faqs_locales" ADD CONSTRAINT "pages_blocks_faq_blk_faqs_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_faq_blk_faqs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_faq_blk" ADD CONSTRAINT "pages_blocks_faq_blk_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_faq_blk_locales" ADD CONSTRAINT "pages_blocks_faq_blk_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_faq_blk"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages" ADD CONSTRAINT "pages_mascot_id_asset_cloud_id_fk" FOREIGN KEY ("mascot_id") REFERENCES "public"."asset_cloud"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_locales" ADD CONSTRAINT "pages_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_grants_fk" FOREIGN KEY ("grants_id") REFERENCES "public"."grants"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_documents_fk" FOREIGN KEY ("documents_id") REFERENCES "public"."documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_grantcards_fk" FOREIGN KEY ("grantcards_id") REFERENCES "public"."grantcards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_version_hero_buttons" ADD CONSTRAINT "_pages_v_version_hero_buttons_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_version_hero_buttons_locales" ADD CONSTRAINT "_pages_v_version_hero_buttons_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_version_hero_buttons"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_secondarycta_cta_button" ADD CONSTRAINT "_pages_v_blocks_secondarycta_cta_button_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_secondarycta"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_secondarycta_cta_button_locales" ADD CONSTRAINT "_pages_v_blocks_secondarycta_cta_button_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_secondarycta_cta_button"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_secondarycta" ADD CONSTRAINT "_pages_v_blocks_secondarycta_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_secondarycta_locales" ADD CONSTRAINT "_pages_v_blocks_secondarycta_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_secondarycta"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_mcol_info_block_multicols" ADD CONSTRAINT "_pages_v_blocks_mcol_info_block_multicols_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_mcol_info_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_mcol_info_block_multicols_locales" ADD CONSTRAINT "_pages_v_blocks_mcol_info_block_multicols_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_mcol_info_block_multicols"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_mcol_info_block" ADD CONSTRAINT "_pages_v_blocks_mcol_info_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_grant_card_grid_block" ADD CONSTRAINT "_pages_v_blocks_grant_card_grid_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_grant_card_grid_block_locales" ADD CONSTRAINT "_pages_v_blocks_grant_card_grid_block_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_grant_card_grid_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_mstep_process_steps_details" ADD CONSTRAINT "_pages_v_blocks_mstep_process_steps_details_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_mstep_process_steps"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_mstep_process_steps_details_locales" ADD CONSTRAINT "_pages_v_blocks_mstep_process_steps_details_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_mstep_process_steps_details"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_mstep_process_steps" ADD CONSTRAINT "_pages_v_blocks_mstep_process_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_mstep_process"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_mstep_process_steps_locales" ADD CONSTRAINT "_pages_v_blocks_mstep_process_steps_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_mstep_process_steps"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_mstep_process" ADD CONSTRAINT "_pages_v_blocks_mstep_process_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_mstep_process_locales" ADD CONSTRAINT "_pages_v_blocks_mstep_process_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_mstep_process"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_comparison_blk_lft_grp_lft_points" ADD CONSTRAINT "_pages_v_blocks_comparison_blk_lft_grp_lft_points_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_comparison_blk"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_comparison_blk_lft_grp_lft_points_locales" ADD CONSTRAINT "_pages_v_blocks_comparison_blk_lft_grp_lft_points_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_comparison_blk_lft_grp_lft_points"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_comparison_blk_rt_grp_rt_points" ADD CONSTRAINT "_pages_v_blocks_comparison_blk_rt_grp_rt_points_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_comparison_blk"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_comparison_blk_rt_grp_rt_points_locales" ADD CONSTRAINT "_pages_v_blocks_comparison_blk_rt_grp_rt_points_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_comparison_blk_rt_grp_rt_points"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_comparison_blk_buttons" ADD CONSTRAINT "_pages_v_blocks_comparison_blk_buttons_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_comparison_blk"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_comparison_blk_buttons_locales" ADD CONSTRAINT "_pages_v_blocks_comparison_blk_buttons_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_comparison_blk_buttons"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_comparison_blk" ADD CONSTRAINT "_pages_v_blocks_comparison_blk_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_comparison_blk_locales" ADD CONSTRAINT "_pages_v_blocks_comparison_blk_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_comparison_blk"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_ylw_deck_cards_links" ADD CONSTRAINT "_pages_v_blocks_ylw_deck_cards_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_ylw_deck_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_ylw_deck_cards_links_locales" ADD CONSTRAINT "_pages_v_blocks_ylw_deck_cards_links_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_ylw_deck_cards_links"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_ylw_deck_cards" ADD CONSTRAINT "_pages_v_blocks_ylw_deck_cards_mascot_id_asset_cloud_id_fk" FOREIGN KEY ("mascot_id") REFERENCES "public"."asset_cloud"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_ylw_deck_cards" ADD CONSTRAINT "_pages_v_blocks_ylw_deck_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_ylw_deck"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_ylw_deck_cards_locales" ADD CONSTRAINT "_pages_v_blocks_ylw_deck_cards_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_ylw_deck_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_ylw_deck" ADD CONSTRAINT "_pages_v_blocks_ylw_deck_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_ylw_deck_locales" ADD CONSTRAINT "_pages_v_blocks_ylw_deck_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_ylw_deck"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_feat_crd_tags" ADD CONSTRAINT "_pages_v_blocks_feat_crd_tags_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_feat_crd"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_feat_crd_tags_locales" ADD CONSTRAINT "_pages_v_blocks_feat_crd_tags_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_feat_crd_tags"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_feat_crd" ADD CONSTRAINT "_pages_v_blocks_feat_crd_image_id_media_cloud_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media_cloud"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_feat_crd" ADD CONSTRAINT "_pages_v_blocks_feat_crd_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_feat_crd_locales" ADD CONSTRAINT "_pages_v_blocks_feat_crd_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_feat_crd"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_feat_crd_acc_feat_crds" ADD CONSTRAINT "_pages_v_blocks_feat_crd_acc_feat_crds_mascot_id_asset_cloud_id_fk" FOREIGN KEY ("mascot_id") REFERENCES "public"."asset_cloud"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_feat_crd_acc_feat_crds" ADD CONSTRAINT "_pages_v_blocks_feat_crd_acc_feat_crds_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_feat_crd_acc"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_feat_crd_acc_feat_crds_locales" ADD CONSTRAINT "_pages_v_blocks_feat_crd_acc_feat_crds_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_feat_crd_acc_feat_crds"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_feat_crd_acc" ADD CONSTRAINT "_pages_v_blocks_feat_crd_acc_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_feat_crd_acc_locales" ADD CONSTRAINT "_pages_v_blocks_feat_crd_acc_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_feat_crd_acc"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_list_crd_dck_cards_tags" ADD CONSTRAINT "_pages_v_blocks_list_crd_dck_cards_tags_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_list_crd_dck_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_list_crd_dck_cards_tags_locales" ADD CONSTRAINT "_pages_v_blocks_list_crd_dck_cards_tags_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_list_crd_dck_cards_tags"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_list_crd_dck_cards" ADD CONSTRAINT "_pages_v_blocks_list_crd_dck_cards_image_id_media_cloud_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media_cloud"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_list_crd_dck_cards" ADD CONSTRAINT "_pages_v_blocks_list_crd_dck_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_list_crd_dck"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_list_crd_dck_cards_locales" ADD CONSTRAINT "_pages_v_blocks_list_crd_dck_cards_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_list_crd_dck_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_list_crd_dck_buttons" ADD CONSTRAINT "_pages_v_blocks_list_crd_dck_buttons_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_list_crd_dck"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_list_crd_dck_buttons_locales" ADD CONSTRAINT "_pages_v_blocks_list_crd_dck_buttons_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_list_crd_dck_buttons"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_list_crd_dck" ADD CONSTRAINT "_pages_v_blocks_list_crd_dck_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_list_crd_dck_locales" ADD CONSTRAINT "_pages_v_blocks_list_crd_dck_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_list_crd_dck"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_faq_blk_faqs" ADD CONSTRAINT "_pages_v_blocks_faq_blk_faqs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_faq_blk"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_faq_blk_faqs_locales" ADD CONSTRAINT "_pages_v_blocks_faq_blk_faqs_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_faq_blk_faqs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_faq_blk" ADD CONSTRAINT "_pages_v_blocks_faq_blk_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_faq_blk_locales" ADD CONSTRAINT "_pages_v_blocks_faq_blk_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_faq_blk"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v" ADD CONSTRAINT "_pages_v_parent_id_pages_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v" ADD CONSTRAINT "_pages_v_version_mascot_id_asset_cloud_id_fk" FOREIGN KEY ("version_mascot_id") REFERENCES "public"."asset_cloud"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_locales" ADD CONSTRAINT "_pages_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_grants_fk" FOREIGN KEY ("grants_id") REFERENCES "public"."grants"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_documents_fk" FOREIGN KEY ("documents_id") REFERENCES "public"."documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_grantcards_fk" FOREIGN KEY ("grantcards_id") REFERENCES "public"."grantcards"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_hero_buttons_order_idx" ON "pages_hero_buttons" USING btree ("_order");
  CREATE INDEX "pages_hero_buttons_parent_id_idx" ON "pages_hero_buttons" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pages_hero_buttons_locales_locale_parent_id_unique" ON "pages_hero_buttons_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_secondarycta_cta_button_order_idx" ON "pages_blocks_secondarycta_cta_button" USING btree ("_order");
  CREATE INDEX "pages_blocks_secondarycta_cta_button_parent_id_idx" ON "pages_blocks_secondarycta_cta_button" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_secondarycta_cta_button_locales_locale_parent_id_unique" ON "pages_blocks_secondarycta_cta_button_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_secondarycta_order_idx" ON "pages_blocks_secondarycta" USING btree ("_order");
  CREATE INDEX "pages_blocks_secondarycta_parent_id_idx" ON "pages_blocks_secondarycta" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_secondarycta_path_idx" ON "pages_blocks_secondarycta" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_blocks_secondarycta_locales_locale_parent_id_unique" ON "pages_blocks_secondarycta_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_mcol_info_block_multicols_order_idx" ON "pages_blocks_mcol_info_block_multicols" USING btree ("_order");
  CREATE INDEX "pages_blocks_mcol_info_block_multicols_parent_id_idx" ON "pages_blocks_mcol_info_block_multicols" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_mcol_info_block_multicols_locales_locale_parent_id_unique" ON "pages_blocks_mcol_info_block_multicols_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_mcol_info_block_order_idx" ON "pages_blocks_mcol_info_block" USING btree ("_order");
  CREATE INDEX "pages_blocks_mcol_info_block_parent_id_idx" ON "pages_blocks_mcol_info_block" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_mcol_info_block_path_idx" ON "pages_blocks_mcol_info_block" USING btree ("_path");
  CREATE INDEX "pages_blocks_grant_card_grid_block_order_idx" ON "pages_blocks_grant_card_grid_block" USING btree ("_order");
  CREATE INDEX "pages_blocks_grant_card_grid_block_parent_id_idx" ON "pages_blocks_grant_card_grid_block" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_grant_card_grid_block_path_idx" ON "pages_blocks_grant_card_grid_block" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_blocks_grant_card_grid_block_locales_locale_parent_id_unique" ON "pages_blocks_grant_card_grid_block_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_mstep_process_steps_details_order_idx" ON "pages_blocks_mstep_process_steps_details" USING btree ("_order");
  CREATE INDEX "pages_blocks_mstep_process_steps_details_parent_id_idx" ON "pages_blocks_mstep_process_steps_details" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_mstep_process_steps_details_locales_locale_parent_id_unique" ON "pages_blocks_mstep_process_steps_details_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_mstep_process_steps_order_idx" ON "pages_blocks_mstep_process_steps" USING btree ("_order");
  CREATE INDEX "pages_blocks_mstep_process_steps_parent_id_idx" ON "pages_blocks_mstep_process_steps" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_mstep_process_steps_locales_locale_parent_id_unique" ON "pages_blocks_mstep_process_steps_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_mstep_process_order_idx" ON "pages_blocks_mstep_process" USING btree ("_order");
  CREATE INDEX "pages_blocks_mstep_process_parent_id_idx" ON "pages_blocks_mstep_process" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_mstep_process_path_idx" ON "pages_blocks_mstep_process" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_blocks_mstep_process_locales_locale_parent_id_unique" ON "pages_blocks_mstep_process_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_comparison_blk_lft_grp_lft_points_order_idx" ON "pages_blocks_comparison_blk_lft_grp_lft_points" USING btree ("_order");
  CREATE INDEX "pages_blocks_comparison_blk_lft_grp_lft_points_parent_id_idx" ON "pages_blocks_comparison_blk_lft_grp_lft_points" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_comparison_blk_lft_grp_lft_points_locales_locale_parent_id_unique" ON "pages_blocks_comparison_blk_lft_grp_lft_points_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_comparison_blk_rt_grp_rt_points_order_idx" ON "pages_blocks_comparison_blk_rt_grp_rt_points" USING btree ("_order");
  CREATE INDEX "pages_blocks_comparison_blk_rt_grp_rt_points_parent_id_idx" ON "pages_blocks_comparison_blk_rt_grp_rt_points" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_comparison_blk_rt_grp_rt_points_locales_locale_parent_id_unique" ON "pages_blocks_comparison_blk_rt_grp_rt_points_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_comparison_blk_buttons_order_idx" ON "pages_blocks_comparison_blk_buttons" USING btree ("_order");
  CREATE INDEX "pages_blocks_comparison_blk_buttons_parent_id_idx" ON "pages_blocks_comparison_blk_buttons" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_comparison_blk_buttons_locales_locale_parent_id_unique" ON "pages_blocks_comparison_blk_buttons_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_comparison_blk_order_idx" ON "pages_blocks_comparison_blk" USING btree ("_order");
  CREATE INDEX "pages_blocks_comparison_blk_parent_id_idx" ON "pages_blocks_comparison_blk" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_comparison_blk_path_idx" ON "pages_blocks_comparison_blk" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_blocks_comparison_blk_locales_locale_parent_id_unique" ON "pages_blocks_comparison_blk_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_ylw_deck_cards_links_order_idx" ON "pages_blocks_ylw_deck_cards_links" USING btree ("_order");
  CREATE INDEX "pages_blocks_ylw_deck_cards_links_parent_id_idx" ON "pages_blocks_ylw_deck_cards_links" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_ylw_deck_cards_links_locales_locale_parent_id_unique" ON "pages_blocks_ylw_deck_cards_links_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_ylw_deck_cards_order_idx" ON "pages_blocks_ylw_deck_cards" USING btree ("_order");
  CREATE INDEX "pages_blocks_ylw_deck_cards_parent_id_idx" ON "pages_blocks_ylw_deck_cards" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_ylw_deck_cards_mascot_idx" ON "pages_blocks_ylw_deck_cards" USING btree ("mascot_id");
  CREATE UNIQUE INDEX "pages_blocks_ylw_deck_cards_locales_locale_parent_id_unique" ON "pages_blocks_ylw_deck_cards_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_ylw_deck_order_idx" ON "pages_blocks_ylw_deck" USING btree ("_order");
  CREATE INDEX "pages_blocks_ylw_deck_parent_id_idx" ON "pages_blocks_ylw_deck" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_ylw_deck_path_idx" ON "pages_blocks_ylw_deck" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_blocks_ylw_deck_locales_locale_parent_id_unique" ON "pages_blocks_ylw_deck_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_feat_crd_tags_order_idx" ON "pages_blocks_feat_crd_tags" USING btree ("_order");
  CREATE INDEX "pages_blocks_feat_crd_tags_parent_id_idx" ON "pages_blocks_feat_crd_tags" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_feat_crd_tags_locales_locale_parent_id_unique" ON "pages_blocks_feat_crd_tags_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_feat_crd_order_idx" ON "pages_blocks_feat_crd" USING btree ("_order");
  CREATE INDEX "pages_blocks_feat_crd_parent_id_idx" ON "pages_blocks_feat_crd" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_feat_crd_path_idx" ON "pages_blocks_feat_crd" USING btree ("_path");
  CREATE INDEX "pages_blocks_feat_crd_image_idx" ON "pages_blocks_feat_crd" USING btree ("image_id");
  CREATE UNIQUE INDEX "pages_blocks_feat_crd_locales_locale_parent_id_unique" ON "pages_blocks_feat_crd_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_feat_crd_acc_feat_crds_order_idx" ON "pages_blocks_feat_crd_acc_feat_crds" USING btree ("_order");
  CREATE INDEX "pages_blocks_feat_crd_acc_feat_crds_parent_id_idx" ON "pages_blocks_feat_crd_acc_feat_crds" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_feat_crd_acc_feat_crds_mascot_idx" ON "pages_blocks_feat_crd_acc_feat_crds" USING btree ("mascot_id");
  CREATE UNIQUE INDEX "pages_blocks_feat_crd_acc_feat_crds_locales_locale_parent_id_unique" ON "pages_blocks_feat_crd_acc_feat_crds_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_feat_crd_acc_order_idx" ON "pages_blocks_feat_crd_acc" USING btree ("_order");
  CREATE INDEX "pages_blocks_feat_crd_acc_parent_id_idx" ON "pages_blocks_feat_crd_acc" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_feat_crd_acc_path_idx" ON "pages_blocks_feat_crd_acc" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_blocks_feat_crd_acc_locales_locale_parent_id_unique" ON "pages_blocks_feat_crd_acc_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_list_crd_dck_cards_tags_order_idx" ON "pages_blocks_list_crd_dck_cards_tags" USING btree ("_order");
  CREATE INDEX "pages_blocks_list_crd_dck_cards_tags_parent_id_idx" ON "pages_blocks_list_crd_dck_cards_tags" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_list_crd_dck_cards_tags_locales_locale_parent_id_unique" ON "pages_blocks_list_crd_dck_cards_tags_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_list_crd_dck_cards_order_idx" ON "pages_blocks_list_crd_dck_cards" USING btree ("_order");
  CREATE INDEX "pages_blocks_list_crd_dck_cards_parent_id_idx" ON "pages_blocks_list_crd_dck_cards" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_list_crd_dck_cards_image_idx" ON "pages_blocks_list_crd_dck_cards" USING btree ("image_id");
  CREATE UNIQUE INDEX "pages_blocks_list_crd_dck_cards_locales_locale_parent_id_unique" ON "pages_blocks_list_crd_dck_cards_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_list_crd_dck_buttons_order_idx" ON "pages_blocks_list_crd_dck_buttons" USING btree ("_order");
  CREATE INDEX "pages_blocks_list_crd_dck_buttons_parent_id_idx" ON "pages_blocks_list_crd_dck_buttons" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_list_crd_dck_buttons_locales_locale_parent_id_unique" ON "pages_blocks_list_crd_dck_buttons_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_list_crd_dck_order_idx" ON "pages_blocks_list_crd_dck" USING btree ("_order");
  CREATE INDEX "pages_blocks_list_crd_dck_parent_id_idx" ON "pages_blocks_list_crd_dck" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_list_crd_dck_path_idx" ON "pages_blocks_list_crd_dck" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_blocks_list_crd_dck_locales_locale_parent_id_unique" ON "pages_blocks_list_crd_dck_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_faq_blk_faqs_order_idx" ON "pages_blocks_faq_blk_faqs" USING btree ("_order");
  CREATE INDEX "pages_blocks_faq_blk_faqs_parent_id_idx" ON "pages_blocks_faq_blk_faqs" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_faq_blk_faqs_locales_locale_parent_id_unique" ON "pages_blocks_faq_blk_faqs_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_faq_blk_order_idx" ON "pages_blocks_faq_blk" USING btree ("_order");
  CREATE INDEX "pages_blocks_faq_blk_parent_id_idx" ON "pages_blocks_faq_blk" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_faq_blk_path_idx" ON "pages_blocks_faq_blk" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_blocks_faq_blk_locales_locale_parent_id_unique" ON "pages_blocks_faq_blk_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "pages_title_idx" ON "pages" USING btree ("title");
  CREATE INDEX "pages_mascot_idx" ON "pages" USING btree ("mascot_id");
  CREATE INDEX "pages_slug_idx" ON "pages" USING btree ("slug");
  CREATE INDEX "pages_updated_at_idx" ON "pages" USING btree ("updated_at");
  CREATE INDEX "pages_created_at_idx" ON "pages" USING btree ("created_at");
  CREATE INDEX "pages__status_idx" ON "pages" USING btree ("_status");
  CREATE UNIQUE INDEX "pages_locales_locale_parent_id_unique" ON "pages_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_rels_order_idx" ON "pages_rels" USING btree ("order");
  CREATE INDEX "pages_rels_parent_idx" ON "pages_rels" USING btree ("parent_id");
  CREATE INDEX "pages_rels_path_idx" ON "pages_rels" USING btree ("path");
  CREATE INDEX "pages_rels_grants_id_idx" ON "pages_rels" USING btree ("grants_id");
  CREATE INDEX "pages_rels_posts_id_idx" ON "pages_rels" USING btree ("posts_id");
  CREATE INDEX "pages_rels_pages_id_idx" ON "pages_rels" USING btree ("pages_id");
  CREATE INDEX "pages_rels_documents_id_idx" ON "pages_rels" USING btree ("documents_id");
  CREATE INDEX "pages_rels_grantcards_id_idx" ON "pages_rels" USING btree ("grantcards_id");
  CREATE INDEX "_pages_v_version_hero_buttons_order_idx" ON "_pages_v_version_hero_buttons" USING btree ("_order");
  CREATE INDEX "_pages_v_version_hero_buttons_parent_id_idx" ON "_pages_v_version_hero_buttons" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_pages_v_version_hero_buttons_locales_locale_parent_id_unique" ON "_pages_v_version_hero_buttons_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_secondarycta_cta_button_order_idx" ON "_pages_v_blocks_secondarycta_cta_button" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_secondarycta_cta_button_parent_id_idx" ON "_pages_v_blocks_secondarycta_cta_button" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_secondarycta_cta_button_locales_locale_parent_id_unique" ON "_pages_v_blocks_secondarycta_cta_button_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_secondarycta_order_idx" ON "_pages_v_blocks_secondarycta" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_secondarycta_parent_id_idx" ON "_pages_v_blocks_secondarycta" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_secondarycta_path_idx" ON "_pages_v_blocks_secondarycta" USING btree ("_path");
  CREATE UNIQUE INDEX "_pages_v_blocks_secondarycta_locales_locale_parent_id_unique" ON "_pages_v_blocks_secondarycta_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_mcol_info_block_multicols_order_idx" ON "_pages_v_blocks_mcol_info_block_multicols" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_mcol_info_block_multicols_parent_id_idx" ON "_pages_v_blocks_mcol_info_block_multicols" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_mcol_info_block_multicols_locales_locale_parent_id_unique" ON "_pages_v_blocks_mcol_info_block_multicols_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_mcol_info_block_order_idx" ON "_pages_v_blocks_mcol_info_block" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_mcol_info_block_parent_id_idx" ON "_pages_v_blocks_mcol_info_block" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_mcol_info_block_path_idx" ON "_pages_v_blocks_mcol_info_block" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_grant_card_grid_block_order_idx" ON "_pages_v_blocks_grant_card_grid_block" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_grant_card_grid_block_parent_id_idx" ON "_pages_v_blocks_grant_card_grid_block" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_grant_card_grid_block_path_idx" ON "_pages_v_blocks_grant_card_grid_block" USING btree ("_path");
  CREATE UNIQUE INDEX "_pages_v_blocks_grant_card_grid_block_locales_locale_parent_id_unique" ON "_pages_v_blocks_grant_card_grid_block_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_mstep_process_steps_details_order_idx" ON "_pages_v_blocks_mstep_process_steps_details" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_mstep_process_steps_details_parent_id_idx" ON "_pages_v_blocks_mstep_process_steps_details" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_mstep_process_steps_details_locales_locale_parent_id_unique" ON "_pages_v_blocks_mstep_process_steps_details_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_mstep_process_steps_order_idx" ON "_pages_v_blocks_mstep_process_steps" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_mstep_process_steps_parent_id_idx" ON "_pages_v_blocks_mstep_process_steps" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_mstep_process_steps_locales_locale_parent_id_unique" ON "_pages_v_blocks_mstep_process_steps_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_mstep_process_order_idx" ON "_pages_v_blocks_mstep_process" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_mstep_process_parent_id_idx" ON "_pages_v_blocks_mstep_process" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_mstep_process_path_idx" ON "_pages_v_blocks_mstep_process" USING btree ("_path");
  CREATE UNIQUE INDEX "_pages_v_blocks_mstep_process_locales_locale_parent_id_unique" ON "_pages_v_blocks_mstep_process_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_comparison_blk_lft_grp_lft_points_order_idx" ON "_pages_v_blocks_comparison_blk_lft_grp_lft_points" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_comparison_blk_lft_grp_lft_points_parent_id_idx" ON "_pages_v_blocks_comparison_blk_lft_grp_lft_points" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_comparison_blk_lft_grp_lft_points_locales_locale_parent_id_unique" ON "_pages_v_blocks_comparison_blk_lft_grp_lft_points_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_comparison_blk_rt_grp_rt_points_order_idx" ON "_pages_v_blocks_comparison_blk_rt_grp_rt_points" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_comparison_blk_rt_grp_rt_points_parent_id_idx" ON "_pages_v_blocks_comparison_blk_rt_grp_rt_points" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_comparison_blk_rt_grp_rt_points_locales_locale_parent_id_unique" ON "_pages_v_blocks_comparison_blk_rt_grp_rt_points_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_comparison_blk_buttons_order_idx" ON "_pages_v_blocks_comparison_blk_buttons" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_comparison_blk_buttons_parent_id_idx" ON "_pages_v_blocks_comparison_blk_buttons" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_comparison_blk_buttons_locales_locale_parent_id_unique" ON "_pages_v_blocks_comparison_blk_buttons_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_comparison_blk_order_idx" ON "_pages_v_blocks_comparison_blk" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_comparison_blk_parent_id_idx" ON "_pages_v_blocks_comparison_blk" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_comparison_blk_path_idx" ON "_pages_v_blocks_comparison_blk" USING btree ("_path");
  CREATE UNIQUE INDEX "_pages_v_blocks_comparison_blk_locales_locale_parent_id_unique" ON "_pages_v_blocks_comparison_blk_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_ylw_deck_cards_links_order_idx" ON "_pages_v_blocks_ylw_deck_cards_links" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_ylw_deck_cards_links_parent_id_idx" ON "_pages_v_blocks_ylw_deck_cards_links" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_ylw_deck_cards_links_locales_locale_parent_id_unique" ON "_pages_v_blocks_ylw_deck_cards_links_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_ylw_deck_cards_order_idx" ON "_pages_v_blocks_ylw_deck_cards" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_ylw_deck_cards_parent_id_idx" ON "_pages_v_blocks_ylw_deck_cards" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_ylw_deck_cards_mascot_idx" ON "_pages_v_blocks_ylw_deck_cards" USING btree ("mascot_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_ylw_deck_cards_locales_locale_parent_id_unique" ON "_pages_v_blocks_ylw_deck_cards_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_ylw_deck_order_idx" ON "_pages_v_blocks_ylw_deck" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_ylw_deck_parent_id_idx" ON "_pages_v_blocks_ylw_deck" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_ylw_deck_path_idx" ON "_pages_v_blocks_ylw_deck" USING btree ("_path");
  CREATE UNIQUE INDEX "_pages_v_blocks_ylw_deck_locales_locale_parent_id_unique" ON "_pages_v_blocks_ylw_deck_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_feat_crd_tags_order_idx" ON "_pages_v_blocks_feat_crd_tags" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_feat_crd_tags_parent_id_idx" ON "_pages_v_blocks_feat_crd_tags" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_feat_crd_tags_locales_locale_parent_id_unique" ON "_pages_v_blocks_feat_crd_tags_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_feat_crd_order_idx" ON "_pages_v_blocks_feat_crd" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_feat_crd_parent_id_idx" ON "_pages_v_blocks_feat_crd" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_feat_crd_path_idx" ON "_pages_v_blocks_feat_crd" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_feat_crd_image_idx" ON "_pages_v_blocks_feat_crd" USING btree ("image_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_feat_crd_locales_locale_parent_id_unique" ON "_pages_v_blocks_feat_crd_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_feat_crd_acc_feat_crds_order_idx" ON "_pages_v_blocks_feat_crd_acc_feat_crds" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_feat_crd_acc_feat_crds_parent_id_idx" ON "_pages_v_blocks_feat_crd_acc_feat_crds" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_feat_crd_acc_feat_crds_mascot_idx" ON "_pages_v_blocks_feat_crd_acc_feat_crds" USING btree ("mascot_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_feat_crd_acc_feat_crds_locales_locale_parent_id_unique" ON "_pages_v_blocks_feat_crd_acc_feat_crds_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_feat_crd_acc_order_idx" ON "_pages_v_blocks_feat_crd_acc" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_feat_crd_acc_parent_id_idx" ON "_pages_v_blocks_feat_crd_acc" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_feat_crd_acc_path_idx" ON "_pages_v_blocks_feat_crd_acc" USING btree ("_path");
  CREATE UNIQUE INDEX "_pages_v_blocks_feat_crd_acc_locales_locale_parent_id_unique" ON "_pages_v_blocks_feat_crd_acc_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_list_crd_dck_cards_tags_order_idx" ON "_pages_v_blocks_list_crd_dck_cards_tags" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_list_crd_dck_cards_tags_parent_id_idx" ON "_pages_v_blocks_list_crd_dck_cards_tags" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_list_crd_dck_cards_tags_locales_locale_parent_id_unique" ON "_pages_v_blocks_list_crd_dck_cards_tags_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_list_crd_dck_cards_order_idx" ON "_pages_v_blocks_list_crd_dck_cards" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_list_crd_dck_cards_parent_id_idx" ON "_pages_v_blocks_list_crd_dck_cards" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_list_crd_dck_cards_image_idx" ON "_pages_v_blocks_list_crd_dck_cards" USING btree ("image_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_list_crd_dck_cards_locales_locale_parent_id_unique" ON "_pages_v_blocks_list_crd_dck_cards_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_list_crd_dck_buttons_order_idx" ON "_pages_v_blocks_list_crd_dck_buttons" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_list_crd_dck_buttons_parent_id_idx" ON "_pages_v_blocks_list_crd_dck_buttons" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_list_crd_dck_buttons_locales_locale_parent_id_unique" ON "_pages_v_blocks_list_crd_dck_buttons_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_list_crd_dck_order_idx" ON "_pages_v_blocks_list_crd_dck" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_list_crd_dck_parent_id_idx" ON "_pages_v_blocks_list_crd_dck" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_list_crd_dck_path_idx" ON "_pages_v_blocks_list_crd_dck" USING btree ("_path");
  CREATE UNIQUE INDEX "_pages_v_blocks_list_crd_dck_locales_locale_parent_id_unique" ON "_pages_v_blocks_list_crd_dck_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_faq_blk_faqs_order_idx" ON "_pages_v_blocks_faq_blk_faqs" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_faq_blk_faqs_parent_id_idx" ON "_pages_v_blocks_faq_blk_faqs" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_faq_blk_faqs_locales_locale_parent_id_unique" ON "_pages_v_blocks_faq_blk_faqs_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_faq_blk_order_idx" ON "_pages_v_blocks_faq_blk" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_faq_blk_parent_id_idx" ON "_pages_v_blocks_faq_blk" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_faq_blk_path_idx" ON "_pages_v_blocks_faq_blk" USING btree ("_path");
  CREATE UNIQUE INDEX "_pages_v_blocks_faq_blk_locales_locale_parent_id_unique" ON "_pages_v_blocks_faq_blk_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_parent_idx" ON "_pages_v" USING btree ("parent_id");
  CREATE INDEX "_pages_v_version_version_title_idx" ON "_pages_v" USING btree ("version_title");
  CREATE INDEX "_pages_v_version_version_mascot_idx" ON "_pages_v" USING btree ("version_mascot_id");
  CREATE INDEX "_pages_v_version_version_slug_idx" ON "_pages_v" USING btree ("version_slug");
  CREATE INDEX "_pages_v_version_version_updated_at_idx" ON "_pages_v" USING btree ("version_updated_at");
  CREATE INDEX "_pages_v_version_version_created_at_idx" ON "_pages_v" USING btree ("version_created_at");
  CREATE INDEX "_pages_v_version_version__status_idx" ON "_pages_v" USING btree ("version__status");
  CREATE INDEX "_pages_v_created_at_idx" ON "_pages_v" USING btree ("created_at");
  CREATE INDEX "_pages_v_updated_at_idx" ON "_pages_v" USING btree ("updated_at");
  CREATE INDEX "_pages_v_snapshot_idx" ON "_pages_v" USING btree ("snapshot");
  CREATE INDEX "_pages_v_published_locale_idx" ON "_pages_v" USING btree ("published_locale");
  CREATE INDEX "_pages_v_latest_idx" ON "_pages_v" USING btree ("latest");
  CREATE UNIQUE INDEX "_pages_v_locales_locale_parent_id_unique" ON "_pages_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_rels_order_idx" ON "_pages_v_rels" USING btree ("order");
  CREATE INDEX "_pages_v_rels_parent_idx" ON "_pages_v_rels" USING btree ("parent_id");
  CREATE INDEX "_pages_v_rels_path_idx" ON "_pages_v_rels" USING btree ("path");
  CREATE INDEX "_pages_v_rels_grants_id_idx" ON "_pages_v_rels" USING btree ("grants_id");
  CREATE INDEX "_pages_v_rels_posts_id_idx" ON "_pages_v_rels" USING btree ("posts_id");
  CREATE INDEX "_pages_v_rels_pages_id_idx" ON "_pages_v_rels" USING btree ("pages_id");
  CREATE INDEX "_pages_v_rels_documents_id_idx" ON "_pages_v_rels" USING btree ("documents_id");
  CREATE INDEX "_pages_v_rels_grantcards_id_idx" ON "_pages_v_rels" USING btree ("grantcards_id");
  ALTER TABLE "grants_rels" ADD CONSTRAINT "grants_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_grants_v_rels" ADD CONSTRAINT "_grants_v_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "grantcards_rels" ADD CONSTRAINT "grantcards_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_grantcards_v_rels" ADD CONSTRAINT "_grantcards_v_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_rels" ADD CONSTRAINT "homepage_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_homepage_v_rels" ADD CONSTRAINT "_homepage_v_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "nav_rels" ADD CONSTRAINT "nav_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "grants_rels_pages_id_idx" ON "grants_rels" USING btree ("pages_id");
  CREATE INDEX "_grants_v_rels_pages_id_idx" ON "_grants_v_rels" USING btree ("pages_id");
  CREATE INDEX "grantcards_rels_pages_id_idx" ON "grantcards_rels" USING btree ("pages_id");
  CREATE INDEX "_grantcards_v_rels_pages_id_idx" ON "_grantcards_v_rels" USING btree ("pages_id");
  CREATE INDEX "payload_locked_documents_rels_pages_id_idx" ON "payload_locked_documents_rels" USING btree ("pages_id");
  CREATE INDEX "homepage_rels_pages_id_idx" ON "homepage_rels" USING btree ("pages_id");
  CREATE INDEX "_homepage_v_rels_pages_id_idx" ON "_homepage_v_rels" USING btree ("pages_id");
  CREATE INDEX "nav_rels_pages_id_idx" ON "nav_rels" USING btree ("pages_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_hero_buttons" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_hero_buttons_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_secondarycta_cta_button" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_secondarycta_cta_button_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_secondarycta" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_secondarycta_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_mcol_info_block_multicols" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_mcol_info_block_multicols_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_mcol_info_block" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_grant_card_grid_block" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_grant_card_grid_block_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_mstep_process_steps_details" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_mstep_process_steps_details_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_mstep_process_steps" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_mstep_process_steps_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_mstep_process" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_mstep_process_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_comparison_blk_lft_grp_lft_points" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_comparison_blk_lft_grp_lft_points_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_comparison_blk_rt_grp_rt_points" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_comparison_blk_rt_grp_rt_points_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_comparison_blk_buttons" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_comparison_blk_buttons_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_comparison_blk" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_comparison_blk_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_ylw_deck_cards_links" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_ylw_deck_cards_links_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_ylw_deck_cards" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_ylw_deck_cards_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_ylw_deck" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_ylw_deck_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_feat_crd_tags" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_feat_crd_tags_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_feat_crd" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_feat_crd_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_feat_crd_acc_feat_crds" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_feat_crd_acc_feat_crds_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_feat_crd_acc" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_feat_crd_acc_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_list_crd_dck_cards_tags" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_list_crd_dck_cards_tags_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_list_crd_dck_cards" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_list_crd_dck_cards_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_list_crd_dck_buttons" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_list_crd_dck_buttons_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_list_crd_dck" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_list_crd_dck_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_faq_blk_faqs" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_faq_blk_faqs_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_faq_blk" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_faq_blk_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_rels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_version_hero_buttons" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_version_hero_buttons_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_secondarycta_cta_button" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_secondarycta_cta_button_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_secondarycta" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_secondarycta_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_mcol_info_block_multicols" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_mcol_info_block_multicols_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_mcol_info_block" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_grant_card_grid_block" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_grant_card_grid_block_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_mstep_process_steps_details" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_mstep_process_steps_details_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_mstep_process_steps" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_mstep_process_steps_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_mstep_process" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_mstep_process_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_comparison_blk_lft_grp_lft_points" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_comparison_blk_lft_grp_lft_points_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_comparison_blk_rt_grp_rt_points" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_comparison_blk_rt_grp_rt_points_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_comparison_blk_buttons" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_comparison_blk_buttons_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_comparison_blk" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_comparison_blk_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_ylw_deck_cards_links" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_ylw_deck_cards_links_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_ylw_deck_cards" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_ylw_deck_cards_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_ylw_deck" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_ylw_deck_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_feat_crd_tags" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_feat_crd_tags_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_feat_crd" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_feat_crd_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_feat_crd_acc_feat_crds" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_feat_crd_acc_feat_crds_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_feat_crd_acc" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_feat_crd_acc_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_list_crd_dck_cards_tags" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_list_crd_dck_cards_tags_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_list_crd_dck_cards" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_list_crd_dck_cards_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_list_crd_dck_buttons" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_list_crd_dck_buttons_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_list_crd_dck" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_list_crd_dck_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_faq_blk_faqs" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_faq_blk_faqs_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_faq_blk" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_faq_blk_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_rels" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "pages_hero_buttons" CASCADE;
  DROP TABLE "pages_hero_buttons_locales" CASCADE;
  DROP TABLE "pages_blocks_secondarycta_cta_button" CASCADE;
  DROP TABLE "pages_blocks_secondarycta_cta_button_locales" CASCADE;
  DROP TABLE "pages_blocks_secondarycta" CASCADE;
  DROP TABLE "pages_blocks_secondarycta_locales" CASCADE;
  DROP TABLE "pages_blocks_mcol_info_block_multicols" CASCADE;
  DROP TABLE "pages_blocks_mcol_info_block_multicols_locales" CASCADE;
  DROP TABLE "pages_blocks_mcol_info_block" CASCADE;
  DROP TABLE "pages_blocks_grant_card_grid_block" CASCADE;
  DROP TABLE "pages_blocks_grant_card_grid_block_locales" CASCADE;
  DROP TABLE "pages_blocks_mstep_process_steps_details" CASCADE;
  DROP TABLE "pages_blocks_mstep_process_steps_details_locales" CASCADE;
  DROP TABLE "pages_blocks_mstep_process_steps" CASCADE;
  DROP TABLE "pages_blocks_mstep_process_steps_locales" CASCADE;
  DROP TABLE "pages_blocks_mstep_process" CASCADE;
  DROP TABLE "pages_blocks_mstep_process_locales" CASCADE;
  DROP TABLE "pages_blocks_comparison_blk_lft_grp_lft_points" CASCADE;
  DROP TABLE "pages_blocks_comparison_blk_lft_grp_lft_points_locales" CASCADE;
  DROP TABLE "pages_blocks_comparison_blk_rt_grp_rt_points" CASCADE;
  DROP TABLE "pages_blocks_comparison_blk_rt_grp_rt_points_locales" CASCADE;
  DROP TABLE "pages_blocks_comparison_blk_buttons" CASCADE;
  DROP TABLE "pages_blocks_comparison_blk_buttons_locales" CASCADE;
  DROP TABLE "pages_blocks_comparison_blk" CASCADE;
  DROP TABLE "pages_blocks_comparison_blk_locales" CASCADE;
  DROP TABLE "pages_blocks_ylw_deck_cards_links" CASCADE;
  DROP TABLE "pages_blocks_ylw_deck_cards_links_locales" CASCADE;
  DROP TABLE "pages_blocks_ylw_deck_cards" CASCADE;
  DROP TABLE "pages_blocks_ylw_deck_cards_locales" CASCADE;
  DROP TABLE "pages_blocks_ylw_deck" CASCADE;
  DROP TABLE "pages_blocks_ylw_deck_locales" CASCADE;
  DROP TABLE "pages_blocks_feat_crd_tags" CASCADE;
  DROP TABLE "pages_blocks_feat_crd_tags_locales" CASCADE;
  DROP TABLE "pages_blocks_feat_crd" CASCADE;
  DROP TABLE "pages_blocks_feat_crd_locales" CASCADE;
  DROP TABLE "pages_blocks_feat_crd_acc_feat_crds" CASCADE;
  DROP TABLE "pages_blocks_feat_crd_acc_feat_crds_locales" CASCADE;
  DROP TABLE "pages_blocks_feat_crd_acc" CASCADE;
  DROP TABLE "pages_blocks_feat_crd_acc_locales" CASCADE;
  DROP TABLE "pages_blocks_list_crd_dck_cards_tags" CASCADE;
  DROP TABLE "pages_blocks_list_crd_dck_cards_tags_locales" CASCADE;
  DROP TABLE "pages_blocks_list_crd_dck_cards" CASCADE;
  DROP TABLE "pages_blocks_list_crd_dck_cards_locales" CASCADE;
  DROP TABLE "pages_blocks_list_crd_dck_buttons" CASCADE;
  DROP TABLE "pages_blocks_list_crd_dck_buttons_locales" CASCADE;
  DROP TABLE "pages_blocks_list_crd_dck" CASCADE;
  DROP TABLE "pages_blocks_list_crd_dck_locales" CASCADE;
  DROP TABLE "pages_blocks_faq_blk_faqs" CASCADE;
  DROP TABLE "pages_blocks_faq_blk_faqs_locales" CASCADE;
  DROP TABLE "pages_blocks_faq_blk" CASCADE;
  DROP TABLE "pages_blocks_faq_blk_locales" CASCADE;
  DROP TABLE "pages" CASCADE;
  DROP TABLE "pages_locales" CASCADE;
  DROP TABLE "pages_rels" CASCADE;
  DROP TABLE "_pages_v_version_hero_buttons" CASCADE;
  DROP TABLE "_pages_v_version_hero_buttons_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_secondarycta_cta_button" CASCADE;
  DROP TABLE "_pages_v_blocks_secondarycta_cta_button_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_secondarycta" CASCADE;
  DROP TABLE "_pages_v_blocks_secondarycta_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_mcol_info_block_multicols" CASCADE;
  DROP TABLE "_pages_v_blocks_mcol_info_block_multicols_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_mcol_info_block" CASCADE;
  DROP TABLE "_pages_v_blocks_grant_card_grid_block" CASCADE;
  DROP TABLE "_pages_v_blocks_grant_card_grid_block_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_mstep_process_steps_details" CASCADE;
  DROP TABLE "_pages_v_blocks_mstep_process_steps_details_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_mstep_process_steps" CASCADE;
  DROP TABLE "_pages_v_blocks_mstep_process_steps_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_mstep_process" CASCADE;
  DROP TABLE "_pages_v_blocks_mstep_process_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_comparison_blk_lft_grp_lft_points" CASCADE;
  DROP TABLE "_pages_v_blocks_comparison_blk_lft_grp_lft_points_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_comparison_blk_rt_grp_rt_points" CASCADE;
  DROP TABLE "_pages_v_blocks_comparison_blk_rt_grp_rt_points_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_comparison_blk_buttons" CASCADE;
  DROP TABLE "_pages_v_blocks_comparison_blk_buttons_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_comparison_blk" CASCADE;
  DROP TABLE "_pages_v_blocks_comparison_blk_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_ylw_deck_cards_links" CASCADE;
  DROP TABLE "_pages_v_blocks_ylw_deck_cards_links_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_ylw_deck_cards" CASCADE;
  DROP TABLE "_pages_v_blocks_ylw_deck_cards_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_ylw_deck" CASCADE;
  DROP TABLE "_pages_v_blocks_ylw_deck_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_feat_crd_tags" CASCADE;
  DROP TABLE "_pages_v_blocks_feat_crd_tags_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_feat_crd" CASCADE;
  DROP TABLE "_pages_v_blocks_feat_crd_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_feat_crd_acc_feat_crds" CASCADE;
  DROP TABLE "_pages_v_blocks_feat_crd_acc_feat_crds_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_feat_crd_acc" CASCADE;
  DROP TABLE "_pages_v_blocks_feat_crd_acc_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_list_crd_dck_cards_tags" CASCADE;
  DROP TABLE "_pages_v_blocks_list_crd_dck_cards_tags_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_list_crd_dck_cards" CASCADE;
  DROP TABLE "_pages_v_blocks_list_crd_dck_cards_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_list_crd_dck_buttons" CASCADE;
  DROP TABLE "_pages_v_blocks_list_crd_dck_buttons_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_list_crd_dck" CASCADE;
  DROP TABLE "_pages_v_blocks_list_crd_dck_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_faq_blk_faqs" CASCADE;
  DROP TABLE "_pages_v_blocks_faq_blk_faqs_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_faq_blk" CASCADE;
  DROP TABLE "_pages_v_blocks_faq_blk_locales" CASCADE;
  DROP TABLE "_pages_v" CASCADE;
  DROP TABLE "_pages_v_locales" CASCADE;
  DROP TABLE "_pages_v_rels" CASCADE;
  ALTER TABLE "grants_rels" DROP CONSTRAINT "grants_rels_pages_fk";
  
  ALTER TABLE "_grants_v_rels" DROP CONSTRAINT "_grants_v_rels_pages_fk";
  
  ALTER TABLE "grantcards_rels" DROP CONSTRAINT "grantcards_rels_pages_fk";
  
  ALTER TABLE "_grantcards_v_rels" DROP CONSTRAINT "_grantcards_v_rels_pages_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_pages_fk";
  
  ALTER TABLE "homepage_rels" DROP CONSTRAINT "homepage_rels_pages_fk";
  
  ALTER TABLE "_homepage_v_rels" DROP CONSTRAINT "_homepage_v_rels_pages_fk";
  
  ALTER TABLE "nav_rels" DROP CONSTRAINT "nav_rels_pages_fk";
  
  DROP INDEX "grants_rels_pages_id_idx";
  DROP INDEX "_grants_v_rels_pages_id_idx";
  DROP INDEX "grantcards_rels_pages_id_idx";
  DROP INDEX "_grantcards_v_rels_pages_id_idx";
  DROP INDEX "payload_locked_documents_rels_pages_id_idx";
  DROP INDEX "homepage_rels_pages_id_idx";
  DROP INDEX "_homepage_v_rels_pages_id_idx";
  DROP INDEX "nav_rels_pages_id_idx";
  ALTER TABLE "grants_rels" DROP COLUMN "pages_id";
  ALTER TABLE "_grants_v_rels" DROP COLUMN "pages_id";
  ALTER TABLE "grantcards_rels" DROP COLUMN "pages_id";
  ALTER TABLE "_grantcards_v_rels" DROP COLUMN "pages_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "pages_id";
  ALTER TABLE "homepage_rels" DROP COLUMN "pages_id";
  ALTER TABLE "_homepage_v_rels" DROP COLUMN "pages_id";
  ALTER TABLE "nav_rels" DROP COLUMN "pages_id";
  DROP TYPE "public"."enum_pages_hero_buttons_link_type";
  DROP TYPE "public"."enum_pages_blocks_secondarycta_cta_button_link_type";
  DROP TYPE "public"."enum_pages_blocks_secondarycta_ui_type";
  DROP TYPE "public"."enum_pages_blocks_mcol_info_block_multicols_link_type";
  DROP TYPE "public"."enum_pages_blocks_mstep_process_steps_icon";
  DROP TYPE "public"."enum_pages_blocks_comparison_blk_buttons_link_type";
  DROP TYPE "public"."enum_pages_blocks_ylw_deck_cards_links_link_type";
  DROP TYPE "public"."enum_pages_blocks_ylw_deck_cards_mascot_pos";
  DROP TYPE "public"."enum_pages_blocks_ylw_deck_align";
  DROP TYPE "public"."enum_pages_blocks_feat_crd_link_type";
  DROP TYPE "public"."enum_pages_blocks_feat_crd_acc_feat_crds_crd_colour";
  DROP TYPE "public"."enum_pages_blocks_list_crd_dck_cards_link_type";
  DROP TYPE "public"."enum_pages_blocks_list_crd_dck_buttons_link_type";
  DROP TYPE "public"."enum_pages_blocks_faq_blk_link_type";
  DROP TYPE "public"."enum_pages_bg_type";
  DROP TYPE "public"."enum_pages_hero_colour";
  DROP TYPE "public"."enum_pages_status";
  DROP TYPE "public"."enum__pages_v_version_hero_buttons_link_type";
  DROP TYPE "public"."enum__pages_v_blocks_secondarycta_cta_button_link_type";
  DROP TYPE "public"."enum__pages_v_blocks_secondarycta_ui_type";
  DROP TYPE "public"."enum__pages_v_blocks_mcol_info_block_multicols_link_type";
  DROP TYPE "public"."enum__pages_v_blocks_mstep_process_steps_icon";
  DROP TYPE "public"."enum__pages_v_blocks_comparison_blk_buttons_link_type";
  DROP TYPE "public"."enum__pages_v_blocks_ylw_deck_cards_links_link_type";
  DROP TYPE "public"."enum__pages_v_blocks_ylw_deck_cards_mascot_pos";
  DROP TYPE "public"."enum__pages_v_blocks_ylw_deck_align";
  DROP TYPE "public"."enum__pages_v_blocks_feat_crd_link_type";
  DROP TYPE "public"."enum__pages_v_blocks_feat_crd_acc_feat_crds_crd_colour";
  DROP TYPE "public"."enum__pages_v_blocks_list_crd_dck_cards_link_type";
  DROP TYPE "public"."enum__pages_v_blocks_list_crd_dck_buttons_link_type";
  DROP TYPE "public"."enum__pages_v_blocks_faq_blk_link_type";
  DROP TYPE "public"."enum__pages_v_version_bg_type";
  DROP TYPE "public"."enum__pages_v_version_hero_colour";
  DROP TYPE "public"."enum__pages_v_version_status";
  DROP TYPE "public"."enum__pages_v_published_locale";`)
}
