# Product Catalog and Admin Panel Plan

## Goal

Move the product catalog from TypeScript constants into a managed database, keep products grouped by category, show complete product galleries on dynamic product pages, and provide a private admin panel for creating, editing, publishing, unpublishing, and removing catalog entries. Preserve the existing home page and its current layout.

## Current state

- The site uses Next.js 16.3.5 App Router.
- The public catalog is at `/products`; detail pages use `/products/[slug]`.
- Product records and their image groups are currently defined in `utils/products.ts` and `utils/images.ts`.
- Product photos are imported from local files under `assets/`; there is no database, storage integration, or admin authentication dependency configured.
- The existing detail route shows a gallery based on a local image group. This will become a database query for one product and its ordered image records.
- Keep `app/page.tsx` and the home page sections unchanged. The public product routes and the new `/admin` routes are the scope of this work.

## Recommended starting stack

Use Supabase for managed PostgreSQL, authentication, and image storage. Store the actual product image files in a Supabase Storage bucket; store only each file's bucket path and image metadata in Postgres. It fits the existing Next.js App Router and provides a direct path to role-based access and row-level policies. Keep all privileged catalog mutations on the server. Public visitors should only be able to read published products and categories and view published product images.

This is a recommendation based on the project having no existing backend or database provider. It can be revised if the deployment already includes a preferred database service.

## Product content model

The admin should capture structured content rather than one large description field. Suggested product fields:

| Field | Type / behavior | Purpose |
| --- | --- | --- |
| `name` | Required text | Customer-facing product name |
| `slug` | Required unique text, generated from name and editable | Stable URL for `/products/[slug]` |
| `category_id` | Required relation | Gates, stair railings, balcony railings, spiral railings, and future categories |
| `short_description` | Required text | Product card and search summary |
| `description` | Required rich/plain text | Product detail introduction and story |
| `materials` | Repeatable structured entries | Material name/grade where confirmed, plus optional notes |
| `applications` | Repeatable text/tags | Typical use contexts, such as entry, interior stair, or balcony |
| `customization_options` | Repeatable text/tags | Dimensions, pattern, infill, finish, or other options actually offered |
| `finish_options` | Repeatable text/tags | Available finishes for this product |
| `specifications` | Optional key/value rows | Dimensions, profile, mounting, or other product-specific technical details |
| `care_instructions` | Optional text | Maintenance guidance approved by the business |
| `warranty` | Optional text | Only show when the business has confirmed warranty terms |
| `images` | Ordered image records | Product gallery, alt text, and primary image selection |
| `is_published` | Boolean | Draft products stay out of public routes and search results |
| `is_featured` | Boolean | Optional catalog merchandising |
| `sort_order` | Integer | Stable ordering in public category/catalog views |
| `seo_title`, `seo_description` | Optional text | Search metadata overrides |
| `created_at`, `updated_at` | Timestamps | Maintenance and auditability |

