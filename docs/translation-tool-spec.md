# Translation Tool Specification

## Overview
A dedicated translation interface for UAF Asia Pacific CMS that allows translators to work efficiently without navigating the complex Payload admin UI.

## Access & Authentication
- **URL**: `/translate`
- **Authentication**: Email + password login
- **Users**: Payload users with "translator" role (to be created)
- **Session**: Uses Payload's existing auth system

## Core Features

### 1. Collection & Document Selection
- Dropdown to select collection (Pages, Blog, Grants, Reports, MMedia, etc.)
- List view of all documents in selected collection
- Search/filter documents by title or slug
- Show translation status indicators (e.g., "5/10 languages complete")

### 2. Language Selector
- Dropdown showing all configured languages
- English (source) is always shown on left side
- Selected language appears on right side for editing
- Show completion percentage per language

### 3. Side-by-Side Editor
```
┌─────────────────────────┬─────────────────────────┐
│  English (Source)       │  Hindi (Translation)    │
├─────────────────────────┼─────────────────────────┤
│  Hero Title             │  Hero Title             │
│  [English text here]    │  [Hindi input here]     │
│                         │                         │
│  Hero Subtitle          │  Hero Subtitle          │
│  [English text here]    │  [Hindi input here]     │
│                         │                         │
│  Rich Content Block     │  Rich Content Block     │
│  [Rendered preview]     │  [Rich text editor]     │
│                         │                         │
│  FAQ Items (Array)      │  FAQ Items (Array)      │
│  [Nested fields]        │  [Nested inputs]        │
└─────────────────────────┴─────────────────────────┘
```

### 4. Field Handling

**Text/Textarea Fields:**
- Left: Read-only English text
- Right: Editable textarea for translation

**Rich Text (Lexical) Fields:**
- Left: Rendered HTML preview of English content
- Right: Full Lexical editor for translation
- Preserve formatting, links, lists, etc.

**Array Fields (FAQ, buttons, cards, etc.):**
- Show array items in collapsible sections
- Each array item expands to show nested fields
- Maintain array order from English version

**Non-localized Fields:**
- Not shown in translation interface (images, slugs, etc.)
- Only show fields with `localized: true`

### 5. Save & Progress
- "Save Progress" button (saves without publishing)
- "Save & Next Document" button
- Auto-save every 2 minutes
- Visual indicator when changes are unsaved
- Success/error notifications

### 6. Navigation
- "Back to Document List" button
- "Previous/Next Document" navigation
- Keyboard shortcuts (Ctrl+S to save, Ctrl+→ for next doc)

## Technical Implementation

### File Structure
```
src/app/(frontend)/translate/
├── page.tsx                    # Main translation UI
├── login/page.tsx             # Login page
├── components/
│   ├── CollectionSelector.tsx # Collection dropdown
│   ├── DocumentList.tsx       # Document list/search
│   ├── LanguageSelector.tsx   # Language picker
│   ├── TranslationEditor.tsx  # Side-by-side editor
│   ├── FieldRenderer.tsx      # Renders different field types
│   └── ProgressIndicator.tsx  # Shows completion status
└── layout.tsx                 # Auth check wrapper
```

### API Routes
```
src/app/api/translate/
├── documents/route.ts         # GET list of documents
├── [id]/route.ts             # GET/PATCH single document
└── progress/route.ts         # GET translation progress stats
```

### Data Flow
1. User logs in with email/password
2. Select collection → fetch all documents via Payload API
3. Select document → fetch with `?locale=en` and `?locale={selected}`
4. Render side-by-side comparison
5. On save → PATCH to `/api/{collection}/{id}?locale={selected}`
6. Update progress tracking

### Access Control
- Create new Payload role: `translator`
- Translators can read all published content
- Translators can update localized fields only
- No access to delete, create new documents, or modify images/structure

### Rich Text Handling
- Use Payload's Lexical editor component
- Extract from `@payloadcms/richtext-lexical`
- Initialize with English content structure (read-only left side)
- Allow full editing on right side
- Preserve node structure, only allow text changes

### Progress Tracking
Store in Payload (new global or collection):
```typescript
{
  documentId: string
  collection: string
  language: string
  completedFields: string[]
  lastUpdated: Date
  completedBy: User
}
```

## UI Design Principles
- Clean, minimal interface
- Focus on content, not CMS complexity
- Mobile-responsive for tablet translators
- High contrast for readability
- Clear visual separation between source and translation

## Future Enhancements (v2)
- AI-assisted translation suggestions
- Translation memory (reuse previous translations)
- Glossary/term management
- Bulk operations (translate multiple documents)
- Export/import translations (CSV/JSON)
- Version comparison (see what changed in English)
- Comments/notes on translations

## Security Considerations
- Session-based authentication via Payload
- CSRF protection on all mutations
- Rate limiting on save operations
- Validate user has translator role
- Audit log of all translation changes
