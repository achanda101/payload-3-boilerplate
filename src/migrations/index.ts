import * as migration_20251218_101811_freshprod_langplaces from './20251218_101811_freshprod_langplaces';
import * as migration_20260110_040335_pluginupdatesforgrants from './20260110_040335_pluginupdatesforgrants';
import * as migration_20260110_104512_beigepuffycallouts from './20260110_104512_beigepuffycallouts';
import * as migration_20260110_173653_fundingmapblock from './20260110_173653_fundingmapblock';

export const migrations = [
  {
    up: migration_20251218_101811_freshprod_langplaces.up,
    down: migration_20251218_101811_freshprod_langplaces.down,
    name: '20251218_101811_freshprod_langplaces',
  },
  {
    up: migration_20260110_040335_pluginupdatesforgrants.up,
    down: migration_20260110_040335_pluginupdatesforgrants.down,
    name: '20260110_040335_pluginupdatesforgrants',
  },
  {
    up: migration_20260110_104512_beigepuffycallouts.up,
    down: migration_20260110_104512_beigepuffycallouts.down,
    name: '20260110_104512_beigepuffycallouts',
  },
  {
    up: migration_20260110_173653_fundingmapblock.up,
    down: migration_20260110_173653_fundingmapblock.down,
    name: '20260110_173653_fundingmapblock'
  },
];
