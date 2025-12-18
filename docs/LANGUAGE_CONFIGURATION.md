# Language Configuration Guide

## Overview

This document explains how to add new languages to the locale configuration in the PayloadCMS application.

## Important: Migration Warning

**⚠️ CRITICAL: Do NOT change the `value` field of placeholder entries!**

Changing the `value` field of any language entry (especially placeholders) will trigger a database migration. The `value` field is used as the locale code in the database and changing it will require migrating all existing content.

## Language Configuration File

Language options are stored in: `src/globals/Header/languageOptions.json`

## Currently Active Languages

The following languages are currently configured and active:

### Left-to-Right (LTR) Languages:
- English (`en`)
- Bahasa Indonesia (`bi`)
- Bangla - বাংলা (`bn-IN`)
- Burmese - ဗမာစာ (`br`)
- Mandarin - 中文 (`ch`)
- Khmer - ខ្មែរ (`km`)
- Hindi - हिन्दी (`hi`)
- Malay - Melayu (`ms`)
- Nepali - नेपाली (`ne`)
- Pigdin English (`pcm`)
- Sinhala - සිංහල (`si`)
- Tagalog (`tl`)
- Tamil - தமிழ் (`ta`)
- Thai - ไทย (`th`)
- Vietnamese - Tiếng Việt (`vi`)

### Right-to-Left (RTL) Languages:
- Arabic - العربية (`ar`)
- Dari - دری (`prs-Arab`)
- Pashto - پښتو (`ps-Arab`)
- Urdu - اردو (`ur`)

## Structure

Each language entry has the following fields:

```json
{
  "label": "Language Name",      // Required: English name of the language
  "display": "Native Name",      // Optional: Native language name (for display)
  "value": "locale-code",        // Required: ISO locale code (DO NOT CHANGE for existing entries)
  "dir": "rtl"                   // Optional: Text direction, only needed for right-to-left languages
}
```

## Adding a New Language

### Option 1: Using a Placeholder Entry (RECOMMENDED)

The safest way to add a new language is to replace the `label` and `display` fields of an existing placeholder entry:

1. Find an unused placeholder entry (e.g., `LangPlaceholder1`, `LangPlaceholder2`, etc.)
2. **ONLY** modify the `label` and `display` fields
3. **DO NOT** change the `value` field
4. Optionally, add or remove the `"dir": "rtl"` field as needed (this will NOT trigger migrations)
   - Add `"dir": "rtl"` for right-to-left languages
   - Remove or omit `"dir"` for left-to-right languages

**Example: Adding Filipino**

Before:
```json
{
  "label": "LangPlaceholder1",
  "display": "LangPlaceholder1",
  "value": "lpl1",
  "dir": "rtl"
}
```

After:
```json
{
  "label": "Filipino",
  "display": "Filipino",
  "value": "lpl1"
}
```

Note: We removed the `dir` field because Filipino is a left-to-right language.

### Option 2: Adding a Completely New Entry

If all placeholders are used, you can add a new entry to the array. However, this will require:

1. Running a database migration
2. Updating all existing content with the new locale option

**Only use this option if you understand the implications!**

## Field Descriptions

### `label` (Required)
- The English name of the language
- Used for administrative purposes and in the CMS interface
- Can be changed without triggering migrations

### `display` (Optional)
- The native name of the language (how it's displayed to users)
- If omitted, the `label` will be used for display
- Can be changed without triggering migrations
- Should use the native script (e.g., "العربية" for Arabic, "中文" for Mandarin)

### `value` (Required)
- The locale code used in the database
- **⚠️ NEVER change this for existing entries!**
- For placeholders, use the existing value (e.g., "lpl1", "lpl2", etc.)
- For new languages (not recommended), use standard ISO 639-1 codes (e.g., "en", "fr", "es")

### `dir` (Optional)
- Text direction for the language
- Only required for right-to-left (RTL) languages
- Possible values: `"rtl"` (right-to-left)
- Omit this field for left-to-right languages
- **Can be added or removed without triggering migrations** - This means any placeholder can be used for either LTR or RTL languages

## RTL Languages

For right-to-left languages like Arabic, Persian, Urdu, Hebrew, etc., always include:

```json
{
  "label": "Arabic",
  "display": "العربية",
  "value": "ar",
  "dir": "rtl"
}
```

## Available Placeholders

The following placeholder values are available for use:

**Note:** Any placeholder can be used for either LTR or RTL languages. Simply add `"dir": "rtl"` for RTL languages or omit it for LTR languages. The `"dir"` field can be added or removed without triggering migrations.

### Currently Configured Without `dir` (suitable for LTR):
- `lpl5` through `lpl15` - Ready for left-to-right languages

### Currently Configured With `"dir": "rtl"` (suitable for RTL):
- `lpl1` through `lpl4` - Pre-configured for right-to-left languages
- `lpl16` - Pre-configured for right-to-left languages

**Remember:** You can add `"dir": "rtl"` to any LTR placeholder or remove it from any RTL placeholder as needed.

## Examples

### Example 1: Adding Swahili (using placeholder)

```json
{
  "label": "Swahili",
  "display": "Kiswahili",
  "value": "lpl5"
}
```

### Example 2: Adding Hebrew (RTL language using placeholder)

```json
{
  "label": "Hebrew",
  "display": "עברית",
  "value": "lpl6",
  "dir": "rtl"
}
```

### Example 3: Adding Korean (using placeholder)

```json
{
  "label": "Korean",
  "display": "한국어",
  "value": "lpl7"
}
```

### Example 4: Converting an RTL placeholder to LTR language

If you need to use an RTL placeholder (like `lpl1`) for an LTR language (like Japanese), simply remove the `"dir"` field:

Before:
```json
{
  "label": "LangPlaceholder1",
  "display": "LangPlaceholder1",
  "value": "lpl1",
  "dir": "rtl"
}
```

After:
```json
{
  "label": "Japanese",
  "display": "日本語",
  "value": "lpl1"
}
```

### Example 5: Converting an LTR placeholder to RTL language

If you need to use an LTR placeholder (like `lpl5`) for an RTL language (like Farsi), simply add the `"dir": "rtl"` field:

Before:
```json
{
  "label": "LangPlaceholder5",
  "display": "LangPlaceholder5",
  "value": "lpl5"
}
```

After:
```json
{
  "label": "Farsi",
  "display": "فارسی",
  "value": "lpl5",
  "dir": "rtl"
}
```

## Testing Your Changes

After modifying the language configuration:

1. Restart the development server
2. Check the language selector in the frontend
3. Verify that the language displays correctly
4. Test that RTL languages render properly (if applicable)
5. Ensure no database migrations were triggered

## Common Mistakes to Avoid

❌ **DON'T:**
- Change the `value` field of existing entries
- Remove placeholder entries that might be in use
- Add duplicate `value` codes
- Forget to add `"dir": "rtl"` for RTL languages

✅ **DO:**
- Only modify `label` and `display` fields for placeholders
- Add or remove the `"dir"` field as needed (safe, won't trigger migrations)
- Use native scripts for the `display` field
- Use any placeholder for any language type (just adjust the `"dir"` field)
- Test thoroughly after making changes
- Document which placeholders are in use

## Questions or Issues?

If you need to change a locale code or have questions about language configuration, consult with the development team before making changes.
