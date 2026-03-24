# Urgent Action Fund Asia & Pacific — Website

A multilingual grants and funding portal built with **Payload CMS v3**, **Next.js 15**, and **PostgreSQL**. Deployed on **Railway**.

## Tech Stack

- **Payload CMS 3.74.0** — Headless CMS with admin panel at `/admin`
- **Next.js 15** — App Router, ISR, server components
- **PostgreSQL** — Database
- **Cloudflare R2 / S3** — Media storage
- **Tailwind CSS + Shadcn UI** — Styling

## Features

- **38+ content blocks** — Hero, Grant Cards, FAQ, Rich Content, Feature Cards, Testimonials, and more
- **15 languages** with RTL support (Arabic, Dari, Pashto, Urdu)
- **9 collections** — Pages, Grants, Blog, Reports, Multimedia, Eligibility Tests, Grant Cards, Documents, Users
- **5 globals** — Homepage, Header, Footer, Navigation, Contact Info
- **Role-based access control** — Admin, Editor, Writer, Translator roles
- **Live preview** with mobile/tablet breakpoints
- **Draft/publish workflow** with ISR revalidation
- **SEO optimization** with metadata and JSON-LD
- **S3 media storage** with Cloudflare R2
- **Full-text search** across all content collections

## Railway Deployment

### 1. Create Services

In your Railway project, add two services:

- **PostgreSQL** — Add a PostgreSQL database from Railway's service menu
- **Web App** — Connect your GitHub repo

### 2. Configure Environment Variables

In the web app service, set these variables:

| Variable | Value |
|----------|-------|
| `DATABASE_URI` | `postgresql://postgres:PASSWORD@HOSTNAME.railway.internal:5432/railway` |
| `PAYLOAD_SECRET` | Any secure random string |
| `NEXT_PUBLIC_SERVER_URL` | `https://your-app.up.railway.app` (no trailing slash) |
| `S3_ENABLED` | `true` |
| `S3_BUCKET` | Your bucket name |
| `S3_ENDPOINT` | Your S3/R2 endpoint URL |
| `S3_REGION` | `auto` for Cloudflare R2 |
| `S3_ACCESS_KEY_ID` | Your access key |
| `S3_SECRET_ACCESS_KEY` | Your secret key |
| `NODE_ENV` | `production` |

> Get the `DATABASE_URI` from your PostgreSQL service's Variables tab — use the **internal** (`.railway.internal`) hostname.

### 3. Configure Networking

In the web app's **Settings → Networking**:

- Add a public domain (e.g. `your-app.up.railway.app`)
- Set the port to **8080** (Railway injects `PORT=8080`; Next.js reads it automatically)

### 4. Deploy

Push to your connected branch. Railway will:

1. **Build** — `pnpm build` (Next.js production build)
2. **Start** — `pnpm start` (runs migrations, then starts the server)

Migrations run automatically at startup. The admin panel is at `/admin`.

## Local Development

```bash
# Install dependencies
pnpm install

# Copy environment file
cp .env.example .env
# Edit .env with your local PostgreSQL URI and PAYLOAD_SECRET

# Start dev server
pnpm dev
```

The app runs at `http://localhost:3000`. Admin panel at `http://localhost:3000/admin`.

## Commands

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start development server |
| `pnpm build` | Production build |
| `pnpm start` | Run migrations + start production server |
| `pnpm lint` | Run ESLint |
| `pnpm generate:types` | Regenerate TypeScript types from schema |
| `pnpm payload migrate:create <name>` | Create a new migration |

## Data Migration

To transfer data from a local database to Railway PostgreSQL:

```bash
# Dump data only (no schema, no migrations table)
pg_dump -d YOUR_LOCAL_DB --data-only --no-owner --no-privileges --exclude-table=payload_migrations -Fc -f data.dump

# Restore to Railway (use the public URL from PostgreSQL service)
pg_restore --data-only --no-owner --no-privileges --disable-triggers --schema=public -d "DATABASE_PUBLIC_URL" data.dump
```

## Project Structure

```
src/
├── app/(frontend)/     # Next.js pages (App Router)
├── blocks/             # 38+ content block configs + components
├── collections/        # Payload collection definitions
├── globals/            # Header, Footer, Navigation, Homepage, ContactInfo
├── components/         # React components + Shadcn UI
├── plugins/            # Payload plugin configuration
├── access/             # Role-based access control
├── migrations/         # Database migrations
├── fields/             # Reusable field definitions
└── payload.config.ts   # Main Payload configuration
```
