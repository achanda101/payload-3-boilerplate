import type { GlobalConfig } from "payload";
import { authenticated } from '@/access/authenticated'
import { authenticatedOrPublished } from '@/access/authenticatedOrPublished'
import { canUpdateUser } from '@/access/canUpdateUser'
import { revalidateHomepage } from "./hooks/revalidateHomepage";
import { link } from '@/fields/link'
import { SecondaryCTA } from "@/blocks/SecondaryCTA/config";

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
      name: 'secondaryCTA',
      label: 'Call-to-Action Blocks',
      blocks: [ SecondaryCTA ],
      labels: {
        singular: 'A Call-to-Action Block',
        plural: 'Call-to-Action Blocks'
      },
      admin: {
        initCollapsed: true,
        isSortable: true,
      },
    },
    {
      name: 'grantCards',
      label: 'Grant Cards',
      type: 'relationship',
      relationTo: 'grantcards',
      hasMany: true,
      admin: {
        description: 'Select grants to feature on the homepage in the order you want them to appear.',
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