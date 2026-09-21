# Entrega do redesign GTAP — resumo, comparação e verificações

> **Revisão 2 (18/09/2026, noite):** após revisão do cliente, a estética foi refeita a partir do
> protótipo Figma "GTAP 2026" (node 5148:1588 + loading 5132:120). Direção vigente:
> **Bebas Neue** (display, caixa alta) + **Roboto Condensed** (corpo); superfícies **azul #02093A**,
> **amarelo #FFC743** (Temas) e **dourado #DDA92E** (Ingressos); blocos chapados com raios 40/80 px;
> fotos reais exportadas do Figma em `src/assets/figma/` (WebP otimizado). Ordem da home: Hero →
> Vídeo → Temas → Palestrantes → Galeria (mosaico) → Depoimentos → Ingressos → Local → Contato →
> Rodapé, mais tela de loading. Barra flutuante e seções "instituições/para quem é/idealizador"
> foram retiradas por não existirem no protótipo. As seções abaixo descrevem a revisão 1; os
> critérios de verificação continuam válidos.
>
> **Revisão 2.1 — defeito crítico corrigido:** o sistema de reveal escondia o conteúdo
> (`opacity:0`) até o IntersectionObserver disparar, e no painel do app isso deixava seções
> inteiras vazias ao rolar (foi o que fez o site parecer "diferente do Figma"). Agora o conteúdo é
> visível por padrão; a animação é aditiva (observer + fallback por scroll) e nunca esconde nada de
> forma permanente. Também alinhados ao Figma: pílula contornada da data no hero, foto dos Temas no
> topo do título, entradas por linha no título (como na referência), parallax leve e fotos com
> leve rotação na entrada.
>
> **Revisão 2.2 — movimento e seções restantes:** referência inspecionada no navegador
> (Webflow + GSAP/SplitText/ScrollTrigger; preloader com brackets e logo; transições de 0,36 s).
> Aplicado: rolagem suave com **Lenis** (`useSmoothScroll`, respeita reduced-motion, pausa com
> diálogos, âncoras com offset do header); **tela de loading do Figma** (peças do logo entram em
> sequência, cortina sobe ao carregar, hero só anima depois); hovers/transições em botões (brilho),
> cards de palestrantes/depoimentos/ingressos, linhas dos temas, fotos; **Depoimentos** no padrão
> Palestrantes, **Localização** no padrão Vídeo (mapa sob demanda dentro da moldura + pílula), e
> **Contato** no padrão Temas/Ingressos (card azul r80 com formulário).
>
> **Revisão 2.3 — referência aplicada à navegação, mídia, transições e subpáginas:** header some ao
> sair do hero e vira **barra flutuante** (logo, atalhos, "Garantir ingresso"); seção Vídeo com o
> **vídeo real** rodando mudo na moldura (play abre com som); Depoimentos com o **frame real** de cada
> vídeo como pôster; **transição de rota** com a mesma cortina/logo do loading; **fundos animados**
> (ondas/sol abstratos de Salvador sobre o azul, `BgWaves`, estáticos com reduced-motion); títulos
> entrando **palavra a palavra** (`SplitWords`) e fotos com "wipe"; subpáginas **Galeria, Álbum, 404 e
> Open** refeitas no padrão da home (azul + Salvador 15% + ondas → amarelo com cards r40).
>
> **Revisão 2.4 (19/09/2026) — fundos de palmeiras e revisão comparativa "definitiva":** as
> ondas foram descartadas ("artificiais"). A referência usa um **vídeo de palmeiras desfocado**
> (`blur ~14px`, 60 %) sobre a cor da marca; reproduzido em `BgWaves` com **coroas de coqueiro em
> SVG** (frondes com folíolos caídos, gradiente dourado, ancoradas nos cantos), camada com
> `blur(13px)` + 78 %, balanço por fronde (SMIL, desligado com reduced-motion), bloom de sol e grão
> fino. Da comparação seção a seção com gramadosummit.com: **CTAs no hero** ("Garantir ingresso" +
> "Conheça os temas", como os 3 pills da referência), **faixa marquee de instituições** (logos reais
> type 2/5, pausa no hover, lista rolável com reduced-motion) no lugar da faixa de mídia, **lettering
> gigante contornado no rodapé** ("X GTAP · Salvador 2026", como o "Made in Brasil"), formulário em
> **card branco**, Depoimentos em **carrossel de uma linha** (snap + arrasto + setas), Galeria como
> **mosaico vivo** (troca aleatória com crossfade + Ken Burns) e fotos dos Temas com **tilt 3D**
> (perspectiva + brilho seguindo o cursor). Correções: pôsteres dos depoimentos (servidor sem
> byte-range → captura por reprodução muda em fila, só após `load` e com aba visível), cortina de
> loading com teto de 6 s e remoção real do DOM ao terminar, link do hero sem recarregar a página.
> Não adicionados por falta de dados reais: seção de números/contadores e faixa "na mídia".
>
> **Revisão 2.5 (19/09/2026) — ajustes do cliente:** linha de data/local do hero vira **texto puro**
> (caixa alta espaçada com pontos amarelos; a pílula parecia botão); palmeiras também nas **seções
> amarelas** (`BgWaves tone="navy"`: sombras de coqueiro em azul a 15 % + luz branca — Temas,
> Ingressos, Contato, Galeria, Álbum, Open); **microinterações**: botões magnéticos (`useMagnetic`,
> ±10 px seguindo o cursor, só com hover e sem reduced-motion), "Ver biografia" surgindo no card do
> palestrante, logos do marquee sobem, sublinhado deslizante nos links do rodapé, marca d'água dos
> ingressos gira e preço acende, mapinha sobe; **Local** ganha faixa "Aproveite Salvador" com três
> fotos reais já do projeto (Pelourinho, Farol da Barra, Forte de Santo Antônio), inclinadas e
> endireitando no hover, rolagem horizontal no mobile.
>
> **Revisão 2.6 (19/09/2026) — pontos turísticos em vídeo e fundos abstratos:** 4 clipes FHD do
> cliente (64–85 MB cada, ~41 Mbps) transcodificados com ffmpeg para `public/videos/` — cards do
> Local em recorte 4:5 a 720p/30 fps (1,2–2,4 MB) e fundos a 960×540/24 fps (2,2–2,9 MB), mudos,
> `faststart`, pôster WebP do 1.º segundo. Novo `AmbientVideo` (mudo, loop, `preload=none`, só baixa e
> toca a ≤800 px da tela, pausa fora, pôster até o 1.º frame, estático com reduced-motion; `mobile=false`
> deixa só a foto em telas pequenas). Uso: **Local** com Farol da Barra, Forte de Santo Antônio e Porto
> da Barra em vídeo; **hero** com a orla da Barra desfocada (blur 12 px) a 26 % sob as palmeiras (como
> o vídeo da referência); **água com reflexos** a 20 % (`screen`) sobre o azul de Depoimentos e a 14 %
> (`multiply`) sobre o dourado de Ingressos. Verificado: 3/3 cards tocando, hero tocando, sem erros.
>
> **Revisão 2.7 (19/09/2026) — fundos azuis só com vídeo:** a pedido do cliente, retirados o
> Pelourinho e as palmeiras de todas as seções azuis; fica **azul + vídeo em baixa opacidade**:
> `ambient--sea` (praia da Barra, blur 10 px, 32 %) no hero da home, hero da Galeria, cabeçalho do
> Álbum, hero da Open e 404; `ambient--water` (água, 18 %, `screen`) em Palestrantes, Depoimentos e
> rodapé. `BgWaves` (sombras de coqueiro) permanece só nas seções amarelas. Fontes dos clipes em
> `src/data/media.js`; parallax da foto do hero removido junto com a foto.
>
> **Revisão 2.8 (19/09/2026):** o vídeo de água foi retirado de todas as seções (o cliente não
> gostou do "mar"): amarelas ficam só com as sombras de coqueiro (`BgWaves navy`); Palestrantes,
> Depoimentos e rodapé passam a usar a **praia da Barra desfocada** (`ambient--sea`), igual ao hero.
> `AMBIENT.agua` continua disponível em `src/data/media.js`, sem consumidores.
>
> **Revisão 2.9 (19/09/2026):** os três clipes de pontos turísticos agora **alternam** entre as
> seções azuis (versões de fundo 960×540: `bg-praia` 2,2 MB, `bg-farol` 0,9 MB, `bg-forte` 1,8 MB).
> Home: hero = Porto da Barra · Palestrantes = Farol da Barra · Depoimentos = Forte de Santo Antônio ·
> rodapé = Farol. Subpáginas: Galeria = Farol · Álbum = Forte · Open = Porto da Barra · 404 = Forte.
>
> **Revisão 2.10 (19/09/2026) — Instituições refeita em branco:** faixa branca editorial (eyebrow
> "Quem já participou" com ponto amarelo, título Bebas azul com "de todo o Brasil" em amarelo, texto
> de apoio) e **duas fileiras de logos em sentidos opostos** (70 s / 84 s, pausa no hover, fade nas
> bordas). Os PNGs (207×207, cartão com sombra embutida) viraram **tiles brancos uniformes** com
> borda fina, imagem ampliada 14 % para cortar a sombra, lift + zoom no hover. Reduced-motion: lista
> rolável sem animação.
>
> **Revisão 2.11 (19/09/2026) — Instituições minimalista:** o cliente achou a 2.10 poluída (e o
> recorte "comia" as sombras embutidas). Versão final: faixa branca, **um título pequeno em caixa
> alta** ("Instituições que já participaram do GTAP") e **uma única fileira** de logos exatamente como
> vêm (sem tile, sem recorte, sem filtro), 72–104 px, espaçamento largo, rolagem lenta (90 s), fade
> nas bordas, pausa no hover. Sem outros efeitos. Título alinhado ao padrão do site (rev. 2.12):
> linha pequena "Quem já participou" + display Bebas "INSTITUIÇÕES" em azul, como em Ingressos.
>
> **Revisão 2.13 (19/09/2026):** cards do Local passam a **Farol da Barra · Pelourinho · Mercado
> Modelo** (dois clipes novos do cliente, transcodificados a 4:5/720p: `spot-pelourinho` 1,3 MB,
> `spot-mercado` 1,3 MB, com pôster WebP). `spot-farol-b`/`spot-praia` seguem em `public/videos`
> sem uso nos cards (os fundos das seções azuis continuam com `bg-praia/farol/forte`). Hover dos
> botões padronizado (rev. 2.12b): sobe 2 px + cor clareia + sombra suave, 300 ms; sem magnético,
> brilho ou escala.
>
> **Revisão 2.14 (19/09/2026) — Galeria refeita + transição "cortina primeiro":**
> `TransitionLink` (+ `hooks/routeTransition.js`): ao clicar num link interno a cortina do Loading
> desce (560 ms), a rota muda e o scroll vai ao topo **por baixo dela** (`lenis.scrollTo(0,{force})`),
> e ela sobe — sem a página nova piscar. Aplicado em Navbar, rodapé, galeria, 404, Open e CTA da
> home; voltar do navegador continua com a cortina normal. **Índice**: hero com eyebrow, números
> reais (9 edições · 454 fotos, somadas dos JSONs), **edição mais recente em destaque** (moldura
> r80, logo, contagem, "Ver álbum") e "Edições anteriores" em cards 4 col. com numeral romano gigante
> e contagem por edição. **Álbum**: barra com "Todas as edições" e seletor ‹ IX GTAP ›, contagem em
> destaque, **mosaico** 3 col. com a 1.ª foto de cada bloco de 6 em 2×2 (exceto a última), índice
> "01" no hover, e cards "Edição anterior / Próxima edição" no fim. Verificado: cortina antes da
> troca (350 ms: rota antiga + `is-route`; 2,5 s: rota nova, `scrollY=0`).
>
> **Revisão 2.15 (19/09/2026) — galeria com fundo único e header transparente:** as duas páginas
> deixam de ter faixa amarela; um `.page-bg` fixo (azul + vídeo desfocado: Farol no índice, Forte
> no álbum) fica atrás de toda a página e as seções são transparentes; cards passam a superfície
> branca 5 % com borda 12 %. `Navbar` sem `solid` (transparente como na home) e, sem hero, some a
> partir de 120 px de rolagem dando lugar à barra flutuante. **Rodapé** (todas as páginas): volta a
> textura de **água** (`ambient--water`, 18 %, screen) sobre o azul, sem vídeo turístico.
>
> **Revisão 2.16 (19/09/2026):** rodapé sem o lettering gigante; barra flutuante **some ao chegar no
> rodapé**; linha "X GTAP • data • cidade" movida para **cima do título** do hero e bloco do hero
> subido ao centro óptico. **Pôsteres dos depoimentos**: captura começa no `load` da página (teto de
> 2,5 s — vídeos ambiente em carga atrasavam o `load`), **2 vídeos em paralelo**, e suporte a
> **pôster estático** em `public/posters/depoimentos/<id>.webp` (usado se existir; senão captura).
> Com autorização do cliente, os 5 WebP foram gerados (`ffmpeg -ss 1.5` via HTTP Range + `cwebp`,
> 720 px, 19–25 KB cada) em `public/posters/depoimentos/{29,30,68,69,70}.webp`; a captura por vídeo
> fica só como fallback para depoimentos novos sem pôster. Para regenerar: mesmo comando sobre o
> `mediaUrl` de cada item `type: 3` do `landing_page.json`.
>
> **Revisão 2.17 (19/09/2026) — fechamento:** "A Open" aponta para o site oficial (nova aba; rota
> antiga redireciona; logo do rodapé linkado). Checkpoint em branch `redesign-2026`. **404** no
> padrão das subpáginas (header transparente, fundo único, "404" em marca d'água). **Peso**: seção
> Vídeo passa a usar `AmbientVideo` — o `banner-gt-abertura.mp4` remoto tem **122 MB / 2560×1440 /
> 18,5 Mbps** e rodava em loop também no mobile; agora só desktop, perto da tela, com pausa fora.
> Rodapé sem vídeo no mobile (só pôster). Medido: mobile 0,03 MB até a seção Vídeo (antes ≥2,5 MB
> só de rodapé + streaming do hero); desktop ≈6 MB de vídeo em toda a home. **Lighthouse mobile**:
> Acessibilidade 96 → corrigido `aria-hidden` com focáveis (floatbar usa `inert`); Boas práticas
> 100; SEO 92 → adicionado `public/robots.txt`.
>
> **Revisão 2.18 (19/09/2026):** com autorização do cliente, o vídeo de abertura foi transcodificado
> para um **loop local** `public/videos/bg-gtap-abertura.mp4` (22 s, 960×540, 24 fps, **1,58 MB**)
> usado na moldura da seção Vídeo (`AMBIENT.gtapLoop`); o original remoto (122 MB) só toca no play
> com som. Verificado: 0 requisições ao arquivo remoto na navegação normal. **Página interna da Open
> removida** (`src/pages/open/`, `SectionIdealizador` morto e assets exclusivos) — "A Open" é link
> externo e a rota antiga redireciona.

_Implementação executada e verificada em 18/09/2026. Stack mantida: React 19 + Vite 6 + React Router 7 (JS)._

## 1. Resumo das principais mudanças

**Fundação / design system**
- Novo sistema de tokens (azul profundo + dourado), tipografia display **Bricolage Grotesque** + corpo **Plus Jakarta Sans**, primitivas `.container`/`.btn`/superfícies/foco/reveal em `src/styles/global.css`.
- Correção estrutural em `reset.css` (removido `height:100%`+`overflow-x:hidden` do body que quebrava a rolagem da janela).
- Fonte de dados única `src/data/event.js` (evento, CTAs WhatsApp, navegação, hashes legados, adapter do JSON por `type`) e `src/data/editions.js` (catálogo das 9 edições + resolução de URL legada).
- Hook `useReveal`/`useReducedMotion` (IntersectionObserver com reobservação após fetch e fallback de conteúdo sempre visível).

**Home (todas as seções reconstruídas com conteúdo real)**
- Header responsivo estável (sem wheel), transparente→sólido, drawer mobile acessível.
- Hero com lettering de campanha, data/local, CTAs e fallback sem vídeo.
- Instituições (prova, ~29 logos reais), Palestrantes (retratos 4:5 + diálogo de bio acessível), Temas (lista numerada dos 7 temas), Para quem é (áreas reais), Experiência/Galeria, Depoimentos (vídeo sob demanda), Investimento (card do lote vigente + grupos + timeline legível), Localização (mapa sob demanda), Idealização (Open), Contato (formulário acessível), Rodapé.
- Barra de conversão persistente compacta (surge após o hero; some com drawer/diálogo).

**Páginas internas**
- Open: hero institucional, faixa de clientes, "Quem somos" com vídeo sob demanda, bloco de ligação ao GTAP.
- Galeria: índice com cards reais (Link), álbum em `/galeria/:slug` com lightbox acessível, estados loading/empty/error.
- URLs legadas (`/IX%20GTAP` etc.) resolvidas; 404 dedicado; scroll ao topo por rota; títulos por rota.

## 2. Comparação com a referência (Gramado Summit 2027)

Diferenças **deliberadas** (registradas para não confundir com defeito):
- **Paleta:** azul profundo + dourado GTAP no lugar do roxo + laranja da referência. Hipótese do plano; confirmar com o cliente antes de considerar final.
- **Tipografia display:** Bricolage Grotesque (não se reutiliza a fonte proprietária da referência).
- **Conteúdo:** dados reais do GTAP (evento, palestrantes, lotes, instituições) — não são os da referência.

Fidelidade de composição buscada e atingida: primeira dobra memorável com lettering grande, alternância intencional de superfícies (azul imersivo ↔ dourado quente ↔ claro técnico), retratos grandes arredondados em 3 colunas, card comercial dominante + secundário, rodapé denso, e composição mobile própria.

### Rubrica interna (auto-avaliação, 0–5)
| Dimensão | Peso | Nota | Observação |
| --- | --- | --- | --- |
| Hero e assinatura | 20 | 4.5 | Lettering forte, hierarquia clara, compreensível sem vídeo |
| Tipografia e composição | 20 | 4.5 | Escala expressiva, quebras controladas, ritmo editorial |
| Fotografia e arte | 15 | 4 | Retratos reais 4:5; algumas fotos remotas dependem do host |
| Ritmo entre seções | 15 | 4.5 | Alternância de superfícies consistente |
| Interações e motion | 15 | 4.5 | Reveal, diálogos, lightbox, barra — com reduced-motion |
| Mobile | 15 | 4.5 | Composição própria, CTAs full-width, drawer acessível |

## 3. Verificações executadas (resultados reais)

- **Build:** `npm run build` OK (bundle final JS 271 KB / 84 KB gzip, CSS 47 KB / 9 KB gzip — mais leve que a baseline de 323/129 KB por remoção de react-slick/animate.css e do banner de 484 KB).
- **Lint:** `npm run lint` OK, **0 erros** (baseline tinha 10 erros + 1 warning; 8 corrigidos ao reescrever, `Slider` removido, `vite.config` corrigido).
- **Navegador (pane 1440 e 390):**
  - Home desktop: todas as seções + rodapé conferidos.
  - Home mobile: hero, drawer (abrir/Escape/foco), palestrantes, investimento, instituições, galeria.
  - Diálogo de biografia: abrir, prev/próximo (3/6), Escape fecha e devolve foco ao card, scroll destravado.
  - Investimento: lote vigente correto **R$ 4.290,00 (Terceiro Lote)** em 18/09/2026; timeline com "Encerrado" legível (sem blur).
  - Barra de conversão: surge após o hero; some com drawer.
  - Open: hero + clientes + quem somos + ligação ao GTAP.
  - Galeria índice -> álbum `/galeria/ix-gtap` (28 fotos) -> lightbox (seta avança 1->2/28; Escape fecha e devolve foco).
  - URL legada `/IX%20GTAP` resolve para o álbum; slug inválido -> 404 real.
- **Redução de movimento:** implementada em CSS (`@media (prefers-reduced-motion: reduce)` zera transições e força `[data-reveal]` visível) e no hook (revela tudo imediatamente); diálogos/lightbox com `animation:none`. Verificado por revisão de código (emulação da media query não disponível no pane).

## 4. Limitações e pendências

- **Conteúdo comercial a confirmar (plano §5.2):** número da edição (sem numeral especulativo), regra do 3º lote (código encerra em out/2026), benefícios/certificado (não inventados), endereço exato do local (uso de "Pituba, Salvador/BA" + mapa; sem número de rua não confirmado).
- **Paleta azul/dourado** é hipótese do plano — validar com o cliente vs. proximidade cromática literal.
- **Mídia remota** (retratos, vídeos, logos em `gtap.com.br/midias`) depende do host externo; recomendável hospedar no próprio projeto e otimizar (`srcset`/`sizes`).
- **Formulário:** contrato POST para `gtap.com.br/form-handler.php` preservado; **não** testado com envio real (evitar leads de teste). Testar em homologação com endpoint controlado e confirmar CORS/resposta.
- **Deps a podar:** `react-slick`, `slick-carousel`, `animate.css` não têm mais consumidores — remover de `package.json` numa limpeza dedicada (lockfile).
- **SEO por rota:** títulos por rota implementados via `document.title`; meta/OG por rota e prerender para social ficam como decisão separada (SPA).
- **Host/refresh:** validar refresh de rotas profundas e redirects no host real (Apache/Netlify) — Vite dev não valida isso.

## Refinamento de superfícies e escala — 21/09/2026

- Header com vidro azul, blur de 22px, filete e contraste permanente.
- Temas, Ingressos e Contato em creme #fff4d8; contraste azul no ingresso em grupo.
- Texto do contato encurtado, sem quebras manuais.
- Medidas fluidas limitadas ao equivalente de 1440px; conteúdo central de 1206px e molduras até 1380px. Sem zoom CSS.
- Revisão visual: header, contato e ingressos em 1920×1080; ingressos e Temas em 390×844. Largura sem overflow em 390 e 2560px. Título principal medido em 96px tanto em 1920 quanto em 2560px.
- ESLint, build Vite e git diff --check aprovados. Nenhum envio de formulário ou publicação.

## Revisão mobile — 21/09/2026

Revisados visualmente: hero inicial, temas, depoimentos, localização e formulário em 390×844; galeria, álbum, lightbox e menu em 320×740. Sem overflow horizontal nesses tamanhos. Foco no campo Nome oculta a barra flutuante. Navegação de foto avança de 1/28 para 2/28; menu fecha e devolve foco ao acionador. Build, lint e diff --check aprovados. Teclado virtual físico não foi emulado; comportamento de foco verificado no navegador. Nenhum formulário enviado.
