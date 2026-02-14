# Session Summary: Locale Routing & SEO Fields (2026-02-14)

## Overview
This session completed the unified locale routing refactor and standardized SEO field configuration across all content collections.

## Branch
`ssg-isr`

## Status
✅ Implementation complete and tested
- All routes use `/{locale}/` prefix including English (`/en/`)
- Root `/` redirects to `/en`
- Navigation, header, footer all locale-aware
- All card components render localized content correctly
- SEO fields standardized across all collections (positioned below, not in sidebar)

---

## Part 1: Locale Routing Refactor

### Problem Solved
**Infinite "Pulling schema from database" loop** when loading Hindi routes (e.g., `/hi/who-we-are`). Root cause was architectural mismatch where:
- Root layout rendered Header/Footer with hardcoded `locale='en'`
- LanguageProvider detected actual locale from URL (e.g., `hi`)
- Mismatch triggered infinite client-side API re-fetches

### Solution Architecture
Restructured routing so **all routes include locale prefix** (including English):
```
Before:                    After:
/                      →   /en (redirect from /)
/about                 →   /en/about
/hi/about             →   /hi/about (no change)
/blog/post            →   /en/blog/post
/hi/blog/post         →   /hi/blog/post (no change)
```

### Key Changes

#### 1. Route Structure
- **Moved Header/Footer** from `(frontend)/layout.tsx` to `[locale]/layout.tsx`
- `[locale]/layout.tsx` now gets locale from route params and passes to Header/Footer
- Root `/` redirects to `/en`
- All content routes now under `[locale]/` directory

#### 2. Navigation Locale Fix
**File:** `src/utilities/getGlobals.ts`
- **Problem:** `getCachedGlobal` used `unstable_cache` with locale in closure, causing cache key collisions
- **Fix:** Removed caching wrapper, using direct `getGlobal()` calls
- **Result:** Navigation items now display in correct locale

```typescript
// Before: Cached with locale in closure (broken)
export const getCachedGlobal = (slug: Global, depth = 0) =>
  unstable_cache(async (locale?: string) => { ... })

// After: Direct calls without caching
export async function getGlobal(slug: Global, depth = 0, locale?: string) {
  const payload = await getPayload({ config: configPromise })
  return await payload.findGlobal({ slug, depth, locale: locale as any })
}
```

#### 3. Initial Data Hydration Pattern
**Applied to:** UAFPage, BlogPage, GrantPage, ReportPage, MMediaPage, GrantCardComponent

Server components fetch data with `depth: 3` and pass as `initialData` prop to client components. Client components only re-fetch when language changes.

```typescript
// Server component (page.tsx)
const page = await queryPageBySlug({ slug, locale, depth: 3 })
return <UAFPage initialData={page} locale={locale} ... />

// Client component
useEffect(() => {
  if (initialData) {
    // Set all state from initialData
    setHeroHeaderImg(`${initialData.bgType}-${initialData.heroColour}`)
    // ... more state initialization
  }
}, [initialData, setHeaderTheme])

useEffect(() => {
  if (selectedLanguage !== locale) {
    handleLanguageChange(selectedLanguage) // Only fetch on language change
  }
}, [selectedLanguage, locale, handleLanguageChange])
```

#### 4. Logo Links Made Locale-Aware
**Files:**
- `src/globals/Header/Component.client.tsx` (lines 282, 292, 470, 480)
- `src/globals/Footer/Component.client.tsx`

```typescript
// Before: Hardcoded to root
<Link href="/">

// After: Locale-aware
<Link href={`/${selectedLanguage}`}>
```

#### 5. Card Components - Locale-Aware URLs
**Files Updated:**
- `src/components/ResourceGallery/index.tsx`
- `src/components/ResourceFeatureCard/index.tsx`
- `src/components/ListingCardDeck/index.tsx`

**Pattern:** Added `locale` parameter to URL construction helpers:
```typescript
const getResourceUrl = (slug?: string | null, relationTo?: string): string => {
  if (!slug) return '#'
  const collectionSlug = getCollectionSlug(relationTo)
  return collectionSlug ? `/${locale}/${collectionSlug}/${slug}` : `/${locale}/${slug}`
}
```

