-- Card header tint index (0–3: orange, pink, green, blue). Nullable so existing rows
-- use a stable fallback from id until the app upserts a value.
alter table public.workshops
  add column if not exists card_accent_index smallint;

comment on column public.workshops.card_accent_index is '0–3 UI card header color; set at creation, stable per workshop.';
