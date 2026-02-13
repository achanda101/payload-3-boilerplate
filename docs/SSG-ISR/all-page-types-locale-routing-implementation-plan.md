# Locale-Based Routing Implementation Plan for All Collections

## Overview

This document outlines the implementation plan for adding locale-based URL routing to **all major content collections and the homepage**, enabling URLs like:

### Homepage (Global)
- `example.com/` (English - default)
- `example.com/hi` (Hindi)
- `example.com/th` (Thai)

### Pages Collection
- `example.com/<slug>` (English - default)
- `example.com/hi/<slug>` (Hindi)
- `example.com/th/<slug>` (Thai)

### Grants Collection
- `example.com/grants/<slug>` (English - default)
- `example.com/hi/grants/<slug>` (Hindi)
- `example.com/th/grants/<slug>` (Thai)

### Blog Collection
- `example.com/blog/<slug>` (English - default)
- `example.com/hi/blog/<slug>` (Hindi)
- `example.com/th/blog/<slug>` (Thai)

### Reports Collection
- `example.com/reports/<slug>` (English - default)
- `example.com/hi/reports/<slug>` (Hindi)
- `example.com/th/reports/<slug>` (Thai)

### MMedia Collection
- `example.com/mmedia/<slug>` (English - default)
- `example.com/hi/mmedia/<slug>` (Hindi)
- `example.com/th/mmedia/<slug>` (Thai)

## Approach: Parallel Routes with Locale Prefix

We will implement **Approach 1: Locale Prefix for Non-English** which maintains backward compatibility:
- Default English URLs remain without locale prefix: `/`, `/grants/emergency-grant`, `/blog/latest-news`
- All other languages use locale prefix: `/hi`, `/hi/grants/emergency-grant`, `/th/blog/latest-news`

This approach:
- ✅ Maintains SEO for existing English URLs
- ✅ Clear language indication in URLs
- ✅ Easier to implement than full i18n routing
- ✅ Works with existing Payload localization system
- ✅ Consistent across all collections and homepage

---

## Implementation Steps

### Phase 1: Create Locale-Prefixed Route Structure for All Collections and Homepage

#### Step 1.1: Create New Route Directories

Create the following locale-prefixed route directories:

1. **Homepage:** `src/app/(frontend)/[locale]/page.tsx`
2. **Pages Collection:** `src/app/(frontend)/[locale]/[slug]/page.tsx`
3. **Grants Collection:** `src/app/(frontend)/[locale]/grants/[slug]/page.tsx`
4. **Blog Collection:** `src/app/(frontend)/[locale]/blog/[slug]/page.tsx`
5. **Reports Collection:** `src/app/(frontend)/[locale]/reports/[slug]/page.tsx`
6. **MMedia Collection:** `src/app/(frontend)/[locale]/mmedia/[slug]/page.tsx`

These will handle all non-English localized pages.

#### Step 1.2: Implement Locale Route Handlers

**Valid Locales Configuration (used by all handlers):**

```typescript
// Valid locales from languageOptions.json
const VALID_LOCALES = [
  'ar', 'bi', 'bn-IN', 'br', 'ch', 'prs-Arab', 'km', 'hi', 
  'ms', 'ne', 'ps-Arab', 'pcm', 'si', 'tl', 'ta', 'th', 'vi', 'ur',
  'lpl1', 'lpl2', 'lpl3', 'lpl4', 'lpl5', 'lpl6', 'lpl7', 'lpl8',
  'lpl9', 'lpl10', 'lpl11', 'lpl12', 'lpl13', 'lpl14', 'lpl15', 'lpl16'
]
```

---

**File 1: `src/app/(frontend)/[locale]/page.tsx` (Homepage)**

```typescript
import type { Metadata } from 'next/types'
import React from 'react'
import { Homepage } from '@/globals/Homepage/Component'
import { notFound } from 'next/navigation'

import { getPayload } from 'payload'
import { draftMode } from 'next/headers'
import configPromise from '@payload-config'
import { generateMeta } from '@/utilities/generateMeta'

// ISR Configuration
export const revalidate = 60
export const dynamic = 'force-static'
export const dynamicParams = false // Homepage has no dynamic params

const VALID_LOCALES = [
  'ar', 'bi', 'bn-IN', 'br', 'ch', 'prs-Arab', 'km', 'hi', 
  'ms', 'ne', 'ps-Arab', 'pcm', 'si', 'tl', 'ta', 'th', 'vi', 'ur',
  'lpl1', 'lpl2', 'lpl3', 'lpl4', 'lpl5', 'lpl6', 'lpl7', 'lpl8',
  'lpl9', 'lpl10', 'lpl11', 'lpl12', 'lpl13', 'lpl14', 'lpl15', 'lpl16'
]

type Args = {
  params: Promise<{
    locale: string
  }>
}

export default async function LocaleHomepage({ params: paramsPromise }: Args) {
  const { locale } = await paramsPromise
  
  // Validate locale
  if (!VALID_LOCALES.includes(locale)) {
    notFound()
  }

  // Homepage uses the Homepage component which fetches the homepage global
  return <Homepage locale={locale} />
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { locale } = await paramsPromise
  
  if (!VALID_LOCALES.includes(locale)) {
    return {}
  }

  const payload = await getPayload({ config: configPromise })
  
  const homepage = await payload.findGlobal({
    slug: 'homepage',
    locale: locale as any,
    depth: 1,
  })

  return generateMeta({ doc: homepage })
}

// Generate static params for all locales
export async function generateStaticParams() {
  return VALID_LOCALES.map(locale => ({
    locale,
  }))
}
```

---

**File 2: `src/app/(frontend)/[locale]/[slug]/page.tsx` (Pages Collection)**

```typescript
import type { Metadata } from 'next/types'
import React, { cache } from 'react'
import { UAFPage } from '../../components/UAFPage/UAFPage'
import { notFound } from 'next/navigation'

import { getPayload } from 'payload'
import { draftMode } from 'next/headers'
import configPromise from '@payload-config'
import { generateMeta } from '@/utilities/generateMeta'

// ISR Configuration
export const revalidate = 60
export const dynamic = 'force-static'
export const dynamicParams = true

const VALID_LOCALES = [
  'ar', 'bi', 'bn-IN', 'br', 'ch', 'prs-Arab', 'km', 'hi', 
  'ms', 'ne', 'ps-Arab', 'pcm', 'si', 'tl', 'ta', 'th', 'vi', 'ur',
  'lpl1', 'lpl2', 'lpl3', 'lpl4', 'lpl5', 'lpl6', 'lpl7', 'lpl8',
  'lpl9', 'lpl10', 'lpl11', 'lpl12', 'lpl13', 'lpl14', 'lpl15', 'lpl16'
]

type Args = {
  params: Promise<{
    locale: string
    slug?: string
  }>
}

export default async function LocalePagePage({ params: paramsPromise }: Args) {
  const { locale, slug = 'home' } = await paramsPromise
  
  // Validate locale
  if (!VALID_LOCALES.includes(locale)) {
    notFound()
  }

  const { isEnabled: isDraftMode } = await draftMode()
  const page = await queryPageBySlug({ slug, locale })

  if (!page) {
    notFound()
  }

  return (
    <UAFPage
      collection='pages'
      docId={page.id}
      isDraft={isDraftMode}
      locale={locale}
    />
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { locale, slug = 'home' } = await paramsPromise
  
  if (!VALID_LOCALES.includes(locale)) {
    return {}
  }

  const page = await queryPageBySlug({ slug, locale })
  return generateMeta({ doc: page })
}

const queryPageBySlug = cache(async ({ slug, locale }: { slug: string; locale: string }) => {
  const { isEnabled: draft } = await draftMode()

  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'pages',
    draft,
    limit: 1,
    overrideAccess: draft,
    pagination: false,
    locale: locale as any,
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  return result.docs?.[0] || null
})

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const params: Array<{ locale: string; slug: string }> = []

  for (const locale of VALID_LOCALES) {
    try {
      const pages = await payload.find({
        collection: 'pages',
        limit: 1000,
        locale: locale as any,
        where: {
          _status: {
            equals: 'published',
          },
        },
      })

      for (const page of pages.docs) {
        if (page.slug && page.slug !== 'home') {
          params.push({
            locale,
            slug: page.slug,
          })
        }
      }
    } catch (error) {
      console.error(`Error generating static params for locale ${locale}:`, error)
    }
  }

  return params
}
```

