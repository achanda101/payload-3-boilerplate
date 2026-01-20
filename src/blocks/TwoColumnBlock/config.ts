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
        FancyListBlock,
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
      name: 'leftColumn',
      label: 'Left Column',
      type: 'richText',
      editor: lexicalEditor({
        features: lexicalFeatures,
      }),
      localized: true,
    },
    {
      name: 'rightColumn',
      label: 'Right Column',
      type: 'richText',
      editor: lexicalEditor({
        features: lexicalFeatures,
      }),
      localized: true,
    },
  ],
}
