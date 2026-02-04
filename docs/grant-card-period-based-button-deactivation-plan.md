# Grant Card Period-Based Button Deactivation Feature

## Overview

This document outlines the implementation plan for adding a feature that conditionally deactivates "Apply" buttons on grant cards based on the active period dates.

## Feature Requirements

When a Grant Card has:
1. `activePeriod` field set to `specific_period`
2. `startDate` and `endDate` fields populated
3. Current date falls **outside** the specified period (before startDate or after endDate)

Then:
- Any button in `cardButtons` with the text "Apply" should be **deactivated and greyed out**
- The `msg` field content should be displayed in small font under the deactivated button

**Note:** When the current date is **within** the specified period, the Apply buttons remain active and functional.

## Current Architecture Analysis

### GrantCards Collection (`src/collections/GrantCards/index.ts`)

**Relevant Fields:**
- `activePeriod` (radio): Options are `open_all_year`, `specific_period`, `closed`
- `startDate` (date): Visible when `activePeriod === 'specific_period'`
- `endDate` (date): Visible when `activePeriod === 'specific_period'`
- `msg` (text): Message field for period-specific explanations (max 50 chars)
- `cardButtons` (array): Contains link fields with `label` property

### Grants Collection (`src/collections/Grants/index.ts`)

- Has `grantCard` relationship field linking to GrantCards
- Does NOT have its own `activePeriod`, `startDate`, `endDate`, or `msg` fields
- These fields are inherited from the related GrantCard

### Rendering Components

| Component | Path | Purpose |
|-----------|------|---------|
| `GrantCard` | `src/components/GrantCard/index.tsx` | Main card UI component |
| `GrantCardGrid` | `src/components/GrantCardGrid/index.tsx` | Grid layout for multiple cards |
| `ButtonArray` | `src/components/ButtonArray/index.tsx` | Renders card buttons |
| `GrantCardComponent` | `src/app/(frontend)/components/GrantCardComponent/GrantCardComponent.tsx` | Client-side card with language switching |

### Data Flow

```
GrantCards Collection
        ↓
GrantCardGrid/GrantCardComponent (fetches data)
        ↓
GrantCard component (receives props)
        ↓
ButtonArray component (renders buttons)
```

## Implementation Plan

### Phase 1: Update TypeScript Interfaces

#### 1.1 Update GrantCard Props Interface

**File:** `src/components/GrantCard/index.tsx`

Add new props to `GrantCardProps` interface:
```typescript
interface GrantCardProps {
  // ... existing props
  activePeriod?: 'open_all_year' | 'specific_period' | 'closed';
  startDate?: string | null;
  endDate?: string | null;
  msg?: string | null;
}
```

#### 1.2 Update ButtonArray Props Interface

**File:** `src/components/ButtonArray/index.tsx`

Add new props to support disabled state and message:
```typescript
interface ButtonArrayProps {
  btnArray: ButtonItem[];
  colStackOnMobile: boolean;
  disableApplyButtons?: boolean;
  disabledMessage?: string | null;
}
```

#### 1.3 Update GrantCardGrid Interface

**File:** `src/components/GrantCardGrid/index.tsx`

Ensure `GrantCardData` interface includes:
```typescript
interface GrantCardData {
  // ... existing fields
  activePeriod: 'open_all_year' | 'specific_period' | 'closed';
  startDate?: string | null;
  endDate?: string | null;
  msg?: string | null;
}
```

### Phase 2: Create Utility Function

#### 2.1 Date Period Checker Utility

**File:** `src/utilities/checkGrantPeriod.ts` (new file)

```typescript
interface GrantPeriodStatus {
  shouldDisableApply: boolean;
  message: string | null;
}

export function checkGrantPeriodStatus(
  activePeriod: string | undefined,
  startDate: string | null | undefined,
  endDate: string | null | undefined,
  msg: string | null | undefined
): GrantPeriodStatus {
  // Default: don't disable (open_all_year or closed handled elsewhere)
  if (activePeriod !== 'specific_period') {
    return { shouldDisableApply: false, message: null };
  }

  // If specific_period but no dates, don't disable
  if (!startDate || !endDate) {
    return { shouldDisableApply: false, message: null };
  }

  const now = new Date();
  const start = new Date(startDate);
  const end = new Date(endDate);

  // Set start date to beginning of day
  start.setHours(0, 0, 0, 0);
  // Set end date to end of day for inclusive comparison
  end.setHours(23, 59, 59, 999);

  // Check if current date falls within the period
  const isWithinPeriod = now >= start && now <= end;

  // Disable Apply buttons when OUTSIDE the period
  // (Applications are only open during the specified period)
  const isOutsidePeriod = !isWithinPeriod;

  return {
    shouldDisableApply: isOutsidePeriod,
    message: isOutsidePeriod ? (msg || null) : null
  };
}
```

