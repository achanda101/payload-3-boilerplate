import * as migration_20251218_101811_freshprod_langplaces from './20251218_101811_freshprod_langplaces';

export const migrations = [
  {
    up: migration_20251218_101811_freshprod_langplaces.up,
    down: migration_20251218_101811_freshprod_langplaces.down,
    name: '20251218_101811_freshprod_langplaces'
  },
];
