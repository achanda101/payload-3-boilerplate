import type { GlobalConfig } from 'payload'
import { authenticatedOrPublished } from '@/access/authenticatedOrPublished'
import { canUpdateUser } from '@/access/canUpdateUser'
import { revalidateHomepage } from './hooks/revalidateHomepage'
import { link } from '@/fields/link'
import { getServerSideURL } from '@/utilities/getURL'

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
import { MinimalCardGallery } from '@/blocks/MinimalCardGallery/config'
import { IDCardGallery } from '@/blocks/IDCardGallery/config'
import { TwoColumnBlock } from '@/blocks/TwoColumnBlock/config'
import { ThreeColumnTableBlock } from '@/blocks/ThreeColumnTableBlock/config'

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
          type: 'row',
          fields: [
            {
              name: 'heroTitle',
              type: 'textarea',
              localized: true,
              maxLength: 50,
              admin: {
                placeholder: 'Enter the main title for the hero section',
                width: '50%',
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
                width: '50%',
                components: {
                  afterInput: [
                    {
                      path: '@/utilities/characterCounter.tsx',
                    },
                  ],
                },
              },
            },
          ],
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
        MinimalCardGallery,
        IDCardGallery,
        TwoColumnBlock,
        ThreeColumnTableBlock,
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
    // Manual SEO fields (seoPlugin has a bug with globals causing circular reference error)
    {
      name: 'meta',
      type: 'group',
      label: 'SEO',
      fields: [
        {
          name: 'title',
          type: 'text',
          label: 'Meta Title',
          admin: {
            description:
              'Title for search engines and social sharing. Recommended: 50-60 characters.',
          },
        },
        {
          name: 'description',
          type: 'textarea',
          label: 'Meta Description',
          admin: {
            description:
              'Description for search engines and social sharing. Recommended: 120-160 characters.',
          },
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'mediaCloud',
          label: 'Meta Image',
          filterOptions: {
            mimeType: {
              in: ['image/png', 'image/jpeg', 'image/gif'],
            },
          },
          admin: {
            description:
              'Image for social sharing. Only PNG, JPG, and GIF formats are supported for meta images.',
          },
        },
        {
          name: 'preview',
          type: 'ui',
          admin: {
            components: {
              Field: {
                path: 'src/components/SeoPreview/index.tsx#SeoPreviewComponent',
                clientProps: {
                  titlePath: 'meta.title',
                  descriptionPath: 'meta.description',
                  imagePath: 'meta.image',
                  hasGenerateURLFn: false,
                },
              },
            },
          },
          label: 'Preview',
        },
      ],
      admin: {
        description: 'SEO settings for the homepage.',
      },
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
