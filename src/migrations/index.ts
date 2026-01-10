import * as migration_20251218_101811_freshprod_langplaces from './20251218_101811_freshprod_langplaces';
import * as migration_20260110_040335_pluginupdatesforgrants from './20260110_040335_pluginupdatesforgrants';

export const migrations = [
  {
    up: migration_20251218_101811_freshprod_langplaces.up,
    down: migration_20251218_101811_freshprod_langplaces.down,
    name: '20251218_101811_freshprod_langplaces',
  },
  {
    up: migration_20260110_040335_pluginupdatesforgrants.up,
    down: migration_20260110_040335_pluginupdatesforgrants.down,
    name: '20260110_040335_pluginupdatesforgrants'
  },
];
