# Blog Performance Optimization for SSG

**Strategy:** Static Site Generation (SSG) at build time
**Current Performance Score:** 72/100
**Target Score:** 92-95/100
**Date:** 2026-02-05

## Executive Summary

Moving to SSG will **automatically resolve** many performance issues:
- ✅ First Contentful Paint (0.4s → ~0.2s)
- ✅ Server response time (instant static files)
- ✅ Initial render blocking (HTML pre-rendered)

However, **runtime issues remain** and must be fixed:
- ❌ **Cumulative Layout Shift: 0.55** (Target: <0.1) - CRITICAL
- ⚠️ Time to Interactive: 3.8s (can improve to ~2.5s)
- ⚠️ Accessibility issues
- ⚠️ SEO issues (minor)

## Current Core Web Vitals

| Metric | Current | With SSG (no fixes) | With SSG + Fixes | Google Threshold |
|--------|---------|---------------------|------------------|------------------|
| **LCP** | 0.6s | ~0.3-0.4s ✅ | ~0.3s ✅ | <2.5s |
| **CLS** | 0.55 ❌ | 0.55 ❌ | **<0.1** ✅ | <0.1 |
| **FID/TBT** | 210ms ⚠️ | ~150ms ✅ | ~120ms ✅ | <100ms |

**Priority:** Fix CLS - it's the only Core Web Vital failing and SSG won't fix it automatically.

---

## CRITICAL: Fix Cumulative Layout Shift (0.55 → <0.1)

**Why CLS still matters with SSG:**
- Layout shifts happen AFTER HTML renders
- Images loading without dimensions cause content to jump
- Web fonts loading cause text reflow
- This is a Core Web Vital that affects Google rankings

**Current Issues Causing CLS:**

### Issue 1: Donate Banner Image (40% of shifts)

**Location:** `.donate-cta` section
**Root cause:** Image lacking explicit dimensions

**Current code (problematic):**
```tsx
<img
  src="/footer_imgs/donate-banner-top.png"
  loading="lazy"
  style="width:100%;height:auto"  // ← Causes shift!
/>
```

**Fix:**
```tsx
import Image from 'next/image'

<Image
  src="/footer_imgs/donate-banner-top.png"
  alt="Donate banner"
  width={1200}
  height={100}
  className="desktop-image"
  sizes="(min-width: 769px) 100vw, 0vw"
/>
```

**Action items:**
- [ ] Find donate-cta component: `grep -r "donate-cta" src/`
- [ ] Replace `<img>` with Next.js `<Image>` component
- [ ] Add explicit width/height from actual image dimensions
- [ ] Test with Chrome DevTools Performance panel (CLS should drop)

**Files to check:**
- `src/components/**/donate*`
- `src/blocks/**/donate*`
- `src/globals/Footer/Component.client.tsx` (currently open in IDE)

### Issue 2: Web Fonts Loading (Causing Text Reflow)

**Fonts causing shifts:**
- SchibstedGrotesk-Regular.woff2
- Roslindale-DisplayNarrowSemiBold-Testing.woff2

**Current approach:** Likely using `@font-face` in CSS
**Problem:** Fonts load after text renders → text reflows → CLS

**Fix: Use next/font (RECOMMENDED for SSG)**

