import * as migration_20250822_094221_fresh_prod from './20250822_094221_fresh_prod';
import * as migration_20250822_095146_add_arabic from './20250822_095146_add_arabic';

export const migrations = [
  {
    up: migration_20250822_094221_fresh_prod.up,
    down: migration_20250822_094221_fresh_prod.down,
    name: '20250822_094221_fresh_prod',
  },
  {
    up: migration_20250822_095146_add_arabic.up,
    down: migration_20250822_095146_add_arabic.down,
    name: '20250822_095146_add_arabic'
  },
];
