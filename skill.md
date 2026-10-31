---
name: poster-store-fullstack
description: Conventions for building and modifying the wall poster e-commerce site (A4/A3 posters, custom poster builder, cart, checkout, auth, admin) on Next.js 14 App Router, TypeScript, Tailwind, Prisma, PostgreSQL (Neon), Auth.js, Cloudinary. Use whenever writing or editing any frontend component, page, server action, API route, Prisma schema, pricing logic, or auth code in this project.
---

# Poster Store: Frontend + Backend Skill

Read this fully before writing code. Follow it over personal preference or generic defaults. If a request conflicts with a rule here, say so and propose the closest compliant option.

## 0. Stack (do not substitute)
Next.js 14+ (App Router, `src/`), TypeScript strict, Tailwind CSS, Prisma + PostgreSQL (Neon), Auth.js v5 (JWT sessions, Credentials), bcryptjs (cost 12), Zod, React Hook Form, Cloudinary (signed uploads), Cash on Delivery, react-easy-crop, sonner (toasts), lucide-react (icons), Vitest, Playwright.

## 1. Project structure
```
src/
  app/
    (shop)/      home, shop, product/[slug], cart, checkout, order/[id], custom
    (auth)/      login, signup
    account/     profile, orders, addresses
    admin/       dashboard, products, orders, coupons, categories
    api/         payments/verify, webhooks/razorpay, upload-sign
  components/    ui/, layout/, product/, cart/, custom/
  actions/       auth.ts, cart.ts, order.ts, product.ts, custom.ts (server actions)
  lib/
    prisma.ts    singleton client
    env.ts       Zod-validated env
    auth.ts      Auth.js config
    pricing.ts   pure price functions
    validators/  zod schemas (one file per domain)
    result.ts    ApiResponse + handleError
prisma/          schema.prisma, seed.ts
tests/           unit/ and e2e/
```
Rules: one component per file, named exports for components, `page.tsx` files stay thin (fetch data, render components). Business logic lives in `lib/` or `actions/`, never inside JSX.

## 2. Backend rules

### 2.1 Money
- Store and compute all money as **integer paise** (Rs 299 = 29900). Never floats.
- Format only at the UI edge with one helper: `formatINR(paise: number): string`.
- All totals come from `lib/pricing.ts`:
  `calculateCart({ items, coupon, paymentMethod }) -> { subtotal, shipping, codFee, discount, total }`
- `pricing.ts` is pure (no DB, no Date.now). Unit-test it.

### 2.2 Never trust the client
- The client sends only IDs, enums and quantities. **Never accept a price, total, discount or role from the client.**
- On every cart/checkout/order action: reload variants from DB, check `isActive` and `stock`, recompute totals server-side.
- Cloudinary URLs from the client must be verified to belong to our cloud name.

### 2.3 Validation and response shape
- Every server action and route handler starts with `schema.safeParse(input)`.
- Every one returns exactly:
```ts
type ApiResponse<T> =
  | { success: true; data: T }
  | { success: false; error: { code: string; message: string; fieldErrors?: Record<string, string[]> } };
```
- Error codes (use these): `VALIDATION`, `UNAUTHENTICATED`, `FORBIDDEN`, `NOT_FOUND`, `OUT_OF_STOCK`, `COUPON_INVALID`, `PAYMENT_FAILED`, `RATE_LIMITED`, `INTERNAL`.
- Wrap bodies in try/catch. Known errors map to their code; unknown errors are logged with `console.error` (server only) and return `INTERNAL` with a generic message. Never return stack traces or Prisma error text.
- Zod schemas live in `lib/validators/*` and are shared by client forms and the server.

### 2.4 Database (Prisma)
- Use the singleton in `lib/prisma.ts`. Never `new PrismaClient()` elsewhere.
- Use `select`/`include` deliberately; never return `passwordHash` to any client or log it.
- Multi-step writes use `prisma.$transaction`. Order placement = create order + items + conditional stock decrement + coupon increment + cart clear, all or nothing.
- Stock decrement pattern (prevents overselling):
  `updateMany({ where: { id, stock: { gte: qty } }, data: { stock: { decrement: qty } } })` and throw `OUT_OF_STOCK` if `count === 0`.
