import { Block } from 'payload'
import { link } from "@/fields/link";

export const FeatureCard: Block = {
  slug: 'featCrd',
  labels: {
    singular: 'General Feature Card',
    plural: 'General Feature Cards',
  },
  imageURL: '/block_icons/feature-card-block-icon.png',
  fields: [
    {
      name: 'image',
      type: 'upload',
      relationTo: 'mediaCloud',
      admin: {
        description: 'Upload an image for the Feature Card',
      },
    },
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Title of Block',
          fields: [
            {
              name: 'title',
              type: 'text',
              localized: true,
            },
          ],
        },
        {
          label: 'Title of Card',
          fields: [
            {
              name: 'subtitle',
              type: 'text',
              localized: true,
            },
          ],
        },
        {
          label: 'Content Tags',
          fields: [
            {
              name: 'tags',
              type: 'array',
              fields: [
                {
                  name: 'tag',
                  type: 'text',
                  localized: true,
                  admin: {
                    placeholder: 'Enter a tag for the feature card',
                  },
                },
              ],
              admin: {
                components: {
                  RowLabel: {
                    path: 'src/blocks/FeatureCard/TagRowLabel.tsx',
                  }
                },
              }
            },
          ],
        },
        {
          label: 'Description',
          fields: [
            {
              name: 'desc',
              type: 'textarea',
              localized: true,
            },
          ],
        },
        {
          label: 'Link',
          fields: [
            link({
              appearances: false,
            }),
          ],
        },
      ],
    },
  ],
}
