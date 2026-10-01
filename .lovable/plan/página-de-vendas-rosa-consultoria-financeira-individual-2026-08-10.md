# Página de vendas — Rosa, Consultoria Financeira Individual

Vou construir a página do arquivo HTML enviado como a página inicial do app (rota `/`), fiel ao layout e ao texto originais.

## Direção visual (mantida do arquivo)
- Estética de "documento contábil": papel creme, tinta azul-marinho, linhas de razão com pontilhado (rótulo ····· valor).
- Tipografia: Fraunces (títulos), Karla (corpo), IBM Plex Mono (rótulos e números), carregadas via `<link>` no root.
- Cores e raio convertidos para tokens semânticos em `src/styles.css` (formato oklch), sem cores fixas nos componentes.

## Seções, na mesma ordem
1. Hero — headline, subtítulo, CTA WhatsApp, nota de resposta, 3 estatísticas (17 anos / 35+ mulheres / 3 meses) + foto.
2. "Isso soa familiar?" — bloco escuro com 4 linhas de razão.
3. Citação da Rosa com foto.
4. Autoridade — 17 anos no Sicoob, formações, bloco de citação, razão com credenciais.
5. Transformação — cartões Débito·antes / Crédito·depois.
6. Metodologia — 4 fatos + 6 etapas (0 a 5).
7. Entregáveis — grade de 6 cartões.
8. Casos — 2 cartões (Maria, Fernanda).
9. Comparação curso × consultoria.
10. FAQ — 3 perguntas.
11. Investimento — cartão "extrato" com itens inclusos, total R$ 997 (ou 12x R$ 99,70), 12 vagas, CTA.
12. Como começa — 3 passos.
13. CTA final escuro com foto + rodapé + CTA fixo de WhatsApp no mobile.

## Decisões que estou tomando
- Removo a faixa vermelha de "rascunho interno — não publicar ainda" (nota de trabalho, não conteúdo da página).
- Mantenho o trecho de citação marcado como "a validar", mas sem o rótulo interno "trecho a validar com a rosa".
- WhatsApp: uso o número presente no arquivo (55 38 99207-6061) em todos os CTAs. Se houver outro, é troca de uma linha.
- As 4 fotos (`assets/rosa-*.png`) não vieram no upload: gero imagens de retrato coerentes com a paleta como stand-in. Se você enviar as fotos reais da Rosa, substituo.

## Detalhes técnicos
- Rota `/` reescrita em `src/routes/index.tsx`, com seções em componentes separados sob `src/components/rosa/`.
- Tokens de cor/tipografia/raio em `src/styles.css` (`@theme inline` + `:root`).
- Ícones via `lucide-react` (WhatsApp/check/x/seta) em vez da fonte Tabler remota.
- Animação de reveal no scroll com IntersectionObserver, respeitando `prefers-reduced-motion`.
- `head()` da rota com título, description, og:title/og:description em português; JSON-LD de Service; H1 único.
