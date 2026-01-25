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
      type: 'array',
      labels: {
        singular: 'Row',
        plural: 'Rows',
      },
      admin: {
        components: {
          RowLabel: {
            path: 'src/blocks/ThreeColumnTableBlock/RowRowLabel.tsx',
          },
        },
      },
      fields: [
        {
          name: 'columns',
          type: 'array',
          minRows: 3,
          maxRows: 3,
          labels: {
            singular: 'Column',
            plural: 'Columns',
          },
          admin: {
            components: {
              RowLabel: {
                path: 'src/blocks/ThreeColumnTableBlock/ColumnRowLabel.tsx',
              },
            },
          },
          fields: [
            {
              name: 'content',
              type: 'richText',
              localized: true,
              editor: lexicalEditor({
                features: lexicalFeatures,
              }),
            },
          ],
        },
      ],
    },
  ],
}
