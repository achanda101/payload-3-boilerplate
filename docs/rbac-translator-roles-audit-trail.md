# RBAC Translator Roles & Audit Trail Implementation

**Date:** 2026-02-16
**Status:** Implemented, Pending Migration
**Related Files:** See [Files Changed](#files-changed) section

## Overview

This document describes the implementation of role-based access control (RBAC) for translators with language-specific permissions and a comprehensive audit trail system across all content collections and the Homepage global.

## Features Implemented

### 1. Translator Role with Language Assignment

A new **Translator** user role has been added to the system with global language assignment capabilities.

**How It Works:**
- Translators are assigned specific languages they can work with (e.g., Hindi, Nepali, Bahasa)
- When editing content, translators can only modify content in their assigned languages
- The system checks the current locale (`req.locale`) against the user's `assignedLanguages` array
- Admins, Editors, and Writers retain full access to all languages

**Supported Languages (19 total):**
- English (en)
- Hindi (hi)
- Nepali (ne)
- Bahasa Indonesia (id)
- Khmer (km)
- Burmese (my)
- Filipino (fil)
- Thai (th)
- Vietnamese (vi)
- Bengali (bn)
- Sinhala (si)
- Tamil (ta)
- Tetum (tet)
- Urdu (ur)
- Arabic (ar)
- Dzongkha (dz)
- Pashto (ps)
- Dari (fa-AF)
- Chinese (zh)

### 2. Delete Restrictions

Translators are prevented from deleting any content across all collections.

**Rationale:**
- Deletion is a destructive operation that affects all language versions
- Only Admins, Editors, and Writers should have delete permissions
- Translators focus on content translation and editing, not content management

### 3. Audit Trail

Every document now tracks who created it and who last updated it.

**Fields Added:**
- `createdBy` - Relationship to Users, auto-populated on document creation
- `updatedBy` - Relationship to Users, auto-populated on every save

**Display:**
- Both fields appear in the admin sidebar (read-only)
- Both fields are included in list view columns for quick reference
- Fields are automatically populated via `beforeChange` hooks

## Access Control Matrix

### Collections (7 content types)

| Collection | Create | Read | Update | Delete |
|-----------|--------|------|--------|--------|
| **Access Rule** | `authenticated` | `authenticatedOrPublished` | `translatorLanguageAccess` | `noDeleteForTranslators` |
| **Admin** | ✅ | ✅ | ✅ | ✅ |
| **Editor** | ✅ | ✅ | ✅ | ✅ |
| **Writer** | ✅ | ✅ | ✅ | ✅ |
| **Translator** | ✅ | ✅ | ✅ (assigned languages only) | ❌ |
| **Public** | ❌ | ✅ (published only) | ❌ | ❌ |

### Homepage Global

| Operation | Access Rule | Admin | Editor | Writer | Translator |
|-----------|-------------|-------|--------|--------|-----------|
| **Read** | `authenticatedOrPublished` | ✅ | ✅ | ✅ | ✅ |
| **Update** | `translatorLanguageAccess` | ✅ | ✅ | ✅ | ✅ (assigned languages only) |

**Note:** Globals don't have create/delete operations since they're singleton documents.

## Technical Implementation

### Access Control Functions

#### `translatorLanguageAccess.ts`

Located at: `src/access/translatorLanguageAccess.ts`

```typescript
import type { Access } from 'payload'

export const translatorLanguageAccess: Access = ({ req: { user, locale } }) => {
  // Deny access if no user
  if (!user) return false

  // Full access for admin, editor, and writer roles
  if (user.role === 'admin' || user.role === 'editor' || user.role === 'writer') {
    return true
  }

  // Language-restricted access for translators
  if (user.role === 'translator') {
    const currentLocale = locale || 'en'
    const assignedLanguages = user.assignedLanguages || []
    return assignedLanguages.includes(currentLocale)
  }

  return false
}
```

**Logic:**
1. Checks if user is authenticated
2. Grants full access to admin/editor/writer roles
3. For translators, checks if current `req.locale` is in their `assignedLanguages`
4. Denies access if no match

#### `noDeleteForTranslators.ts`

Located at: `src/access/noDeleteForTranslators.ts`

```typescript
import type { Access } from 'payload'

export const noDeleteForTranslators: Access = ({ req: { user } }) => {
  // Deny access if no user
  if (!user) return false

  // Allow delete for admin, editor, and writer
  if (user.role === 'admin' || user.role === 'editor' || user.role === 'writer') {
    return true
  }

  // Deny delete for translators
  if (user.role === 'translator') {
    return false
  }

  return false
}
```

**Logic:**
1. Checks if user is authenticated
2. Grants delete access to admin/editor/writer roles
3. Explicitly denies delete access to translators
4. Denies access if no match

### User Collection Changes

Located at: `src/collections/Users/index.ts`

**Added Fields:**

1. **Translator Role Option:**
```typescript
{
  name: 'role',
  type: 'select',
  options: [
    { label: 'Admin', value: 'admin' },
    { label: 'Editor', value: 'editor' },
    { label: 'Writer', value: 'writer' },
    { label: 'Translator', value: 'translator' }, // NEW
  ],
  defaultValue: 'editor',
}
```

2. **Language Assignment Field:**
```typescript
{
  name: 'assignedLanguages',
  type: 'select',
  hasMany: true,
  options: [
    { label: 'English', value: 'en' },
    { label: 'Hindi', value: 'hi' },
    { label: 'Nepali', value: 'ne' },
    // ... 16 more languages
  ],
  admin: {
    description: 'Languages this user can edit (only applicable for Translator role)',
    condition: (data) => data?.role === 'translator',
  },
}
```

### Audit Trail Implementation

**Pattern Applied to All Collections:**

```typescript
{
  name: 'createdBy',
  type: 'relationship',
  relationTo: 'users',
  admin: {
    position: 'sidebar',
    description: 'User who created this [item]',
    readOnly: true,
  },
  hooks: {
    beforeChange: [
      ({ req, operation, value }) => {
        if (operation === 'create' && !value && req.user) {
          return req.user.id
        }
        return value
      },
    ],
  },
},
{
  name: 'updatedBy',
  type: 'relationship',
  relationTo: 'users',
  admin: {
    position: 'sidebar',
    description: 'User who last updated this [item]',
    readOnly: true,
  },
  hooks: {
    beforeChange: [
      ({ req, value }) => {
        if (req.user) {
          return req.user.id
        }
        return value
      },
    ],
  },
}
```

**Key Features:**
- Auto-population via `beforeChange` hooks
- Read-only display in admin sidebar
- Relationship to Users collection (can be populated to show user details)
- `createdBy` only sets on create operation
- `updatedBy` sets on every save operation

## Affected Collections & Globals

### Content Collections (7)

All collections have full RBAC + audit trail:

1. **Pages** (`src/collections/Pages/index.ts`)
2. **Grants** (`src/collections/Grants/index.ts`)
3. **GrantCards** (`src/collections/GrantCards/index.ts`)
4. **Blog** (`src/collections/Blog/index.ts`)
5. **Reports** (`src/collections/Reports/index.ts`)
6. **EligibilityTests** (`src/collections/EligibilityTests/index.ts`)
7. **MMedia** (`src/collections/MMedia/index.ts`)

### Globals (1)

1. **Homepage** (`src/globals/Homepage/config.ts`)
   - Update access: `translatorLanguageAccess`
   - Audit trail: `createdBy` and `updatedBy`
   - No delete access (globals are singletons)

### Other Globals (Not Modified)

These globals retain their original access control:
- **Header** - Uses `canUpdateUser`
- **Footer** - Uses `canUpdateUser`
- **Navigation** - Uses `canUpdateUser`
- **ContactInfo** - Uses `canUpdateUser`

**Rationale:** These are structural/configuration globals that don't require language-specific restrictions.

## Files Changed

### New Files Created

1. `src/access/translatorLanguageAccess.ts` - Language-based update access
2. `src/access/noDeleteForTranslators.ts` - Delete prevention for translators

### Modified Files

**Collections:**
1. `src/collections/Users/index.ts` - Added translator role and language assignment
2. `src/collections/Pages/index.ts` - Access control + audit trail
3. `src/collections/Grants/index.ts` - Access control + audit trail
4. `src/collections/GrantCards/index.ts` - Access control + audit trail
5. `src/collections/Blog/index.ts` - Access control + audit trail
6. `src/collections/Reports/index.ts` - Access control + audit trail
7. `src/collections/EligibilityTests/index.ts` - Access control + audit trail
8. `src/collections/MMedia/index.ts` - Access control + audit trail

**Globals:**
9. `src/globals/Homepage/config.ts` - Access control + audit trail

**Admin List View:**
All collections updated `defaultColumns` to include `createdBy` and `updatedBy`:

```typescript
admin: {
  defaultColumns: ['title', 'createdBy', 'updatedBy', '_status', 'folder'],
}
```

## User Workflow

### Creating a Translator User

1. **Admin creates new user:**
   - Navigate to Users collection
   - Click "Create New"
   - Fill in email and password
   - Select "Translator" role
   - Select assigned languages (e.g., Hindi, Nepali)
   - Save

2. **Translator logs in:**
   - Sees only content they can edit based on current locale
   - Can switch between assigned languages
   - Cannot access content in unassigned languages
   - Cannot delete any content

### Editing Content as Translator

**Example: Hindi Translator editing a Page**

1. Login as translator with Hindi assigned
2. Navigate to Pages collection
3. Select a page
4. **Switch to Hindi locale** in the locale selector
5. Page becomes editable (fields unlock)
6. Make changes and save
7. `updatedBy` field automatically updates to translator's user record

**If translator tries to edit in unassigned language:**
1. Switch to English locale (not assigned)
2. Page becomes read-only (fields locked)
3. Save button disabled

### Audit Trail Visibility

**In List View:**
- `createdBy` and `updatedBy` columns show user names
- Quick visibility of who worked on each document

**In Document View:**
- Sidebar shows creator and last editor
- Read-only fields (cannot be manually changed)
- Populated user details available via relationship

## Migration Steps

**Status:** Schema changes implemented, database migration pending

### Required Commands

```bash
# 1. Regenerate TypeScript types
pnpm generate:types

# 2. Create migration file
pnpm payload migrate:create add_translator_access_and_audit_trail

# 3. Run migration
pnpm payload migrate

# 4. Restart development server
pnpm dev
```

### What the Migration Does

1. Adds `role='translator'` option to Users collection
2. Adds `assignedLanguages` field to Users collection
3. Adds `createdBy` field to all 7 collections + Homepage global
4. Adds `updatedBy` field to all 7 collections + Homepage global
5. Updates existing access control rules in database schema

### Post-Migration Verification

After running migrations:

1. **Verify User Fields:**
   - Create a new user
   - Confirm "Translator" appears in role dropdown
   - Select translator role
   - Confirm "Assigned Languages" field appears
   - Select languages and save

2. **Verify Access Control:**
   - Login as translator
   - Switch to assigned language → content editable
   - Switch to unassigned language → content read-only
   - Try to delete content → should be prevented

3. **Verify Audit Trail:**
   - Create new page → check `createdBy` in sidebar
   - Edit existing page → check `updatedBy` updates
   - View list → check columns display correctly

## Testing Scenarios

### Test 1: Language-Based Access

**Setup:**
- Create translator user with Hindi and Nepali assigned
- Create a test page

**Expected Behavior:**
- Switch to Hindi → page editable ✅
- Switch to Nepali → page editable ✅
- Switch to English → page read-only ✅
- Switch to Thai → page read-only ✅

### Test 2: Delete Restriction

**Setup:**
- Login as translator
- Navigate to any collection

**Expected Behavior:**
- Delete button hidden/disabled ✅
- Cannot delete via API ✅
- Can still create and update ✅

### Test 3: Audit Trail

**Setup:**
- Create page as Admin
- Edit page as Translator

**Expected Behavior:**
- `createdBy` shows Admin user ✅
- `updatedBy` shows Translator user ✅
- Both fields read-only ✅
- List view shows both users ✅

### Test 4: Role Hierarchy

**Setup:**
- Create users with all roles (Admin, Editor, Writer, Translator)

**Expected Behavior:**
- Admin: Full access all languages ✅
- Editor: Full access all languages ✅
- Writer: Full access all languages ✅
- Translator: Restricted to assigned languages ✅

## Troubleshooting

### Issue: Translator can't edit any content

**Possible Causes:**
1. No languages assigned to translator user
2. Editing in a language not assigned to translator
3. Migration not run

**Solutions:**
1. Check Users collection → edit translator → verify `assignedLanguages` is populated
2. Switch to assigned language using locale selector
3. Run migrations: `pnpm payload migrate`

### Issue: Audit trail fields not populating

**Possible Causes:**
1. Migration not run
2. User not authenticated when creating/editing
3. Hook not executing

**Solutions:**
1. Run migrations: `pnpm payload migrate`
2. Ensure user is logged in when making changes
3. Check server logs for hook errors

### Issue: Delete button still visible for translators

**Possible Causes:**
1. Migration not run
2. Caching issue in admin UI
3. Access control not applied

**Solutions:**
1. Run migrations: `pnpm payload migrate`
2. Hard refresh admin panel (Cmd+Shift+R / Ctrl+Shift+R)
3. Verify `delete: noDeleteForTranslators` in collection config

## Future Enhancements

### Potential Improvements

1. **Per-Document Translator Assignment:**
   - Assign specific translators to specific documents
   - More granular control than global language assignment
   - **Trade-off:** More complex access control logic

2. **Translation Status Tracking:**
   - Track which languages have been translated
   - Mark translations as "needs review" or "approved"
   - Workflow states for translation process

3. **Translator Notifications:**
   - Notify translators when new content is added
   - Alert when content changes in source language
   - Translation assignment system

4. **Translation Analytics:**
   - Track translation completion rates
   - Identify untranslated content
   - Monitor translator activity

5. **Bulk Language Operations:**
   - Assign multiple translators to a language
   - Copy content across languages
   - Batch translation imports

## Related Documentation

- [Language Configuration](./LANGUAGE_CONFIGURATION.md) - Multi-language setup
- [Unified Locale Routing](./unified-locale-routing.md) - URL structure for locales
- [Collections Overview](./COLLECTIONS.md) - All collection schemas
- [Deployment Guide](./DEPLOYMENT.md) - Production deployment steps

## Version History

| Date | Version | Changes |
|------|---------|---------|
| 2026-02-16 | 1.0 | Initial implementation |

## Summary

The RBAC translator roles and audit trail implementation provides:

✅ **Role-Based Access Control** - Translators restricted to assigned languages
✅ **Delete Prevention** - Translators cannot delete content
✅ **Audit Trail** - Full tracking of who created and edited content
✅ **Scalable** - Supports 19 languages across 7 collections + Homepage
✅ **User-Friendly** - Automatic population, sidebar display, list view columns
✅ **Secure** - Server-side access control, cannot be bypassed client-side

This system enables the organization to safely delegate translation work to specialized translators while maintaining content integrity and full audit visibility.
