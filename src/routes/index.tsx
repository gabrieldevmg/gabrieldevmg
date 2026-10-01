import { createFileRoute } from "@tanstack/react-router";
import { BarChart3, BookOpen, Building2, CalendarClock, Check, CreditCard, GraduationCap, Headphones, Landmark, MessageCircle, Sprout, Table, Target, Users, X } from "lucide-react";


import { Depoimentos } from "@/components/rosa/depoimentos";
import {
  Btn,
  DocLabel,
  LedgerLine,
  Section,
  WHATSAPP_URL,
  WhatsappIcon,
  Wrap,
} from "@/components/rosa/primitives";
import { useReveal } from "@/components/rosa/useReveal";

/** CTA de negociação: abre o WhatsApp com a mensagem já escrita. */
const WHATSAPP_VALORES = `${WHATSAPP_URL}?text=${encodeURIComponent(
  "Oi, Rosa! Quero saber os valores e as condições da consultoria financeira individual.",
)}`;

const SITE = "https://financasrm.com.br";
const OG_IMAGE = `${SITE}/og-home.jpg`;
const TITLE = "Consultoria Financeira Online para Mulheres | Rosa — Finanças RM";
const DESCRIPTION =
  "Consultoria financeira individual online com Rosa, ex-gerente bancária com 17 anos de experiência: organize suas finanças, saia das dívidas, monte sua reserva e comece a investir.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      {
        name: "keywords",
        content:
          "consultoria financeira, consultora financeira, consultoria financeira online, educadora financeira, organização financeira, planejamento financeiro pessoal, sair das dívidas, limpar o nome, reserva de emergência, como começar a investir, finanças para mulheres, controle de gastos, planilha financeira",
      },
      { name: "robots", content: "index, follow, max-image-preview:large" },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `${SITE}/` },
      { property: "og:image", content: OG_IMAGE },
      { property: "og:image:secure_url", content: OG_IMAGE },
      { property: "og:image:type", content: "image/jpeg" },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:image:alt", content: "Rosa, consultora financeira" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESCRIPTION },
      { name: "twitter:image", content: OG_IMAGE },
    ],
    links: [{ rel: "canonical", href: `${SITE}/` }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "ProfessionalService",
              "@id": `${SITE}/#negocio`,
              name: "Finanças RM — Rosa Consultora Financeira",
              url: `${SITE}/`,
              image: OG_IMAGE,
              description: DESCRIPTION,
              areaServed: { "@type": "Country", name: "Brasil" },
              availableLanguage: "pt-BR",
              priceRange: "Sob consulta",
              founder: { "@id": `${SITE}/#rosa` },
            },
            {
              "@type": "Person",
              "@id": `${SITE}/#rosa`,
              name: "Rosa",
              jobTitle: "Consultora e educadora financeira certificada",
              description:
                "Ex-gerente de agência (Sicoob) com 17 anos no sistema bancário e MBA em consultoria e diagnóstico.",
              knowsAbout: ["Planejamento financeiro pessoal", "Organização financeira", "Renegociação de dívidas", "Reserva de emergência", "Investimentos para iniciantes"],
            },
            {
              "@type": "Service",
              name: "Consultoria financeira individual (3 meses)",
              serviceType: "Consultoria financeira pessoal online",
              provider: { "@id": `${SITE}/#negocio` },
              areaServed: "BR",
              description: DESCRIPTION,
            },
          ],
        }),
      },
    ],
  }),
  component: RosaSalesPage,
});

const dores = [
  "Não sei pra onde meu dinheiro vai",
  "Não sobra nada no fim do mês",
  "Não consigo guardar dinheiro",
  "Gasto demais — e nem sei bem por quê",
];

