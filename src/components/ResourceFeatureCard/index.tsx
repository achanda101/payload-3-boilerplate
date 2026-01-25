'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from './ResourceCarousel'
import WheelGestures from 'embla-carousel-wheel-gestures'
import { serializeLexical } from '@/components/RichText/serialize'
import { Heading } from '@/components/Heading'
import type { Blog, Report, Mmedia, MediaCloud, Doctype } from '@/payload-types'

interface ResourceFeatureCardProps {
  title?: string | null
  align?: 'left' | 'center' | null
  desc?: any
  featCardList?:
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

// Helper function to format date as "MMM d, YYYY"
const formatDate = (dateString?: string | null): string | null => {
  if (!dateString) return null
  try {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    })
  } catch {
    return null
  }
}

// Helper function to get the collection name for URL construction
const getCollectionSlug = (relationTo?: string): string => {
  if (relationTo === 'pages') return ''
  return relationTo || ''
}

// Helper function to construct URL
const getResourceUrl = (slug?: string | null, relationTo?: string): string => {
  if (!slug) return '#'
  const collectionSlug = getCollectionSlug(relationTo)
  return collectionSlug ? `/${collectionSlug}/${slug}` : `/${slug}`
}

// Helper component to render a single card for carousel (image left, text right on desktop)
const CarouselResourceCard: React.FC<{
  item: Blog | Report | Mmedia
  relationTo: string
}> = ({ item, relationTo }) => {
  // Extract common fields
  const title = item.title
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
    <div className="page_column_layout gap-6">
      {/* Cover Image Section - LEFT side for desktop (7 columns), top for mobile/tablet */}
      <div className="col-span-full md:col-span-8 lg:col-span-7 order-1">
        {image?.url && (
          <Link href={resourceUrl} className="block">
            <div className="relative w-full h-[250px] md:h-[400px] lg:h-[500px] rounded-3xl overflow-hidden">
              <Image
                src={image.url}
                alt={image.alt || title || 'Resource image'}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 66vw, 58vw"
                className="object-cover"
                style={{
                  objectPosition: `${image.focalX ?? 50}% ${image.focalY ?? 50}%`,
                }}
              />
            </div>
          </Link>
        )}
      </div>

      {/* Text Content Section - RIGHT side for desktop (4 columns), bottom for mobile/tablet */}
      <div className="col-span-full md:col-span-8 lg:col-span-4 lg:col-start-9 flex flex-col justify-between order-2">
        <div>
          {/* Resource Type and Date */}
          {(resourceType || publicationDate) && (
            <div className="flex items-center gap-2 mb-2 lg:mb-4">
              {resourceType && <p className="tag">{resourceType}</p>}
              {resourceType && publicationDate && <span className="text-black">•</span>}
              {publicationDate && <p className="tag">{publicationDate}</p>}
            </div>
          )}

          {/* Title */}
          {title && (
            <div className="mb-2 lg:mb-4">
              <Heading level={4}>{title}</Heading>
            </div>
          )}

          {/* Subtitle/Description */}
          {heroSubtitle && (
            <div className="mb-4 lg:mb-6">
              <p className="text-color-light">{heroSubtitle}</p>
            </div>
          )}
        </div>

        {/* Read More Link */}
        <Link href={resourceUrl} className="inline-flex items-center gap-2 font-bold group">
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
    </div>
  )
}

// Helper component to render a single card (text left, image right on desktop)
const SingleResourceCard: React.FC<{
  item: Blog | Report | Mmedia
  relationTo: string
}> = ({ item, relationTo }) => {
  // Extract common fields
  const title = item.title
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
    <div className="page_column_layout gap-6">
      {/* Text Content Section - LEFT side for desktop (4 columns), bottom for mobile/tablet */}
      <div className="col-span-full md:col-span-8 lg:col-span-4 flex flex-col justify-between order-2 lg:order-none">
        <div>
          {/* Resource Type and Date */}
          {(resourceType || publicationDate) && (
            <div className="flex items-center gap-2 mb-2 lg:mb-4">
              {resourceType && <p className="tag">{resourceType}</p>}
              {resourceType && publicationDate && <span className="text-black">•</span>}
              {publicationDate && <p className="tag">{publicationDate}</p>}
            </div>
          )}

          {/* Title */}
          {title && (
            <div className="mb-2 lg:mb-4">
              <Heading level={4}>{title}</Heading>
            </div>
          )}

          {/* Subtitle/Description */}
          {heroSubtitle && (
            <div className="mb-4 lg:mb-6">
              <p className="text-color-light">{heroSubtitle}</p>
            </div>
          )}
        </div>

        {/* Read More Link */}
        <Link href={resourceUrl} className="inline-flex items-center gap-2 font-bold group">
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

      {/* Cover Image Section - RIGHT side for desktop (7 columns), top for mobile/tablet */}
      <div className="col-span-full md:col-span-8 lg:col-span-7 lg:col-start-6 order-1 lg:order-none">
        {image?.url && (
          <Link href={resourceUrl} className="block">
            <div className="relative w-full h-[250px] md:h-[400px] lg:h-[500px] rounded-3xl overflow-hidden">
              <Image
                src={image.url}
                alt={image.alt || title || 'Resource image'}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 66vw, 58vw"
                className="object-cover"
                style={{
                  objectPosition: `${image.focalX ?? 50}% ${image.focalY ?? 50}%`,
                }}
              />
            </div>
          </Link>
        )}
      </div>
    </div>
  )
}

