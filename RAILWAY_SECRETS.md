# Railway Environment Variables Configuration

## Security Best Practices

This project follows Docker security best practices by **NOT** including secrets in the Docker image. All sensitive configuration must be provided at runtime through Railway's environment variables.

## Required Environment Variables

Configure these in your Railway project dashboard under **Variables**:

### Database
- `DATABASE_URI` - PostgreSQL connection string
  - Example: `postgresql://user:password@host:5432/database`

### PayloadCMS
- `PAYLOAD_SECRET` - Used to encrypt JWT tokens (generate a secure random string)
- `PAYLOAD_URL` - Full URL where PayloadCMS admin is accessible
  - Example: `https://your-app.up.railway.app`

### Frontend (Next.js)
- `NEXT_PUBLIC_SERVER_URL` - Public URL for your application (no trailing slash)
  - Example: `https://your-app.up.railway.app`
- `NEXT_PUBLIC_SHOW_COLUMN_INDICATORS` - Set to `false` in production
- `NEXT_PUBLIC_BUILDER_API_KEY` - Builder.io API key (if using)

### S3 Storage (Supabase or Cloudflare R2)
- `S3_ENDPOINT` - S3-compatible storage endpoint
- `S3_BUCKET` - Bucket name
- `S3_REGION` - Region identifier
- `S3_ACCESS_KEY_ID` - Access key for S3 storage
- `S3_SECRET_ACCESS_KEY` - Secret access key for S3 storage

### Optional (Development)
- `NEXT_PUBLIC_ENABLE_AUTO_LOGIN` - Set to `true` only in development/demo environments

## How to Configure in Railway

### Method 1: Railway Dashboard (Recommended)
1. Go to your Railway project
2. Click on your service
3. Navigate to the **Variables** tab
4. Click **+ New Variable**
5. Add each variable with its value
6. Railway will automatically restart your service with the new variables

### Method 2: Railway CLI
```bash
# Set a single variable
railway variables set DATABASE_URI="your-connection-string"

# Set multiple variables from .env file
railway variables set --from-file .env
```

### Method 3: Bulk Import
1. In Railway dashboard, go to **Variables** tab
2. Click **Raw Editor**
3. Paste all your environment variables in KEY=VALUE format
4. Click **Save**

## Security Notes

### ✅ DO:
- Store secrets only in Railway's environment variables
- Use different secrets for development/production
- Rotate secrets regularly
- Use Railway's secret reference feature for shared variables

### ❌ DON'T:
- Never commit `.env` files to git
- Never hardcode secrets in Dockerfile using `ENV` or `ARG`
- Never expose secrets in client-side code (except `NEXT_PUBLIC_*` vars)
- Never share secrets in chat, email, or documentation

## Generating Secure Secrets

For `PAYLOAD_SECRET` and similar tokens, generate cryptographically secure random strings:

```bash
# Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# OpenSSL
openssl rand -hex 32

# Python
python3 -c "import secrets; print(secrets.token_hex(32))"
```

## Environment Variable Precedence

Railway injects environment variables at runtime, which means:
1. Railway variables override any default values in your code
2. The `.env` file is NOT included in the Docker image (see `.dockerignore`)
3. Variables are available to your application via `process.env`

## Troubleshooting

### App fails to start after deployment
- Check Railway logs: `railway logs`
- Verify all required variables are set in Railway dashboard
- Ensure connection strings are correctly formatted

### Database connection issues
- Verify `DATABASE_URI` format matches your database provider
- Check if Railway's internal networking requires different connection strings
- Test database connectivity from Railway's environment

### S3 storage not working
- Verify all S3_* variables are set correctly
- Test endpoint connectivity (some S3 providers have CORS restrictions)
- Check bucket permissions and access keys

## Reference Files

- `.dockerignore` - Ensures `.env` files are never copied into Docker images
- `.Dockerfile` - Multi-stage build that does NOT include secrets
- `.env.example` - Template for local development (create your own `.env` from this)
