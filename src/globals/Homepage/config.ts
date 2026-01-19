import type { GlobalConfig } from 'payload'
import { authenticatedOrPublished } from '@/access/authenticatedOrPublished'
import { canUpdateUser } from '@/access/canUpdateUser'
import { revalidateHomepage } from './hooks/revalidateHomepage'
import { link } from '@/fields/link'
import { getServerSideURL } from '@/utilities/getURL'

import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from '@payloadcms/plugin-seo/fields'

// BLOCKS
import { MultiColumnInfoBlock } from '@/blocks/MultiColumnInfoBlock/config'
import { GrantCardGridBlock } from '@/blocks/GrantCardGridBlock/config'
import { MultiStepProcess } from '@/blocks/MultiStepProcessBlock/config'
import { ComparisonBlock } from '@/blocks/ComparisonBlock/config'
import { YellowCardDeck } from '@/blocks/YellowCardDeck/config'
import { FeatureCard } from '@/blocks/FeatureCard/config'
import { FeatureCardAccordion } from '@/blocks/FeatureCardAccordion/config'
import { ListingCardDeck } from '@/blocks/ListingCardDeck/config'
import { FaqBlock } from '@/blocks/FaqBlock/config'
import { SecondaryCTA } from '@/blocks/SecondaryCTA/config'
import { RichContentBlock } from '@/blocks/RichContentBlock/config'
import { PinkPuffyCallOut } from '@/blocks/PinkPuffyCallOut/config'
import { BeigePuffyCallOut } from '@/blocks/BeigePuffyCallOut/config'
import { FundingMap } from '@/blocks/FundingMap/config'
import { ResourceFeatureCard } from '@/blocks/ResourceFeatureCard/config'
import { ResourceGallery } from '@/blocks/ResourceGallery/config'
import { PillarCard } from '@/blocks/PillarCard/config'
import { TestimonialCardDeck } from '@/blocks/TestimonialCardDeck/config'

export const Homepage: GlobalConfig = {
  slug: 'homepage',
  label: 'Homepage',
  access: {
    read: authenticatedOrPublished,
    update: canUpdateUser,
    readVersions: canUpdateUser,
  },
  admin: {
    group: {
      name: 'Content',
      order: '1',
    },
    livePreview: {
      url: () => {
        const params = new URLSearchParams({
          path: '/',
          collection: 'homepage',
          slug: 'homepage',
        })
        return `${getServerSideURL()}/next/preview?${params.toString()}`
      },
    },
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
              maxLength: 50,
              admin: {
                placeholder: 'Enter the main title for the hero section',
                components: {
                  afterInput: [
                    {
                      path: '@/utilities/characterCounter.tsx',
                    },
                  ],
                },
              },
            },
            {
              name: 'heroSubtitle',
              type: 'textarea',
              localized: true,
              maxLength: 250,
              admin: {
                placeholder: 'Enter a subtitle for the hero section',
                components: {
                  afterInput: [
                    {
                      path: '@/utilities/characterCounter.tsx',
                    },
                  ],
                },
              },
            },
            {
              name: 'ctaButton',
              labels: {
                singular: 'CTA Button',
                plural: 'CTA Buttons',
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
                  },
                },
              },
            },
          ],
        },
      ],
    },
    {
      type: 'blocks',
      name: 'contentBlocks',
      label: 'Content Blocks',
      blocks: [
        RichContentBlock,
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
        PinkPuffyCallOut,
        BeigePuffyCallOut,
        FundingMap,
        ResourceFeatureCard,
        ResourceGallery,
        PillarCard,
        TestimonialCardDeck,
      ],
      labels: {
        singular: 'A Content Block',
        plural: 'Content Blocks',
      },
      admin: {
        initCollapsed: true,
        isSortable: true,
      },
    },
    {
      type: 'group',
      name: 'meta',
      label: 'SEO',
      fields: [
        OverviewField({
          titlePath: 'meta.title',
          descriptionPath: 'meta.description',
          imagePath: 'meta.image',
        }),
        MetaTitleField({
          hasGenerateFn: false,
        }),
        MetaImageField({
          relationTo: 'mediaCloud',
          overrides: {
            admin: {
              description:
                'Recommended file size for images is <500KB. Image must have a minimum width of 800px for optimal social media display and should be a .jpg, .png.',
            },
          },
        }),

        MetaDescriptionField({
          hasGenerateFn: false,
        }),
        PreviewField({
          // if the `generateUrl` function is configured
          hasGenerateFn: true,

          // field paths to match the target field for data
          titlePath: 'meta.title',
          descriptionPath: 'meta.description',
        }),
      ],
    },
  ],
  versions: {
    drafts: {
      autosave: false,
    },
  },
  hooks: {
    afterChange: [revalidateHomepage],
  },
}