### Phase 3: Update ButtonArray Component

**File:** `src/components/ButtonArray/index.tsx`

#### 3.1 Accept New Props

```typescript
export const ButtonArray: React.FC<{
  btnArray: ButtonArrayProps;
  colStackOnMobile: boolean;
  disableApplyButtons?: boolean;
  disabledMessage?: string | null;
}> = ({
  btnArray,
  colStackOnMobile = false,
  disableApplyButtons = false,
  disabledMessage = null,
}) => {
  // ...
}
```

#### 3.2 Add Button Disable Logic

Within the button rendering logic, check if the button label contains "Apply":

```typescript
const isApplyButton = button.link.label?.toLowerCase().includes('apply');
const isDisabled = disableApplyButtons && isApplyButton;
```

#### 3.3 Update Button Rendering

Add disabled styling and message display:

```typescript
return (
  <div key={index} className="flex flex-col items-center h-full">
    <Link
      href={isDisabled ? '#' : getHref()}
      target={button.link?.newTab ? '_blank' : '_self'}
      onClick={isDisabled ? (e) => e.preventDefault() : undefined}
    >
      <button
        className={`${getBtnClassName()} ${isDisabled ? 'disabled opacity-50 cursor-not-allowed bg-gray-400' : ''}`}
        disabled={isDisabled}
      >
        {button.link.label}
      </button>
    </Link>
    {isDisabled && disabledMessage && (
      <div className="text-xs text-gray-500 mt-1 text-center">
        {disabledMessage}
      </div>
    )}
    {/* existing filesize display logic */}
  </div>
)
```

### Phase 4: Update GrantCard Component

**File:** `src/components/GrantCard/index.tsx`

#### 4.1 Import Utility

```typescript
import { checkGrantPeriodStatus } from '@/utilities/checkGrantPeriod';
```

#### 4.2 Add Props to Component

```typescript
export const GrantCard: React.FC<GrantCardProps> = ({
  // ... existing props
  activePeriod,
  startDate,
  endDate,
  msg,
}) => {
  // ...
}
```

#### 4.3 Calculate Disable Status

```typescript
const { shouldDisableApply, message } = checkGrantPeriodStatus(
  activePeriod,
  startDate,
  endDate,
  msg
);
```

#### 4.4 Pass to ButtonArray

```typescript
<ButtonArray
  btnArray={cardButtons}
  colStackOnMobile={false}
  disableApplyButtons={shouldDisableApply}
  disabledMessage={message}
/>
```

### Phase 5: Update Parent Components

#### 5.1 GrantCardGrid Component

**File:** `src/components/GrantCardGrid/index.tsx`

Ensure data interface includes the period fields and pass them to GrantCard:

```typescript
<GrantCard
  {...card}
  activePeriod={card.activePeriod}
  startDate={card.startDate}
  endDate={card.endDate}
  msg={card.msg}
/>
```

#### 5.2 GrantCardComponent

**File:** `src/app/(frontend)/components/GrantCardComponent/GrantCardComponent.tsx`

Update state interface and pass props:

```typescript
const [grantBlock, setGrantBlock] = useState<{
  // ... existing fields
  activePeriod?: string | null;
  startDate?: string | null;
  endDate?: string | null;
  msg?: string | null;
}>({})

// In render:
<GrantCard
  // ... existing props
  activePeriod={grantBlock.activePeriod || undefined}
  startDate={grantBlock.startDate || null}
  endDate={grantBlock.endDate || null}
  msg={grantBlock.msg || null}
/>
```

### Phase 6: Add CSS Styling

**File:** `src/styles/globals.css` (or component-level styles)

Add disabled button styles:

```css
.btn-array button.disabled,
.btn-array button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  background-color: #9ca3af; /* gray-400 */
  border-color: #9ca3af;
  color: #ffffff;
  pointer-events: none;
}

.btn-array button.disabled:hover,
.btn-array button:disabled:hover {
  background-color: #9ca3af;
  border-color: #9ca3af;
}
```

## File Changes Summary

| File | Action | Description |
|------|--------|-------------|
| `src/utilities/checkGrantPeriod.ts` | CREATE | New utility for period checking |
| `src/components/ButtonArray/index.tsx` | MODIFY | Add disable logic and message display |
| `src/components/GrantCard/index.tsx` | MODIFY | Add period props, calculate disable state |
| `src/components/GrantCardGrid/index.tsx` | MODIFY | Update interface, pass period props |
| `src/app/(frontend)/components/GrantCardComponent/GrantCardComponent.tsx` | MODIFY | Update state interface, pass period props |
| `src/styles/globals.css` | MODIFY | Add disabled button styles |

