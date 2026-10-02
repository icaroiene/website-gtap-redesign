import { useLoteAtual } from "../../../../Utils/useLoteAtual";
import { ACTIONS } from "../../../../data/event";
import { useReveal } from "../../../../hooks/useReveal";
import "./SectionInvestimento.css";

export const SectionInvestimento = () => {
  const { lotes, loteAtual } = useLoteAtual();
  const revealRef = useReveal({ stagger: 80 });

  return (
    <section className="tickets" id="ingressos" ref={revealRef} aria-labelledby="tickets-title">
      <div className="container">
        <header className="tickets__head">
          <h2 id="tickets-title" className="h2 tickets__title">Garanta sua participação</h2>
        </header>

        <div className="tickets__grid">
          {lotes.map((lote, index) => {
            const current = lote.status === "presente";
            const expired = lote.status === "passado";
            return (
              <article key={lote.nome} className={`ticket ${current ? "ticket--current" : "ticket--inactive"}`}
                aria-labelledby={`ticket-lot-${index}`} data-reveal data-reveal-index={index}>
                <div className="ticket__top">
                  <span className="ticket__status">{current ? "Disponível" : expired ? "Encerrado" : "Em breve"}</span>
                  <h3 id={`ticket-lot-${index}`} className="h3 ticket__title">{lote.nome}</h3>
                </div>
                <div className="ticket__tear" aria-hidden="true" />
                <div className="ticket__pricing">
                  <p className={`ticket__price${expired ? " ticket__price--closed" : ""}`} aria-label={expired ? "Valor do lote encerrado" : undefined}>
                    {expired ? <span aria-hidden="true">{lote.preco}</span> : lote.preco}
                  </p>
                  <p className="ticket__unit">por participante</p>
                  {current && <p className="ticket__window">{lote.label}</p>}
                </div>
                {current ? (
                  <a className="btn btn--navy ticket__btn" href={ACTIONS.registrationUrl} target="_blank" rel="noopener noreferrer">
                    Garantir minha vaga <span aria-hidden="true">↗</span>
                  </a>
                ) : (
                  <p className="ticket__closed">{expired ? "Inscrições encerradas" : "Aguarde a abertura"}</p>
                )}
              </article>
            );
          })}
        </div>

        {!loteAtual && <p className="tickets__notice">Consulte as condições vigentes com a nossa equipe.</p>}
        <a className="ticket-group" href={ACTIONS.groupsUrl} target="_blank" rel="noopener noreferrer">
          Condições especiais para equipes e órgãos <span aria-hidden="true">↗</span>
        </a>
      </div>
    </section>
  );
};
