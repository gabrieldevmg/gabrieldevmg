import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

import type { DiagnosticoLead } from "./diagnostico-store";

const leadSchema = z.object({
  nome: z.string().min(2).max(120),
  whatsapp: z.string().min(8).max(40),
  receitaMedia: z.string().min(1).max(80),
  score: z.number().int().min(0).max(100),
  nivel: z.string().min(1).max(80),
  arquetipo: z.string().min(1).max(120),
  respostas: z.record(z.string(), z.number().int().min(0).max(10)),
});

type Row = {
  id: string;
  created_at: string;
  nome: string;
  whatsapp: string;
  receita_media: string;
  score: number;
  nivel: string;
  arquetipo: string;
  respostas: Record<string, number>;
};

function toLead(row: Row): DiagnosticoLead {
  return {
    id: row.id,
    createdAt: row.created_at,
    nome: row.nome,
    whatsapp: row.whatsapp,
    receitaMedia: row.receita_media,
    score: row.score,
    nivel: row.nivel,
    arquetipo: row.arquetipo,
    respostas: row.respostas ?? {},
  };
}

function checkPassword(senha: string) {
  const expected = process.env["ADMIN_DIG_PASSWORD"];
  if (!expected || senha !== expected) throw new Error("Senha incorreta.");
}

export const salvarDiagnostico = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => leadSchema.parse(input))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin.from("diagnosticos").insert({
      nome: data.nome,
      whatsapp: data.whatsapp,
      receita_media: data.receitaMedia,
      score: data.score,
      nivel: data.nivel,
      arquetipo: data.arquetipo,
      respostas: data.respostas,
    });
    if (error) throw new Error(error.message);

    try {
      const { notificarNovoDiagnostico } = await import("@/lib/telegram.server");
      await notificarNovoDiagnostico({
        nome: data.nome,
        whatsapp: data.whatsapp,
        receitaMedia: data.receitaMedia,
        score: data.score,
        nivel: data.nivel,
        arquetipo: data.arquetipo,
      });
    } catch (e) {
      console.error("Telegram: falha ao notificar novo diagnóstico", e);
    }

    return { ok: true as const };
  });

export const listarDiagnosticos = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => z.object({ senha: z.string().min(1) }).parse(input))
  .handler(async ({ data }) => {
    checkPassword(data.senha);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: rows, error } = await supabaseAdmin
      .from("diagnosticos")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) throw new Error(error.message);
    return ((rows ?? []) as Row[]).map(toLead);
  });

export const excluirDiagnostico = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) =>
    z.object({ senha: z.string().min(1), id: z.string().uuid() }).parse(input),
  )
  .handler(async ({ data }) => {
    checkPassword(data.senha);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin.from("diagnosticos").delete().eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true as const };
  });
