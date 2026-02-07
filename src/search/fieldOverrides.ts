import { Field } from 'payload'

export const searchFields: Field[] = [
  {
    name: 'slug',
    type: 'text',
    index: true,
    admin: {
      readOnly: true,
    },
  },
  {
    name: 'meta',
    label: 'Meta',
    type: 'group',
    index: true,
    admin: {
      readOnly: true,
    },
    fields: [
      {
        type: 'text',
        name: 'title',
        label: 'Title',
      },
      {
        type: 'text',
        name: 'description',
        label: 'Description',
      },
      {
        name: 'image',
        label: 'Image',
        type: 'upload',
        relationTo: ['mediaCloud', 'assetCloud'], // Support both collections
      },
    ],
  },
  {
    name: 'contentData',
    label: 'Content Data',
    type: 'textarea',
    // index: true, // Removed: Content can be too large for btree index (2704 byte limit)
    // For full-text search, use PostgreSQL's text search or external search service
    admin: {
      readOnly: true,
      hidden: true,
      description: 'Auto-populated content extracted from blocks and rich text',
    },
  },
  {
    name: 'author',
    label: 'Author',
    type: 'text',
    index: true,
    admin: {
      readOnly: true,
      hidden: true,
    },
  },
  {
    name: 'tags',
    label: 'Tags',
    type: 'text',
    index: true,
    admin: {
      readOnly: true,
      hidden: true,
      description: 'Auto-populated from document tags',
    },
  },
  {
    name: 'publishedDate',
    label: 'Published Date',
    type: 'text',
    index: true,
    admin: {
      readOnly: true,
      hidden: true,
    },
  },
  {
    label: 'Categories',
    name: 'categories',
    type: 'array',
    index: true,
    admin: {
      readOnly: true,
      hidden: true,
    },
    fields: [
      {
        name: 'relationTo',
        type: 'text',
      },
      {
        name: 'id',
        type: 'text',
      },
      {
        name: 'title',
        type: 'text',
      },
    ],
  },
]
