/* ---------------------------------- dados --------------------------------- */

export type Question = { id: string; legend: string; options: { label: string; value: number }[] };
export type Block = { n: string; label: string; title: string; why: string; questions: Question[] };


export const scale4 = (a: string, b: string, c: string, d: string) => [
  { label: a, value: 0 },
  { label: b, value: 1 },
  { label: c, value: 2 },
  { label: d, value: 3 },
];

export const blocks: Block[] = [
  {
    n: "01",
    label: "Situação e controle",
    title: "Como está a base, hoje",
    why: "A parte factual — o que entra, o que sai, o que existe de proteção.",
    questions: [
      {
        id: "q1",
        legend: "Você sabe quanto entrou e quanto saiu da sua conta no mês passado?",
        options: scale4(
          "Não faço ideia",
          "Tenho uma noção vaga",
          "Sei mais ou menos, de cabeça",
          "Sei com precisão, está anotado",
        ),
      },
      {
        id: "q2",
        legend: "Como termina o seu mês, na maioria das vezes?",
        options: scale4(
          "No vermelho, usando limite ou cartão",
          "No zero a zero, sem folga",
          "Sobra pouco, mas sobra",
          "Sobra um valor previsto todo mês",
        ),
      },
      {
        id: "q3",
        legend: "Se uma emergência de R$ 3.000 aparecesse amanhã, como você pagaria?",
        options: scale4(
          "Não teria como — pediria emprestado",
          "Parcelaria no cartão",
          "Tiraria de algum dinheiro guardado, com aperto",
          "Tenho reserva de emergência para isso",
        ),
      },
      {
        id: "q4",
        legend: "Qual a sua relação com dívidas hoje?",
        options: scale4(
          "Tenho dívidas em atraso e não sei o total",
          "Tenho dívidas e sei o total, mas não tenho plano",
          "Tenho dívidas sob controle, com plano de quitação",
          "Não tenho dívidas em atraso",
        ),
      },
      {
        id: "q5",
        legend: "Você tem alguma proteção além do salário (reserva, seguro, renda extra)?",
        options: scale4(
          "Nenhuma",
          "Só algo simbólico",
          "Uma proteção parcial",
          "Sim, mais de uma camada de proteção",
        ),
      },
    ],
  },
  {
    n: "02",
    label: "Comportamento",
    title: "O que você já faz no dia a dia",
    why: "Hábitos concretos, não força de vontade — o que já virou rotina.",
    questions: [
      {
        id: "q6",
        legend: "Com que frequência você registra ou confere seus gastos?",
        options: scale4("Nunca", "Só quando o dinheiro aperta", "De vez em quando", "Toda semana"),
      },
      {
        id: "q7",
        legend: "Você guarda dinheiro antes de gastar ou só o que sobra?",
        options: scale4(
          "Nunca guardo",
          "Só quando sobra algo",
          "Tento guardar primeiro, nem sempre consigo",
          "Guardo primeiro, todo mês, automático",
        ),
      },
      {
        id: "q8",
        legend: "Como você decide uma compra acima de R$ 300?",
        options: scale4(
          "Compro na hora se der no cartão",
          "Penso um pouco, mas geralmente compro",
          "Espero alguns dias antes de decidir",
          "Comparo com meu orçamento e metas antes",
        ),
      },
      {
        id: "q9",
        legend: "Você tem metas financeiras escritas com prazo e valor?",
        options: scale4(
          "Nenhuma meta",
          "Metas vagas, na cabeça",
          "Uma ou duas metas definidas",
          "Metas escritas, com prazo e valor",
        ),
      },
      {
        id: "q10",
        legend: "Seu dinheiro está separado por finalidade (contas, lazer, reserva)?",
        options: scale4(
          "Tudo misturado numa conta só",
          "Separo mentalmente, não na prática",
          "Separo parte do dinheiro",
          "Sim, cada real tem um destino definido",
        ),
      },
    ],
  },
  {
    n: "03",
    label: "Emocional",
    title: "O peso que o dinheiro carrega",
    why: "Ansiedade, evitação, confiança — o que os números sozinhos não mostram.",
    questions: [
      {
        id: "q11",
        legend: "Como você se sente ao abrir o aplicativo do banco?",
        options: scale4(
          "Aperto no peito, evito ao máximo",
          "Desconforto, abro rápido e fecho",
          "Neutro, é só uma tarefa",
          "Tranquila, sei o que vou encontrar",
        ),
      },
      {
        id: "q13",
        legend: "Você costuma gastar para aliviar cansaço, tristeza ou estresse?",
        options: scale4(
          "Sim, é o meu principal alívio",
          "Com frequência",
          "Às vezes, e percebo quando acontece",
          "Quase nunca",
        ),
      },
      {
        id: "q14",
        legend: "Quanta confiança você tem para tomar decisões sobre o seu dinheiro?",
        options: scale4(
          "Nenhuma — travo",
          "Pouca, dependo de outras pessoas",
          "Razoável, com dúvidas",
          "Boa, decido com segurança",
        ),
      },
    ],
  },
];

export type Belief = { id: string; legend: string; archetype: string };

