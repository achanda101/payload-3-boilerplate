# Listing Card Deck - Resource Selection Feature Implementation Plan

## Overview

Add the ability for the `listCrdDck` (Listing Card Deck) block to populate cards by selecting from existing resource pages (Blog, Reports, Multimedia) via a dropdown. Users can choose specific pages to add to the slider, and the card data (title, description, image, tags, link) will be automatically extracted from the selected resources.

---

## Summary of Changes

### Files to Modify
1. `src/blocks/ListingCardDeck/config.ts` - Block configuration
2. `src/components/ListingCardDeck/index.tsx` - Frontend component
3. Page renderers (6 files) - Pass new props to component

### Config Changes (`config.ts`)

1. **Add `dataSource` field** (after `title` field)
   - Type: `radio`
   - Options: "Manual Cards" | "Resource Pages"
   - Default: "manual"

2. **Add `resourcePages` field** (after `dataSource` field)
   - Type: `relationship` with `hasMany: true`
   - Relations: `['blog', 'reports', 'mmedia']`
   - Filter: Only show `pageType: 'individual'` pages
   - Condition: Only visible when `dataSource === 'resources'`

3. **Update `cards` field**
   - Add `admin.condition` to hide when `dataSource === 'resources'`
   - Remove `minRows: 1` (cards can be empty when using resource pages mode)

### Component Changes Required
`src/components/ListingCardDeck/index.tsx` needs to handle two different data structures:

**Data Structure Difference:**
| Mode | Array Populated | Structure |
|------|-----------------|-----------|
| Manual Cards | `cards[]` | `{ id, title, desc, image, tags[], link }` |
| Resource Pages | `resourcePages[]` | `{ relationTo, value: Document }` (polymorphic) |

**Required Changes:**

1. **Update props interface** to accept both `cards` and `resourcePages`:
   ```typescript
   interface ListingCardDeckProps {
     title: string | null
     dataSource?: 'manual' | 'resources'
     cards?: { /* existing card structure */ }[]
     resourcePages?: {
       relationTo: 'blog' | 'reports' | 'mmedia'
       value: {
         id: string
         title: string
         slug: string
         heroSubtitle?: string
         image?: MediaCloud
         docType?: { id: string; type: string }[]
       }
     }[]
     buttons: { /* existing button structure */ }[]
   }
   ```

2. **Add logic to normalize data** - Transform `resourcePages` to card format:
   ```typescript
   // Normalize cards based on data source
   const normalizedCards = useMemo(() => {
     if (dataSource === 'resources' && resourcePages?.length) {
       return resourcePages
         .filter(item => typeof item.value === 'object')
         .map(item => {
           const doc = item.value
           const relationTo = item.relationTo
           return {
             id: doc.id,
             title: doc.title || null,
             desc: doc.heroSubtitle || null,
             image: typeof doc.image === 'object' ? doc.image : undefined,
             tags: doc.docType?.map(dt => ({
               id: typeof dt === 'object' ? dt.id : dt,
               tag: typeof dt === 'object' ? dt.type : null,
             })).filter(t => t.tag) || [],
             link: {
               type: 'custom',
               url: `/${relationTo}/${doc.slug}`,
               label: 'Read More',
               arrowLink: true,
             },
           }
         })
     }
     return cards || []
   }, [dataSource, resourcePages, cards])
   ```

3. **Add early return for empty data**:
   ```typescript
   if (normalizedCards.length === 0) {
     return null
   }
   ```

4. **Use `normalizedCards` instead of `cards`** throughout the component

### No Migration Needed
- Existing blocks default to manual mode

---

## Current State Analysis

### ListingCardDeck Block (`listCrdDck`)
**Location:** `src/blocks/ListingCardDeck/config.ts`

**Current Fields:**
- `title` - Block title (text, localized)
- `cards` - Manual array of cards with:
  - `title` - Card title (text, localized)
  - `desc` - Card description (textarea, localized)
  - `image` - Upload to mediaCloud
  - `tags` - Array of tag objects
  - `link` - Link field
- `buttons` - Array of CTA buttons (1-2)

**Component:** `src/components/ListingCardDeck/index.tsx`
- Uses Embla Carousel
- Expects cards with: `id`, `title`, `desc`, `image`, `tags[]`, `link`