const etapas = [
  {
    n: "0",
    t: "Diagnóstico inicial",
    d: "Antes da primeira sessão, você preenche um questionário de diagnóstico financeiro — o ponto de partida do seu plano personalizado.",
  },
  {
    n: "1",
    t: "Crenças e hábitos com o dinheiro",
    d: "Entendemos, com base em neurociência, o que está por trás dos seus hábitos financeiros atuais — a raiz do que te trava.",
  },
  {
    n: "2",
    t: "Raio-X financeiro",
    d: "Organização completa do seu orçamento e planejamento — clareza total de pra onde vai cada real.",
  },
  {
    n: "3",
    t: "Metas e reserva da paz",
    d: "Definição de metas reais e construção da sua reserva de emergência — a base da tranquilidade financeira.",
  },
  {
    n: "4",
    t: "Introdução aos investimentos",
    d: "Primeiros passos pra fazer o dinheiro guardado trabalhar a seu favor.",
  },
  {
    n: "5",
    t: "Revisão e plano de ação final",
    d: "Revisão completa do orçamento e entrega do seu plano de ação — pra você seguir sozinha, com autonomia.",
  },
];

const entregaveis = [
  {
    idx: "01",
    icon: Table,
    t: "Planilha personalizada",
    d: "Pra acompanhar seu orçamento mês a mês, do seu jeito.",
  },
  {
    idx: "02",
    icon: BookOpen,
    t: "E-books sobre investimentos",
    d: "Material de apoio pros primeiros passos fora da dívida e rumo à reserva.",
  },
  {
    idx: "03",
    icon: Target,
    t: "Plano de ação detalhado",
    d: "Um passo a passo individual, construído a partir do seu diagnóstico.",
  },
  {
    idx: "04",
    icon: MessageCircle,
    t: "Acompanhamento via WhatsApp",
    d: "Suporte entre as sessões pra dúvidas e ajustes de rota.",
  },
  {
    idx: "05",
    icon: Sprout,
    t: "Autonomia pra investir",
    d: "Você aprende a fazer e revisar seu próprio planejamento, todos os meses.",
  },
  {
    idx: "06",
    icon: CreditCard,
    t: "Consumo mais consciente",
    d: "Ferramentas pra usar o cartão de crédito com controle, não com culpa.",
  },
];

const faq = [
  {
    q: "Não tenho dinheiro pra investir nisso agora.",
    a: "O investimento na consultoria é pra gerar uma mudança que continua trazendo resultados muito depois do nosso acompanhamento.",
  },
  {
    q: "Não vou ter tempo pra acompanhar direito.",
    a: "São 5 sessões de 1h30, quinzenais, 100% online — cabem na agenda de quem trabalha. E o suporte por WhatsApp entre encontros é justamente pra você não perder o ritmo.",
  },
  {
    q: "Já tentei antes e não deu certo.",
    a: "Um curso ensina um método pra milhares de pessoas ao mesmo tempo. Aqui eu analiso sua renda, seus gastos e seus objetivos, e construo um plano com você — acompanhando cada ajuste, sessão a sessão.",
  },
];

