import "./SectionOpen.css";
import globoOpen from "@/assets/globo-open.svg";
import image1 from "@/assets/open/image-escritorio.webp";
import image2 from "@/assets/open/image-alexandre.webp";
import image3 from "@/assets/open/image-equipe.webp";
import image4 from "@/assets/open/image-apresentacao.webp";
import { AmbientVideo } from "../../../../components/media/AmbientVideo";
import { AMBIENT } from "../../../../data/media";
import { useReveal } from "../../../../hooks/useReveal";
import { SplitWords } from "../../../../components/ui/SplitWords";

export const SectionOpen = () => {
  const revealRef = useReveal({ stagger: 80 });

  return (
    <section className="open-hero" ref={revealRef}>
      <AmbientVideo src={AMBIENT.praia} className="ambient--sea" mobile={false} />

      <div className="container open-hero__grid">
        <div className="open-hero__content">
          <p className="open-hero__eyebrow" data-reveal>A Open Soluções Tributárias</p>
          <h1 className="display open-hero__title split" data-reveal data-reveal-index="1">
            <SplitWords text="Conhecimento tributário" />
            <br />
            <span className="text-yellow"><SplitWords text="que gera segurança" start={2} /></span>
          </h1>
          <p className="body-lg open-hero__text" data-reveal data-reveal-index="2">
            Consultoria, treinamentos, publicações e o sistema Gestão Tributária — para empresas e órgãos públicos gerirem retenções com confiança.
          </p>

          <div className="open-hero__stats" data-reveal data-reveal-index="3">
            <div>
              <span className="display open-hero__num text-yellow">+20 mil</span>
              <span className="open-hero__label">alunos treinados</span>
            </div>
            <div>
              <span className="display open-hero__num text-yellow">+1.000</span>
              <span className="open-hero__label">empresas e órgãos atendidos</span>
            </div>
          </div>

          <a className="btn btn--yellow open-hero__cta" href="https://opentreinamentos.com.br/" target="_blank" rel="noopener noreferrer" data-reveal data-reveal-index="4">
            <img src={globoOpen} alt="" aria-hidden="true" width="22" height="22" />
            Conheça os treinamentos
            <span className="visually-hidden"> (abre em nova aba)</span>
          </a>
        </div>

        <div className="open-hero__gallery">
          <img src={image3} alt="Equipe da Open" loading="lazy" className="open-hero__img open-hero__img--tall" data-reveal data-reveal-fx="wipe" />
          <img src={image1} alt="Escritório da Open" loading="lazy" className="open-hero__img" data-reveal data-reveal-fx="scale" data-reveal-index="1" />
          <img src={image2} alt="Alexandre Marques" loading="lazy" className="open-hero__img" data-reveal data-reveal-fx="scale" data-reveal-index="2" />
          <img src={image4} alt="Apresentação da Open" loading="lazy" className="open-hero__img open-hero__img--wide" data-reveal data-reveal-fx="wipe" data-reveal-index="2" />
        </div>
      </div>
    </section>
  );
};
