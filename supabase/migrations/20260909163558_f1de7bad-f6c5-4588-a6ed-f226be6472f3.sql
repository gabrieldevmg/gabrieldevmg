CREATE TABLE public.telegram_assinantes (
  chat_id bigint PRIMARY KEY,
  nome text,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

GRANT ALL ON public.telegram_assinantes TO service_role;

ALTER TABLE public.telegram_assinantes ENABLE ROW LEVEL SECURITY;