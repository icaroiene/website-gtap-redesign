import { useEffect, useState } from "react";
import { Navbar } from "../../components/Navbar/Navbar";
import { Footer } from "../../components/Footer/Footer";
import { SplitWords } from "../../components/ui/SplitWords";
import { TransitionLink } from "../../components/ui/TransitionLink";
import { AmbientVideo } from "../../components/media/AmbientVideo";
import { AMBIENT } from "../../data/media";
import { EDITIONS, LATEST_EDITION } from "../../data/editions";
import { useReveal } from "../../hooks/useReveal";
import "./GaleriaPage.css";

// "ix-gtap" -> "IX"
const romanOf = (slug) => slug.split("-")[0].toUpperCase();

// Contagem real de fotos por edição (JSONs locais em /api/galerias/<slug>.json)
const usePhotoCounts = () => {
  const [counts, setCounts] = useState(null);
  useEffect(() => {
    const controller = new AbortController();
    let alive = true;
    Promise.all(
      EDITIONS.map((e) =>
        fetch(`${import.meta.env.BASE_URL}api/galerias/${e.slug}.json`, { signal: controller.signal })
          .then((r) => (r.ok ? r.json() : []))
          .then((d) => [e.slug, Array.isArray(d) ? d.length : 0])
          .catch(() => [e.slug, 0])
      )
    ).then((pairs) => {
      if (alive) setCounts(Object.fromEntries(pairs));
    });
    return () => {
      alive = false;
      controller.abort();
    };
  }, []);
  return counts;
};

const photosLabel = (n) => (n === 1 ? "1 foto" : `${n} fotos`);

// Índice da galeria: hero com números reais, edição mais recente em destaque
// (moldura r80) e as anteriores em cards com numeral romano.
export const GaleriaPage = () => {
  const counts = usePhotoCounts();
  const revealRef = useReveal({ stagger: 70, deps: [counts ? 1 : 0] });

  useEffect(() => {
    document.title = "Galeria — GTAP";
  }, []);

  const latest = LATEST_EDITION;
  const previous = EDITIONS.filter((e) => e.slug !== latest.slug).reverse();
  const total = counts ? Object.values(counts).reduce((a, b) => a + b, 0) : null;

  return (
    <>
      <Navbar />
      <main id="conteudo" className="gallery" ref={revealRef}>
        {/* Um único fundo para a página inteira: azul + Farol da Barra desfocado */}
        <div className="page-bg" aria-hidden="true">
          <AmbientVideo src={AMBIENT.farol} className="ambient--sea" mobile={false} />
        </div>

        <section className="gallery-hero">
          <div className="container">
            <p className="gallery-hero__eyebrow" data-reveal>Galeria</p>
            <h1 className="display gallery-hero__title split" data-reveal data-reveal-index="1">
              <SplitWords text="A memória de cada" />
              <br />
              <span className="text-yellow"><SplitWords text="edição do GTAP" start={4} /></span>
            </h1>
            <div className="gallery-hero__row" data-reveal data-reveal-index="2">
              <p className="body-lg gallery-hero__intro">
                Reviva plenárias, painéis e o encontro de servidores de todo o Brasil nas edições anteriores.
              </p>
              <dl className="gallery-hero__stats">
                <div>
                  <dd className="display">{EDITIONS.length}</dd>
                  <dt>edições</dt>
                </div>
                {total !== null && (
                  <div>
                    <dd className="display">{total}</dd>
                    <dt>fotos</dt>
                  </div>
                )}
              </dl>
            </div>
          </div>
        </section>

        <section className="gallery-index">
          <div className="container">
            <TransitionLink
              className="gallery-feature"
              to={`/galeria/${latest.slug}`}
              data-reveal
              data-reveal-fx="scale"
              aria-label={`Abrir álbum ${latest.label}`}
            >
              <img className="gallery-feature__img" src={latest.card} alt="" />
              <span className="gallery-feature__num display" aria-hidden="true">{romanOf(latest.slug)}</span>
              <span className="gallery-feature__body">
                <span className="gallery-feature__tag">Edição mais recente</span>
                <img className="gallery-feature__logo" src={latest.logo} alt="" />
                <span className="gallery-feature__meta">
                  {counts && <span>{photosLabel(counts[latest.slug])}</span>}
                  <span className="gallery-feature__cta">Ver álbum <span aria-hidden="true">→</span></span>
                </span>
              </span>
            </TransitionLink>

            <h2 className="display gallery-index__title split" data-reveal>
              <SplitWords text="Edições anteriores" />
            </h2>
            <ul className="gallery-index__grid">
              {previous.map((edition, index) => (
                <li key={edition.slug}>
                  <TransitionLink
                    className="edition-card"
                    to={`/galeria/${edition.slug}`}
                    data-reveal
                    data-reveal-fx="scale"
                    data-reveal-index={index % 4}
                    aria-label={`Abrir álbum ${edition.label}`}
                  >
                    <span className="edition-card__img">
                      <img src={edition.card} alt="" loading="lazy" />
                    </span>
                    <span className="edition-card__num display" aria-hidden="true">{romanOf(edition.slug)}</span>
                    <span className="edition-card__label">
                      <span className="name">{edition.label}</span>
                      <span className="edition-card__meta">{counts ? photosLabel(counts[edition.slug]) : " "}</span>
                    </span>
                  </TransitionLink>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};
