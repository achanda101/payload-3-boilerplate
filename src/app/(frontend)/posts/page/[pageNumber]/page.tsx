import type { Metadata } from 'next/types'
import Link from 'next/link'

import { CollectionArchive } from '@/components/CollectionArchive'
import { PageRange } from '@/components/PageRange'
import { Pagination } from '@/components/Pagination'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'
import PageClient from './page.client'
import { notFound } from 'next/navigation'

export const revalidate = 600

type Args = {
  params: Promise<{
    pageNumber: string
  }>
}

export default async function Page({ params: paramsPromise }: Args) {
  const { pageNumber } = await paramsPromise
  const sanitizedPageNumber = Number(pageNumber)

  if (!Number.isInteger(sanitizedPageNumber)) notFound()

  let posts: any = { docs: [], totalDocs: 0, totalPages: 0, page: sanitizedPageNumber }
  let hasError = false

  try {
    const payload = await getPayload({ config: configPromise })
    posts = await payload.find({
      collection: 'posts',
      depth: 1,
      limit: 12,
      page: sanitizedPageNumber,
      overrideAccess: false,
    })
  } catch (error) {
    console.error('Failed to fetch paginated posts:', error)
    hasError = true
  }

  return (
    <div className="pt-24 pb-24">
      <PageClient />
      <div className="container mb-16">
        <div className="prose dark:prose-invert max-w-none">
          <h1>Posts</h1>
        </div>
      </div>

      {hasError ? (
        <div className="container">
          <div className="flex flex-col items-center justify-center py-16 px-6">
            <div className="text-center max-w-2xl">
              <h2 className="text-2xl font-bold mb-4 text-red-600">Database Connection Error</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Unable to connect to the database. Please check your database connection and try again.
              </p>
              <Link
                href="/admin"
                className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200"
              >
                Go to Admin Dashboard
              </Link>
            </div>
          </div>
        </div>
      ) : posts.docs.length === 0 ? (
        <div className="container">
          <div className="flex flex-col items-center justify-center py-16 px-6">
            <div className="text-center max-w-2xl">
              <h2 className="text-2xl font-bold mb-4">No Posts Found</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                There are no posts available on this page. Try going back to the first page or create some posts.
              </p>
              <Link
                href="/admin"
                className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200"
              >
                Go to Admin Dashboard
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className="container mb-8">
            <PageRange
              collection="posts"
              currentPage={posts.page}
              limit={12}
              totalDocs={posts.totalDocs}
            />
          </div>

          <CollectionArchive posts={posts.docs} />

          <div className="container">
            {posts?.page && posts?.totalPages > 1 && (
              <Pagination page={posts.page} totalPages={posts.totalPages} />
            )}
          </div>
        </>
      )}
    </div>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { pageNumber } = await paramsPromise
  return {
    title: `Payload Website Template Posts Page ${pageNumber || ''}`,
  }
}

export async function generateStaticParams() {
  try {
    const payload = await getPayload({ config: configPromise })
    const { totalDocs } = await payload.count({
      collection: 'posts',
      overrideAccess: false,
    })

    const totalPages = Math.ceil(totalDocs / 12)

    const pages: { pageNumber: string }[] = []

    for (let i = 1; i <= totalPages; i++) {
      pages.push({ pageNumber: String(i) })
    }

    return pages
  } catch (error) {
    console.warn('Failed to generate static params for paginated posts:', error)
    return []
  }
}
