import * as migration_20251216_181935_fresh_prod from './20251216_181935_fresh_prod';
import * as migration_20251216_225254_pinkpuffy from './20251216_225254_pinkpuffy';
import * as migration_20251218_091430_removeposts from './20251218_091430_removeposts';

export const migrations = [
  {
    up: migration_20251216_181935_fresh_prod.up,
    down: migration_20251216_181935_fresh_prod.down,
    name: '20251216_181935_fresh_prod',
  },
  {
    up: migration_20251216_225254_pinkpuffy.up,
    down: migration_20251216_225254_pinkpuffy.down,
    name: '20251216_225254_pinkpuffy',
  },
  {
    up: migration_20251218_091430_removeposts.up,
    down: migration_20251218_091430_removeposts.down,
    name: '20251218_091430_removeposts'
  },
];
