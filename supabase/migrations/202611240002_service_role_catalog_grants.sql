-- The one-time catalog seeder uses the service_role key. RLS bypass does not
-- replace SQL table privileges, so explicitly grant access to catalog tables.
grant select, insert, update, delete
on public.categories, public.products, public.product_images
to service_role;
