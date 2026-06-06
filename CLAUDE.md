# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
# Development (with hot reload)
npm run dev

# Build TypeScript to dist/
npm run build

# Start production server (from dist/)
npm run start

# Regenerate Prisma client after schema changes
npm run build-prisma

# Run a new migration (after editing prisma/schema.prisma)
npx prisma migrate dev --name <migration-name>

# Open Prisma Studio
npx prisma studio
```

Local PostgreSQL via Docker:
```bash
docker compose up -d
```
Connection: `postgresql://doce_menu:doce_menu@localhost:5432/doce_menu`

## Required Environment Variables

```
DATABASE_URL=
AUTH_SECRET=
CLOUD_NAME=
CLOUD_KEY=
CLOUD_SECRET=
NODE_ENV=
BASE_URL=          # used in password-reset email links
# SMTP credentials (see src/config/nodemailer.ts)
```

## Architecture

**Stack:** Node.js + Express 5 + TypeScript, Prisma ORM (PostgreSQL), deployed to Vercel.

**Entry points:**
- `src/server.ts` — starts the HTTP server
- `src/app.ts` — configures Express: CORS, Helmet, rate-limit, Swagger, route mounting

**Two-tier authentication middleware** (applied globally after `/user`, `/raffle`, `/landing-page`):
1. `tokenMiddleware` (`src/middlewares/tokenMiddleware.ts`) — reads the `token` httpOnly cookie, verifies JWT, attaches `req.userId`
2. `verifyUser` (`src/middlewares/userMiddleware.ts`) — fetches the full User from DB, attaches `req.user`

All protected controllers use `CustomRequest` (from `src/types/CustomRequest.d.ts`) which extends `Request` with `userId?: string` and `user?: User`.

**Route split:**
| Prefix | Auth required | Module |
|---|---|---|
| `/user` | No | User registration, login, password reset |
| `/raffle` | No | Raffle entries |
| `/landing-page` | No | Public menu page by slug |
| `/menu` | Yes | Menu CRUD |
| `/restaurant` | Yes | RestaurantSettings CRUD |
| `/upload` | Yes | Image upload to Cloudinary |
| `/product` | Yes | Product CRUD |
| `/category` | Yes | Category CRUD |
| `/analytics` | Yes | Track view/click events |

**Data model relationships (prisma/schema.prisma):**
- `User` → `Menu` (one-to-many; a user can have multiple menus)
- `Menu` → `RestaurantSettings` (one-to-one, created automatically on menu creation)
- `Menu` → `Product[]`, `Category[]`, `Analytics[]`, `CustomDomain[]`, `Testimonial[]`, `HowItWorksStep[]`, `ExternalLink[]`, `Badge[]`
- `Product` → `Category` (optional FK)

**Prisma client singleton:** `src/lib/prisma.ts` — import `{ prisma }` from here in all controllers. The singleton pattern prevents connection pool exhaustion on Vercel serverless.

**Image uploads:** Multer buffers the file in memory; `uploadController` streams it directly to Cloudinary. Upload type is passed as `type` in the request body (`'restaurant'` | `'logo'` | `'product'`).

**Email:** Nodemailer + Handlebars-based HTML templates in `src/templates/`. `getEmailTemplate()` from `src/utils/email.ts` renders templates; `configSMTP()` + `configEmail()` from `src/config/nodemailer.ts` handle transport.

**API response shape:** All endpoints return `{ error: boolean, message: string, ...data }`.

**Swagger docs:** Protected by HTTP Basic Auth (`swaggerAuth` middleware). Available at `/docs` (custom HTML) and `/api-docs` (default Swagger UI). Raw spec at `/swagger.json`.

**Pre-commit hooks:** `build-prisma` + `build` run automatically before every commit (configured in `package.json` `pre-commit` field). Commit will fail if TypeScript compilation fails.

**Deployment:** `vercel.json` routes all traffic to `src/server.ts` via `@vercel/node`. Migration on deploy: `npm run vercel-build` runs `prisma migrate deploy`.
