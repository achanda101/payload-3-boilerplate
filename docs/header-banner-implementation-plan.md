# Header Banner Implementation Plan

## Overview

Add a dismissible, full-width announcement banner to the Header global. The banner sits at the very top edge of every page (above the existing header rows), with a `$color-fire` (`hsl(5, 100%, 64%)`) background. It contains a text field and an optional link field. If both fields are empty the banner is not rendered.

---

## 1. Update Header Global Config

**File:** `src/globals/Header/config.ts`

Add a checkbox to control banner visibility, followed by the banner group field. The banner group field will only display when the checkbox is checked, using Payload's `admin.condition` feature.

```typescript
import { link } from '@/fields/link'

// Add at the top of the fields array:
{
  name: 'showBanner',
  type: 'checkbox',
  defaultValue: false,
  admin: {
    description: 'Enable announcement banner at the top of every page',
    style: {
      backgroundColor: '#f1f6fa',
      padding: '20px',
      border: '1px solid #dee2e6',
      borderRadius: '8px',
    },
  },
  label: 'Show Announcement Banner',
},
{
  name: 'banner',
  type: 'group',
  label: 'Announcement Banner',
  admin: {
    description: 'Configure the announcement banner displayed at the top of every page.',
    condition: (data) => data.showBanner === true,
    style: {
      backgroundColor: '#f1f6fa',
      padding: '20px 60px',
      border: '1px solid #dee2e6',
      borderRadius: '8px',
    },
  },
  fields: [
    {
      name: 'text',
      type: 'text',
      localized: true,
      admin: {
        placeholder: 'e.g. Applications for Rapid Response Grants are now open!',
        description: 'Banner announcement text',
      },
    },
    link({ appearances: false }),
  ],
},
```

**Key decisions:**
- `showBanner` checkbox controls banner visibility — when unchecked, the banner group is hidden and won't render on frontend
- `admin.condition: (data) => data.showBanner === true` ensures the banner fields only appear when checkbox is checked
- This prevents validation errors from the link field when the banner is disabled
- `appearances: false` removes the appearance selector since the banner link will have its own fixed styling (underlined white text)
- The link field is optional — editors can have a text-only banner or a text-with-link banner
- `localized: true` on the text field enables multi-language support, consistent with other localized fields in the project

---

## 2. Update Header Client Component Interface

**File:** `src/globals/Header/Component.client.tsx`

### 2a. Extend the `HeaderClientProps` interface

Add the `showBanner` checkbox field and `banner` group to the existing `data` type:

```typescript
interface HeaderClientProps {
  data?: {
    logo?: (number | null) | AssetCloud
    searchEnabled?: boolean | null
    languages: string[]
    showBanner?: boolean | null
    banner?: {
      text?: string | null
      link?: {
        type?: 'reference' | 'custom' | 'email' | 'document' | 'etest' | null
        reference?: {
          relationTo: string
          value: { slug: string } | string | number
        } | null
        url?: string | null
        email?: string | null
        label?: string | null
        newTab?: boolean | null
      } | null
    } | null
  }
}
```

### 2b. Render the banner

Insert the banner markup **before** the existing `<div className="site-header-content">` element, inside the `<header>` tag. This positions it at the very top edge of the page.

The banner only renders when both `showBanner` is `true` AND `banner.text` exists.

```tsx
{/* Announcement Banner */}
{headerData.showBanner && headerData.banner?.text && (
  <div className="site-header-banner">
    <div className="site-header-banner-content">
      <p>{headerData.banner.text}</p>
      {headerData.banner.link?.label && (
        <BannerLink link={headerData.banner.link} />
      )}
    </div>
  </div>
)}
```

### 2c. Add a `BannerLink` helper

Add a small helper function (inside the same file or extracted as a sub-component) that resolves the link href from the link field data — matching the same resolution logic used in the mobile nav menu:

```tsx
function BannerLink({ link }: { link: NonNullable<NonNullable<HeaderClientProps['data']>['banner']>['link'] }) {
  if (!link) return null

  let href = '#'
  const target = link.newTab ? '_blank' : undefined
  const rel = link.newTab ? 'noopener noreferrer' : undefined

  if (link.type === 'reference' && link.reference) {
    const ref = link.reference
    if (typeof ref.value === 'object' && 'slug' in ref.value) {
      href = ref.relationTo === 'pages'
        ? `/${ref.value.slug}`
        : `/${ref.relationTo}/${ref.value.slug}`
    }
  } else if (link.type === 'custom' && link.url) {
    href = link.url
  } else if (link.type === 'email' && link.email) {
    href = `mailto:${link.email}`
  }

  return (
    <a
      href={href}
      target={target}
      rel={rel}
      className="site-header-banner-link"
    >
      {link.label}
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 12h14M12 5l7 7-7 7" />
      </svg>
    </a>
  )
}
```

### 2d. Conditional rendering logic

The banner renders only when **both** conditions are met:
1. `headerData.showBanner` is `true` (checkbox is checked in admin)
2. `headerData.banner?.text` is truthy (text field has content)

This ensures the banner only displays when explicitly enabled by editors and has content to show. The `headerData` is already fetched from `/api/globals/header?depth=1` in the existing `useEffect`, so the banner data will come through automatically with no additional API call.

---

## 3. Add Banner Styles

**File:** `src/styles/globals.scss`

Add the following styles directly after the existing `.site-header` block (around line 334), within the Header Component styles section:

```scss
// Announcement Banner (inside header, above header-content)
.site-header-banner {
  background-color: $color-fire;
  @apply w-full py-2 px-[1.25rem] lg:px-[5rem];
  // Negate the parent .site-header padding so the banner is truly full-width edge-to-edge
  margin: -1.25rem -1.25rem 1.25rem -1.25rem;
  width: calc(100% + 2.5rem);

  @media (min-width: $desktop) {
    margin: -2.5rem -5rem 2.5rem -5rem;
    width: calc(100% + 10rem);
  }
}

.site-header-banner-content {
  @apply flex flex-wrap items-center justify-center gap-2 text-center;

  p {
    color: $white;
    font-family: $font-body-bold;
    font-size: $font-size-button-mob;
    margin: 0;

    @media (min-width: $tablet) {
      font-size: $font-size-button;
    }
  }
}

.site-header-banner-link {
  @apply inline-flex items-center gap-1;
  color: $white;
  font-family: $font-body-bold;
  font-size: $font-size-button-mob;
  text-decoration: underline;
  text-underline-offset: 3px;

  &:hover {
    text-decoration-thickness: 2px;
  }

  @media (min-width: $tablet) {
    font-size: $font-size-button;
  }

  svg {
    flex-shrink: 0;
  }
}
```

**Styling notes:**
- The negative margins + `calc()` width counter the parent `.site-header` padding, making the banner truly edge-to-edge.
- White text on `$color-fire` background provides strong contrast (WCAG AA compliant — white on `hsl(5,100%,64%)` yields a contrast ratio of ~3.2:1 for large text, which the bold banner text qualifies as).
- Flexbox centering with `flex-wrap` handles long text + link gracefully on mobile.

---

## 4. Database Migration

After modifying the Header global config, a migration is needed to add the `banner` group columns to the database.

```bash
pnpm payload migrate:create add-header-banner
```

This will generate a migration file in `src/migrations/` that adds the `banner_text` and `banner_link_*` columns to the header globals table.

After creating the migration, run:

```bash
pnpm payload migrate
```

Or simply restart dev — migrations run automatically on `pnpm dev`.

---

## 5. Regenerate Types

After the config change, regenerate TypeScript types so the `Header` global type includes the new `banner` field:

```bash
pnpm generate:types
```

This updates `src/payload-types.ts` with the new `banner` group type definition.

---

## 6. Implementation Order