#### 6. Card Components - Use Localized Titles
**Problem:** Cards showing English titles on Hindi pages
**Fix:** Use `heroTitle` (localized) instead of `title` (non-localized admin field)

```typescript
// Before:
const title = doc.title

// After:
const title = 'heroTitle' in item && item.heroTitle ? item.heroTitle : item.title
```

#### 7. Static Generation Skip in Development
**Applied to:** All `[locale]/*/page.tsx` route files

```typescript
export async function generateStaticParams() {
  if (process.env.NODE_ENV === 'development') {
    return [] // Skip to avoid Payload initialization loops
  }
  // ... static generation logic
}
```

### Files Modified - Locale Routing

| File | Changes |
|------|---------|
| `src/utilities/getGlobals.ts` | Removed unstable_cache, direct getGlobal calls |
| `src/globals/Header/Component.tsx` | Use getGlobal() directly, pass initialData |
| `src/globals/Header/Component.client.tsx` | Logo links use `/${selectedLanguage}`, conditional re-fetch |
| `src/globals/Footer/Component.client.tsx` | Logo link locale-aware |
| `src/app/(frontend)/[locale]/layout.tsx` | NEW: Header/Footer with locale from params |
| `src/app/(frontend)/[locale]/page.tsx` | Pass initialData to Homepage |
| `src/app/(frontend)/[locale]/[slug]/page.tsx` | depth: 3, initialData, skip generateStaticParams in dev |
| `src/app/(frontend)/[locale]/blog/[slug]/page.tsx` | Same pattern |
| `src/app/(frontend)/[locale]/grants/[slug]/page.tsx` | Same pattern |
| `src/app/(frontend)/[locale]/reports/[slug]/page.tsx` | Same pattern |
| `src/app/(frontend)/[locale]/mmedia/[slug]/page.tsx` | Same pattern |
| `src/app/(frontend)/[locale]/grantcards/[slug]/page.tsx` | Same pattern |
| `src/app/(frontend)/components/UAFPage/UAFPage.tsx` | Accept initialData, conditional re-fetch |
| `src/app/(frontend)/components/BlogPage/BlogPage.tsx` | Accept initialData, conditional re-fetch |
| `src/app/(frontend)/components/GrantPage/GrantPage.tsx` | Accept initialData, conditional re-fetch |
| `src/app/(frontend)/components/ReportPage/ReportPage.tsx` | Accept initialData, conditional re-fetch |
| `src/app/(frontend)/components/MMediaPage/MMediaPage.tsx` | Accept initialData, conditional re-fetch |
| `src/app/(frontend)/components/GrantCardComponent/GrantCardComponent.tsx` | Accept initialData, conditional re-fetch |
| `src/components/ResourceGallery/index.tsx` | Locale-aware URLs, use heroTitle |
| `src/components/ResourceFeatureCard/index.tsx` | Locale-aware URLs, use heroTitle |
| `src/components/ListingCardDeck/index.tsx` | Locale-aware URLs, use heroTitle |

---

## Part 2: SEO Fields Standardization

### Goal
Standardize SEO field configuration across all content collections with consistent positioning.

### Changes Made

#### 1. Added Manual SEO Fields
**Collections:** Reports, Blog, MMedia

Added manual SEO fields matching Pages/Grants structure:
- Meta Title (with custom MetaTitleField component)
- Meta Description (with custom MetaDescriptionField component)
- Meta Image (assetCloud upload, PNG/JPG/GIF only)
- SEO Preview (SeoPreviewComponent)

**Files:**
- `src/collections/Reports/index.ts` (lines 299-359)
- `src/collections/Blog/index.ts` (lines 284-344)
- `src/collections/MMedia/index.ts` (lines 284-344)

