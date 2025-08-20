import type { GlobalConfig } from 'payload'

import { revalidateFooter } from './hooks/revalidateFooter'
import { array } from 'node_modules/payload/dist/fields/validations'

export const Footer: GlobalConfig = {
  slug: 'footer',
  access: {
    read: () => true,
  },
  admin: {
    group: 'Site Settings',
  },
  fields: [
    {
      type: 'row',
      fields: [
        {
          name: 'orgName',
          label: 'Organisation Name',
          required: true,
          defaultValue: 'Urgent Action Fund Asia Pacific',
          type: 'text',
          admin: {
            width: '50%'
          }
        },
        {
          name: 'logo',
          type: 'upload',
          relationTo: 'media',
          required: true,
          admin: {
            description: 'Upload the logo for the footer',
            width: '50%'
          },
        },
      ]
    },
    {
      type: 'row',
      fields: [
        {
          name: 'donateCTA',
          label: 'Donate CTA Section',
          type: 'group',
          fields: [
            {
              name: 'heading',
              type: 'text',
              defaultValue: 'Your support powers Urgent Action',
              required: true,
            },
            {
              name: 'description',
              type: 'textarea',
              defaultValue: 'Every contribution - big or small - fuels safety, resilience, and justice.',
              required: true,
              admin: {
                description: 'A short description to encourage donations',
              }
            },
            {
              name: 'url',
              label: 'URL',
              type: 'text',
              defaultValue: 'https://example.com/donate',
              required: true,
              admin: {
                description: 'Enter a URL to the donation platform (https://example.com/donate)',
              },
              validate: (val) => {
                  if (!val) return 'External URL is required'
                  const isValidUrl = /^https?:\/\/.+/.test(val)
                  if (!isValidUrl) {
                    return 'Please enter a valid URL starting with http:// or https://'
                  }
                  return true
              },
            },
          ],
          admin: {
            width: '50%',
          },
        },
        {
          name: 'smLinks',
          label: 'Social Media Links',
          labels: {
            singular: 'Social Media Link',
            plural: 'Social Media Links'
          },
          type: 'array',
          fields: [
            {
              name: 'smType',
              label: 'Social Media Type',
              type: 'select',
              options: [
                { label: 'Facebook', value: 'fb' },
                { label: 'Instagram', value: 'insta' },
                { label: 'Threads', value: 'threads' },
                { label: 'Mastodon', value: 'mast' },
                { label: 'Whatsapp', value: 'wa'},
                { label: 'LinkedIn', value: 'linkedin' },
                { label: 'Soundcloud', value: 'scloud' },
                { label: 'Medium', value: 'med' },
                { label: 'Substack', value: 'sstack' },
              ]
            },
            {
              name: 'url',
              label: 'URL',
              type: 'text',
              required: true,
              admin: {
                description: 'Enter an external URL (https://example.com)',
              },
              validate: (val) => {
                  if (!val) return 'External URL is required'
                  const isValidUrl = /^https?:\/\/.+/.test(val)
                  if (!isValidUrl) {
                    return 'Please enter a valid URL starting with http:// or https://'
                  }
                  return true
              },
            },
          ],
          admin: {
            components: {
              RowLabel: {
                path: 'src/globals/Footer/SmItemRowLabel.tsx',
              }
            },
            description: 'Add links to your social media profiles. Icons will be auto-selected by type.',
            width: '50%',
          },
        },
      ],
    },
    
  ],
  hooks: {
    afterChange: [revalidateFooter],
  },
}
