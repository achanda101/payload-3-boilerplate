import type { CollectionConfig } from 'payload'

import path from 'path'
import { fileURLToPath } from 'url'

import { anyone } from '../access/anyone'
import { authenticated } from '../access/authenticated'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export const AssetCloud: CollectionConfig = {
  slug: 'assetCloud',
  labels: {
    singular: 'Design Asset',
    plural: 'Design Assets'
  },
  admin: {  
    group: {
      name: 'Media',
      order: '2'
    },
    description: 'Upload and manage design assets like logos, mascots, icons, brand illustrations here.',
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
    imageSizes: [
      {
        name: 'thumbnail',
        width: 50,
        height: 50,
        formatOptions: {
          format: 'webp',
        },
      },
      {
        name: 'small',
        width: 400,
        formatOptions: {
          format: 'webp',
        },
      },
      {
        name: 'medium',
        width: 900,
        formatOptions: {
          format: 'webp',
        },
      },
      {
        name: 'large',
        width: 1400,
        formatOptions: {
          format: 'webp',
        },
      },
      {
        name: 'xlarge',
        width: 1920,
        formatOptions: {
          format: 'webp',
        },
      },
    ],
    mimeTypes: ['image/*'],
  },
}
