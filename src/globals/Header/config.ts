import type { GlobalConfig } from 'payload'

import { revalidateHeader } from './hooks/revalidateHeader'

export const Header: GlobalConfig = {
  slug: 'header',
  access: {
    read: () => true,
  },
  admin: {
    group: 'Site Settings',
  },
   fields: [
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
      required: true,
      admin: {
        description: 'Upload the logo for the header',
      },
    },
    {
      type: 'row',
      fields: [
        {
          name: 'searchEnabled',
          type: 'checkbox',
          defaultValue: true,
          admin: {
            description: 'Enable or disable the search functionality in the header',
            width: '50%',
          },
        },
        {
          name: 'languages',
          type: 'select',
          options: [
            {
              label: 'English',
              value: 'en',
            },
            {
              label: 'Thai',
              value: 'th',
            },
            {
              label: 'Hindi',
              value: 'hn',
            },
          ],
          hasMany: true,
          required: true,
          defaultValue: ['en'],
          admin: {
            description: 'Select languages for the website',
            width: '50%',
          },
        },
      ],
    },
  ],
  hooks: {
    afterChange: [revalidateHeader],
  },
}
