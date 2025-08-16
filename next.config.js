import { withPayload } from '@payloadcms/next/withPayload'

import redirects from './redirects.js'

const NEXT_PUBLIC_SERVER_URL = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      // Filter out any invalid URLs and only process valid ones
      ...[NEXT_PUBLIC_SERVER_URL /* 'https://example.com' */]
        .filter(Boolean) // Remove undefined/null values
        .filter(url => {
          try {
            new URL(url)
            return true
          } catch {
            return false
          }
        })
        .map((item) => {
          const url = new URL(item)

          return {
            hostname: url.hostname,
            protocol: url.protocol.replace(':', ''),
          }
        }),
    ],
  },
  reactStrictMode: true,
  redirects,
}

export default withPayload(nextConfig)
