import * as migration_20251111_175842_fresh_prod from './20251111_175842_fresh_prod';
import * as migration_20251111_212430_richtext_cta_fix from './20251111_212430_richtext_cta_fix';

export const migrations = [
  {
    up: migration_20251111_175842_fresh_prod.up,
    down: migration_20251111_175842_fresh_prod.down,
    name: '20251111_175842_fresh_prod',
  },
  {
    up: migration_20251111_212430_richtext_cta_fix.up,
    down: migration_20251111_212430_richtext_cta_fix.down,
    name: '20251111_212430_richtext_cta_fix'
  },
];
