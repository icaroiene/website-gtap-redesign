import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Navbar } from "../../../components/Navbar/Navbar";
import { Footer } from "../../../components/Footer/Footer";
import { PhotoLightbox } from "../../../components/media/PhotoLightbox";
import { NotFound } from "../../notFound/NotFound";
import { EDITIONS, findEdition } from "../../../data/editions";
import { useReveal } from "../../../hooks/useReveal";
import { AmbientVideo } from "../../../components/media/AmbientVideo";
import { AMBIENT } from "../../../data/media";
import { TransitionLink } from "../../../components/ui/TransitionLink";
import "./GaleriaEdition.css";

const pad = (n) => String(n).padStart(2, "0");

// Álbum de uma edição: cabeçalho com contagem e navegação entre edições,
// mosaico com ritmo (1 foto grande a cada 6) e lightbox.
export const GaleriaEdition = () => {
  const { slug, editionText } = useParams();
  const edition = findEdition(slug || editionText);

  const [status, setStatus] = useState("loading"); // loading|success|empty|error
  const [images, setImages] = useState([]);
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const revealRef = useReveal({ stagger: 60, deps: [images.length, status] });

  useEffect(() => {
    if (edition) document.title = `${edition.label} — Galeria GTAP`;
  }, [edition]);

  useEffect(() => {
    if (!edition) return;
    const controller = new AbortController();
    setStatus("loading");
    fetch(`${import.meta.env.BASE_URL}api/galerias/${edition.slug}.json`, { signal: controller.signal })
      .then((res) => {
        if (!res.ok) throw new Error(String(res.status));
        return res.json();
      })
      .then((data) => {
        const list = Array.isArray(data) ? data : [];
        setImages(list);
        setStatus(list.length ? "success" : "empty");
      })
      .catch((err) => {
        if (err.name === "AbortError") return;
        console.error("Erro ao carregar galeria", err);
        setStatus("error");
      });
    return () => controller.abort();
  }, [edition]);

  // Slug inválido → 404 real.
  if (!edition) return <NotFound />;

  const idx = EDITIONS.findIndex((e) => e.slug === edition.slug);
  const prev = EDITIONS[idx - 1];
  const next = EDITIONS[idx + 1];

  const EditionNav = ({ target, dir }) =>
    target ? (
      <TransitionLink className={`album__nav-card album__nav-card--${dir}`} to={`/galeria/${target.slug}`}>
        <img className="album__nav-img" src={target.card} alt="" loading="lazy" />
        <span className="album__nav-text">
          <span className="album__nav-dir">{dir === "prev" ? "← Edição anterior" : "Próxima edição →"}</span>
          <span className="name">{target.label}</span>
        </span>
      </TransitionLink>
    ) : (
      <span className="album__nav-card album__nav-card--empty" aria-hidden="true" />
    );

  return (
    <>
      <Navbar />
      <main id="conteudo" className="album" ref={revealRef}>
        {/* Um único fundo para a página inteira: azul + Forte de Santo Antônio desfocado */}
        <div className="page-bg" aria-hidden="true">
          <AmbientVideo src={AMBIENT.forte} className="ambient--sea" mobile={false} />
        </div>

        <section className="album__head">
          <div className="container">
            <div className="album__topbar" data-reveal>
              <TransitionLink className="album__back" to="/galeria">
                <span aria-hidden="true">←</span> Todas as edições
              </TransitionLink>
              <nav className="album__switch" aria-label="Outras edições">
                {prev ? (
                  <TransitionLink className="album__switch-btn" to={`/galeria/${prev.slug}`} aria-label={`Edição anterior: ${prev.label}`}>‹</TransitionLink>
                ) : (
                  <span className="album__switch-btn is-disabled" aria-hidden="true">‹</span>
                )}
                <span className="album__switch-label">{edition.label}</span>
                {next ? (
                  <TransitionLink className="album__switch-btn" to={`/galeria/${next.slug}`} aria-label={`Próxima edição: ${next.label}`}>›</TransitionLink>
                ) : (
                  <span className="album__switch-btn is-disabled" aria-hidden="true">›</span>
                )}
              </nav>
            </div>

            <div className="album__head-grid">
              <div className="album__head-text" data-reveal data-reveal-index="1">
                <img className="album__logo" src={edition.logo} alt={edition.label} />
                <p className="album__lead">
                  Reviva os <strong>melhores momentos</strong> do maior congresso de Gestão Tributária na
                  Administração Pública.
                </p>
              </div>
              <div className="album__count" data-reveal data-reveal-index="2" aria-live="polite">
                {status === "success" && (
                  <>
                    <span className="display album__count-num">{images.length}</span>
                    <span className="album__count-label">fotos</span>
                  </>
                )}
              </div>
            </div>
          </div>
        </section>

        <section className="album__body">
          <div className="container">
            {status === "loading" && (
              <div className="album__grid" aria-hidden="true">
                {Array.from({ length: 9 }).map((_, i) => (
                  <div className="album__thumb album__thumb--skeleton" key={i} />
                ))}
              </div>
            )}

            {status === "error" && (
              <div className="album__state">
                <p>Não foi possível carregar as fotos desta edição.</p>
                <button type="button" className="btn btn--yellow" onClick={() => window.location.reload()}>
                  Tentar novamente
                </button>
              </div>
            )}

            {status === "empty" && (
              <div className="album__state">
                <p>As fotos desta edição ainda não foram publicadas.</p>
                <TransitionLink className="btn btn--yellow" to="/galeria">Ver outras edições</TransitionLink>
              </div>
            )}

            {status === "success" && (
              <ul className="album__grid">
                {images.map((img, index) => (
                  <li key={img.url || index}>
                    <button
                      type="button"
                      className="album__thumb"
                      onClick={() => setLightboxIndex(index)}
                      aria-label={`Abrir foto ${index + 1} de ${images.length}`}
                      data-reveal
                      data-reveal-fx="scale"
                      data-reveal-index={index % 6}
                    >
                      <img src={img.url} alt={`Foto ${index + 1} — ${edition.label}`} loading="lazy" />
                      <span className="album__thumb-idx" aria-hidden="true">{pad(index + 1)}</span>
                    </button>
                  </li>
                ))}
              </ul>
            )}

            <div className="album__nav" data-reveal>
              <EditionNav target={prev} dir="prev" />
              <EditionNav target={next} dir="next" />
            </div>
          </div>
        </section>
      </main>
      <Footer />

      {lightboxIndex !== null && (
        <PhotoLightbox
          images={images}
          index={lightboxIndex}
          onNav={setLightboxIndex}
          onClose={() => setLightboxIndex(null)}
        />
      )}
    </>
  );
};
