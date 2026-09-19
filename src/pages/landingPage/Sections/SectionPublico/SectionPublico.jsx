import { adaptLandingData } from "../../../../data/event";
import { useReveal } from "../../../../hooks/useReveal";
import { SplitWords } from "../../../../components/ui/SplitWords";
import "./SectionPublico.css";

// Instituições (dados reais: type 2 + 5 do landing_page.json), minimalista:
// faixa branca, um título pequeno em caixa alta e uma única fileira de logos
// (as imagens como vêm, sem recorte nem filtro) rolando devagar.
export const SectionPublico = ({ data }) => {
  const { institutions, clients } = adaptLandingData(data);
  const seen = new Set();
  const logos = [...institutions, ...clients].filter((i) => {
    if (!i.logo) return false;
    const key = i.name.trim().toLowerCase();
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
  const revealRef = useReveal({ deps: [logos.length] });
  if (logos.length === 0) return null;

  const row = (hidden) => (
    <ul className="marquee__row" aria-hidden={hidden || undefined}>
      {logos.map((l) => (
        <li className="marquee__item" key={`${l.id}-${hidden ? "b" : "a"}`}>
          <img src={l.logo} alt={hidden ? "" : l.name} loading="lazy" width="96" height="96" />
        </li>
      ))}
    </ul>
  );

  return (
    <section className="marquee" id="instituicoes" ref={revealRef} aria-labelledby="marquee-title">
      <header className="marquee__head" data-reveal>
        <p className="marquee__pre">Quem já participou</p>
        <h2 id="marquee-title" className="display marquee__title split">
          <SplitWords text="Instituições" />
        </h2>
      </header>
      <div className="marquee__viewport" data-reveal data-reveal-index="1">
        <div className="marquee__track">
          {row(false)}
          {row(true)}
        </div>
      </div>
    </section>
  );
};