function RosaSalesPage() {
  useReveal();

  return (
    <main className="bg-paper text-ink">
      <div className="scroll-progress" aria-hidden="true" />
      {/* ================= HERO ================= */}
      <div className="relative isolate flex min-h-[520px] flex-col overflow-hidden pb-[420px] md:min-h-[680px] md:pb-0">
        <img
          src="/images/rosa-hero-background.webp"
          alt=""
          aria-hidden="true"
          className="kenburns absolute bottom-0 left-1/2 -z-20 h-[420px] w-auto max-w-none -translate-x-[65%] md:inset-0 md:left-0 md:h-full md:w-full md:max-w-full md:translate-x-0 md:object-cover md:object-center"
        />
        {/* mobile: a foto nasce do papel, na base da seção */}
        <div className="from-paper via-paper/0 to-paper/0 absolute bottom-0 left-0 -z-10 h-[420px] w-full bg-gradient-to-b from-0% via-35% to-100% md:hidden" />
        {/* desktop: a esquerda fica limpa pro texto */}
        <div className="from-paper via-paper/90 to-paper/0 absolute inset-0 -z-10 hidden bg-gradient-to-r from-0% via-42% to-72% md:block" />
        <Wrap className="flex flex-1 items-start pt-9 pb-10 md:items-center md:pt-0 md:pb-0 md:py-16">
          <div className="hero-enter w-full md:max-w-[58%] lg:max-w-[54%]">
            <DocLabel>Consultoria financeira individual</DocLabel>
            <h1 className="my-5 text-[clamp(2rem,3.5vw,2.95rem)] leading-[1.16]">
              Você trabalha, ganha bem — e mesmo assim sente que o dinheiro{" "}
              <em className="draw-underline font-display text-credit font-semibold italic">nunca sobra</em>?
            </h1>
            <p className="text-ink-soft mb-8 max-w-[42ch] text-[1.06rem]">
              Um acompanhamento individual de três meses pra você sair da ansiedade financeira e
              passar a viver com clareza, controle e a tranquilidade de saber pra onde vai cada real.
            </p>
            <Btn href={WHATSAPP_URL} className="btn-pulse">
              <WhatsappIcon /> Quero organizar minha vida financeira
            </Btn>
            <p className="text-ink-soft mt-3.5 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-[0.82rem] sm:text-[0.85rem]">
              <span className="inline-flex items-center gap-1.5">
                <CalendarClock className="h-4 w-4" aria-hidden="true" /> resposta em até 1 dia útil
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Headphones className="h-4 w-4" aria-hidden="true" /> atendimento 100% online
              </span>
            </p>
            <div className="border-rule mt-9 grid grid-cols-3 gap-3 border-t pt-7 sm:gap-6 md:mt-[3.4vw]">
              {[
                { icon: Building2, b: "17", s: "anos de experiência bancária" },
                { icon: Users, b: "35+", s: "mulheres já atendidas" },
                { icon: Target, b: "3", s: "meses de acompanhamento" },
              ].map((s) => (
                <div key={s.s}>
                  <s.icon className="mb-2 h-5 w-5" aria-hidden="true" />
                  <b className="tabular block font-mono text-[1.35rem] font-bold sm:text-[1.6rem]">
                    {s.b}
                  </b>
                  <span className="text-ink-soft block text-[0.75rem] leading-snug sm:text-[0.82rem]">
                    {s.s}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </Wrap>
      </div>

      {/* ================= DOR ================= */}
      <Section className="bg-ink text-paper">
        <Wrap className="reveal">
          <DocLabel tone="dark">Isso soa familiar?</DocLabel>
          <h2 className="text-paper mt-3 mb-4 max-w-[26ch] text-[clamp(1.5rem,2.4vw,2.05rem)]">
            Você não precisa estar endividada pra viver com o peso do dinheiro na cabeça.
          </h2>
          <p className="text-cream-dim mb-10 max-w-[56ch] text-[1.02rem]">
            Você já tentou planilha, aplicativo, curso, força de vontade — e mesmo assim volta a se
            sentir perdida todo mês. O problema nunca foi disciplina.
          </p>
          <div className="flex max-w-[640px] flex-col">
            {dores.map((d) => (
              <LedgerLine key={d} label={d} value="de novo" tone="debit" dark />
            ))}
          </div>
        </Wrap>
      </Section>


      {/* ================= AUTORIDADE ================= */}
      <Section className="relative overflow-hidden md:min-h-[620px]">
        {/* A foto vira o fundo: Rosa encostada à esquerda, texto sobre o creme. */}
        <img
          src="/images/rosa-quem-te-acompanha.webp"
          alt="Rosa, educadora financeira certificada"
          loading="lazy"
          className="absolute inset-0 hidden h-full w-full object-cover object-[0%_28%] md:block"
        />
        <div className="via-paper/60 to-transparent absolute inset-0 hidden bg-gradient-to-l from-paper from-42% via-52% to-68% md:block" />
        <Wrap className="reveal relative">
          <div className="md:ml-auto md:max-w-[58%] lg:max-w-[52%]">
            <DocLabel>Quem te acompanha</DocLabel>
            <h2 className="mt-3 mb-5 text-[clamp(1.5rem,2.4vw,2rem)]">
              17 anos dentro do sistema bancário pra entender o que realmente organiza a vida
              financeira de alguém.
            </h2>
            <p className="mb-4 text-[1.02rem]">
              Fui gerente de agência no Sicoob por 17 anos. Nesse tempo, atendi centenas de pessoas
              — e percebi, atendimento após atendimento, o quanto elas estavam perdidas em relação ao
              próprio dinheiro. Não por falta de renda. Por falta de orientação.
            </p>
            <blockquote className="border-debit font-display my-6 border-l-[3px] pl-4 text-[1.1rem] font-semibold italic">
              “A maioria das pessoas que passou pela minha mesa no banco não precisava de mais
              crédito. Precisava de alguém para organizar o que já tinha.”
            </blockquote>
            <p className="mb-4 text-[1.02rem]">
              Hoje sou educadora financeira certificada, com MBA em Consultoria e Diagnóstico
              Organizacional, e já acompanhei mais de 35 mulheres nessa mesma jornada — da ansiedade
              financeira ao controle real.
            </p>
            <div className="mt-7 grid gap-6 sm:grid-cols-3 sm:gap-0">
              {[
                { icon: Landmark, label: "Ex-gerente de agência", value: "Sicoob" },
                { icon: GraduationCap, label: "Formação", value: "Educadora financeira certificada" },
                { icon: BarChart3, label: "Pós-graduação", value: "MBA consultoria e diagnóstico" },
              ].map((c, i) => (
                <div
                  key={c.label}
                  className={`flex items-start gap-3 ${i > 0 ? "border-rule sm:border-l sm:pl-5" : ""} ${i < 2 ? "sm:pr-5" : ""}`}
                >
                  <c.icon className="text-gold mt-0.5 h-[18px] w-[18px] shrink-0" strokeWidth={1.6} aria-hidden="true" />
                  <div className="min-w-0">
                    <p className="text-ink-soft font-mono text-[0.7rem] tracking-wider uppercase">{c.label}</p>
                    <p className="mt-1 text-[0.92rem] leading-snug font-semibold">{c.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Wrap>
        {/* No celular, a foto entra como faixa embaixo do texto, sem cobrir a leitura. */}
        <div className="relative h-[360px] overflow-hidden md:hidden">
          <img
            src="/images/rosa-quem-te-acompanha.webp"
            alt="Rosa, educadora financeira certificada"
            loading="lazy"
            className="absolute top-0 left-1/2 h-full w-auto max-w-none -translate-x-[31%]"
          />
          <div className="via-paper/70 to-transparent absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-paper from-30%" />
        </div>
      </Section>

      {/* ================= TRANSFORMAÇÃO ================= */}
      <Section className="bg-paper-deep border-rule border-y">
        <Wrap className="reveal">
          <DocLabel className="text-center">A transformação</DocLabel>
          <h2 className="mx-auto mt-3 max-w-[34ch] text-center text-[clamp(1.5rem,2.4vw,2rem)]">
            O que muda quando você para de administrar sozinha
          </h2>
          <div className="mt-10 grid gap-9 md:grid-cols-2">
            <div className="border-debit border-l-[3px] pl-6">
              <DocLabel tone="debit" className="mb-3">
                Débito · antes
              </DocLabel>
              <p className="text-[1.03rem]">
                Preocupação constante com dinheiro. Ansiedade. Compras por impulso das quais você se
                arrepende depois. A sensação de estar sempre no vermelho, mesmo trabalhando duro.
              </p>
            </div>
            <div className="border-credit border-l-[3px] pl-6">
              <DocLabel tone="accent" className="mb-3">
                Crédito · depois
              </DocLabel>
              <p className="text-[1.03rem]">
                Compras planejadas. Controle real do orçamento. Metas claras e uma reserva própria —
                a “reserva da paz”. Clareza, tranquilidade e a segurança de saber que o dinheiro
                está sob controle.
              </p>
            </div>
          </div>
        </Wrap>
      </Section>

      {/* ================= METODOLOGIA ================= */}
      <Section>
        <Wrap className="reveal">
          <DocLabel className="text-center">O método</DocLabel>
          <h2 className="mx-auto mt-3 mb-3 max-w-[32ch] text-center text-[clamp(1.5rem,2.4vw,2.05rem)]">
            Cinco encontros. Um caminho claro do caos ao controle.
          </h2>
          <p className="text-ink-soft mx-auto mb-12 max-w-[56ch] text-center">
            Acompanhamento 100% online, quinzenal, com sessões de 1h30 e suporte por WhatsApp entre
            um encontro e outro. Do diagnóstico ao plano de ação, você nunca caminha sozinha.
          </p>

          <div className="mb-12 flex flex-wrap justify-center gap-x-10 gap-y-6">
            {[
              { b: "5", s: "sessões individuais" },
              { b: "1h30", s: "por encontro" },
              { b: "quinzenal", s: "frequência" },
              { b: "3 meses", s: "duração total" },
            ].map((f) => (
              <div key={f.s} className="text-center">
                <b className="tabular block font-mono text-[1.35rem] font-bold">{f.b}</b>
                <span className="text-ink-soft text-[0.8rem]">{f.s}</span>
              </div>
            ))}
          </div>

          <div className="stagger mx-auto flex max-w-[760px] flex-col">
            {etapas.map((e) => (
              <div
                key={e.n}
                className="border-rule-soft grid grid-cols-[46px_1fr] gap-5 border-b py-6 last:border-b-0"
              >
                <div className="border-rule text-ink-soft flex h-[34px] w-[34px] items-center justify-center rounded-full border font-mono text-[0.95rem] font-bold">
                  {e.n}
                </div>
                <div>
                  <h3 className="font-body mb-1 text-[1.05rem] font-bold">{e.t}</h3>
                  <p className="text-ink-soft text-[0.96rem]">{e.d}</p>
                </div>
              </div>
            ))}
          </div>
        </Wrap>
      </Section>

      {/* ================= ENTREGÁVEIS ================= */}
      <Section className="bg-paper-deep border-rule border-t">
        <Wrap className="reveal">
          <DocLabel>O que fica com você</DocLabel>
          <h2 className="mt-3 max-w-[30ch] text-[clamp(1.5rem,2.4vw,2rem)]">
            Ao final, você não depende mais de mim pra se organizar
          </h2>
          <div className="stagger border-rule bg-rule mt-9 grid gap-px border sm:grid-cols-2 md:grid-cols-3">
            {entregaveis.map((e) => (
              <div key={e.idx} className="bg-paper-deep px-6 py-7">
                <div className="text-ink-soft mb-3.5 flex items-center gap-2.5 font-mono text-[0.78rem]">
                  <span className="border-rule bg-paper flex h-8 w-8 shrink-0 items-center justify-center rounded-[3px] border">
                    <e.icon className="h-[17px] w-[17px]" strokeWidth={1.6} aria-hidden="true" />
                  </span>
                  <span>{e.idx}</span>
                </div>
                <h3 className="mb-1.5 text-[1rem] font-bold">{e.t}</h3>
                <p className="text-ink-soft text-[0.9rem]">{e.d}</p>
              </div>
            ))}
          </div>
        </Wrap>
      </Section>


      {/* ================= DEPOIMENTOS ================= */}
      <Depoimentos />

      {/* ================= COMPARAÇÃO ================= */}
      <Section className="bg-paper-deep border-rule border-y">
        <Wrap className="reveal">
          <DocLabel className="text-center">Por que não um curso?</DocLabel>
          <h2 className="mx-auto mt-3 mb-10 max-w-[28ch] text-center text-[clamp(1.5rem,2.4vw,2rem)]">
            Curso ensina um método. Consultoria olha para a sua realidade.
          </h2>
          <div className="stagger grid gap-4 md:grid-cols-2">
            <div className="border-rule bg-paper rounded-md border p-8 hover-lift">
              <h3 className="font-body text-ink-soft mb-4 text-[1.02rem] font-bold">
                Um curso qualquer
              </h3>
              <ul>
                {[
                  "Mesmo conteúdo pra milhares de pessoas",
                  "Você assiste sozinha e aplica sozinha",
                  "Sem ajuste pra sua realidade",
                  "Ninguém acompanha se você travou",
                ].map((i) => (
                  <li
                    key={i}
                    className="border-rule-soft flex items-start gap-2.5 border-b py-2.5 text-[0.96rem] last:border-b-0"
                  >
                    <X className="text-debit mt-1 h-4 w-4 shrink-0" />
                    {i}
                  </li>
                ))}
              </ul>
            </div>
            <div className="border-credit bg-paper rounded-md border p-8 hover-lift">
              <h3 className="font-body text-credit mb-4 text-[1.02rem] font-bold">
                A consultoria individual
              </h3>
              <ul>
                {[
                  "Plano construído a partir da sua renda, gastos e objetivos",
                  "Acompanhamento direto comigo, sessão a sessão",
                  "Estratégia ajustada conforme você avança",
                  "Suporte pra tirar dúvidas entre os encontros",
                ].map((i) => (
                  <li
                    key={i}
                    className="border-rule-soft flex items-start gap-2.5 border-b py-2.5 text-[0.96rem] last:border-b-0"
                  >
                    <Check className="text-credit mt-1 h-4 w-4 shrink-0" />
                    {i}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Wrap>
      </Section>

      {/* ================= FAQ ================= */}
      <Section>
        <Wrap className="reveal">
          <DocLabel className="text-center">Antes de decidir</DocLabel>
          <h2 className="mt-3 text-center text-[clamp(1.4rem,2.2vw,1.9rem)]">
            Perguntas que toda cliente faz
          </h2>
          <div className="mx-auto mt-10 max-w-[760px]">
            {faq.map((f) => (
              <div key={f.q} className="border-rule-soft border-b py-7 first:pt-0 last:border-b-0">
                <div className="mb-2 flex items-baseline gap-3">
                  <span className="text-debit font-mono text-[0.85rem] font-bold">P.</span>
                  <span className="font-body text-[1.02rem] font-bold">{f.q}</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-credit font-mono text-[0.85rem] font-bold">R.</span>
                  <span className="text-ink-soft text-[0.98rem]">{f.a}</span>
                </div>
              </div>
            ))}
          </div>
        </Wrap>
      </Section>

      {/* ================= INVESTIMENTO ================= */}
      <Section className="bg-paper-deep border-rule border-t">
        <Wrap className="reveal">
          <DocLabel>Investimento</DocLabel>
          <h2 className="mt-3 text-[clamp(1.5rem,2.4vw,2rem)]">
            Um investimento em três meses. Uma mudança que fica.
          </h2>
          <div className="border-rule bg-paper mx-auto mt-9 max-w-[620px] rounded-md border p-8 hover-lift">
            <div className="text-ink-soft border-rule-soft doc-label mb-5 border-b pb-4">
              extrato · consultoria financeira individual
            </div>
            <div className="flex flex-col">
              <LedgerLine label="Diagnóstico financeiro completo" value="incluso" tone="credit" />
              <LedgerLine
                label="5 sessões individuais, 1h30, quinzenais"
                value="incluso"
                tone="credit"
              />
              <LedgerLine label="Suporte via WhatsApp entre sessões" value="incluso" tone="credit" />
              <LedgerLine label="Planilha, e-books e plano de ação" value="incluso" tone="credit" />
            </div>
            <div className="border-ink mt-6 border-t-2 pt-5">
              <div className="flex items-baseline gap-2.5">
                <span className="doc-label text-ink-soft">Investimento</span>
                <span className="leader-dots" />
                <span className="font-mono text-[0.85rem] font-semibold tracking-wide whitespace-nowrap text-ink">
                  sob consulta
                </span>
              </div>
              <p className="text-ink-soft mt-3 max-w-[50ch] text-[0.95rem]">
                Os valores são combinados direto no WhatsApp, conforme o seu momento e o que você
                precisa. Me conte como estão suas finanças hoje e a gente fecha as condições
                juntas — sem compromisso.
              </p>
            </div>
            <p className="text-ink-soft my-5 text-center font-mono text-[0.8rem]">
              apenas 12 vagas por mês
            </p>
            <Btn href={WHATSAPP_VALORES} full>
              <WhatsappIcon /> Mandar mensagem e combinar valores
            </Btn>
          </div>
        </Wrap>
      </Section>

      {/* ================= COMO COMEÇA ================= */}
      <Section>
        <Wrap className="reveal">
          <h2 className="text-[clamp(1.5rem,2.4vw,2rem)]">Como funciona a partir de agora</h2>
          <div className="mt-9 grid gap-6 md:grid-cols-3">
            {[
              {
                n: "1",
                e: "💬",
                t: "Chame no WhatsApp",
                d: "Você entra em contato e confirma sua vaga do mês.",
              },
              {
                n: "2",
                e: "📝",
                t: "Preencha o diagnóstico",
                d: "Você recebe um link com o formulário de diagnóstico financeiro.",
              },
              {
                n: "3",
                e: "🗓️",
                t: "Agende sua 1ª sessão",
                d: "Com o diagnóstico em mãos, marcamos o primeiro encontro.",
              },
            ].map((s) => (
              <div key={s.n} className="border-rule border-t pt-5">
                <div className="mb-2 flex items-center gap-2.5">
                  <span
                    aria-hidden="true"
                    className="border-rule bg-paper grid h-[32px] w-[32px] shrink-0 place-items-center rounded-[3px] text-[1rem] leading-none"
                  >
                    {s.e}
                  </span>
                  <div className="text-ink-soft font-mono text-[0.85rem] font-bold">
                    0{s.n}
                  </div>
                </div>
                <h3 className="mb-1.5 text-[1.05rem] font-bold">{s.t}</h3>
                <p className="text-ink-soft text-[0.95rem]">{s.d}</p>
              </div>
            ))}
          </div>
        </Wrap>
      </Section>

      {/* ================= CTA FINAL ================= */}
      <Section className="bg-ink text-paper relative overflow-hidden">
        {/* A foto vira o fundo: Rosa encostada à direita, texto sobre o azul. */}
        <img
          src="/images/rosa-cta-background.webp"
          alt="Rosa consultando o celular na sala de estar"
          loading="lazy"
          className="absolute inset-0 hidden h-full w-full object-cover object-right md:block"
        />
        <div className="from-ink via-ink/85 to-transparent absolute inset-0 hidden bg-gradient-to-r from-0% via-45% to-80% md:block" />
        <Wrap className="reveal relative">
          <div className="md:max-w-[52%] lg:max-w-[48%]">
            <h2 className="text-paper max-w-[24ch] text-[clamp(1.5rem,2.4vw,2.05rem)]">
              Chega de administrar sua vida financeira sozinha.
            </h2>
            <p className="text-cream-dim my-6 max-w-[52ch] text-[1.02rem]">
              Você já tentou fazer isso com planilha, aplicativo e força de vontade. Agora é hora de
              ter alguém do seu lado, olhando pra sua realidade — não pra uma fórmula genérica.
            </p>
            <Btn href={WHATSAPP_URL} variant="paper" className="btn-pulse">
              <WhatsappIcon /> Falar com a Rosa no WhatsApp
            </Btn>
          </div>
        </Wrap>
        {/* No celular, a foto entra como faixa embaixo do texto, sem cobrir a leitura. */}
        <div className="relative -mb-[6.5vw] h-[290px] overflow-hidden md:hidden">
          <img
            src="/images/rosa-cta-background.webp"
            alt="Rosa consultando o celular na sala de estar"
            loading="lazy"
            className="absolute top-0 left-1/2 h-full w-auto max-w-none -translate-x-[73%]"
          />
          <div className="from-ink to-transparent absolute inset-x-0 top-0 h-16 bg-gradient-to-b" />
        </div>
      </Section>

      <footer className="bg-ink text-cream-dim border-t border-paper/15 pb-24 md:pb-10 pt-10">
        <Wrap>
          <div className="font-display text-paper text-[1.3rem] font-bold">Rosa</div>
          <p className="font-mono text-[0.78rem]">
            consultoria financeira individual · atendimento 100% online
          </p>
        </Wrap>
      </footer>

      {/* CTA fixo mobile */}
      <div className="bg-ink border-paper/15 fixed inset-x-0 bottom-0 z-50 border-t p-3 md:hidden">
        <Btn href={WHATSAPP_URL} variant="paper" full>
          <WhatsappIcon /> Falar no WhatsApp
        </Btn>
      </div>
    </main>
  );
}
