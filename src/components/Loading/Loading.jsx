import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import logoX from "../../assets/figma/loading-x.svg";
import logoGlobe from "../../assets/figma/loading-globe.svg";
import logoGtap from "../../assets/figma/loading-gtap.svg";
import logoText from "../../assets/figma/loading-text.svg";
import { routeTransition } from "../../hooks/routeTransition";
import "./Loading.css";

const MIN_FIRST_MS = 650;
const MIN_ROUTE_MS = 300;

// Tela de loading do Figma (5132:120). No primeiro carregamento, espera a página;
// nas trocas de rota, a mesma cortina desce, mostra o logo e sobe.
export const Loading = () => {
  const { pathname } = useLocation();
  const firstPath = useRef(pathname);
  const [state, setState] = useState({ phase: "visible", mode: "first", key: 0 });

  // TransitionLink: a cortina desce ANTES de a rota mudar
  useEffect(
    () => routeTransition.subscribe(() => setState((s) => ({ phase: "visible", mode: "route", key: s.key + 1 }))),
    []
  );

  // Troca de rota sem TransitionLink (voltar do navegador, link externo) => cortina agora
  useEffect(() => {
    if (pathname === firstPath.current) return;
    firstPath.current = pathname;
    if (routeTransition.consumePending()) return; // já coberta pela cortina
    setState((s) => ({ phase: "visible", mode: "route", key: s.key + 1 }));
  }, [pathname]);

  useEffect(() => {
    if (state.phase !== "visible") return;
    document.body.classList.add("loading-active", "no-scroll");
    const start = performance.now();
    const min = state.mode === "first" ? MIN_FIRST_MS : MIN_ROUTE_MS;
    let t1;

    let finished = false;
    const finish = () => {
      if (finished) return;
      finished = true;
      const wait = Math.max(0, min - (performance.now() - start));
      t1 = window.setTimeout(() => {
        setState((s) => ({ ...s, phase: "leaving" }));
        document.body.classList.remove("loading-active", "no-scroll");
      }, wait);
    };
    // O conteúdo já está montado; mídia remota não bloqueia a navegação.
    finish();

    return () => {
      window.clearTimeout(t1);
      document.body.classList.remove("loading-active", "no-scroll");
    };
  }, [state.phase, state.mode, state.key]);

  // Cortina subiu => remove do DOM (timer separado para não ser cancelado
  // pela limpeza do efeito acima ao mudar de fase)
  useEffect(() => {
    if (state.phase !== "leaving") return;
    const t = window.setTimeout(() => setState((s) => ({ ...s, phase: "done" })), 360);
    return () => window.clearTimeout(t);
  }, [state.phase]);

  if (state.phase === "done") return null;

  return (
    <div
      key={state.key}
      className={`loading${state.mode === "route" ? " is-route" : ""}${state.phase === "leaving" ? " is-leaving" : ""}`}
      role="status"
      aria-live="polite"
      aria-label="Carregando"
    >
      <div className="loading__logo" aria-hidden="true">
        <img className="loading__part loading__x" src={logoX} alt="" />
        <img className="loading__part loading__globe" src={logoGlobe} alt="" />
        <img className="loading__part loading__gtap" src={logoGtap} alt="" />
        <img className="loading__part loading__text" src={logoText} alt="" />
      </div>
    </div>
  );
};
