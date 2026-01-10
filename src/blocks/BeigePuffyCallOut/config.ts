import { Block } from 'payload'

export const BeigePuffyCallOut: Block = {
  slug: 'beigePuffy',
  labels: {
    singular: 'Beige Puffy CallOut',
    plural: 'Beige Puffy CallOuts',
  },
  imageURL: '/block_icons/beigepuffy-call-out-block-icon.png',
  fields: [
    {
      type: 'row',
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
          localized: true,
          admin: {
            description: 'Main title for the callout section',
            width: '50%',
          },
        },
        {
          name: 'subtitle',
          type: 'text',
          localized: true,
          admin: {
            description: 'Subtitle text below the main title',
            width: '50%',
          },
        },
      ],
    },
    {
      name: 'align',
      type: 'radio',
      defaultValue: 'center',
      options: [
        {
          label: 'Center Aligned',
          value: 'center',
        },
        {
          label: 'Left Aligned',
          value: 'left',
        },
      ],
      admin: {
        description: 'Alignment for the title and subtitle',
        layout: 'horizontal',
      },
    },
    {
      name: 'items',
      labels: {
        singular: 'Item',
        plural: 'Items',
      },
      type: 'array',
      minRows: 1,
      maxRows: 4,
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'title',
              type: 'text',
              required: true,
              localized: true,
              admin: {
                description: 'Title for this item',
                width: '50%',
              },
            },
            {
              name: 'subtitle',
              type: 'text',
              localized: true,
              admin: {
                description: 'Subtitle for this item',
                width: '50%',
              },
            },
          ],
        },
        {
          name: 'description',
          type: 'textarea',
          localized: true,
          admin: {
            description: 'Description text for this item',
          },
        },
      ],
      admin: {
        description: 'Content items (minimum 1, maximum 4 items)',
        components: {
          RowLabel: {
            path: 'src/blocks/BeigePuffyCallOut/itemLabel.tsx',
          },
        },
      },
    },
  ],
}
