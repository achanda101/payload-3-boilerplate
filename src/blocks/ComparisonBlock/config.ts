import { Block } from "payload";
import { link } from "@/fields/link";

export const ComparisonBlock: Block = {
  slug: 'comparisonBlk',
  labels: {
    singular: 'Comparison Block',
    plural: 'Comparison Blocks'
  },
  imageURL: '/block_icons/comparison-block-icon.png',
  fields: [
    {
      type: 'row',
      fields: [
        {
          name: 'title',
          type: 'text',
          localized: true,
          admin: {
            width: '50%'
          }
        },
        {
          name: 'desc',
          label: 'Description',
          type: 'text',
          localized: true,
          admin: {
            width: '50%'
          }
        },
      ]
    },
    {
      type: 'group',
      label: 'Content in Left Column',
      name: 'lftGrp',
      fields: [
        {
          type: 'row',
          fields: [
            {
              type: 'group',
              fields: [
                {
                  name: 'title',
                  label: 'Title for left column',
                  type: 'text',
                  localized: true,
                },
                {
                  name: 'desc',
                  label: 'Description for left column',
                  type: 'text',
                  localized: true,
                },
              ],
              admin: {
                width: '50%'
              }
            },
            {
              name: 'lftPoints',
              type: 'array',
              label: 'Points in left column',
              labels: {
                singular: 'Point in left column',
                plural: 'Points in left column'
              },
              minRows: 1,
              fields: [
                {
                  name: 'point',
                  label: 'Point in left column',
                  type: 'text',
                  localized: true
                }
              ],
              admin: {
                width: '50%',
                description: 'Points in the left column will have a checkmark',
                components: {
                  RowLabel: {
                    path: 'src/blocks/ComparisonBlock/ComparisonRowLabel.tsx',
                  }
                },
              }
            }
          ]
        },
      ]
    },
    {
      type: 'group',
      label: 'Content in Right Column',
      name: 'rtGrp',
      fields: [
        {
          type: 'row',
          fields: [
            {
              type: 'group',
              fields: [
                {
                  name: 'title',
                  label: 'Title for right column',
                  type: 'text',
                  localized: true,
                },
                {
                  name: 'desc',
                  label: 'Description for right column',
                  type: 'text',
                  localized: true,
                },
              ],
              admin: {
                width: '50%'
              }
            },
            {
              name: 'rtPoints',
              type: 'array',
              label: 'Points in right column',
              labels: {
                singular: 'Point in right column',
                plural: 'Points in right column'
              },
              minRows: 1,
              fields: [
                {
                  name: 'point',
                  label: 'Point in right column',
                  type: 'text',
                  localized: true
                }
              ],
              admin: {
                width: '50%',
                description: 'Points in the right column will have a cross mark',
                components: {
                  RowLabel: {
                    path: 'src/blocks/ComparisonBlock/ComparisonRowLabel.tsx',
                  }
                },
              }
            }
          ]
        },
      ]
    },
    {
      name: 'buttons',
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
            path: 'src/blocks/ComparisonBlock/ButtonRowLabel.tsx',
          }
        },
      }
    }
  ]
}