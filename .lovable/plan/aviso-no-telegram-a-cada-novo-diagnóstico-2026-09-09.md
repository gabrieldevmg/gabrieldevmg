# Aviso no Telegram a cada novo diagnóstico

Sempre que alguém finalizar o diagnóstico em `/diagnosticofinanceiro`, você recebe uma mensagem no Telegram com o resumo e um link para abrir o painel.

## Como vai funcionar para você

1. Você cria um bot no Telegram (leva 1 minuto, pelo próprio app do Telegram, falando com o "BotFather"). Eu te guio passo a passo.
2. Eu conecto esse bot ao site.
3. Você manda um "/start" para o seu bot. Isso avisa o site quem deve receber os alertas — nada de configurar números ou códigos manualmente.
4. Pronto: a partir daí, cada diagnóstico enviado gera uma mensagem assim:

```text
Novo diagnóstico

Nome: Maria Silva
WhatsApp: (11) 91234-5678
Receita média: R$ 5.000 a R$ 10.000
Score: 36 — Zona de atenção
Perfil: [arquétipo]

Abrir painel: https://financasrm.com.br/admindig
```

Com botões diretos: "Falar no WhatsApp" (já com a mensagem personalizada do score) e "Abrir painel".

## Observações importantes

- O WhatsApp não permite esse tipo de aviso automático sem uma conta comercial verificada e custo por mensagem — por isso o Telegram é a via gratuita e instantânea que você escolheu.
- Se o envio do aviso falhar por qualquer motivo, o diagnóstico continua sendo salvo normalmente no painel. O aviso nunca bloqueia o formulário.
- Mais de uma pessoa pode receber os alertas: basta cada uma mandar "/start" para o bot.

## Detalhes técnicos

- Conectar o conector Telegram do Lovable (`standard_connectors--connect`); as chamadas vão pelo gateway com `LOVABLE_API_KEY` + `TELEGRAM_API_KEY`, sem token de bot no código.
- Nova tabela `public.telegram_assinantes` (`chat_id bigint primary key`, `nome text`, `created_at`), com GRANTs apenas para `service_role`, RLS habilitada e nenhuma policy pública (acesso só pelo servidor).
- Nova rota pública `src/routes/api/public/telegram/webhook.ts`: valida o header `X-Telegram-Bot-Api-Secret-Token` (derivado por SHA-256 de `telegram-webhook:$TELEGRAM_API_KEY`), e em `/start` faz upsert do `chat_id` e responde uma confirmação. `/stop` remove o registro.
- Registrar o webhook via `setWebhook` no gateway, apontando para `https://project--abc405bd-0fcf-4d61-a62e-564f27239f74-dev.lovable.app/api/public/telegram/webhook`.
- Novo helper server-only `src/lib/telegram.server.ts` com `notificarNovoDiagnostico(lead)`: busca os `chat_id` ativos e envia `sendMessage` (`parse_mode: HTML`, `reply_markup` com os dois links). Erros são apenas logados.
- `salvarDiagnostico` em `src/lib/diagnostico.functions.ts` passa a chamar esse helper depois do insert, dentro de `try/catch`, importado dinamicamente no handler.
- Nenhuma mudança na interface do formulário nem do `/admindig`.
