import * as migration_20250925_225645_fresh_prod from './20250925_225645_fresh_prod';
import * as migration_20250926_194500_restructure_page_content from './20250926_194500_restructure_page_content';

export const migrations = [
  {
    up: migration_20250925_225645_fresh_prod.up,
    down: migration_20250925_225645_fresh_prod.down,
    name: '20250925_225645_fresh_prod',
  },
  {
    up: migration_20250926_194500_restructure_page_content.up,
    down: migration_20250926_194500_restructure_page_content.down,
    name: '20250926_194500_restructure_page_content'
  },
];
