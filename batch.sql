create table users (
  id varchar primary key not null unique,
  name varchar
);

create table bookmarks (
  id serial primary key not null unique,
  url varchar not null,
  label varchar,
  created_at TIMESTAMPTZ default now(),
  user_id varchar references users on delete cascade
);