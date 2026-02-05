# BlurHash Implementation Plan

## Overview
Implement progressive image loading with blur placeholders using the `plaiceholder` library. This feature will automatically generate base64-encoded blur placeholders during media upload in PayloadCMS and display them during image loading in Next.js, providing a smoother user experience and perceived performance improvement.

**Target Collections:**
- `mediaCloud` - Primary image collection
- `assetCloud` - Design assets (logos, mascots, icons, brand illustrations)

**Reference:** Implementation based on [GitHub Gist by notflip](https://gist.github.com/notflip/e33c0b45299674ce56d80f1c6d08bd09)

---

## 1. Install Dependencies

**Command:**
```bash
pnpm add plaiceholder
```

**Note:** `sharp` is already installed (v0.33.5 - confirmed in package.json:61) and is a peer dependency of plaiceholder.

---

## 2. Create Shared BlurHash Generation Hook

**File:** `src/hooks/generateBlurHash.ts`

```typescript
import type { CollectionBeforeValidateHook } from 'payload'
import { getPlaiceholder } from 'plaiceholder'

/**
 * Shared hook to automatically generate blurhash placeholder for uploaded images
 * Can be used with any upload collection (MediaCloud, AssetCloud, etc.)
 * Runs on media create/update operations
 */
export const generateBlurHash: CollectionBeforeValidateHook = async ({
  data,
  operation,
  req,
}) => {
  // Only process on create or update operations
  if (operation === 'create' || operation === 'update') {
    const buffer = req?.file?.data

    if (buffer) {
      try {
        // Generate 32px base64 placeholder
        const { base64 } = await getPlaiceholder(buffer, { size: 32 })

        return {
          ...data,
          blurhash: base64,
        }
      } catch (error) {
        console.error('Failed to generate blurhash:', error)
        // Return data without blurhash on failure
        return data
      }
    }
  }

  return data
}
```

**How it works:**
- Shared hook reusable across multiple upload collections
- Intercepts image upload before validation
- Extracts buffer data from the file upload request
- Uses plaiceholder to generate a tiny 32px blur placeholder
- Returns base64-encoded data URL
- Gracefully handles errors without blocking upload

**Note:** Placed in `src/hooks/` (shared location) instead of collection-specific directory since it's used by multiple collections.

---

## 3. Update Image Upload Collections

### 3A. Update MediaCloud Collection

**File:** `src/collections/MediaCloud.ts`

**Add import:**
```typescript
import { generateBlurHash } from '../hooks/generateBlurHash'
```

**Add field to fields array (after caption field, around line 43):**
```typescript
{
  name: 'blurhash',
  type: 'text',
  admin: {
    hidden: true, // Hide from admin UI - auto-populated by hook
    readOnly: true,
  },
},
```

**Add hooks configuration (after access section, before fields):**
```typescript
hooks: {
  beforeValidate: [generateBlurHash],
},
```

**Full context of changes:**
```typescript
import { generateBlurHash } from '../hooks/generateBlurHash'  // ADD IMPORT

export const MediaCloud: CollectionConfig = {
  slug: 'mediaCloud',
  labels: {
    singular: 'Image',
    plural: 'Images',
  },
  admin: {
    group: {
      name: 'Media',
      order: '1',
    },
    defaultColumns: ['filename', 'alt', 'folder'],
  },
  folders: true,
  trash: true,
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  hooks: {
    beforeValidate: [generateBlurHash], // ADD THIS
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
    },
    {
      name: 'caption',
      type: 'text',
      localized: true,
    },
    {
      name: 'blurhash', // ADD THIS FIELD
      type: 'text',
      admin: {
        hidden: true,
        readOnly: true,
      },
    },
  ],
  upload: {
    // ... rest of upload config
  },
}
```

---

### 3B. Update AssetCloud Collection

**File:** `src/collections/AssetCloud.ts`

**Add import:**
```typescript
import { generateBlurHash } from '../hooks/generateBlurHash'
```

**Add field to fields array (after caption field, around line 43):**
```typescript
{
  name: 'blurhash',
  type: 'text',
  admin: {
    hidden: true,
    readOnly: true,
  },
},
```

**Add hooks configuration (after access section, before fields):**
```typescript
hooks: {
  beforeValidate: [generateBlurHash],
},
```

**Full context of changes:**
```typescript
import { generateBlurHash } from '../hooks/generateBlurHash'  // ADD IMPORT

export const AssetCloud: CollectionConfig = {
  slug: 'assetCloud',
  labels: {
    singular: 'Design Asset',
    plural: 'Design Assets',
  },
  admin: {
    group: {
      name: 'Media',
      order: '2',
    },
    description: 'Upload and manage design assets like logos, mascots, icons, brand illustrations here.',
  },
  folders: true,
  trash: true,
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  hooks: {
    beforeValidate: [generateBlurHash], // ADD THIS
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
    },
    {
      name: 'caption',
      type: 'text',
      localized: true,
    },
    {
      name: 'blurhash', // ADD THIS FIELD
      type: 'text',
      admin: {
        hidden: true,
        readOnly: true,
      },
    },
  ],
  upload: {
    // ... rest of upload config
  },
}
```

---

## 4. Create Hooks Directory Structure

**Create directory:**
```bash
mkdir -p src/hooks
```

**Files to create:**
1. `src/hooks/generateBlurHash.ts` (see section 2)

---

## 5. Create OptimizedImage Component

**File:** `src/components/OptimizedImage/index.tsx`

```typescript
import React from 'react'
import Image from 'next/image'
import type { MediaCloud, AssetCloud } from '@/payload-types'

interface OptimizedImageProps {
  media: MediaCloud | AssetCloud | string
  alt?: string
  fill?: boolean
  width?: number
  height?: number
  className?: string
  priority?: boolean
  sizes?: string
  style?: React.CSSProperties
}

/**
 * Optimized Image component with blurhash placeholder support
 * Supports MediaCloud, AssetCloud, and string URLs
 * Wraps Next.js Image with automatic blur placeholder from upload collections
 */
export const OptimizedImage: React.FC<OptimizedImageProps> = ({
  media,
  alt,
  fill = false,
  width,
  height,
  className,
  priority = false,
  sizes,
  style,
}) => {
  // Handle string URLs (legacy or external images)
  if (typeof media === 'string') {
    return (
      <Image
        src={media}
        alt={alt || ''}
        fill={fill}
        width={!fill ? width : undefined}
        height={!fill ? height : undefined}
        className={className}
        priority={priority}
        sizes={sizes}
        style={style}
      />
    )
  }

  // Extract data from MediaCloud/AssetCloud object
  const imageUrl = media.url
  const imageAlt = alt || media.alt || ''
  const blurhash = media.blurhash
  const focalX = media.focalX ?? 50
  const focalY = media.focalY ?? 50

  // Calculate object position from focal point
  const objectPosition = `${focalX}% ${focalY}%`

  // Determine if we should use blurhash placeholder
  const hasBlur = Boolean(blurhash)

  // For fill mode, merge objectPosition into style
  const fillStyle = fill
    ? {
        objectFit: 'cover' as const,
        objectPosition,
        ...style,
      }
    : style

  return (
    <Image
      src={imageUrl || ''}
      alt={imageAlt}
      fill={fill}
      width={!fill ? (width || media.width || undefined) : undefined}
      height={!fill ? (height || media.height || undefined) : undefined}
      className={className}
      priority={priority}
      sizes={sizes}
      placeholder={hasBlur ? 'blur' : 'empty'}
      blurDataURL={blurhash || undefined}
      style={fillStyle}
    />
  )
}

export default OptimizedImage
```

**Key features:**
- Accepts MediaCloud, AssetCloud objects, and string URLs (backwards compatibility)
- Automatically applies blurhash placeholder when available
- Respects focal point positioning (focalX/focalY)
- Supports both `fill` and fixed dimension modes
- Gracefully degrades if blurhash missing
- Type-safe with PayloadCMS types
- Works seamlessly with both image collections

---

## 6. Update Payload Types

After updating the MediaCloud collection, regenerate TypeScript types:

```bash
pnpm generate:types
```

This will update `src/payload-types.ts` to include the `blurhash` field on the MediaCloud type.

---

## 7. Migration for Existing Images

**Note:** Existing images in the database will not have blurhash values. You have two options:

### Option A: Regenerate on Next Upload (Recommended)
- No migration needed
- Blurhash will be generated when images are updated
- Simpler and safer approach

### Option B: Batch Regeneration Script (Optional)
If you need to generate blurhashes for all existing images immediately:

**File:** `src/scripts/generateBlurhashesForExistingImages.ts`

```typescript
import payload from 'payload'
import { getPlaiceholder } from 'plaiceholder'
import fs from 'fs/promises'
import path from 'path'

async function processCollection(collectionSlug: 'mediaCloud' | 'assetCloud') {
  const images = await payload.find({
    collection: collectionSlug,
    limit: 1000,
    where: {
      blurhash: {
        exists: false,
      },
    },
  })

  console.log(`\nProcessing ${collectionSlug}: Found ${images.docs.length} images without blurhash`)

  for (const image of images.docs) {
    try {
      if (!image.filename) continue

      // Read image file
      const imagePath = path.join(process.cwd(), 'media', image.filename)
      const buffer = await fs.readFile(imagePath)

      // Generate blurhash
      const { base64 } = await getPlaiceholder(buffer, { size: 32 })

      // Update document
      await payload.update({
        collection: collectionSlug,
        id: image.id,
        data: {
          blurhash: base64,
        },
      })

      console.log(`✓ [${collectionSlug}] Generated blurhash for ${image.filename}`)
    } catch (error) {
      console.error(`✗ [${collectionSlug}] Failed for ${image.filename}:`, error)
    }
  }
}

async function generateBlurhashesForExistingImages() {
  await payload.init({
    secret: process.env.PAYLOAD_SECRET!,
    local: true,
  })

  // Process both collections
  await processCollection('mediaCloud')
  await processCollection('assetCloud')

  console.log('\n✅ All done!')
  process.exit(0)
}

generateBlurhashesForExistingImages()
```

**Run with:**
```bash
tsx src/scripts/generateBlurhashesForExistingImages.ts
```

**Note:** This script assumes local file storage. For S3 storage, you'll need to fetch images from S3 instead.

---

## 8. Update Existing Image Usage

Identify and update components currently using Next.js Image with MediaCloud and AssetCloud images.

### Known Integration Points

Based on codebase analysis:

#### MediaCloud Usage

1. **Blog Pages**
   - `src/app/(frontend)/components/BlogPage/BlogPage.tsx` (line ~505)

2. **Report Pages**
   - `src/app/(frontend)/components/ReportPage/ReportPage.tsx`

3. **MMedia Pages**
   - `src/app/(frontend)/components/MMediaPage/MMediaPage.tsx`

4. **Blocks**
   - `src/blocks/FeatureCard/` (uses mediaCloud relation)
   - `src/blocks/ListingCardDeck/` (uses mediaCloud relation)

5. **Globals**
   - `src/globals/Homepage/` (uses mediaCloud relation)

#### AssetCloud Usage

1. **Blocks**
   - `src/blocks/IDCardGallery/` (design assets)
   - `src/blocks/MinimalCardGallery/` (design assets)
   - `src/blocks/PillarCard/` (icons/logos)
   - `src/blocks/FeatureCardAccordion/` (icons)
   - `src/blocks/YellowCardDeck/` (icons)
   - `src/blocks/HeroBlock/` (brand assets)

2. **Globals**
   - `src/globals/Footer/` (logos, brand assets)
   - `src/globals/Header/` (logos, mascots)

3. **Collections**
   - `src/collections/Grants/` (grant icons/badges)
   - `src/collections/EligibilityTests/` (test icons)

### Example Refactor

**Before:**
```tsx
<Image
  src={heroBlock.coverImage.url}
  alt={heroBlock.coverImage.alt || 'Resource Cover Image'}
  width={heroBlock.coverImage.width || 800}
  height={heroBlock.coverImage.height || 600}
  sizes="(max-width: 640px) 80vw, 33vw"
  className="rounded-3xl overflow-hidden"
  priority
/>
```

**After:**
```tsx
import { OptimizedImage } from '@/components/OptimizedImage'

<OptimizedImage
  media={heroBlock.coverImage}
  sizes="(max-width: 640px) 80vw, 33vw"
  className="rounded-3xl overflow-hidden"
  priority
/>
```

**Benefits:**
- Automatic blurhash placeholder
- Cleaner code (no manual width/height/alt extraction)
- Type-safe
- Consistent image handling across app

---

## 9. Implementation Order

Follow these steps in order:

1. **Install plaiceholder:**
   ```bash
   pnpm add plaiceholder
   ```

2. **Create hooks directory:**
   ```bash
   mkdir -p src/hooks
   ```

3. **Create generateBlurHash hook:**
   - File: `src/hooks/generateBlurHash.ts`

4. **Update MediaCloud collection:**
   - Add import: `import { generateBlurHash } from '../hooks/generateBlurHash'`
   - Add blurhash field to fields array
   - Add hooks configuration

5. **Update AssetCloud collection:**
   - Add import: `import { generateBlurHash } from '../hooks/generateBlurHash'`
   - Add blurhash field to fields array
   - Add hooks configuration

6. **Create OptimizedImage component:**
   - File: `src/components/OptimizedImage/index.tsx`

7. **Regenerate types:**
   ```bash
   pnpm generate:types
   ```

8. **Test with new uploads:**
   - Upload a test image to MediaCloud via admin
   - Upload a test design asset to AssetCloud via admin
   - Verify blurhash is generated in database for both
   - Use OptimizedImage component to render them
   - Confirm blur placeholder shows during load

9. **Update existing components** (incrementally):
   - Start with BlogPage (MediaCloud)
   - Then ReportPage and MMediaPage (MediaCloud)
   - Then Header/Footer (AssetCloud)
   - Finally block components (both collections)

10. **(Optional) Run migration script** for existing images in both collections

---

## 10. Files Summary

### Create (2)
- `src/hooks/generateBlurHash.ts` (shared hook for both collections)
- `src/components/OptimizedImage/index.tsx`

### Modify (2)
- `src/collections/MediaCloud.ts` (add blurhash field + hook)
- `src/collections/AssetCloud.ts` (add blurhash field + hook)

### Update (gradual rollout)

**MediaCloud images:**
- `src/app/(frontend)/components/BlogPage/BlogPage.tsx`
- `src/app/(frontend)/components/ReportPage/ReportPage.tsx`
- `src/app/(frontend)/components/MMediaPage/MMediaPage.tsx`
- Block components: FeatureCard, ListingCardDeck
- Globals: Homepage

**AssetCloud images:**
- Block components: IDCardGallery, MinimalCardGallery, PillarCard, FeatureCardAccordion, YellowCardDeck, HeroBlock
- Globals: Header, Footer
- Collections: Grants, EligibilityTests

### Optional
- `src/scripts/generateBlurhashesForExistingImages.ts` (migration script for both collections)

---

## 11. Testing Checklist

### New Image Upload - MediaCloud
- [ ] Upload new image to MediaCloud via Payload admin
- [ ] Verify `blurhash` field populated in database (check via API or DB query)
- [ ] Render image with OptimizedImage component
- [ ] Confirm blur placeholder visible during initial load (throttle network in DevTools)
- [ ] Verify smooth transition from blur to sharp image

### New Image Upload - AssetCloud
- [ ] Upload new design asset to AssetCloud via Payload admin
- [ ] Verify `blurhash` field populated in database
- [ ] Render asset with OptimizedImage component
- [ ] Confirm blur placeholder works for logos/icons
- [ ] Test with transparent PNGs and SVGs (if applicable)

### Existing Images (without blurhash)
- [ ] Render old MediaCloud image with OptimizedImage
- [ ] Render old AssetCloud image with OptimizedImage
- [ ] Confirm graceful degradation (no blur, but images still load)
- [ ] Re-upload/update image in MediaCloud
- [ ] Re-upload/update asset in AssetCloud
- [ ] Verify blurhash now generated for both

### Focal Point Support
- [ ] Upload image with focal point set in admin
- [ ] Verify focal point positioning respected in rendered image
- [ ] Test with `fill` mode

### Different Image Sizes
- [ ] Test with thumbnail size
- [ ] Test with medium size
- [ ] Test with large/xlarge sizes
- [ ] Verify blurhash scales appropriately

### Edge Cases
- [ ] External URL (string) passed to OptimizedImage
- [ ] Missing alt text
- [ ] Missing width/height
- [ ] Network failure during upload (blurhash generation error)

---

## 12. Performance Considerations

### Blurhash Generation
- **When:** Only runs during upload/update (not on every render)
- **Performance impact:** Minimal - runs once per image
- **Size:** 32px placeholder is very small (~2-4KB base64)
- **Failure handling:** Non-blocking - image upload succeeds even if blurhash fails

### Client-Side Rendering
- **Next.js Image optimization:** Still active (automatic WebP, responsive sizes)
- **Placeholder size:** Tiny base64 string embedded in HTML (no extra request)
- **LCP impact:** Positive - perceived performance improved
- **Memory:** Negligible - base64 strings are small

### Database Storage
- **Field size:** ~2-4KB per image (text field)
- **Index:** Not needed (not used for queries)
- **Impact:** Minimal for ~1000 images (~2-4MB total)

---

## 13. Rollback Plan

If issues arise, rollback is simple:

1. **Remove OptimizedImage usage:**
   - Revert components to use Next.js Image directly
   - No data loss - original images unchanged

2. **Remove hook:**
   - Comment out `hooks` in MediaCloud config
   - New uploads won't generate blurhash
   - Existing blurhashes remain in DB (harmless)

3. **Remove field:**
   - Remove `blurhash` field from MediaCloud config
   - Run migration to drop column (optional)

4. **Uninstall package:**
   ```bash
   pnpm remove plaiceholder
   ```

---

## 14. Future Enhancements

### Potential Improvements
1. **Responsive blurhashes:** Generate different blur sizes for different image sizes
2. **LQIP alternatives:** Consider SQIP (SVG-based) or ThumbHash
3. **Lazy blurhash generation:** Generate on-demand rather than all upfront
4. **Art direction:** Different blurhashes for different breakpoints
5. **Analytics:** Track perceived performance improvement

### Monitoring
- Monitor upload times to ensure blurhash generation doesn't slow uploads
- Track user metrics (bounce rate, time-to-interactive) to measure impact
- Consider A/B testing blur vs. no blur

---

## 15. Documentation Updates Needed

After implementation, update:

1. **CLAUDE.md:**
   - Add OptimizedImage component to component list
   - Document blurhash field in MediaCloud and AssetCloud
   - Note shared generateBlurHash hook
   - List OptimizedImage in common workflows

2. **README.md:**
   - Mention progressive image loading feature
   - Note plaiceholder dependency
   - Highlight automatic blurhash generation

3. **COLLECTIONS.md:**
   - Document blurhash field in MediaCloud collection
   - Document blurhash field in AssetCloud collection
   - Explain auto-generation on upload for both
   - Note hidden/read-only admin UI behavior

---

## 16. Key Implementation Notes

- Blurhash generation is **automatic** - no admin user action required
- Blurhash is **hidden** from admin UI - fully transparent to content editors
- Blurhash is **non-blocking** - upload succeeds even if generation fails
- Blurhash is **optional** - OptimizedImage works without it (graceful degradation)
- Implementation is **incremental** - can roll out component-by-component
- **No breaking changes** - existing images continue to work
- **Type-safe** - full TypeScript support via generated Payload types
- **Both collections supported** - MediaCloud and AssetCloud use the same shared hook
- **SVG handling** - SVG files (common in AssetCloud for logos/icons) will gracefully skip blurhash generation since plaiceholder requires raster images; the hook error handler ensures upload succeeds

---

## 17. Security Considerations

- Blurhash generation runs server-side (safe)
- Base64 output is trusted data (generated by plaiceholder, not user input)
- No XSS risk (base64 data URLs are safe in Next.js Image)
- No SSRF risk (only processes uploaded files, not external URLs)

---

## 18. Accessibility

- Alt text handling unchanged - still required and enforced
- Blur placeholder is purely visual - no accessibility impact
- Screen readers ignore blur placeholder (as intended)
- Image captions remain supported

---

## 19. SEO Considerations

- No negative impact on SEO
- Potential positive impact:
  - Faster perceived load times (Core Web Vitals)
  - Better LCP scores (Largest Contentful Paint)
  - Reduced layout shift (placeholder reserves space)
- Images still crawlable and indexable

---

## 20. Cost Implications

### Development Time
- Estimated: 2-4 hours for implementation
- Estimated: 1-2 hours for testing
- Estimated: 2-4 hours for rollout to all components
- **Total: 5-10 hours**

### Runtime Costs
- Negligible - blurhash generation adds ~100-200ms per upload
- No additional API calls or external services
- Database storage minimal (~2-4KB per image)

### Benefits
- Better user experience (perceived performance)
- Reduced bounce rate (users see content faster)
- Improved Core Web Vitals scores
- More polished, professional appearance

---

## References

- [GitHub Gist by notflip](https://gist.github.com/notflip/e33c0b45299674ce56d80f1c6d08bd09)
- [Plaiceholder Documentation](https://plaiceholder.co/)
- [Next.js Image Optimization](https://nextjs.org/docs/pages/building-your-application/optimizing/images)
- [PayloadCMS Hooks](https://payloadcms.com/docs/hooks/overview)
- [BlurHash Algorithm](https://blurha.sh/)
