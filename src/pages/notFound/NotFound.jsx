import { useEffect } from "react";
import { TransitionLink as Link } from "../../components/ui/TransitionLink";
import { Navbar } from "../../components/Navbar/Navbar";
import { Footer } from "../../components/Footer/Footer";
import { AmbientVideo } from "../../components/media/AmbientVideo";
import { AMBIENT } from "../../data/media";
import "./NotFound.css";

export const NotFound = () => {
  useEffect(() => {
    document.title = "Página não encontrada — GTAP";
  }, []);

  return (
    <>
      <Navbar solid />
      <main id="conteudo" className="notfound">
        <AmbientVideo src={AMBIENT.forte} className="ambient--sea" mobile={false} />
        <div className="container notfound__inner">
          <p className="display notfound__code text-yellow">404</p>
          <h1 className="h2 notfound__title">Esta página não foi encontrada</h1>
          <p className="body-lg notfound__text">
            O endereço pode ter mudado ou não existe mais. Continue por um destes caminhos:
          </p>
          <div className="notfound__actions">
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
