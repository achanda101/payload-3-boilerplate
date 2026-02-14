import React, { useState, useEffect, useMemo } from 'react'
import { ChevronDown, ChevronUp, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react'
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from '@/components/ui/carousel'
import WheelGestures from 'embla-carousel-wheel-gestures'
import Image from 'next/image'
import Link from 'next/link'
import { ButtonArray } from '@/components/ButtonArray'
import { UAFButton } from '@/components/UAFButton'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { Heading } from '@/components/Heading'
import { useLanguage } from '@/providers/LanguageContext'

interface ListingCardDeckProps {
  title: string | null
  dataSource?: 'manual' | 'resources'
  cards?: {
    id: string
    title: string | null
    desc: string | null
    image?: {
      id: string
      alt: string | null
      url?: string | null
      width?: number | null
      height?: number | null
      focalX?: number | null
      focalY?: number | null
    }
    tags?: {
      id: string
      tag: string | null
    }[]
    link: {
      type: string
      newTab?: boolean | null
      downloadLink?: boolean | null
      arrowLink?: boolean | null
      pillSolid?: boolean | null
      pillOutline?: boolean | null
      url?: string | null
      email?: string | null
      label: string | null
      doc?: {
        relationTo: string
        value: {
          url?: string
        }
      } | null
      reference?: {
        relationTo?: string
        value: {
          slug?: string
        }
      }
    }
  }[]
  resourcePages?: {
    relationTo: 'blog' | 'reports' | 'mmedia'
    value:
      | number
      | {
          id: string
          title: string
          heroTitle?: string
          slug: string
          heroSubtitle?: string
          image?: {
            id: string
            alt: string | null
            url?: string | null
            width?: number | null
            height?: number | null
            focalX?: number | null
            focalY?: number | null
          }
          docType?: {
            id: string
            type: string
          }[]
          publishedAt?: string
          pubDate?: string
        }
  }[]
  buttons?: {
    id: string
    link: {
      type: string
      newTab?: boolean | null
      downloadLink?: boolean | null
      arrowLink?: boolean | null
      pillSolid?: boolean | null
      pillOutline?: boolean | null
      url?: string | null
      email?: string | null
      label: string | null
      doc?: {
        relationTo: string
        value: {
          url?: string
        }
      } | null
      reference?: {
        relationTo?: string
        value: {
          slug?: string
        }
      }
    }
  }[]
}

export const ListingCardDeck: React.FC<ListingCardDeckProps> = ({
  title,
  dataSource = 'manual',
  cards,
  resourcePages,
  buttons,
}) => {
  const { selectedLanguage } = useLanguage()
  const [api, setApi] = useState<CarouselApi>()
  const [canScrollPrev, setCanScrollPrev] = useState(false)
  const [canScrollNext, setCanScrollNext] = useState(false)

  // Call hooks at the top level before any early returns
  const isDesktop = useMediaQuery('(min-width: 1024px)')
  const isTablet = useMediaQuery('(min-width: 768px) and (max-width: 1023px)')

  useEffect(() => {
    if (!api) return

    const updateScrollButtons = () => {
      setCanScrollPrev(api.canScrollPrev())
      setCanScrollNext(api.canScrollNext())
    }

    updateScrollButtons()
    api.on('select', updateScrollButtons)
    api.on('reInit', updateScrollButtons)

    return () => {
      api.off('select', updateScrollButtons)
      api.off('reInit', updateScrollButtons)
    }
  }, [api])

  // Normalize cards based on data source
  const normalizedCards = useMemo(() => {
    if (dataSource === 'resources' && resourcePages?.length) {
      // Filter out non-populated relationships (where value is just an ID number)
      const populatedItems = resourcePages.filter((item) => typeof item.value !== 'number')

      return populatedItems.map((item) => {
        const doc = item.value as Exclude<typeof item.value, number>
        const relationTo = item.relationTo

        // Build tags from docType
        const tags =
          doc.docType
            ?.map((dt) => ({
              id: dt.id,
              tag: dt.type || null,
            }))
            .filter((t) => t.tag) || []

        // Add publication date as the last tag
        const dateStr = doc.pubDate || doc.publishedAt
        if (dateStr) {
          const formattedDate = new Date(dateStr).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
          })
          tags.push({
            id: 'publishedAt',
            tag: formattedDate.toUpperCase(),
          })
        }

        return {
          id: doc.id,
          title: doc.heroTitle || doc.title || null,
          desc: doc.heroSubtitle || null,
          image: typeof doc.image === 'object' ? doc.image : undefined,
          tags,
          link: {
            type: 'custom',
            url: `/${selectedLanguage}/${relationTo}/${doc.slug}`,
            label: 'Read More',
            arrowLink: true,
          },
        }
      })
    }
    return cards || []
  }, [dataSource, resourcePages, cards])

  // Early return if no cards
  if (!normalizedCards || normalizedCards.length === 0) {
    return null
  }

  // Calculate width based on the number of cards and available space
  let currentCardWidth = 0
  if (isDesktop) {
    const desiredCardWidth = Math.max(100 / normalizedCards.length, 18)
    currentCardWidth = Math.min(desiredCardWidth, 28)
  } else if (isTablet) {
    const desiredCardWidth = Math.max(100 / normalizedCards.length, 40)
    currentCardWidth = Math.min(desiredCardWidth, 48)
  } else {
    currentCardWidth = 80 //80vw for mobile
  }

  return (
    <>
      {title && (
        <Heading level={3} className="col-span-6 md:col-start-2 lg:col-start-4 mb-6 text-center">
          {title}
        </Heading>
      )}
      <div className="col-span-full relative overflow-x-hidden sm:overflow-x-visible">
        <Carousel
          setApi={setApi}
          opts={{
            align: 'start',
            loop: false,
            dragFree: true,
          }}
          plugins={[WheelGestures()]}
          className="w-full"
        >
          <CarouselContent className="-ml-0">
            {normalizedCards.map((card, cardIndex: number) => (
              <CarouselItem key={`${card.id}-${cardIndex}`} className="pl-0 mx-auto basis-auto">
                <div
                  className={`px-[1rem] py-0 h-full flex flex-col`}
                  style={{ width: `${currentCardWidth}vw` }}
                >
                  {card.image?.url && (
                    <Link href={card.link?.url || '#'}>
                      <div className="w-full relative mb-4 h-80 overflow-hidden rounded-2xl cursor-pointer hover:opacity-90 transition-opacity">
                        <Image
                          src={card.image.url}
                          alt={card.image.alt || 'Listing Card Image'}
                          fill
                          sizes="(max-width: 768px) 80vw, (max-width: 1023px) 48vw, 28vw"
                          className="object-cover"
                          style={{
                            objectPosition: `${card.image.focalX ?? 50}% ${card.image.focalY ?? 50}%`,
                          }}
                        />
                      </div>
                    </Link>
                  )}
                  {card.tags && (
                    <div className="flex flex-wrap gap-1 items-center mb-2">
                      {card.tags.map((tag, index) => (
                        <React.Fragment key={tag.id || index}>
                          <span className="tag">{tag.tag}</span>
                          {index < card.tags!.length - 1 && <span className="mx-0.5">•</span>}
                        </React.Fragment>
                      ))}
                    </div>
                  )}
                  {card.title && (
                    <Heading level={5} className="mb-2">
                      {card.title}
                    </Heading>
                  )}
                  {card.desc && <p className="mt-2 mb-4 text-color-light">{card.desc}</p>}
                  {card.link && (
                    <div className="text-base">
                      <UAFButton button={card.link} align="left" />
                    </div>
                  )}
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          {canScrollPrev && (
            <button
              onClick={() => api?.scrollPrev()}
              className="hidden absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-background border-2 border-border md:flex items-center justify-center hover:bg-black hover:text-white hover:border-white transition-colors z-10"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
          )}

          {canScrollNext && (
            <button
              onClick={() => api?.scrollNext()}
              className="hidden absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-background border-2 border-border md:flex items-center justify-center hover:bg-black hover:text-white hover:border-white transition-colors z-10"
              aria-label="Next slide"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          )}
        </Carousel>
        {buttons && (
          <div className="pt-[1rem] md:pt-[3rem]">
            <ButtonArray btnArray={buttons} colStackOnMobile={true} />
          </div>
        )}
      </div>
    </>
  )
}
