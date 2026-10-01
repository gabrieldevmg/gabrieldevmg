import { createFileRoute } from "@tanstack/react-router";
import { createHash, timingSafeEqual } from "crypto";

function deriveSecret(telegramApiKey: string) {
  return createHash("sha256").update(`telegram-webhook:${telegramApiKey}`).digest("base64url");
}

function safeEqual(a: string, b: string) {
  const left = Buffer.from(a);
  const right = Buffer.from(b);
  return left.length === right.length && timingSafeEqual(left, right);
}

type Update = {
  update_id?: number;
  message?: {
    chat?: { id?: number };
    from?: { first_name?: string };
    text?: string;
  };
};

export const Route = createFileRoute("/api/public/telegram/webhook")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const telegramKey = process.env["TELEGRAM_API_KEY"];
        if (!telegramKey) return new Response("Not configured", { status: 500 });

        const provided = request.headers.get("X-Telegram-Bot-Api-Secret-Token") ?? "";
        if (!safeEqual(provided, deriveSecret(telegramKey))) {
          return new Response("Unauthorized", { status: 401 });
        }

        const update = (await request.json()) as Update;
        const chatId = update.message?.chat?.id;
        const text = (update.message?.text ?? "").trim().toLowerCase();
        if (!chatId) return Response.json({ ok: true, ignored: true });

        const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
        const { enviarMensagemTelegram } = await import("@/lib/telegram.server");

        if (text.startsWith("/start")) {
          const { error } = await supabaseAdmin
            .from("telegram_assinantes")
            .upsert(
              { chat_id: chatId, nome: update.message?.from?.first_name ?? null },
              { onConflict: "chat_id" },
            );
          if (error) console.error(`Telegram: falha ao salvar assinante: ${error.message}`);
          await enviarMensagemTelegram(
            chatId,
            "Pronto! Você vai receber aqui um aviso a cada novo diagnóstico financeiro preenchido no site. Envie /stop para parar.",
          );
          return Response.json({ ok: true });
        }

        if (text.startsWith("/stop")) {
          const { error } = await supabaseAdmin
            .from("telegram_assinantes")
            .delete()
            .eq("chat_id", chatId);
          if (error) console.error(`Telegram: falha ao remover assinante: ${error.message}`);
          await enviarMensagemTelegram(chatId, "Ok, não vou mais te avisar. Envie /start para voltar.");
          return Response.json({ ok: true });
        }

        await enviarMensagemTelegram(
          chatId,
          "Envie /start para receber os avisos de novos diagnósticos, ou /stop para parar.",
        );
        return Response.json({ ok: true });
      },
    },
  },
});