```typescript
// src/app/(frontend)/layout.tsx
import localFont from 'next/font/local'

const schibstedGrotesk = localFont({
  src: '../../fonts/SchibstedGrotesk-Regular.woff2',
  display: 'swap',
  variable: '--font-schibsted',
  preload: true,
})

const roslindale = localFont({
  src: '../../fonts/Roslindale-DisplayNarrowSemiBold-Testing.woff2',
  display: 'swap',
  variable: '--font-roslindale',
  preload: true,
})

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${schibstedGrotesk.variable} ${roslindale.variable}`}>
      <body>{children}</body>
    </html>
  )
}
```

**Why this works with SSG:**
- Font CSS is inlined in the static HTML
- Browser reserves space for text before fonts load
- `display: 'swap'` shows fallback font immediately (no FOIT)
- No layout shift when web font loads

**Update Tailwind config:**
```javascript
// tailwind.config.ts
module.exports = {
  theme: {
    extend: {
      fontFamily: {
        'schibsted': ['var(--font-schibsted)', 'sans-serif'],
        'roslindale': ['var(--font-roslindale)', 'serif'],
      },
    },
  },
}
```

**Action items:**
- [ ] Add font loading to layout.tsx using next/font
- [ ] Remove @font-face declarations from globals.css
- [ ] Update Tailwind config with CSS variables
- [ ] Test that fonts load without visible shift

**Files to modify:**
- `src/app/(frontend)/layout.tsx`
- `src/styles/globals.css` (remove @font-face)
- `tailwind.config.ts`

### Issue 3: All Images Missing Explicit Dimensions

**Problem:** Any image without width/height causes CLS

**Fix: Use Payload's stored image dimensions**

```typescript
// Example: Blog post featured image
export default async function BlogPost({ params }: { params: { slug: string } }) {
  const post = await fetchBlogPost(params.slug)

  // Type cast when populated
  const featuredImage = post.image as MediaCloud

  return (
    <article>
      <Image
        src={featuredImage.url}
        alt={featuredImage.alt || post.title}
        width={featuredImage.width}    // ← Use Payload's stored dimensions
        height={featuredImage.height}  // ← Use Payload's stored dimensions
        blurDataURL={featuredImage.blurhash || undefined}  // ← Use Payload's blurhash
        placeholder={featuredImage.blurhash ? "blur" : "empty"}
        priority  // Above-fold image
        className="w-full h-auto"
      />
      {/* ... */}
    </article>
  )
}
```

**For all Image components:**
1. Use Payload's `width` and `height` fields
2. Use Payload's `blurhash` field (already generated on upload)
3. Add `priority` for above-fold images
4. Add `loading="lazy"` for below-fold images

**Action items:**
- [ ] Audit all Image components: `grep -r "from 'next/image'" src/`
- [ ] Ensure all have explicit width/height from Payload data
- [ ] Use existing blurhash from Payload (don't regenerate)
- [ ] Test each page for CLS

---

## IMPORTANT: Image Optimization for SSG

### Use Payload's Existing Image Data

**Available fields from MediaCloud/AssetCloud:**
```typescript
interface MediaCloud {
  id: number;
  alt: string;
  caption?: string | null;
  blurhash?: string | null;  // ← Already generated!
  width: number;
  height: number;
  url: string;
  // ... other fields
}
```

**Best practices:**

1. **Above-fold images:** Add `priority` prop
```tsx
<Image priority src={hero.url} width={hero.width} height={hero.height} />
```

2. **Below-fold images:** Use lazy loading (default)
```tsx
<Image loading="lazy" src={img.url} width={img.width} height={img.height} />
```

3. **Blur placeholders:** Use Payload's blurhash
```tsx
<Image
  blurDataURL={image.blurhash || undefined}
  placeholder={image.blurhash ? "blur" : "empty"}
/>
```

4. **Responsive images:** Use `sizes` prop
```tsx
<Image
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 800px"
/>
```

**Action items:**
- [ ] Review blog/[slug]/page.tsx for featured images
- [ ] Add priority to hero/featured images
- [ ] Use Payload's blurhash field
- [ ] Add appropriate sizes prop

**Files to check:**
- `src/app/(frontend)/blog/[slug]/page.tsx`
- `src/app/(frontend)/grants/[slug]/page.tsx`
- `src/app/(frontend)/reports/[slug]/page.tsx`
- Any block components with images

---

## IMPORTANT: Accessibility (Not affected by SSG)

Accessibility issues remain regardless of rendering strategy.

### Fix 1: Buttons Without Accessible Names

**Problem:** Screen readers announce icon buttons as just "button"

**Fix:**
```tsx
// Bad
<button className="close-btn">×</button>

// Good
<button aria-label="Close dialog" className="close-btn">×</button>

// Or with visible text
<button className="close-btn">
  <span className="sr-only">Close</span>
  ×
