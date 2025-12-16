# URL Validation System

This document explains how invalid URLs (like `/undefined/undefined`) are prevented in the application.

## Problem

When link buttons have incomplete or invalid reference data (missing `relationTo` or `slug`), the application was generating invalid URLs like:
- `/undefined/undefined`
- `/undefined`
- `/posts/undefined`

This resulted in broken links and poor user experience.

## Solution

We've implemented a **multi-layered validation system** to prevent invalid URLs:

### 1. **Backend Validation (Payload CMS)**

**File:** `src/fields/link.ts`

The link field configuration now includes validation rules that prevent saving incomplete link data:

```typescript
{
  name: 'reference',
  type: 'relationship',
  required: true,
  validate: (value: unknown, { siblingData }: any) => {
    if (siblingData?.type === 'reference') {
      if (!value) {
        return 'Please select a page to link to'
      }
    }
    return true
  },
}
```

**Benefits:**
- Prevents content editors from saving incomplete links
- Shows clear error messages in the admin panel
- Applies to all link types: `reference`, `document`, and `etest`

### 2. **URL Generation Utility**

**File:** `src/utilities/getValidUrl.ts`

A centralized utility function that safely constructs URLs with comprehensive validation:

```typescript
export function getValidUrl(button: LinkButton): string {
  // Validates all required fields exist and are non-empty
  // Returns '#' as a safe fallback for invalid data
  // Includes console warnings for debugging
}
```

**Features:**
- Type-safe URL construction
- Validation for all link types (reference, email, document, custom, etest)
- Console warnings when invalid data is detected
- Safe fallback to `#` instead of invalid URLs
- Helper function `isValidLink()` for conditional rendering

**Usage:**
```typescript
import { getValidUrl, isValidLink } from '@/utilities/getValidUrl'

// Generate URL
const url = getValidUrl(buttonData)

// Check if link is valid before rendering
if (isValidLink(buttonData)) {
  // Render link
}
```

### 3. **Component Integration**

The following components now use the centralized validation utility:

#### UAFButton Component
**File:** `src/components/UAFButton/index.tsx`

```typescript
import { getValidUrl } from '@/utilities/getValidUrl'

const getHref = () => {
  return getValidUrl(button as any)
}
```

#### ButtonArray Component
**File:** `src/components/ButtonArray/index.tsx`

```typescript
import { getValidUrl } from '@/utilities/getValidUrl'

const getHref = () => {
  if (!button.link) return '#'
  return getValidUrl(button.link as any)
}
```

### 4. **404 Page Enhancement**

**File:** `src/app/(frontend)/not-found.tsx`

Enhanced 404 page with:
- Clear messaging
- Consistent design with the site
- SEO metadata
- Proper button styles

**File:** `src/app/(frontend)/[slug]/page.tsx`

Dynamic routes now properly trigger the 404 page using Next.js's `notFound()` function:

```typescript
import { notFound } from 'next/navigation'

if (!page) {
  notFound()
}
```

## How It Works

### Data Flow

```
Content Editor → Payload CMS Validation → Database
                      ↓
                (Prevents invalid data)
                      ↓
              Frontend Components
                      ↓
              getValidUrl() utility
                      ↓
              Valid URL or '#'
```

### Example Scenarios

#### ✅ Valid Reference Link
```typescript
{
  type: 'reference',
  reference: {
    relationTo: 'posts',
    value: { slug: 'my-blog-post' }
  }
}
// Result: /posts/my-blog-post
```

#### ❌ Invalid Reference Link (Missing Slug)
```typescript
{
  type: 'reference',
  reference: {
    relationTo: 'posts',
    value: { slug: undefined }
  }
}
// Result: # (with console warning)
```

#### ✅ Valid Custom URL
```typescript
{
  type: 'custom',
  url: 'https://example.com'
}
// Result: https://example.com
```

#### ❌ Invalid Custom URL (Empty)
```typescript
{
  type: 'custom',
  url: ''
}
// Result: # (with console warning)
```

## Best Practices

### For Developers

1. **Always use `getValidUrl()`** when constructing URLs from link data
2. **Check console warnings** during development - they indicate data issues
3. **Use `isValidLink()`** for conditional rendering of links
4. **Never construct URLs manually** from `relationTo` and `slug` values

### For Content Editors

1. **Complete all required fields** when adding links
2. **Test links** before publishing
3. **Pay attention to validation errors** in the admin panel
4. **Select the correct link type** for your use case

## Troubleshooting

### Links showing as `#`

**Check:**
1. Console for warning messages indicating what data is missing
2. Payload CMS admin to ensure the referenced content exists
3. That the correct link type is selected
4. That all required fields are filled

### Validation errors in admin

**Solutions:**
1. Ensure you've selected a page/document/test when using reference type
2. Enter a valid URL when using custom type
3. Enter a valid email when using email type
4. Don't leave required fields empty

### Migration from old links

If you have existing content with invalid links:

1. Check console warnings to identify problematic links
2. Update the content in Payload CMS admin
3. Ensure all links have required data
4. Re-publish the content

## Related Files

- `src/utilities/getValidUrl.ts` - URL validation utility
- `src/fields/link.ts` - Link field configuration with validation
- `src/components/UAFButton/index.tsx` - Button component
- `src/components/ButtonArray/index.tsx` - Button array component
- `src/app/(frontend)/not-found.tsx` - 404 page
- `src/app/(frontend)/[slug]/page.tsx` - Dynamic route handler

## Testing

To test URL validation:

1. **In development:**
   - Open browser console
   - Look for warning messages about invalid links
   - They'll show which fields are missing

2. **In Payload CMS:**
   - Try to save a link without selecting a reference
   - Should see validation error
   - Cannot save until fixed

3. **In production:**
   - Invalid links will safely render as `#`
   - No broken `/undefined/undefined` URLs
   - 404 page shows for truly non-existent pages
