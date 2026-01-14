import { Block, FieldHook } from 'payload'

const populateAllResources: FieldHook = async ({ data, req, siblingData, operation }) => {
  // Only populate on read operations
  if (operation === 'read') {
    // Get the current document's collection
    const collectionSlug = req?.routeParams?.collection

    if (!collectionSlug || collectionSlug === 'pages') {
      return siblingData.featCardList || []
    }

    // Handle addAllResources checkbox
    if (siblingData?.addAllResources === true) {
      try {
        // Determine the publish date field based on collection
        const publishDateField = collectionSlug === 'blog' ? 'publishedAt' : 'pubDate'

        // Fetch all documents from the same collection with pageType='individual'
        const result = await req.payload.find({
          collection: collectionSlug as any,
          where: {
            and: [
              {
                pageType: {
                  equals: 'individual',
                },
              },
              {
                id: {
                  not_equals: data?.id || '',
                },
              },
            ],
          },
          sort: `-${publishDateField}`,
          depth: 1,
          limit: 100,
        })

        return result.docs.map((doc) => ({
          relationTo: collectionSlug,
          value: doc.id,
        }))
      } catch (error) {
        console.error('Error fetching all resources:', error)
        return siblingData.featCardList || []
      }
    }

    // Handle filterByDocType selection
    if (siblingData?.filterByDocType) {
      try {
        const docTypeId =
          typeof siblingData.filterByDocType === 'object'
            ? siblingData.filterByDocType.id
            : siblingData.filterByDocType

        // Determine the publish date field based on collection
        const publishDateField = collectionSlug === 'blog' ? 'publishedAt' : 'pubDate'

        // Fetch documents filtered by doc type
        const result = await req.payload.find({
          collection: collectionSlug as any,
          where: {
            and: [
              {
                pageType: {
                  equals: 'individual',
                },
              },
              {
                id: {
                  not_equals: data?.id || '',
                },
              },
              {
                docType: {
                  contains: docTypeId,
                },
              },
            ],
          },
          sort: `-${publishDateField}`,
          depth: 1,
          limit: 100,
        })

        return result.docs.map((doc) => ({
          relationTo: collectionSlug,
          value: doc.id,
        }))
      } catch (error) {
        console.error('Error fetching resources by doc type:', error)
        return siblingData.featCardList || []
      }
    }
  }

  return siblingData.featCardList
}

export const ResourceFeatureCard: Block = {
  slug: 'resourceFeatCard',
  labels: {
    singular: 'Resource Feature Card',
    plural: 'Resource Feature Cards',
  },
  imageURL: '/block_icons/resource-feature-card-block-icon.gif',
  fields: [
    {
      name: 'addAllResources',
      type: 'checkbox',
      label: 'Add All Resources?', // Default label (will be overridden by custom Field component)
      admin: {
        components: {
          Field: '@/blocks/ResourceFeatureCard/AddAllResourcesField',
        },
      },
      hooks: {
        afterChange: [
          ({ value, previousValue, siblingData }) => {
            // When checkbox is checked, clear the featCardList and filterByDocType
            if (value === true && previousValue !== true) {
              siblingData.featCardList = []
              siblingData.filterByDocType = null
            }
            return value
          },
        ],
      },
    },
    {
      name: 'filterByDocType',
      type: 'relationship',
      relationTo: 'doctypes',
      label: 'Filter by Resource Type',
      admin: {
        description: 'Select a resource type to show all resources tagged with that type from this collection (e.g., if you\'re on a Blog page and select "Annual Report", only blog posts tagged as Annual Report will appear)',
        condition: (_data, siblingData) => {
          // Hide this field when addAllResources is checked
          return !siblingData?.addAllResources
        },
      },
      hooks: {
        afterChange: [
          ({ value, previousValue, siblingData }) => {
            // When doc type is selected, clear the featCardList
            if (value && previousValue !== value) {
              siblingData.featCardList = []
            }
            return value
          },
        ],
      },
    },
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
      hooks: {
        afterRead: [populateAllResources],
      },
      admin: {
        description:
          'Select the Resource Feature Cards to display. You can reorder or remove cards as needed.',
        condition: (_data, siblingData) => {
          // Hide this field when addAllResources is checked or filterByDocType is selected
          return !siblingData?.addAllResources && !siblingData?.filterByDocType
        },
      },
    },
  ],
}
