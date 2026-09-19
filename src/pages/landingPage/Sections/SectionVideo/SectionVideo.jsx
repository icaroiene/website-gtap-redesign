import { useState } from "react";
import { adaptLandingData } from "../../../../data/event";
import { useReveal, useReducedMotion } from "../../../../hooks/useReveal";
import { SplitWords } from "../../../../components/ui/SplitWords";
import poster from "../../../../assets/figma/video-audience.webp";
import playTriangle from "../../../../assets/figma/play-triangle.svg";
import "./SectionVideo.css";

// Seção "Vídeo" do Figma com o vídeo real do GTAP rodando mudo na moldura;
// o play abre a reprodução com som e controles.
export const SectionVideo = ({ data }) => {
  const { heroVideo } = adaptLandingData(data);
  const [playing, setPlaying] = useState(false);
  const [ambientOn, setAmbientOn] = useState(false);
  const reduced = useReducedMotion();
  const revealRef = useReveal();

  const showAmbient = Boolean(heroVideo) && !reduced;

  return (
    <section className="video" id="video" ref={revealRef}>
      <div className="video__frame" data-reveal data-reveal-fx="scale">
        {playing && heroVideo ? (
          <video className="video__player" src={heroVideo} controls autoPlay playsInline />
        ) : (
          <>
            <img className="video__poster" src={poster} alt="Plateia do GTAP durante uma palestra" loading="lazy" />
            {showAmbient && (
              <video
                className={`video__ambient${ambientOn ? " is-playing" : ""}`}
                src={heroVideo}
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                onPlaying={() => setAmbientOn(true)}
                onPause={() => setAmbientOn(false)}
              />
            )}
            <p className="display video__title split" aria-hidden="true" data-reveal data-reveal-index="1">
              <SplitWords text="O maior GTAP de" />
              <br />
              <SplitWords text="todos os tempos" start={4} />
            </p>
            {heroVideo && (
              <button type="button" className="video__play" onClick={() => setPlaying(true)} aria-label="Assistir ao vídeo do GTAP com som">
                <img src={playTriangle} alt="" className="video__play-icon" />
              </button>
            )}
          </>
        )}
      </div>
      <h2 className="visually-hidden">O maior GTAP de todos os tempos</h2>
    </section>
  );
};
