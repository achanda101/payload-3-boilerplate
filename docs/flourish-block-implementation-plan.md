# Flourish Block Implementation Plan

## Overview

Add a new embedded block type — **FlourishBlock** — for embedding interactive Flourish data visualisations (charts, maps, surveys, etc.) inside the Lexical rich text editor used by RichContentBlock.

Flourish does not expose an oEmbed endpoint, so the official `embed.js` script-tag approach is used, matching the same pattern as YouTubeBlock, SoundCloudEmbedBlock, etc.

---

## 1. Create Block Config

**File:** `src/blocks/FlourishBlock/config.ts`

```typescript
import type { Block } from 'payload'

export const FlourishBlock: Block = {
  slug: 'flourish-embed',
  interfaceName: 'FlourishEmbed',
  labels: {
    singular: 'Flourish Visualisation',
    plural: 'Flourish Visualisations',
  },
  fields: [
    {
      name: 'visualisationId',
      label: 'Flourish Visualisation ID',
      type: 'text',
      required: true,
      admin: {
        placeholder: '28711202',
        description:
          'The numeric ID from your Flourish embed code — e.g. data-src="visualisation/28711202"',
      },
      validate: (value) => {
        if (!value) return true
        if (!/^\d+$/.test(value)) {
          return 'Please enter only the numeric ID (e.g. 28711202), not the full URL'
        }
        return true
      },
    },
    {
      name: 'visualisationType',
      label: 'Visualisation Type (CSS class)',
      type: 'text',
      defaultValue: 'flourish-chart',
      admin: {
        description:
          'The CSS class from the embed code, e.g. flourish-chart, flourish-map, flourish-survey. Defaults to flourish-chart.',
      },
    },
    {
      name: 'caption',
      label: 'Caption (Optional)',
      type: 'textarea',
      localized: true,
      admin: {
        rows: 2,
        description: 'Optional caption displayed below the visualisation',
      },
    },
    {
      name: 'height',
      label: 'Height Override (Optional)',
      type: 'text',
      admin: {
        placeholder: '600px',
        description: 'Optional fixed height. Leave blank to use Flourish responsive default.',
      },
    },
    {
      name: 'blockAnchorId',
      type: 'ui',
      admin: {
        components: {
          Field: '@/components/BlockIdDisplay#BlockIdDisplay',
        },
      },
    },
  ],
}
```

### Field Notes

| Field | Required | Localized | Notes |
|-------|----------|-----------|-------|
| `visualisationId` | Yes | No | Numeric-only validated. Editors paste just the number from the embed code, not the full URL. |
| `visualisationType` | No | No | CSS class from the embed snippet (e.g. `flourish-chart`, `flourish-map`). Defaults to `flourish-chart`. |
| `caption` | No | Yes | Displayed below the chart using `<figcaption>`. |
| `height` | No | No | Override Flourish's default responsive height. E.g. `600px`. |

---

## 2. Create Renderer Component

**File:** `src/components/FlourishRenderer/index.tsx`

This is a `'use client'` component because Flourish's `embed.js` manipulates the DOM after mount.

**Key behaviours:**
- Uses `IntersectionObserver` (threshold 0.15) to defer loading until the chart is in the viewport
- Flourish's `embed.js` is loaded once; subsequent blocks call `window.Flourish.loadEmbeds()`
- CSS fade + slide-up transition (`opacity-0 translate-y-8` → `opacity-100 translate-y-0`) plays as the chart enters view, combined with Flourish's own chart entrance animation
- Flourish's "Made with Flourish" attribution link (`.flourish-credit`) is hidden globally via CSS (see `globals.scss`)

