import { useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { LandingPage } from "./pages/landingPage/LandingPage";
import { ORG } from "./data/event";
import { GaleriaPage } from "./pages/galeria/GaleriaPage";
import { GaleriaEdition } from "./pages/galeria/galeriaEdition/GaleriaEdition";
import { NotFound } from "./pages/notFound/NotFound";
import { Loading } from "./components/Loading/Loading";
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
    if (hash) return;
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
