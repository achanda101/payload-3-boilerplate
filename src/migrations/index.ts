import * as migration_20251111_213700_fresh_prod from './20251111_213700_fresh_prod';
import * as migration_20251111_224528_cta_ui_variations from './20251111_224528_cta_ui_variations';

export const migrations = [
  {
    up: migration_20251111_213700_fresh_prod.up,
    down: migration_20251111_213700_fresh_prod.down,
    name: '20251111_213700_fresh_prod',
  },
  {
    up: migration_20251111_224528_cta_ui_variations.up,
    down: migration_20251111_224528_cta_ui_variations.down,
    name: '20251111_224528_cta_ui_variations'
  },
];
