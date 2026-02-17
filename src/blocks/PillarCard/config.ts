import { Block } from 'payload'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import {
  BoldFeature,
  UnderlineFeature,
  ItalicFeature,
  LinkFeature,
  InlineToolbarFeature,
} from '@payloadcms/richtext-lexical'

export const PillarCard: Block = {
  slug: 'pillarCard',
  labels: { singular: 'Pillar Card', plural: 'Pillar Cards' },
  imageURL: '/block_icons/pillarcard-block-icon.png',
  fields: [
    {
      type: 'row',
      fields: [
        {
          type: 'group',
          fields: [
            { name: 'title', type: 'text', localized: true },
            {
              name: 'align',
              label: 'Title/Subtitle Alignment',
              type: 'radio',
              options: [
                { label: 'Left Align', value: 'left' },
                { label: 'Center Align', value: 'center' },
              ],
              defaultValue: 'left',
              admin: { layout: 'horizontal' },
            },
          ],
          admin: { width: '50%' },
        },
        {
          name: 'subtitle',
          label: 'Subtitle',
          type: 'richText',
          editor: lexicalEditor({
            features: [
              BoldFeature(),
              UnderlineFeature(),
              ItalicFeature(),
              LinkFeature({ enabledCollections: ['grants', 'pages', 'reports', 'blog'] }),
              InlineToolbarFeature(),
            ],
          }),
          localized: true,
          admin: { width: '50%' },
        },
      ],
    },
    {
      name: 'cards',
      label: 'Pillar Cards',
      labels: { singular: 'Pillar Card', plural: 'Pillar Cards' },
      type: 'array',
      minRows: 2,
      maxRows: 4,
      fields: [
        { name: 'title', type: 'text', required: true, localized: true },
        {
          name: 'mascot',
          type: 'upload',
          relationTo: 'assetCloud',
          admin: { description: 'Mascot image for this pillar card' },
        },
      ],
      admin: {
        description: 'Add 2-4 pillar cards',
        components: {
          RowLabel: { path: 'src/blocks/PillarCard/CardRowLabel.tsx' },
        },
      },
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