```typescript
// Manual SEO fields
{
  name: 'meta',
  type: 'group',
  label: 'SEO',
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Meta Title',
      admin: {
        components: {
          Field: 'src/components/SeoFields/MetaTitleField.tsx#MetaTitleField',
        },
      },
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Meta Description',
      admin: {
        components: {
          Field: 'src/components/SeoFields/MetaDescriptionField.tsx#MetaDescriptionField',
        },
      },
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'assetCloud',
      label: 'Meta Image',
      filterOptions: {
        mimeType: {
          in: ['image/png', 'image/jpeg', 'image/gif'],
        },
      },
      admin: {
        description: 'Image for social sharing. Only PNG, JPG, and GIF formats are supported. Select from Assets.',
      },
    },
    {
      name: 'preview',
      type: 'ui',
      admin: {
        components: {
          Field: {
            path: 'src/components/SeoPreview/index.tsx#SeoPreviewComponent',
            clientProps: {
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
              imagePath: 'meta.image',
              hasGenerateURLFn: false,
              uploadsCollection: 'assetCloud',
            },
          },
        },
      },
      label: 'Preview',
    },
  ],
  // NOTE: No position: 'sidebar' - appears below in main content
}
```

#### 2. Removed Collections from seoPlugin
**File:** `src/payload.config.ts` (line 164)

**Problem:** seoPlugin was auto-adding `meta` field to Blog, Reports, MMedia, causing duplicate field errors

```typescript
// Before:
collections: ['blog', 'reports', 'mmedia'],

// After:
collections: [], // All collections now use manual SEO fields
```

Updated comment:
```typescript
// Note: 'pages' and 'grants' removed - they have manual seoImage field instead
// Note: 'homepage' removed due to seoPlugin bug with globals causing circular reference error
// Note: 'blog', 'reports', 'mmedia' now use manual SEO fields instead of plugin
```

#### 3. Moved SEO Section from Sidebar to Below
**Collections:** Pages, Grants

Removed `position: 'sidebar'` from SEO field admin config to make it appear below content (not in sidebar).

**Files:**
- `src/collections/Pages/index.ts` (removed line 364: `position: 'sidebar'`)
- `src/collections/Grants/index.ts` (removed line 359: `position: 'sidebar'`)

### SEO Field Positioning Summary

| Collection | SEO Fields | Position |
|-----------|------------|----------|
| Pages | Manual | Below (changed from sidebar) |
| Grants | Manual | Below (changed from sidebar) |
| Reports | Manual | Below (newly added) |
| Blog | Manual | Below (newly added) |
| MMedia | Manual | Below (newly added) |

All collections now have **consistent SEO field configuration** positioned below the main content area.

---

## Part 3: Hydration Fix (Production Build Issue)

### Problem Discovered
After running `pnpm build` and testing with `pnpm start`, loading `/hi` directly showed:
- ✅ Announcement banner in Hindi
- ✅ Language selector in Hindi
- ❌ Header nav, donate button, hero content, page content, footer in **English**
- Switching language selector to English then back to Hindi fixed all content

### Root Cause
**Hydration mismatch** between server and client:
- **Server**: Rendered page with correct locale from URL params (`hi`)
- **Client**: LanguageProvider initialized with hardcoded default `locale='en'`
- Client components re-rendered with English content, overriding server HTML

**Code flow:**
1. Root layout (`(frontend)/layout.tsx`) called `<Providers>` without locale prop
2. Providers component (`providers/index.tsx` line 10) defaulted to `locale='en'`
3. LanguageProvider received `locale='en'` prop, which took precedence over URL detection
4. Line 37: `const initialLocale = locale || urlLocale` → used `'en'` instead of `urlLocale`

### Solution
**File:** `src/providers/index.tsx` (line 10)

Removed hardcoded default value to allow URL-based locale detection:

```typescript
// Before: Hardcoded default caused hydration mismatch
export const Providers: React.FC<{
  children: React.ReactNode
  locale?: string
}> = ({ children, locale = 'en' }) => {

// After: No default, LanguageProvider reads from URL
export const Providers: React.FC<{
  children: React.ReactNode
  locale?: string
}> = ({ children, locale }) => {
```

### How It Works
- Root layout calls `<Providers>` without passing `locale` prop
- Providers passes `locale={undefined}` to LanguageProvider
- LanguageProvider (line 37): `const initialLocale = locale || urlLocale`
- Since `locale` is undefined, uses `urlLocale` from URL path detection
- **Result**: Server and client both initialize to the same locale from URL → no hydration mismatch

### Files Modified - Hydration Fix

| File | Changes |
|------|---------|
| `src/providers/index.tsx` | Removed `locale = 'en'` default (line 10) |

---

## Testing Verification

