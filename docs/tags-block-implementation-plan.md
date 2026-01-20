# Tags Block Implementation Plan

## Overview
New block for RichContentBlock's Lexical editor. Array of text items (max 3 items, 20 chars each). Rendered as comma-bullet separated list joined with ' • '. Left-aligned on desktop/tablet, center-aligned on mobile.

---

## Files to Create (3)

### 1. `src/blocks/TagsBlock/config.ts`
- slug: `tagsBlock`
- Fields:
  - `tags` array (type: text, max: 20 chars)
    - minRows: 0
    - maxRows: 3
    - labels: singular "Tag", plural "Tags"
  - admin description: "Add tags - up to 3 tags, max 20 characters each"
  - Uses TagRowLabel for row labels

### 2. `src/blocks/TagsBlock/TagRowLabel.tsx`
- Custom admin UI row label
- Uses `useRowLabel` hook
- Displays tag text or fallback "Tag 01", "Tag 02", etc.

### 3. `src/components/Tags/index.tsx`
- Props: tags array of strings, blockType?: 'tagsBlock'
- Render:
  - Join tags with ' • ' separator
  - Use `<p className="tag">` for styling
  - Wrapper div: `text-center md:text-left` (center mobile, left desktop/tablet)
  - Return null if no tags

---

## Files to Modify (3)

### `src/blocks/TwoColumnBlock/config.ts`
- Import TagsBlock
- Add to BlocksFeature blocks array

### `src/blocks/RenderBlocks.tsx`
- Import Tags component
- Add `tagsBlock: Tags` to blockComponents map

### `src/components/RichText/serializeRichText.tsx`
- Import Tags component
- Add TagsBlockProps interface
- Add to NodeTypes union
- Add case 'tagsBlock' in switch with:
  - Wrapper div with grid layout classes and spacing logic
  - Check isPrevTags context variable
  - Component rendering with spread props

---

## Context Variables
Add `isPrevTags` variable to track if previous node is tagsBlock for spacing calculation.

---

## Styling Notes
- Use existing `tag` CSS class for text styling
- Responsive alignment:
  - Mobile: `text-center`
  - Desktop/Tablet: `md:text-left`
- Wrapper div padding/margin follows existing block pattern from FancyListBlock, BadgeBlock, PillButtonsBlock

---

## Verification
1. `pnpm dev` - no errors
2. Add Tags block in Rich Text Content Block
3. Verify tags render joined with ' • ' separator
4. Verify center alignment on mobile
5. Verify left alignment on desktop/tablet

