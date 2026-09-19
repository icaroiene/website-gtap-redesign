import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "../../hooks/useReveal";
import "./AmbientVideo.css";

// Vídeo ambiente (mudo, em loop) para fundos e cards: só baixa e toca quando
// está perto da tela, pausa quando sai, mostra o pôster até o primeiro frame.
// Com reduced-motion (ou `mobile={false}` em telas pequenas) fica só o pôster.
// Checagem por geometria no scroll + timer (IntersectionObserver não dispara
// em documento oculto e a rolagem suave é programática).
export const AmbientVideo = ({ src, poster, className = "", margin = 800, mobile = true }) => {
  const ref = useRef(null);
  const reduced = useReducedMotion();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const v = ref.current;
    if (!v || !src || reduced) return;
    // Avaliado a cada tick (não só no mount): o viewport pode mudar de tamanho
    const small = window.matchMedia("(max-width: 720px)");
    let loaded = false;
    const near = () => {
      const r = v.getBoundingClientRect();
      return r.bottom > -margin && r.top < window.innerHeight + margin;
    };
    const tick = () => {
      if (!mobile && small.matches) {
        if (loaded && !v.paused) v.pause();
        return;
      }
      if (near()) {
        if (!loaded) {
          loaded = true;
          v.src = src;
          v.load();
        }
        if (v.paused) v.play().catch(() => {});
      } else if (loaded && !v.paused) {
        v.pause();
      }
    };
    tick();
    window.addEventListener("scroll", tick, { passive: true });
    const poll = setInterval(tick, 2500);
    return () => {
      window.removeEventListener("scroll", tick);
      clearInterval(poll);
      v.pause();
    };
  }, [src, reduced, mobile, margin]);

  return (
    <div className={`ambient ${className}`.trim()} aria-hidden="true">
      {poster && <img className="ambient__poster" src={poster} alt="" loading="lazy" />}
      <video
        ref={ref}
        className={`ambient__video${ready ? " is-ready" : ""}`}
        muted
        loop
        playsInline
        preload="none"
        tabIndex={-1}
        onPlaying={() => setReady(true)}
      />
    </div>
  );
};
