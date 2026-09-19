import { useEffect, useState } from "react";
import { useLoteAtual } from "../../Utils/useLoteAtual";
import { EVENT, ACTIONS } from "../../data/event";
import "./CardButton.css";

// Barra de conversão persistente e compacta.
// Aparece quando o hero sai da viewport (IntersectionObserver, não wheel).
export const CardButton = () => {
  const { precoAtual, nomeLoteAtual, loteAtual } = useLoteAtual();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("inicio");
    if (!hero || typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }
    const obs = new IntersectionObserver(
      ([entry]) => setVisible(!entry.isIntersecting),
      { threshold: 0, rootMargin: "-40% 0px 0px 0px" }
    );
    obs.observe(hero);
    return () => obs.disconnect();
  }, []);

  const hasLote = Boolean(loteAtual && precoAtual);

  return (
    <div
      className={`convbar${visible ? " is-visible" : ""}`}
      role="region"
      aria-label="Inscrição no GTAP"
      aria-hidden={!visible}
    >
      <div className="convbar__inner">
        <div className="convbar__info">
          {hasLote ? (
            <>
              <span className="convbar__price">{precoAtual}</span>
              <span className="convbar__meta">
                {nomeLoteAtual} · por participante
              </span>
            </>
          ) : (
            <>
              <span className="convbar__price convbar__price--sm">
                Inscrições abertas
              </span>
              <span className="convbar__meta">Consulte as condições</span>
            </>
          )}
        </div>

        <div className="convbar__date" aria-hidden="true">
          {EVENT.dateShort} · {EVENT.city}
        </div>

        <a
          className="btn btn--primary convbar__cta"
          href={ACTIONS.registrationUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          Garantir minha vaga
        </a>
      </div>
    </div>
  );
};
