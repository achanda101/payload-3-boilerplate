import { Block } from 'payload'

export const TestimonialCardDeck: Block = {
  slug: 'testimonialDeck',
  labels: {
    singular: 'Testimonial Card Deck',
    plural: 'Testimonial Card Decks',
  },
  imageURL: '/block_icons/testimonial-block-icon.png',
  fields: [
    {
      name: 'title',
      label: 'Block Title',
      type: 'text',
      localized: true,
      admin: {
        placeholder: 'e.g., Testimonials',
      },
    },
    {
      name: 'cards',
      label: 'Testimonial Cards',
      labels: {
        singular: 'Testimonial Card',
        plural: 'Testimonial Cards',
      },
      type: 'array',
      minRows: 3,
      fields: [
        {
          name: 'quote_text',
          label: 'Quote Text',
          type: 'textarea',
          required: true,
          localized: true,
          maxLength: 1000, // Character limit
          admin: {
            components: {
              afterInput: [{ path: '@/utilities/characterCounter.tsx' }],
            },
          },
        },
        {
          name: 'attrib_name',
          label: 'Attribution Name',
          type: 'text',
          localized: true,
        },
        {
          name: 'attrib_dsg',
          label: 'Attribution Designation',
          type: 'text',
          localized: true,
        },
      ],
      admin: {
        description: 'Add at least 3 testimonial cards',
        components: {
          RowLabel: { path: 'src/blocks/TestimonialCardDeck/CardRowLabel.tsx' },
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
