# Cammino Editions — A4 & A3 Wall Poster E-Commerce

> **Posters for the wall you actually look at.**  
> Curated and personalized art prints on heavyweight 300 GSM archival stock in exact A4 and A3 ISO 216 proportions.  
> Printed and dispatched from **IIT Patna, Bihta, Bihar 801106**.

Built with **Next.js 16+ (App Router)**, **TypeScript**, **Tailwind CSS v4**, **Prisma ORM**, **Auth.js (NextAuth v5)**, **Supabase PostgreSQL**, and **Cloudinary**.

---

## 🌟 Key Features

- **Fixed A-Series Sizing & Pricing**:
  - **Standard Prints**: A4 (210 × 297 mm) at ₹49, A3 (297 × 420 mm) at ₹99
  - **Custom Prints**: A4 at ₹69, A3 at ₹129
- **Interactive Size Toggle & Quick-Add**: Real-time price switching on product cards and detail pages without page reload.
- **Interactive Custom Poster Builder**:
  - Precision cropper with fixed `1 : 1.414` aspect ratio locking.
  - Real-time DPI quality check badge (>150 DPI recommended, warning when <150 DPI).
  - 3 instant 0-network CORS-safe vector sample presets for 1-click testing.
  - Wall preview mockup visualizer against desk silhouettes.
- **Signature 300 GSM Archival Gloss Finish**: Vibrant gloss stock engineered for maximum ink saturation, contrast, and deep rich blacks.
- **100% Free Express Delivery Across India**: Permanent free delivery on every order, with zero minimum purchase thresholds or hidden courier fees.
- **Streamlined Authentication**:
  - Full JWT-based NextAuth v5 session flow.
  - Role-based authorization (`CUSTOMER` and `ADMIN`).
  - Direct, fast sign-up and sign-in without OTP friction.
- **Cart & Cash on Delivery (COD) Checkout**:
  - Slide-out mini-cart drawer with instant order summary.
  - Address collection with pincode validation.
  - Order placement with unique tracking numbers (`WP-YYYYMMDD-XXXX`).
