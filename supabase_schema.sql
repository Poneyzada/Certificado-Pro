-- ================================================================
-- CERTIFICADO PRO - SCRIPT DE CRIAÇÃO DAS TABELAS NO SUPABASE
-- Cole este script no "SQL Editor" do painel do Supabase e clique em "Run"
-- ================================================================

-- 1. Tabela de Filiais / Academias
create table if not exists public.filiais (
  id text primary key,
  name text not null,
  "professorDefault" text not null,
  city text default 'Brasil',
  color text default '#2563eb',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. Tabela de Lotes de Graduação
create table if not exists public.batches (
  id text primary key,
  title text not null,
  date date not null,
  "filialId" text references public.filiais(id) on delete set null,
  professor text not null,
  notes text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 3. Tabela de Graduandos / Alunos
create table if not exists public.students (
  id text primary key,
  name text not null,
  belt text not null,
  degrees integer default 0,
  date date not null,
  professor text not null,
  "filialId" text references public.filiais(id) on delete cascade,
  "filialName" text not null,
  "batchId" text references public.batches(id) on delete set null,
  printed boolean default false,
  "printedAt" timestamp with time zone,
  notes text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 4. Tabela de Configurações do Certificado e Selo
create table if not exists public.certificate_config (
  id text primary key default 'default_config',
  data jsonb not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 5. Habilitar Leitura e Escrita Pública (Relação Aberta para o App)
alter table public.filiais enable row level security;
alter table public.batches enable row level security;
alter table public.students enable row level security;
alter table public.certificate_config enable row level security;

-- Políticas de acesso livre (Anon Key)
create policy "Acesso público filiais" on public.filiais for all using (true) with check (true);
create policy "Acesso público batches" on public.batches for all using (true) with check (true);
create policy "Acesso público students" on public.students for all using (true) with check (true);
create policy "Acesso público config" on public.certificate_config for all using (true) with check (true);

-- Dados Iniciais das Filiais Padrão
insert into public.filiais (id, name, "professorDefault", city, color)
values 
  ('matriz', 'Matriz - Centro', 'Mestre Carlos Silva', 'São Paulo - SP', '#2563eb'),
  ('filial-norte', 'Filial Zona Norte', 'Prof. Rafael Santos', 'São Paulo - SP', '#7c3aed'),
  ('filial-sul', 'Filial Zona Sul', 'Prof. Diego Oliveira', 'São Paulo - SP', '#059669')
on conflict (id) do nothing;
