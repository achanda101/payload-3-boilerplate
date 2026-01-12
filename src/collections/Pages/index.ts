import type { CollectionConfig } from 'payload'
import { link } from '@/fields/link'

import { authenticated } from '@/access/authenticated'
import { authenticatedOrPublished } from '@/access/authenticatedOrPublished'

import { revalidatePage } from './hooks/revalidatePage'
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

export const Pages: CollectionConfig<'pages'> = {
  slug: 'pages',
  labels: {
    singular: 'Page',
    plural: 'Pages',
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
      order: '5',
    },
    defaultColumns: ['title', 'mascot', 'bgType', 'heroColour', '_status', 'folder'],
    livePreview: {
      url: ({ data, locale }) => {
        const path = generatePreviewPath({
          slug: typeof data?.slug === 'string' ? data.slug : '',
          collection: 'pages',
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
      name: 'title',
      label: 'Title of page',
      type: 'text',
      required: true,
      unique: true,
      admin: {
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
          label: 'Hero Background Design Type',
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
          type: 'row',
          fields: [
            {
              name: 'heroColour',
              type: 'select',
              options: [
                { label: 'Forest Green', value: 'forest' },
                { label: 'Turmeric Yellow', value: 'turmeric' },
                { label: 'Sky Blue', value: 'sky' },
                { label: 'Rose Pink', value: 'rose' },
                { label: 'Lavender', value: 'lavender' },
                { label: 'Fire Red', value: 'fire' },
                { label: 'Transparent', value: 'trans' },
              ],
              defaultValue: 'forest',
              admin: {
                description: 'Select a colour for the Hero background.',
                width: '50%',
              },
            },
            {
              name: 'mascot',
              type: 'upload',
              relationTo: 'assetCloud',
              admin: {
                description: 'Upload a mascot image for the Hero section.',
                width: '50%',
                components: {
                  Cell: 'src/collections/AssetCloudCell',
                },
              },
            },
          ],
          admin: {
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
        {
          type: 'row',
          fields: [
            {
              name: 'label',
              type: 'text',
              localized: true,
              admin: {
                description: 'Contact Label',
                width: '50%',
              },
            },
            {
              name: 'email',
              type: 'email',
              admin: {
                description: 'Contact Email',
                width: '50%',
              },
            },
          ],
          admin: {
            disableListColumn: true,
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
    afterChange: [revalidatePage],
  },
}
