import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useRef, useState } from "react";

import { DocLabel, WHATSAPP_URL, WhatsappIcon, Wrap } from "@/components/rosa/primitives";
import {
  archetypeText,
  beliefScale,
  beliefs,
  blocks,
  levels,
  receitaFaixas,
} from "@/lib/diagnostico-data";
import { salvarDiagnostico } from "@/lib/diagnostico.functions";
import { cn } from "@/lib/utils";

const TITLE = "Diagnóstico Financeiro Gratuito — Rosa, Consultora Financeira";
const DESCRIPTION =
  "17 perguntas, 3 minutos. Receba uma leitura da sua relação com o dinheiro hoje — e o que fazer a partir daqui.";

export const Route = createFileRoute("/diagnosticofinanceiro")({
  head: () => ({
    meta: [
      { title: "Diagnóstico Financeiro Gratuito Online — Descubra seu Score | Finanças RM" },
      {
        name: "description",
        content:
          "Faça grátis o diagnóstico financeiro da Rosa: 17 perguntas, 3 minutos. Receba seu score de saúde financeira de 0 a 100 e saiba como sair das dívidas e começar a guardar dinheiro.",
      },
      {
        name: "keywords",
        content:
          "diagnóstico financeiro, diagnóstico financeiro gratuito, teste de saúde financeira, score financeiro, avaliação financeira pessoal, quiz finanças pessoais, como organizar minhas finanças, estou endividada o que fazer, consultoria financeira",
      },
      { name: "robots", content: "index, follow, max-image-preview:large" },
      { property: "og:title", content: "Diagnóstico Financeiro Gratuito — Rosa, Consultora Financeira" },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://financasrm.com.br/diagnosticofinanceiro" },
      { property: "og:image", content: "https://financasrm.com.br/og-home.jpg" },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: "https://financasrm.com.br/og-home.jpg" },
    ],
    links: [{ rel: "canonical", href: "https://financasrm.com.br/diagnosticofinanceiro" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: "Diagnóstico Financeiro — Finanças RM",
          url: "https://financasrm.com.br/diagnosticofinanceiro",
          applicationCategory: "FinanceApplication",
          operatingSystem: "Web",
          inLanguage: "pt-BR",
          offers: { "@type": "Offer", price: "0", priceCurrency: "BRL" },
          description: DESCRIPTION,
          provider: { "@type": "Person", name: "Rosa", jobTitle: "Consultora financeira" },
        }),
      },
    ],
  }),
  component: DiagnosticoPage,
});

/* -------------------------------- componente ------------------------------- */

const allQuestions = blocks.flatMap((b) => b.questions);
const MAX = allQuestions.length * 3;

/** etapas: 0 = contato, 1..3 = blocos, 4 = crenças, 5 = resultado */
const TOTAL_STEPS = 5;

