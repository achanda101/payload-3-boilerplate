# PillarCard Block Implementation Plan

## Overview
New block type: numbered cards (2-4) with title + mascot image. Title/subtitle at block level with alignment option.

---

## Files to Create/Modify

### 1. Create Block Config
**File:** `src/blocks/PillarCard/config.ts`

```typescript
import { Block } from 'payload'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import {
  BoldFeature,
  UnderlineFeature,
  ItalicFeature,
  LinkFeature,
  InlineToolbarFeature,
} from '@payloadcms/richtext-lexical'

export const PillarCard: Block = {
  slug: 'pillarCard',
  labels: { singular: 'Pillar Card', plural: 'Pillar Cards' },
  imageURL: '/block_icons/pillarcard-block-icon.png',
  fields: [
    {
      type: 'row',
      fields: [
        {
          type: 'group',
          fields: [
            { name: 'title', type: 'text', localized: true },
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
          admin: { width: '50%' },
        },
        {
          name: 'subtitle',
          label: 'Subtitle',
          type: 'richText',
          editor: lexicalEditor({
            features: [
              BoldFeature(),
              UnderlineFeature(),
              ItalicFeature(),
              LinkFeature({ enabledCollections: ['grants', 'pages', 'reports', 'blog'] }),
              InlineToolbarFeature(),
            ],
          }),
          localized: true,
          admin: { width: '50%' },
        },
      ],
    },
    {
      name: 'cards',
      label: 'Pillar Cards',
      labels: { singular: 'Pillar Card', plural: 'Pillar Cards' },
      type: 'array',
      minRows: 2,
      maxRows: 4,
      fields: [
        { name: 'title', type: 'text', required: true, localized: true },
        {
          name: 'mascot',
          type: 'upload',
          relationTo: 'assetCloud',
          admin: { description: 'Mascot image for this pillar card' },
        },
      ],
      admin: {
        description: 'Add 2-4 pillar cards',
        components: {
          RowLabel: { path: 'src/blocks/PillarCard/CardRowLabel.tsx' },
        },
      },
    },
  ],
}
```

### 2. Create Row Label Component
**File:** `src/blocks/PillarCard/CardRowLabel.tsx`

```tsx
'use client'
import { useRowLabel } from '@payloadcms/ui'

export const CardRowLabel = () => {
  const { data, rowNumber } = useRowLabel<{ title?: string }>()
  const label = data?.title || `Card ${String(rowNumber).padStart(2, '0')}`
  return <div>{label}</div>
}
```

### 3. Create Component
**File:** `src/components/PillarCard/index.tsx`

```tsx
'use client'
import React from 'react'
import Image from 'next/image'
import { serializeLexical } from '@/components/RichText/serialize'
import '@/styles/cards.scss'

interface PillarCardProps {
  title?: string | null
  subtitle?: any
  align?: 'left' | 'center'
  cards?: {
    id: string
    title: string
    mascot?: {
      id: string
      alt: string | null
      url?: string | null
      width?: number | null
      height?: number | null
    }
  }[]
}

export const PillarCard: React.FC<PillarCardProps> = ({
  title,
  subtitle,
  align = 'left',
  cards,
}) => {
  const alignClass = align === 'center' ? 'text-center' : 'text-left'

  return (
    <>
      {/* Title */}
      {title && (
        <h3 className={`col-span-full ${alignClass}`}>{title}</h3>
      )}

      {/* Subtitle (Lexical rich text) */}
      {subtitle && typeof subtitle === 'object' ? (
        <div className={`col-span-full ${alignClass} -mt-6 prose dark:prose-invert`}>
          {serializeLexical({ nodes: subtitle.root?.children || [] })}
        </div>
      ) : subtitle ? (
        <p className={`col-span-full ${alignClass} -mt-6`}>{subtitle}</p>
      ) : null}

      {/* Cards Grid */}
      <div className="col-span-full grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        {cards?.map((card, index) => (
          <div key={card.id} className="pillarCard">
            <div className="p-6 md:p-8 flex flex-col h-full">
              {/* Card Number */}
              <span className="pillar_number">
                {String(index + 1).padStart(2, '0')}
              </span>

              {/* Card Title */}
              <h5 className="mt-2 mb-4">{card.title}</h5>

              {/* Mascot Image */}
              {card.mascot?.url && (
                <div className="mt-auto flex justify-center">
                  <Image
                    src={card.mascot.url}
                    alt={card.mascot.alt || 'Mascot'}
                    width={card.mascot.width || 150}
                    height={card.mascot.height || 200}
                    className="object-contain max-h-[200px] md:max-h-[250px]"
                  />
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  )
}
```