---

**File 2: `src/app/(frontend)/[locale]/grants/[slug]/page.tsx` (Grants Collection)**

```typescript
import type { Metadata } from 'next/types'
import React, { cache } from 'react'
import { GrantPage } from '../../../components/GrantPage/GrantPage'
import { notFound } from 'next/navigation'

import { getPayload } from 'payload'
import { draftMode } from 'next/headers'
import configPromise from '@payload-config'
import { generateMeta } from '@/utilities/generateMeta'

// ISR Configuration
export const revalidate = 60
export const dynamic = 'force-static'
export const dynamicParams = true

const VALID_LOCALES = [
  'ar', 'bi', 'bn-IN', 'br', 'ch', 'prs-Arab', 'km', 'hi', 
  'ms', 'ne', 'ps-Arab', 'pcm', 'si', 'tl', 'ta', 'th', 'vi', 'ur',
  'lpl1', 'lpl2', 'lpl3', 'lpl4', 'lpl5', 'lpl6', 'lpl7', 'lpl8',
  'lpl9', 'lpl10', 'lpl11', 'lpl12', 'lpl13', 'lpl14', 'lpl15', 'lpl16'
]

type Args = {
  params: Promise<{
    locale: string
    slug?: string
  }>
}

export default async function LocaleGrantPage({ params: paramsPromise }: Args) {
  const { locale, slug = '' } = await paramsPromise
  
  if (!VALID_LOCALES.includes(locale)) {
    notFound()
  }

  const { isEnabled: isDraftMode } = await draftMode()
  const page = await queryPageBySlug({ slug, locale })

  if (!page) {
    notFound()
  }

  return (
    <GrantPage
      collection='grants'
      docId={page.id}
      isDraft={isDraftMode}
      locale={locale}
    />
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { locale, slug = '' } = await paramsPromise
  
  if (!VALID_LOCALES.includes(locale)) {
    return {}
  }

  const page = await queryPageBySlug({ slug, locale })
  return generateMeta({ doc: page })
}

const queryPageBySlug = cache(async ({ slug, locale }: { slug: string; locale: string }) => {
  const { isEnabled: draft } = await draftMode()

  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'grants',
    draft,
    limit: 1,
    overrideAccess: draft,
    pagination: false,
    locale: locale as any,
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  return result.docs?.[0] || null
})

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const params: Array<{ locale: string; slug: string }> = []

  for (const locale of VALID_LOCALES) {
    try {
      const grants = await payload.find({
        collection: 'grants',
        limit: 1000,
        locale: locale as any,
        where: {
          _status: {
            equals: 'published',
          },
        },
      })

      for (const grant of grants.docs) {
        if (grant.slug) {
          params.push({
            locale,
            slug: grant.slug,
          })
        }
      }
    } catch (error) {
      console.error(`Error generating static params for locale ${locale}:`, error)
    }
  }

  return params
}
```

---

**File 3: `src/app/(frontend)/[locale]/blog/[slug]/page.tsx` (Blog Collection)**

```typescript
import type { Metadata } from 'next/types'
import React, { cache } from 'react'
import { BlogPage } from '../../../components/BlogPage/BlogPage'
import { notFound } from 'next/navigation'

import { getPayload } from 'payload'
import { draftMode } from 'next/headers'
import configPromise from '@payload-config'
import { generateMeta } from '@/utilities/generateMeta'

// ISR Configuration
export const revalidate = 60
export const dynamic = 'force-static'
export const dynamicParams = true

const VALID_LOCALES = [
  'ar', 'bi', 'bn-IN', 'br', 'ch', 'prs-Arab', 'km', 'hi', 
  'ms', 'ne', 'ps-Arab', 'pcm', 'si', 'tl', 'ta', 'th', 'vi', 'ur',
  'lpl1', 'lpl2', 'lpl3', 'lpl4', 'lpl5', 'lpl6', 'lpl7', 'lpl8',
  'lpl9', 'lpl10', 'lpl11', 'lpl12', 'lpl13', 'lpl14', 'lpl15', 'lpl16'
]

type Args = {
  params: Promise<{
    locale: string
    slug?: string
  }>
}

export default async function LocaleBlogPage({ params: paramsPromise }: Args) {
  const { locale, slug = '' } = await paramsPromise
  
  if (!VALID_LOCALES.includes(locale)) {
    notFound()
  }

  const { isEnabled: isDraftMode } = await draftMode()
  const page = await queryPageBySlug({ slug, locale })

  if (!page) {
    notFound()
  }

  return (
    <BlogPage
      collection='blog'
      docId={page.id}
      isDraft={isDraftMode}
      locale={locale}
    />
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { locale, slug = '' } = await paramsPromise
  
  if (!VALID_LOCALES.includes(locale)) {
    return {}
  }

  const page = await queryPageBySlug({ slug, locale })
  return generateMeta({ doc: page })
}

const queryPageBySlug = cache(async ({ slug, locale }: { slug: string; locale: string }) => {
  const { isEnabled: draft } = await draftMode()

  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'blog',
    draft,
    limit: 1,
    overrideAccess: draft,
    pagination: false,
    locale: locale as any,
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  return result.docs?.[0] || null
})

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const params: Array<{ locale: string; slug: string }> = []

  for (const locale of VALID_LOCALES) {
    try {
      const blogs = await payload.find({
        collection: 'blog',
        limit: 1000,
        locale: locale as any,
        where: {
          _status: {
            equals: 'published',
          },
        },
      })

      for (const blog of blogs.docs) {
        if (blog.slug) {
          params.push({
            locale,
            slug: blog.slug,
          })
        }
      }
    } catch (error) {
      console.error(`Error generating static params for locale ${locale}:`, error)
    }
  }

  return params
}
```

---

**File 4: `src/app/(frontend)/[locale]/reports/[slug]/page.tsx` (Reports Collection)**

