import { useEffect } from "react";
import { TransitionLink as Link } from "../../components/ui/TransitionLink";
import { Navbar } from "../../components/Navbar/Navbar";
import { Footer } from "../../components/Footer/Footer";
import { AmbientVideo } from "../../components/media/AmbientVideo";
import { SplitWords } from "../../components/ui/SplitWords";
import { AMBIENT } from "../../data/media";
import { useReveal } from "../../hooks/useReveal";
import "./NotFound.css";

// 404 no padrão das subpáginas: header transparente, fundo único (azul + vídeo),
// "404" gigante como marca d'água e título display.
export const NotFound = () => {
  const revealRef = useReveal({ stagger: 90 });

  useEffect(() => {
    document.title = "Página não encontrada — GTAP";
  }, []);

  return (
    <>
      <Navbar />
      <main id="conteudo" className="notfound" ref={revealRef}>
        <div className="page-bg" aria-hidden="true">
          <AmbientVideo src={AMBIENT.forte} className="ambient--sea" mobile={false} />
        </div>
        <span className="display notfound__watermark" aria-hidden="true">404</span>

        <div className="container notfound__inner">
          <p className="notfound__eyebrow" data-reveal>Erro 404</p>
          <h1 className="display notfound__title split" data-reveal data-reveal-index="1">
            <SplitWords text="Esta página" />
            <br />
            <span className="text-yellow"><SplitWords text="não foi encontrada" start={2} /></span>
          </h1>
          <p className="body-lg notfound__text" data-reveal data-reveal-index="2">
            O endereço pode ter mudado ou não existe mais. Continue por um destes caminhos:
          </p>
          <div className="notfound__actions" data-reveal data-reveal-index="3">
            <Link className="btn btn--yellow" to="/">Ir para o início</Link>
            <Link className="btn btn--outline" to="/galeria">Ver a galeria</Link>
            <a className="btn btn--outline" href="/#contato">Falar com a equipe</a>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};
