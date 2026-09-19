# F0 — Baseline e análise da referência

> Registrado em 18/09/2026 (data do ambiente). Executor: sessão de implementação (Claude Code / Opus).
> Esta nota separa **observado** (inspecionado) de **decisão** (proposta desta implementação).

## 1. Baseline do repositório (verificado)

- Branch: `main`, alinhada com `origin/main`.
- Alterações preexistentes preservadas: `README.md` (modificado) e `docs/` (novo, contém o plano). Não serão revertidas.
- Runtime: Node v22.23.2 / npm 10.9.8. `npm ci` instalou pelo lockfile (exit 0).
- **Build baseline:** `npm run build` ✅ passa (~650 ms). Bundle: JS 323 KB (100 KB gzip), CSS 129 KB (18 KB gzip). Asset pesado: `bannergaleria.webp` 484 KB.
- **Lint baseline:** `npm run lint` ❌ 10 erros + 1 aviso — **todos preexistentes**:
  - `Slider.jsx` `lazy` não usado; `SectionAtuacao.jsx` whitespace irregular; `SectionDepoimentos.jsx` bloco vazio; `SectionIdealizador.jsx` whitespace irregular (×4); `SectionTemas.jsx` `urlVideo` não usado; `SectionOpen.jsx` aviso exhaustive-deps; `vite.config.js` `__dirname` undef.
  - Meta: não introduzir novos erros; reduzir os preexistentes quando o arquivo for reescrito.

## 2. Conteúdo real confirmado (fonte: `public/api/landing_page.json` + código)

- **Evento:** 08 e 09 de outubro de 2026, Salvador, Centro de Convenções Deville Prime. (Dado do projeto; pendente confirmação comercial — ver plano §5.2.)
- **Palestrantes (type 0), 6 com retrato real:** Alexandre Marques (CEO Open), Bernard Appy (Ex-Secretário Extraordinário da Reforma Tributária), Vanessa Canado (Assessora Especial), Eduardo Tanaka (Auditor-Fiscal RFB), Gustavo Reis (Consultor Open), Arick Farias (Consultor Open). Retratos em `gtap.com.br/midias/Palestrantes/*`.
- **Temas (type 1):** 7 temas sobre Reforma Tributária / IBS / CBS.
- **Instituições (type 2):** ~30 logos (BNDS, CNJ, DPE PR, Eletrobras, Embasa, GOV BA, IFBA/IFES/IFGO/IFSP, INEMA, MPBA, MPSE, PGE RJ, SAEB, SEBRAE, SENAC, SESI, TCE PR, TCU, TJPR, TRE ES, TRF2, UESC, SEFAZ MT, TRT CE...).
- **Depoimentos (type 3), 5 vídeos:** Alex Diego (DNIT-BA), Josenubia (GOINFRA), Edno de Paula (PGE-RJ), Raimundo Donato (GOINFRA), Valmir Tosta (SEFAZ-BA).
- **Clientes (type 5):** STF, AGU, TSE (compartilhado com a Open).
- **Vídeo hero (type 6):** `banner-gt-abertura.mp4`.
- **Local (type 7):** Farol de Itapuã, Farol da Barra.
- **Lotes (`useLoteAtual.js`):** L1 R$ 3.690 (out/25–abr/26), L2 R$ 3.990 (mai–jun/26), L3 R$ 4.290 (jul–out/26). Em 18/09/2026 o **Lote 3 (R$ 4.290,00)** está vigente.

## 3. Referência (gramadosummit.com) — versão pública 2027, inspecionada 18/09/2026

Composição **renderizada** observada (desktop 1440 e mobile 375), não só HTML:

- **Preloader** de marca (brackets `< >` laranja + logo) antes do reveal.
- **Header:** logo à esquerda; links leves à direita (desktop). Fundo transparente sobre o hero.
- **Hero:** lettering de campanha gigante ("MADE IN BRASIL") em fonte display própria, cor creme, sobre roxo profundo `#510345` com textura/vídeo sutil; marca laranja integrada ao fim da palavra; linha fina de data/local ("5 a 7 de Maio de 2027 | Serra Park, Gramado, RS"); 3 CTAs em cápsula (1 preenchido + 2 contornados).
- **Manifesto:** lettering gigante ("SOTAQUE BRASILEIRO, MOVIMENTO, ALMA COLETIVA") + botão play circular; muito respiro.
- **Números/prova:** superfície laranja `#FC8802`; números gigantes ("24,000", "500") em roxo profundo; fotos com cantos arredondados **rotacionadas/skew**; grafismo diagonal e watermark de logo.
- **Palestrantes ("NOSSOS PALCOS"):** fundo escuro com bloom quente; título à direita com watermark atrás; **retratos grandes 4:5, cantos arredondados (~28px), 3 colunas**; nome em fonte display abaixo + cargo/bio em sans pequeno.
- **Mídia:** logos de imprensa em cards brancos sobre faixa roxa.
- **Ingressos:** superfície laranja; título gigante "INGRESSO"; **card dominante roxo (Full Pass)** + card secundário laranja tint (Networking Pass); CTAs em cápsula; watermark de logo atrás.
- **Rodapé:** gradiente quente (pôr-do-sol), logo "19 ANOS", colunas NAVEGUE/SOCIAL/NEWSLETTER, lettering "MADE IN BRASIL", "Esse site foi feito por pessoas."
- **Mobile:** composição própria — logo centralizado, nav em texto que quebra em linhas, lettering gigante alinhado à esquerda, CTAs em cápsula full-width empilhados, WhatsApp flutuante.

Não realizados (fora de escopo/risco): compra, envio de formulário, medição quadro a quadro de animações.

## 4. Decisões desta implementação (proposto)

- **Tradução cromática (hipótese do plano, ainda não aprovada pelo cliente):** azul profundo GTAP no lugar do roxo; dourado no lugar do laranja. Superfícies alternadas: azul imersivo ↔ dourado quente ↔ claro técnico. Registrada como diferença deliberada na comparação (não é igualdade de pixels).
- **Tipografia:** display **Archivo** (700–900) para lettering de campanha e títulos; corpo/UI **Plus Jakarta Sans** (400–700). Substitui Roboto Condensed/Raleway. Fontes via Google Fonts com `display=swap` e pesos limitados. Não reutilizar a fonte própria da referência.
- **Detalhe memorável GTAP:** lettering de campanha grande com uma palavra em dourado + grafismo derivado da marca (não copiar o símbolo do Gramado Summit).
- **Stack mantida:** React 19 / Vite 6 / Router 7 / JS. Motion com CSS + IntersectionObserver.