### ResourceFeatureCard Block (`resourceFeatCard`) - Reference Implementation
**Location:** `src/blocks/ResourceFeatureCard/config.ts`

**Relevant Feature:**
- `featCardList` - A `hasMany` relationship field to `['blog', 'reports', 'mmedia']`
- Uses `filterOptions` to only show `pageType: 'individual'` documents
- User selects specific resources from the dropdown

---

## Proposed Implementation

### Approach

Add two data source options:
1. **Manual Cards** (existing) - User creates cards with custom content
2. **Resource Pages** (new) - User selects from existing blog/reports/mmedia pages

When "Resource Pages" is selected, a multi-select relationship dropdown appears where users can pick specific pages. The selected pages are transformed into the card format by the component during rendering.

---

### 1. Config Changes (`src/blocks/ListingCardDeck/config.ts`)

#### 1.1 Add Data Source Selection Field
```typescript
{
  name: 'dataSource',
  type: 'radio',
  label: 'Data Source',
  defaultValue: 'manual',
  options: [
    { label: 'Manual Cards', value: 'manual' },
    { label: 'Resource Pages', value: 'resources' },
  ],
  admin: {
    layout: 'horizontal',
    description: 'Choose whether to manually create cards or select from existing resource pages',
  },
}
```

#### 1.2 Add Resource Pages Relationship Field
```typescript
{
  name: 'resourcePages',
  label: 'Select Resource Pages',
  type: 'relationship',
  relationTo: ['blog', 'reports', 'mmedia'],
  hasMany: true,
  filterOptions: ({ relationTo, id }) => {
    // Only show items with pageType 'individual'
    if (relationTo === 'blog' || relationTo === 'reports' || relationTo === 'mmedia') {
      const filter: any = {
        pageType: {
          equals: 'individual',
        },
      }
      // Exclude the current document to prevent self-referential links
      if (id) {
        filter.id = {
          not_equals: id,
        }
      }
      return filter
    }
    return true
  },
  admin: {
    description: 'Select blog posts, reports, or multimedia pages to display as cards in the slider',
    condition: (_data, siblingData) => siblingData?.dataSource === 'resources',
  },
}
```

#### 1.3 Update Manual Cards Field Visibility
Add condition to hide when `dataSource === 'resources'` and remove `minRows`:

```typescript
{
  name: 'cards',
  // ... existing config ...
  // minRows: 1,  // REMOVE THIS - cards can be empty in resource pages mode
  admin: {
    // ... existing admin config ...
    condition: (_data, siblingData) => siblingData?.dataSource !== 'resources',
  },
}
```

---

### 2. Files to Modify

| File | Action | Description |
|------|--------|-------------|
| `src/blocks/ListingCardDeck/config.ts` | Modify | Add dataSource radio, resourcePages relationship field, update cards field visibility, remove minRows |
| `src/components/ListingCardDeck/index.tsx` | Modify | Handle both `cards[]` and `resourcePages[]` data structures, add normalization logic |
| `src/app/(frontend)/components/BlogPage/BlogPage.tsx` | Modify | Pass `dataSource` and `resourcePages` props |
| `src/app/(frontend)/components/ReportPage/ReportPage.tsx` | Modify | Pass `dataSource` and `resourcePages` props |
| `src/app/(frontend)/components/MMediaPage/MMediaPage.tsx` | Modify | Pass `dataSource` and `resourcePages` props |
| `src/app/(frontend)/components/GrantPage/GrantPage.tsx` | Modify | Pass `dataSource` and `resourcePages` props |
| `src/app/(frontend)/components/UAFPage/UAFPage.tsx` | Modify | Pass `dataSource` and `resourcePages` props |
| `src/app/(frontend)/components/HomePageContent/PageContent.tsx` | Modify | Pass `dataSource` and `resourcePages` props |

---

## Complete Updated Config Structure