```typescript
import type { Metadata } from 'next/types'
import React, { cache } from 'react'
import { ReportPage } from '../../../components/ReportPage/ReportPage'
import { notFound } from 'next/navigation'

import { getPayload } from 'payload'
import { draftMode } from 'next/headers'
import configPromise from '@payload-config'
import { generateMeta } from '@/utilities/generateMeta'

// ISR Configuration
export const revalidate = 60
export const dynamic = 'force-static'
export const dynamicParams = true

const VALID_LOCALES = [
  'ar', 'bi', 'bn-IN', 'br', 'ch', 'prs-Arab', 'km', 'hi', 
  'ms', 'ne', 'ps-Arab', 'pcm', 'si', 'tl', 'ta', 'th', 'vi', 'ur',
  'lpl1', 'lpl2', 'lpl3', 'lpl4', 'lpl5', 'lpl6', 'lpl7', 'lpl8',
  'lpl9', 'lpl10', 'lpl11', 'lpl12', 'lpl13', 'lpl14', 'lpl15', 'lpl16'
]

type Args = {
  params: Promise<{
    locale: string
    slug?: string
  }>
}

export default async function LocaleReportPage({ params: paramsPromise }: Args) {
  const { locale, slug = '' } = await paramsPromise
  
  if (!VALID_LOCALES.includes(locale)) {
    notFound()
  }

  const { isEnabled: isDraftMode } = await draftMode()
  const page = await queryPageBySlug({ slug, locale })

  if (!page) {
    notFound()
  }

  return (
    <ReportPage
      collection='reports'
      docId={page.id}
      isDraft={isDraftMode}
      locale={locale}
    />
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { locale, slug = '' } = await paramsPromise
  
  if (!VALID_LOCALES.includes(locale)) {
    return {}
  }

  const page = await queryPageBySlug({ slug, locale })
  return generateMeta({ doc: page })
}

const queryPageBySlug = cache(async ({ slug, locale }: { slug: string; locale: string }) => {
  const { isEnabled: draft } = await draftMode()

  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'reports',
    draft,
    limit: 1,
    overrideAccess: draft,
    pagination: false,
    locale: locale as any,
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  return result.docs?.[0] || null
})

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const params: Array<{ locale: string; slug: string }> = []

  for (const locale of VALID_LOCALES) {
    try {
      const reports = await payload.find({
        collection: 'reports',
        limit: 1000,
        locale: locale as any,
        where: {
          _status: {
            equals: 'published',
          },
        },
      })

      for (const report of reports.docs) {
        if (report.slug) {
          params.push({
            locale,
            slug: report.slug,
          })
        }
      }
    } catch (error) {
      console.error(`Error generating static params for locale ${locale}:`, error)
    }
  }

  return params
}
```

---

**File 5: `src/app/(frontend)/[locale]/mmedia/[slug]/page.tsx` (MMedia Collection)**

```typescript
import type { Metadata } from 'next/types'
import React, { cache } from 'react'
import { MMediaPage } from '../../../components/MMediaPage/MMediaPage'
import { notFound } from 'next/navigation'

import { getPayload } from 'payload'
import { draftMode } from 'next/headers'
import configPromise from '@payload-config'
import { generateMeta } from '@/utilities/generateMeta'

// ISR Configuration
export const revalidate = 60
export const dynamic = 'force-static'
export const dynamicParams = true

const VALID_LOCALES = [
  'ar', 'bi', 'bn-IN', 'br', 'ch', 'prs-Arab', 'km', 'hi', 
  'ms', 'ne', 'ps-Arab', 'pcm', 'si', 'tl', 'ta', 'th', 'vi', 'ur',
  'lpl1', 'lpl2', 'lpl3', 'lpl4', 'lpl5', 'lpl6', 'lpl7', 'lpl8',
  'lpl9', 'lpl10', 'lpl11', 'lpl12', 'lpl13', 'lpl14', 'lpl15', 'lpl16'
]

type Args = {
  params: Promise<{
    locale: string
    slug?: string
  }>
}

export default async function LocaleMMediaPage({ params: paramsPromise }: Args) {
  const { locale, slug = '' } = await paramsPromise
  
  if (!VALID_LOCALES.includes(locale)) {
    notFound()
  }

  const { isEnabled: isDraftMode } = await draftMode()
  const page = await queryPageBySlug({ slug, locale })

  if (!page) {
    notFound()
  }

  return (
    <MMediaPage
      collection='mmedia'
      docId={page.id}
      isDraft={isDraftMode}
      locale={locale}
    />
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { locale, slug = '' } = await paramsPromise
  
  if (!VALID_LOCALES.includes(locale)) {
    return {}
  }

  const page = await queryPageBySlug({ slug, locale })
  return generateMeta({ doc: page })
}

const queryPageBySlug = cache(async ({ slug, locale }: { slug: string; locale: string }) => {
  const { isEnabled: draft } = await draftMode()

  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'mmedia',
    draft,
    limit: 1,
    overrideAccess: draft,
    pagination: false,
    locale: locale as any,
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  return result.docs?.[0] || null
})

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const params: Array<{ locale: string; slug: string }> = []

  for (const locale of VALID_LOCALES) {
    try {
      const mmedia = await payload.find({
        collection: 'mmedia',
        limit: 1000,
        locale: locale as any,
        where: {
          _status: {
            equals: 'published',
          },
        },
      })

      for (const media of mmedia.docs) {
        if (media.slug) {
          params.push({
            locale,
            slug: media.slug,
          })
        }
      }
    } catch (error) {
      console.error(`Error generating static params for locale ${locale}:`, error)
    }
  }

  return params
}
```

---

### Phase 2: Update Collection Page Components and Homepage to Accept Locale

All collection page components and the homepage need to accept and use the locale prop.

#### Step 2.1: Update Homepage Component (Global)

**File: `src/globals/Homepage/Component.tsx`**

```typescript
import { HomepageClient } from './Component.client'
import React from 'react'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

type HomepageProps = {
  locale?: string  // Add this prop
}

export async function Homepage({ locale = 'en' }: HomepageProps) {
  const payload = await getPayload({ config: configPromise })
  
  const homepage = await payload.findGlobal({
    slug: 'homepage',
    locale: locale as any,
    depth: 3,
  })
  
  return <HomepageClient homepage={homepage} />
}
```

**File: `src/globals/Homepage/Component.client.tsx`**

Update to receive the homepage data as a prop:

```typescript
'use client'

import React from 'react'
import type { Homepage as HomepageType } from '@/payload-types'

type HomepageClientProps = {
  homepage: HomepageType
}

export const HomepageClient: React.FC<HomepageClientProps> = ({ homepage }) => {
  // Use homepage data to render content
  // ... existing implementation ...
}
```

#### Step 2.2: Update Existing English Homepage Route

**File: `src/app/(frontend)/page.tsx`**

Add ISR configuration and ensure it calls Homepage with default locale:

```typescript
import type { Metadata } from 'next/types'
import { Homepage } from '@/globals/Homepage/Component'

// ISR Configuration
export const revalidate = 60
export const dynamic = 'force-static'

export default async function Page() {
  return <Homepage locale="en" />
}

// Metadata generation remains the same
```

#### Step 2.3: Update UAFPage Component (Pages Collection)

**File: `src/app/(frontend)/components/UAFPage/UAFPage.tsx`**

```typescript
type UAFPageProps = {
  collection: string
  docId: string
  isDraft: boolean
  locale?: string  // Add this prop
}

export const UAFPage: React.FC<UAFPageProps> = async ({ 
  collection, 
  docId, 
  isDraft,
  locale = 'en'  // Default to English
}) => {
  const payload = await getPayload({ config: configPromise })

  const page = await payload.findByID({
    collection: 'pages',
    id: docId,
    draft: isDraft,
    locale: locale as any,
    depth: 3,
  })

  // Rest of implementation remains the same
  // ...
}
```

#### Step 2.2: Update GrantPage Component (Grants Collection)

**File: `src/app/(frontend)/components/GrantPage/GrantPage.tsx`**

