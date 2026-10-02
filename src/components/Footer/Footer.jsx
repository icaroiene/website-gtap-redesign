import { TransitionLink as Link } from "../ui/TransitionLink";
import { NAV_ITEMS, ORG, EVENT } from "../../data/event";
import "./Footer.css";

// Rodapé: azul escuro chapado, Realização (Open + endereço),
// texto institucional e coluna de navegação.
export const Footer = () => {
  const renderLink = (item) => {
    if (item.route) return <Link to={item.href}>{item.label}</Link>;
    if (item.external) {
      return (
        <a href={item.href} target="_blank" rel="noopener noreferrer">
          {item.label}
          <span className="visually-hidden"> (abre em nova aba)</span>
        </a>
      );
    }
    return <a href={item.href}>{item.label}</a>;
  };

  return (
    <footer className="site-footer">
      <div className="container site-footer__inner">
        <div className="site-footer__org">
          <p className="site-footer__label">Realização:</p>
          <a href={ORG.site} target="_blank" rel="noopener noreferrer" aria-label={`${ORG.name} (abre em nova aba)`}>
            <img src="/logoopen.svg" alt={ORG.name} className="site-footer__open" loading="lazy" />
          </a>
          <address className="site-footer__addr">
            <span className="site-footer__addr-desktop">
            R. Frederico Simões, 125,
            <br />
            Edf. Liz Empresarial, sala 401, Caminho das Árvores
            <br />
            Salvador • BA • CEP 41820-774
            </span>
            <span className="site-footer__addr-mobile">
              <span>R. Frederico Simões, 125 · Edf. Liz Empresarial, sala 401</span>
              <span>Caminho das Árvores · Salvador/BA · CEP 41820-774</span>
            </span>
          </address>
        </div>

        <div className="site-footer__text">
          <p>
            Único congresso brasileiro focado na gestão tributária da Administração Pública e do
            Sistema S, o GTAP reúne especialistas de todo o país para discutir desafios atuais e
            apresentar soluções inovadoras.
          </p>
          <p>
            Em um ambiente inspirador, o evento impulsiona o intercâmbio de conhecimento e a busca
            contínua pela excelência na gestão tributária pública.
          </p>
          <p>
            Consolidado como referência nacional, o GTAP reforça a importância da atualização
            constante diante das rápidas transformações do setor.
          </p>
        </div>

        <nav className="site-footer__nav" aria-label="Navegação do rodapé">
          <p className="site-footer__nav-title">{EVENT.edition} GTAP</p>
          <ul>
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>{renderLink(item)}</li>
            ))}
          </ul>
        </nav>
      </div>
    </footer>
  );
};
