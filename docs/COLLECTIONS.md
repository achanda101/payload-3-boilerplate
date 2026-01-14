# Content Collections Guide

## Overview

This document describes all Payload CMS collections used in the UAF Asia Pacific website. Collections are the primary way to structure and manage content.

## Collection Organization

Collections are organized into three main groups in the admin panel:

1. **Content** - Main content types (pages, blogs, grants, reports)
2. **Media** - Files and assets (images, documents, media)
3. **Supporting** - Document types and user management

## Content Collections

### Pages

**File:** `src/collections/Pages/index.ts`
**Slug:** `pages`
**Admin Path:** `/admin/collections/pages`

General-purpose pages with flexible block-based layouts.

#### Purpose
- Landing pages
- Information pages
- Custom layouts
- About pages
- Contact pages

#### Key Fields
- **Title** - Page title (required, unique)
- **Slug** - URL-friendly identifier (auto-generated)
- **Hero Configuration**
  - Hero title
  - Hero content (rich text)
  - Mascot image selection
  - Background type
  - Hero color
- **Page Sections** - Flexible blocks (see Blocks section)
- **SEO Fields** - Meta title, description, image

#### Available Blocks

All 14 content blocks are available in Pages (see [BLOCKS.md](./BLOCKS.md) for detailed documentation):

- ✅ Rich Content Block
- ✅ Secondary CTA
- ✅ Multi-Column Info Block
- ✅ Grant Card Grid Block
- ✅ Multi-Step Process Block
- ✅ Comparison Block
- ✅ Yellow Card Deck
- ✅ Feature Card
- ✅ Feature Card Accordion
- ✅ Listing Card Deck
- ✅ FAQ Block
- ✅ Pink Puffy CallOut
- ✅ Beige Puffy CallOut
- ✅ Funding Map

#### Features
- ✅ Live preview
- ✅ Draft/Published status
- ✅ Multi-language support
- ✅ Folder organization
- ✅ Trash (soft delete)
- ✅ SEO optimization

#### Access Control
- Create: Authenticated users
- Read: Authenticated or published
- Update: Authenticated users
- Delete: Authenticated users

---

### Grants

**File:** `src/collections/Grants/index.ts`
**Slug:** `grants`
**Admin Path:** `/admin/collections/grants`

Specialized pages for grant programs and opportunities.

#### Purpose
- Grant program descriptions
- Application guidelines
- Eligibility information
- Grant-specific content

#### Key Fields
- **Title** - Grant page title (required, unique)
- **Slug** - URL identifier
- **Page Type** - Grant category/type
- **Grant Card** - Associated grant card reference
- **Hero Configuration**
  - Hero title
  - Hero content
  - Background type
  - Eligibility test selector
- **Grant Sections** - Block-based content
- **SEO Fields**

#### Unique Features
- Grant card relationship
- Eligibility test integration
- Grant-specific page types
- Custom background options

#### Available Blocks

All 14 content blocks (same as Pages collection - see [BLOCKS.md](./BLOCKS.md) for details)

#### Features
- ✅ Live preview
- ✅ Draft/Published status
- ✅ Multi-language support
- ✅ Folder organization
- ✅ Trash (soft delete)
- ✅ SEO optimization

---

### Grant Cards

**File:** `src/collections/GrantCards/index.ts`
**Slug:** `grantCards`
**Admin Path:** `/admin/collections/grantCards`

Summary cards displayed in grant grids and listings.

#### Purpose
- Grant program summaries
- Grid/card displays
- Quick grant information
- Call-to-action cards

#### Key Fields
- **Title** - Card title (required)
- **Description** - Short description
- **Icon/Image** - Visual representation
- **Link** - Associated grant page or external URL
- **Tags** - Categorization
- **Order** - Display order in grids

#### Usage
- Referenced by Grant pages
- Displayed in GrantCardGridBlock
- Used in grant overview sections

---

### Blog

**File:** `src/collections/Blog/index.ts`
**Slug:** `blog`
**Admin Path:** `/admin/collections/blog`

Blog posts and articles with rich content.

#### Purpose
- News and updates
- Articles and stories
- Organization blog
- Featured content

#### Key Fields
- **Title** - Post title (required)
- **Slug** - URL identifier
- **Hero Configuration**
  - Hero title
  - Hero content
  - Featured image
- **Content Blocks** - Flexible block-based layout
- **Published Date**
- **SEO Fields**

#### Features
- ✅ Live preview
- ✅ Draft/Published status
- ✅ Multi-language support
- ✅ Folder organization
- ✅ Trash (soft delete)

