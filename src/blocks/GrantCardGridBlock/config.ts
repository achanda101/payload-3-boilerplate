import { Block } from "payload";
import { populateGrantCards } from "./hooks/populateGrantCards";

export const GrantCardGridBlock: Block = {
  slug: 'grantCardGridBlock',
  labels: {
    singular: 'Grant Card Grid Block',
    plural: 'Grant Card Grid Blocks'
  },
  imageURL: '/block_icons/grant-card-grid-block-icon.png',
  fields: [
    {
      name: 'grantCardGrid',
      type: 'relationship',
      relationTo: 'grantcards',
      hasMany: true,
      filterOptions: {
        activePeriod: {
          not_equals: 'closed'
        }
      },
      admin: {
        description: 'Grant Cards to display. Pre-populated with all active grants (excludes closed grants). You can reorder or remove cards as needed.',
      },
      hooks: {
        afterRead: [populateGrantCards],
      }
    }
  ]
}