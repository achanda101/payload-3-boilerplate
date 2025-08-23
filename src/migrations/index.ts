import * as migration_20250822_151534_fresh_prod from './20250822_151534_fresh_prod';
import * as migration_20250822_160409_adding_locale_to_blogpost from './20250822_160409_adding_locale_to_blogpost';
import * as migration_20250822_163934_no_default_vals from './20250822_163934_no_default_vals';
import * as migration_20250822_193050_removed_req_fields from './20250822_193050_removed_req_fields';

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
    name: '20250822_193050_removed_req_fields'
  },
];