---

### Reports

**File:** `src/collections/Reports/index.ts`
**Slug:** `reports`
**Admin Path:** `/admin/collections/reports`

Annual reports, research documents, and organizational reports.

#### Purpose
- Annual reports
- Research publications
- Impact reports
- Organization documents

#### Key Fields
- **Title** - Report title (required)
- **Slug** - URL identifier
- **Year** - Publication year
- **Report Type**
- **Hero Configuration**
- **Content Sections** - Block-based layout
- **Download PDF** - Document reference
- **SEO Fields**

#### Features
- ✅ Live preview
- ✅ Draft/Published status
- ✅ Multi-language support
- ✅ Document downloads
- ✅ Folder organization

---

### MMedia (Multimedia)

**File:** `src/collections/MMedia/index.ts`
**Slug:** `mmedia`
**Admin Path:** `/admin/collections/mmedia`

Multimedia content pages (videos, podcasts, galleries).

#### Purpose
- Video galleries
- Podcast episodes
- Photo galleries
- Media collections

#### Key Fields
- **Title** - Media title (required)
- **Slug** - URL identifier
- **Media Type** - Video, audio, gallery
- **Hero Configuration**
- **Media Embed** - Embedded media
- **Content** - Rich text description
- **SEO Fields**

#### Features
- ✅ Live preview
- ✅ Draft/Published status
- ✅ Multi-language support
- ✅ Embedded media support

---

### Eligibility Tests

**File:** `src/collections/EligibilityTests/index.ts`
**Slug:** `eligibilityTests`
**Admin Path:** `/admin/collections/eligibilityTests`

Interactive eligibility assessment tests for grants.

#### Purpose
- Grant eligibility checks
- Interactive questionnaires
- Assessment forms
- Application screening

#### Key Fields
- **Test Name** - Test identifier (required)
- **Title** - Display title
- **Description**
- **Questions** - Array of questions
  - Question text
  - Answer type (yes/no, multiple choice, text)
  - Scoring/validation
- **Results Configuration**
  - Eligible message
  - Not eligible message
  - Next steps

#### Usage
- Linked from Grant pages
- Embedded in grant hero sections
- Standalone pages

#### Features
- ✅ Live preview
- ✅ Draft/Published status
- ✅ Multi-language support

---

## Media Collections

### MediaCloud

**File:** `src/collections/MediaCloud.ts`
**Slug:** `mediaCloud`
**Admin Path:** `/admin/collections/mediaCloud`

Primary media library for images and visual content.

#### Purpose
- Website images
- Featured images
- Gallery photos
- Thumbnails
- Graphics

#### File Types
- Images: JPG, PNG, WebP, GIF, SVG
- Maximum size: 50MB

#### Features
- ✅ S3 storage integration
- ✅ Automatic image optimization
- ✅ Multiple sizes generated
- ✅ Alt text for accessibility
- ✅ Caption field
- ✅ Folder organization

#### Upload Configuration
```typescript
upload: {
  staticDir: 'media',
  imageSizes: [
    { name: 'thumbnail', width: 400 },
    { name: 'card', width: 768 },
    { name: 'tablet', width: 1024 },
    { name: 'desktop', width: 1920 },
  ],
  mimeTypes: ['image/*'],
}
```

---

### AssetCloud

**File:** `src/collections/AssetCloud.ts`
**Slug:** `assetCloud`
**Admin Path:** `/admin/collections/assetCloud`

Downloadable assets and files.

#### Purpose
- PDF documents
- Presentations
- Spreadsheets
- Templates
- Marketing materials
- Brochures

#### File Types
- Documents: PDF, DOC, DOCX
- Presentations: PPT, PPTX
- Spreadsheets: XLS, XLSX
- Archives: ZIP
- Maximum size: 50MB

#### Features
- ✅ S3 storage integration
- ✅ File metadata
- ✅ Version tracking
- ✅ Folder organization

---

### Documents

**File:** `src/collections/Documents.ts`
**Slug:** `documents`
**Admin Path:** `/admin/collections/documents`

Document library with categorization.

#### Purpose
- Policy documents
- Guidelines
- Forms
- Official documents
- Reference materials

#### Key Fields
- **Title** - Document title
- **Document Type** - Category (via DocTypes)
- **File** - Document file upload
- **Description** - Document summary
- **Publication Date**

#### Features
- ✅ S3 storage integration
- ✅ Type categorization
- ✅ Search integration
- ✅ Folder organization

---

## Supporting Collections

### DocTypes

