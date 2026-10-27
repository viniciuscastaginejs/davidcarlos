/* =========================================================================
   CONFIGURAÇÃO DO SITE — David Carlos Consultor Automotivo
   Tudo que é dado de contato e texto fixo fica aqui.
   Quando o painel admin existir, estes dados passam a vir do banco.
   ========================================================================= */
window.DC_CONFIG = {
  nome: 'David Carlos',
  titulo: 'Consultor Automotivo',
  slogan: 'Seu próximo carro, escolhido com quem entende.',

  /* ⚠️ TROCAR pelos dados reais antes de publicar */
  whatsapp: '5516900000000',            // só números, com 55 + DDD
  telefoneExibicao: '(16) 90000-0000',
  email: '',                             // ex.: 'contato@davidcarlos.com.br' (vazio = não mostra)
  instagram: '',                         // só o usuário, sem @ (vazio = não mostra)
  facebook: '',                          // URL completa (vazio = não mostra)
  endereco: '',                          // vazio = atendimento com hora marcada, sem loja física
  cidade: 'Ribeirão Preto e região',
  horario: [
    { dias: 'Segunda a sexta', horas: '8h30 às 18h30' },
    { dias: 'Sábado', horas: '9h às 14h' }
  ],
  cnpj: '',                              // vazio = não mostra no rodapé

  /* Financiamento — taxa só para a simulação ilustrativa (% ao mês) */
  financiamento: {
    taxaMensal: 1.89,
    prazos: [12, 24, 36, 48, 60],
    entradaMinimaPct: 20
  },

  /* Faixa no topo avisando que os carros e fotos são de exemplo.
     Mudar para false quando o estoque real estiver no ar. */
  modoDemonstracao: true,

  /* Origem dos dados: 'local' (js/dados.js) ou 'supabase' (painel admin) */
  fonteDados: 'local',
  supabase: {
    url: '',        // ex.: 'https://xxxx.supabase.co'
    anonKey: ''     // chave pública (anon / publishable)
  },

  credito: { nome: 'MLX', url: 'https://mlxmind.com.br' }
};
