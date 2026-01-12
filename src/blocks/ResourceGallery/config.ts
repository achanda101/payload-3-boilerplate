import { Block } from 'payload'

export const ResourceGallery: Block = {
  slug: 'resourceGallery',
  labels: {
    singular: 'Resource Gallery',
    plural: 'Resource Galleries',
  },
  imageURL: '/block_icons/resource-gallery-block-icon.png',
  fields: [
    {
      name: 'galleryList',
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
          'Select the resources to display in the gallery. You can reorder or remove items as needed.',
      },
    },
  ],
}