**File:** `src/collections/DocTypes.ts`
**Slug:** `docTypes`
**Admin Path:** `/admin/collections/docTypes`

Document type definitions.

#### Purpose
- Categorize documents
- Document organization
- Filter/search by type

#### Key Fields
- **Name** - Type name (required, unique)
- **Description**
- **Icon** - Visual identifier

#### Usage
- Referenced by Documents collection
- Document filtering
- Library organization

---

### Users

**File:** `src/collections/Users/index.ts`
**Slug:** `users`
**Admin Path:** `/admin/collections/users`

User management and authentication.

#### Purpose
- Admin users
- Content editors
- Authentication

#### Key Fields
- **Email** - Login email (required, unique)
- **Password** - Encrypted password
- **Name** - User's full name
- **Role** - User permissions
  - Admin
  - Editor
- **Avatar** - Profile image

#### Features
- ✅ Authentication system
- ✅ Role-based access control
- ✅ Password reset
- ✅ Session management

---

## Content Blocks

Content blocks are reusable components that can be added to pages, grants, blog posts, reports, and multimedia content. For comprehensive block documentation, see **[BLOCKS.md](./BLOCKS.md)**.

### Block-Enabled Collections

The following collections support content blocks:

- **Pages** - 14 blocks available
- **Grants** - 14 blocks available
- **Blog** - 14 blocks available
- **Reports** - 14 blocks available
- **MMedia** - 14 blocks available

### Available Blocks

All five collections have access to the same 14 content blocks:

| Block | Purpose | Category |
|-------|---------|----------|
| **Rich Content Block** | Full-featured text editor with embedded media | Content |
| **Secondary CTA** | Call-to-action with 4 design variants | CTA |
| **Multi-Column Info Block** | Multi-column information display | Content |
| **Grant Card Grid Block** | Grid of grant opportunity cards | Card/Grid |
| **Multi-Step Process Block** | Step-by-step process display | Interactive |
| **Comparison Block** | Side-by-side comparisons | Interactive |
| **Yellow Card Deck** | Highlighted information cards | Card/Grid |
| **Feature Card** | Large feature showcase | Card/Grid |
| **Feature Card Accordion** | Collapsible feature cards | Interactive |
| **Listing Card Deck** | Resource/link listings | Card/Grid |
| **FAQ Block** | Accordion-style Q&A | Interactive |
| **Pink Puffy CallOut** | Eye-catching pink callout | Callout |
| **Beige Puffy CallOut** | Warm beige callout | Callout |
| **Funding Map** | Interactive regional statistics | Data Viz |

### Embedded Blocks (within Rich Content Block)

These blocks can only be used within the Rich Content Block:

- **BlockQuote** - Styled quotations
- **YouTube Block** - YouTube video embeds
- **Vimeo Block** - Vimeo video embeds
- **Spotify Track Block** - Spotify embeds
- **SoundCloud Embed Block** - SoundCloud audio embeds

### Unused Blocks

The following blocks exist but are **not currently enabled**:

- 🚫 **CallToAction** - Replaced by Secondary CTA
- 🚫 **Code Block** - Code syntax highlighting
- 🚫 **Content Block** - Replaced by Rich Content Block
- 🚫 **Form Block** - Form builder
- 🚫 **Hero Block** - Hero sections (configured at collection level)
- 🚫 **Single Column Info Block** - Single-column display

### Common Block Use Cases

**For landing pages:**
- Rich Content Block for text
- Secondary CTA for conversions
- Feature Cards for highlights
- Funding Map for impact data

**For grant pages:**
- Multi-Step Process for application steps
- FAQ Block for common questions
- Grant Card Grid for related grants
- Comparison Block for eligibility

**For blog posts:**
- Rich Content Block with embedded media
- Feature Cards for story highlights
- Pink/Beige Puffy CallOuts for emphasis

**For reports:**
- Rich Content Block for report content
- Funding Map for geographic data
- Yellow Card Deck for key findings
- Multi-Column Info Block for data

### Block Documentation

For detailed information about each block including:
- Field configuration
- Design variants
- Usage examples
- Best practices
- Development guidelines

See the comprehensive **[BLOCKS.md](./BLOCKS.md)** documentation.

---

## Common Features

All collections support these common features:

### Draft/Published Workflow
- Save as draft
- Preview before publishing
- Publish/unpublish
- Version history

### Multi-language Support
Configured languages (from `languageOptions.json`):
- English (default)
- Additional languages as configured
- Fallback to English

### Live Preview
Available for:
- Pages
- Blog
- Reports
- Grants
- MMedia

