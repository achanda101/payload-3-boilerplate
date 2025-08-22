import type { GlobalConfig } from 'payload'

import { revalidateHeader } from './hooks/revalidateHeader'

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
              label: 'Arabic',
              value: 'ar',
            },
            {
              label: 'Bahasa Indonesia',
              value: 'bi',
            },
            {
              label: 'Bangla',
              value: 'bn-IN',
            },
            {
              label: 'Burmese',
              value: 'br',
            },
            {
              label: 'Chinese Simplified',
              value: 'ch',
            },
            {
              label: 'Dari',
              value: 'prs-Arab',
            },
            {
              label: 'Khmer',
              value: 'km',
            },
            {
              label: 'Hindi',
              value: 'hi',
            },
            {
              label: 'Malay',
              value: 'ms',
            },
            {
              label: 'Nepali',
              value: 'ne',
            },
            {
              label: 'Pashto',
              value: 'ps-Arab',
            },
            {
              label: 'Pigdin English',
              value: 'pcm',
            },
            {
              label: 'Sinhala',
              value: 'si',
            },
            {
              label: 'Tagalog',
              value: 'tl',
            },
            {
              label: 'Tamil',
              value: 'ta',
            },
            {
              label: 'Thai',
              value: 'th',
            },
            {
              label: 'Vietnamese',
              value: 'vi',
            },
            {
              label: 'Urdu',
              value: 'ur', 
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
