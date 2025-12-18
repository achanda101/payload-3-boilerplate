# S3 Storage Configuration

## Overview

This project uses S3-compatible storage for managing media files, assets, and documents. The storage system is configurable and can be enabled or disabled based on your deployment environment.

## Features

- **Conditional Storage** - Enable/disable S3 via environment variable
- **Multiple Collections** - Separate storage for media, assets, and documents
- **S3-Compatible** - Works with AWS S3, DigitalOcean Spaces, MinIO, and others
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
S3_REGION=us-east-1          # AWS region or compatible region

# S3 Endpoint (optional for AWS, required for S3-compatible services)
S3_ENDPOINT=https://your-endpoint.com  # Leave empty for AWS S3

# S3 Credentials
S3_ACCESS_KEY_ID=your-access-key-id
S3_SECRET_ACCESS_KEY=your-secret-access-key
```

### Configuration Location

**File:** `src/payload.config.ts:138-157`

```typescript
s3Storage({
  enabled: process.env.S3_ENABLED !== 'false',
  collections: {
    mediaCloud: true,    // Images, videos, etc.
    assetCloud: true,    // PDFs, documents, etc.
    documents: true,     // Document files
  },
  bucket: process.env.S3_BUCKET || '',
  config: {
    region: process.env.S3_REGION || '',
    endpoint: process.env.S3_ENDPOINT || '',
    credentials: {
      accessKeyId: process.env.S3_ACCESS_KEY_ID || '',
      secretAccessKey: process.env.S3_SECRET_ACCESS_KEY || '',
    },
    forcePathStyle: true,
    tls: true,
    signingEscapePath: false,
  },
})
```

## Setup Instructions

### Option 1: AWS S3

1. **Create an S3 Bucket**
   - Go to AWS S3 Console
   - Click "Create bucket"
   - Choose a unique bucket name
   - Select a region close to your users
   - Configure bucket settings (keep defaults for most cases)
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

### Option 2: DigitalOcean Spaces

1. **Create a Space**
   - Go to DigitalOcean Spaces
   - Click "Create a Space"
   - Choose datacenter region
   - Name your Space
   - Select CDN option (optional but recommended)

2. **Generate API Keys**
   - Go to API section
   - Generate Spaces access keys
   - Save both Access Key and Secret Key

3. **Configure Environment Variables**
   ```bash
   S3_ENABLED=true
   S3_BUCKET=your-space-name
   S3_REGION=nyc3                          # Your Space's region
   S3_ENDPOINT=https://nyc3.digitaloceanspaces.com
   S3_ACCESS_KEY_ID=your-access-key
   S3_SECRET_ACCESS_KEY=your-secret-key
   ```

### Option 3: MinIO (Self-Hosted)

1. **Install MinIO**
   - Follow [MinIO installation guide](https://min.io/docs/minio/linux/operations/install-deploy-manage/deploy-minio-single-node-single-drive.html)
   - Or use Docker:
   ```bash
   docker run -p 9000:9000 -p 9001:9001 \
     -e "MINIO_ROOT_USER=minioadmin" \
     -e "MINIO_ROOT_PASSWORD=minioadmin" \
     minio/minio server /data --console-address ":9001"
   ```

2. **Create Bucket**
   - Access MinIO Console (default: http://localhost:9001)
   - Create a new bucket
   - Set appropriate access policies

3. **Configure Environment Variables**
   ```bash
   S3_ENABLED=true
   S3_BUCKET=payload-media
   S3_REGION=us-east-1                     # MinIO region (can be any value)
   S3_ENDPOINT=http://localhost:9000       # Your MinIO endpoint
   S3_ACCESS_KEY_ID=minioadmin
   S3_SECRET_ACCESS_KEY=minioadmin
   ```

### Option 4: Disable S3 (Local Development)

For local development, you can disable S3 and use local file storage:

```bash
S3_ENABLED=false
# Other S3_ variables can be omitted or left empty
```

## Collections Using S3

### MediaCloud
**File:** `src/collections/MediaCloud.ts`

Stores images, videos, and other media files for website content.

**Usage:**
- Website images
- Gallery photos
- Video files
- Audio files
- Featured images

### AssetCloud
**File:** `src/collections/AssetCloud.ts`

Stores downloadable assets and files.

**Usage:**
- PDFs
- Presentations
- Spreadsheets
- Archived files
- Marketing materials

### Documents
**File:** `src/collections/Documents.ts`

Stores document files for the document library.

**Usage:**
- Reports
- Policy documents
- Guidelines
- Research papers
- Templates

## File Upload Limits

**Configuration:** `src/payload.config.ts:39-43`

```typescript
upload: {
  limits: {
    fileSize: 50 * 1024 * 1024, // 50MB
  },
}
```

Maximum file size: **50MB**

To adjust:
1. Update the `fileSize` value in `payload.config.ts`
2. Ensure your hosting platform supports larger uploads
3. Check S3 provider limits

## Best Practices

### Security

1. **Never commit credentials**
   - Use environment variables only
   - Add `.env` to `.gitignore`
   - Use secure secret management in production

2. **Use IAM roles when possible**
   - On AWS, use EC2/ECS IAM roles instead of access keys
   - Reduces credential exposure

3. **Restrict bucket permissions**
   - Only allow necessary operations (GET, PUT, DELETE)
   - Limit access to specific bucket only
   - Block public access by default

4. **Enable bucket versioning**
   - Protects against accidental deletions
   - Allows file recovery

### Performance

1. **Use CDN**
   - CloudFront (AWS)
   - DigitalOcean CDN
   - Cloudflare
   - Reduces latency and costs

2. **Optimize images**
   - Payload CMS handles resizing automatically
   - Sharp processes images efficiently
   - Consider WebP format for web images

3. **Choose region wisely**
   - Select region close to your users
   - Reduces transfer time
   - May affect costs

### Cost Optimization

1. **Set lifecycle policies**
   - Archive old files to cheaper storage classes
   - Delete temporary files automatically

2. **Monitor usage**
   - Track storage size
   - Review transfer costs
   - Optimize large files

3. **Use appropriate storage class**
   - Standard for frequently accessed files
   - Infrequent Access for archives
   - One Zone for non-critical backups

## Troubleshooting

### Files not uploading

**Symptoms:**
- Upload fails with error message
- Files don't appear in bucket

**Solutions:**

1. **Check credentials**
   ```bash
   # Verify environment variables are set
   echo $S3_ACCESS_KEY_ID
   echo $S3_BUCKET
   ```

2. **Verify bucket permissions**
   - Ensure IAM user has `s3:PutObject` permission
   - Check bucket policy doesn't block uploads

3. **Check endpoint and region**
   - Verify `S3_ENDPOINT` is correct
   - Ensure `S3_REGION` matches bucket region

4. **Review logs**
   ```bash
   # Check application logs for S3 errors
   pnpm dev
   # Look for AWS SDK error messages
   ```

### Files not displaying

**Symptoms:**
- Files upload successfully
- But images/files don't display on website

**Solutions:**

1. **Check bucket CORS policy**
   - Add CORS rules to allow browser access
   ```json
   [
     {
       "AllowedHeaders": ["*"],
       "AllowedMethods": ["GET", "HEAD"],
       "AllowedOrigins": ["https://yourdomain.com"],
       "ExposeHeaders": ["ETag"]
     }
   ]
   ```

2. **Verify public access**
   - Ensure files have appropriate read permissions
   - Check bucket policy allows GetObject

3. **Check CDN configuration**
   - Verify CDN is properly configured
   - Clear CDN cache if needed

### S3_ENABLED not working

**Symptoms:**
- Setting `S3_ENABLED=false` but S3 still tries to connect
- Or vice versa

**Solutions:**

1. **Restart the application**
   - Environment variables are loaded at startup
   ```bash
   # Stop dev server (Ctrl+C)
   pnpm dev
   ```

2. **Check variable format**
   - Must be exactly `false` (lowercase) to disable
   - Any other value (including `"false"` in quotes) enables it

3. **Verify .env file**
   - Ensure no extra spaces: `S3_ENABLED=false`
   - Not `S3_ENABLED = false`

### Connection timeout errors

**Symptoms:**
- Uploads time out
- Connection errors to S3

**Solutions:**

1. **Check network connectivity**
   - Verify internet connection
   - Test endpoint URL in browser

2. **Verify endpoint URL**
   - Ensure `https://` or `http://` prefix
   - No trailing slash

