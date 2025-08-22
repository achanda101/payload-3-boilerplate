import * as migration_20250822_151534_fresh_prod from './20250822_151534_fresh_prod';
import * as migration_20250822_160409_adding_locale_to_blogpost from './20250822_160409_adding_locale_to_blogpost';

export const migrations = [
  {
    up: migration_20250822_151534_fresh_prod.up,
    down: migration_20250822_151534_fresh_prod.down,
    name: '20250822_151534_fresh_prod',
  },
  {
    up: migration_20250822_160409_adding_locale_to_blogpost.up,
    down: migration_20250822_160409_adding_locale_to_blogpost.down,
    name: '20250822_160409_adding_locale_to_blogpost'
  },
];