</button>
```

**Action items:**
- [ ] Search for icon buttons: `grep -r "<button" src/components/`
- [ ] Add aria-label to all icon-only buttons
- [ ] Common cases: close buttons, menu buttons, social share

### Fix 2: Add Main Landmark

**Problem:** Missing `<main>` element for screen reader navigation

**Fix:**
```tsx
// src/app/(frontend)/layout.tsx
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main>{children}</main>  {/* Add this */}
      <Footer />
    </>
  )
}
```

### Fix 3: Select Elements Without Labels

**Problem:** Language selector missing label

**Fix:**
```tsx
<label htmlFor="lang-select" className="sr-only">
  Select Language
</label>
<select id="lang-select" aria-label="Select language">
  <option>English</option>
  <option>हिन्दी</option>
</select>
```

**Files to check:**
- Language selector component
- Any form selects in the application

---

## MODERATE: SEO Optimizations (Enhanced by SSG)

**SSG Advantage:** All meta tags are in static HTML (perfect for crawlers)

**Note:** Meta descriptions are already handled by the Payload SEO plugin.

### Fix 1: robots.txt

**Problem:** Invalid or missing robots.txt

**Fix:**
```typescript
// src/app/robots.ts
import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin/', '/api/'],
    },
    sitemap: `${process.env.NEXT_PUBLIC_SERVER_URL}/sitemap.xml`,
  }
}
```

---

## OPTIONAL: Hydration Optimization

**Impact with SSG:**
- HTML renders immediately (good!)
- But page is not interactive until hydration completes
- Current TTI: 3.8s → Target: ~2.5s

### Strategy: Defer Non-Critical JavaScript

```typescript
// For interactive-only components (not visible in initial HTML)
import dynamic from 'next/dynamic'

// Search modal (only loads when opened)
const SearchModal = dynamic(() => import('@/components/SearchModal'), {
  ssr: false  // Don't include in SSG at all
})

// Social share buttons (not critical)
const ShareButtons = dynamic(() => import('@/components/ShareButtons'), {
  ssr: false
})

