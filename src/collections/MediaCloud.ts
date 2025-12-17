import type { CollectionConfig } from 'payload'

import path from 'path'
import { fileURLToPath } from 'url'

import { anyone } from '../access/anyone'
import { authenticated } from '../access/authenticated'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export const MediaCloud: CollectionConfig = {
  slug: 'mediaCloud',
  labels: {
    singular: 'Image',
    plural: 'Images',
  },
  admin: {
    group: {
      name: 'Media',
      order: '1',
    },
    defaultColumns: ['filename', 'alt', 'folder'],
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
    // Upload to local directory when S3 is disabled
    ...(process.env.S3_ENABLED === 'false' && {
      staticDir: path.resolve(dirname, '../../media'),
    }),
    adminThumbnail: 'small',
    imageSizes: [
      {
        name: 'thumbnail',
        width: 50,
        height: undefined,
        fit: 'cover',
        formatOptions: {
          format: 'webp',
        },
      },
      {
        name: 'small',
        width: 300,
        height: undefined,
        fit: 'cover',
        formatOptions: {
          format: 'webp',
        },
      },
      {
        name: 'medium',
        width: 900,
        height: undefined,
        fit: 'cover',
        formatOptions: {
          format: 'webp',
        },
      },
      {
        name: 'large',
        width: 1400,
        height: undefined,
        fit: 'cover',
        formatOptions: {
          format: 'webp',
        },
      },
      {
        name: 'xlarge',
        width: 1920,
        height: undefined,
        fit: 'cover',
        formatOptions: {
          format: 'webp',
        },
      },
      {
        name: 'ogImage',
        width: 200,
        height: 200,
        fit: 'cover',
        formatOptions: {
          format: 'jpg',
        },
      },
    ],
    mimeTypes: ['image/*'],
  },
}
