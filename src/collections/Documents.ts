import type { CollectionConfig } from 'payload'

import { anyone } from '../access/anyone'
import { authenticated } from '../access/authenticated'


export const Documents: CollectionConfig = {
  slug: 'documents',
  labels: {
    singular: 'Document',
    plural: 'Documents'
  },
  admin: {
    group: {
      name: 'Media',
      order: '3'
    },
    description: 'Upload and manage documents like PDFs, Word files, text files here. Maximum file size is 50MB.',
  },
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
    },
    {
      name: 'caption',
      type: 'text',
    },
  ],
  upload: {
    adminThumbnail: 'small',
    mimeTypes: [ 'application/pdf', 'application/msword', 'text/plain' ],
  }
}
