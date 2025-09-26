import { Block } from "payload";

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
      admin: {
        description: 'Select Grant Cards in the order you want them to appear.',
      }
    }
  ]
}