import { Block } from 'payload'
import { link } from '@/fields/link'

export const ListingCardDeck: Block = {
  slug: 'listCrdDck',
  labels: {
    singular: 'Resource Card Slider',
    plural: 'Resource Card Sliders',
  },
  imageURL: '/block_icons/listingcarddeck-block-icon.png',
  fields: [
    {
      name: 'title',
      type: 'text',
      localized: true,
    },
    {
      name: 'dataSource',
      type: 'radio',
      label: 'Data Source',
      defaultValue: 'manual',
      options: [
        { label: 'Manual Cards', value: 'manual' },
        { label: 'Resource Pages', value: 'resources' },
      ],
      admin: {
        layout: 'horizontal',
        description:
          'Choose whether to manually create cards or select from existing resource pages',
      },
    },
    {
      name: 'resourcePages',
      label: 'Select Resource Pages',
      type: 'relationship',
      relationTo: ['blog', 'reports', 'mmedia'],
      hasMany: true,
      filterOptions: ({ relationTo, id }) => {
        if (relationTo === 'blog' || relationTo === 'reports' || relationTo === 'mmedia') {
          const filter: any = {
            pageType: {
              equals: 'individual',
            },
          }
          if (id) {
            filter.id = {
              not_equals: id,
            }
          }
          return filter
        }
        return true
      },
      admin: {
        description:
          'Select blog posts, reports, or multimedia pages to display as cards in the slider',
        condition: (_data, siblingData) => siblingData?.dataSource === 'resources',
      },
    },
    {
      name: 'cards',
      label: 'Listing Cards',
      labels: {
        singular: 'Listing Card',
        plural: 'Listing Cards',
      },
      type: 'array',
      fields: [
        {
          type: 'tabs',
          tabs: [
            {
              label: 'Card Title',
              fields: [
                {
                  name: 'title',
                  type: 'text',
                  localized: true,
                },
              ],
            },
            {
              label: 'Card Description',
              fields: [
                {
                  name: 'desc',
                  type: 'textarea',
                  localized: true,
                },
              ],
            },
            {
              label: 'Card Image',
              fields: [
                {
                  name: 'image',
                  type: 'upload',
                  relationTo: 'mediaCloud',
                },
              ],
            },
            {
              label: 'Card Tags',
              fields: [
                {
                  name: 'tags',
                  type: 'array',
                  fields: [
                    {
                      name: 'tag',
                      type: 'text',
                      localized: true,
                      admin: {
                        placeholder: 'Enter a tag for the listing card',
                      },
                    },
                  ],
                  admin: {
                    components: {
                      RowLabel: {
                        path: 'src/blocks/ListingCardDeck/TagRowLabel.tsx',
                      },
                    },
                  },
                },
              ],
            },
            {
              label: 'Card Link',
              fields: [
                link({
                  appearances: false,
                }),
              ],
            },
          ],
        },
      ],
      admin: {
        description: 'Add listing cards to be displayed in the deck',
        components: {
          RowLabel: {
            path: 'src/blocks/ListingCardDeck/CardRowLabel.tsx',
          },
        },
        condition: (_data, siblingData) => siblingData?.dataSource !== 'resources',
      },
    },
    {
      name: 'buttons',
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
        components: {
          RowLabel: {
            path: 'src/blocks/ListingCardDeck/ButtonRowLabel.tsx',
          },
        },
      },
    },
  ],
}
