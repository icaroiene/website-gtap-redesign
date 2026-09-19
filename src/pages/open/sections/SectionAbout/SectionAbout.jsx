import { useState } from "react";
import "./SectionAbout.css";
import { useReveal } from "../../../../hooks/useReveal";
import { SplitWords } from "../../../../components/ui/SplitWords";
import { BgWaves } from "../../../../components/media/BgWaves";
import playTriangle from "@/assets/figma/play-triangle.svg";

export const SectionAbout = () => {
  const revealRef = useReveal({ stagger: 90 });
  const [playVideo, setPlayVideo] = useState(false);

  return (
    <section className="open-about on-yellow" ref={revealRef}>
      <BgWaves tone="navy" />
      <div className="container open-about__grid">
        <div className="open-about__text">
          <h2 className="display open-about__title split" data-reveal>
            <SplitWords text="Uma solução firme" />
            <br />
            <SplitWords text="para um mar de incertezas" start={3} />
          </h2>
          <p className="body-lg" data-reveal data-reveal-index="1">
            A Open oferece uma variedade de produtos que atendem de forma ampla e definitiva os seus clientes: <strong>consultoria personalizada</strong>, <strong>treinamentos</strong> (presenciais e online), <strong>edição de livros</strong> e o <strong>Sistema Web Gestão Tributária</strong> — a ferramenta para gerir as principais retenções na fonte (INSS, IRRF, CSLL, PIS/Pasep, Cofins e ISS).
          </p>
          <p className="body-lg" data-reveal data-reveal-index="2">
            Mais de <strong>1.000 clientes</strong> de todos os estados, entre grandes empresas privadas e estatais e órgãos públicos dos três Poderes, referendam os serviços da Open.
          </p>
          <p className="name open-about__sign" data-reveal data-reveal-index="3">Prazer, somos a Open. 💙</p>
        </div>

        <figure className="open-about__video" data-reveal data-reveal-fx="scale" data-reveal-index="1">
          {playVideo ? (
            <video controls autoPlay playsInline>
              <source src="https://gtap.com.br/midias/apresentacao.mp4" type="video/mp4" />
            </video>
          ) : (
            <button type="button" className="open-about__poster" onClick={() => setPlayVideo(true)} aria-label="Assistir à apresentação da Open">
              <span className="open-about__play" aria-hidden="true"><img src={playTriangle} alt="" /></span>
              <span className="name">Assista à apresentação</span>
            </button>
          )}
        </figure>
      </div>
    </section>
  );
};
