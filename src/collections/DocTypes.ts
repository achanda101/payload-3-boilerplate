import type { CollectionConfig } from 'payload'

import { anyone } from '../access/anyone'
import { authenticated } from '../access/authenticated'

export const DocTypes: CollectionConfig = {
  slug: 'doctypes',
  labels: {
    singular: 'Resource Type',
    plural: 'Resource Types',
  },
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  admin: {
    useAsTitle: 'type',
    defaultColumns: ['type', 'createdAt', 'updatedAt'],
    group: {
      name: 'Content',
      order: '4',
    },
  },
  fields: [
    {
      name: 'type',
      label: 'Resource Type',
      type: 'text',
      localized: true,
      required: true,
      admin: {
        description:
          'Enter resource type e.g. Blog, Report, Annual Report, Learning Report, Video, Audio etc.',
      },
    },
  ],
}
