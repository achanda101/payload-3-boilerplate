# S3 Storage Configuration

## Overview

This project uses S3-compatible storage for managing media files, assets, and documents. The storage system is configurable and can be enabled or disabled based on your deployment environment.

**Important:** S3-compatible storage is **strongly recommended** for all environments. Using local filesystem storage has a **1MB upload limit** imposed by Next.js Server Actions (see [File Upload Size Limit](#file-upload-size-limit-1mb---critical) below).

## Features

- **Conditional Storage** - Enable/disable S3 via environment variable
- **Multiple Collections** - Separate storage for media, assets, and documents
- **S3-Compatible** - Works with Cloudflare R2, AWS S3, Supabase Storage, MinIO, and others
- **Flexible Configuration** - Customizable endpoint, region, and credentials
- **Secure** - TLS encryption and proper credential management

## Configuration

### Environment Variables

The S3 storage system requires the following environment variables:

```bash
# Enable/Disable S3 Storage
S3_ENABLED=true              # Set to 'false' to disable S3 storage

# S3 Bucket Configuration
S3_BUCKET=your-bucket-name   # Name of your S3 bucket
S3_REGION=auto               # 'auto' for R2, AWS region for S3

# S3 Endpoint (required for all S3-compatible services except AWS S3)
S3_ENDPOINT=https://your-endpoint.com

# S3 Credentials
S3_ACCESS_KEY_ID=your-access-key-id
S3_SECRET_ACCESS_KEY=your-secret-access-key
```

### Configuration Location

**File:** `src/payload.config.ts`

```typescript
s3Storage({
  enabled: process.env.S3_ENABLED !== 'false',
  collections: {
    mediaCloud: true,    // Images.
    assetCloud: true,    // Design assets (images).
    documents: true,     // PDFs
  },
  bucket: process.env.S3_BUCKET || '',
  config: {
    region: process.env.S3_REGION || 'auto',
    endpoint: process.env.S3_ENDPOINT || '',
    credentials: {
      accessKeyId: process.env.S3_ACCESS_KEY_ID || '',
      secretAccessKey: process.env.S3_SECRET_ACCESS_KEY || '',
    },
    forcePathStyle: true,
  },
})
```

> **Note:** Do NOT add `tls: true` or `signingEscapePath: false` to the config — these are not valid AWS SDK v3 options and will cause SSL handshake failures with some providers (notably Cloudflare R2).

## File Upload Size Limit (1MB) - CRITICAL

### The Problem

Next.js enforces a **1MB body size limit on Server Actions** by default. When you upload a file through Payload's admin panel, the file data is sent via a Server Action to the Next.js server, which then forwards it to S3 storage. Any file exceeding 1MB triggers this error:

```
Error: Body exceeded 1 MB limit.
To configure the body size limit for Server Actions, see:
https://nextjs.org/docs/app/api-reference/next-config-js/serverActions#bodysizelimit
```

**This limit applies even when S3 storage is enabled**, because the file still passes through Next.js before being uploaded to S3.

### The Solution

The `serverActions.bodySizeLimit` must be configured **inside the `experimental` object** in `next.config.js`. This is the correct placement — placing it at the top level of the config will cause a validation warning and be ignored.

**File:** `next.config.js`

```javascript
const nextConfig = {
  // ... other config ...

  experimental: {
    optimizePackageImports: ['lucide-react'],
    // Increase Server Actions body size limit for file uploads
    serverActions: {
      bodySizeLimit: '50mb',
    },
  },
}

export default withPayload(nextConfig)
```

### Why `experimental`?

- In Next.js 15, even though Server Actions are a stable feature, the `serverActions` configuration still lives under `experimental` in `next.config.js`.
- The `withPayload()` wrapper from `@payloadcms/next` passes through the `experimental` object untouched (it uses a spread operator internally).
- Payload CMS's own monorepo uses this exact approach: `experimental.serverActions.bodySizeLimit`.
- Placing `serverActions` at the top level causes: `⚠ Unrecognized key(s) in object: 'serverActions'`

### Payload Upload Limit vs Next.js Limit

There are **two separate limits** that work at different layers:

| Limit | Location | Default | Purpose |
|-------|----------|---------|---------|
| **Next.js Server Actions** | `next.config.js` → `experimental.serverActions.bodySizeLimit` | 1MB | HTTP request body size for the entire POST request |
| **Payload Upload** | `payload.config.ts` → `upload.limits.fileSize` | N/A (set to 50MB) | Maximum file size Payload will accept after the request reaches it |

Both limits must allow the file size you want to support. The Next.js limit is checked first — if the request body exceeds it, Payload never even sees the file.

### Impact on Different Environments

| Environment | Storage | Affected by 1MB Limit? | Solution |
|------------|---------|----------------------|----------|
| Local Dev (filesystem) | `media/` directory | **Yes** | Set `bodySizeLimit` in next.config.js |
| Local Dev (S3/R2) | Cloudflare R2 | **Yes** (file still passes through Next.js) | Set `bodySizeLimit` in next.config.js |
| Production (Railway) | Supabase S3 | **Yes** | Set `bodySizeLimit` in next.config.js |
| Production (VPS) | Any S3-compatible | **Yes** | Set `bodySizeLimit` in next.config.js |

**The `bodySizeLimit` must be configured in ALL environments.** It is not S3-specific — it is a Next.js server-level limit.

## Setup Instructions

### Option 1: Cloudflare R2 (Current Dev Setup)

Cloudflare R2 is S3-compatible with no egress fees.

1. **Create an R2 Bucket**
   - Go to Cloudflare Dashboard → R2 Object Storage
   - Click "Create bucket"
   - Name it (e.g., `uafanp-payload-dev-media`)
   - Select location (e.g., Asia-Pacific APAC)

2. **Create R2 API Token**
   - Go to R2 → Manage R2 API Tokens
   - Click "Create API token"
   - Set permissions: Read, Write, List on desired buckets
   - **Important:** Copy the credentials immediately — they won't be shown again
   - You will receive: Token value, Access Key ID, Secret Access Key, and S3 endpoint

3. **Configure Environment Variables**
   ```bash
   S3_ENABLED=true
   S3_ENDPOINT=https://<account-id>.r2.cloudflarestorage.com
   S3_BUCKET=uafanp-payload-dev-media
   S3_REGION=auto
   S3_ACCESS_KEY_ID=your-access-key-id
   S3_SECRET_ACCESS_KEY=your-secret-access-key
   ```

4. **Common Pitfalls with R2**
   - **Endpoint URL must be exact** — even a single character wrong in the account ID will cause SSL handshake failures (`sslv3 alert handshake failure`). Always copy the endpoint directly from the Cloudflare dashboard.
   - **Region must be `auto`** — R2 uses `auto` for region, not a specific AWS region code.
   - **Do NOT add `tls: true`** to the S3 config — this causes SSL errors with R2.
   - **Credentials are shown once** — if you lose them, you must delete the token and create a new one.

### Option 2: Supabase Storage (Current Production Setup)

Supabase provides S3-compatible storage.

1. **Create a Supabase Project** (or use existing)
2. **Get S3 Credentials**
   - Go to Project Settings → Storage
   - Find the S3 connection details
3. **Configure Environment Variables**
   ```bash
   S3_ENABLED=true
   S3_ENDPOINT=https://<project-ref>.supabase.co/storage/v1/s3
   S3_BUCKET=your-bucket-name
   S3_REGION=your-region
   S3_ACCESS_KEY_ID=your-access-key
   S3_SECRET_ACCESS_KEY=your-secret-key
   ```

### Option 3: AWS S3

1. **Create an S3 Bucket**
   - Go to AWS S3 Console
   - Click "Create bucket"
   - Choose a unique bucket name
   - Select a region close to your users
   - Enable "Block all public access" (Payload handles access)

2. **Create IAM User**
   - Go to AWS IAM Console
   - Create a new user for Payload CMS
   - Attach policy for S3 access:
   ```json
   {
     "Version": "2012-10-17",
     "Statement": [
       {
         "Effect": "Allow",
         "Action": [
           "s3:PutObject",
           "s3:GetObject",
           "s3:DeleteObject",
           "s3:ListBucket"
         ],
         "Resource": [
           "arn:aws:s3:::your-bucket-name",
           "arn:aws:s3:::your-bucket-name/*"
         ]
       }
     ]
   }
   ```
   - Save the Access Key ID and Secret Access Key

3. **Configure Environment Variables**
   ```bash
   S3_ENABLED=true
   S3_BUCKET=your-bucket-name
   S3_REGION=us-east-1
   S3_ENDPOINT=    # Leave empty for AWS S3
   S3_ACCESS_KEY_ID=your-access-key-id
   S3_SECRET_ACCESS_KEY=your-secret-access-key
   ```

### Option 4: MinIO (Self-Hosted)

MinIO is a self-hosted S3-compatible storage server. Useful for VPS deployments where you want to keep storage on the same server.

1. **Install MinIO**
   ```bash
   # Docker (recommended)
   docker run -d \
     --name payload-minio \
     -p 9000:9000 \
     -p 9001:9001 \
     -e "MINIO_ROOT_USER=minioadmin" \
     -e "MINIO_ROOT_PASSWORD=minioadmin" \
     -v /data/minio:/data \
     minio/minio server /data --console-address ":9001"
   ```

2. **Create Bucket**
   - Access MinIO Console at `http://your-server:9001`
   - Create a new bucket (e.g., `payload-media`)

3. **Configure Environment Variables**
   ```bash
   S3_ENABLED=true
   S3_BUCKET=payload-media
   S3_REGION=us-east-1          # Can be any value for MinIO
   S3_ENDPOINT=http://localhost:9000
   S3_ACCESS_KEY_ID=minioadmin
   S3_SECRET_ACCESS_KEY=minioadmin
   ```

### Option 5: Disable S3 (Local Filesystem)

**Not recommended** due to the 1MB upload limit (see above).

```bash
S3_ENABLED=false
# Other S3_ variables can be omitted
```

If you must use local filesystem, ensure `experimental.serverActions.bodySizeLimit` is set in `next.config.js` to allow uploads larger than 1MB.

## VPS Deployment Guide (Greenhost)

This section is for the DevOps engineer setting up Payload CMS on a Greenhost VPS.

### Prerequisites

- Ubuntu/Debian-based VPS
- Node.js ^18.20.2 or >=20.9.0
- PostgreSQL 14+
- Reverse proxy (Nginx or Caddy)
- At least 2GB RAM (4GB recommended for builds)

### 1. PostgreSQL Setup

```bash
# Install PostgreSQL
sudo apt install postgresql postgresql-contrib

# Create database and user
sudo -u postgres psql
CREATE USER payload_user WITH PASSWORD 'secure_password_here';
CREATE DATABASE uafanp_payload;
GRANT ALL PRIVILEGES ON DATABASE uafanp_payload TO payload_user;
\q
```

Set the environment variable:
```bash
DATABASE_URI=postgres://payload_user:secure_password_here@localhost:5432/uafanp_payload
```

### 2. Media Storage Options for VPS

You have three main options for media storage on a VPS:

#### Option A: Cloudflare R2 (Recommended)
- No egress fees
- Global CDN built-in
- S3-compatible API
- See [Cloudflare R2 setup](#option-1-cloudflare-r2-current-dev-setup) above

#### Option B: Self-hosted MinIO
- Files stay on your server
- No external dependencies
- Requires disk space management
- See [MinIO setup](#option-4-minio-self-hosted) above
- **Important:** Use a persistent volume mount (`-v /data/minio:/data`) so files survive container restarts

#### Option C: Supabase Storage
- Managed service, no server maintenance
- S3-compatible
- See [Supabase setup](#option-2-supabase-storage-current-production-setup) above

### 3. Critical Configuration Checklist

| Item | Action | Why |
|------|--------|-----|
| `PAYLOAD_SECRET` | Set to a long random string (64+ chars) | Encrypts JWT tokens; must be unique per environment |
| `NEXT_PUBLIC_SERVER_URL` | Set to your domain (e.g., `https://cms.yourdomain.org`) | Used for CORS, links, and metadata; **no trailing slash** |
| `experimental.serverActions.bodySizeLimit` | Set to `'10mb'` or higher in `next.config.js` | Without this, file uploads > 1MB will fail with 413 error |
| `upload.limits.fileSize` | Currently 50MB in `payload.config.ts` | Adjust if you need larger uploads |
| `S3_ENABLED` | Set to `true` | Required for S3 storage |
| S3 credentials | Set all `S3_*` variables | Required for file uploads |
| PostgreSQL | Ensure database is running and accessible | Application won't start without it |

### 4. Building for Production on VPS

```bash
# Install dependencies
pnpm install

# Build (this also runs database migrations automatically)
pnpm build

# Start production server
pnpm start
```

**Important:** The build step runs `payload migrate` automatically. If the database is not accessible during build, it will fail.

### 5. Reverse Proxy Configuration (Nginx)

```nginx
server {
    listen 443 ssl;
    server_name cms.yourdomain.org;

    # SSL configuration
    ssl_certificate /path/to/cert.pem;
    ssl_certificate_key /path/to/key.pem;

    # Increase body size limit for file uploads
    client_max_body_size 50M;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;

        # Timeout settings for large uploads
        proxy_connect_timeout 300;
        proxy_send_timeout 300;
        proxy_read_timeout 300;
    }
}
```

**Critical:** Set `client_max_body_size` to at least match your desired upload limit. The default Nginx limit is 1MB, which will cause the same upload failure at the proxy level.

### 6. Process Manager (PM2)

```bash
# Install PM2
npm install -g pm2

# Start the application
pm2 start pnpm --name "payload-cms" -- start

# Save PM2 process list
pm2 save

# Set PM2 to start on boot
pm2 startup
```

### 7. Common VPS Issues

| Issue | Symptom | Solution |
|-------|---------|----------|
| Build fails with OOM | `FATAL ERROR: heap out of memory` | Add `NODE_OPTIONS=--max-old-space-size=4096` to build command |
| Database connection refused | `ECONNREFUSED` on startup | Ensure PostgreSQL is running: `sudo systemctl status postgresql` |
| 413 Payload Too Large | File upload fails | Check **all three layers**: Nginx `client_max_body_size`, Next.js `serverActions.bodySizeLimit`, Payload `upload.limits.fileSize` |
| S3 connection timeout | Upload hangs then fails | Check firewall allows outbound HTTPS (port 443) |
| SSL handshake failure | `sslv3 alert handshake failure` | Verify S3 endpoint URL is correct (copy directly from provider dashboard) |
| Unauthorized (401) from S3 | `S3ServiceException: Unauthorized` | Verify S3 credentials are correct; regenerate API token if needed |
| Migrations fail | Schema errors on startup | Run `pnpm payload migrate` manually; check DATABASE_URI |

## Collections Using S3

### MediaCloud
**File:** `src/collections/MediaCloud.ts`

Stores images, videos, and other media files for website content (hero images, gallery photos, featured images).

### AssetCloud
**File:** `src/collections/AssetCloud.ts`

Stores downloadable assets (PDFs, presentations, marketing materials).

### Documents
**File:** `src/collections/Documents.ts`

Stores document files for the document library (reports, policy documents, guidelines).

## Best Practices

### Security

1. **Never commit credentials** — Use environment variables only; `.env` is in `.gitignore`
2. **Use IAM roles when possible** — On AWS, use EC2/ECS IAM roles instead of access keys
3. **Restrict bucket permissions** — Only allow necessary operations (GET, PUT, DELETE)
4. **Enable bucket versioning** — Protects against accidental deletions

### Performance

1. **Use CDN** — CloudFront (AWS), Cloudflare (R2 has built-in CDN), or standalone CDN
2. **Optimize images** — Payload CMS handles resizing automatically via Sharp
3. **Choose region wisely** — Select a region close to your users

### Cost Optimization

1. **Cloudflare R2 has no egress fees** — Good for high-traffic sites
2. **Set lifecycle policies** — Archive or delete old files automatically
3. **Monitor usage** — Track storage size and transfer costs

## Related Documentation

- [TROUBLESHOOTING.md](./TROUBLESHOOTING.md) - General troubleshooting
- [ENVIRONMENT_VARIABLES.md](./ENVIRONMENT_VARIABLES.md) - All environment variables
- [DEPLOYMENT.md](./DEPLOYMENT.md) - Deployment guide
- [Payload Storage Plugin Docs](https://payloadcms.com/docs/upload/overview)
- [Next.js serverActions config](https://nextjs.org/docs/app/api-reference/next-config-js/serverActions)
- [Cloudflare R2 Docs](https://developers.cloudflare.com/r2/)
