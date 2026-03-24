import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
  CREATE TABLE "mmedia_blocks_comparison_blk_lft_grp_lft_points" (
      	"_order" integer NOT NULL,
      	"_parent_id" varchar NOT NULL,
      	"id" varchar PRIMARY KEY NOT NULL
      );
  CREATE TABLE "mmedia_blocks_comparison_blk_lft_grp_lft_points_locales" (
      	"point" varchar,
      	"id" serial PRIMARY KEY NOT NULL,
      	"_locale" "_locales" NOT NULL,
      	"_parent_id" varchar NOT NULL
      );
  CREATE TABLE "mmedia_blocks_comparison_blk_rt_grp_rt_points" (
      	"_order" integer NOT NULL,
      	"_parent_id" varchar NOT NULL,
      	"id" varchar PRIMARY KEY NOT NULL
      );
  CREATE TABLE "mmedia_blocks_comparison_blk_rt_grp_rt_points_locales" (
      	"point" varchar,
      	"id" serial PRIMARY KEY NOT NULL,
      	"_locale" "_locales" NOT NULL,
      	"_parent_id" varchar NOT NULL
      );
  CREATE TABLE "mmedia_blocks_comparison_blk_buttons" (
      	"_order" integer NOT NULL,
      	"_parent_id" varchar NOT NULL,
      	"id" varchar PRIMARY KEY NOT NULL,
      	"link_type" "enum_mmedia_blocks_comparison_blk_buttons_link_type" DEFAULT 'reference',
      	"link_new_tab" boolean,
      	"link_download_link" boolean,
      	"link_arrow_link" boolean,
      	"link_pill_solid" boolean,
      	"link_pill_outline" boolean,
      	"link_anchor" varchar,
      	"link_url" varchar,
      	"link_email" varchar
      );
  CREATE TABLE "mmedia_blocks_comparison_blk_buttons_locales" (
      	"link_label" varchar,
      	"id" serial PRIMARY KEY NOT NULL,
      	"_locale" "_locales" NOT NULL,
      	"_parent_id" varchar NOT NULL
      );
  CREATE TABLE "mmedia_blocks_comparison_blk" (
      	"_order" integer NOT NULL,
      	"_parent_id" integer NOT NULL,
      	"_path" text NOT NULL,
      	"id" varchar PRIMARY KEY NOT NULL,
      	"block_name" varchar
      );
  CREATE TABLE "mmedia_blocks_comparison_blk_locales" (
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
  CREATE TABLE "mmedia_blocks_ylw_deck_cards_links" (
      	"_order" integer NOT NULL,
      	"_parent_id" varchar NOT NULL,
      	"id" varchar PRIMARY KEY NOT NULL,
      	"link_type" "enum_mmedia_blocks_ylw_deck_cards_links_link_type" DEFAULT 'reference',
      	"link_new_tab" boolean,
      	"link_download_link" boolean,
      	"link_arrow_link" boolean,
      	"link_pill_solid" boolean,
      	"link_pill_outline" boolean,
      	"link_anchor" varchar,
      	"link_url" varchar,
      	"link_email" varchar
      );
  CREATE TABLE "mmedia_blocks_ylw_deck_cards_links_locales" (
      	"desc" varchar,
      	"link_label" varchar,
      	"id" serial PRIMARY KEY NOT NULL,
      	"_locale" "_locales" NOT NULL,
      	"_parent_id" varchar NOT NULL
      );
  CREATE TABLE "mmedia_blocks_ylw_deck_cards" (
      	"_order" integer NOT NULL,
      	"_parent_id" varchar NOT NULL,
      	"id" varchar PRIMARY KEY NOT NULL,
      	"mascot_id" integer,
      	"mascot_pos" "enum_mmedia_blocks_ylw_deck_cards_mascot_pos" DEFAULT 'center'
      );
  CREATE TABLE "mmedia_blocks_ylw_deck_cards_locales" (
      	"title" varchar,
      	"subtitle" varchar,
      	"desc" varchar,
      	"id" serial PRIMARY KEY NOT NULL,
      	"_locale" "_locales" NOT NULL,
      	"_parent_id" varchar NOT NULL
      );
  CREATE TABLE "mmedia_blocks_ylw_deck" (
      	"_order" integer NOT NULL,
      	"_parent_id" integer NOT NULL,
      	"_path" text NOT NULL,
      	"id" varchar PRIMARY KEY NOT NULL,
      	"align" "enum_mmedia_blocks_ylw_deck_align" DEFAULT 'center',
      	"block_name" varchar
      );
  CREATE TABLE "mmedia_blocks_ylw_deck_locales" (
      	"title" varchar,
      	"desc" jsonb,
      	"id" serial PRIMARY KEY NOT NULL,
      	"_locale" "_locales" NOT NULL,
      	"_parent_id" varchar NOT NULL
      );
  CREATE TABLE "mmedia_blocks_feat_crd_tags" (
      	"_order" integer NOT NULL,
      	"_parent_id" varchar NOT NULL,
      	"id" varchar PRIMARY KEY NOT NULL
      );
  CREATE TABLE "mmedia_blocks_feat_crd_tags_locales" (
      	"tag" varchar,
      	"id" serial PRIMARY KEY NOT NULL,
      	"_locale" "_locales" NOT NULL,
      	"_parent_id" varchar NOT NULL
      );
  CREATE TABLE "mmedia_blocks_feat_crd" (
      	"_order" integer NOT NULL,
      	"_parent_id" integer NOT NULL,
      	"_path" text NOT NULL,
      	"id" varchar PRIMARY KEY NOT NULL,
      	"image_id" integer,
      	"title_alignment" "enum_mmedia_blocks_feat_crd_title_alignment" DEFAULT 'left',
      	"link_type" "enum_mmedia_blocks_feat_crd_link_type" DEFAULT 'reference',
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
  CREATE TABLE "mmedia_blocks_feat_crd_locales" (
      	"title" varchar,
      	"subtitle" varchar,
      	"desc" jsonb,
      	"link_label" varchar,
      	"id" serial PRIMARY KEY NOT NULL,
      	"_locale" "_locales" NOT NULL,
      	"_parent_id" varchar NOT NULL
      );
  CREATE TABLE "mmedia_blocks_feat_crd_acc_feat_crds" (
      	"_order" integer NOT NULL,
      	"_parent_id" varchar NOT NULL,
      	"id" varchar PRIMARY KEY NOT NULL,
      	"mascot_id" integer,
      	"crd_colour" "enum_mmedia_blocks_feat_crd_acc_feat_crds_crd_colour" DEFAULT 'forest'
      );
  CREATE TABLE "mmedia_blocks_feat_crd_acc_feat_crds_locales" (
      	"acc_title" varchar,
      	"acc_content" jsonb,
      	"crd_tag" varchar,
      	"crd_content" jsonb,
      	"id" serial PRIMARY KEY NOT NULL,
      	"_locale" "_locales" NOT NULL,
      	"_parent_id" varchar NOT NULL
      );
  CREATE TABLE "mmedia_blocks_feat_crd_acc" (
      	"_order" integer NOT NULL,
      	"_parent_id" integer NOT NULL,
      	"_path" text NOT NULL,
      	"id" varchar PRIMARY KEY NOT NULL,
      	"block_name" varchar
      );
  CREATE TABLE "mmedia_blocks_feat_crd_acc_locales" (
      	"title" varchar,
      	"id" serial PRIMARY KEY NOT NULL,
      	"_locale" "_locales" NOT NULL,
      	"_parent_id" varchar NOT NULL
      );
  CREATE TABLE "mmedia_blocks_list_crd_dck_cards_tags" (
      	"_order" integer NOT NULL,
      	"_parent_id" varchar NOT NULL,
      	"id" varchar PRIMARY KEY NOT NULL
      );
  CREATE TABLE "mmedia_blocks_list_crd_dck_cards_tags_locales" (
      	"tag" varchar,
      	"id" serial PRIMARY KEY NOT NULL,
      	"_locale" "_locales" NOT NULL,
      	"_parent_id" varchar NOT NULL
      );
  CREATE TABLE "mmedia_blocks_list_crd_dck_cards" (
      	"_order" integer NOT NULL,
      	"_parent_id" varchar NOT NULL,
      	"id" varchar PRIMARY KEY NOT NULL,
      	"image_id" integer,
      	"link_type" "enum_mmedia_blocks_list_crd_dck_cards_link_type" DEFAULT 'reference',
      	"link_new_tab" boolean,
      	"link_download_link" boolean,
      	"link_arrow_link" boolean,
      	"link_pill_solid" boolean,
      	"link_pill_outline" boolean,
      	"link_anchor" varchar,
      	"link_url" varchar,
      	"link_email" varchar
      );
  CREATE TABLE "mmedia_blocks_list_crd_dck_cards_locales" (
      	"title" varchar,
      	"desc" varchar,
      	"link_label" varchar,
      	"id" serial PRIMARY KEY NOT NULL,
      	"_locale" "_locales" NOT NULL,
      	"_parent_id" varchar NOT NULL
      );
  CREATE TABLE "mmedia_blocks_list_crd_dck_buttons" (
      	"_order" integer NOT NULL,
      	"_parent_id" varchar NOT NULL,
      	"id" varchar PRIMARY KEY NOT NULL,
      	"link_type" "enum_mmedia_blocks_list_crd_dck_buttons_link_type" DEFAULT 'reference',
      	"link_new_tab" boolean,
      	"link_download_link" boolean,
      	"link_arrow_link" boolean,
      	"link_pill_solid" boolean,
      	"link_pill_outline" boolean,
      	"link_anchor" varchar,
      	"link_url" varchar,
      	"link_email" varchar
      );
  CREATE TABLE "mmedia_blocks_list_crd_dck_buttons_locales" (
      	"link_label" varchar,
      	"id" serial PRIMARY KEY NOT NULL,
      	"_locale" "_locales" NOT NULL,
      	"_parent_id" varchar NOT NULL
      );
  CREATE TABLE "mmedia_blocks_list_crd_dck" (
      	"_order" integer NOT NULL,
      	"_parent_id" integer NOT NULL,
      	"_path" text NOT NULL,
      	"id" varchar PRIMARY KEY NOT NULL,
      	"data_source" "enum_mmedia_blocks_list_crd_dck_data_source" DEFAULT 'manual',
      	"block_name" varchar
      );
  CREATE TABLE "mmedia_blocks_list_crd_dck_locales" (
      	"title" varchar,
      	"id" serial PRIMARY KEY NOT NULL,
      	"_locale" "_locales" NOT NULL,
      	"_parent_id" varchar NOT NULL
      );
  CREATE TABLE "mmedia_blocks_faq_blk_faqs" (
      	"_order" integer NOT NULL,
      	"_parent_id" varchar NOT NULL,
      	"id" varchar PRIMARY KEY NOT NULL
      );
  CREATE TABLE "mmedia_blocks_faq_blk_faqs_locales" (
      	"question" varchar,
      	"answer" jsonb,
      	"id" serial PRIMARY KEY NOT NULL,
      	"_locale" "_locales" NOT NULL,
      	"_parent_id" varchar NOT NULL
      );
  CREATE TABLE "mmedia_blocks_faq_blk" (
      	"_order" integer NOT NULL,
      	"_parent_id" integer NOT NULL,
      	"_path" text NOT NULL,
      	"id" varchar PRIMARY KEY NOT NULL,
      	"link_type" "enum_mmedia_blocks_faq_blk_link_type" DEFAULT 'reference',
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
  CREATE TABLE "mmedia_blocks_faq_blk_locales" (
      	"title" varchar,
      	"desc" varchar,
      	"link_label" varchar,
      	"id" serial PRIMARY KEY NOT NULL,
      	"_locale" "_locales" NOT NULL,
      	"_parent_id" varchar NOT NULL
      );
  CREATE TABLE "mmedia_blocks_pink_puffy_top_row" (
      	"_order" integer NOT NULL,
      	"_parent_id" varchar NOT NULL,
      	"id" varchar PRIMARY KEY NOT NULL
      );
  CREATE TABLE "mmedia_blocks_pink_puffy_top_row_locales" (
      	"title" varchar,
      	"subtitle" varchar,
      	"description" varchar,
      	"id" serial PRIMARY KEY NOT NULL,
      	"_locale" "_locales" NOT NULL,
      	"_parent_id" varchar NOT NULL
      );
  CREATE TABLE "mmedia_blocks_pink_puffy_bot_row" (
      	"_order" integer NOT NULL,
      	"_parent_id" varchar NOT NULL,
      	"id" varchar PRIMARY KEY NOT NULL
      );
  CREATE TABLE "mmedia_blocks_pink_puffy_bot_row_locales" (
      	"title" varchar,
      	"description" varchar,
      	"id" serial PRIMARY KEY NOT NULL,
      	"_locale" "_locales" NOT NULL,
      	"_parent_id" varchar NOT NULL
      );
  CREATE TABLE "mmedia_blocks_pink_puffy_links" (
      	"_order" integer NOT NULL,
      	"_parent_id" varchar NOT NULL,
      	"id" varchar PRIMARY KEY NOT NULL,
      	"link_type" "enum_mmedia_blocks_pink_puffy_links_link_type" DEFAULT 'reference',
      	"link_new_tab" boolean,
      	"link_download_link" boolean,
      	"link_arrow_link" boolean,
      	"link_pill_solid" boolean,
      	"link_pill_outline" boolean,
      	"link_anchor" varchar,
      	"link_url" varchar,
      	"link_email" varchar
      );
  CREATE TABLE "mmedia_blocks_pink_puffy_links_locales" (
      	"link_label" varchar,
      	"id" serial PRIMARY KEY NOT NULL,
      	"_locale" "_locales" NOT NULL,
      	"_parent_id" varchar NOT NULL
      );
  CREATE TABLE "mmedia_blocks_pink_puffy" (
      	"_order" integer NOT NULL,
      	"_parent_id" integer NOT NULL,
      	"_path" text NOT NULL,
      	"id" varchar PRIMARY KEY NOT NULL,
      	"align" "enum_mmedia_blocks_pink_puffy_align" DEFAULT 'center',
      	"block_name" varchar
      );
  CREATE TABLE "mmedia_blocks_pink_puffy_locales" (
      	"title" varchar,
      	"subtitle" varchar,
      	"id" serial PRIMARY KEY NOT NULL,
      	"_locale" "_locales" NOT NULL,
      	"_parent_id" varchar NOT NULL
      );
  CREATE TABLE "mmedia_blocks_beige_puffy_items" (
      	"_order" integer NOT NULL,
      	"_parent_id" varchar NOT NULL,
      	"id" varchar PRIMARY KEY NOT NULL
      );
  CREATE TABLE "mmedia_blocks_beige_puffy_items_locales" (
      	"title" varchar,
      	"subtitle" varchar,
      	"description" varchar,
      	"id" serial PRIMARY KEY NOT NULL,
      	"_locale" "_locales" NOT NULL,
      	"_parent_id" varchar NOT NULL
      );
  CREATE TABLE "mmedia_blocks_beige_puffy" (
      	"_order" integer NOT NULL,
      	"_parent_id" integer NOT NULL,
      	"_path" text NOT NULL,
      	"id" varchar PRIMARY KEY NOT NULL,
      	"align" "enum_mmedia_blocks_beige_puffy_align" DEFAULT 'center',
      	"block_name" varchar
      );
  CREATE TABLE "mmedia_blocks_beige_puffy_locales" (
      	"title" varchar,
      	"subtitle" varchar,
      	"id" serial PRIMARY KEY NOT NULL,
      	"_locale" "_locales" NOT NULL,
      	"_parent_id" varchar NOT NULL
      );
  CREATE TABLE "mmedia_blocks_funding_map_items_subitems" (
      	"_order" integer NOT NULL,
      	"_parent_id" varchar NOT NULL,
      	"id" varchar PRIMARY KEY NOT NULL
      );
  CREATE TABLE "mmedia_blocks_funding_map_items_subitems_locales" (
      	"statnumber" varchar,
      	"description" varchar,
      	"id" serial PRIMARY KEY NOT NULL,
      	"_locale" "_locales" NOT NULL,
      	"_parent_id" varchar NOT NULL
      );
  CREATE TABLE "mmedia_blocks_funding_map_items" (
      	"_order" integer NOT NULL,
      	"_parent_id" varchar NOT NULL,
      	"id" varchar PRIMARY KEY NOT NULL,
      	"region_name" "enum_mmedia_blocks_funding_map_items_region_name" DEFAULT 'uaf-asia-pacific'
      );
  CREATE TABLE "mmedia_blocks_funding_map" (
      	"_order" integer NOT NULL,
      	"_parent_id" integer NOT NULL,
      	"_path" text NOT NULL,
      	"id" varchar PRIMARY KEY NOT NULL,
      	"block_name" varchar
      );
  CREATE TABLE "mmedia_blocks_funding_map_locales" (
      	"title" varchar,
      	"subtitle" varchar,
      	"selector_label" varchar,
      	"id" serial PRIMARY KEY NOT NULL,
      	"_locale" "_locales" NOT NULL,
      	"_parent_id" varchar NOT NULL
      );
  CREATE TABLE "mmedia_blocks_resource_feat_card" (
      	"_order" integer NOT NULL,
      	"_parent_id" integer NOT NULL,
      	"_path" text NOT NULL,
      	"id" varchar PRIMARY KEY NOT NULL,
      	"align" "enum_mmedia_blocks_resource_feat_card_align" DEFAULT 'center',
      	"add_all_resources" boolean,
      	"filter_by_doc_type_id" integer,
      	"block_name" varchar
      );
  CREATE TABLE "mmedia_blocks_resource_feat_card_locales" (
      	"title" varchar,
      	"desc" jsonb,
      	"id" serial PRIMARY KEY NOT NULL,
      	"_locale" "_locales" NOT NULL,
      	"_parent_id" varchar NOT NULL
      );
  CREATE TABLE "mmedia_blocks_resource_gallery" (
      	"_order" integer NOT NULL,
      	"_parent_id" integer NOT NULL,
      	"_path" text NOT NULL,
      	"id" varchar PRIMARY KEY NOT NULL,
      	"align" "enum_mmedia_blocks_resource_gallery_align" DEFAULT 'center',
      	"add_all_resources" boolean,
      	"filter_by_doc_type_id" integer,
      	"block_name" varchar
      );
  CREATE TABLE "mmedia_blocks_resource_gallery_locales" (
      	"title" varchar,
      	"desc" jsonb,
      	"id" serial PRIMARY KEY NOT NULL,
      	"_locale" "_locales" NOT NULL,
      	"_parent_id" varchar NOT NULL
      );
  CREATE TABLE "mmedia_blocks_pillar_card_cards" (
      	"_order" integer NOT NULL,
      	"_parent_id" varchar NOT NULL,
      	"id" varchar PRIMARY KEY NOT NULL,
      	"mascot_id" integer
      );
  CREATE TABLE "mmedia_blocks_pillar_card_cards_locales" (
      	"title" varchar,
      	"id" serial PRIMARY KEY NOT NULL,
      	"_locale" "_locales" NOT NULL,
      	"_parent_id" varchar NOT NULL
      );
  CREATE TABLE "mmedia_blocks_pillar_card" (
      	"_order" integer NOT NULL,
      	"_parent_id" integer NOT NULL,
      	"_path" text NOT NULL,
      	"id" varchar PRIMARY KEY NOT NULL,
      	"align" "enum_mmedia_blocks_pillar_card_align" DEFAULT 'left',
      	"block_name" varchar
      );
  CREATE TABLE "mmedia_blocks_pillar_card_locales" (
      	"title" varchar,
      	"subtitle" jsonb,
      	"id" serial PRIMARY KEY NOT NULL,
      	"_locale" "_locales" NOT NULL,
      	"_parent_id" varchar NOT NULL
      );
  CREATE TABLE "mmedia_blocks_testimonial_deck_cards" (
      	"_order" integer NOT NULL,
      	"_parent_id" varchar NOT NULL,
      	"id" varchar PRIMARY KEY NOT NULL
      );
  CREATE TABLE "mmedia_blocks_testimonial_deck_cards_locales" (
      	"quote_text" varchar,
      	"attrib_name" varchar,
      	"attrib_dsg" jsonb,
      	"id" serial PRIMARY KEY NOT NULL,
      	"_locale" "_locales" NOT NULL,
      	"_parent_id" varchar NOT NULL
      );
  CREATE TABLE "mmedia_blocks_testimonial_deck" (
      	"_order" integer NOT NULL,
      	"_parent_id" integer NOT NULL,
      	"_path" text NOT NULL,
      	"id" varchar PRIMARY KEY NOT NULL,
      	"block_name" varchar
      );
  CREATE TABLE "mmedia_blocks_testimonial_deck_locales" (
      	"title" varchar,
      	"id" serial PRIMARY KEY NOT NULL,
      	"_locale" "_locales" NOT NULL,
      	"_parent_id" varchar NOT NULL
      );
  CREATE TABLE "mmedia_blocks_min_card_gallery_cards" (
      	"_order" integer NOT NULL,
      	"_parent_id" varchar NOT NULL,
      	"id" varchar PRIMARY KEY NOT NULL,
      	"mascot_id" integer
      );
  CREATE TABLE "mmedia_blocks_min_card_gallery_cards_locales" (
      	"title" varchar,
      	"description" varchar,
      	"id" serial PRIMARY KEY NOT NULL,
      	"_locale" "_locales" NOT NULL,
      	"_parent_id" varchar NOT NULL
      );
  CREATE TABLE "mmedia_blocks_min_card_gallery" (
      	"_order" integer NOT NULL,
      	"_parent_id" integer NOT NULL,
      	"_path" text NOT NULL,
      	"id" varchar PRIMARY KEY NOT NULL,
      	"header_align" "enum_mmedia_blocks_min_card_gallery_header_align" DEFAULT 'left',
      	"block_name" varchar
      );
  CREATE TABLE "mmedia_blocks_min_card_gallery_locales" (
      	"header_title" varchar,
      	"header_subtitle" varchar,
      	"id" serial PRIMARY KEY NOT NULL,
      	"_locale" "_locales" NOT NULL,
      	"_parent_id" varchar NOT NULL
      );
  CREATE TABLE "mmedia_blocks_id_card_gallery_cards" (
      	"_order" integer NOT NULL,
      	"_parent_id" varchar NOT NULL,
      	"id" varchar PRIMARY KEY NOT NULL,
      	"mascot_id" integer
      );
  CREATE TABLE "mmedia_blocks_id_card_gallery_cards_locales" (
      	"pronouns" varchar,
      	"fullname" varchar,
      	"designation" varchar,
      	"id" serial PRIMARY KEY NOT NULL,
      	"_locale" "_locales" NOT NULL,
      	"_parent_id" varchar NOT NULL
      );
  CREATE TABLE "mmedia_blocks_id_card_gallery" (
      	"_order" integer NOT NULL,
      	"_parent_id" integer NOT NULL,
      	"_path" text NOT NULL,
      	"id" varchar PRIMARY KEY NOT NULL,
      	"block_name" varchar
      );
  CREATE TABLE "mmedia_blocks_id_card_gallery_locales" (
      	"header_title" varchar,
      	"header_subtitle" varchar,
      	"header_description" varchar,
      	"id" serial PRIMARY KEY NOT NULL,
      	"_locale" "_locales" NOT NULL,
      	"_parent_id" varchar NOT NULL
      );
  CREATE TABLE "mmedia_blocks_two_column_block" (
      	"_order" integer NOT NULL,
      	"_parent_id" integer NOT NULL,
      	"_path" text NOT NULL,
      	"id" varchar PRIMARY KEY NOT NULL,
      	"block_name" varchar
      );
  CREATE TABLE "mmedia_blocks_two_column_block_locales" (
      	"title" varchar,
      	"subtitle" varchar,
      	"left_column" jsonb,
      	"right_column" jsonb,
      	"id" serial PRIMARY KEY NOT NULL,
      	"_locale" "_locales" NOT NULL,
      	"_parent_id" varchar NOT NULL
      );
  CREATE TABLE "mmedia_blocks_three_column_table_block_rows" (
      	"_order" integer NOT NULL,
      	"_parent_id" varchar NOT NULL,
      	"id" varchar PRIMARY KEY NOT NULL
      );
  CREATE TABLE "mmedia_blocks_three_column_table_block_rows_locales" (
      	"first_column" jsonb,
      	"second_column" jsonb,
      	"third_column" jsonb,
      	"id" serial PRIMARY KEY NOT NULL,
      	"_locale" "_locales" NOT NULL,
      	"_parent_id" varchar NOT NULL
      );
  CREATE TABLE "mmedia_blocks_three_column_table_block" (
      	"_order" integer NOT NULL,
      	"_parent_id" integer NOT NULL,
      	"_path" text NOT NULL,
      	"id" varchar PRIMARY KEY NOT NULL,
      	"column_widths" "enum_mmedia_blocks_three_column_table_block_column_widths" DEFAULT 'f-t-t',
      	"block_name" varchar
      );
  CREATE TABLE "mmedia_blocks_three_column_table_block_locales" (
      	"title" varchar,
      	"subtitle" varchar,
      	"id" serial PRIMARY KEY NOT NULL,
      	"_locale" "_locales" NOT NULL,
      	"_parent_id" varchar NOT NULL
      );
  CREATE TABLE "mmedia" (
      	"id" serial PRIMARY KEY NOT NULL,
      	"title" varchar,
      	"page_type" "enum_mmedia_page_type" DEFAULT 'landing',
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
      	"_status" "enum_mmedia_status" DEFAULT 'draft'
      );
  CREATE TABLE "mmedia_locales" (
      	"hero_title" varchar,
      	"hero_subtitle" varchar,
      	"id" serial PRIMARY KEY NOT NULL,
      	"_locale" "_locales" NOT NULL,
      	"_parent_id" integer NOT NULL
      );
  CREATE TABLE "mmedia_rels" (
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
  CREATE TABLE "_mmedia_v_version_hero_buttons" (
      	"_order" integer NOT NULL,
      	"_parent_id" integer NOT NULL,
      	"id" serial PRIMARY KEY NOT NULL,
      	"link_type" "enum__mmedia_v_version_hero_buttons_link_type" DEFAULT 'reference',
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
  CREATE TABLE "_mmedia_v_version_hero_buttons_locales" (
      	"link_label" varchar,
      	"id" serial PRIMARY KEY NOT NULL,
      	"_locale" "_locales" NOT NULL,
      	"_parent_id" integer NOT NULL
      );
  CREATE TABLE "_mmedia_v_blocks_rich_content_block" (
      	"_order" integer NOT NULL,
      	"_parent_id" integer NOT NULL,
      	"_path" text NOT NULL,
      	"id" serial PRIMARY KEY NOT NULL,
      	"_uuid" varchar,
      	"block_name" varchar
      );
  CREATE TABLE "_mmedia_v_blocks_rich_content_block_locales" (
      	"rich_text" jsonb,
      	"id" serial PRIMARY KEY NOT NULL,
      	"_locale" "_locales" NOT NULL,
      	"_parent_id" integer NOT NULL
      );
  CREATE TABLE "_mmedia_v_blocks_secondarycta_cta_button" (
      	"_order" integer NOT NULL,
      	"_parent_id" integer NOT NULL,
      	"id" serial PRIMARY KEY NOT NULL,
      	"link_type" "enum__mmedia_v_blocks_secondarycta_cta_button_link_type" DEFAULT 'reference',
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
  CREATE TABLE "_mmedia_v_blocks_secondarycta_cta_button_locales" (
      	"link_label" varchar,
      	"id" serial PRIMARY KEY NOT NULL,
      	"_locale" "_locales" NOT NULL,
      	"_parent_id" integer NOT NULL
      );
  CREATE TABLE "_mmedia_v_blocks_secondarycta" (
      	"_order" integer NOT NULL,
      	"_parent_id" integer NOT NULL,
      	"_path" text NOT NULL,
      	"id" serial PRIMARY KEY NOT NULL,
      	"contact_email" varchar,
      	"ui_type" "enum__mmedia_v_blocks_secondarycta_ui_type" DEFAULT 'lrg_txt_cta',
      	"_uuid" varchar,
      	"block_name" varchar
      );
  CREATE TABLE "_mmedia_v_blocks_secondarycta_locales" (
      	"cta_title" varchar,
      	"cta_subtitle" varchar,
      	"contact_label" varchar,
      	"id" serial PRIMARY KEY NOT NULL,
      	"_locale" "_locales" NOT NULL,
      	"_parent_id" integer NOT NULL
      );
  CREATE TABLE "_mmedia_v_blocks_mcol_info_block_multicols" (
      	"_order" integer NOT NULL,
      	"_parent_id" integer NOT NULL,
      	"id" serial PRIMARY KEY NOT NULL,
      	"add_link" boolean,
      	"link_type" "enum__mmedia_v_blocks_mcol_info_block_multicols_link_type" DEFAULT 'reference',
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
  CREATE TABLE "_mmedia_v_blocks_mcol_info_block_multicols_locales" (
      	"title" varchar,
      	"col_content" varchar,
      	"link_label" varchar,
      	"id" serial PRIMARY KEY NOT NULL,
      	"_locale" "_locales" NOT NULL,
      	"_parent_id" integer NOT NULL
      );
  CREATE TABLE "_mmedia_v_blocks_mcol_info_block" (
      	"_order" integer NOT NULL,
      	"_parent_id" integer NOT NULL,
      	"_path" text NOT NULL,
      	"id" serial PRIMARY KEY NOT NULL,
      	"_uuid" varchar,
      	"block_name" varchar
      );
  CREATE TABLE "_mmedia_v_blocks_grant_card_grid_block" (
      	"_order" integer NOT NULL,
      	"_parent_id" integer NOT NULL,
      	"_path" text NOT NULL,
      	"id" serial PRIMARY KEY NOT NULL,
      	"_uuid" varchar,
      	"block_name" varchar
      );
  CREATE TABLE "_mmedia_v_blocks_grant_card_grid_block_locales" (
      	"title" varchar,
      	"desc" varchar,
      	"id" serial PRIMARY KEY NOT NULL,
      	"_locale" "_locales" NOT NULL,
      	"_parent_id" integer NOT NULL
      );
  CREATE TABLE "_mmedia_v_blocks_mstep_process_steps_details" (
      	"_order" integer NOT NULL,
      	"_parent_id" integer NOT NULL,
      	"id" serial PRIMARY KEY NOT NULL,
      	"_uuid" varchar
      );
  CREATE TABLE "_mmedia_v_blocks_mstep_process_steps_details_locales" (
      	"bullet" jsonb,
      	"id" serial PRIMARY KEY NOT NULL,
      	"_locale" "_locales" NOT NULL,
      	"_parent_id" integer NOT NULL
      );
  CREATE TABLE "_mmedia_v_blocks_mstep_process_steps" (
      	"_order" integer NOT NULL,
      	"_parent_id" integer NOT NULL,
      	"id" serial PRIMARY KEY NOT NULL,
      	"icon" "enum__mmedia_v_blocks_mstep_process_steps_icon" DEFAULT 'FileText',
      	"_uuid" varchar
      );
  CREATE TABLE "_mmedia_v_blocks_mstep_process_steps_locales" (
      	"step_title" varchar,
      	"title" varchar,
      	"tip" jsonb,
      	"id" serial PRIMARY KEY NOT NULL,
      	"_locale" "_locales" NOT NULL,
      	"_parent_id" integer NOT NULL
      );
  CREATE TABLE "_mmedia_v_blocks_mstep_process" (
      	"_order" integer NOT NULL,
      	"_parent_id" integer NOT NULL,
      	"_path" text NOT NULL,
      	"id" serial PRIMARY KEY NOT NULL,
      	"_uuid" varchar,
      	"block_name" varchar
      );
  CREATE TABLE "_mmedia_v_blocks_mstep_process_locales" (
      	"title" varchar,
      	"subtitle" varchar,
      	"id" serial PRIMARY KEY NOT NULL,
      	"_locale" "_locales" NOT NULL,
      	"_parent_id" integer NOT NULL
      );
  CREATE TABLE "_mmedia_v_blocks_comparison_blk_lft_grp_lft_points" (
      	"_order" integer NOT NULL,
      	"_parent_id" integer NOT NULL,
      	"id" serial PRIMARY KEY NOT NULL,
      	"_uuid" varchar
      );
  CREATE TABLE "_mmedia_v_blocks_comparison_blk_lft_grp_lft_points_locales" (
      	"point" varchar,
      	"id" serial PRIMARY KEY NOT NULL,
      	"_locale" "_locales" NOT NULL,
      	"_parent_id" integer NOT NULL
      );
  CREATE TABLE "_mmedia_v_blocks_comparison_blk_rt_grp_rt_points" (
      	"_order" integer NOT NULL,
      	"_parent_id" integer NOT NULL,
      	"id" serial PRIMARY KEY NOT NULL,
      	"_uuid" varchar
      );
  CREATE TABLE "_mmedia_v_blocks_comparison_blk_rt_grp_rt_points_locales" (
      	"point" varchar,
      	"id" serial PRIMARY KEY NOT NULL,
      	"_locale" "_locales" NOT NULL,
      	"_parent_id" integer NOT NULL
      );
  CREATE TABLE "_mmedia_v_blocks_comparison_blk_buttons" (
      	"_order" integer NOT NULL,
      	"_parent_id" integer NOT NULL,
      	"id" serial PRIMARY KEY NOT NULL,
      	"link_type" "enum__mmedia_v_blocks_comparison_blk_buttons_link_type" DEFAULT 'reference',
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
  CREATE TABLE "_mmedia_v_blocks_comparison_blk_buttons_locales" (
      	"link_label" varchar,
      	"id" serial PRIMARY KEY NOT NULL,
      	"_locale" "_locales" NOT NULL,
      	"_parent_id" integer NOT NULL
      );
  CREATE TABLE "_mmedia_v_blocks_comparison_blk" (
      	"_order" integer NOT NULL,
      	"_parent_id" integer NOT NULL,
      	"_path" text NOT NULL,
      	"id" serial PRIMARY KEY NOT NULL,
      	"_uuid" varchar,
      	"block_name" varchar
      );
  CREATE TABLE "_mmedia_v_blocks_comparison_blk_locales" (
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
  CREATE TABLE "_mmedia_v_blocks_ylw_deck_cards_links" (
      	"_order" integer NOT NULL,
      	"_parent_id" integer NOT NULL,
      	"id" serial PRIMARY KEY NOT NULL,
      	"link_type" "enum__mmedia_v_blocks_ylw_deck_cards_links_link_type" DEFAULT 'reference',
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
  CREATE TABLE "_mmedia_v_blocks_ylw_deck_cards_links_locales" (
      	"desc" varchar,
      	"link_label" varchar,
      	"id" serial PRIMARY KEY NOT NULL,
      	"_locale" "_locales" NOT NULL,
      	"_parent_id" integer NOT NULL
      );
  CREATE TABLE "_mmedia_v_blocks_ylw_deck_cards" (
      	"_order" integer NOT NULL,
      	"_parent_id" integer NOT NULL,
      	"id" serial PRIMARY KEY NOT NULL,
      	"mascot_id" integer,
      	"mascot_pos" "enum__mmedia_v_blocks_ylw_deck_cards_mascot_pos" DEFAULT 'center',
      	"_uuid" varchar
      );
  CREATE TABLE "_mmedia_v_blocks_ylw_deck_cards_locales" (
      	"title" varchar,
      	"subtitle" varchar,
      	"desc" varchar,
      	"id" serial PRIMARY KEY NOT NULL,
      	"_locale" "_locales" NOT NULL,
      	"_parent_id" integer NOT NULL
      );
  CREATE TABLE "_mmedia_v_blocks_ylw_deck" (
      	"_order" integer NOT NULL,
      	"_parent_id" integer NOT NULL,
      	"_path" text NOT NULL,
      	"id" serial PRIMARY KEY NOT NULL,
      	"align" "enum__mmedia_v_blocks_ylw_deck_align" DEFAULT 'center',
      	"_uuid" varchar,
      	"block_name" varchar
      );
  CREATE TABLE "_mmedia_v_blocks_ylw_deck_locales" (
      	"title" varchar,
      	"desc" jsonb,
      	"id" serial PRIMARY KEY NOT NULL,
      	"_locale" "_locales" NOT NULL,
      	"_parent_id" integer NOT NULL
      );
  CREATE TABLE "_mmedia_v_blocks_feat_crd_tags" (
      	"_order" integer NOT NULL,
      	"_parent_id" integer NOT NULL,
      	"id" serial PRIMARY KEY NOT NULL,
      	"_uuid" varchar
      );
  CREATE TABLE "_mmedia_v_blocks_feat_crd_tags_locales" (
      	"tag" varchar,
      	"id" serial PRIMARY KEY NOT NULL,
      	"_locale" "_locales" NOT NULL,
      	"_parent_id" integer NOT NULL
      );
  CREATE TABLE "_mmedia_v_blocks_feat_crd" (
      	"_order" integer NOT NULL,
      	"_parent_id" integer NOT NULL,
      	"_path" text NOT NULL,
      	"id" serial PRIMARY KEY NOT NULL,
      	"image_id" integer,
      	"title_alignment" "enum__mmedia_v_blocks_feat_crd_title_alignment" DEFAULT 'left',
      	"link_type" "enum__mmedia_v_blocks_feat_crd_link_type" DEFAULT 'reference',
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
  CREATE TABLE "_mmedia_v_blocks_feat_crd_locales" (
      	"title" varchar,
      	"subtitle" varchar,
      	"desc" jsonb,
      	"link_label" varchar,
      	"id" serial PRIMARY KEY NOT NULL,
      	"_locale" "_locales" NOT NULL,
      	"_parent_id" integer NOT NULL
      );
  CREATE TABLE "_mmedia_v_blocks_feat_crd_acc_feat_crds" (
      	"_order" integer NOT NULL,
      	"_parent_id" integer NOT NULL,
      	"id" serial PRIMARY KEY NOT NULL,
      	"mascot_id" integer,
      	"crd_colour" "enum__mmedia_v_blocks_feat_crd_acc_feat_crds_crd_colour" DEFAULT 'forest',
      	"_uuid" varchar
      );
  CREATE TABLE "_mmedia_v_blocks_feat_crd_acc_feat_crds_locales" (
      	"acc_title" varchar,
      	"acc_content" jsonb,
      	"crd_tag" varchar,
      	"crd_content" jsonb,
      	"id" serial PRIMARY KEY NOT NULL,
      	"_locale" "_locales" NOT NULL,
      	"_parent_id" integer NOT NULL
      );
  CREATE TABLE "_mmedia_v_blocks_feat_crd_acc" (
      	"_order" integer NOT NULL,
      	"_parent_id" integer NOT NULL,
      	"_path" text NOT NULL,
      	"id" serial PRIMARY KEY NOT NULL,
      	"_uuid" varchar,
      	"block_name" varchar
      );
  CREATE TABLE "_mmedia_v_blocks_feat_crd_acc_locales" (
      	"title" varchar,
      	"id" serial PRIMARY KEY NOT NULL,
      	"_locale" "_locales" NOT NULL,
      	"_parent_id" integer NOT NULL
      );
  CREATE TABLE "_mmedia_v_blocks_list_crd_dck_cards_tags" (
      	"_order" integer NOT NULL,
      	"_parent_id" integer NOT NULL,
      	"id" serial PRIMARY KEY NOT NULL,
      	"_uuid" varchar
      );
  CREATE TABLE "_mmedia_v_blocks_list_crd_dck_cards_tags_locales" (
      	"tag" varchar,
      	"id" serial PRIMARY KEY NOT NULL,
      	"_locale" "_locales" NOT NULL,
      	"_parent_id" integer NOT NULL
      );
  CREATE TABLE "_mmedia_v_blocks_list_crd_dck_cards" (
      	"_order" integer NOT NULL,
      	"_parent_id" integer NOT NULL,
      	"id" serial PRIMARY KEY NOT NULL,
      	"image_id" integer,
      	"link_type" "enum__mmedia_v_blocks_list_crd_dck_cards_link_type" DEFAULT 'reference',
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
  CREATE TABLE "_mmedia_v_blocks_list_crd_dck_cards_locales" (
      	"title" varchar,
      	"desc" varchar,
      	"link_label" varchar,
      	"id" serial PRIMARY KEY NOT NULL,
      	"_locale" "_locales" NOT NULL,
      	"_parent_id" integer NOT NULL
      );
  CREATE TABLE "_mmedia_v_blocks_list_crd_dck_buttons" (
      	"_order" integer NOT NULL,
      	"_parent_id" integer NOT NULL,
      	"id" serial PRIMARY KEY NOT NULL,
      	"link_type" "enum__mmedia_v_blocks_list_crd_dck_buttons_link_type" DEFAULT 'reference',
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
  CREATE TABLE "_mmedia_v_blocks_list_crd_dck_buttons_locales" (
      	"link_label" varchar,
      	"id" serial PRIMARY KEY NOT NULL,
      	"_locale" "_locales" NOT NULL,
      	"_parent_id" integer NOT NULL
      );
  CREATE TABLE "_mmedia_v_blocks_list_crd_dck" (
      	"_order" integer NOT NULL,
      	"_parent_id" integer NOT NULL,
      	"_path" text NOT NULL,
      	"id" serial PRIMARY KEY NOT NULL,
      	"data_source" "enum__mmedia_v_blocks_list_crd_dck_data_source" DEFAULT 'manual',
      	"_uuid" varchar,
      	"block_name" varchar
      );
  CREATE TABLE "_mmedia_v_blocks_list_crd_dck_locales" (
      	"title" varchar,
      	"id" serial PRIMARY KEY NOT NULL,
      	"_locale" "_locales" NOT NULL,
      	"_parent_id" integer NOT NULL
      );
  CREATE TABLE "_mmedia_v_blocks_faq_blk_faqs" (
      	"_order" integer NOT NULL,
      	"_parent_id" integer NOT NULL,
      	"id" serial PRIMARY KEY NOT NULL,
      	"_uuid" varchar
      );
  CREATE TABLE "_mmedia_v_blocks_faq_blk_faqs_locales" (
      	"question" varchar,
      	"answer" jsonb,
      	"id" serial PRIMARY KEY NOT NULL,
      	"_locale" "_locales" NOT NULL,
      	"_parent_id" integer NOT NULL
      );
  CREATE TABLE "_mmedia_v_blocks_faq_blk" (
      	"_order" integer NOT NULL,
      	"_parent_id" integer NOT NULL,
      	"_path" text NOT NULL,
      	"id" serial PRIMARY KEY NOT NULL,
      	"link_type" "enum__mmedia_v_blocks_faq_blk_link_type" DEFAULT 'reference',
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
  CREATE TABLE "_mmedia_v_blocks_faq_blk_locales" (
      	"title" varchar,
      	"desc" varchar,
      	"link_label" varchar,
      	"id" serial PRIMARY KEY NOT NULL,
      	"_locale" "_locales" NOT NULL,
      	"_parent_id" integer NOT NULL
      );
  CREATE TABLE "_mmedia_v_blocks_pink_puffy_top_row" (
      	"_order" integer NOT NULL,
      	"_parent_id" integer NOT NULL,
      	"id" serial PRIMARY KEY NOT NULL,
      	"_uuid" varchar
      );
  CREATE TABLE "_mmedia_v_blocks_pink_puffy_top_row_locales" (
      	"title" varchar,
      	"subtitle" varchar,
      	"description" varchar,
      	"id" serial PRIMARY KEY NOT NULL,
      	"_locale" "_locales" NOT NULL,
      	"_parent_id" integer NOT NULL
      );
  CREATE TABLE "_mmedia_v_blocks_pink_puffy_bot_row" (
      	"_order" integer NOT NULL,
      	"_parent_id" integer NOT NULL,
      	"id" serial PRIMARY KEY NOT NULL,
      	"_uuid" varchar
      );
  CREATE TABLE "_mmedia_v_blocks_pink_puffy_bot_row_locales" (
      	"title" varchar,
      	"description" varchar,
      	"id" serial PRIMARY KEY NOT NULL,
      	"_locale" "_locales" NOT NULL,
      	"_parent_id" integer NOT NULL
      );
  CREATE TABLE "_mmedia_v_blocks_pink_puffy_links" (
      	"_order" integer NOT NULL,
      	"_parent_id" integer NOT NULL,
      	"id" serial PRIMARY KEY NOT NULL,
      	"link_type" "enum__mmedia_v_blocks_pink_puffy_links_link_type" DEFAULT 'reference',
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
  CREATE TABLE "_mmedia_v_blocks_pink_puffy_links_locales" (
      	"link_label" varchar,
      	"id" serial PRIMARY KEY NOT NULL,
      	"_locale" "_locales" NOT NULL,
      	"_parent_id" integer NOT NULL
      );
  CREATE TABLE "_mmedia_v_blocks_pink_puffy" (
      	"_order" integer NOT NULL,
      	"_parent_id" integer NOT NULL,
      	"_path" text NOT NULL,
      	"id" serial PRIMARY KEY NOT NULL,
      	"align" "enum__mmedia_v_blocks_pink_puffy_align" DEFAULT 'center',
      	"_uuid" varchar,
      	"block_name" varchar
      );
  CREATE TABLE "_mmedia_v_blocks_pink_puffy_locales" (
      	"title" varchar,
      	"subtitle" varchar,
      	"id" serial PRIMARY KEY NOT NULL,
      	"_locale" "_locales" NOT NULL,
      	"_parent_id" integer NOT NULL
      );
  CREATE TABLE "_mmedia_v_blocks_beige_puffy_items" (
      	"_order" integer NOT NULL,
      	"_parent_id" integer NOT NULL,
      	"id" serial PRIMARY KEY NOT NULL,
      	"_uuid" varchar
      );
  CREATE TABLE "_mmedia_v_blocks_beige_puffy_items_locales" (
      	"title" varchar,
      	"subtitle" varchar,
      	"description" varchar,
      	"id" serial PRIMARY KEY NOT NULL,
      	"_locale" "_locales" NOT NULL,
      	"_parent_id" integer NOT NULL
      );
  CREATE TABLE "_mmedia_v_blocks_beige_puffy" (
      	"_order" integer NOT NULL,
      	"_parent_id" integer NOT NULL,
      	"_path" text NOT NULL,
      	"id" serial PRIMARY KEY NOT NULL,
      	"align" "enum__mmedia_v_blocks_beige_puffy_align" DEFAULT 'center',
      	"_uuid" varchar,
      	"block_name" varchar
      );
  CREATE TABLE "_mmedia_v_blocks_beige_puffy_locales" (
      	"title" varchar,
      	"subtitle" varchar,
      	"id" serial PRIMARY KEY NOT NULL,
      	"_locale" "_locales" NOT NULL,
      	"_parent_id" integer NOT NULL
      );
  CREATE TABLE "_mmedia_v_blocks_funding_map_items_subitems" (
      	"_order" integer NOT NULL,
      	"_parent_id" integer NOT NULL,
      	"id" serial PRIMARY KEY NOT NULL,
      	"_uuid" varchar
      );
  CREATE TABLE "_mmedia_v_blocks_funding_map_items_subitems_locales" (
      	"statnumber" varchar,
      	"description" varchar,
      	"id" serial PRIMARY KEY NOT NULL,
      	"_locale" "_locales" NOT NULL,
      	"_parent_id" integer NOT NULL
      );
  CREATE TABLE "_mmedia_v_blocks_funding_map_items" (
      	"_order" integer NOT NULL,
      	"_parent_id" integer NOT NULL,
      	"id" serial PRIMARY KEY NOT NULL,
      	"region_name" "enum__mmedia_v_blocks_funding_map_items_region_name" DEFAULT 'uaf-asia-pacific',
      	"_uuid" varchar
      );
  CREATE TABLE "_mmedia_v_blocks_funding_map" (
      	"_order" integer NOT NULL,
      	"_parent_id" integer NOT NULL,
      	"_path" text NOT NULL,
      	"id" serial PRIMARY KEY NOT NULL,
      	"_uuid" varchar,
      	"block_name" varchar
      );
  CREATE TABLE "_mmedia_v_blocks_funding_map_locales" (
      	"title" varchar,
      	"subtitle" varchar,
      	"selector_label" varchar,
      	"id" serial PRIMARY KEY NOT NULL,
      	"_locale" "_locales" NOT NULL,
      	"_parent_id" integer NOT NULL
      );
  CREATE TABLE "_mmedia_v_blocks_resource_feat_card" (
      	"_order" integer NOT NULL,
      	"_parent_id" integer NOT NULL,
      	"_path" text NOT NULL,
      	"id" serial PRIMARY KEY NOT NULL,
      	"align" "enum__mmedia_v_blocks_resource_feat_card_align" DEFAULT 'center',
      	"add_all_resources" boolean,
      	"filter_by_doc_type_id" integer,
      	"_uuid" varchar,
      	"block_name" varchar
      );
  CREATE TABLE "_mmedia_v_blocks_resource_feat_card_locales" (
      	"title" varchar,
      	"desc" jsonb,
      	"id" serial PRIMARY KEY NOT NULL,
      	"_locale" "_locales" NOT NULL,
      	"_parent_id" integer NOT NULL
      );
  CREATE TABLE "_mmedia_v_blocks_resource_gallery" (
      	"_order" integer NOT NULL,
      	"_parent_id" integer NOT NULL,
      	"_path" text NOT NULL,
      	"id" serial PRIMARY KEY NOT NULL,
      	"align" "enum__mmedia_v_blocks_resource_gallery_align" DEFAULT 'center',
      	"add_all_resources" boolean,
      	"filter_by_doc_type_id" integer,
      	"_uuid" varchar,
      	"block_name" varchar
      );
  CREATE TABLE "_mmedia_v_blocks_resource_gallery_locales" (
      	"title" varchar,
      	"desc" jsonb,
      	"id" serial PRIMARY KEY NOT NULL,
      	"_locale" "_locales" NOT NULL,
      	"_parent_id" integer NOT NULL
      );
  CREATE TABLE "_mmedia_v_blocks_pillar_card_cards" (
      	"_order" integer NOT NULL,
      	"_parent_id" integer NOT NULL,
      	"id" serial PRIMARY KEY NOT NULL,
      	"mascot_id" integer,
      	"_uuid" varchar
      );
  CREATE TABLE "_mmedia_v_blocks_pillar_card_cards_locales" (
      	"title" varchar,
      	"id" serial PRIMARY KEY NOT NULL,
      	"_locale" "_locales" NOT NULL,
      	"_parent_id" integer NOT NULL
      );
  CREATE TABLE "_mmedia_v_blocks_pillar_card" (
      	"_order" integer NOT NULL,
      	"_parent_id" integer NOT NULL,
      	"_path" text NOT NULL,
      	"id" serial PRIMARY KEY NOT NULL,
      	"align" "enum__mmedia_v_blocks_pillar_card_align" DEFAULT 'left',
      	"_uuid" varchar,
      	"block_name" varchar
      );
  CREATE TABLE "_mmedia_v_blocks_pillar_card_locales" (
      	"title" varchar,
      	"subtitle" jsonb,
      	"id" serial PRIMARY KEY NOT NULL,
      	"_locale" "_locales" NOT NULL,
      	"_parent_id" integer NOT NULL
      );
  CREATE TABLE "_mmedia_v_blocks_testimonial_deck_cards" (
      	"_order" integer NOT NULL,
      	"_parent_id" integer NOT NULL,
      	"id" serial PRIMARY KEY NOT NULL,
      	"_uuid" varchar
      );
  CREATE TABLE "_mmedia_v_blocks_testimonial_deck_cards_locales" (
      	"quote_text" varchar,
      	"attrib_name" varchar,
      	"attrib_dsg" jsonb,
      	"id" serial PRIMARY KEY NOT NULL,
      	"_locale" "_locales" NOT NULL,
      	"_parent_id" integer NOT NULL
      );
  CREATE TABLE "_mmedia_v_blocks_testimonial_deck" (
      	"_order" integer NOT NULL,
      	"_parent_id" integer NOT NULL,
      	"_path" text NOT NULL,
      	"id" serial PRIMARY KEY NOT NULL,
      	"_uuid" varchar,
      	"block_name" varchar
      );
  CREATE TABLE "_mmedia_v_blocks_testimonial_deck_locales" (
      	"title" varchar,
      	"id" serial PRIMARY KEY NOT NULL,
      	"_locale" "_locales" NOT NULL,
      	"_parent_id" integer NOT NULL
      );
  CREATE TABLE "_mmedia_v_blocks_min_card_gallery_cards" (
      	"_order" integer NOT NULL,
      	"_parent_id" integer NOT NULL,
      	"id" serial PRIMARY KEY NOT NULL,
      	"mascot_id" integer,
      	"_uuid" varchar
      );
  CREATE TABLE "_mmedia_v_blocks_min_card_gallery_cards_locales" (
      	"title" varchar,
      	"description" varchar,
      	"id" serial PRIMARY KEY NOT NULL,
      	"_locale" "_locales" NOT NULL,
      	"_parent_id" integer NOT NULL
      );
  CREATE TABLE "_mmedia_v_blocks_min_card_gallery" (
      	"_order" integer NOT NULL,
      	"_parent_id" integer NOT NULL,
      	"_path" text NOT NULL,
      	"id" serial PRIMARY KEY NOT NULL,
      	"header_align" "enum__mmedia_v_blocks_min_card_gallery_header_align" DEFAULT 'left',
      	"_uuid" varchar,
      	"block_name" varchar
      );
  CREATE TABLE "_mmedia_v_blocks_min_card_gallery_locales" (
      	"header_title" varchar,
      	"header_subtitle" varchar,
      	"id" serial PRIMARY KEY NOT NULL,
      	"_locale" "_locales" NOT NULL,
      	"_parent_id" integer NOT NULL
      );
  CREATE TABLE "_mmedia_v_blocks_id_card_gallery_cards" (
      	"_order" integer NOT NULL,
      	"_parent_id" integer NOT NULL,
      	"id" serial PRIMARY KEY NOT NULL,
      	"mascot_id" integer,
      	"_uuid" varchar
      );
  CREATE TABLE "_mmedia_v_blocks_id_card_gallery_cards_locales" (
      	"pronouns" varchar,
      	"fullname" varchar,
      	"designation" varchar,
      	"id" serial PRIMARY KEY NOT NULL,
      	"_locale" "_locales" NOT NULL,
      	"_parent_id" integer NOT NULL
      );
  CREATE TABLE "_mmedia_v_blocks_id_card_gallery" (
      	"_order" integer NOT NULL,
      	"_parent_id" integer NOT NULL,
      	"_path" text NOT NULL,
      	"id" serial PRIMARY KEY NOT NULL,
      	"_uuid" varchar,
      	"block_name" varchar
      );
  CREATE TABLE "_mmedia_v_blocks_id_card_gallery_locales" (
      	"header_title" varchar,
      	"header_subtitle" varchar,
      	"header_description" varchar,
      	"id" serial PRIMARY KEY NOT NULL,
      	"_locale" "_locales" NOT NULL,
      	"_parent_id" integer NOT NULL
      );
  CREATE TABLE "_mmedia_v_blocks_two_column_block" (
      	"_order" integer NOT NULL,
      	"_parent_id" integer NOT NULL,
      	"_path" text NOT NULL,
      	"id" serial PRIMARY KEY NOT NULL,
      	"_uuid" varchar,
      	"block_name" varchar
      );
  CREATE TABLE "_mmedia_v_blocks_two_column_block_locales" (
      	"title" varchar,
      	"subtitle" varchar,
      	"left_column" jsonb,
      	"right_column" jsonb,
      	"id" serial PRIMARY KEY NOT NULL,
      	"_locale" "_locales" NOT NULL,
      	"_parent_id" integer NOT NULL
      );
  CREATE TABLE "_mmedia_v_blocks_three_column_table_block_rows" (
      	"_order" integer NOT NULL,
      	"_parent_id" integer NOT NULL,
      	"id" serial PRIMARY KEY NOT NULL,
      	"_uuid" varchar
      );
  CREATE TABLE "_mmedia_v_blocks_three_column_table_block_rows_locales" (
      	"first_column" jsonb,
      	"second_column" jsonb,
      	"third_column" jsonb,
      	"id" serial PRIMARY KEY NOT NULL,
      	"_locale" "_locales" NOT NULL,
      	"_parent_id" integer NOT NULL
      );
  CREATE TABLE "_mmedia_v_blocks_three_column_table_block" (
      	"_order" integer NOT NULL,
      	"_parent_id" integer NOT NULL,
      	"_path" text NOT NULL,
      	"id" serial PRIMARY KEY NOT NULL,
      	"column_widths" "enum__mmedia_v_blocks_three_column_table_block_column_widths" DEFAULT 'f-t-t',
      	"_uuid" varchar,
      	"block_name" varchar
      );
  CREATE TABLE "_mmedia_v_blocks_three_column_table_block_locales" (
      	"title" varchar,
      	"subtitle" varchar,
      	"id" serial PRIMARY KEY NOT NULL,
      	"_locale" "_locales" NOT NULL,
      	"_parent_id" integer NOT NULL
      );
  CREATE TABLE "_mmedia_v" (
      	"id" serial PRIMARY KEY NOT NULL,
      	"parent_id" integer,
      	"version_title" varchar,
      	"version_page_type" "enum__mmedia_v_version_page_type" DEFAULT 'landing',
      	"version_show_filter" boolean DEFAULT false,
      	"version_image_id" integer,
      	"version_published_at" timestamp(3) with time zone,
      	"version_created_by_id" integer,
      	"version_updated_by_id" integer,
      	"version_slug" varchar,
      	"version_slug_lock" boolean DEFAULT true,
      	"version_meta_title" varchar,
      	"version_meta_description" varchar,
      	"version_meta_image_id" integer,
      	"version_folder_id" integer,
      	"version_updated_at" timestamp(3) with time zone,
      	"version_created_at" timestamp(3) with time zone,
      	"version_deleted_at" timestamp(3) with time zone,
      	"version__status" "enum__mmedia_v_version_status" DEFAULT 'draft',
      	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
      	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
      	"snapshot" boolean,
      	"published_locale" "enum__mmedia_v_published_locale",
      	"latest" boolean
      );
  CREATE TABLE "_mmedia_v_locales" (
      	"version_hero_title" varchar,
      	"version_hero_subtitle" varchar,
      	"id" serial PRIMARY KEY NOT NULL,
      	"_locale" "_locales" NOT NULL,
      	"_parent_id" integer NOT NULL
      );
  CREATE TABLE "_mmedia_v_rels" (
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
  CREATE TABLE "doctypes" (
      	"id" serial PRIMARY KEY NOT NULL,
      	"blog_count" numeric,
      	"report_count" numeric,
      	"mmedia_count" numeric,
      	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
      	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
      	"deleted_at" timestamp(3) with time zone
      );
  CREATE TABLE "doctypes_locales" (
      	"type" varchar NOT NULL,
      	"id" serial PRIMARY KEY NOT NULL,
      	"_locale" "_locales" NOT NULL,
      	"_parent_id" integer NOT NULL
      );
  CREATE TABLE "media_cloud" (
      	"id" serial PRIMARY KEY NOT NULL,
      	"alt" varchar NOT NULL,
      	"blurhash" varchar,
      	"folder_id" integer,
      	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
      	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
      	"deleted_at" timestamp(3) with time zone,
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
      	"sizes_xlarge_filename" varchar,
      	"sizes_og_image_url" varchar,
      	"sizes_og_image_width" numeric,
      	"sizes_og_image_height" numeric,
      	"sizes_og_image_mime_type" varchar,
      	"sizes_og_image_filesize" numeric,
      	"sizes_og_image_filename" varchar
      );
  CREATE TABLE "media_cloud_locales" (
      	"caption" varchar,
      	"id" serial PRIMARY KEY NOT NULL,
      	"_locale" "_locales" NOT NULL,
      	"_parent_id" integer NOT NULL
      );
  CREATE TABLE "asset_cloud" (
      	"id" serial PRIMARY KEY NOT NULL,
      	"alt" varchar NOT NULL,
      	"blurhash" varchar,
      	"folder_id" integer,
      	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
      	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
      	"deleted_at" timestamp(3) with time zone,
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
  CREATE TABLE "asset_cloud_locales" (
      	"caption" varchar,
      	"id" serial PRIMARY KEY NOT NULL,
      	"_locale" "_locales" NOT NULL,
      	"_parent_id" integer NOT NULL
      );
  CREATE TABLE "documents" (
      	"id" serial PRIMARY KEY NOT NULL,
      	"alt" varchar NOT NULL,
      	"folder_id" integer,
      	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
      	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
      	"deleted_at" timestamp(3) with time zone,
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
  CREATE TABLE "documents_locales" (
      	"caption" varchar,
      	"id" serial PRIMARY KEY NOT NULL,
      	"_locale" "_locales" NOT NULL,
      	"_parent_id" integer NOT NULL
      );
  CREATE TABLE "users_assigned_languages" (
      	"order" integer NOT NULL,
      	"parent_id" integer NOT NULL,
      	"value" "enum_users_assigned_languages",
      	"id" serial PRIMARY KEY NOT NULL
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
      	"role" "enum_users_role" DEFAULT 'editor',
      	"totp_secret" varchar,
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
      	"pages_id" integer,
      	"reports_id" integer,
      	"blog_id" integer,
      	"mmedia_id" integer,
      	"grants_id" integer
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
      	"content_data" varchar,
      	"author" varchar,
      	"tags" varchar,
      	"published_date" varchar,
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
      	"pages_id" integer,
      	"reports_id" integer,
      	"blog_id" integer,
      	"mmedia_id" integer,
      	"grants_id" integer,
      	"media_cloud_id" integer,
      	"asset_cloud_id" integer
      );
  CREATE TABLE "payload_kv" (
      	"id" serial PRIMARY KEY NOT NULL,
      	"key" varchar NOT NULL,
      	"data" jsonb NOT NULL
      );
  CREATE TABLE "payload_folders_folder_type" (
      	"order" integer NOT NULL,
      	"parent_id" integer NOT NULL,
      	"value" "enum_payload_folders_folder_type",
      	"id" serial PRIMARY KEY NOT NULL
      );
  CREATE TABLE "payload_folders" (
      	"id" serial PRIMARY KEY NOT NULL,
      	"name" varchar NOT NULL,
      	"folder_id" integer,
      	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
      	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
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
      	"etests_id" integer,
      	"pages_id" integer,
      	"blog_id" integer,
      	"reports_id" integer,
      	"mmedia_id" integer,
      	"doctypes_id" integer,
      	"media_cloud_id" integer,
      	"asset_cloud_id" integer,
      	"documents_id" integer,
      	"users_id" integer,
      	"redirects_id" integer,
      	"forms_id" integer,
      	"form_submissions_id" integer,
      	"search_id" integer,
      	"payload_folders_id" integer
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
  CREATE TABLE "homepage_cta_button" (
      	"_order" integer NOT NULL,
      	"_parent_id" integer NOT NULL,
      	"id" varchar PRIMARY KEY NOT NULL,
      	"link_type" "enum_homepage_cta_button_link_type" DEFAULT 'reference',
      	"link_new_tab" boolean,
      	"link_download_link" boolean,
      	"link_arrow_link" boolean,
      	"link_pill_solid" boolean,
      	"link_pill_outline" boolean,
      	"link_anchor" varchar,
      	"link_url" varchar,
      	"link_email" varchar
      );
  CREATE TABLE "homepage_cta_button_locales" (
      	"link_label" varchar,
      	"id" serial PRIMARY KEY NOT NULL,
      	"_locale" "_locales" NOT NULL,
      	"_parent_id" varchar NOT NULL
      );
  CREATE TABLE "homepage_blocks_rich_content_block" (
      	"_order" integer NOT NULL,
      	"_parent_id" integer NOT NULL,
      	"_path" text NOT NULL,
      	"id" varchar PRIMARY KEY NOT NULL,
      	"block_name" varchar
      );
  CREATE TABLE "homepage_blocks_rich_content_block_locales" (
      	"rich_text" jsonb,
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
      	"link_anchor" varchar,
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
      	"ui_type" "enum_homepage_blocks_secondarycta_ui_type" DEFAULT 'lrg_txt_cta',
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
      	"link_anchor" varchar,
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
      	"bullet" jsonb,
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
      	"tip" jsonb,
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
      	"link_anchor" varchar,
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
      	"link_anchor" varchar,
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
      	"title_alignment" "enum_homepage_blocks_feat_crd_title_alignment" DEFAULT 'left',
      	"link_type" "enum_homepage_blocks_feat_crd_link_type" DEFAULT 'reference',
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
      	"link_anchor" varchar,
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
      	"link_anchor" varchar,
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
      	"data_source" "enum_homepage_blocks_list_crd_dck_data_source" DEFAULT 'manual',
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
      	"link_anchor" varchar,
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
  CREATE TABLE "homepage_blocks_pink_puffy_top_row" (
      	"_order" integer NOT NULL,
      	"_parent_id" varchar NOT NULL,
      	"id" varchar PRIMARY KEY NOT NULL
      );
  CREATE TABLE "homepage_blocks_pink_puffy_top_row_locales" (
      	"title" varchar,
      	"subtitle" varchar,
      	"description" varchar,
      	"id" serial PRIMARY KEY NOT NULL,
      	"_locale" "_locales" NOT NULL,
      	"_parent_id" varchar NOT NULL
      );
  CREATE TABLE "homepage_blocks_pink_puffy_bot_row" (
      	"_order" integer NOT NULL,
      	"_parent_id" varchar NOT NULL,
      	"id" varchar PRIMARY KEY NOT NULL
      );
  CREATE TABLE "homepage_blocks_pink_puffy_bot_row_locales" (
      	"title" varchar,
      	"description" varchar,
      	"id" serial PRIMARY KEY NOT NULL,
      	"_locale" "_locales" NOT NULL,
      	"_parent_id" varchar NOT NULL
      );
  CREATE TABLE "homepage_blocks_pink_puffy_links" (
      	"_order" integer NOT NULL,
      	"_parent_id" varchar NOT NULL,
      	"id" varchar PRIMARY KEY NOT NULL,
      	"link_type" "enum_homepage_blocks_pink_puffy_links_link_type" DEFAULT 'reference',
      	"link_new_tab" boolean,
      	"link_download_link" boolean,
      	"link_arrow_link" boolean,
      	"link_pill_solid" boolean,
      	"link_pill_outline" boolean,
      	"link_anchor" varchar,
      	"link_url" varchar,
      	"link_email" varchar
      );
  CREATE TABLE "homepage_blocks_pink_puffy_links_locales" (
      	"link_label" varchar,
      	"id" serial PRIMARY KEY NOT NULL,
      	"_locale" "_locales" NOT NULL,
      	"_parent_id" varchar NOT NULL
      );
  CREATE TABLE "homepage_blocks_pink_puffy" (
      	"_order" integer NOT NULL,
      	"_parent_id" integer NOT NULL,
      	"_path" text NOT NULL,
      	"id" varchar PRIMARY KEY NOT NULL,
      	"align" "enum_homepage_blocks_pink_puffy_align" DEFAULT 'center',
      	"block_name" varchar
      );
  CREATE TABLE "homepage_blocks_pink_puffy_locales" (
      	"title" varchar,
      	"subtitle" varchar,
      	"id" serial PRIMARY KEY NOT NULL,
      	"_locale" "_locales" NOT NULL,
      	"_parent_id" varchar NOT NULL
      );
  CREATE TABLE "homepage_blocks_beige_puffy_items" (
      	"_order" integer NOT NULL,
      	"_parent_id" varchar NOT NULL,
      	"id" varchar PRIMARY KEY NOT NULL
      );
  CREATE TABLE "homepage_blocks_beige_puffy_items_locales" (
      	"title" varchar,
      	"subtitle" varchar,
      	"description" varchar,
      	"id" serial PRIMARY KEY NOT NULL,
      	"_locale" "_locales" NOT NULL,
      	"_parent_id" varchar NOT NULL
      );
  CREATE TABLE "homepage_blocks_beige_puffy" (
      	"_order" integer NOT NULL,
      	"_parent_id" integer NOT NULL,
      	"_path" text NOT NULL,
      	"id" varchar PRIMARY KEY NOT NULL,
      	"align" "enum_homepage_blocks_beige_puffy_align" DEFAULT 'center',
      	"block_name" varchar
      );
  CREATE TABLE "homepage_blocks_beige_puffy_locales" (
      	"title" varchar,
      	"subtitle" varchar,
      	"id" serial PRIMARY KEY NOT NULL,
      	"_locale" "_locales" NOT NULL,
      	"_parent_id" varchar NOT NULL
      );
  CREATE TABLE "homepage_blocks_funding_map_items_subitems" (
      	"_order" integer NOT NULL,
      	"_parent_id" varchar NOT NULL,
      	"id" varchar PRIMARY KEY NOT NULL
      );
  CREATE TABLE "homepage_blocks_funding_map_items_subitems_locales" (
      	"statnumber" varchar,
      	"description" varchar,
      	"id" serial PRIMARY KEY NOT NULL,
      	"_locale" "_locales" NOT NULL,
      	"_parent_id" varchar NOT NULL
      );
  CREATE TABLE "homepage_blocks_funding_map_items" (
      	"_order" integer NOT NULL,
      	"_parent_id" varchar NOT NULL,
      	"id" varchar PRIMARY KEY NOT NULL,
      	"region_name" "enum_homepage_blocks_funding_map_items_region_name" DEFAULT 'uaf-asia-pacific'
      );
  CREATE TABLE "homepage_blocks_funding_map" (
      	"_order" integer NOT NULL,
      	"_parent_id" integer NOT NULL,
      	"_path" text NOT NULL,
      	"id" varchar PRIMARY KEY NOT NULL,
      	"block_name" varchar
      );
  CREATE TABLE "homepage_blocks_funding_map_locales" (
      	"title" varchar,
      	"subtitle" varchar,
      	"selector_label" varchar,
      	"id" serial PRIMARY KEY NOT NULL,
      	"_locale" "_locales" NOT NULL,
      	"_parent_id" varchar NOT NULL
      );
  `)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  // no-op
}
