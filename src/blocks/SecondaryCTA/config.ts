import { Block } from 'payload'

import { link } from '@/fields/link'

export const SecondaryCTA: Block = {
  slug: 'secondarycta',
  labels: {
    singular: 'Call-to-Action Block',
    plural: 'Call-to-Action Blocks',
  },
  imageURL: '/block_icons/cta-block-icon.gif',
  fields: [
    {
      type: 'row',
      fields: [
        {
          type: 'group',
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
          ],
          admin: {
            width: '50%'
          }
        },
        {
          name: 'contact',
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
          admin: {
            width: '50%'
          }
        },
      ]
    },
    {
      name: 'uiType',
      label: 'CTA Block Design Type',
      type: 'radio',
      options: [
        { label: 'Large Text CTA', value: 'lrg_txt_cta' },
        { label: 'Medium Text CTA', value: 'md_txt_cta' },
        { label: 'Minimal CTA', value: 'min_cta' },
        { label: 'Puffy Beige CTA', value: 'puffy_beige_cta' }
      ],
      defaultValue: 'lrg_txt_cta',
      admin: {
        components: {
          Field: {
            path: 'src/fields/radio/RadioWithImage.tsx',
          }
        }
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
        link({
          appearances: false,
        }),
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