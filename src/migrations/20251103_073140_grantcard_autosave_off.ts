import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   DROP INDEX "_grantcards_v_autosave_idx";
  ALTER TABLE "_grantcards_v" DROP COLUMN "autosave";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "_grantcards_v" ADD COLUMN "autosave" boolean;
  CREATE INDEX "_grantcards_v_autosave_idx" ON "_grantcards_v" USING btree ("autosave");`)
}
