import type { CollectionConfig } from 'payload'

import { anyone } from '../access/anyone'
import { authenticated } from '../access/authenticated'

import path from 'path'
import { fileURLToPath } from 'url'
const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export const Documents: CollectionConfig = {
  slug: 'documents',
  labels: {
    singular: 'Document',
    plural: 'Documents',
  },
  admin: {
    group: {
      name: 'Media',
      order: '3',
    },
    defaultColumns: ['filename', 'alt', 'folder'],
    description: 'Upload and manage PDF documents. Maximum file size is 50MB.',
  },
  folders: true,
  trash: true,
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
    // Upload to the public/media directory in development, use S3 in production
    ...(process.env.NODE_ENV !== 'production' && {
      staticDir: path.resolve(dirname, '../../media'),
    }),
    adminThumbnail: 'small',
    mimeTypes: ['application/pdf'],
  },
}
