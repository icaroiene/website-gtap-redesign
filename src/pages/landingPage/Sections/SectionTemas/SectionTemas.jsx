import { useEffect, useRef } from "react";
import { adaptLandingData } from "../../../../data/event";
import { useReveal, useReducedMotion } from "../../../../hooks/useReveal";
import foto1 from "../../../../assets/figma/temas-foto-1.webp";
import foto2 from "../../../../assets/figma/temas-foto-2.webp";
import "./SectionTemas.css";

const ThemeRow = ({ theme, index }) => (
  <li className="theme-row" data-reveal data-reveal-index={index}>
    <span className="h2 theme-row__num" aria-hidden="true">
      {String(theme.order).padStart(2, "0")}
    </span>
    <p className="body-lg theme-row__text">{theme.description}</p>
  </li>
);

// "Temas confirmados" do Figma: amarelo, numeração Bebas, filetes,
// foto à direita alinhada ao topo do título (01–03) e foto à esquerda (04–07).
// Fotos inclinadas como na referência: rotação de repouso + leve rotação/parallax
// ligados ao scroll (transform no wrapper; a entrada "wipe" fica no figure).
const useScrollTilt = (refs, reduced) => {
  useEffect(() => {
    if (reduced) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const vh = window.innerHeight;
      refs.forEach(({ ref, base, range = 6 }) => {
        const el = ref.current;
        if (!el) return;
        const r = el.getBoundingClientRect();
        const p = Math.min(1, Math.max(0, (vh - r.top) / (vh + r.height))); // 0 → 1
        const rot = base + (p - 0.5) * range;
        const y = (0.5 - p) * 48;
        el.style.transform = `translate3d(0, ${y.toFixed(1)}px, 0) rotate(${rot.toFixed(2)}deg)`;
      });
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [refs, reduced]);
};

// 3D interativo: o cartão inclina em X/Y seguindo o cursor (com perspectiva),
// cresce um pouco e recebe um brilho que acompanha o ponteiro.
const use3DTilt = (reduced) => {
  const onMove = (e) => {
    if (reduced) return;
    const card = e.currentTarget;
    const inner = card.querySelector(".themes__3d");
    const r = card.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top) / r.height;
    const ry = (x - 0.5) * 18;
    const rx = (0.5 - y) * 14;
    inner.style.transform = `rotateX(${rx.toFixed(2)}deg) rotateY(${ry.toFixed(2)}deg) scale3d(1.05, 1.05, 1.05)`;
    inner.style.setProperty("--gx", `${(x * 100).toFixed(1)}%`);
    inner.style.setProperty("--gy", `${(y * 100).toFixed(1)}%`);
    inner.classList.add("is-hover");
  };
  const onLeave = (e) => {
    const inner = e.currentTarget.querySelector(".themes__3d");
    inner.style.transform = "";
    inner.classList.remove("is-hover");
  };
  return { onPointerMove: onMove, onPointerLeave: onLeave };
};

export const SectionTemas = ({ data }) => {
  const { themes } = adaptLandingData(data);
  const revealRef = useReveal({ stagger: 70, deps: [themes.length] });
  const reduced = useReducedMotion();
  const photoA = useRef(null);
  const photoB = useRef(null);
  const tiltRefs = useRef([
    { ref: photoA, base: -4 },
    { ref: photoB, base: 5, range: 2 },
  ]).current;
  useScrollTilt(tiltRefs, reduced);
  const tilt3d = use3DTilt(reduced);

  return (
    <section className="themes on-yellow" id="temas" ref={revealRef}>

      <div className="container themes__inner">
        <div className="themes__block">
          <div className="themes__col">
            <h2 className="h2 themes__title"><span className="section-copy--desktop">O que vamos discutir no X GTAP</span><span className="section-copy--mobile">O que vamos discutir:</span></h2>
            <ol className="themes__list" start="1">
              {themes.map((t, i) => <ThemeRow key={t.id} theme={t} index={i + 1} />)}
            </ol>
          </div>
          <div className="themes__photos">
          <div className="themes__photo-wrap themes__photo-wrap--a" ref={photoA}>
            <figure className="themes__photo" data-reveal data-reveal-fx="wipe" {...tilt3d}>
              <div className="themes__3d">
                <img src={foto1} alt="Participante fotografando o palco do GTAP" loading="lazy" />
              </div>
            </figure>
          </div>
            <div className="themes__photo-wrap themes__photo-wrap--b" ref={photoB}>
              <figure className="themes__photo" data-reveal data-reveal-fx="wipe" data-reveal-index="1" {...tilt3d}>
                <div className="themes__3d">
                  <img src={foto2} alt="Alexandre Marques palestrando no GTAP" loading="lazy" />
                </div>
              </figure>
            </div>
          </div>
        </div>

        {themes.length === 0 && (
          <p className="body-lg">A programação temática será divulgada em breve.</p>
        )}
      </div>
    </section>
  );
};
