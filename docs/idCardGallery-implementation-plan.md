# ID Card Gallery Block Implementation Plan

## Overview

Create `idCardGallery` block for displaying team/staff ID cards with mascot images, pronouns, names, and designations in a responsive 5/4/3 grid layout.

---

## Block Specifications

| Property | Value |
|----------|-------|
| Slug | `idCardGallery` |
| Block Icon | `/block_icons/idcardgallery-block-icon.png` |
| Mascot Height | max 120px (width scales proportionally) |
| Grid | Desktop: 5 cols, Tablet: 4 cols, Mobile: 3 cols |

### Header Fields
- `title` - text, localized (renders as `<h3>`)
- `subtitle` - text, localized (renders as `<h4>`)
- `description` - textarea, localized (renders as `<p>`)
- All left-aligned

### Card Fields (array)
- `mascot` - upload from AssetCloud
- `pronouns` - text, localized
- `fullname` - text, required, localized
- `designation` - textarea, localized, maxLength: 200

---

## Implementation Steps

### Step 1: Create Block Config

**File:** `src/blocks/IDCardGallery/config.ts`

```typescript
import { Block } from 'payload'

export const IDCardGallery: Block = {
  slug: 'idCardGallery',
  labels: { singular: 'ID Card Gallery', plural: 'ID Card Galleries' },
  imageURL: '/block_icons/idcardgallery-block-icon.png',
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
            { name: 'subtitle', type: 'text', localized: true },
            { name: 'description', type: 'textarea', localized: true },
          ],
          admin: { width: '100%' },
        },
      ],
    },
    {
      name: 'cards',
      label: 'ID Cards',
      labels: { singular: 'ID Card', plural: 'ID Cards' },
      type: 'array',
      fields: [
        {
          name: 'mascot',
          type: 'upload',
          relationTo: 'assetCloud',
          admin: { description: 'Mascot image (displayed at max 120px height)' },
        },
        { name: 'pronouns', type: 'text', localized: true },
        { name: 'fullname', type: 'text', required: true, localized: true },
        {
          name: 'designation',
          type: 'textarea',
          localized: true,
          maxLength: 200,
          admin: { description: 'Max 200 characters' },
        },
      ],
      admin: {
        components: {
          RowLabel: { path: 'src/blocks/IDCardGallery/CardRowLabel.tsx' },
        },
      },
    },
  ],
}
```

---

### Step 2: Create CardRowLabel Component

**File:** `src/blocks/IDCardGallery/CardRowLabel.tsx`

```typescript
'use client'
import { useRowLabel } from '@payloadcms/ui'

export const CardRowLabel = () => {
  const { data, rowNumber } = useRowLabel<{ fullname?: string }>()
  const label = data?.fullname || `ID Card ${String(rowNumber).padStart(2, '0')}`
  return <div>{label}</div>
}

export default CardRowLabel
```

---

### Step 3: Create Frontend Component

**File:** `src/components/IDCardGallery/index.tsx`

```typescript
'use client'
import React from 'react'
import Image from 'next/image'

interface IDCardGalleryProps {
  header?: {
    title?: string | null
    subtitle?: string | null
    description?: string | null
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
    pronouns?: string | null
    fullname: string
    designation?: string | null
  }[]
}

export const IDCardGallery: React.FC<IDCardGalleryProps> = ({ header, cards }) => {
  return (
    <>
      {/* Block Header - Left Aligned */}
      {(header?.title || header?.subtitle || header?.description) && (
        <div className="col-span-6 md:col-span-5 lg:col-span-6">
          {header?.title && <h3 className="text-left">{header.title}</h3>}
          {header?.subtitle && <h4 className="text-left mt-2">{header.subtitle}</h4>}
          {header?.description && <p className="text-left mt-4">{header.description}</p>}
        </div>
      )}

      {/* Cards Grid: 3 mobile / 4 tablet / 5 desktop */}
      {cards && cards.length > 0 && (
        <div className="col-span-full grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 lg:gap-6">
          {cards.map((card) => (
            <div key={card.id} className="border-t border-black pt-4">
              {/* Mascot Image - max 120px height */}
              {card.mascot?.url && (
                <div className="mb-3">
                  <Image
                    src={card.mascot.url}
                    alt={card.mascot.alt || 'ID card mascot'}
                    width={Math.round(
                      (card.mascot.width || 120) * (120 / (card.mascot.height || 120)),
                    )}
                    height={120}
                    className="object-contain max-h-[120px] w-auto"
                  />
                </div>
              )}

              {/* Pronouns */}
              {card.pronouns && (
                <p className="text-sm text-gray-600 uppercase tracking-wide mb-1">
                  {card.pronouns}
                </p>
              )}

              {/* Full Name */}
              <h5 className="mb-1">{card.fullname}</h5>

              {/* Designation */}
              {card.designation && (
                <p className="text-sm" style={{ whiteSpace: 'pre-line' }}>
                  {card.designation}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </>
  )
}
```

