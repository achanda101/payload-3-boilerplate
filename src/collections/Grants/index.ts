import type { CollectionConfig } from 'payload'
import { link } from "@/fields/link"

import { authenticated } from '@/access/authenticated'
import { authenticatedOrPublished } from '@/access/authenticatedOrPublished'

import { MultiColumnInfoBlock } from '@/blocks/MultiColumnInfoBlock/config'
import { SingleColumnInfoBlock } from '@/blocks/SingleColumnInfoBlock/config'
import { GrantCardGridBlock } from "@/blocks/GrantCardGridBlock/config"
import { MultiStepProcess } from "@/blocks/MultiStepProcessBlock/config"
import { ComparisonBlock } from '@/blocks/ComparisonBlock/config'
import { YellowCardDeck } from '@/blocks/YellowCardDeck/config'
import { FeatureCard } from '@/blocks/FeatureCard/config'
import { ListingCardDeck } from '@/blocks/ListingCardDeck/config'

import { revalidateGrant } from './hooks/revalidateGrant'
import { slugField } from '@/fields/slug'

import { generatePreviewPath } from '@/utilities/generatePreviewPath'
import { getServerSideURL } from '@/utilities/getURL'



export const Grants: CollectionConfig<'grants'> = {
  slug: 'grants',
  labels: {
    singular: 'Grant Page',
    plural: 'Grant Pages'
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
    group: 'Content',
    defaultColumns: ['title', 'pageType', 'grantCard', 'bgType'],
    livePreview: {
      url: ({ data }) => {
        const path = generatePreviewPath({
          slug: typeof data?.slug === 'string' ? data.slug : '',
          collection: 'grants',
        })

        return `${getServerSideURL()}${path}`
      },
    },
    useAsTitle: 'title',
  },
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
              marginBottom: '5px'
            }
          }
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
                { label: 'Individual Grant', value: 'individual'}
              ],
              defaultValue: 'landing',
              admin: {
                layout: 'horizontal',
              }
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
              }
            }
          ],
          admin: {
            width: '50%',
            style: {
              backgroundColor: '#f1f6fa',
              paddingBlock: '8px',
              paddingInline: '10px',
              border: '1px solid #dee2e6',
              borderRadius: '8px',
              marginBottom: '5px'
            }
          }
        },
      ]
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
              admin: {
                placeholder: 'Enter title for the Hero',
                width: '50%'
              },
            },
            {
              name: 'heroSubtitle',
              type: 'textarea',
              localized: true,
              admin: {
                placeholder: 'Enter subtitle for the Hero',
                width: '50%'
              },
            },
          ]
        },
        {
          name: 'bgType',
          label: 'Hero Background Design Type',
          type: 'radio',
          options: [
            { label: 'Wavy Top', value: 'wavy_top' },
            { label: 'Wavy Fullscreen', value: 'wavy_full' },
            { label: 'Center Blob', value: 'center_blob' }
          ],
          admin: {
            components: {
              Field: {
                path: 'src/fields/radio/RadioWithImage.tsx',
              }
            }
          },
        },
        {
          name: 'heroButtons',
          labels: {
            singular: 'Hero Button',
            plural: 'Hero Buttons'
          },
          type: 'array',
          maxRows: 2,
          fields: [
            link({
              appearances: false,
            }),
          ],
          admin: {
            disableListColumn: true,
            components: {
              RowLabel: {
                path: 'src/blocks/HeroBlock/HeroButtonRowLabel.tsx',
              }
            },
          }
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
            }
          ],
          admin: {
            disableListColumn: true,
          }
        },
      ]
    },
    {
      type: 'blocks',
      name: 'contentBlocks',
      blocks: [ MultiColumnInfoBlock, SingleColumnInfoBlock, GrantCardGridBlock, MultiStepProcess, ComparisonBlock, YellowCardDeck, FeatureCard, ListingCardDeck],
      labels: {
        singular: 'A Content Block',
        plural: 'Content Blocks'
      },
      admin: {
        initCollapsed: true,
        isSortable: true,
        disableListColumn: true,
      }
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
      autosave: {
        interval: 2000, // Changed from 100ms to 1500ms to prevent flickering
      },
    },
    maxPerDoc: 50,
  },
  hooks: {
      afterChange: [revalidateGrant],
    },
}