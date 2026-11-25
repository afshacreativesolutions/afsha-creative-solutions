create extension if not exists pgcrypto;

create table if not exists public.categories (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  description text,
  sort_order integer not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.admin_users (
  user_id uuid primary key references auth.users(id) on delete cascade,
  role text not null default 'admin' check (role in ('admin', 'editor')),
  created_at timestamptz not null default now()
);

create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  category_id uuid not null references public.categories(id) on delete restrict,
  short_description text not null default '',
  description text not null default '',
  materials text[] not null default '{}',
  applications text[] not null default '{}',
  customization_options text[] not null default '{}',
  finish_options text[] not null default '{}',
  specifications jsonb not null default '{}'::jsonb,
  care_instructions text,
  warranty text,
  is_published boolean not null default false,
  is_featured boolean not null default false,
  sort_order integer not null default 0,
  seo_title text,
  seo_description text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.product_images (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references public.products(id) on delete cascade,
  storage_path text not null unique,
  alt_text text not null default '',
  sort_order integer not null default 0,
  is_primary boolean not null default false,
  created_at timestamptz not null default now()
);

create index if not exists products_category_status_order_idx
  on public.products (category_id, is_published, sort_order);
create index if not exists products_slug_idx on public.products (slug);
create index if not exists product_images_product_order_idx
  on public.product_images (product_id, sort_order);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
set search_path = public
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists categories_set_updated_at on public.categories;
create trigger categories_set_updated_at before update on public.categories
for each row execute function public.set_updated_at();
drop trigger if exists products_set_updated_at on public.products;
create trigger products_set_updated_at before update on public.products
for each row execute function public.set_updated_at();

create or replace function public.is_catalog_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.admin_users
    where user_id = (select auth.uid())
  );
$$;

revoke all on function public.is_catalog_admin() from public;
grant execute on function public.is_catalog_admin() to anon, authenticated;

create or replace function public.replace_product_images(p_product_id uuid, p_images jsonb)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  if not public.is_catalog_admin() then
    raise exception 'Administrator access required';
  end if;
  if not exists (select 1 from public.products where id = p_product_id) then
    raise exception 'Product not found';
  end if;
  delete from public.product_images where product_id = p_product_id;
  insert into public.product_images (product_id, storage_path, alt_text, sort_order, is_primary)
  select p_product_id, item.storage_path, coalesce(item.alt_text, ''), item.sort_order, item.is_primary
  from jsonb_to_recordset(coalesce(p_images, '[]'::jsonb)) as item(
    storage_path text,
    alt_text text,
    sort_order integer,
    is_primary boolean
  );
end;
$$;
revoke all on function public.replace_product_images(uuid, jsonb) from public;
grant execute on function public.replace_product_images(uuid, jsonb) to authenticated;

alter table public.categories enable row level security;
alter table public.admin_users enable row level security;
alter table public.products enable row level security;
alter table public.product_images enable row level security;

drop policy if exists "Public can read active categories" on public.categories;
create policy "Public can read active categories" on public.categories
for select to anon, authenticated using (is_active or public.is_catalog_admin());
drop policy if exists "Admins manage categories" on public.categories;
create policy "Admins manage categories" on public.categories
for all to authenticated using (public.is_catalog_admin()) with check (public.is_catalog_admin());

drop policy if exists "Admins can read admin roster" on public.admin_users;
create policy "Admins can read admin roster" on public.admin_users
for select to authenticated using (user_id = (select auth.uid()) or public.is_catalog_admin());

drop policy if exists "Public can read published products" on public.products;
create policy "Public can read published products" on public.products
for select to anon, authenticated using (is_published or public.is_catalog_admin());
drop policy if exists "Admins manage products" on public.products;
create policy "Admins manage products" on public.products
for all to authenticated using (public.is_catalog_admin()) with check (public.is_catalog_admin());

drop policy if exists "Public can read images for published products" on public.product_images;
create policy "Public can read images for published products" on public.product_images
for select to anon, authenticated using (
  exists (
    select 1 from public.products p
    where p.id = product_id and (p.is_published or public.is_catalog_admin())
  )
);
drop policy if exists "Admins manage product images" on public.product_images;
create policy "Admins manage product images" on public.product_images
for all to authenticated using (public.is_catalog_admin()) with check (public.is_catalog_admin());

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('product-images', 'product-images', false, 8388608, array['image/jpeg','image/png','image/webp','image/avif'])
on conflict (id) do update set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "Public can view catalog images" on storage.objects;
drop policy if exists "Public can sign published catalog images" on storage.objects;
create policy "Public can sign published catalog images" on storage.objects
for select to anon, authenticated using (
  bucket_id = 'product-images' and (
    public.is_catalog_admin() or exists (
      select 1
      from public.product_images pi
      join public.products p on p.id = pi.product_id
      where pi.storage_path = storage.objects.name and p.is_published
    )
  )
);
drop policy if exists "Admins upload catalog images" on storage.objects;
create policy "Admins upload catalog images" on storage.objects
for insert to authenticated with check (
  bucket_id = 'product-images' and public.is_catalog_admin()
);
drop policy if exists "Admins update catalog images" on storage.objects;
create policy "Admins update catalog images" on storage.objects
for update to authenticated using (
  bucket_id = 'product-images' and public.is_catalog_admin()
) with check (bucket_id = 'product-images' and public.is_catalog_admin());
drop policy if exists "Admins delete catalog images" on storage.objects;
create policy "Admins delete catalog images" on storage.objects
for delete to authenticated using (
  bucket_id = 'product-images' and public.is_catalog_admin()
);

grant select on public.categories, public.products, public.product_images to anon, authenticated;
grant select, insert, update, delete on public.categories, public.products, public.product_images to authenticated;
grant select, insert, update, delete on public.categories, public.products, public.product_images to service_role;
grant select on public.admin_users to authenticated;

insert into public.categories (name, slug, sort_order) values
  ('Gates', 'gates', 1),
  ('Stair railings', 'stair-railings', 2),
  ('Balcony railings', 'balcony-railings', 3),
  ('Spiral railings', 'spiral-railings', 4)
on conflict (slug) do nothing;
