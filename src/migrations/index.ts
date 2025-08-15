import * as migration_20250815_155603_clean_start from './20250815_155603_clean_start';

export const migrations = [
  {
    up: migration_20250815_155603_clean_start.up,
    down: migration_20250815_155603_clean_start.down,
    name: '20250815_155603_clean_start'
  },
];
