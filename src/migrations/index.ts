import * as migration_20251218_101811_freshprod_langplaces from './20251218_101811_freshprod_langplaces';
import * as migration_20260110_040335_pluginupdatesforgrants from './20260110_040335_pluginupdatesforgrants';
import * as migration_20260110_104512_beigepuffycallouts from './20260110_104512_beigepuffycallouts';
import * as migration_20260110_173653_fundingmapblock from './20260110_173653_fundingmapblock';
import * as migration_20260112_084900_resourcefeaturecard from './20260112_084900_resourcefeaturecard';
import * as migration_20260112_144134_resourcefeaturecardhomepage from './20260112_144134_resourcefeaturecardhomepage';
import * as migration_20260112_152930_resourcefeaturecardallpages from './20260112_152930_resourcefeaturecardallpages';
import * as migration_20260112_162938_resourcegallery from './20260112_162938_resourcegallery';
import * as migration_20260114_083632_localizecaptions from './20260114_083632_localizecaptions';
import * as migration_20260114_104835_populateresourcefeatcardandgallery from './20260114_104835_populateresourcefeatcardandgallery';
import * as migration_20260114_122158_titledescresourcecards from './20260114_122158_titledescresourcecards';
import * as migration_20260119_081859_pillarcards from './20260119_081859_pillarcards';
import * as migration_20260119_083252_pillarcards2 from './20260119_083252_pillarcards2';
import * as migration_20260119_113457_testimonials from './20260119_113457_testimonials';
import * as migration_20260119_131855_minimalcardgallery from './20260119_131855_minimalcardgallery';
import * as migration_20260119_140242_add_id_card_gallery_block from './20260119_140242_add_id_card_gallery_block';
import * as migration_20260120_064214_twocolumnblock from './20260120_064214_twocolumnblock';
import * as migration_20260120_211136_threecolumntable from './20260120_211136_threecolumntable';
import * as migration_20260123_143908_seoforall from './20260123_143908_seoforall';
import * as migration_20260203_080732_feat_rcslider from './20260203_080732_feat_rcslider';
import * as migration_20260203_083116_fix_twocol_tabs from './20260203_083116_fix_twocol_tabs';
import * as migration_20260203_092308_fix_3column_tabs from './20260203_092308_fix_3column_tabs';
import * as migration_20260203_170724_feat_search_index_richtextcontent from './20260203_170724_feat_search_index_richtextcontent';
import * as migration_20260205_083618_add_header_banner from './20260205_083618_add_header_banner';
import * as migration_20260205_085920_add_header_banner from './20260205_085920_add_header_banner';
import * as migration_20260205_152212_feat_blurhash from './20260205_152212_feat_blurhash';
import * as migration_20260207_080532_remove_contenttext_index from './20260207_080532_remove_contenttext_index';

