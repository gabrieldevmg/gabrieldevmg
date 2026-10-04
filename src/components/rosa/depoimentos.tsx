import { useRef, useState } from "react";

import { DocLabel, Section, Wrap } from "@/components/rosa/primitives";

type Depoimento = {
  resultado: string;
  img: string;
  w: number;
  h: number;
  alt: string;
};

const depoimentos: Depoimento[] = [
  {
    resultado: "Ver os números com respeito",
    img: "/images/depoimento-1.webp",
    w: 1282,
    h: 1111,
    alt: "Print de WhatsApp: cliente agradece por ajudá-la a ver os números com respeito e amor, sem medo de gastar.",
  },
  {
    resultado: "13 dias de planilha em dia",
    img: "/images/depoimento-2.webp",
    w: 1217,
    h: 869,
    alt: "Print de WhatsApp: cliente conta que a planilha está indo a mil e que está constante nos lançamentos há 13 dias.",
  },
  {
    resultado: "Nome quase limpo em 5 dias",
    img: "/images/depoimento-3.webp",
    w: 1292,
    h: 1211,
    alt: "Print de WhatsApp: cliente comemora que o nome está quase limpo em 5 dias e agradece o acompanhamento.",
  },
  {
    resultado: "Investimentos a todo vapor",
    img: "/images/depoimento-4.webp",
    w: 1215,
    h: 1009,
    alt: "Print de WhatsApp: cliente agradece a consultoria financeira e conta que os investimentos estão a todo vapor.",
  },
];

const GAP = 16;

export function Depoimentos() {
  const scroller = useRef<HTMLDivElement>(null);
  const [ativo, setAtivo] = useState(0);

  const passo = () => {
    const el = scroller.current;
    const primeiro = el?.firstElementChild as HTMLElement | null;
    if (!el || !primeiro) return 0;
    return primeiro.offsetWidth + GAP;
  };

  const irPara = (i: number) => {
    const el = scroller.current;
    if (!el) return;
    el.scrollTo({ left: i * passo(), behavior: "smooth" });
  };

  const aoRolar = () => {
    const el = scroller.current;
    if (!el) return;
    const p = passo();
    if (!p) return;
    setAtivo(Math.min(depoimentos.length - 1, Math.max(0, Math.round(el.scrollLeft / p))));
  };

  return (
    <Section>
      <Wrap className="reveal">
        <DocLabel className="text-center">Depoimentos</DocLabel>
        <h2 className="mt-3 text-center text-[clamp(1.5rem,2.4vw,2rem)]">
          O que dizem as clientes
        </h2>
        <p className="text-ink-soft mx-auto mt-4 max-w-[46ch] text-center text-[0.98rem]">
          Mensagens reais, direto do WhatsApp.
        </p>

        <div
          ref={scroller}
          onScroll={aoRolar}
          className="no-scrollbar -mx-[6vw] mt-9 flex snap-x snap-mandatory scroll-pl-[6vw] gap-4 overflow-x-auto overscroll-x-contain px-[6vw] pb-1 md:mx-0 md:grid md:grid-cols-2 md:gap-5 md:overflow-visible md:px-0"
        >
          {depoimentos.map((d, i) => (
            <figure
              key={i}
              className="border-rule bg-paper flex min-w-[82%] snap-start flex-col rounded-md border p-7 md:min-w-0"
            >
              <div className="text-ink-soft mb-3.5 font-mono text-[0.78rem]">
                {String(i + 1).padStart(2, "0")}
              </div>
              <h3 className="font-display text-credit mb-4 text-[1.2rem] leading-snug font-semibold">
                {d.resultado}
              </h3>
              <img
                src={d.img}
                alt={d.alt}
                width={d.w}
                height={d.h}
                loading="lazy"
                className="border-rule-soft h-auto w-full grow-0 rounded-md border"
              />
              <figcaption className="border-rule-soft mt-5 flex items-baseline gap-2.5 border-t pt-4">
                <span className="doc-label text-ink-soft">Cliente da consultoria</span>
                <span className="leader-dots" />
              </figcaption>
            </figure>
          ))}
        </div>

        <div className="mt-6 flex justify-center gap-2.5 md:hidden">
          {depoimentos.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => irPara(i)}
              aria-label={`Ver depoimento ${i + 1}`}
              aria-current={ativo === i}
              className={
                "h-2 rounded-full transition-all " +
                (ativo === i ? "bg-ink w-6" : "bg-rule w-2")
              }
            />
          ))}
        </div>
      </Wrap>
    </Section>
  );
}
