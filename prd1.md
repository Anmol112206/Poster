# PRD + BUILD PROMPT: Wall Poster E-commerce Website (A4 & A3)

> HOW TO USE: Paste the "MASTER CONTEXT" section first into your AI builder. Then paste ONE subtask at a time (Task 0, Task 1, ...). Do not move to the next task until the current one runs without errors and its "Done when" checklist passes.

---

# MASTER CONTEXT (paste this first, always keep it in context)

## 1. Product summary
Build a full-stack e-commerce website called **"Camino"** that sells **A4 (210x297 mm)** and **A3 (297x420 mm)** wall posters. It is a startup-style store built as a college project, so it must be clean, working end to end, and deployable for free.

Customers can: browse posters, filter and search, view a product, add to cart, sign up / sign in, place an order, and **upload their own image to create a custom poster**.

## 2. Target users
- Students and young professionals (18-30) decorating rooms and hostels.
- Gift buyers who want a personalised poster.
- Admin (the founder) who manages products and orders.

## 3. Tech stack (fixed, do not substitute)
| Layer | Choice | Why |
|---|---|---|
| Framework | **Next.js 14+ (App Router) + TypeScript** | Frontend and backend in ONE codebase, so no API-mismatch bugs between separate servers |
| Styling | **Tailwind CSS** (+ small custom CSS for tokens) | Fast, consistent |
| Database | **PostgreSQL** hosted on **Neon** (or supabase) | Relational data (users, orders, items (identified by item id)) fits perfectly, free tier |
| ORM | **Prisma** | Type-safe queries, migrations, seed script, catches errors at compile time |
| Auth | **Auth.js (NextAuth v5)** with Credentials (email + password + mobile number (with verification through otp))  | Industry standard, secure sessions |
| Password hashing | **bcryptjs** (cost 12) | Never store plain passwords |
| Validation | **Zod** (shared between client forms and server routes) | Stops bad data reaching the DB |
| Forms | **React Hook Form + @hookform/resolvers/zod** | Less boilerplate, good errors |
| File storage | **Cloudinary** (free tier) for product images and customer uploads | Handles resizing, CDN, format conversion |
| Payments | "Cash on Delivery" option only | 
| Cart state | Server-side cart in DB for logged-in users + localStorage for guests, merged on login | Cart is never lost |
| Image crop (custom poster) | **react-easy-crop** | Lightweight, reliable |
| Email (optional) | **Resend** or Nodemailer for order confirmation | Nice-to-have |
| Hosting | **Vercel** (app) + **Neon** (DB) | Free, one-click deploy |
| Testing | Vitest for pricing/validation functions, Playwright for 3 critical flows | Proves "no backend errors" |

## 4. Non-negotiable engineering rules (these prevent backend errors)
1. **All money is stored as integers in paise** (Rs 299 = 29900). Never use floats for price.
2. **The server always recalculates prices.** The client only sends product IDs, variant IDs, and quantities, never prices. This prevents tampering and total mismatches.
3. **Every API route and server action validates input with Zod** and returns a consistent shape: `{ success: true, data }` or `{ success: false, error: { code, message, fieldErrors? } }`.
4. **Every route is wrapped in try/catch.** Unknown errors are logged server-side and return a friendly generic message. Never leak stack traces to the user.
5. **Order creation runs inside a single Prisma `$transaction`** (create order, create order items, reduce stock, clear cart). Either all succeed or none.
6. **Environment variables are validated at startup** with a Zod `env.ts` file. If one is missing the app fails loudly with a clear message.
7. **Every protected route/page checks the session on the server**, not just in the UI.
8. **Payment verification is server-side** using Razorpay signature verification; an order is marked PAID only after that passes. Verification must be idempotent (calling twice does not double-process).
9. **No `any` in TypeScript.** `strict: true` in tsconfig. `npm run build`, `npm run lint`, and `npx tsc --noEmit` must pass with zero errors before each task is considered done.
10. **Add loading states, empty states, and error states** for every page that fetches data. Add `error.tsx`, `not-found.tsx`, and `loading.tsx` where relevant.
11. **Rate-limit** login, signup, and upload endpoints (simple in-memory or Upstash limiter).
12. **Seed script** (`prisma/seed.ts`) creates an admin user, categories, 24+ products with variants, so the site is never empty.

