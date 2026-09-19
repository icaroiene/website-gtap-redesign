import "./CarouselEmpresas.css";
import { useReveal } from "../../../../hooks/useReveal";

export const CarouselEmpresas = ({ clientes = [] }) => {
  const revealRef = useReveal({ deps: [clientes.length] });

  if (clientes.length === 0) return null;

  return (
    <section className="open-clients surface-white section" ref={revealRef}>
      <div className="container">
        <p className="open-clients__label" data-reveal>
          Empresas e órgãos públicos que confiam na Open
        </p>
        <ul className="open-clients__grid" data-reveal>
          {clientes.map((c) => (
            <li className="open-clients__logo" key={c.id}>
              <img src={c.logo} alt={c.name} loading="lazy" width="140" height="64" />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};
