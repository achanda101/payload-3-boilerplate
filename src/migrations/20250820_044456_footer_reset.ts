import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
   ALTER TABLE "footer" ALTER COLUMN "org_name" SET DEFAULT 'Urgent Action Fund Asia Pacific';
  ALTER TABLE "footer" ALTER COLUMN "org_name" SET NOT NULL;
  ALTER TABLE "footer" ADD COLUMN "donate_c_t_a_heading" varchar DEFAULT 'Your support powers Urgent Action' NOT NULL;
  ALTER TABLE "footer" ADD COLUMN "donate_c_t_a_description" varchar DEFAULT 'Every contribution - big or small - fuels safety, resilience, and justice.' NOT NULL;
  ALTER TABLE "footer" ADD COLUMN "donate_c_t_a_url" varchar DEFAULT 'https://example.com/donate' NOT NULL;`)
}

export async function down({ payload, req }: MigrateDownArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
   ALTER TABLE "footer" ALTER COLUMN "org_name" DROP DEFAULT;
  ALTER TABLE "footer" ALTER COLUMN "org_name" DROP NOT NULL;
  ALTER TABLE "footer" DROP COLUMN IF EXISTS "donate_c_t_a_heading";
  ALTER TABLE "footer" DROP COLUMN IF EXISTS "donate_c_t_a_description";
  ALTER TABLE "footer" DROP COLUMN IF EXISTS "donate_c_t_a_url";`)
}
