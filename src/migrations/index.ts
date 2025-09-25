import * as migration_20250822_151534_fresh_prod from './20250822_151534_fresh_prod';
import * as migration_20250822_160409_adding_locale_to_blogpost from './20250822_160409_adding_locale_to_blogpost';
import * as migration_20250822_163934_no_default_vals from './20250822_163934_no_default_vals';
import * as migration_20250822_193050_removed_req_fields from './20250822_193050_removed_req_fields';
import * as migration_20250826_202607_donateCTA_locale from './20250826_202607_donateCTA_locale';
import * as migration_20250827_150134_newsletter_subscribe from './20250827_150134_newsletter_subscribe';
import * as migration_20250903_074659_drafts_on from './20250903_074659_drafts_on';
import * as migration_20250907_094051_homepage from './20250907_094051_homepage';
import * as migration_20250907_172910_homepage_hero from './20250907_172910_homepage_hero';
import * as migration_20250907_225629_homepage_secondaryCTA from './20250907_225629_homepage_secondaryCTA';
import * as migration_20250912_183156_grant_pages from './20250912_183156_grant_pages';
import * as migration_20250916_143422_grant_multicol_linkfield_additions from './20250916_143422_grant_multicol_linkfield_additions';
import * as migration_20250916_195858_header_theme from './20250916_195858_header_theme';
import * as migration_20250918_202458_major_rework from './20250918_202458_major_rework';
import * as migration_20250925_200531_grant_pages_cards from './20250925_200531_grant_pages_cards';
import * as migration_20250925_224728_asset_cloud from './20250925_224728_asset_cloud';

export const migrations = [
  {
    up: migration_20250822_151534_fresh_prod.up,
    down: migration_20250822_151534_fresh_prod.down,
    name: '20250822_151534_fresh_prod',
  },
  {
    up: migration_20250822_160409_adding_locale_to_blogpost.up,
    down: migration_20250822_160409_adding_locale_to_blogpost.down,
    name: '20250822_160409_adding_locale_to_blogpost',
  },
  {
    up: migration_20250822_163934_no_default_vals.up,
    down: migration_20250822_163934_no_default_vals.down,
    name: '20250822_163934_no_default_vals',
  },
  {
    up: migration_20250822_193050_removed_req_fields.up,
    down: migration_20250822_193050_removed_req_fields.down,
    name: '20250822_193050_removed_req_fields',
  },
  {
    up: migration_20250826_202607_donateCTA_locale.up,
    down: migration_20250826_202607_donateCTA_locale.down,
    name: '20250826_202607_donateCTA_locale',
  },
  {
    up: migration_20250827_150134_newsletter_subscribe.up,
    down: migration_20250827_150134_newsletter_subscribe.down,
    name: '20250827_150134_newsletter_subscribe',
  },
  {
    up: migration_20250903_074659_drafts_on.up,
    down: migration_20250903_074659_drafts_on.down,
    name: '20250903_074659_drafts_on',
  },
  {
    up: migration_20250907_094051_homepage.up,
    down: migration_20250907_094051_homepage.down,
    name: '20250907_094051_homepage',
  },
  {
    up: migration_20250907_172910_homepage_hero.up,
    down: migration_20250907_172910_homepage_hero.down,
    name: '20250907_172910_homepage_hero',
  },
  {
    up: migration_20250907_225629_homepage_secondaryCTA.up,
    down: migration_20250907_225629_homepage_secondaryCTA.down,
    name: '20250907_225629_homepage_secondaryCTA',
  },
  {
    up: migration_20250912_183156_grant_pages.up,
    down: migration_20250912_183156_grant_pages.down,
    name: '20250912_183156_grant_pages',
  },
  {
    up: migration_20250916_143422_grant_multicol_linkfield_additions.up,
    down: migration_20250916_143422_grant_multicol_linkfield_additions.down,
    name: '20250916_143422_grant_multicol_linkfield_additions',
  },
  {
    up: migration_20250916_195858_header_theme.up,
    down: migration_20250916_195858_header_theme.down,
    name: '20250916_195858_header_theme',
  },
  {
    up: migration_20250918_202458_major_rework.up,
    down: migration_20250918_202458_major_rework.down,
    name: '20250918_202458_major_rework',
  },
  {
    up: migration_20250925_200531_grant_pages_cards.up,
    down: migration_20250925_200531_grant_pages_cards.down,
    name: '20250925_200531_grant_pages_cards',
  },
  {
    up: migration_20250925_224728_asset_cloud.up,
    down: migration_20250925_224728_asset_cloud.down,
    name: '20250925_224728_asset_cloud'
  },
];
