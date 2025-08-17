import type { GlobalConfig } from 'payload'

import { revalidateContactInfo } from './hooks/revalidateContactInfo'

export const ContactInfo: GlobalConfig = {
  slug: 'contactInfo',
  access: {
    read: () => true,
  },
  admin: {
    group: 'Site Settings',
  },
  fields: [
    {
      name: 'emails',
      labels: {
        singular: 'Email Contact',
        plural: 'Email Contacts'
      },
      type: 'array',
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
          admin: {
            description: 'Enter label for the contact (example: For Whistleblower Concerns)',
          },
        },
        {
          name: 'email',
          type: 'email',
          required: true
        },
        {
          name: 'emailType',
          type: 'select',
          required: true,
          options: [
            { label: 'Info', value: 'info' },
            { label: 'Grants', value: 'grants' },
            { label: 'Whistleblower', value: 'whistle' },
            { label: 'WSC', value: 'wsc' },
            { label: 'General', value: 'general' },
          ],
          defaultValue: 'info'
        }
      ],
      admin: {
        components: {
          RowLabel: 'src/globals/ContactInfo/EmailItemRowLabel.tsx'
        }
      }
    },
  ],
  hooks: {
    afterChange: [revalidateContactInfo],
  },
}