```typescript
import { Block } from "payload";
import { link } from "@/fields/link";

export const ListingCardDeck: Block = {
  slug: 'listCrdDck',
  labels: {
    singular: 'Listing Card Deck',
    plural: 'Listing Card Decks'
  },
  imageURL: '/block_icons/listingcarddeck-block-icon.png',
  fields: [
    {
      name: 'title',
      type: 'text',
      localized: true,
    },
    // NEW: Data Source Selection
    {
      name: 'dataSource',
      type: 'radio',
      label: 'Data Source',
      defaultValue: 'manual',
      options: [
        { label: 'Manual Cards', value: 'manual' },
        { label: 'Resource Pages', value: 'resources' },
      ],
      admin: {
        layout: 'horizontal',
        description: 'Choose whether to manually create cards or select from existing resource pages',
      },
    },
    // NEW: Resource Pages Multi-Select
    {
      name: 'resourcePages',
      label: 'Select Resource Pages',
      type: 'relationship',
      relationTo: ['blog', 'reports', 'mmedia'],
      hasMany: true,
      filterOptions: ({ relationTo, id }) => {
        if (relationTo === 'blog' || relationTo === 'reports' || relationTo === 'mmedia') {
          const filter: any = {
            pageType: {
              equals: 'individual',
            },
          }
          if (id) {
            filter.id = {
              not_equals: id,
            }
          }
          return filter
        }
        return true
      },
      admin: {
        description: 'Select blog posts, reports, or multimedia pages to display as cards. You can reorder them as needed.',
        condition: (_data, siblingData) => siblingData?.dataSource === 'resources',
      },
    },
    // MODIFIED: Cards Array (condition added, minRows removed)
    {
      name: 'cards',
      label: 'Listing Cards',
      labels: {
        singular: 'Listing Card',
        plural: 'Listing Cards'
      },
      type: 'array',
      // minRows removed - cards can be empty when using resource pages mode
      fields: [
        {
          type: 'tabs',
          tabs: [
            {
              label: 'Card Title',
              fields: [
                {
                  name: 'title',
                  type: 'text',
                  localized: true,
                },
              ],
            },
            {
              label: 'Card Description',
              fields: [
                {
                  name: 'desc',
                  type: 'textarea',
                  localized: true,
                },
              ],
            },
            {
              label: 'Card Image',
              fields: [
                {
                  name: 'image',
                  type: 'upload',
                  relationTo: 'mediaCloud',
                },
              ]
            },
            {
              label: 'Card Tags',
              fields: [
                {
                  name: 'tags',
                  type: 'array',
                  fields: [
                    {
                      name: 'tag',
                      type: 'text',
                      localized: true,
                      admin: {
                        placeholder: 'Enter a tag for the listing card',
                      },
                    },
                  ],
                  admin: {
                    components: {
                      RowLabel: {
                        path: 'src/blocks/ListingCardDeck/TagRowLabel.tsx',
                      }
                    },
                  }
                },
              ],
            },
            {
              label: 'Card Link',
              fields: [
                link({
                  appearances: false,
                }),
              ],
            }
          ],
        },
      ],
      admin: {
        description: 'Add listing cards to be displayed in the deck',
        components: {
          RowLabel: {
            path: 'src/blocks/ListingCardDeck/CardRowLabel.tsx',
          }
        },
        condition: (_data, siblingData) => siblingData?.dataSource !== 'resources',
      }
    },
    // EXISTING: Buttons Array (unchanged)
    {
      name: 'buttons',
      labels: {
        singular: 'Button',
        plural: 'Buttons'
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
        components: {
          RowLabel: {
            path: 'src/blocks/ListingCardDeck/ButtonRowLabel.tsx',
          }
        },
      }
    },
  ],
};
```

---

## Page Renderer Updates

The page renderers need to pass the new props to the `ListingCardDeck` component.

**Files to update:**
- `src/app/(frontend)/components/BlogPage/BlogPage.tsx`
- `src/app/(frontend)/components/ReportPage/ReportPage.tsx`
- `src/app/(frontend)/components/MMediaPage/MMediaPage.tsx`
- `src/app/(frontend)/components/GrantPage/GrantPage.tsx`
- `src/app/(frontend)/components/UAFPage/UAFPage.tsx`
- `src/app/(frontend)/components/HomePageContent/PageContent.tsx`

**Current code:**
```typescript
if (block.blockType === 'listCrdDck') {
  return (
    <React.Fragment key={index}>
      <div className="page_column_layout gap-6">
        <ListingCardDeck
          title={block.title}
          cards={block.cards}
          buttons={block.buttons}
        />
      </div>
    </React.Fragment>
  )
}
```

