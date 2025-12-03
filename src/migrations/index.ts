import * as migration_20251111_213700_fresh_prod from './20251111_213700_fresh_prod';
import * as migration_20251111_224528_cta_ui_variations from './20251111_224528_cta_ui_variations';
import * as migration_20251112_112125_pages_collection from './20251112_112125_pages_collection';
import * as migration_20251203_183613_richtextblocks from './20251203_183613_richtextblocks';

export const migrations = [
  {
    up: migration_20251111_213700_fresh_prod.up,
    down: migration_20251111_213700_fresh_prod.down,
    name: '20251111_213700_fresh_prod',
  },
  {
    up: migration_20251111_224528_cta_ui_variations.up,
    down: migration_20251111_224528_cta_ui_variations.down,
    name: '20251111_224528_cta_ui_variations',
  },
  {
    up: migration_20251112_112125_pages_collection.up,
    down: migration_20251112_112125_pages_collection.down,
    name: '20251112_112125_pages_collection',
  },
  {
    up: migration_20251203_183613_richtextblocks.up,
    down: migration_20251203_183613_richtextblocks.down,
    name: '20251203_183613_richtextblocks'
  },
];
