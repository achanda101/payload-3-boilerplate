import type { GlobalConfig } from 'payload'

import { link } from '@/fields/link'
import { revalidateNavigation } from './hooks/revalidateNavigation'

export const Navigation: GlobalConfig = {
  slug: 'nav',
  label: 'Navigation',
  access: {
    read: () => true,
  },
  admin: {
    group: 'Site Settings',
  },
  fields: [
    {
      name: 'menuItems',
      label: 'Top Level Menu Items',
      type: 'array',
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
          localized: true,
          admin: {
            placeholder: 'Enter the label for the top level menu item',
          },
        },
        {
          name: 'navItems',
          label: 'Navigation Items',
          type: 'array',
          fields: [
            link({
              appearances: false,
            }),
          ],
          maxRows: 5,
          admin: {
            style: {
              alignSelf: 'flex-end'
            },
            // components: {
            //   RowLabel: {
            //     path: 'src/globals/Navigation/NavItemRowLabel.tsx',
            //   }
            // },
          }
        },
      ],
      minRows: 1,
      maxRows: 4,
      admin: {
        components: {
          RowLabel: {
            path: 'src/globals/Navigation/MenuItemRowLabel.tsx',
          }
        },
      }
    },
    {
      type: 'row',
      fields: [
         {
          name: 't_and_c',
          type: 'relationship',
          label: 'Terms and Conditions Document to link to',
          maxDepth: 1,
          relationTo: ['posts'],
              required: true,
              admin: {
                width: '50%',
                style: {
                  backgroundColor: '#f8f9fa',
                  padding: '20px',
                  border: '1px solid #dee2e6',
                  borderRadius: '8px',
                }
              }
        },
        {
          name: 'privacy',
          type: 'relationship',
          label: 'Privacy Document to link to',
          maxDepth: 1,
          relationTo: ['posts'],
          required: true,
          admin: {
            width: '50%',
            style: {
              padding: '20px',
              border: '1px solid #dee2e6',
              borderRadius: '8px',
            }
          }
        },
      ]
    },
  ],
  hooks: {
    afterChange: [revalidateNavigation],
  },
}
