import type { Metadata } from 'next/types'
import Link from 'next/link'

import { CollectionArchive } from '@/components/CollectionArchive'
import { PageRange } from '@/components/PageRange'
import { Pagination } from '@/components/Pagination'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'

export const dynamic = 'force-static'
export const revalidate = 600

export default async function Page() {
  let posts: any = { docs: [], totalDocs: 0, totalPages: 0, page: 1 }
  let hasError = false

  try {
    const payload = await getPayload({ config: configPromise })
    posts = await payload.find({
      collection: 'posts',
      depth: 1,
      limit: 12,
      overrideAccess: false,
      select: {
        title: true,
        slug: true,
        categories: true,
        meta: true,
      },
    })
  } catch (error) {
    console.error('Failed to fetch posts:', error)
    hasError = true
  }

  return (
    <div>
      <h2>Feminist Futures.<br/>Forged In Fire.</h2>
      <h3>Need Support?<br/>Apply for a grant today.</h3>
      <h1><sup>$</sup>7.9M</h1>
      <p>UAF A&P offers funding to women and non-binary activists, their families and their organisations in times of crisis</p>
      <p>Will it pull the latest from Git???</p>
      <button className="pill-button dark">Apply for a Grant</button>
    </div>
  )
}

export function generateMetadata(): Metadata {
  return {
    title: `Urgent Action Fund: Asia & Pacific`,
    description: 'We are a feminist fund that boldly resources and powers women, trans, and non-binary human rights defenders in their critical defence of people and planet.',
  }
}
