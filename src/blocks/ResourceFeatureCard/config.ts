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
      filterOptions: ({ relationTo, id }) => {
        // For blog, reports, and mmedia, only show items with pageType 'individual'
        if (relationTo === 'blog' || relationTo === 'reports' || relationTo === 'mmedia') {
          const filter: any = {
            pageType: {
              equals: 'individual',
            },
          }

          // Exclude the current document to prevent self-referential links
          if (id) {
            filter.id = {
              not_equals: id,
            }
          }

          return filter
        }

        // For other relation types, just exclude current document if id exists
        if (id) {
          return {
            id: {
              not_equals: id,
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