- **Resilient Offline Fallback**: Static catalogue and fast DB timeout wrappers prevent local development hangs when database connectivity is cold or starting.

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | [Next.js 16+](https://nextjs.org/) (App Router, Turbopack, React 19) |
| **Language** | [TypeScript](https://www.typescriptlang.org/) (Strict mode) |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com/) + CSS variables |
| **Database** | [PostgreSQL](https://www.postgresql.org/) (Hosted on [Supabase](https://supabase.com/)) |
| **ORM** | [Prisma 6.19](https://www.prisma.io/) (with Supabase connection pooler support) |
| **Authentication** | [Auth.js / NextAuth v5](https://authjs.dev/) + [bcryptjs](https://github.com/dcodeIO/bcrypt.js) |
| **Media Storage** | [Cloudinary](https://cloudinary.com/) (Direct signed uploads) |
| **Icons & UI** | [Lucide React](https://lucide.dev/), [Sonner](https://sonner.emilkowal.ski/) |
| **Testing** | [Vitest](https://vitest.dev/) (Unit) & [Playwright](https://playwright.dev/) (E2E) |

---

## 📋 Prerequisites

Before setting up the repository on any PC, make sure you have installed:

1. **Node.js**: `v20.x` or `v22.x` (LTS recommended) — [Download Node.js](https://nodejs.org/)
   ```bash
   node -v   # Should output v20.x or higher
   npm -v    # Should output v9.x or higher
   ```
2. **Git**: [Download Git](https://git-scm.com/)
3. **Database**: A PostgreSQL instance (Free [Supabase](https://supabase.com/) project recommended, or local PostgreSQL).

---

## 🚀 Step-by-Step Setup Guide (Any PC: Windows / macOS / Linux)

### 1. Clone the Repository

```bash
git clone https://github.com/Anmol12206/Poster.git
cd Poster
```

*(Or open the repository root folder in your terminal / VS Code).*

---

### 2. Install Dependencies

Install all required production and development dependencies:

```bash
npm install
```

> **Note for Windows Users**: If you encounter an execution policy error when running npm scripts in PowerShell, run this command once in PowerShell:
> ```powershell
> Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned -Force
> ```

---

### 3. Configure Environment Variables

Copy the example environment file:

```bash
# Windows PowerShell
copy .env.example .env

# macOS / Linux / Git Bash
cp .env.example .env
```

Open `.env` in your text editor and configure the values:

```env
# ==========================================
# 1. DATABASE CONFIGURATION (Supabase / PostgreSQL)
# ==========================================

# Supabase Connection Pooler (Transaction Mode on port 6543)
# Replace [PROJECT-REF] and [YOUR-PASSWORD] with your Supabase credentials:
DATABASE_URL="postgresql://postgres.[PROJECT-REF]:[YOUR-PASSWORD]@aws-0-[REGION].pooler.supabase.com:6543/postgres?pgbouncer=true&connect_timeout=10"

# Supabase Direct Connection (Session Mode on port 5432 for migrations)
DIRECT_URL="postgresql://postgres.[PROJECT-REF]:[YOUR-PASSWORD]@aws-0-[REGION].pooler.supabase.com:5432/postgres?connect_timeout=10"

# Local Fallback (if running local PostgreSQL):
# DATABASE_URL="postgresql://postgres:postgres@localhost:5432/cammino?schema=public&connect_timeout=2"
# DIRECT_URL="postgresql://postgres:postgres@localhost:5432/cammino?schema=public&connect_timeout=2"

# ==========================================
# 2. AUTHENTICATION (NextAuth / Auth.js)
# ==========================================
AUTH_SECRET="cammino-dev-secret-key-must-be-at-least-32-chars-long"
AUTH_URL="http://localhost:3000"

# ==========================================
# 3. CLOUDINARY (Media & Custom Posters)
# ==========================================
CLOUDINARY_CLOUD_NAME="demo-cloud"
CLOUDINARY_API_KEY="123456789012345"
CLOUDINARY_API_SECRET="abcdefghijklmnopqrstuvwxyz12345"

# ==========================================
# 4. EMAIL (Optional)
# ==========================================
RESEND_API_KEY=""
```

> **Quick Tip for Supabase**:
> 1. Go to your Supabase project dashboard -> **Project Settings** -> **Database**.
> 2. Under **Connection String**, select **URI**.
> 3. Choose **Transaction pooler** (`port 6543`) for `DATABASE_URL`.
> 4. Choose **Session / Direct** (`port 5432`) for `DIRECT_URL`.

---

### 4. Setup Database Schema & Seed Data

Push the Prisma schema to your database and seed all initial categories, catalog posters, and test accounts:

```bash
# 1. Push schema to database
npx prisma db push

# 2. Generate Prisma Client
npx prisma generate

# 3. Seed database with categories, 24+ posters, and test accounts
npm run db:seed
```

The seed script idempotently populates:
- **8 Categories**: Anime & Manga, Cinema & Cult, Minimalist Art, Motivational, Automotive, Music, Travel, Nature.
- **24+ Products**: Complete with A4 (₹70) and A3 (₹120) variants in both Gloss and Matte finishes.
- **Custom Poster Base Product**: Standardized SKU for uploaded designs.
- **Admin & Customer Accounts**: Pre-configured with password hashes.

---

### 5. Start the Development Server

```bash
npm run dev
```

Open **[http://localhost:3000](http://localhost:3000)** in your browser. The app is ready!

---

## 🔑 Pre-Configured Test Accounts

You can test authentication, orders, and admin controls immediately using the seeded credentials:

### 1. Customer Account
- **Email**: `anmolagarwal0904@gmail.com`
- **Password**: `Cammino@2026!`
- **Role**: `CUSTOMER`
- **Features**: Browse shop, add to cart, design custom posters, checkout with COD, and view orders at `/account/orders`.

### 2. Admin Account
- **Email**: `agarwalanmol1212@gmail.com`
- **Password**: `Cammino@2026!`
- **Role**: `ADMIN`
- **Features**: Full access to the Admin Dashboard at `/admin` (overview metrics, order management, and product catalogue).

---

## 🧪 Testing Suite

### Run Unit Tests (Vitest)
Validates integer-paise pricing calculations, free shipping thresholds, and DPI resolution math:
```bash
npx vitest run
```

### Run Type Checking
Ensures zero TypeScript errors across the whole codebase:
```bash
npx tsc --noEmit
```

### Run End-to-End Tests (Playwright)
Executes automated browser verification against the local dev server:
```bash
npx playwright test
```
*Tests cover: A3 size toggle, Add to Cart & mini-cart drawer, top-right navbar buttons (Search, Login, Cart), custom poster builder multi-step wizard, user login flow, and COD order placement.*

---

## 📁 Repository File Structure

```text
Poster/
├── prisma/
│   ├── schema.prisma        # Normalized PostgreSQL schema with Supabase pooling
│   └── seed.ts              # Idempotent database seeder (categories, products, accounts)
├── public/                  # Public static assets
├── src/
│   ├── actions/             # Next.js Server Actions (placeOrder, signUp, OTP, newsletter)
│   ├── app/                 # Next.js App Router
│   │   ├── (auth)/          # Authentication routes (login, signup)
│   │   ├── (shop)/          # Shop pages (home, shop, custom builder, cart, checkout)
│   │   │   ├── custom/      # Interactive custom poster designer
│   │   │   ├── cart/        # Dedicated cart view
│   │   │   ├── checkout/    # Cash on Delivery checkout form
│   │   │   └── order/       # Order success confirmation
│   │   ├── account/         # Customer account area (orders, profile)
│   │   ├── admin/           # Admin dashboard (orders, products)
│   │   ├── api/             # API routes (NextAuth handlers, Cloudinary upload signatures)
│   │   ├── layout.tsx       # Root layout with Fraunces & DM Sans typography
│   │   └── globals.css      # Custom editorial tokens and styling
│   ├── components/
│   │   ├── cart/            # MiniCart drawer and cart line items
│   │   ├── layout/          # Header (search, login, cart) and Footer
│   │   ├── product/         # ProductCard with A4/A3 toggle, ProductDetailView
│   │   └── providers/       # SessionProvider & AppProviders wrapper
│   ├── context/
│   │   └── CartContext.tsx  # Persistent shopping cart state & drawer controls
│   ├── lib/
│   │   ├── auth.ts          # Auth.js / NextAuth v5 credentials provider
│   │   ├── cloudinary.ts    # Cloudinary signed upload helpers
│   │   ├── pricing.ts       # Pure integer-paise calculations & shipping rules
│   │   ├── prisma.ts        # PrismaClient singleton with fast query timeouts
│   │   ├── products.ts      # Product fetching with DB-to-static fallback
│   │   ├── sampleArtwork.ts # High-res vector presets for custom designer
│   │   └── utils.ts         # DPI calculator, formatINR currency helper
│   └── types/               # NextAuth & TypeScript definitions
├── tests/
│   ├── e2e/                 # Playwright end-to-end test suite
│   └── unit/                # Vitest unit test suite (pricing, DPI)
├── .env.example             # Template environment configuration
├── package.json             # Scripts & dependencies
└── playwright.config.ts     # Playwright configuration
```

---

## ❓ Troubleshooting & FAQs

### Q: Why do I see a 1-second delay when querying products?
**A**: During local development without an active PostgreSQL instance, queries use `withDbTimeout(..., 800)` to fail fast and fall back smoothly to the bundled static catalogue. Once your Supabase connection is provided in `.env`, all queries hit live PostgreSQL instantly.

### Q: How do I connect to Supabase?
**A**: Ensure you set both `DATABASE_URL` (using the transaction pooler on port `6543`) and `DIRECT_URL` (using session mode on port `5432`). This allows serverless functions to share pooled connections while Prisma migrations run directly.

### Q: Port 3000 is already in use
**A**: Run Next.js on a different port:
```bash
npm run dev -- -p 3001
```
Or kill the process holding port 3000:
- **Windows**: `Stop-Process -Id (Get-NetTCPConnection -LocalPort 3000).OwningProcess -Force`
- **macOS / Linux**: `npx kill-port 3000`

---

## 📜 License & Studio Attribution

Developed for **Cammino Editions**  
**Location**: Indian Institute of Technology Patna (IIT Patna), Bihta, Patna, Bihar 801106  
**Support**: `support@cammino.store`
