# Project Overview

## UAF Asia Pacific - Payload CMS Website

A comprehensive website builder built with Payload CMS V3 for the Urgent Action Fund Asia Pacific organization. This project provides a full-featured content management system with a modern frontend built on Next.js 15.

## Technology Stack

### Core Technologies
- **Payload CMS V3** (3.68.5) - Headless CMS
- **Next.js** (15.4.10) - React framework with App Router
- **React** (19.2.1) - UI library
- **PostgreSQL** - Database (via @payloadcms/db-postgres)
- **TypeScript** (5.7.2) - Type safety
- **Tailwind CSS** (3.4.16) - Styling

### Key Libraries
- **Sharp** (0.34.3) - Image processing (managed by Next.js)
- **Lexical** - Rich text editor (@payloadcms/richtext-lexical)
- **React Hook Form** (7.45.4) - Form management
- **Radix UI** - Accessible component primitives

### Storage & Cloud
- **S3-compatible storage** (@payloadcms/storage-s3)
- Optional conditional storage based on `S3_ENABLED` environment variable
- Railway-optimized deployment

## Project Structure

```
payload-3-boilerplate/
├── src/
│   ├── collections/          # Payload content collections
│   │   ├── Pages/           # Dynamic pages
│   │   ├── Blog/            # Blog posts
│   │   ├── Posts/           # General posts
│   │   ├── Grants/          # Grant information
│   │   ├── GrantCards/      # Grant cards
│   │   ├── Reports/         # Reports collection
│   │   ├── MMedia/          # Multimedia content
│   │   ├── EligibilityTests/# Eligibility tests
│   │   ├── Documents/       # Document management
│   │   ├── MediaCloud/      # Cloud media storage
│   │   ├── AssetCloud/      # Cloud asset storage
│   │   ├── DocTypes/        # Document types
│   │   ├── Categories/      # Content categories
│   │   └── Users/           # User management
│   ├── globals/             # Global configurations
│   │   ├── Header/          # Site header
│   │   ├── Footer/          # Site footer
│   │   ├── Navigation/      # Navigation menu
│   │   ├── ContactInfo/     # Contact information
│   │   └── Homepage/        # Homepage settings
│   ├── blocks/              # Reusable content blocks
│   ├── components/          # React components
│   ├── fields/              # Payload field configurations
│   ├── utilities/           # Utility functions
│   ├── app/                 # Next.js App Router
│   └── payload.config.ts    # Payload configuration
├── docs/                    # Documentation
├── migrations/              # Database migrations
└── public/                  # Static assets
```

## Key Features

### Content Management
- **Dynamic Page Builder** - Build pages with flexible block-based layouts
- **Blog System** - Full-featured blog with categories and rich content
- **Grant Management** - Specialized collections for grant information
- **Document Library** - Organize and manage documents
- **Multimedia Gallery** - Handle images, videos, and other media

### User Experience
- **Live Preview** - Preview content changes in real-time
- **Draft System** - Save and preview content before publishing
- **Responsive Design** - Mobile-first responsive layouts
- **SEO Optimization** - Built-in SEO tools via @payloadcms/plugin-seo
- **Search Functionality** - Content search via @payloadcms/plugin-search

### Developer Features
- **TypeScript** - Full type safety across the project
- **Type Generation** - Automatic TypeScript type generation from Payload config
- **Hot Module Replacement** - Fast development with HMR
- **Image Optimization** - Automatic image optimization with Sharp
- **URL Validation** - Comprehensive URL validation system (see URL_VALIDATION.md)

### Admin Panel
- **Custom Branding** - UAF A&P branded admin interface
- **Role-based Access** - Granular permission control
- **Custom Components** - Enhanced UI with custom components
- **Live Preview Integration** - Preview content directly from admin
- **Multiple Breakpoints** - Preview across mobile and tablet sizes

### Integrations
- **Form Builder** (@payloadcms/plugin-form-builder)
- **Nested Documents** (@payloadcms/plugin-nested-docs)
- **Redirects Management** (@payloadcms/plugin-redirects)
- **S3 Storage** - Optional cloud storage for media

## Development Workflow

### Local Development
```bash
# Install dependencies
pnpm install

# Run development server
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start
```

### Database Migrations
```bash
# Generate TypeScript types
pnpm generate:types

# Run migrations (happens automatically on build)
payload migrate
```

### Code Quality
```bash
# Lint code
pnpm lint

# Fix linting issues
pnpm lint:fix
```

