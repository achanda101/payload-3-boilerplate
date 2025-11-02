import type { GlobalConfig } from "payload";
import { authenticatedOrPublished } from '@/access/authenticatedOrPublished'
import { canUpdateUser } from '@/access/canUpdateUser'
import { revalidateHomepage } from "./hooks/revalidateHomepage";
import { link } from '@/fields/link'

// BLOCKS
import { MultiColumnInfoBlock } from '@/blocks/MultiColumnInfoBlock/config'
import { GrantCardGridBlock } from "@/blocks/GrantCardGridBlock/config"
import { MultiStepProcess } from "@/blocks/MultiStepProcessBlock/config"
import { ComparisonBlock } from '@/blocks/ComparisonBlock/config'
import { YellowCardDeck } from '@/blocks/YellowCardDeck/config'
import { FeatureCard } from '@/blocks/FeatureCard/config'
import { FeatureCardAccordion } from '@/blocks/FeatureCardAccordion/config'
import { ListingCardDeck } from '@/blocks/ListingCardDeck/config'
import { FaqBlock } from '@/blocks/FaqBlock/config'
import { SecondaryCTA } from '@/blocks/SecondaryCTA/config'


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
      blocks: [
          SecondaryCTA,
          MultiColumnInfoBlock,
          GrantCardGridBlock,
          MultiStepProcess,
          ComparisonBlock,
          YellowCardDeck,
          FeatureCard,
          FeatureCardAccordion,
          ListingCardDeck,
          FaqBlock,
        ],
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