import * as migration_20250822_151534_fresh_prod from './20250822_151534_fresh_prod';
import * as migration_20250822_160409_adding_locale_to_blogpost from './20250822_160409_adding_locale_to_blogpost';
import * as migration_20250822_163934_no_default_vals from './20250822_163934_no_default_vals';
import * as migration_20250822_193050_removed_req_fields from './20250822_193050_removed_req_fields';
import * as migration_20250826_202607_donateCTA_locale from './20250826_202607_donateCTA_locale';
import * as migration_20250827_150134_newsletter_subscribe from './20250827_150134_newsletter_subscribe';
import * as migration_20250903_074659_drafts_on from './20250903_074659_drafts_on';
import * as migration_20250907_094051_homepage from './20250907_094051_homepage';
import * as migration_20250907_172910_homepage_hero from './20250907_172910_homepage_hero';

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
    name: '20250907_172910_homepage_hero'
  },
];
