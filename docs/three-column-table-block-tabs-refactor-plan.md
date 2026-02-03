# ThreeColumnTableBlock Tabs Refactor Plan

## Overview

Refactor the ThreeColumnTableBlock to use a tabs-based admin UI structure (like TwoColumnBlock) instead of the current nested array structure. This changes the block from a multi-row table to a single three-column layout with tabs for each column.

---

## Current Structure Analysis

### TwoColumnBlock (Reference Pattern)
```
- title (text)
- subtitle (textarea)
- tabs:
  - Tab "Left Column":
    - leftColumn (richText)
  - Tab "Right Column":
    - rightColumn (richText)
```

### ThreeColumnTableBlock (Current)
```
- title (text)
- subtitle (textarea)
- columnWidths (select)
- rows (array):
  - columns (array, min/max: 3):
    - content (richText)
```

**Key Differences:**
- Current structure supports **multiple rows** (table-like)
- New structure will have **single row with 3 columns** (like TwoColumnBlock)
- Current uses nested arrays; new uses tabs

---

## Proposed Changes

### 1. Config File: `src/blocks/ThreeColumnTableBlock/config.ts`

**Changes Required:**

1. **Remove** the `rows` array field
2. **Remove** the nested `columns` array
3. **Add** a `tabs` structure with three tabs:
   - "First Column" tab with `firstColumn` (richText)
   - "Second Column" tab with `secondColumn` (richText)
   - "Third Column" tab with `thirdColumn` (richText)
4. **Keep** the `columnWidths` select field (useful for controlling proportions)
5. **Remove** RowLabel component references (no longer needed)

**New Config Structure:**
```typescript
export const ThreeColumnTableBlock: Block = {
  slug: 'threeColumnTableBlock',
  labels: {
    singular: 'Three Column Table',
    plural: 'Three Column Tables',
  },
  imageURL: '/block_icons/threecolumntable-block-icon.png',
  fields: [
    {
      name: 'title',
      type: 'text',
      localized: true,
    },
    {
      name: 'subtitle',
      type: 'textarea',
      localized: true,
    },
    {
      name: 'columnWidths',
      type: 'select',
      label: 'Column Widths',
      defaultValue: 'f-t-t',
      options: [
        { label: '50%, 25%, 25%', value: 'f-t-t' },
        { label: '25%, 50%, 25%', value: 't-f-t' },
        { label: '25%, 25%, 50%', value: 't-t-f' },
        { label: '15%, 30%, 55%', value: 'vt-t-f' },
      ],
    },
    {
      type: 'tabs',
      tabs: [
        {
          label: 'First Column',
          fields: [
            {
              name: 'firstColumn',
              label: 'First Column Content',
              type: 'richText',
              editor: lexicalEditor({
                features: lexicalFeatures,
              }),
              localized: true,
            },
          ],
        },
        {
          label: 'Second Column',
          fields: [
            {
              name: 'secondColumn',
              label: 'Second Column Content',
              type: 'richText',
              editor: lexicalEditor({
                features: lexicalFeatures,
              }),
              localized: true,
            },
          ],
        },
        {
          label: 'Third Column',
          fields: [
            {
              name: 'thirdColumn',
              label: 'Third Column Content',
              type: 'richText',
              editor: lexicalEditor({
                features: lexicalFeatures,
              }),
              localized: true,
            },
          ],
        },
      ],
    },
  ],
}
```

---

### 2. Component File: `src/components/ThreeColumnTable/index.tsx`

**Changes Required:**

1. **Update interface** to accept individual column fields instead of rows array:
   ```typescript
   interface ThreeColumnTableProps {
     title?: string | null
     subtitle?: string | null
     firstColumn?: any  // Lexical richText data
     secondColumn?: any // Lexical richText data
     thirdColumn?: any  // Lexical richText data
     columnWidths?: 'f-t-t' | 't-f-t' | 't-t-f' | 'vt-t-f'
   }
   ```

2. **Update component props** destructuring:
   ```typescript
   export const ThreeColumnTable: React.FC<ThreeColumnTableProps> = ({
     title,
     subtitle,
     firstColumn,
     secondColumn,
     thirdColumn,
     columnWidths = 'f-t-t',
   }) => {
   ```

3. **Simplify rendering logic**:
   - Remove the rows mapping
   - Render three columns directly using `serializeLexical`
   - Keep the `getColumnWidthClass` function for responsive widths

