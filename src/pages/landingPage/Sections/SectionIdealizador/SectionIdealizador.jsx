import { Link } from "react-router-dom";
import ImageAlexandre from "@/assets/alexandre.webp";
import { ORG } from "../../../../data/event";
import { useReveal } from "../../../../hooks/useReveal";
import "./SectionIdealizador.css";

export const SectionIdealizador = () => {
  const revealRef = useReveal();

  return (
    <section className="organizer surface-white section" id="idealizador" ref={revealRef}>
      <div className="container organizer__grid">
        <figure className="organizer__media" data-reveal>
          <img src={ImageAlexandre} alt="Alexandre Marques, idealizador do GTAP" loading="lazy" />
        </figure>

        <div className="organizer__content" data-reveal>
          <p className="eyebrow organizer__eyebrow">Idealização</p>
          <h2 className="h2 organizer__title">
            Realizado pela <span className="text-gold-deep">Open Soluções Tributárias</span>
          </h2>
          <p className="organizer__text">
            O GTAP é idealizado por <strong>Alexandre Marques Andrade Lemos</strong>,
            CEO da Open Soluções Tributárias, advogado tributarista e contabilista com
            atuação em consultoria para empresas e entidades públicas desde 2002. É
            autor de <em>Gestão Tributária de Contratos e Convênios</em> e{" "}
            <em>Tributação da Atividade de Saúde</em>.
          </p>
          <p className="organizer__text">
            À frente da Open, dedica-se a levar conhecimento aplicado de gestão
            tributária para a administração pública de todo o país.
          </p>

          <div className="organizer__actions">
            <Link className="btn btn--solid-navy" to={ORG.openPath}>
              Conheça a Open
            </Link>
            <a
              className="btn btn--ghost-dark"
              href={ORG.instagram}
              target="_blank"
              rel="noopener noreferrer"
            >
              Acompanhe no Instagram
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
