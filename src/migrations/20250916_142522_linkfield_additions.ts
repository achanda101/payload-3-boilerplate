import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "grants_blocks_mcol_info_block_multicols" ADD COLUMN "add_link" boolean;
  ALTER TABLE "_grants_v_blocks_mcol_info_block_multicols" ADD COLUMN "add_link" boolean;
  ALTER TABLE "grants_blocks_mcol_info_block_multicols" DROP COLUMN "link_appearance";
  ALTER TABLE "_grants_v_blocks_mcol_info_block_multicols" DROP COLUMN "link_appearance";
  DROP TYPE "public"."enum_grants_blocks_mcol_info_block_multicols_link_appearance";
  DROP TYPE "public"."enum__grants_v_blocks_mcol_info_block_multicols_link_appearance";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_grants_blocks_mcol_info_block_multicols_link_appearance" AS ENUM('primary');
  CREATE TYPE "public"."enum__grants_v_blocks_mcol_info_block_multicols_link_appearance" AS ENUM('primary');
  ALTER TABLE "grants_blocks_mcol_info_block_multicols" ADD COLUMN "link_appearance" "enum_grants_blocks_mcol_info_block_multicols_link_appearance" DEFAULT 'default';
  ALTER TABLE "_grants_v_blocks_mcol_info_block_multicols" ADD COLUMN "link_appearance" "enum__grants_v_blocks_mcol_info_block_multicols_link_appearance" DEFAULT 'default';
  ALTER TABLE "grants_blocks_mcol_info_block_multicols" DROP COLUMN "add_link";
  ALTER TABLE "_grants_v_blocks_mcol_info_block_multicols" DROP COLUMN "add_link";`)
}
