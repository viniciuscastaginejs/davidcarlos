/* Estoque: filtros, ordenação, URL compartilhável e gaveta no celular */
(async function () {
  const { DC } = window;
  const $ = s => document.querySelector(s);
  const POR_PAGINA = 12;
  const grade = $('#grade'), contador = $('#contador'), ativos = $('#filtros-ativos');
  const form = $('#filtros'), maisBtn = $('#mais');
  let todos = [];
  let pagina = 1;

  try { todos = await window.DC_API.listarVeiculos(); } catch (e) { todos = []; }

  /* ----- Monta opções a partir do estoque ----- */
  const unicos = (campo, filtro = () => true) => [...new Set(todos.filter(filtro).map(v => v[campo]))].filter(Boolean).sort((a, b) => String(a).localeCompare(String(b), 'pt-BR'));
  const opts = (lista, vazio) => `<option value="">${vazio}</option>` + lista.map(x => `<option value="${DC.slug(x)}">${DC.esc(x)}</option>`).join('');
  const sel = id => form.elements[id];
  sel('marca').innerHTML = opts(unicos('marca'), 'Todas');
  const preencherModelos = () => {
    const m = sel('marca').value, atual = sel('modelo').value;
    sel('modelo').innerHTML = opts(unicos('modelo', v => !m || DC.slug(v.marca) === m), 'Todos');
    sel('modelo').value = [...sel('modelo').options].some(o => o.value === atual) ? atual : '';
  };
  preencherModelos();
  sel('cambio').innerHTML = opts(unicos('cambio'), 'Todos');
  sel('combustivel').innerHTML = opts(unicos('combustivel'), 'Todos');
  const anos = [...new Set(todos.map(v => v.ano_modelo))].sort((a, b) => b - a);
  sel('ano_min').innerHTML = '<option value="">De</option>' + anos.map(a => `<option>${a}</option>`).join('');
  sel('ano_max').innerHTML = '<option value="">Até</option>' + anos.map(a => `<option>${a}</option>`).join('');
  const carrocerias = unicos('carroceria');
  $('#carrocerias').innerHTML = carrocerias.map(c => `<button type="button" class="chip" data-carroceria="${DC.slug(c)}" aria-pressed="false">${DC.esc(c)}</button>`).join('');

  /* ----- Estado <-> URL ----- */
  const CAMPOS = ['q', 'marca', 'modelo', 'carroceria', 'ano_min', 'ano_max', 'preco_min', 'preco_max', 'km_max', 'cambio', 'combustivel', 'ordem'];
  function lerURL() {
    const p = DC.params();
    CAMPOS.forEach(c => {
      const v = p.get(c) || '';
      if (c === 'carroceria') document.querySelectorAll('[data-carroceria]').forEach(b => b.setAttribute('aria-pressed', String(v.split(',').includes(b.dataset.carroceria))));
      else if (form.elements[c]) form.elements[c].value = v;
      else if (c === 'ordem') $('#ordem').value = v || 'recentes';
    });
    preencherModelos();
    if (p.get('modelo')) sel('modelo').value = p.get('modelo');
  }
  function estado() {
    const e = {};
    CAMPOS.forEach(c => {
      if (c === 'carroceria') e.carroceria = [...document.querySelectorAll('[data-carroceria][aria-pressed="true"]')].map(b => b.dataset.carroceria).join(',');
      else if (c === 'ordem') e.ordem = $('#ordem').value;
      else e[c] = (form.elements[c].value || '').trim();
    });
    return e;
  }
  function gravarURL(e) {
    const q = new URLSearchParams();
    Object.entries(e).forEach(([k, v]) => { if (v && !(k === 'ordem' && v === 'recentes')) q.set(k, v); });
    try { history.replaceState(null, '', location.pathname + (q.toString() ? '?' + q : '')); } catch (err) { /* ok */ }
  }

  /* ----- Filtragem ----- */
  function filtrar(e) {
    const termo = DC.slug(e.q);
    const carr = e.carroceria ? e.carroceria.split(',') : [];
    let lista = todos.filter(v =>
      (!termo || DC.slug(`${v.marca} ${v.modelo} ${v.versao} ${v.cor}`).includes(termo)) &&
      (!e.marca || DC.slug(v.marca) === e.marca) &&
      (!e.modelo || DC.slug(v.modelo) === e.modelo) &&
      (!carr.length || carr.includes(DC.slug(v.carroceria))) &&
      (!e.ano_min || v.ano_modelo >= +e.ano_min) &&
      (!e.ano_max || v.ano_modelo <= +e.ano_max) &&
      (!e.preco_min || v.preco >= +e.preco_min) &&
      (!e.preco_max || v.preco <= +e.preco_max) &&
      (!e.km_max || v.km <= +e.km_max) &&
      (!e.cambio || DC.slug(v.cambio) === e.cambio) &&
      (!e.combustivel || DC.slug(v.combustivel) === e.combustivel)
    );
    const ord = {
      recentes: (a, b) => (b.destaque - a.destaque) || String(b.criado_em).localeCompare(String(a.criado_em)),
      menor_preco: (a, b) => a.preco - b.preco,
      maior_preco: (a, b) => b.preco - a.preco,
      menor_km: (a, b) => a.km - b.km,
      mais_novos: (a, b) => b.ano_modelo - a.ano_modelo || a.km - b.km
    }[e.ordem] || (() => 0);
    return lista.sort(ord);
  }

  const rotulos = { q: 'Busca', marca: 'Marca', modelo: 'Modelo', carroceria: 'Tipo', ano_min: 'Ano de', ano_max: 'Ano até', preco_min: 'Preço de', preco_max: 'Até', km_max: 'Km até', cambio: 'Câmbio', combustivel: 'Combustível' };
  function textoFiltro(k, v) {
    if (k === 'preco_min' || k === 'preco_max') return `${rotulos[k]} ${DC.fmt.preco(+v)}`;
    if (k === 'km_max') return `${rotulos[k]} ${DC.fmt.km(+v)}`;
    if (form.elements[k] && form.elements[k].tagName === 'SELECT') { const o = [...form.elements[k].options].find(x => x.value === v); return o ? o.text : v; }
    if (k === 'carroceria') return v.split(',').map(s => (document.querySelector(`[data-carroceria="${s}"]`) || {}).textContent || s).join(', ');
    return `“${v}”`;
  }

  function render(rolarTopo) {
    const e = estado();
    gravarURL(e);
    const lista = filtrar(e);
    const visiveis = lista.slice(0, pagina * POR_PAGINA);
    contador.innerHTML = `<strong>${lista.length}</strong> ${lista.length === 1 ? 'veículo encontrado' : 'veículos encontrados'}`;
    grade.innerHTML = visiveis.length
      ? visiveis.map((v, i) => DC.card(v, i)).join('')
      : `<div class="empty" style="grid-column:1/-1">
          <h3>Nenhum carro com esses filtros agora</h3>
          <p>O estoque muda toda semana. Me diga o que você procura que eu encontro pra você.</p>
          <div class="hero-cta" style="justify-content:center">
            <a class="btn btn--wa" target="_blank" rel="noopener" href="${DC.linkWhats('Olá, David! Procurei no site e não achei o carro que quero. Pode me ajudar?')}">${DC.icon.whatsapp}Pedir pelo WhatsApp</a>
            <button class="btn btn--ghost" type="button" data-limpar>Limpar filtros</button>
          </div></div>`;
    maisBtn.hidden = visiveis.length >= lista.length;
    DC.revelar(grade);

    const chipsAtivos = Object.entries(e).filter(([k, v]) => v && k !== 'ordem');
    ativos.innerHTML = chipsAtivos.map(([k, v]) => `<button type="button" class="chip" data-remover="${k}">${DC.esc(textoFiltro(k, v))}${DC.icon.fechar}</button>`).join('');
    ativos.hidden = !chipsAtivos.length;
    const n = chipsAtivos.length;
    $('#n-filtros').textContent = n ? `(${n})` : '';
    $('#ver-resultados').textContent = `Ver ${lista.length} ${lista.length === 1 ? 'resultado' : 'resultados'}`;

    // título da página reflete o filtro principal (bom para SEO e para compartilhar)
    const marcaTxt = e.marca ? textoFiltro('marca', e.marca) : '';
    const modeloTxt = e.modelo ? textoFiltro('modelo', e.modelo) : '';
    const foco = [marcaTxt, modeloTxt].filter(Boolean).join(' ');
    $('#titulo-estoque').textContent = foco ? `${foco} seminovos` : 'Estoque de seminovos';
    if (foco) document.title = `${foco} seminovos à venda | ${DC.cfg.nome}`;

    DC.jsonld({
      '@context': 'https://schema.org', '@type': 'ItemList', name: 'Estoque de veículos',
      itemListElement: visiveis.map((v, i) => ({ '@type': 'ListItem', position: i + 1, url: DC.urlBase() + DC.linkVeiculo(v), name: DC.fmt.completo(v) }))
    }, 'ld-estoque');
    if (rolarTopo) { const top = $('.stock').getBoundingClientRect().top + scrollY - 80; if (scrollY > top) scrollTo({ top, behavior: 'smooth' }); }
  }

  /* ----- Eventos ----- */
  lerURL();
  let t;
  form.addEventListener('input', ev => {
    if (ev.target.name === 'marca') preencherModelos();
    pagina = 1; clearTimeout(t); t = setTimeout(() => render(false), ev.target.type === 'search' ? 220 : 0);
  });
  form.addEventListener('submit', ev => { ev.preventDefault(); fecharGaveta(); render(true); });
  $('#ordem').addEventListener('change', () => { pagina = 1; render(false); });
  $('#carrocerias').addEventListener('click', ev => {
    const b = ev.target.closest('[data-carroceria]'); if (!b) return;
    b.setAttribute('aria-pressed', String(b.getAttribute('aria-pressed') !== 'true')); pagina = 1; render(false);
  });
  maisBtn.addEventListener('click', () => { pagina++; render(false); });
  const limpar = () => {
    form.reset(); document.querySelectorAll('[data-carroceria]').forEach(b => b.setAttribute('aria-pressed', 'false'));
    preencherModelos(); pagina = 1; render(true);
  };
  document.addEventListener('click', ev => {
    if (ev.target.closest('[data-limpar]')) limpar();
    const r = ev.target.closest('[data-remover]');
    if (r) {
      const k = r.dataset.remover;
      if (k === 'carroceria') document.querySelectorAll('[data-carroceria]').forEach(b => b.setAttribute('aria-pressed', 'false'));
      else { form.elements[k].value = ''; if (k === 'marca') preencherModelos(); }
      pagina = 1; render(false);
    }
  });

  /* ----- Gaveta de filtros (celular) ----- */
  const painel = $('.filters');
  let fundo = null;
  function abrirGaveta() {
    painel.classList.add('open'); painel.removeAttribute('inert');
    fundo = document.createElement('div'); fundo.className = 'filters-backdrop'; fundo.addEventListener('click', fecharGaveta);
    document.body.appendChild(fundo); document.documentElement.style.overflow = 'hidden';
    $('#abrir-filtros').setAttribute('aria-expanded', 'true');
  }
  function fecharGaveta() {
    if (!painel.classList.contains('open')) return;
    painel.classList.remove('open'); if (fundo) fundo.remove(); fundo = null; document.documentElement.style.overflow = '';
    $('#abrir-filtros').setAttribute('aria-expanded', 'false');
  }
  $('#abrir-filtros').addEventListener('click', abrirGaveta);
  $('#fechar-filtros').addEventListener('click', fecharGaveta);
  document.addEventListener('keydown', ev => { if (ev.key === 'Escape') fecharGaveta(); });

  render(false);
})();
