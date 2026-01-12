import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "homepage_blocks_resource_feat_card" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "_homepage_v_blocks_resource_feat_card" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  ALTER TABLE "homepage_blocks_resource_feat_card" ADD CONSTRAINT "homepage_blocks_resource_feat_card_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_homepage_v_blocks_resource_feat_card" ADD CONSTRAINT "_homepage_v_blocks_resource_feat_card_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_homepage_v"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "homepage_blocks_resource_feat_card_order_idx" ON "homepage_blocks_resource_feat_card" USING btree ("_order");
  CREATE INDEX "homepage_blocks_resource_feat_card_parent_id_idx" ON "homepage_blocks_resource_feat_card" USING btree ("_parent_id");
  CREATE INDEX "homepage_blocks_resource_feat_card_path_idx" ON "homepage_blocks_resource_feat_card" USING btree ("_path");
  CREATE INDEX "_homepage_v_blocks_resource_feat_card_order_idx" ON "_homepage_v_blocks_resource_feat_card" USING btree ("_order");
  CREATE INDEX "_homepage_v_blocks_resource_feat_card_parent_id_idx" ON "_homepage_v_blocks_resource_feat_card" USING btree ("_parent_id");
  CREATE INDEX "_homepage_v_blocks_resource_feat_card_path_idx" ON "_homepage_v_blocks_resource_feat_card" USING btree ("_path");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "homepage_blocks_resource_feat_card" CASCADE;
  DROP TABLE "_homepage_v_blocks_resource_feat_card" CASCADE;`)
}
