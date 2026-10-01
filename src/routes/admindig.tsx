import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { Download, Lock, Trash2, X } from "lucide-react";

import { DocLabel, WhatsappIcon, Wrap } from "@/components/rosa/primitives";
import { beliefScale, beliefs, blocks } from "@/lib/diagnostico-data";
import { excluirDiagnostico, listarDiagnosticos } from "@/lib/diagnostico.functions";
import { toCSV, waLink, type DiagnosticoLead } from "@/lib/diagnostico-store";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/admindig")({
  head: () => ({
    meta: [
      { title: "Painel de Diagnósticos — Rosa" },
      { name: "description", content: "Painel interno dos diagnósticos financeiros recebidos." },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AdminPage,
});

const questionIndex = new Map<string, { legend: string; options: string[] }>();
blocks.forEach((b) =>
  b.questions.forEach((q) =>
    questionIndex.set(q.id, { legend: q.legend, options: q.options.map((o) => o.label) }),
  ),
);
beliefs.forEach((b) =>
  questionIndex.set(b.id, { legend: b.legend, options: beliefScale.map((o) => o.label) }),
);

function AdminPage() {
  const [unlocked, setUnlocked] = useState(false);
  const [senha, setSenha] = useState("");
  const [loading, setLoading] = useState(false);
  const [pass, setPass] = useState("");
  const [error, setError] = useState(false);
  const [leads, setLeads] = useState<DiagnosticoLead[]>([]);
  const [open, setOpen] = useState<DiagnosticoLead | null>(null);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const saved = window.sessionStorage.getItem("rosa:admin");
    if (saved) {
      setSenha(saved);
      setUnlocked(true);
    }
  }, []);

  async function refresh(pwd: string) {
    setLoading(true);
    try {
      setLeads(await listarDiagnosticos({ data: { senha: pwd } }));
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (unlocked && senha) void refresh(senha);
  }, [unlocked, senha]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return leads;
    return leads.filter(
      (l) =>
        l.nome.toLowerCase().includes(q) ||
        l.whatsapp.includes(q) ||
        l.nivel.toLowerCase().includes(q),
    );
  }, [leads, query]);

  async function unlock(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const rows = await listarDiagnosticos({ data: { senha: pass } });
      window.sessionStorage.setItem("rosa:admin", pass);
      setSenha(pass);
      setLeads(rows);
      setUnlocked(true);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  }

  function download() {
    const blob = new Blob(["\uFEFF" + toCSV(leads)], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `diagnosticos-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  async function remove(id: string) {
    await excluirDiagnostico({ data: { senha, id } });
    setOpen(null);
    await refresh(senha);
  }

  if (!unlocked) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-paper-deep px-6">
        <form
          onSubmit={(e) => void unlock(e)}
          className="w-full max-w-[380px] animate-in fade-in slide-in-from-bottom-3 border border-rule bg-paper p-8 shadow-[0_2px_28px_rgba(24,19,15,0.08)] duration-500"
        >
          <Lock className="mb-4 h-5 w-5 text-ink" />
          <DocLabel className="mb-2">Área restrita</DocLabel>
          <h1 className="mb-5 text-[1.4rem] text-ink">Painel de diagnósticos</h1>
          <input
            type="password"
            value={pass}
            onChange={(e) => {
              setPass(e.target.value);
              setError(false);
            }}
            placeholder="Senha"
            autoComplete="current-password"
            className="w-full rounded-md border border-rule-soft bg-paper px-4 py-3 font-mono text-ink outline-none focus:border-ink"
          />
          {error && <p className="mt-3 font-mono text-[0.78rem] text-debit">Senha incorreta.</p>}
          <button
            type="submit"
            className="doc-label mt-5 w-full rounded-md border border-ink bg-ink px-6 py-3.5 text-paper transition-colors hover:bg-ink-hover"
          >
            {loading ? "Verificando…" : "Entrar"}
          </button>
        </form>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-paper-deep py-[4vw]">
      <Wrap className="max-w-[1000px] px-[4vw]">
        <div className="border border-rule bg-paper shadow-[0_2px_28px_rgba(24,19,15,0.08)]">
          <header className="flex flex-wrap items-end justify-between gap-4 border-b-[3px] border-ink px-[4vw] py-[3vw] sm:px-9">
            <div>
              <DocLabel className="mb-2">Rosa · Painel interno</DocLabel>
              <h1 className="text-[clamp(1.5rem,3vw,2rem)] text-ink">Diagnósticos recebidos</h1>
              <p className="mt-1 font-mono text-[0.78rem] text-ink-soft">
                {leads.length} {leads.length === 1 ? "registro" : "registros"}
              </p>
            </div>
            <button
              type="button"
              onClick={download}
              disabled={leads.length === 0}
              className={cn(
                "inline-flex items-center gap-2 rounded-md border border-ink px-5 py-3 font-mono text-[0.78rem] font-semibold tracking-wide uppercase transition-colors",
                leads.length === 0
                  ? "cursor-not-allowed opacity-40"
                  : "bg-ink text-paper hover:bg-ink-hover",
              )}
            >
              <Download className="h-4 w-4" />
              Baixar CSV
            </button>
          </header>

          <div className="border-b border-rule-soft px-[4vw] py-4 sm:px-9">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar por nome, WhatsApp ou nível…"
              className="w-full rounded-md border border-rule-soft bg-paper px-4 py-2.5 text-[0.92rem] text-ink outline-none focus:border-ink"
            />
          </div>

          {filtered.length === 0 ? (
            <p className="px-[4vw] py-[6vw] text-center text-ink-soft sm:px-9">
              {loading ? "Carregando…" : "Nenhum diagnóstico por aqui ainda."}
            </p>
          ) : (
            <ul className="divide-y divide-rule-soft">
              {filtered.map((l) => (
                <li
                  key={l.id}
                  className="flex flex-wrap items-center gap-4 px-[4vw] py-4 transition-colors hover:bg-paper-deep/60 sm:px-9"
                >
                  <div className="min-w-[160px] flex-1">
                    <p className="font-semibold text-ink">{l.nome}</p>
                    <p className="font-mono text-[0.78rem] text-ink-soft">
                      {l.whatsapp} · {new Date(l.createdAt).toLocaleString("pt-BR")}
                    </p>
                  </div>
                  <div className="min-w-[130px]">
                    <p className="font-mono text-[0.78rem] text-ink-soft">Receita média</p>
                    <p className="text-[0.9rem] text-ink">{l.receitaMedia}</p>
                  </div>
                  <div className="w-[86px] text-center">
                    <p className="tabular font-mono text-[1.35rem] font-bold text-ink">{l.score}</p>
                    <p className="font-mono text-[0.68rem] text-ink-soft">{l.nivel}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <a
                      href={waLink(l)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-md border border-ink bg-ink px-4 py-2.5 text-[0.85rem] font-bold text-paper transition-colors hover:bg-ink-hover"
                    >
                      <WhatsappIcon />
                      WhatsApp
                    </a>
                    <button
                      type="button"
                      onClick={() => setOpen(l)}
                      className="rounded-md border border-rule px-4 py-2.5 font-mono text-[0.78rem] text-ink-soft transition-colors hover:border-ink hover:text-ink"
                    >
                      Ver respostas
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <p className="mt-4 text-center font-mono text-[0.72rem] text-ink-soft">
          Os dados ficam salvos no banco da nuvem — acessíveis de qualquer dispositivo.
        </p>
      </Wrap>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-ink/60 p-4 animate-in fade-in duration-200 sm:p-8"
          onClick={() => setOpen(null)}
        >
          <div
            className="w-full max-w-[640px] animate-in fade-in slide-in-from-bottom-4 border border-rule bg-paper duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            <header className="flex items-start justify-between gap-4 border-b-[3px] border-ink px-6 py-5">
              <div>
                <DocLabel className="mb-1">Diagnóstico</DocLabel>
                <h2 className="text-[1.3rem] text-ink">{open.nome}</h2>
                <p className="font-mono text-[0.78rem] text-ink-soft">
                  {open.whatsapp} · {new Date(open.createdAt).toLocaleString("pt-BR")}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setOpen(null)}
                aria-label="Fechar"
                className="rounded-md border border-rule p-2 text-ink-soft transition-colors hover:border-ink hover:text-ink"
              >
                <X className="h-4 w-4" />
              </button>
            </header>

            <div className="grid grid-cols-2 gap-4 border-b border-rule-soft bg-paper-deep px-6 py-5 sm:grid-cols-4">
              <Stat label="Score" value={String(open.score)} />
              <Stat label="Nível" value={open.nivel} />
              <Stat label="Receita média 3m" value={open.receitaMedia} />
              <Stat label="Padrão" value={open.arquetipo} />
            </div>

            <div className="space-y-5 px-6 py-6">
              {Object.entries(open.respostas).map(([id, val]) => {
                const q = questionIndex.get(id);
                return (
                  <div key={id}>
                    <p className="text-[0.92rem] font-medium text-ink">{q?.legend ?? id}</p>
                    <p className="mt-1 font-mono text-[0.82rem] text-ink-soft">
                      {q?.options[val] ?? val} · {val}/3
                    </p>
                  </div>
                );
              })}
            </div>

            <footer className="flex flex-wrap items-center justify-between gap-3 border-t border-rule-soft px-6 py-5">
              <a
                href={waLink(open)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-md border border-ink bg-ink px-5 py-3 text-[0.9rem] font-bold text-paper transition-colors hover:bg-ink-hover"
              >
                <WhatsappIcon />
                Falar no WhatsApp
              </a>
              <button
                type="button"
                onClick={() => void remove(open.id)}
                className="inline-flex items-center gap-2 rounded-md border border-rule px-4 py-2.5 font-mono text-[0.78rem] text-ink-soft transition-colors hover:border-debit hover:text-debit"
              >
                <Trash2 className="h-4 w-4" />
                Excluir
              </button>
            </footer>
          </div>
        </div>
      )}
    </main>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="font-mono text-[0.68rem] tracking-wide text-ink-soft uppercase">{label}</p>
      <p className="text-[0.95rem] font-semibold text-ink">{value}</p>
    </div>
  );
}
