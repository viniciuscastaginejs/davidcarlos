-- ============================================================================
-- Luis Otávio Fotografias — Setup do banco de dados (Supabase)
-- ============================================================================
-- COMO USAR:
--   1. Abra o painel do Supabase do projeto > SQL Editor.
--   2. Cole todo este arquivo e execute (RUN).
--   3. Depois disso, vá em Authentication → Settings e DESATIVE a opção
--      "Allow new users to sign up" (Enable email signup / Allow signups).
--      Este sistema NÃO possui tela de cadastro: os usuários devem ser
--      criados manualmente em Authentication → Users (com "Auto Confirm
--      User" marcado), pelo administrador.
-- ============================================================================

-- Extensão necessária para gerar UUIDs (geralmente já vem habilitada no Supabase)
create extension if not exists "pgcrypto";

-- ----------------------------------------------------------------------------
-- Tabela: receitas
-- ----------------------------------------------------------------------------
create table if not exists public.receitas (
  id            uuid primary key default gen_random_uuid(),
  user_id       uuid not null default auth.uid() references auth.users(id) on delete cascade,
  descricao     text not null,
  cliente       text,
  tipo_servico  text not null check (tipo_servico in ('ensaio', 'casamento', 'evento', 'corporativo', 'outro')),
  valor         numeric(12,2) not null check (valor >= 0),
  data          date not null,
  status        text not null check (status in ('pago', 'pendente')) default 'pendente',
  created_at    timestamptz not null default now()
);

create index if not exists receitas_user_id_idx on public.receitas (user_id);
create index if not exists receitas_data_idx on public.receitas (data);

-- ----------------------------------------------------------------------------
-- Tabela: despesas
-- ----------------------------------------------------------------------------
create table if not exists public.despesas (
  id            uuid primary key default gen_random_uuid(),
  user_id       uuid not null default auth.uid() references auth.users(id) on delete cascade,
  descricao     text not null,
  categoria     text not null check (categoria in ('equipamento', 'software', 'transporte', 'marketing', 'impostos', 'outro')),
  valor         numeric(12,2) not null check (valor >= 0),
  data          date not null,
  created_at    timestamptz not null default now()
);

create index if not exists despesas_user_id_idx on public.despesas (user_id);
create index if not exists despesas_data_idx on public.despesas (data);

-- ----------------------------------------------------------------------------
-- Tabela: receitas_recorrentes (assinaturas/clientes fixos mensais)
-- ----------------------------------------------------------------------------
create table if not exists public.receitas_recorrentes (
  id                uuid primary key default gen_random_uuid(),
  user_id           uuid not null default auth.uid() references auth.users(id) on delete cascade,
  descricao         text not null,
  cliente           text,
  tipo_servico      text not null check (tipo_servico in ('ensaio', 'casamento', 'evento', 'corporativo', 'outro')),
  valor             numeric(12,2) not null check (valor >= 0),
  data_inicio       date not null,
  fidelidade_meses  integer not null default 0 check (fidelidade_meses >= 0),
  ativo             boolean not null default true,
  created_at        timestamptz not null default now()
);

create index if not exists receitas_recorrentes_user_id_idx on public.receitas_recorrentes (user_id);

-- ----------------------------------------------------------------------------
-- Row Level Security (RLS)
-- ----------------------------------------------------------------------------
alter table public.receitas enable row level security;
alter table public.despesas enable row level security;
alter table public.receitas_recorrentes enable row level security;

-- Políticas: receitas (cada usuário só vê/edita os próprios registros)
drop policy if exists "receitas_select_own" on public.receitas;
create policy "receitas_select_own"
  on public.receitas for select
  using (auth.uid() = user_id);

drop policy if exists "receitas_insert_own" on public.receitas;
create policy "receitas_insert_own"
  on public.receitas for insert
  with check (auth.uid() = user_id);

drop policy if exists "receitas_update_own" on public.receitas;
create policy "receitas_update_own"
  on public.receitas for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

drop policy if exists "receitas_delete_own" on public.receitas;
create policy "receitas_delete_own"
  on public.receitas for delete
  using (auth.uid() = user_id);

-- Políticas: despesas (cada usuário só vê/edita os próprios registros)
drop policy if exists "despesas_select_own" on public.despesas;
create policy "despesas_select_own"
  on public.despesas for select
  using (auth.uid() = user_id);

drop policy if exists "despesas_insert_own" on public.despesas;
create policy "despesas_insert_own"
  on public.despesas for insert
  with check (auth.uid() = user_id);

drop policy if exists "despesas_update_own" on public.despesas;
create policy "despesas_update_own"
  on public.despesas for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

drop policy if exists "despesas_delete_own" on public.despesas;
create policy "despesas_delete_own"
  on public.despesas for delete
  using (auth.uid() = user_id);

-- Políticas: receitas_recorrentes (cada usuário só vê/edita os próprios registros)
drop policy if exists "receitas_recorrentes_select_own" on public.receitas_recorrentes;
create policy "receitas_recorrentes_select_own"
  on public.receitas_recorrentes for select
  using (auth.uid() = user_id);

drop policy if exists "receitas_recorrentes_insert_own" on public.receitas_recorrentes;
create policy "receitas_recorrentes_insert_own"
  on public.receitas_recorrentes for insert
  with check (auth.uid() = user_id);

drop policy if exists "receitas_recorrentes_update_own" on public.receitas_recorrentes;
create policy "receitas_recorrentes_update_own"
  on public.receitas_recorrentes for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

drop policy if exists "receitas_recorrentes_delete_own" on public.receitas_recorrentes;
create policy "receitas_recorrentes_delete_own"
  on public.receitas_recorrentes for delete
  using (auth.uid() = user_id);

-- ============================================================================
-- Fim do script.
-- Lembre-se: Authentication → Settings → desative "Allow new users to sign up".
-- ============================================================================