```typescript
type GrantPageProps = {
  collection: string
  docId: string
  isDraft: boolean
  locale?: string  // Add this prop
}

export const GrantPage: React.FC<GrantPageProps> = async ({ 
  collection, 
  docId, 
  isDraft,
  locale = 'en'  // Default to English
}) => {
  const payload = await getPayload({ config: configPromise })

  const page = await payload.findByID({
    collection: 'grants',
    id: docId,
    draft: isDraft,
    locale: locale as any,
    depth: 3,
  })

  // Rest of implementation remains the same
  // ...
}
```

#### Step 2.3: Update BlogPage Component (Blog Collection)

**File: `src/app/(frontend)/components/BlogPage/BlogPage.tsx`**

```typescript
type BlogPageProps = {
  collection: string
  docId: string
  isDraft: boolean
  locale?: string  // Add this prop
}

export const BlogPage: React.FC<BlogPageProps> = async ({ 
  collection, 
  docId, 
  isDraft,
  locale = 'en'  // Default to English
}) => {
  const payload = await getPayload({ config: configPromise })

  const page = await payload.findByID({
    collection: 'blog',
    id: docId,
    draft: isDraft,
    locale: locale as any,
    depth: 3,
  })

  // Rest of implementation remains the same
  // ...
}
```

#### Step 2.4: Update ReportPage Component (Reports Collection)

**File: `src/app/(frontend)/components/ReportPage/ReportPage.tsx`**

```typescript
type ReportPageProps = {
  collection: string
  docId: string
  isDraft: boolean
  locale?: string  // Add this prop
}

export const ReportPage: React.FC<ReportPageProps> = async ({ 
  collection, 
  docId, 
  isDraft,
  locale = 'en'  // Default to English
}) => {
  const payload = await getPayload({ config: configPromise })

  const page = await payload.findByID({
    collection: 'reports',
    id: docId,
    draft: isDraft,
    locale: locale as any,
    depth: 3,
  })

  // Rest of implementation remains the same
  // ...
}
```

#### Step 2.5: Update MMediaPage Component (MMedia Collection)

**File: `src/app/(frontend)/components/MMediaPage/MMediaPage.tsx`**

```typescript
type MMediaPageProps = {
  collection: string
  docId: string
  isDraft: boolean
  locale?: string  // Add this prop
}

export const MMediaPage: React.FC<MMediaPageProps> = async ({ 
  collection, 
  docId, 
  isDraft,
  locale = 'en'  // Default to English
}) => {
  const payload = await getPayload({ config: configPromise })

  const page = await payload.findByID({
    collection: 'mmedia',
    id: docId,
    draft: isDraft,
    locale: locale as any,
    depth: 3,
  })

  // Rest of implementation remains the same
  // ...
}
```

#### Step 2.6: Update Existing English Route Handlers

Add ISR configuration to existing English route handlers:

**Files to update:**
- `src/app/(frontend)/[slug]/page.tsx` - Add `export const revalidate = 60`
- `src/app/(frontend)/grants/[slug]/page.tsx` - Add `export const revalidate = 60`
- `src/app/(frontend)/blog/[slug]/page.tsx` - Add `export const revalidate = 60`
- `src/app/(frontend)/reports/[slug]/page.tsx` - Add `export const revalidate = 60`
- `src/app/(frontend)/mmedia/[slug]/page.tsx` - Add `export const revalidate = 60`

---

### Phase 3: Update Language Utilities

#### Step 3.1: Create Locale Validation Utility

**Create: `src/utilities/localeUtils.ts`**

```typescript
import languageOptions from '@/globals/Header/languageOptions.json'

export const VALID_LOCALES = languageOptions.map(lang => lang.value)

export const DEFAULT_LOCALE = 'en'

export function isValidLocale(locale: string): boolean {
  return VALID_LOCALES.includes(locale)
}

export function getLocaleFromUrl(pathname: string): string | null {
  const segments = pathname.split('/').filter(Boolean)
  if (segments.length > 0 && isValidLocale(segments[0])) {
    return segments[0]
  }
  return null
}

export function stripLocaleFromPathname(pathname: string): string {
  const locale = getLocaleFromUrl(pathname)
  if (locale) {
    return pathname.replace(`/${locale}`, '') || '/'
  }
  return pathname
}

export function getLocalizedUrl(pathname: string, locale: string): string {
  if (locale === DEFAULT_LOCALE) {
    // English doesn't need locale prefix
    return stripLocaleFromPathname(pathname)
  }
  
  const cleanPath = stripLocaleFromPathname(pathname)
  return `/${locale}${cleanPath}`
}
```

---

### Phase 4: Update Navigation and Links

#### Step 4.1: Update Link Component

**File: `src/components/CMSLink/index.tsx`**

Modify the CMSLink component to handle localized URLs for all collections:

```typescript
import { getLocalizedUrl } from '@/utilities/localeUtils'
import { useLanguage } from '@/providers/LanguageContext'

export const CMSLink: React.FC<CMSLinkType> = (props) => {
  const { selectedLanguage } = useLanguage()
  
  // ... existing code ...
  
  if (type === 'reference' && reference) {
    // Generate localized URL for internal links
    let href = ''
    
    if (typeof reference.value === 'object') {
      const doc = reference.value
      const collection = reference.relationTo
      
      // Determine base path for each collection
      let basePath = ''
      switch (collection) {
        case 'pages':
          basePath = ''
          break
        case 'grants':
          basePath = '/grants'
          break
        case 'blog':
          basePath = '/blog'
          break
        case 'reports':
          basePath = '/reports'
          break
        case 'mmedia':
          basePath = '/mmedia'
          break
        default:
          basePath = `/${collection}`
      }
      
      href = `${basePath}/${doc.slug}`
      
      // Localize URL if not English
      href = getLocalizedUrl(href, selectedLanguage)
    }
    
    // ... rest of implementation
  }
  
  // ... existing code ...
}
```

#### Step 4.2: Update generatePreviewPath Utility

**File: `src/utilities/generatePreviewPath.ts`**

```typescript
export const generatePreviewPath = ({ collection, slug, locale }: Props) => {
  let path = `${collectionPrefixMap[collection]}/${slug}`
  
  // Add locale prefix if not English
  if (locale && locale !== 'en') {
    path = `/${locale}${path}`
  }

  const params = {
    slug,
    collection,
    path,
    ...(locale && { locale }),
  }

  const encodedParams = new URLSearchParams()
  Object.entries(params).forEach(([key, value]) => {
    encodedParams.append(key, value)
  })

  return `/next/preview?${encodedParams.toString()}`
}
```

---

### Phase 5: Update Sitemap Generation

#### Step 5.1: Update Sitemap for All Localized Collections and Homepage

**File: `src/app/(frontend)/sitemap.ts`**

Add support for localized URLs across all collections and homepage:

