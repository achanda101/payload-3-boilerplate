# Pill Buttons Block Implementation Plan

## Overview
Create a new block type called "Pill Buttons Block" for use within TwoColumnBlock's Lexical editor. This block displays an array of button links using the ButtonArray component with pill button styling support (solid or outline variants).

---

## 1. Create Block Config

**File:** `src/blocks/PillButtonsBlock/config.ts`

```typescript
import { Block } from 'payload'
import { link } from '@/fields/link'

export const PillButtonsBlock: Block = {
  slug: 'pillButtonsBlock',
  labels: {
    singular: 'Pill Buttons',
    plural: 'Pill Buttons',
  },
  fields: [
    {
      name: 'buttons',
      label: 'Buttons',
      labels: {
        singular: 'Button',
        plural: 'Buttons',
      },
      type: 'array',
      minRows: 1,
      maxRows: 2,
      fields: [
        link({
          appearances: false,
        }),
      ],
      admin: {
        description: 'Add button links - up to 2 buttons',
        components: {
          RowLabel: {
            path: 'src/globals/Homepage/CtaButtonRowLabel.tsx',
          },
        },
      },
    },
  ],
}
```

**Key Notes:**
- Uses the reusable `link` field factory (same as SecondaryCTA's ctaButton)
- Array field with minRows: 1, maxRows: 2 (matches SecondaryCTA pattern)
- Reuses CtaButtonRowLabel component for consistent admin UI
- Link field supports pill button variants via downloadLink, arrowLink, pillSolid, pillOutline properties

---

## 2. Create Component

**File:** `src/components/PillButtons/index.tsx`

```tsx
import React from 'react'
import { ButtonArray } from '@/components/ButtonArray'

interface ButtonItem {
  id: string
  link: {
    type: string
    newTab?: boolean | null
    downloadLink?: boolean | null
    arrowLink?: boolean | null
    pillSolid?: boolean | null
    pillOutline?: boolean | null
    url?: string | null
    label: string | null
    email?: string | null
    doc?: any
    reference?: any
    etestlink?: any
  }
}

interface PillButtonsProps {
  id?: string
  buttons?: ButtonItem[]
  blockType?: 'pillButtonsBlock'
}

export const PillButtons: React.FC<PillButtonsProps> = ({ buttons }) => {
  if (!buttons || buttons.length === 0) return null

  return <ButtonArray btnArray={buttons} colStackOnMobile={false} />
}

export default PillButtons
```

**Key Notes:**
- Simple wrapper around ButtonArray component
- ButtonArray handles all button rendering logic including variants
- colStackOnMobile set to false for pill buttons to remain inline
- Reuses ButtonArray's styling and behavior

---

## 3. Add to TwoColumnBlock's BlocksFeature

**File:** `src/blocks/TwoColumnBlock/config.ts`

**Add import:**
```typescript
import { PillButtonsBlock } from '@/blocks/PillButtonsBlock/config'
```

**Update BlocksFeature blocks array:**
```typescript
BlocksFeature({
  blocks: [
    BlockQuote,
    YouTubeBlock,
    VimeoBlock,
    SpotifyTrackBlock,
    SoundCloudEmbedBlock,
    FancyListBlock,
    BadgeBlock,
    PillButtonsBlock,  // ADD THIS
  ],
}),
```

---

## 4. Add to RenderBlocks.tsx

**File:** `src/blocks/RenderBlocks.tsx`

**Add import:**
```typescript
import { PillButtons } from '@/components/PillButtons'
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
  badgeBlock: Badge,
  pillButtonsBlock: PillButtons,  // ADD THIS
}
```

---

## 5. Add to serializeRichText.tsx

**File:** `src/components/RichText/serializeRichText.tsx`

**Add import:**
```typescript
import { PillButtons } from '@/components/PillButtons'
```

**Add interface (~line 120):**
```typescript
interface PillButtonsBlockProps {
  id?: string
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
      label: string | null
      email?: string | null
      doc?: any
      reference?: any
      etestlink?: any
    }
  }[]
  blockType?: 'pillButtonsBlock'
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
      | BadgeBlockProps
      | PillButtonsBlockProps  // ADD THIS
    >
```

**Add isPrevPillButtons check (~line 152):**
```typescript
const isPrevPillButtons =
  prevNode?.type === 'block' && prevNode?.fields?.blockType === 'pillButtonsBlock'
```

**Add case in switch statement (after badgeBlock case, before default):**
```typescript
case 'pillButtonsBlock':
  const topMarginPillButtons =
    isPrevHeading ||
    isPrevBlockquote ||
    isPrevUpload ||
    isPrevVideo ||
    isPrevSpotify ||
    isPrevSoundcloud ||
    isPrevFancyList ||
    isPrevBadge ||
    isPrevPillButtons
      ? 'mt-0'
      : 'mt-[2rem] md:mt-[4rem]'
  return (
    <div
      className={`col-span-full md:col-span-6 md:col-start-2 lg:col-span-6 lg:col-start-4 ${topMarginPillButtons} mb-[2rem] md:mb-[4rem] last:mb-0`}
      key={index}
    >
      <PillButtons {...block} />
    </div>
  )
```

---

## 6. Implementation Order

1. Create `src/blocks/PillButtonsBlock/config.ts`
2. Create `src/components/PillButtons/index.tsx`
3. Modify `src/blocks/TwoColumnBlock/config.ts` (add import + block)
4. Modify `src/blocks/RenderBlocks.tsx` (add import + map entry)
5. Modify `src/components/RichText/serializeRichText.tsx` (add import, interface, NodeTypes, isPrevPillButtons, case)

---

## 7. Files Summary

**Create (2):**
- `src/blocks/PillButtonsBlock/config.ts`
- `src/components/PillButtons/index.tsx`

**Modify (3):**
- `src/blocks/TwoColumnBlock/config.ts`
- `src/blocks/RenderBlocks.tsx`
- `src/components/RichText/serializeRichText.tsx`

---

## 8. Verification

1. Run `pnpm dev` - confirm no TypeScript/build errors
2. Open Payload admin → any page with TwoColumnBlock
3. Add Rich Text Content Block in left/right column
4. Click "+" to add block → select "Pill Buttons"
5. Add 1-2 buttons with link configuration
6. Configure buttons with different styles:
   - Solid pill buttons (pillSolid: true)
   - Outline pill buttons (pillOutline: true)
   - Download links (downloadLink: true + pill options)
   - Arrow links (arrowLink: true + pill options)
7. Save and preview page
8. Verify:
   - Buttons display in pill styling (solid/outline)
   - All link types work (internal, external, email, etc.)
   - Buttons are inline on desktop/tablet
   - Proper spacing above/below block

---

## Key Implementation Notes

- Block name: "pillButtonsBlock" (slug)
- Uses existing link field factory for flexibility
- Reuses ButtonArray component for rendering
- Reuses CtaButtonRowLabel for consistent admin UX
- Array field limited to 2 buttons (matches SecondaryCTA)
- Component is minimal - ButtonArray handles all logic
- Follows same spacing/wrapping pattern as other blocks
- Supports all button variants through link field properties