3. **Check firewall rules**
   - Allow outbound HTTPS (443)
   - Allow HTTP if using local MinIO

## Migration Guide

### Migrating from Local Storage to S3

1. **Backup existing files**
   ```bash
   # Copy uploads directory
   cp -r public/media backup/media
   ```

2. **Configure S3**
   - Set up S3 bucket
   - Configure environment variables
   - Deploy updated configuration

3. **Upload existing files**
   - Use AWS CLI or S3 browser
   ```bash
   aws s3 sync backup/media s3://your-bucket-name/media/
   ```

4. **Update database references**
   - May need to update file URLs in database
   - Test file access before removing local copies

### Migrating Between S3 Providers

1. **Set up new S3 provider**
2. **Copy files between buckets**
   ```bash
   aws s3 sync s3://old-bucket s3://new-bucket
   ```
3. **Update environment variables**
4. **Test thoroughly before switching**

## Advanced Configuration

### Custom Path Style

```typescript
forcePathStyle: true  // Use path-style URLs: endpoint/bucket/key
                      // Instead of: bucket.endpoint/key
```

Required for:
- MinIO
- Some S3-compatible services
- Local development endpoints

### TLS Configuration

```typescript
tls: true  // Use HTTPS for connections
           // Set to false only for local development
```

### Signing Configuration

```typescript
signingEscapePath: false  // Controls URL encoding in signatures
                          // Keep false for most providers
```

## Related Documentation

- [Payload Storage Plugin Docs](https://payloadcms.com/docs/upload/overview)
- [AWS S3 Documentation](https://docs.aws.amazon.com/s3/)
- [DigitalOcean Spaces Docs](https://docs.digitalocean.com/products/spaces/)
- [MinIO Documentation](https://min.io/docs/)

## Support

### Common Resources
- Check [TROUBLESHOOTING.md](./TROUBLESHOOTING.md) for general issues
- Review [ENVIRONMENT_VARIABLES.md](./ENVIRONMENT_VARIABLES.md) for all variables
- See [PROJECT_OVERVIEW.md](./PROJECT_OVERVIEW.md) for architecture

### Getting Help
- Payload Discord: https://discord.gg/payload
- Project Issues: Check project repository
- S3 Provider Support: Contact your provider's support
