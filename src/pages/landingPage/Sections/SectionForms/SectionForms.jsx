import { Forms } from "../../../../components/Forms/Forms";
import { EVENT } from "../../../../data/event";
import { useReveal } from "../../../../hooks/useReveal";
import { BgWaves } from "../../../../components/media/BgWaves";
import "./SectionForms.css";

// Contato: superfície creme, título da família display e formulário branco.
export const SectionForms = () => {
  const revealRef = useReveal({ stagger: 100 });

  return (
    <section className="contact on-yellow" id="contato" ref={revealRef}>
      <BgWaves tone="navy" />
      <div className="container contact__grid">
        <div className="contact__intro">
          <h2 className="display contact__title" data-reveal>Fale com a gente</h2>
          <p className="body-lg contact__text" data-reveal data-reveal-index="1">
            Dúvidas sobre o GTAP? Fale com nossa equipe.
          </p>
          <dl className="contact__facts" data-reveal data-reveal-index="2">
            <div>
              <dt>Quando</dt>
              <dd>{EVENT.dateLabelShort}</dd>
            </div>
            <div>
              <dt>Onde</dt>
              <dd>{EVENT.venue} · {EVENT.city}/{EVENT.state}</dd>
            </div>
          </dl>
        </div>

        <div className="contact__card" data-reveal data-reveal-fx="scale" data-reveal-index="1">
          <Forms />
        </div>
      </div>
    </section>
  );
};
