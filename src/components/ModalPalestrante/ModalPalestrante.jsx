import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import "./ModalPalestrante.css";

export const ModalPalestrantes = ({ speakers, index, onChangeIndex, onClose }) => {
  const panelRef = useRef(null);
  const closeRef = useRef(null);
  const triggerRef = useRef(null);

  const speaker = speakers[index];
  const total = speakers.length;
  const hasNav = total > 1;

  const goPrev = () => onChangeIndex((index - 1 + total) % total);
  const goNext = () => onChangeIndex((index + 1) % total);

  // Foco inicial + restauração + Escape + trap + bloqueio de rolagem.
  useEffect(() => {
    triggerRef.current = document.activeElement;
    document.body.classList.add("no-scroll");
    closeRef.current?.focus();

    const onKey = (e) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      } else if (e.key === "Tab") {
        const f = panelRef.current?.querySelectorAll(
          'a[href], button:not([disabled])'
        );
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!speaker) return null;

  const socials = Object.entries(speaker.socials || {}).filter(([, url]) => url);
  const socialLabel = { instagram: "Instagram", youtube: "YouTube", linkedin: "LinkedIn" };

  return createPortal(
    <div className="bio-modal" role="presentation">
      <div className="bio-modal__backdrop" onClick={onClose} />
      <div
        className="bio-modal__panel"
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="bio-modal-name"
      >
        <button
          type="button"
          className="bio-modal__close"
          ref={closeRef}
          onClick={onClose}
          aria-label="Fechar biografia"
        >
          <span aria-hidden="true">×</span>
        </button>

        <div className="bio-modal__media">
          {speaker.portrait ? (
            <img src={speaker.portrait} alt={`Retrato de ${speaker.name}`} />
          ) : (
            <span className="bio-modal__placeholder" aria-hidden="true">
              {speaker.name.charAt(0)}
            </span>
          )}
        </div>

        <div className="bio-modal__content">
          <p className="eyebrow text-gold">Palestrante</p>
          <h2 className="h3 bio-modal__name" id="bio-modal-name">
            {speaker.name}
          </h2>
          {speaker.role && <p className="bio-modal__role">{speaker.role}</p>}

          <div className="bio-modal__bio">
            {speaker.bio ? (
              <p>{speaker.bio}</p>
            ) : (
              <p className="bio-modal__bio--empty">
                Biografia completa em breve.
              </p>
            )}
          </div>

          {socials.length > 0 && (
            <div className="bio-modal__socials">
              {socials.map(([key, url]) => (
                <a
                  key={key}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {socialLabel[key] || key}
                </a>
              ))}
            </div>
          )}

          {hasNav && (
            <div className="bio-modal__nav">
              <button type="button" onClick={goPrev} aria-label="Palestrante anterior">
                <span aria-hidden="true">←</span> Anterior
              </button>
              <span className="bio-modal__count" aria-hidden="true">
                {index + 1} / {total}
              </span>
              <button type="button" onClick={goNext} aria-label="Próximo palestrante">
                Próximo <span aria-hidden="true">→</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
};
