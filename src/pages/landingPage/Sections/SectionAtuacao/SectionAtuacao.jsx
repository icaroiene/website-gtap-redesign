import image1 from "../../../../assets/image1.webp";
import { useReveal } from "../../../../hooks/useReveal";
import "./SectionAtuacao.css";

const AREAS = [
  "Recursos Humanos",
  "Gestão Orçamentária",
  "Licitações e Contratos",
  "Gestão Contábil",
  "Controle Interno",
  "Financeiro",
  "Jurídica",
  "Fiscal",
];

export const SectionAtuacao = () => {
  const revealRef = useReveal({ stagger: 40 });

  return (
    <section className="audience surface-navy section" id="para-quem" ref={revealRef}>
      <div className="container audience__grid">
        <div className="audience__content">
          <p className="eyebrow text-gold" data-reveal>
            Para quem é
          </p>
          <h2 className="h2 audience__title" data-reveal>
            Feito para quem cuida da <span className="text-gold">gestão pública</span>
          </h2>
          <p className="lead audience__intro" data-reveal>
            Quem lida com os desafios tributários da administração pública e do
            Sistema S encontra no GTAP conteúdo direto para o dia a dia.
          </p>

          <ul className="audience__tags" data-reveal>
            {AREAS.map((area) => (
              <li className="audience__tag" key={area}>
                {area}
              </li>
            ))}
          </ul>
        </div>

        <figure className="audience__media" data-reveal>
          <img src={image1} alt="Participantes do GTAP durante o congresso" loading="lazy" />
        </figure>
      </div>
    </section>
  );
};
