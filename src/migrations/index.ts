import * as migration_20250815_155603_clean_start from './20250815_155603_clean_start';
import * as migration_20250815_182156_avatar_img from './20250815_182156_avatar_img';
import * as migration_20250817_073916_avatar2 from './20250817_073916_avatar2';
import * as migration_20250817_114142_sitesettings from './20250817_114142_sitesettings';

export const migrations = [
  {
    up: migration_20250815_155603_clean_start.up,
    down: migration_20250815_155603_clean_start.down,
    name: '20250815_155603_clean_start',
  },
  {
    up: migration_20250815_182156_avatar_img.up,
    down: migration_20250815_182156_avatar_img.down,
    name: '20250815_182156_avatar_img',
  },
  {
    up: migration_20250817_073916_avatar2.up,
    down: migration_20250817_073916_avatar2.down,
    name: '20250817_073916_avatar2',
  },
  {
    up: migration_20250817_114142_sitesettings.up,
    down: migration_20250817_114142_sitesettings.down,
    name: '20250817_114142_sitesettings'
  },
];
