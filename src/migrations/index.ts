import * as migration_20250815_155603_clean_start from './20250815_155603_clean_start';
import * as migration_20250815_182156_avatar_img from './20250815_182156_avatar_img';

export const migrations = [
  {
    up: migration_20250815_155603_clean_start.up,
    down: migration_20250815_155603_clean_start.down,
    name: '20250815_155603_clean_start',
  },
  {
    up: migration_20250815_182156_avatar_img.up,
    down: migration_20250815_182156_avatar_img.down,
    name: '20250815_182156_avatar_img'
  },
];
