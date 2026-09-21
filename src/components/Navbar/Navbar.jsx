import { useEffect, useRef, useState } from "react";
import { TransitionLink as Link } from "../ui/TransitionLink";
import { NAV_ITEMS, ACTIONS } from "../../data/event";
import "./Navbar.css";

// Header do Figma no topo; ao sair do hero (home) ele some e vira uma barra
// flutuante com atalhos + CTA "Garantir ingresso" (como na referência).
// Em subpáginas (solid) o header fica fixo e sólido.
const FLOAT_LINKS = ["temas", "palestrantes", "ingressos"];

export const Navbar = ({ solid = false }) => {
  const [pastHero, setPastHero] = useState(false);
  const [atFooter, setAtFooter] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleRef = useRef(null);
  const drawerRef = useRef(null);

  useEffect(() => {
    if (solid) return;
    const hero = document.getElementById("inicio");
    // Sem hero (subpáginas com header transparente) some logo ao rolar
    const limit = () => (hero ? hero.offsetHeight - 120 : 120);
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        setPastHero(window.scrollY > limit());
        // Ao chegar no rodapé a barra flutuante sai de cena
        const footer = document.querySelector("footer");
        setAtFooter(!!footer && footer.getBoundingClientRect().top < window.innerHeight - 40);
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [solid]);

  useEffect(() => {
    if (!menuOpen) return;
    document.body.classList.add("no-scroll");
    const onKey = (e) => {
      if (e.key === "Escape") {
        e.preventDefault();
        setMenuOpen(false);
        toggleRef.current?.focus({ preventScroll: true });
      } else if (e.key === "Tab") {
        const f = drawerRef.current?.querySelectorAll("a[href], button:not([disabled])");
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
    const t = window.setTimeout(() => drawerRef.current?.querySelector("a, button")?.focus(), 20);
    return () => {
      document.body.classList.remove("no-scroll");
      document.removeEventListener("keydown", onKey);
      window.clearTimeout(t);
    };
  }, [menuOpen]);

  const closeMenu = () => {
    setMenuOpen(false);
    toggleRef.current?.focus({ preventScroll: true });
  };

  const renderLink = (item, onClick) => {
    if (item.route) return <Link to={item.href} onClick={onClick}>{item.label}</Link>;
    if (item.external) {
      return (
        <a href={item.href} onClick={onClick} target="_blank" rel="noopener noreferrer">
          {item.label}
          <span className="visually-hidden"> (abre em nova aba)</span>
        </a>
      );
    }
    return <a href={item.href} onClick={onClick}>{item.label}</a>;
  };

  const hidden = !solid && pastHero;

  return (
    <>
      <header className={`site-header${solid ? " is-solid" : ""}${hidden ? " is-hidden" : ""}`}>
        <a className="skip-link" href="#conteudo">Pular para o conteúdo</a>
        <div className="site-header__inner">
          <Link className="site-header__brand" to="/" aria-label="GTAP — início">
            <img src="/logo.svg" alt="X GTAP — Congresso Brasileiro de Gestão Tributária na Administração Pública" />
          </Link>
          <nav className="site-nav" aria-label="Navegação principal">
            <ul>
              {NAV_ITEMS.map((item) => (
                <li key={item.href}>{renderLink(item)}</li>
              ))}
            </ul>
          </nav>
          <button
            type="button"
            className="site-header__toggle"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
            onClick={(e) => { toggleRef.current = e.currentTarget; setMenuOpen((v) => !v); }}
          >
            <span className={`burger${menuOpen ? " is-open" : ""}`} aria-hidden="true"><span></span><span></span><span></span></span>
          </button>
        </div>
      </header>

      {/* Barra flutuante (aparece ao sair do hero) */}
      {!solid && (
        <div className={`floatbar${pastHero && !atFooter ? " is-visible" : ""}`} inert={!(pastHero && !atFooter)}>
          <Link className="floatbar__brand" to="/" aria-label="GTAP — início">
            <img src="/logo.svg" alt="" />
          </Link>
          <nav className="floatbar__nav" aria-label="Atalhos">
            {NAV_ITEMS.filter((i) => FLOAT_LINKS.includes(i.hash)).map((item) => (
              <a key={item.href} href={item.href}>{item.label}</a>
            ))}
          </nav>
          <a className="btn btn--yellow floatbar__cta" href={ACTIONS.registrationUrl} target="_blank" rel="noopener noreferrer">
            Garantir ingresso
          </a>
          <button
            type="button"
            className="floatbar__toggle"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
            onClick={(e) => { toggleRef.current = e.currentTarget; setMenuOpen((v) => !v); }}
          >
            <span className={`burger${menuOpen ? " is-open" : ""}`} aria-hidden="true"><span></span><span></span><span></span></span>
          </button>
        </div>
      )}

      <div className={`mobile-menu${menuOpen ? " is-open" : ""}`} hidden={!menuOpen}>
        <button type="button" className="mobile-menu__backdrop" aria-label="Fechar menu" tabIndex={-1} onClick={closeMenu} />
        <div id="mobile-menu" className="mobile-menu__panel" ref={drawerRef} role="dialog" aria-modal="true" aria-label="Menu de navegação">
          <button className="mobile-menu__close" type="button" onClick={closeMenu} aria-label="Fechar menu">×</button>
          <nav aria-label="Navegação mobile">
            <ul>
              {NAV_ITEMS.map((item) => (
                <li key={item.href}>{renderLink(item, closeMenu)}</li>
              ))}
            </ul>
          </nav>
          <a className="btn btn--yellow mobile-menu__cta" href={ACTIONS.registrationUrl} target="_blank" rel="noopener noreferrer" onClick={closeMenu}>
            Garantir ingresso
          </a>
        </div>
      </div>
    </>
  );
};