- Order/OrderItem store **snapshots** (title, variant label, unit price, image, address JSON) so later product edits or deletions never change history.
- Products are soft-deleted (`isActive = false`), never hard-deleted if referenced.
- Indexes on: slug, email, userId, orderNumber, status. Unique on (productId, size, finish, paper).
- Order numbers: `WP-YYYYMMDD-NNNN`, generated inside the transaction, with a unique constraint and retry on collision.
- Migrations: `prisma migrate dev` locally, `prisma migrate deploy` in production. Seed (`prisma/seed.ts`) must be idempotent (`upsert`).

### 2.5 Auth and authorization
- Auth.js JWT sessions; token and session include `id` and `role` (extend types in `types/next-auth.d.ts`).
- Passwords: min 8 chars, at least 1 letter and 1 number, hashed with bcryptjs cost 12. Normalize email with `trim().toLowerCase()`.
- Login errors are generic: "Incorrect email or password".
- `middleware.ts` guards `/account/*`, `/checkout`, `/admin/*`. **Also re-check the session in each server page/action**; middleware alone is not enough.
- Admin actions check `session.user.role === 'ADMIN'` on the server every time.
- Ownership: any query for orders, addresses, designs filters by `userId: session.user.id`. Other users' IDs return 404, not 403.
- Rate-limit login, signup, upload-sign, coupon apply (e.g. 5-10 per minute per IP).
- Guest cart (localStorage) merges into the DB cart on login: sum quantities, cap at stock, drop inactive items with a notice.

### 2.6 Payments
- Razorpay order is created server-side with the amount in paise from the server-computed total.
- `/api/payments/verify`: verify HMAC SHA256 of `order_id|payment_id` with the key secret using constant-time compare. Update `PENDING_PAYMENT -> PLACED/PAID` with a conditional update (`where: { status: 'PENDING_PAYMENT' }`) so repeated calls are harmless (idempotent).
- COD orders go straight to `PLACED / UNPAID`.
- Unpaid `PENDING_PAYMENT` orders older than 30 minutes are cancelled and stock restored (script or cron route protected by a secret).

### 2.7 Custom poster backend
- Upload flow: client asks `/api/upload-sign` for a short-lived Cloudinary signature, uploads directly, receives the URL.
- Server action `createCustomDesign` validates: MIME and extension (jpg, png, webp), max 15 MB, URL belongs to our Cloudinary cloud, size/finish/paper enums, crop values numeric and within bounds, caption max 40 chars with HTML stripped.
- Keep the original image; derive the print crop with Cloudinary transformation params.
- DPI check: required px at 150 DPI: A4 1240x1754, A3 1754x2480. Ideal 300 DPI: A4 2480x3508, A3 3508x4961. Effective DPI < 150 requires an explicit "may look blurry" confirmation.
- Price = custom variant price from DB + custom fee, computed server-side.
- Orphaned designs and files not attached to any order are cleaned after 7 days.

### 2.8 Environment
`lib/env.ts` parses `process.env` with Zod and throws a readable error on boot if anything is missing. Required: `DATABASE_URL, AUTH_SECRET, AUTH_URL, CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET, RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET, NEXT_PUBLIC_RAZORPAY_KEY_ID`. Optional: `RESEND_API_KEY`, Google OAuth keys. Server secrets never use the `NEXT_PUBLIC_` prefix. Keep `.env.example` current.

## 3. Frontend rules

### 3.1 Components and data
- Server Components by default. Add `'use client'` only for interactivity (forms, variant picker, cart drawer, cropper, toasts).
- Fetch data in server components or server actions; do not fetch your own API routes from server components.
- Forms: React Hook Form + `zodResolver` using the shared schemas. Show field-level errors under each input and a toast for server errors. Disable the submit button while pending (prevents double submits).
- Cart UI state: use a small context or Zustand store synced with server actions; the server response is the source of truth for prices.
- Every data page has `loading.tsx` (skeleton), an empty state, and `error.tsx`. Use `notFound()` for bad slugs and IDs, with a branded `not-found.tsx`.
- Filters, sort, search and page live in the URL query string, parsed with Zod; invalid values fall back to defaults instead of throwing.
- Images: `next/image` with `sizes`, meaningful `alt`, fixed aspect ratio (A-series ratio 1:1.414) to avoid layout shift.
- No `alert()`, no `any`, no `// @ts-ignore`, no leftover `console.log`.

