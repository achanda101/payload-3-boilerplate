import type { CollectionConfig } from 'payload'

import { authenticated } from '@/access/authenticated'
import { authenticatedOrPublished } from '@/access/authenticatedOrPublished'
import { canUpdateUser } from '@/access/canUpdateUser'

import { GrantsHeroBlock } from "@/blocks/GrantsHeroBlock/config"
import { MultiColumnInfoBlock } from '@/blocks/MultiColumnInfoBlock/config'
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
    delete: canUpdateUser,
    read: authenticatedOrPublished,
    update: canUpdateUser,
  },
  admin: {
    group: 'Content',
    defaultColumns: ['title', 'updatedAt', '_status'],
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
      name: 'title',
      label: 'Title of Grant page',
      type: 'text',
      required: true,
      localized: true,
      unique: true
    },
    {
      type: 'blocks',
      name: 'heroBlock',
      blocks: [ GrantsHeroBlock ],
      labels: {
        singular: 'A Grant Page Hero Block',
        plural: 'Grant Page Hero Blocks'
      },
      maxRows: 1,
      admin: {
        initCollapsed: true,
      }
    },
    {
      type: 'blocks',
      name: 'contentBlocks',
      blocks: [ MultiColumnInfoBlock ],
      labels: {
        singular: 'A Content Block',
        plural: 'Content Blocks'
      },
      admin: {
        initCollapsed: true,
        isSortable: true
      }
    },
    {
      name: 'publishedAt',
      type: 'date',
      admin: {
        date: {
          pickerAppearance: 'dayAndTime',
        },
        position: 'sidebar'
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
        interval: 2000, // Changed from 100ms to 2000ms to prevent flickering
      },
    },
    maxPerDoc: 50,
  },
  hooks: {
      afterChange: [revalidateGrant],
    },
}