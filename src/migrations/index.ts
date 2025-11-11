import * as migration_20251111_175842_fresh_prod from './20251111_175842_fresh_prod';

export const migrations = [
  {
    up: migration_20251111_175842_fresh_prod.up,
    down: migration_20251111_175842_fresh_prod.down,
    name: '20251111_175842_fresh_prod'
  },
];
