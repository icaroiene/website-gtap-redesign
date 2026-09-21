# Plano de redesign completo do GTAP

> **Status:** redesign **implementado** em 18/09/2026 sobre a stack existente (React/Vite/Router). Decisões tomadas, comparação com a referência e pendências em [`evidencias/ENTREGA.md`](evidencias/ENTREGA.md); baseline e análise em [`evidencias/F0-baseline-e-referencia.md`](evidencias/F0-baseline-e-referencia.md). Decisões relevantes efetivadas: paleta azul/dourado (hipótese a validar com o cliente); display Bricolage Grotesque + corpo Plus Jakarta Sans; motion via CSS + IntersectionObserver (sem nova biblioteca).

> Versão 1.0 — 18/09/2026. Referência: [Gramado Summit](https://www.gramadosummit.com/), versão pública 2027 examinada nesta data. Entrega desta etapa: planejamento; nenhuma tela do produto foi alterada. Modelo solicitado pelo responsável pelo projeto: Astra. Na execução em outra sessão, selecionar Astra no aplicativo; este documento não altera a configuração do modelo.

## 1. Objetivo e interpretação do pedido

Reconstruir a experiência visual e interativa de todo o site GTAP para aproximá-la do acabamento da referência: identidade de evento forte, primeira dobra memorável, tipografia expressiva, fotografia protagonista, grandes superfícies de cor, narrativa contínua e conversão acessível durante a navegação.

Não considerar o trabalho concluído com uma troca de cores, fontes ou alguns cards. A entrega inclui a home, a página institucional da Open, o índice de galerias, os álbuns de cada edição, navegação, rodapé, diálogos, formulários, estados de carregamento e falha, acessibilidade, responsividade e revisão visual comparativa.

**Decisão inicial:** máxima proximidade na composição, proporção, hierarquia, tratamento das imagens e comportamento; identidade GTAP preservada em azul profundo e dourado. Essa tradução cromática é uma hipótese de trabalho, não uma decisão já aprovada pelo cliente. Se ele desejar também a paleta roxa/laranja, revisar os tokens antes de construir as seções. A comparação precisa declarar essa diferença para não confundir fidelidade de composição com igualdade de pixels.

**Regra de execução:** primeiro acertar composição estática com conteúdo real; depois movimento; depois refinamento. Uma seção visualmente errada não deve receber mais efeitos para compensar.

## 2. Como usar este guia

1. Ler a auditoria e confirmar os conteúdos da edição vigente.
2. Executar F0 e F1; produzir a direção visual em 1440 px e 390 px.
3. Comparar a primeira dobra e uma seção de palestrantes antes de replicar componentes.
4. Construir as fases em ordem de dependência, acompanhando os critérios de saída.
5. Usar a matriz de QA para revisão final e registrar evidências.
6. Manter um registro de decisões: data, decisão, motivo, tela afetada e responsável.

Neste documento, **observado** significa inspecionado no navegador ou no repositório. **Proposto** significa especificação para o GTAP. **Pendente** identifica algo que precisa ser medido ou confirmado. Valores de animação e medidas propostas não são apresentados como valores extraídos da implementação da referência.

## 3. Referência: evidências e limites da análise

### 3.1 Inspeção realizada

- Home pública inspecionada em viewport desktop de 1280 × 720 e mobile de 390 × 844.
- Conferidos: primeira dobra, manifesto audiovisual, bloco de números, retratos, mídia, opções de ingresso e conteúdo do rodapé.
- Observados: rolagem, barra flutuante, empilhamento mobile e estados de transformação/opacidade no DOM.
- Lidos: estilos computados de títulos, botões e fundos das seções; destinos dos principais links.
- Não realizados: compra, envio de formulário, contato por WhatsApp, auditoria completa das páginas internas da referência ou medição quadro a quadro das animações.
- As imagens vistas nesta sessão não foram salvas como arquivos neste repositório. A captura durável e a gravação dos movimentos estão explicitamente previstas em F0. Não existe ainda uma baseline visual automatizada.
- O GTAP foi auditado por código e dados; a aparência atual não foi validada em uma execução local nesta etapa.

### 3.2 Anatomia observada

| Camada | Evidência observada | Tradução para GTAP |
| --- | --- | --- |
| Hero | Tela ampla, identidade central, fundo audiovisual abstrato, data/local e grupo de ações | Marca/edição GTAP com mensagem em HTML e CTA explícito |
| Navegação | Marca à esquerda e links à direita no desktop; links quebram em linhas no mobile observado | Mesma leveza desktop; menu acessível no GTAP, que possui mais destinos |
| Manifesto | Mídia grande com cantos arredondados, texto expressivo sobreposto e acesso a vídeo | Filme do congresso com recorte próprio e mensagem sobre gestão pública |
| Prova | Bloco de cor quente, números em grande escala, símbolo decorativo e fotos | Dados GTAP verificados, fotos reais e grafismo derivado da sua identidade |
| Pessoas | Três colunas desktop, retratos grandes arredondados, nome e descrição abaixo; uma coluna no mobile observado | Palestrantes confirmados e acesso à biografia existente |
| Mídia | Cards claros sobre fundo saturado | Prova institucional/depoimentos; imprensa apenas se houver conteúdo real |
| Conversão | Opções comerciais lado a lado, forte contraste e CTA arredondado | Lote vigente e condições de grupo, sem inventar categorias comerciais |
| Ações persistentes | Grupo flutuante inferior e WhatsApp lateral durante a rolagem | Barra menor com inscrição/contato, sem colisão com conteúdo |

### 3.3 Medições de referência

Valores computados na inspeção desktop, salvo indicação contrária:

| Propriedade | Valor observado | Uso no planejamento |
| --- | --- | --- |
| Fundo hero/manifesto/pessoas | `rgb(81, 3, 69)` / `#510345` | Registrar contraste e alternância; não aplicar automaticamente à marca GTAP |
| Fundo números/conversão | `rgb(252, 136, 2)` / `#FC8802` | Superfície quente de alto impacto |
| Fundo mídia | `rgb(94, 2, 129)` / `#5E0281` | Variação secundária de fundo saturado |
| Família de interface | `Plus Jakarta Sans` | Candidata para corpo e interface GTAP |
| Família expressiva | `MADEINBRASILGS` | Tipografia própria da referência; criar direção GTAP equivalente em presença, sem depender dessa fonte |
| Nome de palestrante | 32 px; linha 38,4 px; peso computado 400 | Ponto de partida para escala de nomes |
| Título de mídia | 51,2 px; linha 56,32 px; peso 600 | Referência para títulos editoriais |
| Botões inspecionados no mobile | 19,2–22,4 px; raio 62,7 px | Botões de presença forte e forma de cápsula |
| Hero desktop | 720 px no viewport de 720 px | Primeira dobra de escala imersiva |

Alguns títulos têm spans e transformações que alteram a percepção de tamanho. Medir apenas o H2 não representa o lettering inteiro. Não copiar alturas totais de seções: elas dependem do conteúdo, dos movimentos e do viewport.

### 3.4 Interatividade observada e incertezas

- Há vídeos com autoplay, muted e loop. A técnica exata do fundo não é requisito para reproduzir sua percepção.
- Elementos do hero apresentam estilos de `opacity` e `transform`; fotos do bloco de números apresentam rotação, skew e escala; cards apresentam escala/opacidade em estados de entrada.
- A barra inferior permanece visível em diversas seções. Seu limiar exato de ativação não foi medido.
- No mobile observado, a barra empilhada ocupa espaço significativo sobre o conteúdo. O GTAP deverá reduzir essa ocupação, preservando a função de conversão.
- Links de ingresso levam a checkout externo; o vídeo do manifesto aponta para YouTube. Não atribuir à referência um player modal ou uma biografia modal que não foram verificados.
- Tempos, easings, hover, gatilhos exatos, suporte a redução de movimento e comportamento de erro não foram auditados integralmente. As especificações abaixo são propostas próprias.

## 4. Auditoria do repositório e consequências

### 4.1 Base técnica

- React 19, Vite 6 e React Router 7, conforme versões declaradas em `package.json`.
- CSS por componente e estilos globais; sem sistema central de tokens.
- `react-slick`, `slick-carousel` e `animate.css` já declarados.
- Scripts existentes: `dev`, `build`, `lint` e `preview`. Não há script de testes em `package.json`.
- Conteúdo em `public/api/landing_page.json`, `public/api/galerias/*.json`, componentes e assets locais; diversas mídias dependem de `gtap.com.br/midias`.
- Fallback SPA declarado em `.htaccess` e `public/_redirects`; confirmar qual mecanismo é usado no host real.

### 4.2 Inventário e tratamento proposto

| Área atual | Local principal | Decisão de redesign |
| --- | --- | --- |
| Composição home | `src/pages/landingPage/LandingPage.jsx` | Reordenar narrativa e centralizar os dados consumidos |
| Hero | `src/components/Banner/Banner.jsx` e `.css` | Substituir banner exclusivamente audiovisual por conteúdo semântico sobre mídia |
| Navegação | `src/components/Navbar/` e `NavbarMobile/` | Unificar contrato e corrigir acessibilidade e paridade |
| Barra comercial | `src/components/CardButton/` | Transformar em ações persistentes compactas |
| Temas | `Sections/SectionTemas/` | Lista editorial numerada; detalhe expansível quando necessário |
| Palestrantes | `Sections/SectionPalestrantes/` e `ModalPalestrante/` | Retratos com proporção consistente e diálogo acessível |
| Instituições | `Sections/SectionPublico/` | Faixa de logos com controle de movimento e alternativa estática |
| Depoimentos | `Sections/SectionDepoimentos/` | Cards de vídeo com poster, reprodução voluntária e transcrição |
| Investimento | `Sections/SectionInvestimentos/` e `src/Utils/useLoteAtual.js` | Preservar regras comerciais; explicitar estados de lote |
| Local | `Sections/SectionLocal/` | Foto estável, endereço real e mapa sob demanda |
| Contato | `SectionForms/` e `src/components/Forms/` | Estados inline e preservação do contrato de envio |
| Institucional | `src/pages/open/` | Aplicar sistema visual com tom institucional |
| Galerias | `src/pages/galeria/` e `src/components/Slider/` | Navegação por edição e visualizador de fotos acessível |
| Rodapé | `src/components/Footer/` | Componente comum a todas as rotas |

### 4.3 Problemas concretos a resolver no trabalho

1. **Hero sem mensagem em HTML:** `Banner.jsx` renderiza apenas vídeo. Data, nome e propósito precisam continuar compreensíveis quando a mídia falhar.
2. **Mobile frágil:** o banner usa altura de 300 px, margem superior percentual e `object-fit: fill`; substituir por composição responsiva sem distorção.
3. **Navegação dependente de wheel:** o desktop esconde/monta o header com eventos de roda. Isso não cobre consistentemente teclado, touch e scroll programático. Preferir header estável; se houver ocultação, usar posição de scroll com histerese e preservar foco.
4. **Links e botões:** existem âncoras sem `href`, `div` clicável e botão dentro de link. Corrigir a semântica durante a troca dos componentes.
5. **Paridade mobile:** preços e contato estão comentados no menu mobile; localização aponta para contato. Todos os destinos essenciais devem ser acessíveis.
6. **Preço:** lotes passados usam blur. Substituir por estado legível “Encerrado”, sem esconder informação por desfoque.
7. **Calendário:** o terceiro lote encerra em outubro/2026 no código, embora um comentário mencione dezembro. Confirmar regra comercial. O hook memoriza o resultado sem dependências; prever atualização em sessão longa e virada de data.
8. **Formulário:** labels sem `id` correspondente, feedback em `alert`, falha de rede apenas no console. Corrigir associação, feedback e repetição segura.
9. **Galeria:** `/:editionText` captura caminhos genéricos; edição inválida não apresenta 404 dedicado. Preservar links existentes e validar edição contra catálogo.
10. **Localização:** intervalo calcula módulo por `images.length`, inclusive quando zero. Eliminar rotação desnecessária ou proteger listas vazias e mudanças de dados.
11. **Conteúdo disperso:** datas repetidas em `CardButton`, lotes no hook, edição em componentes e dados numéricos `type` no JSON. Centralizar sem quebrar o formato publicado.
12. **SEO:** canonical e metadados são únicos no HTML; definir tratamento por rota e fallback de compartilhamento adequado ao host.

Esses achados vêm da leitura do código. Não constituem resultados de testes executados.

## 5. Conteúdo, públicos e fluxo principal

### 5.1 Públicos e tarefas

- Participante individual: entender proposta, temas, palestrantes, data/local e investimento; solicitar inscrição.
- Representante de órgão/equipe: avaliar pertinência, benefícios e condições de grupo; falar com atendimento.
- Visitante recorrente: localizar edição, conferir fotos e reconhecer a organização.
- Visitante institucional: conhecer a Open e seus canais.

### 5.2 Conteúdo que exige confirmação antes da publicação

O código registra evento em **08 e 09 de outubro de 2026**, em **Salvador**, no **Centro de Convenções Deville Prime**. Esses são dados encontrados no projeto, não confirmação comercial atual. Há textos de edições históricas e comentário mencionando XI GTAP; não deduzir o número da edição vigente a partir deles.

| Informação | Fonte inicial | Tratamento até confirmação |
| --- | --- | --- |
| Nome/número da edição | Marca e equipe GTAP | Usar GTAP sem numeral especulativo |
| Data, local e endereço | Componentes atuais + organização | Manter valor existente no protótipo, sinalizado no registro editorial |
| Preços e vigência | `useLoteAtual.js` + comercial | Não alterar preço ou prazo por decisão estética |
| Palestrantes e cargos | JSON atual + organização | Confirmar presença na edição; revisar cargos e retratos |
| Indicadores históricos | Relatórios da organização | Não inventar participantes, órgãos ou edições |
| Benefícios e certificados | Comercial | Publicar somente benefícios confirmados |
| Fluxo de inscrição | WhatsApp atual | Não prometer checkout imediato se há atendimento humano |
| Temas e agenda | JSON + organização | Não converter temas em horários fictícios |
| Fotos e vídeos | Arquivo GTAP/Open | Conferir qualidade, autoria e autorização de uso |

### 5.3 Ordem proposta da home

1. Header + hero.
2. Manifesto audiovisual: por que participar.
3. Prova de trajetória e instituições.
4. Palestrantes.
5. Temas confirmados.
6. Experiência e galeria de edições.
7. Depoimentos.
8. Investimento e condições de grupo.
9. Localização.
10. Organização/idealizador em bloco resumido.
11. Contato e dúvidas frequentes verificadas.
12. Rodapé.

Agrupar trajetória e instituições em um capítulo visual. Organização aparece após a proposta de valor; sua história completa continua na rota Open. FAQ é complemento proposto, não conteúdo observado na referência nem hoje confirmado no GTAP.

## 6. Direção visual executável

### 6.1 Conceito

**GTAP como encontro nacional de conhecimento e transformação da gestão pública.** Tom contemporâneo, editorial e confiante; fotografia de gente real, linguagem objetiva e escala de congresso. O detalhe memorável será uma composição tipográfica própria para a edição, combinada a grafismos derivados da marca GTAP e imagens do evento.

Evitar transformar o congresso em uma página corporativa de pequenos cards uniformes. Usar diferenças claras entre capítulos: fundo escuro e imersivo; prova sobre superfície quente; retratos sobre fundo profundo; informação técnica sobre superfície clara; conversão novamente quente.

### 6.2 Tokens propostos

Os valores abaixo são ponto de partida para o protótipo, não cores oficiais novas já aprovadas. Azul e dourado derivam dos estilos existentes.

```css
:root {
  --color-ink: #02093a;
  --color-deep: #000d74;
  --color-gold: #dda92e;
  --color-gold-soft: #ffdf92;
  --color-paper: #f7f5ef;
  --color-white: #ffffff;
  --color-body: #23263b;
  --color-muted: #5b6075;
  --color-line-light: rgb(255 255 255 / 22%);
  --color-line-dark: rgb(2 9 58 / 16%);
  --radius-control: 999px;
  --radius-card: 28px;
  --radius-media: 48px;
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-6: 24px;
  --space-8: 32px;
  --space-12: 48px;
  --space-16: 64px;
  --space-24: 96px;
  --space-32: 128px;
  --container: 1280px;
  --gutter: clamp(20px, 4.5vw, 72px);
  --section-space: clamp(64px, 8vw, 128px);
  --duration-fast: 160ms;
  --duration-ui: 240ms;
  --duration-reveal: 600ms;
  --ease-out: cubic-bezier(.22, 1, .36, 1);
}
```

Aplicar texto azul profundo sobre dourado e branco sobre azul. Não usar branco pequeno sobre dourado sem medir contraste. Validar todas as combinações finais; transparências e imagens podem invalidar contraste mesmo quando as cores isoladas passam.

### 6.3 Tipografia e identidade

- Interface/corpo: avaliar Plus Jakarta Sans com pesos 400, 500, 600 e 700; usar arquivos WOFF2 locais após conferir licença e fonte oficial. Não carregar uma biblioteca inteira de pesos.
- Display: lettering GTAP produzido para a campanha, preferencialmente SVG decorativo associado a H1 em HTML. Alternativa provisória: a mesma família de interface em peso 700, com composição e quebras bem controladas.
- Não extrair/reutilizar a fonte própria da referência como dependência do GTAP.
- H1: `clamp(44px, 7vw, 104px)`, linha 0,98–1,05, largura de 9–14 caracteres por linha conforme texto final.
- H2: `clamp(32px, 4.4vw, 64px)`, linha 1,05–1,12; máximo de 2–3 linhas.
- H3 de retrato: 24–32 px, linha 1,15; suportar nomes longos sem truncamento.
- Corpo: 16 px mobile, 18 px desktop; linha 1,5–1,65 e largura máxima de 60–68 caracteres.
- Rótulos: 12–14 px; maiúsculas apenas em labels curtas; espaçamento de letras moderado.
- Botões: 16–18 px mobile, 18–20 px desktop; altura mínima de 48 px.
- Não usar condensação ou transformação horizontal para fazer texto caber. Ajustar conteúdo, largura e tamanho.

### 6.4 Grid e superfícies

- Container central: `min(100% - 2 * gutter, 1280px)`, com implementação CSS válida equivalente.
- Desktop ≥ 1200 px: 12 colunas; gaps de 24–32 px. Conteúdo editorial principal pode usar subcontainer de 1040–1120 px para se aproximar da referência.
- Tablet 768–1199 px: 8 colunas; gaps de 24 px.
- Mobile < 768 px: 4 colunas conceituais; conteúdo geralmente em coluna única; gaps de 16–24 px.
- Margens verticais de seção: 96–128 px desktop, 64–80 px mobile.
- Mídia imersiva pode ultrapassar o container, mantendo 16–24 px laterais e raio de 32–48 px desktop, 20–28 px mobile.
- Não utilizar sombra em todos os elementos. Hierarquia deve vir de cor, escala e espaçamento.
- Fundos decorativos ficam atrás da leitura, não competem com rostos e não alteram o fluxo do documento.

## 7. Especificação por seção da home

### S01 — Header e navegação

**Objetivo:** permitir orientação e inscrição sem competir com o hero.

- Desktop: logo à esquerda; links Temas, Palestrantes, Galeria, Investimento e A Open; contato pode ficar como ação secundária. Container com altura inicial de 88–104 px.
- Sobre hero: fundo transparente e contraste branco. Após a primeira dobra, preferir header sólido compacto de 72–80 px, se necessário; evitar acumular header e barra inferior excessivamente grandes.
- Mobile: logo e botão Menu de 48 × 48 px; drawer com todos os destinos e CTA. A referência usa links quebrados em linhas; a adaptação para drawer é intencional devido ao maior menu GTAP.
- Implementar `button`, `aria-expanded`, nome acessível, fechamento por Escape, devolução de foco e bloqueio de rolagem do fundo quando o drawer estiver aberto.
- Links internos reais `/#temas`, `/#palestrantes`, `/#investimento`, `/#contato`; preservar compatibilidade com `#preços` por mapeamento de hash legado.
- Usar `scroll-margin-top` para não esconder títulos sob o header. Respeitar redução de movimento.
- Aceite: navegação funciona por mouse, teclado e toque; não há links essenciais exclusivos do desktop.

### S02 — Hero

**Objetivo:** comunicar imediatamente evento, público, data/local e próximo passo.

- Fundo em azul profundo com filme/textura própria. Separar camadas: mídia, overlay de contraste, grafismo, conteúdo e navegação.
- Composição central na direção da referência: marca/edição; H1 de até 3 linhas; linha de data/local; CTA principal e secundário.
- Copy provisória de direção: “Gestão tributária. Conhecimento que transforma a administração pública.” Ajustar ao título oficial e validar a quebra; não usar essa frase como informação factual adicional.
- CTA principal “Quero participar”, levando ao investimento/fluxo confirmado; secundário “Conheça os temas”. “Condições para grupos” pode ser terceiro destino em desktop e link de texto no mobile.
- Desktop: `min-height: 100svh`, com mínimo útil orientativo de 680 px; permitir crescimento com zoom ou texto maior. Conteúdo central com largura máxima de 900 px.
- Mobile: `min-height` não pode cortar conteúdo; header + H1 + data + CTA devem caber confortavelmente ou formar uma sequência natural sem sobreposição. Não forçar 100vh rígido.
- Vídeo mudo, inline e em loop somente quando permitido; poster com o mesmo enquadramento. Não embutir toda a comunicação no vídeo.
- Fallback: imagem estática e texto completo; se falhar também a imagem, fundo sólido e CTA continuam utilizáveis.
- Aceite: em cinco segundos, alguém identifica o GTAP, seu assunto, quando/onde ocorre e como participar; em 390 px, CTA não fica encoberto.

### S03 — Manifesto audiovisual

- Mídia larga, proporção desktop próxima de 16:9, cantos arredondados e overlay uniforme.
- Texto curto sobre a imagem, preferencialmente canto inferior direito no desktop; no mobile, abaixo ou sobre área segura sem rostos.
- Headline de até 14 palavras; apoio de até 35 palavras. Explicar valor específico de gestão tributária para o público.
- Botão explícito “Assistir ao vídeo do GTAP”. Player sob demanda em diálogo ou expansão inline; definir apenas uma solução.
- Recomendação: diálogo nativo com título, fechar, controles, legenda/transcrição e pausa ao fechar. Não iniciar áudio automaticamente.
- Usar `sobre-gtap.mp4` apenas após revisão da edição, conteúdo e qualidade; ele aparece como recurso no código atual.
- Aceite: a seção transmite valor com vídeo bloqueado e funciona com teclado.

### S04 — Trajetória e instituições

- Fundo dourado; números em azul profundo com escala 64–112 px desktop, 48–72 px mobile.
- Dois ou três indicadores, cada um com legenda clara e fonte no registro editorial. Se faltarem números, usar fatos documentados sem inventar métricas.
- Duas fotos de edições anteriores, em recortes consistentes, formando composição editorial assimétrica no desktop. No mobile, empilhar sem sobreposição de texto.
- Grafismo GTAP de baixa opacidade no fundo; não copiar o símbolo do Gramado Summit.
- Logos de instituições em faixa própria com dimensões ópticas equilibradas e fundo neutro quando necessário para preservar legibilidade.
- Preferir grid estático inicialmente. Se houver marquee, oferecer pausa e desativar movimento em `prefers-reduced-motion`; duplicatas visuais não entram duas vezes na árvore acessível.
- Aceite: nenhuma instituição é apresentada como patrocinadora/participante da edição atual sem comprovação.

### S05 — Palestrantes

- Fundo azul profundo, título editorial amplo com uma palavra em dourado.
- Grid desktop de 3 colunas, 2 em tablet e 1 em mobile para manter retratos grandes como na referência observada.
- Retratos 4:5 como ponto de partida, `object-fit: cover`; ponto focal individual para preservar rosto e ombros. Raio 32–40 px desktop, 24–28 px mobile.
- Nome e cargo abaixo da foto; não colocar biografia longa sobre rosto. Nome em branco, cargo com contraste suficiente.
- Card acionável por botão com nome “Ver biografia de …”; hover com imagem em escala máxima de 1,025 e deslocamento de até 4 px, sem alterar layout.
- Diálogo: foto + texto em duas colunas desktop; foto compacta acima no mobile; área de texto rolável; fechar sempre visível.
- Estados: sem retrato → composição neutra identificada; sem cargo → omitir linha; sem biografia → não oferecer diálogo vazio; sem palestrantes → mensagem editorial honesta.
- Preservar anterior/próximo se útil; com um item, ocultar navegação; com lista vazia, não abrir.
- Aceite: Escape fecha, foco retorna ao card, navegação não altera scroll da página e nomes longos não são cortados.

### S06 — Temas

- Superfície clara, título à esquerda, descrição curta à direita no desktop; sequência vertical no mobile.
- Lista numerada com divisórias; número em dourado/azul, título em tamanho 22–28 px e texto legível.
- Se o conteúdo for curto, mostrar tudo. Accordion apenas se houver descrição adicional real; não esconder o único texto disponível atrás de clique.
- Accordion com botão de largura inteira, `aria-expanded` e painel associado; ícone rotaciona 90°/180° conforme desenho.
- Não inventar agenda, horários ou associação tema-palestrante que o JSON não informa.
- Aceite: todos os temas atuais preservados, sequência lógica e título compreensível antes de expandir.

### S07 — Experiência e galeria

- Capítulo predominantemente fotográfico: uma imagem dominante e duas secundárias; desktop assimétrico, mobile com imagem principal seguida de trilho manual ou grid.
- Fotografias de plenária, interação e bastidores; evitar repetição da mesma imagem do hero.
- Ação “Veja as edições anteriores” para `/galeria`; cada edição identificada por nome real.
- Hover discreto, sem filtros que alterem dramaticamente a fotografia.
- Aceite: cada imagem tem recorte específico, dimensões reservadas e texto alternativo útil; trilho tem controles além de gesto.

### S08 — Depoimentos

- Fundo profundo ou intermediário para variar o ritmo; até 3 destaques iniciais.
- Poster 4:3 ou 16:9 consistente, botão play claro, nome e instituição fora do vídeo; citação curta proveniente do conteúdo existente.
- Vídeos carregados apenas ao solicitar reprodução; pausar anterior ao iniciar outro.
- Oferecer transcrição; sem vídeo disponível, mostrar texto confirmado e autoria.
- Aceite: nenhum vídeo de depoimento toca automaticamente; cards mantêm dimensões durante carregamento.

### S09 — Investimento

- Superfície quente; headline ampla e explicação comercial clara.
- Um card dominante para o lote atual e um painel para grupos. Lotes anteriores/futuros ficam como informação secundária legível, não como três ofertas equivalentes.
- Exibir preço por participante, vigência, benefícios confirmados e CTA com destino real. Sem parcelamento ou desconto presumido.
- “Solicitar inscrição”/“Falar com a equipe” se WhatsApp for o processo; evitar rótulo que sugira pagamento instantâneo.
- Estados definidos: vigente, futuro, encerrado, esgotado se houver dado, sem lote vigente e evento encerrado. Em dúvida comercial, mostrar “Consulte as condições” em vez de preço vazio.
- Centralizar datas em ISO com timezone comercial `America/Bahia`; definir limites de início inclusivo e fim exclusivo na implementação, com intervalos sem sobreposição.
- Aceite: preço e status coincidem entre hero/barra/investimento; abrir o site após o último lote não deixa CTA sem texto.

### S10 — Localização

- Foto real do local ou Salvador, com título, endereço e data em HTML.
- Desktop: imagem e informações/mapa em colunas; mobile: imagem, texto, rota.
- Mapa só carrega sob demanda ou perto da seção; link de rota continua funcionando se iframe falhar.
- Eliminar rotação automática a cada quatro segundos, salvo justificativa posterior; fotografia estável favorece leitura.
- Aceite: endereço textual completo, link verificado e ausência de salto de layout no mapa.

### S11 — Organização

- Bloco editorial de duas colunas: retrato/registro institucional e texto sucinto sobre a Open e idealização.
- Preservar conteúdo relevante de `SectionIdealizador`; reduzir repetição na home e direcionar para `/open-solucoes-tributarias`.
- Não confundir organização, palestrante e patrocinador. Rótulos claros.
- Aceite: visitante entende quem organiza e encontra página institucional sem atravessar a galeria.

### S12 — Contato, FAQ e rodapé

- Contato em duas colunas desktop: promessa de atendimento + formulário; mobile em coluna única.
- Campos atuais: nome, e-mail e WhatsApp. Manter nomes enviados `name`, `email`, `whatsapp`; inputs com `id`, labels, autocomplete e mensagens associadas.
- Preservar POST `FormData` para `https://gtap.com.br/form-handler.php` até decisão de backend; confirmar CORS/origem e formato real de resposta em homologação.
- Estados: inicial, inválido, enviando, sucesso, erro de validação do servidor, erro de rede e timeout. Reabilitar envio ao falhar; preservar valores; não duplicar requisição com clique repetido.
- Feedback inline anunciado por região apropriada; não depender de `alert()` nem confirmar entrega de e-mail sem resposta do servidor que a comprove.
- Política de privacidade e eventual consentimento seguem o processo real da organização; não adicionar checkbox fictício nem link sem destino.
- FAQ somente com respostas confirmadas: inscrição, grupos, materiais, certificado e local. Omitir itens sem resposta validada.
- Rodapé com marca, navegação, contato, redes confirmadas e informações institucionais atuais. Não adicionar newsletter sem operação e endpoint definidos.
- Aceite: erro não apaga o trabalho do usuário; Enter envia corretamente; mensagens são perceptíveis por leitor de tela.

## 8. Páginas internas e URLs

### 8.1 Open — `/open-solucoes-tributarias`

- Header comum com variante de contraste; hero editorial com marca Open, proposta institucional e fotografia da equipe.
- Sequência: apresentação → áreas de atuação confirmadas → prova/clientes → vídeo → relação com GTAP → contato.
- Usar assets existentes em `src/assets/open/` depois de avaliar resolução e recorte.
- Tipografia, botões, grids e motion iguais aos da home; superfícies claras em maior proporção para leitura institucional.
- CTA para treinamento externo já existente precisa continuar identificado como destino externo.
- Não reutilizar automaticamente o CTA de lote em toda a página; permitir convite ao GTAP contextual.
- Aceite: todos os conteúdos institucionais relevantes e links existentes são migrados ou têm justificativa registrada.

### 8.2 Galeria — `/galeria`

- Hero com foto da edição mais recente cadastrada e título explícito de memória do evento.
- Cards de edições em 3/2/1 colunas; ano e local só quando disponíveis; edição recente primeiro.
- Cada card é link real, suporta abrir em nova aba e possui foco visível.
- Não criar filtro para poucas edições sem ganho claro. Se adotado, implementar estado sem resultados e reset.
- Aceite: todas as nove edições atualmente mapeadas permanecem acessíveis.

### 8.3 Álbum de edição

- Destino canônico proposto: `/galeria/:slug`, por exemplo `/galeria/ix-gtap`.
- Preservar URLs legadas como `/IX%20GTAP`, `/VIII%20GTAP` e demais edições por tabela explícita; redirecionamento no servidor quando disponível, fallback de router com replace.
- Hero compacto com nome/identidade da edição e link “Todas as edições”.
- Grid de fotos com proporções previsíveis; carregamento incremental para álbum longo; lightbox com anterior/próxima, contador, fechar e navegação por teclado.
- Pré-carregar apenas imagem vizinha quando o visualizador abrir. Não baixar todas as fotos em alta resolução na entrada.
- Estados: loading com dimensões estáveis; álbum vazio; imagem indisponível; falha de carregamento com tentar novamente; slug inválido com 404 real quando o host permitir.
- Preservar gesto de zoom nativo; swipe não pode prender scroll vertical.
- Aceite: refresh direto funciona em produção; voltar retorna à posição anterior do índice; foto não fica esticada.

### 8.4 Página não encontrada e navegação entre rotas

- Validar slugs antes de buscar JSON; não usar parâmetro arbitrário como caminho de recurso.
- 404 com navegação para início/galeria/contato, usando o sistema visual.
- Ao trocar de rota, atualizar título e foco no conteúdo principal; hash tem precedência sobre scroll para topo.
- Separar restauração de scroll do fechamento de diálogos. Não forçar scroll para topo em mudanças internas de estado.

## 9. Contrato de interações e motion

Todos os números abaixo são **propostos**. Usar uma curva comum e poucos padrões; não adicionar uma biblioteca diferente por componente.

| Interação | Gatilho | Movimento proposto | Duração | Redução de movimento / fallback |
| --- | --- | --- | --- | --- |
| Entrada hero | Conteúdo pronto | Opacidade + Y de 16–24 px para 0; sequência marca, título, data, ações | 600–800 ms; atraso entre grupos 70–100 ms | Exibir tudo imediatamente |
| Entrada de seção | 15–20% visível | Y 24 px + opacidade; executar uma vez | 500–650 ms | Sem deslocamento e sem conteúdo oculto |
| Retratos | Entrada no viewport | Escala 0,97 → 1, opacidade | 500–600 ms; stagger até 60 ms | Estado final estático |
| Fotos de trajetória | Entrada | Rotação máxima ±3° e Y até 24 px | 650–800 ms | Fotos estáticas alinhadas |
| Hover botão | Pointer fino | Cor/borda + Y de até -2 px | 160–220 ms | Apenas cor; foco igualmente perceptível |
| Hover retrato | Pointer fino | Escala até 1,025 na imagem | 240–320 ms | Sem escala |
| Menu mobile | Clique | Fade do backdrop + painel Y de 12 px | 200–280 ms | Abrir sem deslocamento |
| Diálogo | Clique | Fade + escala 0,98 → 1 | 180–240 ms | Abrir/fechar imediatamente |
| Accordion | Clique/Enter | Ícone e expansão natural | 180–240 ms | Expansão imediata |
| Barra persistente | Hero deixa viewport | Y de 12 px e fade | 200–260 ms | Exibição imediata |
| Navegação de fotos | Clique/tecla/gesto | Fade curto sem deslocar página | 180–250 ms | Troca imediata |

### Regras obrigatórias

- Texto e links visíveis por padrão; aplicar estado inicial animado somente quando o controlador estiver pronto. Falha de JS/observer não deixa seções transparentes.
- Rolagem nativa. Não instalar smooth-scroll global nem scroll hijacking por padrão.
- Não usar pinning longo sem demonstrar necessidade no protótipo; a sensação de ritmo pode ser obtida com composição e entradas leves.
- Conteúdo comercial nunca depende de concluir animação.
- Animar preferencialmente `transform` e `opacity`; evitar grandes filtros de blur em tempo real e leituras/escritas de layout a cada frame.
- Desconectar observers, listeners e timers no unmount; testar navegação repetida e React Strict Mode.
- Autoplay audiovisual precisa de pausa acessível. Pausar mídia fora da tela/aba oculta; reduction-of-motion implica poster estático para mídia decorativa.
- Botões flutuantes: camada inferior aos diálogos, margem da safe area e reserva de espaço no conteúdo.
- Barra mobile proposta: uma linha, altura de 64–76 px, CTA principal + informação curta; ação de grupos no menu/seção. Ocultar quando teclado virtual, drawer, diálogo ou formulário ativo causar conflito.
- WhatsApp lateral é opcional se a barra já cumpre a função; não duplicar duas ações equivalentes cobrindo o mesmo canto.

## 10. Assets: produção e seleção

| Asset | Entrega mínima | Orientação técnica | Responsável sugerido |
| --- | --- | --- | --- |
| Marca/edição | Logo clara/escura + lettering de campanha | SVG otimizado, sem texto funcional exclusivamente em imagem | Design + cliente |
| Hero | Filme curto + poster desktop/mobile | Loop editorial de 8–15 s, sem áudio; composição própria para retrato | Audiovisual |
| Manifesto | Filme + poster + legenda/transcrição | Player sob demanda; relação com edição validada | Conteúdo + audiovisual |
| Palestrantes | Retratos consistentes | Fonte ideal ≥ 1000 px no eixo maior; recorte individual 4:5 | Cliente + design |
| Galeria | Seleção de 6–12 fotos para home | Plateia, networking, palco e bastidores; sem duplicatas | Conteúdo |
| Logos | SVG ou imagem transparente adequada | Preservar cores/proporções e área de respiro | Cliente |
| Local | Foto ampla + endereço | Crop desktop/mobile; mapa com destino validado | Cliente |
| Compartilhamento | Arte social | 1200 × 630 px, leitura em miniatura | Design |

Criar catálogo com: arquivo, origem, uso, dimensões, peso, ponto focal, texto alternativo, situação editorial e variantes. Aproveitar recursos existentes quando a qualidade permitir; sua presença no repositório não comprova resolução nem adequação à nova edição.

Imagens de conteúdo devem usar `<picture>`/`img`, `srcset`, `sizes`, dimensões explícitas e lazy loading abaixo da dobra. Evitar background CSS para retratos e fotos que têm significado. Não usar lazy loading na imagem principal de LCP.

Metas iniciais de peso: poster hero ≤ 250 KB desktop / 150 KB mobile; retrato visível ≤ 120 KB; thumbnail de galeria ≤ 80 KB; filme hero ≤ 3 MB desktop / 1,5 MB mobile como orçamento de produção, sem bloquear lançamento se o poster estático for a alternativa necessária. Vídeo não integra a carga crítica inicial.

## 11. Arquitetura proposta e migração

### 11.1 Manter a base

Permanecer em React/Vite/Router e JavaScript nesta etapa. Não migrar para Next, Tailwind, CMS ou TypeScript apenas por redesign. CSS Modules são uma opção para novos componentes, suportada pela base Vite; se escolhidos, documentar a convenção e evitar renomear todo o legado sem necessidade.

Começar motion com CSS + IntersectionObserver. Reavaliar uma biblioteca única somente se o protótipo demonstrar timelines que justifiquem o custo. Revisar dependências existentes após migração: remover `react-slick`/`animate.css` apenas quando todos os consumidores tiverem sido substituídos e verificados.

### 11.2 Organização sugerida

```text
src/
  styles/
    tokens.css
    typography.css
    global.css
  components/
    ui/                 # Button, Container, SectionHeading, Dialog, Accordion
    layout/             # SiteHeader, MobileMenu, SiteFooter, FloatingActions
    media/              # ResponsiveImage, VideoPlayer, PhotoLightbox
  features/
    event/              # Hero, Manifesto, Stats, Speakers, Themes, Pricing
    gallery/            # EditionCard, EditionGrid, AlbumGrid
    contact/            # ContactForm e contrato de estados
  data/
    event.js            # edição, datas, endereço, destinos e lotes confirmados
    adapters.js         # tradução do JSON legado
    editions.js         # catálogo e URLs antigas
  hooks/
    useEventContent.js
    useReducedMotion.js
    useReveal.js
  pages/                # manter rotas existentes durante migração
```

Estrutura proposta, não arquivos já implementados. Evitar componentes genéricos que não tenham ao menos dois usos claros, salvo primitivas de acessibilidade.

### 11.3 Contrato dos dados

O JSON legado usa `type`: `0` palestrantes, `1` temas, `2` instituições, `3` depoimentos, `5` clientes também usados pela Open, `6` vídeo hero e `7` imagens de localização, conforme consumidores inspecionados. Inventariar outros tipos antes de remover registros.

Criar adapter que entregue coleções nomeadas e trate campos ausentes. Manter o JSON público compatível na primeira migração; evitar fazer todos os componentes conhecerem os códigos numéricos.

```js
// Contrato ilustrativo; não são novos dados comerciais.
{
  event: { name, edition, startsAt, endsAt, timezone, venue, city, address },
  actions: { registrationUrl, groupsUrl, contactUrl },
  hero: { title, subtitle, poster, mobilePoster, video },
  speakers: [{ id, name, role, bio, portrait, focalPoint, socials }],
  themes: [{ id, order, title, description }],
  pricing: [{ id, label, amount, currency, startsAt, endsAt, statusOverride }],
  institutions: [{ id, name, logo, relationship }],
  testimonials: [{ id, author, institution, quote, video, poster, transcript }]
}
```

Valores monetários em unidade inteira mínima na futura estrutura, formatação em `pt-BR`; não extrair regra comercial de string formatada. Os lotes legados podem ser adaptados antes de alterar sua fonte.

Estados de conteúdo: `loading`, `success`, `empty`, `error`; cancelar requisições obsoletas. Dados estáveis de hero devem estar disponíveis cedo, sem esperar um JSON grande de galerias. Cache simples compartilhado é suficiente; não introduzir biblioteca de estado global por hábito.

### 11.4 Mapa de migração incremental

1. Adicionar tokens/primitivas sem apagar componentes atuais.
2. Construir header/hero novos com dados reais.
3. Substituir seções na `LandingPage` uma a uma, verificando imports e IDs.
4. Trocar componentes compartilhados nas rotas internas.
5. Migrar galerias e redirects, mantendo URLs legadas testáveis.
6. Revisar arquivos/CSS sem consumidores; remover somente após busca de referências.
7. Consolidar estilos globais e dependências ao final; não manter dois sistemas visuais ativos na entrega.

Não criar infraestrutura de feature flags permanente para uma troca única. Usar branch de trabalho e preview isolado para validar a migração.

## 12. Responsividade e acessibilidade

| Aspecto | Desktop | Tablet | Mobile |
| --- | --- | --- | --- |
| Hero | Central, ações em linha | Mesma hierarquia com escala menor | Conteúdo cresce; ações empilhadas |
| Header | Links completos | Colapsar quando faltar espaço real | Drawer acessível |
| Palestrantes | 3 colunas | 2 colunas | 1 coluna |
| Prova | Números e fotos em composição | Fotos abaixo se necessário | Números legíveis, fotos sem sobreposição |
| Investimento | Oferta + grupos lado a lado | 2 colunas se texto couber | Oferta seguida de grupos |
| Formulário | 2 colunas de seção | 1 ou 2 conforme largura | 1 coluna, inputs ≥ 16 px |
| Álbum | 3–4 colunas | 2–3 colunas | 1–2 conforme proporção das fotos |
| Barra fixa | Grupo compacto central | Grupo compacto | Uma linha e safe area |

Testar larguras de 360, 390, 430, 768, 1024, 1280, 1440 e 1920 px. Testar também altura reduzida, landscape, zoom de 200%, aumento de fonte e textos longos. Breakpoints são consequências do conteúdo, não apenas nomes de dispositivos.

Requisitos de aceite:

- Um H1 por página; estrutura H2/H3 coerente; logo do header não deve ocupar H1.
- Link para pular ao conteúdo; landmarks `header`, `nav`, `main`, `footer`.
- Foco visível em todas as superfícies, incluindo fundos dourados e vídeos.
- Contraste alvo 4,5:1 para texto normal, 3:1 para texto grande e elementos essenciais de interface.
- Alvos de toque de pelo menos 44 × 44 px como meta do projeto, preferindo 48 px.
- Diálogos com nome, controle de foco, Escape e restauração; nenhum elemento atrás recebe foco indevidamente.
- Estado não depende apenas de cor. “Lote encerrado” precisa ser texto.
- Sem overflow horizontal mascarado por `overflow-x: hidden`; corrigir a causa.
- Decorativos com alt vazio/aria-hidden; retratos e imagens informativas descritos conforme contexto.
- Nenhuma função depende exclusivamente de hover, drag ou swipe.
- Todos os efeitos têm alternativa com redução de movimento.

## 13. Performance, SEO e operação

### 13.1 Metas de engenharia propostas

- LCP ≤ 2,5 s; CLS ≤ 0,1; INP ≤ 200 ms como metas de campo. INP exige dados de interação reais; Lighthouse isolado não comprova esse valor.
- Lighthouse mobile: meta ≥ 90 em performance/acessibilidade/boas práticas/SEO no ambiente acordado; usar mediana de três execuções equivalentes e registrar limitações do ambiente.
- Orçamento inicial: JavaScript da rota inicial ≤ 200 KB gzip e CSS ≤ 60 KB gzip, a confirmar contra baseline existente.
- Sem vídeo, mapa, lightbox ou galeria completa bloqueando a primeira dobra.
- Lazy loading de rotas secundárias e módulos pesados; preservar poster e layout para evitar CLS.
- Fontes críticas limitadas, `font-display: swap` e fallback compatível; preload somente do recurso realmente crítico.
- Nenhum erro de console não justificado, nenhum link essencial quebrado e nenhuma requisição de mídia em loop após falha.

Essas metas não foram medidas nesta etapa. Não converter estimativas em resultados na entrega.

### 13.2 SEO e publicação

- Título/description por rota; canonical correspondente; Open Graph com imagem raster adequada.
- Sitemap com páginas reais e edições válidas; revisar robots no host de preview/produção.
- Dados estruturados de evento somente com data, local, organizador e oferta confirmados; não inserir avaliações fictícias.
- Verificar se SPA atende à indexação/preview social necessários. Se o conteúdo não aparecer para os crawlers relevantes, avaliar prerender estático das rotas públicas como decisão separada; não prometer que alteração client-side de meta resolve todo compartilhamento.
- Checar refresh direto de cada rota no host real. Vite dev não valida configuração Apache/Netlify.
- Testar formulário na origem de homologação com endpoint controlado; não disparar leads reais durante testes visuais.
- Analytics: plano proposto de eventos `registration_click`, `group_contact_click`, `speaker_open`, `video_play`, `gallery_open`, `contact_success`. Integração depende da ferramenta existente/definida; não enviar nomes, e-mails ou telefone em eventos.

## 14. Fases e backlog executável

Estimativas em dias úteis de esforço, não calendário contratual. Consideram uma pessoa com apoio editorial/design quando indicado. Não somar tarefas paralelas como se fossem necessariamente executadas simultaneamente. Revisões do cliente e espera de assets podem ampliar o prazo.

| Fase | Esforço orientativo | Dependência | Entrega e critério de saída |
| --- | --- | --- | --- |
| F0 — Baseline e conteúdo | 1–2 dias | Acesso ao repo/referência | Inventário, capturas, conteúdo e integrações catalogados |
| F1 — Direção de alta fidelidade | 2–3 dias | F0 | Hero + palestrantes + conversão em desktop/mobile revisáveis |
| F2 — Fundação técnica | 1–2 dias | F1 | Tokens, primitivas, dados e layout responsivo |
| F3 — Home estática | 3–5 dias | F2 + assets mínimos | Todas as seções com conteúdo real e estados |
| F4 — Interação e motion | 2–3 dias | F3 | Fluxos completos e redução de movimento |
| F5 — Páginas internas | 2–4 dias | F2; consolidar após F3 | Open, galerias, álbuns e compatibilidade de URLs |
| F6 — QA e refinamento | 2–3 dias | F4 + F5 | Matriz de aceite, comparação visual e correções |
| F7 — Homologação/publicação | 0,5–1 dia | F6 + dados comerciais | Preview aprovado e release verificável |

Faixa de referência: aproximadamente 14–23 dias úteis de esforço, dependendo de assets e rodadas de revisão. Um prazo menor exige reduzir escopo explicitamente, não eliminar QA em silêncio.

### F0 — Baseline e conteúdo

- [ ] Registrar commit base, árvore de rotas e estado de trabalho; preservar alterações preexistentes.
- [ ] Instalar dependências pelo lockfile e registrar versão do runtime compatível com o projeto.
- [ ] Executar build/lint baseline; separar falhas preexistentes das introduzidas.
- [ ] Capturar GTAP atual e referência em 1440 × 900 e 390 × 844; capturar também viewport de auditoria 1280 × 720 se útil para comparar as medidas deste plano.
- [ ] Salvar evidências em `docs/redesign/evidencias/` com data, viewport, seção e estado no nome; não subir vídeos pesados sem necessidade.
- [ ] Gravar rolagem e abertura/fechamento das interações de referência que forem relevantes; não realizar compras/envios.
- [ ] Inventariar textos, imagens, URLs, tipos de dados, alt, dimensões e peso.
- [ ] Confirmar edição, data, lote, destino de inscrição, local e palestrantes com fonte registrada.
- [ ] Registrar o contrato observado do formulário e ambiente seguro de teste.

**Saída:** baseline reproduzível, lista de pendências editoriais e mapa de equivalências aprovado para implementação. Sem confirmação comercial, usar sinalização no preview e impedir publicação de valores especulativos.

### F1 — Direção visual

- [ ] Produzir composição do hero desktop/mobile com conteúdo GTAP.
- [ ] Produzir prova/manifesto, grid de pessoas e investimento com as mesmas regras.
- [ ] Escolher lettering, família de texto, tokens e recortes.
- [ ] Montar comparação lado a lado por seção, anotando adaptações deliberadas.
- [ ] Revisar proporção entre marca, headline, data e CTA; não avançar com hero genérico.
- [ ] Validar que o azul/dourado mantém a intensidade desejada; se não, ajustar superfícies antes de replicar.
- [ ] Registrar decisão do cliente sobre proximidade cromática literal versus identidade GTAP.

**Saída:** composição de alta fidelidade consistente, sem depender de placeholders que alterem drasticamente o layout final.

### F2 — Fundação

- [ ] Criar tokens, estilos tipográficos, container, botão, heading e estados de foco.
- [ ] Criar header/mobile menu/footer e ações persistentes.
- [ ] Implementar adapter de dados e configuração única de evento/lotes/destinos.
- [ ] Implementar diálogo/accordion/imagem responsiva com contrato acessível.
- [ ] Definir camadas: conteúdo 0, header 20, ações 30, backdrop 80, modal 90, feedback 100; revisar contextos de empilhamento.
- [ ] Garantir fallback estático e redução de movimento antes de efeitos.

**Saída:** primitives e shell utilizáveis por teclado nas larguras principais.

### F3 — Home

- [ ] Implementar S01–S12 na ordem narrativa, com dados reais.
- [ ] Validar cada seção isolada em 390 e 1440 px antes de seguir.
- [ ] Reservar dimensões das mídias e carregar apenas recursos necessários.
- [ ] Implementar estados empty/error/loading sem alterar abruptamente altura.
- [ ] Conferir IDs e links legados; manter conteúdo relevante de seções atuais.
- [ ] Revisar CTAs e impedir informação comercial contraditória.

**Saída:** home completa e convincente sem animações.

### F4 — Interações

- [ ] Aplicar tabela de motion com um controlador coerente.
- [ ] Implementar gatilho da barra por IntersectionObserver no hero; evitar lógica baseada apenas em wheel.
- [ ] Completar menu, biografias, player, accordion e estados do formulário.
- [ ] Testar redução de movimento, teclado virtual e scroll em dispositivos móveis.
- [ ] Verificar cleanup de efeitos e mídia ao trocar de rota/fechar diálogo.

**Saída:** nenhuma interação exige mouse; nenhuma animação bloqueia conteúdo ou inscrição.

### F5 — Internas

- [ ] Migrar Open mantendo identidade institucional.
- [ ] Migrar índice de edições e catálogo único.
- [ ] Construir álbum/lightbox e estados de falha.
- [ ] Mapear as nove URLs históricas para destinos canônicos.
- [ ] Implementar 404, títulos por rota e restauração de navegação.

**Saída:** o redesign é de todo o site, sem páginas antigas visualmente desconectadas.

### F6 — QA

- [ ] Executar build/lint e testes relevantes; registrar resultados reais.
- [ ] Rodar matriz de fluxos, tamanhos e estados da seção 15.
- [ ] Revisar imagens e texto real com design/cliente.
- [ ] Medir performance e corrigir recursos dominantes.
- [ ] Fazer revisão por teclado e leitor de tela; complementar ferramentas automáticas.
- [ ] Fazer comparação visual e atingir a pontuação interna mínima.

**Saída:** evidências anexadas, defeitos críticos/altos corrigidos e diferenças intencionais documentadas.

### F7 — Entrega

- [ ] Preparar preview, resumo do que mudou e pendências comerciais remanescentes.
- [ ] Confirmar conteúdo final e fluxo de inscrição antes de release.
- [ ] Registrar release/base anterior para rollback.
- [ ] Publicar somente no ambiente e fluxo autorizados para a implementação.
- [ ] Conferir produção: home, rota profunda, formulário controlado, mídia, redirects e metadados.

**Saída:** site publicado verificável, com caminho de reversão e documentação de manutenção.

## 15. QA e critérios de fidelidade

### 15.1 Comparação visual reproduzível

1. Usar mesmo viewport e zoom nos dois lados; registrar browser e DPR.
2. Capturar estados finais de entrada, com fontes carregadas. Congelar mídia por poster para comparação estática; avaliar movimento em gravação separada.
3. Comparar capítulos equivalentes, não a posição absoluta de scroll de páginas com conteúdo diferente.
4. Avaliar primeiro silhueta: altura do hero, volume tipográfico, área de mídia, margens e alternância de cor.
5. Depois avaliar recortes, raio, alinhamentos, botões e densidade de texto.
6. Registrar cada divergência como defeito ou adaptação intencional, com justificativa.
7. Produzir diff automatizado entre versões do próprio GTAP para detectar regressões. Não usar porcentagem de pixels iguais à referência como prova de fidelidade quando marcas e textos são distintos.

### 15.2 Rubrica interna de qualidade

Pontuar cada dimensão de 0 a 5 e aplicar o peso. Exigir pelo menos 90/100 e nenhuma dimensão abaixo de 4/5. É um critério interno de revisão, não medição científica de semelhança.

| Dimensão | Peso | O que observar |
| --- | --- | --- |
| Hero e assinatura de campanha | 20 | Impacto, hierarquia, primeira dobra e mensagem |
| Tipografia e composição | 20 | Escala, quebras, ritmo editorial, margens |
| Fotografia e arte | 15 | Retratos, recortes, consistência e autenticidade |
| Ritmo entre seções | 15 | Alternância de superfícies e densidades |
| Interações e motion | 15 | Intenção, fluidez, feedback e acessibilidade |
| Mobile | 15 | Composição própria, legibilidade e conversão sem sobreposição |

A pontuação não substitui os gates funcionais. Um site visualmente forte com formulário quebrado ou preço incorreto reprova.

### 15.3 Matriz funcional mínima

| Fluxo/estado | Verificação esperada | Tipo de evidência |
| --- | --- | --- |
| Entrada → investimento → inscrição | CTA aponta ao destino validado com preço/status coerentes | E2E sem concluir contato/compra |
| Header desktop/mobile | Todos os destinos, hashes e foco funcionam | Teclado + navegador |
| Biografia | Abrir, navegar, fechar, Escape e foco restaurado | E2E + leitura manual |
| Vídeo | Reproduzir voluntariamente, pausar e fechar | Manual com mídia |
| Formulário inválido | Mensagem por campo, sem requisição indevida | Teste de integração |
| Formulário sucesso/falha/timeout | Feedback correto, valores preservados em erro e retry | Endpoint simulado |
| Lote antes/no início/no fim/depois | Intervalos e fallback corretos; sem preço nulo exposto | Testes de domínio com data fixa |
| Galerias | Nove edições, deep links antigos/novos e refresh | E2E + host de preview |
| Imagem/JSON indisponível | Fallback e retry; conteúdo essencial continua útil | Rede simulada |
| Redução de movimento | Conteúdo final visível; mídia decorativa estática | Preferência do sistema/emulação |
| Zoom/teclado virtual | Formulário e CTA não cobertos | Manual mobile |
| Navegação repetida | Sem timers, vídeos ou observers residuais | Inspeção e interação repetida |

Se for adicionada infraestrutura de testes, priorizar Vitest/Testing Library para lógica/estados e Playwright para fluxos/visuais, após conferir documentação oficial e compatibilidade no momento da instalação. Essas ferramentas são propostas; não estão configuradas no repositório agora. Não criar centenas de snapshots de detalhes triviais.

### 15.4 Definição de pronto

- [ ] Todas as rotas previstas migradas e URLs legadas preservadas.
- [ ] Todos os conteúdos comerciais confirmados; nenhum placeholder público.
- [ ] Hero, retratos e investimento aprovados visualmente em desktop/mobile.
- [ ] Fluxo de inscrição e contato verificados no ambiente adequado.
- [ ] Menu, diálogo, player e galeria funcionam por teclado/toque.
- [ ] Nenhuma sobreposição crítica, imagem distorcida ou texto truncado.
- [ ] Build/lint e testes acordados aprovados, ou exceções preexistentes documentadas explicitamente.
- [ ] Performance medida, evidências registradas e principais gargalos tratados.
- [ ] Metadados, compartilhamento, links externos e refresh de rotas verificados.
- [ ] Documentação dos dados, lotes, assets e publicação atualizada.

## 16. Riscos, decisões e limites de escopo

| Risco | Efeito | Resposta prevista |
| --- | --- | --- |
| Cliente espera igualdade literal de paleta | Resultado parece menos próximo apesar da composição | Validar comparação visual em F1 antes de replicar |
| Assets insuficientes | Layout depende de mídia fraca | Produzir/selecionar mídia em F0–F1; poster estático é alternativa |
| Referência muda | Comparação fica inconsistente | Congelar capturas datadas, não perseguir mudanças diárias |
| Dados antigos misturados | Edição ou preço incorretos | Fonte única e revisão editorial |
| Motion excessivo | Lentidão ou dificuldade de leitura | Limites de movimento, scroll nativo e fallback |
| Endpoint externo | Formulário falha em preview | Confirmar contrato/origem e testar sem leads reais |
| URLs de mídia remota quebram | Fotos/vídeos desaparecem | Inventário, fallback e hospedagem própria quando definida |
| CSS global conflita | Internas ficam inconsistentes | Escopo por componente, tokens e migração gradual |
| SPA/host não resolve rotas | Refresh retorna erro | QA no host real e redirects explícitos |

Fora do escopo automático: novo checkout, área do participante, CMS, CRM, autenticação, app móvel, reescrita do backend PHP, disparos comerciais e migração de infraestrutura. Caso necessários, abrir decisão técnica própria com objetivo e impacto.

## 17. Primeiro pacote de implementação

Para iniciar a execução sem dispersão, o primeiro pacote deve entregar somente:

1. Baseline e inventário de conteúdo/assets.
2. Tokens e tipografia provisória.
3. Header + hero de alta fidelidade em 1440 e 390 px.
4. Uma seção de palestrantes representativa com nomes e retratos reais.
5. Uma seção de investimento com todos os estados comerciais modelados.
6. Comparação visual anotada com a referência e decisão sobre identidade cromática.

Esse pacote comprova a direção antes de multiplicar componentes. Depois dele, seguir as fases até concluir todas as páginas. Não chamar o primeiro pacote de redesign completo.

## 18. Fontes e manutenção do plano

- Referência visual primária: [Gramado Summit — página inicial](https://www.gramadosummit.com/), inspecionada em 18/09/2026.
- Evidência técnica local: `package.json`, `src/App.jsx`, páginas/componentes citados, JSONs em `public/api`, `index.html`, `.htaccess` e `public/_redirects`.
- Skill aplicada ao planejamento: [frontend-design-direction](/Users/icaroisd/.codex/plugins/cache/ecc/ecc/2.2.1/skills/frontend-design-direction/SKILL.md). Este caminho é local à máquina de elaboração; as regras necessárias já estão traduzidas no documento.

Atualizar este plano quando mudar identidade, conteúdo comercial, ordem das seções ou contrato de integração. Registrar diferenças aprovadas; manter as decisões visuais junto do código para que próximas implementações não retornem a uma interpretação genérica da referência.

### Ajuste aprovado de direção — 21/09/2026

A pedido do usuário, superfícies amarelas de Temas, Ingressos e Contato passam a creme `#fff4d8`; amarelo saturado permanece nos CTAs. Header fixo recebe vidro azul translúcido com blur e filete claro. Escala fluida limitada ao equivalente de 1440px, conteúdo central de 1206px e molduras de mídia até 1380px, mantendo fundos de ponta a ponta e sem aplicar zoom CSS. Contato simplificado para “Dúvidas sobre o GTAP? Fale com nossa equipe.”.

### Revisão mobile — 21/09/2026

Ajustes de layout restritos a até 720px: margens de 20px, título do hero balanceado, data em linha própria, fotos dos temas intercaladas com a lista, grade de palestrantes em duas colunas, controles de depoimentos abaixo do título, mapa no fluxo da moldura, formulário compacto e galerias em duas colunas. Desktop mantém os estilos anteriores. Menu ganha fechamento explícito e restauração de foco sem salto de rolagem; barra de conversão fica oculta durante foco no formulário mobile.
