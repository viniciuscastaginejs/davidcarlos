/* Venda seu carro, Financiamento e Contato */
(async function () {
  const { DC } = window;
  const $ = s => document.querySelector(s);
  const p = DC.params();

  /* ================= VENDA SEU CARRO ================= */
  const fVenda = $('#form-venda');
  if (fVenda) {
    ['veiculo', 'ano', 'km'].forEach(k => { if (p.get(k) && fVenda.elements[k]) fVenda.elements[k].value = p.get(k); });
    DC.formulario(fVenda, {
      tipo: 'avaliacao',
      mensagem: d => [
        'Olá, David! Quero uma avaliação do meu carro.',
        `*Carro:* ${d.veiculo}`,
        `*Ano:* ${d.ano}`,
        `*Km:* ${d.km}`,
        d.cor ? `*Cor:* ${d.cor}` : '',
        d.estado ? `*Estado geral:* ${d.estado}` : '',
        d.situacao ? `*Situação:* ${d.situacao}` : '',
        d.troca ? `*Quero trocar por outro carro:* ${d.troca}` : '',
        d.obs ? `*Observações:* ${d.obs}` : '',
        `*Nome:* ${d.nome}`,
        `*WhatsApp:* ${d.telefone}`,
        d.cidade ? `*Cidade:* ${d.cidade}` : '',
        '',
        'Vou mandar as fotos aqui na conversa.'
      ].filter(x => x !== '').join('\n')
    });
  }

  /* ================= FINANCIAMENTO ================= */
  const fSim = $('#form-sim');
  if (fSim) {
    const fin = DC.cfg.financiamento || { taxaMensal: 1.89, prazos: [12, 24, 36, 48, 60], entradaMinimaPct: 20 };
    const valorEl = fSim.elements.valor, entradaEl = fSim.elements.entrada_pct;
    const prazosBox = $('#prazos');
    prazosBox.innerHTML = fin.prazos.map(n => `<label><input type="radio" name="prazo" value="${n}" ${n === 48 ? 'checked' : ''}><span>${n}x</span></label>`).join('');
    if (!fSim.querySelector('input[name="prazo"]:checked')) fSim.querySelector('input[name="prazo"]').checked = true;
    $('#taxa-ref').textContent = fin.taxaMensal.toLocaleString('pt-BR') + '% ao mês';

    // veio de um carro do estoque?
    const id = p.get('id');
    if (id) {
      try {
        const v = await window.DC_API.buscarVeiculo(id);
        if (v) {
          valorEl.value = v.preco;
          fSim.elements.veiculo.value = DC.fmt.completo(v);
          const box = $('#veiculo-escolhido');
          box.hidden = false;
          box.innerHTML = `<img src="${DC.fotos(v)[0]}" alt="" width="120" height="90"><div><p class="label">${DC.esc(v.marca)}</p><strong>${DC.esc(v.modelo)} ${v.ano_modelo}</strong><p class="form-note">${DC.esc(v.versao)}</p></div><a class="link-arrow" href="${DC.linkVeiculo(v)}">Ver carro${DC.icon.seta}</a>`;
        }
      } catch (e) { /* segue sem carro */ }
    }

    const pmt = (taxa, n, pv) => (taxa === 0 ? pv / n : (pv * taxa) / (1 - Math.pow(1 + taxa, -n)));
    function calcular() {
      const valor = Math.max(0, Number(String(valorEl.value).replace(/\D/g, '')) || 0);
      const pct = Number(entradaEl.value) || 0;
      const n = Number((fSim.querySelector('input[name="prazo"]:checked') || {}).value) || 48;
      const entrada = Math.round(valor * pct / 100);
      const financiado = Math.max(0, valor - entrada);
      const parcela = financiado ? pmt(fin.taxaMensal / 100, n, financiado) : 0;
      $('#entrada-txt').textContent = `${pct}% · ${DC.fmt.preco(entrada)}`;
      $('#r-parcela').textContent = valor ? DC.fmt.preco(Math.round(parcela)) : 'R$ —';
      $('#r-prazo').textContent = `${n}x`;
      $('#r-financiado').textContent = DC.fmt.preco(financiado);
      $('#r-entrada').textContent = DC.fmt.preco(entrada);
      $('#r-total').textContent = DC.fmt.preco(Math.round(parcela * n + entrada));
      return { valor, pct, n, entrada, financiado, parcela };
    }
    entradaEl.min = 0; entradaEl.max = 80;
    if (!entradaEl.value) entradaEl.value = fin.entradaMinimaPct || 20;
    fSim.addEventListener('input', calcular);
    calcular();

    DC.formulario(fSim, {
      tipo: 'financiamento',
      mensagem: d => {
        const r = calcular();
        return [
          'Olá, David! Quero simular um financiamento.',
          d.veiculo ? `*Carro:* ${d.veiculo}` : '',
          `*Valor do carro:* ${DC.fmt.preco(r.valor)}`,
          `*Entrada:* ${DC.fmt.preco(r.entrada)} (${r.pct}%)`,
          `*Prazo:* ${r.n}x`,
          `*Parcela estimada no site:* ${DC.fmt.preco(Math.round(r.parcela))}`,
          `*Nome:* ${d.nome}`,
          `*WhatsApp:* ${d.telefone}`
        ].filter(Boolean).join('\n');
      }
    });
    // valor digitado com máscara de dinheiro
    valorEl.addEventListener('blur', () => { const n = Number(String(valorEl.value).replace(/\D/g, '')); valorEl.value = n || ''; calcular(); });
  }

  /* ================= CONTATO ================= */
  DC.formulario($('#form-contato'), {
    tipo: 'contato',
    mensagem: d => [`Olá, David! Vim pelo site.`, d.assunto ? `*Assunto:* ${d.assunto}` : '', d.mensagem ? d.mensagem : '', `*Nome:* ${d.nome}`, `*WhatsApp:* ${d.telefone}`].filter(Boolean).join('\n')
  });
})();
