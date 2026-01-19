'use client'
import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react'
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from '@/components/ui/carousel'
import WheelGestures from 'embla-carousel-wheel-gestures'
import { useMediaQuery } from '@/hooks/useMediaQuery'

interface TestimonialCardDeckProps {
  title?: string | null
  cards?: {
    id: string
    quote_text: string
    attrib_name?: string | null
    attrib_dsg?: string | null
  }[]
}

const TRUNCATE_LENGTH = 500

export const TestimonialCardDeck: React.FC<TestimonialCardDeckProps> = ({ title, cards }) => {
  const [api, setApi] = useState<CarouselApi>()
  const [canScrollPrev, setCanScrollPrev] = useState(false)
  const [canScrollNext, setCanScrollNext] = useState(false)
  const [expandedCards, setExpandedCards] = useState<Set<string>>(new Set())

  const isDesktop = useMediaQuery('(min-width: 1024px)')
  const isTablet = useMediaQuery('(min-width: 768px) and (max-width: 1023px)')

  // Toggle expanded state for a card
  const toggleExpanded = (cardId: string) => {
    setExpandedCards((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(cardId)) {
        newSet.delete(cardId)
      } else {
        newSet.add(cardId)
      }
      return newSet
    })
  }

  // Calculate card width: 4 columns on desktop/tablet, full span on mobile
  // Desktop: 12 columns total → 4 columns = 33.33%
  // Tablet: 8 columns total → 4 columns = 50%
  // Mobile: 6 columns total → full span = 100%
  let currentCardWidth = 100 // mobile default (full span)
  if (isDesktop) {
    currentCardWidth = 33.33 // 4 out of 12 columns
  } else if (isTablet) {
    currentCardWidth = 50 // 4 out of 8 columns
  }

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

  // Render quote with truncation + Read More
  const renderQuote = (card: { id: string; quote_text: string }) => {
    const isExpanded = expandedCards.has(card.id)
    const needsTruncation = card.quote_text.length > TRUNCATE_LENGTH

    if (!needsTruncation || isExpanded) {
      return (
        <>
          <p className="leading-relaxed mb-4">{card.quote_text}</p>
          {needsTruncation && (
            <button
              onClick={() => toggleExpanded(card.id)}
              className="no-underline hover:no-underline font-bold"
            >
              Read Less
            </button>
          )}
        </>
      )
    }

    return (
      <p className="leading-relaxed mb-4">
        {card.quote_text.slice(0, TRUNCATE_LENGTH)}...{' '}
        <button
          onClick={() => toggleExpanded(card.id)}
          className="no-underline hover:no-underline font-bold text-inherit inline-flex items-center gap-1"
        >
          Read More <ArrowRight className="w-4 h-4" />
        </button>
      </p>
    )
  }

  return (
    <>
      {/* Block Title */}
      {title && <h3 className="col-span-full">{title}</h3>}

      <div className="col-span-full relative">
        {/* Carousel for all screen sizes */}
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
          <CarouselContent className="-ml-4">
            {cards?.map((card) => (
              <CarouselItem key={card.id} className="pl-4 basis-auto">
                <div
                  className="bg-beige rounded-[40px] px-6 md:px-8 py-8 md:py-10 h-full flex flex-col"
                  style={{ width: `${currentCardWidth}vw` }}
                >
                  {/* Quote Icon */}
                  <Image
                    src="/block_icons/blockquote.svg"
                    alt="Quote"
                    width={60}
                    height={60}
                    className="mb-4"
                  />
                  {/* Quote Text with Read More */}
                  {card.quote_text && renderQuote(card)}
                  {/* Attribution */}
                  {card.attrib_name && <p className="mt-auto font-bold">- {card.attrib_name}</p>}
                  {card.attrib_dsg && <p className="font-bold">{card.attrib_dsg}</p>}
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>

          {/* Nav Arrows */}
          {canScrollPrev && (
            <button
              onClick={() => api?.scrollPrev()}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-background border-2 border-border flex items-center justify-center hover:bg-black hover:text-white hover:border-white transition-colors z-10"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
          )}
          {canScrollNext && (
            <button
              onClick={() => api?.scrollNext()}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-background border-2 border-border flex items-center justify-center hover:bg-black hover:text-white hover:border-white transition-colors z-10"
              aria-label="Next slide"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          )}
        </Carousel>
      </div>
    </>
  )
}
