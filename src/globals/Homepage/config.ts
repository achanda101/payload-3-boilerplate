import type { GlobalConfig } from "payload";
import { authenticatedOrPublished } from '@/access/authenticatedOrPublished'
import { canUpdateUser } from '@/access/canUpdateUser'
import { revalidateHomepage } from "./hooks/revalidateHomepage";
import { link } from '@/fields/link'


export const Homepage: GlobalConfig = {
  slug: 'homepage',
  label: 'Homepage',
  access: {
    read: authenticatedOrPublished,
    update: canUpdateUser,
    readVersions: canUpdateUser
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
      label: 'Hero Block',
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
        },
      ]
    },
    {
      type: 'blocks',
      name: 'contentBlocks',
      label: 'Content Blocks',
      blockReferences: [
        'secondarycta',
        'mcolInfoBlock',
        'grantCardGridBlock',
        'mstepProcess',
        'comparisonBlk',
        'ylwDeck',
        'featCrd',
        'listCrdDck',
        'faqBlk',
      ],
      blocks: [],
      labels: {
        singular: 'A Content Block',
        plural: 'Content Blocks'
      },
      admin: {
        initCollapsed: true,
        isSortable: true,
      },
    },
  ],
  versions: {
    drafts: {
      autosave: {
        interval: 2000,
        showSaveDraftButton: true,
      },
    },
  },
  hooks: {
      afterChange: [revalidateHomepage],
  },
}