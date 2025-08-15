import * as migration_20241125_222020_initial from './20241125_222020_initial';
import * as migration_20241214_124128 from './20241214_124128';
import * as migration_20250815_114454_user_role from './20250815_114454_user_role';
import * as migration_20250815_130832_user_avatar from './20250815_130832_user_avatar';
import * as migration_20250815_131604_user_avatar2 from './20250815_131604_user_avatar2';

export const migrations = [
  {
    up: migration_20241125_222020_initial.up,
    down: migration_20241125_222020_initial.down,
    name: '20241125_222020_initial',
  },
  {
    up: migration_20241214_124128.up,
    down: migration_20241214_124128.down,
    name: '20241214_124128',
  },
  {
    up: migration_20250815_114454_user_role.up,
    down: migration_20250815_114454_user_role.down,
    name: '20250815_114454_user_role',
  },
  {
    up: migration_20250815_130832_user_avatar.up,
    down: migration_20250815_130832_user_avatar.down,
    name: '20250815_130832_user_avatar',
  },
  {
    up: migration_20250815_131604_user_avatar2.up,
    down: migration_20250815_131604_user_avatar2.down,
    name: '20250815_131604_user_avatar2'
  },
];
