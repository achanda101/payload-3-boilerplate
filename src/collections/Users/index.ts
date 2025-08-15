import type { CollectionConfig } from 'payload'

import { authenticated } from '../../access/authenticated'
import { upload } from 'node_modules/payload/dist/fields/validations'

export const Users: CollectionConfig = {
  slug: 'users',
  access: {
    admin: authenticated,
    create: authenticated,
    delete: authenticated,
    read: authenticated,
    update: authenticated,
  },
  admin: {
    defaultColumns: ['name', 'email', 'role'],
    useAsTitle: 'name',
  },
  auth: true,
  fields: [
    {
      name: 'name',
      type: 'text',
    },
    // {
    //   name: 'avatar',
    //   type: 'upload',
    //   relationTo: 'media',
    //   admin: {
    //     description: 'Upload a profile picture',
    //   },
    // },
    {
      name: 'role',
      type: 'select',
      options: [
        { label: 'Admin', value: 'admin' },
        { label: 'Editor', value: 'editor' },
        { label: 'Writer', value: 'writer' },
      ],
      defaultValue: 'writer',
    },
  ],
  timestamps: true,
}
