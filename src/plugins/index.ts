import { payloadCloudPlugin } from '@payloadcms/payload-cloud'
import { formBuilderPlugin } from '@payloadcms/plugin-form-builder'
import { nestedDocsPlugin } from '@payloadcms/plugin-nested-docs'
import { redirectsPlugin } from '@payloadcms/plugin-redirects'
import { seoPlugin } from '@payloadcms/plugin-seo'
import { searchPlugin } from '@payloadcms/plugin-search'
import { Plugin } from 'payload'
import { revalidateRedirects } from '@/hooks/revalidateRedirects'
import { GenerateTitle, GenerateURL, GenerateDescription } from '@payloadcms/plugin-seo/types'
import { FixedToolbarFeature, HeadingFeature, lexicalEditor } from '@payloadcms/richtext-lexical'
import { searchFields } from '@/search/fieldOverrides'
import { beforeSyncWithSearch } from '@/search/beforeSync'

import { Page, Grant, Report, Blog, Mmedia } from '@/payload-types'
import { getServerSideURL } from '@/utilities/getURL'
// TODO: Enable mcpPlugin when ready; need to specify content structure of all the collections and globals used
// import {mcpPlugin } from '@payloadcms/plugin-mcp'

const generateTitle: GenerateTitle<Page | Grant | Blog | Report | Mmedia> = ({ doc }) => {
  return doc?.title
    ? `${doc.title} | Urgent Action Fund: Asia & Pacific`
    : 'Urgent Action Fund: Asia & Pacific'
}

const generateDescription: GenerateDescription<Page | Grant | Blog | Report | Mmedia> = ({
  doc,
}) => {
  // For Blog collection, use heroSubtitle if available
  if ('heroSubtitle' in doc && doc.heroSubtitle) {
    return doc.heroSubtitle
  }
  return ''
}

const generateURL: GenerateURL<Page | Grant | Report | Blog | Mmedia> = ({
  doc,
  collectionSlug,
}) => {
  const url = getServerSideURL()

  if (!doc?.slug) return url

  // Generate URLs based on collection type
  switch (collectionSlug) {
    case 'grants':
      return `${url}/grants/${doc.slug}`
    case 'reports':
      return `${url}/reports/${doc.slug}`
    case 'blog':
      return `${url}/blog/${doc.slug}`
    case 'mmedia':
      return `${url}/mmedia/${doc.slug}`
    case 'pages':
    default:
      return `${url}/${doc.slug}`
  }
}

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
  seoPlugin({
    generateTitle,
    generateURL,
    generateDescription,
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