## Testing Scenarios

### Test Case 1: Open All Year
- **Setup:** `activePeriod = 'open_all_year'`
- **Expected:** All buttons functional, no message displayed

### Test Case 2: Specific Period - Within Range (Applications OPEN)
- **Setup:**
  - `activePeriod = 'specific_period'`
  - `startDate = '2024-01-01'`
  - `endDate = '2027-12-31'`
  - `msg = 'Applications open until December 2027'`
  - Current date: Within range
- **Expected:**
  - All buttons functional (Apply buttons ACTIVE)
  - No disabled message displayed
  - Applications are open during this period

### Test Case 3: Specific Period - Outside Range (Applications CLOSED)
- **Setup:**
  - `activePeriod = 'specific_period'`
  - `startDate = '2020-01-01'`
  - `endDate = '2020-12-31'`
  - `msg = 'Applications will reopen in January'`
  - Current date: Outside range (past the end date)
- **Expected:**
  - Apply buttons disabled and greyed out
  - Message displayed under Apply buttons
  - Non-Apply buttons remain functional

### Test Case 4: Specific Period - Before Start Date (Applications CLOSED)
- **Setup:**
  - `activePeriod = 'specific_period'`
  - `startDate = '2027-06-01'`
  - `endDate = '2027-12-31'`
  - `msg = 'Applications open from June 2027'`
  - Current date: Before start date
- **Expected:**
  - Apply buttons disabled and greyed out
  - Message displayed under Apply buttons

### Test Case 5: Closed Status
- **Setup:** `activePeriod = 'closed'`
- **Expected:** Card may not display (per existing logic), or buttons remain unchanged

### Test Case 6: Button Label Variations
- **Setup:** Buttons with labels "Apply Now", "Apply Here", "APPLY", "Learn More"
- **Expected:** Only buttons containing "Apply" (case-insensitive) are disabled when outside the period

## Rollout Considerations

1. **Backward Compatibility:** Existing grant cards without `startDate`/`endDate` will continue to work normally
2. **Server-Side Rendering:** The date check happens at render time, ensuring correct behavior for SSR
3. **Time Zones:** Consider whether dates should be evaluated in a specific timezone or server local time
4. **Cache Invalidation:** Since this is client-side date comparison, ISR cache won't affect behavior

---

## Feature Extension: Hero Block Button Deactivation

### Overview

Extend the period-based button deactivation feature to also apply to the hero block buttons on individual Grant pages. When a Grant page is linked to a GrantCard with `activePeriod = 'specific_period'` and the current date falls outside the specified period, any "Apply" button in the hero block should also be deactivated.

### Current Architecture

#### GrantPage Component (`src/app/(frontend)/components/GrantPage/GrantPage.tsx`)

**Key observations:**
- Fetches Grant data including the related `grantCard` object (line 163)
- The `grantCard` contains: `activePeriod`, `startDate`, `endDate`, `msg`, `badgeText`, `badgeType`, `mascot`, etc.
- Hero block state is set at lines 168-189, extracting some grantCard data (badgeText, badgeType, mascot)
- The `heroButtons` array is separate from `cardButtons` - it comes from `data.heroButtons` on the Grant page itself
- ButtonArray for hero is rendered at lines 253-256 without disable props:
  ```typescript
  <ButtonArray
    btnArray={heroBlock?.heroButtons || []}
    colStackOnMobile={pageType === 'landing' ? true : false}
  />
  ```

#### Data Flow for Hero Block

```
Grant Page (collection)
    ├── heroButtons (array of links)
    └── grantCard (relationship to GrantCards)
           ├── activePeriod
           ├── startDate
           ├── endDate
           └── msg
                ↓
GrantPage component (fetches both)
                ↓
ButtonArray (hero buttons + period data from grantCard)
```

### Implementation Plan

#### Phase 7: Update GrantPage State Interface

**File:** `src/app/(frontend)/components/GrantPage/GrantPage.tsx`

Add period-related fields to the heroBlock state interface:

```typescript
const [heroBlock, setHeroBlock] = useState<{
  // ... existing fields
  title?: string | null
  subtitle?: string | null
  badgeText?: string | null
  badgeType?: string | null
  heroImage?: AssetCloud | null
  heroButtons?: { ... }[]
  heroContact?: { ... }
  // NEW: Period fields from related grantCard
  activePeriod?: 'open_all_year' | 'specific_period' | 'closed' | null
  startDate?: string | null
  endDate?: string | null
  msg?: string | null
}>({})
```

