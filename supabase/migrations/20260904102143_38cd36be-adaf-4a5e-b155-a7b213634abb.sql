CREATE TABLE public.diagnosticos (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  nome TEXT NOT NULL,
  whatsapp TEXT NOT NULL,
  receita_media TEXT NOT NULL,
  score INTEGER NOT NULL,
  nivel TEXT NOT NULL,
  arquetipo TEXT NOT NULL,
  respostas JSONB NOT NULL DEFAULT '{}'::jsonb
);

GRANT ALL ON public.diagnosticos TO service_role;

ALTER TABLE public.diagnosticos ENABLE ROW LEVEL SECURITY;