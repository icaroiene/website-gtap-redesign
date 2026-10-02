import { useEffect, useRef, useState } from "react";
import { TransitionLink as Link } from "../ui/TransitionLink";
import { NAV_ITEMS, ACTIONS } from "../../data/event";
import { useLoteAtual } from "../../Utils/useLoteAtual";
import "./Navbar.css";

// O menu acompanha a direção da rolagem; a inscrição permanece acessível
// fora do hero, da seção de ingressos e do rodapé.


export const Navbar = ({ solid = false }) => {
  const { precoAtual, nomeLoteAtual } = useLoteAtual();
  const [scrollingDown, setScrollingDown] = useState(false);
  const [pastHero, setPastHero] = useState(false);
  const [atTickets, setAtTickets] = useState(false);
  const [atFooter, setAtFooter] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(() => window.matchMedia("(max-width: 720px)").matches);
  const toggleRef = useRef(null);
  const drawerRef = useRef(null);

  useEffect(() => {
    const mobile = window.matchMedia("(max-width: 720px)");
    const closeOnMobile = () => {
      setIsMobile(mobile.matches);
      setMenuOpen(false);
    };
    closeOnMobile();
    mobile.addEventListener("change", closeOnMobile);
    return () => mobile.removeEventListener("change", closeOnMobile);
  }, []);

  useEffect(() => {

    const hero = document.getElementById("inicio");
    const tickets = document.getElementById("ingressos");
    const footer = document.querySelector("footer");
    let geometry = {};
    const measure = () => {
      const bounds = tickets?.getBoundingClientRect();
      geometry = {
        heroEnd: hero ? hero.offsetHeight - 120 : 120,
        ticketsTop: bounds ? bounds.top + window.scrollY : Infinity,
        ticketsBottom: bounds ? bounds.bottom + window.scrollY : -Infinity,
        footerTop: footer ? footer.getBoundingClientRect().top + window.scrollY : Infinity,
      };
      onScroll();
    };
    let raf = 0;
    let previousY = window.scrollY;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const y = window.scrollY;
        if (Math.abs(y - previousY) > 24) {
          setScrollingDown(y > previousY && y > 80);
          previousY = y;
        }
        if (y < 80) setScrollingDown(false);
        setPastHero(y > geometry.heroEnd);
        const center = y + window.innerHeight / 2;
        setAtTickets(geometry.ticketsTop <= center && geometry.ticketsBottom > center);
        setAtFooter(geometry.footerTop < y + window.innerHeight - 40);
      });
    };
    const resize = new ResizeObserver(measure);
    resize.observe(document.body);
    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", measure);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", measure);
      resize.disconnect();
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

  const hidden = !isMobile && !menuOpen && ((!solid && atTickets) || scrollingDown);
  const showFloatbar = !atFooter && !atTickets;

  return (
    <>
      <header inert={hidden} className={`site-header${solid || pastHero ? " is-solid" : ""}${hidden ? " is-hidden" : ""}`}>
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

      {/* Inscrição disponível desde o início; oculta na seção de ingressos. */}
      {!solid && (
        <div className={`floatbar${showFloatbar ? " is-visible" : ""}`} inert={!showFloatbar}>
          <a className="floatbar__groups" href={ACTIONS.groupsUrl} target="_blank" rel="noopener noreferrer">
            Condições para grupos <span aria-hidden="true">↗</span>
          </a>
          {precoAtual && (
            <div className="floatbar__price">
              <strong>{precoAtual}</strong>
              <span>{nomeLoteAtual}</span>
            </div>
          )}
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
          <a className="mobile-menu__brand" href="/#inicio" onClick={closeMenu} aria-label="GTAP — início">
            <img src="/logo.svg" alt="X GTAP — Congresso Brasileiro de Gestão Tributária na Administração Pública" />
          </a>
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
