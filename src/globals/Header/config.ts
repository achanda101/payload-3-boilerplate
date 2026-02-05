import type { GlobalConfig } from 'payload'

import { revalidateHeader } from './hooks/revalidateHeader'
import languageOptions from './languageOptions.json'
import { link } from '@/fields/link'

export const Header: GlobalConfig = {
  slug: 'header',
  label: 'Header: Logo, Languages, Search & Announcement Banner',
  access: {
    read: () => true,
  },
  admin: {
    group: {
      name: 'Site Settings',
      order: '1',
    },
  },
  fields: [
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'assetCloud',
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
            },
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
            },
          },
        },
      ],
    },
    {
      name: 'showBanner',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description: 'Enable announcement banner at the top of every page',
        style: {
          backgroundColor: '#f1f6fa',
          padding: '20px',
          border: '1px solid #dee2e6',
          borderRadius: '8px',
        },
      },
      label: 'Show Announcement Banner',
    },
    {
      name: 'banner',
      type: 'group',
      label: 'Announcement Banner',
      admin: {
        description: 'Configure the announcement banner displayed at the top of every page.',
        condition: (data) => data.showBanner === true,
        style: {
          backgroundColor: '#f1f6fa',
          padding: '20px 60px',
          border: '1px solid #dee2e6',
          borderRadius: '8px',
        },
      },
      fields: [
        {
          name: 'text',
          type: 'text',
          localized: true,
          admin: {
            placeholder: 'e.g. Applications for Rapid Response Grants are now open!',
            description: 'Banner announcement text',
          },
        },
        link({ appearances: false }),
      ],
    },
  ],
  hooks: {
    afterChange: [revalidateHeader],
  },
}
