'use client'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

interface SearchResult {
  id: string
  slug: string
  doc: {
    relationTo: string
    value: string | Record<string, unknown>
  }
  meta?: {
    title?: string
    description?: string
    image?: {
      id?: string
      url?: string
    }
  }
  contentData?: string
  author?: string
  publishedDate?: string
  categories?: Array<{
    relationTo?: string
    id?: string
    title?: string
  }>
}

export default function SearchPage() {
  const searchParams = useSearchParams()
  const query = searchParams.get('q')
  const [results, setResults] = useState<SearchResult[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!query || query.trim() === '') {
      setResults([])
      return
    }

    const performSearch = async () => {
      setLoading(true)
      setError(null)
      try {
        // Build Payload REST API query with OR conditions across searchable fields
        const searchParams = new URLSearchParams()

        // Search across title, description, and content data
        searchParams.set('where[or][0][meta.title][like]', query)
        searchParams.set('where[or][1][meta.description][like]', query)
        searchParams.set('where[or][2][contentData][like]', query)
        searchParams.set('limit', '20')
        searchParams.set('depth', '1')

        const response = await fetch(`/api/search?${searchParams.toString()}`)
        if (!response.ok) {
          throw new Error('Search failed')
        }
        const data = await response.json()
        setResults(data.docs || [])
      } catch (err) {
        setError('Failed to fetch search results. Please try again.')
        setResults([])
      } finally {
        setLoading(false)
      }
    }

    performSearch()
  }, [query])

  const getResultLink = (result: SearchResult): string => {
    const collection = result.doc?.relationTo
    if (!collection) return `/${result.slug}`

    switch (collection) {
      case 'blog':
        return `/blog/${result.slug}`
      case 'grants':
        return `/grants/${result.slug}`
      case 'reports':
        return `/reports/${result.slug}`
      case 'mmedia':
        return `/mmedia/${result.slug}`
      case 'grantcards':
        return `/grantcards/${result.slug}`
      case 'pages':
      default:
        return `/${result.slug}`
    }
  }

  // Extract a snippet around the search query with highlighted match
  const getSnippet = (
    content: string | undefined,
    searchQuery: string,
    contextLength: number = 60
  ): { before: string; match: string; after: string } | null => {
    if (!content || !searchQuery) return null

    const lowerContent = content.toLowerCase()
    const lowerQuery = searchQuery.toLowerCase()
    const matchIndex = lowerContent.indexOf(lowerQuery)

    if (matchIndex === -1) return null

    // Find word boundaries for cleaner snippets
    let startIndex = Math.max(0, matchIndex - contextLength)
    let endIndex = Math.min(content.length, matchIndex + searchQuery.length + contextLength)

    // Adjust to word boundaries
    if (startIndex > 0) {
      const spaceIndex = content.indexOf(' ', startIndex)
      if (spaceIndex !== -1 && spaceIndex < matchIndex) {
        startIndex = spaceIndex + 1
      }
    }

    if (endIndex < content.length) {
      const spaceIndex = content.lastIndexOf(' ', endIndex)
      if (spaceIndex !== -1 && spaceIndex > matchIndex + searchQuery.length) {
        endIndex = spaceIndex
      }
    }

    const before = (startIndex > 0 ? '...' : '') + content.slice(startIndex, matchIndex)
    const match = content.slice(matchIndex, matchIndex + searchQuery.length)
    const after = content.slice(matchIndex + searchQuery.length, endIndex) + (endIndex < content.length ? '...' : '')

    return { before, match, after }
  }

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-12">
        {/* Search Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-2">Search Results</h1>
          {query && (
            <p className="text-lg text-gray-600">
              {loading ? (
                'Searching for'
              ) : (
                <>
                  {results.length > 0 ? (
                    <>
                      Found {results.length} result{results.length !== 1 ? 's' : ''} for
                    </>
                  ) : (
                    'No results for'
                  )}
                </>
              )}{' '}
              <span className="font-semibold text-gray-900">&ldquo;{query}&rdquo;</span>
            </p>
          )}
        </div>

        {/* Error State */}
        {error && (
          <div className="mb-8 rounded-lg border border-red-200 bg-red-50 p-4">
            <p className="text-red-800">{error}</p>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center">
            <div className="h-12 w-12 animate-spin rounded-full border-4 border-gray-300 border-t-blue-600"></div>
          </div>
        )}

        {/* No Query State */}
        {!loading && !query && (
          <div className="rounded-lg border border-gray-200 bg-white p-8 text-center">
            <p className="text-gray-600">Enter a search term above to find content</p>
          </div>
        )}

        {/* No Results State */}
        {!loading && query && results.length === 0 && !error && (
          <div className="rounded-lg border border-gray-200 bg-white p-8 text-center">
            <p className="text-gray-600">
              No results found for &ldquo;{query}&rdquo;. Try using different keywords.
            </p>
          </div>
        )}

        {/* Results Grid */}
        {!loading && results.length > 0 && (
          <div className="space-y-6">
            {results.map((result) => (
              <article
                key={result.id}
                className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-shadow hover:shadow-md"
              >
                <Link href={getResultLink(result)}>
                  <div className="flex flex-col sm:flex-row">
                    {/* Image */}
                    {result.meta?.image?.url && (
                      <div className="relative h-48 w-full flex-shrink-0 sm:h-40 sm:w-40 md:h-48 md:w-48">
                        <Image
                          src={result.meta.image.url}
                          alt={result.meta.title || 'Result image'}
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}

                    {/* Content */}
                    <div className="flex flex-1 flex-col justify-between p-6">
                      {/* Title */}
                      <h2 className="mb-2 text-xl font-bold text-gray-900 hover:text-blue-600">
                        {result.meta?.title || result.slug}
                      </h2>

                      {/* Contextual Snippet with highlighted match */}
                      {query && result.contentData && (() => {
                        const snippet = getSnippet(result.contentData, query)
                        if (snippet) {
                          return (
                            <p className="mb-3 text-gray-600">
                              {snippet.before}
                              <mark className="bg-yellow-200 px-0.5 font-medium text-gray-900">
                                {snippet.match}
                              </mark>
                              {snippet.after}
                            </p>
                          )
                        }
                        return null
                      })()}

                      {/* Fallback: Description if no snippet match */}
                      {result.meta?.description && !getSnippet(result.contentData, query || '') && (
                        <p className="mb-3 line-clamp-2 text-gray-600">{result.meta.description}</p>
                      )}

                      {/* Metadata */}
                      <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                        {result.author && (
                          <span>
                            <span className="font-medium">By</span> {result.author}
                          </span>
                        )}
                        {result.publishedDate && (
                          <span>
                            {new Date(result.publishedDate).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric',
                            })}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
