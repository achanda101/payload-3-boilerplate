# Documentation

Welcome to the UAF Asia Pacific Payload CMS documentation. This directory contains comprehensive guides for understanding, developing, deploying, and maintaining the project.

## Quick Start

New to the project? Start here:

1. 📖 [**Project Overview**](./PROJECT_OVERVIEW.md) - Understand the project architecture
2. ⚙️ [**Environment Variables**](./ENVIRONMENT_VARIABLES.md) - Configure your environment
3. 🚀 [**Deployment Guide**](./DEPLOYMENT.md) - Deploy to Railway or other platforms
4. 🧩 [**Collections Guide**](./COLLECTIONS.md) - Understand content types

## Documentation Index

### Getting Started

- **[Project Overview](./PROJECT_OVERVIEW.md)**
  - Technology stack
  - Project structure
  - Key features
  - Architecture decisions
  - Recent updates

- **[Environment Variables](./ENVIRONMENT_VARIABLES.md)**
  - Required vs optional variables
  - Configuration by platform
  - Security best practices
  - Variable reference table

### Deployment & Infrastructure

- **[Deployment Guide](./DEPLOYMENT.md)**
  - Railway deployment (recommended)
  - Alternative platforms (Vercel, Heroku, DigitalOcean, VPS)
  - Post-deployment steps
  - Custom domain setup
  - Monitoring and maintenance

- **[S3 Storage Setup](./S3_STORAGE.md)**
  - S3 configuration
  - AWS S3 setup
  - DigitalOcean Spaces
  - MinIO (self-hosted)
  - Troubleshooting S3 issues

### Content Management

- **[Collections Guide](./COLLECTIONS.md)**
  - Content collections (Pages, Grants, Blog, etc.)
  - Media collections (MediaCloud, AssetCloud, Documents)
  - Supporting collections (Categories, Users)
  - Collection relationships
  - Best practices

- **[URL Validation System](./URL_VALIDATION.md)**
  - URL validation implementation
  - Link field configuration
  - Component integration
  - Troubleshooting invalid links

### Support & Maintenance

- **[Troubleshooting Guide](./TROUBLESHOOTING.md)**
  - Installation issues
  - Development problems
  - Build errors
  - Database issues
  - S3 storage problems
  - Admin panel issues
  - Frontend issues
  - Deployment problems
  - Performance optimization

## Quick Reference

### Essential Commands

```bash
# Development
pnpm install          # Install dependencies
pnpm dev              # Start development server
pnpm build            # Build for production
pnpm start            # Start production server

# Maintenance
pnpm generate:types   # Generate TypeScript types
pnpm lint             # Check code quality
pnpm lint:fix         # Fix linting issues

# Payload CMS
pnpm payload          # Access Payload CLI
```

### Key URLs

- **Local Development:** http://localhost:3000
- **Admin Panel:** http://localhost:3000/admin
- **Production:** https://your-domain.com
- **Railway Template:** https://railway.app/template/L8TUlT?referralCode=-Yg50p

### Required Environment Variables

```bash
DATABASE_URI=postgres://user:pass@host:port/database
PAYLOAD_SECRET=your-secret-key
NEXT_PUBLIC_SERVER_URL=http://localhost:3000
```

### Project Structure

```
payload-3-boilerplate/
├── src/
│   ├── collections/        # Payload collections
│   ├── globals/           # Global configurations
│   ├── blocks/            # Content blocks
│   ├── components/        # React components
│   ├── fields/            # Field configurations
│   ├── utilities/         # Helper functions
│   ├── app/               # Next.js app
│   └── payload.config.ts  # Payload config
├── docs/                  # Documentation (you are here)
├── migrations/            # Database migrations
└── public/               # Static assets
```

## Documentation by Task

### I want to...