```typescript
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { getServerSideURL } from '@/utilities/getURL'
import type { MetadataRoute } from 'next'
import { VALID_LOCALES } from '@/utilities/localeUtils'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const payload = await getPayload({ config: configPromise })
  const serverUrl = getServerSideURL()

  const sitemapEntries: MetadataRoute.Sitemap = []

  // Homepage - English (no locale prefix)
  sitemapEntries.push({
    url: serverUrl,
    lastModified: new Date(),
    changeFrequency: 'daily',
    priority: 1.0,
  })

  // Homepage - Other locales (with locale prefix)
  const otherLocales = VALID_LOCALES.filter(l => l !== 'en')
  for (const locale of otherLocales) {
    sitemapEntries.push({
      url: `${serverUrl}/${locale}`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    })
  }

  // Helper function to add collection entries
  async function addCollectionToSitemap(
    collectionSlug: 'pages' | 'grants' | 'blog' | 'reports' | 'mmedia',
    basePath: string,
    priority: number
  ) {
    // English (no locale prefix)
    const docsEn = await payload.find({
      collection: collectionSlug,
      depth: 0,
      limit: 1000,
      locale: 'en',
      overrideAccess: false,
      select: {
        slug: true,
        updatedAt: true,
      },
      where: {
        _status: {
          equals: 'published',
        },
      },
    })

    docsEn.docs.forEach((doc) => {
      const path = basePath ? `${basePath}/${doc.slug}` : `/${doc.slug}`
      sitemapEntries.push({
        url: `${serverUrl}${path}`,
        lastModified: doc.updatedAt,
        changeFrequency: 'weekly',
        priority: priority,
      })
    })

    // Other locales (with locale prefix)
    for (const locale of otherLocales) {
      try {
        const docsLocale = await payload.find({
          collection: collectionSlug,
          depth: 0,
          limit: 1000,
          locale: locale as any,
          overrideAccess: false,
          select: {
            slug: true,
            updatedAt: true,
          },
          where: {
            _status: {
              equals: 'published',
            },
          },
        })

        docsLocale.docs.forEach((doc) => {
          const path = basePath ? `${basePath}/${doc.slug}` : `/${doc.slug}`
          sitemapEntries.push({
            url: `${serverUrl}/${locale}${path}`,
            lastModified: doc.updatedAt,
            changeFrequency: 'weekly',
            priority: priority - 0.1, // Slightly lower priority for non-English
          })
        })
      } catch (error) {
        console.error(`Error generating sitemap for ${collectionSlug} locale ${locale}:`, error)
      }
    }
  }

  // Add all collections
  await addCollectionToSitemap('pages', '', 0.9)
  await addCollectionToSitemap('grants', '/grants', 0.8)
  await addCollectionToSitemap('blog', '/blog', 0.7)
  await addCollectionToSitemap('reports', '/reports', 0.7)
  await addCollectionToSitemap('mmedia', '/mmedia', 0.6)

  return sitemapEntries
}
```

---

### Phase 6: Configure ISR (Incremental Static Regeneration)

**Important:** ISR is already implemented in your project through revalidation hooks. We need to update it for locale-aware routing so that only changed pages are rebuilt, not the entire site.

#### Step 6.1: Create Reusable Revalidation Utility

**Create: `src/utilities/revalidateCollection.ts`**

```typescript
import { revalidatePath, revalidateTag } from 'next/cache'
import type { CollectionAfterChangeHook, CollectionAfterDeleteHook, GlobalAfterChangeHook } from 'payload'
import { VALID_LOCALES } from '@/utilities/localeUtils'

interface RevalidateCollectionOptions {
  collectionSlug: string
  basePath: string
  tagName: string
}

export function createRevalidateHook(
  options: RevalidateCollectionOptions
): CollectionAfterChangeHook {
  return async ({ doc, req, previousDoc }) => {
    const path = options.basePath ? `${options.basePath}/${doc.slug}` : `/${doc.slug}`
    
    req.payload.logger.info(`Revalidating ${options.collectionSlug} at path: ${path}`)

    try {
      // Determine which locales were actually changed
      const changedLocales = new Set<string>()
      
      // If this is a new document, revalidate all locales
      if (!previousDoc) {
        VALID_LOCALES.forEach(locale => changedLocales.add(locale))
      } else {
        // For now, revalidate all locales on any change
        // TODO: Implement smart locale detection based on actual content changes
        VALID_LOCALES.forEach(locale => changedLocales.add(locale))
      }

      req.payload.logger.info(`Changed locales: ${Array.from(changedLocales).join(', ')}`)

      // Revalidate only changed locales
      for (const locale of changedLocales) {
        if (locale === 'en') {
          // English version (no locale prefix)
          revalidatePath(path)
        } else {
          // Localized versions (with locale prefix)
          revalidatePath(`/${locale}${path}`)
        }
        req.payload.logger.info(`Revalidated: ${locale === 'en' ? path : `/${locale}${path}`}`)
      }
      
      // Always revalidate the tag for collection-wide queries
      revalidateTag(options.tagName)
      
      req.payload.logger.info(
        `Successfully revalidated ${changedLocales.size} locale(s) for: ${path}`
      )
    } catch (error) {
      req.payload.logger.error(`Error revalidating ${options.collectionSlug} ${path}: ${error}`)
    }

    return doc
  }
}

export function createRevalidateDeleteHook(
  options: RevalidateCollectionOptions
): CollectionAfterDeleteHook {
  return async ({ doc, req }) => {
    const path = options.basePath ? `${options.basePath}/${doc.slug}` : `/${doc.slug}`

    req.payload.logger.info(`Revalidating deleted ${options.collectionSlug} at path: ${path}`)

    try {
      // For deletions, revalidate ALL locales since the content is gone
      // Revalidate English version
      revalidatePath(path)
      
      // Revalidate all locale versions
      for (const locale of VALID_LOCALES) {
        if (locale !== 'en') {
          revalidatePath(`/${locale}${path}`)
        }
      }
      
      // Revalidate collection tag
      revalidateTag(options.tagName)
      
      req.payload.logger.info(`Successfully revalidated deleted ${options.collectionSlug}: ${path}`)
    } catch (error) {
      req.payload.logger.error(
        `Error revalidating deleted ${options.collectionSlug} ${path}: ${error}`
      )
    }

    return doc
  }
}

// Special revalidation hook for Homepage global
export function createRevalidateHomepageHook(): GlobalAfterChangeHook {
  return async ({ doc, req }) => {
    req.payload.logger.info(`Revalidating homepage`)

    try {
      // Revalidate English homepage (no locale prefix)
      revalidatePath('/')
      
      // Revalidate all locale versions
      for (const locale of VALID_LOCALES) {
        if (locale !== 'en') {
          revalidatePath(`/${locale}`)
        }
      }
      
      // Revalidate homepage tag
      revalidateTag('global_homepage')
      
      req.payload.logger.info(`Successfully revalidated homepage for all locales`)
    } catch (error) {
      req.payload.logger.error(`Error revalidating homepage: ${error}`)
    }

    return doc
  }
}
```

#### Step 6.2: Update Homepage Revalidation Hook

**Create: `src/globals/Homepage/hooks/revalidateHomepage.ts`**

```typescript
import { createRevalidateHomepageHook } from '@/utilities/revalidateCollection'

export const revalidateHomepage = createRevalidateHomepageHook()
```

**Update: `src/globals/Homepage/config.ts`**

Add the revalidation hook:

```typescript
import { revalidateHomepage } from './hooks/revalidateHomepage'

export const Homepage: GlobalConfig = {
  slug: 'homepage',
  // ... other config ...
  hooks: {
    afterChange: [revalidateHomepage],
  },
}
```

#### Step 6.3: Update All Collection Revalidation Hooks

**File: `src/collections/Pages/hooks/revalidatePage.ts`**

```typescript
import { createRevalidateHook, createRevalidateDeleteHook } from '@/utilities/revalidateCollection'

export const revalidatePage = createRevalidateHook({
  collectionSlug: 'pages',
  basePath: '',
  tagName: 'pages',
})

export const revalidateDelete = createRevalidateDeleteHook({
  collectionSlug: 'pages',
  basePath: '',
  tagName: 'pages',
})
```

