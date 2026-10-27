/* =========================================================================
   David Carlos — núcleo do site
   ========================================================================= */
(function () {
  const cfg = window.DC_CONFIG || {};
  const root = document.documentElement;
  const reduzMovimento = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const DC = (window.DC = window.DC || {});
  DC.cfg = cfg;

  /* ---------- Ícones (traço 2px) ---------- */
  const P = (d, extra = '') => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" ${extra}>${d}</svg>`;
  DC.icon = {
    whatsapp: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.9 9.9 0 0 0 4.74 1.21h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Zm.01 18.15h-.01a8.23 8.23 0 0 1-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.2 8.2 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.25-8.24 2.2 0 4.27.86 5.83 2.42a8.18 8.18 0 0 1 2.41 5.83c0 4.54-3.7 8.23-8.24 8.23Zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.13-.16.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.13-.15.17-.25.25-.42.08-.16.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.43.06-.66.31-.22.25-.86.85-.86 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.14-1.18-.06-.1-.22-.16-.47-.28Z"/></svg>',
    seta: P('<path d="M5 12h14M13 6l6 6-6 6"/>'),
    setaEsq: P('<path d="M19 12H5M11 18l-6-6 6-6"/>'),
    chevDir: P('<path d="m9 6 6 6-6 6"/>'),
    chevEsq: P('<path d="m15 6-6 6 6 6"/>'),
    menu: P('<path d="M4 7h16M4 12h16M4 17h10"/>'),
    fechar: P('<path d="M6 6l12 12M18 6 6 18"/>'),
    busca: P('<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>'),
    filtro: P('<path d="M4 6h16M7 12h10M10 18h4"/>'),
    calendario: P('<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/>'),
    km: P('<path d="M12 14l4-4"/><path d="M3.3 17a9 9 0 1 1 17.4 0"/><circle cx="12" cy="14" r="1.5"/>'),
    cambio: P('<circle cx="6" cy="6" r="2"/><circle cx="12" cy="6" r="2"/><circle cx="18" cy="6" r="2"/><circle cx="6" cy="18" r="2"/><circle cx="12" cy="18" r="2"/><path d="M6 8v8M12 8v8M18 8v4H6"/>'),
    combustivel: P('<path d="M4 21V5a2 2 0 0 1 2-2h7a2 2 0 0 1 2 2v16M3 21h13M15 10h2a2 2 0 0 1 2 2v4a1.5 1.5 0 0 0 3 0V8l-3-3M7 8h5"/>'),
    check: P('<path d="M20 6 9 17l-5-5"/>'),
    checkCirculo: P('<circle cx="12" cy="12" r="9"/><path d="m8 12 3 3 5-6"/>'),
    escudo: P('<path d="M12 3 4 6v6c0 4.5 3.4 8.2 8 9 4.6-.8 8-4.5 8-9V6l-8-3Z"/><path d="m9 12 2 2 4-4"/>'),
    pin: P('<path d="M12 21s-7-6.2-7-11a7 7 0 0 1 14 0c0 4.8-7 11-7 11Z"/><circle cx="12" cy="10" r="2.5"/>'),
    relogio: P('<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>'),
    instagram: P('<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r=".8" fill="currentColor"/>'),
    facebook: P('<path d="M15 3h-2.5A4.5 4.5 0 0 0 8 7.5V10H5v4h3v7h4v-7h3l1-4h-4V7.5a.5.5 0 0 1 .5-.5H15V3Z"/>'),
    email: P('<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>'),
    telefone: P('<path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z"/>'),
    compartilhar: P('<circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="m8.6 13.5 6.8 4M15.4 6.5l-6.8 4"/>'),
    camera: P('<path d="M4 8h3l2-3h6l2 3h3a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1Z"/><circle cx="12" cy="13" r="3.5"/>'),
    carro: P('<path d="M5 17H3v-5l2-5h11l3 5h2v5h-2"/><circle cx="7.5" cy="17" r="2"/><circle cx="16.5" cy="17" r="2"/><path d="M9.5 17h5M5 12h14"/>'),
    chave: P('<circle cx="8" cy="15" r="4"/><path d="m10.8 12.2 9.2-9.2M17 6l3 3M14 9l2 2"/>'),
    carteira: P('<path d="M19 7V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a1 1 0 0 0 1-1v-4"/><path d="M21 11h-5a2 2 0 0 0 0 4h5v-4Z"/>'),
    aperto: P('<path d="m11 17 2 2a1 1 0 0 0 1.4 0l5.6-5.6a2 2 0 0 0 0-2.8L16 6.6a2 2 0 0 0-2.8 0L11 8.8"/><path d="m13 11-2.5-2.5a2 2 0 0 0-2.8 0L4 12.2a2 2 0 0 0 0 2.8l4 4a1 1 0 0 0 1.4 0l2-2"/>'),
    lupa: P('<circle cx="10" cy="10" r="6"/><path d="m20 20-5.6-5.6M8 10h4M10 8v4"/>'),
    documento: P('<path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9l-6-6Z"/><path d="M14 3v6h6M8 13h8M8 17h5"/>'),
    estrela: P('<path d="m12 3 2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9L12 3Z"/>')
  };

  /* ---------- Formatação ---------- */
  const brl = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 });
  const num = new Intl.NumberFormat('pt-BR');
  DC.fmt = {
    preco: v => (v ? brl.format(v) : 'Consulte'),
    km: v => (v === 0 ? '0 km' : num.format(v) + ' km'),
    ano: v => `${v.ano_fabricacao}/${v.ano_modelo}`,
    nome: v => `${v.marca} ${v.modelo}`,
    completo: v => `${v.marca} ${v.modelo} ${v.versao} ${v.ano_fabricacao}/${v.ano_modelo}`
  };
  DC.esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  DC.slug = s => String(s || '').normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  DC.params = () => new URLSearchParams(location.search);
  DC.linkVeiculo = v => 'veiculo.html?id=' + encodeURIComponent(v.id);

  /* ---------- Ilustração do carro (quando ainda não há foto) ---------- */
  const tintas = {
    branco: '#e9ecf1', preto: '#1a1d24', prata: '#b7bdc7', cinza: '#666d7a', grafite: '#4a505b', vermelho: '#b81f2c',
    azul: '#2152c9', verde: '#2f6b48', bege: '#cbb593', marrom: '#5d402d', amarelo: '#e0b21c', laranja: '#d8661f', vinho: '#5e1824', dourado: '#b89a5a'
  };
  function mix(hex, alvo, t) {
    const a = parseInt(hex.slice(1), 16), b = parseInt(alvo.slice(1), 16);
    const r = Math.round(((a >> 16) & 255) * (1 - t) + ((b >> 16) & 255) * t);
    const g = Math.round(((a >> 8) & 255) * (1 - t) + ((b >> 8) & 255) * t);
    const bl = Math.round((a & 255) * (1 - t) + (b & 255) * t);
    return '#' + ((1 << 24) | (r << 16) | (g << 8) | bl).toString(16).slice(1);
  }
  const formas = {
    sedan: {
      corpo: 'M22 140L22 126Q22 116 34 113L70 106Q110 100 142 97Q168 78 196 70Q240 64 266 70Q300 80 322 96L360 100Q378 102 380 114L380 140Q380 146 372 146L329 146A29 29 0 0 0 271 146L121 146A29 29 0 0 0 63 146L30 146Q22 146 22 140Z',
      vidro: 'M150 98Q172 80 198 74Q230 69 258 73Q284 80 304 96Z', colunas: [[224, 6]],
      rodas: [[92, 146, 24], [300, 146, 24]], farol: 'M24 117Q30 112 48 110L46 118Q34 121 25 123Z', lanterna: 'M368 103Q378 104 380 112L380 118L367 113Z',
      portas: [150, 228], linha: 'M60 113Q200 101 362 106', espelho: [150, 99]
    },
    hatch: {
      corpo: 'M34 140L34 126Q34 116 46 113L80 106Q116 100 146 97Q172 76 200 69Q250 63 300 68Q330 74 350 96Q358 104 360 116L360 140Q360 146 352 146L319 146A29 29 0 0 0 261 146L129 146A29 29 0 0 0 71 146L42 146Q34 146 34 140Z',
      vidro: 'M154 98Q176 78 202 73Q250 67 296 72Q318 78 334 96Z', colunas: [[234, 6]],
      rodas: [[100, 146, 24], [290, 146, 24]], farol: 'M36 117Q42 112 60 110L58 118Q46 121 37 123Z', lanterna: 'M349 97Q358 102 359 110L359 118L351 115Z',
      portas: [154, 236], linha: 'M70 113Q200 101 348 104', espelho: [154, 99]
    },
    suv: {
      corpo: 'M20 140L20 118Q20 106 34 103L74 96Q112 90 140 88Q162 64 188 56Q260 50 340 54Q362 56 372 72L382 100Q384 106 384 116L384 140Q384 146 376 146L336 146A32 32 0 0 0 272 146L128 146A32 32 0 0 0 64 146L28 146Q20 146 20 140Z',
      vidro: 'M148 89Q168 68 192 61Q262 56 336 59Q352 60 360 72L368 88Z', colunas: [[232, 6], [300, 6]],
      rodas: [[96, 146, 27], [304, 146, 27]], farol: 'M22 108Q28 102 50 99L48 108Q34 111 23 113Z', lanterna: 'M374 76Q380 82 382 96L382 104L376 102Z',
      portas: [148, 236], linha: 'M60 101Q220 89 372 85', espelho: [148, 90], rack: 'M196 53L338 51', saia: true
    },
    picape: {
      corpo: 'M16 140L16 116Q16 104 30 101L70 94Q108 88 134 86Q156 62 182 56Q214 52 246 54Q258 56 262 66L266 96L382 96Q386 96 386 102L386 140Q386 146 378 146L338 146A32 32 0 0 0 274 146L124 146A32 32 0 0 0 60 146L24 146Q16 146 16 140Z',
      vidro: 'M142 87Q162 66 186 60Q216 57 244 59Q252 61 254 70L256 88Z', colunas: [[202, 6]],
      rodas: [[92, 146, 27], [306, 146, 27]], farol: 'M18 106Q24 100 46 97L44 106Q30 109 19 111Z', lanterna: 'M379 100L385 100L385 116L379 116Z',
      portas: [142, 206], linha: 'M50 99Q160 91 262 91', espelho: [142, 88], cacamba: true, saia: true
    }
  };
  function tipoForma(carroceria) {
    const c = DC.slug(carroceria);
    if (c.startsWith('suv') || c.includes('utilitario') || c.includes('crossover')) return 'suv';
    if (c.startsWith('picape') || c.includes('pick')) return 'picape';
    if (c.startsWith('hatch')) return 'hatch';
    return 'sedan';
  }
  DC.desenhoCarro = function (o = {}) {
    const f = formas[tipoForma(o.carroceria)];
    const base = tintas[DC.slug(o.cor).split('-')[0]] || '#7d8594';
    const claro = mix(base, '#ffffff', 0.38), escuro = mix(base, '#000000', 0.55);
    const ehClaro = ['branco', 'prata', 'bege', 'amarelo', 'dourado'].includes(DC.slug(o.cor).split('-')[0]);
    const variante = (o.variante || 0) % 4;
    const fundo = o.fundo !== false;
    const fundos = [
      ['#1d2849', '#0a0f1d', '#141c33', '#070b16'],
      ['#13204a', '#060a16', '#0f1838', '#050812'],
      ['#2a3150', '#11162a', '#1a2038', '#0b0f1d'],
      ['#1a2340', '#090d1a', '#121a31', '#060a14']
    ][variante];
    let s = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" width="800" height="600"><defs>
<radialGradient id="spot" cx="50%" cy="18%" r="75%"><stop offset="0" stop-color="${fundos[0]}"/><stop offset="1" stop-color="${fundos[1]}"/></radialGradient>
<linearGradient id="piso" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${fundos[2]}"/><stop offset="1" stop-color="${fundos[3]}"/></linearGradient>
<linearGradient id="lata" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${claro}"/><stop offset=".45" stop-color="${base}"/><stop offset="1" stop-color="${escuro}"/></linearGradient>
<linearGradient id="vidro" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#2b3a5e"/><stop offset=".55" stop-color="#0d1426"/><stop offset="1" stop-color="#1a2440"/></linearGradient>
<radialGradient id="aro" cx="40%" cy="35%" r="70%"><stop offset="0" stop-color="#e3e8ef"/><stop offset="1" stop-color="#7c8592"/></radialGradient>
<clipPath id="cv"><path d="${f.vidro}"/></clipPath>
<filter id="blur" x="-20%" y="-200%" width="140%" height="500%"><feGaussianBlur stdDeviation="5"/></filter>
<filter id="blur2" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="18"/></filter>
</defs>`;
    if (fundo) {
      s += `<rect width="400" height="300" fill="url(#spot)"/><rect y="214" width="400" height="86" fill="url(#piso)"/><path d="M0 214H400" stroke="#ffffff" stroke-opacity=".06"/>`;
      if (variante === 1 || variante === 3) s += `<ellipse cx="200" cy="222" rx="170" ry="40" fill="#003af2" opacity=".35" filter="url(#blur2)"/>`;
      if (variante === 3) s += `<path d="M-20 60L420 10M-20 90L420 40" stroke="#5d86ff" stroke-opacity=".12" stroke-width="10"/>`;
      if (variante === 2) s += `<ellipse cx="200" cy="40" rx="150" ry="30" fill="#ffffff" opacity=".06" filter="url(#blur2)"/>`;
    } else {
      s += `<ellipse cx="200" cy="205" rx="175" ry="32" fill="#003af2" opacity=".55" filter="url(#blur2)"/>`;
    }
    s += `<g transform="translate(-4 56) scale(1.02)">`;
    s += `<ellipse cx="202" cy="171" rx="182" ry="8" fill="#000" opacity=".65" filter="url(#blur)"/>`;
    s += `<path d="${f.corpo}" fill="url(#lata)"/>`;
    if (f.saia) s += `<path d="M18 131H386V140Q386 146 378 146H338A32 32 0 0 0 274 146H124A32 32 0 0 0 60 146H24Q18 146 18 140Z" fill="#14171d" opacity=".8" transform="translate(0 0)"/>`;
    if (f.cacamba) s += `<path d="M266 101H385" stroke="${escuro}" stroke-width="2"/><path d="M266 96H384" stroke="${claro}" stroke-opacity=".6" stroke-width="1.5"/>`;
    s += `<path d="${f.vidro}" fill="url(#vidro)"/>`;
    s += `<path d="${f.vidro}" fill="none" stroke="#ffffff" stroke-opacity=".08"/>`;
    f.colunas.forEach(([x, w]) => { s += `<rect x="${x}" y="40" width="${w}" height="60" fill="${mix(base, '#000000', 0.25)}" clip-path="url(#cv)"/>`; });
    s += `<path d="${f.vidro}" fill="none" stroke="${mix(base, '#000000', 0.2)}" stroke-width="3"/>`;
    if (f.rack) s += `<path d="${f.rack}" stroke="#0e1015" stroke-width="3.5" stroke-linecap="round"/>`;
    s += `<path d="${f.linha}" fill="none" stroke="#ffffff" stroke-opacity="${ehClaro ? 0.55 : 0.28}" stroke-width="1.6"/>`;
    f.portas.forEach(x => { s += `<path d="M${x} ${f.espelho[1] + 2}L${x + 1} 140" stroke="${escuro}" stroke-opacity=".55" stroke-width="1.2"/>`; });
    s += `<path d="M${f.espelho[0]} ${f.espelho[1]}l11-4 4 7-13 2Z" fill="${mix(base, '#000000', 0.3)}"/>`;
    s += `<path d="${f.farol}" fill="#eaf1ff"/><path d="${f.farol}" fill="#9fc0ff" opacity=".4" filter="url(#blur)"/>`;
    s += `<path d="${f.lanterna}" fill="#d3172a"/>`;
    f.rodas.forEach(([cx, cy, r]) => {
      s += `<circle cx="${cx}" cy="${cy}" r="${r}" fill="#0b0c10"/><circle cx="${cx}" cy="${cy}" r="${r * 0.66}" fill="#2a2f39"/>`;
      for (let i = 0; i < 5; i++) s += `<rect x="${cx - 2}" y="${cy - r * 0.63}" width="4" height="${r * 0.5}" rx="2" fill="url(#aro)" transform="rotate(${i * 72} ${cx} ${cy})"/>`;
      s += `<circle cx="${cx}" cy="${cy}" r="${r * 0.66}" fill="none" stroke="#c2c9d3" stroke-width="2"/><circle cx="${cx}" cy="${cy}" r="${r * 0.16}" fill="#c9d0d9"/>`;
    });
    s += `</g>`;
    if (fundo && o.legenda !== false) s += `<text x="12" y="290" text-anchor="start" font-family="Arial, Helvetica, sans-serif" font-size="9" letter-spacing="1.6" fill="#7f8aa8">FOTO ILUSTRATIVA</text>`;
    s += `</svg>`;
    return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(s);
  };
  DC.fotos = function (v) {
    if (v.fotos && v.fotos.length) return v.fotos;
    return [0, 1, 2, 3].map(i => DC.desenhoCarro({ carroceria: v.carroceria, cor: v.cor, variante: i }));
  };

  /* ---------- Card de veículo ---------- */
  DC.card = function (v, i = 0) {
    const fotos = DC.fotos(v);
    const temFoto = v.fotos && v.fotos.length;
    const badges = [];
    if (v.status === 'reservado') badges.push('<span class="badge badge--warn">Reservado</span>');
    else if (v.destaque) badges.push('<span class="badge badge--accent">Destaque</span>');
    if (v.preco_anterior && v.preco_anterior > v.preco) badges.push('<span class="badge badge--ok">Baixou o preço</span>');
    const alt = `${DC.fmt.completo(v)} ${v.cor}${temFoto ? '' : ' (ilustração)'}`;
    return `<article class="car-card reveal">
  <div class="car-media">
    <img src="${fotos[0]}" alt="${DC.esc(alt)}" width="800" height="600" ${i > 2 ? 'loading="lazy"' : ''} decoding="async">
    ${badges.length ? `<div class="car-badges">${badges.join('')}</div>` : ''}
    ${temFoto && v.fotos.length > 1 ? `<span class="badge car-photos">${DC.icon.camera}${v.fotos.length}</span>` : ''}
  </div>
  <div class="car-body">
    <div>
      <p class="label">${DC.esc(v.marca)}</p>
      <h3 class="car-title"><a class="stretched" href="${DC.linkVeiculo(v)}">${DC.esc(v.modelo)}</a></h3>
    </div>
    <p class="car-version">${DC.esc(v.versao)}</p>
    <div class="car-specs">
      <span>${DC.icon.calendario}${DC.fmt.ano(v)}</span>
      <span>${DC.icon.km}${DC.fmt.km(v.km)}</span>
      <span>${DC.icon.cambio}${DC.esc(v.cambio)}</span>
    </div>
    <div class="car-foot">
      <p class="price">${v.preco_anterior && v.preco_anterior > v.preco ? `<span class="price-old">${DC.fmt.preco(v.preco_anterior)}</span>` : '<small>Preço</small>'}${DC.fmt.preco(v.preco)}</p>
      <span class="car-go" aria-hidden="true">${DC.icon.seta}</span>
    </div>
  </div>
</article>`;
  };

  /* ---------- WhatsApp ---------- */
  DC.linkWhats = (msg = '') => 'https://wa.me/' + (cfg.whatsapp || '') + (msg ? '?text=' + encodeURIComponent(msg) : '');
  DC.abrirWhats = function (msg) {
    const url = DC.linkWhats(msg);
    let janela = null;
    try { janela = window.open(url, '_blank'); } catch (e) { janela = null; }
    if (janela) { try { janela.opener = null; } catch (e) { /* ok */ } DC.toast('Abrindo o WhatsApp…'); return; }
    // navegador bloqueou a janela: mostra o botão para tocar
    const fundo = document.createElement('div');
    fundo.className = 'sheet-backdrop';
    fundo.innerHTML = `<div class="sheet" role="dialog" aria-modal="true" aria-labelledby="sheet-t">
      <h2 id="sheet-t">Mensagem pronta</h2>
      <p>Toque no botão para abrir a conversa com a mensagem já preenchida.</p>
      <a class="btn btn--wa btn--lg btn--block" href="${url}" target="_blank" rel="noopener">${DC.icon.whatsapp}Abrir WhatsApp</a>
      <button class="btn btn--ghost btn--block" type="button">Fechar</button></div>`;
    const fechar = () => fundo.remove();
    fundo.addEventListener('click', e => { if (e.target === fundo || e.target.closest('button') || e.target.closest('a')) setTimeout(fechar, 50); });
    document.body.appendChild(fundo);
    fundo.querySelector('a').focus();
  };

  /* Formulários que viram mensagem de WhatsApp (e lead no painel, quando existir) */
  DC.formulario = function (form, { tipo, mensagem, antes }) {
    if (!form) return;
    form.addEventListener('submit', e => {
      e.preventDefault();
      if (antes && antes() === false) return;
      if (!form.checkValidity()) { form.reportValidity(); return; }
      const dados = Object.fromEntries(new FormData(form).entries());
      DC.abrirWhats(mensagem(dados));
      if (window.DC_API) window.DC_API.salvarLead(tipo, dados);
    });
    form.querySelectorAll('input[type="tel"]').forEach(DC.mascaraTelefone);
  };
  DC.mascaraTelefone = function (el) {
    el.addEventListener('input', () => {
      const d = el.value.replace(/\D/g, '').slice(0, 11);
      let out = d;
      if (d.length > 2) out = `(${d.slice(0, 2)}) ${d.slice(2)}`;
      if (d.length > 7) out = `(${d.slice(0, 2)}) ${d.slice(2, d.length - 4)}-${d.slice(-4)}`;
      el.value = out;
    });
  };

  /* ---------- Toast ---------- */
  let toastEl, toastT;
  DC.toast = function (txt) {
    if (!toastEl) { toastEl = document.createElement('div'); toastEl.className = 'toast'; toastEl.setAttribute('role', 'status'); document.body.appendChild(toastEl); }
    toastEl.textContent = txt; toastEl.classList.add('show');
    clearTimeout(toastT); toastT = setTimeout(() => toastEl.classList.remove('show'), 2600);
  };

  /* ---------- SEO dinâmico ---------- */
  DC.meta = function ({ titulo, descricao, imagem, url }) {
    if (titulo) { document.title = titulo; setMeta('property', 'og:title', titulo); setMeta('name', 'twitter:title', titulo); }
    if (descricao) { setMeta('name', 'description', descricao); setMeta('property', 'og:description', descricao); setMeta('name', 'twitter:description', descricao); }
    if (imagem && !imagem.startsWith('data:')) { setMeta('property', 'og:image', imagem); setMeta('name', 'twitter:image', imagem); }
    if (url) { setMeta('property', 'og:url', url); const c = document.querySelector('link[rel="canonical"]'); if (c) c.href = url; }
  };
  function setMeta(attr, nome, valor) {
    let m = document.head.querySelector(`meta[${attr}="${nome}"]`);
    if (!m) { m = document.createElement('meta'); m.setAttribute(attr, nome); document.head.appendChild(m); }
    m.setAttribute('content', valor);
  }
  DC.jsonld = function (obj, id) {
    let s = id && document.getElementById(id);
    if (!s) { s = document.createElement('script'); s.type = 'application/ld+json'; if (id) s.id = id; document.head.appendChild(s); }
    s.textContent = JSON.stringify(obj);
  };
  DC.urlBase = () => (document.querySelector('link[rel="canonical"]') || {}).href?.replace(/[^/]*$/, '') || location.href.replace(/[^/]*$/, '');

  /* ---------- Contatos vindos do config.js ---------- */
  function hidratarContatos() {
    document.querySelectorAll('[data-whats]').forEach(a => { a.href = DC.linkWhats(a.dataset.whats || 'Olá, David! Vim pelo site.'); a.target = '_blank'; a.rel = 'noopener'; });
    document.querySelectorAll('[data-tel-texto]').forEach(el => { el.textContent = cfg.telefoneExibicao || ''; });
    document.querySelectorAll('[data-instagram]').forEach(el => {
      if (!cfg.instagram) { (el.closest('li') || el).hidden = true; return; }
      el.href = 'https://www.instagram.com/' + cfg.instagram.replace('@', '') + '/';
      const t = el.querySelector('[data-instagram-texto]'); if (t) t.textContent = '@' + cfg.instagram.replace('@', '');
    });
    document.querySelectorAll('[data-facebook]').forEach(el => { if (!cfg.facebook) { (el.closest('li') || el).hidden = true; return; } el.href = cfg.facebook; });
    document.querySelectorAll('[data-email]').forEach(el => {
      if (!cfg.email) { (el.closest('li') || el).hidden = true; return; }
      el.href = 'mailto:' + cfg.email; const t = el.querySelector('[data-email-texto]') || el; t.textContent = cfg.email;
    });
    document.querySelectorAll('[data-cnpj]').forEach(el => { if (cfg.cnpj) el.textContent = 'CNPJ ' + cfg.cnpj; else el.hidden = true; });
    document.querySelectorAll('[data-demo]').forEach(el => { el.hidden = !cfg.modoDemonstracao; });
  }

  /* ---------- Menu mobile ---------- */
  function menuMobile() {
    const btn = document.querySelector('.burger');
    const menu = document.getElementById('mobile-menu');
    if (!btn || !menu) return;
    const header = document.querySelector('.site-header');
    const alternar = abrir => {
      if (abrir && header) menu.style.paddingTop = Math.round(header.getBoundingClientRect().bottom + 16) + 'px';
      root.classList.toggle('menu-open', abrir);
      btn.setAttribute('aria-expanded', String(abrir));
      btn.innerHTML = abrir ? DC.icon.fechar : DC.icon.menu;
      btn.setAttribute('aria-label', abrir ? 'Fechar menu' : 'Abrir menu');
      menu.toggleAttribute('inert', !abrir);
    };
    menu.setAttribute('inert', '');
    btn.addEventListener('click', () => alternar(!root.classList.contains('menu-open')));
    menu.addEventListener('click', e => { if (e.target.closest('a')) alternar(false); });
    document.addEventListener('keydown', e => { if (e.key === 'Escape' && root.classList.contains('menu-open')) alternar(false); });
  }

  /* ---------- Efeito do logo: o DC sai do topo e "estaciona" no cabeçalho ---------- */
  function efeitoLogo() {
    const hero = document.querySelector('.hero-logo');
    const voaMarca = document.querySelector('.fly-mark');
    const voaNome = document.querySelector('.fly-word');
    const brilho = document.querySelector('.fly-glow');
    const vagaMarca = document.querySelector('.site-header .brand-mark');
    const vagaNome = document.querySelector('.site-header .brand-word');
    const marca = document.querySelector('.site-header .brand');
    if (!hero || !voaMarca || !voaNome || !vagaMarca || !vagaNome || reduzMovimento) return null;

    root.classList.add('fx-logo');
    const TODO = { x: 3, y: 117, w: 1397, h: 544 }, M = { x: 3, y: 117, w: 495, h: 544 }, N = { x: 539, y: 368, w: 861, h: 179 };
    const pD = voaMarca.querySelector('.p-d'), pC = voaMarca.querySelector('.p-c'), pS = voaMarca.querySelector('.p-s');
    let g = null, estado = '';

    function medir() {
      const r = hero.getBoundingClientRect();
      const k = r.width / TODO.w;
      const topo = r.top + scrollY;
      g = {
        m: { x: r.left + (M.x - TODO.x) * k, y: topo + (M.y - TODO.y) * k, w: M.w * k, h: M.h * k },
        n: { x: r.left + (N.x - TODO.x) * k, y: topo + (N.y - TODO.y) * k, w: N.w * k, h: N.h * k }
      };
      g.percurso = Math.max(300, Math.min(innerHeight * 0.62, topo + r.height * 0.85));
      voaMarca.style.width = g.m.w + 'px'; voaMarca.style.height = g.m.h + 'px';
      voaNome.style.width = g.n.w + 'px'; voaNome.style.height = g.n.h + 'px';
    }
    const lerp = (a, b, t) => a + (b - a) * t;
    const suave = t => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

    function quadro() {
      if (!g) medir();
      const y = Math.max(0, scrollY);
      const p = Math.min(1, y / g.percurso);
      const novo = p <= 0 ? 'parado' : p >= 1 ? 'estacionado' : 'voando';
      if (novo !== estado) {
        root.classList.toggle('fx-flying', novo === 'voando');
        root.classList.toggle('fx-docked', novo === 'estacionado');
        if (novo === 'estacionado' && estado === 'voando') { marca.classList.remove('shine'); void marca.offsetWidth; marca.classList.add('shine'); }
        estado = novo;
      }
      if (novo !== 'voando') { brilho.style.opacity = 0; return; }

      const vm = vagaMarca.getBoundingClientRect(), vn = vagaNome.getBoundingClientRect();
      const e = suave(p);
      const pn = Math.min(1, Math.max(0, (p - 0.1) / 0.9)), en = suave(pn);
      const bump = Math.sin(Math.PI * p);

      const mx = lerp(g.m.x, vm.left, e), my = lerp(g.m.y - y, vm.top, e), ms = lerp(1, vm.height / g.m.h, e);
      const rot = -10 * bump;
      voaMarca.style.transform = `translate3d(${mx}px,${my}px,0) scale(${ms}) translate(${g.m.w / 2}px,${g.m.h / 2}px) rotate(${rot}deg) translate(${-g.m.w / 2}px,${-g.m.h / 2}px)`;
      pD.style.transform = `translate(${-16 * bump}%, ${-10 * bump}%) rotate(${-6 * bump}deg)`;
      pC.style.transform = `translate(${14 * bump}%, ${10 * bump}%) rotate(${6 * bump}deg)`;
      pS.style.transform = `translateX(${-22 * bump}%) scaleX(${1 + 0.45 * bump})`;

      const nx = lerp(g.n.x, vn.left, en), ny = lerp(g.n.y - y, vn.top, en), ns = lerp(1, vn.width / g.n.w, en);
      voaNome.style.transform = `translate3d(${nx}px,${ny}px,0) scale(${ns})`;
      voaNome.style.opacity = String(1 - 0.35 * Math.sin(Math.PI * pn));

      const cx = mx + (g.m.w * ms) / 2, cy = my + (g.m.h * ms) / 2;
      brilho.style.transform = `translate3d(${cx}px,${cy}px,0) scale(${0.6 + ms * 1.4})`;
      brilho.style.opacity = String(0.9 * bump);
    }
    let fila = false;
    const agendar = () => { if (!fila) { fila = true; requestAnimationFrame(() => { fila = false; quadro(); }); } };
    addEventListener('scroll', agendar, { passive: true });
    addEventListener('resize', () => { g = null; agendar(); });
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => { g = null; agendar(); });
    addEventListener('load', () => { g = null; agendar(); });
    quadro();
    return true;
  }

  /* ---------- Rolagem: cabeçalho, barra de progresso e marca d'água ---------- */
  function rolagem() {
    const header = document.querySelector('.site-header');
    const barra = document.querySelector('.scroll-progress');
    const wm = document.querySelector('.footer-wm');
    const rodape = document.querySelector('.site-footer');
    let fila = false;
    function quadro() {
      fila = false;
      const y = scrollY, max = document.documentElement.scrollHeight - innerHeight;
      if (header) header.classList.toggle('is-solid', y > 24);
      document.body.classList.toggle('wa-on', y > 320);
      if (barra) barra.style.setProperty('--progress', max > 0 ? Math.min(1, y / max).toFixed(4) : 0);
      if (wm && rodape && !reduzMovimento) {
        const r = rodape.getBoundingClientRect();
        if (r.top < innerHeight) wm.style.setProperty('--wm', ((r.top - innerHeight) * 0.18).toFixed(1));
      }
    }
    addEventListener('scroll', () => { if (!fila) { fila = true; requestAnimationFrame(quadro); } }, { passive: true });
    quadro();
  }

  /* ---------- Revelar ao rolar ---------- */
  /* A entrada dos blocos é feita em CSS (animation-timeline: view()).
     Mantido como função para as páginas poderem chamar sem se preocupar. */
  DC.revelar = function () {};

  /* ---------- Início ---------- */
  function iniciar() {
    root.classList.add('js');
    hidratarContatos();
    menuMobile();
    rolagem();
    if (!efeitoLogo()) root.classList.remove('fx-logo');
    document.querySelectorAll('img[data-carro]').forEach(img => {
      const [carroceria, cor] = img.dataset.carro.split('|');
      img.src = DC.desenhoCarro({ carroceria, cor, fundo: false });
    });
    DC.revelar();
    const ano = document.querySelector('[data-ano]'); if (ano) ano.textContent = new Date().getFullYear();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', iniciar);
  else iniciar();
})();
