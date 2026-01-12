import { Block } from 'payload'

export const ResourceFeatureCard: Block = {
  slug: 'resourceFeatCard',
  labels: {
    singular: 'Resource Feature Card',
    plural: 'Resource Feature Cards',
  },
  imageURL: '/block_icons/resource-feature-card-block-icon.gif',
  fields: [
    {
      name: 'featCardList',
      type: 'relationship',
      relationTo: ['blog', 'reports', 'mmedia'],
      hasMany: true,
      filterOptions: ({ relationTo }) => {
        // For blog, reports, and mmedia, only show items with pageType 'individual'
        if (relationTo === 'blog' || relationTo === 'reports' || relationTo === 'mmedia') {
          return {
            pageType: {
              equals: 'individual',
            },
          }
        }
        return true
      },
      admin: {
        description:
          'Select the Resource Feature Cards to display. You can reorder or remove cards as needed.',
      },
    },
  ],
}
