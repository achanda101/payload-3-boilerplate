import type { CollectionConfig } from 'payload'

import { authenticated } from '@/access/authenticated'
import { canUpdateUser } from '@/access/canUpdateUser'
import { canUnlockUser } from '@/access/canUnlockUser'

export const Users: CollectionConfig = {
  slug: 'users',
  access: {
    admin: authenticated,
    create: canUpdateUser,
    delete: canUpdateUser,
    read: authenticated,
    update: canUpdateUser,
    unlock: canUnlockUser,
  },
  admin: {
    defaultColumns: ['name', 'avatar', 'email', 'role'],
    useAsTitle: 'name',
    group: 'Admin',
  },
  auth: {
    // property controls how deeply "populated"
    // relationship docs are that are stored in the req.user
    depth: 1,
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
        components: {
          Cell: 'src/collections/Users/AvatarCell',
        },
      },
    },
    {
      name: 'role',
      type: 'select',
      options: [
        { label: 'Admin', value: 'admin' },
        { label: 'Editor', value: 'editor' },
        { label: 'Writer', value: 'writer' },
        { label: 'Translator', value: 'translator' },
      ],
      defaultValue: 'editor',
    },
    {
      name: 'assignedLanguages',
      type: 'select',
      hasMany: true,
      options: [
        { label: 'English', value: 'en' },
        { label: 'Arabic', value: 'ar' },
        { label: 'Bahasa Indonesia', value: 'bi' },
        { label: 'Bangla', value: 'bn-IN' },
        { label: 'Burmese', value: 'br' },
        { label: 'Mandarin', value: 'ch' },
        { label: 'Dari', value: 'prs-Arab' },
        { label: 'Khmer', value: 'km' },
        { label: 'Hindi', value: 'hi' },
        { label: 'Malay', value: 'ms' },
        { label: 'Nepali', value: 'ne' },
        { label: 'Pashto', value: 'ps-Arab' },
        { label: 'Pidgin English', value: 'pcm' },
        { label: 'Sinhala', value: 'si' },
        { label: 'Tagalog', value: 'tl' },
        { label: 'Tamil', value: 'ta' },
        { label: 'Thai', value: 'th' },
        { label: 'Vietnamese', value: 'vi' },
        { label: 'Urdu', value: 'ur' },
      ],
      admin: {
        description: 'Languages this user can edit (only applicable for Translator role)',
        condition: (data) => data?.role === 'translator',
      },
    },
    {
      name: 'twoFactorInfo',
      type: 'ui',
      admin: {
        components: {
          Field: 'src/collections/Users/TwoFactorInfoField',
        },
      },
    },
  ],
  timestamps: true,
}
