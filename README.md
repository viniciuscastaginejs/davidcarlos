# Luis Otávio Fotografias — Gestão Financeira

Sistema financeiro single-file (`index.html`), sem build, usando Supabase como
backend. Funciona direto no GitHub Pages.

## 1. Configurar o banco de dados

1. Acesse o painel do Supabase do projeto.
2. Vá em **SQL Editor** e execute todo o conteúdo de `supabase_setup.sql`.
   Isso cria as tabelas `receitas`, `despesas` e `receitas_recorrentes`, ativa
   RLS (Row Level Security) e as políticas que garantem que cada usuário só
   veja/edite os próprios registros.

   > Se você já tinha rodado uma versão anterior deste script (sem a tabela
   > `receitas_recorrentes`), pode rodar o arquivo de novo sem problema — todos
   > os comandos usam `if not exists` / `drop policy if exists`, então só a
   > tabela e as políticas novas serão criadas.

## 2. Desativar cadastro público

Este sistema **não tem tela de cadastro**. Para impedir que qualquer pessoa
crie uma conta:

1. Vá em **Authentication → Settings**.
2. Desative a opção **"Allow new users to sign up"**.

## 3. Criar o usuário manualmente

1. Vá em **Authentication → Users**.
2. Clique em **Add user** (ou "Invite/Create user").
3. Informe e-mail e senha, e marque **"Auto Confirm User"** (para que o login
   funcione imediatamente, sem precisar confirmar e-mail).

## 4. Publicar no GitHub Pages

1. Crie um repositório no GitHub e suba estes arquivos (`index.html`,
   `supabase_setup.sql`, `.gitignore`, `README.md`):
   ```
   git init
   git add .
   git commit -m "Sistema financeiro inicial"
   git branch -M main
   git remote add origin <url-do-seu-repo>
   git push -u origin main
   ```
2. No GitHub, vá em **Settings → Pages**.
3. Em "Build and deployment", selecione **Deploy from a branch**, branch
   `main`, pasta `/ (root)`.
4. Aguarde o deploy e acesse a URL gerada (algo como
   `https://<usuario>.github.io/<repo>/`).
5. Faça login com o e-mail e senha criados no passo 3.

## Observação sobre a chave do Supabase

A Project URL e a chave **anon** (pública) estão diretamente no código de
`index.html`. Isso é seguro por design: a chave anon não dá acesso a nada por
si só — toda a segurança vem das políticas de RLS criadas em
`supabase_setup.sql`, que restringem cada usuário aos seus próprios dados.
**Nunca** coloque a chave `service_role` no frontend.
