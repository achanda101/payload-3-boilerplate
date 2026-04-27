import { Block } from 'payload'
import {
  FixedToolbarFeature,
  HeadingFeature,
  OrderedListFeature,
  UnorderedListFeature,
  lexicalEditor,
  UploadFeature,
  BlocksFeature,
  HorizontalRuleFeature,
} from '@payloadcms/richtext-lexical'
import { YouTubeBlock } from '@/blocks/YouTubeBlock/config'
import { VimeoBlock } from '@/blocks/VimeoBlock/config'
import { SpotifyTrackBlock } from '@/blocks/SpotifyTrackBlock/config'
import { SoundCloudEmbedBlock } from '@/blocks/SoundCloudEmbedBlock/config'
import { BlockQuote } from '@/blocks/BlockQuote/config'
import { FancyListBlock } from '@/blocks/FancyListBlock/config'
import { PillButtonsBlock } from '@/blocks/PillButtonsBlock/config'
import { FlourishBlock } from '@/blocks/FlourishBlock/config'

export const RichContentBlock: Block = {
  slug: 'richContentBlock',
  labels: {
    singular: 'Rich Text Content Block',
    plural: 'Rich Text Content Blocks',
  },
  imageURL: '/block_icons/richcontent-block-icon.png',
  fields: [
    {
      name: 'richText',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [
            ...rootFeatures,
            HeadingFeature({ enabledHeadingSizes: ['h2', 'h3', 'h4', 'h5', 'h6'] }),
            OrderedListFeature(),
            UnorderedListFeature(),
            UploadFeature(),
            HorizontalRuleFeature(),
            FixedToolbarFeature(),
            BlocksFeature({
              blocks: [
                BlockQuote,
                YouTubeBlock,
                VimeoBlock,
                SpotifyTrackBlock,
                SoundCloudEmbedBlock,
                FancyListBlock,
                PillButtonsBlock,
                FlourishBlock,
              ],
            }),
          ]
        },
      }),
      localized: true,
      label: false,
    },
    {
      name: 'blockAnchorId',
      type: 'ui',
      admin: {
        components: {
          Field: '@/components/BlockIdDisplay#BlockIdDisplay',
        },
      },
    },
  ],
}