---

### Step 4: Add Block to Collections

Add import and block to `contentBlocks` array in each file:

| Collection | File | Import Location | Add to blocks array |
|------------|------|-----------------|---------------------|
| Pages | `src/collections/Pages/index.ts` | ~line 39 | ~line 272 |
| Blog | `src/collections/Blog/index.ts` | ~line 37 | ~line 255 |
| Reports | `src/collections/Reports/index.ts` | ~line 35 | after MinimalCardGallery |
| MMedia | `src/collections/MMedia/index.ts` | top imports | contentBlocks array |
| Grants | `src/collections/Grants/index.ts` | top imports | contentBlocks array |
| Homepage | `src/globals/Homepage/config.ts` | ~line 35 | ~line 155 |

**Import statement:**
```typescript
import { IDCardGallery } from '@/blocks/IDCardGallery/config'
```

**Add to blocks array:**
```typescript
IDCardGallery,
```

---

### Step 5: Add Rendering to Page Components

Add import and render case to each page component:

| Page | File |
|------|------|
| UAFPage | `src/app/(frontend)/components/UAFPage/UAFPage.tsx` |
| BlogPage | `src/app/(frontend)/components/BlogPage/BlogPage.tsx` |
| ReportPage | `src/app/(frontend)/components/ReportPage/ReportPage.tsx` |
| PageContent | `src/app/(frontend)/components/HomePageContent/PageContent.tsx` |
| MMediaPage | `src/app/(frontend)/components/MMediaPage/MMediaPage.tsx` |
| GrantPage | `src/app/(frontend)/components/GrantPage/GrantPage.tsx` |

**Import statement:**
```typescript
import { IDCardGallery } from '@/components/IDCardGallery'
```

**Render case (add after `minCardGallery` case):**
```typescript
if (block.blockType === 'idCardGallery') {
  return (
    <React.Fragment key={index}>
      <div className="page_column_layout gap-6">
        <IDCardGallery header={block.header} cards={block.cards} />
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

---

### Step 6: Generate Migration

```bash
pnpm payload migrate:create add_id_card_gallery_block
```

---

## Files Summary

### New Files (3)
1. `src/blocks/IDCardGallery/config.ts`
2. `src/blocks/IDCardGallery/CardRowLabel.tsx`
3. `src/components/IDCardGallery/index.tsx`

### Modified Files (12)
**Collections (6):**
1. `src/collections/Pages/index.ts`
2. `src/collections/Blog/index.ts`
3. `src/collections/Reports/index.ts`
4. `src/collections/MMedia/index.ts`
5. `src/collections/Grants/index.ts`
6. `src/globals/Homepage/config.ts`

**Page Components (6):**
1. `src/app/(frontend)/components/UAFPage/UAFPage.tsx`
2. `src/app/(frontend)/components/BlogPage/BlogPage.tsx`
3. `src/app/(frontend)/components/ReportPage/ReportPage.tsx`
4. `src/app/(frontend)/components/HomePageContent/PageContent.tsx`
5. `src/app/(frontend)/components/MMediaPage/MMediaPage.tsx`
6. `src/app/(frontend)/components/GrantPage/GrantPage.tsx`

---

## Verification

1. Run `pnpm dev` - check for build errors
2. Open Payload admin panel
3. Navigate to any collection (Pages, Blog, etc.)
4. Add new ID Card Gallery block
5. Verify fields: header (title/subtitle/description) + cards array
6. Add test cards with mascot images from AssetCloud
7. Preview on frontend - verify responsive grid (resize browser)
8. Run migration: `pnpm payload migrate:create add_id_card_gallery_block`

---

## Reference Files

- Block pattern: `src/blocks/MinimalCardGallery/config.ts`
- Component pattern: `src/components/MinimalCardGallery/index.tsx`
- CardRowLabel pattern: `src/blocks/MinimalCardGallery/CardRowLabel.tsx`
- Collection pattern: `src/collections/Pages/index.ts` (lines 250-282)
- Render pattern: `src/app/(frontend)/components/UAFPage/UAFPage.tsx` (lines 512-528)

---

## Unresolved Questions

1. **Pronouns styling**: Match design exactly - uppercase with tracking? (e.g., "SHE / HER")
2. **Card spacing**: Current gap-4/gap-6 matches MinimalCardGallery - adjust if needed
3. **Empty mascot handling**: Skip image section or show placeholder?
4. **Typography**: h3/h4/h5/p styled globally or need custom styles?
