import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
    await db.execute(sql`
        -- Drop old foreign key constraint from footer table if it exists
        ALTER TABLE "footer" DROP CONSTRAINT IF EXISTS "footer_logo_id_media_cloud_id_fk";
        
        -- Set logo_id to NULL for any footer records that reference non-existent asset_cloud records
        UPDATE "footer" SET "logo_id" = NULL 
        WHERE "logo_id" IS NOT NULL 
        AND "logo_id" NOT IN (SELECT "id" FROM "asset_cloud");
        
        -- Add new foreign key constraint to asset_cloud table
        ALTER TABLE "footer" ADD CONSTRAINT "footer_logo_id_asset_cloud_id_fk" 
        FOREIGN KEY ("logo_id") REFERENCES "public"."asset_cloud"("id") 
        ON DELETE set null ON UPDATE no action;
    `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
    await db.execute(sql`
        -- Drop new foreign key constraint
        ALTER TABLE "footer" DROP CONSTRAINT IF EXISTS "footer_logo_id_asset_cloud_id_fk";
        
        -- Add back old foreign key constraint to media_cloud table
        ALTER TABLE "footer" ADD CONSTRAINT "footer_logo_id_media_cloud_id_fk" 
        FOREIGN KEY ("logo_id") REFERENCES "public"."media_cloud"("id") 
        ON DELETE set null ON UPDATE no action;
    `)
}
