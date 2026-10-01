/**
 * Armazenamento local dos diagnósticos (temporário, no navegador).
 * Quando o Lovable Cloud for ativado, este módulo passa a chamar o banco.
 */

export type DiagnosticoLead = {
  id: string;
  createdAt: string;
  nome: string;
  whatsapp: string;
  receitaMedia: string;
  score: number;
  nivel: string;
  arquetipo: string;
  respostas: Record<string, number>;
};

const KEY = "rosa:diagnosticos";

function isBrowser() {
  return typeof window !== "undefined";
}

export function listLeads(): DiagnosticoLead[] {
  if (!isBrowser()) return [];
  try {
    const raw = window.localStorage.getItem(KEY);
    const parsed = raw ? (JSON.parse(raw) as DiagnosticoLead[]) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveLead(lead: Omit<DiagnosticoLead, "id" | "createdAt">): DiagnosticoLead {
  const full: DiagnosticoLead = {
    ...lead,
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    createdAt: new Date().toISOString(),
  };
  if (!isBrowser()) return full;
  const all = [full, ...listLeads()];
  window.localStorage.setItem(KEY, JSON.stringify(all));
  return full;
}

export function deleteLead(id: string) {
  if (!isBrowser()) return;
  window.localStorage.setItem(KEY, JSON.stringify(listLeads().filter((l) => l.id !== id)));
}

/** Normaliza para o formato E.164 brasileiro usado pelo wa.me */
export function waNumber(whatsapp: string) {
  const digits = whatsapp.replace(/\D/g, "");
  if (digits.startsWith("55")) return digits;
  return `55${digits}`;
}

export function waLink(lead: Pick<DiagnosticoLead, "whatsapp" | "score" | "nome">) {
  const msg = `Oi ${lead.nome.split(" ")[0] ?? ""}, vi aqui seu diagnóstico e o score deu ${lead.score}, quero te conhecer um pouco melhor`;
  return `https://wa.me/+${waNumber(lead.whatsapp)}?text=${encodeURIComponent(msg)}`;
}

export function toCSV(leads: DiagnosticoLead[]) {
  const cols = [
    "data",
    "nome",
    "whatsapp",
    "receita_media_3m",
    "score",
    "nivel",
    "arquetipo",
  ];
  const esc = (v: string) => `"${v.replace(/"/g, '""')}"`;
  const rows = leads.map((l) =>
    [
      new Date(l.createdAt).toLocaleString("pt-BR"),
      l.nome,
      l.whatsapp,
      l.receitaMedia,
      String(l.score),
      l.nivel,
      l.arquetipo,
    ]
      .map(esc)
      .join(","),
  );
  return [cols.join(","), ...rows].join("\n");
}
