/* =========================================================================
   ESTOQUE E BANNERS DE EXEMPLO
   Estes veículos são só para demonstrar o site. Quando o painel admin
   estiver pronto (config.fonteDados = 'supabase'), este arquivo deixa de
   ser usado. Os nomes dos campos já são os mesmos da tabela do banco.

   fotos: lista de URLs. Vazio = o site desenha uma ilustração do modelo
   na cor do carro (marcada como "foto ilustrativa").
   status: 'disponivel' | 'reservado' | 'vendido' (vendido não aparece no estoque)
   ========================================================================= */
window.DC_DADOS = {
  veiculos: [
    {
      id: 'jeep-compass-longitude-2022-branco',
      marca: 'Jeep', modelo: 'Compass', versao: 'Longitude 1.3 T270 Turbo Flex Automático',
      ano_fabricacao: 2022, ano_modelo: 2022, km: 48200, preco: 132900, preco_anterior: 136900,
      cambio: 'Automático', combustivel: 'Flex', cor: 'Branco', carroceria: 'SUV', portas: 4, final_placa: 7,
      opcionais: ['Central multimídia 10" com Android Auto e Apple CarPlay', 'Ar-condicionado digital dual zone', 'Bancos em couro', 'Chave presencial e partida por botão', 'Câmera de ré', 'Sensores de estacionamento', 'Faróis full LED', 'Rodas de liga leve aro 18', 'Freio de estacionamento eletrônico', 'Piloto automático', '6 airbags'],
      descricao: 'Compass muito bem cuidado, único dono e com todas as revisões feitas na concessionária.\nPneus em ótimo estado, manual e chave reserva.',
      fotos: [], destaque: true, status: 'disponivel', criado_em: '2026-10-25',
      laudo_cautelar: true, unico_dono: true, ipva_pago: true, revisado: true
    },
    {
      id: 'toyota-corolla-xei-2022-prata',
      marca: 'Toyota', modelo: 'Corolla', versao: 'XEi 2.0 Dynamic Force Flex Automático',
      ano_fabricacao: 2021, ano_modelo: 2022, km: 41500, preco: 129900,
      cambio: 'Automático', combustivel: 'Flex', cor: 'Prata', carroceria: 'Sedã', portas: 4, final_placa: 3,
      opcionais: ['Central multimídia com Android Auto e Apple CarPlay', 'Ar-condicionado digital dual zone', 'Bancos em couro', 'Toyota Safety Sense', 'Piloto automático adaptativo', 'Câmera de ré', 'Chave presencial', 'Rodas de liga leve aro 17', '7 airbags'],
      descricao: 'Corolla XEi impecável, sempre revisado na Toyota.\nCarro de garagem, sem detalhes de lataria.',
      fotos: [], destaque: true, status: 'disponivel', criado_em: '2026-10-24',
      laudo_cautelar: true, unico_dono: false, ipva_pago: true, revisado: true
    },
    {
      id: 'hyundai-creta-limited-2024-cinza',
      marca: 'Hyundai', modelo: 'Creta', versao: 'Limited 1.0 TGDI Turbo Automático',
      ano_fabricacao: 2023, ano_modelo: 2024, km: 22800, preco: 128900,
      cambio: 'Automático', combustivel: 'Flex', cor: 'Cinza', carroceria: 'SUV', portas: 4, final_placa: 5,
      opcionais: ['Central multimídia com espelhamento sem fio', 'Painel digital', 'Ar-condicionado digital', 'Carregador por indução', 'Câmera de ré', 'Sensores de estacionamento', 'Chave presencial', 'Rodas de liga leve aro 17', '6 airbags'],
      descricao: 'Creta Limited com baixa quilometragem e ainda na garantia de fábrica.',
      fotos: [], destaque: true, status: 'disponivel', criado_em: '2026-10-23',
      laudo_cautelar: true, unico_dono: true, ipva_pago: true, revisado: true
    },
    {
      id: 'volkswagen-t-cross-highline-2023-azul',
      marca: 'Volkswagen', modelo: 'T-Cross', versao: 'Highline 1.4 250 TSI Automático',
      ano_fabricacao: 2022, ano_modelo: 2023, km: 35100, preco: 124900,
      cambio: 'Automático', combustivel: 'Flex', cor: 'Azul', carroceria: 'SUV', portas: 4, final_placa: 1,
      opcionais: ['Active Info Display', 'Central VW Play', 'Ar-condicionado digital', 'Teto solar panorâmico', 'Bancos em couro', 'Faróis full LED', 'Câmera de ré', 'Piloto automático adaptativo', 'Rodas de liga leve aro 17'],
      descricao: 'T-Cross Highline completo, com teto solar panorâmico.',
      fotos: [], destaque: false, status: 'disponivel', criado_em: '2026-10-21',
      laudo_cautelar: true, unico_dono: false, ipva_pago: true, revisado: true
    },
    {
      id: 'fiat-toro-volcano-diesel-2022-vermelho',
      marca: 'Fiat', modelo: 'Toro', versao: 'Volcano 2.0 Turbo Diesel 4x4 Automático',
      ano_fabricacao: 2021, ano_modelo: 2022, km: 68400, preco: 139900,
      cambio: 'Automático', combustivel: 'Diesel', cor: 'Vermelho', carroceria: 'Picape', portas: 4, final_placa: 9,
      opcionais: ['Tração 4x4', 'Central multimídia 8,4"', 'Ar-condicionado digital dual zone', 'Bancos em couro', 'Capota marítima', 'Câmera de ré', 'Sensores de estacionamento', 'Rodas de liga leve aro 18'],
      descricao: 'Toro Volcano diesel 4x4, pronta para trabalho e viagem.',
      fotos: [], destaque: false, status: 'disponivel', criado_em: '2026-10-19',
      laudo_cautelar: true, unico_dono: false, ipva_pago: false, revisado: true
    },
    {
      id: 'chevrolet-onix-plus-premier-2023-preto',
      marca: 'Chevrolet', modelo: 'Onix Plus', versao: 'Premier 1.0 Turbo Automático',
      ano_fabricacao: 2022, ano_modelo: 2023, km: 30900, preco: 92900,
      cambio: 'Automático', combustivel: 'Flex', cor: 'Preto', carroceria: 'Sedã', portas: 4, final_placa: 4,
      opcionais: ['MyLink com Android Auto e Apple CarPlay', 'Wi-Fi nativo', 'Ar-condicionado digital', 'Bancos em couro', 'Câmera de ré', 'Chave presencial', 'Alerta de ponto cego', 'Rodas de liga leve aro 16', '6 airbags'],
      descricao: 'Onix Plus Premier, a versão mais completa, econômico e confortável.',
      fotos: [], destaque: false, status: 'disponivel', criado_em: '2026-10-18',
      laudo_cautelar: true, unico_dono: true, ipva_pago: true, revisado: true
    },
    {
      id: 'honda-hr-v-exl-2023-cinza',
      marca: 'Honda', modelo: 'HR-V', versao: 'EXL 1.5 CVT',
      ano_fabricacao: 2023, ano_modelo: 2023, km: 19700, preco: 149900,
      cambio: 'CVT', combustivel: 'Flex', cor: 'Cinza', carroceria: 'SUV', portas: 4, final_placa: 6,
      opcionais: ['Honda Sensing', 'Central multimídia com espelhamento', 'Ar-condicionado digital dual zone', 'Bancos em couro', 'Câmera de ré', 'Chave presencial', 'Faróis full LED', 'Rodas de liga leve aro 17'],
      descricao: 'HR-V EXL com baixa quilometragem, revisões feitas na Honda.',
      fotos: [], destaque: true, status: 'disponivel', criado_em: '2026-10-17',
      laudo_cautelar: true, unico_dono: true, ipva_pago: true, revisado: true
    },
    {
      id: 'volkswagen-polo-highline-2021-branco',
      marca: 'Volkswagen', modelo: 'Polo', versao: 'Highline 1.0 200 TSI Automático',
      ano_fabricacao: 2021, ano_modelo: 2021, km: 52300, preco: 79900,
      cambio: 'Automático', combustivel: 'Flex', cor: 'Branco', carroceria: 'Hatch', portas: 4, final_placa: 2,
      opcionais: ['Active Info Display', 'Central multimídia com espelhamento', 'Ar-condicionado digital', 'Faróis full LED', 'Câmera de ré', 'Sensores de estacionamento', 'Rodas de liga leve aro 17'],
      descricao: 'Polo Highline turbo, ótimo para o dia a dia.',
      fotos: [], destaque: false, status: 'disponivel', criado_em: '2026-10-15',
      laudo_cautelar: true, unico_dono: false, ipva_pago: true, revisado: false
    },
    {
      id: 'fiat-strada-volcano-cvt-2024-prata',
      marca: 'Fiat', modelo: 'Strada', versao: 'Volcano 1.3 CVT Cabine Dupla',
      ano_fabricacao: 2023, ano_modelo: 2024, km: 27600, preco: 109900,
      cambio: 'CVT', combustivel: 'Flex', cor: 'Prata', carroceria: 'Picape', portas: 4, final_placa: 8,
      opcionais: ['Central multimídia com espelhamento sem fio', 'Ar-condicionado', 'Câmera de ré', 'Rodas de liga leve aro 15', 'Capota marítima'],
      descricao: 'Strada Volcano automática, cabine dupla.',
      fotos: [], destaque: false, status: 'disponivel', criado_em: '2026-10-12',
      laudo_cautelar: true, unico_dono: true, ipva_pago: true, revisado: true
    },
    {
      id: 'hyundai-hb20-platinum-2023-prata',
      marca: 'Hyundai', modelo: 'HB20', versao: 'Platinum 1.0 TGDI Automático',
      ano_fabricacao: 2022, ano_modelo: 2023, km: 33400, preco: 84900,
      cambio: 'Automático', combustivel: 'Flex', cor: 'Prata', carroceria: 'Hatch', portas: 4, final_placa: 0,
      opcionais: ['Central multimídia com espelhamento sem fio', 'Painel digital', 'Ar-condicionado digital', 'Carregador por indução', 'Câmera de ré', 'Chave presencial', '6 airbags'],
      descricao: 'HB20 Platinum, top de linha, muito econômico.',
      fotos: [], destaque: false, status: 'disponivel', criado_em: '2026-10-10',
      laudo_cautelar: true, unico_dono: false, ipva_pago: true, revisado: true
    },
    {
      id: 'toyota-hilux-srx-2021-branco',
      marca: 'Toyota', modelo: 'Hilux', versao: 'SRX 2.8 Turbo Diesel 4x4 Automático',
      ano_fabricacao: 2020, ano_modelo: 2021, km: 98000, preco: 229900,
      cambio: 'Automático', combustivel: 'Diesel', cor: 'Branco', carroceria: 'Picape', portas: 4, final_placa: 7,
      opcionais: ['Tração 4x4', 'Central multimídia', 'Ar-condicionado digital', 'Bancos em couro', 'Câmera de ré', 'Piloto automático', 'Rodas de liga leve aro 18', '7 airbags'],
      descricao: 'Hilux SRX diesel, a mais desejada. Revisões em dia.',
      fotos: [], destaque: false, status: 'reservado', criado_em: '2026-10-08',
      laudo_cautelar: true, unico_dono: false, ipva_pago: true, revisado: true
    }
  ],

  banners: [
    {
      titulo: 'Compra assistida do começo ao fim',
      texto: 'Você me diz o que precisa e quanto quer investir. Eu encontro, vistorio e negocio o carro certo pra você.',
      botao: 'Quero ajuda pra comprar', link: 'index.html#encomenda',
      arte: { carroceria: 'SUV', cor: 'Branco' }, imagem: ''
    },
    {
      titulo: 'Seu carro vale mais com a negociação certa',
      texto: 'Avaliação justa com base no mercado. Eu cuido da negociação e da documentação.',
      botao: 'Avaliar meu carro', link: 'venda-seu-carro.html',
      arte: { carroceria: 'Sedã', cor: 'Preto' }, imagem: ''
    }
  ]
};
