/* =========================================================================
   CAMADA DE DADOS
   O site inteiro pede os dados por aqui. Hoje lê o js/dados.js (exemplo).
   Com o painel admin, basta preencher DC_CONFIG.supabase e mudar
   DC_CONFIG.fonteDados para 'supabase' — as páginas não mudam.
   Tabelas esperadas: veiculos, banners, leads (ver supabase/schema.sql).
   ========================================================================= */
(function () {
  const cfg = window.DC_CONFIG || {};
  const local = window.DC_DADOS || { veiculos: [], banners: [] };
  const usarSupabase = cfg.fonteDados === 'supabase' && cfg.supabase && cfg.supabase.url && cfg.supabase.anonKey;
  let cacheVeiculos = null;

  async function sb(path, opts = {}) {
    const res = await fetch(cfg.supabase.url.replace(/\/$/, '') + '/rest/v1/' + path, {
      ...opts,
      headers: {
        apikey: cfg.supabase.anonKey,
        Authorization: 'Bearer ' + cfg.supabase.anonKey,
        'Content-Type': 'application/json',
        ...(opts.headers || {})
      }
    });
    if (!res.ok) throw new Error('Supabase ' + res.status);
    return res.status === 204 ? null : res.json();
  }

  async function listarVeiculos() {
    if (cacheVeiculos) return cacheVeiculos;
    let lista;
    if (usarSupabase) {
      lista = await sb('veiculos?select=*&status=neq.vendido&order=destaque.desc,criado_em.desc');
    } else {
      lista = local.veiculos.filter(v => v.status !== 'vendido');
    }
    cacheVeiculos = lista.map(normalizar);
    return cacheVeiculos;
  }

  async function buscarVeiculo(id) {
    if (!id) return null;
    if (usarSupabase) {
      const r = await sb('veiculos?select=*&id=eq.' + encodeURIComponent(id) + '&limit=1');
      return r && r[0] ? normalizar(r[0]) : null;
    }
    const v = local.veiculos.find(x => x.id === id);
    return v ? normalizar(v) : null;
  }

  async function listarBanners() {
    if (usarSupabase) {
      return sb('banners?select=*&ativo=eq.true&order=ordem.asc');
    }
    return local.banners || [];
  }

  /* Lead = alguém que pediu contato (interesse, avaliação, financiamento, encomenda).
     Hoje vai direto para o WhatsApp. Com o painel, também fica salvo no banco. */
  async function salvarLead(tipo, dados) {
    if (!usarSupabase) return { ok: true, local: true };
    try {
      await sb('leads', { method: 'POST', headers: { Prefer: 'return=minimal' }, body: JSON.stringify({ tipo, dados, pagina: location.pathname }) });
      return { ok: true };
    } catch (e) {
      return { ok: false };
    }
  }

  function normalizar(v) {
    return {
      ...v,
      km: Number(v.km) || 0,
      preco: Number(v.preco) || 0,
      preco_anterior: v.preco_anterior ? Number(v.preco_anterior) : null,
      opcionais: Array.isArray(v.opcionais) ? v.opcionais : [],
      fotos: Array.isArray(v.fotos) ? v.fotos.filter(Boolean) : []
    };
  }

  window.DC_API = { listarVeiculos, buscarVeiculo, listarBanners, salvarLead };
})();