```tsx
'use client'

import { useEffect, useRef, useState } from 'react'

export default function FlourishRenderer({ visualisationId, visualisationType, caption, height, ...spacingProps }) {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const embedRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return
      observer.disconnect()
      setIsVisible(true)
      // Load embed.js or call Flourish.loadEmbeds() if script already present
    }, { threshold: 0.15 })

    observer.observe(wrapperRef.current)
    return () => observer.disconnect()
  }, [visualisationId])

  return (
    <div ref={wrapperRef} className={`... transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
      <figure>
        <div ref={embedRef} className={`flourish-embed ${visualisationType}`} data-src={`visualisation/${visualisationId}`}>
          <noscript><img src={`https://public.flourish.studio/visualisation/${visualisationId}/thumbnail`} /></noscript>
        </div>
        {caption && <figcaption>{caption}</figcaption>}
      </figure>
    </div>
  )
}
```

---

## 3. Add to RichContentBlock

**File:** `src/blocks/RichContentBlock/config.ts`

**Add import:**
```typescript
import { FlourishBlock } from '@/blocks/FlourishBlock/config'
```

**Add to `BlocksFeature`:**
```typescript
BlocksFeature({
  blocks: [
    BlockQuote,
    YouTubeBlock,
    VimeoBlock,
    SpotifyTrackBlock,
    SoundCloudEmbedBlock,
    FancyListBlock,
    PillButtonsBlock,
    FlourishBlock, // ADD THIS
  ],
}),
```

---

## 4. Add to serializeRichText

**File:** `src/components/RichText/serializeRichText.tsx`

**Add import:**
```typescript
import FlourishRenderer from '@/components/FlourishRenderer'
```

**Add interface:**
```typescript
interface FlourishEmbedProps {
  id?: string
  visualisationId: string
  visualisationType?: string
  caption?: string
  height?: string
  blockType?: 'flourish-embed'
}
```

**Add to `NodeTypes` union:**
```typescript
| FlourishEmbedProps
```

**Add `isPrev` tracking variable:**
```typescript
const isPrevFlourishEmbed =
  prevNode?.type === 'block' && prevNode?.fields?.blockType === 'flourish-embed'
```

**Add case in switch statement:**
```typescript
case 'flourish-embed':
  return (
    <FlourishRenderer
      key={index}
      visualisationId={block.visualisationId}
      visualisationType={block.visualisationType}
      caption={block.caption}
      height={block.height}
      isPrevHeading={isPrevHeading}
      isPrevUpload={isPrevUpload}
      isPrevVideo={isPrevVideo}
      isPrevBlockquote={isPrevBlockquote}
      isPrevSpotify={isPrevSpotify}
      isPrevSoundcloud={isPrevSoundcloud}
      isPrevFlourishEmbed={isPrevFlourishEmbed}
    />
  )
```

---

## 5. Hide Attribution Branding

**File:** `src/styles/globals.scss`

Flourish's `embed.js` injects `<a class="flourish-credit">Made with Flourish • Create a chart</a>` into the parent document (not inside the iframe). A single CSS rule hides it:

```scss
.flourish-credit {
  display: none !important;
}
```

---

## Files Summary

**Created (2):**
- `src/blocks/FlourishBlock/config.ts`
- `src/components/FlourishRenderer/index.tsx`

**Modified (3):**
- `src/blocks/RichContentBlock/config.ts` — added `FlourishBlock` to `BlocksFeature`
- `src/components/RichText/serializeRichText.tsx` — added import, interface, `NodeTypes`, `isPrevFlourishEmbed`, `case`
- `src/styles/globals.scss` — hide `.flourish-credit`

---

## How to Use (Editor Guide)

1. Inside a **Rich Content Block**, click `+` to add an embedded block
2. Select **"Flourish Visualisation"**
3. Paste the **numeric ID only** from your Flourish embed code:
   - From `<div class="flourish-embed" data-src="visualisation/28711202">` → enter `28711202`
4. Optionally set:
   - **Visualisation Type** — CSS class from the embed snippet (`flourish-chart`, `flourish-map`, `flourish-survey`, etc.)
   - **Caption** — displayed below the chart (localizable)
   - **Height Override** — e.g. `600px` for tall charts; leave blank for Flourish's responsive default
5. Save and publish

---

## Key Technical Notes

- **No oEmbed** — Flourish has no oEmbed endpoint. `embed.js` is the only official embed method.
- **Scroll-triggered loading** — The chart loads only when 15% of it is in the viewport (`IntersectionObserver`). This means Flourish's own bar/line/bubble entrance animation plays as the user scrolls to it.
- **Single script load** — `embed.js` is appended to the DOM once; `window.Flourish.loadEmbeds()` handles subsequent charts on the same page.
- **No `pnpm generate:types` needed immediately** — The `FlourishEmbed` interface is defined manually in `serializeRichText.tsx`. Run `pnpm generate:types` after the first publish of a Flourish block to get the auto-generated type in `payload-types.ts`.
- **`'use client'` required** — Flourish's embed relies on DOM manipulation post-mount; SSR is not compatible with `embed.js`.
