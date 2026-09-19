# website-gtap

Site do Congresso Brasileiro de Gestão Tributária na Administração Pública.

## Planejamento do redesign

O [plano detalhado de redesign](docs/redesign/PLANO-REDESIGN-GTAP.md) documenta a análise da referência Gramado Summit, a direção visual proposta, as especificações por página e componente, as interações, a migração técnica e os critérios de aceite.

O documento é o guia principal da implementação. O redesign foi **implementado** sobre a stack existente (React 19 + Vite 6 + React Router 7): novo sistema visual (azul profundo + dourado), header/hero/palestrantes/investimento, demais seções da home, páginas Open e Galeria (com álbum + lightbox), rodapé, formulário e estados interativos.

Registros da execução (baseline, análise da referência, status e entrega) estão em [`docs/redesign/evidencias/`](docs/redesign/evidencias/).

## Desenvolvimento

```bash
npm install
npm run dev      # servidor de desenvolvimento (Vite)
npm run build    # build de produção
npm run lint     # ESLint
```
