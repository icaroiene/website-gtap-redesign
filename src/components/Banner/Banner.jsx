import { EVENT, ACTIONS } from "../../data/event";
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
      <AmbientVideo src={AMBIENT.praia} className="ambient--sea" mobile={false} />

      <div className="container hero__content">
        {/* Edição · data · cidade acima do título: contexto antes da promessa */}
        <p className="hero__info" data-reveal data-reveal-index="0">
          <span>{EVENT.edition} GTAP</span>
          <span className="hero__info-dot" aria-hidden="true" />
          <span>{EVENT.dateLabelShort}</span>
          <span className="hero__info-dot" aria-hidden="true" />
          <span>{EVENT.city}/{EVENT.state}</span>
        </p>
        <h1 className="display hero__title" data-reveal data-reveal-index="1">
          <span className="line"><span className="line__in">O único congresso do país</span></span>
          <span className="line"><span className="line__in text-yellow">sobre Gestão Tributária</span></span>
        </h1>
        <p className="body-lg hero__sub" data-reveal data-reveal-index="2">
          voltado exclusivamente para a Administração Pública e Sistema S.
        </p>
        <div className="hero__actions" data-reveal data-reveal-index="3">
          <a className="btn btn--yellow" href={ACTIONS.registrationUrl} target="_blank" rel="noopener noreferrer">
            Garantir ingresso
          </a>
          <a className="btn btn--outline" href="#temas">Conheça os temas</a>
        </div>
      </div>
    </section>
  );
};