## 5. Design direction: must NOT look "AI-generated"
Follow these strictly:
- **Palette:** warm off-white background (#F6F3EE), near-black ink text (#1A1A1A), ONE accent color (a burnt orange #C8501E or deep green #1F4D3A; pick one). No purple/blue gradients, no neon, no glassmorphism, no glowing shadows.
- **Typography:** one serif display font for headings (e.g. "Fraunces" or "DM Serif Display") + one clean sans for body (e.g. "Inter" or "DM Sans"). Max 2 families. Normal line-height, left-aligned text.
- **Layout:** let the posters be the hero. Use real poster imagery in a masonry or uneven grid, not identical symmetric cards with icon bullets. Generous whitespace, thin 1px borders instead of heavy drop shadows, small border radius (2-6px), not pill-everything.
- **No** stock "Unleash your creativity / Elevate your space / Transform your walls" copy. No emoji in headings. No three-icon "Why choose us" row with generic icons. Write short, specific, human copy (e.g. "Printed on 250 GSM matte paper. Ships rolled in a tube, in 3-5 days.").
- **No** centered-everything hero with a giant gradient blob. Use a left-aligned hero with a large real poster photo shown on a wall.
- Subtle motion only: 150-200ms hover transitions. No parallax, no floating animations.
- Imperfect-on-purpose details that feel designed by a person: a small "Made in [your city]" tag, a handwritten-style annotation font used once, size-comparison illustration (poster next to a coffee mug / laptop).
- Use realistic placeholder posters (Unsplash/Pexels free images or your own artwork) with proper alt text.
- Fully responsive: mobile-first, test at 360px, 768px, 1280px.
- Accessibility: visible focus rings, color contrast AA, labels on all inputs, keyboard-navigable.

## 6. Product & pricing rules
- Sizes: **A4** (210x297 mm) (price - 70) and **A3** (297x420 mm) (price - 120).
- Finishes: Gloss.(default)
- Paper: 300 GSM (premium).

# TASK 0: Project setup & foundation

**Goal:** a running Next.js app connected to Postgres with tooling configured.

**Do:**
1. `npx create-next-app@latest` with TypeScript, Tailwind, App Router, ESLint, `src/` directory, import alias `@/*`.
2. Install: `prisma @prisma/client zod react-hook-form @hookform/resolvers next-auth@beta bcryptjs cloudinary razorpay react-easy-crop sonner lucide-react clsx` and dev deps `vitest @playwright/test tsx @types/bcryptjs`.
3. Folder structure:
```
src/
  app/
    (shop)/ (home, shop, product/[slug], cart, checkout, order/[id], custom)
    (auth)/ (login, signup)
    account/ (profile, orders, addresses)
    admin/ (dashboard, products, orders)
    api/ (webhooks, upload-sign, payments)
  components/ (ui, layout, product, cart, custom)
  lib/ (prisma.ts, env.ts, auth.ts, pricing.ts, validators/, utils.ts)
  actions/ (server actions: auth, cart, order, product)
prisma/ (schema.prisma, seed.ts)
tests/
```
4. Create `lib/prisma.ts` singleton (prevents "too many connections" in dev).
5. Create `lib/env.ts` validating all env vars with Zod. Provide `.env.example` listing: `DATABASE_URL, AUTH_SECRET, AUTH_URL, CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET, RESEND_API_KEY(optional)`.
6. Add global design tokens (colors, fonts via `next/font`) matching Section 5.
7. Create a shared `ApiResponse<T>` type and `handleError()` helper.

**Done when:** `npm run dev` and `npm run build` both succeed; visiting `/` shows a placeholder page with correct fonts and colors; `.env.example` exists.

---

# TASK 1: Database schema (Prisma + PostgreSQL)

**Goal:** a complete, normalized schema with migrations and seed data.

**Models (with key fields):**
- **User**: id (cuid), name, email (unique), passwordHash (nullable for Google users), role (`CUSTOMER` | `ADMIN`), emailVerified, image, createdAt.
- **Account / Session / VerificationToken**: required by Auth.js Prisma adapter (if using adapter) else JWT sessions only.
- **Address**: id, userId, fullName, phone, line1, line2, city, state, pincode (6 digits), isDefault.
- **Category**: id, name, slug (unique), description, imageUrl. (e.g. Anime, Movies, Motivational, Minimal Art, Cars, Music, Travel, Nature.)
- **Product**: id, title, slug (unique), description, categoryId, images (String[]), tags (String[]), isActive, isFeatured, isCustomBase (boolean, marks the "Custom Poster" product), createdAt.
- **ProductVariant**: id, productId, size (`A4` | `A3`), finish (`MATTE` | `GLOSS`), paper (`GSM_170` | `GSM_250`), pricePaise (Int), stock (Int), sku (unique). Unique constraint on (productId, size, finish, paper).
- **Cart**: id, userId (unique, one cart per user).
- **CartItem**: id, cartId, variantId, quantity, customDesignId (nullable). Unique on (cartId, variantId, customDesignId).
- **CustomDesign**: id, userId (nullable for guests via session id), originalImageUrl, croppedImageUrl, size, finish, paper, caption (nullable), cropData (Json), width, height, createdAt.
- **Order**: id, orderNumber (human-readable e.g. `WP-20261031-0001`), userId, status (`PENDING_PAYMENT`, `PLACED`, `PROCESSING`, `PRINTED`, `SHIPPED`, `DELIVERED`, `CANCELLED`, `REFUNDED`), paymentMethod (`COD`), paymentStatus (`UNPAID`, `PAID`, `FAILED`, `REFUNDED`), subtotalPaise, shippingPaise, codFeePaise, discountPaise, totalPaise, shippingAddress (Json snapshot), trackingNumber, createdAt.
- **OrderItem**: id, orderId, variantId (nullable if deleted), productTitle (snapshot), variantLabel (snapshot), unitPricePaise (snapshot), quantity, customDesignId (nullable), imageUrl (snapshot).

**Do:**
1. Write `schema.prisma` with proper relations, `onDelete` rules, and indexes on slug, email, userId, orderNumber, status.
2. Run `prisma migrate dev --name init`.
3. Write `seed.ts`: 1 admin (`admin@store.com` / strong password from env), 8 categories, 24+ products, each with all 8 variants (2 sizes x 2 finishes x 2 papers) with realistic stock, 1 "Custom Poster" product (`isCustomBase = true`).

**Done when:** `npx prisma migrate dev` and `npx prisma db seed` run without errors; Prisma Studio shows all data.

---

# TASK 2: Authentication system (Sign up / Sign in / Sign out)

**Goal:** secure, complete auth with great UX.

**Features:**
1. **Sign up page** (`/signup`): fields name, email, mobile number (with otp validation), password, confirm password. Password rules: min 8 chars, 1 letter, 1 number. Show live strength hint. Check duplicate email and return a friendly message ("An account with this email already exists. Sign in instead?").
2. **Sign in page** (`/login`): email + password, "show password" toggle, generic error on failure ("Incorrect email or password"; never reveal which one is wrong). Support `?callbackUrl=` redirect after login.
4. **Session:** JWT strategy via Auth.js; include `id` and `role` in the token and session types (extend the TypeScript types).
5. **Sign out** from the header account menu.
6. **Route protection:** `middleware.ts` protects `/account/*`, `/checkout`, `/admin/*` (admin also checks `role === 'ADMIN'`). Re-check on the server in each page/action.
7. **Forgot password** (nice-to-have): token-based reset via email; if email service is not configured, hide the link.
8. **Guest cart merge:** on login, merge localStorage cart into the DB cart (sum quantities, cap by stock).
9. Rate-limit login/signup (e.g. 5 attempts/min per IP).
10. Zod schemas in `lib/validators/auth.ts`, reused on client and server.

**Edge cases to handle:** email normalization (lowercase/trim), whitespace in passwords, already-logged-in users visiting `/login` get redirected to `/account`, expired sessions.

**Done when:** a new user can sign up, is auto-signed-in, can sign out and sign back in; hitting `/checkout` while logged out redirects to login and returns after; admin routes reject customers with 403 page; wrong password shows a generic error; no console errors.

---

# TASK 3: Layout, navigation & home page

**Goal:** the shell of the site and a home page that feels hand-designed.

**Header:** logo (text wordmark in serif), links (Shop, Custom Poster, Collections), search icon (expands to input), wishlist (optional), cart icon with live item-count badge, account menu (Sign in / Account, Orders, Sign out; Admin link if admin). Sticky, thin bottom border, mobile hamburger drawer.

**Footer:** short about line, links (Shipping & Returns, Size Guide, Contact, FAQ, Privacy, Terms), social links, small print. Keep it compact.

**Home page sections (in this order):**
1. Left-aligned hero: short headline (e.g. "Posters for the wall you actually look at."), one line subtext, two buttons (Shop posters / Make your own), large poster-on-wall photo on the right.
2. Category strip: horizontal row of category names with small cover images (not icons).
3. Featured posters: uneven masonry grid of 8 products.
4. "Make it yours" block: shows the custom poster flow in 3 short steps with a real before/after image.
5. Size guide: A4 vs A3 drawn to scale next to a laptop/mug illustration with exact mm and inch dimensions.
6. Quality details: 3 short factual lines (paper GSM, print DPI, packaging), no stock icons.
7. Reviews: 3 realistic short reviews (seed from DB).
8. Newsletter input (stores email in DB table `Subscriber`).

**Done when:** all sections render from DB data where applicable, are responsive, and pass a quick Lighthouse check (Performance/Accessibility > 85). Use `next/image` with proper `sizes`.

---

# TASK 4: Product listing (Shop) with filters, search & sorting

**Route:** `/shop` and `/shop/[categorySlug]`

**Features:**
- Server-rendered product grid with pagination (12 per page) or "Load more".
- **Filters:** category, size (A4/A3), finish, price range slider, tags. Filters stored in the URL query string so pages are shareable and the back button works.
- **Sort:** Newest, Price low to high, Price high to low, Popular.
- **Search:** debounced search (title, tags, category) via URL param `?q=`; "no results" state with suggestions.
- Product card: image (hover shows second image), title, "from Rs XXX" (lowest active variant price), category label, quick "Add" (opens a small size picker) and wishlist heart.
- Skeleton loaders and empty state.
- Validate all query params with Zod; invalid params fall back to defaults instead of crashing.

**Done when:** filters + sort + search work together, URL updates, no hydration warnings, handles 0 results and invalid params gracefully.

---

# TASK 5: Product detail page

**Route:** `/product/[slug]`

**Features:**
1. Image gallery (main image + thumbnails, zoom on click/hover).
2. Title, category, description, tags.
3. **Variant selector:** Size (A4/A3), Finish, Paper. Price updates instantly. Disabled option states if a combination is out of stock.
4. Quantity selector (1 to min(stock, 10)).
5. **Size visualiser:** toggle showing the poster scaled against a sofa/desk silhouette.
6. Stock indicator ("Only 3 left" when stock <= 5; "Out of stock" disables the button).
7. **Add to cart** button with success toast and cart badge update; **Buy now** button that goes straight to checkout.
8. Delivery estimate (3-6 working days) and pincode check input (validate 6 digits).
9. Accordion: Print details, Shipping & returns.
10. "You may also like" row (same category).
11. SEO: dynamic metadata, Open Graph image, JSON-LD Product schema. `generateStaticParams` + `notFound()` for bad slugs.

**Done when:** selecting every variant combination shows the right price/stock, add-to-cart works for guests and logged-in users, a bad slug shows the custom 404.

---

# TASK 6: Cart

**Route:** `/cart` + slide-over mini-cart from the header

**Features:**
- List items with image, title, variant label (e.g. "A3 / Matte / 250 GSM"), unit price, quantity stepper, remove, line total. Custom posters show a thumbnail of the cropped design and an "Edit" link.
- Quantity changes are validated against live stock; show message if stock reduced ("Only 2 available").
- Order summary: subtotal, shipping (flat Rs 49, free above Rs 699 with "Add Rs X more for free shipping" progress bar), discount, total.
- **Coupon field:** apply/remove; server validates (active, not expired, min order, usage limit); show clear errors.
- Empty cart state with link to shop.
- **Persistence:** guests in localStorage (validated on load against the DB so deleted/inactive products are removed with a notice); logged-in users in DB; merge on login (Task 2).
- All price calculation lives in `lib/pricing.ts` (pure functions, unit-tested): `calculateCart(items, coupon, paymentMethod) -> { subtotal, shipping, codFee, discount, total }`.

**Done when:** adding, updating, removing items works for guest and user; totals always match the server calculation; refreshing the page keeps the cart; unit tests for `pricing.ts` pass (cover free-shipping threshold, coupon types, rounding, COD fee).

---

# TASK 7: Custom poster builder (the unique feature)

**Route:** `/custom`

**Flow (stepper UI, 4 steps):**
1. **Upload**
   - Drag-and-drop or file picker. Accept JPG, PNG, WEBP; max 15 MB. Validate type by MIME **and** file signature on the server.
   - Upload directly to Cloudinary using a **signed upload** (server route `/api/upload-sign` returns a short-lived signature; requires rate limiting; guests allowed but limited).
   - Show upload progress and error states (wrong format, too big, network failure with retry).
2. **Choose size & options:** A4 or A3, finish, paper. Orientation auto-detected (portrait/landscape) with a manual rotate toggle. Show the exact aspect ratio: A-series ratio is 1 : 1.414.
3. **Crop & adjust:** `react-easy-crop` locked to the chosen aspect ratio, zoom slider, rotate 90 degrees, optional simple filters (none, black & white, warm). Optional white border toggle (0 / 5 / 10 mm) and optional caption text (max 40 chars, choice of 3 fonts) placed at the bottom.
4. **Preview & add to cart:** realistic wall mockup preview (poster image composited on a wall photo using CSS), final price, quality check result, add to cart.

**Quality check (important):**
- Required pixels for good print at 150 DPI minimum: A4 = 1240 x 1754 px, A3 = 1754 x 2480 px. Ideal 300 DPI: A4 = 2480 x 3508, A3 = 3508 x 4961.
- After crop, compute effective resolution. Show a status: Great (>= 200 DPI), Okay (150-199), Low quality warning (< 150, requires the user to tick "I understand it may look blurry").

**Backend:**
- Server action `createCustomDesign` validates: Cloudinary URL belongs to our cloud account, size/finish/paper enums, crop data numbers within range, caption sanitized (strip HTML).
- Store `CustomDesign` row; the cropped version is generated via Cloudinary transformation URL (crop coordinates + target pixel size), so the original is retained for the print team.
- Price = variant price from DB (custom product's variant) + Rs 50 custom fee, calculated server-side.
- Add to cart creates a `CartItem` linked to `customDesignId`.
- Orphan cleanup: a script/cron deletes CustomDesign rows and Cloudinary files not attached to any order after 7 days.

**Content rules:** show a notice "You confirm you own the rights to this image. We don't print offensive, illegal or copyrighted-brand content." with a required checkbox. Admin can reject an order if the design violates this (status CANCELLED + reason).

**Done when:** a user can upload, crop, preview, add a custom poster to cart, see it in cart with a thumbnail, and place an order; bad files and low-res images are handled with clear messages; no unhandled promise rejections.

---

# TASK 8: Checkout & order placement

**Route:** `/checkout` (login required; guest checkout optional, default OFF for simplicity)

**Steps on one page:**
1. **Address:** choose a saved address or add a new one (name, phone with 10-digit Indian mobile validation, line1, line2, city, state dropdown, 6-digit pincode). Save-to-account checkbox.
2. **Payment method:** Cash on Delivery.
3. **Review:** items, totals, "Place order" button (disabled while submitting to prevent double clicks).

**Server logic `placeOrder` (server action or route handler):**
1. Verify session. Parse payload with Zod (addressId or new address, paymentMethod).
2. Load the cart **from the DB** (never trust client prices); re-validate each variant is active and in stock.
3. Recompute totals using `lib/pricing.ts`.
4. Inside `prisma.$transaction`:
   - Create `Order` with snapshot data (address JSON, item titles, prices) and unique `orderNumber`.
   - Create `OrderItem`s.
   - Decrement variant stock using a conditional update (`updateMany where stock >= qty`); if any update affects 0 rows, throw "Out of stock" and roll back.
   - For COD: status `PLACED`, paymentStatus `UNPAID`, clear the cart.
5. Return `{ orderId }` and redirect to `/order/[id]/success`.

**Edge cases:** double-click on Place Order, stock sold out between cart and checkout (show which item and let user fix), price changed, coupon expired during checkout, network drop after payment, user refreshes on the success page.

**Done when:** a COD order and a Razorpay test-mode order (test UPI/card) both complete; stock reduces correctly; failed payment does not create a PAID order; refreshing or double-submitting does not create duplicate orders.

---

# TASK 9: Customer account area

**Routes under `/account`:**
- **Profile:** edit name, change password (requires current password).
- **Orders list:** order number, date, status badge, total, thumbnails. Pagination.
- **Order detail** (`/order/[id]`, owner-only; return 404 for other users' IDs): items (custom designs viewable/downloadable preview), address, payment info, status timeline (Placed, Processing, Printed, Shipped, Delivered), tracking number, "Cancel order" (only while PLACED/PROCESSING; restores stock), "Reorder" button, invoice view (printable HTML/PDF).
- **Addresses:** add, edit, delete, set default.
- **Wishlist** (optional).

**Done when:** users only ever see their own data (test by changing the ID in the URL); cancel restores stock; reorder fills the cart.

---

# TASK 10: Admin panel (`/admin`)

**Access:** role ADMIN only.

**Pages:**
1. **Dashboard:** today's orders, revenue this week/month, low-stock list, recent orders, simple chart (use a small chart lib or plain SVG).
2. **Products:** table with search, create/edit form (title, slug auto-generated, description, category, tags, images upload to Cloudinary, active/featured toggle) and a **variants editor** (price and stock per size/finish/paper). Soft-delete (isActive=false) rather than hard delete, to avoid breaking old orders.
3. **Orders:** filter by status/date, view details, change status (with allowed-transition rules, e.g. cannot go from DELIVERED to PLACED), add tracking number, **download the custom design's original high-res image** for printing, cancel/refund note.
4. **Customers:** list with order counts.
5. **Categories:** CRUD.

**Done when:** admin can add a product with variants and see it live on the shop; updating an order status reflects in the customer's account; non-admins get blocked server-side.

---

# TASK 11: Static & trust pages, SEO, and polish

- Pages: About (founder story, short and honest), Size Guide, Shipping & Returns, FAQ (accordion), Contact (form that stores messages in DB `ContactMessage` and emails the owner), Privacy Policy, Terms.
- Returns policy suggestion: custom posters are non-returnable except for print defects/damage (photo proof within 48 hours).
- SEO: `sitemap.ts`, `robots.ts`, per-page metadata, canonical URLs, alt text everywhere, JSON-LD for products and the organization.
- Custom `404`, `500` (error.tsx), and `loading.tsx` pages in the brand style.
- Toast notifications (sonner) for all actions; no browser `alert()`.
- Cookie/consent note only if you add analytics.
- Performance: `next/image`, lazy loading, font subsetting, avoid layout shift.

**Done when:** Lighthouse mobile scores: Performance >= 85, Accessibility >= 90, SEO >= 90.

---

# TASK 12: Testing, QA & deployment

**Automated tests**
- **Vitest (unit):** `pricing.ts`, Zod validators, order-number generator, quality (DPI) calculator.
- **Playwright (e2e) - 3 critical flows:**
  1. Sign up, browse, add to cart, COD checkout, see the order in My Orders.
  2. Custom poster: upload a sample image, crop, add to cart (only when authenticated), checkout(only when authenticated).
  3. Admin: login, add product, change an order's status.

**Manual QA checklist (must all pass)**
- [ ] Sign up / sign in / sign out / wrong password / duplicate email
- [ ] Protected pages redirect correctly; admin pages blocked for customers
- [ ] Add to cart as guest, then log in: cart merges
- [ ] Every variant shows correct price and stock
- [ ] Out-of-stock cannot be added or ordered
- [ ] COD order succeed
- [ ] Double-clicking "Place order" creates only one order
- [ ] Custom upload: wrong type, >15 MB, low-res, huge-res, portrait and landscape
- [ ] Cancel order restores stock
- [ ] Mobile (360px) layout has no horizontal scroll
- [ ] `npm run build`, `npm run lint`, `npx tsc --noEmit` all clean; no console errors or hydration warnings

**Deployment**
1. Push to GitHub. Create a Neon database and copy the pooled `DATABASE_URL` (add `?sslmode=require`).
2. Import the repo in Vercel, add all env vars, set the build command to `prisma generate && prisma migrate deploy && next build`.
3. Run the seed once against production (`npx prisma db seed`).
4. Set `AUTH_URL` to the production domain; 
5. Smoke-test the live site with the QA checklist.

---

# DELIVERABLES CHECKLIST (for the final project submission)
- Working deployed URL + GitHub repo with a clear README (setup steps, env vars, test accounts).
- ER diagram of the database (generate from the Prisma schema, e.g. with prisma-erd-generator).
- Architecture diagram (Browser, Next.js on Vercel, Neon Postgres, Cloudinary).
- Screenshots of the key flows and a 3-minute demo video.
- Test accounts: `[agarwalanmol1212@gmail.com]` (admin) and `[anmolagarwal0904@gmail.com]` (customer).

---

# FUTURE SCOPE (mention in the report, do NOT build now)
Reviews with photos, product recommendations, framed posters, bulk/corporate orders, shipping-partner API (Shiprocket) for live tracking, multi-language, PWA, referral codes.