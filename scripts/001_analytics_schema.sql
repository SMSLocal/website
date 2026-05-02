-- SMSLocal analytics — Postgres schema (optional upgrade path)
--
-- Run this once you connect Supabase / Neon / Aurora Postgres. The
-- application currently uses Upstash Redis for storage; migrating to
-- Postgres gives you richer SQL queries (joins, window functions, CTEs)
-- and unbounded retention, but is not required to use the dashboard.
--
-- Migration steps when you're ready to switch:
--   1. Run this script on your Postgres DB.
--   2. Set DATABASE_URL in Vercel env vars.
--   3. Implement the Postgres branch inside lib/analytics/store.ts behind
--      a `process.env.DATABASE_URL ? pg : redis` check.
--   4. (Optional) Backfill: write a one-off script that copies the last N
--      days from the Redis hourly buckets into the events table.

-- ── Extensions ──────────────────────────────────────────────────────────────
create extension if not exists "uuid-ossp";

-- ── Tables ──────────────────────────────────────────────────────────────────

create table if not exists analytics_visitors (
  visitor_id       text primary key,
  user_id          text,
  email            text,
  first_seen       timestamptz not null default now(),
  last_seen        timestamptz not null default now(),
  sessions_count   int  not null default 0,
  events_count     int  not null default 0,
  first_source_kind text,
  first_source_name text,
  first_utm_source  text,
  first_utm_medium  text,
  first_utm_campaign text,
  first_landing_path text,
  first_country     text,
  first_city        text
);

create index if not exists analytics_visitors_user_id_idx
  on analytics_visitors (user_id) where user_id is not null;
create index if not exists analytics_visitors_email_idx
  on analytics_visitors (email) where email is not null;
create index if not exists analytics_visitors_last_seen_idx
  on analytics_visitors (last_seen desc);

create table if not exists analytics_events (
  id             uuid primary key default uuid_generate_v4(),
  ts             timestamptz not null,
  type           text not null check (type in ('pageview','event','conversion')),
  name           text,
  path           text not null,
  title          text,
  referrer       text,
  source_kind    text not null,
  source_name    text not null,
  utm_source     text,
  utm_medium     text,
  utm_campaign   text,
  utm_term       text,
  utm_content    text,
  gclid          text,
  fbclid         text,
  msclkid        text,
  visitor_id     text not null references analytics_visitors(visitor_id) on delete cascade,
  session_id     text not null,
  user_id        text,
  email          text,
  country_code   text,
  country        text,
  region         text,
  city           text,
  browser        text,
  os             text,
  device         text check (device in ('desktop','mobile','tablet','bot')),
  properties     jsonb
);

-- Cover the dashboard's hot paths.
create index if not exists analytics_events_ts_idx        on analytics_events (ts desc);
create index if not exists analytics_events_type_ts_idx   on analytics_events (type, ts desc);
create index if not exists analytics_events_visitor_ts_idx on analytics_events (visitor_id, ts desc);
create index if not exists analytics_events_session_ts_idx on analytics_events (session_id, ts desc);
create index if not exists analytics_events_path_ts_idx   on analytics_events (path, ts desc);
create index if not exists analytics_events_source_ts_idx on analytics_events (source_kind, source_name, ts desc);
create index if not exists analytics_events_country_ts_idx on analytics_events (country_code, ts desc);
create index if not exists analytics_events_campaign_ts_idx
  on analytics_events (utm_source, utm_medium, utm_campaign, ts desc);
create index if not exists analytics_events_user_ts_idx
  on analytics_events (user_id, ts desc) where user_id is not null;

-- ── Optional daily rollup for long-range charts ────────────────────────────
-- Populate with a nightly cron once data volume grows.
create table if not exists analytics_daily (
  day           date not null,
  country_code  text,
  source_kind   text,
  source_name   text,
  path          text,
  visitors      int  not null default 0,
  sessions      int  not null default 0,
  pageviews     int  not null default 0,
  conversions   int  not null default 0,
  primary key (day, country_code, source_kind, source_name, path)
);
create index if not exists analytics_daily_day_idx on analytics_daily (day desc);