function maskPhone(raw: string) {
  const d = raw.replace(/\D/g, "").slice(0, 11);
  if (d.length <= 2) return d;
  if (d.length <= 6) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
  if (d.length <= 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`;
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
}

function DiagnosticoPage() {
  const [step, setStep] = useState(0);
  const [nome, setNome] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [receita, setReceita] = useState("");
  const [contactError, setContactError] = useState<string | null>(null);

  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [beliefAnswers, setBeliefAnswers] = useState<Record<string, number>>({});
  const [submitted, setSubmitted] = useState(false);
  const topRef = useRef<HTMLDivElement>(null);

  const score = useMemo(() => {
    const sum = allQuestions.reduce((acc, q) => acc + (answers[q.id] ?? 0), 0);
    return Math.round((sum / MAX) * 100);
  }, [answers]);

  const level = useMemo(
    () => [...levels].reverse().find((l) => score >= l.min) ?? levels[0]!,
    [score],
  );

  const archetype = useMemo(() => {
    let best = beliefs[0]!;
    let bestValue = -1;
    beliefs.forEach((b) => {
      const v = beliefAnswers[b.id] ?? 0;
      if (v > bestValue) {
        bestValue = v;
        best = b;
      }
    });
    return archetypeText[best.archetype]!;
  }, [beliefAnswers]);

  const progress = Math.round((Math.min(step, TOTAL_STEPS) / TOTAL_STEPS) * 100);

  function scrollTop() {
    requestAnimationFrame(() => {
      topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }

  function missingInStep(s: number) {
    if (s === 0) return 0;
    if (s >= 1 && s <= 3) {
      const qs = blocks[s - 1]!.questions;
      return qs.filter((q) => answers[q.id] === undefined).length;
    }
    return beliefs.filter((b) => beliefAnswers[b.id] === undefined).length;
  }

  function validateContact() {
    if (nome.trim().length < 2) return "Digite seu nome.";
    if (whatsapp.replace(/\D/g, "").length < 10) return "Digite um WhatsApp válido com DDD.";
    if (!receita) return "Escolha a faixa da sua receita média.";
    return null;
  }

  function next() {
    if (step === 0) {
      const err = validateContact();
      setContactError(err);
      if (err) return;
    } else if (missingInStep(step) > 0) {
      return;
    }

    if (step === TOTAL_STEPS - 1) {
      void salvarDiagnostico({
        data: {
          nome: nome.trim(),
          whatsapp: whatsapp.trim(),
          receitaMedia: receita,
          score,
          nivel: level.name,
          arquetipo: archetype.name,
          respostas: { ...answers, ...beliefAnswers },
        },
      }).catch(() => {});
      setSubmitted(true);
      setStep(TOTAL_STEPS);
    } else {
      setStep(step + 1);
    }
    scrollTop();
  }

  function back() {
    if (step === 0) return;
    setStep(step - 1);
    scrollTop();
  }

  function restart() {
    setAnswers({});
    setBeliefAnswers({});
    setNome("");
    setWhatsapp("");
    setReceita("");
    setSubmitted(false);
    setStep(0);
    scrollTop();
  }

  const missing = missingInStep(step);

  return (
    <main className="min-h-screen bg-paper-deep py-[5vw]">
      <Wrap className="max-w-[820px] px-[4vw]">
        <div
          ref={topRef}
          className="border border-rule bg-paper shadow-[0_2px_28px_rgba(24,19,15,0.08)]"
        >
          {/* header */}
          <header className="border-b-[3px] border-ink px-[6vw] pt-[5vw] pb-[3.5vw] sm:px-10">
            <DocLabel className="mb-3">Rosa · Consultoria Financeira</DocLabel>
            <h1 className="max-w-[22ch] text-[clamp(1.8rem,4vw,2.5rem)] text-ink">
              Diagnóstico Financeiro
            </h1>
            <p className="mt-4 max-w-[56ch] text-ink-soft">
              17 perguntas, 3 minutos. No fim você recebe um resultado — não um número solto, mas
              uma leitura da sua relação com o dinheiro hoje, e o que fazer a partir daqui.
            </p>
          </header>

          {/* progresso */}
          <div className="sticky top-0 z-10 border-b border-rule-soft bg-paper">
            <div className="h-[4px] w-full bg-rule">
              <div
                className="h-full bg-ink transition-[width] duration-500 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="flex items-center justify-between px-[6vw] py-2.5 sm:px-10">
              <span className="doc-label text-ink-soft">
                {submitted ? "Concluído" : `Etapa ${step + 1} de ${TOTAL_STEPS}`}
              </span>
              <div className="flex gap-1.5">
                {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
                  <span
                    key={i}
                    className={cn(
                      "h-[7px] w-[7px] rounded-full transition-colors duration-300",
                      i < step || submitted ? "bg-ink" : i === step ? "bg-ink/50" : "bg-rule",
                    )}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* etapas */}
          {!submitted && (
            <div key={step} className="animate-in fade-in slide-in-from-bottom-3 duration-500">
              {step === 0 && (
                <section className="px-[6vw] py-[4vw] sm:px-10">
                  <BlockHead
                    n="00"
                    label="Seus dados"
                    title="Antes de começar"
                    why="Para eu te enviar a leitura do seu resultado e falar com você no WhatsApp."
                  />
                  <div className="space-y-6">
                    <Field label="Seu nome">
                      <input
                        value={nome}
                        onChange={(e) => setNome(e.target.value.slice(0, 80))}
                        placeholder="Como você quer ser chamada"
                        className="w-full rounded-md border border-rule-soft bg-paper px-4 py-3 text-ink transition-colors outline-none focus:border-ink"
                      />
                    </Field>
                    <Field label="WhatsApp (com DDD)">
                      <input
                        value={whatsapp}
                        onChange={(e) => setWhatsapp(maskPhone(e.target.value))}
                        inputMode="tel"
                        placeholder="(11) 91234-5678"
                        className="w-full rounded-md border border-rule-soft bg-paper px-4 py-3 font-mono text-ink transition-colors outline-none focus:border-ink"
                      />
                    </Field>
                    <QuestionField
                      legend="Qual foi a sua receita média nos últimos 3 meses?"
                      name="receita"
                      options={receitaFaixas.map((f) => ({ label: f, value: f }))}
                      value={receita}
                      onChange={(v) => setReceita(v)}
                    />
                  </div>
                  {contactError && (
                    <p className="mt-5 animate-in fade-in font-mono text-[0.8rem] text-debit">
                      {contactError}
                    </p>
                  )}
                </section>
              )}

              {step >= 1 && step <= 3 && (
                <section className="px-[6vw] py-[4vw] sm:px-10">
                  {(() => {
                    const block = blocks[step - 1]!;
                    return (
                      <>
                        <BlockHead
                          n={block.n}
                          label={block.label}
                          title={block.title}
                          why={block.why}
                        />
                        <div className="space-y-8">
                          {block.questions.map((q) => (
                            <QuestionField
                              key={q.id}
                              legend={q.legend}
                              options={q.options}
                              name={q.id}
                              value={answers[q.id]}
                              onChange={(v) => setAnswers((s) => ({ ...s, [q.id]: v }))}
                            />
                          ))}
                        </div>
                      </>
                    );
                  })()}
                </section>
              )}

              {step === 4 && (
                <section className="px-[6vw] py-[4vw] sm:px-10">
                  <BlockHead
                    n="04"
                    label="Crença de origem"
                    title="De onde vem o seu padrão"
                    why="Quatro frases. Marque o quanto cada uma soa como você — sem pensar demais."
                  />
                  <div className="space-y-8">
                    {beliefs.map((b) => (
                      <QuestionField
                        key={b.id}
                        legend={b.legend}
                        options={beliefScale}
                        name={b.id}
                        value={beliefAnswers[b.id]}
                        onChange={(v) => setBeliefAnswers((s) => ({ ...s, [b.id]: v }))}
                      />
                    ))}
                  </div>
                </section>
              )}

              {/* navegação */}
              <div className="flex flex-wrap items-center justify-between gap-4 border-t border-rule-soft px-[6vw] py-[3.5vw] sm:px-10">
                <button
                  type="button"
                  onClick={back}
                  disabled={step === 0}
                  className={cn(
                    "rounded-md border border-rule px-5 py-2.5 font-mono text-[0.78rem] text-ink-soft transition-colors",
                    step === 0
                      ? "cursor-not-allowed opacity-35"
                      : "hover:border-ink hover:text-ink",
                  )}
                >
                  Voltar
                </button>
                <div className="flex items-center gap-4">
                  <span className="font-mono text-[0.75rem] tracking-wide text-ink-soft uppercase">
                    {step === 0
                      ? ""
                      : missing > 0
                        ? `Faltam ${missing} ${missing === 1 ? "resposta" : "respostas"}`
                        : "Etapa completa"}
                  </span>
                  <button
                    type="button"
                    onClick={next}
                    disabled={step > 0 && missing > 0}
                    className={cn(
                      "doc-label rounded-md border border-ink bg-ink px-8 py-3.5 text-paper transition-all duration-200",
                      step > 0 && missing > 0
                        ? "cursor-not-allowed opacity-40"
                        : "hover:bg-ink-hover hover:-translate-y-[1px]",
                    )}
                  >
                    {step === TOTAL_STEPS - 1 ? "Ver meu resultado" : "Continuar"}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* resultado */}
          {submitted && (
            <div className="animate-in fade-in duration-700 border-t-[3px] border-ink">
              <section className="border-b border-rule-soft bg-paper-deep px-[6vw] py-[4.5vw] sm:px-10">
                <DocLabel className="mb-2">Seu resultado</DocLabel>
                <h2 className="text-[clamp(1.5rem,3.4vw,2rem)] text-ink">{level.name}</h2>

                <div className="mt-10">
                  <div className="relative flex h-[14px] overflow-visible rounded-full border border-rule bg-paper">
                    <div className="h-full w-[36%] rounded-l-full bg-score-critical" />
                    <div className="h-full w-[25%] bg-score-warning" />
                    <div className="h-full w-[23%] bg-score-building" />
                    <div className="h-full w-[16%] rounded-r-full bg-score-healthy" />
                    <div
                      className="absolute -top-[9px] h-[32px] w-[2px] transition-[left] duration-700 ease-out"
                      style={{ left: `${score}%`, backgroundColor: level.color }}
                    >
                      <span
                        className="tabular absolute -top-6 left-1/2 -translate-x-1/2 font-mono text-[0.8rem] font-bold whitespace-nowrap"
                        style={{ color: level.color }}
                      >
                        {score}
                      </span>
                    </div>
                  </div>
                  <div className="mt-2 flex justify-between font-mono text-[0.7rem] text-ink-soft">
                    <span>0</span>
                    <span>25</span>
                    <span>50</span>
                    <span>75</span>
                    <span>100</span>
                  </div>
                </div>

                <p className="mt-6 max-w-[58ch] text-ink">{level.text}</p>
              </section>

              <div className="px-[6vw] py-[3vw] sm:px-10">
                <div
                  className={cn(
                    "rounded-md border-l-4 p-6",
                    level.ctaTone === "urgent" && "border-l-ink bg-ink text-paper",
                    level.ctaTone === "warn" && "border-l-ink bg-paper-deep",
                    level.ctaTone === "calm" && "border-l-rule bg-paper-deep",
                    level.ctaTone === "good" && "border-l-ink/40 bg-paper-deep",
                  )}
                >
                  <DocLabel tone={level.ctaTone === "urgent" ? "dark" : "default"} className="mb-2">
                    {level.ctaLabel}
                  </DocLabel>
                  <p className="mb-5 max-w-[56ch]">{level.ctaText}</p>
                  <a
                    href={WHATSAPP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                      "inline-flex items-center gap-2 rounded-md border px-6 py-3.5 text-[0.95rem] font-bold transition-colors",
                      level.ctaTone === "urgent"
                        ? "border-paper bg-paper text-ink hover:bg-paper-hover"
                        : "border-ink bg-ink text-paper hover:bg-ink-hover",
                    )}
                  >
                    <WhatsappIcon />
                    {level.ctaBtn}
                  </a>
                </div>
              </div>

              <section className="border-y border-rule-soft px-[6vw] py-[3.5vw] sm:px-10">
                <DocLabel className="mb-2">O que move suas decisões</DocLabel>
                <h3 className="mb-2 text-[1.2rem] text-ink">{archetype.name}</h3>
                <p className="max-w-[58ch] text-ink-soft">{archetype.text}</p>
              </section>

              <div className="px-[6vw] py-[4vw] text-center sm:px-10">
                <p className="mx-auto max-w-[50ch] text-[0.85rem] text-ink-soft">
                  Este resultado é uma leitura inicial, não um diagnóstico clínico ou financeiro
                  completo — serve para abrir a conversa certa, não para substituí-la.
                </p>
                <button
                  type="button"
                  onClick={restart}
                  className="mt-4 rounded-md border border-rule px-5 py-2.5 font-mono text-[0.78rem] text-ink-soft transition-colors hover:border-ink hover:text-ink"
                >
                  Refazer o diagnóstico
                </button>
              </div>
            </div>
          )}
        </div>
      </Wrap>
    </main>
  );
}

function BlockHead({ n, label, title, why }: { n: string; label: string; title: string; why: string }) {
  return (
    <div className="mb-8">
      <div className="doc-label mb-3 flex items-center gap-3 text-ink-soft">
        <span className="text-ink">{n}</span>
        <span>{label}</span>
        <span className="leader-dots" />
      </div>
      <h2 className="text-[1.35rem] text-ink">{title}</h2>
      <p className="mt-1 max-w-[56ch] text-[0.93rem] text-ink-soft">{why}</p>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-2 block font-medium text-ink">{label}</span>
      {children}
    </label>
  );
}

function QuestionField<T extends string | number>({
  legend,
  options,
  name,
  value,
  onChange,
}: {
  legend: string;
  options: { label: string; value: T }[];
  name: string;
  value: T | undefined;
  onChange: (v: T) => void;
}) {
  return (
    <fieldset>
      <legend className="mb-3 max-w-[58ch] font-medium text-ink">{legend}</legend>
      <div className="flex flex-col gap-2">
        {options.map((opt) => {
          const checked = value === opt.value;
          return (
            <label
              key={opt.label}
              className={cn(
                "flex cursor-pointer items-center gap-3 rounded-md border px-4 py-3 text-[0.93rem] transition-all duration-200",
                checked
                  ? "border-ink bg-paper-deep font-semibold text-ink"
                  : "border-rule-soft bg-paper hover:border-ink hover:translate-x-[2px]",
              )}
            >
              <input
                type="radio"
                name={name}
                checked={checked}
                onChange={() => onChange(opt.value)}
                className="h-4 w-4 shrink-0 accent-[var(--ink)]"
              />
              <span>{opt.label}</span>
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}
