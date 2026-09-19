# Status da implementação do redesign GTAP

> **CONCLUÍDO** — home, páginas internas (Open, Galeria, álbum, 404) e QA finalizados.
> Resumo completo, comparação e pendências em [ENTREGA.md](ENTREGA.md).

_Atualizado durante a execução. Marca o que está feito, verificado e pendente._

## Fundação (feito)
- `src/styles/global.css` — tokens (azul/dourado), tipografia (Bricolage Grotesque display + Plus Jakarta Sans), `.container`, `.btn`, superfícies, `[data-reveal]`, foco, reduced-motion, skip-link.
- `src/styles/reset.css` — **correção crítica**: removido `height:100%`+`overflow-x:hidden` do body (quebrava a rolagem da janela); agora `html{overflow-x:clip}`.
- `index.html` — fontes trocadas (Bricolage Grotesque + Plus Jakarta Sans).
- `src/data/event.js` — EVENT, ACTIONS (WhatsApp), NAV_ITEMS, LEGACY_HASH, `adaptLandingData()` (traduz type 0/1/2/3/5/6/7).
- `src/hooks/useReveal.js` — `useReveal({deps})` (IntersectionObserver, reobserva após fetch) + `useReducedMotion()`.

## Primeiro pacote (feito + verificado desktop 1440 e mobile 390)
- **Header** `components/Navbar` — responsivo, estável (sem wheel), transparente→sólido, drawer mobile acessível (aria-expanded, Escape, foco, scroll-lock, todos os destinos). `NavbarMobile` legado não é mais usado.
- **Hero** `components/Banner` — camadas mídia/scrim/glow/grafismo; lettering "No centro da / Reforma / Tributária"; data/local; CTAs; funciona sem vídeo; mobile alinhado à esquerda com CTAs full-width.
- **Barra de conversão** `components/CardButton` — surge após o hero (IO), lote vigente (R$ 4.290 / Terceiro Lote), some com drawer/diálogo, compacta no mobile.
- **Palestrantes** `Sections/SectionPalestrantes` + `components/ModalPalestrante` — grid 3/2/1, retratos 4:5 `<img>`, diálogo de bio acessível (portal, focus trap, Escape+restauração de foco verificados, prev/next, socials).
- **Investimento** `Sections/SectionInvestimentos` — superfície dourada, card dominante (lote atual) + painel de grupos + timeline de lotes legível (sem blur). Copy comercial honesta (WhatsApp, sem cobrança automática).
- **LandingPage** — `<main id="conteudo">`, mapeamento de hash legado (#preços→#investimento), fetch com AbortController.

## Baseline técnico
- Lint: erros preexistentes documentados em F0; novos arquivos sem erros (1 warning corrigido).
- Build passava no baseline; revalidar ao fim.

## Pendente (F3 home + F5 internas + F6 QA)
- Rebuild seções: SectionPublico (instituições/prova), SectionTemas, SectionAtuacao (para quem é / manifesto), SectionGaleria, SectionDepoimentos (vídeo sob demanda), SectionLocal (mapa sob demanda), SectionIdealizador (Open), SectionForms (estados acessíveis), Footer.
- Páginas: OpenPage, GaleriaPage, GaleriaEdition (+ lightbox, URLs legadas), 404.
- QA final: build/lint, reduced-motion, teclado, larguras extras, comparação anotada.

## Decisões cromáticas/tipográficas
- Azul profundo no lugar do roxo da referência; dourado no lugar do laranja (hipótese do plano, registrar com cliente). Display: Bricolage Grotesque. Diferença deliberada de paleta declarada.