export const beliefs: Belief[] = [
  { id: "b1", legend: "“Dinheiro é curto — sempre vai faltar, não importa quanto eu ganhe.”", archetype: "escassez" },
  { id: "b2", legend: "“Preciso controlar tudo, senão algo ruim vai acontecer.”", archetype: "controle" },
  { id: "b3", legend: "“Gente como eu não é feita para ter dinheiro sobrando.”", archetype: "merecimento" },
  { id: "b4", legend: "“Se eu não olhar, dói menos — depois eu resolvo.”", archetype: "evitação" },
];

export const beliefScale = [
  { label: "Nada a ver comigo", value: 0 },
  { label: "Um pouco", value: 1 },
  { label: "Bastante", value: 2 },
  { label: "É exatamente eu", value: 3 },
];

export const archetypeText: Record<string, { name: string; text: string }> = {
  escassez: {
    name: "Padrão de escassez",
    text: "Sua cabeça opera como se o dinheiro fosse sempre insuficiente. Isso gera decisões de curto prazo: aproveitar agora, porque amanhã pode faltar. O trabalho aqui não é ganhar mais — é ensinar o seu cérebro que existe previsibilidade.",
  },
  controle: {
    name: "Padrão de hipercontrole",
    text: "Você tenta segurar tudo sozinha, e o dinheiro vira vigilância constante. Isso cansa e, no limite, leva ao colapso e à compra por exaustão. O caminho é trocar controle por sistema: menos esforço, mais estrutura.",
  },
  merecimento: {
    name: "Padrão de merecimento",
    text: "Há uma crença antiga de que prosperidade é para os outros. Ela sabota justamente nos momentos de avanço — quando sobra dinheiro, algo acontece. Aqui o trabalho começa pela história, não pela planilha.",
  },
  evitação: {
    name: "Padrão de evitação",
    text: "Olhar dói, então você não olha. A conta não desaparece, mas a ansiedade cresce no escuro. O primeiro passo é o mais simples e o mais difícil: ver os números uma vez, acompanhada.",
  },
};

export type Level = {
  key: string;
  name: string;
  min: number;
  text: string;
  ctaTone: "urgent" | "warn" | "calm" | "good";
  ctaLabel: string;
  ctaText: string;
  ctaBtn: string;
  color: string;
};

export const levels: Level[] = [
  {
    key: "critico",
    name: "Zona crítica",
    min: 0,
    text: "Hoje o dinheiro está conduzindo você, e não o contrário. Não é falta de esforço — é falta de estrutura. Sem um sistema, cada mês recomeça do zero e o desgaste emocional aumenta. Este é o ponto em que acompanhamento faz mais diferença.",
    ctaTone: "urgent",
    ctaLabel: "Prioridade alta",
    ctaText:
      "Você não precisa organizar tudo sozinha antes de pedir ajuda — é justamente o contrário. Me chame no WhatsApp e me conte, em duas frases, o que mais te aperta hoje.",
    ctaBtn: "Falar com a Rosa agora",
    color: "var(--score-critical)",
  },
  {
    key: "atencao",
    name: "Zona de atenção",
    min: 36,
    text: "Você já tem noção do que acontece com o seu dinheiro, mas o controle ainda depende da sua memória e do seu humor. Quando a rotina aperta, tudo desanda. Faltam hábitos automáticos e uma reserva que segure imprevistos.",
    ctaTone: "warn",
    ctaLabel: "Vale agir agora",
    ctaText:
      "Esse é o estágio em que pequenas mudanças de estrutura geram resultado rápido. Vamos conversar sobre o que travar primeiro no seu caso.",
    ctaBtn: "Conversar no WhatsApp",
    color: "var(--score-warning)",
  },
  {
    key: "construcao",
    name: "Em construção",
    min: 61,
    text: "Sua base está de pé: você acompanha, guarda algo e não decide no impulso o tempo todo. O que falta é consistência e direção — transformar organização em projeto de vida, com metas claras e reserva completa.",
    ctaTone: "calm",
    ctaLabel: "Próximo passo",
    ctaText:
      "Com a base pronta, o ganho vem de estratégia: metas com prazo, reserva dimensionada e decisões maiores com segurança.",
    ctaBtn: "Ver como avançar",
    color: "var(--score-building)",
  },
  {
    key: "saudavel",
    name: "Relação saudável",
    min: 84,
    text: "Você tem clareza, hábitos e proteção. O dinheiro deixou de ser fonte de ansiedade diária. Daqui em diante o trabalho é de refinamento: proteger o que construiu e fazer o dinheiro trabalhar por objetivos maiores.",
    ctaTone: "good",
    ctaLabel: "Refinamento",
    ctaText:
      "Se quiser um olhar externo para revisar metas, reserva e próximos passos, é só me chamar.",
    ctaBtn: "Falar com a Rosa",
    color: "var(--score-healthy)",
  },
];

export const receitaFaixas = [
  "Até R$ 2.000",
  "R$ 2.001 a R$ 4.000",
  "R$ 4.001 a R$ 7.000",
  "R$ 7.001 a R$ 12.000",
  "R$ 12.001 a R$ 25.000",
  "Acima de R$ 25.000",
];

