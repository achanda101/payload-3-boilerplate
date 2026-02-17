import { Block } from 'payload'
import { link } from '@/fields/link'

export const PillButtonsBlock: Block = {
  slug: 'pillButtonsBlock',
  labels: {
    singular: 'Pill Buttons',
    plural: 'Pill Buttons',
  },
  fields: [
    {
      name: 'buttons',
      label: 'Buttons',
      labels: {
        singular: 'Button',
        plural: 'Buttons',
      },
      type: 'array',
      minRows: 1,
      maxRows: 2,
      fields: [
        link({
          appearances: false,
        }),
      ],
      admin: {
        description: 'Add button links - up to 2 buttons',
        components: {
          RowLabel: {
            path: 'src/globals/Homepage/CtaButtonRowLabel.tsx',
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
