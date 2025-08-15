import * as migration_20250815_150259_remove_pages from './20250815_150259_remove_pages';

export const migrations = [
  {
    up: migration_20250815_150259_remove_pages.up,
    down: migration_20250815_150259_remove_pages.down,
    name: '20250815_150259_remove_pages'
  },
];