✅ **Route Loading:**
- `/` redirects to `/en` ✓
- `/en` loads English homepage ✓
- `/hi` loads Hindi homepage ✓
- `/en/who-we-are`, `/hi/who-we-are` load correctly ✓

✅ **Navigation:**
- Menu items display in correct locale ✓
- Logo links navigate to `/{locale}` homepage ✓

✅ **Card Components:**
- ListingCardDeck renders Hindi titles/content ✓
- ResourceGallery renders Hindi titles/content ✓
- ResourceFeatureCard renders Hindi titles/content ✓
- All use locale-aware URLs ✓

✅ **SEO Fields:**
- All collections (Pages, Grants, Reports, Blog, MMedia) have manual SEO fields ✓
- All positioned below content (not in sidebar) ✓
- No duplicate field errors ✓

✅ **Performance:**
- No "Pulling schema from database" infinite loops ✓
- Server-fetched data used as initialData ✓
- Client-side re-fetch only on language change ✓

✅ **Hydration (Production Build):**
- Direct navigation to `/hi` shows all content in Hindi ✓
- No hydration mismatch between server and client ✓
- LanguageProvider initializes from URL locale ✓

---

## Key Technical Patterns

### 1. Server-Side Data Fetching with Initial Data
```typescript
// Server Component
const data = await queryBySlug({ slug, locale, depth: 3 })
return <ClientComponent initialData={data} locale={locale} />

// Client Component
const [state, setState] = useState(null)

useEffect(() => {
  if (initialData) {
    setState(initialData)
  }
}, [initialData])

useEffect(() => {
  if (selectedLanguage !== locale) {
    fetchData(selectedLanguage)
  }
}, [selectedLanguage, locale])
```

### 2. Locale-Aware URL Construction
```typescript
const url = `/${locale}/${collectionSlug}/${slug}`
```

### 3. Localized Field Selection
```typescript
// Use heroTitle (localized) instead of title (admin field)
const title = 'heroTitle' in item && item.heroTitle ? item.heroTitle : item.title
```

### 4. Skip Static Generation in Development
```typescript
export async function generateStaticParams() {
  if (process.env.NODE_ENV === 'development') return []
  // ... generation logic
}
```

---

## Related Documentation

- **Unified Locale Routing Details:** `docs/unified-locale-routing.md`
- **Collections Overview:** `docs/COLLECTIONS.md`
- **Language Configuration:** `docs/LANGUAGE_CONFIGURATION.md`

---

## Git Commit

```bash
git add .
git commit -m "feat: implement unified locale routing and standardize SEO fields

Route restructuring:
- Implement [locale]/ routing for all locales including English (/en/)
- Move Header/Footer from root layout to [locale]/layout.tsx
- Fix navigation locale display by removing unstable_cache wrapper
- Update all card components (ListingCardDeck, ResourceGallery, ResourceFeatureCard) to use locale-aware URLs
- Make logo links locale-aware in header and footer
- Use heroTitle field instead of title for localized content

SEO improvements:
- Add manual SEO fields to Reports, Blog, and MMedia collections
- Move SEO sections from sidebar to below for Pages and Grants
- Position all SEO sections below content (not in sidebar)
- Remove collections from seoPlugin to prevent duplicate field conflicts

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"
```

---

## Next Session Resume Points

1. ~~**Test production build:** Run `pnpm build` to ensure all static generation works~~ ✅ **DONE** - Production build tested successfully
2. ~~**Fix hydration mismatch:** All content should load in correct locale on direct navigation~~ ✅ **DONE** - Fixed in providers/index.tsx
3. **Review SEO metadata generation:** Check that meta tags are properly generated on frontend
4. **Consider caching strategy:** May want to re-introduce caching for globals with proper locale-aware cache keys

---

## Notes

- Server component data fetching depth is now `3` to ensure deeply nested relationships are populated
- All page components use the initialData pattern to minimize client-side API calls
- Navigation/Header/Footer globals are fetched on server and passed as initialData
- SEO field components (MetaTitleField, MetaDescriptionField, SeoPreviewComponent) are reused across all collections
- assetCloud is used for SEO images (instead of mediaCloud) for consistency with Pages collection
- **Hydration fix:** Providers component no longer defaults locale to 'en', allowing LanguageProvider to read from URL path for correct SSR/client sync
