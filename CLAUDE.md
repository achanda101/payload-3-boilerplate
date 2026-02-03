# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Urgent Action Fund Asia Pacific (UAF A&P) Website** - A production-ready Payload CMS V3 + Next.js 15 full-stack application that serves as a grants/funding information portal. The project uses PostgreSQL for the database, S3 for media storage, and is optimized for Railway deployment.

**Tech Stack:**
- Payload CMS 3.70.0 (headless CMS backend)
- Next.js 15.4.10 (full-stack framework)
- PostgreSQL (database)
- React 19.2.1 + TypeScript
- Tailwind CSS + Shadcn UI components
- GraphQL + REST APIs

## Essential Commands

### Development
```bash
pnpm dev                    # Start dev server (localhost:3000)
pnpm build                  # Build for production (runs migrations first)
pnpm start                  # Start production server
pnpm build:prod            # Build + start production (full build cycle)
```

### Code Quality
```bash
pnpm lint                   # Run ESLint on entire codebase
pnpm lint:fix              # Run ESLint with auto-fixes
```

### Database & Payload
```bash
pnpm payload               # Run Payload CLI commands
pnpm payload migrate       # Run pending migrations
pnpm generate:types        # Regenerate TypeScript types from schema
pnpm generate:importmap    # Generate Payload import map
```

### Utilities
```bash
pnpm install               # Install dependencies (pnpm)
pnpm ii                    # Install with --ignore-workspace flag
pnpm reinstall             # Clean reinstall (removes node_modules & lock)
```

### Database Setup (Local Development)
1. Install PostgreSQL locally
2. Create a database: `createdb <your-db-name>`
3. Copy `.env.example` to `.env`
4. Set `DATABASE_URI=postgres://postgres:postgres@localhost:5432/<your-db-name>`
5. Set `PAYLOAD_SECRET` to any secure string
6. Run `pnpm dev` - migrations run automatically

## Project Architecture

### High-Level Structure

This is a **co-located monolithic application** where Payload CMS backend and Next.js frontend are in a single repository. The architecture maintains logical separation:

- **Admin UI**: `/admin/*` (Payload's auto-generated admin panel)
- **Frontend Website**: `/*` (Next.js App Router pages)
- **API Routes**: `/api/*` (Next.js route handlers + Payload's GraphQL/REST)

### Core Directories

**Backend (Payload CMS)**
- `src/collections/` - Content type definitions (Pages, Grants, Blog, Reports, Users, etc.)
  - Each collection: schema config, access control, hooks for revalidation
  - Example: Pages can contain 38+ different block types
- `src/globals/` - Global editable config (Header, Footer, Navigation, ContactInfo, Homepage)
- `src/blocks/` - 38+ reusable content blocks (HeroBlock, FeatureCard, RichContent, FAQ, etc.)
  - Each block: `config.ts` (schema), `Component.tsx` (renderer)
- `src/fields/` - Custom reusable field definitions (link, slug, radio fields)
- `src/plugins/` - Enabled Payload plugins (form-builder, search, SEO, redirects)
- `src/access/` - Access control rules (authenticated, published, role-based)
- `src/migrations/` - Database migration files
- `src/payload.config.ts` - Main Payload configuration (collections, globals, plugins)

**Frontend (Next.js)**
- `src/app/(frontend)/` - Public website routes (App Router)
  - `[slug]/page.tsx` - Dynamic routing for Pages collection
  - `blog/[slug]/page.tsx` - Blog collection routes
  - `grants/[slug]/page.tsx` - Grants collection routes
  - `reports/[slug]/page.tsx` - Reports collection routes
  - `grantcards/`, `mmedia/` - Other collection routes
- `src/components/` - 54+ React components (UI primitives, domain-specific components)
  - `ui/` - Shadcn UI components (Radix-based)
  - Naming: `XyzComponent.tsx` or `Xyz/index.tsx`
- `src/providers/` - React context providers (Theme, Language, Header)
- `src/utilities/` - Helper functions (data fetching, URL handling, metadata generation)
- `src/styles/` - Global CSS (Tailwind config + custom styles)

**Type Safety**
- `src/payload-types.ts` - Auto-generated TypeScript types (~13k lines)
  - **Never edit manually** - regenerate with `pnpm generate:types`
  - Provides full type safety for collections, blocks, globals

### Key Architectural Patterns

#### 1. **Block-Based Content Architecture**

Pages are composed of reusable blocks. Each block has two parts:

```
src/blocks/HeroBlock/
├── config.ts              # Payload schema definition
└── Component.tsx          # React renderer

// In Collections:
{
  blockType: 'hero',
  title: 'Hero Section',
  subtitle: 'Welcome',
  image: { ... }
}

// Rendered via:
<RenderBlocks blocks={page.layout} />  // RenderBlocks.tsx handles mapping
```

**Supported Blocks:**
HeroBlock, RichContentBlock, FeatureCardAccordion, GrantCardGridBlock, FaqBlock, CallToActionBlock, FormBlock, MultiStepProcessBlock, ResourceGallery, ResourceFeatureCard, PillarCard, TestimonialCardDeck, YellowCardDeck, and 24+ more.

#### 2. **Content Routing Strategy**

Each collection has its own dedicated route:
- `[slug]/page.tsx` → Pages collection
- `blog/[slug]/page.tsx` → Blog collection
- `grants/[slug]/page.tsx` → Grants collection
- `reports/[slug]/page.tsx` → Reports collection

This separation provides clear URL structure and collection-specific logic for each content type.

#### 3. **Flexible Link Field**

A reusable custom field (`src/fields/link.ts`) that supports:
- Internal links (relationships to Pages, Grants, Reports, Docs)
- External URLs
- Email links (mailto:)
- Button styling (pill solid/outline, arrow, download icon)

Used throughout CTAs, navigation, buttons.

#### 4. **Collection-Scoped Revalidation**

Each collection uses hooks to invalidate Next.js ISR cache after changes:

```typescript
// src/collections/Pages/index.ts
hooks: {
  afterChange: [revalidatePage],
  afterDelete: [revalidatePage]
}

// src/collections/Pages/hooks/revalidatePage.ts
import { revalidateTag } from 'next/cache'
revalidateTag('pages')  // Triggers ISR update
```

Collections with revalidation: Pages, Grants, Blog, Reports, MMedia, EligibilityTests, Globals (Header, Footer, etc.)

#### 5. **Access Control (RBAC)**

Payload uses simple access control functions:

```typescript
// Authenticated users OR published content visible to all
access: { read: authenticatedOrPublished }

// Only authenticated users
access: { read: authenticated }
```

Files: `src/access/authenticated.ts`, `src/access/authenticatedOrPublished.ts`, `src/access/anyone.ts`

#### 6. **Live Preview Integration**

Collections (Pages, Blog, Reports, Grants, MMedia) have live preview enabled:
- Shows draft changes in real-time
- Responsive breakpoints: Mobile (375px), Tablet (768px)
- Accessible at `/next/preview` route

#### 7. **Localization/Multi-Language Support**

- Fields marked `localized: true` in configs support multiple languages
- Language options defined in: `src/globals/Header/languageOptions.json`
- Frontend language context: `src/providers/LanguageContext.tsx`
- RTL support configured for right-to-left languages

#### 8. **SEO & Metadata**

All pages are SEO-optimized:
- Collections use `@payloadcms/plugin-seo`
- Page metadata generated dynamically: `src/utilities/generateMeta.ts`
- Uses Next.js Metadata API for proper head tags
- JSON-LD schema support for rich snippets

#### 9. **Generated Types**

`src/payload-types.ts` is auto-generated and provides complete type safety:
- Collection types: `Page`, `Grant`, `Blog`, `User`, etc.
- Block types: `HeroBlock`, `FeatureCard`, etc.
- Global types: `Header`, `Footer`, `Navigation`
- Regenerate with: `pnpm generate:types`

Never manually edit this file.

## Collection Information

### Content Collections

| Collection | Purpose | Features |
|-----------|---------|----------|
| **Pages** | Main website pages | Blocks, SEO, multi-language, draft preview |
| **Grants** | Grant program pages | Eligibility info, location data, linked cards |
| **GrantCards** | Metadata for grant cards | Used in GrantCardGridBlock |
| **Blog** | Articles/news posts | Author, categories, featured images |
| **Reports** | Downloadable reports | PDF links, publication dates, summary |
| **EligibilityTests** | Interactive quizzes | Question/answer structure, scoring |
| **MMedia** | Multimedia resources | Documents, media files, captions |
| **Documents** | File management | PDF uploads, metadata |
| **Users** | User accounts | Auth, roles (admin, editor), comments |

### Global Configurations

Global documents are fully editable in admin and used across the site:
- **Header**: Logo, language selector, search config
- **Footer**: Links, contact info, social links
- **Navigation**: Main site navigation structure
- **Homepage**: Homepage-specific block configuration
- **ContactInfo**: Global contact details (email, phone, address)

Access in code:
```typescript
import { payload } from '@payload-config'
const header = await payload.globals.findOne({ slug: 'header' })
```

## Working with Components

### Naming Conventions

- **Directory-based**: `src/components/FeatureCard/index.tsx`
- **File-based**: `src/components/FeatureCard.tsx` (for simple components)
- **Client components**: Use `'use client'` pragma at top
- **Server components**: Default (no pragma)

### Common Patterns

**Data Props from Payload:**
```typescript
// Page component receives full data from Payload
export default function PageComponent({ blog }: { blog: Blog }) {
  // Type-safe access to blog fields
  return <h1>{blog.title}</h1>
}
```

**Block Components:**
```typescript
// Block components receive their block data
export function HeroBlock({ title, subtitle, image }: HeroBlock) {
  return <section>{title}</section>
}
```

**UI Components (Shadcn-based):**
- Located in `src/components/ui/`
- Radix UI components styled with Tailwind
- Examples: Button, Accordion, Dialog, Select, Tabs

## CSS & Styling

- **Framework**: Tailwind CSS 3.4.16
- **Config**: `tailwind.config.ts`
- **Global styles**: `src/styles/globals.css`
- **Component libraries**: Shadcn UI (Radix-based) + custom components
- **Animations**: `tailwindcss-animate` plugin

Tailwind classes used throughout - no global CSS files except for base styles and Lexical editor styling.

## Database & Migrations

### Running Migrations

Migrations run automatically on `pnpm dev` and `pnpm build`. To create a new migration:

```bash
pnpm payload migrate:create <name>
```

### Migration Files Location

`src/migrations/YYYYMMDD_HHMMSS_*.ts`

Examples:
- `20260119_131855_minimalcardgallery.ts` - Added MinimalCardGallery block
- `20260114_104835_populateresourcefeatcardandgallery.ts` - Populated new fields

Migrations are auto-run on startup.

## Environment Configuration

Create `.env` file from `.env.example`:

```env
# Required
DATABASE_URI=postgres://user:password@host:5432/dbname
PAYLOAD_SECRET=any-secure-random-string
NEXT_PUBLIC_SERVER_URL=http://localhost:3000  # No trailing slash

# Optional (for local development)
S3_ENABLED=false                # Set to true for S3 in production
NEXT_PUBLIC_SHOW_COLUMN_INDICATORS=false
NODE_ENV=development
DEMO_EMAIL=demo@example.com
DEMO_PASSWORD=demopassword

# S3 (for production)
S3_ENDPOINT=your-s3-endpoint
S3_BUCKET=your-bucket
S3_REGION=your-region
S3_ACCESS_KEY_ID=your-key
S3_SECRET_ACCESS_KEY=your-secret
```

## Key File Locations

- **Payload Config**: `src/payload.config.ts`
- **Block Renderer**: `src/blocks/RenderBlocks.tsx`
- **Dynamic Route**: `src/app/(frontend)/[slug]/page.tsx`
- **Type Definitions**: `src/payload-types.ts` (auto-generated)
- **Search Config**: `src/search/` (enables full-text search)
- **Form Builder**: Collections use `@payloadcms/plugin-form-builder`
- **API Client**: Data fetched via Payload's REST/GraphQL APIs

## Common Workflows

### Adding a New Block Type

1. Create directory: `src/blocks/MyBlockName/`
2. Create `config.ts` with Payload schema
3. Create `Component.tsx` that renders the block
4. Add to `src/blocks/RenderBlocks.tsx` mapping
5. Use in Pages collection via admin

### Adding a New Page

1. Go to admin (`/admin`)
2. Navigate to Pages collection
3. Create new page, add blocks, publish
4. Accessible at `/your-page-slug`

### Creating a New Collection

1. Create file: `src/collections/MyCollection.ts`
2. Define schema with `defineCollection()`
3. Add to payload config: `src/payload.config.ts`
4. Run migrations: `pnpm payload migrate`
5. Generate types: `pnpm generate:types`

### Editing Global Configuration

1. Go to admin (`/admin`) → Globals
2. Edit Header, Footer, Navigation, etc.
3. Changes immediately available to frontend
4. Revalidation hooks update caches

### Publishing Content

- Create draft in admin
- Edit and preview with live preview
- Click "Publish" when ready
- Triggers ISR revalidation automatically

## Performance Considerations

- **ISR (Incremental Static Regeneration)**: Pages are cached and updated via revalidation hooks
- **Image Optimization**: Use Next.js `Image` component for automatic optimization
- **Search Index**: Kept in sync via `@payloadcms/plugin-search` hooks
- **Block Rendering**: Efficiently handles 38+ block types via mapping

## Deployment

### Railway Deployment

The project is optimized for Railway:

1. One-click deploy available: [Railway Template](https://railway.app/template/L8TUlT)
2. Uses Nix for environment setup
3. Automatically configures PostgreSQL and S3

### Production Checklist

- Set `NEXT_PUBLIC_SERVER_URL` to production domain
- Enable S3 storage (`S3_ENABLED=true`)
- Configure S3 credentials
- Set secure `PAYLOAD_SECRET`
- Run `pnpm build` for optimized build
- Database migrations run automatically

## Common Issues & Solutions

**Issue: Type errors in components**
- Solution: Run `pnpm generate:types` to regenerate `payload-types.ts`

**Issue: Changes not visible on frontend**
- Solution: Check revalidation hooks are configured; may need manual cache clear

**Issue: Database connection errors**
- Solution: Verify `DATABASE_URI` in `.env` and PostgreSQL is running

**Issue: S3 storage not working**
- Solution: Set `S3_ENABLED=true` and configure S3 credentials in `.env`

**Issue: Admin UI not loading at `/admin`**
- Solution: Ensure Payload is configured in `next.config.js` via `withPayload()` wrapper

## Useful References

- **Payload Docs**: https://payloadcms.com/docs
- **Next.js Docs**: https://nextjs.org/docs
- **Tailwind Docs**: https://tailwindcss.com/docs
- **Shadcn UI**: https://ui.shadcn.com
- **Railway Docs**: https://docs.railway.app

## Code Quality Standards

- **TypeScript**: Strict null checks enabled; type-safe code required
- **ESLint**: Config in `.eslintrc.cjs`; check before committing (`pnpm lint`)
- **Auto-fixes**: `pnpm lint:fix` for formatting issues
- **Block Structure**: Maintain consistent config/component separation
- **Revalidation**: Always add revalidation hooks to collections that impact frontend

## Notes

- Component diagnostics are available via IDE/ESLint integration
- Generated types file (`payload-types.ts`) should not be manually edited
- Migrations are version-controlled and run in order
- The project uses ES modules (`"type": "module"` in package.json)
- Node.js requirement: ^18.20.2 || >=20.9.0