### 3.2 Visual design (must NOT look AI-generated)
- **Palette:** background `#F6F3EE`, ink `#1A1A1A`, ONE accent (burnt orange `#C8501E` or deep green `#1F4D3A`), muted grey `#6B665E`, border `#DDD7CC`. Define as CSS variables / Tailwind theme tokens; never hard-code hex in components.
- **Type:** one serif for headings (Fraunces or DM Serif Display), one sans for body (Inter or DM Sans), loaded via `next/font`. Max 2 families. Left-aligned text by default.
- **Shape and depth:** radius 2-6px, 1px borders instead of heavy shadows. No glassmorphism, neon glows, purple/blue gradients, gradient blobs, or floating animated shapes.
- **Layout:** posters are the hero. Use uneven masonry or an offset grid with real poster images. Avoid rows of identical cards with centered icon + title + blurb. Avoid centered-everything hero sections.
- **Copy:** short, specific, human. Banned phrases: "Unleash", "Elevate", "Transform your space", "Seamless", "Curated just for you", "Discover the magic". No emoji in headings or buttons. Example of good copy: "Printed on 250 GSM matte paper. Ships rolled in a tube in 3-5 days."
- **Icons:** lucide at stroke 1.5, used sparingly (cart, search, account, close). No decorative icon rows.
- **Motion:** 150-200ms ease for hover/focus only. No parallax, no scroll-jacking.
- **Human details:** small "Made in [city]" tag, a size-comparison drawing (A4/A3 next to a laptop or mug), real before/after on the custom builder.
- **Buttons:** primary = solid ink or accent, rectangular, clear label verbs ("Add to cart", "Place order"). One primary action per view.

### 3.3 Responsive and accessibility
- Mobile-first; verify at 360, 768, 1280 px; no horizontal scroll.
- Visible focus rings, AA contrast, every input has a `<label>`, buttons are real `<button>`s, modals trap focus and close on Esc, dynamic updates (cart count, toasts) use `aria-live`.
- Touch targets at least 44x44 px.

### 3.4 Key UI behaviors
- **Product page:** variant selectors (size, finish, paper) update price instantly; unavailable combos are disabled; stock <= 5 shows "Only N left"; add-to-cart gives a toast and updates the badge.
- **Cart:** stepper limited by live stock; free-shipping progress bar; coupon apply/remove with specific errors; custom items show the cropped thumbnail.
- **Checkout:** saved addresses or new address (10-digit mobile, 6-digit pincode), payment choice, review, single "Place order" button that locks while submitting.
- **Custom builder:** 4-step stepper (Upload, Options, Crop, Preview). Cropper locked to the A-series ratio, rotate, zoom, optional border and caption, wall-mockup preview, DPI badge (Great / Okay / Low), rights-confirmation checkbox.

## 4. Quality gates (every task, before saying "done")
1. `npx tsc --noEmit`, `npm run lint`, `npm run build` all pass with zero errors.
2. No console errors or hydration warnings in the browser.
3. Happy path and at least these failure paths were exercised: invalid input, logged-out access, out-of-stock, network failure, double submit.
4. Unit tests (Vitest) cover `pricing.ts`, validators, order-number generator, DPI calculator. Playwright covers: signup -> cart -> COD order; custom poster -> order; admin add product + change status.
5. No secret, password hash, or stack trace reaches the browser.

## 5. Workflow for the AI
- Work one task at a time; do not start the next until the current task's checks pass.
- Before changing the schema or pricing, state the change and what it affects.
- Prefer small, reviewable edits. Do not rewrite unrelated files.
- When something is ambiguous, pick the option consistent with this file and note the assumption in one line.
- Finish each task with a short summary: what was built, how to test it, and any known limitations.