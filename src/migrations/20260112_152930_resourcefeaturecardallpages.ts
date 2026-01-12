import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "grants_blocks_resource_feat_card" ADD COLUMN "add_all_resources" boolean;
  ALTER TABLE "_grants_v_blocks_resource_feat_card" ADD COLUMN "add_all_resources" boolean;
  ALTER TABLE "pages_blocks_resource_feat_card" ADD COLUMN "add_all_resources" boolean;
  ALTER TABLE "_pages_v_blocks_resource_feat_card" ADD COLUMN "add_all_resources" boolean;
  ALTER TABLE "blog_blocks_resource_feat_card" ADD COLUMN "add_all_resources" boolean;
  ALTER TABLE "_blog_v_blocks_resource_feat_card" ADD COLUMN "add_all_resources" boolean;
  ALTER TABLE "reports_blocks_resource_feat_card" ADD COLUMN "add_all_resources" boolean;
  ALTER TABLE "_reports_v_blocks_resource_feat_card" ADD COLUMN "add_all_resources" boolean;
  ALTER TABLE "mmedia_blocks_resource_feat_card" ADD COLUMN "add_all_resources" boolean;
  ALTER TABLE "_mmedia_v_blocks_resource_feat_card" ADD COLUMN "add_all_resources" boolean;
  ALTER TABLE "homepage_blocks_resource_feat_card" ADD COLUMN "add_all_resources" boolean;
  ALTER TABLE "_homepage_v_blocks_resource_feat_card" ADD COLUMN "add_all_resources" boolean;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "grants_blocks_resource_feat_card" DROP COLUMN "add_all_resources";
  ALTER TABLE "_grants_v_blocks_resource_feat_card" DROP COLUMN "add_all_resources";
  ALTER TABLE "pages_blocks_resource_feat_card" DROP COLUMN "add_all_resources";
  ALTER TABLE "_pages_v_blocks_resource_feat_card" DROP COLUMN "add_all_resources";
  ALTER TABLE "blog_blocks_resource_feat_card" DROP COLUMN "add_all_resources";
  ALTER TABLE "_blog_v_blocks_resource_feat_card" DROP COLUMN "add_all_resources";
  ALTER TABLE "reports_blocks_resource_feat_card" DROP COLUMN "add_all_resources";
  ALTER TABLE "_reports_v_blocks_resource_feat_card" DROP COLUMN "add_all_resources";
  ALTER TABLE "mmedia_blocks_resource_feat_card" DROP COLUMN "add_all_resources";
  ALTER TABLE "_mmedia_v_blocks_resource_feat_card" DROP COLUMN "add_all_resources";
  ALTER TABLE "homepage_blocks_resource_feat_card" DROP COLUMN "add_all_resources";
  ALTER TABLE "_homepage_v_blocks_resource_feat_card" DROP COLUMN "add_all_resources";`)
}
