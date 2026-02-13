import type { Metadata } from 'next'
import { getServerSideURL } from './getURL'

const defaultOpenGraph: Metadata['openGraph'] = {
  type: 'website',
  description:
    'We are a feminist fund that boldly resources and powers women, trans, and non-binary human rights defenders in their critical defence of people and planet.',
  images: [
    {
      url: `${getServerSideURL()}/uafanp-icon.webp`,
    },
  ],
  siteName: 'Urgent Action Fund: Asia & Pacific',
  title: 'Urgent Action Fund: Asia & Pacific',
}

export const mergeOpenGraph = (og?: Metadata['openGraph']): Metadata['openGraph'] => {
  return {
    ...defaultOpenGraph,
    ...og,
    images: og?.images ? og.images : defaultOpenGraph.images,
  }
}
