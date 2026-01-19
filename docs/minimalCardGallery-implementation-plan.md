# Minimal Card Gallery Block Implementation Plan

## Overview
New block type: Minimal Card Gallery - displays a grid of simple cards with mascot images, titles, and descriptions. Features block-level title/subtitle with alignment options.

**Design Reference:** See `minimalcardgallery-block-icon.png` - "Types of Grants We Gave" layout with icon-based cards showing stats.

---

## Block Specifications

### Block-Level Fields
| Field | Type | Details |
|-------|------|---------|
| title | text | Block title, localized |
| subtitle | textarea | Block subtitle, localized |
| align | radio | left \| center (default: left) |

### Card Fields
| Field | Type | Details |
|-------|------|---------|
| mascot | upload | relationTo: 'assetCloud', height fixed at 60px |
| title | text | Card title, localized, renders as `<h5>` |
| description | textarea | 200 character limit, localized, renders as `<p>` |

### Card Styling
- Top border: 1px solid black

### Grid Layout
| Breakpoint | Grid Columns | Card Span | Cards per Row |
|------------|--------------|-----------|---------------|
| Desktop (lg) | 12 | 4 | 3 cards |
| Tablet (md) | 8 | 4 | 2 cards |
| Mobile | 6 | 3 | 2 cards |

---

## Files to Create/Modify

### 1. Create Block Config
**File:** `src/blocks/MinimalCardGallery/config.ts`

```typescript
import { Block } from 'payload'

export const MinimalCardGallery: Block = {
  slug: 'minCardGallery',
  labels: { singular: 'Minimal Card Gallery', plural: 'Minimal Card Galleries' },
  imageURL: '/block_icons/minimalcardgallery-block-icon.png',
  fields: [
    {
      type: 'row',
      fields: [
        {
          type: 'group',
          name: 'header',
          label: 'Block Header',
          fields: [
            { name: 'title', type: 'text', localized: true },
            { name: 'subtitle', type: 'textarea', localized: true },
            {
              name: 'align',
              label: 'Title/Subtitle Alignment',
              type: 'radio',
              options: [
                { label: 'Left Align', value: 'left' },
                { label: 'Center Align', value: 'center' },
              ],
              defaultValue: 'left',
              admin: { layout: 'horizontal' },
            },
          ],
          admin: { width: '100%' },
        },
      ],
    },
    {
      name: 'cards',
      label: 'Cards',
      labels: { singular: 'Card', plural: 'Cards' },
      type: 'array',
      fields: [
        {
          name: 'mascot',
          type: 'upload',
          relationTo: 'assetCloud',
          admin: { description: 'Mascot image (displayed at 60px height)' },
        },
        { name: 'title', type: 'text', required: true, localized: true },
        {
          name: 'description',
          type: 'textarea',
          localized: true,
          maxLength: 200,
          admin: { description: 'Max 200 characters' },
        },
      ],
      admin: {
        components: {
          RowLabel: { path: 'src/blocks/MinimalCardGallery/CardRowLabel.tsx' },
        },
      },
    },
  ],
}
```

### 2. Create Row Label Component
**File:** `src/blocks/MinimalCardGallery/CardRowLabel.tsx`

```tsx
'use client'
import { useRowLabel } from '@payloadcms/ui'

export const CardRowLabel = () => {
  const { data, rowNumber } = useRowLabel<{ title?: string }>()
  const label = data?.title || `Card ${String(rowNumber).padStart(2, '0')}`
  return <div>{label}</div>
}

export default CardRowLabel
```

### 3. Create Component
**File:** `src/components/MinimalCardGallery/index.tsx`

```tsx
'use client'
import React from 'react'
import Image from 'next/image'

interface MinimalCardGalleryProps {
  header?: {
    title?: string | null
    subtitle?: string | null
    align?: 'left' | 'center'
  }
  cards?: {
    id: string
    mascot?: {
      id: string
      alt: string | null
      url?: string | null
      width?: number | null
      height?: number | null
    }
    title: string
    description?: string | null
  }[]
}

export const MinimalCardGallery: React.FC<MinimalCardGalleryProps> = ({
  header,
  cards,
}) => {
  const alignClass = header?.align === 'center' ? 'text-center' : 'text-left'

  return (
    <>
      {/* Block Title */}
      {header?.title && (
        <h3 className={`col-span-full ${alignClass}`}>{header.title}</h3>
      )}

      {/* Block Subtitle */}
      {header?.subtitle && (
        <p className={`col-span-full ${alignClass} -mt-4`}>{header.subtitle}</p>
      )}

      {/* Cards Grid */}
      {cards && cards.length > 0 && (
        <div className="col-span-full grid grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
          {cards.map((card) => (
            <div
              key={card.id}
              className="border-t border-black pt-4"
            >
              {/* Mascot Image - fixed 60px height */}
              {card.mascot?.url && (
                <div className="mb-3">
                  <Image
                    src={card.mascot.url}
                    alt={card.mascot.alt || 'Card mascot'}
                    width={Math.round((card.mascot.width || 60) * (60 / (card.mascot.height || 60)))}
                    height={60}
                    className="object-contain h-[60px] w-auto"
                  />
                </div>
              )}

              {/* Card Title */}
              <h5 className="mb-2">{card.title}</h5>

              {/* Card Description */}
              {card.description && (
                <p className="text-sm">{card.description}</p>
              )}
            </div>
          ))}
        </div>
      )}
    </>
  )
}
```

