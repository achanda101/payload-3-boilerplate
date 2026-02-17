import { Block } from 'payload'

export const FancyListBlock: Block = {
  slug: 'fancyListBlock',
  labels: {
    singular: 'Fancy List',
    plural: 'Fancy Lists',
  },
  fields: [
    {
      name: 'items',
      label: 'List Items',
      type: 'array',
      minRows: 1,
      fields: [
        {
          name: 'title',
          label: 'Title',
          type: 'text',
          required: true,
          localized: true,
        },
        {
          name: 'description',
          label: 'Description',
          type: 'textarea',
          localized: true,
        },
      ],
      admin: {
        description: 'Add list items with custom mascot markers',
        components: {
          RowLabel: {
            path: 'src/blocks/FancyListBlock/ListRowLabel.tsx',
          },
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
