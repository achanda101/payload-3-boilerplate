# Environment Variables

## Overview

This document describes all environment variables used in the UAF Asia Pacific Payload CMS project. Environment variables configure the application for different environments (development, production) without changing code.

## Required Variables

These variables must be set for the application to function:

### DATABASE_URI

**Type:** String (PostgreSQL connection URL)
**Required:** Yes
**Example:**
```bash
# Local development
DATABASE_URI=postgres://postgres:postgres@localhost:5432/payload_cms

# Production (Railway auto-sets this)
DATABASE_URI=postgres://user:pass@host.railway.app:5432/railway
```

**Description:**
PostgreSQL database connection string. Format: `postgres://username:password@host:port/database`

**Where to get:**
- **Local:** Set up PostgreSQL locally and create a database
- **Railway:** Automatically set as `${{Postgres.DATABASE_URL}}`
- **Other hosts:** Provided by hosting platform

**Troubleshooting:**
- If connection fails, verify database is running
- Check username, password, host, port, and database name
- Ensure database exists (use `createdb database_name`)

---

### PAYLOAD_SECRET

**Type:** String (Random secret key)
**Required:** Yes
**Example:**
```bash
PAYLOAD_SECRET=your-super-secret-random-string-here-change-this
```

**Description:**
Secret key used to encrypt JWT tokens and secure the admin panel. Must be a random, secure string.

**How to generate:**
```bash
# Option 1: Using openssl
openssl rand -base64 32

# Option 2: Using Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# Option 3: Online generator
# Visit: https://generate-secret.vercel.app/32
```

**Security:**
- ⚠️ **Never commit to Git**
- ⚠️ **Use different secrets for dev/production**
- ⚠️ **Keep it truly secret**
- ⚠️ **Changing it invalidates all sessions**

---

### NEXT_PUBLIC_SERVER_URL

**Type:** String (URL without trailing slash)
**Required:** Yes
**Example:**
```bash
# Local development
NEXT_PUBLIC_SERVER_URL=http://localhost:3000

# Production
NEXT_PUBLIC_SERVER_URL=https://your-domain.com
```

**Description:**
The public URL where your application is hosted. Used for:
- CORS configuration
- Link generation
- SEO metadata
- Email links
- API callbacks

**Important:**
- ❌ **No trailing slash:** `https://domain.com` ✓ not `https://domain.com/` ✗
- Must match your actual domain in production
- Include protocol (`https://` or `http://`)
- Update when changing domains

**Railway note:**
Set to your Railway domain: `https://your-project.up.railway.app`
Update to custom domain when configured.

---

## Optional Variables

### S3_ENABLED

**Type:** Boolean string
**Required:** No
**Default:** `true` (enabled)
**Example:**
```bash
# Enable S3 storage
S3_ENABLED=true

# Disable S3 storage (use local filesystem)
S3_ENABLED=false
```

**Description:**
Controls whether S3-compatible storage is used for media files.

**When to use:**
- Set to `false` for local development without S3
- Set to `true` or omit for production with S3
- **Exact string `false` required to disable**

**Behavior:**
- When enabled: Files uploaded to S3 bucket
- When disabled: Files stored in local `media/` directory

**Configuration location:**
`src/payload.config.ts:139`
```typescript
enabled: process.env.S3_ENABLED !== 'false'
```

---

### S3_BUCKET

**Type:** String
**Required:** Only if S3_ENABLED is not `false`
**Example:**
```bash
S3_BUCKET=my-payload-media
```

**Description:**
Name of the S3 bucket where media files will be stored.

**Where to get:**
- **AWS S3:** Bucket name from AWS Console
- **DigitalOcean Spaces:** Space name
- **MinIO:** Bucket name you created