**Updated code:**
```typescript
if (block.blockType === 'listCrdDck') {
  return (
    <React.Fragment key={index}>
      <div className="page_column_layout gap-6">
        <ListingCardDeck
          title={block.title}
          dataSource={block.dataSource}
          cards={block.cards}
          resourcePages={block.resourcePages}
          buttons={block.buttons}
        />
      </div>
    </React.Fragment>
  )
}
```

---

## Admin UI Behavior

### When "Manual Cards" is Selected (Default):
- Shows the `cards` array field
- Hides `resourcePages` relationship field
- User manually adds cards with title, desc, image, tags, link

### When "Resource Pages" is Selected:
- Hides the `cards` array field
- Shows `resourcePages` multi-select dropdown
- Dropdown shows all blog posts, reports, and multimedia pages (filtered to `pageType: 'individual'`)
- User can select multiple pages and reorder them
- Selected pages are transformed to card format when rendered

---

## Data Transformation

**Source Document (Blog/Report/MMedia):**
```typescript
{
  id: string
  title: string
  slug: string
  heroSubtitle: string
  image: MediaCloud
  docType: Doctype[]  // Array of resource types selected for this page
}
```

**Target Card Format:**
```typescript
{
  id: string
  title: string | null           // from doc.title
  desc: string | null            // from doc.heroSubtitle
  image: MediaCloud | null       // from doc.image
  tags: { id, tag }[]            // from doc.docType[].type (resource types)
  link: {
    type: 'custom'
    url: string                  // e.g., '/blog/my-post-slug'
    label: 'Read More'
    arrowLink: true
  }
}
```

### Tags Mapping

Tags are derived from the **Resource Types (docType)** selected for each page:

| Source Field | Target Field | Example |
|--------------|--------------|---------|
| `doc.docType[0].type` | `tags[0].tag` | "Annual Report" |
| `doc.docType[1].type` | `tags[1].tag` | "Learning Report" |

The `docType` field on Blog/Reports/MMedia pages is a `hasMany` relationship to the `doctypes` collection. Each doctype has a `type` field (e.g., "Annual Report", "Video", "Blog Post") which becomes the tag text displayed on the card.

---

## Verification Checklist

1. **Admin Panel:**
   - [ ] Radio toggle switches between manual and resource pages modes
   - [ ] resourcePages dropdown appears only in resource pages mode
   - [ ] cards array is hidden in resource pages mode
   - [ ] Dropdown shows blog, reports, and mmedia pages
   - [ ] Only `pageType: 'individual'` pages appear in dropdown
   - [ ] User can select multiple pages
   - [ ] User can reorder selected pages

2. **Data Transformation:**
   - [ ] Selected pages are correctly transformed to card format
   - [ ] Title comes from page title
   - [ ] Description comes from heroSubtitle
   - [ ] Image is correctly mapped
   - [ ] Tags come from docType array
   - [ ] Link points to correct page URL (e.g., `/blog/slug`)

3. **Frontend Rendering:**
   - [ ] Component renders resource-based cards correctly
   - [ ] Images display with correct focal points
   - [ ] Tags display correctly
   - [ ] Links navigate to correct resource URLs
   - [ ] Carousel navigation works as expected
   - [ ] Card order matches selection order

4. **Edge Cases:**
   - [ ] Empty selection shows no cards
   - [ ] Unpopulated relationships are filtered out
   - [ ] Switching between modes doesn't cause errors

---

## Migration Notes

- Existing ListingCardDeck blocks will continue to work as `dataSource` defaults to 'manual'
- No data migration required
- New `resourcePages` field is only used when `dataSource` is 'resources'

---

## Related Files Reference

| File | Purpose |
|------|---------|
| `src/blocks/ResourceFeatureCard/config.ts` | Reference for `featCardList` relationship field pattern |
| `src/components/ListingCardDeck/index.tsx` | Frontend component (**needs data normalization logic**) |
| `src/collections/Blog/index.ts` | Blog collection |
| `src/collections/Reports/index.ts` | Reports collection |
| `src/collections/MMedia/index.ts` | MMedia collection |
| `src/app/(frontend)/components/*Page/*.tsx` | Page renderers (**need to pass new props**) |
