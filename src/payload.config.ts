// storage-adapter-import-placeholder
import { postgresAdapter } from '@payloadcms/db-postgres'
import { s3Storage } from '@payloadcms/storage-s3'

import sharp from 'sharp' // sharp-import
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'

import { MediaCloud } from './collections/MediaCloud'
import { AssetCloud } from './collections/AssetCloud'
import { Documents } from './collections/Documents'
import { Grants } from './collections/Grants'
import { GrantCards } from './collections/GrantCards'
import { EligibilityTests } from './collections/EligibilityTests'
import { Pages } from './collections/Pages'
import { Blog } from './collections/Blog'
import { Report } from './collections/Reports'
import { MMedia } from './collections/MMedia'
import { DocTypes } from './collections/DocTypes'
import { Users } from './collections/Users'
import { Footer } from './globals/Footer/config'
import { Header } from './globals/Header/config'
import { Navigation } from './globals/Navigation/config'
import { ContactInfo } from './globals/ContactInfo/config'
import { plugins } from './plugins'
import { defaultLexical } from '@/fields/defaultLexical'
import { getServerSideURL } from './utilities/getURL'
import languageOptions from './globals/Header/languageOptions.json'
import { Homepage } from './globals/Homepage/config'
import { seoPlugin } from '@payloadcms/plugin-seo'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  upload: {
    limits: {
      fileSize: 50 * 1024 * 1024, // 50MB, written in bytes
    },
  },
  admin: {
    user: Users.slug,
    theme: 'light',
    autoLogin:
      process.env.NODE_ENV === 'development'
        ? {
            email: process.env.DEMO_EMAIL,
            password: process.env.DEMO_PASSWORD,
            prefillOnly: true,
          }
        : false,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    avatar: {
      Component: '@/components/ui/avatar',
    },
    meta: {
      titleSuffix: '- UAF A&P',
      title: 'CMS Dashboard',
      description: 'Content Management System for the UAF A&P website',
      icons: [
        {
          url: '/uafanp.ico',
          rel: 'icon',
          type: 'image/ico',
          sizes: '16x16 32x32',
        },
      ],
    },
    components: {
      beforeLogin: ['@/components/BeforeLogin'],
      beforeDashboard: ['@/components/BeforeDashboard'],
      graphics: {
        Logo: '@/components/Logo/Logo.tsx#Logo',
        Icon: '@/components/Icon/Icon.tsx#Icon',
      },
      logout: {
        Button: '@/components/LogoutButton/Logout.tsx#Logout',
      },
    },
    livePreview: {
      url: process.env.PAYLOAD_URL || 'http://localhost:3000',
      collections: ['pages', 'blog', 'reports', 'grants', 'mmedia'],
      globals: ['homepage'],
      breakpoints: [
        {
          label: 'Mobile',
          name: 'mobile',
          width: 375,
          height: 667,
        },
        {
          label: 'Tablet',
          name: 'tablet',
          width: 768,
          height: 1024,
        },
      ],
    },
  },
  // This config helps us configure global or default features that the other editors can inherit
  editor: defaultLexical,
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || '',
    },
  }),
  localization: {
    locales: languageOptions.map((lang) => ({
      label: lang.label,
      code: lang.value,
      ...(lang.dir && { rtl: lang.dir === 'rtl' }),
    })),
    defaultLocale: 'en', // required
    fallback: true, // defaults to true
  },
  collections: [
    // Content Group (order: 1-8)
    // TODO: Group Order not showing in Admin UI yet as of Payload v3.65.0
    Grants,
    GrantCards,
    EligibilityTests,
    Pages,
    Blog,
    Report,
    MMedia,
    DocTypes,
    // Media Group (order: 1-3)
    MediaCloud,
    AssetCloud,
    Documents,
    // User management
    Users,
  ],
  cors: [getServerSideURL()].filter(Boolean),
  globals: [Homepage, Header, Footer, Navigation, ContactInfo],
  plugins: [
    ...plugins,
    s3Storage({
      enabled: process.env.S3_ENABLED !== 'false', // Disable S3 in local development
      collections: {
        mediaCloud: true,
        assetCloud: true,
        documents: true,
      },
      bucket: process.env.S3_BUCKET || '',
      config: {
        region: process.env.S3_REGION || '',
        endpoint: process.env.S3_ENDPOINT || '',
        credentials: {
          accessKeyId: process.env.S3_ACCESS_KEY_ID || '',
          secretAccessKey: process.env.S3_SECRET_ACCESS_KEY || '',
        },
        forcePathStyle: true,
        tls: true,
        signingEscapePath: false,
      },
    }),
    seoPlugin({
      // Note: 'pages' and 'grants' removed - they have manual seoImage field instead
      // Note: 'homepage' removed due to seoPlugin bug with globals causing circular reference error
      // Note: 'blog', 'reports', 'mmedia' now use manual SEO fields instead of plugin
      collections: [],
      globals: [],
      uploadsCollection: 'mediaCloud',
      fields: ({ defaultFields }) => [
        ...defaultFields.filter((field) => !('name' in field) || field.name !== 'preview'),
        {
          name: 'preview',
          type: 'ui',
          admin: {
            components: {
              Field: {
                path: 'src/components/SeoPreview/index.tsx#SeoPreviewComponent',
                clientProps: {
                  titlePath: 'meta.title',
                  descriptionPath: 'meta.description',
                  imagePath: 'meta.image',
                  hasGenerateURLFn: true,
                  uploadsCollection: 'mediaCloud',
                },
              },
            },
          },
          label: 'Preview',
        },
      ],
      generateTitle: ({ doc }) => {
        if (!doc) return 'Urgent Action Fund Asia & Pacific'

        let title = 'Urgent Action Fund Asia & Pacific'

        if ('heroTitle' in doc && doc.heroTitle) {
          title = `${doc.heroTitle} | Urgent Action Fund Asia & Pacific`
        }

        return title
      },
      generateURL: ({ doc, collectionSlug }) => {
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
      },
      generateDescription: ({ doc }) => {
        if (!doc) return 'Urgent Action Fund Asia & Pacific'

        let description = 'Urgent Action Fund Asia & Pacific'

        if ('heroSubtitle' in doc && doc.heroSubtitle) {
          description = doc.heroSubtitle
        }

        return description
      },
      generateImage: ({ doc }) => {
        if (!doc) return undefined as unknown as number

        // Check common image field names used across collections
        const imageFields = ['image', 'coverImage', 'heroImage', 'featuredImage']

        for (const field of imageFields) {
          if (field in doc && doc[field]) {
            const image = doc[field]
            return image
          }
        }
        // No image found
        return null
      },
    }),
  ],
  endpoints: [
    {
      path: '/health',
      method: 'get',
      handler: async () => {
        return new Response('OK', { status: 200 })
      },
    },
  ],
  secret: process.env.PAYLOAD_SECRET,
  sharp: sharp as any,
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
})