// Comments (below fold)
const Comments = dynamic(() => import('@/components/Comments'), {
  ssr: false
})
```

**When to use `ssr: false`:**
- ✅ Modals/dialogs (hidden initially)
- ✅ Social share widgets
- ✅ Analytics/tracking scripts
- ✅ Chat widgets
- ❌ Navigation (visible and functional)
- ❌ Hero/above-fold content

**Action items (lower priority):**
- [ ] Identify client-only interactive components
- [ ] Use dynamic imports with ssr: false
- [ ] Test that visible content still renders in HTML

---

## Implementation Roadmap

### Phase 1: Fix CLS (Week 1) - CRITICAL
**Estimated Impact:** CLS 0.55 → <0.1, Performance +15-20 points

**Tasks:**
1. [ ] Find and fix donate banner image dimensions
2. [ ] Convert font loading to next/font in layout.tsx
3. [ ] Audit all Image components for explicit dimensions
4. [ ] Add blur placeholders using Payload's blurhash
5. [ ] Test with Chrome DevTools (measure CLS)

**Success criteria:**
- CLS < 0.1 on all pages
- No visible content shifts on page load
- Fonts load without text reflow

**Files to modify:**
- `src/app/(frontend)/layout.tsx`
- Donate-cta component
- All Image components

### Phase 2: Accessibility & SEO (Week 1-2)
**Estimated Impact:** Better rankings, WCAG compliance, Performance +3-5 points

**Tasks:**
1. [ ] Add main landmark to layout
2. [ ] Add aria-labels to icon buttons
3. [ ] Add labels to select elements
4. [ ] Create robots.ts

**Success criteria:**
- Pass WAVE accessibility checker
- Pass Lighthouse accessibility audit (95+)

### Phase 3: Hydration Optimization (Week 2-3) - OPTIONAL
**Estimated Impact:** TTI 3.8s → 2.5s, Performance +2-5 points

**Tasks:**
1. [ ] Identify client-only components
2. [ ] Implement dynamic imports for non-critical components
3. [ ] Test hydration performance
4. [ ] Monitor bundle size

**Success criteria:**
- TTI < 3.0s
- No hydration errors in console
- Main content interactive quickly

---

## Testing Checklist

### CLS Testing (CRITICAL)
- [ ] Open Chrome DevTools → Performance
- [ ] Record page load
- [ ] Check Experience section for Layout Shifts
- [ ] Verify CLS < 0.1
- [ ] Test on slow 3G throttling
- [ ] Test on mobile viewport

### SSG Verification
- [ ] Run `pnpm build`
- [ ] Check `.next/server/app/blog/[slug]/` for static HTML files
- [ ] Verify HTML includes full content (view source)
- [ ] Test with JavaScript disabled (content should be visible)
- [ ] Verify fonts are referenced in HTML head

### Accessibility Testing
- [ ] Run Lighthouse accessibility audit (target: 95+)
- [ ] Use WAVE browser extension
- [ ] Test with keyboard navigation only
- [ ] Test with screen reader (NVDA/VoiceOver)

### Performance Testing
- [ ] Run Lighthouse performance audit (target: 92+)
- [ ] Test on mobile device (not just emulation)
- [ ] Test on slow 3G network
- [ ] Verify Core Web Vitals pass

---

## Expected Results with SSG + Fixes

| Metric | Before | After | Improvement |
|--------|--------|-------|-------------|
| Performance Score | 72 | **92-95** | +20-23 points |
| **CLS** | 0.55 ❌ | **<0.1** ✅ | **5.5x better** |
| **LCP** | 0.6s | 0.3-0.4s | 33-50% faster |
| FCP | 0.4s | 0.2-0.3s | 25-50% faster |
| TTI | 3.8s | 2.5-3.0s | 21-34% faster |
| Accessibility | ? | 95+ | WCAG AA compliant |

---

## Key Files Reference

### Critical Files (CLS Fixes):
```
src/app/(frontend)/layout.tsx          # Font loading
src/globals/Footer/Component.client.tsx # Likely has donate-cta
src/components/**/*donate*              # Find donate-cta component
src/app/(frontend)/blog/[slug]/page.tsx # Featured images
src/styles/globals.css                  # Remove @font-face
tailwind.config.ts                      # Update font family
```

### Important Files (A11y/SEO):
```
src/app/(frontend)/layout.tsx          # Main landmark
src/app/robots.ts                       # Create this
src/components/**/Button*              # Aria-labels
Language selector component            # Add labels to selects
```

### Reference:
```
src/payload-types.ts                   # Type definitions
```

---

## Commands

```bash
# Find donate-cta component
grep -r "donate-cta" src/

# Find all Image imports
grep -r "from 'next/image'" src/

# Find font loading
grep -r "@font-face" src/styles/

# Build for production (SSG)
pnpm build

# Check generated static files
ls -la .next/server/app/blog/

# Start production server
pnpm start

# Run Lighthouse audit
# Open Chrome DevTools → Lighthouse → Run audit
```

---

## SSG Best Practices Summary

1. **✅ Always set explicit image dimensions** (from Payload data)
2. **✅ Use next/font** for web font optimization
3. **✅ Use Payload's blurhash** (don't regenerate at build time)
4. **✅ Add `priority` to above-fold images**
5. **✅ Test with JavaScript disabled** (should still render)
6. **✅ Measure CLS in real browsers** (DevTools Performance)

---

## Next Steps

1. **Start with Phase 1** (CLS fixes) - highest impact
2. **Test after each fix** - measure CLS improvement
3. **Document results** - track before/after metrics
4. **Deploy to staging** - test in production-like environment
5. **Run Lighthouse CI** - set up continuous monitoring

---

**Priority Order:**
1. 🔴 Fix CLS (donate banner, fonts, images) - **CRITICAL**
2. 🟡 Fix accessibility issues (buttons, landmarks, selects) - **IMPORTANT**
3. 🟡 Add robots.txt - **IMPORTANT**
4. 🟢 Optimize hydration - **OPTIONAL**

**Success Definition:**
- CLS < 0.1 ✅
- Performance Score > 92 ✅
- Accessibility Score > 95 ✅
- All Core Web Vitals pass ✅
