import * as migration_20250925_225645_fresh_prod from './20250925_225645_fresh_prod';

export const migrations = [
  {
    up: migration_20250925_225645_fresh_prod.up,
    down: migration_20250925_225645_fresh_prod.down,
    name: '20250925_225645_fresh_prod'
  },
];
