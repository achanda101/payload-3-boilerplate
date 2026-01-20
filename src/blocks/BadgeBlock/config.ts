import { Block } from 'payload'

export const BadgeBlock: Block = {
  slug: 'badgeBlock',
  labels: {
    singular: 'Badge',
    plural: 'Badges',
  },
  fields: [
    {
      name: 'badgeText',
      label: 'Badge Text',
      type: 'text',
      localized: true,
      maxLength: 50,
      required: true,
      admin: {
        placeholder: 'E.g., Applications open until 15th June',
      },
    },
    {
      name: 'badgeType',
      label: 'Badge Type',
      type: 'select',
      options: [
        { label: 'Information (orange)', value: 'info' },
        { label: 'Important (red)', value: 'imp' },
        { label: 'Inactive (grey)', value: 'inactive' },
      ],
      defaultValue: 'info',
    },
  ],
}
