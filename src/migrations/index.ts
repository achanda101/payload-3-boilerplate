import * as migration_20251102_063134_freash_prod from './20251102_063134_freash_prod';
import * as migration_20251103_063116_autosave_off from './20251103_063116_autosave_off';
import * as migration_20251103_073140_grantcard_autosave_off from './20251103_073140_grantcard_autosave_off';
import * as migration_20251104_123124_featureCardAccordion_off from './20251104_123124_featureCardAccordion_off';
import * as migration_20251111_104410_featureCardAccordion_full from './20251111_104410_featureCardAccordion_full';
import * as migration_20251111_171959_ylwcrddeck_featcrd_richtext_update from './20251111_171959_ylwcrddeck_featcrd_richtext_update';

export const migrations = [
  {
    up: migration_20251102_063134_freash_prod.up,
    down: migration_20251102_063134_freash_prod.down,
    name: '20251102_063134_freash_prod',
  },
  {
    up: migration_20251103_063116_autosave_off.up,
    down: migration_20251103_063116_autosave_off.down,
    name: '20251103_063116_autosave_off',
  },
  {
    up: migration_20251103_073140_grantcard_autosave_off.up,
    down: migration_20251103_073140_grantcard_autosave_off.down,
    name: '20251103_073140_grantcard_autosave_off',
  },
  {
    up: migration_20251104_123124_featureCardAccordion_off.up,
    down: migration_20251104_123124_featureCardAccordion_off.down,
    name: '20251104_123124_featureCardAccordion_off',
  },
  {
    up: migration_20251111_104410_featureCardAccordion_full.up,
    down: migration_20251111_104410_featureCardAccordion_full.down,
    name: '20251111_104410_featureCardAccordion_full',
  },
  {
    up: migration_20251111_171959_ylwcrddeck_featcrd_richtext_update.up,
    down: migration_20251111_171959_ylwcrddeck_featcrd_richtext_update.down,
    name: '20251111_171959_ylwcrddeck_featcrd_richtext_update'
  },
];
