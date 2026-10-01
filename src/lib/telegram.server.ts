const GATEWAY_URL = "https://connector-gateway.lovable.dev/telegram";

export type NovoDiagnostico = {
  nome: string;
  whatsapp: string;
  receitaMedia: string;
  score: number;
  nivel: string;
  arquetipo: string;
};

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function whatsappLink(whatsapp: string, score: number) {
  const digits = whatsapp.replace(/\D/g, "");
  const phone = digits.startsWith("55") ? digits : `55${digits}`;
  const msg = `Oi, vi aqui seu diagnostico e o score deu ${score}, quero te conhecer um pouco melhor`;
  return `https://wa.me/${phone}?text=${encodeURIComponent(msg)}`;
}

async function gateway(method: string, body: unknown) {
  const lovableKey = process.env["LOVABLE_API_KEY"];
  const telegramKey = process.env["TELEGRAM_API_KEY"];
  if (!lovableKey || !telegramKey) {
    console.error("Telegram: credenciais ausentes (LOVABLE_API_KEY/TELEGRAM_API_KEY)");
    return null;
  }
  const response = await fetch(`${GATEWAY_URL}/${method}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${lovableKey}`,
      "X-Connection-Api-Key": telegramKey,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  if (!response.ok) {
    const errorBody = await response.text();
    console.error(`Telegram ${method} falhou [${response.status}]: ${errorBody}`);
    return null;
  }
  const json = (await response.json()) as { ok?: boolean; error_code?: number; description?: string };
  if (json.ok === false) {
    console.error(`Telegram ${method} retornou erro: ${json.description ?? "desconhecido"}`);
    return null;
  }
  return json;
}

export async function enviarMensagemTelegram(
  chatId: number,
  text: string,
  replyMarkup?: unknown,
) {
  return gateway("sendMessage", {
    chat_id: chatId,
    text,
    parse_mode: "HTML",
    disable_web_page_preview: true,
    ...(replyMarkup ? { reply_markup: replyMarkup } : {}),
  });
}

export async function notificarNovoDiagnostico(lead: NovoDiagnostico) {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  const { data: assinantes, error } = await supabaseAdmin
    .from("telegram_assinantes")
    .select("chat_id");

  if (error) {
    console.error(`Telegram: falha ao ler assinantes: ${error.message}`);
    return;
  }
  if (!assinantes || assinantes.length === 0) return;

  const painel = "https://financasrm.com.br/admindig";
  const text = [
    "<b>Novo diagnóstico</b>",
    "",
    `<b>Nome:</b> ${escapeHtml(lead.nome)}`,
    `<b>WhatsApp:</b> ${escapeHtml(lead.whatsapp)}`,
    `<b>Receita média:</b> ${escapeHtml(lead.receitaMedia)}`,
    `<b>Score:</b> ${lead.score} — ${escapeHtml(lead.nivel)}`,
    `<b>Perfil:</b> ${escapeHtml(lead.arquetipo)}`,
  ].join("\n");

  const replyMarkup = {
    inline_keyboard: [
      [{ text: "Falar no WhatsApp", url: whatsappLink(lead.whatsapp, lead.score) }],
      [{ text: "Abrir painel", url: painel }],
    ],
  };

  await Promise.all(
    assinantes.map((a) =>
      enviarMensagemTelegram(Number(a.chat_id), text, replyMarkup).catch((e: unknown) => {
        console.error("Telegram: falha ao notificar", e);
        return null;
      }),
    ),
  );
}
