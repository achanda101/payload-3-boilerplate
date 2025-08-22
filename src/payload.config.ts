// storage-adapter-import-placeholder
import { postgresAdapter } from '@payloadcms/db-postgres'

import sharp from 'sharp' // sharp-import
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'

import { Categories } from './collections/Categories'
import { Media } from './collections/Media'
import { Posts } from './collections/Posts'
import { Users } from './collections/Users'
import { Footer } from './globals/Footer/config'
import { Header } from './globals/Header/config'
import { Navigation } from './globals/Navigation/config'
import { ContactInfo } from './globals/ContactInfo/config'
import { plugins } from './plugins'
import { defaultLexical } from '@/fields/defaultLexical'
import { getServerSideURL } from './utilities/getURL'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
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
    locales: [
      {
        label: 'English',
        code: 'en',
      },
      {
        label: 'Bahasa Indonesia',
        code: 'bi',
      },
      {
        label: 'Bangla',
        code: 'bn-IN',
      },
      {
        label: 'Burmese',
        code: 'br',
      },
      {
        label: 'Chinese Simplified',
        code: 'ch',
      },
      {
        label: 'Dari',
        code: 'prs-Arab',
        rtl: true,
      },
      {
        label: 'Khmer',
        code: 'km',
      },
      {
        label: 'Hindi',
        code: 'hi',
      },
      {
        label: 'Malay',
        code: 'ms',
      },
      {
        label: 'Nepali',
        code: 'ne',
      },
      {
        label: 'Pashto',
        code: 'ps-Arab',
        rtl: true,
      },
      {
        label: 'Pigdin English',
        code: 'pcm',
      },
      {
        label: 'Sinhala',
        code: 'si',
      },
      {
        label: 'Tagalog',
        code: 'tl',
      },
      {
        label: 'Tamil',
        code: 'ta',
      },
      {
        label: 'Thai',
        code: 'th',
      },
      {
        label: 'Vietnamese',
        code: 'vi',
      },
      {
        label: 'Urdu',
        code: 'ur',
        rtl: true,
      },
    ],
    defaultLocale: 'en', // required
    fallback: true, // defaults to true
  },
  collections: [Posts, Media, Categories, Users],
  cors: [getServerSideURL()].filter(Boolean),
  globals: [Header, Footer, Navigation, ContactInfo],
  plugins: [
    ...plugins,
    // storage-adapter-placeholder
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
