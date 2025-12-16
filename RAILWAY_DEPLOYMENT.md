# Railway Deployment Guide - Fixing Blank Admin Page

## Problem
The admin login page appears blank on Railway deployment, showing only empty divs and React Suspense boundaries.

## Root Causes Identified

### 1. Missing NEXT_PUBLIC_SERVER_URL at Build Time
- **Issue**: The `NEXT_PUBLIC_SERVER_URL` environment variable must be available during the build phase
- **Impact**: Without it, Next.js builds with `undefined`, causing hydration mismatches
- **Solution**: Set it as a build-time environment variable on Railway

### 2. Component Hydration Failures
- **Fixed**: Logo component now has fallback URL
- **Fixed**: Avatar component now has error handling

## Step-by-Step Fix for Railway

### Step 1: Set Environment Variables on Railway

In your Railway project dashboard, go to **Variables** and add:

```bash
# CRITICAL - Must be set BEFORE building
NEXT_PUBLIC_SERVER_URL=https://your-app-name.up.railway.app

# Database (from Railway Postgres service)
DATABASE_URI=postgresql://postgres:password@host:port/database

# Security
PAYLOAD_SECRET=your-long-random-secret-key-here

# S3 Storage (Supabase)
S3_BUCKET=your-bucket-name
S3_REGION=auto
S3_ENDPOINT=https://your-project.supabase.co/storage/v1/s3
S3_ACCESS_KEY_ID=your-access-key
S3_SECRET_ACCESS_KEY=your-secret-key

# Environment
NODE_ENV=production
```

### Step 2: Get Your Railway App URL

1. In Railway dashboard, click on your service
2. Go to **Settings** → **Domains**
3. Copy the Railway-provided domain (e.g., `your-app.up.railway.app`)
4. Use this as your `NEXT_PUBLIC_SERVER_URL` value

### Step 3: Trigger Redeploy

After setting all environment variables:

```bash
# Option 1: Push a new commit
git add .
git commit -m "fix: add Railway deployment config"
git push

# Option 2: Manual redeploy in Railway dashboard
# Click "Deploy" → "Redeploy" in Railway UI
```

### Step 4: Verify Build Logs

Watch the Railway build logs for:
- ✓ Migration runs successfully
- ✓ Next.js build completes
- ✓ No errors about undefined environment variables

### Step 5: Test the Deployment

1. Visit `https://your-app.up.railway.app/admin`
2. You should see the login page with:
   - UAF A&P logo
   - Email and password fields
   - "Welcome to your content management system!" message

## Common Issues & Solutions

### Issue: Page Still Blank After Deploy

**Check Browser Console:**
```javascript
// In browser console, type:
console.log(window.location.href)
// Should show your Railway URL
```

**Check for Hydration Errors:**
- Open browser DevTools → Console
- Look for "Hydration failed" or "Text content does not match" errors
- These indicate client/server mismatch

**Solution:**
1. Clear Railway build cache:
   - Settings → Restart → Clear Build Cache
2. Redeploy

### Issue: Images Not Loading

**Check:**
- Are images in `/public` folder committed to git?
- Is the `public` folder in `.gitignore`? (it shouldn't be)

**Solution:**
```bash
# Make sure public folder is tracked
git add public/
git commit -m "fix: ensure public assets are included"
git push
```

### Issue: Database Connection Errors

**Check Railway Logs:**
```bash
# In Railway dashboard: View Logs
# Look for "Error: connect ECONNREFUSED" or similar
```

**Solution:**
- Ensure `DATABASE_URI` uses the Railway Postgres internal URL
- Check Postgres service is running
- Verify connection string format:
  ```
  postgresql://postgres:[PASSWORD]@[HOST]:[PORT]/[DATABASE]
  ```

### Issue: S3 Storage Not Working

**Symptoms:**
- Images upload successfully in local dev
- Images fail to upload in production

**Solution:**
1. Verify S3 credentials are correct
2. Check Supabase bucket permissions
3. Ensure `forcePathStyle: true` in S3 config (already set)

## Files Modified to Fix This Issue

1. ✅ `src/components/Logo/Logo.tsx` - Added fallback URL
2. ✅ `src/components/ui/avatar.tsx` - Added error handling
3. ✅ `railway.json` - Railway deployment config
4. ✅ `.env.production.example` - Environment variable template

## Verification Checklist

- [ ] All environment variables set on Railway
- [ ] `NEXT_PUBLIC_SERVER_URL` points to Railway domain
- [ ] Build completes without errors
- [ ] Admin page loads at `/admin`
- [ ] Can see login form
- [ ] Can login with credentials
- [ ] No console errors in browser
- [ ] Images/assets loading correctly

## Need Help?

If the issue persists:

1. **Check Railway Logs:**
   - Build logs for compilation errors
   - Runtime logs for server errors

2. **Check Browser Console:**
   - Press F12
   - Look for JavaScript errors
   - Check Network tab for failed requests

3. **Enable Debug Mode:**
   Add to Railway environment variables:
   ```
   DEBUG=payload:*
   ```

4. **Verify Database Migrations:**
   ```bash
   # SSH into Railway container (if available)
   pnpm payload migrate:status
   ```

## Additional Resources

- [Payload CMS Deployment Docs](https://payloadcms.com/docs/production/deployment)
- [Next.js Environment Variables](https://nextjs.org/docs/basic-features/environment-variables)
- [Railway Documentation](https://docs.railway.app)
