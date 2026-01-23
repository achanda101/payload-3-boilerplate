import { payloadCloudPlugin } from '@payloadcms/payload-cloud'
import { formBuilderPlugin } from '@payloadcms/plugin-form-builder'
import { redirectsPlugin } from '@payloadcms/plugin-redirects'
import { searchPlugin } from '@payloadcms/plugin-search'
import { Plugin } from 'payload'
import { revalidateRedirects } from '@/hooks/revalidateRedirects'
import { FixedToolbarFeature, HeadingFeature, lexicalEditor } from '@payloadcms/richtext-lexical'
import { searchFields } from '@/search/fieldOverrides'
import { beforeSyncWithSearch } from '@/search/beforeSync'
// TODO: Enable mcpPlugin when ready; need to specify content structure of all the collections and globals used
// import {mcpPlugin } from '@payloadcms/plugin-mcp'

export const plugins: Plugin[] = [
  redirectsPlugin({
    collections: ['pages', 'reports', 'blog', 'mmedia', 'grants'],
    overrides: {
      admin: {
        hidden: true,
      },
      // @ts-expect-error
      fields: ({ defaultFields }) => {
        return defaultFields.map((field) => {
          if ('name' in field && field.name === 'from') {
            return {
              ...field,
              admin: {
                description: 'You will need to rebuild the website when changing this field.',
              },
            }
          }
          return field
        })
      },
      hooks: {
        afterChange: [revalidateRedirects],
      },
    },
  }),
  formBuilderPlugin({
    fields: {
      payment: false,
    },
    formOverrides: {
      admin: {
        hidden: true,
      },
      fields: ({ defaultFields }) => {
        return defaultFields.map((field) => {
          if ('name' in field && field.name === 'confirmationMessage') {
            return {
              ...field,
              editor: lexicalEditor({
                features: ({ rootFeatures }) => {
                  return [
                    ...rootFeatures,
                    FixedToolbarFeature(),
                    HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
                  ]
                },
              }),
            }
          }
          return field
        })
      },
    },
    formSubmissionOverrides: {
      admin: {
        hidden: true,
      },
    },
  }),
  searchPlugin({
    collections: ['pages', 'reports', 'blog', 'mmedia', 'grants'],
    beforeSync: beforeSyncWithSearch,
    searchOverrides: {
      admin: {
        hidden: true,
      },
      fields: ({ defaultFields }) => {
        return [...defaultFields, ...searchFields]
      },
    },
  }),
  payloadCloudPlugin(),
]