## Environment Configuration

The project uses environment variables for configuration. Key variables include:

- `DATABASE_URI` - PostgreSQL connection string
- `PAYLOAD_SECRET` - Secret for Payload CMS
- `S3_ENABLED` - Enable/disable S3 storage
- `S3_*` - S3 configuration variables (bucket, region, access keys)
- `PAYLOAD_URL` - Public URL for the site

See [ENVIRONMENT_VARIABLES.md](./ENVIRONMENT_VARIABLES.md) for complete details.

## Deployment

### Railway (Recommended)
One-click deploy to Railway with pre-configured settings:
- PostgreSQL database automatically provisioned
- Environment variables pre-configured
- Automatic builds and deployments
- SSL certificates included

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions.

### Other Platforms
The project can be deployed to any Node.js hosting platform that supports:
- Node.js 18.20.2+ or 20.9.0+
- PostgreSQL database
- Environment variable configuration

## Content Collections

### Core Collections
- **Pages** - Dynamic pages with flexible layouts
- **Blog** - Blog posts with rich content
- **Posts** - General content posts
- **Reports** - Organization reports
- **Grants** - Grant information and opportunities
- **MMedia** - Multimedia content library

### Supporting Collections
- **Users** - User management and authentication
- **Categories** - Content categorization
- **Documents** - Document management
- **MediaCloud** - Cloud-stored media files
- **AssetCloud** - Cloud-stored assets
- **GrantCards** - Grant summary cards
- **EligibilityTests** - Eligibility assessment tests
- **DocTypes** - Document type definitions

See [COLLECTIONS.md](./COLLECTIONS.md) for detailed collection documentation.

## Architecture Decisions

### Why Payload CMS V3?
- Modern architecture with full TypeScript support
- Flexible content modeling
- Built-in admin UI with customization options
- Strong plugin ecosystem
- Active development and community

### Why Next.js 15?
- App Router for better performance
- Server Components for optimal loading
- Built-in image optimization
- Excellent developer experience
- SEO-friendly by default

### Why PostgreSQL?
- Robust and reliable
- Better performance for complex queries
- JSON support for flexible data
- Wide hosting support
- Railway integration

### Why S3 Storage?
- Scalable media storage
- CDN integration options
- Cost-effective for large files
- Conditional setup for flexibility

## Recent Updates

### Latest Changes (Payload 3.68.5)
- Upgraded to Payload CMS 3.68.5
- Added S3_ENABLED conditional storage
- Fixed blank admin page issues on Railway
- Added new pinkpuffy block
- Improved URL validation system

### Dependency Updates
- Removed duplicate Sharp dependency (now managed by Next.js)
- Updated to Next.js 15.4.10
- React 19.2.1 support
- TypeScript 5.7.2

## Known Issues & Solutions

### Solved Issues
- ✅ Duplicate libvips warning - Fixed by removing explicit Sharp dependency
- ✅ Blank admin page on Railway - Resolved with proper build configuration
- ✅ Invalid URL generation - Comprehensive validation system implemented

### Common Issues
See [TROUBLESHOOTING.md](./TROUBLESHOOTING.md) for solutions to common problems.

## Contributing

### Code Style
- TypeScript for all new code
- ESLint configuration enforced
- Prettier for code formatting
- Follow existing patterns in the codebase

### Best Practices
- Use utility functions for common operations
- Validate all URLs using `getValidUrl()` utility
- Add JSDoc comments for complex functions
- Create reusable components
- Follow Payload CMS conventions

## Resources

### Documentation
- [Payload CMS Documentation](https://payloadcms.com/docs)
- [Next.js Documentation](https://nextjs.org/docs)
- [Railway Documentation](https://docs.railway.app)

### Project-Specific Docs
- [URL Validation System](./URL_VALIDATION.md)
- [Deployment Guide](./DEPLOYMENT.md)
- [Environment Variables](./ENVIRONMENT_VARIABLES.md)
- [Collections Guide](./COLLECTIONS.md)
- [Troubleshooting](./TROUBLESHOOTING.md)
- [S3 Storage Setup](./S3_STORAGE.md)

### Community
- [Payload Discord](https://discord.gg/payload)
- [Template Blog Post](https://funkyton.com/payload-cms/)

## License

MIT License - See LICENSE file for details

## Credits

Template created by [FUNKYTON](https://funkyton.com/)
Customized for Urgent Action Fund Asia Pacific
