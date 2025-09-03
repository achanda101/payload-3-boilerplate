import type { GlobalConfig } from "payload";
import { revalidateHomepage } from "./hooks/revalidateHomepage";
import { link } from '@/fields/link'

export const Homepage: GlobalConfig = {
  slug: 'homepage',
  label: 'Homepage',
  admin: {
    group: 'Content',
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
              type: 'text',
              admin: {
                placeholder: 'Enter the main title for the hero section',
              },
            },
            {
              name: 'heroSubtitle',
              type: 'text',
              admin: {
                placeholder: 'Enter a subtitle for the hero section',
              },
            },
            {
              name: 'ctaButtonText',
              type: 'text',
              admin: {
                placeholder: 'Enter the text for the CTA button in hero section',
              },
            },
            link({
                  appearances: false,
            }),
          ]
        },
      ]
    }
  ],
  timestamps: true,
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