# Three Column Table Block Implementation Plan

## Overview
New page-level block with nested array structure: rows containing 3 columns, each with lexicalEditor. Renders as table-like layout with 1px black border-top per row, auto-fit column widths.

---

## Files to Create (2)

### 1. `src/blocks/ThreeColumnTableBlock/config.ts`
- slug: `threeColumnTableBlock`
- imageURL: `/block_icons/threecolumntable-block-icon.png`
- Fields:
  - `title` (text, localized)
  - `subtitle` (textarea, localized)
  - `rows` (array) containing:
    - `columns` (array, minRows: 3, maxRows: 3) containing:
      - `content` (richText with lexicalEditor using same BlocksFeature as TwoColumnBlock)
- Use RowLabel components for admin UI

### 2. `src/components/ThreeColumnTable/index.tsx`
- Props: title, subtitle, rows array
- Layout:
  - Title/subtitle at top (same pattern as TwoColumnBlock)
  - Each row: flex container with `border-t border-black` (1px black top border)
  - 3 columns per row with `w-fit` or flex-based auto-sizing
  - Use `serializeLexical` for column content
- Responsive: Stack columns on mobile

---

## Files to Modify (6)

### `src/collections/Pages/index.ts`
- Import ThreeColumnTableBlock
- Add to contentBlocks array

### `src/collections/Grants/index.ts`
- Import ThreeColumnTableBlock
- Add to contentBlocks array

### `src/collections/Reports/index.ts`
- Import ThreeColumnTableBlock
- Add to contentBlocks array

### `src/collections/Blog/index.ts`
- Import ThreeColumnTableBlock
- Add to contentBlocks array

### `src/collections/MMedia/index.ts`
- Import ThreeColumnTableBlock
- Add to contentBlocks array

### `src/globals/Homepage/config.ts`
- Import ThreeColumnTableBlock
- Add to contentBlocks array

---

## Config Structure Detail

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
import { FancyListBlock } from '@/blocks/FancyListBlock/config'
import { BadgeBlock } from '@/blocks/BadgeBlock/config'
import { PillButtonsBlock } from '@/blocks/PillButtonsBlock/config'
import { TagsBlock } from '@/blocks/TagsBlock/config'

const lexicalFeatures = ({ rootFeatures }: { rootFeatures: any }) => {
  return [
    ...rootFeatures,
    HeadingFeature({ enabledHeadingSizes: ['h2', 'h3', 'h4', 'h5', 'h6'] }),
    OrderedListFeature(),
    UnorderedListFeature(),
    UploadFeature(),
    HorizontalRuleFeature(),
    FixedToolbarFeature(),
    BlocksFeature({
      blocks: [
        BlockQuote,
        YouTubeBlock,
        VimeoBlock,
        SpotifyTrackBlock,
        SoundCloudEmbedBlock,
        FancyListBlock,
        BadgeBlock,
        PillButtonsBlock,
        TagsBlock,
      ],
    }),
  ]
}

export const ThreeColumnTableBlock: Block = {
  slug: 'threeColumnTableBlock',
  labels: {
    singular: 'Three Column Table',
    plural: 'Three Column Tables',
  },
  imageURL: '/block_icons/threecolumntable-block-icon.png',
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
      name: 'rows',
      type: 'array',
      label: 'Table Rows',
      labels: {
        singular: 'Row',
        plural: 'Rows',
      },
      admin: {
        components: {
          RowLabel: {
            path: 'src/blocks/ThreeColumnTableBlock/RowRowLabel.tsx',
          },
        },
      },
      fields: [
        {
          name: 'columns',
          type: 'array',
          label: 'Columns',
          labels: {
            singular: 'Column',
            plural: 'Columns',
          },
          minRows: 3,
          maxRows: 3,
          admin: {
            description: 'Each row must have exactly 3 columns',
            components: {
              RowLabel: {
                path: 'src/blocks/ThreeColumnTableBlock/ColumnRowLabel.tsx',
              },
            },
          },
          fields: [
            {
              name: 'content',
              type: 'richText',
              editor: lexicalEditor({
                features: lexicalFeatures,
              }),
              localized: true,
            },
          ],
        },
      ],
    },
  ],
}
```

---

## Component Structure

```typescript
import React from 'react'
import { serializeLexical } from '@/components/RichText/serializeRichText'

