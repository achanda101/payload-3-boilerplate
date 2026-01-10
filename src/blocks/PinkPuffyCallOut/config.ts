import { Block } from 'payload'
import { link } from '@/fields/link'

export const PinkPuffyCallOut: Block = {
  slug: 'pinkPuffy',
  labels: {
    singular: 'Pink Puffy CallOut',
    plural: 'Pink Puffy CallOuts',
  },
  imageURL: '/block_icons/pinkpuffy-call-out-block-icon.png',
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
      name: 'topRow',
      labels: {
        singular: 'Top Row Item',
        plural: 'Top Row Items',
      },
      type: 'array',
      maxRows: 3,
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
                description: 'Title for this top row item',
                width: '50%',
              },
            },
            {
              name: 'subtitle',
              type: 'text',
              localized: true,
              admin: {
                description: 'Subtitle for this top row item',
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
            description: 'Description text for this top row item',
          },
        },
      ],
      admin: {
        description: 'Top row items (maximum 3 items)',
        components: {
          RowLabel: {
            path: 'src/blocks/PinkPuffyCallOut/calloutLabel.tsx',
          },
        },
      },
    },
    {
      name: 'botRow',
      label: 'Bottom Row',
      type: 'array',
      maxRows: 3,
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
                description: 'Title for this bottom row item',
                width: '40%',
              },
            },
            {
              name: 'description',
              type: 'textarea',
              localized: true,
              admin: {
                description: 'Description text for this bottom row item',
                width: '60%',
              },
            },
          ],
        },
      ],
      admin: {
        description: 'Bottom row items (maximum 3 items)',
        components: {
          RowLabel: {
            path: 'src/blocks/PinkPuffyCallOut/calloutLabel.tsx',
          },
        },
      },
    },
    {
      name: 'links',
      labels: {
        singular: 'Link',
        plural: 'Links',
      },
      type: 'array',
      maxRows: 2,
      fields: [
        link({
          appearances: false,
        }),
      ],
      admin: {
        components: {
          RowLabel: {
            path: 'src/blocks/PinkPuffyCallOut/linkLabel.tsx',
          },
        },
      },
    },
  ],
}
