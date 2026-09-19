import { useLoteAtual } from "../../../../Utils/useLoteAtual";
import { ACTIONS } from "../../../../data/event";
import { useReveal } from "../../../../hooks/useReveal";
import watermark from "../../../../assets/figma/watermark-ingresso.svg";
import { SplitWords } from "../../../../components/ui/SplitWords";
import { BgWaves } from "../../../../components/media/BgWaves";
import "./SectionInvestimento.css";

// "Ingressos" do Figma: dourado, "Escolha seu INGRESSO", dois cards quadrados
// (Individual em azul · Em grupo em dourado com borda clara e marca d'água).
export const SectionInvestimento = () => {
  const { loteAtual, precoAtual, nomeLoteAtual } = useLoteAtual();
  const revealRef = useReveal({ stagger: 120 });
  const hasLote = Boolean(loteAtual && precoAtual);

  return (
    <section className="tickets" id="ingressos" ref={revealRef}>
      <BgWaves tone="navy" />
      <div className="container">
        <header className="tickets__head" data-reveal>
          <p className="tickets__pre">Escolha seu</p>
          <h2 className="display tickets__title split"><SplitWords text="Ingresso" /></h2>
        </header>

        <div className="tickets__grid">
          <article className="ticket ticket--individual" data-reveal data-reveal-index="1">
            <h3 className="h2 ticket__title">Individual</h3>
            <div className="ticket__text">
              {hasLote ? (
                <>
                  <p className="ticket__price">{precoAtual}</p>
                  <p>por participante · {nomeLoteAtual}</p>
                  <p className="ticket__window">{loteAtual.label}</p>
                </>
              ) : (
                <p>Consulte as condições vigentes de inscrição individual com a nossa equipe.</p>
              )}
            </div>
            <a className="btn btn--yellow ticket__btn" href={ACTIONS.registrationUrl} target="_blank" rel="noopener noreferrer">
              Garantir minha vaga
            </a>
          </article>

          <article className="ticket ticket--group" data-reveal data-reveal-index="2">
            <img className="ticket__watermark" src={watermark} alt="" aria-hidden="true" />
            <h3 className="h2 ticket__title">Em grupo</h3>
            <div className="ticket__text">
              <p>Condições especiais para equipes, órgãos e entidades que participam em grupo. Fale com a nossa equipe e receba uma proposta.</p>
            </div>
            <a className="btn btn--navy ticket__btn" href={ACTIONS.groupsUrl} target="_blank" rel="noopener noreferrer">
              Falar sobre grupos
            </a>
          </article>
        </div>
      </div>
    </section>
  );
};