export const ResourceFeatureCard: React.FC<ResourceFeatureCardProps> = ({
  title,
  align,
  desc,
  featCardList,
}) => {
  const [api, setApi] = useState<CarouselApi>()
  const [canScrollPrev, setCanScrollPrev] = useState(false)
  const [canScrollNext, setCanScrollNext] = useState(false)
  const [current, setCurrent] = useState(0)
  const [count, setCount] = useState(0)

  // Setup carousel state updates
  useEffect(() => {
    if (!api) return

    const updateState = () => {
      setCanScrollPrev(api.canScrollPrev())
      setCanScrollNext(api.canScrollNext())
      setCurrent(api.selectedScrollSnap())
      setCount(api.scrollSnapList().length)
    }

    updateState()
    api.on('select', updateState)
    api.on('reInit', updateState)

    return () => {
      api.off('select', updateState)
      api.off('reInit', updateState)
    }
  }, [api])

  // Only render if we have at least one item
  if (!featCardList || featCardList.length === 0) return null

  // Filter out any items with non-populated relationships
  const populatedItems = featCardList.filter((item) => typeof item.value !== 'number')

  if (populatedItems.length === 0) return null

  // Determine alignment class
  const textAlignClass = align === 'left' ? 'text-left' : 'text-center'

  // If there's only one item, render the single card layout
  if (populatedItems.length === 1) {
    const firstItem = populatedItems[0]
    const item = firstItem.value as Blog | Report | Mmedia
    const relationTo = firstItem.relationTo

    return (
      <>
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
        </div>
        <SingleResourceCard item={item} relationTo={relationTo} />
      </>
    )
  }

  // Multiple items - render carousel
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
      <div className="col-span-full relative">
        <Carousel
          setApi={setApi}
          opts={{
            align: 'center',
            loop: false,
            containScroll: false,
          }}
          plugins={[WheelGestures()]}
          className="w-full"
        >
          <CarouselContent>
            {populatedItems.map((featItem, index) => {
              const item = featItem.value as Blog | Report | Mmedia
              const relationTo = featItem.relationTo

              return (
                <CarouselItem key={index}>
                  <CarouselResourceCard item={item} relationTo={relationTo} />
                </CarouselItem>
              )
            })}
          </CarouselContent>

          {/* Desktop Navigation Arrows - Side positioned */}
          {canScrollPrev && (
            <button
              onClick={() => api?.scrollPrev()}
              className="hidden lg:flex absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-background border-2 border-border items-center justify-center hover:bg-black hover:text-white hover:border-white transition-colors z-10"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
          )}

          {canScrollNext && (
            <button
              onClick={() => api?.scrollNext()}
              className="hidden lg:flex absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-background border-2 border-border items-center justify-center hover:bg-black hover:text-white hover:border-white transition-colors z-10"
              aria-label="Next slide"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          )}
        </Carousel>
      </div>
      {/* Navigation Controls - Bottom row */}
      <div className="col-span-full grid grid-cols-3 items-center gap-4 mt-4 lg:flex lg:justify-center">
        {/* Mobile/Tablet Previous Link */}
        <div className="lg:hidden flex justify-start">
          {canScrollPrev && (
            <button
              onClick={() => api?.scrollPrev()}
              className="flex items-center gap-1 text-sm font-medium hover:opacity-70 transition-opacity"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Prev</span>
            </button>
          )}
        </div>

        {/* Navigation Dots */}
        <div className="flex items-center gap-2 justify-center">
          {Array.from({ length: count }).map((_, index) => {
            // For more than 4 items, use smart display logic
            if (count > 4) {
              // Always show first item
              if (index === 0) {
                return (
                  <button
                    key={index}
                    onClick={() => api?.scrollTo(index)}
                    className={`w-6 h-6 rounded-full transition-all flex items-center justify-center text-xs font-medium ${
                      index === current
                        ? 'bg-black text-white border-[1px] border-black'
                        : 'bg-transparent text-black border border-black hover:bg-black hover:text-white'
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  >
                    {index + 1}
                  </button>
                )
              }

              // If current is in first 2 positions (0, 1), show: 1 2 ... last
              if (current <= 1) {
                if (index === 1) {
                  return (
                    <button
                      key={index}
                      onClick={() => api?.scrollTo(index)}
                      className={`w-6 h-6 rounded-full transition-all flex items-center justify-center text-xs font-medium ${
                        index === current
                          ? 'bg-black text-white border-[1px] border-black'
                          : 'bg-transparent text-black border border-black hover:bg-black hover:text-white'
                      }`}
                      aria-label={`Go to slide ${index + 1}`}
                    >
                      {index + 1}
                    </button>
                  )
                }
                if (index === 2) {
                  return (
                    <span key="ellipsis-1" className="text-gray-400 px-1">
                      ...
                    </span>
                  )
                }
                if (index === count - 1) {
                  return (
                    <button
                      key={index}
                      onClick={() => api?.scrollTo(index)}
                      className={`w-6 h-6 rounded-full transition-all flex items-center justify-center text-xs font-medium ${
                        index === current
                          ? 'bg-black text-white border-[1px] border-black'
                          : 'bg-transparent text-black border border-black hover:bg-black hover:text-white'
                      }`}
                      aria-label={`Go to slide ${index + 1}`}
                    >
                      {index + 1}
                    </button>
                  )
                }
                return null
              }

              // If current is in last 2 positions, show: 1 ... (last-1) last
              if (current >= count - 2) {
                if (index === 1) {
                  return (
                    <span key="ellipsis-1" className="text-gray-400 px-1">
                      ...
                    </span>
                  )
                }
                if (index === count - 2 || index === count - 1) {
                  return (
                    <button
                      key={index}
                      onClick={() => api?.scrollTo(index)}
                      className={`w-6 h-6 rounded-full transition-all flex items-center justify-center text-xs font-medium ${
                        index === current
                          ? 'bg-black text-white border-[1px] border-black'
                          : 'bg-transparent text-black border border-black hover:bg-black hover:text-white'
                      }`}
                      aria-label={`Go to slide ${index + 1}`}
                    >
                      {index + 1}
                    </button>
                  )
                }
                return null
              }

              // Current is in the middle, show: 1 ... current ... last
              if (index === 1) {
                return (
                  <span key="ellipsis-1" className="text-gray-400 px-1">
                    ...
                  </span>
                )
              }
              if (index === current) {
                return (
                  <button
                    key={index}
                    onClick={() => api?.scrollTo(index)}
                    className={`w-6 h-6 rounded-full transition-all flex items-center justify-center text-xs font-medium ${
                      index === current
                        ? 'bg-black text-white border-[1px] border-black'
                        : 'bg-transparent text-black border border-black hover:bg-black hover:text-white'
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  >
                    {index + 1}
                  </button>
                )
              }
              if (index === current + 1) {
                return (
                  <span key="ellipsis-2" className="text-gray-400 px-1">
                    ...
                  </span>
                )
              }
              if (index === count - 1) {
                return (
                  <button
                    key={index}
                    onClick={() => api?.scrollTo(index)}
                    className={`w-6 h-6 rounded-full transition-all flex items-center justify-center text-xs font-medium ${
                      index === current
                        ? 'bg-black text-white border-[1px] border-black'
                        : 'bg-transparent text-black border border-black hover:bg-black hover:text-white'
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  >
                    {index + 1}
                  </button>
                )
              }
              return null
            }

            // For 4 or fewer items, show all
            return (
              <button
                key={index}
                onClick={() => api?.scrollTo(index)}
                className={`w-6 h-6 rounded-full transition-all flex items-center justify-center text-xs font-medium ${
                  index === current
                    ? 'bg-black text-white border-[1px] border-black'
                    : 'bg-transparent text-black border-[1px] border-black hover:bg-black hover:text-white'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              >
                {index + 1}
              </button>
            )
          })}
        </div>

        {/* Mobile/Tablet Next Link */}
        <div className="lg:hidden flex justify-end">
          {canScrollNext && (
            <button
              onClick={() => api?.scrollNext()}
              className="flex items-center gap-1 text-sm font-medium hover:opacity-70 transition-opacity"
              aria-label="Next slide"
            >
              <span>Next</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
