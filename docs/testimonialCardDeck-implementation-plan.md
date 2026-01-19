# Testimonial Card Deck Block Implementation Plan

## Overview
Carousel slider of testimonial cards using Embla Carousel (all screen sizes). Each card has quote_text (max 1000 chars, truncated to 500 with Read More), attrib_name, attrib_dsg. Cards: 40px corner radius, beige background.

---

## Files to Create/Modify

| File | Action |
|------|--------|
| `src/blocks/TestimonialCardDeck/config.ts` | Create block config |
| `src/blocks/TestimonialCardDeck/CardRowLabel.tsx` | Create row label |
| `src/components/TestimonialCardDeck/index.tsx` | Create render component |
| `src/collections/Blog/index.ts` | Register block |
| `src/collections/Grants/index.ts` | Register block |
| `src/collections/MMedia/index.ts` | Register block |
| `src/collections/Pages/index.ts` | Register block |
| `src/collections/Reports/index.ts` | Register block |
| `src/globals/Homepage/config.ts` | Register block |
| `src/app/(frontend)/components/BlogPage/BlogPage.tsx` | Add handler |
| `src/app/(frontend)/components/GrantPage/GrantPage.tsx` | Add handler |
| `src/app/(frontend)/components/HomePageContent/PageContent.tsx` | Add handler |
| `src/app/(frontend)/components/MMediaPage/MMediaPage.tsx` | Add handler |
| `src/app/(frontend)/components/ReportPage/ReportPage.tsx` | Add handler |
| `src/app/(frontend)/components/UAFPage/UAFPage.tsx` | Add handler |

---

## 1. Block Config
**File:** `src/blocks/TestimonialCardDeck/config.ts`

```typescript
import { Block } from 'payload'

export const TestimonialCardDeck: Block = {
  slug: 'testimonialDeck',
  labels: {
    singular: 'Testimonial Card Deck',
    plural: 'Testimonial Card Decks',
  },
  imageURL: '/block_icons/testimonial-block-icon.png',
  fields: [
    {
      name: 'title',
      label: 'Block Title',
      type: 'text',
      localized: true,
      admin: {
        placeholder: 'e.g., Testimonials',
      },
    },
    {
      name: 'cards',
      label: 'Testimonial Cards',
      labels: {
        singular: 'Testimonial Card',
        plural: 'Testimonial Cards',
      },
      type: 'array',
      minRows: 3,
      fields: [
        {
          name: 'quote_text',
          label: 'Quote Text',
          type: 'textarea',
          required: true,
          localized: true,
          maxLength: 1000,  // Character limit
          admin: {
            components: {
              afterInput: [{ path: '@/utilities/characterCounter.tsx' }],
            },
          },
        },
        {
          name: 'attrib_name',
          label: 'Attribution Name',
          type: 'text',
          localized: true,
        },
        {
          name: 'attrib_dsg',
          label: 'Attribution Designation',
          type: 'text',
          localized: true,
        },
      ],
      admin: {
        description: 'Add at least 3 testimonial cards',
        components: {
          RowLabel: { path: 'src/blocks/TestimonialCardDeck/CardRowLabel.tsx' },
        },
      },
    },
  ],
}
```

---

## 2. Row Label Component
**File:** `src/blocks/TestimonialCardDeck/CardRowLabel.tsx`

```tsx
'use client'
import { useRowLabel } from '@payloadcms/ui'

export const CardRowLabel = () => {
  const { data, rowNumber } = useRowLabel<{ attrib_name?: string }>()
  const label = data?.attrib_name || `Testimonial ${String(rowNumber).padStart(2, '0')}`
  return <div>{label}</div>
}
```

---

## 3. Render Component
**File:** `src/components/TestimonialCardDeck/index.tsx`

Key features:
- Embla carousel on ALL screen sizes (desktop, tablet, mobile)
- Quote truncated to 500 chars with "... Read More" link
- Read More: no text decoration, expands card on click
- Track expanded state per card

```tsx
'use client'
import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from '@/components/ui/carousel'
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

  // Calculate card width based on viewport
  let currentCardWidth = 90 // mobile default
  if (isDesktop) {
    const desiredCardWidth = Math.max(100 / (cards?.length || 3), 18)
    currentCardWidth = Math.min(desiredCardWidth, 28)
  } else if (isTablet) {
    const desiredCardWidth = Math.max(100 / (cards?.length || 3), 40)
    currentCardWidth = Math.min(desiredCardWidth, 48)
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
              className="no-underline hover:no-underline text-inherit"
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
          className="no-underline hover:no-underline text-inherit inline"
        >
          Read More
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
                  {card.attrib_name && (
                    <p className="italic text-right mt-auto">- {card.attrib_name}</p>
                  )}
                  {card.attrib_dsg && (
                    <p className="italic text-right">{card.attrib_dsg}</p>
                  )}
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
```

---

## 4. Register Block in Collections

Add to each collection's `contentBlocks` array:

```typescript
import { TestimonialCardDeck } from '@/blocks/TestimonialCardDeck/config'
// ... add TestimonialCardDeck to blocks array
```

**Collections:**
- `src/collections/Blog/index.ts`
- `src/collections/Grants/index.ts`
- `src/collections/MMedia/index.ts`
- `src/collections/Pages/index.ts`
- `src/collections/Reports/index.ts`

---

## 5. Register Block in Homepage Global
**File:** `src/globals/Homepage/config.ts`
- Add import and add to `contentBlocks` array

---

## 6. Add Block Handlers to Page Renderers

**Import:**
```typescript
import { TestimonialCardDeck } from '@/components/TestimonialCardDeck'
```

**Handler:**
```typescript
if (block.blockType === 'testimonialDeck') {
  return (
    <React.Fragment key={index}>
      <div className="page_column_layout gap-6">
        <TestimonialCardDeck title={block.title} cards={block.cards} />
      </div>
      {process.env.NEXT_PUBLIC_SHOW_COLUMN_INDICATORS === 'true' && (
        <div className="page_column_layout gap-6">
          <ColumnIndicators />
        </div>
      )}
    </React.Fragment>
  )
}
```

**Files:**
1. `BlogPage.tsx`
2. `GrantPage.tsx`
3. `PageContent.tsx`
4. `MMediaPage.tsx`
5. `ReportPage.tsx`
6. `UAFPage.tsx`

---

## Verification
1. `pnpm dev`
2. Add block in Admin
3. Check:
   - Min 3 cards enforced
   - Quote maxLength 1000 with character counter
   - Quote truncates at 500 chars with "... Read More"
   - Read More link: no underline, expands card height
   - Carousel works on desktop, tablet, AND mobile
   - Cards have 40px radius, beige bg, all text in `<p>`

---

## Assets Required
- `/public/block_icons/testimonial-block-icon.png` (exists)
- `/public/block_icons/blockquote.svg` (exists)

---

## Unresolved Questions
None.
