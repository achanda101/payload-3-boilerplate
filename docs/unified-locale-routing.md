# Unified Locale Routing

**Branch:** `ssg-isr`
**Date:** 2026-02-14
**Status:** Implementation complete, needs testing

## Problem Solved

Loading `/hi` caused a "Pulling schema from database" infinite loop. The root cause: `(frontend)/layout.tsx` rendered Header/Footer with hardcoded `locale='en'`, but `LanguageProvider` detected `hi` from the URL. This mismatch (`selectedLanguage='hi' !== initialLocale='en'`) triggered 5 client-side API re-fetches that overwhelmed the dev server.

The root architectural issue was that the layout had no access to route params, so it couldn't pass the correct locale to Header/Footer.

## Solution: All Locales Get a URL Prefix

English is no longer special-cased. Every URL starts with `/{locale}/`:
- `/en` - English homepage
- `/hi` - Hindi homepage
- `/en/blog/some-post` - English blog post
- `/hi/grants/some-grant` - Hindi grant page
- `/` - Redirects to `/en`

## Current Route Structure

```
src/app/(frontend)/
├── layout.tsx                          # Providers, fonts, html/body only (NO Header/Footer)
├── page.tsx                            # redirect('/en')
├── sitemap.ts                          # All locales get /{locale}/ prefix
├── robots.ts
├── not-found.tsx
├── [locale]/
│   ├── layout.tsx                      # Header/Footer with locale from params.locale
│   ├── page.tsx                        # Locale homepage (all locales including en)
│   ├── [slug]/page.tsx                 # Pages collection
│   ├── blog/[slug]/page.tsx            # Blog collection
│   ├── grants/[slug]/page.tsx          # Grants collection
│   ├── reports/[slug]/page.tsx         # Reports collection
│   ├── mmedia/[slug]/page.tsx          # MMedia collection
│   ├── grantcards/[slug]/page.tsx      # Grant cards
│   └── search/
│       ├── page.tsx                    # Search page
│       └── SearchContent.tsx           # Client search component
├── components/                         # Shared page components (BlogPage, UAFPage, etc.)
└── next/                               # Preview routes
```

## Key Param Names

All route files under `[locale]/` use:
- `params.locale` - the locale code (en, hi, ar, etc.)
- `params.slug` - the content slug

Old naming (`slug` for locale, `subslug` for content) is gone.

## Files Changed (from pre-refactor state)

### Route Files
| File | Change |
|------|--------|
| `(frontend)/layout.tsx` | Removed Header/Footer imports and rendering |
| `(frontend)/page.tsx` | Now just `redirect('/en')` |
| `(frontend)/[locale]/layout.tsx` | **NEW** - Reads `params.locale`, passes to Header/Footer |
| `(frontend)/[locale]/page.tsx` | Rewritten - locale homepage for ALL locales, `generateStaticParams` returns all `VALID_LOCALES` |
| `(frontend)/[locale]/[slug]/page.tsx` | Params: `{locale, slug}`, no English exclusion, iterates ALL `VALID_LOCALES` |
| `(frontend)/[locale]/blog/[slug]/page.tsx` | Same pattern as above |
| `(frontend)/[locale]/grants/[slug]/page.tsx` | Same pattern |
| `(frontend)/[locale]/reports/[slug]/page.tsx` | Same pattern |
| `(frontend)/[locale]/mmedia/[slug]/page.tsx` | Same pattern |
| `(frontend)/[locale]/grantcards/[slug]/page.tsx` | **NEW** - Moved from old `grantcards/` |
| `(frontend)/[locale]/search/page.tsx` | **NEW** - Moved from old `search/` |
| `(frontend)/[locale]/search/SearchContent.tsx` | **NEW** - Uses `useParams()` for locale-aware result links |

### Utility / Shared Files
| File | Change |
|------|--------|
| `src/utilities/localeUtils.ts` | `getLocalizedUrl()` always includes locale prefix (no English skip) |
| `src/utilities/revalidateCollection.ts` | All locales revalidate as `/{locale}{path}` (no English special case) |
| `src/globals/Header/Component.client.tsx` | `handleLanguageChange`: all locales get `/{lang}` prefix; search URLs include `/${selectedLanguage}/search?q=...` |
| `src/globals/Footer/Component.client.tsx` | No changes needed (no URL construction) |
| `src/providers/LanguageContext/index.tsx` | Minor: `|| 'en'` → `?? 'en'` (functionally same) |
| `src/components/Link/index.tsx` | No code change needed - already uses `getLocalizedUrl()` which now handles English |
| `src/utilities/generatePreviewPath.ts` | No code change needed - already uses `getLocalizedUrl()` |
| `src/app/(frontend)/sitemap.ts` | Rewritten - all locales get `/{locale}/` prefix in URLs |

### Deleted (old English-only routes)
- `src/app/(frontend)/blog/[slug]/page.tsx`
- `src/app/(frontend)/grants/[slug]/page.tsx`
- `src/app/(frontend)/reports/[slug]/page.tsx`
- `src/app/(frontend)/mmedia/[slug]/page.tsx`
- `src/app/(frontend)/grantcards/[slug]/page.tsx`
- `src/app/(frontend)/search/page.tsx`
- `src/app/(frontend)/search/SearchContent.tsx`

## How the Locale Layout Works

```tsx
// src/app/(frontend)/[locale]/layout.tsx
export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params
  const validLocale = isValidLocale(locale) ? locale : 'en'
  return (
    <div>
      <Header locale={validLocale} />
      <main>{children}</main>
      <Footer locale={validLocale} />
    </div>
  )
}
```

This means Header/Footer are server-rendered with the correct locale from the URL. No mismatch with LanguageProvider, no client-side re-fetches on initial load.

## Verification Checklist

- [ ] `pnpm dev` starts without errors
- [ ] `/` redirects to `/en`
- [ ] `/en` loads English homepage with correct Header/Footer
- [ ] `/hi` loads Hindi homepage with Hindi Header/Footer (no "Pulling schema" loop)
- [ ] `/en/blog/some-post` loads an English blog post
- [ ] `/hi/blog/some-post` loads a Hindi blog post
- [ ] Language selector navigates between `/en/...` and `/hi/...` correctly
- [ ] No client-side API re-fetches on initial page load
- [ ] Search works at `/en/search?q=test`
- [ ] Admin live preview still works
- [ ] Sitemap generates correct URLs with locale prefixes

## Potential Issues to Watch For

1. **Hardcoded links in CMS content**: Any links stored in Payload that use `/blog/foo` instead of `/en/blog/foo` will break. May need a migration or redirect middleware.
2. **External links/bookmarks**: Old URLs like `/about-us` are now `/en/about-us`. Consider adding redirect middleware for backwards compatibility.
3. **Admin panel preview paths**: `generatePreviewPath.ts` uses `getLocalizedUrl()` which now returns `/en/...` for English - should work but verify.
4. **SEO impact**: All English URLs changed from `/path` to `/en/path`. Will need 301 redirects for production.
