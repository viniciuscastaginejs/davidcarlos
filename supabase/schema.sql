-- =====================================================================
-- RASCUNHO do banco para o painel admin — David Carlos Consultor Automotivo
-- Ainda NÃO aplicado em nenhum projeto. Os nomes dos campos são os mesmos
-- que o site já usa em js/dados.js, então o site público funciona sem mudar.
-- =====================================================================

create table if not exists public.veiculos (
  id              text primary key,             -- slug: marca-modelo-versao-ano-cor
  marca           text not null,
  modelo          text not null,
  versao          text,
  ano_fabricacao  int  not null,
  ano_modelo      int  not null,
  km              int  not null default 0,
  preco           numeric(12,2) not null,
  preco_anterior  numeric(12,2),                -- preenchido = mostra "Baixou o preço"
  cambio          text,
  combustivel     text,
  cor             text,
  carroceria      text,                         -- Hatch | Sedã | SUV | Picape
  portas          int,
  final_placa     int,
  opcionais       text[] not null default '{}',
  descricao       text,
  fotos           text[] not null default '{}', -- URLs públicas do Storage (bucket "veiculos")
  destaque        boolean not null default false,
  status          text not null default 'disponivel' check (status in ('disponivel','reservado','vendido')),
  laudo_cautelar  boolean not null default false,
  unico_dono      boolean not null default false,
  ipva_pago       boolean not null default false,
  revisado        boolean not null default false,
  criado_em       timestamptz not null default now(),
  atualizado_em   timestamptz not null default now()
);

create table if not exists public.banners (
  id        uuid primary key default gen_random_uuid(),
  titulo    text,
  texto     text,
  botao     text,
  link      text,
  imagem    text,          -- banner pronto (arte enviada pelo painel)
  arte      jsonb,         -- ou ilustração automática: {"carroceria":"SUV","cor":"Branco"}
  ordem     int not null default 0,
  ativo     boolean not null default true,
  criado_em timestamptz not null default now()
);

create table if not exists public.leads (
  id        uuid primary key default gen_random_uuid(),
  tipo      text not null check (tipo in ('interesse','avaliacao','financiamento','encomenda','contato')),
  dados     jsonb not null,
  pagina    text,
  status    text not null default 'novo' check (status in ('novo','em_atendimento','fechado','perdido')),
  criado_em timestamptz not null default now()
);

alter table public.veiculos enable row level security;
alter table public.banners  enable row level security;
alter table public.leads    enable row level security;

-- Site público: lê carros não vendidos e banners ativos
create policy "site le veiculos" on public.veiculos for select to anon using (status <> 'vendido');
create policy "site le banners"  on public.banners  for select to anon using (ativo);

-- Site público: só CRIA lead (não consegue ler os leads de ninguém)
create policy "site cria lead" on public.leads for insert to anon
  with check (pg_column_size(dados) < 8000);

-- Painel: usuários logados (só a equipe; deixar o cadastro público DESLIGADO no Supabase)
create policy "painel veiculos" on public.veiculos for all to authenticated using (true) with check (true);
create policy "painel banners"  on public.banners  for all to authenticated using (true) with check (true);
create policy "painel leads"    on public.leads    for all to authenticated using (true) with check (true);

create index if not exists veiculos_status_idx on public.veiculos (status, destaque desc, criado_em desc);
create index if not exists leads_criado_idx    on public.leads (criado_em desc);

-- Fotos: criar no Storage um bucket público chamado "veiculos".