Materials, applications, customization, finishes, and specifications should be editable per product. Do not fill in assumed steel grades, load ratings, building-code claims, or warranty terms; confirm those with the business before publishing. Product manufacturers commonly distinguish material, finish, application, and project-specific customization in their product information, which supports making these distinct content fields rather than burying them in prose. See [Hollaender architectural railing systems](https://www.hollaender.com/architectural), [AODSON railing post specifications](https://www.aodson.com/products/3814.html), and [AODSON customization guidance](https://www.aodson.com/architectural-hardware/).

## Initial database tables

Keep the first schema small but relational:

1. **`categories`** — `id`, `name`, unique `slug`, `description`, `sort_order`, `is_active`, timestamps.
2. **`products`** — the text, category, detail, publish, SEO, and ordering fields above. Store repeatable content as PostgreSQL text arrays or JSONB in the first version; use structured rows if the business later needs reusable searchable material/application dictionaries.
3. **`product_images`** — `id`, `product_id`, Storage bucket/path (never raw image bytes), alt text, `sort_order`, `is_primary`, timestamps.
4. **`profiles` / admin role mapping** — associate authenticated Supabase users with an admin role; provision the first admin explicitly.

Add database constraints for unique slugs, required category, and valid image-to-product relationships. Add indexes for published status, category, slug, and sort order.

## Public website behavior

- `/products` reads only published products and active categories from the database. Category filters become query-driven and remain linkable.
- `/products/[slug]` resolves a published product by slug, displays its description and structured sections (Materials, Applications, Customization, finishes/specifications when present), and loads every ordered `product_images` row.
- Unknown or unpublished slugs return the not-found page.
- Related products are selected from the same category, excluding the current product; allow a manual related-products relation later if merchandising needs it.
- Generate page metadata from product name and SEO fields. Revalidate affected public paths after successful admin changes.
- Preserve the current dark/gold design direction on product routes. Do not modify `app/page.tsx` or home-only components as part of this work.

## Admin panel

### Routes and screens

- `/admin/login` — sign-in for authorized users; no public registration.
- `/admin/products` — searchable, filterable product table with category and draft/published status.
- `/admin/products/new` — create product.
- `/admin/products/[id]/edit` — edit existing product.
- `/admin/categories` — add, rename, reorder, activate/deactivate categories.

### Product workflow

- Create a draft, enter structured details, select a category, and upload images.
- Upload product images to the Supabase Storage `product-images` bucket. Save the bucket path and metadata in `product_images`; render images from the Storage URL instead of importing local files in `utils/images.ts`.
- Set alt text, select the card/primary image, and reorder the gallery.
- Preview the public detail page before publishing.
- Edit and save without changing the slug by default; warn when an editor changes a published slug.
- Unpublish to hide a product while retaining its data. Use a confirm step for permanent deletion and prevent deleting a category that still contains products until those products are reassigned.
- Show clear save/upload errors and unsaved-change state.

## Security and data access

- Use Supabase Auth for sign-in and a server-verified admin role.
- Protect admin pages for usability, but also check authentication and role inside every Server Action or Route Handler that reads or mutates protected data. Next.js notes that Server Actions are callable endpoints and require their own authorization checks; route/UI hiding alone is insufficient. See [Next.js Authentication](https://nextjs.org/docs/app/guides/authentication) and [Next.js Data Security](https://nextjs.org/docs/app/guides/data-security).
- Enable Row Level Security. Anonymous users may select only published products and active categories. Only authorized admins may insert, update, or delete catalog data. Supabase recommends RLS policies for securing exposed data; see [Supabase Row Level Security](https://supabase.com/docs/guides/database/postgres/row-level-security).
- Keep service-role credentials server-only; never expose them to client code.
- Use a public-read `product-images` bucket for catalog display, with Storage policies that allow only authorized admins to upload, replace, or delete files. Constrain accepted file types and file sizes; see [Supabase Storage access control](https://supabase.com/docs/guides/storage/security/access-control).

## Migration plan

### Phase 1 — Backend foundation

- Create Supabase project and environment variables for the server/client configuration.
- Add Supabase SSR clients suitable for the installed Next.js App Router.
- Add SQL migrations for categories, products, product images, admin roles, indexes, and RLS/storage policies.
- Provision the first admin without adding open sign-up.

### Phase 2 — Seed and move current catalog

- Seed categories for gates, stair railings, balcony railings, and spiral railings.
- Convert the eight existing catalog entries in `utils/products.ts` into database product rows.
- Upload the image groups currently referenced in `utils/images.ts` into the Supabase Storage `product-images` bucket and create ordered image rows containing their Storage paths. Retain local source files until the uploaded galleries have been confirmed.
- Add genuine product descriptions and Materials, Applications, and Customization content only after the business confirms details. Keep unreviewed content as drafts.

### Phase 3 — Database-backed public pages

- Replace static product data reads in `/products` and `/products/[slug]` with server-side data access.
- Preserve category filtering, full image galleries, related-product links, quote actions, and responsive styling.
- Add publication-aware not-found handling, metadata, and path revalidation.

### Phase 4 — Admin CRUD

- Build authenticated admin navigation, product list, create/edit forms, image uploader/reorder controls, preview, category management, publish/unpublish, and delete/confirm actions.
- Validate every field on the server and authorize every mutation.
- Add success/error feedback and prevent accidental loss of unsaved form data.

### Phase 5 — Launch and handover

- Verify public visitors cannot read drafts or write data; verify a signed-out user cannot open admin pages or invoke mutations.
- Verify image ordering, upload limits, missing-image behavior, category filters, product slug changes, and all CRUD flows.
- Check mobile layouts, keyboard access, alt text, empty states, and page metadata.
- Add deployment environment variables and document how to invite an admin, edit a product, and restore a deleted/archived entry.

## Acceptance criteria

- Product listing and detail pages are database-backed; no public catalog content depends on a hard-coded product array.
- Category filters only show relevant published products.
- Every product detail page displays all its ordered gallery images and all populated content sections.
- Admin can add, edit, publish, unpublish, reorder images, manage categories, and remove products.
- Public users can read published catalog data but cannot write or view drafts.
- All protected write paths enforce authorization server-side and database/storage policies enforce access independently.
- Existing home page structure and appearance are unchanged.

## Source notes

- Next.js recommends using an authentication library for production authentication and describes authentication, session management, and authorization as separate concerns: [Next.js Authentication Guide](https://nextjs.org/docs/app/guides/authentication).
- Next.js recommends centralizing secure data access and warns that Server Actions must perform their own checks: [Next.js Data Security Guide](https://nextjs.org/docs/app/guides/data-security).
- Supabase documents Postgres RLS policies and Storage access control as mechanisms for securing database rows and uploaded files: [RLS Guide](https://supabase.com/docs/guides/database/postgres/row-level-security), [Storage Access Control](https://supabase.com/docs/guides/storage/security/access-control).
- The suggested catalog fields are an inference from architectural railing product/specification examples, which separate materials, applications, finishes, and project-specific customization: [Hollaender](https://www.hollaender.com/architectural), [AODSON product specification example](https://www.aodson.com/products/3814.html).
