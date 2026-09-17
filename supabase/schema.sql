-- Ejecutar una sola vez en el SQL Editor de Supabase
-- (Dashboard -> SQL Editor -> New query -> pegar y ejecutar)

-- 1. Categorias (normalizado: antes "category" era texto libre repetido
--    en cada fila de "dishes"; ahora es una entidad propia referenciada
--    por clave foranea, evitando redundancia e inconsistencias de texto)
create table if not exists public.categories (
  id uuid primary key default gen_random_uuid(),
  name text not null unique
);

insert into public.categories (name) values
  ('Desayuno'),
  ('Almuerzo-Cena'),
  ('Bebida'),
  ('Entrada'),
  ('Extra')
on conflict (name) do nothing;

alter table public.categories enable row level security;

create policy "Public read categories" on public.categories
  for select using (true);

-- 2. Platillos (reemplaza la coleccion "dishes" de Firestore)
create table if not exists public.dishes (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text,
  price numeric not null default 0,
  category_id uuid references public.categories(id),
  image text,
  visible boolean not null default true,
  created_at timestamptz not null default now()
);

alter table public.dishes enable row level security;

-- El panel admin no tiene login real contra Supabase todavia (login
-- simulado con sessionStorage), asi que por ahora se permite operar
-- la tabla con la anon key. Cuando se implemente Supabase Auth, estas
-- politicas deben restringirse a "authenticated".
create policy "Public read dishes" on public.dishes
  for select using (true);

create policy "Public insert dishes" on public.dishes
  for insert with check (true);

create policy "Public update dishes" on public.dishes
  for update using (true);

create policy "Public delete dishes" on public.dishes
  for delete using (true);

-- Habilitar Realtime en la tabla (equivalente a onSnapshot de Firestore)
alter publication supabase_realtime add table public.dishes;

-- 3. Bucket de Storage para las imagenes de los platillos
insert into storage.buckets (id, name, public)
values ('dish-images', 'dish-images', true)
on conflict (id) do nothing;

create policy "Public read dish images" on storage.objects
  for select using (bucket_id = 'dish-images');

create policy "Public upload dish images" on storage.objects
  for insert with check (bucket_id = 'dish-images');

create policy "Public update dish images" on storage.objects
  for update using (bucket_id = 'dish-images');

create policy "Public delete dish images" on storage.objects
  for delete using (bucket_id = 'dish-images');
