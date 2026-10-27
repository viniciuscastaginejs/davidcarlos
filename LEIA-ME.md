# Site — David Carlos Consultor Automotivo

Site público (HTML, CSS e JavaScript puros, sem build). Funciona em qualquer hospedagem, incluindo a Hostinger.

## Páginas

| Arquivo | O que é |
|---|---|
| `index.html` | Home: logo animado no scroll, busca rápida, novidades, como funciona, banners, encomenda |
| `estoque.html` | Estoque com filtros (marca, modelo, tipo, ano, preço, km, câmbio, combustível) e link compartilhável |
| `veiculo.html?id=...` | Detalhe do carro: galeria com arrastar e tela cheia, ficha, opcionais, WhatsApp, financiamento |
| `venda-seu-carro.html` | Formulário de avaliação → WhatsApp |
| `financiamento.html` | Simulador de parcelas → WhatsApp |
| `sobre.html` | Sobre o David, serviços e contato |
| `404.html` | Página não encontrada |

## Antes de publicar

1. **Domínio** — buscar e substituir `https://www.seudominio.com.br` pelo domínio real em todos os arquivos (HTML, `sitemap.xml`, `robots.txt`).
2. **Contato** — buscar e substituir `5516900000000` e `(16) 90000-0000` pelo WhatsApp real em todos os arquivos. Instagram, e-mail, Facebook e CNPJ ficam em `js/config.js` (vazio = não aparece).
3. **Tirar a faixa de prévia** — em `js/config.js`, `modoDemonstracao: false`.
4. **Estoque** — enquanto o painel não existe, os carros ficam em `js/dados.js`. Os carros de exemplo devem ser trocados pelos reais (ou apagados).
5. **Textos** — revisar a página Sobre e a cidade de atendimento com o David.

## Subir na Hostinger

Enviar **todo o conteúdo** desta pasta (incluindo o arquivo oculto `.htaccess`) para `public_html`. O `.htaccess` já força HTTPS, ativa compressão, cache e a página 404.

Depois de publicado: cadastrar o site no Google Search Console e enviar `https://SEU-DOMINIO/sitemap.xml`. Criar também o Perfil da Empresa no Google com a mesma cidade e o mesmo WhatsApp do site.

Ao alterar CSS ou JS, aumentar o número `?v=1` nos `<script>`/`<link>` para os visitantes pegarem a versão nova.

## SEO incluído

Título e descrição únicos por página, URL canônica, Open Graph e Twitter (prévia bonita no WhatsApp/Instagram), dados estruturados (AutomotiveBusiness, WebSite com busca, Car com preço e disponibilidade em cada veículo, ItemList, BreadcrumbList, FAQPage), `sitemap.xml`, `robots.txt`, manifest, favicons, HTML semântico com um H1 por página, imagens com texto alternativo e site leve (sem frameworks).

Limitação atual: a prévia de link de **cada carro** no WhatsApp mostra a imagem geral do site, porque essas redes não executam JavaScript. Resolve no painel admin gerando a página do carro no servidor.

## Painel admin (próxima etapa)

O site já pede os dados por `js/api.js`. Com o painel no Supabase:

1. Aplicar `supabase/schema.sql` (rascunho: tabelas `veiculos`, `banners`, `leads` com segurança por linha).
2. Em `js/config.js`, preencher `supabase.url` e `supabase.anonKey` e mudar `fonteDados` para `'supabase'`.

A partir daí, carros, fotos e banners vêm do painel, e cada formulário também fica salvo como lead.
