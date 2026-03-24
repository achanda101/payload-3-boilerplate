import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
  CREATE INDEX IF NOT EXISTS "contact_info_emails_parent_id_idx" ON "contact_info_emails" USING btree ("_parent_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "contact_info_emails_locales_locale_parent_id_unique" ON "contact_info_emails_locales" USING btree ("_locale","_parent_id");
  `)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  // no-op
}