**Notes:**
- Must already exist (Payload won't create it)
- Must be unique globally (for AWS)
- Check spelling carefully

---

### S3_REGION

**Type:** String
**Required:** Only if S3_ENABLED is not `false`
**Example:**
```bash
# AWS regions
S3_REGION=us-east-1
S3_REGION=eu-west-2
S3_REGION=ap-southeast-1

# DigitalOcean regions
S3_REGION=nyc3
S3_REGION=sfo3

# MinIO (can be any value)
S3_REGION=us-east-1
```

**Description:**
AWS region or equivalent for S3-compatible services.

**Common values:**
- **AWS:** See [AWS Regions](https://docs.aws.amazon.com/general/latest/gr/s3.html)
- **DigitalOcean:** `nyc3`, `sfo3`, `ams3`, `sgp1`, `fra1`
- **MinIO:** Any value (often `us-east-1`)

**Must match:**
- Region where your bucket was created
- Region in endpoint URL (if applicable)

---

### S3_ENDPOINT

**Type:** String (URL)
**Required:** For non-AWS S3 services
**Example:**
```bash
# AWS S3 (leave empty or omit)
S3_ENDPOINT=

# DigitalOcean Spaces
S3_ENDPOINT=https://nyc3.digitaloceanspaces.com

# MinIO (local)
S3_ENDPOINT=http://localhost:9000

# MinIO (production)
S3_ENDPOINT=https://minio.yourdomain.com
```

**Description:**
Custom endpoint for S3-compatible services. Leave empty for AWS S3.

**When to set:**
- ✅ DigitalOcean Spaces
- ✅ MinIO
- ✅ Wasabi
- ✅ Other S3-compatible services
- ❌ AWS S3 (leave empty)

**Format:**
- Include protocol (`https://` or `http://`)
- No trailing slash
- No bucket name in URL

---

### S3_ACCESS_KEY_ID

**Type:** String
**Required:** Only if S3_ENABLED is not `false`
**Example:**
```bash
S3_ACCESS_KEY_ID=AKIAIOSFODNN7EXAMPLE
```

**Description:**
Access key for S3 authentication. Like a username.

**Where to get:**
- **AWS:** IAM Console → Users → Security Credentials
- **DigitalOcean:** API → Spaces Keys
- **MinIO:** Access Key from MinIO Console

**Security:**
- ⚠️ **Never commit to Git**
- ⚠️ **Rotate periodically**
- ⚠️ **Limit permissions** (only what's needed)

---

### S3_SECRET_ACCESS_KEY

**Type:** String
**Required:** Only if S3_ENABLED is not `false`
**Example:**
```bash
S3_SECRET_ACCESS_KEY=wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY
```

**Description:**
Secret key for S3 authentication. Like a password.

**Where to get:**
- Same location as Access Key ID
- **Only shown once** when created
- Save immediately in secure location

**Security:**
- ⚠️ **Never commit to Git**
- ⚠️ **Never share publicly**
- ⚠️ **Store securely**
- ⚠️ **Regenerate if exposed**

---

### NODE_ENV

**Type:** String enum
**Required:** No
**Default:** Set automatically by Next.js
**Values:** `development`, `production`, `test`
**Example:**
```bash
NODE_ENV=production
```

**Description:**
Defines the environment mode. Usually set automatically.

**Behavior:**
- `development`: Debug mode, verbose logging, HMR
- `production`: Optimized, minified, caching enabled
- `test`: Testing configuration

**When to set manually:**
- Usually not needed (Next.js sets it)
- Set to `production` for production builds
- Some hosting platforms require explicit setting

---

### PORT

**Type:** Number
**Required:** No
**Default:** `3000`
**Example:**
```bash
PORT=3001
```

**Description:**
Port where the application listens.

**When to change:**
- Port 3000 already in use
- Platform requires specific port
- Multiple apps on same server

**Railway note:**
Railway automatically sets this. Don't override unless necessary.

---

### NODE_OPTIONS

**Type:** String
**Required:** No
**Default:** Set in package.json
**Example:**
```bash
NODE_OPTIONS=--max-old-space-size=4096
```

**Description:**
Options passed to Node.js runtime.

**Current configuration:**
```json
"scripts": {
  "build": "cross-env NODE_OPTIONS=--no-deprecation next build",
  "dev": "cross-env NODE_OPTIONS=--no-deprecation next dev"
}
```

**Common options:**
- `--no-deprecation`: Hide deprecation warnings
- `--max-old-space-size=4096`: Increase memory limit to 4GB
- `--inspect`: Enable debugging

---

## Platform-Specific Variables

### Railway

Railway automatically sets some variables:

```bash
# Database (auto-set by Railway)
DATABASE_URI=${{Postgres.DATABASE_URL}}

# Port (auto-set by Railway)
PORT=${{PORT}}

# Railway-specific
RAILWAY_STATIC_URL  # Your Railway subdomain
RAILWAY_PUBLIC_DOMAIN  # Your custom domain
```

**Don't override:**
- `DATABASE_URI` (unless using external database)
- `PORT` (let Railway manage)

**Do set:**
- `PAYLOAD_SECRET`
- `NEXT_PUBLIC_SERVER_URL`
- All S3 variables (if using S3)

---

### Vercel

```bash
# Vercel automatically sets
VERCEL=1
VERCEL_URL  # Deployment URL
VERCEL_ENV  # Environment (production, preview, development)
```

**Must set:**
- All required variables (DATABASE_URI, PAYLOAD_SECRET, etc.)
- Use environment variable UI in Vercel Dashboard

---

### Heroku

```bash
# Heroku automatically sets
DATABASE_URL  # PostgreSQL add-on
PORT  # Application port
```

**Configuration:**
```bash
# Set via Heroku CLI
heroku config:set PAYLOAD_SECRET=your-secret
heroku config:set NEXT_PUBLIC_SERVER_URL=https://your-app.herokuapp.com
```

---

## Environment File (.env)

### Local Development

Create `.env` file in project root:

```bash
# Copy from example
cp .env.example .env

# Edit with your values
nano .env
```

### .env.example

```bash
# Database connection string
DATABASE_URI=postgres://postgres:postgres@localhost:5432/<your-db-name>

# Used to encrypt JWT tokens
PAYLOAD_SECRET=YOUR_SECRET_HERE

# Used to configure CORS, format links and more. No trailing slash
NEXT_PUBLIC_SERVER_URL=http://localhost:3000

# Disable S3 storage for local development
S3_ENABLED=false

# S3 Storage configuration (only used when S3_ENABLED is not 'false')
# S3_ENDPOINT=your-s3-endpoint
# S3_BUCKET=your-bucket-name
# S3_REGION=your-region
# S3_ACCESS_KEY_ID=your-access-key
# S3_SECRET_ACCESS_KEY=your-secret-key
```

### .env (your actual file)

```bash
# Don't commit this file!
# It's in .gitignore

DATABASE_URI=postgres://postgres:postgres@localhost:5432/payload_dev
PAYLOAD_SECRET=abc123-generated-secret-key-xyz789
NEXT_PUBLIC_SERVER_URL=http://localhost:3000
S3_ENABLED=false
```

### .env.production (optional)

For production-specific overrides:

```bash
NODE_ENV=production
NEXT_PUBLIC_SERVER_URL=https://yourdomain.com
S3_ENABLED=true
S3_BUCKET=production-media
# ... other production values
```

---

## Setting Variables by Platform

### Railway

**Via Dashboard:**
1. Go to your project
2. Click on service
3. Go to "Variables" tab
4. Click "+ New Variable"
5. Enter name and value
6. Click "Add"
7. Redeploy (automatic)

**Via CLI:**
```bash
railway variables set PAYLOAD_SECRET=your-secret
railway variables set NEXT_PUBLIC_SERVER_URL=https://your-domain.com
```

**Reference other services:**
```bash
DATABASE_URI=${{Postgres.DATABASE_URL}}
```

---

### Vercel

**Via Dashboard:**
1. Project Settings → Environment Variables
2. Enter name, value, and environment (Production/Preview/Development)
3. Click "Add"
4. Redeploy

**Via CLI:**
```bash
vercel env add PAYLOAD_SECRET production
# Enter value when prompted
```

---

### Heroku

**Via Dashboard:**
1. App Settings → Config Vars
2. Click "Reveal Config Vars"
3. Add key-value pairs
4. Automatic deployment

**Via CLI:**
```bash
heroku config:set PAYLOAD_SECRET=your-secret -a your-app-name
heroku config:set NEXT_PUBLIC_SERVER_URL=https://your-app.herokuapp.com
```

**View current:**
```bash
heroku config -a your-app-name
```

---

### Self-Hosted (VPS)

**Using .env file:**
```bash
# On server
cd /path/to/app
nano .env
# Add all variables
```

**Using systemd service:**
```ini
# /etc/systemd/system/payload.service
[Service]
Environment="DATABASE_URI=postgres://..."
Environment="PAYLOAD_SECRET=..."
Environment="NEXT_PUBLIC_SERVER_URL=https://..."
```

**Using PM2:**
```json
// ecosystem.config.js
module.exports = {
  apps: [{
    name: 'payload-cms',
    script: 'pnpm',
    args: 'start',
    env: {
      DATABASE_URI: 'postgres://...',
      PAYLOAD_SECRET: 'your-secret',
      NEXT_PUBLIC_SERVER_URL: 'https://...',
    }
  }]
}
```

---

## Validation and Testing

### Check Variables Are Set

```bash
# In development
node -e "console.log(process.env.DATABASE_URI)"

# In production (Railway)
railway run echo $DATABASE_URI
```

### Verify in Application

```typescript
// Add to src/payload.config.ts temporarily
console.log('DATABASE_URI:', process.env.DATABASE_URI ? '✓ Set' : '✗ Missing')
console.log('PAYLOAD_SECRET:', process.env.PAYLOAD_SECRET ? '✓ Set' : '✗ Missing')
console.log('NEXT_PUBLIC_SERVER_URL:', process.env.NEXT_PUBLIC_SERVER_URL)
console.log('S3_ENABLED:', process.env.S3_ENABLED)
```

### Test Database Connection

```bash
# Using psql
psql $DATABASE_URI -c "SELECT 1"

# Should output:
# ?column?
# ----------
#         1
```

### Test S3 Connection

```bash
# Using AWS CLI (if AWS S3)
aws s3 ls s3://$S3_BUCKET --region $S3_REGION

# Using s3cmd (S3-compatible)
s3cmd ls s3://$S3_BUCKET
```

---

## Security Best Practices

### DO

✅ Use environment variables for secrets
✅ Use different secrets for dev/production
✅ Generate long, random secrets
✅ Add `.env` to `.gitignore`
✅ Use platform secret management (Railway variables, etc.)
✅ Rotate secrets periodically
✅ Use IAM roles instead of access keys when possible
✅ Limit IAM permissions to minimum required
✅ Document required variables

### DON'T

❌ Commit `.env` file to Git
❌ Share secrets in chat/email
❌ Use simple/guessable secrets
❌ Hardcode secrets in code
❌ Use same secrets across environments
❌ Expose secrets in logs
❌ Include secrets in error messages
❌ Store secrets in browser localStorage

---

## Variable Reference Table

| Variable | Required | Default | Used In | Description |
|----------|----------|---------|---------|-------------|
| `DATABASE_URI` | ✅ Yes | - | Backend | PostgreSQL connection string |
| `PAYLOAD_SECRET` | ✅ Yes | - | Backend | JWT encryption secret |
| `NEXT_PUBLIC_SERVER_URL` | ✅ Yes | - | Both | Public application URL |
| `S3_ENABLED` | ❌ No | `true` | Backend | Enable/disable S3 storage |
| `S3_BUCKET` | ⚠️ Conditional | - | Backend | S3 bucket name |
| `S3_REGION` | ⚠️ Conditional | - | Backend | S3 region |
| `S3_ENDPOINT` | ⚠️ Conditional | - | Backend | S3 endpoint URL |
| `S3_ACCESS_KEY_ID` | ⚠️ Conditional | - | Backend | S3 access key |
| `S3_SECRET_ACCESS_KEY` | ⚠️ Conditional | - | Backend | S3 secret key |
| `NODE_ENV` | ❌ No | Auto | Both | Environment mode |
| `PORT` | ❌ No | `3000` | Backend | Application port |

⚠️ Conditional = Required only if `S3_ENABLED` is not `false`

---

## Troubleshooting

### Variables not loading

**Symptom:** `undefined` when accessing `process.env.VARIABLE`

**Solutions:**
1. Restart dev server (variables load at startup)
2. Check `.env` file exists in project root
3. Verify no spaces around `=`: `VAR=value` ✓ not `VAR = value` ✗
4. For client-side access, prefix with `NEXT_PUBLIC_`

---

### Database connection fails

**Symptom:** `Error: Unable to connect to database`

**Solutions:**
1. Verify `DATABASE_URI` format: `postgres://user:pass@host:port/db`
2. Check database is running: `psql $DATABASE_URI`
3. Verify credentials are correct
4. Check network access (firewall, security groups)

---

### S3 uploads fail

**Symptom:** `Access Denied` or connection errors

**Solutions:**
1. Verify all S3 variables are set correctly
2. Check `S3_ENABLED` is not exactly `false` (if you want S3)
3. Test credentials with AWS CLI
4. Review IAM permissions
5. See [S3_STORAGE.md](./S3_STORAGE.md) for detailed troubleshooting

---

### Admin panel blank

**Symptom:** White screen at `/admin`

**Solutions:**
1. Check `NEXT_PUBLIC_SERVER_URL` matches actual URL
2. Verify `PAYLOAD_SECRET` is set
3. Clear browser cache
4. Rebuild application: `rm -rf .next && pnpm build`

---

## Related Documentation

- [Deployment Guide](./DEPLOYMENT.md) - Setting variables per platform
- [S3 Storage Setup](./S3_STORAGE.md) - S3-specific variables
- [Troubleshooting](./TROUBLESHOOTING.md) - Common issues
- [Project Overview](./PROJECT_OVERVIEW.md) - Architecture overview

---

## Quick Start Checklist

**Local Development:**
- [ ] `cp .env.example .env`
- [ ] Set `DATABASE_URI` (local PostgreSQL)
- [ ] Generate and set `PAYLOAD_SECRET`
- [ ] Set `NEXT_PUBLIC_SERVER_URL=http://localhost:3000`
- [ ] Set `S3_ENABLED=false` (or configure S3)
- [ ] Run `pnpm dev`

**Production (Railway):**
- [ ] Set `PAYLOAD_SECRET` (generate new)
- [ ] Set `NEXT_PUBLIC_SERVER_URL` (your domain)
- [ ] Configure S3 variables (or keep `S3_ENABLED=false`)
- [ ] `DATABASE_URI` auto-set by Railway
- [ ] Deploy

**Production (Other):**
- [ ] Set `DATABASE_URI` (production database)
- [ ] Set `PAYLOAD_SECRET` (unique secret)
- [ ] Set `NEXT_PUBLIC_SERVER_URL` (your domain)
- [ ] Configure S3 variables
- [ ] Set `NODE_ENV=production`
- [ ] Build and deploy
