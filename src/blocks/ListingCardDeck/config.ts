import { Block } from "payload";
import { link } from "@/fields/link";

export const ListingCardDeck: Block = {
  slug: 'listCrdDck',
  labels: {
    singular: 'Listing Card Deck',
    plural: 'Listing Card Decks'
  },
  imageURL: '/block_icons/listingcarddeck-block-icon.png',
  fields: [
    {
      name: 'title',
      type: 'text',
      localized: true,
    },
    {
      name: 'cards',
      label: 'Listing Cards',
      labels: {
        singular: 'Listing Card',
        plural: 'Listing Cards'
      },
      type: 'array',
      minRows: 1,
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
              ]
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
                      }
                    },
                  }
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
            }
          ],
        },
      ],
      admin: {
        description: 'Add listing cards to be displayed in the deck',
        components: {
          RowLabel: {
            path: 'src/blocks/ListingCardDeck/CardRowLabel.tsx',
          }
        },
      }
    },
    {
      name: 'buttons',
      labels: {
        singular: 'Button',
        plural: 'Buttons'
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
          }
        },
      }
    },
  ],
};