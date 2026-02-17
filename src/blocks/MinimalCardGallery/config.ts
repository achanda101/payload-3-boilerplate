import { Block } from 'payload'

export const MinimalCardGallery: Block = {
  slug: 'minCardGallery',
  labels: { singular: 'Minimal Card Gallery', plural: 'Minimal Card Galleries' },
  imageURL: '/block_icons/minimalcardgallery-block-icon.png',
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
            { name: 'subtitle', type: 'textarea', localized: true },
            {
              name: 'align',
              label: 'Title/Subtitle Alignment',
              type: 'radio',
              options: [
                { label: 'Left Align', value: 'left' },
                { label: 'Center Align', value: 'center' },
              ],
              defaultValue: 'left',
              admin: { layout: 'horizontal' },
            },
          ],
          admin: { width: '100%' },
        },
      ],
    },
    {
      name: 'cards',
      label: 'Cards',
      labels: { singular: 'Card', plural: 'Cards' },
      type: 'array',
      fields: [
        {
          name: 'mascot',
          type: 'upload',
          relationTo: 'assetCloud',
          admin: { description: 'Mascot image (displayed at 60px height)' },
        },
        { name: 'title', type: 'text', required: true, localized: true },
        {
          name: 'description',
          type: 'textarea',
          localized: true,
          maxLength: 200,
          admin: { description: 'Max 200 characters' },
        },
      ],
      admin: {
        components: {
          RowLabel: { path: 'src/blocks/MinimalCardGallery/CardRowLabel.tsx' },
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
