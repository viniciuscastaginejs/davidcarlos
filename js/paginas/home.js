/* Home: busca rápida, marcas, novidades, banners e encomenda */
(async function () {
  const { DC } = window;
  const api = window.DC_API;
  const $ = s => document.querySelector(s);

  let veiculos = [];
  try { veiculos = await api.listarVeiculos(); } catch (e) { veiculos = []; }

  /* ----- Busca rápida (Comprar / Vender) ----- */
  const tabs = document.querySelectorAll('.finder .tabs button');
  tabs.forEach(t => t.addEventListener('click', () => {
    tabs.forEach(b => b.setAttribute('aria-selected', String(b === t)));
    document.querySelectorAll('.finder [role="tabpanel"]').forEach(p => { p.hidden = p.id !== t.getAttribute('aria-controls'); });
  }));

  const selMarca = $('#f-marca'), selModelo = $('#f-modelo'), selPreco = $('#f-preco');
  const marcas = [...new Set(veiculos.map(v => v.marca))].sort((a, b) => a.localeCompare(b, 'pt-BR'));
  if (selMarca) {
    selMarca.innerHTML = '<option value="">Todas as marcas</option>' + marcas.map(m => `<option value="${DC.slug(m)}">${DC.esc(m)}</option>`).join('');
    const atualizarModelos = () => {
      const m = selMarca.value;
      const modelos = [...new Set(veiculos.filter(v => !m || DC.slug(v.marca) === m).map(v => v.modelo))].sort((a, b) => a.localeCompare(b, 'pt-BR'));
      selModelo.innerHTML = '<option value="">Todos os modelos</option>' + modelos.map(x => `<option value="${DC.slug(x)}">${DC.esc(x)}</option>`).join('');
    };
    selMarca.addEventListener('change', atualizarModelos);
    atualizarModelos();
  }
  const formBusca = $('#form-busca');
  if (formBusca) formBusca.addEventListener('submit', e => {
    e.preventDefault();
    const q = new URLSearchParams();
    if (selMarca.value) q.set('marca', selMarca.value);
    if (selModelo.value) q.set('modelo', selModelo.value);
    if (selPreco.value) q.set('preco_max', selPreco.value);
    location.href = 'estoque.html' + (q.toString() ? '?' + q : '');
  });
  const formVender = $('#form-vender-rapido');
  if (formVender) formVender.addEventListener('submit', e => {
    e.preventDefault();
    const q = new URLSearchParams(new FormData(formVender));
    location.href = 'venda-seu-carro.html?' + q;
  });

  /* ----- Marcas com contagem ----- */
  const chips = $('#marcas');
  if (chips && veiculos.length) {
    const cont = {};
    veiculos.forEach(v => { cont[v.marca] = (cont[v.marca] || 0) + 1; });
    chips.innerHTML = marcas.map(m => `<a class="chip" href="estoque.html?marca=${DC.slug(m)}">${DC.esc(m)} <small>${cont[m]}</small></a>`).join('');
  }

  /* ----- Novidades ----- */
  const grade = $('#novidades');
  if (grade) {
    const lista = [...veiculos].sort((a, b) => String(b.criado_em).localeCompare(String(a.criado_em))).slice(0, 8);
    grade.innerHTML = lista.length
      ? lista.map((v, i) => DC.card(v, i)).join('')
      : '<div class="empty"><h3>Estoque sendo atualizado</h3><p>Fale comigo no WhatsApp e eu te mostro as opções disponíveis agora.</p></div>';
    DC.revelar(grade);
    const total = $('#total-estoque'); if (total) total.textContent = veiculos.length;
    if (lista.length) DC.jsonld({
      '@context': 'https://schema.org', '@type': 'ItemList', name: 'Últimos veículos no estoque',
      itemListElement: lista.map((v, i) => ({ '@type': 'ListItem', position: i + 1, url: DC.urlBase() + DC.linkVeiculo(v), name: DC.fmt.completo(v) }))
    }, 'ld-novidades');
  }

  /* ----- Banners (carrossel) ----- */
  const promo = $('#promo');
  if (promo) {
    let banners = [];
    try { banners = await api.listarBanners(); } catch (e) { banners = []; }
    if (!banners.length) { promo.closest('section').hidden = true; }
    else {
      const track = promo.querySelector('.promo-track');
      track.innerHTML = banners.map((b, i) => b.imagem
        ? `<a class="promo-slide has-image" href="${DC.esc(b.link || '#')}" aria-label="${DC.esc(b.titulo || 'Banner')}"><img src="${DC.esc(b.imagem)}" alt="${DC.esc(b.titulo || '')}" loading="lazy"></a>`
        : `<div class="promo-slide" role="group" aria-roledescription="slide" aria-label="${i + 1} de ${banners.length}">
            <div class="promo-copy"><p class="eyebrow">Consultoria</p><h3>${DC.esc(b.titulo)}</h3><p>${DC.esc(b.texto || '')}</p>
            ${b.botao ? `<a class="btn btn--primary" href="${DC.esc(b.link || '#')}">${DC.esc(b.botao)}${DC.icon.seta}</a>` : ''}</div>
            <div class="promo-art"><img src="${DC.desenhoCarro({ ...(b.arte || {}), fundo: false })}" alt="" width="800" height="600" loading="lazy"></div>
          </div>`).join('');
      const dots = promo.querySelector('.promo-dots');
      if (banners.length > 1) {
        dots.innerHTML = banners.map((_, i) => `<button type="button" aria-label="Ir para o banner ${i + 1}"${i === 0 ? ' aria-current="true"' : ''}></button>`).join('');
        const ir = i => track.scrollTo({ left: i * track.clientWidth, behavior: 'smooth' });
        dots.querySelectorAll('button').forEach((b, i) => b.addEventListener('click', () => { ir(i); reiniciar(); }));
        track.addEventListener('scroll', () => {
          const i = Math.round(track.scrollLeft / track.clientWidth);
          dots.querySelectorAll('button').forEach((b, j) => b.toggleAttribute('aria-current', i === j));
        }, { passive: true });
        let timer;
        const reiniciar = () => {
          clearInterval(timer);
          if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
          timer = setInterval(() => { const i = Math.round(track.scrollLeft / track.clientWidth); ir((i + 1) % banners.length); }, 6500);
        };
        promo.addEventListener('pointerenter', () => clearInterval(timer));
        promo.addEventListener('pointerleave', reiniciar);
        reiniciar();
      }
    }
  }

  /* ----- Encomenda (eu encontro o carro pra você) ----- */
  DC.formulario($('#form-encomenda'), {
    tipo: 'encomenda',
    mensagem: d => [
      'Olá, David! Quero ajuda para encontrar um carro.',
      `*Carro desejado:* ${d.modelo}`,
      d.ano ? `*Ano a partir de:* ${d.ano}` : '',
      d.faixa ? `*Quanto quero investir:* ${d.faixa}` : '',
      d.pagamento ? `*Pagamento:* ${d.pagamento}` : '',
      `*Nome:* ${d.nome}`,
      `*WhatsApp:* ${d.telefone}`
    ].filter(Boolean).join('\n')
  });
})();
