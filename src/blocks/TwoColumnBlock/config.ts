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
import { BadgeBlock } from '@/blocks/BadgeBlock/config'
import { PillButtonsBlock } from '@/blocks/PillButtonsBlock/config'
import { TagsBlock } from '@/blocks/TagsBlock/config'

const lexicalFeatures = ({ rootFeatures }: { rootFeatures: any }) => {
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
        BadgeBlock,
        PillButtonsBlock,
        TagsBlock,
      ],
    }),
  ]
}

export const TwoColumnBlock: Block = {
  slug: 'twoColumnBlock',
  labels: {
    singular: 'Two Column Block',
    plural: 'Two Column Blocks',
  },
  imageURL: '/block_icons/twocolumn-block-icon.gif',
  fields: [
    {
      name: 'title',
      type: 'text',
      localized: true,
    },
    {
      name: 'subtitle',
      type: 'textarea',
      localized: true,
    },
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Left Column',
          fields: [
            {
              name: 'leftColumn',
              label: 'Left Column Content',
              type: 'richText',
              editor: lexicalEditor({
                features: lexicalFeatures,
              }),
              localized: true,
            },
          ],
        },
        {
          label: 'Right Column',
          fields: [
            {
              name: 'rightColumn',
              label: 'Right Column Content',
              type: 'richText',
              editor: lexicalEditor({
                features: lexicalFeatures,
              }),
              localized: true,
            },
          ],
        },
      ],
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
