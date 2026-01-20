# Two Column Block Implementation Plan

## Overview
Create new PayloadCMS block with title, subtitle, and two rich text columns. Responsive: 50/50 desktop/tablet, stacked mobile.

---

## 1. Create Block Config

**File:** `src/blocks/TwoColumnBlock/config.ts`

```typescript
import { Block } from 'payload'
import {
  FixedToolbarFeature,
  HeadingFeature,
  OrderedListFeature,
  UnorderedListFeature,
  lexicalEditor,
  UploadFeature,
  BlocksFeature,
  HorizontalRuleFeature,
} from '@payloadcms/richtext-lexical'
import { YouTubeBlock } from '@/blocks/YouTubeBlock/config'
import { VimeoBlock } from '@/blocks/VimeoBlock/config'
import { SpotifyTrackBlock } from '@/blocks/SpotifyTrackBlock/config'
import { SoundCloudEmbedBlock } from '@/blocks/SoundCloudEmbedBlock/config'
import { BlockQuote } from '@/blocks/BlockQuote/config'

export const TwoColumnBlock: Block = {
  slug: 'twoColumnBlock',
  labels: {
    singular: 'Two Column Block',
    plural: 'Two Column Blocks',
  },
  imageURL: '/block_icons/twocolumn-block-icon.gif',
  fields: [
    {
      name: 'title',
      type: 'text',
      localized: true,
    },
    {
      name: 'subtitle',
      type: 'textarea',
      localized: true,
    },
    {
      type: 'row',
      fields: [
        {
          name: 'leftColumn',
          type: 'richText',
          label: 'Left Column',
          editor: lexicalEditor({
            features: ({ rootFeatures }) => [
              ...rootFeatures,
              HeadingFeature({ enabledHeadingSizes: ['h2', 'h3', 'h4', 'h5', 'h6'] }),
              OrderedListFeature(),
              UnorderedListFeature(),
              UploadFeature(),
              HorizontalRuleFeature(),
              FixedToolbarFeature(),
              BlocksFeature({
                blocks: [BlockQuote, YouTubeBlock, VimeoBlock, SpotifyTrackBlock, SoundCloudEmbedBlock],
              }),
            ],
          }),
          localized: true,
          admin: { width: '50%' },
        },
        {
          name: 'rightColumn',
          type: 'richText',
          label: 'Right Column',
          editor: lexicalEditor({
            features: ({ rootFeatures }) => [
              ...rootFeatures,
              HeadingFeature({ enabledHeadingSizes: ['h2', 'h3', 'h4', 'h5', 'h6'] }),
              OrderedListFeature(),
              UnorderedListFeature(),
              UploadFeature(),
              HorizontalRuleFeature(),
              FixedToolbarFeature(),
              BlocksFeature({
                blocks: [BlockQuote, YouTubeBlock, VimeoBlock, SpotifyTrackBlock, SoundCloudEmbedBlock],
              }),
            ],
          }),
          localized: true,
          admin: { width: '50%' },
        },
      ],
    },
  ],
}
```

---

## 2. Add to Collections & Global

Add import + add to blocks array in each file:

| File | Import Location | Blocks Array Location |
|------|-----------------|----------------------|
| `src/collections/Pages/index.ts` | ~line 40 | After `IDCardGallery` |
| `src/collections/Grants/index.ts` | ~line 40 | After `IDCardGallery` |
| `src/collections/Reports/index.ts` | ~line 40 | After `IDCardGallery` |
| `src/collections/Blog/index.ts` | ~line 40 | After `IDCardGallery` |
| `src/collections/MMedia/index.ts` | ~line 40 | After `IDCardGallery` |
| `src/globals/Homepage/config.ts` | ~line 37 | After `IDCardGallery` |

**Import line:**
```typescript
import { TwoColumnBlock } from '@/blocks/TwoColumnBlock/config'
```

**In blocks array:**
```typescript
blocks: [
  // ... existing blocks
  IDCardGallery,
  TwoColumnBlock,  // ADD THIS
],
```

---

## 3. Create Rendering Component

**File:** `src/components/TwoColumnBlock/index.tsx`

