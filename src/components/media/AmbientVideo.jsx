import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "../../hooks/useReveal";
import "./AmbientVideo.css";

// Vídeo ambiente (mudo, em loop) para fundos e cards: só baixa e toca quando
// está perto da tela, pausa quando sai, mostra o pôster até o primeiro frame.
// Com reduced-motion (ou `mobile={false}` em telas pequenas) fica só o pôster.
// Observadores separam o pré-carregamento da reprodução; abas ocultas pausam.
export const AmbientVideo = ({ src, poster, className = "", margin = 800, mobile = false }) => {
  const ref = useRef(null);
  const reduced = useReducedMotion();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const v = ref.current;
    if (!v || !src || reduced) return;
    // Avaliado a cada tick (não só no mount): o viewport pode mudar de tamanho
    const small = window.matchMedia("(max-width: 720px)");
    let loaded = false;
    let visible = false;
    let near = false;
    const tick = () => {
      if (document.hidden || (!mobile && small.matches)) {
        if (loaded && !v.paused) v.pause();
        return;
      }
      if (near) {
        if (!loaded) {
          loaded = true;
          v.src = src;
          v.load();
        }
      }
      if (loaded && visible) {
        if (v.paused) v.play().catch(() => {});
      } else if (loaded && !v.paused) {
        v.pause();
      }
    };
    const target = v.closest("section") || v.parentElement;
    const preload = new IntersectionObserver(([entry]) => {
      near = entry.isIntersecting;
      tick();
    }, { rootMargin: `${margin}px` });
    const playback = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      tick();
    });
    preload.observe(target);
    playback.observe(target);
    document.addEventListener("visibilitychange", tick);
    small.addEventListener("change", tick);
    return () => {
      preload.disconnect();
      playback.disconnect();
      document.removeEventListener("visibilitychange", tick);
      small.removeEventListener("change", tick);
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
