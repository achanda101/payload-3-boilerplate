import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

const tables = [
  'grants_blocks_testimonial_deck_cards_locales',
  '_grants_v_blocks_testimonial_deck_cards_locales',
  'pages_blocks_testimonial_deck_cards_locales',
  '_pages_v_blocks_testimonial_deck_cards_locales',
  'blog_blocks_testimonial_deck_cards_locales',
  '_blog_v_blocks_testimonial_deck_cards_locales',
  'reports_blocks_testimonial_deck_cards_locales',
  '_reports_v_blocks_testimonial_deck_cards_locales',
  'mmedia_blocks_testimonial_deck_cards_locales',
  '_mmedia_v_blocks_testimonial_deck_cards_locales',
  'homepage_blocks_testimonial_deck_cards_locales',
  '_homepage_v_blocks_testimonial_deck_cards_locales',
]

export async function up({ db }: MigrateUpArgs): Promise<void> {
  for (const table of tables) {
    await db.execute(
      sql.raw(
        `ALTER TABLE "${table}" DROP COLUMN IF EXISTS "attrib_dsg"; ALTER TABLE "${table}" ADD COLUMN "attrib_dsg" jsonb;`,
      ),
    )
  }
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  for (const table of tables) {
    await db.execute(
      sql.raw(
        `ALTER TABLE "${table}" DROP COLUMN IF EXISTS "attrib_dsg"; ALTER TABLE "${table}" ADD COLUMN "attrib_dsg" varchar;`,
      ),
    )
  }
}
