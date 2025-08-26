import type { GlobalConfig } from 'payload'

import { revalidateHeader } from './hooks/revalidateHeader'
import languageOptions from './languageOptions.json'

export const Header: GlobalConfig = {
  slug: 'header',
  label: 'Header: Logo, Languages & Search',
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
      relationTo: 'mediaCloud',
      // required: true,
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
              backgroundColor: '#f1f6fa',
              padding: '20px',
              border: '1px solid #dee2e6',
              borderRadius: '8px',
            }
          },
        },
        {
          name: 'languages',
          type: 'select',
          options: languageOptions,
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
