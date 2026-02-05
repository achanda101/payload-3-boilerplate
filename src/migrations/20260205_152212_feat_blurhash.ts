import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "media_cloud" ADD COLUMN "blurhash" varchar;
  ALTER TABLE "asset_cloud" ADD COLUMN "blurhash" varchar;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "media_cloud" DROP COLUMN "blurhash";
  ALTER TABLE "asset_cloud" DROP COLUMN "blurhash";`)
}
