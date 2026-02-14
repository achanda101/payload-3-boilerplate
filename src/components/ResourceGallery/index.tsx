'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { serializeLexical } from '@/components/RichText/serialize'
import { Heading } from '@/components/Heading'
import { useLanguage } from '@/providers/LanguageContext'
import type { Blog, Report, Mmedia, MediaCloud, Doctype } from '@/payload-types'

interface ResourceGalleryProps {
  title?: string | null
  align?: 'left' | 'center' | null
  desc?: any
  galleryList?:
    | (
        | {
            relationTo: 'blog'
            value: number | Blog
          }
        | {
            relationTo: 'reports'
            value: number | Report
          }
        | {
            relationTo: 'mmedia'
            value: number | Mmedia
          }
      )[]
    | null
}

// Helper function to format date as "MMM D, YYYY" (uppercase)
const formatDate = (dateString?: string | null): string | null => {
  if (!dateString) return null
  try {
    const date = new Date(dateString)
    return date
      .toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      })
      .toUpperCase()
  } catch {
    return null
  }
}

// Helper function to get the collection name for URL construction
const getCollectionSlug = (relationTo?: string): string => {
  if (relationTo === 'pages') return ''
  return relationTo || ''
}

// Helper component to render a single gallery card
const GalleryCard: React.FC<{
  item: Blog | Report | Mmedia
  relationTo: string
  locale: string
}> = ({ item, relationTo, locale }) => {
  // Helper function to construct locale-aware URL
  const getResourceUrl = (slug?: string | null, relationTo?: string): string => {
    if (!slug) return '#'
    const collectionSlug = getCollectionSlug(relationTo)
    return collectionSlug ? `/${locale}/${collectionSlug}/${slug}` : `/${locale}/${slug}`
  }
  // Extract common fields
  const title = 'heroTitle' in item && item.heroTitle ? item.heroTitle : item.title
  const slug = item.slug
  const heroSubtitle = item.heroSubtitle

  // Get the cover image
  const image =
    'image' in item && typeof item.image === 'object' ? (item.image as MediaCloud) : null

  // Get resource type (first docType if available)
  let resourceType: string | null = null
  if ('docType' in item && item.docType && Array.isArray(item.docType) && item.docType.length > 0) {
    const firstDocType = item.docType[0]
    if (typeof firstDocType === 'object' && 'type' in firstDocType) {
      resourceType = (firstDocType as Doctype).type
    }
  }

  // Get publication date
  let publicationDate: string | null = null
  if ('pubDate' in item && item.pubDate) {
    publicationDate = formatDate(item.pubDate)
  } else if ('publishedAt' in item && item.publishedAt) {
    publicationDate = formatDate(item.publishedAt)
  }

  // Construct the URL
  const resourceUrl = getResourceUrl(slug, relationTo)

  return (
    <div className="flex flex-col">
      {/* Cover Image */}
      {image?.url && (
        <Link href={resourceUrl} className="block mb-4">
          {/* <div className="relative w-full h-[250px] rounded-3xl overflow-hidden"> */}
          <div className="w-full relative mb-4 h-80 overflow-hidden rounded-2xl cursor-pointer hover:opacity-90 transition-opacity">
            <Image
              src={image.url}
              alt={image.alt || title || 'Resource image'}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover"
              style={{
                objectPosition: `${image.focalX ?? 50}% ${image.focalY ?? 50}%`,
              }}
            />
          </div>
        </Link>
      )}

      {/* Resource Type and Date */}
      {(resourceType || publicationDate) && (
        <div className="flex items-center gap-2 mb-2">
          {resourceType && <p className="tag uppercase">{resourceType}</p>}
          {resourceType && publicationDate && <span className="text-black">•</span>}
          {publicationDate && <p className="tag">{publicationDate}</p>}
        </div>
      )}

      {/* Title */}
      {title && (
        <div className="mb-2">
          <Heading level={6}>{title}</Heading>
        </div>
      )}

      {/* Subtitle/Description */}
      {heroSubtitle && (
        <div className="mb-4">
          <p className="text-color-light">{heroSubtitle}</p>
        </div>
      )}

      {/* Read More Link */}
      <Link href={resourceUrl} className="inline-flex items-center gap-2 font-bold group mt-auto">
        <span>Read More</span>
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="transition-transform group-hover:translate-x-1"
        >
          <path
            d="M1 8H15M15 8L8 1M15 8L8 15"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </Link>
    </div>
  )
}

export const ResourceGallery: React.FC<ResourceGalleryProps> = ({
  title,
  align,
  desc,
  galleryList,
}) => {
  const { selectedLanguage } = useLanguage()
  const [displayCount, setDisplayCount] = useState(6)

  // Only render if we have at least one item
  if (!galleryList || galleryList.length === 0) return null

  // Filter out any items with non-populated relationships
  const populatedItems = galleryList.filter((item) => typeof item.value !== 'number')

  if (populatedItems.length === 0) return null

  // Get items to display based on current count
  const itemsToDisplay = populatedItems.slice(0, displayCount)

  // Determine alignment class
  const textAlignClass = align === 'left' ? 'text-left' : 'text-center'

  return (
    <div className="page_column_layout gap-6">
      {/* Header Section - Title and Description */}
      {(title || desc) && (
        <div className={`col-span-full ${textAlignClass}`}>
          {title && <Heading level={3}>{title}</Heading>}
          {desc && typeof desc === 'object' ? (
            <div className="mt-1">{serializeLexical({ nodes: desc.root?.children || [] })}</div>
          ) : (
            <p className="mt-1">{desc}</p>
          )}
        </div>
      )}

      <div className="col-span-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 lg:gap-12">
        {itemsToDisplay.map((galleryItem) => {
          const item = galleryItem.value as Blog | Report | Mmedia
          const relationTo = galleryItem.relationTo

          return <GalleryCard key={`${relationTo}-${item.id}`} item={item} relationTo={relationTo} locale={selectedLanguage} />
        })}
      </div>

      {/* Load More button */}
      {displayCount < populatedItems.length && (
        <div className="col-span-full flex justify-center mt-12">
          <button
            onClick={() => setDisplayCount((prev) => prev + 6)}
            className="px-6 py-3 rounded-full border-[1px] border-black bg-transparent text-black font-medium hover:bg-black hover:text-white transition-colors"
          >
            Load More
          </button>
        </div>
      )}
    </div>
  )
}
