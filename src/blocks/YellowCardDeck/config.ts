import { Block } from "payload";
import { link } from "@/fields/link";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import {
  BoldFeature,
  UnderlineFeature,
  ItalicFeature,
  LinkFeature,
  InlineToolbarFeature,
} from "@payloadcms/richtext-lexical";

export const YellowCardDeck: Block = {
  slug: 'ylwDeck',
  labels: {
    singular: 'Yellow Card Deck',
    plural: 'Yellow Card Decks'
  },
  imageURL: '/block_icons/yellowcarddeck-block-icon.png',
  fields: [
    {
      type: 'row',
      fields: [
        {
          type: 'group',
          fields: [
                {
              name: 'title',
              type: 'text',
              localized: true,
            },
            {
              name: 'align',
              label: 'Select alignment of title and description',
              type: 'radio',
              options: [
                { label: 'Left Align', value: 'left' },
                { label: 'Center Align', value: 'center' },
              ],
              defaultValue: 'center',
              admin: {
                layout: 'horizontal',
              }
            },
          ],
          admin: {
            width: '50%'
          }
        },
        {
          name: 'desc',
          label: 'Description',
          type: 'richText',
          editor: lexicalEditor({
            features: [
              BoldFeature(),
              UnderlineFeature(),
              ItalicFeature(),
              LinkFeature({
                enabledCollections: [ 'grants', 'pages' ],
              }),
              InlineToolbarFeature(),
            ],
            admin: {
              placeholder: 'Start typing your content here ...'
            }
          }),
          localized: true,
          admin: {
            width: '50%'
          }
        },
      ]
    },
    {
      name: 'cards',
      label: 'Yellow Cards',
      labels: {
        singular: 'Yellow Card',
        plural: 'Yellow Cards'
      },
      type: 'array',
      minRows: 1,
      fields: [
        {
          type: 'row',
          fields: [
            {
              type: 'group',
              fields: [
                {
                  name: 'title',
                  type: 'text',
                  localized: true,
                },
                {
                  name: 'subtitle',
                  type: 'text',
                  localized: true,
                },
                {
                  name: 'desc',
                  label: 'Description',
                  type: 'textarea',
                  localized: true,
                },
              ],
              admin: {
                width: '50%'
              },
            },
            {
              type: 'group',
              fields: [
                {
                  name: 'mascot',
                  type: 'upload',
                  relationTo: 'assetCloud',
                  admin: {
                    description: 'Mascot image for the yellow card',
                  },
                },
                {
                  name: 'mascotPos',
                  label: 'Mascot Position',
                  type: 'radio',
                  options: [
                    { label: 'Top Left', value: 'top_left' },
                    { label: 'Center', value: 'center' },
                  ],
                  defaultValue: 'center',
                  admin: {
                    description: 'Position of the mascot image on the yellow card',
                    layout: 'horizontal',
                  }
                }
              ],
              admin: {
                width: '50%'
              },
            }, 
          ]
        },
        {
          name: 'links',
          label: 'Links on the Card',
          labels: {
            singular: 'Link',
            plural: 'Links'
          },
          type: 'array',
          minRows: 1,
          fields: [
            {
              name: 'desc',
              label: 'Link Description',
              type: 'text',
              localized: true,
              admin: {
                width: '30%',
                placeholder: '(optional)'
              }
            },
            link({
              appearances: false,
            }),
          ],
          admin: {
            components: {
              RowLabel: {
                path: 'src/blocks/YellowCardDeck/LinkRowLabel.tsx',
              }
            },
          }
        }    
      ],
      admin: {
        description: 'Add yellow cards to be displayed in the deck',
        components: {
          RowLabel: {
            path: 'src/blocks/YellowCardDeck/CardRowLabel.tsx',
          }
        },
      } 
    }
  ]
}