```tsx
import React from 'react'
import { serializeLexical } from '@/components/RichText/serializeRichText'

interface TwoColumnBlockProps {
  title?: string
  subtitle?: string
  leftColumn?: any
  rightColumn?: any
}

export const TwoColumnBlock: React.FC<TwoColumnBlockProps> = ({
  title,
  subtitle,
  leftColumn,
  rightColumn,
}) => {
  return (
    <div className="page_column_layout gap-6">
      {/* Title and Subtitle */}
      {(title || subtitle) && (
        <div className="col-span-full md:col-span-6 md:col-start-2 lg:col-span-6 lg:col-start-4 mb-6">
          {title && <h3 className="mb-2">{title}</h3>}
          {subtitle && <p className="text-color-light">{subtitle}</p>}
        </div>
      )}
      {/* Two Columns - 50/50 desktop/tablet, stacked mobile */}
      <div className="col-span-full md:col-span-6 md:col-start-2 lg:col-span-6 lg:col-start-4 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="[&>*:first-child]:mt-0">
          {leftColumn && typeof leftColumn === 'object'
            ? serializeLexical({ nodes: leftColumn.root?.children || [] })
            : null}
        </div>
        <div className="[&>*:first-child]:mt-0">
          {rightColumn && typeof rightColumn === 'object'
            ? serializeLexical({ nodes: rightColumn.root?.children || [] })
            : null}
        </div>
      </div>
    </div>
  )
}
```

---

## 4. Add to Page Components

Add import and rendering logic to each page component's `contentBlocks.map()`:

**Files:**
- `src/app/(frontend)/components/UAFPage/UAFPage.tsx`
- `src/app/(frontend)/components/GrantPage/GrantPage.tsx`
- `src/app/(frontend)/components/ReportPage/ReportPage.tsx`
- `src/app/(frontend)/components/BlogPage/BlogPage.tsx`
- `src/app/(frontend)/components/MMediaPage/MMediaPage.tsx`
- `src/app/(frontend)/components/HomePageContent/PageContent.tsx`

**Add import:**
```typescript
import { TwoColumnBlock } from '@/components/TwoColumnBlock'
```

**Add rendering block (before `return null`):**
```tsx
if (block.blockType === 'twoColumnBlock') {
  return (
    <React.Fragment key={index}>
      <TwoColumnBlock
        title={block.title}
        subtitle={block.subtitle}
        leftColumn={block.leftColumn}
        rightColumn={block.rightColumn}
      />
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

## 5. Implementation Order

1. Create `src/blocks/TwoColumnBlock/config.ts`
2. Create `src/components/TwoColumnBlock/index.tsx`
3. Modify `src/collections/Pages/index.ts`
4. Modify `src/collections/Grants/index.ts`
5. Modify `src/collections/Reports/index.ts`
6. Modify `src/collections/Blog/index.ts`
7. Modify `src/collections/MMedia/index.ts`
8. Modify `src/globals/Homepage/config.ts`
9. Modify `src/app/(frontend)/components/UAFPage/UAFPage.tsx`
10. Modify `src/app/(frontend)/components/GrantPage/GrantPage.tsx`
11. Modify `src/app/(frontend)/components/ReportPage/ReportPage.tsx`
12. Modify `src/app/(frontend)/components/BlogPage/BlogPage.tsx`
13. Modify `src/app/(frontend)/components/MMediaPage/MMediaPage.tsx`
14. Modify `src/app/(frontend)/components/HomePageContent/PageContent.tsx`

---

## 6. Verification

1. Run `pnpm dev` - confirm no TypeScript/build errors
2. Open Payload admin at `/admin`
3. Navigate to Pages collection → edit any page → add "Two Column Block"
4. Verify block icon displays correctly
5. Add title, subtitle, content to both columns
6. Save and preview page
7. Test responsive: resize browser to verify 50/50 → stacked behavior
8. Repeat verification for Grants, Reports, Blog, MMedia collections
9. Test on Homepage global

---

## Files Summary

**Create (2):**
- `src/blocks/TwoColumnBlock/config.ts`
- `src/components/TwoColumnBlock/index.tsx`

**Modify (12):**
- `src/collections/Pages/index.ts`
- `src/collections/Grants/index.ts`
- `src/collections/Reports/index.ts`
- `src/collections/Blog/index.ts`
- `src/collections/MMedia/index.ts`
- `src/globals/Homepage/config.ts`
- `src/app/(frontend)/components/UAFPage/UAFPage.tsx`
- `src/app/(frontend)/components/GrantPage/GrantPage.tsx`
- `src/app/(frontend)/components/ReportPage/ReportPage.tsx`
- `src/app/(frontend)/components/BlogPage/BlogPage.tsx`
- `src/app/(frontend)/components/MMediaPage/MMediaPage.tsx`
- `src/app/(frontend)/components/HomePageContent/PageContent.tsx`

**Already exists:**
- `public/block_icons/twocolumn-block-icon.gif`
