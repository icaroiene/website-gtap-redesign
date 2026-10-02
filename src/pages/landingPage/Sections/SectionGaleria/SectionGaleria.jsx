import { TransitionLink as Link } from "../../../../components/ui/TransitionLink";
import { useReveal } from "../../../../hooks/useReveal";
import cameraIcon from "../../../../assets/figma/icon-camera.svg";
import g1 from "../../../../assets/figma/gal-1.webp";
import g3 from "../../../../assets/figma/gal-3.webp";
import g4 from "../../../../assets/figma/gal-4.webp";
import g5 from "../../../../assets/figma/gal-5.webp";
import "./SectionGaleria.css";


const PHOTOS = [
  { src: g4, alt: "Grupo de participantes no salão do congresso" },
  { src: g1, alt: "Participantes reunidos no espaço do evento" },
  { src: g3, alt: "Participantes registrando sua presença no evento" },
  { src: g5, alt: "Grupo de participantes em uma edição do GTAP" },
];

export const SectionGaleria = () => {
  const revealRef = useReveal();

  return (
    <section className="mosaic" id="galeria" ref={revealRef} aria-labelledby="mosaic-title">
      <div className="container mosaic__layout">
        <div className="mosaic__head" data-reveal>
          <div className="mosaic__intro">
            <h2 id="mosaic-title" className="h2">O GTAP em imagens</h2>
            <p className="mosaic__description">Encontros, aprendizado e conexões que marcam cada edição.</p>
          </div>
          <Link className="btn btn--outline mosaic__cta" to="/galeria">
            <img src={cameraIcon} alt="" aria-hidden="true" />
            <span>Ver galeria completa</span>
            <span aria-hidden="true">↗</span>
          </Link>
        </div>
        <ul className="mosaic__grid">
          {PHOTOS.map((photo, i) => (
            <li className="mosaic__cell" key={photo.src} data-reveal data-reveal-index={i % 3}>
              <img className="mosaic__img" src={photo.src} alt={photo.alt} loading="lazy" width="320" height="320" />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};
