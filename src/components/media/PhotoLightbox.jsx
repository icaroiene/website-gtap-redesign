import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import "./PhotoLightbox.css";

// Visualizador de fotos acessível: Escape, setas, foco preso, contador,
// pré-carrega apenas a imagem vizinha.
export const PhotoLightbox = ({ images, index, onClose, onNav }) => {
  const panelRef = useRef(null);
  const closeRef = useRef(null);
  const triggerRef = useRef(null);

  const total = images.length;
  const current = images[index];

  useEffect(() => {
    triggerRef.current = document.activeElement;
    document.body.classList.add("no-scroll");
    closeRef.current?.focus();

    const onKey = (e) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        onNav((index + 1) % total);
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        onNav((index - 1 + total) % total);
      } else if (e.key === "Tab") {
        const f = panelRef.current?.querySelectorAll("button");
        if (!f || f.length === 0) return;
        const first = f[0];
        const last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.classList.remove("no-scroll");
      document.removeEventListener("keydown", onKey);
      if (triggerRef.current instanceof HTMLElement) triggerRef.current.focus();
    };
  }, [index, total, onClose, onNav]);

  if (!current) return null;

  const next = images[(index + 1) % total];
  const prev = images[(index - 1 + total) % total];

  return createPortal(
    <div className="lightbox" role="presentation">
      <div className="lightbox__backdrop" onClick={onClose} />
      <div
        className="lightbox__panel"
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label={`Foto ${index + 1} de ${total}`}
      >
        <button
          type="button"
          className="lightbox__close"
          ref={closeRef}
          onClick={onClose}
          aria-label="Fechar visualizador"
        >
          <span aria-hidden="true">×</span>
        </button>

        {total > 1 && (
          <button
            type="button"
            className="lightbox__nav lightbox__nav--prev"
            onClick={() => onNav((index - 1 + total) % total)}
            aria-label="Foto anterior"
          >
            <span aria-hidden="true">‹</span>
          </button>
        )}

        <figure className="lightbox__figure">
          <img src={current.url || current} alt={`Foto ${index + 1} da edição`} />
        </figure>

        {total > 1 && (
          <button
            type="button"
            className="lightbox__nav lightbox__nav--next"
            onClick={() => onNav((index + 1) % total)}
            aria-label="Próxima foto"
          >
            <span aria-hidden="true">›</span>
          </button>
        )}

        <p className="lightbox__counter" aria-hidden="true">
          {index + 1} / {total}
        </p>

        {/* pré-carrega vizinhos */}
        <div className="lightbox__preload" aria-hidden="true">
          {next && <img src={next.url || next} alt="" />}
          {prev && <img src={prev.url || prev} alt="" />}
        </div>
      </div>
    </div>,
    document.body
  );
};
