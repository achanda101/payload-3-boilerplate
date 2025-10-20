import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_grants_blocks_feat_crd_link_type" AS ENUM('reference', 'custom', 'email', 'document');
  CREATE TYPE "public"."enum__grants_v_blocks_feat_crd_link_type" AS ENUM('reference', 'custom', 'email', 'document');
  CREATE TYPE "public"."enum_homepage_blocks_mcol_info_block_multicols_link_type" AS ENUM('reference', 'custom', 'email', 'document');
  CREATE TYPE "public"."enum_homepage_blocks_mstep_process_steps_icon" AS ENUM('FileText', 'Clock', 'ShieldCheck', 'Vote', 'ScrollText', 'Banknote', 'Rocket', 'FileCheck');
  CREATE TYPE "public"."enum_homepage_blocks_comparison_blk_buttons_link_type" AS ENUM('reference', 'custom', 'email', 'document');
  CREATE TYPE "public"."enum_homepage_blocks_ylw_deck_cards_links_link_type" AS ENUM('reference', 'custom', 'email', 'document');
  CREATE TYPE "public"."enum_homepage_blocks_ylw_deck_cards_mascot_pos" AS ENUM('top_left', 'center');
  CREATE TYPE "public"."enum_homepage_blocks_feat_crd_link_type" AS ENUM('reference', 'custom', 'email', 'document');
  CREATE TYPE "public"."enum__homepage_v_blocks_mcol_info_block_multicols_link_type" AS ENUM('reference', 'custom', 'email', 'document');
  CREATE TYPE "public"."enum__homepage_v_blocks_mstep_process_steps_icon" AS ENUM('FileText', 'Clock', 'ShieldCheck', 'Vote', 'ScrollText', 'Banknote', 'Rocket', 'FileCheck');
  CREATE TYPE "public"."enum__homepage_v_blocks_comparison_blk_buttons_link_type" AS ENUM('reference', 'custom', 'email', 'document');
  CREATE TYPE "public"."enum__homepage_v_blocks_ylw_deck_cards_links_link_type" AS ENUM('reference', 'custom', 'email', 'document');
  CREATE TYPE "public"."enum__homepage_v_blocks_ylw_deck_cards_mascot_pos" AS ENUM('top_left', 'center');
  CREATE TYPE "public"."enum__homepage_v_blocks_feat_crd_link_type" AS ENUM('reference', 'custom', 'email', 'document');
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
  	"desc" varchar,
  	"link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
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
  	"desc" varchar,
  	"link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
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
  	"block_name" varchar
  );
  
  CREATE TABLE "homepage_blocks_ylw_deck_locales" (
  	"title" varchar,
  	"desc" varchar,
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
  	"desc" varchar,
  	"link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
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
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_homepage_v_blocks_ylw_deck_locales" (
  	"title" varchar,
  	"desc" varchar,
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
  	"desc" varchar,
  	"link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  ALTER TABLE "grants_blocks_feat_crd_tags" ADD CONSTRAINT "grants_blocks_feat_crd_tags_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."grants_blocks_feat_crd"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "grants_blocks_feat_crd_tags_locales" ADD CONSTRAINT "grants_blocks_feat_crd_tags_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."grants_blocks_feat_crd_tags"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "grants_blocks_feat_crd" ADD CONSTRAINT "grants_blocks_feat_crd_image_id_media_cloud_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media_cloud"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "grants_blocks_feat_crd" ADD CONSTRAINT "grants_blocks_feat_crd_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."grants"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "grants_blocks_feat_crd_locales" ADD CONSTRAINT "grants_blocks_feat_crd_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."grants_blocks_feat_crd"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_grants_v_blocks_feat_crd_tags" ADD CONSTRAINT "_grants_v_blocks_feat_crd_tags_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_grants_v_blocks_feat_crd"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_grants_v_blocks_feat_crd_tags_locales" ADD CONSTRAINT "_grants_v_blocks_feat_crd_tags_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_grants_v_blocks_feat_crd_tags"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_grants_v_blocks_feat_crd" ADD CONSTRAINT "_grants_v_blocks_feat_crd_image_id_media_cloud_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media_cloud"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_grants_v_blocks_feat_crd" ADD CONSTRAINT "_grants_v_blocks_feat_crd_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_grants_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_grants_v_blocks_feat_crd_locales" ADD CONSTRAINT "_grants_v_blocks_feat_crd_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_grants_v_blocks_feat_crd"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_blocks_mcol_info_block_multicols" ADD CONSTRAINT "homepage_blocks_mcol_info_block_multicols_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage_blocks_mcol_info_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_blocks_mcol_info_block_multicols_locales" ADD CONSTRAINT "homepage_blocks_mcol_info_block_multicols_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage_blocks_mcol_info_block_multicols"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_blocks_mcol_info_block" ADD CONSTRAINT "homepage_blocks_mcol_info_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage"("id") ON DELETE cascade ON UPDATE no action;
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
  ALTER TABLE "_homepage_v_blocks_mcol_info_block_multicols" ADD CONSTRAINT "_homepage_v_blocks_mcol_info_block_multicols_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_homepage_v_blocks_mcol_info_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_homepage_v_blocks_mcol_info_block_multicols_locales" ADD CONSTRAINT "_homepage_v_blocks_mcol_info_block_multicols_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_homepage_v_blocks_mcol_info_block_multicols"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_homepage_v_blocks_mcol_info_block" ADD CONSTRAINT "_homepage_v_blocks_mcol_info_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_homepage_v"("id") ON DELETE cascade ON UPDATE no action;
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
  CREATE INDEX "grants_blocks_feat_crd_tags_order_idx" ON "grants_blocks_feat_crd_tags" USING btree ("_order");
  CREATE INDEX "grants_blocks_feat_crd_tags_parent_id_idx" ON "grants_blocks_feat_crd_tags" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "grants_blocks_feat_crd_tags_locales_locale_parent_id_unique" ON "grants_blocks_feat_crd_tags_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "grants_blocks_feat_crd_order_idx" ON "grants_blocks_feat_crd" USING btree ("_order");
  CREATE INDEX "grants_blocks_feat_crd_parent_id_idx" ON "grants_blocks_feat_crd" USING btree ("_parent_id");
  CREATE INDEX "grants_blocks_feat_crd_path_idx" ON "grants_blocks_feat_crd" USING btree ("_path");
  CREATE INDEX "grants_blocks_feat_crd_image_idx" ON "grants_blocks_feat_crd" USING btree ("image_id");
  CREATE UNIQUE INDEX "grants_blocks_feat_crd_locales_locale_parent_id_unique" ON "grants_blocks_feat_crd_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_grants_v_blocks_feat_crd_tags_order_idx" ON "_grants_v_blocks_feat_crd_tags" USING btree ("_order");
  CREATE INDEX "_grants_v_blocks_feat_crd_tags_parent_id_idx" ON "_grants_v_blocks_feat_crd_tags" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_grants_v_blocks_feat_crd_tags_locales_locale_parent_id_unique" ON "_grants_v_blocks_feat_crd_tags_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_grants_v_blocks_feat_crd_order_idx" ON "_grants_v_blocks_feat_crd" USING btree ("_order");
  CREATE INDEX "_grants_v_blocks_feat_crd_parent_id_idx" ON "_grants_v_blocks_feat_crd" USING btree ("_parent_id");
  CREATE INDEX "_grants_v_blocks_feat_crd_path_idx" ON "_grants_v_blocks_feat_crd" USING btree ("_path");
  CREATE INDEX "_grants_v_blocks_feat_crd_image_idx" ON "_grants_v_blocks_feat_crd" USING btree ("image_id");
  CREATE UNIQUE INDEX "_grants_v_blocks_feat_crd_locales_locale_parent_id_unique" ON "_grants_v_blocks_feat_crd_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "homepage_blocks_mcol_info_block_multicols_order_idx" ON "homepage_blocks_mcol_info_block_multicols" USING btree ("_order");
  CREATE INDEX "homepage_blocks_mcol_info_block_multicols_parent_id_idx" ON "homepage_blocks_mcol_info_block_multicols" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "homepage_blocks_mcol_info_block_multicols_locales_locale_parent_id_unique" ON "homepage_blocks_mcol_info_block_multicols_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "homepage_blocks_mcol_info_block_order_idx" ON "homepage_blocks_mcol_info_block" USING btree ("_order");
  CREATE INDEX "homepage_blocks_mcol_info_block_parent_id_idx" ON "homepage_blocks_mcol_info_block" USING btree ("_parent_id");
  CREATE INDEX "homepage_blocks_mcol_info_block_path_idx" ON "homepage_blocks_mcol_info_block" USING btree ("_path");
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
  CREATE INDEX "_homepage_v_blocks_mcol_info_block_multicols_order_idx" ON "_homepage_v_blocks_mcol_info_block_multicols" USING btree ("_order");
  CREATE INDEX "_homepage_v_blocks_mcol_info_block_multicols_parent_id_idx" ON "_homepage_v_blocks_mcol_info_block_multicols" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_homepage_v_blocks_mcol_info_block_multicols_locales_locale_parent_id_unique" ON "_homepage_v_blocks_mcol_info_block_multicols_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_homepage_v_blocks_mcol_info_block_order_idx" ON "_homepage_v_blocks_mcol_info_block" USING btree ("_order");
  CREATE INDEX "_homepage_v_blocks_mcol_info_block_parent_id_idx" ON "_homepage_v_blocks_mcol_info_block" USING btree ("_parent_id");
  CREATE INDEX "_homepage_v_blocks_mcol_info_block_path_idx" ON "_homepage_v_blocks_mcol_info_block" USING btree ("_path");
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
  CREATE UNIQUE INDEX "_homepage_v_blocks_feat_crd_locales_locale_parent_id_unique" ON "_homepage_v_blocks_feat_crd_locales" USING btree ("_locale","_parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "grants_blocks_feat_crd_tags" CASCADE;
  DROP TABLE "grants_blocks_feat_crd_tags_locales" CASCADE;
  DROP TABLE "grants_blocks_feat_crd" CASCADE;
  DROP TABLE "grants_blocks_feat_crd_locales" CASCADE;
  DROP TABLE "_grants_v_blocks_feat_crd_tags" CASCADE;
  DROP TABLE "_grants_v_blocks_feat_crd_tags_locales" CASCADE;
  DROP TABLE "_grants_v_blocks_feat_crd" CASCADE;
  DROP TABLE "_grants_v_blocks_feat_crd_locales" CASCADE;
  DROP TABLE "homepage_blocks_mcol_info_block_multicols" CASCADE;
  DROP TABLE "homepage_blocks_mcol_info_block_multicols_locales" CASCADE;
  DROP TABLE "homepage_blocks_mcol_info_block" CASCADE;
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
  DROP TABLE "_homepage_v_blocks_mcol_info_block_multicols" CASCADE;
  DROP TABLE "_homepage_v_blocks_mcol_info_block_multicols_locales" CASCADE;
  DROP TABLE "_homepage_v_blocks_mcol_info_block" CASCADE;
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
  DROP TYPE "public"."enum_grants_blocks_feat_crd_link_type";
  DROP TYPE "public"."enum__grants_v_blocks_feat_crd_link_type";
  DROP TYPE "public"."enum_homepage_blocks_mcol_info_block_multicols_link_type";
  DROP TYPE "public"."enum_homepage_blocks_mstep_process_steps_icon";
  DROP TYPE "public"."enum_homepage_blocks_comparison_blk_buttons_link_type";
  DROP TYPE "public"."enum_homepage_blocks_ylw_deck_cards_links_link_type";
  DROP TYPE "public"."enum_homepage_blocks_ylw_deck_cards_mascot_pos";
  DROP TYPE "public"."enum_homepage_blocks_feat_crd_link_type";
  DROP TYPE "public"."enum__homepage_v_blocks_mcol_info_block_multicols_link_type";
  DROP TYPE "public"."enum__homepage_v_blocks_mstep_process_steps_icon";
  DROP TYPE "public"."enum__homepage_v_blocks_comparison_blk_buttons_link_type";
  DROP TYPE "public"."enum__homepage_v_blocks_ylw_deck_cards_links_link_type";
  DROP TYPE "public"."enum__homepage_v_blocks_ylw_deck_cards_mascot_pos";
  DROP TYPE "public"."enum__homepage_v_blocks_feat_crd_link_type";`)
}
