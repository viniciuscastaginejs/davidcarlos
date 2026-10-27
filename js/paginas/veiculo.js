/* Detalhe do veículo: galeria com arrastar, tela cheia, ficha, SEO e barra de compra no celular */
(async function () {
  const { DC } = window;
  const $ = s => document.querySelector(s);
  const p = DC.params();
  const id = p.get('id') || location.hash.replace('#', '');
  const alvo = $('#veiculo');

  let v = null;
  try { v = await window.DC_API.buscarVeiculo(id); } catch (e) { v = null; }

  if (!v) {
    alvo.innerHTML = `<div class="empty" style="margin-top:24px">
      <h1 style="font-size:1.6rem">Este veículo não está mais disponível</h1>
      <p>Ele pode ter sido vendido. Veja o estoque atualizado ou me chame que eu encontro um parecido.</p>
      <div class="hero-cta" style="justify-content:center"><a class="btn btn--primary" href="estoque.html">Ver estoque</a>
      <a class="btn btn--wa" target="_blank" rel="noopener" href="${DC.linkWhats('Olá, David! Vi um carro no site que não está mais disponível. Tem algum parecido?')}">${DC.icon.whatsapp}Falar com o David</a></div></div>`;
    const robots = document.createElement('meta'); robots.name = 'robots'; robots.content = 'noindex'; document.head.appendChild(robots);
    return;
  }

  const nome = DC.fmt.nome(v);
  const fotos = DC.fotos(v);
  const ilustrativa = !(v.fotos && v.fotos.length);
  const vendido = v.status === 'vendido', reservado = v.status === 'reservado';
  const msgInteresse = `Olá, David! Tenho interesse no ${DC.fmt.completo(v)} (${DC.fmt.preco(v.preco)}) que vi no site.\n${location.href}`;
  const msgVisita = `Olá, David! Quero agendar para ver o ${DC.fmt.completo(v)}. Qual o melhor dia e horário?`;
  const msgTroca = `Olá, David! Tenho interesse no ${DC.fmt.completo(v)} e quero dar meu carro na troca. Meu carro é: `;

  const confiancas = [
    v.laudo_cautelar && 'Laudo cautelar aprovado',
    v.unico_dono && 'Único dono',
    v.revisado && 'Revisões em dia',
    v.ipva_pago && 'IPVA pago'
  ].filter(Boolean);

  const ficha = [
    ['Marca', v.marca], ['Modelo', v.modelo], ['Ano', DC.fmt.ano(v)], ['Quilometragem', DC.fmt.km(v.km)],
    ['Câmbio', v.cambio], ['Combustível', v.combustivel], ['Cor', v.cor], ['Carroceria', v.carroceria],
    ['Portas', v.portas], ['Final da placa', v.final_placa ?? '']
  ].filter(([, x]) => x !== '' && x !== undefined && x !== null);

  document.querySelector('.crumbs-atual').textContent = nome;

  alvo.innerHTML = `
  <div class="vd-top">
    <div class="gallery" aria-roledescription="galeria" aria-label="Fotos do ${DC.esc(nome)}">
      <div class="g-main">
        <div class="g-track" tabindex="0">
          ${fotos.map((f, i) => `<button class="g-slide" type="button" data-i="${i}" aria-label="Ampliar foto ${i + 1}"><img src="${f}" alt="${DC.esc(`${DC.fmt.completo(v)} ${v.cor} foto ${i + 1}${ilustrativa ? ' (ilustração)' : ''}`)}" width="800" height="600" ${i ? 'loading="lazy"' : 'fetchpriority="high"'} decoding="async"></button>`).join('')}
        </div>
        <button class="g-arrow g-prev" type="button" aria-label="Foto anterior">${DC.icon.chevEsq}</button>
        <button class="g-arrow g-next" type="button" aria-label="Próxima foto">${DC.icon.chevDir}</button>
        <div class="car-badges">${reservado ? '<span class="badge badge--warn">Reservado</span>' : vendido ? '<span class="badge badge--sold">Vendido</span>' : v.destaque ? '<span class="badge badge--accent">Destaque</span>' : ''}</div>
        <span class="badge g-count">${DC.icon.camera}<span id="g-n">1</span>/${fotos.length}</span>
      </div>
      <div class="g-thumbs" role="tablist" aria-label="Miniaturas">
        ${fotos.map((f, i) => `<button type="button" data-i="${i}" ${i === 0 ? 'aria-current="true"' : ''} aria-label="Foto ${i + 1}"><img src="${f}" alt="" width="96" height="72" loading="lazy"></button>`).join('')}
      </div>
    </div>

    <aside class="vd-panel" aria-label="Preço e contato">
      <div>
        <p class="label">${DC.esc(v.marca)}</p>
        <h1>${DC.esc(v.modelo)} ${DC.esc(String(v.ano_modelo))}</h1>
      </div>
      <p class="vd-version">${DC.esc(v.versao)}</p>
      <div class="vd-quick">
        <div><span class="label">Ano</span><strong>${DC.fmt.ano(v)}</strong></div>
        <div><span class="label">Km</span><strong>${DC.fmt.km(v.km).replace(' km', '')}</strong></div>
        <div><span class="label">Câmbio</span><strong>${DC.esc(v.cambio)}</strong></div>
      </div>
      <div class="vd-price">
        ${v.preco_anterior && v.preco_anterior > v.preco ? `<span class="price-old">De ${DC.fmt.preco(v.preco_anterior)}</span>` : ''}
        <p class="price">${vendido ? 'Vendido' : DC.fmt.preco(v.preco)}</p>
      </div>
      <div class="vd-actions">
        <a class="btn btn--wa btn--lg btn--block" data-acao="interesse" href="${DC.linkWhats(msgInteresse)}" target="_blank" rel="noopener">${DC.icon.whatsapp}Tenho interesse</a>
        <a class="btn btn--primary btn--block" href="financiamento.html?id=${encodeURIComponent(v.id)}">${DC.icon.carteira}Simular financiamento</a>
        <div class="vd-actions-row">
          <a class="btn btn--ghost btn--block" href="${DC.linkWhats(msgVisita)}" target="_blank" rel="noopener">${DC.icon.calendario}Agendar visita</a>
          <a class="btn btn--ghost btn--block" href="${DC.linkWhats(msgTroca)}" target="_blank" rel="noopener">${DC.icon.aperto}Dar meu carro na troca</a>
        </div>
        <button class="btn btn--ghost btn--sm" type="button" id="compartilhar" style="justify-self:start">${DC.icon.compartilhar}Compartilhar</button>
      </div>
      ${confiancas.length ? `<ul class="vd-trust">${confiancas.map(c => `<li>${DC.icon.checkCirculo}${c}</li>`).join('')}</ul>` : ''}
    </aside>
  </div>

  <div class="vd-body">
    <div>
      <section class="vd-section" aria-labelledby="t-ficha">
        <h2 id="t-ficha">Ficha técnica</h2>
        <div class="spec-grid">${ficha.map(([k, x]) => `<div><span class="label">${k}</span><strong>${DC.esc(String(x))}</strong></div>`).join('')}</div>
      </section>
      ${v.opcionais.length ? `<section class="vd-section" aria-labelledby="t-opc"><h2 id="t-opc">Itens e opcionais</h2>
        <ul class="feature-list">${v.opcionais.map(o => `<li>${DC.icon.check}${DC.esc(o)}</li>`).join('')}</ul></section>` : ''}
      ${v.descricao ? `<section class="vd-section" aria-labelledby="t-desc"><h2 id="t-desc">Sobre este carro</h2><p class="vd-desc">${DC.esc(v.descricao)}</p></section>` : ''}
    </div>
    <div>
      <section class="panel" aria-labelledby="t-como">
        <h3 id="t-como">Comprando comigo</h3>
        <ul class="check-list">
          <li>${DC.icon.escudo}<span>Procedência verificada e vistoria cautelar antes da entrega.</span></li>
          <li>${DC.icon.carteira}<span>Financiamento com as principais financeiras do mercado.</span></li>
          <li>${DC.icon.aperto}<span>Seu usado entra na troca com avaliação justa.</span></li>
          <li>${DC.icon.documento}<span>Eu cuido da documentação e da transferência.</span></li>
        </ul>
      </section>
    </div>
  </div>

  <section class="section" aria-labelledby="t-similares" id="similares-sec" style="padding-bottom:0">
    <div class="section-head"><div><p class="eyebrow">Você também pode gostar</p><h2 id="t-similares">Carros parecidos</h2></div>
    <a class="link-arrow" href="estoque.html">Ver todo o estoque${DC.icon.seta}</a></div>
    <div class="car-grid" id="similares"></div>
  </section>`;

  /* barra fixa de compra (celular) */
  const barra = document.createElement('div');
  barra.className = 'buy-bar';
  barra.innerHTML = `<div><p class="label" style="font-size:.75rem">${DC.esc(nome)} ${v.ano_modelo}</p><p class="price">${vendido ? 'Vendido' : DC.fmt.preco(v.preco)}</p></div>
    <a class="btn btn--wa" href="${DC.linkWhats(msgInteresse)}" target="_blank" rel="noopener">${DC.icon.whatsapp}Tenho interesse</a>`;
  document.body.appendChild(barra);
  const painelAcoes = $('.vd-actions');
  new IntersectionObserver(([en]) => barra.classList.toggle('show', !en.isIntersecting && en.boundingClientRect.top < 0)).observe(painelAcoes);

  /* ----- Galeria ----- */
  const track = $('.g-track'), thumbs = [...document.querySelectorAll('.g-thumbs button')], contador = $('#g-n');
  let atual = 0;
  const ir = (i, suave = true) => {
    atual = (i + fotos.length) % fotos.length;
    track.scrollTo({ left: atual * track.clientWidth, behavior: suave ? 'smooth' : 'auto' });
  };
  track.addEventListener('scroll', () => {
    const i = Math.round(track.scrollLeft / track.clientWidth);
    if (i === atual && contador.textContent == i + 1) return;
    atual = i; contador.textContent = i + 1;
    thumbs.forEach((t, j) => t.toggleAttribute('aria-current', j === i));
    const th = thumbs[i]; if (th) th.parentElement.scrollTo({ left: th.offsetLeft - th.parentElement.clientWidth / 2 + th.clientWidth / 2, behavior: 'smooth' });
  }, { passive: true });
  thumbs.forEach(t => t.addEventListener('click', () => ir(+t.dataset.i)));
  $('.g-prev').addEventListener('click', () => ir(atual - 1));
  $('.g-next').addEventListener('click', () => ir(atual + 1));
  track.addEventListener('keydown', e => { if (e.key === 'ArrowRight') { e.preventDefault(); ir(atual + 1); } if (e.key === 'ArrowLeft') { e.preventDefault(); ir(atual - 1); } });

  /* ----- Tela cheia ----- */
  track.addEventListener('click', e => { const s = e.target.closest('.g-slide'); if (s) abrirLightbox(+s.dataset.i); });
  function abrirLightbox(i) {
    let k = i;
    const lb = document.createElement('div');
    lb.className = 'lightbox'; lb.setAttribute('role', 'dialog'); lb.setAttribute('aria-modal', 'true'); lb.setAttribute('aria-label', 'Fotos em tela cheia');
    lb.innerHTML = `<div class="lb-head"><span class="num" id="lb-n"></span><button class="icon-btn" type="button" data-fechar aria-label="Fechar">${DC.icon.fechar}</button></div>
      <div class="lb-stage"><img alt=""><button class="g-arrow g-prev" type="button" aria-label="Anterior">${DC.icon.chevEsq}</button><button class="g-arrow g-next" type="button" aria-label="Próxima">${DC.icon.chevDir}</button></div><div></div>`;
    const img = lb.querySelector('img'), n = lb.querySelector('#lb-n');
    const mostrar = () => { k = (k + fotos.length) % fotos.length; img.src = fotos[k]; img.alt = `${nome} foto ${k + 1}`; n.textContent = `${k + 1} / ${fotos.length}`; };
    const fechar = () => { lb.remove(); document.documentElement.style.overflow = ''; document.removeEventListener('keydown', tecla); ir(k, false); };
    const tecla = e => { if (e.key === 'Escape') fechar(); if (e.key === 'ArrowRight') { k++; mostrar(); } if (e.key === 'ArrowLeft') { k--; mostrar(); } };
    lb.querySelector('[data-fechar]').addEventListener('click', fechar);
    lb.querySelector('.g-prev').addEventListener('click', () => { k--; mostrar(); });
    lb.querySelector('.g-next').addEventListener('click', () => { k++; mostrar(); });
    let x0 = null;
    lb.addEventListener('touchstart', e => { x0 = e.touches[0].clientX; }, { passive: true });
    lb.addEventListener('touchend', e => { if (x0 === null) return; const dx = e.changedTouches[0].clientX - x0; if (Math.abs(dx) > 40) { k += dx < 0 ? 1 : -1; mostrar(); } x0 = null; });
    document.addEventListener('keydown', tecla);
    document.body.appendChild(lb); document.documentElement.style.overflow = 'hidden';
    mostrar(); lb.querySelector('[data-fechar]').focus();
  }

  /* ----- Compartilhar ----- */
  $('#compartilhar').addEventListener('click', async () => {
    const dados = { title: `${nome} ${v.ano_modelo}`, text: `${DC.fmt.completo(v)} por ${DC.fmt.preco(v.preco)}`, url: location.href };
    try { if (navigator.share) { await navigator.share(dados); return; } } catch (e) { if (e && e.name === 'AbortError') return; }
    try { await navigator.clipboard.writeText(location.href); DC.toast('Link copiado'); }
    catch (e) { DC.toast('Copie o link na barra do navegador'); }
  });

  /* ----- Similares ----- */
  try {
    const todos = await window.DC_API.listarVeiculos();
    const sim = todos.filter(x => x.id !== v.id)
      .map(x => ({ x, s: (x.carroceria === v.carroceria ? 3 : 0) + (x.marca === v.marca ? 2 : 0) - Math.abs(x.preco - v.preco) / 20000 }))
      .sort((a, b) => b.s - a.s).slice(0, 4).map(o => o.x);
    if (sim.length) { $('#similares').innerHTML = sim.map((x, i) => DC.card(x, 3 + i)).join(''); DC.revelar($('#similares')); }
    else $('#similares-sec').hidden = true;
  } catch (e) { $('#similares-sec').hidden = true; }

  /* ----- SEO deste veículo ----- */
  const url = DC.urlBase() + DC.linkVeiculo(v);
  const titulo = `${DC.fmt.nome(v)} ${String(v.versao).split(' ')[0]} ${v.ano_modelo} à venda | ${DC.cfg.nome}`;
  let descricao = `${DC.fmt.completo(v)}, ${DC.fmt.km(v.km)}, ${v.cambio.toLowerCase()}, por ${DC.fmt.preco(v.preco)}. ${confiancas.slice(0, 2).join(', ')}.`;
  if (descricao.length > 160) descricao = `${DC.fmt.nome(v)} ${DC.fmt.ano(v)}, ${DC.fmt.km(v.km)}, ${v.cambio.toLowerCase()}, por ${DC.fmt.preco(v.preco)}. Fale com o David.`;
  const imagemReal = v.fotos && v.fotos[0];
  DC.meta({ titulo, descricao, imagem: imagemReal, url });
  const disponibilidade = vendido ? 'https://schema.org/SoldOut' : reservado ? 'https://schema.org/LimitedAvailability' : 'https://schema.org/InStock';
  DC.jsonld({
    '@context': 'https://schema.org',
    '@type': 'Car',
    name: `${DC.fmt.nome(v)} ${v.versao}`,
    brand: { '@type': 'Brand', name: v.marca },
    model: v.modelo,
    vehicleConfiguration: v.versao,
    productionDate: String(v.ano_fabricacao),
    vehicleModelDate: String(v.ano_modelo),
    mileageFromOdometer: { '@type': 'QuantitativeValue', value: v.km, unitCode: 'KMT' },
    vehicleTransmission: v.cambio,
    fuelType: v.combustivel,
    color: v.cor,
    bodyType: v.carroceria,
    numberOfDoors: v.portas || undefined,
    itemCondition: 'https://schema.org/UsedCondition',
    description: v.descricao || descricao,
    image: imagemReal ? v.fotos : [DC.urlBase() + 'assets/og-image.jpg'],
    url,
    offers: {
      '@type': 'Offer', price: v.preco, priceCurrency: 'BRL', availability: disponibilidade, url,
      seller: { '@type': 'AutomotiveBusiness', name: `${DC.cfg.nome} ${DC.cfg.titulo}` }
    }
  }, 'ld-veiculo');
  DC.jsonld({
    '@context': 'https://schema.org', '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Início', item: DC.urlBase() + 'index.html' },
      { '@type': 'ListItem', position: 2, name: 'Estoque', item: DC.urlBase() + 'estoque.html' },
      { '@type': 'ListItem', position: 3, name: nome, item: url }
    ]
  }, 'ld-trilha');
})();
