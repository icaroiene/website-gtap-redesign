import { useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { LandingPage } from "./pages/landingPage/LandingPage";
import { LEGACY_HASH, ORG } from "./data/event";
import { GaleriaPage } from "./pages/galeria/GaleriaPage";
import { GaleriaEdition } from "./pages/galeria/galeriaEdition/GaleriaEdition";
import { NotFound } from "./pages/notFound/NotFound";
import { Loading } from "./components/Loading/Loading";
import { PageScrollbar } from "./components/PageScrollbar/PageScrollbar";
import { useSmoothScroll } from "./hooks/useSmoothScroll";

// Rota antiga "A Open" (página interna) agora leva ao site oficial da Open.
function ExternalRedirect({ to }) {
  useEffect(() => {
    window.location.replace(to);
  }, [to]);
  return null;
}

// Ao trocar de rota: sobe ao topo quando não há hash; hash tem precedência.
function ScrollManager() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      let frame = 0;
      let attempts = 0;
      let id;
      try { id = decodeURIComponent(hash.slice(1)); } catch { return; }
      id = LEGACY_HASH[id] || id;
      const position = () => {
        if (++attempts > 180) return;
        const target = document.getElementById(id);
        if (!target || document.body.classList.contains("no-scroll")) {
          frame = requestAnimationFrame(position);
          return;
        }
        const header = document.querySelector(".site-header")?.getBoundingClientRect();
        const offset = id === "ingressos" && !window.matchMedia("(max-width: 720px)").matches ? 0 : (header?.bottom || 80) + 12;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        if (window.__lenis) {
          window.__lenis.resize();
          window.__lenis.scrollTo(top, { immediate: true, force: true });
        } else window.scrollTo({ top, behavior: "instant" });
      };
      frame = requestAnimationFrame(position);
      return () => cancelAnimationFrame(frame);
    }
    // Com o Lenis ativo, o pulo precisa passar por ele (force: funciona mesmo parado)
    if (window.__lenis) window.__lenis.scrollTo(0, { immediate: true, force: true });
    else window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [pathname, hash]);
  return null;
}

function App() {
  useSmoothScroll();
  return (
    <BrowserRouter>
      <Loading />
      <ScrollManager />
      <PageScrollbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="open-solucoes-tributarias" element={<ExternalRedirect to={ORG.site} />} />
        <Route path="galeria" element={<GaleriaPage />} />
        <Route path="galeria/:slug" element={<GaleriaEdition />} />
        {/* URLs legadas de álbum: /IX%20GTAP etc. */}
        <Route path=":editionText" element={<GaleriaEdition />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
