import * as migration_20250925_225645_fresh_prod from './20250925_225645_fresh_prod';
import * as migration_20251003_172605_use_grantcardgridblock_only from './20251003_172605_use_grantcardgridblock_only';
import * as migration_20251007_085527_multistepprocess from './20251007_085527_multistepprocess';

export const migrations = [
  {
    up: migration_20250925_225645_fresh_prod.up,
    down: migration_20250925_225645_fresh_prod.down,
    name: '20250925_225645_fresh_prod',
  },
  {
    up: migration_20251003_172605_use_grantcardgridblock_only.up,
    down: migration_20251003_172605_use_grantcardgridblock_only.down,
    name: '20251003_172605_use_grantcardgridblock_only',
  },
  {
    up: migration_20251007_085527_multistepprocess.up,
    down: migration_20251007_085527_multistepprocess.down,
    name: '20251007_085527_multistepprocess'
  },
];
