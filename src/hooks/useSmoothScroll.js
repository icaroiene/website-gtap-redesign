import { useEffect } from "react";
import Lenis from "lenis";

// Rolagem suave (inércia leve) com Lenis.
// - Respeita prefers-reduced-motion (não instancia).
// - Pausa quando drawer/diálogo trava a rolagem (body.no-scroll).
// - Âncoras internas rolam suavemente compensando o header fixo.
export function useSmoothScroll() {
  useEffect(() => {
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({
      lerp: 0.14,
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.3,
    });
    window.__lenis = lenis;

    let raf = requestAnimationFrame(function loop(t) {
      lenis.raf(t);
      raf = requestAnimationFrame(loop);
    });

    const syncLock = () => {
      if (document.body.classList.contains("no-scroll")) lenis.stop();
      else lenis.start();
    };
    const mo = new MutationObserver(syncLock);
    mo.observe(document.body, { attributes: true, attributeFilter: ["class"] });
    syncLock();

    let anchorFrame = 0;
    const headerOffset = () => {
      const h = document.querySelector(".site-header")?.getBoundingClientRect().height || 80;
      return -(h + 8);
    };
    const onClick = (e) => {
      const a = e.target.closest('a[href^="#"], a[href^="/#"]');
      if (!a || window.location.pathname !== "/" || e.defaultPrevented || e.button !== 0
        || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const hash = a.getAttribute("href").split("#")[1];
      const el = hash && document.getElementById(hash);
      if (!el) return;
      e.preventDefault();
      window.history.pushState(null, "", `#${hash}`);
      cancelAnimationFrame(anchorFrame);
      const go = () => {
        if (document.body.classList.contains("no-scroll")) {
          anchorFrame = requestAnimationFrame(go);
          return;
        }
        lenis.resize();
        const top = el.getBoundingClientRect().top + window.scrollY;
        lenis.scrollTo(top + (hash === "ingressos" ? 0 : headerOffset()), {
          duration: 0.75,
        });
      };
      anchorFrame = requestAnimationFrame(go);
    };
    document.addEventListener("click", onClick);

    return () => {
      cancelAnimationFrame(raf);
      cancelAnimationFrame(anchorFrame);
      mo.disconnect();
      document.removeEventListener("click", onClick);
      lenis.destroy();
      delete window.__lenis;
    };
  }, []);
}
