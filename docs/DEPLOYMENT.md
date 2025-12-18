# Deployment Guide

## Overview

This guide covers deploying the UAF Asia Pacific Payload CMS website to various platforms, with a focus on Railway (the recommended platform).

## Table of Contents

- [Railway Deployment (Recommended)](#railway-deployment-recommended)
- [Other Platform Deployments](#other-platform-deployments)
- [Post-Deployment Steps](#post-deployment-steps)
- [Troubleshooting](#troubleshooting)

## Railway Deployment (Recommended)

Railway provides the easiest and most integrated deployment experience for this project.

### One-Click Deploy

The fastest way to get started:

1. **Click the Deploy Button**

   [![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/template/L8TUlT?referralCode=-Yg50p)

2. **Configure Your Project**
   - Railway will automatically:
     - Create a PostgreSQL database
     - Set up the web service
     - Configure environment variables
     - Build and deploy your application

3. **Wait for Deployment**
   - Initial build takes 5-10 minutes
   - Monitor progress in the Railway dashboard

4. **Access Your Site**
   - Railway provides a public URL: `https://your-project.up.railway.app`
   - Admin panel: `https://your-project.up.railway.app/admin`

### Manual Railway Setup

If you prefer more control or want to connect an existing project:

#### Step 1: Create Railway Account

1. Go to [Railway.app](https://railway.app)
2. Sign up with GitHub, Google, or email
3. Verify your account

#### Step 2: Create New Project

1. Click "New Project" in Railway dashboard
2. Select "Empty Project"
3. Name your project (e.g., "uaf-payload-cms")

#### Step 3: Add PostgreSQL Database

1. Click "+ New" in your project
2. Select "Database"
3. Choose "PostgreSQL"
4. Railway automatically provisions the database

#### Step 4: Configure Repository

Two options:

**Option A: Deploy from Template**
1. Go to [Template Link](https://railway.app/template/L8TUlT?referralCode=-Yg50p)
2. Click "Deploy"
3. Connect your GitHub account
4. Choose repository location

**Option B: Deploy Existing Repository**
1. Click "+ New" in your project
2. Select "GitHub Repo"
3. Connect your repository
4. Select the branch to deploy

#### Step 5: Configure Environment Variables

Railway sets these automatically via template, but verify:

```bash
# Database (automatically set by Railway)
DATABASE_URI=${{Postgres.DATABASE_URL}}

# Payload Secret (generate a secure random string)
PAYLOAD_SECRET=your-secure-random-string-here

# Server URL (use your Railway domain)
NEXT_PUBLIC_SERVER_URL=https://your-project.up.railway.app

# S3 Storage (optional - enable if using S3)
S3_ENABLED=true
S3_ENDPOINT=your-s3-endpoint
S3_BUCKET=your-bucket-name
S3_REGION=your-region
S3_ACCESS_KEY_ID=your-access-key
S3_SECRET_ACCESS_KEY=your-secret-key
```

To add/edit variables:
1. Click on your service
2. Go to "Variables" tab
3. Click "+ New Variable"
4. Add name and value
5. Save and redeploy

#### Step 6: Configure Build Settings

Railway automatically detects settings, but verify:

- **Build Command:** `pnpm build` (defined in package.json)
- **Start Command:** `pnpm start` (defined in package.json)
- **Install Command:** `pnpm install`
- **Root Directory:** `/` (if deploying entire repo)

#### Step 7: Deploy

1. Railway automatically deploys on push to main branch
2. Monitor build logs in Railway dashboard
3. Wait for "Success" status
4. Click "View Logs" if issues occur

### Railway Configuration Files

This project is pre-configured for Railway deployment.

#### package.json Scripts

```json
{
  "scripts": {
    "build": "payload migrate && cross-env NODE_OPTIONS=--no-deprecation next build",
    "start": "cross-env NODE_OPTIONS=--no-deprecation next start",
    "dev": "cross-env NODE_OPTIONS=--no-deprecation next dev"
  }
}
```

Key features:
- Automatic migrations on build
- Next.js build optimization
- Production-ready start command

### Railway-Specific Features

#### Automatic SSL

- Railway provides free SSL certificates
- Automatic HTTPS redirect
- No configuration needed

#### Environment Variables

- Database URL automatically configured
- Reference other services: `${{Postgres.DATABASE_URL}}`
- Secure storage for secrets

#### Continuous Deployment

- Push to GitHub → Automatic deployment
- Rollback to previous deployments
- Build logs and monitoring

#### Custom Domains

1. Go to "Settings" in your service
2. Click "Domains"
3. Click "+ Custom Domain"
4. Enter your domain (e.g., `cms.yourdomain.com`)
5. Add the provided CNAME record to your DNS:
   ```
   CNAME: cms -> your-project.up.railway.app
   ```
6. Wait for DNS propagation (5-60 minutes)

### Railway Pricing

- **Free Trial:** $5 credit monthly
- **Hobby Plan:** $5/month minimum
- **Pro Plan:** Usage-based pricing

Estimated costs for this project:
- Database: ~$5-10/month
- Web Service: ~$5-10/month
- Total: ~$10-20/month

Monitor usage in Railway dashboard.

## Other Platform Deployments

### Vercel

#### Prerequisites
- PostgreSQL database (Railway, Supabase, or AWS RDS)
- S3 storage for media (or disable with `S3_ENABLED=false`)

#### Steps

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy**
   ```bash
   cd /path/to/project
   vercel
   ```

4. **Configure Environment Variables**
   - Go to Vercel Dashboard
   - Select your project
   - Go to Settings → Environment Variables
   - Add all required variables (see .env.example)

5. **Configure Build Settings**
   - Build Command: `pnpm build`
   - Output Directory: `.next`
   - Install Command: `pnpm install`

#### Important Notes
- Vercel serverless functions have size limits
- Consider using Railway for database
- S3 storage recommended for media files

### Heroku

#### Prerequisites
- Heroku account
- Heroku CLI installed
- PostgreSQL add-on

#### Steps

1. **Install Heroku CLI**
   ```bash
   curl https://cli-assets.heroku.com/install.sh | sh
   ```

2. **Login to Heroku**
   ```bash
   heroku login
   ```

3. **Create Application**
   ```bash
   heroku create your-app-name
   ```

4. **Add PostgreSQL**
   ```bash
   heroku addons:create heroku-postgresql:essential-0
   ```

5. **Set Environment Variables**
   ```bash
   heroku config:set PAYLOAD_SECRET=your-secret
   heroku config:set NEXT_PUBLIC_SERVER_URL=https://your-app-name.herokuapp.com
   heroku config:set S3_ENABLED=true
   # Add other S3 variables if needed
   ```

6. **Deploy**
   ```bash
   git push heroku main
   ```

7. **Open Application**
   ```bash
   heroku open
   ```

### DigitalOcean App Platform

#### Prerequisites
- DigitalOcean account
- PostgreSQL database (managed or self-hosted)

#### Steps

1. **Create New App**
   - Go to App Platform in DigitalOcean
   - Click "Create App"
   - Connect your GitHub repository

2. **Configure Build**
   - Build Command: `pnpm build`
   - Run Command: `pnpm start`

3. **Add Database**
   - Create managed PostgreSQL database
   - Or connect existing database

4. **Set Environment Variables**
   - Add all variables from .env.example
   - Use `${db.DATABASE_URL}` for database connection

5. **Deploy**
   - Click "Deploy"
   - Monitor build progress

### Self-Hosted (VPS)

#### Prerequisites
- Ubuntu 22.04+ or similar Linux distribution
- Node.js 20.9.0+
- PostgreSQL 14+
- Nginx (optional, for reverse proxy)
- Domain name (optional)

#### Steps

1. **Install Node.js**
   ```bash
   curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
   sudo apt-get install -y nodejs
   ```

2. **Install pnpm**
   ```bash
   npm install -g pnpm
   ```

3. **Install PostgreSQL**
   ```bash
   sudo apt-get install postgresql postgresql-contrib
   sudo -u postgres createdb payload_cms
   sudo -u postgres createuser payload_user
   sudo -u postgres psql
   ALTER USER payload_user WITH PASSWORD 'your-password';
   GRANT ALL PRIVILEGES ON DATABASE payload_cms TO payload_user;
   \q
   ```

4. **Clone Repository**
   ```bash
   git clone https://github.com/your-username/your-repo.git
   cd your-repo
   ```

5. **Install Dependencies**
   ```bash
   pnpm install
   ```

6. **Configure Environment**
   ```bash
   cp .env.example .env
   nano .env
   ```
   Update all values:
   ```bash
   DATABASE_URI=postgres://payload_user:your-password@localhost:5432/payload_cms
   PAYLOAD_SECRET=your-secure-random-string
   NEXT_PUBLIC_SERVER_URL=https://yourdomain.com
   S3_ENABLED=true  # or false
   # Add S3 variables if enabled
   ```

7. **Build Application**
   ```bash
   pnpm build
   ```

8. **Set Up PM2 (Process Manager)**
   ```bash
   npm install -g pm2
   pm2 start pnpm --name "payload-cms" -- start
   pm2 save
   pm2 startup
   ```

9. **Configure Nginx (Optional)**
   ```nginx
   server {
       listen 80;
       server_name yourdomain.com;

       location / {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

10. **Enable SSL with Certbot**
    ```bash
    sudo apt-get install certbot python3-certbot-nginx
    sudo certbot --nginx -d yourdomain.com
    ```

## Post-Deployment Steps

### 1. Verify Deployment

1. **Check Homepage**
   - Visit your site URL
   - Verify page loads correctly
   - Check for console errors

2. **Access Admin Panel**
   - Navigate to `/admin`
   - Should see login page
   - No errors in console

3. **Check Database Connection**
   - Admin panel loads = database connected
   - Try logging in (if user exists)

### 2. Create First Admin User

1. Go to `/admin/create-first-user`
2. Fill in:
   - Email
   - Password
   - Name
3. Click "Create"
4. Login with credentials

### 3. Configure Admin Settings

1. **Upload Logo**
   - Admin sidebar already has UAF logo
   - Can customize in `src/components/Logo/Logo.tsx`

2. **Configure Globals**
   - Header: Set navigation items
   - Footer: Add footer links and text
   - Navigation: Configure menu structure
   - Contact Info: Add organization details
   - Homepage: Configure homepage content

3. **Create Initial Content**
   - Create first page
   - Add some categories
   - Upload test media files

### 4. Test S3 Storage (if enabled)

1. **Upload Test Image**
   - Go to MediaCloud collection
   - Click "Create New"
   - Upload an image
   - Save

2. **Verify Upload**
   - Check S3 bucket for file
   - Verify file is accessible
   - Check image displays in admin

3. **Test Other Collections**
   - Upload to AssetCloud
   - Upload to Documents
   - Verify all working

### 5. Configure Custom Domain (Railway)

1. **Add Custom Domain**
   - Railway Settings → Domains
   - Add your domain
   - Get CNAME record

2. **Update DNS**
   - Add CNAME record to your DNS provider
   - Wait for propagation

3. **Update Environment Variables**
   ```bash
   NEXT_PUBLIC_SERVER_URL=https://yourdomain.com
   ```

4. **Redeploy**
   - Railway will rebuild with new URL

### 6. Security Checks

1. **Verify SSL**
   - Ensure HTTPS works
   - Check for mixed content warnings

2. **Test Authentication**
   - Login/logout works
   - Password reset works
   - Session management correct

3. **Check Access Control**
   - Admin routes protected
   - API endpoints secured
   - File uploads restricted

### 7. Performance Optimization

1. **Enable CDN (if using S3)**
   - CloudFront for AWS
   - DigitalOcean CDN for Spaces
   - Update environment variables

2. **Configure Caching**
   - Next.js automatic caching
   - Consider adding Redis for sessions

3. **Monitor Performance**
   - Use Railway metrics
   - Check response times
   - Monitor database queries

## Troubleshooting

### Build Failures

**Error: Migration fails during build**

```bash
Error: Unable to connect to database
```

**Solutions:**
1. Verify `DATABASE_URI` is set correctly
2. Check database is running and accessible
3. Review database credentials
4. Check network connectivity

**Error: Out of memory during build**

```bash
JavaScript heap out of memory
```

**Solutions:**
1. Increase memory limit:
   ```bash
   NODE_OPTIONS=--max-old-space-size=4096
   ```
2. Railway: Upgrade to plan with more memory
3. Optimize build process

### Deployment Issues

**Error: Port already in use**

```bash
Error: listen EADDRINUSE: address already in use :::3000
```

**Solutions:**
1. Railway handles ports automatically
2. For VPS: Kill existing process
   ```bash
   pm2 delete payload-cms
   pm2 start pnpm --name "payload-cms" -- start
   ```

**Error: Environment variables not loading**

**Solutions:**
1. Verify variables are set in platform
2. Check for typos in variable names
3. Restart application after changes
4. Check .env file is not committed (should be in .gitignore)

### Runtime Errors

**Error: 404 on admin panel**

**Solutions:**
1. Ensure build completed successfully
2. Check `NEXT_PUBLIC_SERVER_URL` is correct
3. Verify Next.js built admin routes
4. Check logs for build errors

**Error: Database connection pool exhausted**

**Solutions:**
1. Increase connection pool size:
   ```typescript
   // In payload.config.ts
   pool: {
     connectionString: process.env.DATABASE_URI,
     max: 10,  // Increase from default
   }
   ```
2. Upgrade database plan
3. Optimize queries

### S3 Upload Errors

**Error: Access denied**

**Solutions:**
1. Verify S3 credentials are correct
2. Check IAM permissions
3. Review bucket policy
4. See [S3_STORAGE.md](./S3_STORAGE.md) for detailed troubleshooting

## Monitoring & Maintenance

### Railway Monitoring

1. **View Logs**
   - Click on service
   - Go to "Deployments"
   - Click on active deployment
   - View logs in real-time

2. **Check Metrics**
   - CPU usage
   - Memory usage
   - Network traffic
   - Request counts

3. **Set Up Alerts**
   - Railway doesn't have built-in alerts
   - Use external monitoring (UptimeRobot, etc.)

### Database Maintenance

1. **Backups**
   - Railway provides automatic backups
   - Manual backup:
   ```bash
   railway run pg_dump > backup.sql
   ```

2. **Monitor Size**
   - Check database size regularly
   - Archive old data if needed

3. **Optimize**
   - Run VACUUM periodically
   - Analyze query performance
   - Add indexes where needed

### Application Updates

1. **Update Dependencies**
   ```bash
   pnpm update
   git commit -am "Update dependencies"
   git push
   ```

2. **Monitor for Security Updates**
   - Check GitHub Dependabot alerts
   - Update critical packages promptly

3. **Test Before Deploying**
   - Run locally first
   - Check for breaking changes
   - Review changelog

## Rollback Procedure

### Railway Rollback

1. Go to "Deployments" in Railway
2. Find previous successful deployment
3. Click "Redeploy"
4. Confirm rollback

### Git Rollback

```bash
# Find commit to rollback to
git log

# Create rollback commit
git revert <commit-hash>

# Push to trigger deployment
git push origin main
```

## Related Documentation

- [Environment Variables](./ENVIRONMENT_VARIABLES.md)
- [S3 Storage Setup](./S3_STORAGE.md)
- [Troubleshooting Guide](./TROUBLESHOOTING.md)
- [Project Overview](./PROJECT_OVERVIEW.md)

## Support

- Railway Support: https://railway.app/help
- Payload Discord: https://discord.gg/payload
- Project Issues: Check repository issues
- Template Guide: https://funkyton.com/payload-cms/
