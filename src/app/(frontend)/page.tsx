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
    <div className="pt-24 pb-24">
      <div className="container mb-16">
        <div className="prose dark:prose-invert max-w-none">
          <h1>Welcome</h1>
          <p>Latest posts from our blog</p>
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
              <h2 className="text-2xl font-bold mb-4">No Posts Yet</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                There are no blog posts available at the moment. Get started by creating your first post in the admin dashboard.
              </p>
              <Link
                href="/admin"
                className="inline-flex items-center px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white font-medium rounded-lg transition-colors duration-200"
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
            {posts.totalPages > 1 && posts.page && (
              <Pagination page={posts.page} totalPages={posts.totalPages} />
            )}
          </div>
        </>
      )}
    </div>
  )
}

export function generateMetadata(): Metadata {
  return {
    title: `Payload Website Template`,
    description: 'A website built with Payload CMS',
  }
}
