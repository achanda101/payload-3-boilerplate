import { Block } from 'payload'

export const IDCardGallery: Block = {
  slug: 'idCardGallery',
  labels: { singular: 'ID Card Gallery', plural: 'ID Card Galleries' },
  imageURL: '/block_icons/idcardgallery-block-icon.png',
  fields: [
    {
      type: 'row',
      fields: [
        {
          type: 'group',
          name: 'header',
          label: 'Block Header',
          fields: [
            { name: 'title', type: 'text', localized: true },
            { name: 'subtitle', type: 'text', localized: true },
            { name: 'description', type: 'textarea', localized: true },
          ],
          admin: { width: '100%' },
        },
      ],
    },
    {
      name: 'cards',
      label: 'ID Cards',
      labels: { singular: 'ID Card', plural: 'ID Cards' },
      type: 'array',
      fields: [
        {
          name: 'mascot',
          type: 'upload',
          relationTo: 'assetCloud',
          admin: { description: 'Mascot image (displayed at max 120px height)' },
        },
        { name: 'pronouns', type: 'text', localized: true },
        { name: 'fullname', type: 'text', required: true, localized: true },
        {
          name: 'designation',
          type: 'textarea',
          localized: true,
          maxLength: 200,
          admin: { description: 'Max 200 characters' },
        },
      ],
      admin: {
        components: {
          RowLabel: { path: 'src/blocks/IDCardGallery/CardRowLabel.tsx' },
        },
      },
    },
    {
      name: 'blockAnchorId',
      type: 'ui',
      admin: {
        components: {
          Field: '@/components/BlockIdDisplay#BlockIdDisplay',
        },
      },
    },
  ],
}
