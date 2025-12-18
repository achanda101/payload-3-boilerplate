# Troubleshooting Guide

## Overview

This guide covers common issues you may encounter when developing or deploying the UAF Asia Pacific Payload CMS website, along with their solutions.

## Table of Contents

- [Installation Issues](#installation-issues)
- [Development Issues](#development-issues)
- [Build Issues](#build-issues)
- [Database Issues](#database-issues)
- [S3 Storage Issues](#s3-storage-issues)
- [Admin Panel Issues](#admin-panel-issues)
- [Frontend Issues](#frontend-issues)
- [Deployment Issues](#deployment-issues)
- [Performance Issues](#performance-issues)

## Installation Issues

### pnpm install fails

**Error:**
```bash
ERR_PNPM_UNEXPECTED_STORE  Unexpected store location
```

**Solution:**
```bash
# Clear pnpm cache
pnpm store prune

# Remove node_modules and lockfile
rm -rf node_modules pnpm-lock.yaml

# Reinstall
pnpm install
```

---

**Error:**
```bash
EACCES: permission denied
```

**Solution:**
```bash
# Fix npm permissions (don't use sudo)
mkdir ~/.npm-global
npm config set prefix '~/.npm-global'
export PATH=~/.npm-global/bin:$PATH

# Or use nvm (recommended)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
nvm install 20
nvm use 20
```

---

### Sharp installation fails

**Error:**
```bash
Error: Could not load the "sharp" module
```

**Solution:**
```bash
# Remove sharp and reinstall
rm -rf node_modules/.pnpm/sharp*

# Clear pnpm cache
pnpm store prune

# Reinstall
pnpm install

# If still fails, try forcing a rebuild
pnpm rebuild sharp
```

---

### TypeScript errors after installation

**Error:**
```bash
Cannot find module '@/components/...' or its corresponding type declarations
```

**Solution:**
```bash
# Generate TypeScript types
pnpm generate:types

# If that doesn't work, restart TypeScript server in your editor
# VS Code: Cmd/Ctrl + Shift + P → "TypeScript: Restart TS Server"
```

## Development Issues

### Dev server won't start

**Error:**
```bash
Error: Port 3000 is already in use
```

**Solution:**
```bash
# Find and kill the process using port 3000
lsof -ti:3000 | xargs kill -9

# Or use a different port
PORT=3001 pnpm dev
```

---

### Hot reload not working

**Symptoms:**
- Changes to code don't reflect in browser
- Need to manually refresh

**Solutions:**

1. **Clear Next.js cache**
   ```bash
   rm -rf .next
   pnpm dev
   ```

2. **Check file watcher limits (Linux)**
   ```bash
   # Increase file watch limit
   echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf
   sudo sysctl -p
   ```

3. **Disable browser cache**
   - Open DevTools
   - Go to Network tab
   - Check "Disable cache"

---

### Environment variables not loading

**Symptoms:**
- `process.env.VARIABLE_NAME` is undefined
- Database connection fails

**Solutions:**

1. **Check .env file exists**
   ```bash
   # Create from example
   cp .env.example .env
   ```

2. **Verify .env location**
   - Must be in project root
   - Not in subdirectories

3. **Restart dev server**
   - Environment variables load at startup
   - Stop server (Ctrl+C) and run `pnpm dev` again

4. **Check variable names**
   - Must start with `NEXT_PUBLIC_` for client-side access
   - No spaces around `=`: `VAR=value` not `VAR = value`

---

### Duplicate libvips warning (SOLVED)

**Warning:**
```bash
objc[37132]: Class GNotificationCenterDelegate is implemented in both...
```

**Solution:**

This was caused by having both:
- Explicit `sharp@0.32.6` in dependencies
- `sharp@0.34.3` from Next.js

**Fix applied:** Removed explicit sharp dependency from package.json (line 59).

Now Next.js manages Sharp automatically. If you see this warning:
```bash
# Remove node_modules
rm -rf node_modules

# Clear cache
pnpm store prune

# Reinstall
pnpm install
```

## Build Issues

### Build fails with migration errors

**Error:**
```bash
Error: Unable to connect to database during migration
```

**Solutions:**

1. **Check DATABASE_URI**
   ```bash
   echo $DATABASE_URI
   # Should output: postgres://user:pass@host:port/dbname
   ```

2. **Verify database is running**
   ```bash
   # For local PostgreSQL
   psql $DATABASE_URI -c "SELECT 1"
   ```

3. **Check database exists**
   ```bash
   # Create database if needed
   createdb your-db-name
   ```

4. **Skip migrations (emergency only)**
   ```bash
   # Build without migrations
   cross-env NODE_OPTIONS=--no-deprecation next build
   ```

---

### Build fails with memory error

**Error:**
```bash
FATAL ERROR: Reached heap limit Allocation failed - JavaScript heap out of memory
```

**Solutions:**

1. **Increase memory limit**
   ```bash
   # Temporarily
   NODE_OPTIONS=--max-old-space-size=4096 pnpm build

   # Or update package.json
   # Already configured in this project
   ```

2. **Clear cache and rebuild**
   ```bash
   rm -rf .next node_modules/.cache
   pnpm build
   ```

3. **Close other applications**
   - Free up system memory
   - Close browser tabs
   - Stop other development servers

---

### TypeScript compilation errors

**Error:**
```bash
Type error: Property 'X' does not exist on type 'Y'
```

**Solutions:**

1. **Regenerate types**
   ```bash
   pnpm generate:types
   ```

2. **Check TypeScript version**
   ```bash
   # Should be 5.7.2
   pnpm list typescript
   ```

3. **Clear TypeScript cache**
   ```bash
   rm -rf node_modules/.cache
   rm -rf .next
   pnpm build
   ```

## Database Issues

### Cannot connect to PostgreSQL

**Error:**
```bash
Error: connect ECONNREFUSED 127.0.0.1:5432
```

**Solutions:**

1. **Start PostgreSQL**
   ```bash
   # macOS (Homebrew)
   brew services start postgresql@14

   # Linux (systemd)
   sudo systemctl start postgresql

   # Check status
   psql --version
   ```

2. **Verify DATABASE_URI**
   ```bash
   # Format: postgres://user:password@host:port/database
   # Example: postgres://postgres:postgres@localhost:5432/payload
   ```

3. **Check PostgreSQL is listening**
   ```bash
   # Should show port 5432
   netstat -an | grep 5432
   ```

---

### Database migration fails

**Error:**
```bash
Error: Migration failed: relation "pages" already exists
```

**Solutions:**

1. **Check migration status**
   ```bash
   pnpm payload migrate:status
   ```

2. **Reset migrations (DESTRUCTIVE - dev only)**
   ```bash
   # This will delete all data!
   dropdb your-db-name
   createdb your-db-name
   pnpm build  # Runs migrations
   ```

3. **Skip problematic migration**
   - Edit migration file to handle existing tables
   - Add `IF NOT EXISTS` clauses

---

### Connection pool exhausted

**Error:**
```bash
Error: Connection pool exhausted
```

**Solutions:**

1. **Increase pool size**
   ```typescript
   // In src/payload.config.ts
   pool: {
     connectionString: process.env.DATABASE_URI,
     max: 20,  // Increase from default (10)
     idleTimeoutMillis: 30000,
   }
   ```

2. **Close unused connections**
   - Check for connection leaks in custom code
   - Ensure queries properly close connections

3. **Upgrade database plan**
   - Railway: Increase connection limit
   - Or use connection pooling (PgBouncer)

## S3 Storage Issues

See [S3_STORAGE.md](./S3_STORAGE.md) for comprehensive S3 troubleshooting.

### Quick S3 Checklist

- [ ] `S3_ENABLED` set correctly (`true` or `false`)
- [ ] `S3_BUCKET` matches bucket name
- [ ] `S3_REGION` is correct
- [ ] `S3_ENDPOINT` correct (or empty for AWS)
- [ ] `S3_ACCESS_KEY_ID` and `S3_SECRET_ACCESS_KEY` valid
- [ ] IAM permissions include `s3:PutObject`, `s3:GetObject`, `s3:DeleteObject`
- [ ] Bucket CORS configured for your domain
- [ ] TLS enabled (`tls: true`)

### Common S3 Errors

**Error:** `Access Denied`
- Check IAM permissions
- Verify credentials are correct
- Review bucket policy

**Error:** `NoSuchBucket`
- Verify bucket name spelling
- Check bucket exists in specified region
- Ensure region matches endpoint

**Error:** `NetworkingError`
- Check internet connectivity
- Verify endpoint URL format
- Test endpoint in browser

## Admin Panel Issues

### Blank admin page

**Symptoms:**
- `/admin` shows white screen
- No errors in console

**Solutions:**

1. **Clear browser cache**
   - Hard refresh: Ctrl+Shift+R (Cmd+Shift+R on Mac)
   - Or clear cache in browser settings

2. **Check build completed**
   ```bash
   # Rebuild admin panel
   rm -rf .next
   pnpm build
   pnpm start
   ```

3. **Verify NEXT_PUBLIC_SERVER_URL**
   ```bash
   # Should match your domain
   echo $NEXT_PUBLIC_SERVER_URL
   ```

4. **Check console errors**
   - Open browser DevTools
   - Look for JavaScript errors
   - Check Network tab for failed requests

---

### Cannot login to admin

**Symptoms:**
- Login form appears
- Credentials don't work

**Solutions:**

1. **Create first user**
   ```bash
   # Visit in browser
   https://yourdomain.com/admin/create-first-user
   ```

2. **Reset password**
   - Click "Forgot password?" on login page
   - Enter email
   - Check email for reset link

3. **Check user exists in database**
   ```bash
   # Connect to database
   psql $DATABASE_URI

   # Check users
   SELECT email FROM users;
   ```

4. **Verify PAYLOAD_SECRET**
   - Must be set in environment
   - Must be same across deployments
   - Changing it invalidates all sessions

---

### Admin panel slow to load

**Symptoms:**
- Admin takes 10+ seconds to load
- Collections slow to open

**Solutions:**

1. **Check database performance**
   ```bash
   # Analyze slow queries
   psql $DATABASE_URI -c "SELECT * FROM pg_stat_statements ORDER BY total_time DESC LIMIT 10"
   ```

2. **Optimize database**
   ```sql
   -- Run in PostgreSQL
   VACUUM ANALYZE;
   REINDEX DATABASE your_database_name;
   ```

3. **Reduce collection size**
   - Archive old content
   - Use pagination
   - Add database indexes

4. **Upgrade hosting**
   - More memory/CPU
   - Better database plan
   - Use CDN for assets

## Frontend Issues

### 404 errors on dynamic routes

**Symptoms:**
- Pages work in dev but 404 in production
- `/grants/my-grant` returns 404

**Solutions:**

1. **Check slug is set**
   - Open page in admin
   - Verify slug field has value
   - Re-save if needed

2. **Verify page is published**
   - Check status is "Published" not "Draft"
   - Click "Publish" if needed

3. **Check route file exists**
   ```bash
   # For grants
   ls src/app/\(frontend\)/grants/[slug]/page.tsx
   ```

4. **Clear cache and rebuild**
   ```bash
   rm -rf .next
   pnpm build
   ```

---

### Images not displaying

**Symptoms:**
- Image URLs load but don't show
- Broken image icons

**Solutions:**

1. **Check image uploaded correctly**
   - View in MediaCloud collection
   - Verify file exists

2. **Verify S3 configuration** (if enabled)
   - Check S3 bucket permissions
   - Verify CORS settings
   - Test S3 URL directly in browser

3. **Check Next.js image domains**
   ```typescript
   // next.config.js
   images: {
     domains: [
       'your-s3-bucket.s3.amazonaws.com',
       'localhost',
     ],
   }
   ```

4. **Try different image format**
   - JPG instead of PNG
   - Smaller file size
   - Re-upload image

---

### Links showing as '#'

**Symptoms:**
- Buttons link to `#` instead of pages
- Invalid URLs like `/undefined/undefined`

**Solution:**

This should be fixed by the URL validation system. If you still see this:

1. **Check link configuration**
   - Open page in admin
   - Edit link/button
   - Ensure reference is selected
   - Verify slug exists on referenced page

2. **Check console warnings**
   - Open browser DevTools
   - Look for "Invalid link" warnings
   - Follow guidance in warnings

3. **See URL_VALIDATION.md**
   - Comprehensive validation documentation
   - Details on fixing link issues

---

### Styles not applying

**Symptoms:**
- Components look unstyled
- Tailwind classes not working

**Solutions:**

1. **Rebuild Tailwind**
   ```bash
   rm -rf .next
   pnpm dev
   ```

2. **Check Tailwind config**
   ```javascript
   // tailwind.config.js
   content: [
     './src/**/*.{js,ts,jsx,tsx,mdx}',
   ]
   ```

3. **Verify PostCSS config**
   ```javascript
   // postcss.config.js
   plugins: {
     tailwindcss: {},
     autoprefixer: {},
   }
   ```

4. **Clear browser cache**
   - Hard refresh
   - Disable cache in DevTools

## Deployment Issues

See [DEPLOYMENT.md](./DEPLOYMENT.md) for comprehensive deployment troubleshooting.

### Quick Deployment Checklist

- [ ] All environment variables set
- [ ] DATABASE_URI points to production database
- [ ] NEXT_PUBLIC_SERVER_URL matches production domain
- [ ] PAYLOAD_SECRET is set (and secret!)
- [ ] S3 variables configured (if using S3)
- [ ] Build completes without errors
- [ ] Migrations run successfully
- [ ] Can access `/admin` and `/admin/login`

### Common Deployment Errors

**Error:** `Module not found`
- Check all imports are correct
- Verify all dependencies in package.json
- Clear node_modules and reinstall

**Error:** `Invalid environment variable`
- Verify all required variables are set
- Check for typos in variable names
- Ensure no quotes around values in Railway

**Error:** `Build timeout`
- Increase build timeout in platform settings
- Optimize build process
- Use smaller dependencies

## Performance Issues

### Slow page loads

**Symptoms:**
- Pages take 5+ seconds to load
- Time to First Byte (TTFB) is high

**Solutions:**

1. **Enable caching**
   - Next.js ISR already configured
   - Add CDN (CloudFlare, CloudFront)

2. **Optimize images**
   - Use WebP format
   - Compress before upload
   - Use Next.js Image component

3. **Reduce database queries**
   - Add indexes
   - Optimize collection queries
   - Use depth: 0 where possible

4. **Optimize builds**
   ```bash
   # Analyze bundle size
   pnpm build
   # Check .next/analyze
   ```

---

### High memory usage

**Symptoms:**
- Application crashes
- Out of memory errors

**Solutions:**

1. **Increase memory limits**
   ```bash
   # Already set in package.json
   NODE_OPTIONS=--max-old-space-size=4096
   ```

2. **Profile memory usage**
   ```bash
   node --inspect pnpm start
   # Open chrome://inspect
   ```

3. **Optimize queries**
   - Reduce depth in relationships
   - Paginate large collections
   - Add database indexes

4. **Upgrade hosting plan**
   - More RAM allocation
   - Better performance tier

---

### Slow database queries

**Solutions:**

1. **Add indexes**
   ```sql
   -- In migration file
   CREATE INDEX idx_pages_slug ON pages(slug);
   CREATE INDEX idx_posts_status ON posts(_status);
   ```

2. **Analyze query performance**
   ```sql
   EXPLAIN ANALYZE SELECT * FROM pages WHERE slug = 'example';
   ```

3. **Optimize Payload queries**
   ```typescript
   // Use specific fields
   const pages = await payload.find({
     collection: 'pages',
     depth: 0,  // Don't populate relationships
     select: {
       title: true,
       slug: true,
     },
   })
   ```

## Getting Help

### Before Asking for Help

1. **Check documentation**
   - Read relevant docs in `docs/` folder
   - Check Payload CMS documentation
   - Review Next.js documentation

2. **Search existing issues**
   - GitHub repository issues
   - Payload Discord
   - Stack Overflow

3. **Gather information**
   - Error messages (full text)
   - Steps to reproduce
   - Environment details (OS, Node version, etc.)
   - Relevant code snippets

### Where to Get Help

1. **Project Repository**
   - Create detailed GitHub issue
   - Include reproduction steps
   - Provide logs/error messages

2. **Payload CMS Discord**
   - Join: https://discord.gg/payload
   - Search before asking
   - Be specific about your issue

3. **Railway Support**
   - For Railway-specific issues
   - Use Railway Discord or support ticket
   - Include project ID

4. **Stack Overflow**
   - Tag with `payloadcms`, `nextjs`, `typescript`
   - Provide minimal reproducible example
   - Include relevant code

### Creating Good Bug Reports

Include:
1. **Description** - What's wrong?
2. **Steps to reproduce** - How to recreate?
3. **Expected behavior** - What should happen?
4. **Actual behavior** - What actually happens?
5. **Environment**
   - OS and version
   - Node.js version
   - pnpm version
   - Browser (if applicable)
6. **Logs** - Error messages, stack traces
7. **Screenshots** - If visual issue

## Related Documentation

- [Project Overview](./PROJECT_OVERVIEW.md)
- [Deployment Guide](./DEPLOYMENT.md)
- [S3 Storage Setup](./S3_STORAGE.md)
- [Collections Guide](./COLLECTIONS.md)
- [Environment Variables](./ENVIRONMENT_VARIABLES.md)
- [URL Validation System](./URL_VALIDATION.md)

## Common Log Messages

### Normal/Informational

```
✓ Compiled successfully
✓ Ready in XXXms
⚠ Compiled with warnings
```
These are normal Next.js messages.

### Warnings (Usually Safe)

```
Warning: Invalid link data detected
```
See URL_VALIDATION.md - indicates incomplete link configuration.

```
Deprecated feature used
```
Usually safe, but consider updating code.

### Errors (Need Action)

```
Error: Unable to connect to database
```
Check DATABASE_URI and database status.

```
Error: ENOENT: no such file or directory
```
Missing file - check path and file existence.

```
Error: Port 3000 is already in use
```
Another process using port - kill it or use different port.

## Quick Reference Commands

```bash
# Development
pnpm dev              # Start dev server
pnpm build            # Build for production
pnpm start            # Start production server

# Maintenance
pnpm generate:types   # Generate TypeScript types
rm -rf .next          # Clear Next.js cache
rm -rf node_modules   # Remove dependencies
pnpm store prune      # Clear pnpm cache

# Database
psql $DATABASE_URI    # Connect to database
pnpm payload migrate  # Run migrations

# Debugging
NODE_ENV=development pnpm dev     # Dev mode with debugging
pnpm build --debug               # Build with debug info
```
