import { useState } from "react";
import { ModalPalestrantes } from "../../../../components/ModalPalestrante/ModalPalestrante";
import { adaptLandingData } from "../../../../data/event";
import { useReveal } from "../../../../hooks/useReveal";
import "./SectionPalestrantes.css";

// "Palestrantes" do Figma: azul + Salvador 15%, título amarelo centralizado,
// grade 3 colunas de retratos em cards brancos r40, nome Bebas, cargo abaixo.
export const SectionPalestrantes = ({ data }) => {
  const { speakers } = adaptLandingData(data);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const revealRef = useReveal({ stagger: 70, deps: [speakers.length] });

  return (
    <section className="speakers" id="palestrantes" ref={revealRef}>
      <div className="container">
        <h2 className="h2 speakers__title">Quem vai conduzir as discussões</h2>

        {speakers.length > 0 ? (
          <ul className="speakers__grid">
            {speakers.map((speaker, index) => (
              <li key={speaker.id}>
                <button
                  type="button"
                  className="speaker-card"
                  data-reveal
                  data-reveal-fx="scale"
                  data-reveal-index={index % 3}
                  onClick={() => setSelectedIndex(index)}
                  aria-label={`Ver biografia de ${speaker.name}`}
                  aria-haspopup="dialog"
                >
                  <span className="speaker-card__photo">
                    {speaker.portrait ? (
                      <img src={speaker.portrait} alt={`Retrato de ${speaker.name}`} loading="lazy" />
                    ) : (
                      <span className="speaker-card__placeholder" aria-hidden="true">{speaker.name.charAt(0)}</span>
                    )}
                    <span className="speaker-card__hint" aria-hidden="true">Ver biografia</span>
                  </span>
                  <span className="name speaker-card__name">{speaker.name}</span>
                  {speaker.role && <span className="speaker-card__role">{speaker.role}</span>}
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="body-lg" data-reveal>Os palestrantes desta edição serão divulgados em breve.</p>
        )}
      </div>

      {selectedIndex !== null && (
        <ModalPalestrantes
          speakers={speakers}
          index={selectedIndex}
          onChangeIndex={setSelectedIndex}
          onClose={() => setSelectedIndex(null)}
        />
      )}
    </section>
  );
};
