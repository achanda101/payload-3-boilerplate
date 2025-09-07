import { Block } from 'payload'

import { link } from '@/fields/link'

export const SecondaryCTA: Block = {
  slug: 'secondarycta',
  labels: {
    singular: 'Secondary CTA Block',
    plural: 'Secondary CTA Blocks',
  },
  imageURL: '/collection_icons/secondaryCTABlock-icon.png',
  fields: [
    {
      name: 'ctaTitle',
      type: 'textarea',
      localized: true,
      admin: {
        placeholder: 'Enter title for the CTA Block',
      },
    },
    {
      name: 'ctaSubtitle',
      type: 'textarea',
      localized: true,
      admin: {
        placeholder: 'Enter subtitle for the CTA Block',
      },
    },
    {
      name: 'ctaButton',
      labels: {
        singular: 'CTA Button',
        plural: 'CTA Buttons'
      },
      type: 'array',
      minRows: 1,
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
                width: '30%',
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
            path: 'src/globals/Homepage/CtaButtonRowLabel.tsx',
          }
        },
      }
    }, 
  ]
}