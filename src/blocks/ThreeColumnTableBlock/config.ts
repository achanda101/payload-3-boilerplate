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
import { FancyListBlock } from '@/blocks/FancyListBlock/config'

const lexicalFeatures = ({ rootFeatures }: { rootFeatures: any }) => {
  return [
    ...rootFeatures,
    HeadingFeature({ enabledHeadingSizes: ['h3', 'h4', 'h5', 'h6'] }),
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
        FancyListBlock,
      ],
    }),
  ]
}

export const ThreeColumnTableBlock: Block = {
  slug: 'threeColumnTableBlock',
  labels: {
    singular: 'Three Column Table',
    plural: 'Three Column Tables',
  },
  imageURL: '/block_icons/threecolumntable-block-icon.png',
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
      name: 'columnWidths',
      type: 'select',
      label: 'Column Widths',
      defaultValue: 'f-t-t',
      options: [
        {
          label: '50%, 25%, 25%',
          value: 'f-t-t',
        },
        {
          label: '25%, 50%, 25%',
          value: 't-f-t',
        },
        {
          label: '25%, 25%, 50%',
          value: 't-t-f',
        },
        {
          label: '15%, 30%, 55%',
          value: 'vt-t-f',
        },
      ],
    },
    {
      name: 'rows',
      label: 'Rows',
      labels: {
        singular: 'Row',
        plural: 'Rows',
      },
      type: 'array',
      minRows: 1,
      fields: [
        {
          type: 'tabs',
          tabs: [
            {
              label: 'First Column',
              fields: [
                {
                  name: 'firstColumn',
                  label: 'First Column Content',
                  type: 'richText',
                  editor: lexicalEditor({
                    features: lexicalFeatures,
                  }),
                  localized: true,
                },
              ],
            },
            {
              label: 'Second Column',
              fields: [
                {
                  name: 'secondColumn',
                  label: 'Second Column Content',
                  type: 'richText',
                  editor: lexicalEditor({
                    features: lexicalFeatures,
                  }),
                  localized: true,
                },
              ],
            },
            {
              label: 'Third Column',
              fields: [
                {
                  name: 'thirdColumn',
                  label: 'Third Column Content',
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
