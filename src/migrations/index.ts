import * as migration_20250822_151534_fresh_prod from './20250822_151534_fresh_prod';

export const migrations = [
  {
    up: migration_20250822_151534_fresh_prod.up,
    down: migration_20250822_151534_fresh_prod.down,
    name: '20250822_151534_fresh_prod'
  },
];
