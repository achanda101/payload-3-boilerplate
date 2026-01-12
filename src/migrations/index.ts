import * as migration_20251218_101811_freshprod_langplaces from './20251218_101811_freshprod_langplaces';
import * as migration_20260110_040335_pluginupdatesforgrants from './20260110_040335_pluginupdatesforgrants';
import * as migration_20260110_104512_beigepuffycallouts from './20260110_104512_beigepuffycallouts';
import * as migration_20260110_173653_fundingmapblock from './20260110_173653_fundingmapblock';
import * as migration_20260112_084900_resourcefeaturecard from './20260112_084900_resourcefeaturecard';
import * as migration_20260112_144134_resourcefeaturecardhomepage from './20260112_144134_resourcefeaturecardhomepage';
import * as migration_20260112_152930_resourcefeaturecardallpages from './20260112_152930_resourcefeaturecardallpages';

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
    name: '20260110_173653_fundingmapblock',
  },
  {
    up: migration_20260112_084900_resourcefeaturecard.up,
    down: migration_20260112_084900_resourcefeaturecard.down,
    name: '20260112_084900_resourcefeaturecard',
  },
  {
    up: migration_20260112_144134_resourcefeaturecardhomepage.up,
    down: migration_20260112_144134_resourcefeaturecardhomepage.down,
    name: '20260112_144134_resourcefeaturecardhomepage',
  },
  {
    up: migration_20260112_152930_resourcefeaturecardallpages.up,
    down: migration_20260112_152930_resourcefeaturecardallpages.down,
    name: '20260112_152930_resourcefeaturecardallpages'
  },
];