### 4. Register Block in Collections

#### 4a. Pages Collection
**File:** `src/collections/Pages/index.ts`

Add import:
```typescript
import { MinimalCardGallery } from '@/blocks/MinimalCardGallery/config'
```

Add to blocks array:
```typescript
blocks: [
  // ... existing blocks
  MinimalCardGallery,
],
```

#### 4b. Grants Collection
**File:** `src/collections/Grants/index.ts`
Same pattern as Pages.

#### 4c. Blog Collection
**File:** `src/collections/Blog/index.ts`
Same pattern as Pages.

#### 4d. Reports Collection
**File:** `src/collections/Reports/index.ts`
Same pattern as Pages.

#### 4e. MMedia Collection
**File:** `src/collections/MMedia/index.ts`
Same pattern as Pages.

#### 4f. Homepage Global
**File:** `src/globals/Homepage/config.ts`
Same pattern as Pages.

### 5. Add Component Renderers

Add to each page component:

**Import:**
```typescript
import { MinimalCardGallery } from '@/components/MinimalCardGallery'
```

**Block handler:**
```typescript
if (block.blockType === 'minCardGallery') {
  return (
    <React.Fragment key={index}>
      <div className="page_column_layout gap-6">
        <MinimalCardGallery
          header={block.header}
          cards={block.cards}
        />
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

#### Files to modify:
| File | Path |
|------|------|
| UAFPage.tsx | `src/app/(frontend)/components/UAFPage/UAFPage.tsx` |
| GrantPage.tsx | `src/app/(frontend)/components/GrantPage/GrantPage.tsx` |
| BlogPage.tsx | `src/app/(frontend)/components/BlogPage/BlogPage.tsx` |
| ReportPage.tsx | `src/app/(frontend)/components/ReportPage/ReportPage.tsx` |
| MMediaPage.tsx | `src/app/(frontend)/components/MMediaPage/MMediaPage.tsx` |
| PageContent.tsx | `src/app/(frontend)/components/HomePageContent/PageContent.tsx` |

### 6. (Optional) Create Block Icon
**File:** `public/block_icons/minimalcardgallery-block-icon.png`

Create a 64x64 or 128x128 PNG icon for the block selector.

---

## Summary of Files

### Create (4 files)
1. `src/blocks/MinimalCardGallery/config.ts`
2. `src/blocks/MinimalCardGallery/CardRowLabel.tsx`
3. `src/components/MinimalCardGallery/index.tsx`
4. `public/block_icons/minimalcardgallery-block-icon.png` (optional)

### Modify (12 files)
1. `src/collections/Pages/index.ts`
2. `src/collections/Grants/index.ts`
3. `src/collections/Blog/index.ts`
4. `src/collections/Reports/index.ts`
5. `src/collections/MMedia/index.ts`
6. `src/globals/Homepage/config.ts`
7. `src/app/(frontend)/components/UAFPage/UAFPage.tsx`
8. `src/app/(frontend)/components/GrantPage/GrantPage.tsx`
9. `src/app/(frontend)/components/BlogPage/BlogPage.tsx`
10. `src/app/(frontend)/components/ReportPage/ReportPage.tsx`
11. `src/app/(frontend)/components/MMediaPage/MMediaPage.tsx`
12. `src/app/(frontend)/components/HomePageContent/PageContent.tsx`

---

## Verification Steps

1. Run `pnpm dev` to start dev server
2. Navigate to Admin panel > Pages (or any registered collection)
3. Add new Minimal Card Gallery block
4. Verify:
   - Title/subtitle display with alignment toggle
   - Cards render with 1px top border
   - Mascot images display at 60px height
   - Description has 200 char limit in admin
   - Grid layout: 3 cards/row (desktop), 2 cards/row (tablet/mobile)
5. Test on all collections: Pages, Grants, Blog, Reports, MMedia, Homepage

---

## Notes
- Slug: `minCardGallery`
- No min/max rows constraint on cards array
- Cards use CSS grid with `grid-cols-2 lg:grid-cols-3` for responsive layout
- Image height is constrained via CSS `h-[60px]` with `object-contain`