#### Phase 8: Extract Period Data from grantCard

**File:** `src/app/(frontend)/components/GrantPage/GrantPage.tsx`

Update the `handleLanguageChange` function to extract period data from the related grantCard:

```typescript
setHeroBlock({
  title: data.heroTitle,
  subtitle: data.heroSubtitle,
  badgeText: data.grantCard?.badgeText,
  badgeType: data.grantCard?.badgeType,
  heroImage: data.grantCard?.mascot,
  heroButtons: data.heroButtons?.map(...),
  heroContact: data.heroContact,
  // NEW: Extract period data from grantCard
  activePeriod: data.grantCard?.activePeriod || null,
  startDate: data.grantCard?.startDate || null,
  endDate: data.grantCard?.endDate || null,
  msg: data.grantCard?.msg || null,
})
```

#### Phase 9: Import and Use Period Utility

**File:** `src/app/(frontend)/components/GrantPage/GrantPage.tsx`

Import the existing utility:
```typescript
import { checkGrantPeriodStatus } from '@/utilities/checkGrantPeriod'
```

Calculate disable status before rendering:
```typescript
// Inside the component, before return statement
const { shouldDisableApply, message } = checkGrantPeriodStatus(
  heroBlock.activePeriod,
  heroBlock.startDate,
  heroBlock.endDate,
  heroBlock.msg,
)
```

#### Phase 10: Pass Disable Props to Hero ButtonArray

**File:** `src/app/(frontend)/components/GrantPage/GrantPage.tsx`

Update the ButtonArray call in the hero section:

```typescript
<ButtonArray
  btnArray={heroBlock?.heroButtons || []}
  colStackOnMobile={pageType === 'landing' ? true : false}
  disableApplyButtons={shouldDisableApply}
  disabledMessage={message}
/>
```

### File Changes Summary (Hero Block Extension)

| File | Action | Description |
|------|--------|-------------|
| `src/app/(frontend)/components/GrantPage/GrantPage.tsx` | MODIFY | Add period fields to state, extract from grantCard, pass to ButtonArray |

### Testing Scenarios (Hero Block)

#### Test Case 7: Hero Block - Period Active
- **Setup:**
  - Grant page linked to GrantCard with `activePeriod = 'specific_period'`
  - `startDate = '2024-01-01'`, `endDate = '2027-12-31'`
  - Hero has "Apply Now" button
  - Current date: Within range
- **Expected:**
  - Hero "Apply Now" button is ACTIVE and functional
  - No message displayed

#### Test Case 8: Hero Block - Period Inactive
- **Setup:**
  - Grant page linked to GrantCard with `activePeriod = 'specific_period'`
  - `startDate = '2026-06-01'`, `endDate = '2026-07-31'`
  - `msg = 'Application open June 1 - July 31, 2026'`
  - Hero has "Apply Now" and "Check Eligibility" buttons
  - Current date: Outside range (e.g., February 2026)
- **Expected:**
  - Hero "Apply Now" button is DISABLED and greyed out
  - Message "Application open June 1 - July 31, 2026" displayed under the Apply button
  - "Check Eligibility" button remains ACTIVE

#### Test Case 9: Hero Block - Open All Year
- **Setup:**
  - Grant page linked to GrantCard with `activePeriod = 'open_all_year'`
  - Hero has "Apply Now" button
- **Expected:**
  - Hero "Apply Now" button is ACTIVE and functional
  - No message displayed

#### Test Case 10: Landing Page (No GrantCard)
- **Setup:**
  - Grant page with `pageType = 'landing'` (no grantCard relationship)
  - Hero has "Apply" button
- **Expected:**
  - All buttons remain ACTIVE (no period data to check)
  - No message displayed

### Visual Reference

The hero block with disabled Apply button should appear similar to Image #4:
- "Check Eligibility" button remains active (outline style)
- "Apply Now" button is greyed out and disabled
- Period message displayed below the disabled button in small text

### Considerations

1. **Landing vs Individual Pages:** Only individual grant pages have a `grantCard` relationship. Landing pages should not be affected.
2. **Null Safety:** If `grantCard` is null/undefined, the utility returns `shouldDisableApply: false`, so buttons remain active.
3. **Consistent Styling:** The disabled button styling in the hero should match the styling in grant cards (same grey color, same message styling).

---

## Future Enhancements

1. Add admin UI preview showing which buttons would be disabled
2. Add countdown timer showing when the period will end/start
3. Add email notification system for period transitions
4. Add bulk scheduling for multiple grant cards
5. Add visual indicator in admin panel showing current period status for each grant
