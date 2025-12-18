import * as migration_20251218_092340_freshprod_noposts from './20251218_092340_freshprod_noposts';

export const migrations = [
  {
    up: migration_20251218_092340_freshprod_noposts.up,
    down: migration_20251218_092340_freshprod_noposts.down,
    name: '20251218_092340_freshprod_noposts'
  },
];
