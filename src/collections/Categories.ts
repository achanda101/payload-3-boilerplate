import type { CollectionConfig } from 'payload'

import { anyone } from '../access/anyone'
import { authenticated } from '../access/authenticated'

export const Categories: CollectionConfig = {
  slug: 'categories',
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  admin: {
    hidden: true,
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      label: 'Category Type',
      type: 'text',
      localized: true,
      required: true,
      admin: {
        description:
          'Enter document type e.g. Blog, Report, Annual Report, Learning Report, Video, Audio etc.',
      },
    },
  ],
}
