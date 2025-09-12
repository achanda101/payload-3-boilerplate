import { Block } from "payload";
import { link } from "@/fields/link";

export const GrantsHeroBlock: Block = {
  slug: 'grantsHeroBlock',
  labels: {
    singular: 'Hero Block',
    plural: 'Hero Blocks'
  },
  imageURL: '/collection_icons/grantspage-hero-block-icon.png',
  fields: [
    {
      type: 'row',
      fields: [
        {
          name: 'title',
          type: 'textarea',
          localized: true,
          admin: {
            placeholder: 'Enter title for the Hero',
            width: '50%'
          },
        },
        {
          name: 'subtitle',
          type: 'textarea',
          localized: true,
          admin: {
            placeholder: 'Enter subtitle for the Hero',
            width: '50%'
          },
        },
      ]
    },
    {
      name: 'heroImage',
      type: 'upload',
      relationTo: 'mediaCloud',
      admin: {
        description: 'Upload a mascot image for the Hero section',
      },
    },
    {
      type: 'row',
      fields: [
        {
          name: 'badgeText',
          type: 'text',
          localized: true,
          admin: {
            description: 'Badge Text (e.g., "Rapid Response Fund") or the date of availability (e.g., "Applications open until 15th June")',
            width: '50%'
          },
        },
        {
          name: 'badgeType',
          type: 'select',
          options: [
            { label: 'Information (orange)', value: 'info' },
            { label: 'Important (red)', value: 'imp' }
          ],
          defaultValue: 'info',
          admin: {
            width: '50%'
          }
        },
      ],
      admin: {
        style: {
          backgroundColor: '#f1f6fa',
          paddingBlock: '8px',
          paddingInline: '10px',
          border: '1px solid #dee2e6',
          borderRadius: '8px',
          marginBottom: '5px'
        }
      }
    },
    {
      name: 'headerColour',
      type: 'select',
      options: [
        { label: 'Transparent', value: 'blank' },
        { label: 'Forest Green', value: 'forest' },
        { label: 'Turmeric Yellow', value: 'turmeric' },
        { label: 'Sky Blue', value: 'sky' },
        { label: 'Rose Pink', value: 'rose'},
      ],
      defaultValue: 'blank'
    },
    {
      name: 'heroButtons',
      labels: {
        singular: 'Hero Button',
        plural: 'Hero Buttons'
      },
      type: 'array',
      maxRows: 2,
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'buttonPrimary',
              type: 'checkbox',
              defaultValue: false,
              admin: {
                description: 'Is it a primary button? (dark coloured)',
              }
            },
            link({
              appearances: false,
            }),
          ]
        },
      ],
      admin: {
        components: {
          RowLabel: {
            path: 'src/blocks/GrantsHeroBlock/HeroButtonRowLabel.tsx',
          }
        },
      }
    },
    {
      name: 'heroContact',
      type: 'group',
      fields: [
        {
          name: 'label',
          type: 'text',
          localized: true,
        },
        {
          name: 'email',
          type: 'email',
        }
      ],
    },
  ],
}