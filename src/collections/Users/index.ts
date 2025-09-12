import type { CollectionConfig } from 'payload'

import { authenticated } from '@/access/authenticated'
import { canUpdateUser } from '@/access/canUpdateUser'
import { canUnlockUser } from '@/access/canUnlockUser'
import { upload } from 'node_modules/payload/dist/fields/validations'

export const Users: CollectionConfig = {
  slug: 'users',
  access: {
    admin: authenticated,
    create: canUpdateUser,
    delete: canUpdateUser,
    read: authenticated,
    update: canUpdateUser,
    unlock: canUnlockUser
  },
  admin: {
    defaultColumns: ['name', 'email', 'role'],
    useAsTitle: 'name',
    group: 'Admin',
  },
  auth: {
    // property controls how deeply "populated"
    // relationship docs are that are stored in the req.user
    depth: 1
  },
  fields: [
    {
      name: 'name',
      type: 'text',
    },
    {
      name: 'avatar',
      type: 'upload',
      relationTo: 'mediaCloud',
      admin: {
        description: 'Upload a profile picture',
      },
    },
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
