import { Link, useLocation, useNavigate } from "react-router-dom";
import { useReducedMotion } from "../../hooks/useReveal";
import { CURTAIN_DOWN_MS, routeTransition } from "../../hooks/routeTransition";

// Link interno com a cortina descendo ANTES da troca de página (fluidez da
// referência). Cliques com modificador, botão do meio, target=_blank ou para a
// própria rota seguem o comportamento normal do <Link>.
export const TransitionLink = ({ to, onClick, children, ...rest }) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const reduced = useReducedMotion();

  const handleClick = (e) => {
    onClick?.(e);
    if (e.defaultPrevented || e.button !== 0) return;
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || rest.target === "_blank") return;
    const dest = typeof to === "string" ? to : to?.pathname || "";
    if (dest.split(/[?#]/)[0] === pathname) return;
    e.preventDefault();
    if (reduced) {
      navigate(to);
      return;
    }
    routeTransition.begin();
    window.setTimeout(() => navigate(to), CURTAIN_DOWN_MS);
  };

  return (
    <Link to={to} onClick={handleClick} {...rest}>
      {children}
    </Link>
  );
};
