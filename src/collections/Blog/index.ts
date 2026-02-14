import type { CollectionConfig } from 'payload'
import { link } from '@/fields/link'

import { authenticated } from '@/access/authenticated'
import { authenticatedOrPublished } from '@/access/authenticatedOrPublished'

import { revalidateBlog, revalidateDelete } from './hooks/revalidateBlog'
import { slugField } from '@/fields/slug'

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
import { TwoColumnBlock } from '@/blocks/TwoColumnBlock/config'
import { ThreeColumnTableBlock } from '@/blocks/ThreeColumnTableBlock/config'

export const Blog: CollectionConfig<'blog'> = {
  slug: 'blog',
  labels: {
    singular: 'Blogpost',
    plural: 'Blogposts',
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
      order: '6',
    },
    defaultColumns: ['heroTitle', 'pageType', 'docType', 'image', '_status', 'folder'],
    livePreview: {
      url: ({ data, locale }) => {
        const path = generatePreviewPath({
          slug: typeof data?.slug === 'string' ? data.slug : '',
          collection: 'blog',
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
          label: 'Title of Blogpost',
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
                { label: 'Individual Blogpost', value: 'individual' },
              ],
              defaultValue: 'landing',
              admin: {
                layout: 'horizontal',
              },
            },
            {
              name: 'showFilter',
              type: 'checkbox',
              defaultValue: false,
              label: 'Show Blogpost Filter on Landing Page',
              admin: {
                condition: (siblingData) => siblingData?.pageType === 'landing' || false,
              },
            },
            {
              name: 'docType',
              type: 'relationship',
              hasMany: true,
              label: 'Select Resource Type',
              relationTo: 'doctypes',
              required: true,
              admin: {
                condition: (siblingData) => siblingData?.pageType === 'individual' || false,
              },
            },
            {
              name: 'image',
              label: 'Cover Image',
              type: 'upload',
              required: true,
              relationTo: 'mediaCloud',
              admin: {
                description: 'Upload a cover image for the Blogpost',
                condition: (siblingData) => siblingData?.pageType === 'individual' || false,
                components: {
                  Cell: 'src/collections/MediaCloudCell',
                },
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
        disableListColumn: true,
      },
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
    // Manual SEO fields
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
            components: {
              Field: 'src/components/SeoFields/MetaTitleField.tsx#MetaTitleField',
            },
          },
        },
        {
          name: 'description',
          type: 'textarea',
          label: 'Meta Description',
          admin: {
            components: {
              Field: 'src/components/SeoFields/MetaDescriptionField.tsx#MetaDescriptionField',
            },
          },
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'assetCloud',
          label: 'Meta Image',
          filterOptions: {
            mimeType: {
              in: ['image/png', 'image/jpeg', 'image/gif'],
            },
          },
          admin: {
            description:
              'Image for social sharing. Only PNG, JPG, and GIF formats are supported. Select from Assets.',
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
                  uploadsCollection: 'assetCloud',
                },
              },
            },
          },
          label: 'Preview',
        },
      ],
    },
  ],
  versions: {
    drafts: {
      autosave: false,
    },
    maxPerDoc: 50,
  },
  hooks: {
    afterChange: [revalidateBlog],
    afterDelete: [revalidateDelete],
  },
}
