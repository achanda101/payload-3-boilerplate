import type { CollectionConfig } from 'payload'
import { link } from '@/fields/link'

import { authenticated } from '@/access/authenticated'
import { authenticatedOrPublished } from '@/access/authenticatedOrPublished'
import { translatorLanguageAccess } from '@/access/translatorLanguageAccess'
import { noDeleteForTranslators } from '@/access/noDeleteForTranslators'

import { revalidatePage, revalidateDelete } from './hooks/revalidatePage'
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

export const Pages: CollectionConfig<'pages'> = {
  slug: 'pages',
  labels: {
    singular: 'Page',
    plural: 'Pages',
  },
  access: {
    create: authenticated,
    delete: noDeleteForTranslators,
    read: authenticatedOrPublished,
    update: translatorLanguageAccess,
  },
  admin: {
    group: {
      name: 'Content',
      order: '5',
    },
    defaultColumns: ['heroTitle', 'bgType', 'heroColour', 'mascot', '_status', 'folder'],
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
      name: 'createdBy',
      type: 'relationship',
      relationTo: 'users',
      admin: {
        position: 'sidebar',
        description: 'User who created this page',
        readOnly: true,
      },
      hooks: {
        beforeChange: [
          ({ req, operation, value }) => {
            // Only set on create, never update
            if (operation === 'create' && !value && req.user) {
              return req.user.id
            }
            return value
          },
        ],
      },
    },
    {
      name: 'updatedBy',
      type: 'relationship',
      relationTo: 'users',
      admin: {
        position: 'sidebar',
        description: 'User who last updated this page',
        readOnly: true,
      },
      hooks: {
        beforeChange: [
          ({ req, value }) => {
            // Always update to current user on any change
            if (req.user) {
              return req.user.id
            }
            return value
          },
        ],
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
    // Manual SEO fields (Pages removed from seoPlugin as they don't have a cover image for auto-generation)
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
    afterChange: [revalidatePage],
    afterDelete: [revalidateDelete],
  },
}
