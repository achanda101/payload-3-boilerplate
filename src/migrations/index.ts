import * as migration_20251216_181935_fresh_prod from './20251216_181935_fresh_prod';

export const migrations = [
  {
    up: migration_20251216_181935_fresh_prod.up,
    down: migration_20251216_181935_fresh_prod.down,
    name: '20251216_181935_fresh_prod'
  },
];
