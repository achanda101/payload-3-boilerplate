import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
  CREATE TABLE IF NOT EXISTS "homepage_blocks_resource_feat_card" (
      	"_order" integer NOT NULL,
      	"_parent_id" integer NOT NULL,
      	"_path" text NOT NULL,
      	"id" varchar PRIMARY KEY NOT NULL,
      	"align" "enum_homepage_blocks_resource_feat_card_align" DEFAULT 'center',
      	"add_all_resources" boolean,
      	"filter_by_doc_type_id" integer,
      	"block_name" varchar
      );
  CREATE TABLE IF NOT EXISTS "homepage_blocks_resource_feat_card_locales" (
      	"title" varchar,
      	"desc" jsonb,
      	"id" serial PRIMARY KEY NOT NULL,
      	"_locale" "_locales" NOT NULL,
      	"_parent_id" varchar NOT NULL
      );
  CREATE TABLE IF NOT EXISTS "homepage_blocks_resource_gallery" (
      	"_order" integer NOT NULL,
      	"_parent_id" integer NOT NULL,
      	"_path" text NOT NULL,
      	"id" varchar PRIMARY KEY NOT NULL,
      	"align" "enum_homepage_blocks_resource_gallery_align" DEFAULT 'center',
      	"add_all_resources" boolean,
      	"filter_by_doc_type_id" integer,
      	"block_name" varchar
      );
  CREATE TABLE IF NOT EXISTS "homepage_blocks_resource_gallery_locales" (
      	"title" varchar,
      	"desc" jsonb,
      	"id" serial PRIMARY KEY NOT NULL,
      	"_locale" "_locales" NOT NULL,
      	"_parent_id" varchar NOT NULL
      );
  CREATE TABLE IF NOT EXISTS "homepage_blocks_pillar_card_cards" (
      	"_order" integer NOT NULL,
      	"_parent_id" varchar NOT NULL,
      	"id" varchar PRIMARY KEY NOT NULL,
      	"mascot_id" integer
      );
  CREATE TABLE IF NOT EXISTS "homepage_blocks_pillar_card_cards_locales" (
      	"title" varchar,
      	"id" serial PRIMARY KEY NOT NULL,
      	"_locale" "_locales" NOT NULL,
      	"_parent_id" varchar NOT NULL
      );
  CREATE TABLE IF NOT EXISTS "homepage_blocks_pillar_card" (
      	"_order" integer NOT NULL,
      	"_parent_id" integer NOT NULL,
      	"_path" text NOT NULL,
      	"id" varchar PRIMARY KEY NOT NULL,
      	"align" "enum_homepage_blocks_pillar_card_align" DEFAULT 'left',
      	"block_name" varchar
      );
  CREATE TABLE IF NOT EXISTS "homepage_blocks_pillar_card_locales" (
      	"title" varchar,
      	"subtitle" jsonb,
      	"id" serial PRIMARY KEY NOT NULL,
      	"_locale" "_locales" NOT NULL,
      	"_parent_id" varchar NOT NULL
      );
  CREATE TABLE IF NOT EXISTS "homepage_blocks_testimonial_deck_cards" (
      	"_order" integer NOT NULL,
      	"_parent_id" varchar NOT NULL,
      	"id" varchar PRIMARY KEY NOT NULL
      );
  CREATE TABLE IF NOT EXISTS "homepage_blocks_testimonial_deck_cards_locales" (
      	"quote_text" varchar,
      	"attrib_name" varchar,
      	"attrib_dsg" jsonb,
      	"id" serial PRIMARY KEY NOT NULL,
      	"_locale" "_locales" NOT NULL,
      	"_parent_id" varchar NOT NULL
      );
  CREATE TABLE IF NOT EXISTS "homepage_blocks_testimonial_deck" (
      	"_order" integer NOT NULL,
      	"_parent_id" integer NOT NULL,
      	"_path" text NOT NULL,
      	"id" varchar PRIMARY KEY NOT NULL,
      	"block_name" varchar
      );
  CREATE TABLE IF NOT EXISTS "homepage_blocks_testimonial_deck_locales" (
      	"title" varchar,
      	"id" serial PRIMARY KEY NOT NULL,
      	"_locale" "_locales" NOT NULL,
      	"_parent_id" varchar NOT NULL
      );
  CREATE TABLE IF NOT EXISTS "homepage_blocks_min_card_gallery_cards" (
      	"_order" integer NOT NULL,
      	"_parent_id" varchar NOT NULL,
      	"id" varchar PRIMARY KEY NOT NULL,
      	"mascot_id" integer
      );
  CREATE TABLE IF NOT EXISTS "homepage_blocks_min_card_gallery_cards_locales" (
      	"title" varchar,
      	"description" varchar,
      	"id" serial PRIMARY KEY NOT NULL,
      	"_locale" "_locales" NOT NULL,
      	"_parent_id" varchar NOT NULL
      );
  CREATE TABLE IF NOT EXISTS "homepage_blocks_min_card_gallery" (
      	"_order" integer NOT NULL,
      	"_parent_id" integer NOT NULL,
      	"_path" text NOT NULL,
      	"id" varchar PRIMARY KEY NOT NULL,
      	"header_align" "enum_homepage_blocks_min_card_gallery_header_align" DEFAULT 'left',
      	"block_name" varchar
      );
  CREATE TABLE IF NOT EXISTS "homepage_blocks_min_card_gallery_locales" (
      	"header_title" varchar,
      	"header_subtitle" varchar,
      	"id" serial PRIMARY KEY NOT NULL,
      	"_locale" "_locales" NOT NULL,
      	"_parent_id" varchar NOT NULL
      );
  CREATE TABLE IF NOT EXISTS "homepage_blocks_id_card_gallery_cards" (
      	"_order" integer NOT NULL,
      	"_parent_id" varchar NOT NULL,
      	"id" varchar PRIMARY KEY NOT NULL,
      	"mascot_id" integer
      );
  CREATE TABLE IF NOT EXISTS "homepage_blocks_id_card_gallery_cards_locales" (
      	"pronouns" varchar,
      	"fullname" varchar,
      	"designation" varchar,
      	"id" serial PRIMARY KEY NOT NULL,
      	"_locale" "_locales" NOT NULL,
      	"_parent_id" varchar NOT NULL
      );
  CREATE TABLE IF NOT EXISTS "homepage_blocks_id_card_gallery" (
      	"_order" integer NOT NULL,
      	"_parent_id" integer NOT NULL,
      	"_path" text NOT NULL,
      	"id" varchar PRIMARY KEY NOT NULL,
      	"block_name" varchar
      );
  CREATE TABLE IF NOT EXISTS "homepage_blocks_id_card_gallery_locales" (
      	"header_title" varchar,
      	"header_subtitle" varchar,
      	"header_description" varchar,
      	"id" serial PRIMARY KEY NOT NULL,
      	"_locale" "_locales" NOT NULL,
      	"_parent_id" varchar NOT NULL
      );
  CREATE TABLE IF NOT EXISTS "homepage_blocks_two_column_block" (
      	"_order" integer NOT NULL,
      	"_parent_id" integer NOT NULL,
      	"_path" text NOT NULL,
      	"id" varchar PRIMARY KEY NOT NULL,
      	"block_name" varchar
      );
  CREATE TABLE IF NOT EXISTS "homepage_blocks_two_column_block_locales" (
      	"title" varchar,
      	"subtitle" varchar,
      	"left_column" jsonb,
      	"right_column" jsonb,
      	"id" serial PRIMARY KEY NOT NULL,
      	"_locale" "_locales" NOT NULL,
      	"_parent_id" varchar NOT NULL
      );
  CREATE TABLE IF NOT EXISTS "homepage_blocks_three_column_table_block_rows" (
      	"_order" integer NOT NULL,
      	"_parent_id" varchar NOT NULL,
      	"id" varchar PRIMARY KEY NOT NULL
      );
  CREATE TABLE IF NOT EXISTS "homepage_blocks_three_column_table_block_rows_locales" (
      	"first_column" jsonb,
      	"second_column" jsonb,
      	"third_column" jsonb,
      	"id" serial PRIMARY KEY NOT NULL,
      	"_locale" "_locales" NOT NULL,
      	"_parent_id" varchar NOT NULL
      );
  CREATE TABLE IF NOT EXISTS "homepage_blocks_three_column_table_block" (
      	"_order" integer NOT NULL,
      	"_parent_id" integer NOT NULL,
      	"_path" text NOT NULL,
      	"id" varchar PRIMARY KEY NOT NULL,
      	"column_widths" "enum_homepage_blocks_three_column_table_block_column_widths" DEFAULT 'f-t-t',
      	"block_name" varchar
      );
  CREATE TABLE IF NOT EXISTS "homepage_blocks_three_column_table_block_locales" (
      	"title" varchar,
      	"subtitle" varchar,
      	"id" serial PRIMARY KEY NOT NULL,
      	"_locale" "_locales" NOT NULL,
      	"_parent_id" varchar NOT NULL
      );
  CREATE TABLE IF NOT EXISTS "homepage" (
      	"id" serial PRIMARY KEY NOT NULL,
      	"meta_title" varchar,
      	"meta_description" varchar,
      	"meta_image_id" integer,
      	"created_by_id" integer,
      	"updated_by_id" integer,
      	"_status" "enum_homepage_status" DEFAULT 'draft',
      	"updated_at" timestamp(3) with time zone,
      	"created_at" timestamp(3) with time zone
      );
  CREATE TABLE IF NOT EXISTS "homepage_locales" (
      	"hero_title" varchar,
      	"hero_subtitle" varchar,
      	"id" serial PRIMARY KEY NOT NULL,
      	"_locale" "_locales" NOT NULL,
      	"_parent_id" integer NOT NULL
      );
  CREATE TABLE IF NOT EXISTS "homepage_rels" (
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
      	"etests_id" integer,
      	"grantcards_id" integer
      );
  CREATE TABLE IF NOT EXISTS "_homepage_v_version_cta_button" (
      	"_order" integer NOT NULL,
      	"_parent_id" integer NOT NULL,
      	"id" serial PRIMARY KEY NOT NULL,
      	"link_type" "enum__homepage_v_version_cta_button_link_type" DEFAULT 'reference',
      	"link_new_tab" boolean,
      	"link_download_link" boolean,
      	"link_arrow_link" boolean,
      	"link_pill_solid" boolean,
      	"link_pill_outline" boolean,
      	"link_anchor" varchar,
      	"link_url" varchar,
      	"link_email" varchar,
      	"_uuid" varchar
      );
  CREATE TABLE IF NOT EXISTS "_homepage_v_version_cta_button_locales" (
      	"link_label" varchar,
      	"id" serial PRIMARY KEY NOT NULL,
      	"_locale" "_locales" NOT NULL,
      	"_parent_id" integer NOT NULL
      );
  CREATE TABLE IF NOT EXISTS "_homepage_v_blocks_rich_content_block" (
      	"_order" integer NOT NULL,
      	"_parent_id" integer NOT NULL,
      	"_path" text NOT NULL,
      	"id" serial PRIMARY KEY NOT NULL,
      	"_uuid" varchar,
      	"block_name" varchar
      );
  CREATE TABLE IF NOT EXISTS "_homepage_v_blocks_rich_content_block_locales" (
      	"rich_text" jsonb,
      	"id" serial PRIMARY KEY NOT NULL,
      	"_locale" "_locales" NOT NULL,
      	"_parent_id" integer NOT NULL
      );
  CREATE TABLE IF NOT EXISTS "_homepage_v_blocks_secondarycta_cta_button" (
      	"_order" integer NOT NULL,
      	"_parent_id" integer NOT NULL,
      	"id" serial PRIMARY KEY NOT NULL,
      	"link_type" "enum__homepage_v_blocks_secondarycta_cta_button_link_type" DEFAULT 'reference',
      	"link_new_tab" boolean,
      	"link_download_link" boolean,
      	"link_arrow_link" boolean,
      	"link_pill_solid" boolean,
      	"link_pill_outline" boolean,
      	"link_anchor" varchar,
      	"link_url" varchar,
      	"link_email" varchar,
      	"_uuid" varchar
      );
  CREATE TABLE IF NOT EXISTS "_homepage_v_blocks_secondarycta_cta_button_locales" (
      	"link_label" varchar,
      	"id" serial PRIMARY KEY NOT NULL,
      	"_locale" "_locales" NOT NULL,
      	"_parent_id" integer NOT NULL
      );
  CREATE TABLE IF NOT EXISTS "_homepage_v_blocks_secondarycta" (
      	"_order" integer NOT NULL,
      	"_parent_id" integer NOT NULL,
      	"_path" text NOT NULL,
      	"id" serial PRIMARY KEY NOT NULL,
      	"contact_email" varchar,
      	"ui_type" "enum__homepage_v_blocks_secondarycta_ui_type" DEFAULT 'lrg_txt_cta',
      	"_uuid" varchar,
      	"block_name" varchar
      );
  CREATE TABLE IF NOT EXISTS "_homepage_v_blocks_secondarycta_locales" (
      	"cta_title" varchar,
      	"cta_subtitle" varchar,
      	"contact_label" varchar,
      	"id" serial PRIMARY KEY NOT NULL,
      	"_locale" "_locales" NOT NULL,
      	"_parent_id" integer NOT NULL
      );
  CREATE TABLE IF NOT EXISTS "_homepage_v_blocks_mcol_info_block_multicols" (
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
      	"link_anchor" varchar,
      	"link_url" varchar,
      	"link_email" varchar,
      	"_uuid" varchar
      );
  CREATE TABLE IF NOT EXISTS "_homepage_v_blocks_mcol_info_block_multicols_locales" (
      	"title" varchar,
      	"col_content" varchar,
      	"link_label" varchar,
      	"id" serial PRIMARY KEY NOT NULL,
      	"_locale" "_locales" NOT NULL,
      	"_parent_id" integer NOT NULL
      );
  CREATE TABLE IF NOT EXISTS "_homepage_v_blocks_mcol_info_block" (
      	"_order" integer NOT NULL,
      	"_parent_id" integer NOT NULL,
      	"_path" text NOT NULL,
      	"id" serial PRIMARY KEY NOT NULL,
      	"_uuid" varchar,
      	"block_name" varchar
      );
  CREATE TABLE IF NOT EXISTS "_homepage_v_blocks_grant_card_grid_block" (
      	"_order" integer NOT NULL,
      	"_parent_id" integer NOT NULL,
      	"_path" text NOT NULL,
      	"id" serial PRIMARY KEY NOT NULL,
      	"_uuid" varchar,
      	"block_name" varchar
      );
  CREATE TABLE IF NOT EXISTS "_homepage_v_blocks_grant_card_grid_block_locales" (
      	"title" varchar,
      	"desc" varchar,
      	"id" serial PRIMARY KEY NOT NULL,
      	"_locale" "_locales" NOT NULL,
      	"_parent_id" integer NOT NULL
      );
  CREATE TABLE IF NOT EXISTS "_homepage_v_blocks_mstep_process_steps_details" (
      	"_order" integer NOT NULL,
      	"_parent_id" integer NOT NULL,
      	"id" serial PRIMARY KEY NOT NULL,
      	"_uuid" varchar
      );
  CREATE TABLE IF NOT EXISTS "_homepage_v_blocks_mstep_process_steps_details_locales" (
      	"bullet" jsonb,
      	"id" serial PRIMARY KEY NOT NULL,
      	"_locale" "_locales" NOT NULL,
      	"_parent_id" integer NOT NULL
      );
  CREATE TABLE IF NOT EXISTS "_homepage_v_blocks_mstep_process_steps" (
      	"_order" integer NOT NULL,
      	"_parent_id" integer NOT NULL,
      	"id" serial PRIMARY KEY NOT NULL,
      	"icon" "enum__homepage_v_blocks_mstep_process_steps_icon" DEFAULT 'FileText',
      	"_uuid" varchar
      );
  CREATE TABLE IF NOT EXISTS "_homepage_v_blocks_mstep_process_steps_locales" (
      	"step_title" varchar,
      	"title" varchar,
      	"tip" jsonb,
      	"id" serial PRIMARY KEY NOT NULL,
      	"_locale" "_locales" NOT NULL,
      	"_parent_id" integer NOT NULL
      );
  CREATE TABLE IF NOT EXISTS "_homepage_v_blocks_mstep_process" (
      	"_order" integer NOT NULL,
      	"_parent_id" integer NOT NULL,
      	"_path" text NOT NULL,
      	"id" serial PRIMARY KEY NOT NULL,
      	"_uuid" varchar,
      	"block_name" varchar
      );
  CREATE TABLE IF NOT EXISTS "_homepage_v_blocks_mstep_process_locales" (
      	"title" varchar,
      	"subtitle" varchar,
      	"id" serial PRIMARY KEY NOT NULL,
      	"_locale" "_locales" NOT NULL,
      	"_parent_id" integer NOT NULL
      );
  CREATE TABLE IF NOT EXISTS "_homepage_v_blocks_comparison_blk_lft_grp_lft_points" (
      	"_order" integer NOT NULL,
      	"_parent_id" integer NOT NULL,
      	"id" serial PRIMARY KEY NOT NULL,
      	"_uuid" varchar
      );
  CREATE TABLE IF NOT EXISTS "_homepage_v_blocks_comparison_blk_lft_grp_lft_points_locales" (
      	"point" varchar,
      	"id" serial PRIMARY KEY NOT NULL,
      	"_locale" "_locales" NOT NULL,
      	"_parent_id" integer NOT NULL
      );
  CREATE TABLE IF NOT EXISTS "_homepage_v_blocks_comparison_blk_rt_grp_rt_points" (
      	"_order" integer NOT NULL,
      	"_parent_id" integer NOT NULL,
      	"id" serial PRIMARY KEY NOT NULL,
      	"_uuid" varchar
      );
  CREATE TABLE IF NOT EXISTS "_homepage_v_blocks_comparison_blk_rt_grp_rt_points_locales" (
      	"point" varchar,
      	"id" serial PRIMARY KEY NOT NULL,
      	"_locale" "_locales" NOT NULL,
      	"_parent_id" integer NOT NULL
      );
  CREATE TABLE IF NOT EXISTS "_homepage_v_blocks_comparison_blk_buttons" (
      	"_order" integer NOT NULL,
      	"_parent_id" integer NOT NULL,
      	"id" serial PRIMARY KEY NOT NULL,
      	"link_type" "enum__homepage_v_blocks_comparison_blk_buttons_link_type" DEFAULT 'reference',
      	"link_new_tab" boolean,
      	"link_download_link" boolean,
      	"link_arrow_link" boolean,
      	"link_pill_solid" boolean,
      	"link_pill_outline" boolean,
      	"link_anchor" varchar,
      	"link_url" varchar,
      	"link_email" varchar,
      	"_uuid" varchar
      );
  CREATE TABLE IF NOT EXISTS "_homepage_v_blocks_comparison_blk_buttons_locales" (
      	"link_label" varchar,
      	"id" serial PRIMARY KEY NOT NULL,
      	"_locale" "_locales" NOT NULL,
      	"_parent_id" integer NOT NULL
      );
  CREATE TABLE IF NOT EXISTS "_homepage_v_blocks_comparison_blk" (
      	"_order" integer NOT NULL,
      	"_parent_id" integer NOT NULL,
      	"_path" text NOT NULL,
      	"id" serial PRIMARY KEY NOT NULL,
      	"_uuid" varchar,
      	"block_name" varchar
      );
  CREATE TABLE IF NOT EXISTS "_homepage_v_blocks_comparison_blk_locales" (
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
  CREATE TABLE IF NOT EXISTS "_homepage_v_blocks_ylw_deck_cards_links" (
      	"_order" integer NOT NULL,
      	"_parent_id" integer NOT NULL,
      	"id" serial PRIMARY KEY NOT NULL,
      	"link_type" "enum__homepage_v_blocks_ylw_deck_cards_links_link_type" DEFAULT 'reference',
      	"link_new_tab" boolean,
      	"link_download_link" boolean,
      	"link_arrow_link" boolean,
      	"link_pill_solid" boolean,
      	"link_pill_outline" boolean,
      	"link_anchor" varchar,
      	"link_url" varchar,
      	"link_email" varchar,
      	"_uuid" varchar
      );
  CREATE TABLE IF NOT EXISTS "_homepage_v_blocks_ylw_deck_cards_links_locales" (
      	"desc" varchar,
      	"link_label" varchar,
      	"id" serial PRIMARY KEY NOT NULL,
      	"_locale" "_locales" NOT NULL,
      	"_parent_id" integer NOT NULL
      );
  CREATE TABLE IF NOT EXISTS "_homepage_v_blocks_ylw_deck_cards" (
      	"_order" integer NOT NULL,
      	"_parent_id" integer NOT NULL,
      	"id" serial PRIMARY KEY NOT NULL,
      	"mascot_id" integer,
      	"mascot_pos" "enum__homepage_v_blocks_ylw_deck_cards_mascot_pos" DEFAULT 'center',
      	"_uuid" varchar
      );
  CREATE TABLE IF NOT EXISTS "_homepage_v_blocks_ylw_deck_cards_locales" (
      	"title" varchar,
      	"subtitle" varchar,
      	"desc" varchar,
      	"id" serial PRIMARY KEY NOT NULL,
      	"_locale" "_locales" NOT NULL,
      	"_parent_id" integer NOT NULL
      );
  CREATE TABLE IF NOT EXISTS "_homepage_v_blocks_ylw_deck" (
      	"_order" integer NOT NULL,
      	"_parent_id" integer NOT NULL,
      	"_path" text NOT NULL,
      	"id" serial PRIMARY KEY NOT NULL,
      	"align" "enum__homepage_v_blocks_ylw_deck_align" DEFAULT 'center',
      	"_uuid" varchar,
      	"block_name" varchar
      );
  CREATE TABLE IF NOT EXISTS "_homepage_v_blocks_ylw_deck_locales" (
      	"title" varchar,
      	"desc" jsonb,
      	"id" serial PRIMARY KEY NOT NULL,
      	"_locale" "_locales" NOT NULL,
      	"_parent_id" integer NOT NULL
      );
  CREATE TABLE IF NOT EXISTS "_homepage_v_blocks_feat_crd_tags" (
      	"_order" integer NOT NULL,
      	"_parent_id" integer NOT NULL,
      	"id" serial PRIMARY KEY NOT NULL,
      	"_uuid" varchar
      );
  CREATE TABLE IF NOT EXISTS "_homepage_v_blocks_feat_crd_tags_locales" (
      	"tag" varchar,
      	"id" serial PRIMARY KEY NOT NULL,
      	"_locale" "_locales" NOT NULL,
      	"_parent_id" integer NOT NULL
      );
  CREATE TABLE IF NOT EXISTS "_homepage_v_blocks_feat_crd" (
      	"_order" integer NOT NULL,
      	"_parent_id" integer NOT NULL,
      	"_path" text NOT NULL,
      	"id" serial PRIMARY KEY NOT NULL,
      	"image_id" integer,
      	"title_alignment" "enum__homepage_v_blocks_feat_crd_title_alignment" DEFAULT 'left',
      	"link_type" "enum__homepage_v_blocks_feat_crd_link_type" DEFAULT 'reference',
      	"link_new_tab" boolean,
      	"link_download_link" boolean,
      	"link_arrow_link" boolean,
      	"link_pill_solid" boolean,
      	"link_pill_outline" boolean,
      	"link_anchor" varchar,
      	"link_url" varchar,
      	"link_email" varchar,
      	"_uuid" varchar,
      	"block_name" varchar
      );
  CREATE TABLE IF NOT EXISTS "_homepage_v_blocks_feat_crd_locales" (
      	"title" varchar,
      	"subtitle" varchar,
      	"desc" jsonb,
      	"link_label" varchar,
      	"id" serial PRIMARY KEY NOT NULL,
      	"_locale" "_locales" NOT NULL,
      	"_parent_id" integer NOT NULL
      );
  CREATE TABLE IF NOT EXISTS "_homepage_v_blocks_feat_crd_acc_feat_crds" (
      	"_order" integer NOT NULL,
      	"_parent_id" integer NOT NULL,
      	"id" serial PRIMARY KEY NOT NULL,
      	"mascot_id" integer,
      	"crd_colour" "enum__homepage_v_blocks_feat_crd_acc_feat_crds_crd_colour" DEFAULT 'forest',
      	"_uuid" varchar
      );
  CREATE TABLE IF NOT EXISTS "_homepage_v_blocks_feat_crd_acc_feat_crds_locales" (
      	"acc_title" varchar,
      	"acc_content" jsonb,
      	"crd_tag" varchar,
      	"crd_content" jsonb,
      	"id" serial PRIMARY KEY NOT NULL,
      	"_locale" "_locales" NOT NULL,
      	"_parent_id" integer NOT NULL
      );
  CREATE TABLE IF NOT EXISTS "_homepage_v_blocks_feat_crd_acc" (
      	"_order" integer NOT NULL,
      	"_parent_id" integer NOT NULL,
      	"_path" text NOT NULL,
      	"id" serial PRIMARY KEY NOT NULL,
      	"_uuid" varchar,
      	"block_name" varchar
      );
  CREATE TABLE IF NOT EXISTS "_homepage_v_blocks_feat_crd_acc_locales" (
      	"title" varchar,
      	"id" serial PRIMARY KEY NOT NULL,
      	"_locale" "_locales" NOT NULL,
      	"_parent_id" integer NOT NULL
      );
  CREATE TABLE IF NOT EXISTS "_homepage_v_blocks_list_crd_dck_cards_tags" (
      	"_order" integer NOT NULL,
      	"_parent_id" integer NOT NULL,
      	"id" serial PRIMARY KEY NOT NULL,
      	"_uuid" varchar
      );
  CREATE TABLE IF NOT EXISTS "_homepage_v_blocks_list_crd_dck_cards_tags_locales" (
      	"tag" varchar,
      	"id" serial PRIMARY KEY NOT NULL,
      	"_locale" "_locales" NOT NULL,
      	"_parent_id" integer NOT NULL
      );
  CREATE TABLE IF NOT EXISTS "_homepage_v_blocks_list_crd_dck_cards" (
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
      	"link_anchor" varchar,
      	"link_url" varchar,
      	"link_email" varchar,
      	"_uuid" varchar
      );
  CREATE TABLE IF NOT EXISTS "_homepage_v_blocks_list_crd_dck_cards_locales" (
      	"title" varchar,
      	"desc" varchar,
      	"link_label" varchar,
      	"id" serial PRIMARY KEY NOT NULL,
      	"_locale" "_locales" NOT NULL,
      	"_parent_id" integer NOT NULL
      );
  CREATE TABLE IF NOT EXISTS "_homepage_v_blocks_list_crd_dck_buttons" (
      	"_order" integer NOT NULL,
      	"_parent_id" integer NOT NULL,
      	"id" serial PRIMARY KEY NOT NULL,
      	"link_type" "enum__homepage_v_blocks_list_crd_dck_buttons_link_type" DEFAULT 'reference',
      	"link_new_tab" boolean,
      	"link_download_link" boolean,
      	"link_arrow_link" boolean,
      	"link_pill_solid" boolean,
      	"link_pill_outline" boolean,
      	"link_anchor" varchar,
      	"link_url" varchar,
      	"link_email" varchar,
      	"_uuid" varchar
      );
  CREATE TABLE IF NOT EXISTS "_homepage_v_blocks_list_crd_dck_buttons_locales" (
      	"link_label" varchar,
      	"id" serial PRIMARY KEY NOT NULL,
      	"_locale" "_locales" NOT NULL,
      	"_parent_id" integer NOT NULL
      );
  CREATE TABLE IF NOT EXISTS "_homepage_v_blocks_list_crd_dck" (
      	"_order" integer NOT NULL,
      	"_parent_id" integer NOT NULL,
      	"_path" text NOT NULL,
      	"id" serial PRIMARY KEY NOT NULL,
      	"data_source" "enum__homepage_v_blocks_list_crd_dck_data_source" DEFAULT 'manual',
      	"_uuid" varchar,
      	"block_name" varchar
      );
  CREATE TABLE IF NOT EXISTS "_homepage_v_blocks_list_crd_dck_locales" (
      	"title" varchar,
      	"id" serial PRIMARY KEY NOT NULL,
      	"_locale" "_locales" NOT NULL,
      	"_parent_id" integer NOT NULL
      );
  CREATE TABLE IF NOT EXISTS "_homepage_v_blocks_faq_blk_faqs" (
      	"_order" integer NOT NULL,
      	"_parent_id" integer NOT NULL,
      	"id" serial PRIMARY KEY NOT NULL,
      	"_uuid" varchar
      );
  CREATE TABLE IF NOT EXISTS "_homepage_v_blocks_faq_blk_faqs_locales" (
      	"question" varchar,
      	"answer" jsonb,
      	"id" serial PRIMARY KEY NOT NULL,
      	"_locale" "_locales" NOT NULL,
      	"_parent_id" integer NOT NULL
      );
  CREATE TABLE IF NOT EXISTS "_homepage_v_blocks_faq_blk" (
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
      	"link_anchor" varchar,
      	"link_url" varchar,
      	"link_email" varchar,
      	"_uuid" varchar,
      	"block_name" varchar
      );
  CREATE TABLE IF NOT EXISTS "_homepage_v_blocks_faq_blk_locales" (
      	"title" varchar,
      	"desc" varchar,
      	"link_label" varchar,
      	"id" serial PRIMARY KEY NOT NULL,
      	"_locale" "_locales" NOT NULL,
      	"_parent_id" integer NOT NULL
      );
  CREATE TABLE IF NOT EXISTS "_homepage_v_blocks_pink_puffy_top_row" (
      	"_order" integer NOT NULL,
      	"_parent_id" integer NOT NULL,
      	"id" serial PRIMARY KEY NOT NULL,
      	"_uuid" varchar
      );
  CREATE TABLE IF NOT EXISTS "_homepage_v_blocks_pink_puffy_top_row_locales" (
      	"title" varchar,
      	"subtitle" varchar,
      	"description" varchar,
      	"id" serial PRIMARY KEY NOT NULL,
      	"_locale" "_locales" NOT NULL,
      	"_parent_id" integer NOT NULL
      );
  CREATE TABLE IF NOT EXISTS "_homepage_v_blocks_pink_puffy_bot_row" (
      	"_order" integer NOT NULL,
      	"_parent_id" integer NOT NULL,
      	"id" serial PRIMARY KEY NOT NULL,
      	"_uuid" varchar
      );
  CREATE TABLE IF NOT EXISTS "_homepage_v_blocks_pink_puffy_bot_row_locales" (
      	"title" varchar,
      	"description" varchar,
      	"id" serial PRIMARY KEY NOT NULL,
      	"_locale" "_locales" NOT NULL,
      	"_parent_id" integer NOT NULL
      );
  CREATE TABLE IF NOT EXISTS "_homepage_v_blocks_pink_puffy_links" (
      	"_order" integer NOT NULL,
      	"_parent_id" integer NOT NULL,
      	"id" serial PRIMARY KEY NOT NULL,
      	"link_type" "enum__homepage_v_blocks_pink_puffy_links_link_type" DEFAULT 'reference',
      	"link_new_tab" boolean,
      	"link_download_link" boolean,
      	"link_arrow_link" boolean,
      	"link_pill_solid" boolean,
      	"link_pill_outline" boolean,
      	"link_anchor" varchar,
      	"link_url" varchar,
      	"link_email" varchar,
      	"_uuid" varchar
      );
  CREATE TABLE IF NOT EXISTS "_homepage_v_blocks_pink_puffy_links_locales" (
      	"link_label" varchar,
      	"id" serial PRIMARY KEY NOT NULL,
      	"_locale" "_locales" NOT NULL,
      	"_parent_id" integer NOT NULL
      );
  CREATE TABLE IF NOT EXISTS "_homepage_v_blocks_pink_puffy" (
      	"_order" integer NOT NULL,
      	"_parent_id" integer NOT NULL,
      	"_path" text NOT NULL,
      	"id" serial PRIMARY KEY NOT NULL,
      	"align" "enum__homepage_v_blocks_pink_puffy_align" DEFAULT 'center',
      	"_uuid" varchar,
      	"block_name" varchar
      );
  CREATE TABLE IF NOT EXISTS "_homepage_v_blocks_pink_puffy_locales" (
      	"title" varchar,
      	"subtitle" varchar,
      	"id" serial PRIMARY KEY NOT NULL,
      	"_locale" "_locales" NOT NULL,
      	"_parent_id" integer NOT NULL
      );
  CREATE TABLE IF NOT EXISTS "_homepage_v_blocks_beige_puffy_items" (
      	"_order" integer NOT NULL,
      	"_parent_id" integer NOT NULL,
      	"id" serial PRIMARY KEY NOT NULL,
      	"_uuid" varchar
      );
  CREATE TABLE IF NOT EXISTS "_homepage_v_blocks_beige_puffy_items_locales" (
      	"title" varchar,
      	"subtitle" varchar,
      	"description" varchar,
      	"id" serial PRIMARY KEY NOT NULL,
      	"_locale" "_locales" NOT NULL,
      	"_parent_id" integer NOT NULL
      );
  CREATE TABLE IF NOT EXISTS "_homepage_v_blocks_beige_puffy" (
      	"_order" integer NOT NULL,
      	"_parent_id" integer NOT NULL,
      	"_path" text NOT NULL,
      	"id" serial PRIMARY KEY NOT NULL,
      	"align" "enum__homepage_v_blocks_beige_puffy_align" DEFAULT 'center',
      	"_uuid" varchar,
      	"block_name" varchar
      );
  CREATE TABLE IF NOT EXISTS "_homepage_v_blocks_beige_puffy_locales" (
      	"title" varchar,
      	"subtitle" varchar,
      	"id" serial PRIMARY KEY NOT NULL,
      	"_locale" "_locales" NOT NULL,
      	"_parent_id" integer NOT NULL
      );
  CREATE TABLE IF NOT EXISTS "_homepage_v_blocks_funding_map_items_subitems" (
      	"_order" integer NOT NULL,
      	"_parent_id" integer NOT NULL,
      	"id" serial PRIMARY KEY NOT NULL,
      	"_uuid" varchar
      );
  CREATE TABLE IF NOT EXISTS "_homepage_v_blocks_funding_map_items_subitems_locales" (
      	"statnumber" varchar,
      	"description" varchar,
      	"id" serial PRIMARY KEY NOT NULL,
      	"_locale" "_locales" NOT NULL,
      	"_parent_id" integer NOT NULL
      );
  CREATE TABLE IF NOT EXISTS "_homepage_v_blocks_funding_map_items" (
      	"_order" integer NOT NULL,
      	"_parent_id" integer NOT NULL,
      	"id" serial PRIMARY KEY NOT NULL,
      	"region_name" "enum__homepage_v_blocks_funding_map_items_region_name" DEFAULT 'uaf-asia-pacific',
      	"_uuid" varchar
      );
  CREATE TABLE IF NOT EXISTS "_homepage_v_blocks_funding_map" (
      	"_order" integer NOT NULL,
      	"_parent_id" integer NOT NULL,
      	"_path" text NOT NULL,
      	"id" serial PRIMARY KEY NOT NULL,
      	"_uuid" varchar,
      	"block_name" varchar
      );
  CREATE TABLE IF NOT EXISTS "_homepage_v_blocks_funding_map_locales" (
      	"title" varchar,
      	"subtitle" varchar,
      	"selector_label" varchar,
      	"id" serial PRIMARY KEY NOT NULL,
      	"_locale" "_locales" NOT NULL,
      	"_parent_id" integer NOT NULL
      );
  CREATE TABLE IF NOT EXISTS "_homepage_v_blocks_resource_feat_card" (
      	"_order" integer NOT NULL,
      	"_parent_id" integer NOT NULL,
      	"_path" text NOT NULL,
      	"id" serial PRIMARY KEY NOT NULL,
      	"align" "enum__homepage_v_blocks_resource_feat_card_align" DEFAULT 'center',
      	"add_all_resources" boolean,
      	"filter_by_doc_type_id" integer,
      	"_uuid" varchar,
      	"block_name" varchar
      );
  CREATE TABLE IF NOT EXISTS "_homepage_v_blocks_resource_feat_card_locales" (
      	"title" varchar,
      	"desc" jsonb,
      	"id" serial PRIMARY KEY NOT NULL,
      	"_locale" "_locales" NOT NULL,
      	"_parent_id" integer NOT NULL
      );
  CREATE TABLE IF NOT EXISTS "_homepage_v_blocks_resource_gallery" (
      	"_order" integer NOT NULL,
      	"_parent_id" integer NOT NULL,
      	"_path" text NOT NULL,
      	"id" serial PRIMARY KEY NOT NULL,
      	"align" "enum__homepage_v_blocks_resource_gallery_align" DEFAULT 'center',
      	"add_all_resources" boolean,
      	"filter_by_doc_type_id" integer,
      	"_uuid" varchar,
      	"block_name" varchar
      );
  CREATE TABLE IF NOT EXISTS "_homepage_v_blocks_resource_gallery_locales" (
      	"title" varchar,
      	"desc" jsonb,
      	"id" serial PRIMARY KEY NOT NULL,
      	"_locale" "_locales" NOT NULL,
      	"_parent_id" integer NOT NULL
      );
  CREATE TABLE IF NOT EXISTS "_homepage_v_blocks_pillar_card_cards" (
      	"_order" integer NOT NULL,
      	"_parent_id" integer NOT NULL,
      	"id" serial PRIMARY KEY NOT NULL,
      	"mascot_id" integer,
      	"_uuid" varchar
      );
  CREATE TABLE IF NOT EXISTS "_homepage_v_blocks_pillar_card_cards_locales" (
      	"title" varchar,
      	"id" serial PRIMARY KEY NOT NULL,
      	"_locale" "_locales" NOT NULL,
      	"_parent_id" integer NOT NULL
      );
  CREATE TABLE IF NOT EXISTS "_homepage_v_blocks_pillar_card" (
      	"_order" integer NOT NULL,
      	"_parent_id" integer NOT NULL,
      	"_path" text NOT NULL,
      	"id" serial PRIMARY KEY NOT NULL,
      	"align" "enum__homepage_v_blocks_pillar_card_align" DEFAULT 'left',
      	"_uuid" varchar,
      	"block_name" varchar
      );
  CREATE TABLE IF NOT EXISTS "_homepage_v_blocks_pillar_card_locales" (
      	"title" varchar,
      	"subtitle" jsonb,
      	"id" serial PRIMARY KEY NOT NULL,
      	"_locale" "_locales" NOT NULL,
      	"_parent_id" integer NOT NULL
      );
  CREATE TABLE IF NOT EXISTS "_homepage_v_blocks_testimonial_deck_cards" (
      	"_order" integer NOT NULL,
      	"_parent_id" integer NOT NULL,
      	"id" serial PRIMARY KEY NOT NULL,
      	"_uuid" varchar
      );
  CREATE TABLE IF NOT EXISTS "_homepage_v_blocks_testimonial_deck_cards_locales" (
      	"quote_text" varchar,
      	"attrib_name" varchar,
      	"attrib_dsg" jsonb,
      	"id" serial PRIMARY KEY NOT NULL,
      	"_locale" "_locales" NOT NULL,
      	"_parent_id" integer NOT NULL
      );
  CREATE TABLE IF NOT EXISTS "_homepage_v_blocks_testimonial_deck" (
      	"_order" integer NOT NULL,
      	"_parent_id" integer NOT NULL,
      	"_path" text NOT NULL,
      	"id" serial PRIMARY KEY NOT NULL,
      	"_uuid" varchar,
      	"block_name" varchar
      );
  CREATE TABLE IF NOT EXISTS "_homepage_v_blocks_testimonial_deck_locales" (
      	"title" varchar,
      	"id" serial PRIMARY KEY NOT NULL,
      	"_locale" "_locales" NOT NULL,
      	"_parent_id" integer NOT NULL
      );
  CREATE TABLE IF NOT EXISTS "_homepage_v_blocks_min_card_gallery_cards" (
      	"_order" integer NOT NULL,
      	"_parent_id" integer NOT NULL,
      	"id" serial PRIMARY KEY NOT NULL,
      	"mascot_id" integer,
      	"_uuid" varchar
      );
  CREATE TABLE IF NOT EXISTS "_homepage_v_blocks_min_card_gallery_cards_locales" (
      	"title" varchar,
      	"description" varchar,
      	"id" serial PRIMARY KEY NOT NULL,
      	"_locale" "_locales" NOT NULL,
      	"_parent_id" integer NOT NULL
      );
  CREATE TABLE IF NOT EXISTS "_homepage_v_blocks_min_card_gallery" (
      	"_order" integer NOT NULL,
      	"_parent_id" integer NOT NULL,
      	"_path" text NOT NULL,
      	"id" serial PRIMARY KEY NOT NULL,
      	"header_align" "enum__homepage_v_blocks_min_card_gallery_header_align" DEFAULT 'left',
      	"_uuid" varchar,
      	"block_name" varchar
      );
  CREATE TABLE IF NOT EXISTS "_homepage_v_blocks_min_card_gallery_locales" (
      	"header_title" varchar,
      	"header_subtitle" varchar,
      	"id" serial PRIMARY KEY NOT NULL,
      	"_locale" "_locales" NOT NULL,
      	"_parent_id" integer NOT NULL
      );
  CREATE TABLE IF NOT EXISTS "_homepage_v_blocks_id_card_gallery_cards" (
      	"_order" integer NOT NULL,
      	"_parent_id" integer NOT NULL,
      	"id" serial PRIMARY KEY NOT NULL,
      	"mascot_id" integer,
      	"_uuid" varchar
      );
  CREATE TABLE IF NOT EXISTS "_homepage_v_blocks_id_card_gallery_cards_locales" (
      	"pronouns" varchar,
      	"fullname" varchar,
      	"designation" varchar,
      	"id" serial PRIMARY KEY NOT NULL,
      	"_locale" "_locales" NOT NULL,
      	"_parent_id" integer NOT NULL
      );
  CREATE TABLE IF NOT EXISTS "_homepage_v_blocks_id_card_gallery" (
      	"_order" integer NOT NULL,
      	"_parent_id" integer NOT NULL,
      	"_path" text NOT NULL,
      	"id" serial PRIMARY KEY NOT NULL,
      	"_uuid" varchar,
      	"block_name" varchar
      );
  CREATE TABLE IF NOT EXISTS "_homepage_v_blocks_id_card_gallery_locales" (
      	"header_title" varchar,
      	"header_subtitle" varchar,
      	"header_description" varchar,
      	"id" serial PRIMARY KEY NOT NULL,
      	"_locale" "_locales" NOT NULL,
      	"_parent_id" integer NOT NULL
      );
  CREATE TABLE IF NOT EXISTS "_homepage_v_blocks_two_column_block" (
      	"_order" integer NOT NULL,
      	"_parent_id" integer NOT NULL,
      	"_path" text NOT NULL,
      	"id" serial PRIMARY KEY NOT NULL,
      	"_uuid" varchar,
      	"block_name" varchar
      );
  CREATE TABLE IF NOT EXISTS "_homepage_v_blocks_two_column_block_locales" (
      	"title" varchar,
      	"subtitle" varchar,
      	"left_column" jsonb,
      	"right_column" jsonb,
      	"id" serial PRIMARY KEY NOT NULL,
      	"_locale" "_locales" NOT NULL,
      	"_parent_id" integer NOT NULL
      );
  CREATE TABLE IF NOT EXISTS "_homepage_v_blocks_three_column_table_block_rows" (
      	"_order" integer NOT NULL,
      	"_parent_id" integer NOT NULL,
      	"id" serial PRIMARY KEY NOT NULL,
      	"_uuid" varchar
      );
  CREATE TABLE IF NOT EXISTS "_homepage_v_blocks_three_column_table_block_rows_locales" (
      	"first_column" jsonb,
      	"second_column" jsonb,
      	"third_column" jsonb,
      	"id" serial PRIMARY KEY NOT NULL,
      	"_locale" "_locales" NOT NULL,
      	"_parent_id" integer NOT NULL
      );
  CREATE TABLE IF NOT EXISTS "_homepage_v_blocks_three_column_table_block" (
      	"_order" integer NOT NULL,
      	"_parent_id" integer NOT NULL,
      	"_path" text NOT NULL,
      	"id" serial PRIMARY KEY NOT NULL,
      	"column_widths" "enum__homepage_v_blocks_three_column_table_block_column_widths" DEFAULT 'f-t-t',
      	"_uuid" varchar,
      	"block_name" varchar
      );
  CREATE TABLE IF NOT EXISTS "_homepage_v_blocks_three_column_table_block_locales" (
      	"title" varchar,
      	"subtitle" varchar,
      	"id" serial PRIMARY KEY NOT NULL,
      	"_locale" "_locales" NOT NULL,
      	"_parent_id" integer NOT NULL
      );
  CREATE TABLE IF NOT EXISTS "_homepage_v" (
      	"id" serial PRIMARY KEY NOT NULL,
      	"version_meta_title" varchar,
      	"version_meta_description" varchar,
      	"version_meta_image_id" integer,
      	"version_created_by_id" integer,
      	"version_updated_by_id" integer,
      	"version__status" "enum__homepage_v_version_status" DEFAULT 'draft',
      	"version_updated_at" timestamp(3) with time zone,
      	"version_created_at" timestamp(3) with time zone,
      	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
      	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
      	"snapshot" boolean,
      	"published_locale" "enum__homepage_v_published_locale",
      	"latest" boolean
      );
  CREATE TABLE IF NOT EXISTS "_homepage_v_locales" (
      	"version_hero_title" varchar,
      	"version_hero_subtitle" varchar,
      	"id" serial PRIMARY KEY NOT NULL,
      	"_locale" "_locales" NOT NULL,
      	"_parent_id" integer NOT NULL
      );
  CREATE TABLE IF NOT EXISTS "_homepage_v_rels" (
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
      	"etests_id" integer,
      	"grantcards_id" integer
      );
  CREATE TABLE IF NOT EXISTS "header_languages" (
      	"order" integer NOT NULL,
      	"parent_id" integer NOT NULL,
      	"value" "enum_header_languages",
      	"id" serial PRIMARY KEY NOT NULL
      );
  CREATE TABLE IF NOT EXISTS "header" (
      	"id" serial PRIMARY KEY NOT NULL,
      	"logo_id" integer,
      	"search_enabled" boolean DEFAULT true,
      	"show_banner" boolean DEFAULT false,
      	"banner_link_type" "enum_header_banner_link_type" DEFAULT 'reference',
      	"banner_link_new_tab" boolean,
      	"banner_link_download_link" boolean,
      	"banner_link_arrow_link" boolean,
      	"banner_link_pill_solid" boolean,
      	"banner_link_pill_outline" boolean,
      	"banner_link_anchor" varchar,
      	"banner_link_url" varchar,
      	"banner_link_email" varchar,
      	"updated_at" timestamp(3) with time zone,
      	"created_at" timestamp(3) with time zone
      );
  CREATE TABLE IF NOT EXISTS "header_locales" (
      	"banner_text" varchar,
      	"banner_link_label" varchar,
      	"id" serial PRIMARY KEY NOT NULL,
      	"_locale" "_locales" NOT NULL,
      	"_parent_id" integer NOT NULL
      );
  CREATE TABLE IF NOT EXISTS "header_rels" (
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
  CREATE TABLE IF NOT EXISTS "footer_sm_links_group_sm_links" (
      	"_order" integer NOT NULL,
      	"_parent_id" integer NOT NULL,
      	"id" varchar PRIMARY KEY NOT NULL,
      	"sm_type" "enum_footer_sm_links_group_sm_links_sm_type",
      	"url" varchar NOT NULL
      );
  CREATE TABLE IF NOT EXISTS "footer_badges" (
      	"_order" integer NOT NULL,
      	"_parent_id" integer NOT NULL,
      	"id" varchar PRIMARY KEY NOT NULL,
      	"label" varchar NOT NULL,
      	"image_id" integer NOT NULL,
      	"link" varchar
      );
  CREATE TABLE IF NOT EXISTS "footer" (
      	"id" serial PRIMARY KEY NOT NULL,
      	"logo_id" integer,
      	"newsletter_sub_url" varchar DEFAULT 'https://list.uafanp.org/subscription/form',
      	"donate_c_t_a_url" varchar DEFAULT 'https://example.com/donate' NOT NULL,
      	"updated_at" timestamp(3) with time zone,
      	"created_at" timestamp(3) with time zone
      );
  CREATE TABLE IF NOT EXISTS "footer_locales" (
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
  CREATE TABLE IF NOT EXISTS "nav_menu_items_nav_items" (
      	"_order" integer NOT NULL,
      	"_parent_id" varchar NOT NULL,
      	"id" varchar PRIMARY KEY NOT NULL,
      	"link_type" "enum_nav_menu_items_nav_items_link_type" DEFAULT 'reference',
      	"link_new_tab" boolean,
      	"link_download_link" boolean,
      	"link_arrow_link" boolean,
      	"link_pill_solid" boolean,
      	"link_pill_outline" boolean,
      	"link_anchor" varchar,
      	"link_url" varchar,
      	"link_email" varchar
      );
  CREATE TABLE IF NOT EXISTS "nav_menu_items_nav_items_locales" (
      	"link_label" varchar,
      	"id" serial PRIMARY KEY NOT NULL,
      	"_locale" "_locales" NOT NULL,
      	"_parent_id" varchar NOT NULL
      );
  CREATE TABLE IF NOT EXISTS "nav_menu_items" (
      	"_order" integer NOT NULL,
      	"_parent_id" integer NOT NULL,
      	"id" varchar PRIMARY KEY NOT NULL
      );
  CREATE TABLE IF NOT EXISTS "nav_menu_items_locales" (
      	"label" varchar NOT NULL,
      	"id" serial PRIMARY KEY NOT NULL,
      	"_locale" "_locales" NOT NULL,
      	"_parent_id" varchar NOT NULL
      );
  CREATE TABLE IF NOT EXISTS "nav" (
      	"id" serial PRIMARY KEY NOT NULL,
      	"updated_at" timestamp(3) with time zone,
      	"created_at" timestamp(3) with time zone
      );
  CREATE TABLE IF NOT EXISTS "nav_rels" (
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
  CREATE TABLE IF NOT EXISTS "contact_info_emails" (
      	"_order" integer NOT NULL,
      	"_parent_id" integer NOT NULL,
      	"id" varchar PRIMARY KEY NOT NULL,
      	"email" varchar NOT NULL,
      	"email_type" "enum_contact_info_emails_email_type" DEFAULT 'info' NOT NULL
      );
  CREATE TABLE IF NOT EXISTS "contact_info_emails_locales" (
      	"label" varchar DEFAULT 'Contact Us' NOT NULL,
      	"id" serial PRIMARY KEY NOT NULL,
      	"_locale" "_locales" NOT NULL,
      	"_parent_id" varchar NOT NULL
      );
  CREATE TABLE IF NOT EXISTS "contact_info" (
      	"id" serial PRIMARY KEY NOT NULL,
      	"updated_at" timestamp(3) with time zone,
      	"created_at" timestamp(3) with time zone
      );
  ALTER TABLE "grants_hero_buttons" ADD CONSTRAINT "grants_hero_buttons_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."grants"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "grants_hero_buttons_locales" ADD CONSTRAINT "grants_hero_buttons_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."grants_hero_buttons"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "grants_blocks_rich_content_block" ADD CONSTRAINT "grants_blocks_rich_content_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."grants"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "grants_blocks_rich_content_block_locales" ADD CONSTRAINT "grants_blocks_rich_content_block_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."grants_blocks_rich_content_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "grants_blocks_secondarycta_cta_button" ADD CONSTRAINT "grants_blocks_secondarycta_cta_button_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."grants_blocks_secondarycta"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "grants_blocks_secondarycta_cta_button_locales" ADD CONSTRAINT "grants_blocks_secondarycta_cta_button_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."grants_blocks_secondarycta_cta_button"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "grants_blocks_secondarycta" ADD CONSTRAINT "grants_blocks_secondarycta_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."grants"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "grants_blocks_secondarycta_locales" ADD CONSTRAINT "grants_blocks_secondarycta_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."grants_blocks_secondarycta"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "grants_blocks_mcol_info_block_multicols" ADD CONSTRAINT "grants_blocks_mcol_info_block_multicols_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."grants_blocks_mcol_info_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "grants_blocks_mcol_info_block_multicols_locales" ADD CONSTRAINT "grants_blocks_mcol_info_block_multicols_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."grants_blocks_mcol_info_block_multicols"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "grants_blocks_mcol_info_block" ADD CONSTRAINT "grants_blocks_mcol_info_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."grants"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "grants_blocks_grant_card_grid_block" ADD CONSTRAINT "grants_blocks_grant_card_grid_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."grants"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "grants_blocks_grant_card_grid_block_locales" ADD CONSTRAINT "grants_blocks_grant_card_grid_block_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."grants_blocks_grant_card_grid_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "grants_blocks_mstep_process_steps_details" ADD CONSTRAINT "grants_blocks_mstep_process_steps_details_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."grants_blocks_mstep_process_steps"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "grants_blocks_mstep_process_steps_details_locales" ADD CONSTRAINT "grants_blocks_mstep_process_steps_details_locales_parent__fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."grants_blocks_mstep_process_steps_details"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "grants_blocks_mstep_process_steps" ADD CONSTRAINT "grants_blocks_mstep_process_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."grants_blocks_mstep_process"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "grants_blocks_mstep_process_steps_locales" ADD CONSTRAINT "grants_blocks_mstep_process_steps_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."grants_blocks_mstep_process_steps"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "grants_blocks_mstep_process" ADD CONSTRAINT "grants_blocks_mstep_process_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."grants"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "grants_blocks_mstep_process_locales" ADD CONSTRAINT "grants_blocks_mstep_process_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."grants_blocks_mstep_process"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "grants_blocks_comparison_blk_lft_grp_lft_points" ADD CONSTRAINT "grants_blocks_comparison_blk_lft_grp_lft_points_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."grants_blocks_comparison_blk"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "grants_blocks_comparison_blk_lft_grp_lft_points_locales" ADD CONSTRAINT "grants_blocks_comparison_blk_lft_grp_lft_points_locales_p_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."grants_blocks_comparison_blk_lft_grp_lft_points"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "grants_blocks_comparison_blk_rt_grp_rt_points" ADD CONSTRAINT "grants_blocks_comparison_blk_rt_grp_rt_points_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."grants_blocks_comparison_blk"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "grants_blocks_comparison_blk_rt_grp_rt_points_locales" ADD CONSTRAINT "grants_blocks_comparison_blk_rt_grp_rt_points_locales_par_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."grants_blocks_comparison_blk_rt_grp_rt_points"("id") ON DELETE cascade ON UPDATE no action;
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
  ALTER TABLE "grants_blocks_pink_puffy_top_row" ADD CONSTRAINT "grants_blocks_pink_puffy_top_row_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."grants_blocks_pink_puffy"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "grants_blocks_pink_puffy_top_row_locales" ADD CONSTRAINT "grants_blocks_pink_puffy_top_row_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."grants_blocks_pink_puffy_top_row"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "grants_blocks_pink_puffy_bot_row" ADD CONSTRAINT "grants_blocks_pink_puffy_bot_row_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."grants_blocks_pink_puffy"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "grants_blocks_pink_puffy_bot_row_locales" ADD CONSTRAINT "grants_blocks_pink_puffy_bot_row_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."grants_blocks_pink_puffy_bot_row"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "grants_blocks_pink_puffy_links" ADD CONSTRAINT "grants_blocks_pink_puffy_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."grants_blocks_pink_puffy"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "grants_blocks_pink_puffy_links_locales" ADD CONSTRAINT "grants_blocks_pink_puffy_links_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."grants_blocks_pink_puffy_links"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "grants_blocks_pink_puffy" ADD CONSTRAINT "grants_blocks_pink_puffy_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."grants"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "grants_blocks_pink_puffy_locales" ADD CONSTRAINT "grants_blocks_pink_puffy_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."grants_blocks_pink_puffy"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "grants_blocks_beige_puffy_items" ADD CONSTRAINT "grants_blocks_beige_puffy_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."grants_blocks_beige_puffy"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "grants_blocks_beige_puffy_items_locales" ADD CONSTRAINT "grants_blocks_beige_puffy_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."grants_blocks_beige_puffy_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "grants_blocks_beige_puffy" ADD CONSTRAINT "grants_blocks_beige_puffy_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."grants"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "grants_blocks_beige_puffy_locales" ADD CONSTRAINT "grants_blocks_beige_puffy_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."grants_blocks_beige_puffy"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "grants_blocks_funding_map_items_subitems" ADD CONSTRAINT "grants_blocks_funding_map_items_subitems_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."grants_blocks_funding_map_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "grants_blocks_funding_map_items_subitems_locales" ADD CONSTRAINT "grants_blocks_funding_map_items_subitems_locales_parent_i_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."grants_blocks_funding_map_items_subitems"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "grants_blocks_funding_map_items" ADD CONSTRAINT "grants_blocks_funding_map_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."grants_blocks_funding_map"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "grants_blocks_funding_map" ADD CONSTRAINT "grants_blocks_funding_map_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."grants"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "grants_blocks_funding_map_locales" ADD CONSTRAINT "grants_blocks_funding_map_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."grants_blocks_funding_map"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "grants_blocks_resource_feat_card" ADD CONSTRAINT "grants_blocks_resource_feat_card_filter_by_doc_type_id_doctypes_id_fk" FOREIGN KEY ("filter_by_doc_type_id") REFERENCES "public"."doctypes"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "grants_blocks_resource_feat_card" ADD CONSTRAINT "grants_blocks_resource_feat_card_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."grants"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "grants_blocks_resource_feat_card_locales" ADD CONSTRAINT "grants_blocks_resource_feat_card_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."grants_blocks_resource_feat_card"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "grants_blocks_resource_gallery" ADD CONSTRAINT "grants_blocks_resource_gallery_filter_by_doc_type_id_doctypes_id_fk" FOREIGN KEY ("filter_by_doc_type_id") REFERENCES "public"."doctypes"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "grants_blocks_resource_gallery" ADD CONSTRAINT "grants_blocks_resource_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."grants"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "grants_blocks_resource_gallery_locales" ADD CONSTRAINT "grants_blocks_resource_gallery_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."grants_blocks_resource_gallery"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "grants_blocks_pillar_card_cards" ADD CONSTRAINT "grants_blocks_pillar_card_cards_mascot_id_asset_cloud_id_fk" FOREIGN KEY ("mascot_id") REFERENCES "public"."asset_cloud"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "grants_blocks_pillar_card_cards" ADD CONSTRAINT "grants_blocks_pillar_card_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."grants_blocks_pillar_card"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "grants_blocks_pillar_card_cards_locales" ADD CONSTRAINT "grants_blocks_pillar_card_cards_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."grants_blocks_pillar_card_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "grants_blocks_pillar_card" ADD CONSTRAINT "grants_blocks_pillar_card_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."grants"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "grants_blocks_pillar_card_locales" ADD CONSTRAINT "grants_blocks_pillar_card_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."grants_blocks_pillar_card"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "grants_blocks_testimonial_deck_cards" ADD CONSTRAINT "grants_blocks_testimonial_deck_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."grants_blocks_testimonial_deck"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "grants_blocks_testimonial_deck_cards_locales" ADD CONSTRAINT "grants_blocks_testimonial_deck_cards_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."grants_blocks_testimonial_deck_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "grants_blocks_testimonial_deck" ADD CONSTRAINT "grants_blocks_testimonial_deck_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."grants"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "grants_blocks_testimonial_deck_locales" ADD CONSTRAINT "grants_blocks_testimonial_deck_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."grants_blocks_testimonial_deck"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "grants_blocks_min_card_gallery_cards" ADD CONSTRAINT "grants_blocks_min_card_gallery_cards_mascot_id_asset_cloud_id_fk" FOREIGN KEY ("mascot_id") REFERENCES "public"."asset_cloud"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "grants_blocks_min_card_gallery_cards" ADD CONSTRAINT "grants_blocks_min_card_gallery_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."grants_blocks_min_card_gallery"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "grants_blocks_min_card_gallery_cards_locales" ADD CONSTRAINT "grants_blocks_min_card_gallery_cards_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."grants_blocks_min_card_gallery_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "grants_blocks_min_card_gallery" ADD CONSTRAINT "grants_blocks_min_card_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."grants"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "grants_blocks_min_card_gallery_locales" ADD CONSTRAINT "grants_blocks_min_card_gallery_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."grants_blocks_min_card_gallery"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "grants_blocks_id_card_gallery_cards" ADD CONSTRAINT "grants_blocks_id_card_gallery_cards_mascot_id_asset_cloud_id_fk" FOREIGN KEY ("mascot_id") REFERENCES "public"."asset_cloud"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "grants_blocks_id_card_gallery_cards" ADD CONSTRAINT "grants_blocks_id_card_gallery_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."grants_blocks_id_card_gallery"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "grants_blocks_id_card_gallery_cards_locales" ADD CONSTRAINT "grants_blocks_id_card_gallery_cards_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."grants_blocks_id_card_gallery_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "grants_blocks_id_card_gallery" ADD CONSTRAINT "grants_blocks_id_card_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."grants"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "grants_blocks_id_card_gallery_locales" ADD CONSTRAINT "grants_blocks_id_card_gallery_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."grants_blocks_id_card_gallery"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "grants_blocks_two_column_block" ADD CONSTRAINT "grants_blocks_two_column_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."grants"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "grants_blocks_two_column_block_locales" ADD CONSTRAINT "grants_blocks_two_column_block_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."grants_blocks_two_column_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "grants_blocks_three_column_table_block_rows" ADD CONSTRAINT "grants_blocks_three_column_table_block_rows_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."grants_blocks_three_column_table_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "grants_blocks_three_column_table_block_rows_locales" ADD CONSTRAINT "grants_blocks_three_column_table_block_rows_locales_paren_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."grants_blocks_three_column_table_block_rows"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "grants_blocks_three_column_table_block" ADD CONSTRAINT "grants_blocks_three_column_table_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."grants"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "grants_blocks_three_column_table_block_locales" ADD CONSTRAINT "grants_blocks_three_column_table_block_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."grants_blocks_three_column_table_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "grants" ADD CONSTRAINT "grants_grant_card_id_grantcards_id_fk" FOREIGN KEY ("grant_card_id") REFERENCES "public"."grantcards"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "grants" ADD CONSTRAINT "grants_created_by_id_users_id_fk" FOREIGN KEY ("created_by_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "grants" ADD CONSTRAINT "grants_updated_by_id_users_id_fk" FOREIGN KEY ("updated_by_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "grants" ADD CONSTRAINT "grants_meta_image_id_asset_cloud_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."asset_cloud"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "grants" ADD CONSTRAINT "grants_folder_id_payload_folders_id_fk" FOREIGN KEY ("folder_id") REFERENCES "public"."payload_folders"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "grants_locales" ADD CONSTRAINT "grants_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."grants"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "grants_rels" ADD CONSTRAINT "grants_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."grants"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "grants_rels" ADD CONSTRAINT "grants_rels_grants_fk" FOREIGN KEY ("grants_id") REFERENCES "public"."grants"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "grants_rels" ADD CONSTRAINT "grants_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "grants_rels" ADD CONSTRAINT "grants_rels_blog_fk" FOREIGN KEY ("blog_id") REFERENCES "public"."blog"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "grants_rels" ADD CONSTRAINT "grants_rels_reports_fk" FOREIGN KEY ("reports_id") REFERENCES "public"."reports"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "grants_rels" ADD CONSTRAINT "grants_rels_mmedia_fk" FOREIGN KEY ("mmedia_id") REFERENCES "public"."mmedia"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "grants_rels" ADD CONSTRAINT "grants_rels_documents_fk" FOREIGN KEY ("documents_id") REFERENCES "public"."documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "grants_rels" ADD CONSTRAINT "grants_rels_etests_fk" FOREIGN KEY ("etests_id") REFERENCES "public"."etests"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "grants_rels" ADD CONSTRAINT "grants_rels_grantcards_fk" FOREIGN KEY ("grantcards_id") REFERENCES "public"."grantcards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_grants_v_version_hero_buttons" ADD CONSTRAINT "_grants_v_version_hero_buttons_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_grants_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_grants_v_version_hero_buttons_locales" ADD CONSTRAINT "_grants_v_version_hero_buttons_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_grants_v_version_hero_buttons"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_grants_v_blocks_rich_content_block" ADD CONSTRAINT "_grants_v_blocks_rich_content_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_grants_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_grants_v_blocks_rich_content_block_locales" ADD CONSTRAINT "_grants_v_blocks_rich_content_block_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_grants_v_blocks_rich_content_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_grants_v_blocks_secondarycta_cta_button" ADD CONSTRAINT "_grants_v_blocks_secondarycta_cta_button_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_grants_v_blocks_secondarycta"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_grants_v_blocks_secondarycta_cta_button_locales" ADD CONSTRAINT "_grants_v_blocks_secondarycta_cta_button_locales_parent_i_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_grants_v_blocks_secondarycta_cta_button"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_grants_v_blocks_secondarycta" ADD CONSTRAINT "_grants_v_blocks_secondarycta_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_grants_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_grants_v_blocks_secondarycta_locales" ADD CONSTRAINT "_grants_v_blocks_secondarycta_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_grants_v_blocks_secondarycta"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_grants_v_blocks_mcol_info_block_multicols" ADD CONSTRAINT "_grants_v_blocks_mcol_info_block_multicols_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_grants_v_blocks_mcol_info_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_grants_v_blocks_mcol_info_block_multicols_locales" ADD CONSTRAINT "_grants_v_blocks_mcol_info_block_multicols_locales_parent_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_grants_v_blocks_mcol_info_block_multicols"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_grants_v_blocks_mcol_info_block" ADD CONSTRAINT "_grants_v_blocks_mcol_info_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_grants_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_grants_v_blocks_grant_card_grid_block" ADD CONSTRAINT "_grants_v_blocks_grant_card_grid_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_grants_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_grants_v_blocks_grant_card_grid_block_locales" ADD CONSTRAINT "_grants_v_blocks_grant_card_grid_block_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_grants_v_blocks_grant_card_grid_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_grants_v_blocks_mstep_process_steps_details" ADD CONSTRAINT "_grants_v_blocks_mstep_process_steps_details_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_grants_v_blocks_mstep_process_steps"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_grants_v_blocks_mstep_process_steps_details_locales" ADD CONSTRAINT "_grants_v_blocks_mstep_process_steps_details_locales_pare_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_grants_v_blocks_mstep_process_steps_details"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_grants_v_blocks_mstep_process_steps" ADD CONSTRAINT "_grants_v_blocks_mstep_process_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_grants_v_blocks_mstep_process"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_grants_v_blocks_mstep_process_steps_locales" ADD CONSTRAINT "_grants_v_blocks_mstep_process_steps_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_grants_v_blocks_mstep_process_steps"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_grants_v_blocks_mstep_process" ADD CONSTRAINT "_grants_v_blocks_mstep_process_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_grants_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_grants_v_blocks_mstep_process_locales" ADD CONSTRAINT "_grants_v_blocks_mstep_process_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_grants_v_blocks_mstep_process"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_grants_v_blocks_comparison_blk_lft_grp_lft_points" ADD CONSTRAINT "_grants_v_blocks_comparison_blk_lft_grp_lft_points_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_grants_v_blocks_comparison_blk"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_grants_v_blocks_comparison_blk_lft_grp_lft_points_locales" ADD CONSTRAINT "_grants_v_blocks_comparison_blk_lft_grp_lft_points_locale_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_grants_v_blocks_comparison_blk_lft_grp_lft_points"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_grants_v_blocks_comparison_blk_rt_grp_rt_points" ADD CONSTRAINT "_grants_v_blocks_comparison_blk_rt_grp_rt_points_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_grants_v_blocks_comparison_blk"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_grants_v_blocks_comparison_blk_rt_grp_rt_points_locales" ADD CONSTRAINT "_grants_v_blocks_comparison_blk_rt_grp_rt_points_locales__fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_grants_v_blocks_comparison_blk_rt_grp_rt_points"("id") ON DELETE cascade ON UPDATE no action;
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
  `)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  // no-op
}
