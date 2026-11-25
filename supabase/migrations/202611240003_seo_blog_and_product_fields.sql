alter table public.products
  add column if not exists focus_keyword text,
  add column if not exists canonical_url text,
  add column if not exists image_alt text;

create table if not exists public.blog_posts (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  excerpt text,
  content text not null default '',
  featured_image text,
  image_alt text,
  seo_title text,
  seo_description text,
  focus_keyword text,
  canonical_url text,
  status text not null default 'draft' check (status in ('draft', 'published')),
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists blog_posts_status_published_idx
  on public.blog_posts (status, published_at desc);
create index if not exists blog_posts_slug_idx on public.blog_posts (slug);

drop trigger if exists blog_posts_set_updated_at on public.blog_posts;
create trigger blog_posts_set_updated_at before update on public.blog_posts
for each row execute function public.set_updated_at();

alter table public.blog_posts enable row level security;

drop policy if exists "Public can read published blog posts" on public.blog_posts;
create policy "Public can read published blog posts" on public.blog_posts
for select to anon, authenticated using (
  status = 'published' and (published_at is null or published_at <= now())
);

drop policy if exists "Admins manage blog posts" on public.blog_posts;
create policy "Admins manage blog posts" on public.blog_posts
for all to authenticated using (public.is_catalog_admin()) with check (public.is_catalog_admin());

grant select on public.blog_posts to anon, authenticated;
grant select, insert, update, delete on public.blog_posts to authenticated;
grant select, insert, update, delete on public.blog_posts to service_role;

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('blog-images', 'blog-images', false, 8388608, array['image/jpeg','image/png','image/webp','image/avif'])
on conflict (id) do update set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "Public can sign published blog images" on storage.objects;
create policy "Public can sign published blog images" on storage.objects
for select to anon, authenticated using (
  bucket_id = 'blog-images' and (
    public.is_catalog_admin() or exists (
      select 1 from public.blog_posts bp
      where bp.featured_image = storage.objects.name and bp.status = 'published'
        and (bp.published_at is null or bp.published_at <= now())
    )
  )
);
drop policy if exists "Admins upload blog images" on storage.objects;
create policy "Admins upload blog images" on storage.objects
for insert to authenticated with check (bucket_id = 'blog-images' and public.is_catalog_admin());
drop policy if exists "Admins update blog images" on storage.objects;
create policy "Admins update blog images" on storage.objects
for update to authenticated using (bucket_id = 'blog-images' and public.is_catalog_admin()) with check (bucket_id = 'blog-images' and public.is_catalog_admin());
drop policy if exists "Admins delete blog images" on storage.objects;
create policy "Admins delete blog images" on storage.objects
for delete to authenticated using (bucket_id = 'blog-images' and public.is_catalog_admin());
