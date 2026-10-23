-- Obaid Store — Syria-first commerce schema
-- Run once in Supabase SQL Editor. Review policies before accepting real orders.
create extension if not exists pgcrypto;

create or replace function public.set_updated_at()
returns trigger language plpgsql set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text not null default '',
  phone text not null default '',
  governorate text not null default '',
  address text not null default '',
  role text not null default 'customer' check (role in ('customer','admin')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.categories (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  slug text not null unique,
  description text not null default '',
  image_url text not null default '',
  is_active boolean not null default true,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  category_id uuid references public.categories(id) on delete set null,
  name text not null,
  slug text not null unique,
  description text not null default '',
  images text[] not null default '{}',
  price_syp bigint not null check (price_syp >= 0),
  compare_at_price_syp bigint check (compare_at_price_syp is null or compare_at_price_syp >= price_syp),
  stock integer not null default 0 check (stock >= 0),
  sku text unique,
  is_active boolean not null default false,
  is_featured boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.coupons (
  id uuid primary key default gen_random_uuid(),
  code text not null unique,
  discount_type text not null check (discount_type in ('percent','fixed')),
  discount_value bigint not null check (discount_value > 0),
  min_order_syp bigint not null default 0 check (min_order_syp >= 0),
  max_uses integer check (max_uses is null or max_uses > 0),
  used_count integer not null default 0 check (used_count >= 0),
  starts_at timestamptz,
  expires_at timestamptz,
  is_active boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  order_number text not null unique,
  user_id uuid references auth.users(id) on delete set null,
  customer_name text not null,
  customer_phone text not null,
  customer_email text not null default '',
  governorate text not null,
  address text not null,
  delivery_notes text not null default '',
  payment_method text not null check (payment_method in ('cod','sham_cash','syriatel_cash','mtn_cash','bank_transfer')),
  payment_status text not null default 'unpaid' check (payment_status in ('unpaid','awaiting_review','paid','rejected','refunded')),
  status text not null default 'pending' check (status in ('pending','confirmed','preparing','shipped','delivered','cancelled','returned')),
  subtotal_syp bigint not null check (subtotal_syp >= 0),
  shipping_syp bigint not null default 0 check (shipping_syp >= 0),
  discount_syp bigint not null default 0 check (discount_syp >= 0),
  total_syp bigint not null check (total_syp >= 0),
  coupon_code text,
  payment_reference text not null default '',
  payment_proof_url text not null default '',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders(id) on delete cascade,
  product_id uuid references public.products(id) on delete set null,
  product_name text not null,
  product_image text not null default '',
  unit_price_syp bigint not null check (unit_price_syp >= 0),
  quantity integer not null check (quantity > 0),
  line_total_syp bigint not null check (line_total_syp >= 0),
  created_at timestamptz not null default now()
);

create table if not exists public.addresses (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  label text not null default 'المنزل',
  recipient_name text not null,
  phone text not null,
  governorate text not null,
  address text not null,
  delivery_notes text not null default '',
  is_default boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.wishlists (
  user_id uuid not null references auth.users(id) on delete cascade,
  product_id uuid not null references public.products(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (user_id, product_id)
);

create table if not exists public.reviews (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references public.products(id) on delete cascade,
  user_id uuid references auth.users(id) on delete set null,
  customer_name text not null default 'عميل',
  rating integer not null check (rating between 1 and 5),
  comment text not null default '',
  is_approved boolean not null default false,
  created_at timestamptz not null default now()
);

create table if not exists public.store_settings (
  key text primary key,
  value jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

create table if not exists public.inventory_movements (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references public.products(id) on delete cascade,
  quantity_change integer not null check (quantity_change <> 0),
  reason text not null,
  order_id uuid references public.orders(id) on delete set null,
  created_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now()
);

create index if not exists products_active_category_idx on public.products(is_active, category_id);
create index if not exists orders_user_created_idx on public.orders(user_id, created_at desc);
create index if not exists orders_status_created_idx on public.orders(status, created_at desc);
create index if not exists order_items_order_idx on public.order_items(order_id);
create index if not exists reviews_product_approved_idx on public.reviews(product_id, is_approved);

create or replace function public.is_store_admin()
returns boolean language sql stable security definer set search_path = ''
as $$
  select exists (
    select 1 from public.profiles p
    where p.id = (select auth.uid()) and p.role = 'admin'
  );
$$;

alter table public.profiles enable row level security;
alter table public.categories enable row level security;
alter table public.products enable row level security;
alter table public.coupons enable row level security;
alter table public.orders enable row level security;
alter table public.order_items enable row level security;
alter table public.addresses enable row level security;
alter table public.wishlists enable row level security;
alter table public.reviews enable row level security;
alter table public.store_settings enable row level security;
alter table public.inventory_movements enable row level security;

drop policy if exists "profile owner read" on public.profiles;
create policy "profile owner read" on public.profiles for select to authenticated
using (id = (select auth.uid()) or public.is_store_admin());
drop policy if exists "profile owner update" on public.profiles;
create policy "profile owner update" on public.profiles for update to authenticated
using (id = (select auth.uid()) or public.is_store_admin())
with check (id = (select auth.uid()) or public.is_store_admin());
drop policy if exists "admin manage profiles" on public.profiles;
create policy "admin manage profiles" on public.profiles for all to authenticated
using (public.is_store_admin()) with check (public.is_store_admin());

drop policy if exists "public read active categories" on public.categories;
create policy "public read active categories" on public.categories for select to anon, authenticated
using (is_active = true or public.is_store_admin());
drop policy if exists "admin manage categories" on public.categories;
create policy "admin manage categories" on public.categories for all to authenticated
using (public.is_store_admin()) with check (public.is_store_admin());

drop policy if exists "public read active products" on public.products;
create policy "public read active products" on public.products for select to anon, authenticated
using (is_active = true or public.is_store_admin());
drop policy if exists "admin manage products" on public.products;
create policy "admin manage products" on public.products for all to authenticated
using (public.is_store_admin()) with check (public.is_store_admin());

drop policy if exists "public read active coupons" on public.coupons;
create policy "public read active coupons" on public.coupons for select to anon, authenticated
using (is_active = true or public.is_store_admin());
drop policy if exists "admin manage coupons" on public.coupons;
create policy "admin manage coupons" on public.coupons for all to authenticated
using (public.is_store_admin()) with check (public.is_store_admin());

drop policy if exists "customer read own orders" on public.orders;
create policy "customer read own orders" on public.orders for select to authenticated
using (user_id = (select auth.uid()) or public.is_store_admin());
drop policy if exists "admin manage orders" on public.orders;
create policy "admin manage orders" on public.orders for all to authenticated
using (public.is_store_admin()) with check (public.is_store_admin());

drop policy if exists "customer read own order items" on public.order_items;
create policy "customer read own order items" on public.order_items for select to authenticated
using (exists (select 1 from public.orders o where o.id = order_id and (o.user_id = (select auth.uid()) or public.is_store_admin())));
drop policy if exists "admin manage order items" on public.order_items;
create policy "admin manage order items" on public.order_items for all to authenticated
using (public.is_store_admin()) with check (public.is_store_admin());

drop policy if exists "owner manage addresses" on public.addresses;
create policy "owner manage addresses" on public.addresses for all to authenticated
using (user_id = (select auth.uid()) or public.is_store_admin())
with check (user_id = (select auth.uid()) or public.is_store_admin());

drop policy if exists "owner manage wishlist" on public.wishlists;
create policy "owner manage wishlist" on public.wishlists for all to authenticated
using (user_id = (select auth.uid()) or public.is_store_admin())
with check (user_id = (select auth.uid()) or public.is_store_admin());

drop policy if exists "public read approved reviews" on public.reviews;
create policy "public read approved reviews" on public.reviews for select to anon, authenticated
using (is_approved = true or user_id = (select auth.uid()) or public.is_store_admin());
drop policy if exists "customer create own review" on public.reviews;
create policy "customer create own review" on public.reviews for insert to authenticated
with check (user_id = (select auth.uid()) and is_approved = false);
drop policy if exists "admin manage reviews" on public.reviews;
create policy "admin manage reviews" on public.reviews for all to authenticated
using (public.is_store_admin()) with check (public.is_store_admin());

drop policy if exists "public read store settings" on public.store_settings;
create policy "public read store settings" on public.store_settings for select to anon, authenticated
using (key in ('store_name','currency','shipping_governorates','payment_methods','contact') or public.is_store_admin());
drop policy if exists "admin manage store settings" on public.store_settings;
create policy "admin manage store settings" on public.store_settings for all to authenticated
using (public.is_store_admin()) with check (public.is_store_admin());

drop policy if exists "admin manage inventory" on public.inventory_movements;
create policy "admin manage inventory" on public.inventory_movements for all to authenticated
using (public.is_store_admin()) with check (public.is_store_admin());

drop trigger if exists profiles_updated_at on public.profiles;
create trigger profiles_updated_at before update on public.profiles for each row execute function public.set_updated_at();
drop trigger if exists categories_updated_at on public.categories;
create trigger categories_updated_at before update on public.categories for each row execute function public.set_updated_at();
drop trigger if exists products_updated_at on public.products;
create trigger products_updated_at before update on public.products for each row execute function public.set_updated_at();
drop trigger if exists coupons_updated_at on public.coupons;
create trigger coupons_updated_at before update on public.coupons for each row execute function public.set_updated_at();
drop trigger if exists orders_updated_at on public.orders;
create trigger orders_updated_at before update on public.orders for each row execute function public.set_updated_at();
drop trigger if exists addresses_updated_at on public.addresses;
create trigger addresses_updated_at before update on public.addresses for each row execute function public.set_updated_at();
drop trigger if exists store_settings_updated_at on public.store_settings;
create trigger store_settings_updated_at before update on public.store_settings for each row execute function public.set_updated_at();

insert into public.store_settings(key,value) values
 ('store_name', '"متجر عبيد"'),
 ('currency', '"SYP"'),
 ('shipping_governorates', '["دمشق","ريف دمشق","حلب","حمص","حماة","اللاذقية","طرطوس","إدلب","درعا","السويداء","القنيطرة","دير الزور","الرقة","الحسكة"]'::jsonb),
 ('payment_methods', '["cod","sham_cash","syriatel_cash","mtn_cash","bank_transfer"]'::jsonb),
 ('contact', '{"whatsapp":"","phone":"","email":""}'::jsonb)
on conflict (key) do nothing;

-- After signing up with Supabase Auth, grant the store owner admin access:
-- update public.profiles set role = 'admin' where id = '<AUTH_USER_UUID>';
-- Do not expose Supabase service_role/secret keys in the storefront.
-- Guest order submission should be implemented via a validated server-side Edge Function,
-- not by allowing anonymous clients to read or arbitrarily modify orders.
