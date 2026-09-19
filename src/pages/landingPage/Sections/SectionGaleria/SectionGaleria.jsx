import { useEffect, useRef, useState } from "react";
import { TransitionLink as Link } from "../../../../components/ui/TransitionLink";
import { useReveal, useReducedMotion } from "../../../../hooks/useReveal";
import cameraIcon from "../../../../assets/figma/icon-camera.svg";
import g1 from "../../../../assets/figma/gal-1.webp";
import g2 from "../../../../assets/figma/gal-2.webp";
import g3 from "../../../../assets/figma/gal-3.webp";
import g4 from "../../../../assets/figma/gal-4.webp";
import g5 from "../../../../assets/figma/gal-5.webp";
import g6 from "../../../../assets/figma/gal-6.webp";
import "./SectionGaleria.css";

// Ordem inicial do Figma (linha 1: image2, image4, image1 · linha 2: image6, image3, image5)
const INITIAL = [g2, g4, g1, g6, g3, g5];
const SWAP_EVERY_MS = 2400;

// Mosaico vivo: cada célula tem duas camadas; a cada intervalo uma célula
// recebe uma foto nova (do Figma + galeria.json) e faz crossfade.
export const SectionGaleria = () => {
  const revealRef = useReveal();
  const reduced = useReducedMotion();
  const [pool, setPool] = useState(INITIAL);
  const [cells, setCells] = useState(INITIAL.map((src) => ({ a: src, b: src, showB: false })));
  const lastCell = useRef(-1);

  useEffect(() => {
    const controller = new AbortController();
    fetch(`${import.meta.env.BASE_URL}api/galeria.json`, { signal: controller.signal })
      .then((r) => r.json())
      .then((list) => {
        const extra = (Array.isArray(list) ? list : []).map((i) => i.imageUrl).filter(Boolean).slice(0, 18);
        setPool((p) => [...p, ...extra]);
      })
      .catch(() => {});
    return () => controller.abort();
  }, []);

  useEffect(() => {
    if (reduced || pool.length <= 6) return;
    const id = window.setInterval(() => {
      setCells((prev) => {
        // escolhe uma célula diferente da última
        let idx;
        do idx = Math.floor(Math.random() * prev.length);
        while (idx === lastCell.current);
        lastCell.current = idx;
        const visible = new Set(prev.map((c) => (c.showB ? c.b : c.a)));
        const candidates = pool.filter((src) => !visible.has(src));
        if (candidates.length === 0) return prev;
        const next = candidates[Math.floor(Math.random() * candidates.length)];
        return prev.map((c, i) =>
          i !== idx ? c : c.showB ? { ...c, a: next, showB: false } : { ...c, b: next, showB: true }
        );
      });
    }, SWAP_EVERY_MS);
    return () => window.clearInterval(id);
  }, [pool, reduced]);

  return (
    <section className="mosaic" id="galeria" ref={revealRef} aria-labelledby="mosaic-title">
      <h2 id="mosaic-title" className="visually-hidden">Galeria de fotos do GTAP</h2>
      <ul className="mosaic__grid">
        {cells.map((cell, i) => (
          <li className="mosaic__cell" key={i} style={{ "--kb-delay": `${i * -2.3}s` }}>
            <img className={`mosaic__img${cell.showB ? "" : " is-on"}`} src={cell.a} alt="" loading="lazy" />
            <img className={`mosaic__img${cell.showB ? " is-on" : ""}`} src={cell.b} alt="" loading="lazy" />
          </li>
        ))}
      </ul>
      <Link className="mosaic__cta" to="/galeria" data-reveal>
        <img src={cameraIcon} alt="" aria-hidden="true" className="mosaic__cta-icon" />
        <span>Acesse a galeria</span>
      </Link>
    </section>
  );
};
