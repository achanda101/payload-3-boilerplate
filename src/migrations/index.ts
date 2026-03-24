import * as migration_20260324_073406_fresh_schema from './20260324_073406_fresh_schema';

export const migrations = [
  {
    up: migration_20260324_073406_fresh_schema.up,
    down: migration_20260324_073406_fresh_schema.down,
    name: '20260324_073406_fresh_schema'
  },
];
