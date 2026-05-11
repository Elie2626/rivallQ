-- =============================================
-- OPTIFY — Supabase Schema
-- Run this in the Supabase SQL editor
-- =============================================

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- ── Profiles ────────────────────────────────
create table public.profiles (
  id                     uuid references auth.users on delete cascade primary key,
  email                  text not null,
  full_name              text,
  avatar_url             text,
  plan                   text check (plan in ('audit', 'rebuild', 'installation', 'subscription')),
  stripe_customer_id     text unique,
  stripe_subscription_id text unique,
  subscription_status    text,
  subscription_end_date  timestamptz,
  is_admin               boolean default false,
  created_at             timestamptz default now(),
  updated_at             timestamptz default now()
);

-- RLS on profiles
alter table public.profiles enable row level security;

create policy "Users can view their own profile"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Users can update their own profile"
  on public.profiles for update
  using (auth.uid() = id);

create policy "Service role can manage all profiles"
  on public.profiles for all
  using (auth.role() = 'service_role');

-- Auto-create profile on signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, full_name, avatar_url)
  values (
    new.id,
    new.email,
    new.raw_user_meta_data->>'full_name',
    new.raw_user_meta_data->>'avatar_url'
  );
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- Auto-update updated_at
create or replace function public.handle_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger handle_profiles_updated_at
  before update on public.profiles
  for each row execute function public.handle_updated_at();

-- ── Audits ───────────────────────────────────
create table public.audits (
  id                           uuid default uuid_generate_v4() primary key,
  user_id                      uuid references public.profiles(id) on delete cascade not null,
  url                          text not null,
  status                       text not null default 'pending'
                                 check (status in ('pending', 'scraping', 'analyzing', 'completed', 'failed')),

  -- Payment
  payment_status               text not null default 'pending'
                                 check (payment_status in ('pending', 'paid', 'failed', 'refunded')),
  payment_intent_id            text,
  stripe_session_id            text,

  -- Scores
  seo_score                    int check (seo_score between 0 and 100),
  ux_score                     int check (ux_score between 0 and 100),
  conversion_score             int check (conversion_score between 0 and 100),
  performance_score            int check (performance_score between 0 and 100),
  overall_score                int check (overall_score between 0 and 100),

  -- Analysis data (stored as JSONB)
  scraped_data                 jsonb,
  seo_analysis                 jsonb,
  ux_analysis                  jsonb,
  keyword_analysis             jsonb,
  issues                       jsonb,
  recommendations              jsonb,

  -- Rebuild reference
  rebuild_id                   uuid,
  rebuild_status               text check (rebuild_status in ('pending', 'generating', 'completed', 'failed')),
  rebuild_payment_status       text check (rebuild_payment_status in ('pending', 'paid', 'failed', 'refunded')),
  rebuild_payment_intent_id    text,
  rebuild_stripe_session_id    text,

  -- Error tracking
  error_message                text,

  created_at                   timestamptz default now(),
  updated_at                   timestamptz default now()
);

alter table public.audits enable row level security;

create policy "Users can view their own audits"
  on public.audits for select
  using (auth.uid() = user_id);

create policy "Users can create audits"
  on public.audits for insert
  with check (auth.uid() = user_id);

create policy "Users can update their own audits"
  on public.audits for update
  using (auth.uid() = user_id);

create policy "Service role can manage all audits"
  on public.audits for all
  using (auth.role() = 'service_role');

create trigger handle_audits_updated_at
  before update on public.audits
  for each row execute function public.handle_updated_at();

-- Index for performance
create index idx_audits_user_id on public.audits(user_id);
create index idx_audits_status on public.audits(status);
create index idx_audits_created_at on public.audits(created_at desc);

-- ── Rebuilds ─────────────────────────────────
create table public.rebuilds (
  id                      uuid default uuid_generate_v4() primary key,
  audit_id                uuid references public.audits(id) on delete cascade not null,
  user_id                 uuid references public.profiles(id) on delete cascade not null,
  status                  text not null default 'pending'
                            check (status in ('pending', 'generating', 'completed', 'failed')),
  payment_status          text not null default 'pending'
                            check (payment_status in ('pending', 'paid', 'failed', 'refunded')),

  -- Generated content
  homepage_html           text,
  homepage_css            text,
  meta_title              text,
  meta_description        text,
  pages                   jsonb,
  export_zip_url          text,

  -- WordPress install
  wp_install_status       text check (wp_install_status in ('pending', 'in_progress', 'completed', 'failed')),
  wp_site_url             text,
  wp_credentials_provided boolean default false,
  wp_error_message        text,

  -- Error
  error_message           text,

  created_at              timestamptz default now(),
  updated_at              timestamptz default now()
);

alter table public.rebuilds enable row level security;

create policy "Users can view their own rebuilds"
  on public.rebuilds for select
  using (auth.uid() = user_id);

create policy "Users can create rebuilds"
  on public.rebuilds for insert
  with check (auth.uid() = user_id);

create policy "Users can update their own rebuilds"
  on public.rebuilds for update
  using (auth.uid() = user_id);

create policy "Service role can manage all rebuilds"
  on public.rebuilds for all
  using (auth.role() = 'service_role');

create trigger handle_rebuilds_updated_at
  before update on public.rebuilds
  for each row execute function public.handle_updated_at();

create index idx_rebuilds_audit_id on public.rebuilds(audit_id);
create index idx_rebuilds_user_id on public.rebuilds(user_id);

-- ── Subscriptions log ─────────────────────────
create table public.subscription_events (
  id                uuid default uuid_generate_v4() primary key,
  user_id           uuid references public.profiles(id) on delete cascade,
  event_type        text not null,
  stripe_event_id   text unique,
  data              jsonb,
  created_at        timestamptz default now()
);

alter table public.subscription_events enable row level security;

create policy "Service role can manage subscription events"
  on public.subscription_events for all
  using (auth.role() = 'service_role');

create policy "Users can view their own events"
  on public.subscription_events for select
  using (auth.uid() = user_id);

-- ── Admin views ───────────────────────────────
create or replace view public.admin_stats as
select
  (select count(*) from public.profiles) as total_users,
  (select count(*) from public.audits) as total_audits,
  (select count(*) from public.audits where payment_status = 'paid') as paid_audits,
  (select count(*) from public.rebuilds where payment_status = 'paid') as paid_rebuilds,
  (select count(*) from public.profiles where subscription_status = 'active') as active_subscriptions,
  (select count(*) from public.audits where created_at > now() - interval '30 days') as audits_last_30d,
  (select count(*) from public.profiles where created_at > now() - interval '30 days') as new_users_last_30d;
