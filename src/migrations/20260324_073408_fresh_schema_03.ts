import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
  CREATE TABLE IF NOT EXISTS "pages_blocks_mstep_process_steps_details" (
      	"_order" integer NOT NULL,
      	"_parent_id" varchar NOT NULL,
      	"id" varchar PRIMARY KEY NOT NULL
      );
  CREATE TABLE IF NOT EXISTS "pages_blocks_mstep_process_steps_details_locales" (
      	"bullet" jsonb,
      	"id" serial PRIMARY KEY NOT NULL,
      	"_locale" "_locales" NOT NULL,
      	"_parent_id" varchar NOT NULL
      );
  CREATE TABLE IF NOT EXISTS "pages_blocks_mstep_process_steps" (
      	"_order" integer NOT NULL,
      	"_parent_id" varchar NOT NULL,
      	"id" varchar PRIMARY KEY NOT NULL,
      	"icon" "enum_pages_blocks_mstep_process_steps_icon" DEFAULT 'FileText'
      );
  CREATE TABLE IF NOT EXISTS "pages_blocks_mstep_process_steps_locales" (
      	"step_title" varchar,
      	"title" varchar,
      	"tip" jsonb,
      	"id" serial PRIMARY KEY NOT NULL,
      	"_locale" "_locales" NOT NULL,
      	"_parent_id" varchar NOT NULL
      );
  CREATE TABLE IF NOT EXISTS "pages_blocks_mstep_process" (
      	"_order" integer NOT NULL,
      	"_parent_id" integer NOT NULL,
      	"_path" text NOT NULL,
      	"id" varchar PRIMARY KEY NOT NULL,
      	"block_name" varchar
      );
  CREATE TABLE IF NOT EXISTS "pages_blocks_mstep_process_locales" (
      	"title" varchar,
      	"subtitle" varchar,
      	"id" serial PRIMARY KEY NOT NULL,
      	"_locale" "_locales" NOT NULL,
      	"_parent_id" varchar NOT NULL
      );
  CREATE TABLE IF NOT EXISTS "pages_blocks_comparison_blk_lft_grp_lft_points" (
      	"_order" integer NOT NULL,
      	"_parent_id" varchar NOT NULL,
      	"id" varchar PRIMARY KEY NOT NULL
      );
  CREATE TABLE IF NOT EXISTS "pages_blocks_comparison_blk_lft_grp_lft_points_locales" (
      	"point" varchar,
      	"id" serial PRIMARY KEY NOT NULL,
      	"_locale" "_locales" NOT NULL,
      	"_parent_id" varchar NOT NULL
      );
  CREATE TABLE IF NOT EXISTS "pages_blocks_comparison_blk_rt_grp_rt_points" (
      	"_order" integer NOT NULL,
      	"_parent_id" varchar NOT NULL,
      	"id" varchar PRIMARY KEY NOT NULL
      );
  CREATE TABLE IF NOT EXISTS "pages_blocks_comparison_blk_rt_grp_rt_points_locales" (
      	"point" varchar,
      	"id" serial PRIMARY KEY NOT NULL,
      	"_locale" "_locales" NOT NULL,
      	"_parent_id" varchar NOT NULL
      );
  CREATE TABLE IF NOT EXISTS "pages_blocks_comparison_blk_buttons" (
      	"_order" integer NOT NULL,
      	"_parent_id" varchar NOT NULL,
      	"id" varchar PRIMARY KEY NOT NULL,
      	"link_type" "enum_pages_blocks_comparison_blk_buttons_link_type" DEFAULT 'reference',
      	"link_new_tab" boolean,
      	"link_download_link" boolean,
      	"link_arrow_link" boolean,
      	"link_pill_solid" boolean,
      	"link_pill_outline" boolean,
      	"link_anchor" varchar,
      	"link_url" varchar,
      	"link_email" varchar
      );
  CREATE TABLE IF NOT EXISTS "pages_blocks_comparison_blk_buttons_locales" (
      	"link_label" varchar,
      	"id" serial PRIMARY KEY NOT NULL,
      	"_locale" "_locales" NOT NULL,
      	"_parent_id" varchar NOT NULL
      );
  CREATE TABLE IF NOT EXISTS "pages_blocks_comparison_blk" (
      	"_order" integer NOT NULL,
      	"_parent_id" integer NOT NULL,
      	"_path" text NOT NULL,
      	"id" varchar PRIMARY KEY NOT NULL,
      	"block_name" varchar
      );
  CREATE TABLE IF NOT EXISTS "pages_blocks_comparison_blk_locales" (
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
  CREATE TABLE IF NOT EXISTS "pages_blocks_ylw_deck_cards_links" (
      	"_order" integer NOT NULL,
      	"_parent_id" varchar NOT NULL,
      	"id" varchar PRIMARY KEY NOT NULL,
      	"link_type" "enum_pages_blocks_ylw_deck_cards_links_link_type" DEFAULT 'reference',
      	"link_new_tab" boolean,
      	"link_download_link" boolean,
      	"link_arrow_link" boolean,
      	"link_pill_solid" boolean,
      	"link_pill_outline" boolean,
      	"link_anchor" varchar,
      	"link_url" varchar,
      	"link_email" varchar
      );
  CREATE TABLE IF NOT EXISTS "pages_blocks_ylw_deck_cards_links_locales" (
      	"desc" varchar,
      	"link_label" varchar,
      	"id" serial PRIMARY KEY NOT NULL,
      	"_locale" "_locales" NOT NULL,
      	"_parent_id" varchar NOT NULL
      );
  CREATE TABLE IF NOT EXISTS "pages_blocks_ylw_deck_cards" (
      	"_order" integer NOT NULL,
      	"_parent_id" varchar NOT NULL,
      	"id" varchar PRIMARY KEY NOT NULL,
      	"mascot_id" integer,
      	"mascot_pos" "enum_pages_blocks_ylw_deck_cards_mascot_pos" DEFAULT 'center'
      );
  CREATE TABLE IF NOT EXISTS "pages_blocks_ylw_deck_cards_locales" (
      	"title" varchar,
      	"subtitle" varchar,
      	"desc" varchar,
      	"id" serial PRIMARY KEY NOT NULL,
      	"_locale" "_locales" NOT NULL,
      	"_parent_id" varchar NOT NULL
      );
  CREATE TABLE IF NOT EXISTS "pages_blocks_ylw_deck" (
      	"_order" integer NOT NULL,
      	"_parent_id" integer NOT NULL,
      	"_path" text NOT NULL,
      	"id" varchar PRIMARY KEY NOT NULL,
      	"align" "enum_pages_blocks_ylw_deck_align" DEFAULT 'center',
      	"block_name" varchar
      );
  CREATE TABLE IF NOT EXISTS "pages_blocks_ylw_deck_locales" (
      	"title" varchar,
      	"desc" jsonb,
      	"id" serial PRIMARY KEY NOT NULL,
      	"_locale" "_locales" NOT NULL,
      	"_parent_id" varchar NOT NULL
      );
  CREATE TABLE IF NOT EXISTS "pages_blocks_feat_crd_tags" (
      	"_order" integer NOT NULL,
      	"_parent_id" varchar NOT NULL,
      	"id" varchar PRIMARY KEY NOT NULL
      );
  CREATE TABLE IF NOT EXISTS "pages_blocks_feat_crd_tags_locales" (
      	"tag" varchar,
      	"id" serial PRIMARY KEY NOT NULL,
      	"_locale" "_locales" NOT NULL,
      	"_parent_id" varchar NOT NULL
      );
  CREATE TABLE IF NOT EXISTS "pages_blocks_feat_crd" (
      	"_order" integer NOT NULL,
      	"_parent_id" integer NOT NULL,
      	"_path" text NOT NULL,
      	"id" varchar PRIMARY KEY NOT NULL,
      	"image_id" integer,
      	"title_alignment" "enum_pages_blocks_feat_crd_title_alignment" DEFAULT 'left',
      	"link_type" "enum_pages_blocks_feat_crd_link_type" DEFAULT 'reference',
      	"link_new_tab" boolean,
      	"link_download_link" boolean,
      	"link_arrow_link" boolean,
      	"link_pill_solid" boolean,
      	"link_pill_outline" boolean,
      	"link_anchor" varchar,
      	"link_url" varchar,
      	"link_email" varchar,
      	"block_name" varchar
      );
  CREATE TABLE IF NOT EXISTS "pages_blocks_feat_crd_locales" (
      	"title" varchar,
      	"subtitle" varchar,
      	"desc" jsonb,
      	"link_label" varchar,
      	"id" serial PRIMARY KEY NOT NULL,
      	"_locale" "_locales" NOT NULL,
      	"_parent_id" varchar NOT NULL
      );
  CREATE TABLE IF NOT EXISTS "pages_blocks_feat_crd_acc_feat_crds" (
      	"_order" integer NOT NULL,
      	"_parent_id" varchar NOT NULL,
      	"id" varchar PRIMARY KEY NOT NULL,
      	"mascot_id" integer,
      	"crd_colour" "enum_pages_blocks_feat_crd_acc_feat_crds_crd_colour" DEFAULT 'forest'
      );
  CREATE TABLE IF NOT EXISTS "pages_blocks_feat_crd_acc_feat_crds_locales" (
      	"acc_title" varchar,
      	"acc_content" jsonb,
      	"crd_tag" varchar,
      	"crd_content" jsonb,
      	"id" serial PRIMARY KEY NOT NULL,
      	"_locale" "_locales" NOT NULL,
      	"_parent_id" varchar NOT NULL
      );
  CREATE TABLE IF NOT EXISTS "pages_blocks_feat_crd_acc" (
      	"_order" integer NOT NULL,
      	"_parent_id" integer NOT NULL,
      	"_path" text NOT NULL,
      	"id" varchar PRIMARY KEY NOT NULL,
      	"block_name" varchar
      );
  CREATE TABLE IF NOT EXISTS "pages_blocks_feat_crd_acc_locales" (
      	"title" varchar,
      	"id" serial PRIMARY KEY NOT NULL,
      	"_locale" "_locales" NOT NULL,
      	"_parent_id" varchar NOT NULL
      );
  CREATE TABLE IF NOT EXISTS "pages_blocks_list_crd_dck_cards_tags" (
      	"_order" integer NOT NULL,
      	"_parent_id" varchar NOT NULL,
      	"id" varchar PRIMARY KEY NOT NULL
      );
  CREATE TABLE IF NOT EXISTS "pages_blocks_list_crd_dck_cards_tags_locales" (
      	"tag" varchar,
      	"id" serial PRIMARY KEY NOT NULL,
      	"_locale" "_locales" NOT NULL,
      	"_parent_id" varchar NOT NULL
      );
  CREATE TABLE IF NOT EXISTS "pages_blocks_list_crd_dck_cards" (
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
      	"link_anchor" varchar,
      	"link_url" varchar,
      	"link_email" varchar
      );
  CREATE TABLE IF NOT EXISTS "pages_blocks_list_crd_dck_cards_locales" (
      	"title" varchar,
      	"desc" varchar,
      	"link_label" varchar,
      	"id" serial PRIMARY KEY NOT NULL,
      	"_locale" "_locales" NOT NULL,
      	"_parent_id" varchar NOT NULL
      );
  CREATE TABLE IF NOT EXISTS "pages_blocks_list_crd_dck_buttons" (
      	"_order" integer NOT NULL,
      	"_parent_id" varchar NOT NULL,
      	"id" varchar PRIMARY KEY NOT NULL,
      	"link_type" "enum_pages_blocks_list_crd_dck_buttons_link_type" DEFAULT 'reference',
      	"link_new_tab" boolean,
      	"link_download_link" boolean,
      	"link_arrow_link" boolean,
      	"link_pill_solid" boolean,
      	"link_pill_outline" boolean,
      	"link_anchor" varchar,
      	"link_url" varchar,
      	"link_email" varchar
      );
  CREATE TABLE IF NOT EXISTS "pages_blocks_list_crd_dck_buttons_locales" (
      	"link_label" varchar,
      	"id" serial PRIMARY KEY NOT NULL,
      	"_locale" "_locales" NOT NULL,
      	"_parent_id" varchar NOT NULL
      );
  CREATE TABLE IF NOT EXISTS "pages_blocks_list_crd_dck" (
      	"_order" integer NOT NULL,
      	"_parent_id" integer NOT NULL,
      	"_path" text NOT NULL,
      	"id" varchar PRIMARY KEY NOT NULL,
      	"data_source" "enum_pages_blocks_list_crd_dck_data_source" DEFAULT 'manual',
      	"block_name" varchar
      );
  CREATE TABLE IF NOT EXISTS "pages_blocks_list_crd_dck_locales" (
      	"title" varchar,
      	"id" serial PRIMARY KEY NOT NULL,
      	"_locale" "_locales" NOT NULL,
      	"_parent_id" varchar NOT NULL
      );
  CREATE TABLE IF NOT EXISTS "pages_blocks_faq_blk_faqs" (
      	"_order" integer NOT NULL,
      	"_parent_id" varchar NOT NULL,
      	"id" varchar PRIMARY KEY NOT NULL
      );
  CREATE TABLE IF NOT EXISTS "pages_blocks_faq_blk_faqs_locales" (
      	"question" varchar,
      	"answer" jsonb,
      	"id" serial PRIMARY KEY NOT NULL,
      	"_locale" "_locales" NOT NULL,
      	"_parent_id" varchar NOT NULL
      );
  CREATE TABLE IF NOT EXISTS "pages_blocks_faq_blk" (
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
      	"link_anchor" varchar,
      	"link_url" varchar,
      	"link_email" varchar,
      	"block_name" varchar
      );
  CREATE TABLE IF NOT EXISTS "pages_blocks_faq_blk_locales" (
      	"title" varchar,
      	"desc" varchar,
      	"link_label" varchar,
      	"id" serial PRIMARY KEY NOT NULL,
      	"_locale" "_locales" NOT NULL,
      	"_parent_id" varchar NOT NULL
      );
  CREATE TABLE IF NOT EXISTS "pages_blocks_pink_puffy_top_row" (
      	"_order" integer NOT NULL,
      	"_parent_id" varchar NOT NULL,
      	"id" varchar PRIMARY KEY NOT NULL
      );
  CREATE TABLE IF NOT EXISTS "pages_blocks_pink_puffy_top_row_locales" (
      	"title" varchar,
      	"subtitle" varchar,
      	"description" varchar,
      	"id" serial PRIMARY KEY NOT NULL,
      	"_locale" "_locales" NOT NULL,
      	"_parent_id" varchar NOT NULL
      );
  CREATE TABLE IF NOT EXISTS "pages_blocks_pink_puffy_bot_row" (
      	"_order" integer NOT NULL,
      	"_parent_id" varchar NOT NULL,
      	"id" varchar PRIMARY KEY NOT NULL
      );
  CREATE TABLE IF NOT EXISTS "pages_blocks_pink_puffy_bot_row_locales" (
      	"title" varchar,
      	"description" varchar,
      	"id" serial PRIMARY KEY NOT NULL,
      	"_locale" "_locales" NOT NULL,
      	"_parent_id" varchar NOT NULL
      );
  CREATE TABLE IF NOT EXISTS "pages_blocks_pink_puffy_links" (
      	"_order" integer NOT NULL,
      	"_parent_id" varchar NOT NULL,
      	"id" varchar PRIMARY KEY NOT NULL,
      	"link_type" "enum_pages_blocks_pink_puffy_links_link_type" DEFAULT 'reference',
      	"link_new_tab" boolean,
      	"link_download_link" boolean,
      	"link_arrow_link" boolean,
      	"link_pill_solid" boolean,
      	"link_pill_outline" boolean,
      	"link_anchor" varchar,
      	"link_url" varchar,
      	"link_email" varchar
      );
  CREATE TABLE IF NOT EXISTS "pages_blocks_pink_puffy_links_locales" (
      	"link_label" varchar,
      	"id" serial PRIMARY KEY NOT NULL,
      	"_locale" "_locales" NOT NULL,
      	"_parent_id" varchar NOT NULL
      );
  CREATE TABLE IF NOT EXISTS "pages_blocks_pink_puffy" (
      	"_order" integer NOT NULL,
      	"_parent_id" integer NOT NULL,
      	"_path" text NOT NULL,
      	"id" varchar PRIMARY KEY NOT NULL,
      	"align" "enum_pages_blocks_pink_puffy_align" DEFAULT 'center',
      	"block_name" varchar
      );
  CREATE TABLE IF NOT EXISTS "pages_blocks_pink_puffy_locales" (
      	"title" varchar,
      	"subtitle" varchar,
      	"id" serial PRIMARY KEY NOT NULL,
      	"_locale" "_locales" NOT NULL,
      	"_parent_id" varchar NOT NULL
      );
  CREATE TABLE IF NOT EXISTS "pages_blocks_beige_puffy_items" (
      	"_order" integer NOT NULL,
      	"_parent_id" varchar NOT NULL,
      	"id" varchar PRIMARY KEY NOT NULL
      );
  CREATE TABLE IF NOT EXISTS "pages_blocks_beige_puffy_items_locales" (
      	"title" varchar,
      	"subtitle" varchar,
      	"description" varchar,
      	"id" serial PRIMARY KEY NOT NULL,
      	"_locale" "_locales" NOT NULL,
      	"_parent_id" varchar NOT NULL
      );
  CREATE TABLE IF NOT EXISTS "pages_blocks_beige_puffy" (
      	"_order" integer NOT NULL,
      	"_parent_id" integer NOT NULL,
      	"_path" text NOT NULL,
      	"id" varchar PRIMARY KEY NOT NULL,
      	"align" "enum_pages_blocks_beige_puffy_align" DEFAULT 'center',
      	"block_name" varchar
      );
  CREATE TABLE IF NOT EXISTS "pages_blocks_beige_puffy_locales" (
      	"title" varchar,
      	"subtitle" varchar,
      	"id" serial PRIMARY KEY NOT NULL,
      	"_locale" "_locales" NOT NULL,
      	"_parent_id" varchar NOT NULL
      );
  CREATE TABLE IF NOT EXISTS "pages_blocks_funding_map_items_subitems" (
      	"_order" integer NOT NULL,
      	"_parent_id" varchar NOT NULL,
      	"id" varchar PRIMARY KEY NOT NULL
      );
  CREATE TABLE IF NOT EXISTS "pages_blocks_funding_map_items_subitems_locales" (
      	"statnumber" varchar,
      	"description" varchar,
      	"id" serial PRIMARY KEY NOT NULL,
      	"_locale" "_locales" NOT NULL,
      	"_parent_id" varchar NOT NULL
      );
  CREATE TABLE IF NOT EXISTS "pages_blocks_funding_map_items" (
      	"_order" integer NOT NULL,
      	"_parent_id" varchar NOT NULL,
      	"id" varchar PRIMARY KEY NOT NULL,
      	"region_name" "enum_pages_blocks_funding_map_items_region_name" DEFAULT 'uaf-asia-pacific'
      );
  CREATE TABLE IF NOT EXISTS "pages_blocks_funding_map" (
      	"_order" integer NOT NULL,
      	"_parent_id" integer NOT NULL,
      	"_path" text NOT NULL,
      	"id" varchar PRIMARY KEY NOT NULL,
      	"block_name" varchar
      );
  CREATE TABLE IF NOT EXISTS "pages_blocks_funding_map_locales" (
      	"title" varchar,
      	"subtitle" varchar,
      	"selector_label" varchar,
      	"id" serial PRIMARY KEY NOT NULL,
      	"_locale" "_locales" NOT NULL,
      	"_parent_id" varchar NOT NULL
      );
  CREATE TABLE IF NOT EXISTS "pages_blocks_resource_feat_card" (
      	"_order" integer NOT NULL,
      	"_parent_id" integer NOT NULL,
      	"_path" text NOT NULL,
      	"id" varchar PRIMARY KEY NOT NULL,
      	"align" "enum_pages_blocks_resource_feat_card_align" DEFAULT 'center',
      	"add_all_resources" boolean,
      	"filter_by_doc_type_id" integer,
      	"block_name" varchar
      );
  CREATE TABLE IF NOT EXISTS "pages_blocks_resource_feat_card_locales" (
      	"title" varchar,
      	"desc" jsonb,
      	"id" serial PRIMARY KEY NOT NULL,
      	"_locale" "_locales" NOT NULL,
      	"_parent_id" varchar NOT NULL
      );
  CREATE TABLE IF NOT EXISTS "pages_blocks_resource_gallery" (
      	"_order" integer NOT NULL,
      	"_parent_id" integer NOT NULL,
      	"_path" text NOT NULL,
      	"id" varchar PRIMARY KEY NOT NULL,
      	"align" "enum_pages_blocks_resource_gallery_align" DEFAULT 'center',
      	"add_all_resources" boolean,
      	"filter_by_doc_type_id" integer,
      	"block_name" varchar
      );
  CREATE TABLE IF NOT EXISTS "pages_blocks_resource_gallery_locales" (
      	"title" varchar,
      	"desc" jsonb,
      	"id" serial PRIMARY KEY NOT NULL,
      	"_locale" "_locales" NOT NULL,
      	"_parent_id" varchar NOT NULL
      );
  CREATE TABLE IF NOT EXISTS "pages_blocks_pillar_card_cards" (
      	"_order" integer NOT NULL,
      	"_parent_id" varchar NOT NULL,
      	"id" varchar PRIMARY KEY NOT NULL,
      	"mascot_id" integer
      );
  CREATE TABLE IF NOT EXISTS "pages_blocks_pillar_card_cards_locales" (
      	"title" varchar,
      	"id" serial PRIMARY KEY NOT NULL,
      	"_locale" "_locales" NOT NULL,
      	"_parent_id" varchar NOT NULL
      );
  CREATE TABLE IF NOT EXISTS "pages_blocks_pillar_card" (
      	"_order" integer NOT NULL,
      	"_parent_id" integer NOT NULL,
      	"_path" text NOT NULL,
      	"id" varchar PRIMARY KEY NOT NULL,
      	"align" "enum_pages_blocks_pillar_card_align" DEFAULT 'left',
      	"block_name" varchar
      );
  CREATE TABLE IF NOT EXISTS "pages_blocks_pillar_card_locales" (
      	"title" varchar,
      	"subtitle" jsonb,
      	"id" serial PRIMARY KEY NOT NULL,
      	"_locale" "_locales" NOT NULL,
      	"_parent_id" varchar NOT NULL
      );
  CREATE TABLE IF NOT EXISTS "pages_blocks_testimonial_deck_cards" (
      	"_order" integer NOT NULL,
      	"_parent_id" varchar NOT NULL,
      	"id" varchar PRIMARY KEY NOT NULL
      );
  CREATE TABLE IF NOT EXISTS "pages_blocks_testimonial_deck_cards_locales" (
      	"quote_text" varchar,
      	"attrib_name" varchar,
      	"attrib_dsg" jsonb,
      	"id" serial PRIMARY KEY NOT NULL,
      	"_locale" "_locales" NOT NULL,
      	"_parent_id" varchar NOT NULL
      );
  CREATE TABLE IF NOT EXISTS "pages_blocks_testimonial_deck" (
      	"_order" integer NOT NULL,
      	"_parent_id" integer NOT NULL,
      	"_path" text NOT NULL,
      	"id" varchar PRIMARY KEY NOT NULL,
      	"block_name" varchar
      );
  CREATE TABLE IF NOT EXISTS "pages_blocks_testimonial_deck_locales" (
      	"title" varchar,
      	"id" serial PRIMARY KEY NOT NULL,
      	"_locale" "_locales" NOT NULL,
      	"_parent_id" varchar NOT NULL
      );
  CREATE TABLE IF NOT EXISTS "pages_blocks_min_card_gallery_cards" (
      	"_order" integer NOT NULL,
      	"_parent_id" varchar NOT NULL,
      	"id" varchar PRIMARY KEY NOT NULL,
      	"mascot_id" integer
      );
  CREATE TABLE IF NOT EXISTS "pages_blocks_min_card_gallery_cards_locales" (
      	"title" varchar,
      	"description" varchar,
      	"id" serial PRIMARY KEY NOT NULL,
      	"_locale" "_locales" NOT NULL,
      	"_parent_id" varchar NOT NULL
      );
  CREATE TABLE IF NOT EXISTS "pages_blocks_min_card_gallery" (
      	"_order" integer NOT NULL,
      	"_parent_id" integer NOT NULL,
      	"_path" text NOT NULL,
      	"id" varchar PRIMARY KEY NOT NULL,
      	"header_align" "enum_pages_blocks_min_card_gallery_header_align" DEFAULT 'left',
      	"block_name" varchar
      );
  CREATE TABLE IF NOT EXISTS "pages_blocks_min_card_gallery_locales" (
      	"header_title" varchar,
      	"header_subtitle" varchar,
      	"id" serial PRIMARY KEY NOT NULL,
      	"_locale" "_locales" NOT NULL,
      	"_parent_id" varchar NOT NULL
      );
  CREATE TABLE IF NOT EXISTS "pages_blocks_id_card_gallery_cards" (
      	"_order" integer NOT NULL,
      	"_parent_id" varchar NOT NULL,
      	"id" varchar PRIMARY KEY NOT NULL,
      	"mascot_id" integer
      );
  CREATE TABLE IF NOT EXISTS "pages_blocks_id_card_gallery_cards_locales" (
      	"pronouns" varchar,
      	"fullname" varchar,
      	"designation" varchar,
      	"id" serial PRIMARY KEY NOT NULL,
      	"_locale" "_locales" NOT NULL,
      	"_parent_id" varchar NOT NULL
      );
  CREATE TABLE IF NOT EXISTS "pages_blocks_id_card_gallery" (
      	"_order" integer NOT NULL,
      	"_parent_id" integer NOT NULL,
      	"_path" text NOT NULL,
      	"id" varchar PRIMARY KEY NOT NULL,
      	"block_name" varchar
      );
  CREATE TABLE IF NOT EXISTS "pages_blocks_id_card_gallery_locales" (
      	"header_title" varchar,
      	"header_subtitle" varchar,
      	"header_description" varchar,
      	"id" serial PRIMARY KEY NOT NULL,
      	"_locale" "_locales" NOT NULL,
      	"_parent_id" varchar NOT NULL
      );
  CREATE TABLE IF NOT EXISTS "pages_blocks_two_column_block" (
      	"_order" integer NOT NULL,
      	"_parent_id" integer NOT NULL,
      	"_path" text NOT NULL,
      	"id" varchar PRIMARY KEY NOT NULL,
      	"block_name" varchar
      );
  CREATE TABLE IF NOT EXISTS "pages_blocks_two_column_block_locales" (
      	"title" varchar,
      	"subtitle" varchar,
      	"left_column" jsonb,
      	"right_column" jsonb,
      	"id" serial PRIMARY KEY NOT NULL,
      	"_locale" "_locales" NOT NULL,
      	"_parent_id" varchar NOT NULL
      );
  CREATE TABLE IF NOT EXISTS "pages_blocks_three_column_table_block_rows" (
      	"_order" integer NOT NULL,
      	"_parent_id" varchar NOT NULL,
      	"id" varchar PRIMARY KEY NOT NULL
      );
  CREATE TABLE IF NOT EXISTS "pages_blocks_three_column_table_block_rows_locales" (
      	"first_column" jsonb,
      	"second_column" jsonb,
      	"third_column" jsonb,
      	"id" serial PRIMARY KEY NOT NULL,
      	"_locale" "_locales" NOT NULL,
      	"_parent_id" varchar NOT NULL
      );
  CREATE TABLE IF NOT EXISTS "pages_blocks_three_column_table_block" (
      	"_order" integer NOT NULL,
      	"_parent_id" integer NOT NULL,
      	"_path" text NOT NULL,
      	"id" varchar PRIMARY KEY NOT NULL,
      	"column_widths" "enum_pages_blocks_three_column_table_block_column_widths" DEFAULT 'f-t-t',
      	"block_name" varchar
      );
  CREATE TABLE IF NOT EXISTS "pages_blocks_three_column_table_block_locales" (
      	"title" varchar,
      	"subtitle" varchar,
      	"id" serial PRIMARY KEY NOT NULL,
      	"_locale" "_locales" NOT NULL,
      	"_parent_id" varchar NOT NULL
      );
  CREATE TABLE IF NOT EXISTS "pages" (
      	"id" serial PRIMARY KEY NOT NULL,
      	"title" varchar,
      	"created_by_id" integer,
      	"updated_by_id" integer,
      	"bg_type" "enum_pages_bg_type",
      	"hero_colour" "enum_pages_hero_colour" DEFAULT 'forest',
      	"mascot_id" integer,
      	"email" varchar,
      	"published_at" timestamp(3) with time zone,
      	"slug" varchar,
      	"slug_lock" boolean DEFAULT true,
      	"meta_title" varchar,
      	"meta_description" varchar,
      	"meta_image_id" integer,
      	"folder_id" integer,
      	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
      	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
      	"deleted_at" timestamp(3) with time zone,
      	"_status" "enum_pages_status" DEFAULT 'draft'
      );
  CREATE TABLE IF NOT EXISTS "pages_locales" (
      	"hero_title" varchar,
      	"hero_subtitle" varchar,
      	"label" varchar,
      	"id" serial PRIMARY KEY NOT NULL,
      	"_locale" "_locales" NOT NULL,
      	"_parent_id" integer NOT NULL
      );
  CREATE TABLE IF NOT EXISTS "pages_rels" (
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
  CREATE TABLE IF NOT EXISTS "_pages_v_version_hero_buttons" (
      	"_order" integer NOT NULL,
      	"_parent_id" integer NOT NULL,
      	"id" serial PRIMARY KEY NOT NULL,
      	"link_type" "enum__pages_v_version_hero_buttons_link_type" DEFAULT 'reference',
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
  CREATE TABLE IF NOT EXISTS "_pages_v_version_hero_buttons_locales" (
      	"link_label" varchar,
      	"id" serial PRIMARY KEY NOT NULL,
      	"_locale" "_locales" NOT NULL,
      	"_parent_id" integer NOT NULL
      );
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_rich_content_block" (
      	"_order" integer NOT NULL,
      	"_parent_id" integer NOT NULL,
      	"_path" text NOT NULL,
      	"id" serial PRIMARY KEY NOT NULL,
      	"_uuid" varchar,
      	"block_name" varchar
      );
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_rich_content_block_locales" (
      	"rich_text" jsonb,
      	"id" serial PRIMARY KEY NOT NULL,
      	"_locale" "_locales" NOT NULL,
      	"_parent_id" integer NOT NULL
      );
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_secondarycta_cta_button" (
      	"_order" integer NOT NULL,
      	"_parent_id" integer NOT NULL,
      	"id" serial PRIMARY KEY NOT NULL,
      	"link_type" "enum__pages_v_blocks_secondarycta_cta_button_link_type" DEFAULT 'reference',
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
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_secondarycta_cta_button_locales" (
      	"link_label" varchar,
      	"id" serial PRIMARY KEY NOT NULL,
      	"_locale" "_locales" NOT NULL,
      	"_parent_id" integer NOT NULL
      );
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_secondarycta" (
      	"_order" integer NOT NULL,
      	"_parent_id" integer NOT NULL,
      	"_path" text NOT NULL,
      	"id" serial PRIMARY KEY NOT NULL,
      	"contact_email" varchar,
      	"ui_type" "enum__pages_v_blocks_secondarycta_ui_type" DEFAULT 'lrg_txt_cta',
      	"_uuid" varchar,
      	"block_name" varchar
      );
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_secondarycta_locales" (
      	"cta_title" varchar,
      	"cta_subtitle" varchar,
      	"contact_label" varchar,
      	"id" serial PRIMARY KEY NOT NULL,
      	"_locale" "_locales" NOT NULL,
      	"_parent_id" integer NOT NULL
      );
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_mcol_info_block_multicols" (
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
      	"link_anchor" varchar,
      	"link_url" varchar,
      	"link_email" varchar,
      	"_uuid" varchar
      );
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_mcol_info_block_multicols_locales" (
      	"title" varchar,
      	"col_content" varchar,
      	"link_label" varchar,
      	"id" serial PRIMARY KEY NOT NULL,
      	"_locale" "_locales" NOT NULL,
      	"_parent_id" integer NOT NULL
      );
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_mcol_info_block" (
      	"_order" integer NOT NULL,
      	"_parent_id" integer NOT NULL,
      	"_path" text NOT NULL,
      	"id" serial PRIMARY KEY NOT NULL,
      	"_uuid" varchar,
      	"block_name" varchar
      );
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_grant_card_grid_block" (
      	"_order" integer NOT NULL,
      	"_parent_id" integer NOT NULL,
      	"_path" text NOT NULL,
      	"id" serial PRIMARY KEY NOT NULL,
      	"_uuid" varchar,
      	"block_name" varchar
      );
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_grant_card_grid_block_locales" (
      	"title" varchar,
      	"desc" varchar,
      	"id" serial PRIMARY KEY NOT NULL,
      	"_locale" "_locales" NOT NULL,
      	"_parent_id" integer NOT NULL
      );
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_mstep_process_steps_details" (
      	"_order" integer NOT NULL,
      	"_parent_id" integer NOT NULL,
      	"id" serial PRIMARY KEY NOT NULL,
      	"_uuid" varchar
      );
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_mstep_process_steps_details_locales" (
      	"bullet" jsonb,
      	"id" serial PRIMARY KEY NOT NULL,
      	"_locale" "_locales" NOT NULL,
      	"_parent_id" integer NOT NULL
      );
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_mstep_process_steps" (
      	"_order" integer NOT NULL,
      	"_parent_id" integer NOT NULL,
      	"id" serial PRIMARY KEY NOT NULL,
      	"icon" "enum__pages_v_blocks_mstep_process_steps_icon" DEFAULT 'FileText',
      	"_uuid" varchar
      );
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_mstep_process_steps_locales" (
      	"step_title" varchar,
      	"title" varchar,
      	"tip" jsonb,
      	"id" serial PRIMARY KEY NOT NULL,
      	"_locale" "_locales" NOT NULL,
      	"_parent_id" integer NOT NULL
      );
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_mstep_process" (
      	"_order" integer NOT NULL,
      	"_parent_id" integer NOT NULL,
      	"_path" text NOT NULL,
      	"id" serial PRIMARY KEY NOT NULL,
      	"_uuid" varchar,
      	"block_name" varchar
      );
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_mstep_process_locales" (
      	"title" varchar,
      	"subtitle" varchar,
      	"id" serial PRIMARY KEY NOT NULL,
      	"_locale" "_locales" NOT NULL,
      	"_parent_id" integer NOT NULL
      );
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_comparison_blk_lft_grp_lft_points" (
      	"_order" integer NOT NULL,
      	"_parent_id" integer NOT NULL,
      	"id" serial PRIMARY KEY NOT NULL,
      	"_uuid" varchar
      );
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_comparison_blk_lft_grp_lft_points_locales" (
      	"point" varchar,
      	"id" serial PRIMARY KEY NOT NULL,
      	"_locale" "_locales" NOT NULL,
      	"_parent_id" integer NOT NULL
      );
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_comparison_blk_rt_grp_rt_points" (
      	"_order" integer NOT NULL,
      	"_parent_id" integer NOT NULL,
      	"id" serial PRIMARY KEY NOT NULL,
      	"_uuid" varchar
      );
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_comparison_blk_rt_grp_rt_points_locales" (
      	"point" varchar,
      	"id" serial PRIMARY KEY NOT NULL,
      	"_locale" "_locales" NOT NULL,
      	"_parent_id" integer NOT NULL
      );
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_comparison_blk_buttons" (
      	"_order" integer NOT NULL,
      	"_parent_id" integer NOT NULL,
      	"id" serial PRIMARY KEY NOT NULL,
      	"link_type" "enum__pages_v_blocks_comparison_blk_buttons_link_type" DEFAULT 'reference',
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
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_comparison_blk_buttons_locales" (
      	"link_label" varchar,
      	"id" serial PRIMARY KEY NOT NULL,
      	"_locale" "_locales" NOT NULL,
      	"_parent_id" integer NOT NULL
      );
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_comparison_blk" (
      	"_order" integer NOT NULL,
      	"_parent_id" integer NOT NULL,
      	"_path" text NOT NULL,
      	"id" serial PRIMARY KEY NOT NULL,
      	"_uuid" varchar,
      	"block_name" varchar
      );
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_comparison_blk_locales" (
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
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_ylw_deck_cards_links" (
      	"_order" integer NOT NULL,
      	"_parent_id" integer NOT NULL,
      	"id" serial PRIMARY KEY NOT NULL,
      	"link_type" "enum__pages_v_blocks_ylw_deck_cards_links_link_type" DEFAULT 'reference',
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
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_ylw_deck_cards_links_locales" (
      	"desc" varchar,
      	"link_label" varchar,
      	"id" serial PRIMARY KEY NOT NULL,
      	"_locale" "_locales" NOT NULL,
      	"_parent_id" integer NOT NULL
      );
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_ylw_deck_cards" (
      	"_order" integer NOT NULL,
      	"_parent_id" integer NOT NULL,
      	"id" serial PRIMARY KEY NOT NULL,
      	"mascot_id" integer,
      	"mascot_pos" "enum__pages_v_blocks_ylw_deck_cards_mascot_pos" DEFAULT 'center',
      	"_uuid" varchar
      );
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_ylw_deck_cards_locales" (
      	"title" varchar,
      	"subtitle" varchar,
      	"desc" varchar,
      	"id" serial PRIMARY KEY NOT NULL,
      	"_locale" "_locales" NOT NULL,
      	"_parent_id" integer NOT NULL
      );
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_ylw_deck" (
      	"_order" integer NOT NULL,
      	"_parent_id" integer NOT NULL,
      	"_path" text NOT NULL,
      	"id" serial PRIMARY KEY NOT NULL,
      	"align" "enum__pages_v_blocks_ylw_deck_align" DEFAULT 'center',
      	"_uuid" varchar,
      	"block_name" varchar
      );
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_ylw_deck_locales" (
      	"title" varchar,
      	"desc" jsonb,
      	"id" serial PRIMARY KEY NOT NULL,
      	"_locale" "_locales" NOT NULL,
      	"_parent_id" integer NOT NULL
      );
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_feat_crd_tags" (
      	"_order" integer NOT NULL,
      	"_parent_id" integer NOT NULL,
      	"id" serial PRIMARY KEY NOT NULL,
      	"_uuid" varchar
      );
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_feat_crd_tags_locales" (
      	"tag" varchar,
      	"id" serial PRIMARY KEY NOT NULL,
      	"_locale" "_locales" NOT NULL,
      	"_parent_id" integer NOT NULL
      );
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_feat_crd" (
      	"_order" integer NOT NULL,
      	"_parent_id" integer NOT NULL,
      	"_path" text NOT NULL,
      	"id" serial PRIMARY KEY NOT NULL,
      	"image_id" integer,
      	"title_alignment" "enum__pages_v_blocks_feat_crd_title_alignment" DEFAULT 'left',
      	"link_type" "enum__pages_v_blocks_feat_crd_link_type" DEFAULT 'reference',
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
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_feat_crd_locales" (
      	"title" varchar,
      	"subtitle" varchar,
      	"desc" jsonb,
      	"link_label" varchar,
      	"id" serial PRIMARY KEY NOT NULL,
      	"_locale" "_locales" NOT NULL,
      	"_parent_id" integer NOT NULL
      );
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_feat_crd_acc_feat_crds" (
      	"_order" integer NOT NULL,
      	"_parent_id" integer NOT NULL,
      	"id" serial PRIMARY KEY NOT NULL,
      	"mascot_id" integer,
      	"crd_colour" "enum__pages_v_blocks_feat_crd_acc_feat_crds_crd_colour" DEFAULT 'forest',
      	"_uuid" varchar
      );
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_feat_crd_acc_feat_crds_locales" (
      	"acc_title" varchar,
      	"acc_content" jsonb,
      	"crd_tag" varchar,
      	"crd_content" jsonb,
      	"id" serial PRIMARY KEY NOT NULL,
      	"_locale" "_locales" NOT NULL,
      	"_parent_id" integer NOT NULL
      );
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_feat_crd_acc" (
      	"_order" integer NOT NULL,
      	"_parent_id" integer NOT NULL,
      	"_path" text NOT NULL,
      	"id" serial PRIMARY KEY NOT NULL,
      	"_uuid" varchar,
      	"block_name" varchar
      );
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_feat_crd_acc_locales" (
      	"title" varchar,
      	"id" serial PRIMARY KEY NOT NULL,
      	"_locale" "_locales" NOT NULL,
      	"_parent_id" integer NOT NULL
      );
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_list_crd_dck_cards_tags" (
      	"_order" integer NOT NULL,
      	"_parent_id" integer NOT NULL,
      	"id" serial PRIMARY KEY NOT NULL,
      	"_uuid" varchar
      );
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_list_crd_dck_cards_tags_locales" (
      	"tag" varchar,
      	"id" serial PRIMARY KEY NOT NULL,
      	"_locale" "_locales" NOT NULL,
      	"_parent_id" integer NOT NULL
      );
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_list_crd_dck_cards" (
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
      	"link_anchor" varchar,
      	"link_url" varchar,
      	"link_email" varchar,
      	"_uuid" varchar
      );
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_list_crd_dck_cards_locales" (
      	"title" varchar,
      	"desc" varchar,
      	"link_label" varchar,
      	"id" serial PRIMARY KEY NOT NULL,
      	"_locale" "_locales" NOT NULL,
      	"_parent_id" integer NOT NULL
      );
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_list_crd_dck_buttons" (
      	"_order" integer NOT NULL,
      	"_parent_id" integer NOT NULL,
      	"id" serial PRIMARY KEY NOT NULL,
      	"link_type" "enum__pages_v_blocks_list_crd_dck_buttons_link_type" DEFAULT 'reference',
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
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_list_crd_dck_buttons_locales" (
      	"link_label" varchar,
      	"id" serial PRIMARY KEY NOT NULL,
      	"_locale" "_locales" NOT NULL,
      	"_parent_id" integer NOT NULL
      );
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_list_crd_dck" (
      	"_order" integer NOT NULL,
      	"_parent_id" integer NOT NULL,
      	"_path" text NOT NULL,
      	"id" serial PRIMARY KEY NOT NULL,
      	"data_source" "enum__pages_v_blocks_list_crd_dck_data_source" DEFAULT 'manual',
      	"_uuid" varchar,
      	"block_name" varchar
      );
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_list_crd_dck_locales" (
      	"title" varchar,
      	"id" serial PRIMARY KEY NOT NULL,
      	"_locale" "_locales" NOT NULL,
      	"_parent_id" integer NOT NULL
      );
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_faq_blk_faqs" (
      	"_order" integer NOT NULL,
      	"_parent_id" integer NOT NULL,
      	"id" serial PRIMARY KEY NOT NULL,
      	"_uuid" varchar
      );
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_faq_blk_faqs_locales" (
      	"question" varchar,
      	"answer" jsonb,
      	"id" serial PRIMARY KEY NOT NULL,
      	"_locale" "_locales" NOT NULL,
      	"_parent_id" integer NOT NULL
      );
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_faq_blk" (
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
      	"link_anchor" varchar,
      	"link_url" varchar,
      	"link_email" varchar,
      	"_uuid" varchar,
      	"block_name" varchar
      );
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_faq_blk_locales" (
      	"title" varchar,
      	"desc" varchar,
      	"link_label" varchar,
      	"id" serial PRIMARY KEY NOT NULL,
      	"_locale" "_locales" NOT NULL,
      	"_parent_id" integer NOT NULL
      );
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_pink_puffy_top_row" (
      	"_order" integer NOT NULL,
      	"_parent_id" integer NOT NULL,
      	"id" serial PRIMARY KEY NOT NULL,
      	"_uuid" varchar
      );
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_pink_puffy_top_row_locales" (
      	"title" varchar,
      	"subtitle" varchar,
      	"description" varchar,
      	"id" serial PRIMARY KEY NOT NULL,
      	"_locale" "_locales" NOT NULL,
      	"_parent_id" integer NOT NULL
      );
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_pink_puffy_bot_row" (
      	"_order" integer NOT NULL,
      	"_parent_id" integer NOT NULL,
      	"id" serial PRIMARY KEY NOT NULL,
      	"_uuid" varchar
      );
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_pink_puffy_bot_row_locales" (
      	"title" varchar,
      	"description" varchar,
      	"id" serial PRIMARY KEY NOT NULL,
      	"_locale" "_locales" NOT NULL,
      	"_parent_id" integer NOT NULL
      );
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_pink_puffy_links" (
      	"_order" integer NOT NULL,
      	"_parent_id" integer NOT NULL,
      	"id" serial PRIMARY KEY NOT NULL,
      	"link_type" "enum__pages_v_blocks_pink_puffy_links_link_type" DEFAULT 'reference',
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
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_pink_puffy_links_locales" (
      	"link_label" varchar,
      	"id" serial PRIMARY KEY NOT NULL,
      	"_locale" "_locales" NOT NULL,
      	"_parent_id" integer NOT NULL
      );
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_pink_puffy" (
      	"_order" integer NOT NULL,
      	"_parent_id" integer NOT NULL,
      	"_path" text NOT NULL,
      	"id" serial PRIMARY KEY NOT NULL,
      	"align" "enum__pages_v_blocks_pink_puffy_align" DEFAULT 'center',
      	"_uuid" varchar,
      	"block_name" varchar
      );
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_pink_puffy_locales" (
      	"title" varchar,
      	"subtitle" varchar,
      	"id" serial PRIMARY KEY NOT NULL,
      	"_locale" "_locales" NOT NULL,
      	"_parent_id" integer NOT NULL
      );
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_beige_puffy_items" (
      	"_order" integer NOT NULL,
      	"_parent_id" integer NOT NULL,
      	"id" serial PRIMARY KEY NOT NULL,
      	"_uuid" varchar
      );
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_beige_puffy_items_locales" (
      	"title" varchar,
      	"subtitle" varchar,
      	"description" varchar,
      	"id" serial PRIMARY KEY NOT NULL,
      	"_locale" "_locales" NOT NULL,
      	"_parent_id" integer NOT NULL
      );
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_beige_puffy" (
      	"_order" integer NOT NULL,
      	"_parent_id" integer NOT NULL,
      	"_path" text NOT NULL,
      	"id" serial PRIMARY KEY NOT NULL,
      	"align" "enum__pages_v_blocks_beige_puffy_align" DEFAULT 'center',
      	"_uuid" varchar,
      	"block_name" varchar
      );
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_beige_puffy_locales" (
      	"title" varchar,
      	"subtitle" varchar,
      	"id" serial PRIMARY KEY NOT NULL,
      	"_locale" "_locales" NOT NULL,
      	"_parent_id" integer NOT NULL
      );
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_funding_map_items_subitems" (
      	"_order" integer NOT NULL,
      	"_parent_id" integer NOT NULL,
      	"id" serial PRIMARY KEY NOT NULL,
      	"_uuid" varchar
      );
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_funding_map_items_subitems_locales" (
      	"statnumber" varchar,
      	"description" varchar,
      	"id" serial PRIMARY KEY NOT NULL,
      	"_locale" "_locales" NOT NULL,
      	"_parent_id" integer NOT NULL
      );
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_funding_map_items" (
      	"_order" integer NOT NULL,
      	"_parent_id" integer NOT NULL,
      	"id" serial PRIMARY KEY NOT NULL,
      	"region_name" "enum__pages_v_blocks_funding_map_items_region_name" DEFAULT 'uaf-asia-pacific',
      	"_uuid" varchar
      );
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_funding_map" (
      	"_order" integer NOT NULL,
      	"_parent_id" integer NOT NULL,
      	"_path" text NOT NULL,
      	"id" serial PRIMARY KEY NOT NULL,
      	"_uuid" varchar,
      	"block_name" varchar
      );
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_funding_map_locales" (
      	"title" varchar,
      	"subtitle" varchar,
      	"selector_label" varchar,
      	"id" serial PRIMARY KEY NOT NULL,
      	"_locale" "_locales" NOT NULL,
      	"_parent_id" integer NOT NULL
      );
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_resource_feat_card" (
      	"_order" integer NOT NULL,
      	"_parent_id" integer NOT NULL,
      	"_path" text NOT NULL,
      	"id" serial PRIMARY KEY NOT NULL,
      	"align" "enum__pages_v_blocks_resource_feat_card_align" DEFAULT 'center',
      	"add_all_resources" boolean,
      	"filter_by_doc_type_id" integer,
      	"_uuid" varchar,
      	"block_name" varchar
      );
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_resource_feat_card_locales" (
      	"title" varchar,
      	"desc" jsonb,
      	"id" serial PRIMARY KEY NOT NULL,
      	"_locale" "_locales" NOT NULL,
      	"_parent_id" integer NOT NULL
      );
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_resource_gallery" (
      	"_order" integer NOT NULL,
      	"_parent_id" integer NOT NULL,
      	"_path" text NOT NULL,
      	"id" serial PRIMARY KEY NOT NULL,
      	"align" "enum__pages_v_blocks_resource_gallery_align" DEFAULT 'center',
      	"add_all_resources" boolean,
      	"filter_by_doc_type_id" integer,
      	"_uuid" varchar,
      	"block_name" varchar
      );
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_resource_gallery_locales" (
      	"title" varchar,
      	"desc" jsonb,
      	"id" serial PRIMARY KEY NOT NULL,
      	"_locale" "_locales" NOT NULL,
      	"_parent_id" integer NOT NULL
      );
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_pillar_card_cards" (
      	"_order" integer NOT NULL,
      	"_parent_id" integer NOT NULL,
      	"id" serial PRIMARY KEY NOT NULL,
      	"mascot_id" integer,
      	"_uuid" varchar
      );
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_pillar_card_cards_locales" (
      	"title" varchar,
      	"id" serial PRIMARY KEY NOT NULL,
      	"_locale" "_locales" NOT NULL,
      	"_parent_id" integer NOT NULL
      );
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_pillar_card" (
      	"_order" integer NOT NULL,
      	"_parent_id" integer NOT NULL,
      	"_path" text NOT NULL,
      	"id" serial PRIMARY KEY NOT NULL,
      	"align" "enum__pages_v_blocks_pillar_card_align" DEFAULT 'left',
      	"_uuid" varchar,
      	"block_name" varchar
      );
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_pillar_card_locales" (
      	"title" varchar,
      	"subtitle" jsonb,
      	"id" serial PRIMARY KEY NOT NULL,
      	"_locale" "_locales" NOT NULL,
      	"_parent_id" integer NOT NULL
      );
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_testimonial_deck_cards" (
      	"_order" integer NOT NULL,
      	"_parent_id" integer NOT NULL,
      	"id" serial PRIMARY KEY NOT NULL,
      	"_uuid" varchar
      );
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_testimonial_deck_cards_locales" (
      	"quote_text" varchar,
      	"attrib_name" varchar,
      	"attrib_dsg" jsonb,
      	"id" serial PRIMARY KEY NOT NULL,
      	"_locale" "_locales" NOT NULL,
      	"_parent_id" integer NOT NULL
      );
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_testimonial_deck" (
      	"_order" integer NOT NULL,
      	"_parent_id" integer NOT NULL,
      	"_path" text NOT NULL,
      	"id" serial PRIMARY KEY NOT NULL,
      	"_uuid" varchar,
      	"block_name" varchar
      );
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_testimonial_deck_locales" (
      	"title" varchar,
      	"id" serial PRIMARY KEY NOT NULL,
      	"_locale" "_locales" NOT NULL,
      	"_parent_id" integer NOT NULL
      );
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_min_card_gallery_cards" (
      	"_order" integer NOT NULL,
      	"_parent_id" integer NOT NULL,
      	"id" serial PRIMARY KEY NOT NULL,
      	"mascot_id" integer,
      	"_uuid" varchar
      );
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_min_card_gallery_cards_locales" (
      	"title" varchar,
      	"description" varchar,
      	"id" serial PRIMARY KEY NOT NULL,
      	"_locale" "_locales" NOT NULL,
      	"_parent_id" integer NOT NULL
      );
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_min_card_gallery" (
      	"_order" integer NOT NULL,
      	"_parent_id" integer NOT NULL,
      	"_path" text NOT NULL,
      	"id" serial PRIMARY KEY NOT NULL,
      	"header_align" "enum__pages_v_blocks_min_card_gallery_header_align" DEFAULT 'left',
      	"_uuid" varchar,
      	"block_name" varchar
      );
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_min_card_gallery_locales" (
      	"header_title" varchar,
      	"header_subtitle" varchar,
      	"id" serial PRIMARY KEY NOT NULL,
      	"_locale" "_locales" NOT NULL,
      	"_parent_id" integer NOT NULL
      );
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_id_card_gallery_cards" (
      	"_order" integer NOT NULL,
      	"_parent_id" integer NOT NULL,
      	"id" serial PRIMARY KEY NOT NULL,
      	"mascot_id" integer,
      	"_uuid" varchar
      );
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_id_card_gallery_cards_locales" (
      	"pronouns" varchar,
      	"fullname" varchar,
      	"designation" varchar,
      	"id" serial PRIMARY KEY NOT NULL,
      	"_locale" "_locales" NOT NULL,
      	"_parent_id" integer NOT NULL
      );
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_id_card_gallery" (
      	"_order" integer NOT NULL,
      	"_parent_id" integer NOT NULL,
      	"_path" text NOT NULL,
      	"id" serial PRIMARY KEY NOT NULL,
      	"_uuid" varchar,
      	"block_name" varchar
      );
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_id_card_gallery_locales" (
      	"header_title" varchar,
      	"header_subtitle" varchar,
      	"header_description" varchar,
      	"id" serial PRIMARY KEY NOT NULL,
      	"_locale" "_locales" NOT NULL,
      	"_parent_id" integer NOT NULL
      );
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_two_column_block" (
      	"_order" integer NOT NULL,
      	"_parent_id" integer NOT NULL,
      	"_path" text NOT NULL,
      	"id" serial PRIMARY KEY NOT NULL,
      	"_uuid" varchar,
      	"block_name" varchar
      );
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_two_column_block_locales" (
      	"title" varchar,
      	"subtitle" varchar,
      	"left_column" jsonb,
      	"right_column" jsonb,
      	"id" serial PRIMARY KEY NOT NULL,
      	"_locale" "_locales" NOT NULL,
      	"_parent_id" integer NOT NULL
      );
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_three_column_table_block_rows" (
      	"_order" integer NOT NULL,
      	"_parent_id" integer NOT NULL,
      	"id" serial PRIMARY KEY NOT NULL,
      	"_uuid" varchar
      );
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_three_column_table_block_rows_locales" (
      	"first_column" jsonb,
      	"second_column" jsonb,
      	"third_column" jsonb,
      	"id" serial PRIMARY KEY NOT NULL,
      	"_locale" "_locales" NOT NULL,
      	"_parent_id" integer NOT NULL
      );
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_three_column_table_block" (
      	"_order" integer NOT NULL,
      	"_parent_id" integer NOT NULL,
      	"_path" text NOT NULL,
      	"id" serial PRIMARY KEY NOT NULL,
      	"column_widths" "enum__pages_v_blocks_three_column_table_block_column_widths" DEFAULT 'f-t-t',
      	"_uuid" varchar,
      	"block_name" varchar
      );
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_three_column_table_block_locales" (
      	"title" varchar,
      	"subtitle" varchar,
      	"id" serial PRIMARY KEY NOT NULL,
      	"_locale" "_locales" NOT NULL,
      	"_parent_id" integer NOT NULL
      );
  CREATE TABLE IF NOT EXISTS "_pages_v" (
      	"id" serial PRIMARY KEY NOT NULL,
      	"parent_id" integer,
      	"version_title" varchar,
      	"version_created_by_id" integer,
      	"version_updated_by_id" integer,
      	"version_bg_type" "enum__pages_v_version_bg_type",
      	"version_hero_colour" "enum__pages_v_version_hero_colour" DEFAULT 'forest',
      	"version_mascot_id" integer,
      	"version_email" varchar,
      	"version_published_at" timestamp(3) with time zone,
      	"version_slug" varchar,
      	"version_slug_lock" boolean DEFAULT true,
      	"version_meta_title" varchar,
      	"version_meta_description" varchar,
      	"version_meta_image_id" integer,
      	"version_folder_id" integer,
      	"version_updated_at" timestamp(3) with time zone,
      	"version_created_at" timestamp(3) with time zone,
      	"version_deleted_at" timestamp(3) with time zone,
      	"version__status" "enum__pages_v_version_status" DEFAULT 'draft',
      	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
      	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
      	"snapshot" boolean,
      	"published_locale" "enum__pages_v_published_locale",
      	"latest" boolean
      );
  CREATE TABLE IF NOT EXISTS "_pages_v_locales" (
      	"version_hero_title" varchar,
      	"version_hero_subtitle" varchar,
      	"version_label" varchar,
      	"id" serial PRIMARY KEY NOT NULL,
      	"_locale" "_locales" NOT NULL,
      	"_parent_id" integer NOT NULL
      );
  CREATE TABLE IF NOT EXISTS "_pages_v_rels" (
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
  CREATE TABLE IF NOT EXISTS "blog_hero_buttons" (
      	"_order" integer NOT NULL,
      	"_parent_id" integer NOT NULL,
      	"id" varchar PRIMARY KEY NOT NULL,
      	"link_type" "enum_blog_hero_buttons_link_type" DEFAULT 'reference',
      	"link_new_tab" boolean,
      	"link_download_link" boolean,
      	"link_arrow_link" boolean,
      	"link_pill_solid" boolean,
      	"link_pill_outline" boolean,
      	"link_anchor" varchar,
      	"link_url" varchar,
      	"link_email" varchar
      );
  CREATE TABLE IF NOT EXISTS "blog_hero_buttons_locales" (
      	"link_label" varchar,
      	"id" serial PRIMARY KEY NOT NULL,
      	"_locale" "_locales" NOT NULL,
      	"_parent_id" varchar NOT NULL
      );
  CREATE TABLE IF NOT EXISTS "blog_blocks_rich_content_block" (
      	"_order" integer NOT NULL,
      	"_parent_id" integer NOT NULL,
      	"_path" text NOT NULL,
      	"id" varchar PRIMARY KEY NOT NULL,
      	"block_name" varchar
      );
  CREATE TABLE IF NOT EXISTS "blog_blocks_rich_content_block_locales" (
      	"rich_text" jsonb,
      	"id" serial PRIMARY KEY NOT NULL,
      	"_locale" "_locales" NOT NULL,
      	"_parent_id" varchar NOT NULL
      );
  CREATE TABLE IF NOT EXISTS "blog_blocks_secondarycta_cta_button" (
      	"_order" integer NOT NULL,
      	"_parent_id" varchar NOT NULL,
      	"id" varchar PRIMARY KEY NOT NULL,
      	"link_type" "enum_blog_blocks_secondarycta_cta_button_link_type" DEFAULT 'reference',
      	"link_new_tab" boolean,
      	"link_download_link" boolean,
      	"link_arrow_link" boolean,
      	"link_pill_solid" boolean,
      	"link_pill_outline" boolean,
      	"link_anchor" varchar,
      	"link_url" varchar,
      	"link_email" varchar
      );
  CREATE TABLE IF NOT EXISTS "blog_blocks_secondarycta_cta_button_locales" (
      	"link_label" varchar,
      	"id" serial PRIMARY KEY NOT NULL,
      	"_locale" "_locales" NOT NULL,
      	"_parent_id" varchar NOT NULL
      );
  CREATE TABLE IF NOT EXISTS "blog_blocks_secondarycta" (
      	"_order" integer NOT NULL,
      	"_parent_id" integer NOT NULL,
      	"_path" text NOT NULL,
      	"id" varchar PRIMARY KEY NOT NULL,
      	"contact_email" varchar,
      	"ui_type" "enum_blog_blocks_secondarycta_ui_type" DEFAULT 'lrg_txt_cta',
      	"block_name" varchar
      );
  CREATE TABLE IF NOT EXISTS "blog_blocks_secondarycta_locales" (
      	"cta_title" varchar,
      	"cta_subtitle" varchar,
      	"contact_label" varchar,
      	"id" serial PRIMARY KEY NOT NULL,
      	"_locale" "_locales" NOT NULL,
      	"_parent_id" varchar NOT NULL
      );
  CREATE TABLE IF NOT EXISTS "blog_blocks_mcol_info_block_multicols" (
      	"_order" integer NOT NULL,
      	"_parent_id" varchar NOT NULL,
      	"id" varchar PRIMARY KEY NOT NULL,
      	"add_link" boolean,
      	"link_type" "enum_blog_blocks_mcol_info_block_multicols_link_type" DEFAULT 'reference',
      	"link_new_tab" boolean,
      	"link_download_link" boolean,
      	"link_arrow_link" boolean,
      	"link_pill_solid" boolean,
      	"link_pill_outline" boolean,
      	"link_anchor" varchar,
      	"link_url" varchar,
      	"link_email" varchar
      );
  CREATE TABLE IF NOT EXISTS "blog_blocks_mcol_info_block_multicols_locales" (
      	"title" varchar,
      	"col_content" varchar,
      	"link_label" varchar,
      	"id" serial PRIMARY KEY NOT NULL,
      	"_locale" "_locales" NOT NULL,
      	"_parent_id" varchar NOT NULL
      );
  CREATE TABLE IF NOT EXISTS "blog_blocks_mcol_info_block" (
      	"_order" integer NOT NULL,
      	"_parent_id" integer NOT NULL,
      	"_path" text NOT NULL,
      	"id" varchar PRIMARY KEY NOT NULL,
      	"block_name" varchar
      );
  CREATE TABLE IF NOT EXISTS "blog_blocks_grant_card_grid_block" (
      	"_order" integer NOT NULL,
      	"_parent_id" integer NOT NULL,
      	"_path" text NOT NULL,
      	"id" varchar PRIMARY KEY NOT NULL,
      	"block_name" varchar
      );
  CREATE TABLE IF NOT EXISTS "blog_blocks_grant_card_grid_block_locales" (
      	"title" varchar,
      	"desc" varchar,
      	"id" serial PRIMARY KEY NOT NULL,
      	"_locale" "_locales" NOT NULL,
      	"_parent_id" varchar NOT NULL
      );
  CREATE TABLE IF NOT EXISTS "blog_blocks_mstep_process_steps_details" (
      	"_order" integer NOT NULL,
      	"_parent_id" varchar NOT NULL,
      	"id" varchar PRIMARY KEY NOT NULL
      );
  CREATE TABLE IF NOT EXISTS "blog_blocks_mstep_process_steps_details_locales" (
      	"bullet" jsonb,
      	"id" serial PRIMARY KEY NOT NULL,
      	"_locale" "_locales" NOT NULL,
      	"_parent_id" varchar NOT NULL
      );
  CREATE TABLE IF NOT EXISTS "blog_blocks_mstep_process_steps" (
      	"_order" integer NOT NULL,
      	"_parent_id" varchar NOT NULL,
      	"id" varchar PRIMARY KEY NOT NULL,
      	"icon" "enum_blog_blocks_mstep_process_steps_icon" DEFAULT 'FileText'
      );
  CREATE TABLE IF NOT EXISTS "blog_blocks_mstep_process_steps_locales" (
      	"step_title" varchar,
      	"title" varchar,
      	"tip" jsonb,
      	"id" serial PRIMARY KEY NOT NULL,
      	"_locale" "_locales" NOT NULL,
      	"_parent_id" varchar NOT NULL
      );
  CREATE TABLE IF NOT EXISTS "blog_blocks_mstep_process" (
      	"_order" integer NOT NULL,
      	"_parent_id" integer NOT NULL,
      	"_path" text NOT NULL,
      	"id" varchar PRIMARY KEY NOT NULL,
      	"block_name" varchar
      );
  CREATE TABLE IF NOT EXISTS "blog_blocks_mstep_process_locales" (
      	"title" varchar,
      	"subtitle" varchar,
      	"id" serial PRIMARY KEY NOT NULL,
      	"_locale" "_locales" NOT NULL,
      	"_parent_id" varchar NOT NULL
      );
  CREATE TABLE IF NOT EXISTS "blog_blocks_comparison_blk_lft_grp_lft_points" (
      	"_order" integer NOT NULL,
      	"_parent_id" varchar NOT NULL,
      	"id" varchar PRIMARY KEY NOT NULL
      );
  CREATE TABLE IF NOT EXISTS "blog_blocks_comparison_blk_lft_grp_lft_points_locales" (
      	"point" varchar,
      	"id" serial PRIMARY KEY NOT NULL,
      	"_locale" "_locales" NOT NULL,
      	"_parent_id" varchar NOT NULL
      );
  CREATE TABLE IF NOT EXISTS "blog_blocks_comparison_blk_rt_grp_rt_points" (
      	"_order" integer NOT NULL,
      	"_parent_id" varchar NOT NULL,
      	"id" varchar PRIMARY KEY NOT NULL
      );
  CREATE TABLE IF NOT EXISTS "blog_blocks_comparison_blk_rt_grp_rt_points_locales" (
      	"point" varchar,
      	"id" serial PRIMARY KEY NOT NULL,
      	"_locale" "_locales" NOT NULL,
      	"_parent_id" varchar NOT NULL
      );
  CREATE TABLE IF NOT EXISTS "blog_blocks_comparison_blk_buttons" (
      	"_order" integer NOT NULL,
      	"_parent_id" varchar NOT NULL,
      	"id" varchar PRIMARY KEY NOT NULL,
      	"link_type" "enum_blog_blocks_comparison_blk_buttons_link_type" DEFAULT 'reference',
      	"link_new_tab" boolean,
      	"link_download_link" boolean,
      	"link_arrow_link" boolean,
      	"link_pill_solid" boolean,
      	"link_pill_outline" boolean,
      	"link_anchor" varchar,
      	"link_url" varchar,
      	"link_email" varchar
      );
  CREATE TABLE IF NOT EXISTS "blog_blocks_comparison_blk_buttons_locales" (
      	"link_label" varchar,
      	"id" serial PRIMARY KEY NOT NULL,
      	"_locale" "_locales" NOT NULL,
      	"_parent_id" varchar NOT NULL
      );
  CREATE TABLE IF NOT EXISTS "blog_blocks_comparison_blk" (
      	"_order" integer NOT NULL,
      	"_parent_id" integer NOT NULL,
      	"_path" text NOT NULL,
      	"id" varchar PRIMARY KEY NOT NULL,
      	"block_name" varchar
      );
  CREATE TABLE IF NOT EXISTS "blog_blocks_comparison_blk_locales" (
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
  CREATE TABLE IF NOT EXISTS "blog_blocks_ylw_deck_cards_links" (
      	"_order" integer NOT NULL,
      	"_parent_id" varchar NOT NULL,
      	"id" varchar PRIMARY KEY NOT NULL,
      	"link_type" "enum_blog_blocks_ylw_deck_cards_links_link_type" DEFAULT 'reference',
      	"link_new_tab" boolean,
      	"link_download_link" boolean,
      	"link_arrow_link" boolean,
      	"link_pill_solid" boolean,
      	"link_pill_outline" boolean,
      	"link_anchor" varchar,
      	"link_url" varchar,
      	"link_email" varchar
      );
  CREATE TABLE IF NOT EXISTS "blog_blocks_ylw_deck_cards_links_locales" (
      	"desc" varchar,
      	"link_label" varchar,
      	"id" serial PRIMARY KEY NOT NULL,
      	"_locale" "_locales" NOT NULL,
      	"_parent_id" varchar NOT NULL
      );
  CREATE TABLE IF NOT EXISTS "blog_blocks_ylw_deck_cards" (
      	"_order" integer NOT NULL,
      	"_parent_id" varchar NOT NULL,
      	"id" varchar PRIMARY KEY NOT NULL,
      	"mascot_id" integer,
      	"mascot_pos" "enum_blog_blocks_ylw_deck_cards_mascot_pos" DEFAULT 'center'
      );
  CREATE TABLE IF NOT EXISTS "blog_blocks_ylw_deck_cards_locales" (
      	"title" varchar,
      	"subtitle" varchar,
      	"desc" varchar,
      	"id" serial PRIMARY KEY NOT NULL,
      	"_locale" "_locales" NOT NULL,
      	"_parent_id" varchar NOT NULL
      );
  CREATE TABLE IF NOT EXISTS "blog_blocks_ylw_deck" (
      	"_order" integer NOT NULL,
      	"_parent_id" integer NOT NULL,
      	"_path" text NOT NULL,
      	"id" varchar PRIMARY KEY NOT NULL,
      	"align" "enum_blog_blocks_ylw_deck_align" DEFAULT 'center',
      	"block_name" varchar
      );
  CREATE TABLE IF NOT EXISTS "blog_blocks_ylw_deck_locales" (
      	"title" varchar,
      	"desc" jsonb,
      	"id" serial PRIMARY KEY NOT NULL,
      	"_locale" "_locales" NOT NULL,
      	"_parent_id" varchar NOT NULL
      );
  CREATE TABLE IF NOT EXISTS "blog_blocks_feat_crd_tags" (
      	"_order" integer NOT NULL,
      	"_parent_id" varchar NOT NULL,
      	"id" varchar PRIMARY KEY NOT NULL
      );
  CREATE TABLE IF NOT EXISTS "blog_blocks_feat_crd_tags_locales" (
      	"tag" varchar,
      	"id" serial PRIMARY KEY NOT NULL,
      	"_locale" "_locales" NOT NULL,
      	"_parent_id" varchar NOT NULL
      );
  CREATE TABLE IF NOT EXISTS "blog_blocks_feat_crd" (
      	"_order" integer NOT NULL,
      	"_parent_id" integer NOT NULL,
      	"_path" text NOT NULL,
      	"id" varchar PRIMARY KEY NOT NULL,
      	"image_id" integer,
      	"title_alignment" "enum_blog_blocks_feat_crd_title_alignment" DEFAULT 'left',
      	"link_type" "enum_blog_blocks_feat_crd_link_type" DEFAULT 'reference',
      	"link_new_tab" boolean,
      	"link_download_link" boolean,
      	"link_arrow_link" boolean,
      	"link_pill_solid" boolean,
      	"link_pill_outline" boolean,
      	"link_anchor" varchar,
      	"link_url" varchar,
      	"link_email" varchar,
      	"block_name" varchar
      );
  CREATE TABLE IF NOT EXISTS "blog_blocks_feat_crd_locales" (
      	"title" varchar,
      	"subtitle" varchar,
      	"desc" jsonb,
      	"link_label" varchar,
      	"id" serial PRIMARY KEY NOT NULL,
      	"_locale" "_locales" NOT NULL,
      	"_parent_id" varchar NOT NULL
      );
  CREATE TABLE IF NOT EXISTS "blog_blocks_feat_crd_acc_feat_crds" (
      	"_order" integer NOT NULL,
      	"_parent_id" varchar NOT NULL,
      	"id" varchar PRIMARY KEY NOT NULL,
      	"mascot_id" integer,
      	"crd_colour" "enum_blog_blocks_feat_crd_acc_feat_crds_crd_colour" DEFAULT 'forest'
      );
  CREATE TABLE IF NOT EXISTS "blog_blocks_feat_crd_acc_feat_crds_locales" (
      	"acc_title" varchar,
      	"acc_content" jsonb,
      	"crd_tag" varchar,
      	"crd_content" jsonb,
      	"id" serial PRIMARY KEY NOT NULL,
      	"_locale" "_locales" NOT NULL,
      	"_parent_id" varchar NOT NULL
      );
  CREATE TABLE IF NOT EXISTS "blog_blocks_feat_crd_acc" (
      	"_order" integer NOT NULL,
      	"_parent_id" integer NOT NULL,
      	"_path" text NOT NULL,
      	"id" varchar PRIMARY KEY NOT NULL,
      	"block_name" varchar
      );
  CREATE TABLE IF NOT EXISTS "blog_blocks_feat_crd_acc_locales" (
      	"title" varchar,
      	"id" serial PRIMARY KEY NOT NULL,
      	"_locale" "_locales" NOT NULL,
      	"_parent_id" varchar NOT NULL
      );
  CREATE TABLE IF NOT EXISTS "blog_blocks_list_crd_dck_cards_tags" (
      	"_order" integer NOT NULL,
      	"_parent_id" varchar NOT NULL,
      	"id" varchar PRIMARY KEY NOT NULL
      );
  CREATE TABLE IF NOT EXISTS "blog_blocks_list_crd_dck_cards_tags_locales" (
      	"tag" varchar,
      	"id" serial PRIMARY KEY NOT NULL,
      	"_locale" "_locales" NOT NULL,
      	"_parent_id" varchar NOT NULL
      );
  CREATE TABLE IF NOT EXISTS "blog_blocks_list_crd_dck_cards" (
      	"_order" integer NOT NULL,
      	"_parent_id" varchar NOT NULL,
      	"id" varchar PRIMARY KEY NOT NULL,
      	"image_id" integer,
      	"link_type" "enum_blog_blocks_list_crd_dck_cards_link_type" DEFAULT 'reference',
      	"link_new_tab" boolean,
      	"link_download_link" boolean,
      	"link_arrow_link" boolean,
      	"link_pill_solid" boolean,
      	"link_pill_outline" boolean,
      	"link_anchor" varchar,
      	"link_url" varchar,
      	"link_email" varchar
      );
  CREATE TABLE IF NOT EXISTS "blog_blocks_list_crd_dck_cards_locales" (
      	"title" varchar,
      	"desc" varchar,
      	"link_label" varchar,
      	"id" serial PRIMARY KEY NOT NULL,
      	"_locale" "_locales" NOT NULL,
      	"_parent_id" varchar NOT NULL
      );
  CREATE TABLE IF NOT EXISTS "blog_blocks_list_crd_dck_buttons" (
      	"_order" integer NOT NULL,
      	"_parent_id" varchar NOT NULL,
      	"id" varchar PRIMARY KEY NOT NULL,
      	"link_type" "enum_blog_blocks_list_crd_dck_buttons_link_type" DEFAULT 'reference',
      	"link_new_tab" boolean,
      	"link_download_link" boolean,
      	"link_arrow_link" boolean,
      	"link_pill_solid" boolean,
      	"link_pill_outline" boolean,
      	"link_anchor" varchar,
      	"link_url" varchar,
      	"link_email" varchar
      );
  CREATE TABLE IF NOT EXISTS "blog_blocks_list_crd_dck_buttons_locales" (
      	"link_label" varchar,
      	"id" serial PRIMARY KEY NOT NULL,
      	"_locale" "_locales" NOT NULL,
      	"_parent_id" varchar NOT NULL
      );
  CREATE TABLE IF NOT EXISTS "blog_blocks_list_crd_dck" (
      	"_order" integer NOT NULL,
      	"_parent_id" integer NOT NULL,
      	"_path" text NOT NULL,
      	"id" varchar PRIMARY KEY NOT NULL,
      	"data_source" "enum_blog_blocks_list_crd_dck_data_source" DEFAULT 'manual',
      	"block_name" varchar
      );
  CREATE TABLE IF NOT EXISTS "blog_blocks_list_crd_dck_locales" (
      	"title" varchar,
      	"id" serial PRIMARY KEY NOT NULL,
      	"_locale" "_locales" NOT NULL,
      	"_parent_id" varchar NOT NULL
      );
  CREATE TABLE IF NOT EXISTS "blog_blocks_faq_blk_faqs" (
      	"_order" integer NOT NULL,
      	"_parent_id" varchar NOT NULL,
      	"id" varchar PRIMARY KEY NOT NULL
      );
  CREATE TABLE IF NOT EXISTS "blog_blocks_faq_blk_faqs_locales" (
      	"question" varchar,
      	"answer" jsonb,
      	"id" serial PRIMARY KEY NOT NULL,
      	"_locale" "_locales" NOT NULL,
      	"_parent_id" varchar NOT NULL
      );
  CREATE TABLE IF NOT EXISTS "blog_blocks_faq_blk" (
      	"_order" integer NOT NULL,
      	"_parent_id" integer NOT NULL,
      	"_path" text NOT NULL,
      	"id" varchar PRIMARY KEY NOT NULL,
      	"link_type" "enum_blog_blocks_faq_blk_link_type" DEFAULT 'reference',
      	"link_new_tab" boolean,
      	"link_download_link" boolean,
      	"link_arrow_link" boolean,
      	"link_pill_solid" boolean,
      	"link_pill_outline" boolean,
      	"link_anchor" varchar,
      	"link_url" varchar,
      	"link_email" varchar,
      	"block_name" varchar
      );
  CREATE TABLE IF NOT EXISTS "blog_blocks_faq_blk_locales" (
      	"title" varchar,
      	"desc" varchar,
      	"link_label" varchar,
      	"id" serial PRIMARY KEY NOT NULL,
      	"_locale" "_locales" NOT NULL,
      	"_parent_id" varchar NOT NULL
      );
  CREATE TABLE IF NOT EXISTS "blog_blocks_pink_puffy_top_row" (
      	"_order" integer NOT NULL,
      	"_parent_id" varchar NOT NULL,
      	"id" varchar PRIMARY KEY NOT NULL
      );
  CREATE TABLE IF NOT EXISTS "blog_blocks_pink_puffy_top_row_locales" (
      	"title" varchar,
      	"subtitle" varchar,
      	"description" varchar,
      	"id" serial PRIMARY KEY NOT NULL,
      	"_locale" "_locales" NOT NULL,
      	"_parent_id" varchar NOT NULL
      );
  CREATE TABLE IF NOT EXISTS "blog_blocks_pink_puffy_bot_row" (
      	"_order" integer NOT NULL,
      	"_parent_id" varchar NOT NULL,
      	"id" varchar PRIMARY KEY NOT NULL
      );
  CREATE TABLE IF NOT EXISTS "blog_blocks_pink_puffy_bot_row_locales" (
      	"title" varchar,
      	"description" varchar,
      	"id" serial PRIMARY KEY NOT NULL,
      	"_locale" "_locales" NOT NULL,
      	"_parent_id" varchar NOT NULL
      );
  CREATE TABLE IF NOT EXISTS "blog_blocks_pink_puffy_links" (
      	"_order" integer NOT NULL,
      	"_parent_id" varchar NOT NULL,
      	"id" varchar PRIMARY KEY NOT NULL,
      	"link_type" "enum_blog_blocks_pink_puffy_links_link_type" DEFAULT 'reference',
      	"link_new_tab" boolean,
      	"link_download_link" boolean,
      	"link_arrow_link" boolean,
      	"link_pill_solid" boolean,
      	"link_pill_outline" boolean,
      	"link_anchor" varchar,
      	"link_url" varchar,
      	"link_email" varchar
      );
  CREATE TABLE IF NOT EXISTS "blog_blocks_pink_puffy_links_locales" (
      	"link_label" varchar,
      	"id" serial PRIMARY KEY NOT NULL,
      	"_locale" "_locales" NOT NULL,
      	"_parent_id" varchar NOT NULL
      );
  CREATE TABLE IF NOT EXISTS "blog_blocks_pink_puffy" (
      	"_order" integer NOT NULL,
      	"_parent_id" integer NOT NULL,
      	"_path" text NOT NULL,
      	"id" varchar PRIMARY KEY NOT NULL,
      	"align" "enum_blog_blocks_pink_puffy_align" DEFAULT 'center',
      	"block_name" varchar
      );
  CREATE TABLE IF NOT EXISTS "blog_blocks_pink_puffy_locales" (
      	"title" varchar,
      	"subtitle" varchar,
      	"id" serial PRIMARY KEY NOT NULL,
      	"_locale" "_locales" NOT NULL,
      	"_parent_id" varchar NOT NULL
      );
  CREATE TABLE IF NOT EXISTS "blog_blocks_beige_puffy_items" (
      	"_order" integer NOT NULL,
      	"_parent_id" varchar NOT NULL,
      	"id" varchar PRIMARY KEY NOT NULL
      );
  CREATE TABLE IF NOT EXISTS "blog_blocks_beige_puffy_items_locales" (
      	"title" varchar,
      	"subtitle" varchar,
      	"description" varchar,
      	"id" serial PRIMARY KEY NOT NULL,
      	"_locale" "_locales" NOT NULL,
      	"_parent_id" varchar NOT NULL
      );
  CREATE TABLE IF NOT EXISTS "blog_blocks_beige_puffy" (
      	"_order" integer NOT NULL,
      	"_parent_id" integer NOT NULL,
      	"_path" text NOT NULL,
      	"id" varchar PRIMARY KEY NOT NULL,
      	"align" "enum_blog_blocks_beige_puffy_align" DEFAULT 'center',
      	"block_name" varchar
      );
  CREATE TABLE IF NOT EXISTS "blog_blocks_beige_puffy_locales" (
      	"title" varchar,
      	"subtitle" varchar,
      	"id" serial PRIMARY KEY NOT NULL,
      	"_locale" "_locales" NOT NULL,
      	"_parent_id" varchar NOT NULL
      );
  CREATE TABLE IF NOT EXISTS "blog_blocks_funding_map_items_subitems" (
      	"_order" integer NOT NULL,
      	"_parent_id" varchar NOT NULL,
      	"id" varchar PRIMARY KEY NOT NULL
      );
  CREATE TABLE IF NOT EXISTS "blog_blocks_funding_map_items_subitems_locales" (
      	"statnumber" varchar,
      	"description" varchar,
      	"id" serial PRIMARY KEY NOT NULL,
      	"_locale" "_locales" NOT NULL,
      	"_parent_id" varchar NOT NULL
      );
  CREATE TABLE IF NOT EXISTS "blog_blocks_funding_map_items" (
      	"_order" integer NOT NULL,
      	"_parent_id" varchar NOT NULL,
      	"id" varchar PRIMARY KEY NOT NULL,
      	"region_name" "enum_blog_blocks_funding_map_items_region_name" DEFAULT 'uaf-asia-pacific'
      );
  CREATE TABLE IF NOT EXISTS "blog_blocks_funding_map" (
      	"_order" integer NOT NULL,
      	"_parent_id" integer NOT NULL,
      	"_path" text NOT NULL,
      	"id" varchar PRIMARY KEY NOT NULL,
      	"block_name" varchar
      );
  CREATE TABLE IF NOT EXISTS "blog_blocks_funding_map_locales" (
      	"title" varchar,
      	"subtitle" varchar,
      	"selector_label" varchar,
      	"id" serial PRIMARY KEY NOT NULL,
      	"_locale" "_locales" NOT NULL,
      	"_parent_id" varchar NOT NULL
      );
  CREATE TABLE IF NOT EXISTS "blog_blocks_resource_feat_card" (
      	"_order" integer NOT NULL,
      	"_parent_id" integer NOT NULL,
      	"_path" text NOT NULL,
      	"id" varchar PRIMARY KEY NOT NULL,
      	"align" "enum_blog_blocks_resource_feat_card_align" DEFAULT 'center',
      	"add_all_resources" boolean,
      	"filter_by_doc_type_id" integer,
      	"block_name" varchar
      );
  CREATE TABLE IF NOT EXISTS "blog_blocks_resource_feat_card_locales" (
      	"title" varchar,
      	"desc" jsonb,
      	"id" serial PRIMARY KEY NOT NULL,
      	"_locale" "_locales" NOT NULL,
      	"_parent_id" varchar NOT NULL
      );
  CREATE TABLE IF NOT EXISTS "blog_blocks_resource_gallery" (
      	"_order" integer NOT NULL,
      	"_parent_id" integer NOT NULL,
      	"_path" text NOT NULL,
      	"id" varchar PRIMARY KEY NOT NULL,
      	"align" "enum_blog_blocks_resource_gallery_align" DEFAULT 'center',
      	"add_all_resources" boolean,
      	"filter_by_doc_type_id" integer,
      	"block_name" varchar
      );
  CREATE TABLE IF NOT EXISTS "blog_blocks_resource_gallery_locales" (
      	"title" varchar,
      	"desc" jsonb,
      	"id" serial PRIMARY KEY NOT NULL,
      	"_locale" "_locales" NOT NULL,
      	"_parent_id" varchar NOT NULL
      );
  CREATE TABLE IF NOT EXISTS "blog_blocks_pillar_card_cards" (
      	"_order" integer NOT NULL,
      	"_parent_id" varchar NOT NULL,
      	"id" varchar PRIMARY KEY NOT NULL,
      	"mascot_id" integer
      );
  CREATE TABLE IF NOT EXISTS "blog_blocks_pillar_card_cards_locales" (
      	"title" varchar,
      	"id" serial PRIMARY KEY NOT NULL,
      	"_locale" "_locales" NOT NULL,
      	"_parent_id" varchar NOT NULL
      );
  CREATE TABLE IF NOT EXISTS "blog_blocks_pillar_card" (
      	"_order" integer NOT NULL,
      	"_parent_id" integer NOT NULL,
      	"_path" text NOT NULL,
      	"id" varchar PRIMARY KEY NOT NULL,
      	"align" "enum_blog_blocks_pillar_card_align" DEFAULT 'left',
      	"block_name" varchar
      );
  CREATE TABLE IF NOT EXISTS "blog_blocks_pillar_card_locales" (
      	"title" varchar,
      	"subtitle" jsonb,
      	"id" serial PRIMARY KEY NOT NULL,
      	"_locale" "_locales" NOT NULL,
      	"_parent_id" varchar NOT NULL
      );
  CREATE TABLE IF NOT EXISTS "blog_blocks_testimonial_deck_cards" (
      	"_order" integer NOT NULL,
      	"_parent_id" varchar NOT NULL,
      	"id" varchar PRIMARY KEY NOT NULL
      );
  CREATE TABLE IF NOT EXISTS "blog_blocks_testimonial_deck_cards_locales" (
      	"quote_text" varchar,
      	"attrib_name" varchar,
      	"attrib_dsg" jsonb,
      	"id" serial PRIMARY KEY NOT NULL,
      	"_locale" "_locales" NOT NULL,
      	"_parent_id" varchar NOT NULL
      );
  CREATE TABLE IF NOT EXISTS "blog_blocks_testimonial_deck" (
      	"_order" integer NOT NULL,
      	"_parent_id" integer NOT NULL,
      	"_path" text NOT NULL,
      	"id" varchar PRIMARY KEY NOT NULL,
      	"block_name" varchar
      );
  CREATE TABLE IF NOT EXISTS "blog_blocks_testimonial_deck_locales" (
      	"title" varchar,
      	"id" serial PRIMARY KEY NOT NULL,
      	"_locale" "_locales" NOT NULL,
      	"_parent_id" varchar NOT NULL
      );
  CREATE TABLE IF NOT EXISTS "blog_blocks_min_card_gallery_cards" (
      	"_order" integer NOT NULL,
      	"_parent_id" varchar NOT NULL,
      	"id" varchar PRIMARY KEY NOT NULL,
      	"mascot_id" integer
      );
  CREATE TABLE IF NOT EXISTS "blog_blocks_min_card_gallery_cards_locales" (
      	"title" varchar,
      	"description" varchar,
      	"id" serial PRIMARY KEY NOT NULL,
      	"_locale" "_locales" NOT NULL,
      	"_parent_id" varchar NOT NULL
      );
  CREATE TABLE IF NOT EXISTS "blog_blocks_min_card_gallery" (
      	"_order" integer NOT NULL,
      	"_parent_id" integer NOT NULL,
      	"_path" text NOT NULL,
      	"id" varchar PRIMARY KEY NOT NULL,
      	"header_align" "enum_blog_blocks_min_card_gallery_header_align" DEFAULT 'left',
      	"block_name" varchar
      );
  CREATE TABLE IF NOT EXISTS "blog_blocks_min_card_gallery_locales" (
      	"header_title" varchar,
      	"header_subtitle" varchar,
      	"id" serial PRIMARY KEY NOT NULL,
      	"_locale" "_locales" NOT NULL,
      	"_parent_id" varchar NOT NULL
      );
  CREATE TABLE IF NOT EXISTS "blog_blocks_id_card_gallery_cards" (
      	"_order" integer NOT NULL,
      	"_parent_id" varchar NOT NULL,
      	"id" varchar PRIMARY KEY NOT NULL,
      	"mascot_id" integer
      );
  CREATE TABLE IF NOT EXISTS "blog_blocks_id_card_gallery_cards_locales" (
      	"pronouns" varchar,
      	"fullname" varchar,
      	"designation" varchar,
      	"id" serial PRIMARY KEY NOT NULL,
      	"_locale" "_locales" NOT NULL,
      	"_parent_id" varchar NOT NULL
      );
  CREATE TABLE IF NOT EXISTS "blog_blocks_id_card_gallery" (
      	"_order" integer NOT NULL,
      	"_parent_id" integer NOT NULL,
      	"_path" text NOT NULL,
      	"id" varchar PRIMARY KEY NOT NULL,
      	"block_name" varchar
      );
  CREATE TABLE IF NOT EXISTS "blog_blocks_id_card_gallery_locales" (
      	"header_title" varchar,
      	"header_subtitle" varchar,
      	"header_description" varchar,
      	"id" serial PRIMARY KEY NOT NULL,
      	"_locale" "_locales" NOT NULL,
      	"_parent_id" varchar NOT NULL
      );
  CREATE TABLE IF NOT EXISTS "blog_blocks_two_column_block" (
      	"_order" integer NOT NULL,
      	"_parent_id" integer NOT NULL,
      	"_path" text NOT NULL,
      	"id" varchar PRIMARY KEY NOT NULL,
      	"block_name" varchar
      );
  CREATE TABLE IF NOT EXISTS "blog_blocks_two_column_block_locales" (
      	"title" varchar,
      	"subtitle" varchar,
      	"left_column" jsonb,
      	"right_column" jsonb,
      	"id" serial PRIMARY KEY NOT NULL,
      	"_locale" "_locales" NOT NULL,
      	"_parent_id" varchar NOT NULL
      );
  CREATE TABLE IF NOT EXISTS "blog_blocks_three_column_table_block_rows" (
      	"_order" integer NOT NULL,
      	"_parent_id" varchar NOT NULL,
      	"id" varchar PRIMARY KEY NOT NULL
      );
  CREATE TABLE IF NOT EXISTS "blog_blocks_three_column_table_block_rows_locales" (
      	"first_column" jsonb,
      	"second_column" jsonb,
      	"third_column" jsonb,
      	"id" serial PRIMARY KEY NOT NULL,
      	"_locale" "_locales" NOT NULL,
      	"_parent_id" varchar NOT NULL
      );
  CREATE TABLE IF NOT EXISTS "blog_blocks_three_column_table_block" (
      	"_order" integer NOT NULL,
      	"_parent_id" integer NOT NULL,
      	"_path" text NOT NULL,
      	"id" varchar PRIMARY KEY NOT NULL,
      	"column_widths" "enum_blog_blocks_three_column_table_block_column_widths" DEFAULT 'f-t-t',
      	"block_name" varchar
      );
  CREATE TABLE IF NOT EXISTS "blog_blocks_three_column_table_block_locales" (
      	"title" varchar,
      	"subtitle" varchar,
      	"id" serial PRIMARY KEY NOT NULL,
      	"_locale" "_locales" NOT NULL,
      	"_parent_id" varchar NOT NULL
      );
  CREATE TABLE IF NOT EXISTS "blog" (
      	"id" serial PRIMARY KEY NOT NULL,
      	"title" varchar,
      	"page_type" "enum_blog_page_type" DEFAULT 'landing',
      	"show_filter" boolean DEFAULT false,
      	"image_id" integer,
      	"published_at" timestamp(3) with time zone,
      	"created_by_id" integer,
      	"updated_by_id" integer,
      	"slug" varchar,
      	"slug_lock" boolean DEFAULT true,
      	"meta_title" varchar,
      	"meta_description" varchar,
      	"meta_image_id" integer,
      	"folder_id" integer,
      	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
      	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
      	"deleted_at" timestamp(3) with time zone,
      	"_status" "enum_blog_status" DEFAULT 'draft'
      );
  CREATE TABLE IF NOT EXISTS "blog_locales" (
      	"hero_title" varchar,
      	"hero_subtitle" varchar,
      	"id" serial PRIMARY KEY NOT NULL,
      	"_locale" "_locales" NOT NULL,
      	"_parent_id" integer NOT NULL
      );
  CREATE TABLE IF NOT EXISTS "blog_rels" (
      	"id" serial PRIMARY KEY NOT NULL,
      	"order" integer,
      	"parent_id" integer NOT NULL,
      	"path" varchar NOT NULL,
      	"doctypes_id" integer,
      	"grants_id" integer,
      	"pages_id" integer,
      	"blog_id" integer,
      	"reports_id" integer,
      	"mmedia_id" integer,
      	"documents_id" integer,
      	"etests_id" integer,
      	"grantcards_id" integer
      );
  CREATE TABLE IF NOT EXISTS "_blog_v_version_hero_buttons" (
      	"_order" integer NOT NULL,
      	"_parent_id" integer NOT NULL,
      	"id" serial PRIMARY KEY NOT NULL,
      	"link_type" "enum__blog_v_version_hero_buttons_link_type" DEFAULT 'reference',
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
  CREATE TABLE IF NOT EXISTS "_blog_v_version_hero_buttons_locales" (
      	"link_label" varchar,
      	"id" serial PRIMARY KEY NOT NULL,
      	"_locale" "_locales" NOT NULL,
      	"_parent_id" integer NOT NULL
      );
  CREATE TABLE IF NOT EXISTS "_blog_v_blocks_rich_content_block" (
      	"_order" integer NOT NULL,
      	"_parent_id" integer NOT NULL,
      	"_path" text NOT NULL,
      	"id" serial PRIMARY KEY NOT NULL,
      	"_uuid" varchar,
      	"block_name" varchar
      );
  CREATE TABLE IF NOT EXISTS "_blog_v_blocks_rich_content_block_locales" (
      	"rich_text" jsonb,
      	"id" serial PRIMARY KEY NOT NULL,
      	"_locale" "_locales" NOT NULL,
      	"_parent_id" integer NOT NULL
      );
  CREATE TABLE IF NOT EXISTS "_blog_v_blocks_secondarycta_cta_button" (
      	"_order" integer NOT NULL,
      	"_parent_id" integer NOT NULL,
      	"id" serial PRIMARY KEY NOT NULL,
      	"link_type" "enum__blog_v_blocks_secondarycta_cta_button_link_type" DEFAULT 'reference',
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
  CREATE TABLE IF NOT EXISTS "_blog_v_blocks_secondarycta_cta_button_locales" (
      	"link_label" varchar,
      	"id" serial PRIMARY KEY NOT NULL,
      	"_locale" "_locales" NOT NULL,
      	"_parent_id" integer NOT NULL
      );
  CREATE TABLE IF NOT EXISTS "_blog_v_blocks_secondarycta" (
      	"_order" integer NOT NULL,
      	"_parent_id" integer NOT NULL,
      	"_path" text NOT NULL,
      	"id" serial PRIMARY KEY NOT NULL,
      	"contact_email" varchar,
      	"ui_type" "enum__blog_v_blocks_secondarycta_ui_type" DEFAULT 'lrg_txt_cta',
      	"_uuid" varchar,
      	"block_name" varchar
      );
  CREATE TABLE IF NOT EXISTS "_blog_v_blocks_secondarycta_locales" (
      	"cta_title" varchar,
      	"cta_subtitle" varchar,
      	"contact_label" varchar,
      	"id" serial PRIMARY KEY NOT NULL,
      	"_locale" "_locales" NOT NULL,
      	"_parent_id" integer NOT NULL
      );
  CREATE TABLE IF NOT EXISTS "_blog_v_blocks_mcol_info_block_multicols" (
      	"_order" integer NOT NULL,
      	"_parent_id" integer NOT NULL,
      	"id" serial PRIMARY KEY NOT NULL,
      	"add_link" boolean,
      	"link_type" "enum__blog_v_blocks_mcol_info_block_multicols_link_type" DEFAULT 'reference',
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
  CREATE TABLE IF NOT EXISTS "_blog_v_blocks_mcol_info_block_multicols_locales" (
      	"title" varchar,
      	"col_content" varchar,
      	"link_label" varchar,
      	"id" serial PRIMARY KEY NOT NULL,
      	"_locale" "_locales" NOT NULL,
      	"_parent_id" integer NOT NULL
      );
  CREATE TABLE IF NOT EXISTS "_blog_v_blocks_mcol_info_block" (
      	"_order" integer NOT NULL,
      	"_parent_id" integer NOT NULL,
      	"_path" text NOT NULL,
      	"id" serial PRIMARY KEY NOT NULL,
      	"_uuid" varchar,
      	"block_name" varchar
      );
  CREATE TABLE IF NOT EXISTS "_blog_v_blocks_grant_card_grid_block" (
      	"_order" integer NOT NULL,
      	"_parent_id" integer NOT NULL,
      	"_path" text NOT NULL,
      	"id" serial PRIMARY KEY NOT NULL,
      	"_uuid" varchar,
      	"block_name" varchar
      );
  CREATE TABLE IF NOT EXISTS "_blog_v_blocks_grant_card_grid_block_locales" (
      	"title" varchar,
      	"desc" varchar,
      	"id" serial PRIMARY KEY NOT NULL,
      	"_locale" "_locales" NOT NULL,
      	"_parent_id" integer NOT NULL
      );
  CREATE TABLE IF NOT EXISTS "_blog_v_blocks_mstep_process_steps_details" (
      	"_order" integer NOT NULL,
      	"_parent_id" integer NOT NULL,
      	"id" serial PRIMARY KEY NOT NULL,
      	"_uuid" varchar
      );
  CREATE TABLE IF NOT EXISTS "_blog_v_blocks_mstep_process_steps_details_locales" (
      	"bullet" jsonb,
      	"id" serial PRIMARY KEY NOT NULL,
      	"_locale" "_locales" NOT NULL,
      	"_parent_id" integer NOT NULL
      );
  CREATE TABLE IF NOT EXISTS "_blog_v_blocks_mstep_process_steps" (
      	"_order" integer NOT NULL,
      	"_parent_id" integer NOT NULL,
      	"id" serial PRIMARY KEY NOT NULL,
      	"icon" "enum__blog_v_blocks_mstep_process_steps_icon" DEFAULT 'FileText',
      	"_uuid" varchar
      );
  `)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  // no-op
}