### 4. Add SCSS Styles
**File:** `src/styles/cards.scss` (append)

```scss
.pillarCard {
  background-image: url('/card_bg/pillarcard_bg.svg');
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-position: center;
  min-height: 100%;
  width: 100%;
  position: relative;

  > div {
    position: relative;
    z-index: 1;
  }

  @media (max-width: vars.$tablet) {
    background-image: url('/card_bg/pillarcard_bg_mob.svg');
  }
}

.pillar_number {
  font-family: vars.$font-heading;
  font-size: vars.$font-size-3xl;
  color: vars.$color-body-text-light;

  @media (max-width: vars.$tablet) {
    font-size: vars.$font-size-2xl;
  }
}
```

### 5. Register Block in Pages Collection
**File:** `src/collections/Pages/index.ts`

Add import:
```typescript
import { PillarCard } from '@/blocks/PillarCard/config'
```

Add to blocks array (~line 249-266):
```typescript
blocks: [
  // ... existing blocks
  PillarCard,
],
```

### 6. Register Block in Homepage Global
**File:** `src/globals/Homepage/config.ts`

Add import:
```typescript
import { PillarCard } from '@/blocks/PillarCard/config'
```

Add to blocks array (~line 132-149):
```typescript
blocks: [
  // ... existing blocks
  PillarCard,
],
```

### 7. Add to PageContent Renderer
**File:** `src/app/(frontend)/components/HomePageContent/PageContent.tsx`

Add import:
```typescript
import { PillarCard } from '@/components/PillarCard'
```

Add block type handler (after other block types):
```typescript
if (block.blockType === 'pillarCard') {
  return (
    <React.Fragment key={index}>
      <div className="page_column_layout gap-6">
        <PillarCard
          title={block.title}
          subtitle={block.subtitle}
          align={block.align}
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

### 8. (Optional) Create Block Icon
**File:** `public/block_icons/pillarcard-block-icon.png`

Create a 64x64 or 128x128 PNG icon for the block selector.

---

## Grid Layout Reference
- **Desktop (lg):** 12 columns, cards in 4-column grid (`grid-cols-4`)
- **Tablet (md):** 8 columns, cards in 2-column grid (`grid-cols-2`)
- **Mobile:** 6 columns, cards in 2-column grid (`grid-cols-2`)

---

## SVG Assets (Already Exist)
- Desktop: `/public/card_bg/pillarcard_bg.svg`
- Mobile/Tablet: `/public/card_bg/pillarcard_bg_mob.svg`

---

## Verification Steps
1. Run `pnpm dev` to start dev server
2. Navigate to Admin panel > Pages (or Homepage)
3. Add new PillarCard block
4. Verify:
   - Min 2 / Max 4 cards enforced
   - Title/subtitle alignment toggle works
   - Mascot upload from AssetCloud works
   - Cards render in 4-col (desktop) / 2-col (tablet/mobile) grid
   - Background SVGs switch at tablet breakpoint
   - Numbers display correctly (01, 02, 03, 04)

---

## Resolved
- Card numbers: Regular heading font (Roslindale Display), color `$color-body-text-light`
- Block icon: `/block_icons/pillarcard-block-icon.png` (provided)
- Subtitle: bold/italic/underline/link features only
