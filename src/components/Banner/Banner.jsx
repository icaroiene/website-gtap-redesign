import { EVENT } from "../../data/event";
import { useReveal } from "../../hooks/useReveal";
import { AmbientVideo } from "../media/AmbientVideo";
import { AMBIENT } from "../../data/media";
import "./Banner.css";

// Hero conforme o Figma: azul, título Bebas em 2 linhas (2ª em amarelo),
// subtítulo, linha de data/local e CTAs. Fundo: só o azul com a orla da Barra
// em vídeo desfocado e em baixa opacidade (no mobile fica só o azul).
// Movimento (como na referência): linhas do título sobem uma a uma.
export const BannerSection = () => {
  const revealRef = useReveal({ stagger: 140 });

  return (
    <section className="hero" id="inicio" ref={revealRef}>
      <AmbientVideo src={AMBIENT.praia} poster={AMBIENT.praiaPoster} className="ambient--sea" mobile />

      <div className="container hero__content">
        {/* Edição · data · cidade acima do título */}
        <p className="hero__info hero__info--desktop" data-reveal data-reveal-index="0">
          <span>{EVENT.edition} GTAP</span>
          <span className="hero__info-dot" aria-hidden="true" />
          <span>{EVENT.dateLabelShort}</span>
          <span className="hero__info-dot" aria-hidden="true" />
          <span>{EVENT.city}/{EVENT.state}</span>
        </p>
        <p className="hero__info hero__info--mobile">Salvador/BA 08 e 09 de outubro de 2026</p>
        <h1 className="display hero__title" data-reveal data-reveal-index="1">
          <span className="line"><span className="line__in">O único congresso do país</span></span>
          <span className="line"><span className="line__in">sobre Gestão Tributária</span></span>
        </h1>
        <p className="body-lg hero__sub" data-reveal data-reveal-index="2">
          <span>voltado exclusivamente para a</span>{" "}<span>Administração Pública e Sistema S.</span>
        </p>

      </div>
      <a className="hero__scroll-cue" href="#video" aria-label="Descer para a próxima seção">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M12 4v15m-6-6 6 6 6-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </a>
    </section>
  );
};
