import { DocLabel, Section, Wrap } from "@/components/rosa/primitives";

type Depoimento = {
  img: string;
  w: number;
  h: number;
  alt: string;
};

const depoimentos: Depoimento[] = [
  {
    img: "/images/depoimento-1.webp",
    w: 1282,
    h: 1111,
    alt: "Print de WhatsApp: cliente agradece por ajudá-la a ver os números com respeito e amor, sem medo de gastar.",
  },
  {
    img: "/images/depoimento-2.webp",
    w: 1217,
    h: 869,
    alt: "Print de WhatsApp: cliente conta que a planilha está indo a mil e que está constante nos lançamentos há 13 dias.",
  },
  {
    img: "/images/depoimento-3.webp",
    w: 1292,
    h: 1211,
    alt: "Print de WhatsApp: cliente comemora que o nome está quase limpo em 5 dias e agradece o acompanhamento.",
  },
  {
    img: "/images/depoimento-4.webp",
    w: 1215,
    h: 1009,
    alt: "Print de WhatsApp: cliente agradece a consultoria financeira e conta que os investimentos estão a todo vapor.",
  },
];

export function Depoimentos() {
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
      </Wrap>

      <div className="marquee mt-9" role="region" aria-label="Depoimentos de clientes">
        <div className="marquee-track">
          {[0, 1].map((copia) => (
            <div key={copia} className="flex shrink-0" aria-hidden={copia === 1}>
              {depoimentos.map((d) => (
                <img
                  key={d.img}
                  src={d.img}
                  alt={copia === 0 ? d.alt : ""}
                  width={d.w}
                  height={d.h}
                  loading="lazy"
                  draggable={false}
                  className="border-rule mr-5 h-auto w-[78vw] max-w-[340px] self-center rounded-md border md:w-[400px] md:max-w-none"
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
