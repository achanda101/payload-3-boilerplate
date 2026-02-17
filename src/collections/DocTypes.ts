import type { CollectionConfig } from 'payload'

import { authenticated } from '../access/authenticated'
import { authenticatedOrPublished } from '@/access/authenticatedOrPublished'

export const DocTypes: CollectionConfig = {
  slug: 'doctypes',
  labels: {
    singular: 'Resource Category',
    plural: 'Resource Categories',
  },
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  admin: {
    description: 'Resource categories for Reports, Blogposts and Multimedia Posts',
    useAsTitle: 'type',
    defaultColumns: ['type', 'blogCount', 'reportCount', 'mmediaCount'],
    group: {
      name: 'Content',
      order: '8',
    },
  },
  trash: true,
  fields: [
    {
      name: 'type',
      label: 'Resource Category',
      type: 'text',
      localized: true,
      required: true,
      admin: {
        description:
          'Enter resource category e.g. Blog, Report, Annual Report, Learning Report, Video, Audio etc.',
      },
    },
    {
      name: 'relatedBlogPosts',
      type: 'join',
      collection: 'blog',
      on: 'docType',
      admin: {
        description: 'All blog posts tagged with this resource category.',
        condition: (data) => {
          return data?.relatedBlogPosts && data.relatedBlogPosts.docs?.length > 0
        },
      },
    },
    {
      name: 'relatedReports',
      type: 'join',
      collection: 'reports',
      on: 'docType',
      admin: {
        description: 'All reports tagged with this resource category.',
        condition: (data) => {
          return data?.relatedReports && data.relatedReports.docs?.length > 0
        },
      },
    },
    {
      name: 'relatedMMediaPosts',
      label: 'Related Multimedia Posts',
      type: 'join',
      collection: 'mmedia',
      on: 'docType',
      admin: {
        description: 'All multimedia posts tagged with this resource category.',
        condition: (data) => {
          return data?.relatedMMediaPosts && data.relatedMMediaPosts.docs?.length > 0
        },
      },
    },
    {
      name: 'blogCount',
      type: 'number',
      admin: {
        position: 'sidebar',
        readOnly: true,
        description: 'Number of blog posts tagged with this category',
      },
      hooks: {
        afterRead: [
          ({ data }) => {
            return data?.relatedBlogPosts?.docs?.length || 0
          },
        ],
      },
    },
    {
      name: 'reportCount',
      type: 'number',
      admin: {
        position: 'sidebar',
        readOnly: true,
        description: 'Number of reports tagged with this category',
      },
      hooks: {
        afterRead: [
          ({ data }) => {
            return data?.relatedReports?.docs?.length || 0
          },
        ],
      },
    },
    {
      name: 'mmediaCount',
      type: 'number',
      admin: {
        position: 'sidebar',
        readOnly: true,
        description: 'Number of multimedia posts tagged with this category',
      },
      hooks: {
        afterRead: [
          ({ data }) => {
            return data?.relatedMMediaPosts?.docs?.length || 0
          },
        ],
      },
    },
  ],
}