**File: `src/collections/Grants/hooks/revalidateGrant.ts`**

```typescript
import { createRevalidateHook, createRevalidateDeleteHook } from '@/utilities/revalidateCollection'

export const revalidateGrant = createRevalidateHook({
  collectionSlug: 'grants',
  basePath: '/grants',
  tagName: 'grants',
})

export const revalidateDelete = createRevalidateDeleteHook({
  collectionSlug: 'grants',
  basePath: '/grants',
  tagName: 'grants',
})
```

**File: `src/collections/Blog/hooks/revalidateBlog.ts`**

```typescript
import { createRevalidateHook, createRevalidateDeleteHook } from '@/utilities/revalidateCollection'

export const revalidateBlog = createRevalidateHook({
  collectionSlug: 'blog',
  basePath: '/blog',
  tagName: 'blog',
})

export const revalidateDelete = createRevalidateDeleteHook({
  collectionSlug: 'blog',
  basePath: '/blog',
  tagName: 'blog',
})
```

**File: `src/collections/Reports/hooks/revalidateReport.ts`**

```typescript
import { createRevalidateHook, createRevalidateDeleteHook } from '@/utilities/revalidateCollection'

export const revalidateReport = createRevalidateHook({
  collectionSlug: 'reports',
  basePath: '/reports',
  tagName: 'reports',
})

export const revalidateDelete = createRevalidateDeleteHook({
  collectionSlug: 'reports',
  basePath: '/reports',
  tagName: 'reports',
})
```

**File: `src/collections/MMedia/hooks/revalidateMMedia.ts`**

```typescript
import { createRevalidateHook, createRevalidateDeleteHook } from '@/utilities/revalidateCollection'

export const revalidateMMedia = createRevalidateHook({
  collectionSlug: 'mmedia',
  basePath: '/mmedia',
  tagName: 'mmedia',
})

export const revalidateDelete = createRevalidateDeleteHook({
  collectionSlug: 'mmedia',
  basePath: '/mmedia',
  tagName: 'mmedia',
})
```

#### Step 6.4: Ensure Hooks are Registered in Collections and Homepage

Verify each collection config and homepage global has the hooks registered:

**Homepage:** `src/globals/Homepage/config.ts`

```typescript
import { revalidateHomepage } from './hooks/revalidateHomepage'

export const Homepage: GlobalConfig = {
  slug: 'homepage',
  // ... other config ...
  hooks: {
    afterChange: [revalidateHomepage],
  },
}
```

**Example for Grants:** `src/collections/Grants/index.ts`

```typescript
import { revalidateGrant } from './hooks/revalidateGrant'

export const Grants: CollectionConfig<'grants'> = {
  slug: 'grants',
  // ... other config ...
  hooks: {
    afterChange: [revalidateGrant],
    afterDelete: [revalidateGrant],
  },
}
```

Repeat this verification for:
- `src/globals/Homepage/config.ts`
- `src/collections/Pages/index.ts`
- `src/collections/Blog/index.ts`
- `src/collections/Reports/index.ts`
- `src/collections/MMedia/index.ts`

---

### Phase 7: Update Header Language Selector

#### Step 7.1: Update Language Selector to Change URLs

**File: `src/globals/Header/Component.client.tsx`**

Update language change handler to navigate to localized URLs:

```typescript
import { usePathname, useRouter } from 'next/navigation'
import { getLocalizedUrl, stripLocaleFromPathname } from '@/utilities/localeUtils'

const handleLanguageChange = async (newLanguage: string) => {
  setSelectedLanguage(newLanguage)
  await fetchDataForLanguage(newLanguage)
  
  // Get current pathname without locale
  const currentPath = stripLocaleFromPathname(pathname)
  
  // Generate new localized URL
  const newUrl = getLocalizedUrl(currentPath, newLanguage)
  
  // Navigate to new URL
  router.push(newUrl)
}
```

---

## Testing Checklist

### Manual Testing

**Homepage Testing:**

- [ ] **English homepage works without locale prefix**
  - Test: `example.com/` loads correctly
  
- [ ] **Localized homepages work with locale prefix**
  - Test: `example.com/hi` (Hindi homepage)
  - Test: `example.com/th` (Thai homepage)
  - Test: `example.com/ar` (Arabic homepage)

**For Each Collection (Pages, Grants, Blog, Reports, MMedia):**

- [ ] **English (default) URLs work without locale prefix**
  - Test: `example.com/<slug>` (pages)
  - Test: `example.com/grants/<slug>` (grants)
  - Test: `example.com/blog/<slug>` (blog)
  - Test: `example.com/reports/<slug>` (reports)
  - Test: `example.com/mmedia/<slug>` (mmedia)
  
- [ ] **Localized URLs work with locale prefix**
  - Test: `example.com/hi/<slug>` (pages in Hindi)
  - Test: `example.com/hi/grants/<slug>` (grants in Hindi)
  - Test: `example.com/th/blog/<slug>` (blog in Thai)
  - Test: `example.com/ar/reports/<slug>` (reports in Arabic)
  - Test: `example.com/hi/mmedia/<slug>` (mmedia in Hindi)
  
- [ ] **Invalid locales return 404**
  - Test: `example.com/invalid` returns 404
  - Test: `example.com/invalid/<slug>` returns 404
  - Test: `example.com/invalid/grants/<slug>` returns 404
  
- [ ] **Language selector updates URL**
  - On `/` (homepage), switch to Hindi → `/hi`
  - On `/grants/emergency-grant`, switch to Hindi → `/hi/grants/emergency-grant`
  - On `/hi/blog/latest-news`, switch to English → `/blog/latest-news`
  - On `/about-us`, switch to Thai → `/th/about-us`
  - On `/th/reports/annual-report`, switch to Arabic → `/ar/reports/annual-report`
  
- [ ] **Draft mode works with localized URLs**
  - Test preview links for different locales across homepage and all collections
  
- [ ] **Revalidation works for homepage and all collections**
  - Update homepage in admin → verify revalidation
  - Update a page in admin → verify revalidation
  - Update a grant in admin → verify revalidation
  - Update a blog post in admin → verify revalidation
  - Update a report in admin → verify revalidation
  - Update mmedia in admin → verify revalidation
  - Check that other pages NOT updated
  
- [ ] **Internal links are localized across collections and homepage**
  - Navigate to any page in Hindi
  - Click links to homepage, grants, blog posts, reports, other pages
  - Verify links maintain Hindi locale
  - Test cross-collection navigation (blog → grant, page → report, etc.)
  - Test homepage links to all content types
  
- [ ] **Sitemap includes homepage and all collections with locales**
  - Visit `/sitemap.xml`
  - Verify English homepage (`/`) at priority 1.0
  - Verify localized homepages (`/hi`, `/th`, etc.) at priority 0.9
  - Verify English URLs without prefix for all collections
  - Verify localized URLs with prefix for all collections
  - Confirm homepage + all 5 collections are represented

**RTL Language Testing:**

- [ ] **RTL languages render correctly across homepage and all collections**
  - Test Arabic homepage (`/ar`)
  - Test Arabic (`/ar/<slug>`, `/ar/grants/<slug>`, etc.)
  - Test Urdu (`/ur`, `/ur/blog/<slug>`, `/ur/reports/<slug>`, etc.)
  - Verify text direction is right-to-left
  - Verify layout doesn't break in homepage or any collection

### ISR-Specific Testing

