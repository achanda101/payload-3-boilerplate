import * as migration_20251102_063134_freash_prod from './20251102_063134_freash_prod';

export const migrations = [
  {
    up: migration_20251102_063134_freash_prod.up,
    down: migration_20251102_063134_freash_prod.down,
    name: '20251102_063134_freash_prod'
  },
];