Preview breakpoints:
- Mobile (375x667)
- Tablet (768x1024)
- Desktop (full width)

### Folder Organization
Collections with folders:
- Pages
- Grants
- Blog
- Reports

Benefits:
- Organize content hierarchically
- Better content management
- Easier navigation

### Trash/Soft Delete
Collections with trash:
- Pages
- Grants
- Blog
- Reports

Features:
- Recoverable deletions
- Trash review before permanent deletion
- Restore capability

### SEO Fields
Collections with SEO:
- Pages
- Grants
- Blog
- Reports
- MMedia

SEO fields:
- Meta title
- Meta description
- Meta image
- Social sharing preview

## Revalidation Hooks

Collections with automatic revalidation (ISR - Incremental Static Regeneration):

- **Pages** - `revalidatePage` (src/collections/Pages/hooks/revalidatePage.ts)
- **Grants** - `revalidateGrant` (src/collections/Grants/hooks/revalidateGrant.ts)
- **Blog** - `revalidateBlog` (src/collections/Blog/hooks/revalidateBlog.ts)
- **Reports** - `revalidateReport` (src/collections/Reports/hooks/revalidateReport.ts)
- **MMedia** - `revalidateMMedia` (src/collections/MMedia/hooks/revalidateMMedia.ts)
- **EligibilityTests** - `revalidateTest` (src/collections/EligibilityTests/hooks/revalidateTest.ts)

### How Revalidation Works

When content is saved/published, the hook:
1. Triggers Next.js revalidation
2. Updates the static page
3. Ensures fresh content on frontend

## Access Control Patterns

### authenticated
**File:** `src/access/authenticated.ts`

Used for: Create, Update, Delete operations

Only authenticated users can perform these actions.

### authenticatedOrPublished
**File:** `src/access/authenticatedOrPublished.ts`

Used for: Read operations

Rules:
- Authenticated users can see all content (drafts + published)
- Unauthenticated users can only see published content

## Best Practices

### Content Organization

1. **Use Folders**
   - Group related pages together
   - Create logical hierarchies
   - Easier to find and manage content

2. **Consistent Naming**
   - Use clear, descriptive titles
   - Follow naming conventions
   - Makes content searchable

3. **Content Organization**
   - Use document types for classification
   - Organize content logically
   - Helps with navigation and filtering

### Media Management

1. **Optimize Before Upload**
   - Resize large images before upload
   - Use appropriate formats (WebP for web)
   - Reduces storage and bandwidth costs

2. **Use Descriptive Names**
   - Clear file names
   - Include alt text for accessibility
   - Add captions where relevant

3. **Organize with Folders**
   - Group related media
   - Use consistent folder structure
   - Makes media library manageable

### Content Workflow

1. **Draft First**
   - Save as draft while working
   - Use live preview to check layout
   - Review before publishing

2. **Use Live Preview**
   - Check across breakpoints
   - Verify links and images
   - Ensure proper formatting

3. **SEO Optimization**
   - Fill in meta title and description
   - Use appropriate meta images
   - Review SEO preview

4. **Testing**
   - Test links before publishing
   - Verify media displays correctly
   - Check on multiple devices

## Collection Relationships

```
Pages
├─ References: MediaCloud
└─ Used by: Navigation, Homepage

Grants
├─ References: GrantCards, EligibilityTests, MediaCloud
└─ Used by: GrantCardGridBlock, Navigation

Blog
├─ References: Users, MediaCloud
└─ Used by: Blog listing pages

Reports
├─ References: Documents, DocTypes, MediaCloud
└─ Used by: Report archives

MMedia
├─ References: MediaCloud
└─ Used by: Media galleries

Documents
├─ References: DocTypes, AssetCloud
└─ Used by: Document library, Reports

GrantCards
└─ Referenced by: Grants, GrantCardGridBlock

EligibilityTests
└─ Referenced by: Grants

DocTypes
└─ Referenced by: Documents, Reports

Users
└─ Referenced by: Blog
```

## Related Documentation

- [Blocks Guide](./BLOCKS.md) - Comprehensive block documentation
- [Project Overview](./PROJECT_OVERVIEW.md) - Overall project structure
- [URL Validation](./URL_VALIDATION.md) - Link validation system
- [Deployment](./DEPLOYMENT.md) - Deployment guide
- [Environment Variables](./ENVIRONMENT_VARIABLES.md) - Configuration

## Support

- [Payload CMS Collections Docs](https://payloadcms.com/docs/configuration/collections)
- [Payload Discord](https://discord.gg/payload)
- Project repository issues
