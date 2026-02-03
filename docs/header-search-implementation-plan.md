# Header Search Integration Implementation Plan

## Overview

Integrate the existing search button in `HeaderClient` component with the search results page to enable site-wide search functionality. Currently, clicking the search button shows an input field but the input is non-functional.

## Current State

### Header Component (`src/globals/Header/Component.client.tsx`)

**Desktop Search (lines 221-277):**
- Search button toggles `isSearchOpen` state via `toggleSearch()` function
- When open, displays a simple `<input type="text" placeholder="Search..." />` (line 282)
- Input has no `onChange`, `onSubmit`, or navigation logic

**Mobile Search (lines 350-375):**
- Conditionally rendered when `isSearchOpen` is true inside the mobile menu sheet
- Same issue: input field with no functionality
- Close button incorrectly calls `setIsMobileMenuOpen(false)` instead of handling search

### Existing Search Infrastructure

1. **Search Component** (`src/search/Component.tsx`):
   - Uses `useDebounce` hook for debounced search
   - Routes to `/search?q={query}` on input change
   - Uses `useRouter` from `next/navigation`

2. **Search Results Page** (`src/app/(frontend)/search/page.tsx`):
   - Reads `q` query parameter from URL
   - Fetches results from `/api/search?q={query}`
   - Displays results with category badges, images, metadata

3. **Debounce Hook** (`src/utilities/useDebounce.ts`):
   - Generic debounce hook with configurable delay (default 200ms)

4. **Search Index** (`@payloadcms/plugin-search`):
   - Indexes: pages, reports, blog, mmedia, grants
   - Custom `beforeSync` hook extracts block content
   - API endpoint: `/api/search` (Payload REST API)

## Implementation Plan

### Step 1: Add State for Search Query

Add a new state variable to track the search input value:

```tsx
// In HeaderClient component
const [searchQuery, setSearchQuery] = useState('')
```

### Step 2: Import Required Dependencies

Add imports at the top of the file:

```tsx
import { useRouter } from 'next/navigation'
import { useDebounce } from '@/utilities/useDebounce'
```

### Step 3: Add Debounced Search Logic

Add the router and debounce logic inside the component:

```tsx
const router = useRouter()
const debouncedSearchQuery = useDebounce(searchQuery, 300)
```

### Step 4: Add Navigation Effect

Add a useEffect to navigate when debounced query changes:

```tsx
useEffect(() => {
  if (debouncedSearchQuery.trim()) {
    router.push(`/search?q=${encodeURIComponent(debouncedSearchQuery)}`)
  }
}, [debouncedSearchQuery, router])
```

### Step 5: Update Desktop Search Input (line 282)

Replace the current non-functional input:

```tsx
{isSearchOpen && (
  <div className="search-bar">
    <form
      onSubmit={(e) => {
        e.preventDefault()
        if (searchQuery.trim()) {
          router.push(`/search?q=${encodeURIComponent(searchQuery)}`)
          setIsSearchOpen(false)
        }
      }}
    >
      <input
        type="text"
        placeholder="Search..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        autoFocus
      />
    </form>
  </div>
)}
```

### Step 6: Update Mobile Search Input (lines 350-375)

Replace the mobile search section:

```tsx
{isSearchOpen && (
  <div className="mb-6">
    <form
      onSubmit={(e) => {
        e.preventDefault()
        if (searchQuery.trim()) {
          router.push(`/search?q=${encodeURIComponent(searchQuery)}`)
          setIsMobileMenuOpen(false)
          setIsSearchOpen(false)
        }
      }}
      className="flex items-center border-2 border-gray-300 rounded-full px-4 py-2"
    >
      <input
        type="text"
        placeholder="Search"
        className="flex-1 outline-none bg-transparent"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        autoFocus
      />
      <button type="submit" className="p-1 flex items-center justify-center">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 h-5"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M15 10.5C15 12.9853 12.9853 15 10.5 15C8.01472 15 6 12.9853 6 10.5C6 8.01472 8.01472 6 10.5 6C12.9853 6 15 8.01472 15 10.5ZM14.1793 15.2399C13.1632 16.0297 11.8865 16.5 10.5 16.5C7.18629 16.5 4.5 13.8137 4.5 10.5C4.5 7.18629 7.18629 4.5 10.5 4.5C13.8137 4.5 16.5 7.18629 16.5 10.5C16.5 11.8865 16.0297 13.1632 15.2399 14.1792L20.0304 18.9697L18.9697 20.0303L14.1793 15.2399Z"
            fill="#080341"
          ></path>
        </svg>
      </button>
    </form>
  </div>
)}
```

### Step 7: Clear Search on Close

Update `toggleSearch` to clear query when closing:

```tsx
const toggleSearch = () => {
  if (isSearchOpen) {
    setSearchQuery('') // Clear query when closing
  }
  setIsSearchOpen(!isSearchOpen)
}
```

### Step 8: Handle Escape Key (Optional Enhancement)

Add keyboard shortcut to close search:

```tsx
useEffect(() => {
  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape' && isSearchOpen) {
      setIsSearchOpen(false)
      setSearchQuery('')
    }
  }

  window.addEventListener('keydown', handleKeyDown)
  return () => window.removeEventListener('keydown', handleKeyDown)
}, [isSearchOpen])
```

## Files to Modify

1. `src/globals/Header/Component.client.tsx` - Main changes

## Files Already Complete (No Changes Needed)

1. `src/app/(frontend)/search/page.tsx` - Search results page
2. `src/search/beforeSync.ts` - Search index sync hook
3. `src/search/fieldOverrides.ts` - Search field definitions
4. `src/utilities/useDebounce.ts` - Debounce utility

## Behavioral Notes

1. **Debounced Navigation**: Search navigates automatically after 300ms of no typing
2. **Immediate Navigation on Submit**: Pressing Enter navigates immediately
3. **Clear on Close**: Closing search clears the query
4. **Auto-focus**: Input receives focus when opened
5. **Mobile Behavior**: Closes mobile menu sheet after search submission

## Testing Checklist

- [ ] Desktop: Click search icon, type query, verify navigation to `/search?q=...`
- [ ] Desktop: Press Enter to submit immediately
- [ ] Desktop: Press Escape to close and clear
- [ ] Desktop: Click close (X) icon clears query
- [ ] Mobile: Open hamburger menu, then search
- [ ] Mobile: Submit search closes menu and navigates
- [ ] Debounce: Verify 300ms delay before automatic navigation
- [ ] Empty query: Verify no navigation for empty/whitespace queries

## Related Cleanup (Separate Task)

The `src/search/beforeSync.ts` currently references an `author` field that doesn't exist in any collection. This should be cleaned up separately:

1. Remove `author` from `extractCommonFields()` return value
2. Remove `author` from `modifiedDoc` assignment
3. Remove `author` field from `src/search/fieldOverrides.ts`

## API Reference

- **Search Endpoint**: `GET /api/search?q={query}`
- **Search Results Page**: `/search?q={query}`
- **Payload Search Plugin Docs**: https://payloadcms.com/docs/plugins/search
