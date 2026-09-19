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
      lerp: 0.085,
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

    const headerOffset = () => {
      const h = document.querySelector(".site-header")?.getBoundingClientRect().height || 80;
      return -(h + 8);
    };
    const onClick = (e) => {
      const a = e.target.closest('a[href^="#"], a[href^="/#"]');
      if (!a || window.location.pathname !== "/") return;
      const hash = a.getAttribute("href").split("#")[1];
      const el = hash && document.getElementById(hash);
      if (!el) return;
      e.preventDefault();
      window.history.pushState(null, "", `#${hash}`);
      lenis.scrollTo(el, { offset: headerOffset(), duration: 1.4 });
    };
    document.addEventListener("click", onClick);

    return () => {
      cancelAnimationFrame(raf);
      mo.disconnect();
      document.removeEventListener("click", onClick);
      lenis.destroy();
      delete window.__lenis;
    };
  }, []);
}
