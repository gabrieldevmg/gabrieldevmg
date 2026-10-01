import { useRef, useState } from "react";

import { DocLabel, Section, Wrap } from "@/components/rosa/primitives";

type Depoimento = {
  pre: string;
  destaque: string;
  pos: string;
};

const depoimentos: Depoimento[] = [
  {
    pre: "É maravilhoso, você conseguiu me ajudar a ",
    destaque: "ver os números com respeito e amor",
    pos: ", sem medo de gastar, e gastar com respeito. Eu sou muito grata, obrigada, obrigada, obrigada!",
  },
  {
    pre: "Minha planilha está indo a mil! Estou muito feliz. O fato dela ser simples e objetiva tem me ajudado a ser constante nos lançamentos: ",
    destaque: "13 dias certíssimos",
    pos: ".",
  },
  {
    pre: "",
    destaque: "Nome quase limpo! 5 dias",
    pos: ", eu nem tô acreditando. Muito obrigada, Rosa! Por todo acompanhamento, por toda paciência, todo comprometimento comigo e, claro, por todo seu profissionalismo e disposição de ajudar pessoas como eu, que estava toda enrolada! Gratidão!",
  },
  {
    pre: "Rosa, quero te agradecer pela sua entrega e direcionamento que me deu através da consultoria financeira. Há tempos eu já sabia que precisava olhar com mais profundidade pra isso, mas confesso que tinha medo. Mesmo já tendo mudado muito a minha mentalidade e até os meus padrões financeiros, ainda faltava a parte prática, a postura real e prática de mudança que se consolidou com seu trabalho. E, a propósito, ",
    destaque: "os investimentos estão a todo vapor",
    pos: "!",
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
          Mensagens que chegaram pelo WhatsApp.
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
              <blockquote className="grow text-[1rem] leading-[1.62]">
                &ldquo;{d.pre}
                <b className="bg-paper-deep text-credit box-decoration-clone rounded-[2px] px-1 font-bold">
                  {d.destaque}
                </b>
                {d.pos}&rdquo;
              </blockquote>
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
