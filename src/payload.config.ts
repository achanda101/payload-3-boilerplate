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
import { AssetCloud } from './collections/AssetCloud'
import { Documents } from './collections/Documents'
import { Grants } from './collections/Grants'
import { GrantCards } from './collections/GrantCards'
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

// BLOCKS
import { MultiColumnInfoBlock } from '@/blocks/MultiColumnInfoBlock/config'
import { SingleColumnInfoBlock } from '@/blocks/SingleColumnInfoBlock/config'
import { GrantCardGridBlock } from "@/blocks/GrantCardGridBlock/config"
import { MultiStepProcess } from "@/blocks/MultiStepProcessBlock/config"
import { ComparisonBlock } from '@/blocks/ComparisonBlock/config'
import { YellowCardDeck } from '@/blocks/YellowCardDeck/config'
import { FeatureCard } from '@/blocks/FeatureCard/config'
import { ListingCardDeck } from '@/blocks/ListingCardDeck/config'
import { FaqBlock } from '@/blocks/FaqBlock/config'
import { SecondaryCTA } from '@/blocks/SecondaryCTA/config'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

// TODO: use folders to organise collections (Media, Grant Cards, etc)
// But folders is in BETA as of Sept 2025 https://payloadcms.com/docs/folders/overview

export default buildConfig({
  upload: {
    limits: {
      fileSize: 50 * 1024 * 1024, // 50MB, written in bytes
    },
  },
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
      title: 'CMS Dashboard',
      description: 'Content Management System for the UAF A&P website',
      icons: [
        {
          url: '/uafanp.ico',
          rel: 'icon',
          type: 'image/ico',
          sizes: '16x16 32x32'
        }
      ]
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
      url: process.env.PAYLOAD_URL || 'http://localhost:3000',
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
  collections: [ Grants, GrantCards, Posts, MediaCloud, AssetCloud, Documents, Categories, Users ],
  blocks: [
    SecondaryCTA,
    SingleColumnInfoBlock,
    MultiColumnInfoBlock,
    SingleColumnInfoBlock,
    GrantCardGridBlock,
    MultiStepProcess,
    ComparisonBlock,
    YellowCardDeck,
    FeatureCard,
    ListingCardDeck,
    FaqBlock,
  ],
  cors: [getServerSideURL()].filter(Boolean),
  globals: [ Homepage, Header, Footer, Navigation, ContactInfo ],
  plugins: [
    ...plugins,
    s3Storage({
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
        signingEscapePath: false
      }
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