export const migrations = [
  {
    up: migration_20251218_101811_freshprod_langplaces.up,
    down: migration_20251218_101811_freshprod_langplaces.down,
    name: '20251218_101811_freshprod_langplaces',
  },
  {
    up: migration_20260110_040335_pluginupdatesforgrants.up,
    down: migration_20260110_040335_pluginupdatesforgrants.down,
    name: '20260110_040335_pluginupdatesforgrants',
  },
  {
    up: migration_20260110_104512_beigepuffycallouts.up,
    down: migration_20260110_104512_beigepuffycallouts.down,
    name: '20260110_104512_beigepuffycallouts',
  },
  {
    up: migration_20260110_173653_fundingmapblock.up,
    down: migration_20260110_173653_fundingmapblock.down,
    name: '20260110_173653_fundingmapblock',
  },
  {
    up: migration_20260112_084900_resourcefeaturecard.up,
    down: migration_20260112_084900_resourcefeaturecard.down,
    name: '20260112_084900_resourcefeaturecard',
  },
  {
    up: migration_20260112_144134_resourcefeaturecardhomepage.up,
    down: migration_20260112_144134_resourcefeaturecardhomepage.down,
    name: '20260112_144134_resourcefeaturecardhomepage',
  },
  {
    up: migration_20260112_152930_resourcefeaturecardallpages.up,
    down: migration_20260112_152930_resourcefeaturecardallpages.down,
    name: '20260112_152930_resourcefeaturecardallpages',
  },
  {
    up: migration_20260112_162938_resourcegallery.up,
    down: migration_20260112_162938_resourcegallery.down,
    name: '20260112_162938_resourcegallery',
  },
  {
    up: migration_20260114_083632_localizecaptions.up,
    down: migration_20260114_083632_localizecaptions.down,
    name: '20260114_083632_localizecaptions',
  },
  {
    up: migration_20260114_104835_populateresourcefeatcardandgallery.up,
    down: migration_20260114_104835_populateresourcefeatcardandgallery.down,
    name: '20260114_104835_populateresourcefeatcardandgallery',
  },
  {
    up: migration_20260114_122158_titledescresourcecards.up,
    down: migration_20260114_122158_titledescresourcecards.down,
    name: '20260114_122158_titledescresourcecards',
  },
  {
    up: migration_20260119_081859_pillarcards.up,
    down: migration_20260119_081859_pillarcards.down,
    name: '20260119_081859_pillarcards',
  },
  {
    up: migration_20260119_083252_pillarcards2.up,
    down: migration_20260119_083252_pillarcards2.down,
    name: '20260119_083252_pillarcards2',
  },
  {
    up: migration_20260119_113457_testimonials.up,
    down: migration_20260119_113457_testimonials.down,
    name: '20260119_113457_testimonials',
  },
  {
    up: migration_20260119_131855_minimalcardgallery.up,
    down: migration_20260119_131855_minimalcardgallery.down,
    name: '20260119_131855_minimalcardgallery',
  },
  {
    up: migration_20260119_140242_add_id_card_gallery_block.up,
    down: migration_20260119_140242_add_id_card_gallery_block.down,
    name: '20260119_140242_add_id_card_gallery_block',
  },
  {
    up: migration_20260120_064214_twocolumnblock.up,
    down: migration_20260120_064214_twocolumnblock.down,
    name: '20260120_064214_twocolumnblock',
  },
  {
    up: migration_20260120_211136_threecolumntable.up,
    down: migration_20260120_211136_threecolumntable.down,
    name: '20260120_211136_threecolumntable',
  },
  {
    up: migration_20260123_143908_seoforall.up,
    down: migration_20260123_143908_seoforall.down,
    name: '20260123_143908_seoforall',
  },
  {
    up: migration_20260203_080732_feat_rcslider.up,
    down: migration_20260203_080732_feat_rcslider.down,
    name: '20260203_080732_feat_rcslider',
  },
  {
    up: migration_20260203_083116_fix_twocol_tabs.up,
    down: migration_20260203_083116_fix_twocol_tabs.down,
    name: '20260203_083116_fix_twocol_tabs',
  },
  {
    up: migration_20260203_092308_fix_3column_tabs.up,
    down: migration_20260203_092308_fix_3column_tabs.down,
    name: '20260203_092308_fix_3column_tabs',
  },
  {
    up: migration_20260203_170724_feat_search_index_richtextcontent.up,
    down: migration_20260203_170724_feat_search_index_richtextcontent.down,
    name: '20260203_170724_feat_search_index_richtextcontent',
  },
  {
    up: migration_20260205_083618_add_header_banner.up,
    down: migration_20260205_083618_add_header_banner.down,
    name: '20260205_083618_add_header_banner',
  },
  {
    up: migration_20260205_085920_add_header_banner.up,
    down: migration_20260205_085920_add_header_banner.down,
    name: '20260205_085920_add_header_banner',
  },
  {
    up: migration_20260205_152212_feat_blurhash.up,
    down: migration_20260205_152212_feat_blurhash.down,
    name: '20260205_152212_feat_blurhash',
  },
  {
    up: migration_20260207_080532_remove_contenttext_index.up,
    down: migration_20260207_080532_remove_contenttext_index.down,
    name: '20260207_080532_remove_contenttext_index'
  },
];