- [ ] **Verify on-demand revalidation works for homepage and all collections**
  - Edit homepage in admin, save it → check revalidation
  - Edit a page in admin, save it → check revalidation
  - Edit a grant in admin, save it → check revalidation
  - Edit a blog post in admin, save it → check revalidation
  - Edit a report in admin, save it → check revalidation
  - Edit mmedia in admin, save it → check revalidation
  - Check server logs for revalidation messages
  - Visit the updated pages, verify content changed
  - Verify other pages in same collection NOT updated
  
- [ ] **Test time-based revalidation**
  - Wait for revalidate timeout (60 seconds)
  - Make requests to homepage and pages in different collections
  - Verify pages regenerate correctly
  
- [ ] **Test cache tags for homepage and all collections**
  - Update homepage → verify 'global_homepage' tag invalidated
  - Update a page → verify 'pages' tag invalidated
  - Update a grant → verify 'grants' tag invalidated
  - Update a blog post → verify 'blog' tag invalidated
  - Update a report → verify 'reports' tag invalidated
  - Update mmedia → verify 'mmedia' tag invalidated
  - Update header → verify 'global_navigation' tag invalidated
  
- [ ] **Monitor build times across collections and homepage**
  - Record time for full build: `pnpm build`
  - Record time for revalidation: Watch logs when saving
  - Verify revalidation is <10 seconds for single document
  - Test with updates across multiple collections simultaneously
  - Test homepage revalidation performance
  
- [ ] **Test concurrent updates across collections and homepage**
  - Have multiple editors save content in different collections + homepage simultaneously
  - Verify all revalidations complete successfully
  - Check for race conditions or lock conflicts
  - Monitor server load during concurrent updates

- [ ] **Verify generateStaticParams output for homepage and all collections**
  ```bash
  pnpm build
  # Check output for:
  # ○ / (1 route) - English Homepage
  # ○ /[locale] (XX locales) - Localized Homepage
  # ○ /[slug] (XX locales) - Pages
  # ○ /grants/[slug] (XX locales) - Grants
  # ○ /blog/[slug] (XX locales) - Blog
  # ○ /reports/[slug] (XX locales) - Reports
  # ○ /mmedia/[slug] (XX locales) - MMedia
  # ○ /[locale]/[slug] (XX locales) - Localized Pages
  # ○ /[locale]/grants/[slug] (XX locales) - Localized Grants
  # ○ /[locale]/blog/[slug] (XX locales) - Localized Blog
  # ○ /[locale]/reports/[slug] (XX locales) - Localized Reports
  # ○ /[locale]/mmedia/[slug] (XX locales) - Localized MMedia
  ```

### Build Testing

```bash
# Test production build
pnpm build

# Check for build errors
# Verify no duplicate routes
# Confirm static generation works
```

---

## Performance Benchmarks

### Expected Build Times

| Scenario | Traditional | With ISR |
|----------|------------|----------|
| Initial build (200 pages × 19 locales) | 20-30 min | 20-30 min |
| Single page update (1 locale) | 20-30 min | 2-5 sec |
| Single page update (all locales) | 20-30 min | 5-10 sec |
| 5 pages updated across collections | 20-30 min | 10-20 sec |
| 20 pages updated (mixed collections) | 20-30 min | 30-60 sec |
| No changes | 20-30 min | 0 sec |

**Assumptions:**
- ~50 pages in Pages collection
- ~30 pages in Grants collection
- ~50 pages in Blog collection
- ~40 pages in Reports collection
- ~30 pages in MMedia collection
- Total: ~200 pages × 19 locales = 3,800 static pages

### Expected Cache Performance

- **Cache Hit Rate:** >95% for static pages across all collections
- **First Load:** ~500ms (pre-generated HTML)
- **Subsequent Loads:** ~50ms (CDN cached)
- **After Revalidation:** ~500ms (first request regenerates)
- **Cross-Collection Navigation:** <100ms (all cached)

---

## File Summary

### Files to Create (9)

1. **`src/app/(frontend)/[locale]/page.tsx`**
   - New locale-prefixed route handler for homepage
   
2. **`src/app/(frontend)/[locale]/[slug]/page.tsx`**
   - New locale-prefixed route handler for pages collection
   
3. **`src/app/(frontend)/[locale]/grants/[slug]/page.tsx`**
   - New locale-prefixed route handler for grants collection

4. **`src/app/(frontend)/[locale]/blog/[slug]/page.tsx`**
   - New locale-prefixed route handler for blog collection

5. **`src/app/(frontend)/[locale]/reports/[slug]/page.tsx`**
   - New locale-prefixed route handler for reports collection

6. **`src/app/(frontend)/[locale]/mmedia/[slug]/page.tsx`**
   - New locale-prefixed route handler for mmedia collection
   
7. **`src/utilities/localeUtils.ts`**
   - Locale validation and URL manipulation utilities

8. **`src/utilities/revalidateCollection.ts`**
   - Reusable revalidation hook factory for all collections and homepage

9. **`src/globals/Homepage/hooks/revalidateHomepage.ts`**
   - Homepage revalidation hook

### Files to Modify (23+)

**Homepage Components (3):**

10. **`src/globals/Homepage/Component.tsx`**
    - Add `locale` prop and fetch homepage global with locale

11. **`src/globals/Homepage/Component.client.tsx`**
    - Accept homepage data as prop

12. **`src/app/(frontend)/page.tsx`**
    - Add ISR configuration for English homepage

**Collection Page Components (5):**

13. **`src/app/(frontend)/components/UAFPage/UAFPage.tsx`**
    - Add `locale` prop for pages collection

14. **`src/app/(frontend)/components/GrantPage/GrantPage.tsx`**
    - Add `locale` prop for grants collection

15. **`src/app/(frontend)/components/BlogPage/BlogPage.tsx`**
    - Add `locale` prop for blog collection

16. **`src/app/(frontend)/components/ReportPage/ReportPage.tsx`**
    - Add `locale` prop for reports collection

17. **`src/app/(frontend)/components/MMediaPage/MMediaPage.tsx`**
    - Add `locale` prop for mmedia collection

**Existing Route Handlers - Add ISR Config (5):**

18. **`src/app/(frontend)/[slug]/page.tsx`**
    - Add ISR configuration for pages

19. **`src/app/(frontend)/grants/[slug]/page.tsx`**
    - Add ISR configuration for grants

20. **`src/app/(frontend)/blog/[slug]/page.tsx`**
    - Add ISR configuration for blog

21. **`src/app/(frontend)/reports/[slug]/page.tsx`**
    - Add ISR configuration for reports

22. **`src/app/(frontend)/mmedia/[slug]/page.tsx`**
    - Add ISR configuration for mmedia

**Revalidation Hooks (5):**

23. **`src/collections/Pages/hooks/revalidatePage.ts`**
    - Use reusable revalidation utility

24. **`src/collections/Grants/hooks/revalidateGrant.ts`**
    - Use reusable revalidation utility

25. **`src/collections/Blog/hooks/revalidateBlog.ts`**
    - Use reusable revalidation utility

26. **`src/collections/Reports/hooks/revalidateReport.ts`**
    - Use reusable revalidation utility

27. **`src/collections/MMedia/hooks/revalidateMMedia.ts`**
    - Use reusable revalidation utility

**Global Configuration (1):**

28. **`src/globals/Homepage/config.ts`**
    - Register homepage revalidation hook

**Utilities & Navigation (3):**

29. **`src/utilities/generatePreviewPath.ts`**
    - Add locale prefix logic for non-English

