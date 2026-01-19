import type { CollectionConfig } from 'payload'
import { link } from '@/fields/link'

import { authenticated } from '@/access/authenticated'
import { authenticatedOrPublished } from '@/access/authenticatedOrPublished'

import { revalidateGrant } from './hooks/revalidateGrant'
import { slugField } from '@/fields/slug'
import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from '@payloadcms/plugin-seo/fields'

import { generatePreviewPath } from '@/utilities/generatePreviewPath'
import { getServerSideURL } from '@/utilities/getURL'

// BLOCKS
import { MultiColumnInfoBlock } from '@/blocks/MultiColumnInfoBlock/config'
import { SecondaryCTA } from '@/blocks/SecondaryCTA/config'
import { GrantCardGridBlock } from '@/blocks/GrantCardGridBlock/config'
import { MultiStepProcess } from '@/blocks/MultiStepProcessBlock/config'
import { ComparisonBlock } from '@/blocks/ComparisonBlock/config'
import { YellowCardDeck } from '@/blocks/YellowCardDeck/config'
import { FeatureCard } from '@/blocks/FeatureCard/config'
import { FeatureCardAccordion } from '@/blocks/FeatureCardAccordion/config'
import { ListingCardDeck } from '@/blocks/ListingCardDeck/config'
import { FaqBlock } from '@/blocks/FaqBlock/config'
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

export const Grants: CollectionConfig<'grants'> = {
  slug: 'grants',
  labels: {
    singular: 'Grant Page',
    plural: 'Grant Pages',
  },
  access: {
    create: authenticated,
    //TODO: Grant - Fix RBAC for delete
    delete: authenticated,
    read: authenticatedOrPublished,
    //TODO: Grant - Fix RBAC - writer should be able to update only their records
    update: authenticated,
  },
  admin: {
    group: {
      name: 'Content',
      order: '2',
    },
    defaultColumns: ['title', 'pageType', 'grantCard', 'bgType', '_status', 'folder'],
    livePreview: {
      url: ({ data, locale }) => {
        const path = generatePreviewPath({
          slug: typeof data?.slug === 'string' ? data.slug : '',
          collection: 'grants',
          locale: locale?.code,
        })

        return `${getServerSideURL()}${path}`
      },
    },
    useAsTitle: 'title',
  },
  folders: true,
  trash: true,
  fields: [
    {
      type: 'row',
      fields: [
        {
          name: 'title',
          label: 'Title of Grant page',
          type: 'text',
          required: true,
          unique: true,
          admin: {
            width: '50%',
            style: {
              paddingBlock: '8px',
              paddingInline: '10px',
              border: '1px solid #dee2e6',
              borderRadius: '8px',
              marginBottom: '5px',
            },
          },
        },
        {
          type: 'group',
          fields: [
            {
              name: 'pageType',
              label: 'Select Page Type',
              required: true,
              type: 'radio',
              options: [
                { label: 'Landing Page', value: 'landing' },
                { label: 'Individual Grant', value: 'individual' },
              ],
              defaultValue: 'landing',
              admin: {
                layout: 'horizontal',
              },
            },
            {
              name: 'grantCard',
              type: 'relationship',
              hasMany: false,
              label: 'Select related Grant Card',
              relationTo: 'grantcards',
              required: true,
              admin: {
                condition: (siblingData) => siblingData?.pageType === 'individual' || false,
              },
            },
          ],
          admin: {
            width: '50%',
            style: {
              backgroundColor: '#f1f6fa',
              paddingBlock: '8px',
              paddingInline: '10px',
              border: '1px solid #dee2e6',
              borderRadius: '8px',
              marginBottom: '5px',
            },
          },
        },
      ],
    },
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
              maxLength: 60,
              admin: {
                placeholder: 'Enter title for the Hero',
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
                placeholder: 'Enter subtitle for the Hero',
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
          name: 'bgType',
          label: 'Hero Background Design',
          type: 'radio',
          options: [
            { label: 'Wavy Top', value: 'wavy_top' },
            { label: 'Wavy Fullscreen', value: 'wavy_full' },
            { label: 'Center Blob', value: 'center_blob' },
          ],
          admin: {
            components: {
              Field: {
                path: 'src/fields/radio/RadioWithImage.tsx',
              },
            },
          },
        },
        {
          name: 'heroButtons',
          labels: {
            singular: 'Hero Button',
            plural: 'Hero Buttons',
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
                path: 'src/blocks/HeroBlock/HeroButtonRowLabel.tsx',
              },
            },
          },
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
            },
          ],
          admin: {
            disableListColumn: true,
          },
        },
      ],
    },
    {
      type: 'blocks',
      name: 'contentBlocks',
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
      ],
      labels: {
        singular: 'A Content Block',
        plural: 'Content Blocks',
      },
      admin: {
        initCollapsed: true,
        isSortable: true,
        disableListColumn: true,
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
          hasGenerateFn: true,
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
          hasGenerateFn: true,
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
    {
      name: 'publishedAt',
      type: 'date',
      admin: {
        date: {
          pickerAppearance: 'dayAndTime',
        },
      },
      hooks: {
        beforeChange: [
          ({ siblingData, value }) => {
            if (siblingData._status === 'published' && !value) {
              return new Date()
            }
            return value
          },
        ],
      },
    },
    ...slugField(),
  ],
  versions: {
    drafts: {
      autosave: false,
    },
    maxPerDoc: 50,
  },
  hooks: {
    afterChange: [revalidateGrant],
  },
}
