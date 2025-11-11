import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."_locales" AS ENUM('en', 'ar', 'bi', 'bn-IN', 'br', 'ch', 'prs-Arab', 'km', 'hi', 'ms', 'ne', 'ps-Arab', 'pcm', 'si', 'tl', 'ta', 'th', 'vi', 'ur');
  CREATE TYPE "public"."enum_grants_hero_buttons_link_type" AS ENUM('reference', 'custom', 'email', 'document');
  CREATE TYPE "public"."enum_grants_blocks_scol_info_blk_col_btns_link_type" AS ENUM('reference', 'custom', 'email', 'document');
  CREATE TYPE "public"."enum_grants_blocks_mcol_info_block_multicols_link_type" AS ENUM('reference', 'custom', 'email', 'document');
  CREATE TYPE "public"."enum_grants_blocks_mstep_process_steps_icon" AS ENUM('FileText', 'Clock', 'ShieldCheck', 'Vote', 'ScrollText', 'Banknote', 'Rocket', 'FileCheck');
  CREATE TYPE "public"."enum_grants_blocks_comparison_blk_buttons_link_type" AS ENUM('reference', 'custom', 'email', 'document');
  CREATE TYPE "public"."enum_grants_blocks_ylw_deck_cards_links_link_type" AS ENUM('reference', 'custom', 'email', 'document');
  CREATE TYPE "public"."enum_grants_blocks_ylw_deck_cards_mascot_pos" AS ENUM('top_left', 'center');
  CREATE TYPE "public"."enum_grants_blocks_ylw_deck_align" AS ENUM('left', 'center');
  CREATE TYPE "public"."enum_grants_blocks_feat_crd_link_type" AS ENUM('reference', 'custom', 'email', 'document');
  CREATE TYPE "public"."enum_grants_blocks_feat_crd_acc_feat_crds_crd_colour" AS ENUM('forest', 'turmeric', 'sky', 'rose', 'lavender', 'fire');
  CREATE TYPE "public"."enum_grants_blocks_list_crd_dck_cards_link_type" AS ENUM('reference', 'custom', 'email', 'document');
  CREATE TYPE "public"."enum_grants_blocks_list_crd_dck_buttons_link_type" AS ENUM('reference', 'custom', 'email', 'document');
  CREATE TYPE "public"."enum_grants_blocks_faq_blk_link_type" AS ENUM('reference', 'custom', 'email', 'document');
  CREATE TYPE "public"."enum_grants_page_type" AS ENUM('landing', 'individual');
  CREATE TYPE "public"."enum_grants_bg_type" AS ENUM('wavy_top', 'wavy_full', 'center_blob');
  CREATE TYPE "public"."enum_grants_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__grants_v_version_hero_buttons_link_type" AS ENUM('reference', 'custom', 'email', 'document');
  CREATE TYPE "public"."enum__grants_v_blocks_scol_info_blk_col_btns_link_type" AS ENUM('reference', 'custom', 'email', 'document');
  CREATE TYPE "public"."enum__grants_v_blocks_mcol_info_block_multicols_link_type" AS ENUM('reference', 'custom', 'email', 'document');
  CREATE TYPE "public"."enum__grants_v_blocks_mstep_process_steps_icon" AS ENUM('FileText', 'Clock', 'ShieldCheck', 'Vote', 'ScrollText', 'Banknote', 'Rocket', 'FileCheck');
  CREATE TYPE "public"."enum__grants_v_blocks_comparison_blk_buttons_link_type" AS ENUM('reference', 'custom', 'email', 'document');
  CREATE TYPE "public"."enum__grants_v_blocks_ylw_deck_cards_links_link_type" AS ENUM('reference', 'custom', 'email', 'document');
  CREATE TYPE "public"."enum__grants_v_blocks_ylw_deck_cards_mascot_pos" AS ENUM('top_left', 'center');
  CREATE TYPE "public"."enum__grants_v_blocks_ylw_deck_align" AS ENUM('left', 'center');
  CREATE TYPE "public"."enum__grants_v_blocks_feat_crd_link_type" AS ENUM('reference', 'custom', 'email', 'document');
  CREATE TYPE "public"."enum__grants_v_blocks_feat_crd_acc_feat_crds_crd_colour" AS ENUM('forest', 'turmeric', 'sky', 'rose', 'lavender', 'fire');
  CREATE TYPE "public"."enum__grants_v_blocks_list_crd_dck_cards_link_type" AS ENUM('reference', 'custom', 'email', 'document');
  CREATE TYPE "public"."enum__grants_v_blocks_list_crd_dck_buttons_link_type" AS ENUM('reference', 'custom', 'email', 'document');
  CREATE TYPE "public"."enum__grants_v_blocks_faq_blk_link_type" AS ENUM('reference', 'custom', 'email', 'document');
  CREATE TYPE "public"."enum__grants_v_version_page_type" AS ENUM('landing', 'individual');
  CREATE TYPE "public"."enum__grants_v_version_bg_type" AS ENUM('wavy_top', 'wavy_full', 'center_blob');
  CREATE TYPE "public"."enum__grants_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__grants_v_published_locale" AS ENUM('en', 'ar', 'bi', 'bn-IN', 'br', 'ch', 'prs-Arab', 'km', 'hi', 'ms', 'ne', 'ps-Arab', 'pcm', 'si', 'tl', 'ta', 'th', 'vi', 'ur');
  CREATE TYPE "public"."enum_grantcards_card_buttons_link_type" AS ENUM('reference', 'custom', 'email', 'document');
  CREATE TYPE "public"."enum_grantcards_badge_type" AS ENUM('info', 'imp', 'inactive');
  CREATE TYPE "public"."enum_grantcards_active_period" AS ENUM('open_all_year', 'specific_period', 'closed');
  CREATE TYPE "public"."enum_grantcards_card_colour" AS ENUM('forest', 'turmeric', 'sky', 'rose', 'lavender', 'fire', 'trans');
  CREATE TYPE "public"."enum_grantcards_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__grantcards_v_version_card_buttons_link_type" AS ENUM('reference', 'custom', 'email', 'document');
  CREATE TYPE "public"."enum__grantcards_v_version_badge_type" AS ENUM('info', 'imp', 'inactive');
  CREATE TYPE "public"."enum__grantcards_v_version_active_period" AS ENUM('open_all_year', 'specific_period', 'closed');
  CREATE TYPE "public"."enum__grantcards_v_version_card_colour" AS ENUM('forest', 'turmeric', 'sky', 'rose', 'lavender', 'fire', 'trans');
  CREATE TYPE "public"."enum__grantcards_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__grantcards_v_published_locale" AS ENUM('en', 'ar', 'bi', 'bn-IN', 'br', 'ch', 'prs-Arab', 'km', 'hi', 'ms', 'ne', 'ps-Arab', 'pcm', 'si', 'tl', 'ta', 'th', 'vi', 'ur');
  CREATE TYPE "public"."enum_posts_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__posts_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__posts_v_published_locale" AS ENUM('en', 'ar', 'bi', 'bn-IN', 'br', 'ch', 'prs-Arab', 'km', 'hi', 'ms', 'ne', 'ps-Arab', 'pcm', 'si', 'tl', 'ta', 'th', 'vi', 'ur');
  CREATE TYPE "public"."enum_users_role" AS ENUM('admin', 'editor', 'writer');
  CREATE TYPE "public"."enum_redirects_to_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_forms_confirmation_type" AS ENUM('message', 'redirect');
  CREATE TYPE "public"."enum_homepage_hero_section_cta_button_link_type" AS ENUM('reference', 'custom', 'email', 'document');
  CREATE TYPE "public"."enum_homepage_blocks_secondarycta_cta_button_link_type" AS ENUM('reference', 'custom', 'email', 'document');
  CREATE TYPE "public"."enum_homepage_blocks_mcol_info_block_multicols_link_type" AS ENUM('reference', 'custom', 'email', 'document');
  CREATE TYPE "public"."enum_homepage_blocks_mstep_process_steps_icon" AS ENUM('FileText', 'Clock', 'ShieldCheck', 'Vote', 'ScrollText', 'Banknote', 'Rocket', 'FileCheck');
  CREATE TYPE "public"."enum_homepage_blocks_comparison_blk_buttons_link_type" AS ENUM('reference', 'custom', 'email', 'document');
  CREATE TYPE "public"."enum_homepage_blocks_ylw_deck_cards_links_link_type" AS ENUM('reference', 'custom', 'email', 'document');
  CREATE TYPE "public"."enum_homepage_blocks_ylw_deck_cards_mascot_pos" AS ENUM('top_left', 'center');
  CREATE TYPE "public"."enum_homepage_blocks_ylw_deck_align" AS ENUM('left', 'center');
  CREATE TYPE "public"."enum_homepage_blocks_feat_crd_link_type" AS ENUM('reference', 'custom', 'email', 'document');
  CREATE TYPE "public"."enum_homepage_blocks_feat_crd_acc_feat_crds_crd_colour" AS ENUM('forest', 'turmeric', 'sky', 'rose', 'lavender', 'fire');
  CREATE TYPE "public"."enum_homepage_blocks_list_crd_dck_cards_link_type" AS ENUM('reference', 'custom', 'email', 'document');
  CREATE TYPE "public"."enum_homepage_blocks_list_crd_dck_buttons_link_type" AS ENUM('reference', 'custom', 'email', 'document');
  CREATE TYPE "public"."enum_homepage_blocks_faq_blk_link_type" AS ENUM('reference', 'custom', 'email', 'document');
  CREATE TYPE "public"."enum_homepage_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__homepage_v_version_hero_section_cta_button_link_type" AS ENUM('reference', 'custom', 'email', 'document');
  CREATE TYPE "public"."enum__homepage_v_blocks_secondarycta_cta_button_link_type" AS ENUM('reference', 'custom', 'email', 'document');
  CREATE TYPE "public"."enum__homepage_v_blocks_mcol_info_block_multicols_link_type" AS ENUM('reference', 'custom', 'email', 'document');
  CREATE TYPE "public"."enum__homepage_v_blocks_mstep_process_steps_icon" AS ENUM('FileText', 'Clock', 'ShieldCheck', 'Vote', 'ScrollText', 'Banknote', 'Rocket', 'FileCheck');
  CREATE TYPE "public"."enum__homepage_v_blocks_comparison_blk_buttons_link_type" AS ENUM('reference', 'custom', 'email', 'document');
  CREATE TYPE "public"."enum__homepage_v_blocks_ylw_deck_cards_links_link_type" AS ENUM('reference', 'custom', 'email', 'document');
  CREATE TYPE "public"."enum__homepage_v_blocks_ylw_deck_cards_mascot_pos" AS ENUM('top_left', 'center');
  CREATE TYPE "public"."enum__homepage_v_blocks_ylw_deck_align" AS ENUM('left', 'center');
  CREATE TYPE "public"."enum__homepage_v_blocks_feat_crd_link_type" AS ENUM('reference', 'custom', 'email', 'document');
  CREATE TYPE "public"."enum__homepage_v_blocks_feat_crd_acc_feat_crds_crd_colour" AS ENUM('forest', 'turmeric', 'sky', 'rose', 'lavender', 'fire');
  CREATE TYPE "public"."enum__homepage_v_blocks_list_crd_dck_cards_link_type" AS ENUM('reference', 'custom', 'email', 'document');
  CREATE TYPE "public"."enum__homepage_v_blocks_list_crd_dck_buttons_link_type" AS ENUM('reference', 'custom', 'email', 'document');
  CREATE TYPE "public"."enum__homepage_v_blocks_faq_blk_link_type" AS ENUM('reference', 'custom', 'email', 'document');
  CREATE TYPE "public"."enum__homepage_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__homepage_v_published_locale" AS ENUM('en', 'ar', 'bi', 'bn-IN', 'br', 'ch', 'prs-Arab', 'km', 'hi', 'ms', 'ne', 'ps-Arab', 'pcm', 'si', 'tl', 'ta', 'th', 'vi', 'ur');
  CREATE TYPE "public"."enum_header_languages" AS ENUM('en', 'ar', 'bi', 'bn-IN', 'br', 'ch', 'prs-Arab', 'km', 'hi', 'ms', 'ne', 'ps-Arab', 'pcm', 'si', 'tl', 'ta', 'th', 'vi', 'ur');
  CREATE TYPE "public"."enum_footer_sm_links_group_sm_links_sm_type" AS ENUM('fb', 'insta', 'threads', 'mast', 'wa', 'linkedin', 'scloud', 'med', 'sstack', 'spotify');
  CREATE TYPE "public"."enum_nav_menu_items_nav_items_link_type" AS ENUM('reference', 'custom', 'email', 'document');
  CREATE TYPE "public"."enum_contact_info_emails_email_type" AS ENUM('info', 'grants', 'whistle', 'wsc', 'general');
  CREATE TABLE "grants_hero_buttons" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_grants_hero_buttons_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_download_link" boolean,
  	"link_arrow_link" boolean,
  	"link_pill_solid" boolean,
  	"link_pill_outline" boolean,
  	"link_url" varchar,
  	"link_email" varchar
  );
  
  CREATE TABLE "grants_hero_buttons_locales" (
  	"link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "grants_blocks_scol_info_blk_col_btns" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_grants_blocks_scol_info_blk_col_btns_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_download_link" boolean,
  	"link_arrow_link" boolean,
  	"link_pill_solid" boolean,
  	"link_pill_outline" boolean,
  	"link_url" varchar,
  	"link_email" varchar
  );
  
  CREATE TABLE "grants_blocks_scol_info_blk_col_btns_locales" (
  	"link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "grants_blocks_scol_info_blk" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "grants_blocks_scol_info_blk_locales" (
  	"title" varchar,
  	"desc" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "grants_blocks_mcol_info_block_multicols" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"add_link" boolean,
  	"link_type" "enum_grants_blocks_mcol_info_block_multicols_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_download_link" boolean,
  	"link_arrow_link" boolean,
  	"link_pill_solid" boolean,
  	"link_pill_outline" boolean,
  	"link_url" varchar,
  	"link_email" varchar
  );
  
  CREATE TABLE "grants_blocks_mcol_info_block_multicols_locales" (
  	"title" varchar,
  	"col_content" varchar,
  	"link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "grants_blocks_mcol_info_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "grants_blocks_grant_card_grid_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "grants_blocks_grant_card_grid_block_locales" (
  	"title" varchar,
  	"desc" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "grants_blocks_mstep_process_steps_details" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "grants_blocks_mstep_process_steps_details_locales" (
  	"bullet" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "grants_blocks_mstep_process_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" "enum_grants_blocks_mstep_process_steps_icon" DEFAULT 'FileText'
  );
  
  CREATE TABLE "grants_blocks_mstep_process_steps_locales" (
  	"step_title" varchar,
  	"title" varchar,
  	"tip" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "grants_blocks_mstep_process" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "grants_blocks_mstep_process_locales" (
  	"title" varchar,
  	"subtitle" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "grants_blocks_comparison_blk_lft_grp_lft_points" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "grants_blocks_comparison_blk_lft_grp_lft_points_locales" (
  	"point" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "grants_blocks_comparison_blk_rt_grp_rt_points" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "grants_blocks_comparison_blk_rt_grp_rt_points_locales" (
  	"point" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "grants_blocks_comparison_blk_buttons" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_grants_blocks_comparison_blk_buttons_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_download_link" boolean,
  	"link_arrow_link" boolean,
  	"link_pill_solid" boolean,
  	"link_pill_outline" boolean,
  	"link_url" varchar,
  	"link_email" varchar
  );
  
  CREATE TABLE "grants_blocks_comparison_blk_buttons_locales" (
  	"link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "grants_blocks_comparison_blk" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "grants_blocks_comparison_blk_locales" (
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
  
  CREATE TABLE "grants_blocks_ylw_deck_cards_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_grants_blocks_ylw_deck_cards_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_download_link" boolean,
  	"link_arrow_link" boolean,
  	"link_pill_solid" boolean,
  	"link_pill_outline" boolean,
  	"link_url" varchar,
  	"link_email" varchar
  );
  
  CREATE TABLE "grants_blocks_ylw_deck_cards_links_locales" (
  	"desc" varchar,
  	"link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "grants_blocks_ylw_deck_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"mascot_id" integer,
  	"mascot_pos" "enum_grants_blocks_ylw_deck_cards_mascot_pos" DEFAULT 'center'
  );
  
  CREATE TABLE "grants_blocks_ylw_deck_cards_locales" (
  	"title" varchar,
  	"subtitle" varchar,
  	"desc" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "grants_blocks_ylw_deck" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"align" "enum_grants_blocks_ylw_deck_align" DEFAULT 'center',
  	"block_name" varchar
  );
  
  CREATE TABLE "grants_blocks_ylw_deck_locales" (
  	"title" varchar,
  	"desc" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "grants_blocks_feat_crd_tags" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "grants_blocks_feat_crd_tags_locales" (
  	"tag" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "grants_blocks_feat_crd" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"link_type" "enum_grants_blocks_feat_crd_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_download_link" boolean,
  	"link_arrow_link" boolean,
  	"link_pill_solid" boolean,
  	"link_pill_outline" boolean,
  	"link_url" varchar,
  	"link_email" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "grants_blocks_feat_crd_locales" (
  	"title" varchar,
  	"subtitle" varchar,
  	"desc" jsonb,
  	"link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "grants_blocks_feat_crd_acc_feat_crds" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"mascot_id" integer,
  	"crd_colour" "enum_grants_blocks_feat_crd_acc_feat_crds_crd_colour" DEFAULT 'forest'
  );
  
  CREATE TABLE "grants_blocks_feat_crd_acc_feat_crds_locales" (
  	"acc_title" varchar,
  	"acc_content" jsonb,
  	"crd_tag" varchar,
  	"crd_content" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "grants_blocks_feat_crd_acc" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "grants_blocks_feat_crd_acc_locales" (
  	"title" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "grants_blocks_list_crd_dck_cards_tags" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "grants_blocks_list_crd_dck_cards_tags_locales" (
  	"tag" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "grants_blocks_list_crd_dck_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"link_type" "enum_grants_blocks_list_crd_dck_cards_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_download_link" boolean,
  	"link_arrow_link" boolean,
  	"link_pill_solid" boolean,
  	"link_pill_outline" boolean,
  	"link_url" varchar,
  	"link_email" varchar
  );
  
  CREATE TABLE "grants_blocks_list_crd_dck_cards_locales" (
  	"title" varchar,
  	"desc" varchar,
  	"link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "grants_blocks_list_crd_dck_buttons" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_grants_blocks_list_crd_dck_buttons_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_download_link" boolean,
  	"link_arrow_link" boolean,
  	"link_pill_solid" boolean,
  	"link_pill_outline" boolean,
  	"link_url" varchar,
  	"link_email" varchar
  );
  
  CREATE TABLE "grants_blocks_list_crd_dck_buttons_locales" (
  	"link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "grants_blocks_list_crd_dck" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "grants_blocks_list_crd_dck_locales" (
  	"title" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "grants_blocks_faq_blk_faqs" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "grants_blocks_faq_blk_faqs_locales" (
  	"question" varchar,
  	"answer" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "grants_blocks_faq_blk" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_grants_blocks_faq_blk_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_download_link" boolean,
  	"link_arrow_link" boolean,
  	"link_pill_solid" boolean,
  	"link_pill_outline" boolean,
  	"link_url" varchar,
  	"link_email" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "grants_blocks_faq_blk_locales" (
  	"title" varchar,
  	"desc" varchar,
  	"link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "grants" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"page_type" "enum_grants_page_type" DEFAULT 'landing',
  	"grant_card_id" integer,
  	"bg_type" "enum_grants_bg_type",
  	"hero_contact_email" varchar,
  	"published_at" timestamp(3) with time zone,
  	"slug" varchar,
  	"slug_lock" boolean DEFAULT true,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_grants_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "grants_locales" (
  	"hero_title" varchar,
  	"hero_subtitle" varchar,
  	"hero_contact_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "grants_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"grants_id" integer,
  	"posts_id" integer,
  	"documents_id" integer,
  	"grantcards_id" integer
  );
  
  CREATE TABLE "_grants_v_version_hero_buttons" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"link_type" "enum__grants_v_version_hero_buttons_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_download_link" boolean,
  	"link_arrow_link" boolean,
  	"link_pill_solid" boolean,
  	"link_pill_outline" boolean,
  	"link_url" varchar,
  	"link_email" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_grants_v_version_hero_buttons_locales" (
  	"link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_grants_v_blocks_scol_info_blk_col_btns" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"link_type" "enum__grants_v_blocks_scol_info_blk_col_btns_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_download_link" boolean,
  	"link_arrow_link" boolean,
  	"link_pill_solid" boolean,
  	"link_pill_outline" boolean,
  	"link_url" varchar,
  	"link_email" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_grants_v_blocks_scol_info_blk_col_btns_locales" (
  	"link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_grants_v_blocks_scol_info_blk" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_grants_v_blocks_scol_info_blk_locales" (
  	"title" varchar,
  	"desc" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_grants_v_blocks_mcol_info_block_multicols" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"add_link" boolean,
  	"link_type" "enum__grants_v_blocks_mcol_info_block_multicols_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_download_link" boolean,
  	"link_arrow_link" boolean,
  	"link_pill_solid" boolean,
  	"link_pill_outline" boolean,
  	"link_url" varchar,
  	"link_email" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_grants_v_blocks_mcol_info_block_multicols_locales" (
  	"title" varchar,
  	"col_content" varchar,
  	"link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_grants_v_blocks_mcol_info_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_grants_v_blocks_grant_card_grid_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_grants_v_blocks_grant_card_grid_block_locales" (
  	"title" varchar,
  	"desc" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_grants_v_blocks_mstep_process_steps_details" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_grants_v_blocks_mstep_process_steps_details_locales" (
  	"bullet" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_grants_v_blocks_mstep_process_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon" "enum__grants_v_blocks_mstep_process_steps_icon" DEFAULT 'FileText',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_grants_v_blocks_mstep_process_steps_locales" (
  	"step_title" varchar,
  	"title" varchar,
  	"tip" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_grants_v_blocks_mstep_process" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_grants_v_blocks_mstep_process_locales" (
  	"title" varchar,
  	"subtitle" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_grants_v_blocks_comparison_blk_lft_grp_lft_points" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_grants_v_blocks_comparison_blk_lft_grp_lft_points_locales" (
  	"point" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_grants_v_blocks_comparison_blk_rt_grp_rt_points" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_grants_v_blocks_comparison_blk_rt_grp_rt_points_locales" (
  	"point" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_grants_v_blocks_comparison_blk_buttons" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"link_type" "enum__grants_v_blocks_comparison_blk_buttons_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_download_link" boolean,
  	"link_arrow_link" boolean,
  	"link_pill_solid" boolean,
  	"link_pill_outline" boolean,
  	"link_url" varchar,
  	"link_email" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_grants_v_blocks_comparison_blk_buttons_locales" (
  	"link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_grants_v_blocks_comparison_blk" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_grants_v_blocks_comparison_blk_locales" (
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
  
  CREATE TABLE "_grants_v_blocks_ylw_deck_cards_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"link_type" "enum__grants_v_blocks_ylw_deck_cards_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_download_link" boolean,
  	"link_arrow_link" boolean,
  	"link_pill_solid" boolean,
  	"link_pill_outline" boolean,
  	"link_url" varchar,
  	"link_email" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_grants_v_blocks_ylw_deck_cards_links_locales" (
  	"desc" varchar,
  	"link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_grants_v_blocks_ylw_deck_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"mascot_id" integer,
  	"mascot_pos" "enum__grants_v_blocks_ylw_deck_cards_mascot_pos" DEFAULT 'center',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_grants_v_blocks_ylw_deck_cards_locales" (
  	"title" varchar,
  	"subtitle" varchar,
  	"desc" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_grants_v_blocks_ylw_deck" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"align" "enum__grants_v_blocks_ylw_deck_align" DEFAULT 'center',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_grants_v_blocks_ylw_deck_locales" (
  	"title" varchar,
  	"desc" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_grants_v_blocks_feat_crd_tags" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_grants_v_blocks_feat_crd_tags_locales" (
  	"tag" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_grants_v_blocks_feat_crd" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"link_type" "enum__grants_v_blocks_feat_crd_link_type" DEFAULT 'reference',
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
  
  CREATE TABLE "_grants_v_blocks_feat_crd_locales" (
  	"title" varchar,
  	"subtitle" varchar,
  	"desc" jsonb,
  	"link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_grants_v_blocks_feat_crd_acc_feat_crds" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"mascot_id" integer,
  	"crd_colour" "enum__grants_v_blocks_feat_crd_acc_feat_crds_crd_colour" DEFAULT 'forest',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_grants_v_blocks_feat_crd_acc_feat_crds_locales" (
  	"acc_title" varchar,
  	"acc_content" jsonb,
  	"crd_tag" varchar,
  	"crd_content" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_grants_v_blocks_feat_crd_acc" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_grants_v_blocks_feat_crd_acc_locales" (
  	"title" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_grants_v_blocks_list_crd_dck_cards_tags" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_grants_v_blocks_list_crd_dck_cards_tags_locales" (
  	"tag" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_grants_v_blocks_list_crd_dck_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"link_type" "enum__grants_v_blocks_list_crd_dck_cards_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_download_link" boolean,
  	"link_arrow_link" boolean,
  	"link_pill_solid" boolean,
  	"link_pill_outline" boolean,
  	"link_url" varchar,
  	"link_email" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_grants_v_blocks_list_crd_dck_cards_locales" (
  	"title" varchar,
  	"desc" varchar,
  	"link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_grants_v_blocks_list_crd_dck_buttons" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"link_type" "enum__grants_v_blocks_list_crd_dck_buttons_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_download_link" boolean,
  	"link_arrow_link" boolean,
  	"link_pill_solid" boolean,
  	"link_pill_outline" boolean,
  	"link_url" varchar,
  	"link_email" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_grants_v_blocks_list_crd_dck_buttons_locales" (
  	"link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_grants_v_blocks_list_crd_dck" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_grants_v_blocks_list_crd_dck_locales" (
  	"title" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_grants_v_blocks_faq_blk_faqs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_grants_v_blocks_faq_blk_faqs_locales" (
  	"question" varchar,
  	"answer" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_grants_v_blocks_faq_blk" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"link_type" "enum__grants_v_blocks_faq_blk_link_type" DEFAULT 'reference',
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
  
  CREATE TABLE "_grants_v_blocks_faq_blk_locales" (
  	"title" varchar,
  	"desc" varchar,
  	"link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_grants_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_title" varchar,
  	"version_page_type" "enum__grants_v_version_page_type" DEFAULT 'landing',
  	"version_grant_card_id" integer,
  	"version_bg_type" "enum__grants_v_version_bg_type",
  	"version_hero_contact_email" varchar,
  	"version_published_at" timestamp(3) with time zone,
  	"version_slug" varchar,
  	"version_slug_lock" boolean DEFAULT true,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__grants_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "enum__grants_v_published_locale",
  	"latest" boolean
  );
  
  CREATE TABLE "_grants_v_locales" (
  	"version_hero_title" varchar,
  	"version_hero_subtitle" varchar,
  	"version_hero_contact_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_grants_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"grants_id" integer,
  	"posts_id" integer,
  	"documents_id" integer,
  	"grantcards_id" integer
  );
  
  CREATE TABLE "grantcards_grant_specs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "grantcards_grant_specs_locales" (
  	"spec" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "grantcards_card_buttons" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_grantcards_card_buttons_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_download_link" boolean,
  	"link_arrow_link" boolean,
  	"link_pill_solid" boolean,
  	"link_pill_outline" boolean,
  	"link_url" varchar,
  	"link_email" varchar
  );
  
  CREATE TABLE "grantcards_card_buttons_locales" (
  	"link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "grantcards" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"badge_type" "enum_grantcards_badge_type" DEFAULT 'info',
  	"active_period" "enum_grantcards_active_period" DEFAULT 'open_all_year',
  	"start_date" timestamp(3) with time zone,
  	"end_date" timestamp(3) with time zone,
  	"card_colour" "enum_grantcards_card_colour" DEFAULT 'forest',
  	"mascot_id" integer,
  	"slug" varchar,
  	"slug_lock" boolean DEFAULT true,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_grantcards_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "grantcards_locales" (
  	"title" varchar,
  	"desc" varchar,
  	"badge_text" varchar,
  	"grant_uses" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "grantcards_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"grants_id" integer,
  	"posts_id" integer,
  	"documents_id" integer
  );
  
  CREATE TABLE "_grantcards_v_version_grant_specs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_grantcards_v_version_grant_specs_locales" (
  	"spec" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_grantcards_v_version_card_buttons" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"link_type" "enum__grantcards_v_version_card_buttons_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_download_link" boolean,
  	"link_arrow_link" boolean,
  	"link_pill_solid" boolean,
  	"link_pill_outline" boolean,
  	"link_url" varchar,
  	"link_email" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_grantcards_v_version_card_buttons_locales" (
  	"link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_grantcards_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_badge_type" "enum__grantcards_v_version_badge_type" DEFAULT 'info',
  	"version_active_period" "enum__grantcards_v_version_active_period" DEFAULT 'open_all_year',
  	"version_start_date" timestamp(3) with time zone,
  	"version_end_date" timestamp(3) with time zone,
  	"version_card_colour" "enum__grantcards_v_version_card_colour" DEFAULT 'forest',
  	"version_mascot_id" integer,
  	"version_slug" varchar,
  	"version_slug_lock" boolean DEFAULT true,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__grantcards_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "enum__grantcards_v_published_locale",
  	"latest" boolean
  );
  
  CREATE TABLE "_grantcards_v_locales" (
  	"version_title" varchar,
  	"version_desc" varchar,
  	"version_badge_text" varchar,
  	"version_grant_uses" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_grantcards_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"grants_id" integer,
  	"posts_id" integer,
  	"documents_id" integer
  );
  
  CREATE TABLE "posts_populated_authors" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar
  );
  
  CREATE TABLE "posts" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"published_at" timestamp(3) with time zone,
  	"slug" varchar,
  	"slug_lock" boolean DEFAULT true,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_posts_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "posts_locales" (
  	"title" varchar,
  	"content" jsonb,
  	"meta_title" varchar,
  	"meta_image_id" integer,
  	"meta_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "posts_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"posts_id" integer,
  	"categories_id" integer,
  	"users_id" integer
  );
  
  CREATE TABLE "_posts_v_version_populated_authors" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"name" varchar
  );
  
  CREATE TABLE "_posts_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_published_at" timestamp(3) with time zone,
  	"version_slug" varchar,
  	"version_slug_lock" boolean DEFAULT true,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__posts_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "enum__posts_v_published_locale",
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "_posts_v_locales" (
  	"version_title" varchar,
  	"version_content" jsonb,
  	"version_meta_title" varchar,
  	"version_meta_image_id" integer,
  	"version_meta_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_posts_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"posts_id" integer,
  	"categories_id" integer,
  	"users_id" integer
  );
  
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
  
  CREATE TABLE "asset_cloud" (
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
  
  CREATE TABLE "categories_breadcrumbs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"doc_id" integer,
  	"url" varchar,
  	"label" varchar
  );
  
  CREATE TABLE "categories" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"parent_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "users_sessions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"created_at" timestamp(3) with time zone,
  	"expires_at" timestamp(3) with time zone NOT NULL
  );
  
  CREATE TABLE "users" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"avatar_id" integer,
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
  
  CREATE TABLE "redirects" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"from" varchar NOT NULL,
  	"to_type" "enum_redirects_to_type" DEFAULT 'reference',
  	"to_url" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "redirects_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"posts_id" integer
  );
  
  CREATE TABLE "forms_blocks_checkbox" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"width" numeric,
  	"required" boolean,
  	"default_value" boolean,
  	"block_name" varchar
  );
  
  CREATE TABLE "forms_blocks_checkbox_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "forms_blocks_country" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"width" numeric,
  	"required" boolean,
  	"block_name" varchar
  );
  
  CREATE TABLE "forms_blocks_country_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "forms_blocks_email" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"width" numeric,
  	"required" boolean,
  	"block_name" varchar
  );
  
  CREATE TABLE "forms_blocks_email_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "forms_blocks_message" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "forms_blocks_message_locales" (
  	"message" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "forms_blocks_number" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"width" numeric,
  	"default_value" numeric,
  	"required" boolean,
  	"block_name" varchar
  );
  
  CREATE TABLE "forms_blocks_number_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "forms_blocks_select_options" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar NOT NULL
  );
  
  CREATE TABLE "forms_blocks_select_options_locales" (
  	"label" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "forms_blocks_select" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"width" numeric,
  	"placeholder" varchar,
  	"required" boolean,
  	"block_name" varchar
  );
  
  CREATE TABLE "forms_blocks_select_locales" (
  	"label" varchar,
  	"default_value" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "forms_blocks_state" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"width" numeric,
  	"required" boolean,
  	"block_name" varchar
  );
  
  CREATE TABLE "forms_blocks_state_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "forms_blocks_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"width" numeric,
  	"required" boolean,
  	"block_name" varchar
  );
  
  CREATE TABLE "forms_blocks_text_locales" (
  	"label" varchar,
  	"default_value" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "forms_blocks_textarea" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"width" numeric,
  	"required" boolean,
  	"block_name" varchar
  );
  
  CREATE TABLE "forms_blocks_textarea_locales" (
  	"label" varchar,
  	"default_value" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "forms_emails" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"email_to" varchar,
  	"cc" varchar,
  	"bcc" varchar,
  	"reply_to" varchar,
  	"email_from" varchar
  );
  
  CREATE TABLE "forms_emails_locales" (
  	"subject" varchar DEFAULT 'You''ve received a new message.' NOT NULL,
  	"message" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "forms" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"confirmation_type" "enum_forms_confirmation_type" DEFAULT 'message',
  	"redirect_url" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "forms_locales" (
  	"submit_button_label" varchar,
  	"confirmation_message" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "form_submissions_submission_data" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"field" varchar NOT NULL,
  	"value" varchar NOT NULL
  );
  
  CREATE TABLE "form_submissions" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"form_id" integer NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "search_categories" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"relation_to" varchar,
  	"title" varchar
  );
  
  CREATE TABLE "search" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"priority" numeric,
  	"slug" varchar,
  	"meta_title" varchar,
  	"meta_description" varchar,
  	"meta_image_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "search_locales" (
  	"title" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "search_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"posts_id" integer
  );
  
  CREATE TABLE "payload_locked_documents" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"global_slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"grants_id" integer,
  	"grantcards_id" integer,
  	"posts_id" integer,
  	"media_cloud_id" integer,
  	"asset_cloud_id" integer,
  	"documents_id" integer,
  	"categories_id" integer,
  	"users_id" integer,
  	"redirects_id" integer,
  	"forms_id" integer,
  	"form_submissions_id" integer,
  	"search_id" integer
  );
  
  CREATE TABLE "payload_preferences" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar,
  	"value" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_preferences_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer
  );
  
  CREATE TABLE "payload_migrations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"batch" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "homepage_hero_section_cta_button" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_homepage_hero_section_cta_button_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_download_link" boolean,
  	"link_arrow_link" boolean,
  	"link_pill_solid" boolean,
  	"link_pill_outline" boolean,
  	"link_url" varchar,
  	"link_email" varchar
  );
  
  CREATE TABLE "homepage_hero_section_cta_button_locales" (
  	"link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "homepage_blocks_secondarycta_cta_button" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_homepage_blocks_secondarycta_cta_button_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_download_link" boolean,
  	"link_arrow_link" boolean,
  	"link_pill_solid" boolean,
  	"link_pill_outline" boolean,
  	"link_url" varchar,
  	"link_email" varchar
  );
  
  CREATE TABLE "homepage_blocks_secondarycta_cta_button_locales" (
  	"link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "homepage_blocks_secondarycta" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"contact_email" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "homepage_blocks_secondarycta_locales" (
  	"cta_title" varchar,
  	"cta_subtitle" varchar,
  	"contact_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "homepage_blocks_mcol_info_block_multicols" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"add_link" boolean,
  	"link_type" "enum_homepage_blocks_mcol_info_block_multicols_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_download_link" boolean,
  	"link_arrow_link" boolean,
  	"link_pill_solid" boolean,
  	"link_pill_outline" boolean,
  	"link_url" varchar,
  	"link_email" varchar
  );
  
  CREATE TABLE "homepage_blocks_mcol_info_block_multicols_locales" (
  	"title" varchar,
  	"col_content" varchar,
  	"link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "homepage_blocks_mcol_info_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "homepage_blocks_grant_card_grid_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "homepage_blocks_grant_card_grid_block_locales" (
  	"title" varchar,
  	"desc" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "homepage_blocks_mstep_process_steps_details" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "homepage_blocks_mstep_process_steps_details_locales" (
  	"bullet" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "homepage_blocks_mstep_process_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" "enum_homepage_blocks_mstep_process_steps_icon" DEFAULT 'FileText'
  );
  
  CREATE TABLE "homepage_blocks_mstep_process_steps_locales" (
  	"step_title" varchar,
  	"title" varchar,
  	"tip" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "homepage_blocks_mstep_process" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "homepage_blocks_mstep_process_locales" (
  	"title" varchar,
  	"subtitle" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "homepage_blocks_comparison_blk_lft_grp_lft_points" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "homepage_blocks_comparison_blk_lft_grp_lft_points_locales" (
  	"point" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "homepage_blocks_comparison_blk_rt_grp_rt_points" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "homepage_blocks_comparison_blk_rt_grp_rt_points_locales" (
  	"point" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "homepage_blocks_comparison_blk_buttons" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_homepage_blocks_comparison_blk_buttons_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_download_link" boolean,
  	"link_arrow_link" boolean,
  	"link_pill_solid" boolean,
  	"link_pill_outline" boolean,
  	"link_url" varchar,
  	"link_email" varchar
  );
  
  CREATE TABLE "homepage_blocks_comparison_blk_buttons_locales" (
  	"link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "homepage_blocks_comparison_blk" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "homepage_blocks_comparison_blk_locales" (
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
  
  CREATE TABLE "homepage_blocks_ylw_deck_cards_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_homepage_blocks_ylw_deck_cards_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_download_link" boolean,
  	"link_arrow_link" boolean,
  	"link_pill_solid" boolean,
  	"link_pill_outline" boolean,
  	"link_url" varchar,
  	"link_email" varchar
  );
  
  CREATE TABLE "homepage_blocks_ylw_deck_cards_links_locales" (
  	"desc" varchar,
  	"link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "homepage_blocks_ylw_deck_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"mascot_id" integer,
  	"mascot_pos" "enum_homepage_blocks_ylw_deck_cards_mascot_pos" DEFAULT 'center'
  );
  
  CREATE TABLE "homepage_blocks_ylw_deck_cards_locales" (
  	"title" varchar,
  	"subtitle" varchar,
  	"desc" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "homepage_blocks_ylw_deck" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"align" "enum_homepage_blocks_ylw_deck_align" DEFAULT 'center',
  	"block_name" varchar
  );
  
  CREATE TABLE "homepage_blocks_ylw_deck_locales" (
  	"title" varchar,
  	"desc" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "homepage_blocks_feat_crd_tags" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "homepage_blocks_feat_crd_tags_locales" (
  	"tag" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "homepage_blocks_feat_crd" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"link_type" "enum_homepage_blocks_feat_crd_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_download_link" boolean,
  	"link_arrow_link" boolean,
  	"link_pill_solid" boolean,
  	"link_pill_outline" boolean,
  	"link_url" varchar,
  	"link_email" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "homepage_blocks_feat_crd_locales" (
  	"title" varchar,
  	"subtitle" varchar,
  	"desc" jsonb,
  	"link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "homepage_blocks_feat_crd_acc_feat_crds" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"mascot_id" integer,
  	"crd_colour" "enum_homepage_blocks_feat_crd_acc_feat_crds_crd_colour" DEFAULT 'forest'
  );
  
  CREATE TABLE "homepage_blocks_feat_crd_acc_feat_crds_locales" (
  	"acc_title" varchar,
  	"acc_content" jsonb,
  	"crd_tag" varchar,
  	"crd_content" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "homepage_blocks_feat_crd_acc" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "homepage_blocks_feat_crd_acc_locales" (
  	"title" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "homepage_blocks_list_crd_dck_cards_tags" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "homepage_blocks_list_crd_dck_cards_tags_locales" (
  	"tag" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "homepage_blocks_list_crd_dck_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"link_type" "enum_homepage_blocks_list_crd_dck_cards_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_download_link" boolean,
  	"link_arrow_link" boolean,
  	"link_pill_solid" boolean,
  	"link_pill_outline" boolean,
  	"link_url" varchar,
  	"link_email" varchar
  );
  
  CREATE TABLE "homepage_blocks_list_crd_dck_cards_locales" (
  	"title" varchar,
  	"desc" varchar,
  	"link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "homepage_blocks_list_crd_dck_buttons" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_homepage_blocks_list_crd_dck_buttons_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_download_link" boolean,
  	"link_arrow_link" boolean,
  	"link_pill_solid" boolean,
  	"link_pill_outline" boolean,
  	"link_url" varchar,
  	"link_email" varchar
  );
  
  CREATE TABLE "homepage_blocks_list_crd_dck_buttons_locales" (
  	"link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "homepage_blocks_list_crd_dck" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "homepage_blocks_list_crd_dck_locales" (
  	"title" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "homepage_blocks_faq_blk_faqs" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "homepage_blocks_faq_blk_faqs_locales" (
  	"question" varchar,
  	"answer" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "homepage_blocks_faq_blk" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_homepage_blocks_faq_blk_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_download_link" boolean,
  	"link_arrow_link" boolean,
  	"link_pill_solid" boolean,
  	"link_pill_outline" boolean,
  	"link_url" varchar,
  	"link_email" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "homepage_blocks_faq_blk_locales" (
  	"title" varchar,
  	"desc" varchar,
  	"link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "homepage" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"_status" "enum_homepage_status" DEFAULT 'draft',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "homepage_locales" (
  	"hero_section_hero_title" varchar,
  	"hero_section_hero_subtitle" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "homepage_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"grants_id" integer,
  	"posts_id" integer,
  	"documents_id" integer,
  	"grantcards_id" integer
  );
  
  CREATE TABLE "_homepage_v_version_hero_section_cta_button" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"link_type" "enum__homepage_v_version_hero_section_cta_button_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_download_link" boolean,
  	"link_arrow_link" boolean,
  	"link_pill_solid" boolean,
  	"link_pill_outline" boolean,
  	"link_url" varchar,
  	"link_email" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_homepage_v_version_hero_section_cta_button_locales" (
  	"link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_homepage_v_blocks_secondarycta_cta_button" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"link_type" "enum__homepage_v_blocks_secondarycta_cta_button_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_download_link" boolean,
  	"link_arrow_link" boolean,
  	"link_pill_solid" boolean,
  	"link_pill_outline" boolean,
  	"link_url" varchar,
  	"link_email" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_homepage_v_blocks_secondarycta_cta_button_locales" (
  	"link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_homepage_v_blocks_secondarycta" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"contact_email" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_homepage_v_blocks_secondarycta_locales" (
  	"cta_title" varchar,
  	"cta_subtitle" varchar,
  	"contact_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_homepage_v_blocks_mcol_info_block_multicols" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"add_link" boolean,
  	"link_type" "enum__homepage_v_blocks_mcol_info_block_multicols_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_download_link" boolean,
  	"link_arrow_link" boolean,
  	"link_pill_solid" boolean,
  	"link_pill_outline" boolean,
  	"link_url" varchar,
  	"link_email" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_homepage_v_blocks_mcol_info_block_multicols_locales" (
  	"title" varchar,
  	"col_content" varchar,
  	"link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_homepage_v_blocks_mcol_info_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_homepage_v_blocks_grant_card_grid_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_homepage_v_blocks_grant_card_grid_block_locales" (
  	"title" varchar,
  	"desc" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_homepage_v_blocks_mstep_process_steps_details" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_homepage_v_blocks_mstep_process_steps_details_locales" (
  	"bullet" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_homepage_v_blocks_mstep_process_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon" "enum__homepage_v_blocks_mstep_process_steps_icon" DEFAULT 'FileText',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_homepage_v_blocks_mstep_process_steps_locales" (
  	"step_title" varchar,
  	"title" varchar,
  	"tip" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_homepage_v_blocks_mstep_process" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_homepage_v_blocks_mstep_process_locales" (
  	"title" varchar,
  	"subtitle" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_homepage_v_blocks_comparison_blk_lft_grp_lft_points" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_homepage_v_blocks_comparison_blk_lft_grp_lft_points_locales" (
  	"point" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_homepage_v_blocks_comparison_blk_rt_grp_rt_points" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_homepage_v_blocks_comparison_blk_rt_grp_rt_points_locales" (
  	"point" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_homepage_v_blocks_comparison_blk_buttons" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"link_type" "enum__homepage_v_blocks_comparison_blk_buttons_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_download_link" boolean,
  	"link_arrow_link" boolean,
  	"link_pill_solid" boolean,
  	"link_pill_outline" boolean,
  	"link_url" varchar,
  	"link_email" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_homepage_v_blocks_comparison_blk_buttons_locales" (
  	"link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_homepage_v_blocks_comparison_blk" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_homepage_v_blocks_comparison_blk_locales" (
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
  
  CREATE TABLE "_homepage_v_blocks_ylw_deck_cards_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"link_type" "enum__homepage_v_blocks_ylw_deck_cards_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_download_link" boolean,
  	"link_arrow_link" boolean,
  	"link_pill_solid" boolean,
  	"link_pill_outline" boolean,
  	"link_url" varchar,
  	"link_email" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_homepage_v_blocks_ylw_deck_cards_links_locales" (
  	"desc" varchar,
  	"link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_homepage_v_blocks_ylw_deck_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"mascot_id" integer,
  	"mascot_pos" "enum__homepage_v_blocks_ylw_deck_cards_mascot_pos" DEFAULT 'center',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_homepage_v_blocks_ylw_deck_cards_locales" (
  	"title" varchar,
  	"subtitle" varchar,
  	"desc" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_homepage_v_blocks_ylw_deck" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"align" "enum__homepage_v_blocks_ylw_deck_align" DEFAULT 'center',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_homepage_v_blocks_ylw_deck_locales" (
  	"title" varchar,
  	"desc" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_homepage_v_blocks_feat_crd_tags" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_homepage_v_blocks_feat_crd_tags_locales" (
  	"tag" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_homepage_v_blocks_feat_crd" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"link_type" "enum__homepage_v_blocks_feat_crd_link_type" DEFAULT 'reference',
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
  
  CREATE TABLE "_homepage_v_blocks_feat_crd_locales" (
  	"title" varchar,
  	"subtitle" varchar,
  	"desc" jsonb,
  	"link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_homepage_v_blocks_feat_crd_acc_feat_crds" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"mascot_id" integer,
  	"crd_colour" "enum__homepage_v_blocks_feat_crd_acc_feat_crds_crd_colour" DEFAULT 'forest',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_homepage_v_blocks_feat_crd_acc_feat_crds_locales" (
  	"acc_title" varchar,
  	"acc_content" jsonb,
  	"crd_tag" varchar,
  	"crd_content" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_homepage_v_blocks_feat_crd_acc" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_homepage_v_blocks_feat_crd_acc_locales" (
  	"title" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_homepage_v_blocks_list_crd_dck_cards_tags" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_homepage_v_blocks_list_crd_dck_cards_tags_locales" (
  	"tag" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_homepage_v_blocks_list_crd_dck_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"link_type" "enum__homepage_v_blocks_list_crd_dck_cards_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_download_link" boolean,
  	"link_arrow_link" boolean,
  	"link_pill_solid" boolean,
  	"link_pill_outline" boolean,
  	"link_url" varchar,
  	"link_email" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_homepage_v_blocks_list_crd_dck_cards_locales" (
  	"title" varchar,
  	"desc" varchar,
  	"link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_homepage_v_blocks_list_crd_dck_buttons" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"link_type" "enum__homepage_v_blocks_list_crd_dck_buttons_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_download_link" boolean,
  	"link_arrow_link" boolean,
  	"link_pill_solid" boolean,
  	"link_pill_outline" boolean,
  	"link_url" varchar,
  	"link_email" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_homepage_v_blocks_list_crd_dck_buttons_locales" (
  	"link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_homepage_v_blocks_list_crd_dck" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_homepage_v_blocks_list_crd_dck_locales" (
  	"title" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_homepage_v_blocks_faq_blk_faqs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_homepage_v_blocks_faq_blk_faqs_locales" (
  	"question" varchar,
  	"answer" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_homepage_v_blocks_faq_blk" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"link_type" "enum__homepage_v_blocks_faq_blk_link_type" DEFAULT 'reference',
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
  
  CREATE TABLE "_homepage_v_blocks_faq_blk_locales" (
  	"title" varchar,
  	"desc" varchar,
  	"link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_homepage_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version__status" "enum__homepage_v_version_status" DEFAULT 'draft',
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "enum__homepage_v_published_locale",
  	"latest" boolean
  );
  
  CREATE TABLE "_homepage_v_locales" (
  	"version_hero_section_hero_title" varchar,
  	"version_hero_section_hero_subtitle" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_homepage_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"grants_id" integer,
  	"posts_id" integer,
  	"documents_id" integer,
  	"grantcards_id" integer
  );
  
  CREATE TABLE "header_languages" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum_header_languages",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "header" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"logo_id" integer,
  	"search_enabled" boolean DEFAULT true,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "footer_sm_links_group_sm_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"sm_type" "enum_footer_sm_links_group_sm_links_sm_type",
  	"url" varchar NOT NULL
  );
  
  CREATE TABLE "footer" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"logo_id" integer,
  	"newsletter_sub_url" varchar DEFAULT 'https://list.uafanp.org/subscription/form',
  	"donate_c_t_a_url" varchar DEFAULT 'https://example.com/donate' NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "footer_locales" (
  	"org_name" varchar DEFAULT 'Urgent Action Fund Asia Pacific' NOT NULL,
  	"newsletter_sub_description" varchar DEFAULT 'Subscribe to our newsletter.',
  	"newsletter_sub_input_placeholder" varchar DEFAULT 'Enter your email',
  	"newsletter_sub_button_text" varchar DEFAULT 'Subscribe',
  	"donate_c_t_a_heading" varchar DEFAULT 'Your support powers Urgent Action' NOT NULL,
  	"donate_c_t_a_description" varchar DEFAULT 'Every contribution - big or small - fuels safety, resilience, and justice.' NOT NULL,
  	"donate_c_t_a_button_text" varchar DEFAULT 'Donate' NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "nav_menu_items_nav_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_nav_menu_items_nav_items_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_download_link" boolean,
  	"link_arrow_link" boolean,
  	"link_pill_solid" boolean,
  	"link_pill_outline" boolean,
  	"link_url" varchar,
  	"link_email" varchar
  );
  
  CREATE TABLE "nav_menu_items_nav_items_locales" (
  	"link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "nav_menu_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "nav_menu_items_locales" (
  	"label" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "nav" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "nav_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"grants_id" integer,
  	"posts_id" integer,
  	"documents_id" integer
  );
  
  CREATE TABLE "contact_info_emails" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"email" varchar NOT NULL,
  	"email_type" "enum_contact_info_emails_email_type" DEFAULT 'info' NOT NULL
  );
  
  CREATE TABLE "contact_info_emails_locales" (
  	"label" varchar DEFAULT 'Contact Us' NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "contact_info" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  ALTER TABLE "grants_hero_buttons" ADD CONSTRAINT "grants_hero_buttons_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."grants"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "grants_hero_buttons_locales" ADD CONSTRAINT "grants_hero_buttons_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."grants_hero_buttons"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "grants_blocks_scol_info_blk_col_btns" ADD CONSTRAINT "grants_blocks_scol_info_blk_col_btns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."grants_blocks_scol_info_blk"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "grants_blocks_scol_info_blk_col_btns_locales" ADD CONSTRAINT "grants_blocks_scol_info_blk_col_btns_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."grants_blocks_scol_info_blk_col_btns"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "grants_blocks_scol_info_blk" ADD CONSTRAINT "grants_blocks_scol_info_blk_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."grants"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "grants_blocks_scol_info_blk_locales" ADD CONSTRAINT "grants_blocks_scol_info_blk_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."grants_blocks_scol_info_blk"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "grants_blocks_mcol_info_block_multicols" ADD CONSTRAINT "grants_blocks_mcol_info_block_multicols_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."grants_blocks_mcol_info_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "grants_blocks_mcol_info_block_multicols_locales" ADD CONSTRAINT "grants_blocks_mcol_info_block_multicols_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."grants_blocks_mcol_info_block_multicols"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "grants_blocks_mcol_info_block" ADD CONSTRAINT "grants_blocks_mcol_info_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."grants"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "grants_blocks_grant_card_grid_block" ADD CONSTRAINT "grants_blocks_grant_card_grid_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."grants"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "grants_blocks_grant_card_grid_block_locales" ADD CONSTRAINT "grants_blocks_grant_card_grid_block_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."grants_blocks_grant_card_grid_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "grants_blocks_mstep_process_steps_details" ADD CONSTRAINT "grants_blocks_mstep_process_steps_details_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."grants_blocks_mstep_process_steps"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "grants_blocks_mstep_process_steps_details_locales" ADD CONSTRAINT "grants_blocks_mstep_process_steps_details_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."grants_blocks_mstep_process_steps_details"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "grants_blocks_mstep_process_steps" ADD CONSTRAINT "grants_blocks_mstep_process_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."grants_blocks_mstep_process"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "grants_blocks_mstep_process_steps_locales" ADD CONSTRAINT "grants_blocks_mstep_process_steps_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."grants_blocks_mstep_process_steps"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "grants_blocks_mstep_process" ADD CONSTRAINT "grants_blocks_mstep_process_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."grants"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "grants_blocks_mstep_process_locales" ADD CONSTRAINT "grants_blocks_mstep_process_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."grants_blocks_mstep_process"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "grants_blocks_comparison_blk_lft_grp_lft_points" ADD CONSTRAINT "grants_blocks_comparison_blk_lft_grp_lft_points_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."grants_blocks_comparison_blk"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "grants_blocks_comparison_blk_lft_grp_lft_points_locales" ADD CONSTRAINT "grants_blocks_comparison_blk_lft_grp_lft_points_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."grants_blocks_comparison_blk_lft_grp_lft_points"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "grants_blocks_comparison_blk_rt_grp_rt_points" ADD CONSTRAINT "grants_blocks_comparison_blk_rt_grp_rt_points_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."grants_blocks_comparison_blk"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "grants_blocks_comparison_blk_rt_grp_rt_points_locales" ADD CONSTRAINT "grants_blocks_comparison_blk_rt_grp_rt_points_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."grants_blocks_comparison_blk_rt_grp_rt_points"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "grants_blocks_comparison_blk_buttons" ADD CONSTRAINT "grants_blocks_comparison_blk_buttons_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."grants_blocks_comparison_blk"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "grants_blocks_comparison_blk_buttons_locales" ADD CONSTRAINT "grants_blocks_comparison_blk_buttons_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."grants_blocks_comparison_blk_buttons"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "grants_blocks_comparison_blk" ADD CONSTRAINT "grants_blocks_comparison_blk_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."grants"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "grants_blocks_comparison_blk_locales" ADD CONSTRAINT "grants_blocks_comparison_blk_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."grants_blocks_comparison_blk"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "grants_blocks_ylw_deck_cards_links" ADD CONSTRAINT "grants_blocks_ylw_deck_cards_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."grants_blocks_ylw_deck_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "grants_blocks_ylw_deck_cards_links_locales" ADD CONSTRAINT "grants_blocks_ylw_deck_cards_links_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."grants_blocks_ylw_deck_cards_links"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "grants_blocks_ylw_deck_cards" ADD CONSTRAINT "grants_blocks_ylw_deck_cards_mascot_id_asset_cloud_id_fk" FOREIGN KEY ("mascot_id") REFERENCES "public"."asset_cloud"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "grants_blocks_ylw_deck_cards" ADD CONSTRAINT "grants_blocks_ylw_deck_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."grants_blocks_ylw_deck"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "grants_blocks_ylw_deck_cards_locales" ADD CONSTRAINT "grants_blocks_ylw_deck_cards_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."grants_blocks_ylw_deck_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "grants_blocks_ylw_deck" ADD CONSTRAINT "grants_blocks_ylw_deck_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."grants"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "grants_blocks_ylw_deck_locales" ADD CONSTRAINT "grants_blocks_ylw_deck_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."grants_blocks_ylw_deck"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "grants_blocks_feat_crd_tags" ADD CONSTRAINT "grants_blocks_feat_crd_tags_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."grants_blocks_feat_crd"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "grants_blocks_feat_crd_tags_locales" ADD CONSTRAINT "grants_blocks_feat_crd_tags_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."grants_blocks_feat_crd_tags"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "grants_blocks_feat_crd" ADD CONSTRAINT "grants_blocks_feat_crd_image_id_media_cloud_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media_cloud"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "grants_blocks_feat_crd" ADD CONSTRAINT "grants_blocks_feat_crd_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."grants"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "grants_blocks_feat_crd_locales" ADD CONSTRAINT "grants_blocks_feat_crd_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."grants_blocks_feat_crd"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "grants_blocks_feat_crd_acc_feat_crds" ADD CONSTRAINT "grants_blocks_feat_crd_acc_feat_crds_mascot_id_asset_cloud_id_fk" FOREIGN KEY ("mascot_id") REFERENCES "public"."asset_cloud"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "grants_blocks_feat_crd_acc_feat_crds" ADD CONSTRAINT "grants_blocks_feat_crd_acc_feat_crds_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."grants_blocks_feat_crd_acc"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "grants_blocks_feat_crd_acc_feat_crds_locales" ADD CONSTRAINT "grants_blocks_feat_crd_acc_feat_crds_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."grants_blocks_feat_crd_acc_feat_crds"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "grants_blocks_feat_crd_acc" ADD CONSTRAINT "grants_blocks_feat_crd_acc_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."grants"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "grants_blocks_feat_crd_acc_locales" ADD CONSTRAINT "grants_blocks_feat_crd_acc_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."grants_blocks_feat_crd_acc"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "grants_blocks_list_crd_dck_cards_tags" ADD CONSTRAINT "grants_blocks_list_crd_dck_cards_tags_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."grants_blocks_list_crd_dck_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "grants_blocks_list_crd_dck_cards_tags_locales" ADD CONSTRAINT "grants_blocks_list_crd_dck_cards_tags_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."grants_blocks_list_crd_dck_cards_tags"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "grants_blocks_list_crd_dck_cards" ADD CONSTRAINT "grants_blocks_list_crd_dck_cards_image_id_media_cloud_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media_cloud"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "grants_blocks_list_crd_dck_cards" ADD CONSTRAINT "grants_blocks_list_crd_dck_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."grants_blocks_list_crd_dck"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "grants_blocks_list_crd_dck_cards_locales" ADD CONSTRAINT "grants_blocks_list_crd_dck_cards_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."grants_blocks_list_crd_dck_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "grants_blocks_list_crd_dck_buttons" ADD CONSTRAINT "grants_blocks_list_crd_dck_buttons_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."grants_blocks_list_crd_dck"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "grants_blocks_list_crd_dck_buttons_locales" ADD CONSTRAINT "grants_blocks_list_crd_dck_buttons_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."grants_blocks_list_crd_dck_buttons"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "grants_blocks_list_crd_dck" ADD CONSTRAINT "grants_blocks_list_crd_dck_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."grants"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "grants_blocks_list_crd_dck_locales" ADD CONSTRAINT "grants_blocks_list_crd_dck_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."grants_blocks_list_crd_dck"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "grants_blocks_faq_blk_faqs" ADD CONSTRAINT "grants_blocks_faq_blk_faqs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."grants_blocks_faq_blk"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "grants_blocks_faq_blk_faqs_locales" ADD CONSTRAINT "grants_blocks_faq_blk_faqs_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."grants_blocks_faq_blk_faqs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "grants_blocks_faq_blk" ADD CONSTRAINT "grants_blocks_faq_blk_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."grants"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "grants_blocks_faq_blk_locales" ADD CONSTRAINT "grants_blocks_faq_blk_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."grants_blocks_faq_blk"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "grants" ADD CONSTRAINT "grants_grant_card_id_grantcards_id_fk" FOREIGN KEY ("grant_card_id") REFERENCES "public"."grantcards"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "grants_locales" ADD CONSTRAINT "grants_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."grants"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "grants_rels" ADD CONSTRAINT "grants_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."grants"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "grants_rels" ADD CONSTRAINT "grants_rels_grants_fk" FOREIGN KEY ("grants_id") REFERENCES "public"."grants"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "grants_rels" ADD CONSTRAINT "grants_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "grants_rels" ADD CONSTRAINT "grants_rels_documents_fk" FOREIGN KEY ("documents_id") REFERENCES "public"."documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "grants_rels" ADD CONSTRAINT "grants_rels_grantcards_fk" FOREIGN KEY ("grantcards_id") REFERENCES "public"."grantcards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_grants_v_version_hero_buttons" ADD CONSTRAINT "_grants_v_version_hero_buttons_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_grants_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_grants_v_version_hero_buttons_locales" ADD CONSTRAINT "_grants_v_version_hero_buttons_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_grants_v_version_hero_buttons"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_grants_v_blocks_scol_info_blk_col_btns" ADD CONSTRAINT "_grants_v_blocks_scol_info_blk_col_btns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_grants_v_blocks_scol_info_blk"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_grants_v_blocks_scol_info_blk_col_btns_locales" ADD CONSTRAINT "_grants_v_blocks_scol_info_blk_col_btns_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_grants_v_blocks_scol_info_blk_col_btns"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_grants_v_blocks_scol_info_blk" ADD CONSTRAINT "_grants_v_blocks_scol_info_blk_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_grants_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_grants_v_blocks_scol_info_blk_locales" ADD CONSTRAINT "_grants_v_blocks_scol_info_blk_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_grants_v_blocks_scol_info_blk"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_grants_v_blocks_mcol_info_block_multicols" ADD CONSTRAINT "_grants_v_blocks_mcol_info_block_multicols_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_grants_v_blocks_mcol_info_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_grants_v_blocks_mcol_info_block_multicols_locales" ADD CONSTRAINT "_grants_v_blocks_mcol_info_block_multicols_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_grants_v_blocks_mcol_info_block_multicols"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_grants_v_blocks_mcol_info_block" ADD CONSTRAINT "_grants_v_blocks_mcol_info_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_grants_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_grants_v_blocks_grant_card_grid_block" ADD CONSTRAINT "_grants_v_blocks_grant_card_grid_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_grants_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_grants_v_blocks_grant_card_grid_block_locales" ADD CONSTRAINT "_grants_v_blocks_grant_card_grid_block_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_grants_v_blocks_grant_card_grid_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_grants_v_blocks_mstep_process_steps_details" ADD CONSTRAINT "_grants_v_blocks_mstep_process_steps_details_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_grants_v_blocks_mstep_process_steps"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_grants_v_blocks_mstep_process_steps_details_locales" ADD CONSTRAINT "_grants_v_blocks_mstep_process_steps_details_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_grants_v_blocks_mstep_process_steps_details"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_grants_v_blocks_mstep_process_steps" ADD CONSTRAINT "_grants_v_blocks_mstep_process_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_grants_v_blocks_mstep_process"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_grants_v_blocks_mstep_process_steps_locales" ADD CONSTRAINT "_grants_v_blocks_mstep_process_steps_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_grants_v_blocks_mstep_process_steps"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_grants_v_blocks_mstep_process" ADD CONSTRAINT "_grants_v_blocks_mstep_process_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_grants_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_grants_v_blocks_mstep_process_locales" ADD CONSTRAINT "_grants_v_blocks_mstep_process_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_grants_v_blocks_mstep_process"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_grants_v_blocks_comparison_blk_lft_grp_lft_points" ADD CONSTRAINT "_grants_v_blocks_comparison_blk_lft_grp_lft_points_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_grants_v_blocks_comparison_blk"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_grants_v_blocks_comparison_blk_lft_grp_lft_points_locales" ADD CONSTRAINT "_grants_v_blocks_comparison_blk_lft_grp_lft_points_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_grants_v_blocks_comparison_blk_lft_grp_lft_points"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_grants_v_blocks_comparison_blk_rt_grp_rt_points" ADD CONSTRAINT "_grants_v_blocks_comparison_blk_rt_grp_rt_points_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_grants_v_blocks_comparison_blk"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_grants_v_blocks_comparison_blk_rt_grp_rt_points_locales" ADD CONSTRAINT "_grants_v_blocks_comparison_blk_rt_grp_rt_points_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_grants_v_blocks_comparison_blk_rt_grp_rt_points"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_grants_v_blocks_comparison_blk_buttons" ADD CONSTRAINT "_grants_v_blocks_comparison_blk_buttons_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_grants_v_blocks_comparison_blk"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_grants_v_blocks_comparison_blk_buttons_locales" ADD CONSTRAINT "_grants_v_blocks_comparison_blk_buttons_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_grants_v_blocks_comparison_blk_buttons"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_grants_v_blocks_comparison_blk" ADD CONSTRAINT "_grants_v_blocks_comparison_blk_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_grants_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_grants_v_blocks_comparison_blk_locales" ADD CONSTRAINT "_grants_v_blocks_comparison_blk_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_grants_v_blocks_comparison_blk"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_grants_v_blocks_ylw_deck_cards_links" ADD CONSTRAINT "_grants_v_blocks_ylw_deck_cards_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_grants_v_blocks_ylw_deck_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_grants_v_blocks_ylw_deck_cards_links_locales" ADD CONSTRAINT "_grants_v_blocks_ylw_deck_cards_links_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_grants_v_blocks_ylw_deck_cards_links"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_grants_v_blocks_ylw_deck_cards" ADD CONSTRAINT "_grants_v_blocks_ylw_deck_cards_mascot_id_asset_cloud_id_fk" FOREIGN KEY ("mascot_id") REFERENCES "public"."asset_cloud"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_grants_v_blocks_ylw_deck_cards" ADD CONSTRAINT "_grants_v_blocks_ylw_deck_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_grants_v_blocks_ylw_deck"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_grants_v_blocks_ylw_deck_cards_locales" ADD CONSTRAINT "_grants_v_blocks_ylw_deck_cards_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_grants_v_blocks_ylw_deck_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_grants_v_blocks_ylw_deck" ADD CONSTRAINT "_grants_v_blocks_ylw_deck_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_grants_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_grants_v_blocks_ylw_deck_locales" ADD CONSTRAINT "_grants_v_blocks_ylw_deck_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_grants_v_blocks_ylw_deck"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_grants_v_blocks_feat_crd_tags" ADD CONSTRAINT "_grants_v_blocks_feat_crd_tags_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_grants_v_blocks_feat_crd"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_grants_v_blocks_feat_crd_tags_locales" ADD CONSTRAINT "_grants_v_blocks_feat_crd_tags_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_grants_v_blocks_feat_crd_tags"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_grants_v_blocks_feat_crd" ADD CONSTRAINT "_grants_v_blocks_feat_crd_image_id_media_cloud_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media_cloud"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_grants_v_blocks_feat_crd" ADD CONSTRAINT "_grants_v_blocks_feat_crd_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_grants_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_grants_v_blocks_feat_crd_locales" ADD CONSTRAINT "_grants_v_blocks_feat_crd_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_grants_v_blocks_feat_crd"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_grants_v_blocks_feat_crd_acc_feat_crds" ADD CONSTRAINT "_grants_v_blocks_feat_crd_acc_feat_crds_mascot_id_asset_cloud_id_fk" FOREIGN KEY ("mascot_id") REFERENCES "public"."asset_cloud"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_grants_v_blocks_feat_crd_acc_feat_crds" ADD CONSTRAINT "_grants_v_blocks_feat_crd_acc_feat_crds_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_grants_v_blocks_feat_crd_acc"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_grants_v_blocks_feat_crd_acc_feat_crds_locales" ADD CONSTRAINT "_grants_v_blocks_feat_crd_acc_feat_crds_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_grants_v_blocks_feat_crd_acc_feat_crds"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_grants_v_blocks_feat_crd_acc" ADD CONSTRAINT "_grants_v_blocks_feat_crd_acc_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_grants_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_grants_v_blocks_feat_crd_acc_locales" ADD CONSTRAINT "_grants_v_blocks_feat_crd_acc_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_grants_v_blocks_feat_crd_acc"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_grants_v_blocks_list_crd_dck_cards_tags" ADD CONSTRAINT "_grants_v_blocks_list_crd_dck_cards_tags_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_grants_v_blocks_list_crd_dck_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_grants_v_blocks_list_crd_dck_cards_tags_locales" ADD CONSTRAINT "_grants_v_blocks_list_crd_dck_cards_tags_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_grants_v_blocks_list_crd_dck_cards_tags"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_grants_v_blocks_list_crd_dck_cards" ADD CONSTRAINT "_grants_v_blocks_list_crd_dck_cards_image_id_media_cloud_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media_cloud"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_grants_v_blocks_list_crd_dck_cards" ADD CONSTRAINT "_grants_v_blocks_list_crd_dck_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_grants_v_blocks_list_crd_dck"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_grants_v_blocks_list_crd_dck_cards_locales" ADD CONSTRAINT "_grants_v_blocks_list_crd_dck_cards_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_grants_v_blocks_list_crd_dck_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_grants_v_blocks_list_crd_dck_buttons" ADD CONSTRAINT "_grants_v_blocks_list_crd_dck_buttons_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_grants_v_blocks_list_crd_dck"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_grants_v_blocks_list_crd_dck_buttons_locales" ADD CONSTRAINT "_grants_v_blocks_list_crd_dck_buttons_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_grants_v_blocks_list_crd_dck_buttons"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_grants_v_blocks_list_crd_dck" ADD CONSTRAINT "_grants_v_blocks_list_crd_dck_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_grants_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_grants_v_blocks_list_crd_dck_locales" ADD CONSTRAINT "_grants_v_blocks_list_crd_dck_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_grants_v_blocks_list_crd_dck"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_grants_v_blocks_faq_blk_faqs" ADD CONSTRAINT "_grants_v_blocks_faq_blk_faqs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_grants_v_blocks_faq_blk"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_grants_v_blocks_faq_blk_faqs_locales" ADD CONSTRAINT "_grants_v_blocks_faq_blk_faqs_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_grants_v_blocks_faq_blk_faqs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_grants_v_blocks_faq_blk" ADD CONSTRAINT "_grants_v_blocks_faq_blk_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_grants_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_grants_v_blocks_faq_blk_locales" ADD CONSTRAINT "_grants_v_blocks_faq_blk_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_grants_v_blocks_faq_blk"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_grants_v" ADD CONSTRAINT "_grants_v_parent_id_grants_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."grants"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_grants_v" ADD CONSTRAINT "_grants_v_version_grant_card_id_grantcards_id_fk" FOREIGN KEY ("version_grant_card_id") REFERENCES "public"."grantcards"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_grants_v_locales" ADD CONSTRAINT "_grants_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_grants_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_grants_v_rels" ADD CONSTRAINT "_grants_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_grants_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_grants_v_rels" ADD CONSTRAINT "_grants_v_rels_grants_fk" FOREIGN KEY ("grants_id") REFERENCES "public"."grants"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_grants_v_rels" ADD CONSTRAINT "_grants_v_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_grants_v_rels" ADD CONSTRAINT "_grants_v_rels_documents_fk" FOREIGN KEY ("documents_id") REFERENCES "public"."documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_grants_v_rels" ADD CONSTRAINT "_grants_v_rels_grantcards_fk" FOREIGN KEY ("grantcards_id") REFERENCES "public"."grantcards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "grantcards_grant_specs" ADD CONSTRAINT "grantcards_grant_specs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."grantcards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "grantcards_grant_specs_locales" ADD CONSTRAINT "grantcards_grant_specs_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."grantcards_grant_specs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "grantcards_card_buttons" ADD CONSTRAINT "grantcards_card_buttons_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."grantcards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "grantcards_card_buttons_locales" ADD CONSTRAINT "grantcards_card_buttons_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."grantcards_card_buttons"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "grantcards" ADD CONSTRAINT "grantcards_mascot_id_asset_cloud_id_fk" FOREIGN KEY ("mascot_id") REFERENCES "public"."asset_cloud"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "grantcards_locales" ADD CONSTRAINT "grantcards_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."grantcards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "grantcards_rels" ADD CONSTRAINT "grantcards_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."grantcards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "grantcards_rels" ADD CONSTRAINT "grantcards_rels_grants_fk" FOREIGN KEY ("grants_id") REFERENCES "public"."grants"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "grantcards_rels" ADD CONSTRAINT "grantcards_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "grantcards_rels" ADD CONSTRAINT "grantcards_rels_documents_fk" FOREIGN KEY ("documents_id") REFERENCES "public"."documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_grantcards_v_version_grant_specs" ADD CONSTRAINT "_grantcards_v_version_grant_specs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_grantcards_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_grantcards_v_version_grant_specs_locales" ADD CONSTRAINT "_grantcards_v_version_grant_specs_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_grantcards_v_version_grant_specs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_grantcards_v_version_card_buttons" ADD CONSTRAINT "_grantcards_v_version_card_buttons_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_grantcards_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_grantcards_v_version_card_buttons_locales" ADD CONSTRAINT "_grantcards_v_version_card_buttons_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_grantcards_v_version_card_buttons"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_grantcards_v" ADD CONSTRAINT "_grantcards_v_parent_id_grantcards_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."grantcards"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_grantcards_v" ADD CONSTRAINT "_grantcards_v_version_mascot_id_asset_cloud_id_fk" FOREIGN KEY ("version_mascot_id") REFERENCES "public"."asset_cloud"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_grantcards_v_locales" ADD CONSTRAINT "_grantcards_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_grantcards_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_grantcards_v_rels" ADD CONSTRAINT "_grantcards_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_grantcards_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_grantcards_v_rels" ADD CONSTRAINT "_grantcards_v_rels_grants_fk" FOREIGN KEY ("grants_id") REFERENCES "public"."grants"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_grantcards_v_rels" ADD CONSTRAINT "_grantcards_v_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_grantcards_v_rels" ADD CONSTRAINT "_grantcards_v_rels_documents_fk" FOREIGN KEY ("documents_id") REFERENCES "public"."documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_populated_authors" ADD CONSTRAINT "posts_populated_authors_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_locales" ADD CONSTRAINT "posts_locales_meta_image_id_media_cloud_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media_cloud"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "posts_locales" ADD CONSTRAINT "posts_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_rels" ADD CONSTRAINT "posts_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_rels" ADD CONSTRAINT "posts_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_rels" ADD CONSTRAINT "posts_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_rels" ADD CONSTRAINT "posts_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_version_populated_authors" ADD CONSTRAINT "_posts_v_version_populated_authors_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v" ADD CONSTRAINT "_posts_v_parent_id_posts_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."posts"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_posts_v_locales" ADD CONSTRAINT "_posts_v_locales_version_meta_image_id_media_cloud_id_fk" FOREIGN KEY ("version_meta_image_id") REFERENCES "public"."media_cloud"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_posts_v_locales" ADD CONSTRAINT "_posts_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_rels" ADD CONSTRAINT "_posts_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_rels" ADD CONSTRAINT "_posts_v_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_rels" ADD CONSTRAINT "_posts_v_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_rels" ADD CONSTRAINT "_posts_v_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "categories_breadcrumbs" ADD CONSTRAINT "categories_breadcrumbs_doc_id_categories_id_fk" FOREIGN KEY ("doc_id") REFERENCES "public"."categories"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "categories_breadcrumbs" ADD CONSTRAINT "categories_breadcrumbs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "categories" ADD CONSTRAINT "categories_parent_id_categories_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."categories"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "users_sessions" ADD CONSTRAINT "users_sessions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "users" ADD CONSTRAINT "users_avatar_id_media_cloud_id_fk" FOREIGN KEY ("avatar_id") REFERENCES "public"."media_cloud"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "redirects_rels" ADD CONSTRAINT "redirects_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."redirects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "redirects_rels" ADD CONSTRAINT "redirects_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_blocks_checkbox" ADD CONSTRAINT "forms_blocks_checkbox_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_blocks_checkbox_locales" ADD CONSTRAINT "forms_blocks_checkbox_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms_blocks_checkbox"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_blocks_country" ADD CONSTRAINT "forms_blocks_country_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_blocks_country_locales" ADD CONSTRAINT "forms_blocks_country_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms_blocks_country"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_blocks_email" ADD CONSTRAINT "forms_blocks_email_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_blocks_email_locales" ADD CONSTRAINT "forms_blocks_email_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms_blocks_email"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_blocks_message" ADD CONSTRAINT "forms_blocks_message_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_blocks_message_locales" ADD CONSTRAINT "forms_blocks_message_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms_blocks_message"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_blocks_number" ADD CONSTRAINT "forms_blocks_number_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_blocks_number_locales" ADD CONSTRAINT "forms_blocks_number_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms_blocks_number"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_blocks_select_options" ADD CONSTRAINT "forms_blocks_select_options_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms_blocks_select"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_blocks_select_options_locales" ADD CONSTRAINT "forms_blocks_select_options_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms_blocks_select_options"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_blocks_select" ADD CONSTRAINT "forms_blocks_select_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_blocks_select_locales" ADD CONSTRAINT "forms_blocks_select_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms_blocks_select"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_blocks_state" ADD CONSTRAINT "forms_blocks_state_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_blocks_state_locales" ADD CONSTRAINT "forms_blocks_state_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms_blocks_state"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_blocks_text" ADD CONSTRAINT "forms_blocks_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_blocks_text_locales" ADD CONSTRAINT "forms_blocks_text_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms_blocks_text"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_blocks_textarea" ADD CONSTRAINT "forms_blocks_textarea_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_blocks_textarea_locales" ADD CONSTRAINT "forms_blocks_textarea_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms_blocks_textarea"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_emails" ADD CONSTRAINT "forms_emails_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_emails_locales" ADD CONSTRAINT "forms_emails_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms_emails"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_locales" ADD CONSTRAINT "forms_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "form_submissions_submission_data" ADD CONSTRAINT "form_submissions_submission_data_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."form_submissions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "form_submissions" ADD CONSTRAINT "form_submissions_form_id_forms_id_fk" FOREIGN KEY ("form_id") REFERENCES "public"."forms"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "search_categories" ADD CONSTRAINT "search_categories_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."search"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "search" ADD CONSTRAINT "search_meta_image_id_media_cloud_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media_cloud"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "search_locales" ADD CONSTRAINT "search_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."search"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "search_rels" ADD CONSTRAINT "search_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."search"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "search_rels" ADD CONSTRAINT "search_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_locked_documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_grants_fk" FOREIGN KEY ("grants_id") REFERENCES "public"."grants"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_grantcards_fk" FOREIGN KEY ("grantcards_id") REFERENCES "public"."grantcards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_media_cloud_fk" FOREIGN KEY ("media_cloud_id") REFERENCES "public"."media_cloud"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_asset_cloud_fk" FOREIGN KEY ("asset_cloud_id") REFERENCES "public"."asset_cloud"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_documents_fk" FOREIGN KEY ("documents_id") REFERENCES "public"."documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_redirects_fk" FOREIGN KEY ("redirects_id") REFERENCES "public"."redirects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_forms_fk" FOREIGN KEY ("forms_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_form_submissions_fk" FOREIGN KEY ("form_submissions_id") REFERENCES "public"."form_submissions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_search_fk" FOREIGN KEY ("search_id") REFERENCES "public"."search"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_preferences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_hero_section_cta_button" ADD CONSTRAINT "homepage_hero_section_cta_button_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_hero_section_cta_button_locales" ADD CONSTRAINT "homepage_hero_section_cta_button_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage_hero_section_cta_button"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_blocks_secondarycta_cta_button" ADD CONSTRAINT "homepage_blocks_secondarycta_cta_button_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage_blocks_secondarycta"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_blocks_secondarycta_cta_button_locales" ADD CONSTRAINT "homepage_blocks_secondarycta_cta_button_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage_blocks_secondarycta_cta_button"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_blocks_secondarycta" ADD CONSTRAINT "homepage_blocks_secondarycta_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_blocks_secondarycta_locales" ADD CONSTRAINT "homepage_blocks_secondarycta_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage_blocks_secondarycta"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_blocks_mcol_info_block_multicols" ADD CONSTRAINT "homepage_blocks_mcol_info_block_multicols_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage_blocks_mcol_info_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_blocks_mcol_info_block_multicols_locales" ADD CONSTRAINT "homepage_blocks_mcol_info_block_multicols_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage_blocks_mcol_info_block_multicols"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_blocks_mcol_info_block" ADD CONSTRAINT "homepage_blocks_mcol_info_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_blocks_grant_card_grid_block" ADD CONSTRAINT "homepage_blocks_grant_card_grid_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_blocks_grant_card_grid_block_locales" ADD CONSTRAINT "homepage_blocks_grant_card_grid_block_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage_blocks_grant_card_grid_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_blocks_mstep_process_steps_details" ADD CONSTRAINT "homepage_blocks_mstep_process_steps_details_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage_blocks_mstep_process_steps"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_blocks_mstep_process_steps_details_locales" ADD CONSTRAINT "homepage_blocks_mstep_process_steps_details_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage_blocks_mstep_process_steps_details"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_blocks_mstep_process_steps" ADD CONSTRAINT "homepage_blocks_mstep_process_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage_blocks_mstep_process"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_blocks_mstep_process_steps_locales" ADD CONSTRAINT "homepage_blocks_mstep_process_steps_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage_blocks_mstep_process_steps"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_blocks_mstep_process" ADD CONSTRAINT "homepage_blocks_mstep_process_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_blocks_mstep_process_locales" ADD CONSTRAINT "homepage_blocks_mstep_process_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage_blocks_mstep_process"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_blocks_comparison_blk_lft_grp_lft_points" ADD CONSTRAINT "homepage_blocks_comparison_blk_lft_grp_lft_points_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage_blocks_comparison_blk"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_blocks_comparison_blk_lft_grp_lft_points_locales" ADD CONSTRAINT "homepage_blocks_comparison_blk_lft_grp_lft_points_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage_blocks_comparison_blk_lft_grp_lft_points"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_blocks_comparison_blk_rt_grp_rt_points" ADD CONSTRAINT "homepage_blocks_comparison_blk_rt_grp_rt_points_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage_blocks_comparison_blk"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_blocks_comparison_blk_rt_grp_rt_points_locales" ADD CONSTRAINT "homepage_blocks_comparison_blk_rt_grp_rt_points_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage_blocks_comparison_blk_rt_grp_rt_points"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_blocks_comparison_blk_buttons" ADD CONSTRAINT "homepage_blocks_comparison_blk_buttons_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage_blocks_comparison_blk"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_blocks_comparison_blk_buttons_locales" ADD CONSTRAINT "homepage_blocks_comparison_blk_buttons_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage_blocks_comparison_blk_buttons"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_blocks_comparison_blk" ADD CONSTRAINT "homepage_blocks_comparison_blk_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_blocks_comparison_blk_locales" ADD CONSTRAINT "homepage_blocks_comparison_blk_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage_blocks_comparison_blk"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_blocks_ylw_deck_cards_links" ADD CONSTRAINT "homepage_blocks_ylw_deck_cards_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage_blocks_ylw_deck_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_blocks_ylw_deck_cards_links_locales" ADD CONSTRAINT "homepage_blocks_ylw_deck_cards_links_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage_blocks_ylw_deck_cards_links"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_blocks_ylw_deck_cards" ADD CONSTRAINT "homepage_blocks_ylw_deck_cards_mascot_id_asset_cloud_id_fk" FOREIGN KEY ("mascot_id") REFERENCES "public"."asset_cloud"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "homepage_blocks_ylw_deck_cards" ADD CONSTRAINT "homepage_blocks_ylw_deck_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage_blocks_ylw_deck"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_blocks_ylw_deck_cards_locales" ADD CONSTRAINT "homepage_blocks_ylw_deck_cards_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage_blocks_ylw_deck_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_blocks_ylw_deck" ADD CONSTRAINT "homepage_blocks_ylw_deck_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_blocks_ylw_deck_locales" ADD CONSTRAINT "homepage_blocks_ylw_deck_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage_blocks_ylw_deck"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_blocks_feat_crd_tags" ADD CONSTRAINT "homepage_blocks_feat_crd_tags_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage_blocks_feat_crd"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_blocks_feat_crd_tags_locales" ADD CONSTRAINT "homepage_blocks_feat_crd_tags_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage_blocks_feat_crd_tags"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_blocks_feat_crd" ADD CONSTRAINT "homepage_blocks_feat_crd_image_id_media_cloud_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media_cloud"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "homepage_blocks_feat_crd" ADD CONSTRAINT "homepage_blocks_feat_crd_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_blocks_feat_crd_locales" ADD CONSTRAINT "homepage_blocks_feat_crd_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage_blocks_feat_crd"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_blocks_feat_crd_acc_feat_crds" ADD CONSTRAINT "homepage_blocks_feat_crd_acc_feat_crds_mascot_id_asset_cloud_id_fk" FOREIGN KEY ("mascot_id") REFERENCES "public"."asset_cloud"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "homepage_blocks_feat_crd_acc_feat_crds" ADD CONSTRAINT "homepage_blocks_feat_crd_acc_feat_crds_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage_blocks_feat_crd_acc"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_blocks_feat_crd_acc_feat_crds_locales" ADD CONSTRAINT "homepage_blocks_feat_crd_acc_feat_crds_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage_blocks_feat_crd_acc_feat_crds"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_blocks_feat_crd_acc" ADD CONSTRAINT "homepage_blocks_feat_crd_acc_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_blocks_feat_crd_acc_locales" ADD CONSTRAINT "homepage_blocks_feat_crd_acc_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage_blocks_feat_crd_acc"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_blocks_list_crd_dck_cards_tags" ADD CONSTRAINT "homepage_blocks_list_crd_dck_cards_tags_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage_blocks_list_crd_dck_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_blocks_list_crd_dck_cards_tags_locales" ADD CONSTRAINT "homepage_blocks_list_crd_dck_cards_tags_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage_blocks_list_crd_dck_cards_tags"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_blocks_list_crd_dck_cards" ADD CONSTRAINT "homepage_blocks_list_crd_dck_cards_image_id_media_cloud_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media_cloud"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "homepage_blocks_list_crd_dck_cards" ADD CONSTRAINT "homepage_blocks_list_crd_dck_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage_blocks_list_crd_dck"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_blocks_list_crd_dck_cards_locales" ADD CONSTRAINT "homepage_blocks_list_crd_dck_cards_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage_blocks_list_crd_dck_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_blocks_list_crd_dck_buttons" ADD CONSTRAINT "homepage_blocks_list_crd_dck_buttons_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage_blocks_list_crd_dck"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_blocks_list_crd_dck_buttons_locales" ADD CONSTRAINT "homepage_blocks_list_crd_dck_buttons_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage_blocks_list_crd_dck_buttons"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_blocks_list_crd_dck" ADD CONSTRAINT "homepage_blocks_list_crd_dck_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_blocks_list_crd_dck_locales" ADD CONSTRAINT "homepage_blocks_list_crd_dck_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage_blocks_list_crd_dck"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_blocks_faq_blk_faqs" ADD CONSTRAINT "homepage_blocks_faq_blk_faqs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage_blocks_faq_blk"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_blocks_faq_blk_faqs_locales" ADD CONSTRAINT "homepage_blocks_faq_blk_faqs_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage_blocks_faq_blk_faqs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_blocks_faq_blk" ADD CONSTRAINT "homepage_blocks_faq_blk_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_blocks_faq_blk_locales" ADD CONSTRAINT "homepage_blocks_faq_blk_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage_blocks_faq_blk"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_locales" ADD CONSTRAINT "homepage_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_rels" ADD CONSTRAINT "homepage_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."homepage"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_rels" ADD CONSTRAINT "homepage_rels_grants_fk" FOREIGN KEY ("grants_id") REFERENCES "public"."grants"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_rels" ADD CONSTRAINT "homepage_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_rels" ADD CONSTRAINT "homepage_rels_documents_fk" FOREIGN KEY ("documents_id") REFERENCES "public"."documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_rels" ADD CONSTRAINT "homepage_rels_grantcards_fk" FOREIGN KEY ("grantcards_id") REFERENCES "public"."grantcards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_homepage_v_version_hero_section_cta_button" ADD CONSTRAINT "_homepage_v_version_hero_section_cta_button_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_homepage_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_homepage_v_version_hero_section_cta_button_locales" ADD CONSTRAINT "_homepage_v_version_hero_section_cta_button_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_homepage_v_version_hero_section_cta_button"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_homepage_v_blocks_secondarycta_cta_button" ADD CONSTRAINT "_homepage_v_blocks_secondarycta_cta_button_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_homepage_v_blocks_secondarycta"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_homepage_v_blocks_secondarycta_cta_button_locales" ADD CONSTRAINT "_homepage_v_blocks_secondarycta_cta_button_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_homepage_v_blocks_secondarycta_cta_button"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_homepage_v_blocks_secondarycta" ADD CONSTRAINT "_homepage_v_blocks_secondarycta_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_homepage_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_homepage_v_blocks_secondarycta_locales" ADD CONSTRAINT "_homepage_v_blocks_secondarycta_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_homepage_v_blocks_secondarycta"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_homepage_v_blocks_mcol_info_block_multicols" ADD CONSTRAINT "_homepage_v_blocks_mcol_info_block_multicols_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_homepage_v_blocks_mcol_info_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_homepage_v_blocks_mcol_info_block_multicols_locales" ADD CONSTRAINT "_homepage_v_blocks_mcol_info_block_multicols_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_homepage_v_blocks_mcol_info_block_multicols"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_homepage_v_blocks_mcol_info_block" ADD CONSTRAINT "_homepage_v_blocks_mcol_info_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_homepage_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_homepage_v_blocks_grant_card_grid_block" ADD CONSTRAINT "_homepage_v_blocks_grant_card_grid_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_homepage_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_homepage_v_blocks_grant_card_grid_block_locales" ADD CONSTRAINT "_homepage_v_blocks_grant_card_grid_block_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_homepage_v_blocks_grant_card_grid_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_homepage_v_blocks_mstep_process_steps_details" ADD CONSTRAINT "_homepage_v_blocks_mstep_process_steps_details_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_homepage_v_blocks_mstep_process_steps"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_homepage_v_blocks_mstep_process_steps_details_locales" ADD CONSTRAINT "_homepage_v_blocks_mstep_process_steps_details_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_homepage_v_blocks_mstep_process_steps_details"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_homepage_v_blocks_mstep_process_steps" ADD CONSTRAINT "_homepage_v_blocks_mstep_process_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_homepage_v_blocks_mstep_process"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_homepage_v_blocks_mstep_process_steps_locales" ADD CONSTRAINT "_homepage_v_blocks_mstep_process_steps_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_homepage_v_blocks_mstep_process_steps"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_homepage_v_blocks_mstep_process" ADD CONSTRAINT "_homepage_v_blocks_mstep_process_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_homepage_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_homepage_v_blocks_mstep_process_locales" ADD CONSTRAINT "_homepage_v_blocks_mstep_process_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_homepage_v_blocks_mstep_process"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_homepage_v_blocks_comparison_blk_lft_grp_lft_points" ADD CONSTRAINT "_homepage_v_blocks_comparison_blk_lft_grp_lft_points_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_homepage_v_blocks_comparison_blk"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_homepage_v_blocks_comparison_blk_lft_grp_lft_points_locales" ADD CONSTRAINT "_homepage_v_blocks_comparison_blk_lft_grp_lft_points_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_homepage_v_blocks_comparison_blk_lft_grp_lft_points"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_homepage_v_blocks_comparison_blk_rt_grp_rt_points" ADD CONSTRAINT "_homepage_v_blocks_comparison_blk_rt_grp_rt_points_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_homepage_v_blocks_comparison_blk"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_homepage_v_blocks_comparison_blk_rt_grp_rt_points_locales" ADD CONSTRAINT "_homepage_v_blocks_comparison_blk_rt_grp_rt_points_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_homepage_v_blocks_comparison_blk_rt_grp_rt_points"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_homepage_v_blocks_comparison_blk_buttons" ADD CONSTRAINT "_homepage_v_blocks_comparison_blk_buttons_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_homepage_v_blocks_comparison_blk"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_homepage_v_blocks_comparison_blk_buttons_locales" ADD CONSTRAINT "_homepage_v_blocks_comparison_blk_buttons_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_homepage_v_blocks_comparison_blk_buttons"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_homepage_v_blocks_comparison_blk" ADD CONSTRAINT "_homepage_v_blocks_comparison_blk_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_homepage_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_homepage_v_blocks_comparison_blk_locales" ADD CONSTRAINT "_homepage_v_blocks_comparison_blk_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_homepage_v_blocks_comparison_blk"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_homepage_v_blocks_ylw_deck_cards_links" ADD CONSTRAINT "_homepage_v_blocks_ylw_deck_cards_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_homepage_v_blocks_ylw_deck_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_homepage_v_blocks_ylw_deck_cards_links_locales" ADD CONSTRAINT "_homepage_v_blocks_ylw_deck_cards_links_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_homepage_v_blocks_ylw_deck_cards_links"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_homepage_v_blocks_ylw_deck_cards" ADD CONSTRAINT "_homepage_v_blocks_ylw_deck_cards_mascot_id_asset_cloud_id_fk" FOREIGN KEY ("mascot_id") REFERENCES "public"."asset_cloud"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_homepage_v_blocks_ylw_deck_cards" ADD CONSTRAINT "_homepage_v_blocks_ylw_deck_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_homepage_v_blocks_ylw_deck"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_homepage_v_blocks_ylw_deck_cards_locales" ADD CONSTRAINT "_homepage_v_blocks_ylw_deck_cards_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_homepage_v_blocks_ylw_deck_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_homepage_v_blocks_ylw_deck" ADD CONSTRAINT "_homepage_v_blocks_ylw_deck_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_homepage_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_homepage_v_blocks_ylw_deck_locales" ADD CONSTRAINT "_homepage_v_blocks_ylw_deck_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_homepage_v_blocks_ylw_deck"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_homepage_v_blocks_feat_crd_tags" ADD CONSTRAINT "_homepage_v_blocks_feat_crd_tags_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_homepage_v_blocks_feat_crd"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_homepage_v_blocks_feat_crd_tags_locales" ADD CONSTRAINT "_homepage_v_blocks_feat_crd_tags_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_homepage_v_blocks_feat_crd_tags"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_homepage_v_blocks_feat_crd" ADD CONSTRAINT "_homepage_v_blocks_feat_crd_image_id_media_cloud_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media_cloud"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_homepage_v_blocks_feat_crd" ADD CONSTRAINT "_homepage_v_blocks_feat_crd_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_homepage_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_homepage_v_blocks_feat_crd_locales" ADD CONSTRAINT "_homepage_v_blocks_feat_crd_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_homepage_v_blocks_feat_crd"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_homepage_v_blocks_feat_crd_acc_feat_crds" ADD CONSTRAINT "_homepage_v_blocks_feat_crd_acc_feat_crds_mascot_id_asset_cloud_id_fk" FOREIGN KEY ("mascot_id") REFERENCES "public"."asset_cloud"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_homepage_v_blocks_feat_crd_acc_feat_crds" ADD CONSTRAINT "_homepage_v_blocks_feat_crd_acc_feat_crds_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_homepage_v_blocks_feat_crd_acc"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_homepage_v_blocks_feat_crd_acc_feat_crds_locales" ADD CONSTRAINT "_homepage_v_blocks_feat_crd_acc_feat_crds_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_homepage_v_blocks_feat_crd_acc_feat_crds"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_homepage_v_blocks_feat_crd_acc" ADD CONSTRAINT "_homepage_v_blocks_feat_crd_acc_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_homepage_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_homepage_v_blocks_feat_crd_acc_locales" ADD CONSTRAINT "_homepage_v_blocks_feat_crd_acc_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_homepage_v_blocks_feat_crd_acc"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_homepage_v_blocks_list_crd_dck_cards_tags" ADD CONSTRAINT "_homepage_v_blocks_list_crd_dck_cards_tags_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_homepage_v_blocks_list_crd_dck_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_homepage_v_blocks_list_crd_dck_cards_tags_locales" ADD CONSTRAINT "_homepage_v_blocks_list_crd_dck_cards_tags_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_homepage_v_blocks_list_crd_dck_cards_tags"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_homepage_v_blocks_list_crd_dck_cards" ADD CONSTRAINT "_homepage_v_blocks_list_crd_dck_cards_image_id_media_cloud_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media_cloud"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_homepage_v_blocks_list_crd_dck_cards" ADD CONSTRAINT "_homepage_v_blocks_list_crd_dck_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_homepage_v_blocks_list_crd_dck"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_homepage_v_blocks_list_crd_dck_cards_locales" ADD CONSTRAINT "_homepage_v_blocks_list_crd_dck_cards_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_homepage_v_blocks_list_crd_dck_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_homepage_v_blocks_list_crd_dck_buttons" ADD CONSTRAINT "_homepage_v_blocks_list_crd_dck_buttons_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_homepage_v_blocks_list_crd_dck"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_homepage_v_blocks_list_crd_dck_buttons_locales" ADD CONSTRAINT "_homepage_v_blocks_list_crd_dck_buttons_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_homepage_v_blocks_list_crd_dck_buttons"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_homepage_v_blocks_list_crd_dck" ADD CONSTRAINT "_homepage_v_blocks_list_crd_dck_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_homepage_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_homepage_v_blocks_list_crd_dck_locales" ADD CONSTRAINT "_homepage_v_blocks_list_crd_dck_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_homepage_v_blocks_list_crd_dck"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_homepage_v_blocks_faq_blk_faqs" ADD CONSTRAINT "_homepage_v_blocks_faq_blk_faqs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_homepage_v_blocks_faq_blk"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_homepage_v_blocks_faq_blk_faqs_locales" ADD CONSTRAINT "_homepage_v_blocks_faq_blk_faqs_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_homepage_v_blocks_faq_blk_faqs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_homepage_v_blocks_faq_blk" ADD CONSTRAINT "_homepage_v_blocks_faq_blk_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_homepage_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_homepage_v_blocks_faq_blk_locales" ADD CONSTRAINT "_homepage_v_blocks_faq_blk_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_homepage_v_blocks_faq_blk"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_homepage_v_locales" ADD CONSTRAINT "_homepage_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_homepage_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_homepage_v_rels" ADD CONSTRAINT "_homepage_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_homepage_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_homepage_v_rels" ADD CONSTRAINT "_homepage_v_rels_grants_fk" FOREIGN KEY ("grants_id") REFERENCES "public"."grants"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_homepage_v_rels" ADD CONSTRAINT "_homepage_v_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_homepage_v_rels" ADD CONSTRAINT "_homepage_v_rels_documents_fk" FOREIGN KEY ("documents_id") REFERENCES "public"."documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_homepage_v_rels" ADD CONSTRAINT "_homepage_v_rels_grantcards_fk" FOREIGN KEY ("grantcards_id") REFERENCES "public"."grantcards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "header_languages" ADD CONSTRAINT "header_languages_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."header"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "header" ADD CONSTRAINT "header_logo_id_asset_cloud_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."asset_cloud"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "footer_sm_links_group_sm_links" ADD CONSTRAINT "footer_sm_links_group_sm_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer" ADD CONSTRAINT "footer_logo_id_asset_cloud_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."asset_cloud"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "footer_locales" ADD CONSTRAINT "footer_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "nav_menu_items_nav_items" ADD CONSTRAINT "nav_menu_items_nav_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."nav_menu_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "nav_menu_items_nav_items_locales" ADD CONSTRAINT "nav_menu_items_nav_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."nav_menu_items_nav_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "nav_menu_items" ADD CONSTRAINT "nav_menu_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."nav"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "nav_menu_items_locales" ADD CONSTRAINT "nav_menu_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."nav_menu_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "nav_rels" ADD CONSTRAINT "nav_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."nav"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "nav_rels" ADD CONSTRAINT "nav_rels_grants_fk" FOREIGN KEY ("grants_id") REFERENCES "public"."grants"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "nav_rels" ADD CONSTRAINT "nav_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "nav_rels" ADD CONSTRAINT "nav_rels_documents_fk" FOREIGN KEY ("documents_id") REFERENCES "public"."documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "contact_info_emails" ADD CONSTRAINT "contact_info_emails_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contact_info"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "contact_info_emails_locales" ADD CONSTRAINT "contact_info_emails_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contact_info_emails"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "grants_hero_buttons_order_idx" ON "grants_hero_buttons" USING btree ("_order");
  CREATE INDEX "grants_hero_buttons_parent_id_idx" ON "grants_hero_buttons" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "grants_hero_buttons_locales_locale_parent_id_unique" ON "grants_hero_buttons_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "grants_blocks_scol_info_blk_col_btns_order_idx" ON "grants_blocks_scol_info_blk_col_btns" USING btree ("_order");
  CREATE INDEX "grants_blocks_scol_info_blk_col_btns_parent_id_idx" ON "grants_blocks_scol_info_blk_col_btns" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "grants_blocks_scol_info_blk_col_btns_locales_locale_parent_id_unique" ON "grants_blocks_scol_info_blk_col_btns_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "grants_blocks_scol_info_blk_order_idx" ON "grants_blocks_scol_info_blk" USING btree ("_order");
  CREATE INDEX "grants_blocks_scol_info_blk_parent_id_idx" ON "grants_blocks_scol_info_blk" USING btree ("_parent_id");
  CREATE INDEX "grants_blocks_scol_info_blk_path_idx" ON "grants_blocks_scol_info_blk" USING btree ("_path");
  CREATE UNIQUE INDEX "grants_blocks_scol_info_blk_locales_locale_parent_id_unique" ON "grants_blocks_scol_info_blk_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "grants_blocks_mcol_info_block_multicols_order_idx" ON "grants_blocks_mcol_info_block_multicols" USING btree ("_order");
  CREATE INDEX "grants_blocks_mcol_info_block_multicols_parent_id_idx" ON "grants_blocks_mcol_info_block_multicols" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "grants_blocks_mcol_info_block_multicols_locales_locale_parent_id_unique" ON "grants_blocks_mcol_info_block_multicols_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "grants_blocks_mcol_info_block_order_idx" ON "grants_blocks_mcol_info_block" USING btree ("_order");
  CREATE INDEX "grants_blocks_mcol_info_block_parent_id_idx" ON "grants_blocks_mcol_info_block" USING btree ("_parent_id");
  CREATE INDEX "grants_blocks_mcol_info_block_path_idx" ON "grants_blocks_mcol_info_block" USING btree ("_path");
  CREATE INDEX "grants_blocks_grant_card_grid_block_order_idx" ON "grants_blocks_grant_card_grid_block" USING btree ("_order");
  CREATE INDEX "grants_blocks_grant_card_grid_block_parent_id_idx" ON "grants_blocks_grant_card_grid_block" USING btree ("_parent_id");
  CREATE INDEX "grants_blocks_grant_card_grid_block_path_idx" ON "grants_blocks_grant_card_grid_block" USING btree ("_path");
  CREATE UNIQUE INDEX "grants_blocks_grant_card_grid_block_locales_locale_parent_id_unique" ON "grants_blocks_grant_card_grid_block_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "grants_blocks_mstep_process_steps_details_order_idx" ON "grants_blocks_mstep_process_steps_details" USING btree ("_order");
  CREATE INDEX "grants_blocks_mstep_process_steps_details_parent_id_idx" ON "grants_blocks_mstep_process_steps_details" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "grants_blocks_mstep_process_steps_details_locales_locale_parent_id_unique" ON "grants_blocks_mstep_process_steps_details_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "grants_blocks_mstep_process_steps_order_idx" ON "grants_blocks_mstep_process_steps" USING btree ("_order");
  CREATE INDEX "grants_blocks_mstep_process_steps_parent_id_idx" ON "grants_blocks_mstep_process_steps" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "grants_blocks_mstep_process_steps_locales_locale_parent_id_unique" ON "grants_blocks_mstep_process_steps_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "grants_blocks_mstep_process_order_idx" ON "grants_blocks_mstep_process" USING btree ("_order");
  CREATE INDEX "grants_blocks_mstep_process_parent_id_idx" ON "grants_blocks_mstep_process" USING btree ("_parent_id");
  CREATE INDEX "grants_blocks_mstep_process_path_idx" ON "grants_blocks_mstep_process" USING btree ("_path");
  CREATE UNIQUE INDEX "grants_blocks_mstep_process_locales_locale_parent_id_unique" ON "grants_blocks_mstep_process_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "grants_blocks_comparison_blk_lft_grp_lft_points_order_idx" ON "grants_blocks_comparison_blk_lft_grp_lft_points" USING btree ("_order");
  CREATE INDEX "grants_blocks_comparison_blk_lft_grp_lft_points_parent_id_idx" ON "grants_blocks_comparison_blk_lft_grp_lft_points" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "grants_blocks_comparison_blk_lft_grp_lft_points_locales_locale_parent_id_unique" ON "grants_blocks_comparison_blk_lft_grp_lft_points_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "grants_blocks_comparison_blk_rt_grp_rt_points_order_idx" ON "grants_blocks_comparison_blk_rt_grp_rt_points" USING btree ("_order");
  CREATE INDEX "grants_blocks_comparison_blk_rt_grp_rt_points_parent_id_idx" ON "grants_blocks_comparison_blk_rt_grp_rt_points" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "grants_blocks_comparison_blk_rt_grp_rt_points_locales_locale_parent_id_unique" ON "grants_blocks_comparison_blk_rt_grp_rt_points_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "grants_blocks_comparison_blk_buttons_order_idx" ON "grants_blocks_comparison_blk_buttons" USING btree ("_order");
  CREATE INDEX "grants_blocks_comparison_blk_buttons_parent_id_idx" ON "grants_blocks_comparison_blk_buttons" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "grants_blocks_comparison_blk_buttons_locales_locale_parent_id_unique" ON "grants_blocks_comparison_blk_buttons_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "grants_blocks_comparison_blk_order_idx" ON "grants_blocks_comparison_blk" USING btree ("_order");
  CREATE INDEX "grants_blocks_comparison_blk_parent_id_idx" ON "grants_blocks_comparison_blk" USING btree ("_parent_id");
  CREATE INDEX "grants_blocks_comparison_blk_path_idx" ON "grants_blocks_comparison_blk" USING btree ("_path");
  CREATE UNIQUE INDEX "grants_blocks_comparison_blk_locales_locale_parent_id_unique" ON "grants_blocks_comparison_blk_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "grants_blocks_ylw_deck_cards_links_order_idx" ON "grants_blocks_ylw_deck_cards_links" USING btree ("_order");
  CREATE INDEX "grants_blocks_ylw_deck_cards_links_parent_id_idx" ON "grants_blocks_ylw_deck_cards_links" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "grants_blocks_ylw_deck_cards_links_locales_locale_parent_id_unique" ON "grants_blocks_ylw_deck_cards_links_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "grants_blocks_ylw_deck_cards_order_idx" ON "grants_blocks_ylw_deck_cards" USING btree ("_order");
  CREATE INDEX "grants_blocks_ylw_deck_cards_parent_id_idx" ON "grants_blocks_ylw_deck_cards" USING btree ("_parent_id");
  CREATE INDEX "grants_blocks_ylw_deck_cards_mascot_idx" ON "grants_blocks_ylw_deck_cards" USING btree ("mascot_id");
  CREATE UNIQUE INDEX "grants_blocks_ylw_deck_cards_locales_locale_parent_id_unique" ON "grants_blocks_ylw_deck_cards_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "grants_blocks_ylw_deck_order_idx" ON "grants_blocks_ylw_deck" USING btree ("_order");
  CREATE INDEX "grants_blocks_ylw_deck_parent_id_idx" ON "grants_blocks_ylw_deck" USING btree ("_parent_id");
  CREATE INDEX "grants_blocks_ylw_deck_path_idx" ON "grants_blocks_ylw_deck" USING btree ("_path");
  CREATE UNIQUE INDEX "grants_blocks_ylw_deck_locales_locale_parent_id_unique" ON "grants_blocks_ylw_deck_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "grants_blocks_feat_crd_tags_order_idx" ON "grants_blocks_feat_crd_tags" USING btree ("_order");
  CREATE INDEX "grants_blocks_feat_crd_tags_parent_id_idx" ON "grants_blocks_feat_crd_tags" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "grants_blocks_feat_crd_tags_locales_locale_parent_id_unique" ON "grants_blocks_feat_crd_tags_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "grants_blocks_feat_crd_order_idx" ON "grants_blocks_feat_crd" USING btree ("_order");
  CREATE INDEX "grants_blocks_feat_crd_parent_id_idx" ON "grants_blocks_feat_crd" USING btree ("_parent_id");
  CREATE INDEX "grants_blocks_feat_crd_path_idx" ON "grants_blocks_feat_crd" USING btree ("_path");
  CREATE INDEX "grants_blocks_feat_crd_image_idx" ON "grants_blocks_feat_crd" USING btree ("image_id");
  CREATE UNIQUE INDEX "grants_blocks_feat_crd_locales_locale_parent_id_unique" ON "grants_blocks_feat_crd_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "grants_blocks_feat_crd_acc_feat_crds_order_idx" ON "grants_blocks_feat_crd_acc_feat_crds" USING btree ("_order");
  CREATE INDEX "grants_blocks_feat_crd_acc_feat_crds_parent_id_idx" ON "grants_blocks_feat_crd_acc_feat_crds" USING btree ("_parent_id");
  CREATE INDEX "grants_blocks_feat_crd_acc_feat_crds_mascot_idx" ON "grants_blocks_feat_crd_acc_feat_crds" USING btree ("mascot_id");
  CREATE UNIQUE INDEX "grants_blocks_feat_crd_acc_feat_crds_locales_locale_parent_id_unique" ON "grants_blocks_feat_crd_acc_feat_crds_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "grants_blocks_feat_crd_acc_order_idx" ON "grants_blocks_feat_crd_acc" USING btree ("_order");
  CREATE INDEX "grants_blocks_feat_crd_acc_parent_id_idx" ON "grants_blocks_feat_crd_acc" USING btree ("_parent_id");
  CREATE INDEX "grants_blocks_feat_crd_acc_path_idx" ON "grants_blocks_feat_crd_acc" USING btree ("_path");
  CREATE UNIQUE INDEX "grants_blocks_feat_crd_acc_locales_locale_parent_id_unique" ON "grants_blocks_feat_crd_acc_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "grants_blocks_list_crd_dck_cards_tags_order_idx" ON "grants_blocks_list_crd_dck_cards_tags" USING btree ("_order");
  CREATE INDEX "grants_blocks_list_crd_dck_cards_tags_parent_id_idx" ON "grants_blocks_list_crd_dck_cards_tags" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "grants_blocks_list_crd_dck_cards_tags_locales_locale_parent_id_unique" ON "grants_blocks_list_crd_dck_cards_tags_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "grants_blocks_list_crd_dck_cards_order_idx" ON "grants_blocks_list_crd_dck_cards" USING btree ("_order");
  CREATE INDEX "grants_blocks_list_crd_dck_cards_parent_id_idx" ON "grants_blocks_list_crd_dck_cards" USING btree ("_parent_id");
  CREATE INDEX "grants_blocks_list_crd_dck_cards_image_idx" ON "grants_blocks_list_crd_dck_cards" USING btree ("image_id");
  CREATE UNIQUE INDEX "grants_blocks_list_crd_dck_cards_locales_locale_parent_id_unique" ON "grants_blocks_list_crd_dck_cards_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "grants_blocks_list_crd_dck_buttons_order_idx" ON "grants_blocks_list_crd_dck_buttons" USING btree ("_order");
  CREATE INDEX "grants_blocks_list_crd_dck_buttons_parent_id_idx" ON "grants_blocks_list_crd_dck_buttons" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "grants_blocks_list_crd_dck_buttons_locales_locale_parent_id_unique" ON "grants_blocks_list_crd_dck_buttons_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "grants_blocks_list_crd_dck_order_idx" ON "grants_blocks_list_crd_dck" USING btree ("_order");
  CREATE INDEX "grants_blocks_list_crd_dck_parent_id_idx" ON "grants_blocks_list_crd_dck" USING btree ("_parent_id");
  CREATE INDEX "grants_blocks_list_crd_dck_path_idx" ON "grants_blocks_list_crd_dck" USING btree ("_path");
  CREATE UNIQUE INDEX "grants_blocks_list_crd_dck_locales_locale_parent_id_unique" ON "grants_blocks_list_crd_dck_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "grants_blocks_faq_blk_faqs_order_idx" ON "grants_blocks_faq_blk_faqs" USING btree ("_order");
  CREATE INDEX "grants_blocks_faq_blk_faqs_parent_id_idx" ON "grants_blocks_faq_blk_faqs" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "grants_blocks_faq_blk_faqs_locales_locale_parent_id_unique" ON "grants_blocks_faq_blk_faqs_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "grants_blocks_faq_blk_order_idx" ON "grants_blocks_faq_blk" USING btree ("_order");
  CREATE INDEX "grants_blocks_faq_blk_parent_id_idx" ON "grants_blocks_faq_blk" USING btree ("_parent_id");
  CREATE INDEX "grants_blocks_faq_blk_path_idx" ON "grants_blocks_faq_blk" USING btree ("_path");
  CREATE UNIQUE INDEX "grants_blocks_faq_blk_locales_locale_parent_id_unique" ON "grants_blocks_faq_blk_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "grants_title_idx" ON "grants" USING btree ("title");
  CREATE INDEX "grants_grant_card_idx" ON "grants" USING btree ("grant_card_id");
  CREATE INDEX "grants_slug_idx" ON "grants" USING btree ("slug");
  CREATE INDEX "grants_updated_at_idx" ON "grants" USING btree ("updated_at");
  CREATE INDEX "grants_created_at_idx" ON "grants" USING btree ("created_at");
  CREATE INDEX "grants__status_idx" ON "grants" USING btree ("_status");
  CREATE UNIQUE INDEX "grants_locales_locale_parent_id_unique" ON "grants_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "grants_rels_order_idx" ON "grants_rels" USING btree ("order");
  CREATE INDEX "grants_rels_parent_idx" ON "grants_rels" USING btree ("parent_id");
  CREATE INDEX "grants_rels_path_idx" ON "grants_rels" USING btree ("path");
  CREATE INDEX "grants_rels_grants_id_idx" ON "grants_rels" USING btree ("grants_id");
  CREATE INDEX "grants_rels_posts_id_idx" ON "grants_rels" USING btree ("posts_id");
  CREATE INDEX "grants_rels_documents_id_idx" ON "grants_rels" USING btree ("documents_id");
  CREATE INDEX "grants_rels_grantcards_id_idx" ON "grants_rels" USING btree ("grantcards_id");
  CREATE INDEX "_grants_v_version_hero_buttons_order_idx" ON "_grants_v_version_hero_buttons" USING btree ("_order");
  CREATE INDEX "_grants_v_version_hero_buttons_parent_id_idx" ON "_grants_v_version_hero_buttons" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_grants_v_version_hero_buttons_locales_locale_parent_id_unique" ON "_grants_v_version_hero_buttons_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_grants_v_blocks_scol_info_blk_col_btns_order_idx" ON "_grants_v_blocks_scol_info_blk_col_btns" USING btree ("_order");
  CREATE INDEX "_grants_v_blocks_scol_info_blk_col_btns_parent_id_idx" ON "_grants_v_blocks_scol_info_blk_col_btns" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_grants_v_blocks_scol_info_blk_col_btns_locales_locale_parent_id_unique" ON "_grants_v_blocks_scol_info_blk_col_btns_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_grants_v_blocks_scol_info_blk_order_idx" ON "_grants_v_blocks_scol_info_blk" USING btree ("_order");
  CREATE INDEX "_grants_v_blocks_scol_info_blk_parent_id_idx" ON "_grants_v_blocks_scol_info_blk" USING btree ("_parent_id");
  CREATE INDEX "_grants_v_blocks_scol_info_blk_path_idx" ON "_grants_v_blocks_scol_info_blk" USING btree ("_path");
  CREATE UNIQUE INDEX "_grants_v_blocks_scol_info_blk_locales_locale_parent_id_unique" ON "_grants_v_blocks_scol_info_blk_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_grants_v_blocks_mcol_info_block_multicols_order_idx" ON "_grants_v_blocks_mcol_info_block_multicols" USING btree ("_order");
  CREATE INDEX "_grants_v_blocks_mcol_info_block_multicols_parent_id_idx" ON "_grants_v_blocks_mcol_info_block_multicols" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_grants_v_blocks_mcol_info_block_multicols_locales_locale_parent_id_unique" ON "_grants_v_blocks_mcol_info_block_multicols_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_grants_v_blocks_mcol_info_block_order_idx" ON "_grants_v_blocks_mcol_info_block" USING btree ("_order");
  CREATE INDEX "_grants_v_blocks_mcol_info_block_parent_id_idx" ON "_grants_v_blocks_mcol_info_block" USING btree ("_parent_id");
  CREATE INDEX "_grants_v_blocks_mcol_info_block_path_idx" ON "_grants_v_blocks_mcol_info_block" USING btree ("_path");
  CREATE INDEX "_grants_v_blocks_grant_card_grid_block_order_idx" ON "_grants_v_blocks_grant_card_grid_block" USING btree ("_order");
  CREATE INDEX "_grants_v_blocks_grant_card_grid_block_parent_id_idx" ON "_grants_v_blocks_grant_card_grid_block" USING btree ("_parent_id");
  CREATE INDEX "_grants_v_blocks_grant_card_grid_block_path_idx" ON "_grants_v_blocks_grant_card_grid_block" USING btree ("_path");
  CREATE UNIQUE INDEX "_grants_v_blocks_grant_card_grid_block_locales_locale_parent_id_unique" ON "_grants_v_blocks_grant_card_grid_block_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_grants_v_blocks_mstep_process_steps_details_order_idx" ON "_grants_v_blocks_mstep_process_steps_details" USING btree ("_order");
  CREATE INDEX "_grants_v_blocks_mstep_process_steps_details_parent_id_idx" ON "_grants_v_blocks_mstep_process_steps_details" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_grants_v_blocks_mstep_process_steps_details_locales_locale_parent_id_unique" ON "_grants_v_blocks_mstep_process_steps_details_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_grants_v_blocks_mstep_process_steps_order_idx" ON "_grants_v_blocks_mstep_process_steps" USING btree ("_order");
  CREATE INDEX "_grants_v_blocks_mstep_process_steps_parent_id_idx" ON "_grants_v_blocks_mstep_process_steps" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_grants_v_blocks_mstep_process_steps_locales_locale_parent_id_unique" ON "_grants_v_blocks_mstep_process_steps_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_grants_v_blocks_mstep_process_order_idx" ON "_grants_v_blocks_mstep_process" USING btree ("_order");
  CREATE INDEX "_grants_v_blocks_mstep_process_parent_id_idx" ON "_grants_v_blocks_mstep_process" USING btree ("_parent_id");
  CREATE INDEX "_grants_v_blocks_mstep_process_path_idx" ON "_grants_v_blocks_mstep_process" USING btree ("_path");
  CREATE UNIQUE INDEX "_grants_v_blocks_mstep_process_locales_locale_parent_id_unique" ON "_grants_v_blocks_mstep_process_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_grants_v_blocks_comparison_blk_lft_grp_lft_points_order_idx" ON "_grants_v_blocks_comparison_blk_lft_grp_lft_points" USING btree ("_order");
  CREATE INDEX "_grants_v_blocks_comparison_blk_lft_grp_lft_points_parent_id_idx" ON "_grants_v_blocks_comparison_blk_lft_grp_lft_points" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_grants_v_blocks_comparison_blk_lft_grp_lft_points_locales_locale_parent_id_unique" ON "_grants_v_blocks_comparison_blk_lft_grp_lft_points_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_grants_v_blocks_comparison_blk_rt_grp_rt_points_order_idx" ON "_grants_v_blocks_comparison_blk_rt_grp_rt_points" USING btree ("_order");
  CREATE INDEX "_grants_v_blocks_comparison_blk_rt_grp_rt_points_parent_id_idx" ON "_grants_v_blocks_comparison_blk_rt_grp_rt_points" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_grants_v_blocks_comparison_blk_rt_grp_rt_points_locales_locale_parent_id_unique" ON "_grants_v_blocks_comparison_blk_rt_grp_rt_points_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_grants_v_blocks_comparison_blk_buttons_order_idx" ON "_grants_v_blocks_comparison_blk_buttons" USING btree ("_order");
  CREATE INDEX "_grants_v_blocks_comparison_blk_buttons_parent_id_idx" ON "_grants_v_blocks_comparison_blk_buttons" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_grants_v_blocks_comparison_blk_buttons_locales_locale_parent_id_unique" ON "_grants_v_blocks_comparison_blk_buttons_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_grants_v_blocks_comparison_blk_order_idx" ON "_grants_v_blocks_comparison_blk" USING btree ("_order");
  CREATE INDEX "_grants_v_blocks_comparison_blk_parent_id_idx" ON "_grants_v_blocks_comparison_blk" USING btree ("_parent_id");
  CREATE INDEX "_grants_v_blocks_comparison_blk_path_idx" ON "_grants_v_blocks_comparison_blk" USING btree ("_path");
  CREATE UNIQUE INDEX "_grants_v_blocks_comparison_blk_locales_locale_parent_id_unique" ON "_grants_v_blocks_comparison_blk_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_grants_v_blocks_ylw_deck_cards_links_order_idx" ON "_grants_v_blocks_ylw_deck_cards_links" USING btree ("_order");
  CREATE INDEX "_grants_v_blocks_ylw_deck_cards_links_parent_id_idx" ON "_grants_v_blocks_ylw_deck_cards_links" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_grants_v_blocks_ylw_deck_cards_links_locales_locale_parent_id_unique" ON "_grants_v_blocks_ylw_deck_cards_links_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_grants_v_blocks_ylw_deck_cards_order_idx" ON "_grants_v_blocks_ylw_deck_cards" USING btree ("_order");
  CREATE INDEX "_grants_v_blocks_ylw_deck_cards_parent_id_idx" ON "_grants_v_blocks_ylw_deck_cards" USING btree ("_parent_id");
  CREATE INDEX "_grants_v_blocks_ylw_deck_cards_mascot_idx" ON "_grants_v_blocks_ylw_deck_cards" USING btree ("mascot_id");
  CREATE UNIQUE INDEX "_grants_v_blocks_ylw_deck_cards_locales_locale_parent_id_unique" ON "_grants_v_blocks_ylw_deck_cards_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_grants_v_blocks_ylw_deck_order_idx" ON "_grants_v_blocks_ylw_deck" USING btree ("_order");
  CREATE INDEX "_grants_v_blocks_ylw_deck_parent_id_idx" ON "_grants_v_blocks_ylw_deck" USING btree ("_parent_id");
  CREATE INDEX "_grants_v_blocks_ylw_deck_path_idx" ON "_grants_v_blocks_ylw_deck" USING btree ("_path");
  CREATE UNIQUE INDEX "_grants_v_blocks_ylw_deck_locales_locale_parent_id_unique" ON "_grants_v_blocks_ylw_deck_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_grants_v_blocks_feat_crd_tags_order_idx" ON "_grants_v_blocks_feat_crd_tags" USING btree ("_order");
  CREATE INDEX "_grants_v_blocks_feat_crd_tags_parent_id_idx" ON "_grants_v_blocks_feat_crd_tags" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_grants_v_blocks_feat_crd_tags_locales_locale_parent_id_unique" ON "_grants_v_blocks_feat_crd_tags_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_grants_v_blocks_feat_crd_order_idx" ON "_grants_v_blocks_feat_crd" USING btree ("_order");
  CREATE INDEX "_grants_v_blocks_feat_crd_parent_id_idx" ON "_grants_v_blocks_feat_crd" USING btree ("_parent_id");
  CREATE INDEX "_grants_v_blocks_feat_crd_path_idx" ON "_grants_v_blocks_feat_crd" USING btree ("_path");
  CREATE INDEX "_grants_v_blocks_feat_crd_image_idx" ON "_grants_v_blocks_feat_crd" USING btree ("image_id");
  CREATE UNIQUE INDEX "_grants_v_blocks_feat_crd_locales_locale_parent_id_unique" ON "_grants_v_blocks_feat_crd_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_grants_v_blocks_feat_crd_acc_feat_crds_order_idx" ON "_grants_v_blocks_feat_crd_acc_feat_crds" USING btree ("_order");
  CREATE INDEX "_grants_v_blocks_feat_crd_acc_feat_crds_parent_id_idx" ON "_grants_v_blocks_feat_crd_acc_feat_crds" USING btree ("_parent_id");
  CREATE INDEX "_grants_v_blocks_feat_crd_acc_feat_crds_mascot_idx" ON "_grants_v_blocks_feat_crd_acc_feat_crds" USING btree ("mascot_id");
  CREATE UNIQUE INDEX "_grants_v_blocks_feat_crd_acc_feat_crds_locales_locale_parent_id_unique" ON "_grants_v_blocks_feat_crd_acc_feat_crds_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_grants_v_blocks_feat_crd_acc_order_idx" ON "_grants_v_blocks_feat_crd_acc" USING btree ("_order");
  CREATE INDEX "_grants_v_blocks_feat_crd_acc_parent_id_idx" ON "_grants_v_blocks_feat_crd_acc" USING btree ("_parent_id");
  CREATE INDEX "_grants_v_blocks_feat_crd_acc_path_idx" ON "_grants_v_blocks_feat_crd_acc" USING btree ("_path");
  CREATE UNIQUE INDEX "_grants_v_blocks_feat_crd_acc_locales_locale_parent_id_unique" ON "_grants_v_blocks_feat_crd_acc_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_grants_v_blocks_list_crd_dck_cards_tags_order_idx" ON "_grants_v_blocks_list_crd_dck_cards_tags" USING btree ("_order");
  CREATE INDEX "_grants_v_blocks_list_crd_dck_cards_tags_parent_id_idx" ON "_grants_v_blocks_list_crd_dck_cards_tags" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_grants_v_blocks_list_crd_dck_cards_tags_locales_locale_parent_id_unique" ON "_grants_v_blocks_list_crd_dck_cards_tags_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_grants_v_blocks_list_crd_dck_cards_order_idx" ON "_grants_v_blocks_list_crd_dck_cards" USING btree ("_order");
  CREATE INDEX "_grants_v_blocks_list_crd_dck_cards_parent_id_idx" ON "_grants_v_blocks_list_crd_dck_cards" USING btree ("_parent_id");
  CREATE INDEX "_grants_v_blocks_list_crd_dck_cards_image_idx" ON "_grants_v_blocks_list_crd_dck_cards" USING btree ("image_id");
  CREATE UNIQUE INDEX "_grants_v_blocks_list_crd_dck_cards_locales_locale_parent_id_unique" ON "_grants_v_blocks_list_crd_dck_cards_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_grants_v_blocks_list_crd_dck_buttons_order_idx" ON "_grants_v_blocks_list_crd_dck_buttons" USING btree ("_order");
  CREATE INDEX "_grants_v_blocks_list_crd_dck_buttons_parent_id_idx" ON "_grants_v_blocks_list_crd_dck_buttons" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_grants_v_blocks_list_crd_dck_buttons_locales_locale_parent_id_unique" ON "_grants_v_blocks_list_crd_dck_buttons_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_grants_v_blocks_list_crd_dck_order_idx" ON "_grants_v_blocks_list_crd_dck" USING btree ("_order");
  CREATE INDEX "_grants_v_blocks_list_crd_dck_parent_id_idx" ON "_grants_v_blocks_list_crd_dck" USING btree ("_parent_id");
  CREATE INDEX "_grants_v_blocks_list_crd_dck_path_idx" ON "_grants_v_blocks_list_crd_dck" USING btree ("_path");
  CREATE UNIQUE INDEX "_grants_v_blocks_list_crd_dck_locales_locale_parent_id_unique" ON "_grants_v_blocks_list_crd_dck_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_grants_v_blocks_faq_blk_faqs_order_idx" ON "_grants_v_blocks_faq_blk_faqs" USING btree ("_order");
  CREATE INDEX "_grants_v_blocks_faq_blk_faqs_parent_id_idx" ON "_grants_v_blocks_faq_blk_faqs" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_grants_v_blocks_faq_blk_faqs_locales_locale_parent_id_unique" ON "_grants_v_blocks_faq_blk_faqs_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_grants_v_blocks_faq_blk_order_idx" ON "_grants_v_blocks_faq_blk" USING btree ("_order");
  CREATE INDEX "_grants_v_blocks_faq_blk_parent_id_idx" ON "_grants_v_blocks_faq_blk" USING btree ("_parent_id");
  CREATE INDEX "_grants_v_blocks_faq_blk_path_idx" ON "_grants_v_blocks_faq_blk" USING btree ("_path");
  CREATE UNIQUE INDEX "_grants_v_blocks_faq_blk_locales_locale_parent_id_unique" ON "_grants_v_blocks_faq_blk_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_grants_v_parent_idx" ON "_grants_v" USING btree ("parent_id");
  CREATE INDEX "_grants_v_version_version_title_idx" ON "_grants_v" USING btree ("version_title");
  CREATE INDEX "_grants_v_version_version_grant_card_idx" ON "_grants_v" USING btree ("version_grant_card_id");
  CREATE INDEX "_grants_v_version_version_slug_idx" ON "_grants_v" USING btree ("version_slug");
  CREATE INDEX "_grants_v_version_version_updated_at_idx" ON "_grants_v" USING btree ("version_updated_at");
  CREATE INDEX "_grants_v_version_version_created_at_idx" ON "_grants_v" USING btree ("version_created_at");
  CREATE INDEX "_grants_v_version_version__status_idx" ON "_grants_v" USING btree ("version__status");
  CREATE INDEX "_grants_v_created_at_idx" ON "_grants_v" USING btree ("created_at");
  CREATE INDEX "_grants_v_updated_at_idx" ON "_grants_v" USING btree ("updated_at");
  CREATE INDEX "_grants_v_snapshot_idx" ON "_grants_v" USING btree ("snapshot");
  CREATE INDEX "_grants_v_published_locale_idx" ON "_grants_v" USING btree ("published_locale");
  CREATE INDEX "_grants_v_latest_idx" ON "_grants_v" USING btree ("latest");
  CREATE UNIQUE INDEX "_grants_v_locales_locale_parent_id_unique" ON "_grants_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_grants_v_rels_order_idx" ON "_grants_v_rels" USING btree ("order");
  CREATE INDEX "_grants_v_rels_parent_idx" ON "_grants_v_rels" USING btree ("parent_id");
  CREATE INDEX "_grants_v_rels_path_idx" ON "_grants_v_rels" USING btree ("path");
  CREATE INDEX "_grants_v_rels_grants_id_idx" ON "_grants_v_rels" USING btree ("grants_id");
  CREATE INDEX "_grants_v_rels_posts_id_idx" ON "_grants_v_rels" USING btree ("posts_id");
  CREATE INDEX "_grants_v_rels_documents_id_idx" ON "_grants_v_rels" USING btree ("documents_id");
  CREATE INDEX "_grants_v_rels_grantcards_id_idx" ON "_grants_v_rels" USING btree ("grantcards_id");
  CREATE INDEX "grantcards_grant_specs_order_idx" ON "grantcards_grant_specs" USING btree ("_order");
  CREATE INDEX "grantcards_grant_specs_parent_id_idx" ON "grantcards_grant_specs" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "grantcards_grant_specs_locales_locale_parent_id_unique" ON "grantcards_grant_specs_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "grantcards_card_buttons_order_idx" ON "grantcards_card_buttons" USING btree ("_order");
  CREATE INDEX "grantcards_card_buttons_parent_id_idx" ON "grantcards_card_buttons" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "grantcards_card_buttons_locales_locale_parent_id_unique" ON "grantcards_card_buttons_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "grantcards_active_period_idx" ON "grantcards" USING btree ("active_period");
  CREATE INDEX "grantcards_mascot_idx" ON "grantcards" USING btree ("mascot_id");
  CREATE INDEX "grantcards_slug_idx" ON "grantcards" USING btree ("slug");
  CREATE INDEX "grantcards_updated_at_idx" ON "grantcards" USING btree ("updated_at");
  CREATE INDEX "grantcards_created_at_idx" ON "grantcards" USING btree ("created_at");
  CREATE INDEX "grantcards__status_idx" ON "grantcards" USING btree ("_status");
  CREATE UNIQUE INDEX "grantcards_title_idx" ON "grantcards_locales" USING btree ("title","_locale");
  CREATE UNIQUE INDEX "grantcards_locales_locale_parent_id_unique" ON "grantcards_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "grantcards_rels_order_idx" ON "grantcards_rels" USING btree ("order");
  CREATE INDEX "grantcards_rels_parent_idx" ON "grantcards_rels" USING btree ("parent_id");
  CREATE INDEX "grantcards_rels_path_idx" ON "grantcards_rels" USING btree ("path");
  CREATE INDEX "grantcards_rels_grants_id_idx" ON "grantcards_rels" USING btree ("grants_id");
  CREATE INDEX "grantcards_rels_posts_id_idx" ON "grantcards_rels" USING btree ("posts_id");
  CREATE INDEX "grantcards_rels_documents_id_idx" ON "grantcards_rels" USING btree ("documents_id");
  CREATE INDEX "_grantcards_v_version_grant_specs_order_idx" ON "_grantcards_v_version_grant_specs" USING btree ("_order");
  CREATE INDEX "_grantcards_v_version_grant_specs_parent_id_idx" ON "_grantcards_v_version_grant_specs" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_grantcards_v_version_grant_specs_locales_locale_parent_id_unique" ON "_grantcards_v_version_grant_specs_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_grantcards_v_version_card_buttons_order_idx" ON "_grantcards_v_version_card_buttons" USING btree ("_order");
  CREATE INDEX "_grantcards_v_version_card_buttons_parent_id_idx" ON "_grantcards_v_version_card_buttons" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_grantcards_v_version_card_buttons_locales_locale_parent_id_unique" ON "_grantcards_v_version_card_buttons_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_grantcards_v_parent_idx" ON "_grantcards_v" USING btree ("parent_id");
  CREATE INDEX "_grantcards_v_version_version_active_period_idx" ON "_grantcards_v" USING btree ("version_active_period");
  CREATE INDEX "_grantcards_v_version_version_mascot_idx" ON "_grantcards_v" USING btree ("version_mascot_id");
  CREATE INDEX "_grantcards_v_version_version_slug_idx" ON "_grantcards_v" USING btree ("version_slug");
  CREATE INDEX "_grantcards_v_version_version_updated_at_idx" ON "_grantcards_v" USING btree ("version_updated_at");
  CREATE INDEX "_grantcards_v_version_version_created_at_idx" ON "_grantcards_v" USING btree ("version_created_at");
  CREATE INDEX "_grantcards_v_version_version__status_idx" ON "_grantcards_v" USING btree ("version__status");
  CREATE INDEX "_grantcards_v_created_at_idx" ON "_grantcards_v" USING btree ("created_at");
  CREATE INDEX "_grantcards_v_updated_at_idx" ON "_grantcards_v" USING btree ("updated_at");
  CREATE INDEX "_grantcards_v_snapshot_idx" ON "_grantcards_v" USING btree ("snapshot");
  CREATE INDEX "_grantcards_v_published_locale_idx" ON "_grantcards_v" USING btree ("published_locale");
  CREATE INDEX "_grantcards_v_latest_idx" ON "_grantcards_v" USING btree ("latest");
  CREATE INDEX "_grantcards_v_version_version_title_idx" ON "_grantcards_v_locales" USING btree ("version_title","_locale");
  CREATE UNIQUE INDEX "_grantcards_v_locales_locale_parent_id_unique" ON "_grantcards_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_grantcards_v_rels_order_idx" ON "_grantcards_v_rels" USING btree ("order");
  CREATE INDEX "_grantcards_v_rels_parent_idx" ON "_grantcards_v_rels" USING btree ("parent_id");
  CREATE INDEX "_grantcards_v_rels_path_idx" ON "_grantcards_v_rels" USING btree ("path");
  CREATE INDEX "_grantcards_v_rels_grants_id_idx" ON "_grantcards_v_rels" USING btree ("grants_id");
  CREATE INDEX "_grantcards_v_rels_posts_id_idx" ON "_grantcards_v_rels" USING btree ("posts_id");
  CREATE INDEX "_grantcards_v_rels_documents_id_idx" ON "_grantcards_v_rels" USING btree ("documents_id");
  CREATE INDEX "posts_populated_authors_order_idx" ON "posts_populated_authors" USING btree ("_order");
  CREATE INDEX "posts_populated_authors_parent_id_idx" ON "posts_populated_authors" USING btree ("_parent_id");
  CREATE INDEX "posts_slug_idx" ON "posts" USING btree ("slug");
  CREATE INDEX "posts_updated_at_idx" ON "posts" USING btree ("updated_at");
  CREATE INDEX "posts_created_at_idx" ON "posts" USING btree ("created_at");
  CREATE INDEX "posts__status_idx" ON "posts" USING btree ("_status");
  CREATE INDEX "posts_meta_meta_image_idx" ON "posts_locales" USING btree ("meta_image_id","_locale");
  CREATE UNIQUE INDEX "posts_locales_locale_parent_id_unique" ON "posts_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "posts_rels_order_idx" ON "posts_rels" USING btree ("order");
  CREATE INDEX "posts_rels_parent_idx" ON "posts_rels" USING btree ("parent_id");
  CREATE INDEX "posts_rels_path_idx" ON "posts_rels" USING btree ("path");
  CREATE INDEX "posts_rels_posts_id_idx" ON "posts_rels" USING btree ("posts_id");
  CREATE INDEX "posts_rels_categories_id_idx" ON "posts_rels" USING btree ("categories_id");
  CREATE INDEX "posts_rels_users_id_idx" ON "posts_rels" USING btree ("users_id");
  CREATE INDEX "_posts_v_version_populated_authors_order_idx" ON "_posts_v_version_populated_authors" USING btree ("_order");
  CREATE INDEX "_posts_v_version_populated_authors_parent_id_idx" ON "_posts_v_version_populated_authors" USING btree ("_parent_id");
  CREATE INDEX "_posts_v_parent_idx" ON "_posts_v" USING btree ("parent_id");
  CREATE INDEX "_posts_v_version_version_slug_idx" ON "_posts_v" USING btree ("version_slug");
  CREATE INDEX "_posts_v_version_version_updated_at_idx" ON "_posts_v" USING btree ("version_updated_at");
  CREATE INDEX "_posts_v_version_version_created_at_idx" ON "_posts_v" USING btree ("version_created_at");
  CREATE INDEX "_posts_v_version_version__status_idx" ON "_posts_v" USING btree ("version__status");
  CREATE INDEX "_posts_v_created_at_idx" ON "_posts_v" USING btree ("created_at");
  CREATE INDEX "_posts_v_updated_at_idx" ON "_posts_v" USING btree ("updated_at");
  CREATE INDEX "_posts_v_snapshot_idx" ON "_posts_v" USING btree ("snapshot");
  CREATE INDEX "_posts_v_published_locale_idx" ON "_posts_v" USING btree ("published_locale");
  CREATE INDEX "_posts_v_latest_idx" ON "_posts_v" USING btree ("latest");
  CREATE INDEX "_posts_v_autosave_idx" ON "_posts_v" USING btree ("autosave");
  CREATE INDEX "_posts_v_version_meta_version_meta_image_idx" ON "_posts_v_locales" USING btree ("version_meta_image_id","_locale");
  CREATE UNIQUE INDEX "_posts_v_locales_locale_parent_id_unique" ON "_posts_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_posts_v_rels_order_idx" ON "_posts_v_rels" USING btree ("order");
  CREATE INDEX "_posts_v_rels_parent_idx" ON "_posts_v_rels" USING btree ("parent_id");
  CREATE INDEX "_posts_v_rels_path_idx" ON "_posts_v_rels" USING btree ("path");
  CREATE INDEX "_posts_v_rels_posts_id_idx" ON "_posts_v_rels" USING btree ("posts_id");
  CREATE INDEX "_posts_v_rels_categories_id_idx" ON "_posts_v_rels" USING btree ("categories_id");
  CREATE INDEX "_posts_v_rels_users_id_idx" ON "_posts_v_rels" USING btree ("users_id");
  CREATE INDEX "media_cloud_updated_at_idx" ON "media_cloud" USING btree ("updated_at");
  CREATE INDEX "media_cloud_created_at_idx" ON "media_cloud" USING btree ("created_at");
  CREATE UNIQUE INDEX "media_cloud_filename_idx" ON "media_cloud" USING btree ("filename");
  CREATE INDEX "media_cloud_sizes_thumbnail_sizes_thumbnail_filename_idx" ON "media_cloud" USING btree ("sizes_thumbnail_filename");
  CREATE INDEX "media_cloud_sizes_small_sizes_small_filename_idx" ON "media_cloud" USING btree ("sizes_small_filename");
  CREATE INDEX "media_cloud_sizes_medium_sizes_medium_filename_idx" ON "media_cloud" USING btree ("sizes_medium_filename");
  CREATE INDEX "media_cloud_sizes_large_sizes_large_filename_idx" ON "media_cloud" USING btree ("sizes_large_filename");
  CREATE INDEX "media_cloud_sizes_xlarge_sizes_xlarge_filename_idx" ON "media_cloud" USING btree ("sizes_xlarge_filename");
  CREATE INDEX "asset_cloud_updated_at_idx" ON "asset_cloud" USING btree ("updated_at");
  CREATE INDEX "asset_cloud_created_at_idx" ON "asset_cloud" USING btree ("created_at");
  CREATE UNIQUE INDEX "asset_cloud_filename_idx" ON "asset_cloud" USING btree ("filename");
  CREATE INDEX "asset_cloud_sizes_thumbnail_sizes_thumbnail_filename_idx" ON "asset_cloud" USING btree ("sizes_thumbnail_filename");
  CREATE INDEX "asset_cloud_sizes_small_sizes_small_filename_idx" ON "asset_cloud" USING btree ("sizes_small_filename");
  CREATE INDEX "asset_cloud_sizes_medium_sizes_medium_filename_idx" ON "asset_cloud" USING btree ("sizes_medium_filename");
  CREATE INDEX "asset_cloud_sizes_large_sizes_large_filename_idx" ON "asset_cloud" USING btree ("sizes_large_filename");
  CREATE INDEX "asset_cloud_sizes_xlarge_sizes_xlarge_filename_idx" ON "asset_cloud" USING btree ("sizes_xlarge_filename");
  CREATE INDEX "documents_updated_at_idx" ON "documents" USING btree ("updated_at");
  CREATE INDEX "documents_created_at_idx" ON "documents" USING btree ("created_at");
  CREATE UNIQUE INDEX "documents_filename_idx" ON "documents" USING btree ("filename");
  CREATE INDEX "categories_breadcrumbs_order_idx" ON "categories_breadcrumbs" USING btree ("_order");
  CREATE INDEX "categories_breadcrumbs_parent_id_idx" ON "categories_breadcrumbs" USING btree ("_parent_id");
  CREATE INDEX "categories_breadcrumbs_locale_idx" ON "categories_breadcrumbs" USING btree ("_locale");
  CREATE INDEX "categories_breadcrumbs_doc_idx" ON "categories_breadcrumbs" USING btree ("doc_id");
  CREATE INDEX "categories_parent_idx" ON "categories" USING btree ("parent_id");
  CREATE INDEX "categories_updated_at_idx" ON "categories" USING btree ("updated_at");
  CREATE INDEX "categories_created_at_idx" ON "categories" USING btree ("created_at");
  CREATE INDEX "users_sessions_order_idx" ON "users_sessions" USING btree ("_order");
  CREATE INDEX "users_sessions_parent_id_idx" ON "users_sessions" USING btree ("_parent_id");
  CREATE INDEX "users_avatar_idx" ON "users" USING btree ("avatar_id");
  CREATE INDEX "users_updated_at_idx" ON "users" USING btree ("updated_at");
  CREATE INDEX "users_created_at_idx" ON "users" USING btree ("created_at");
  CREATE UNIQUE INDEX "users_email_idx" ON "users" USING btree ("email");
  CREATE UNIQUE INDEX "redirects_from_idx" ON "redirects" USING btree ("from");
  CREATE INDEX "redirects_updated_at_idx" ON "redirects" USING btree ("updated_at");
  CREATE INDEX "redirects_created_at_idx" ON "redirects" USING btree ("created_at");
  CREATE INDEX "redirects_rels_order_idx" ON "redirects_rels" USING btree ("order");
  CREATE INDEX "redirects_rels_parent_idx" ON "redirects_rels" USING btree ("parent_id");
  CREATE INDEX "redirects_rels_path_idx" ON "redirects_rels" USING btree ("path");
  CREATE INDEX "redirects_rels_posts_id_idx" ON "redirects_rels" USING btree ("posts_id");
  CREATE INDEX "forms_blocks_checkbox_order_idx" ON "forms_blocks_checkbox" USING btree ("_order");
  CREATE INDEX "forms_blocks_checkbox_parent_id_idx" ON "forms_blocks_checkbox" USING btree ("_parent_id");
  CREATE INDEX "forms_blocks_checkbox_path_idx" ON "forms_blocks_checkbox" USING btree ("_path");
  CREATE UNIQUE INDEX "forms_blocks_checkbox_locales_locale_parent_id_unique" ON "forms_blocks_checkbox_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "forms_blocks_country_order_idx" ON "forms_blocks_country" USING btree ("_order");
  CREATE INDEX "forms_blocks_country_parent_id_idx" ON "forms_blocks_country" USING btree ("_parent_id");
  CREATE INDEX "forms_blocks_country_path_idx" ON "forms_blocks_country" USING btree ("_path");
  CREATE UNIQUE INDEX "forms_blocks_country_locales_locale_parent_id_unique" ON "forms_blocks_country_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "forms_blocks_email_order_idx" ON "forms_blocks_email" USING btree ("_order");
  CREATE INDEX "forms_blocks_email_parent_id_idx" ON "forms_blocks_email" USING btree ("_parent_id");
  CREATE INDEX "forms_blocks_email_path_idx" ON "forms_blocks_email" USING btree ("_path");
  CREATE UNIQUE INDEX "forms_blocks_email_locales_locale_parent_id_unique" ON "forms_blocks_email_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "forms_blocks_message_order_idx" ON "forms_blocks_message" USING btree ("_order");
  CREATE INDEX "forms_blocks_message_parent_id_idx" ON "forms_blocks_message" USING btree ("_parent_id");
  CREATE INDEX "forms_blocks_message_path_idx" ON "forms_blocks_message" USING btree ("_path");
  CREATE UNIQUE INDEX "forms_blocks_message_locales_locale_parent_id_unique" ON "forms_blocks_message_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "forms_blocks_number_order_idx" ON "forms_blocks_number" USING btree ("_order");
  CREATE INDEX "forms_blocks_number_parent_id_idx" ON "forms_blocks_number" USING btree ("_parent_id");
  CREATE INDEX "forms_blocks_number_path_idx" ON "forms_blocks_number" USING btree ("_path");
  CREATE UNIQUE INDEX "forms_blocks_number_locales_locale_parent_id_unique" ON "forms_blocks_number_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "forms_blocks_select_options_order_idx" ON "forms_blocks_select_options" USING btree ("_order");
  CREATE INDEX "forms_blocks_select_options_parent_id_idx" ON "forms_blocks_select_options" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "forms_blocks_select_options_locales_locale_parent_id_unique" ON "forms_blocks_select_options_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "forms_blocks_select_order_idx" ON "forms_blocks_select" USING btree ("_order");
  CREATE INDEX "forms_blocks_select_parent_id_idx" ON "forms_blocks_select" USING btree ("_parent_id");
  CREATE INDEX "forms_blocks_select_path_idx" ON "forms_blocks_select" USING btree ("_path");
  CREATE UNIQUE INDEX "forms_blocks_select_locales_locale_parent_id_unique" ON "forms_blocks_select_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "forms_blocks_state_order_idx" ON "forms_blocks_state" USING btree ("_order");
  CREATE INDEX "forms_blocks_state_parent_id_idx" ON "forms_blocks_state" USING btree ("_parent_id");
  CREATE INDEX "forms_blocks_state_path_idx" ON "forms_blocks_state" USING btree ("_path");
  CREATE UNIQUE INDEX "forms_blocks_state_locales_locale_parent_id_unique" ON "forms_blocks_state_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "forms_blocks_text_order_idx" ON "forms_blocks_text" USING btree ("_order");
  CREATE INDEX "forms_blocks_text_parent_id_idx" ON "forms_blocks_text" USING btree ("_parent_id");
  CREATE INDEX "forms_blocks_text_path_idx" ON "forms_blocks_text" USING btree ("_path");
  CREATE UNIQUE INDEX "forms_blocks_text_locales_locale_parent_id_unique" ON "forms_blocks_text_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "forms_blocks_textarea_order_idx" ON "forms_blocks_textarea" USING btree ("_order");
  CREATE INDEX "forms_blocks_textarea_parent_id_idx" ON "forms_blocks_textarea" USING btree ("_parent_id");
  CREATE INDEX "forms_blocks_textarea_path_idx" ON "forms_blocks_textarea" USING btree ("_path");
  CREATE UNIQUE INDEX "forms_blocks_textarea_locales_locale_parent_id_unique" ON "forms_blocks_textarea_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "forms_emails_order_idx" ON "forms_emails" USING btree ("_order");
  CREATE INDEX "forms_emails_parent_id_idx" ON "forms_emails" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "forms_emails_locales_locale_parent_id_unique" ON "forms_emails_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "forms_updated_at_idx" ON "forms" USING btree ("updated_at");
  CREATE INDEX "forms_created_at_idx" ON "forms" USING btree ("created_at");
  CREATE UNIQUE INDEX "forms_locales_locale_parent_id_unique" ON "forms_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "form_submissions_submission_data_order_idx" ON "form_submissions_submission_data" USING btree ("_order");
  CREATE INDEX "form_submissions_submission_data_parent_id_idx" ON "form_submissions_submission_data" USING btree ("_parent_id");
  CREATE INDEX "form_submissions_form_idx" ON "form_submissions" USING btree ("form_id");
  CREATE INDEX "form_submissions_updated_at_idx" ON "form_submissions" USING btree ("updated_at");
  CREATE INDEX "form_submissions_created_at_idx" ON "form_submissions" USING btree ("created_at");
  CREATE INDEX "search_categories_order_idx" ON "search_categories" USING btree ("_order");
  CREATE INDEX "search_categories_parent_id_idx" ON "search_categories" USING btree ("_parent_id");
  CREATE INDEX "search_slug_idx" ON "search" USING btree ("slug");
  CREATE INDEX "search_meta_meta_image_idx" ON "search" USING btree ("meta_image_id");
  CREATE INDEX "search_updated_at_idx" ON "search" USING btree ("updated_at");
  CREATE INDEX "search_created_at_idx" ON "search" USING btree ("created_at");
  CREATE UNIQUE INDEX "search_locales_locale_parent_id_unique" ON "search_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "search_rels_order_idx" ON "search_rels" USING btree ("order");
  CREATE INDEX "search_rels_parent_idx" ON "search_rels" USING btree ("parent_id");
  CREATE INDEX "search_rels_path_idx" ON "search_rels" USING btree ("path");
  CREATE INDEX "search_rels_posts_id_idx" ON "search_rels" USING btree ("posts_id");
  CREATE INDEX "payload_locked_documents_global_slug_idx" ON "payload_locked_documents" USING btree ("global_slug");
  CREATE INDEX "payload_locked_documents_updated_at_idx" ON "payload_locked_documents" USING btree ("updated_at");
  CREATE INDEX "payload_locked_documents_created_at_idx" ON "payload_locked_documents" USING btree ("created_at");
  CREATE INDEX "payload_locked_documents_rels_order_idx" ON "payload_locked_documents_rels" USING btree ("order");
  CREATE INDEX "payload_locked_documents_rels_parent_idx" ON "payload_locked_documents_rels" USING btree ("parent_id");
  CREATE INDEX "payload_locked_documents_rels_path_idx" ON "payload_locked_documents_rels" USING btree ("path");
  CREATE INDEX "payload_locked_documents_rels_grants_id_idx" ON "payload_locked_documents_rels" USING btree ("grants_id");
  CREATE INDEX "payload_locked_documents_rels_grantcards_id_idx" ON "payload_locked_documents_rels" USING btree ("grantcards_id");
  CREATE INDEX "payload_locked_documents_rels_posts_id_idx" ON "payload_locked_documents_rels" USING btree ("posts_id");
  CREATE INDEX "payload_locked_documents_rels_media_cloud_id_idx" ON "payload_locked_documents_rels" USING btree ("media_cloud_id");
  CREATE INDEX "payload_locked_documents_rels_asset_cloud_id_idx" ON "payload_locked_documents_rels" USING btree ("asset_cloud_id");
  CREATE INDEX "payload_locked_documents_rels_documents_id_idx" ON "payload_locked_documents_rels" USING btree ("documents_id");
  CREATE INDEX "payload_locked_documents_rels_categories_id_idx" ON "payload_locked_documents_rels" USING btree ("categories_id");
  CREATE INDEX "payload_locked_documents_rels_users_id_idx" ON "payload_locked_documents_rels" USING btree ("users_id");
  CREATE INDEX "payload_locked_documents_rels_redirects_id_idx" ON "payload_locked_documents_rels" USING btree ("redirects_id");
  CREATE INDEX "payload_locked_documents_rels_forms_id_idx" ON "payload_locked_documents_rels" USING btree ("forms_id");
  CREATE INDEX "payload_locked_documents_rels_form_submissions_id_idx" ON "payload_locked_documents_rels" USING btree ("form_submissions_id");
  CREATE INDEX "payload_locked_documents_rels_search_id_idx" ON "payload_locked_documents_rels" USING btree ("search_id");
  CREATE INDEX "payload_preferences_key_idx" ON "payload_preferences" USING btree ("key");
  CREATE INDEX "payload_preferences_updated_at_idx" ON "payload_preferences" USING btree ("updated_at");
  CREATE INDEX "payload_preferences_created_at_idx" ON "payload_preferences" USING btree ("created_at");
  CREATE INDEX "payload_preferences_rels_order_idx" ON "payload_preferences_rels" USING btree ("order");
  CREATE INDEX "payload_preferences_rels_parent_idx" ON "payload_preferences_rels" USING btree ("parent_id");
  CREATE INDEX "payload_preferences_rels_path_idx" ON "payload_preferences_rels" USING btree ("path");
  CREATE INDEX "payload_preferences_rels_users_id_idx" ON "payload_preferences_rels" USING btree ("users_id");
  CREATE INDEX "payload_migrations_updated_at_idx" ON "payload_migrations" USING btree ("updated_at");
  CREATE INDEX "payload_migrations_created_at_idx" ON "payload_migrations" USING btree ("created_at");
  CREATE INDEX "homepage_hero_section_cta_button_order_idx" ON "homepage_hero_section_cta_button" USING btree ("_order");
  CREATE INDEX "homepage_hero_section_cta_button_parent_id_idx" ON "homepage_hero_section_cta_button" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "homepage_hero_section_cta_button_locales_locale_parent_id_unique" ON "homepage_hero_section_cta_button_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "homepage_blocks_secondarycta_cta_button_order_idx" ON "homepage_blocks_secondarycta_cta_button" USING btree ("_order");
  CREATE INDEX "homepage_blocks_secondarycta_cta_button_parent_id_idx" ON "homepage_blocks_secondarycta_cta_button" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "homepage_blocks_secondarycta_cta_button_locales_locale_parent_id_unique" ON "homepage_blocks_secondarycta_cta_button_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "homepage_blocks_secondarycta_order_idx" ON "homepage_blocks_secondarycta" USING btree ("_order");
  CREATE INDEX "homepage_blocks_secondarycta_parent_id_idx" ON "homepage_blocks_secondarycta" USING btree ("_parent_id");
  CREATE INDEX "homepage_blocks_secondarycta_path_idx" ON "homepage_blocks_secondarycta" USING btree ("_path");
  CREATE UNIQUE INDEX "homepage_blocks_secondarycta_locales_locale_parent_id_unique" ON "homepage_blocks_secondarycta_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "homepage_blocks_mcol_info_block_multicols_order_idx" ON "homepage_blocks_mcol_info_block_multicols" USING btree ("_order");
  CREATE INDEX "homepage_blocks_mcol_info_block_multicols_parent_id_idx" ON "homepage_blocks_mcol_info_block_multicols" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "homepage_blocks_mcol_info_block_multicols_locales_locale_parent_id_unique" ON "homepage_blocks_mcol_info_block_multicols_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "homepage_blocks_mcol_info_block_order_idx" ON "homepage_blocks_mcol_info_block" USING btree ("_order");
  CREATE INDEX "homepage_blocks_mcol_info_block_parent_id_idx" ON "homepage_blocks_mcol_info_block" USING btree ("_parent_id");
  CREATE INDEX "homepage_blocks_mcol_info_block_path_idx" ON "homepage_blocks_mcol_info_block" USING btree ("_path");
  CREATE INDEX "homepage_blocks_grant_card_grid_block_order_idx" ON "homepage_blocks_grant_card_grid_block" USING btree ("_order");
  CREATE INDEX "homepage_blocks_grant_card_grid_block_parent_id_idx" ON "homepage_blocks_grant_card_grid_block" USING btree ("_parent_id");
  CREATE INDEX "homepage_blocks_grant_card_grid_block_path_idx" ON "homepage_blocks_grant_card_grid_block" USING btree ("_path");
  CREATE UNIQUE INDEX "homepage_blocks_grant_card_grid_block_locales_locale_parent_id_unique" ON "homepage_blocks_grant_card_grid_block_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "homepage_blocks_mstep_process_steps_details_order_idx" ON "homepage_blocks_mstep_process_steps_details" USING btree ("_order");
  CREATE INDEX "homepage_blocks_mstep_process_steps_details_parent_id_idx" ON "homepage_blocks_mstep_process_steps_details" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "homepage_blocks_mstep_process_steps_details_locales_locale_parent_id_unique" ON "homepage_blocks_mstep_process_steps_details_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "homepage_blocks_mstep_process_steps_order_idx" ON "homepage_blocks_mstep_process_steps" USING btree ("_order");
  CREATE INDEX "homepage_blocks_mstep_process_steps_parent_id_idx" ON "homepage_blocks_mstep_process_steps" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "homepage_blocks_mstep_process_steps_locales_locale_parent_id_unique" ON "homepage_blocks_mstep_process_steps_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "homepage_blocks_mstep_process_order_idx" ON "homepage_blocks_mstep_process" USING btree ("_order");
  CREATE INDEX "homepage_blocks_mstep_process_parent_id_idx" ON "homepage_blocks_mstep_process" USING btree ("_parent_id");
  CREATE INDEX "homepage_blocks_mstep_process_path_idx" ON "homepage_blocks_mstep_process" USING btree ("_path");
  CREATE UNIQUE INDEX "homepage_blocks_mstep_process_locales_locale_parent_id_unique" ON "homepage_blocks_mstep_process_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "homepage_blocks_comparison_blk_lft_grp_lft_points_order_idx" ON "homepage_blocks_comparison_blk_lft_grp_lft_points" USING btree ("_order");
  CREATE INDEX "homepage_blocks_comparison_blk_lft_grp_lft_points_parent_id_idx" ON "homepage_blocks_comparison_blk_lft_grp_lft_points" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "homepage_blocks_comparison_blk_lft_grp_lft_points_locales_locale_parent_id_unique" ON "homepage_blocks_comparison_blk_lft_grp_lft_points_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "homepage_blocks_comparison_blk_rt_grp_rt_points_order_idx" ON "homepage_blocks_comparison_blk_rt_grp_rt_points" USING btree ("_order");
  CREATE INDEX "homepage_blocks_comparison_blk_rt_grp_rt_points_parent_id_idx" ON "homepage_blocks_comparison_blk_rt_grp_rt_points" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "homepage_blocks_comparison_blk_rt_grp_rt_points_locales_locale_parent_id_unique" ON "homepage_blocks_comparison_blk_rt_grp_rt_points_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "homepage_blocks_comparison_blk_buttons_order_idx" ON "homepage_blocks_comparison_blk_buttons" USING btree ("_order");
  CREATE INDEX "homepage_blocks_comparison_blk_buttons_parent_id_idx" ON "homepage_blocks_comparison_blk_buttons" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "homepage_blocks_comparison_blk_buttons_locales_locale_parent_id_unique" ON "homepage_blocks_comparison_blk_buttons_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "homepage_blocks_comparison_blk_order_idx" ON "homepage_blocks_comparison_blk" USING btree ("_order");
  CREATE INDEX "homepage_blocks_comparison_blk_parent_id_idx" ON "homepage_blocks_comparison_blk" USING btree ("_parent_id");
  CREATE INDEX "homepage_blocks_comparison_blk_path_idx" ON "homepage_blocks_comparison_blk" USING btree ("_path");
  CREATE UNIQUE INDEX "homepage_blocks_comparison_blk_locales_locale_parent_id_unique" ON "homepage_blocks_comparison_blk_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "homepage_blocks_ylw_deck_cards_links_order_idx" ON "homepage_blocks_ylw_deck_cards_links" USING btree ("_order");
  CREATE INDEX "homepage_blocks_ylw_deck_cards_links_parent_id_idx" ON "homepage_blocks_ylw_deck_cards_links" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "homepage_blocks_ylw_deck_cards_links_locales_locale_parent_id_unique" ON "homepage_blocks_ylw_deck_cards_links_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "homepage_blocks_ylw_deck_cards_order_idx" ON "homepage_blocks_ylw_deck_cards" USING btree ("_order");
  CREATE INDEX "homepage_blocks_ylw_deck_cards_parent_id_idx" ON "homepage_blocks_ylw_deck_cards" USING btree ("_parent_id");
  CREATE INDEX "homepage_blocks_ylw_deck_cards_mascot_idx" ON "homepage_blocks_ylw_deck_cards" USING btree ("mascot_id");
  CREATE UNIQUE INDEX "homepage_blocks_ylw_deck_cards_locales_locale_parent_id_unique" ON "homepage_blocks_ylw_deck_cards_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "homepage_blocks_ylw_deck_order_idx" ON "homepage_blocks_ylw_deck" USING btree ("_order");
  CREATE INDEX "homepage_blocks_ylw_deck_parent_id_idx" ON "homepage_blocks_ylw_deck" USING btree ("_parent_id");
  CREATE INDEX "homepage_blocks_ylw_deck_path_idx" ON "homepage_blocks_ylw_deck" USING btree ("_path");
  CREATE UNIQUE INDEX "homepage_blocks_ylw_deck_locales_locale_parent_id_unique" ON "homepage_blocks_ylw_deck_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "homepage_blocks_feat_crd_tags_order_idx" ON "homepage_blocks_feat_crd_tags" USING btree ("_order");
  CREATE INDEX "homepage_blocks_feat_crd_tags_parent_id_idx" ON "homepage_blocks_feat_crd_tags" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "homepage_blocks_feat_crd_tags_locales_locale_parent_id_unique" ON "homepage_blocks_feat_crd_tags_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "homepage_blocks_feat_crd_order_idx" ON "homepage_blocks_feat_crd" USING btree ("_order");
  CREATE INDEX "homepage_blocks_feat_crd_parent_id_idx" ON "homepage_blocks_feat_crd" USING btree ("_parent_id");
  CREATE INDEX "homepage_blocks_feat_crd_path_idx" ON "homepage_blocks_feat_crd" USING btree ("_path");
  CREATE INDEX "homepage_blocks_feat_crd_image_idx" ON "homepage_blocks_feat_crd" USING btree ("image_id");
  CREATE UNIQUE INDEX "homepage_blocks_feat_crd_locales_locale_parent_id_unique" ON "homepage_blocks_feat_crd_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "homepage_blocks_feat_crd_acc_feat_crds_order_idx" ON "homepage_blocks_feat_crd_acc_feat_crds" USING btree ("_order");
  CREATE INDEX "homepage_blocks_feat_crd_acc_feat_crds_parent_id_idx" ON "homepage_blocks_feat_crd_acc_feat_crds" USING btree ("_parent_id");
  CREATE INDEX "homepage_blocks_feat_crd_acc_feat_crds_mascot_idx" ON "homepage_blocks_feat_crd_acc_feat_crds" USING btree ("mascot_id");
  CREATE UNIQUE INDEX "homepage_blocks_feat_crd_acc_feat_crds_locales_locale_parent_id_unique" ON "homepage_blocks_feat_crd_acc_feat_crds_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "homepage_blocks_feat_crd_acc_order_idx" ON "homepage_blocks_feat_crd_acc" USING btree ("_order");
  CREATE INDEX "homepage_blocks_feat_crd_acc_parent_id_idx" ON "homepage_blocks_feat_crd_acc" USING btree ("_parent_id");
  CREATE INDEX "homepage_blocks_feat_crd_acc_path_idx" ON "homepage_blocks_feat_crd_acc" USING btree ("_path");
  CREATE UNIQUE INDEX "homepage_blocks_feat_crd_acc_locales_locale_parent_id_unique" ON "homepage_blocks_feat_crd_acc_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "homepage_blocks_list_crd_dck_cards_tags_order_idx" ON "homepage_blocks_list_crd_dck_cards_tags" USING btree ("_order");
  CREATE INDEX "homepage_blocks_list_crd_dck_cards_tags_parent_id_idx" ON "homepage_blocks_list_crd_dck_cards_tags" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "homepage_blocks_list_crd_dck_cards_tags_locales_locale_parent_id_unique" ON "homepage_blocks_list_crd_dck_cards_tags_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "homepage_blocks_list_crd_dck_cards_order_idx" ON "homepage_blocks_list_crd_dck_cards" USING btree ("_order");
  CREATE INDEX "homepage_blocks_list_crd_dck_cards_parent_id_idx" ON "homepage_blocks_list_crd_dck_cards" USING btree ("_parent_id");
  CREATE INDEX "homepage_blocks_list_crd_dck_cards_image_idx" ON "homepage_blocks_list_crd_dck_cards" USING btree ("image_id");
  CREATE UNIQUE INDEX "homepage_blocks_list_crd_dck_cards_locales_locale_parent_id_unique" ON "homepage_blocks_list_crd_dck_cards_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "homepage_blocks_list_crd_dck_buttons_order_idx" ON "homepage_blocks_list_crd_dck_buttons" USING btree ("_order");
  CREATE INDEX "homepage_blocks_list_crd_dck_buttons_parent_id_idx" ON "homepage_blocks_list_crd_dck_buttons" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "homepage_blocks_list_crd_dck_buttons_locales_locale_parent_id_unique" ON "homepage_blocks_list_crd_dck_buttons_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "homepage_blocks_list_crd_dck_order_idx" ON "homepage_blocks_list_crd_dck" USING btree ("_order");
  CREATE INDEX "homepage_blocks_list_crd_dck_parent_id_idx" ON "homepage_blocks_list_crd_dck" USING btree ("_parent_id");
  CREATE INDEX "homepage_blocks_list_crd_dck_path_idx" ON "homepage_blocks_list_crd_dck" USING btree ("_path");
  CREATE UNIQUE INDEX "homepage_blocks_list_crd_dck_locales_locale_parent_id_unique" ON "homepage_blocks_list_crd_dck_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "homepage_blocks_faq_blk_faqs_order_idx" ON "homepage_blocks_faq_blk_faqs" USING btree ("_order");
  CREATE INDEX "homepage_blocks_faq_blk_faqs_parent_id_idx" ON "homepage_blocks_faq_blk_faqs" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "homepage_blocks_faq_blk_faqs_locales_locale_parent_id_unique" ON "homepage_blocks_faq_blk_faqs_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "homepage_blocks_faq_blk_order_idx" ON "homepage_blocks_faq_blk" USING btree ("_order");
  CREATE INDEX "homepage_blocks_faq_blk_parent_id_idx" ON "homepage_blocks_faq_blk" USING btree ("_parent_id");
  CREATE INDEX "homepage_blocks_faq_blk_path_idx" ON "homepage_blocks_faq_blk" USING btree ("_path");
  CREATE UNIQUE INDEX "homepage_blocks_faq_blk_locales_locale_parent_id_unique" ON "homepage_blocks_faq_blk_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "homepage__status_idx" ON "homepage" USING btree ("_status");
  CREATE UNIQUE INDEX "homepage_locales_locale_parent_id_unique" ON "homepage_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "homepage_rels_order_idx" ON "homepage_rels" USING btree ("order");
  CREATE INDEX "homepage_rels_parent_idx" ON "homepage_rels" USING btree ("parent_id");
  CREATE INDEX "homepage_rels_path_idx" ON "homepage_rels" USING btree ("path");
  CREATE INDEX "homepage_rels_grants_id_idx" ON "homepage_rels" USING btree ("grants_id");
  CREATE INDEX "homepage_rels_posts_id_idx" ON "homepage_rels" USING btree ("posts_id");
  CREATE INDEX "homepage_rels_documents_id_idx" ON "homepage_rels" USING btree ("documents_id");
  CREATE INDEX "homepage_rels_grantcards_id_idx" ON "homepage_rels" USING btree ("grantcards_id");
  CREATE INDEX "_homepage_v_version_hero_section_cta_button_order_idx" ON "_homepage_v_version_hero_section_cta_button" USING btree ("_order");
  CREATE INDEX "_homepage_v_version_hero_section_cta_button_parent_id_idx" ON "_homepage_v_version_hero_section_cta_button" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_homepage_v_version_hero_section_cta_button_locales_locale_parent_id_unique" ON "_homepage_v_version_hero_section_cta_button_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_homepage_v_blocks_secondarycta_cta_button_order_idx" ON "_homepage_v_blocks_secondarycta_cta_button" USING btree ("_order");
  CREATE INDEX "_homepage_v_blocks_secondarycta_cta_button_parent_id_idx" ON "_homepage_v_blocks_secondarycta_cta_button" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_homepage_v_blocks_secondarycta_cta_button_locales_locale_parent_id_unique" ON "_homepage_v_blocks_secondarycta_cta_button_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_homepage_v_blocks_secondarycta_order_idx" ON "_homepage_v_blocks_secondarycta" USING btree ("_order");
  CREATE INDEX "_homepage_v_blocks_secondarycta_parent_id_idx" ON "_homepage_v_blocks_secondarycta" USING btree ("_parent_id");
  CREATE INDEX "_homepage_v_blocks_secondarycta_path_idx" ON "_homepage_v_blocks_secondarycta" USING btree ("_path");
  CREATE UNIQUE INDEX "_homepage_v_blocks_secondarycta_locales_locale_parent_id_unique" ON "_homepage_v_blocks_secondarycta_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_homepage_v_blocks_mcol_info_block_multicols_order_idx" ON "_homepage_v_blocks_mcol_info_block_multicols" USING btree ("_order");
  CREATE INDEX "_homepage_v_blocks_mcol_info_block_multicols_parent_id_idx" ON "_homepage_v_blocks_mcol_info_block_multicols" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_homepage_v_blocks_mcol_info_block_multicols_locales_locale_parent_id_unique" ON "_homepage_v_blocks_mcol_info_block_multicols_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_homepage_v_blocks_mcol_info_block_order_idx" ON "_homepage_v_blocks_mcol_info_block" USING btree ("_order");
  CREATE INDEX "_homepage_v_blocks_mcol_info_block_parent_id_idx" ON "_homepage_v_blocks_mcol_info_block" USING btree ("_parent_id");
  CREATE INDEX "_homepage_v_blocks_mcol_info_block_path_idx" ON "_homepage_v_blocks_mcol_info_block" USING btree ("_path");
  CREATE INDEX "_homepage_v_blocks_grant_card_grid_block_order_idx" ON "_homepage_v_blocks_grant_card_grid_block" USING btree ("_order");
  CREATE INDEX "_homepage_v_blocks_grant_card_grid_block_parent_id_idx" ON "_homepage_v_blocks_grant_card_grid_block" USING btree ("_parent_id");
  CREATE INDEX "_homepage_v_blocks_grant_card_grid_block_path_idx" ON "_homepage_v_blocks_grant_card_grid_block" USING btree ("_path");
  CREATE UNIQUE INDEX "_homepage_v_blocks_grant_card_grid_block_locales_locale_parent_id_unique" ON "_homepage_v_blocks_grant_card_grid_block_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_homepage_v_blocks_mstep_process_steps_details_order_idx" ON "_homepage_v_blocks_mstep_process_steps_details" USING btree ("_order");
  CREATE INDEX "_homepage_v_blocks_mstep_process_steps_details_parent_id_idx" ON "_homepage_v_blocks_mstep_process_steps_details" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_homepage_v_blocks_mstep_process_steps_details_locales_locale_parent_id_unique" ON "_homepage_v_blocks_mstep_process_steps_details_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_homepage_v_blocks_mstep_process_steps_order_idx" ON "_homepage_v_blocks_mstep_process_steps" USING btree ("_order");
  CREATE INDEX "_homepage_v_blocks_mstep_process_steps_parent_id_idx" ON "_homepage_v_blocks_mstep_process_steps" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_homepage_v_blocks_mstep_process_steps_locales_locale_parent_id_unique" ON "_homepage_v_blocks_mstep_process_steps_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_homepage_v_blocks_mstep_process_order_idx" ON "_homepage_v_blocks_mstep_process" USING btree ("_order");
  CREATE INDEX "_homepage_v_blocks_mstep_process_parent_id_idx" ON "_homepage_v_blocks_mstep_process" USING btree ("_parent_id");
  CREATE INDEX "_homepage_v_blocks_mstep_process_path_idx" ON "_homepage_v_blocks_mstep_process" USING btree ("_path");
  CREATE UNIQUE INDEX "_homepage_v_blocks_mstep_process_locales_locale_parent_id_unique" ON "_homepage_v_blocks_mstep_process_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_homepage_v_blocks_comparison_blk_lft_grp_lft_points_order_idx" ON "_homepage_v_blocks_comparison_blk_lft_grp_lft_points" USING btree ("_order");
  CREATE INDEX "_homepage_v_blocks_comparison_blk_lft_grp_lft_points_parent_id_idx" ON "_homepage_v_blocks_comparison_blk_lft_grp_lft_points" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_homepage_v_blocks_comparison_blk_lft_grp_lft_points_locales_locale_parent_id_unique" ON "_homepage_v_blocks_comparison_blk_lft_grp_lft_points_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_homepage_v_blocks_comparison_blk_rt_grp_rt_points_order_idx" ON "_homepage_v_blocks_comparison_blk_rt_grp_rt_points" USING btree ("_order");
  CREATE INDEX "_homepage_v_blocks_comparison_blk_rt_grp_rt_points_parent_id_idx" ON "_homepage_v_blocks_comparison_blk_rt_grp_rt_points" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_homepage_v_blocks_comparison_blk_rt_grp_rt_points_locales_locale_parent_id_unique" ON "_homepage_v_blocks_comparison_blk_rt_grp_rt_points_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_homepage_v_blocks_comparison_blk_buttons_order_idx" ON "_homepage_v_blocks_comparison_blk_buttons" USING btree ("_order");
  CREATE INDEX "_homepage_v_blocks_comparison_blk_buttons_parent_id_idx" ON "_homepage_v_blocks_comparison_blk_buttons" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_homepage_v_blocks_comparison_blk_buttons_locales_locale_parent_id_unique" ON "_homepage_v_blocks_comparison_blk_buttons_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_homepage_v_blocks_comparison_blk_order_idx" ON "_homepage_v_blocks_comparison_blk" USING btree ("_order");
  CREATE INDEX "_homepage_v_blocks_comparison_blk_parent_id_idx" ON "_homepage_v_blocks_comparison_blk" USING btree ("_parent_id");
  CREATE INDEX "_homepage_v_blocks_comparison_blk_path_idx" ON "_homepage_v_blocks_comparison_blk" USING btree ("_path");
  CREATE UNIQUE INDEX "_homepage_v_blocks_comparison_blk_locales_locale_parent_id_unique" ON "_homepage_v_blocks_comparison_blk_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_homepage_v_blocks_ylw_deck_cards_links_order_idx" ON "_homepage_v_blocks_ylw_deck_cards_links" USING btree ("_order");
  CREATE INDEX "_homepage_v_blocks_ylw_deck_cards_links_parent_id_idx" ON "_homepage_v_blocks_ylw_deck_cards_links" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_homepage_v_blocks_ylw_deck_cards_links_locales_locale_parent_id_unique" ON "_homepage_v_blocks_ylw_deck_cards_links_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_homepage_v_blocks_ylw_deck_cards_order_idx" ON "_homepage_v_blocks_ylw_deck_cards" USING btree ("_order");
  CREATE INDEX "_homepage_v_blocks_ylw_deck_cards_parent_id_idx" ON "_homepage_v_blocks_ylw_deck_cards" USING btree ("_parent_id");
  CREATE INDEX "_homepage_v_blocks_ylw_deck_cards_mascot_idx" ON "_homepage_v_blocks_ylw_deck_cards" USING btree ("mascot_id");
  CREATE UNIQUE INDEX "_homepage_v_blocks_ylw_deck_cards_locales_locale_parent_id_unique" ON "_homepage_v_blocks_ylw_deck_cards_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_homepage_v_blocks_ylw_deck_order_idx" ON "_homepage_v_blocks_ylw_deck" USING btree ("_order");
  CREATE INDEX "_homepage_v_blocks_ylw_deck_parent_id_idx" ON "_homepage_v_blocks_ylw_deck" USING btree ("_parent_id");
  CREATE INDEX "_homepage_v_blocks_ylw_deck_path_idx" ON "_homepage_v_blocks_ylw_deck" USING btree ("_path");
  CREATE UNIQUE INDEX "_homepage_v_blocks_ylw_deck_locales_locale_parent_id_unique" ON "_homepage_v_blocks_ylw_deck_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_homepage_v_blocks_feat_crd_tags_order_idx" ON "_homepage_v_blocks_feat_crd_tags" USING btree ("_order");
  CREATE INDEX "_homepage_v_blocks_feat_crd_tags_parent_id_idx" ON "_homepage_v_blocks_feat_crd_tags" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_homepage_v_blocks_feat_crd_tags_locales_locale_parent_id_unique" ON "_homepage_v_blocks_feat_crd_tags_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_homepage_v_blocks_feat_crd_order_idx" ON "_homepage_v_blocks_feat_crd" USING btree ("_order");
  CREATE INDEX "_homepage_v_blocks_feat_crd_parent_id_idx" ON "_homepage_v_blocks_feat_crd" USING btree ("_parent_id");
  CREATE INDEX "_homepage_v_blocks_feat_crd_path_idx" ON "_homepage_v_blocks_feat_crd" USING btree ("_path");
  CREATE INDEX "_homepage_v_blocks_feat_crd_image_idx" ON "_homepage_v_blocks_feat_crd" USING btree ("image_id");
  CREATE UNIQUE INDEX "_homepage_v_blocks_feat_crd_locales_locale_parent_id_unique" ON "_homepage_v_blocks_feat_crd_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_homepage_v_blocks_feat_crd_acc_feat_crds_order_idx" ON "_homepage_v_blocks_feat_crd_acc_feat_crds" USING btree ("_order");
  CREATE INDEX "_homepage_v_blocks_feat_crd_acc_feat_crds_parent_id_idx" ON "_homepage_v_blocks_feat_crd_acc_feat_crds" USING btree ("_parent_id");
  CREATE INDEX "_homepage_v_blocks_feat_crd_acc_feat_crds_mascot_idx" ON "_homepage_v_blocks_feat_crd_acc_feat_crds" USING btree ("mascot_id");
  CREATE UNIQUE INDEX "_homepage_v_blocks_feat_crd_acc_feat_crds_locales_locale_parent_id_unique" ON "_homepage_v_blocks_feat_crd_acc_feat_crds_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_homepage_v_blocks_feat_crd_acc_order_idx" ON "_homepage_v_blocks_feat_crd_acc" USING btree ("_order");
  CREATE INDEX "_homepage_v_blocks_feat_crd_acc_parent_id_idx" ON "_homepage_v_blocks_feat_crd_acc" USING btree ("_parent_id");
  CREATE INDEX "_homepage_v_blocks_feat_crd_acc_path_idx" ON "_homepage_v_blocks_feat_crd_acc" USING btree ("_path");
  CREATE UNIQUE INDEX "_homepage_v_blocks_feat_crd_acc_locales_locale_parent_id_unique" ON "_homepage_v_blocks_feat_crd_acc_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_homepage_v_blocks_list_crd_dck_cards_tags_order_idx" ON "_homepage_v_blocks_list_crd_dck_cards_tags" USING btree ("_order");
  CREATE INDEX "_homepage_v_blocks_list_crd_dck_cards_tags_parent_id_idx" ON "_homepage_v_blocks_list_crd_dck_cards_tags" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_homepage_v_blocks_list_crd_dck_cards_tags_locales_locale_parent_id_unique" ON "_homepage_v_blocks_list_crd_dck_cards_tags_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_homepage_v_blocks_list_crd_dck_cards_order_idx" ON "_homepage_v_blocks_list_crd_dck_cards" USING btree ("_order");
  CREATE INDEX "_homepage_v_blocks_list_crd_dck_cards_parent_id_idx" ON "_homepage_v_blocks_list_crd_dck_cards" USING btree ("_parent_id");
  CREATE INDEX "_homepage_v_blocks_list_crd_dck_cards_image_idx" ON "_homepage_v_blocks_list_crd_dck_cards" USING btree ("image_id");
  CREATE UNIQUE INDEX "_homepage_v_blocks_list_crd_dck_cards_locales_locale_parent_id_unique" ON "_homepage_v_blocks_list_crd_dck_cards_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_homepage_v_blocks_list_crd_dck_buttons_order_idx" ON "_homepage_v_blocks_list_crd_dck_buttons" USING btree ("_order");
  CREATE INDEX "_homepage_v_blocks_list_crd_dck_buttons_parent_id_idx" ON "_homepage_v_blocks_list_crd_dck_buttons" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_homepage_v_blocks_list_crd_dck_buttons_locales_locale_parent_id_unique" ON "_homepage_v_blocks_list_crd_dck_buttons_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_homepage_v_blocks_list_crd_dck_order_idx" ON "_homepage_v_blocks_list_crd_dck" USING btree ("_order");
  CREATE INDEX "_homepage_v_blocks_list_crd_dck_parent_id_idx" ON "_homepage_v_blocks_list_crd_dck" USING btree ("_parent_id");
  CREATE INDEX "_homepage_v_blocks_list_crd_dck_path_idx" ON "_homepage_v_blocks_list_crd_dck" USING btree ("_path");
  CREATE UNIQUE INDEX "_homepage_v_blocks_list_crd_dck_locales_locale_parent_id_unique" ON "_homepage_v_blocks_list_crd_dck_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_homepage_v_blocks_faq_blk_faqs_order_idx" ON "_homepage_v_blocks_faq_blk_faqs" USING btree ("_order");
  CREATE INDEX "_homepage_v_blocks_faq_blk_faqs_parent_id_idx" ON "_homepage_v_blocks_faq_blk_faqs" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_homepage_v_blocks_faq_blk_faqs_locales_locale_parent_id_unique" ON "_homepage_v_blocks_faq_blk_faqs_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_homepage_v_blocks_faq_blk_order_idx" ON "_homepage_v_blocks_faq_blk" USING btree ("_order");
  CREATE INDEX "_homepage_v_blocks_faq_blk_parent_id_idx" ON "_homepage_v_blocks_faq_blk" USING btree ("_parent_id");
  CREATE INDEX "_homepage_v_blocks_faq_blk_path_idx" ON "_homepage_v_blocks_faq_blk" USING btree ("_path");
  CREATE UNIQUE INDEX "_homepage_v_blocks_faq_blk_locales_locale_parent_id_unique" ON "_homepage_v_blocks_faq_blk_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_homepage_v_version_version__status_idx" ON "_homepage_v" USING btree ("version__status");
  CREATE INDEX "_homepage_v_created_at_idx" ON "_homepage_v" USING btree ("created_at");
  CREATE INDEX "_homepage_v_updated_at_idx" ON "_homepage_v" USING btree ("updated_at");
  CREATE INDEX "_homepage_v_snapshot_idx" ON "_homepage_v" USING btree ("snapshot");
  CREATE INDEX "_homepage_v_published_locale_idx" ON "_homepage_v" USING btree ("published_locale");
  CREATE INDEX "_homepage_v_latest_idx" ON "_homepage_v" USING btree ("latest");
  CREATE UNIQUE INDEX "_homepage_v_locales_locale_parent_id_unique" ON "_homepage_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_homepage_v_rels_order_idx" ON "_homepage_v_rels" USING btree ("order");
  CREATE INDEX "_homepage_v_rels_parent_idx" ON "_homepage_v_rels" USING btree ("parent_id");
  CREATE INDEX "_homepage_v_rels_path_idx" ON "_homepage_v_rels" USING btree ("path");
  CREATE INDEX "_homepage_v_rels_grants_id_idx" ON "_homepage_v_rels" USING btree ("grants_id");
  CREATE INDEX "_homepage_v_rels_posts_id_idx" ON "_homepage_v_rels" USING btree ("posts_id");
  CREATE INDEX "_homepage_v_rels_documents_id_idx" ON "_homepage_v_rels" USING btree ("documents_id");
  CREATE INDEX "_homepage_v_rels_grantcards_id_idx" ON "_homepage_v_rels" USING btree ("grantcards_id");
  CREATE INDEX "header_languages_order_idx" ON "header_languages" USING btree ("order");
  CREATE INDEX "header_languages_parent_idx" ON "header_languages" USING btree ("parent_id");
  CREATE INDEX "header_logo_idx" ON "header" USING btree ("logo_id");
  CREATE INDEX "footer_sm_links_group_sm_links_order_idx" ON "footer_sm_links_group_sm_links" USING btree ("_order");
  CREATE INDEX "footer_sm_links_group_sm_links_parent_id_idx" ON "footer_sm_links_group_sm_links" USING btree ("_parent_id");
  CREATE INDEX "footer_logo_idx" ON "footer" USING btree ("logo_id");
  CREATE UNIQUE INDEX "footer_locales_locale_parent_id_unique" ON "footer_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "nav_menu_items_nav_items_order_idx" ON "nav_menu_items_nav_items" USING btree ("_order");
  CREATE INDEX "nav_menu_items_nav_items_parent_id_idx" ON "nav_menu_items_nav_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "nav_menu_items_nav_items_locales_locale_parent_id_unique" ON "nav_menu_items_nav_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "nav_menu_items_order_idx" ON "nav_menu_items" USING btree ("_order");
  CREATE INDEX "nav_menu_items_parent_id_idx" ON "nav_menu_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "nav_menu_items_locales_locale_parent_id_unique" ON "nav_menu_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "nav_rels_order_idx" ON "nav_rels" USING btree ("order");
  CREATE INDEX "nav_rels_parent_idx" ON "nav_rels" USING btree ("parent_id");
  CREATE INDEX "nav_rels_path_idx" ON "nav_rels" USING btree ("path");
  CREATE INDEX "nav_rels_grants_id_idx" ON "nav_rels" USING btree ("grants_id");
  CREATE INDEX "nav_rels_posts_id_idx" ON "nav_rels" USING btree ("posts_id");
  CREATE INDEX "nav_rels_documents_id_idx" ON "nav_rels" USING btree ("documents_id");
  CREATE INDEX "contact_info_emails_order_idx" ON "contact_info_emails" USING btree ("_order");
  CREATE INDEX "contact_info_emails_parent_id_idx" ON "contact_info_emails" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "contact_info_emails_locales_locale_parent_id_unique" ON "contact_info_emails_locales" USING btree ("_locale","_parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "grants_hero_buttons" CASCADE;
  DROP TABLE "grants_hero_buttons_locales" CASCADE;
  DROP TABLE "grants_blocks_scol_info_blk_col_btns" CASCADE;
  DROP TABLE "grants_blocks_scol_info_blk_col_btns_locales" CASCADE;
  DROP TABLE "grants_blocks_scol_info_blk" CASCADE;
  DROP TABLE "grants_blocks_scol_info_blk_locales" CASCADE;
  DROP TABLE "grants_blocks_mcol_info_block_multicols" CASCADE;
  DROP TABLE "grants_blocks_mcol_info_block_multicols_locales" CASCADE;
  DROP TABLE "grants_blocks_mcol_info_block" CASCADE;
  DROP TABLE "grants_blocks_grant_card_grid_block" CASCADE;
  DROP TABLE "grants_blocks_grant_card_grid_block_locales" CASCADE;
  DROP TABLE "grants_blocks_mstep_process_steps_details" CASCADE;
  DROP TABLE "grants_blocks_mstep_process_steps_details_locales" CASCADE;
  DROP TABLE "grants_blocks_mstep_process_steps" CASCADE;
  DROP TABLE "grants_blocks_mstep_process_steps_locales" CASCADE;
  DROP TABLE "grants_blocks_mstep_process" CASCADE;
  DROP TABLE "grants_blocks_mstep_process_locales" CASCADE;
  DROP TABLE "grants_blocks_comparison_blk_lft_grp_lft_points" CASCADE;
  DROP TABLE "grants_blocks_comparison_blk_lft_grp_lft_points_locales" CASCADE;
  DROP TABLE "grants_blocks_comparison_blk_rt_grp_rt_points" CASCADE;
  DROP TABLE "grants_blocks_comparison_blk_rt_grp_rt_points_locales" CASCADE;
  DROP TABLE "grants_blocks_comparison_blk_buttons" CASCADE;
  DROP TABLE "grants_blocks_comparison_blk_buttons_locales" CASCADE;
  DROP TABLE "grants_blocks_comparison_blk" CASCADE;
  DROP TABLE "grants_blocks_comparison_blk_locales" CASCADE;
  DROP TABLE "grants_blocks_ylw_deck_cards_links" CASCADE;
  DROP TABLE "grants_blocks_ylw_deck_cards_links_locales" CASCADE;
  DROP TABLE "grants_blocks_ylw_deck_cards" CASCADE;
  DROP TABLE "grants_blocks_ylw_deck_cards_locales" CASCADE;
  DROP TABLE "grants_blocks_ylw_deck" CASCADE;
  DROP TABLE "grants_blocks_ylw_deck_locales" CASCADE;
  DROP TABLE "grants_blocks_feat_crd_tags" CASCADE;
  DROP TABLE "grants_blocks_feat_crd_tags_locales" CASCADE;
  DROP TABLE "grants_blocks_feat_crd" CASCADE;
  DROP TABLE "grants_blocks_feat_crd_locales" CASCADE;
  DROP TABLE "grants_blocks_feat_crd_acc_feat_crds" CASCADE;
  DROP TABLE "grants_blocks_feat_crd_acc_feat_crds_locales" CASCADE;
  DROP TABLE "grants_blocks_feat_crd_acc" CASCADE;
  DROP TABLE "grants_blocks_feat_crd_acc_locales" CASCADE;
  DROP TABLE "grants_blocks_list_crd_dck_cards_tags" CASCADE;
  DROP TABLE "grants_blocks_list_crd_dck_cards_tags_locales" CASCADE;
  DROP TABLE "grants_blocks_list_crd_dck_cards" CASCADE;
  DROP TABLE "grants_blocks_list_crd_dck_cards_locales" CASCADE;
  DROP TABLE "grants_blocks_list_crd_dck_buttons" CASCADE;
  DROP TABLE "grants_blocks_list_crd_dck_buttons_locales" CASCADE;
  DROP TABLE "grants_blocks_list_crd_dck" CASCADE;
  DROP TABLE "grants_blocks_list_crd_dck_locales" CASCADE;
  DROP TABLE "grants_blocks_faq_blk_faqs" CASCADE;
  DROP TABLE "grants_blocks_faq_blk_faqs_locales" CASCADE;
  DROP TABLE "grants_blocks_faq_blk" CASCADE;
  DROP TABLE "grants_blocks_faq_blk_locales" CASCADE;
  DROP TABLE "grants" CASCADE;
  DROP TABLE "grants_locales" CASCADE;
  DROP TABLE "grants_rels" CASCADE;
  DROP TABLE "_grants_v_version_hero_buttons" CASCADE;
  DROP TABLE "_grants_v_version_hero_buttons_locales" CASCADE;
  DROP TABLE "_grants_v_blocks_scol_info_blk_col_btns" CASCADE;
  DROP TABLE "_grants_v_blocks_scol_info_blk_col_btns_locales" CASCADE;
  DROP TABLE "_grants_v_blocks_scol_info_blk" CASCADE;
  DROP TABLE "_grants_v_blocks_scol_info_blk_locales" CASCADE;
  DROP TABLE "_grants_v_blocks_mcol_info_block_multicols" CASCADE;
  DROP TABLE "_grants_v_blocks_mcol_info_block_multicols_locales" CASCADE;
  DROP TABLE "_grants_v_blocks_mcol_info_block" CASCADE;
  DROP TABLE "_grants_v_blocks_grant_card_grid_block" CASCADE;
  DROP TABLE "_grants_v_blocks_grant_card_grid_block_locales" CASCADE;
  DROP TABLE "_grants_v_blocks_mstep_process_steps_details" CASCADE;
  DROP TABLE "_grants_v_blocks_mstep_process_steps_details_locales" CASCADE;
  DROP TABLE "_grants_v_blocks_mstep_process_steps" CASCADE;
  DROP TABLE "_grants_v_blocks_mstep_process_steps_locales" CASCADE;
  DROP TABLE "_grants_v_blocks_mstep_process" CASCADE;
  DROP TABLE "_grants_v_blocks_mstep_process_locales" CASCADE;
  DROP TABLE "_grants_v_blocks_comparison_blk_lft_grp_lft_points" CASCADE;
  DROP TABLE "_grants_v_blocks_comparison_blk_lft_grp_lft_points_locales" CASCADE;
  DROP TABLE "_grants_v_blocks_comparison_blk_rt_grp_rt_points" CASCADE;
  DROP TABLE "_grants_v_blocks_comparison_blk_rt_grp_rt_points_locales" CASCADE;
  DROP TABLE "_grants_v_blocks_comparison_blk_buttons" CASCADE;
  DROP TABLE "_grants_v_blocks_comparison_blk_buttons_locales" CASCADE;
  DROP TABLE "_grants_v_blocks_comparison_blk" CASCADE;
  DROP TABLE "_grants_v_blocks_comparison_blk_locales" CASCADE;
  DROP TABLE "_grants_v_blocks_ylw_deck_cards_links" CASCADE;
  DROP TABLE "_grants_v_blocks_ylw_deck_cards_links_locales" CASCADE;
  DROP TABLE "_grants_v_blocks_ylw_deck_cards" CASCADE;
  DROP TABLE "_grants_v_blocks_ylw_deck_cards_locales" CASCADE;
  DROP TABLE "_grants_v_blocks_ylw_deck" CASCADE;
  DROP TABLE "_grants_v_blocks_ylw_deck_locales" CASCADE;
  DROP TABLE "_grants_v_blocks_feat_crd_tags" CASCADE;
  DROP TABLE "_grants_v_blocks_feat_crd_tags_locales" CASCADE;
  DROP TABLE "_grants_v_blocks_feat_crd" CASCADE;
  DROP TABLE "_grants_v_blocks_feat_crd_locales" CASCADE;
  DROP TABLE "_grants_v_blocks_feat_crd_acc_feat_crds" CASCADE;
  DROP TABLE "_grants_v_blocks_feat_crd_acc_feat_crds_locales" CASCADE;
  DROP TABLE "_grants_v_blocks_feat_crd_acc" CASCADE;
  DROP TABLE "_grants_v_blocks_feat_crd_acc_locales" CASCADE;
  DROP TABLE "_grants_v_blocks_list_crd_dck_cards_tags" CASCADE;
  DROP TABLE "_grants_v_blocks_list_crd_dck_cards_tags_locales" CASCADE;
  DROP TABLE "_grants_v_blocks_list_crd_dck_cards" CASCADE;
  DROP TABLE "_grants_v_blocks_list_crd_dck_cards_locales" CASCADE;
  DROP TABLE "_grants_v_blocks_list_crd_dck_buttons" CASCADE;
  DROP TABLE "_grants_v_blocks_list_crd_dck_buttons_locales" CASCADE;
  DROP TABLE "_grants_v_blocks_list_crd_dck" CASCADE;
  DROP TABLE "_grants_v_blocks_list_crd_dck_locales" CASCADE;
  DROP TABLE "_grants_v_blocks_faq_blk_faqs" CASCADE;
  DROP TABLE "_grants_v_blocks_faq_blk_faqs_locales" CASCADE;
  DROP TABLE "_grants_v_blocks_faq_blk" CASCADE;
  DROP TABLE "_grants_v_blocks_faq_blk_locales" CASCADE;
  DROP TABLE "_grants_v" CASCADE;
  DROP TABLE "_grants_v_locales" CASCADE;
  DROP TABLE "_grants_v_rels" CASCADE;
  DROP TABLE "grantcards_grant_specs" CASCADE;
  DROP TABLE "grantcards_grant_specs_locales" CASCADE;
  DROP TABLE "grantcards_card_buttons" CASCADE;
  DROP TABLE "grantcards_card_buttons_locales" CASCADE;
  DROP TABLE "grantcards" CASCADE;
  DROP TABLE "grantcards_locales" CASCADE;
  DROP TABLE "grantcards_rels" CASCADE;
  DROP TABLE "_grantcards_v_version_grant_specs" CASCADE;
  DROP TABLE "_grantcards_v_version_grant_specs_locales" CASCADE;
  DROP TABLE "_grantcards_v_version_card_buttons" CASCADE;
  DROP TABLE "_grantcards_v_version_card_buttons_locales" CASCADE;
  DROP TABLE "_grantcards_v" CASCADE;
  DROP TABLE "_grantcards_v_locales" CASCADE;
  DROP TABLE "_grantcards_v_rels" CASCADE;
  DROP TABLE "posts_populated_authors" CASCADE;
  DROP TABLE "posts" CASCADE;
  DROP TABLE "posts_locales" CASCADE;
  DROP TABLE "posts_rels" CASCADE;
  DROP TABLE "_posts_v_version_populated_authors" CASCADE;
  DROP TABLE "_posts_v" CASCADE;
  DROP TABLE "_posts_v_locales" CASCADE;
  DROP TABLE "_posts_v_rels" CASCADE;
  DROP TABLE "media_cloud" CASCADE;
  DROP TABLE "asset_cloud" CASCADE;
  DROP TABLE "documents" CASCADE;
  DROP TABLE "categories_breadcrumbs" CASCADE;
  DROP TABLE "categories" CASCADE;
  DROP TABLE "users_sessions" CASCADE;
  DROP TABLE "users" CASCADE;
  DROP TABLE "redirects" CASCADE;
  DROP TABLE "redirects_rels" CASCADE;
  DROP TABLE "forms_blocks_checkbox" CASCADE;
  DROP TABLE "forms_blocks_checkbox_locales" CASCADE;
  DROP TABLE "forms_blocks_country" CASCADE;
  DROP TABLE "forms_blocks_country_locales" CASCADE;
  DROP TABLE "forms_blocks_email" CASCADE;
  DROP TABLE "forms_blocks_email_locales" CASCADE;
  DROP TABLE "forms_blocks_message" CASCADE;
  DROP TABLE "forms_blocks_message_locales" CASCADE;
  DROP TABLE "forms_blocks_number" CASCADE;
  DROP TABLE "forms_blocks_number_locales" CASCADE;
  DROP TABLE "forms_blocks_select_options" CASCADE;
  DROP TABLE "forms_blocks_select_options_locales" CASCADE;
  DROP TABLE "forms_blocks_select" CASCADE;
  DROP TABLE "forms_blocks_select_locales" CASCADE;
  DROP TABLE "forms_blocks_state" CASCADE;
  DROP TABLE "forms_blocks_state_locales" CASCADE;
  DROP TABLE "forms_blocks_text" CASCADE;
  DROP TABLE "forms_blocks_text_locales" CASCADE;
  DROP TABLE "forms_blocks_textarea" CASCADE;
  DROP TABLE "forms_blocks_textarea_locales" CASCADE;
  DROP TABLE "forms_emails" CASCADE;
  DROP TABLE "forms_emails_locales" CASCADE;
  DROP TABLE "forms" CASCADE;
  DROP TABLE "forms_locales" CASCADE;
  DROP TABLE "form_submissions_submission_data" CASCADE;
  DROP TABLE "form_submissions" CASCADE;
  DROP TABLE "search_categories" CASCADE;
  DROP TABLE "search" CASCADE;
  DROP TABLE "search_locales" CASCADE;
  DROP TABLE "search_rels" CASCADE;
  DROP TABLE "payload_locked_documents" CASCADE;
  DROP TABLE "payload_locked_documents_rels" CASCADE;
  DROP TABLE "payload_preferences" CASCADE;
  DROP TABLE "payload_preferences_rels" CASCADE;
  DROP TABLE "payload_migrations" CASCADE;
  DROP TABLE "homepage_hero_section_cta_button" CASCADE;
  DROP TABLE "homepage_hero_section_cta_button_locales" CASCADE;
  DROP TABLE "homepage_blocks_secondarycta_cta_button" CASCADE;
  DROP TABLE "homepage_blocks_secondarycta_cta_button_locales" CASCADE;
  DROP TABLE "homepage_blocks_secondarycta" CASCADE;
  DROP TABLE "homepage_blocks_secondarycta_locales" CASCADE;
  DROP TABLE "homepage_blocks_mcol_info_block_multicols" CASCADE;
  DROP TABLE "homepage_blocks_mcol_info_block_multicols_locales" CASCADE;
  DROP TABLE "homepage_blocks_mcol_info_block" CASCADE;
  DROP TABLE "homepage_blocks_grant_card_grid_block" CASCADE;
  DROP TABLE "homepage_blocks_grant_card_grid_block_locales" CASCADE;
  DROP TABLE "homepage_blocks_mstep_process_steps_details" CASCADE;
  DROP TABLE "homepage_blocks_mstep_process_steps_details_locales" CASCADE;
  DROP TABLE "homepage_blocks_mstep_process_steps" CASCADE;
  DROP TABLE "homepage_blocks_mstep_process_steps_locales" CASCADE;
  DROP TABLE "homepage_blocks_mstep_process" CASCADE;
  DROP TABLE "homepage_blocks_mstep_process_locales" CASCADE;
  DROP TABLE "homepage_blocks_comparison_blk_lft_grp_lft_points" CASCADE;
  DROP TABLE "homepage_blocks_comparison_blk_lft_grp_lft_points_locales" CASCADE;
  DROP TABLE "homepage_blocks_comparison_blk_rt_grp_rt_points" CASCADE;
  DROP TABLE "homepage_blocks_comparison_blk_rt_grp_rt_points_locales" CASCADE;
  DROP TABLE "homepage_blocks_comparison_blk_buttons" CASCADE;
  DROP TABLE "homepage_blocks_comparison_blk_buttons_locales" CASCADE;
  DROP TABLE "homepage_blocks_comparison_blk" CASCADE;
  DROP TABLE "homepage_blocks_comparison_blk_locales" CASCADE;
  DROP TABLE "homepage_blocks_ylw_deck_cards_links" CASCADE;
  DROP TABLE "homepage_blocks_ylw_deck_cards_links_locales" CASCADE;
  DROP TABLE "homepage_blocks_ylw_deck_cards" CASCADE;
  DROP TABLE "homepage_blocks_ylw_deck_cards_locales" CASCADE;
  DROP TABLE "homepage_blocks_ylw_deck" CASCADE;
  DROP TABLE "homepage_blocks_ylw_deck_locales" CASCADE;
  DROP TABLE "homepage_blocks_feat_crd_tags" CASCADE;
  DROP TABLE "homepage_blocks_feat_crd_tags_locales" CASCADE;
  DROP TABLE "homepage_blocks_feat_crd" CASCADE;
  DROP TABLE "homepage_blocks_feat_crd_locales" CASCADE;
  DROP TABLE "homepage_blocks_feat_crd_acc_feat_crds" CASCADE;
  DROP TABLE "homepage_blocks_feat_crd_acc_feat_crds_locales" CASCADE;
  DROP TABLE "homepage_blocks_feat_crd_acc" CASCADE;
  DROP TABLE "homepage_blocks_feat_crd_acc_locales" CASCADE;
  DROP TABLE "homepage_blocks_list_crd_dck_cards_tags" CASCADE;
  DROP TABLE "homepage_blocks_list_crd_dck_cards_tags_locales" CASCADE;
  DROP TABLE "homepage_blocks_list_crd_dck_cards" CASCADE;
  DROP TABLE "homepage_blocks_list_crd_dck_cards_locales" CASCADE;
  DROP TABLE "homepage_blocks_list_crd_dck_buttons" CASCADE;
  DROP TABLE "homepage_blocks_list_crd_dck_buttons_locales" CASCADE;
  DROP TABLE "homepage_blocks_list_crd_dck" CASCADE;
  DROP TABLE "homepage_blocks_list_crd_dck_locales" CASCADE;
  DROP TABLE "homepage_blocks_faq_blk_faqs" CASCADE;
  DROP TABLE "homepage_blocks_faq_blk_faqs_locales" CASCADE;
  DROP TABLE "homepage_blocks_faq_blk" CASCADE;
  DROP TABLE "homepage_blocks_faq_blk_locales" CASCADE;
  DROP TABLE "homepage" CASCADE;
  DROP TABLE "homepage_locales" CASCADE;
  DROP TABLE "homepage_rels" CASCADE;
  DROP TABLE "_homepage_v_version_hero_section_cta_button" CASCADE;
  DROP TABLE "_homepage_v_version_hero_section_cta_button_locales" CASCADE;
  DROP TABLE "_homepage_v_blocks_secondarycta_cta_button" CASCADE;
  DROP TABLE "_homepage_v_blocks_secondarycta_cta_button_locales" CASCADE;
  DROP TABLE "_homepage_v_blocks_secondarycta" CASCADE;
  DROP TABLE "_homepage_v_blocks_secondarycta_locales" CASCADE;
  DROP TABLE "_homepage_v_blocks_mcol_info_block_multicols" CASCADE;
  DROP TABLE "_homepage_v_blocks_mcol_info_block_multicols_locales" CASCADE;
  DROP TABLE "_homepage_v_blocks_mcol_info_block" CASCADE;
  DROP TABLE "_homepage_v_blocks_grant_card_grid_block" CASCADE;
  DROP TABLE "_homepage_v_blocks_grant_card_grid_block_locales" CASCADE;
  DROP TABLE "_homepage_v_blocks_mstep_process_steps_details" CASCADE;
  DROP TABLE "_homepage_v_blocks_mstep_process_steps_details_locales" CASCADE;
  DROP TABLE "_homepage_v_blocks_mstep_process_steps" CASCADE;
  DROP TABLE "_homepage_v_blocks_mstep_process_steps_locales" CASCADE;
  DROP TABLE "_homepage_v_blocks_mstep_process" CASCADE;
  DROP TABLE "_homepage_v_blocks_mstep_process_locales" CASCADE;
  DROP TABLE "_homepage_v_blocks_comparison_blk_lft_grp_lft_points" CASCADE;
  DROP TABLE "_homepage_v_blocks_comparison_blk_lft_grp_lft_points_locales" CASCADE;
  DROP TABLE "_homepage_v_blocks_comparison_blk_rt_grp_rt_points" CASCADE;
  DROP TABLE "_homepage_v_blocks_comparison_blk_rt_grp_rt_points_locales" CASCADE;
  DROP TABLE "_homepage_v_blocks_comparison_blk_buttons" CASCADE;
  DROP TABLE "_homepage_v_blocks_comparison_blk_buttons_locales" CASCADE;
  DROP TABLE "_homepage_v_blocks_comparison_blk" CASCADE;
  DROP TABLE "_homepage_v_blocks_comparison_blk_locales" CASCADE;
  DROP TABLE "_homepage_v_blocks_ylw_deck_cards_links" CASCADE;
  DROP TABLE "_homepage_v_blocks_ylw_deck_cards_links_locales" CASCADE;
  DROP TABLE "_homepage_v_blocks_ylw_deck_cards" CASCADE;
  DROP TABLE "_homepage_v_blocks_ylw_deck_cards_locales" CASCADE;
  DROP TABLE "_homepage_v_blocks_ylw_deck" CASCADE;
  DROP TABLE "_homepage_v_blocks_ylw_deck_locales" CASCADE;
  DROP TABLE "_homepage_v_blocks_feat_crd_tags" CASCADE;
  DROP TABLE "_homepage_v_blocks_feat_crd_tags_locales" CASCADE;
  DROP TABLE "_homepage_v_blocks_feat_crd" CASCADE;
  DROP TABLE "_homepage_v_blocks_feat_crd_locales" CASCADE;
  DROP TABLE "_homepage_v_blocks_feat_crd_acc_feat_crds" CASCADE;
  DROP TABLE "_homepage_v_blocks_feat_crd_acc_feat_crds_locales" CASCADE;
  DROP TABLE "_homepage_v_blocks_feat_crd_acc" CASCADE;
  DROP TABLE "_homepage_v_blocks_feat_crd_acc_locales" CASCADE;
  DROP TABLE "_homepage_v_blocks_list_crd_dck_cards_tags" CASCADE;
  DROP TABLE "_homepage_v_blocks_list_crd_dck_cards_tags_locales" CASCADE;
  DROP TABLE "_homepage_v_blocks_list_crd_dck_cards" CASCADE;
  DROP TABLE "_homepage_v_blocks_list_crd_dck_cards_locales" CASCADE;
  DROP TABLE "_homepage_v_blocks_list_crd_dck_buttons" CASCADE;
  DROP TABLE "_homepage_v_blocks_list_crd_dck_buttons_locales" CASCADE;
  DROP TABLE "_homepage_v_blocks_list_crd_dck" CASCADE;
  DROP TABLE "_homepage_v_blocks_list_crd_dck_locales" CASCADE;
  DROP TABLE "_homepage_v_blocks_faq_blk_faqs" CASCADE;
  DROP TABLE "_homepage_v_blocks_faq_blk_faqs_locales" CASCADE;
  DROP TABLE "_homepage_v_blocks_faq_blk" CASCADE;
  DROP TABLE "_homepage_v_blocks_faq_blk_locales" CASCADE;
  DROP TABLE "_homepage_v" CASCADE;
  DROP TABLE "_homepage_v_locales" CASCADE;
  DROP TABLE "_homepage_v_rels" CASCADE;
  DROP TABLE "header_languages" CASCADE;
  DROP TABLE "header" CASCADE;
  DROP TABLE "footer_sm_links_group_sm_links" CASCADE;
  DROP TABLE "footer" CASCADE;
  DROP TABLE "footer_locales" CASCADE;
  DROP TABLE "nav_menu_items_nav_items" CASCADE;
  DROP TABLE "nav_menu_items_nav_items_locales" CASCADE;
  DROP TABLE "nav_menu_items" CASCADE;
  DROP TABLE "nav_menu_items_locales" CASCADE;
  DROP TABLE "nav" CASCADE;
  DROP TABLE "nav_rels" CASCADE;
  DROP TABLE "contact_info_emails" CASCADE;
  DROP TABLE "contact_info_emails_locales" CASCADE;
  DROP TABLE "contact_info" CASCADE;
  DROP TYPE "public"."_locales";
  DROP TYPE "public"."enum_grants_hero_buttons_link_type";
  DROP TYPE "public"."enum_grants_blocks_scol_info_blk_col_btns_link_type";
  DROP TYPE "public"."enum_grants_blocks_mcol_info_block_multicols_link_type";
  DROP TYPE "public"."enum_grants_blocks_mstep_process_steps_icon";
  DROP TYPE "public"."enum_grants_blocks_comparison_blk_buttons_link_type";
  DROP TYPE "public"."enum_grants_blocks_ylw_deck_cards_links_link_type";
  DROP TYPE "public"."enum_grants_blocks_ylw_deck_cards_mascot_pos";
  DROP TYPE "public"."enum_grants_blocks_ylw_deck_align";
  DROP TYPE "public"."enum_grants_blocks_feat_crd_link_type";
  DROP TYPE "public"."enum_grants_blocks_feat_crd_acc_feat_crds_crd_colour";
  DROP TYPE "public"."enum_grants_blocks_list_crd_dck_cards_link_type";
  DROP TYPE "public"."enum_grants_blocks_list_crd_dck_buttons_link_type";
  DROP TYPE "public"."enum_grants_blocks_faq_blk_link_type";
  DROP TYPE "public"."enum_grants_page_type";
  DROP TYPE "public"."enum_grants_bg_type";
  DROP TYPE "public"."enum_grants_status";
  DROP TYPE "public"."enum__grants_v_version_hero_buttons_link_type";
  DROP TYPE "public"."enum__grants_v_blocks_scol_info_blk_col_btns_link_type";
  DROP TYPE "public"."enum__grants_v_blocks_mcol_info_block_multicols_link_type";
  DROP TYPE "public"."enum__grants_v_blocks_mstep_process_steps_icon";
  DROP TYPE "public"."enum__grants_v_blocks_comparison_blk_buttons_link_type";
  DROP TYPE "public"."enum__grants_v_blocks_ylw_deck_cards_links_link_type";
  DROP TYPE "public"."enum__grants_v_blocks_ylw_deck_cards_mascot_pos";
  DROP TYPE "public"."enum__grants_v_blocks_ylw_deck_align";
  DROP TYPE "public"."enum__grants_v_blocks_feat_crd_link_type";
  DROP TYPE "public"."enum__grants_v_blocks_feat_crd_acc_feat_crds_crd_colour";
  DROP TYPE "public"."enum__grants_v_blocks_list_crd_dck_cards_link_type";
  DROP TYPE "public"."enum__grants_v_blocks_list_crd_dck_buttons_link_type";
  DROP TYPE "public"."enum__grants_v_blocks_faq_blk_link_type";
  DROP TYPE "public"."enum__grants_v_version_page_type";
  DROP TYPE "public"."enum__grants_v_version_bg_type";
  DROP TYPE "public"."enum__grants_v_version_status";
  DROP TYPE "public"."enum__grants_v_published_locale";
  DROP TYPE "public"."enum_grantcards_card_buttons_link_type";
  DROP TYPE "public"."enum_grantcards_badge_type";
  DROP TYPE "public"."enum_grantcards_active_period";
  DROP TYPE "public"."enum_grantcards_card_colour";
  DROP TYPE "public"."enum_grantcards_status";
  DROP TYPE "public"."enum__grantcards_v_version_card_buttons_link_type";
  DROP TYPE "public"."enum__grantcards_v_version_badge_type";
  DROP TYPE "public"."enum__grantcards_v_version_active_period";
  DROP TYPE "public"."enum__grantcards_v_version_card_colour";
  DROP TYPE "public"."enum__grantcards_v_version_status";
  DROP TYPE "public"."enum__grantcards_v_published_locale";
  DROP TYPE "public"."enum_posts_status";
  DROP TYPE "public"."enum__posts_v_version_status";
  DROP TYPE "public"."enum__posts_v_published_locale";
  DROP TYPE "public"."enum_users_role";
  DROP TYPE "public"."enum_redirects_to_type";
  DROP TYPE "public"."enum_forms_confirmation_type";
  DROP TYPE "public"."enum_homepage_hero_section_cta_button_link_type";
  DROP TYPE "public"."enum_homepage_blocks_secondarycta_cta_button_link_type";
  DROP TYPE "public"."enum_homepage_blocks_mcol_info_block_multicols_link_type";
  DROP TYPE "public"."enum_homepage_blocks_mstep_process_steps_icon";
  DROP TYPE "public"."enum_homepage_blocks_comparison_blk_buttons_link_type";
  DROP TYPE "public"."enum_homepage_blocks_ylw_deck_cards_links_link_type";
  DROP TYPE "public"."enum_homepage_blocks_ylw_deck_cards_mascot_pos";
  DROP TYPE "public"."enum_homepage_blocks_ylw_deck_align";
  DROP TYPE "public"."enum_homepage_blocks_feat_crd_link_type";
  DROP TYPE "public"."enum_homepage_blocks_feat_crd_acc_feat_crds_crd_colour";
  DROP TYPE "public"."enum_homepage_blocks_list_crd_dck_cards_link_type";
  DROP TYPE "public"."enum_homepage_blocks_list_crd_dck_buttons_link_type";
  DROP TYPE "public"."enum_homepage_blocks_faq_blk_link_type";
  DROP TYPE "public"."enum_homepage_status";
  DROP TYPE "public"."enum__homepage_v_version_hero_section_cta_button_link_type";
  DROP TYPE "public"."enum__homepage_v_blocks_secondarycta_cta_button_link_type";
  DROP TYPE "public"."enum__homepage_v_blocks_mcol_info_block_multicols_link_type";
  DROP TYPE "public"."enum__homepage_v_blocks_mstep_process_steps_icon";
  DROP TYPE "public"."enum__homepage_v_blocks_comparison_blk_buttons_link_type";
  DROP TYPE "public"."enum__homepage_v_blocks_ylw_deck_cards_links_link_type";
  DROP TYPE "public"."enum__homepage_v_blocks_ylw_deck_cards_mascot_pos";
  DROP TYPE "public"."enum__homepage_v_blocks_ylw_deck_align";
  DROP TYPE "public"."enum__homepage_v_blocks_feat_crd_link_type";
  DROP TYPE "public"."enum__homepage_v_blocks_feat_crd_acc_feat_crds_crd_colour";
  DROP TYPE "public"."enum__homepage_v_blocks_list_crd_dck_cards_link_type";
  DROP TYPE "public"."enum__homepage_v_blocks_list_crd_dck_buttons_link_type";
  DROP TYPE "public"."enum__homepage_v_blocks_faq_blk_link_type";
  DROP TYPE "public"."enum__homepage_v_version_status";
  DROP TYPE "public"."enum__homepage_v_published_locale";
  DROP TYPE "public"."enum_header_languages";
  DROP TYPE "public"."enum_footer_sm_links_group_sm_links_sm_type";
  DROP TYPE "public"."enum_nav_menu_items_nav_items_link_type";
  DROP TYPE "public"."enum_contact_info_emails_email_type";`)
}
