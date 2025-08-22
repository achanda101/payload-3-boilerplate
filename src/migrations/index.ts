import * as migration_20250822_094221_fresh_prod from './20250822_094221_fresh_prod';
import * as migration_20250822_095146_add_arabic from './20250822_095146_add_arabic';
import * as migration_20250822_123116_documents_collection from './20250822_123116_documents_collection';
import * as migration_20250822_142350_s3_cloudflare_add from './20250822_142350_s3_cloudflare_add';
import * as migration_20250822_143439_move_to_mediaCloud from './20250822_143439_move_to_mediaCloud';
import * as migration_20250822_150347_remove_media_collection from './20250822_150347_remove_media_collection';

export const migrations = [
  {
    up: migration_20250822_094221_fresh_prod.up,
    down: migration_20250822_094221_fresh_prod.down,
    name: '20250822_094221_fresh_prod',
  },
  {
    up: migration_20250822_095146_add_arabic.up,
    down: migration_20250822_095146_add_arabic.down,
    name: '20250822_095146_add_arabic',
  },
  {
    up: migration_20250822_123116_documents_collection.up,
    down: migration_20250822_123116_documents_collection.down,
    name: '20250822_123116_documents_collection',
  },
  {
    up: migration_20250822_142350_s3_cloudflare_add.up,
    down: migration_20250822_142350_s3_cloudflare_add.down,
    name: '20250822_142350_s3_cloudflare_add',
  },
  {
    up: migration_20250822_143439_move_to_mediaCloud.up,
    down: migration_20250822_143439_move_to_mediaCloud.down,
    name: '20250822_143439_move_to_mediaCloud',
  },
  {
    up: migration_20250822_150347_remove_media_collection.up,
    down: migration_20250822_150347_remove_media_collection.down,
    name: '20250822_150347_remove_media_collection'
  },
];
