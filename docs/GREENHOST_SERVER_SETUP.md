# Greenhost Server Setup Guide

Server requirements and installation steps for deploying the UAF A&P website on a Greenhost VPS.

## Server Specs

- **OS**: Ubuntu 22.04+ or Debian 12+
- **RAM**: Minimum 1GB (2GB recommended)
- **CPU**: 2 vCPUs
- **Disk**: 10GB minimum (media files are stored on Cloudflare R2, not on disk)

## Software Checklist

| Component | Minimum Version | Purpose |
|-----------|----------------|---------|
| Node.js | 20.x LTS | Runtime |
| pnpm | latest | Package manager |
| PostgreSQL | 15+ | Database |
| Nginx | any | Reverse proxy + SSL termination |
| Certbot | any | SSL certificates (Let's Encrypt) |
| PM2 | latest | Process manager (keeps app alive) |
| Git | any | Clone/pull repo |

## Installation Steps

### 1. System Updates

```bash
sudo apt update && sudo apt upgrade -y
```

### 2. Node.js 20.x

```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo bash -
sudo apt install -y nodejs
node -v  # verify: v20.x.x
```

### 3. pnpm

```bash
npm install -g pnpm
pnpm -v  # verify
```

### 4. PostgreSQL

```bash
sudo apt install -y postgresql postgresql-contrib
sudo systemctl enable postgresql
sudo systemctl start postgresql

# Create database and user
sudo -u postgres psql -c "CREATE USER uafanp WITH PASSWORD 'CHANGE_THIS_PASSWORD';"
sudo -u postgres psql -c "CREATE DATABASE uafanp_prod OWNER uafanp;"
```

The `DATABASE_URI` will be: `postgresql://uafanp:CHANGE_THIS_PASSWORD@localhost:5432/uafanp_prod`

### 5. Git

```bash
sudo apt install -y git
```

### 6. Nginx

```bash
sudo apt install -y nginx
sudo systemctl enable nginx
```

Create the site config:

```bash
sudo nano /etc/nginx/sites-available/uafanp
```

Paste:

```nginx
server {
    listen 80;
    server_name yourdomain.com;
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
    }
}
```

Enable and restart:

```bash
sudo ln -s /etc/nginx/sites-available/uafanp /etc/nginx/sites-enabled/
sudo rm /etc/nginx/sites-enabled/default
sudo nginx -t
sudo systemctl restart nginx
```

> **Note**: `client_max_body_size 50M` matches the app's upload limit. Without this, Nginx defaults to 1MB and blocks large file uploads.

### 7. SSL (Let's Encrypt)

```bash
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d yourdomain.com
```

Certbot auto-renews. Verify with:

```bash
sudo certbot renew --dry-run
```

### 8. PM2 (Process Manager)

```bash
npm install -g pm2
```

## Deploying the App

### Clone and Install

```bash
cd /var/www
git clone YOUR_REPO_URL uafanp
cd uafanp
pnpm install
```

### Environment Variables

```bash
cp .env.example .env
nano .env
```

Set these values:

```env
DATABASE_URI=postgresql://uafanp:CHANGE_THIS_PASSWORD@localhost:5432/uafanp_prod
PAYLOAD_SECRET=generate_a_secure_random_string_here
NEXT_PUBLIC_SERVER_URL=https://yourdomain.com
NODE_ENV=production
S3_ENABLED=true
S3_BUCKET=your-bucket-name
S3_ENDPOINT=https://your-r2-endpoint.r2.cloudflarestorage.com
S3_REGION=auto
S3_ACCESS_KEY_ID=your-access-key
S3_SECRET_ACCESS_KEY=your-secret-key
```

> Generate `PAYLOAD_SECRET` with: `openssl rand -hex 64`

### Build and Start

```bash
pnpm build
pm2 start "pnpm start" --name uafanp
pm2 save
pm2 startup  # generates command to enable auto-start on reboot
```

### Verify

- Website: `https://yourdomain.com`
- Admin panel: `https://yourdomain.com/admin`

## Data Migration

To transfer data from an existing database:

```bash
# On source machine: dump data only
pg_dump -d SOURCE_DB --data-only --no-owner --no-privileges --exclude-table=payload_migrations -Fc -f data.dump

# On Greenhost: truncate tables first
psql "postgresql://uafanp:PASSWORD@localhost:5432/uafanp_prod" -c "DO \$\$ DECLARE r RECORD; BEGIN FOR r IN (SELECT tablename FROM pg_tables WHERE schemaname = 'public' AND tablename != 'payload_migrations') LOOP EXECUTE 'TRUNCATE TABLE public.' || quote_ident(r.tablename) || ' CASCADE'; END LOOP; END \$\$;"

# Restore data
pg_restore --data-only --no-owner --no-privileges --disable-triggers --schema=public -d "postgresql://uafanp:PASSWORD@localhost:5432/uafanp_prod" data.dump
```

## Updating the App

```bash
cd /var/www/uafanp
git pull
pnpm install
pnpm build
pm2 restart uafanp
```

## Useful PM2 Commands

| Command | Description |
|---------|-------------|
| `pm2 status` | Check if app is running |
| `pm2 logs uafanp` | View app logs |
| `pm2 restart uafanp` | Restart the app |
| `pm2 stop uafanp` | Stop the app |
