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
            width: '35%',
            style: {
              backgroundColor: '#f8f9fa',
              padding: '20px',
              border: '1px solid #dee2e6',
              borderRadius: '8px',
            }
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
            {
              label: 'Indonesian',
              value: 'in',
            },
            {
              label: 'Nepali',
              value: 'np',
            },
            {
              label: 'Khmer',
              value: 'kh',
            },
          ],
          hasMany: true,
          required: true,
          defaultValue: ['en'],
          admin: {
            description: 'Select languages for the website',
            width: '65%',
            style: {
              padding: '20px',
              border: '1px solid #dee2e6',
              borderRadius: '8px',
            }
          },
        },
      ],
    },
  ],
  hooks: {
    afterChange: [revalidateHeader],
  },
}