**...set up a local development environment**
1. Read [Environment Variables](./ENVIRONMENT_VARIABLES.md)
2. Follow setup in [Project Overview](./PROJECT_OVERVIEW.md#development-workflow)

**...deploy to production**
1. Read [Deployment Guide](./DEPLOYMENT.md)
2. Configure [Environment Variables](./ENVIRONMENT_VARIABLES.md)
3. Set up [S3 Storage](./S3_STORAGE.md) (optional)

**...add new content**
1. Understand [Collections](./COLLECTIONS.md)
2. Use admin panel at `/admin`

**...fix a bug or issue**
1. Check [Troubleshooting Guide](./TROUBLESHOOTING.md)
2. Search for specific error message
3. Review relevant documentation

**...understand the codebase**
1. Read [Project Overview](./PROJECT_OVERVIEW.md)
2. Explore [Collections Guide](./COLLECTIONS.md)
3. Review source code with context

**...configure S3 storage**
1. Read [S3 Storage Setup](./S3_STORAGE.md)
2. Follow provider-specific instructions
3. Update [Environment Variables](./ENVIRONMENT_VARIABLES.md)

**...customize the site**
1. Understand [Project Structure](./PROJECT_OVERVIEW.md#project-structure)
2. Review [Collections](./COLLECTIONS.md) for content types
3. Modify components in `src/components/`

**...optimize performance**
1. Check [Troubleshooting - Performance](./TROUBLESHOOTING.md#performance-issues)
2. Review database indexes
3. Configure CDN for S3

## Common Scenarios

### Scenario: First-Time Setup

1. Clone repository
2. Copy `.env.example` to `.env`
3. Set up PostgreSQL database
4. Configure environment variables
5. Run `pnpm install`
6. Run `pnpm dev`
7. Access http://localhost:3000/admin/create-first-user
8. Create your admin user
9. Start building content!

**Documents to read:**
- [Project Overview](./PROJECT_OVERVIEW.md)
- [Environment Variables](./ENVIRONMENT_VARIABLES.md)

---

### Scenario: Railway Deployment

1. Click [Deploy on Railway](https://railway.app/template/L8TUlT?referralCode=-Yg50p)
2. Configure S3 variables (optional)
3. Wait for deployment
4. Access your site
5. Create first admin user
6. Configure globals (Header, Footer, etc.)

**Documents to read:**
- [Deployment Guide - Railway](./DEPLOYMENT.md#railway-deployment-recommended)
- [S3 Storage Setup](./S3_STORAGE.md)

---

### Scenario: Fixing Broken Links

1. Check browser console for warnings
2. Read [URL Validation System](./URL_VALIDATION.md)
3. Open page with broken link in admin
4. Edit link/button configuration
5. Ensure reference is selected
6. Save and verify

**Documents to read:**
- [URL Validation System](./URL_VALIDATION.md)
- [Troubleshooting - Links](./TROUBLESHOOTING.md#links-showing-as-)

---

### Scenario: S3 Upload Failures

1. Verify all S3 environment variables are set
2. Check IAM permissions
3. Test S3 credentials with AWS CLI
4. Review CORS settings
5. Check bucket region matches configuration

**Documents to read:**
- [S3 Storage Setup](./S3_STORAGE.md)
- [Troubleshooting - S3 Issues](./TROUBLESHOOTING.md#s3-storage-issues)

---

### Scenario: Admin Panel Blank

1. Clear browser cache (hard refresh)
2. Verify `NEXT_PUBLIC_SERVER_URL` is correct
3. Check `PAYLOAD_SECRET` is set
4. Rebuild application
5. Check console for errors

**Documents to read:**
- [Troubleshooting - Admin Panel](./TROUBLESHOOTING.md#blank-admin-page)
- [Environment Variables](./ENVIRONMENT_VARIABLES.md)

## Best Practices

### For Developers

1. **Read the docs first** - Save time by understanding the system
2. **Use environment variables** - Never hardcode secrets
3. **Follow conventions** - Maintain code consistency
4. **Test locally** - Verify changes before deploying
5. **Document changes** - Update docs when adding features

### For Content Editors

1. **Use draft status** - Preview before publishing
2. **Fill SEO fields** - Improve search visibility
3. **Organize with folders** - Keep content manageable
4. **Validate links** - Ensure all links work
5. **Optimize images** - Compress before uploading

### For Administrators

1. **Backup regularly** - Protect your data
2. **Monitor performance** - Watch for issues
3. **Keep updated** - Apply security patches
4. **Rotate secrets** - Periodically change credentials
5. **Document changes** - Track configuration updates

## Getting Help

### Before Asking

1. **Search documentation** - Check relevant docs
2. **Review troubleshooting** - Common issues are documented
3. **Check logs** - Error messages provide clues
4. **Reproduce issue** - Understand the problem clearly

### Where to Ask

1. **Project Issues** - GitHub repository issues
2. **Payload Discord** - https://discord.gg/payload
3. **Railway Support** - For Railway-specific issues
4. **Stack Overflow** - Tag with `payloadcms`, `nextjs`

### What to Include

1. **Clear description** - Explain the issue
2. **Steps to reproduce** - How to recreate
3. **Expected vs actual** - What should happen vs what does
4. **Environment details** - OS, Node version, etc.
5. **Error messages** - Full text of errors
6. **Relevant code** - Code snippets if applicable

## Contributing to Documentation

Found an error or want to improve the docs?

1. **Create an issue** - Describe the problem
2. **Submit a PR** - Make the fix
3. **Update relevant files** - Keep docs in sync
4. **Test examples** - Ensure accuracy

### Documentation Style Guide

- **Clear titles** - Descriptive headings
- **Code examples** - Show, don't just tell
- **Step-by-step** - Break down complex tasks
- **Visual hierarchy** - Use headings and lists
- **Cross-reference** - Link to related docs
- **Update dates** - Note when last updated

## External Resources

### Official Documentation

- [Payload CMS Docs](https://payloadcms.com/docs)
- [Next.js Docs](https://nextjs.org/docs)
- [Railway Docs](https://docs.railway.app)
- [PostgreSQL Docs](https://www.postgresql.org/docs/)

### Learning Resources

- [Payload CMS YouTube](https://www.youtube.com/@payloadcms)
- [Next.js Learn](https://nextjs.org/learn)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

### Community

- [Payload Discord](https://discord.gg/payload)
- [Payload GitHub](https://github.com/payloadcms/payload)
- [Template Blog Post](https://funkyton.com/payload-cms/)

## Document Maintenance

### Last Updated
2025-12-17 (Fix for duplicate Sharp dependency issue)

### Change Log

- **2025-12-17:** Created comprehensive documentation suite
  - PROJECT_OVERVIEW.md
  - ENVIRONMENT_VARIABLES.md
  - DEPLOYMENT.md
  - S3_STORAGE.md
  - COLLECTIONS.md
  - TROUBLESHOOTING.md
  - README.md (this file)

- **Existing:** URL_VALIDATION.md (URL validation system documentation)

### Review Schedule

Documentation should be reviewed:
- After major version updates
- When adding new features
- When fixing significant bugs
- At least quarterly

## License

This documentation is part of the UAF Asia Pacific Payload CMS project.
See main LICENSE file for details.

---

**Need immediate help?** Start with the [Troubleshooting Guide](./TROUBLESHOOTING.md) or check the specific document for your task above.
