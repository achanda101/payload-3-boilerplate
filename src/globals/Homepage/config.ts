import type { GlobalConfig } from "payload";
import { revalidateHomepage } from "./hooks/revalidateHomepage";
import { link } from '@/fields/link'

export const Homepage: GlobalConfig = {
  slug: 'homepage',
  label: 'Homepage',
  access: {
    read: () => true,
  },
  admin: {
    group: {
      name: 'Content',
      order: '1'
    },
    livePreview: {
      url: ({ data }) => `${process.env.PAYLOAD_URL}/preview/${data.globalType}`
    }
  },
  fields: [
    {
      label: 'Hero Section',
      type: 'collapsible',
      admin: {
        initCollapsed: true,
      },
      fields: [
        {
          name: 'heroSection',
          label: '',
          type: 'group',
          fields: [
            {
              name: 'heroTitle',
              type: 'textarea',
              localized: true,
              admin: {
                placeholder: 'Enter the main title for the hero section',
              },
            },
            {
              name: 'heroSubtitle',
              type: 'textarea',
              localized: true,
              admin: {
                placeholder: 'Enter a subtitle for the hero section',
              },
            },
            {
              name: 'ctaButton',
              labels: {
                singular: 'CTA Button',
                plural: 'CTA Buttons'
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
        },
      ]
    }
  ],
  versions: {
    drafts: {
      autosave: {
        interval: 375,
        showSaveDraftButton: true,
      },
    },
  },
  hooks: {
      afterChange: [revalidateHomepage],
  },
}