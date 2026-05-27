-- Run this in Supabase SQL Editor

create table if not exists courses (
  id            uuid primary key default gen_random_uuid(),
  title         text not null,
  description   text default '',
  level_required text,
  is_published  boolean default false,
  order_index   int default 99,
  created_at    timestamptz default now()
);

create table if not exists modules (
  id          uuid primary key default gen_random_uuid(),
  course_id   uuid references courses(id) on delete cascade,
  title       text not null,
  description text default '',
  order_index int default 99,
  created_at  timestamptz default now()
);

create table if not exists lessons (
  id           uuid primary key default gen_random_uuid(),
  module_id    uuid references modules(id) on delete cascade,
  title        text not null,
  description  text default '',
  video_url    text,
  content      text,
  duration_min int,
  is_published boolean default false,
  order_index  int default 99,
  created_at   timestamptz default now()
);

create table if not exists resources (
  id         uuid primary key default gen_random_uuid(),
  lesson_id  uuid references lessons(id) on delete cascade,
  name       text not null,
  url        text not null,
  type       text default 'link',
  created_at timestamptz default now()
);

-- Storage bucket for videos and files
insert into storage.buckets (id, name, public)
values ('course-media', 'course-media', true)
on conflict do nothing;

-- Allow public reads, authenticated uploads
create policy "Public read" on storage.objects
  for select using (bucket_id = 'course-media');

create policy "Authenticated upload" on storage.objects
  for insert with check (bucket_id = 'course-media');
