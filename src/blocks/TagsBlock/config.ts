import { Block } from 'payload'

export const TagsBlock: Block = {
  slug: 'tagsBlock',
  labels: {
    singular: 'Tags',
    plural: 'Tags',
  },
  fields: [
    {
      name: 'tags',
      label: 'Tags',
      labels: {
        singular: 'Tag',
        plural: 'Tags',
      },
      type: 'array',
      minRows: 0,
      maxRows: 3,
      fields: [
        {
          name: 'tag',
          type: 'text',
          maxLength: 20,
        },
      ],
      admin: {
        description: 'Add tags - up to 3 tags, max 20 characters each',
        components: {
          RowLabel: {
            path: 'src/blocks/TagsBlock/TagRowLabel.tsx',
          },
        },
      },
    },
  ],
}
