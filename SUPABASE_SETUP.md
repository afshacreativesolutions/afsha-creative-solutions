# Supabase Catalog Setup

The product pages and `/admin` panel use Supabase Auth, Postgres, and Storage. Product image files stay in a private Storage bucket; the server creates one-hour signed URLs for published product galleries. The home page does not depend on this catalog connection.

## 1. Configure local environment

Create `.env.local` in the project root (it is ignored by Git). Copy the values from the Supabase project API settings:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-publishable-or-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

The service role key is used only by the local seed script. Do not add it to a `NEXT_PUBLIC_` variable or expose it to browser code. `.env.example` shows the expected names.

## 2. Apply the database migration

In the Supabase SQL Editor, run [`supabase/migrations/202611240001_catalog_and_admin.sql`](supabase/migrations/202611240001_catalog_and_admin.sql). It creates the catalog tables, public/draft access policies, admin role checks, the private `product-images` Storage bucket, signed-image access for published product galleries, and starter categories. The bucket itself is not public; only authenticated admins can upload, replace, or delete files.

## 3. Create the first admin

1. In Supabase Dashboard → Authentication → Users, invite or create an account for the catalog administrator.
2. Copy that user's UUID.
3. In SQL Editor, run the following with the real UUID:

```sql
insert into public.admin_users (user_id, role)
values ('SUPABASE_AUTH_USER_UUID', 'admin');
```

Sign in at `/admin/login`. There is no public sign-up route.

## 4. Copy the existing catalog and image files

After applying the migration and setting all three variables in `.env.local`, run:

```sh
npm run seed:catalog
```

If you already applied the catalog migration before this grant was added, first run [`supabase/migrations/202611240002_service_role_catalog_grants.sql`](supabase/migrations/202611240002_service_role_catalog_grants.sql) in the Supabase SQL Editor. The seed script needs SQL table privileges for `service_role` in addition to its RLS bypass.

The script reads the current image import groups in `utils/images.ts`, uploads each referenced file to the `product-images` bucket, writes image paths and ordering to Postgres, and creates the eight existing product records. It leaves products as **drafts** so the admin can verify the copy and product text before publishing.

The seed command is intended for initial migration. It upserts product/category rows and replaces their gallery rows; run it again only if you intend to refresh the seeded catalog/gallery. It does not delete old Storage objects that are no longer referenced.

## 5. Start and manage the site

```sh
npm run dev
```

Use `/admin/products` to create, edit, publish, unpublish, and delete products; `/admin/categories` manages category names, order, and active status. Uploaded images are stored in Supabase Storage and product records store only their paths and gallery metadata.

## Deployment

Set `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` in the hosting environment. The seed-only service role key is not needed at runtime. Invite admins from Supabase Auth and grant each one a row in `public.admin_users`.
