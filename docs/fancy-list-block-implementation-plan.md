# Fancy List Block Implementation Plan

## Overview
Create a new block type called "Fancy List" for use within RichContentBlock's Lexical editor. Each list item has a custom mascot image as the list marker (max 40px), an h6 title, and a paragraph description.

---

## 1. Create Block Config

**File:** `src/blocks/FancyListBlock/config.ts`

```typescript
import { Block } from 'payload'

export const FancyListBlock: Block = {
  slug: 'fancyListBlock',
  labels: {
    singular: 'Fancy List',
    plural: 'Fancy Lists',
  },
  fields: [
    {
      name: 'items',
      label: 'List Items',
      type: 'array',
      minRows: 1,
      fields: [
        {
          name: 'mascot',
          label: 'List Marker Image',
          type: 'upload',
          relationTo: 'assetCloud',
          required: true,
          admin: {
            description: 'Mascot image used as list marker (displays at max 40x40px)',
          },
        },
        {
          name: 'title',
          label: 'Title',
          type: 'text',
          required: true,
          localized: true,
        },
        {
          name: 'description',
          label: 'Description',
          type: 'textarea',
          localized: true,
        },
      ],
      admin: {
        description: 'Add list items with custom mascot markers',
      },
    },
  ],
}
```

---

## 2. Create Component

**File:** `src/components/FancyList/index.tsx`

```tsx
import React from 'react'
import Image from 'next/image'

interface FancyListItem {
  id?: string
  mascot?: {
    id: string
    alt: string | null
    url?: string | null
    width?: number | null
    height?: number | null
  }
  title: string
  description?: string
}

interface FancyListProps {
  id?: string
  items?: FancyListItem[]
  blockType?: 'fancyListBlock'
}

export const FancyList: React.FC<FancyListProps> = ({ items }) => {
  if (!items || items.length === 0) return null

  return (
    <ul className="list-none p-0 m-0 space-y-6">
      {items.map((item, index) => (
        <li key={item.id || index} className="flex items-start gap-4">
          {/* Mascot as list marker - max 40px */}
          {item.mascot?.url && (
            <div className="flex-shrink-0 w-10 h-10 flex items-start justify-center">
              <Image
                src={item.mascot.url}
                alt={item.mascot.alt || ''}
                width={40}
                height={40}
                className="object-contain max-w-[40px] max-h-[40px] w-auto h-auto"
              />
            </div>
          )}
          {/* Content */}
          <div className="flex-1">
            <h6 className="m-0 mb-1">{item.title}</h6>
            {item.description && (
              <p className="m-0">{item.description}</p>
            )}
          </div>
        </li>
      ))}
    </ul>
  )
}

export default FancyList
```

---

## 3. Add to RichContentBlock's BlocksFeature

**File:** `src/blocks/RichContentBlock/config.ts`

**Add import:**
```typescript
import { FancyListBlock } from '@/blocks/FancyListBlock/config'
```

**Add to BlocksFeature blocks array:**
```typescript
BlocksFeature({
  blocks: [
    BlockQuote,
    YouTubeBlock,
    VimeoBlock,
    SpotifyTrackBlock,
    SoundCloudEmbedBlock,
    FancyListBlock,  // ADD THIS
  ],
}),
```

---

## 4. Add to RenderBlocks.tsx

**File:** `src/blocks/RenderBlocks.tsx`

**Add import:**
```typescript
import { FancyList } from '@/components/FancyList'
```

**Add to blockComponents map:**
```typescript
const blockComponents = {
  content: ContentBlock,
  cta: CallToActionBlock,
  formBlock: FormBlock,
  youtubeBlock: YouTubeBlock,
  vimeoBlock: VimeoBlock,
  codeBlock: Code,
  spotifyTrack: SpotifyTrackBlock,
  soundcloudEmbed: SoundCloudEmbedBlock,
  fancyListBlock: FancyList,  // ADD THIS
}
```

---

## 5. Add to serializeRichText.tsx

**File:** `src/components/RichText/serializeRichText.tsx`

**Add import:**
```typescript
import { FancyList } from '@/components/FancyList'
```

**Add interface (after other block interfaces ~line 80):**
```typescript
interface FancyListBlockProps {
  id?: string
  items?: {
    id?: string
    mascot?: {
      id: string
      alt: string | null
      url?: string | null
      width?: number | null
      height?: number | null
    }
    title: string
    description?: string
  }[]
  blockType?: 'fancyListBlock'
}
```

**Update NodeTypes union (add FancyListBlockProps):**
```typescript
export type NodeTypes =
  | DefaultNodeTypes
  | SerializedBlockNode<
      | CTABlockProps
      | CodeBlockProps
      | BlockQuoteProps
      | YouTubeBlockProps
      | VimeoBlockProps
      | SpotifyTrackProps
      | SoundCloudEmbedProps
      | FancyListBlockProps  // ADD THIS
    >
```

**Add case in switch statement (after soundcloud-embed case, before default):**
```typescript
case 'fancyListBlock':
  const topMarginFancyList =
    isPrevHeading ||
    isPrevBlockquote ||
    isPrevUpload ||
    isPrevVideo ||
    isPrevSpotify ||
    isPrevSoundcloud
      ? 'mt-0'
      : 'mt-[2rem] md:mt-[4rem]'
  return (
    <div
      className={`col-span-full md:col-span-6 md:col-start-2 lg:col-span-6 lg:col-start-4 ${topMarginFancyList} mb-[2rem] md:mb-[4rem] last:mb-0`}
      key={index}
    >
      <FancyList {...block} />
    </div>
  )
```

---

## 6. Implementation Order

1. Create `src/blocks/FancyListBlock/config.ts`
2. Create `src/components/FancyList/index.tsx`
3. Modify `src/blocks/RichContentBlock/config.ts` (add import + block)
4. Modify `src/blocks/RenderBlocks.tsx` (add import + map entry)
5. Modify `src/components/RichText/serializeRichText.tsx` (add import, interface, NodeTypes, case)

---

## 7. Files Summary

**Create (2):**
- `src/blocks/FancyListBlock/config.ts`
- `src/components/FancyList/index.tsx`

**Modify (3):**
- `src/blocks/RichContentBlock/config.ts`
- `src/blocks/RenderBlocks.tsx`
- `src/components/RichText/serializeRichText.tsx`

---

## 8. Verification

1. Run `pnpm dev` - confirm no TypeScript/build errors
2. Open Payload admin → any page with RichContentBlock
3. Add a Rich Text Content Block
4. Click "+" to add block → select "Fancy List"
5. Add items with:
   - Upload mascot image from AssetCloud
   - Enter title and description
6. Save and preview page
7. Verify:
   - Mascot images display as list markers (max 40px)
   - Titles render as h6
   - Descriptions render as p
   - Proper spacing between items
