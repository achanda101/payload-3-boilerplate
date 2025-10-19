import { Block } from "payload";
import { link } from "@/fields/link";

export const SingleColumnInfoBlock: Block = {
  slug: 'scolInfoBlk',
  labels: {
    singular: 'Call-to-Action Block',
    plural: 'Call-to-Action Blocks'
  },
  imageURL: '/block_icons/single-column-info-block-icon.png',
  fields: [
    {
      name: 'title',
      type: 'text',
      localized: true,
    },
    {
      name: 'desc',
      label: 'Description',
      type: 'textarea',
      localized: true,
    },
    {
      name: 'colBtns',
      label: 'Buttons',
      labels: {
        singular: 'Column Button',
        plural: 'Column Buttons'
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
            path: 'src/blocks/SingleColumnInfoBlock/ColumnButtonRowLabel.tsx',
          }
        },
      }
    },
  ]
}