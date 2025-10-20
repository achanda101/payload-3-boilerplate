import * as migration_20250925_225645_fresh_prod from './20250925_225645_fresh_prod';
import * as migration_20251003_172605_use_grantcardgridblock_only from './20251003_172605_use_grantcardgridblock_only';
import * as migration_20251007_085527_multistepprocess from './20251007_085527_multistepprocess';
import * as migration_20251007_191006_multicolinfo from './20251007_191006_multicolinfo';
import * as migration_20251007_211229_singlecolinfo from './20251007_211229_singlecolinfo';
import * as migration_20251019_062935_comparisonblk from './20251019_062935_comparisonblk';
import * as migration_20251019_085555_buttonvariants from './20251019_085555_buttonvariants';
import * as migration_20251020_064241_yellowcarddesk from './20251020_064241_yellowcarddesk';

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
    name: '20251007_085527_multistepprocess',
  },
  {
    up: migration_20251007_191006_multicolinfo.up,
    down: migration_20251007_191006_multicolinfo.down,
    name: '20251007_191006_multicolinfo',
  },
  {
    up: migration_20251007_211229_singlecolinfo.up,
    down: migration_20251007_211229_singlecolinfo.down,
    name: '20251007_211229_singlecolinfo',
  },
  {
    up: migration_20251019_062935_comparisonblk.up,
    down: migration_20251019_062935_comparisonblk.down,
    name: '20251019_062935_comparisonblk',
  },
  {
    up: migration_20251019_085555_buttonvariants.up,
    down: migration_20251019_085555_buttonvariants.down,
    name: '20251019_085555_buttonvariants',
  },
  {
    up: migration_20251020_064241_yellowcarddesk.up,
    down: migration_20251020_064241_yellowcarddesk.down,
    name: '20251020_064241_yellowcarddesk'
  },
];