30. **`src/components/CMSLink/index.tsx`**
    - Update internal link generation to use locale for all collections

31. **`src/app/(frontend)/sitemap.ts`**
    - Add localized URLs for homepage and all collections

32. **`src/globals/Header/Component.client.tsx`**
    - Update language selector to navigate to localized URLs

### Optional Files (for monitoring)

33. **`src/utilities/revalidationLogger.ts`** (Optional)
    - Track ISR performance and failures across all collections and homepage

---

## ISR (Incremental Static Regeneration) Strategy

### How ISR Works in This Implementation

Your project already uses ISR through Payload's revalidation hooks. Here's how it will work with locale-based routing:

#### 1. **On-Demand Revalidation (Preferred)**
When an editor saves a grant page in Payload admin:

```
Editor saves grant "Emergency Grant" → 
  Payload hook triggers → 
    Checks which locales changed → 
      Revalidates ONLY changed paths:
        - /grants/emergency-grant (if English changed)
        - /hi/grants/emergency-grant (if Hindi changed)
        - /th/grants/emergency-grant (if Thai changed)
```

**Benefits:**
- ✅ Only rebuilds pages that actually changed
- ✅ All other pages remain cached
- ✅ No full site rebuild needed
- ✅ Fast updates (seconds, not minutes)

#### 2. **Time-Based Revalidation (Fallback)**
As a safety net, pages auto-revalidate after 60 seconds:

```typescript
export const revalidate = 60 // seconds
```

This means:
- If a page hasn't been updated in 60+ seconds, Next.js will regenerate it on the next request
- Ensures stale content doesn't persist if on-demand revalidation fails
- You can adjust this value: `3600` for 1 hour, `false` for on-demand only

#### 3. **Build-Time Static Generation**
During initial build (`pnpm build`):

```typescript
export async function generateStaticParams() {
  // Generate all published grants across all locales
  // This creates static HTML for every grant in every language
}
```

**What gets built:**
- `/grants/emergency-grant` → English HTML
- `/grants/rapid-response-grant` → English HTML
- `/hi/grants/emergency-grant` → Hindi HTML
- `/hi/grants/rapid-response-grant` → Hindi HTML
- ... for all 19+ languages

**Benefits:**
- ✅ All pages pre-rendered and cached
- ✅ Instant page loads
- ✅ CDN-friendly
- ✅ SEO-optimized

### ISR vs Full Rebuild Comparison

| Action | Traditional Build | ISR (This Implementation) |
|--------|------------------|---------------------------|
| Editor updates 1 grant (English only) | Rebuild entire site (~10 min) | Revalidate 1 path (~2 sec) |
| Editor updates 1 grant (all locales) | Rebuild entire site (~10 min) | Revalidate 19 paths (~5 sec) |
| Editor updates 5 grants | Rebuild entire site (~10 min) | Revalidate 5-95 paths (~10 sec) |
| No changes | Still rebuilds (~10 min) | No rebuild needed (0 sec) |

### Performance Optimizations

#### Smart Locale Detection
Only revalidate locales that actually have content changes:

```typescript
// Check each locale individually
for (const locale of VALID_LOCALES) {
  if (contentChangedForLocale(doc, previousDoc, locale)) {
    revalidatePath(`/${locale}/grants/${doc.slug}`)
  }
}
```

#### Batch Revalidation
If multiple grants are updated at once, revalidation happens in parallel:

```typescript
await Promise.all(
  changedGrants.map(grant => revalidateGrant(grant))
)
```

#### Cache Tags
Use collection-level tags for broader invalidation:

```typescript
revalidateTag('grants') // Invalidates all grants-related caches
revalidateTag('global_navigation') // Invalidates navigation
```

### Monitoring ISR Performance

Track revalidation performance with the optional logger:

```typescript
// Example log output:
[ISR Revalidation] grants/emergency-grant - en, hi, th - 1,234ms - SUCCESS
[ISR Revalidation] grants/rapid-response - en - 567ms - SUCCESS
[ISR Revalidation] grants/safety-grant - en, hi, th, ar - 2,145ms - SUCCESS
```

### ISR Configuration Options

#### Option 1: Aggressive Caching (Recommended for UAFANP)
```typescript
export const revalidate = 3600 // 1 hour
export const dynamic = 'force-static'
export const dynamicParams = true
```

**Best for:**
- Content that doesn't change frequently
- Defenders with limited connectivity (faster loads)
- Reducing server load

#### Option 2: Balanced (Default)
```typescript
export const revalidate = 60 // 1 minute
export const dynamic = 'force-static'
export const dynamicParams = true
```

**Best for:**
- Grant deadlines that might update
- Time-sensitive announcements
- Balance between freshness and performance

#### Option 3: On-Demand Only
```typescript
export const revalidate = false // No time-based revalidation
export const dynamic = 'force-static'
export const dynamicParams = true
```

**Best for:**
- Complete control over cache invalidation
- Only revalidate when content actually changes
- Maximum performance

**Recommendation:** Start with Option 2 (60 seconds) and adjust based on monitoring.

---

## Rollout Strategy

### Phase 1: Development (Week 1)
1. Create locale route structure
2. Update utilities and components
3. Local testing with 2-3 locales

### Phase 2: Staging (Week 1)
4. Deploy to staging environment
5. Full locale testing (all 19+ languages)
6. QA review and bug fixes

### Phase 3: Production (Week 2)
7. Deploy to production
8. Monitor analytics for 404s
9. Set up redirects if needed

---

## Alternative: Middleware-Based Approach

If you later need more sophisticated locale handling, consider adding Next.js middleware:

**File: `middleware.ts`**

```typescript
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { VALID_LOCALES, DEFAULT_LOCALE } from '@/utilities/localeUtils'

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname
  
  // Check if pathname already has a valid locale
  const pathnameHasLocale = VALID_LOCALES.some(
    locale => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  )
  
  if (pathnameHasLocale) {
    return NextResponse.next()
  }
  
  // Detect locale from Accept-Language header
  const locale = request.headers
    .get('accept-language')
    ?.split(',')[0]
    ?.split('-')[0] || DEFAULT_LOCALE
  
  // Don't add locale prefix for English
  if (locale === DEFAULT_LOCALE) {
    return NextResponse.next()
  }
  
  // Redirect to locale-prefixed URL if locale is not English
  if (VALID_LOCALES.includes(locale)) {
    const url = request.nextUrl.clone()
    url.pathname = `/${locale}${pathname}`
    return NextResponse.redirect(url)
  }
  
  return NextResponse.next()
}

export const config = {
  matcher: [
    // Match all pathnames except those starting with:
    // - api (API routes)
    // - _next/static (static files)
    // - _next/image (image optimization files)
    // - favicon.ico (favicon file)
    // - admin (Payload admin)
    '/((?!api|_next/static|_next/image|favicon.ico|admin).*)',
  ],
}
```

---

## Notes

- This implementation maintains backward compatibility with existing English URLs
- Locale detection is manual (user-selected) rather than automatic (browser-based)
- All 19+ languages from `languageOptions.json` are supported
- RTL languages (Arabic, Urdu, etc.) will need CSS direction handling (already implemented)
- Consider adding `<link rel="alternate" hreflang="...">` tags for SEO

---

## References

- [Next.js i18n Routing](https://nextjs.org/docs/app/building-your-application/routing/internationalization)
- [Payload Localization](https://payloadcms.com/docs/configuration/localization)
- Current language config: `src/globals/Header/languageOptions.json`
