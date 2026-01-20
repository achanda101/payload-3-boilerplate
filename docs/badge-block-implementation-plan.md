# Badge Block Implementation Plan

## Overview
Create a new block type called "Badge Block" for use within TwoColumnBlock's Lexical editor. The badge will display text with a type-based styling (info/orange, important/red, inactive/grey), matching the badge rendering used in GrantCard component.

---

## 1. Create Block Config

**File:** `src/blocks/BadgeBlock/config.ts`

```typescript
import { Block } from 'payload'

export const BadgeBlock: Block = {
  slug: 'badgeBlock',
  labels: {
    singular: 'Badge',
    plural: 'Badges',
  },
  fields: [
    {
      name: 'badgeText',
      label: 'Badge Text',
      type: 'text',
      localized: true,
      maxLength: 50,
      required: true,
      admin: {
        placeholder: 'E.g., Applications open until 15th June',
      },
    },
    {
      name: 'badgeType',
      label: 'Badge Type',
      type: 'select',
      options: [
        { label: 'Information (orange)', value: 'info' },
        { label: 'Important (red)', value: 'imp' },
        { label: 'Inactive (grey)', value: 'inactive' },
      ],
      defaultValue: 'info',
    },
  ],
}
```

---

## 2. Create Component

**File:** `src/components/Badge/index.tsx`

Component should mirror the badge rendering from GrantCard (lines 71-77):

```tsx
import React from 'react'

interface BadgeProps {
  id?: string
  badgeText: string
  badgeType?: 'info' | 'imp' | 'inactive'
  blockType?: 'badgeBlock'
}

export const Badge: React.FC<BadgeProps> = ({ badgeText, badgeType = 'info' }) => {
  if (!badgeText) return null

  return (
    <div className="flex justify-center">
      <div className={`badge ${badgeType}`}>
        <p className="tag">{badgeText}</p>
      </div>
    </div>
  )
}

export default Badge
```

**Styling Note:**
- Uses existing `badge` and `tag` CSS classes from the project
- Applies `badgeType` as className suffix: `badge info`, `badge imp`, or `badge inactive`
- These classes are already defined in project CSS and used by GrantCard component

---

## 3. Add to TwoColumnBlock's BlocksFeature

**File:** `src/blocks/TwoColumnBlock/config.ts`

**Add import:**
```typescript
import { BadgeBlock } from '@/blocks/BadgeBlock/config'
```

**Update lexicalFeatures function:**
```typescript
BlocksFeature({
  blocks: [
    BlockQuote,
    YouTubeBlock,
    VimeoBlock,
    SpotifyTrackBlock,
    SoundCloudEmbedBlock,
    FancyListBlock,
    BadgeBlock,  // ADD THIS
  ],
}),
```

---

## 4. Add to RenderBlocks.tsx

**File:** `src/blocks/RenderBlocks.tsx`

**Add import:**
```typescript
import { Badge } from '@/components/Badge'
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
  fancyListBlock: FancyList,
  badgeBlock: Badge,  // ADD THIS
}
```

---

## 5. Add to serializeRichText.tsx

**File:** `src/components/RichText/serializeRichText.tsx`

**Add import:**
```typescript
import { Badge } from '@/components/Badge'
```

**Add interface (~line 83):**
```typescript
interface BadgeBlockProps {
  id?: string
  badgeText: string
  badgeType?: 'info' | 'imp' | 'inactive'
  blockType?: 'badgeBlock'
}
```

**Update NodeTypes union:**
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
      | FancyListBlockProps
      | BadgeBlockProps  // ADD THIS
    >
```

**Add case in switch statement (after fancyListBlock case, before default):**
```typescript
case 'badgeBlock':
  const topMarginBadge =
    isPrevHeading ||
    isPrevBlockquote ||
    isPrevUpload ||
    isPrevVideo ||
    isPrevSpotify ||
    isPrevSoundcloud ||
    isPrevFancyList
      ? 'mt-0'
      : 'mt-[2rem] md:mt-[4rem]'
  return (
    <div
      className={`col-span-full md:col-span-6 md:col-start-2 lg:col-span-6 lg:col-start-4 ${topMarginBadge} mb-[2rem] md:mb-[4rem] last:mb-0`}
      key={index}
    >
      <Badge {...block} />
    </div>
  )
```

**Update isPrevFancyList context check (around line 139):**
```typescript
const isPrevFancyList =
  prevNode?.type === 'block' && prevNode?.fields?.blockType === 'fancyListBlock'
const isPrevBadge =
  prevNode?.type === 'block' && prevNode?.fields?.blockType === 'badgeBlock'
```

---

## 6. Implementation Order

1. Create `src/blocks/BadgeBlock/config.ts`
2. Create `src/components/Badge/index.tsx`
3. Modify `src/blocks/TwoColumnBlock/config.ts` (add import + block)
4. Modify `src/blocks/RenderBlocks.tsx` (add import + map entry)
5. Modify `src/components/RichText/serializeRichText.tsx` (add import, interface, NodeTypes, isPrevBadge, case)

---

## 7. Files Summary

**Create (2):**
- `src/blocks/BadgeBlock/config.ts`
- `src/components/Badge/index.tsx`

**Modify (3):**
- `src/blocks/TwoColumnBlock/config.ts`
- `src/blocks/RenderBlocks.tsx`
- `src/components/RichText/serializeRichText.tsx`

---

## 8. Verification

1. Run `pnpm dev` - confirm no TypeScript/build errors
2. Open Payload admin → any page with TwoColumnBlock
3. Add Rich Text Content Block in left/right column
4. Click "+" to add block → select "Badge"
5. Enter badge text and select type (Info, Important, or Inactive)
6. Save and preview page
7. Verify:
   - Badge displays with correct styling based on type
   - Orange for Info, Red for Important, Grey for Inactive
   - Text displays in tag style matching GrantCard
   - Proper spacing above/below badge

---

## Key Implementation Notes

- Badge component reuses existing `badge` and `tag` CSS classes from project
- badgeType values match GrantCard: `info`, `imp`, `inactive`
- All fields are localized for multi-language support
- maxLength of 50 chars prevents text overflow
- Component is simple and pure (no state or hooks)
- Follows same spacing/wrapping pattern as other blocks in serializeRichText
