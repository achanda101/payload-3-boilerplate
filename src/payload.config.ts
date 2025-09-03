// storage-adapter-import-placeholder
import { postgresAdapter } from '@payloadcms/db-postgres'
import { s3Storage } from '@payloadcms/storage-s3'

import sharp from 'sharp' // sharp-import
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'

import { Categories } from './collections/Categories'
// import { Media } from './collections/Media'
import { MediaCloud } from './collections/MediaCloud'
import { Documents } from './collections/Documents'
import { Posts } from './collections/Posts'
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

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    theme: 'light',
    importMap: {
      baseDir: path.resolve(dirname),
    },
    avatar: {
      Component: '@/components/ui/avatar',
    },
    meta: {
      titleSuffix: '- UAF A&P',
    },
    components: {
      beforeLogin: [ '@/components/BeforeLogin' ],
      beforeDashboard: [ '@/components/BeforeDashboard' ],
      // afterLogin: [ '@/components/AfterLogin' ],
      // beforeLogout: [ '@/components/BeforeLogout' ],
      // afterLogout: [ '@/components/AfterLogout' ],
      graphics: {
        Logo: '@/components/Logo/Logo.tsx#Logo',
        Icon: '@/components/Icon/Icon.tsx#Icon',
      }
    },
    livePreview: {
      url: process.env.NEXT_PUBLIC_DOMAIN_URL || 'http://localhost:3000',
      // collections: ['pages', 'posts'],
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
    locales: languageOptions.map(lang => ({
      label: lang.label,
      code: lang.value,
      ...(lang.dir && { rtl: lang.dir === 'rtl' })
    })),
    defaultLocale: 'en', // required
    fallback: true, // defaults to true
  },
  collections: [Posts, MediaCloud, Documents, Categories, Users],
  cors: [getServerSideURL()].filter(Boolean),
  globals: [ Header, Footer, Navigation, ContactInfo, Homepage ],
  plugins: [
    ...plugins,
    s3Storage({
      collections: {
        mediaCloud: true,
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
        signingEscapePath: false
      },
    }),
  ],
  endpoints: [
    {
      path: '/health',
      method: 'get',
      handler: async (req) => {
        return new Response('OK', { status: 200 });
      }
    }
  ],
  secret: process.env.PAYLOAD_SECRET,
  sharp,
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
})