interface Column {
  id: string
  content?: any
}

interface Row {
  id: string
  columns?: Column[]
}

interface ThreeColumnTableProps {
  title?: string | null
  subtitle?: string | null
  rows?: Row[]
}

export const ThreeColumnTable: React.FC<ThreeColumnTableProps> = ({
  title,
  subtitle,
  rows,
}) => {
  const renderColumn = (columnData: any) => {
    if (!columnData) return null
    if (typeof columnData === 'object' && columnData !== null) {
      const children = columnData.root?.children || []
      if (Array.isArray(children) && children.length > 0) {
        return (
          <div className="prose dark:prose-invert">
            {serializeLexical({ nodes: children })}
          </div>
        )
      }
    }
    return null
  }

  return (
    <div className="page_column_layout">
      {/* Title */}
      {title && (
        <div className="col-span-full md:col-span-6 md:col-start-2 lg:col-span-8 lg:col-start-3">
          <h2 style={{ whiteSpace: 'pre-line' }}>{title}</h2>
        </div>
      )}

      {/* Subtitle */}
      {subtitle && (
        <div className="col-span-full md:col-span-6 md:col-start-2 lg:col-span-8 lg:col-start-3 mb-8">
          <p style={{ whiteSpace: 'pre-line' }}>{subtitle}</p>
        </div>
      )}

      {/* Table Rows */}
      <div className="col-span-full md:col-span-6 md:col-start-2 lg:col-span-8 lg:col-start-3">
        {rows?.map((row, rowIndex) => (
          <div
            key={row.id || rowIndex}
            className="flex flex-col md:flex-row border-t border-black py-6"
          >
            {row.columns?.map((column, colIndex) => (
              <div
                key={column.id || colIndex}
                className={`flex-shrink-0 ${colIndex === 1 ? 'flex-grow' : ''} ${colIndex > 0 ? 'mt-4 md:mt-0 md:ml-6' : ''}`}
              >
                {renderColumn(column.content)}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

export default ThreeColumnTable
```

---

## Component Layout (based on reference image)

```
┌─────────────────────────────────────────────────┐
│ Title: "Our Guiding Values"                     │
│ Subtitle: description text                      │
├────────────┬─────────────────────┬──────────────┤ ← 1px black border
│ Col 1      │ Col 2               │ Col 3        │
│ (image +   │ (body text)         │ (optional)   │
│  heading)  │                     │              │
├────────────┼─────────────────────┼──────────────┤ ← 1px black border
│ Col 1      │ Col 2               │ Col 3        │
│ ...        │ ...                 │ ...          │
└────────────┴─────────────────────┴──────────────┘
```

- Column widths: auto-fit to content (not equal)
- Row border: `border-t border-black` (1px solid black at top)
- First row also has top border
- Column 1: typically narrow (image + heading)
- Column 2: typically wider (body text, flex-grow)
- Column 3: optional content

---

## Admin UI Row Labels

### RowRowLabel.tsx
```typescript
'use client'
import { useRowLabel } from '@payloadcms/ui'
export default function RowRowLabel() {
  const { rowNumber } = useRowLabel()
  return <>Row {String(rowNumber).padStart(2, '0')}</>
}
```

### ColumnRowLabel.tsx
```typescript
'use client'
import { useRowLabel } from '@payloadcms/ui'
export default function ColumnRowLabel() {
  const { rowNumber } = useRowLabel()
  return <>Column {rowNumber}</>
}
```

---

## Verification
1. `pnpm dev` - no errors
2. Add Three Column Table block to a Page
3. Verify:
   - Rows render with 1px black border-top
   - Column widths fit content (col 2 should grow to fill space)
   - Lexical content (images, text, nested blocks) renders correctly
   - Responsive stacking on mobile (columns stack vertically)