4. **New render structure**:
   ```tsx
   return (
     <>
       <div className="col-span-full md:col-span-5 lg:col-span-6">
         <div className="mb-6">
           {title && <Heading level={3}>{title}</Heading>}
           {subtitle && <p>{subtitle}</p>}
         </div>
       </div>
       <div className="col-span-full">
         <div className="flex flex-col lg:flex-row border-t border-black py-4">
           {/* First Column */}
           <div className={`${getColumnWidthClass(0)} px-0 lg:px-4 first:lg:pl-0`}>
             {renderColumn(firstColumn)}
           </div>
           {/* Second Column */}
           <div className={`${getColumnWidthClass(1)} px-0 lg:px-4`}>
             {renderColumn(secondColumn)}
           </div>
           {/* Third Column */}
           <div className={`${getColumnWidthClass(2)} px-0 lg:px-4 last:lg:pr-0`}>
             {renderColumn(thirdColumn)}
           </div>
         </div>
       </div>
     </>
   )
   ```

---

### 3. Files to Delete

- `src/blocks/ThreeColumnTableBlock/RowRowLabel.tsx` (no longer needed)
- `src/blocks/ThreeColumnTableBlock/ColumnRowLabel.tsx` (no longer needed)

---

### 4. Page Components to Update

Update how the block is rendered in all page components that use ThreeColumnTable:

**Files to modify:**
- `src/app/(frontend)/components/BlogPage/BlogPage.tsx`
- `src/app/(frontend)/components/ReportPage/ReportPage.tsx`
- `src/app/(frontend)/components/MMediaPage/MMediaPage.tsx`
- `src/app/(frontend)/components/GrantPage/GrantPage.tsx`
- `src/app/(frontend)/components/UAFPage/UAFPage.tsx`
- `src/app/(frontend)/components/HomePageContent/PageContent.tsx`

**Current rendering:**
```tsx
if (block.blockType === 'threeColumnTableBlock') {
  return (
    <ThreeColumnTable
      title={block.title}
      subtitle={block.subtitle}
      rows={block.rows}
      columnWidths={block.columnWidths}
    />
  )
}
```

**New rendering:**
```tsx
if (block.blockType === 'threeColumnTableBlock') {
  return (
    <ThreeColumnTable
      title={block.title}
      subtitle={block.subtitle}
      firstColumn={block.firstColumn}
      secondColumn={block.secondColumn}
      thirdColumn={block.thirdColumn}
      columnWidths={block.columnWidths}
    />
  )
}
```

---

## Migration Considerations

### Breaking Change Warning
This is a **breaking change** for existing content. Any existing ThreeColumnTableBlock instances with multi-row data will need to be manually updated or migrated.

### Data Migration Options

1. **Manual Migration**: Content editors manually recreate content in the new structure
2. **Payload Migration Script**: Create a migration to convert first row of existing data to new structure
3. **Preserve Old Block**: Optionally keep the old block as `ThreeColumnTableBlockLegacy` if multi-row functionality is still needed

---

## Verification Checklist

- [ ] Config file updated with tabs structure
- [ ] Component updated to accept individual column props
- [ ] RowLabel files deleted
- [ ] All page components updated with new prop names
- [ ] `pnpm dev` runs without errors
- [ ] Can add new ThreeColumnTable block in admin
- [ ] Three tabs visible in admin (First Column, Second Column, Third Column)
- [ ] Content renders correctly on frontend
- [ ] Column widths selector still works
- [ ] Responsive layout works (stacks on mobile)

---

## Summary of File Changes

| File | Action |
|------|--------|
| `src/blocks/ThreeColumnTableBlock/config.ts` | Modify |
| `src/components/ThreeColumnTable/index.tsx` | Modify |
| `src/blocks/ThreeColumnTableBlock/RowRowLabel.tsx` | Delete |
| `src/blocks/ThreeColumnTableBlock/ColumnRowLabel.tsx` | Delete |
| `src/app/(frontend)/components/BlogPage/BlogPage.tsx` | Modify |
| `src/app/(frontend)/components/ReportPage/ReportPage.tsx` | Modify |
| `src/app/(frontend)/components/MMediaPage/MMediaPage.tsx` | Modify |
| `src/app/(frontend)/components/GrantPage/GrantPage.tsx` | Modify |
| `src/app/(frontend)/components/UAFPage/UAFPage.tsx` | Modify |
| `src/app/(frontend)/components/HomePageContent/PageContent.tsx` | Modify |
