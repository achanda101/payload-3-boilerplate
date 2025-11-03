import * as migration_20251102_063134_freash_prod from './20251102_063134_freash_prod';
import * as migration_20251103_063116_autosave_off from './20251103_063116_autosave_off';

export const migrations = [
  {
    up: migration_20251102_063134_freash_prod.up,
    down: migration_20251102_063134_freash_prod.down,
    name: '20251102_063134_freash_prod',
  },
  {
    up: migration_20251103_063116_autosave_off.up,
    down: migration_20251103_063116_autosave_off.down,
    name: '20251103_063116_autosave_off'
  },
];