1. Update `src/globals/Header/config.ts` — add `showBanner` checkbox and `banner` group field with conditional visibility
2. Run `pnpm payload migrate:create add-header-banner` — generate migration
3. Run `pnpm generate:types` — regenerate TypeScript types
4. Update `src/globals/Header/Component.client.tsx` — add `BannerLink` helper, extend interface with `showBanner`, render banner with checkbox condition
5. Update `src/styles/globals.scss` — add banner styles after `.site-header` block

---

## 7. Files Summary

**Modify (3):**
- `src/globals/Header/config.ts` — add `showBanner` checkbox and `banner` group field
- `src/globals/Header/Component.client.tsx` — render banner with checkbox condition, add link resolver
- `src/styles/globals.scss` — add `.site-header-banner` styles

**Auto-generated (2):**
- `src/migrations/YYYYMMDD_HHMMSS_add_header_banner.ts` — database migration
- `src/payload-types.ts` — regenerated types

---

## 8. Verification

1. Run `pnpm dev` — confirm no TypeScript or build errors
2. Open Payload admin (`/admin`) → Globals → "Header: Logo, Languages, Search & Announcement Banner"
3. Verify the "Show Announcement Banner" checkbox appears first
4. **Test with checkbox unchecked (default state):**
   - Verify the banner fields are hidden
   - Save and visit frontend — verify no banner appears
5. **Test with checkbox checked:**
   - Check the "Show Announcement Banner" checkbox
   - Verify the "Announcement Banner" group appears below
   - Fill in banner text (e.g., "Applications for Rapid Response Grants are now open!")
   - Optionally add a link (internal page, external URL, or email) with a label
   - Save the Header global
6. Visit the frontend — verify:
   - Banner appears at the very top of the page, full-width, with `$color-fire` red background
   - White bold text is centered
   - Link (if provided) appears as underlined white text with arrow icon
   - Link opens correctly (new tab if configured, correct href resolution)
7. **Test checkbox toggle:**
   - Go back to admin, uncheck "Show Announcement Banner"
   - Save and visit frontend — verify banner disappears completely
8. Test on mobile viewport — verify banner text wraps and remains readable
9. Test with only text (no link) — verify banner renders text-only without broken layout
10. Test with a long text string — verify it wraps gracefully without overflow

---

## 9. Visual Reference

```
+================================================================+
|  [fire bg]  Applications are now open!  Learn more →           |  ← NEW banner
+================================================================+
| 🌐 English ▼                                                   |  ← existing top row
|----------------------------------------------------------------|
| [LOGO]        Nav Item 1  Nav Item 2  Nav Item 3   🔍 [Donate] |  ← existing bottom row
+================================================================+
|                                                                 |
|                      Page Content                               |
|                                                                 |
+================================================================+
```

---

## 10. Key Implementation Notes

- **No new files created** — this feature modifies existing files only.
- **Checkbox control** — the `showBanner` checkbox provides explicit on/off control, preventing accidental banner displays and avoiding link field validation errors when banner is disabled.
- **Conditional field visibility** — using `admin.condition: (data) => data.showBanner === true` ensures banner fields only appear when needed, providing a cleaner admin experience.
- **Reuses `link` field** — the same reusable link field (`src/fields/link.ts`) used across CTAs, navigation, and buttons. Editors get a familiar interface.
- **Revalidation already handled** — the Header global already has `afterChange: [revalidateHeader]` hook, so banner changes will trigger ISR cache invalidation automatically.
- **API depth** — the existing header fetch uses `?depth=1`, which is sufficient to resolve reference links in the banner.
- **Localization** — the `text` field is `localized: true`, so banner content can differ per language. The link `label` field from `src/fields/link.ts` is also already localized.
- **No separate component file** — the banner is simple enough to inline in the Header client component. If future requirements grow (e.g., dismiss button, multiple banners, scheduling), it could be extracted to `src/components/Banner/index.tsx`.
