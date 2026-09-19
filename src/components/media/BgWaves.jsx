import { useId } from "react";
import { useReducedMotion } from "../../hooks/useReveal";
import "./BgWaves.css";

// Fundo abstrato inspirado na referência (vídeo de palmeiras desfocado sobre a
// cor principal): coroas de coqueiro em SVG, desfocadas como uma foto fora de
// foco, balançando devagar. Decorativo; estático com reduced-motion.

const fmt = (n) => n.toFixed(1);

// Folíolo saindo de (x,y) na direção `ang`, com queda (droop) na ponta.
const leaflet = (x, y, ang, len, w, droop) => {
  const c = Math.cos(ang);
  const s = Math.sin(ang);
  const ex = x + c * len;
  const ey = y + s * len + droop;
  const cx = x + c * len * 0.5;
  const cy = y + s * len * 0.5 + droop * 0.15;
  const px = -s * w;
  const py = c * w;
  return `M${fmt(x)} ${fmt(y)}Q${fmt(cx + px)} ${fmt(cy + py)} ${fmt(ex)} ${fmt(ey)}Q${fmt(cx - px)} ${fmt(cy - py)} ${fmt(x)} ${fmt(y)}Z`;
};

// Fronde: ráquis arqueada (0,0 → L) com folíolos dos dois lados.
const frondPath = (L = 620, n = 26) => {
  const parts = [];
  for (let i = 1; i <= n; i++) {
    const t = i / n;
    const x = t * L;
    const y = t * t * 120; // ráquis cai para a ponta
    const slope = (2 * t * 120) / L;
    const base = Math.atan(slope);
    const grow = Math.sin(Math.PI * Math.min(1, t * 0.9 + 0.1));
    const len = 60 + 190 * grow;
    const droop = 40 + 110 * grow;
    parts.push(leaflet(x, y, base - 0.95, len, 7, droop));
    parts.push(leaflet(x, y, base + 0.75, len * 0.9, 7, droop * 0.7));
  }
  parts.push(`M0 -4Q${L * 0.55} -6 ${L} ${fmt(120 - 4)}L${L} ${fmt(120 + 4)}Q${L * 0.55} 6 0 4Z`);
  return parts.join("");
};

const FROND = frondPath();
// Ângulos SVG (90° = para baixo, 180° = para a esquerda): a coroa fica no canto
// superior direito e as frondes varrem o quadro; a segunda coroa é a mesma girada 180°.
const FRONDS = [
  [96, 0.82], [114, 1.0], [132, 0.9], [150, 1.05], [168, 0.88], [186, 0.98], [204, 0.8],
];

// Coroa: várias frondes radiando de um ponto.
const Crown = ({ className, animate }) => {
  const id = useId();
  return (
    <svg className={className} viewBox="-800 -800 1600 1600" aria-hidden="true">
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="currentColor" stopOpacity="0.95" />
          <stop offset="0.7" stopColor="currentColor" stopOpacity="0.55" />
          <stop offset="1" stopColor="currentColor" stopOpacity="0.1" />
        </linearGradient>
      </defs>
      {FRONDS.map(([a, s], i) => (
        <g key={a} transform={`rotate(${a}) scale(${s})`}>
          {animate && (
            <animateTransform
              attributeName="transform"
              type="rotate"
              additive="sum"
              values="-1.8;1.8;-1.8"
              dur={`${11 + i * 1.9}s`}
              begin={`${-i * 2.7}s`}
              repeatCount="indefinite"
              calcMode="spline"
              keySplines="0.45 0 0.55 1;0.45 0 0.55 1"
            />
          )}
          <path d={FROND} fill={`url(#${id})`} />
        </g>
      ))}
    </svg>
  );
};

export const BgWaves = ({ tone = "yellow", sun = true }) => {
  const reduced = useReducedMotion();
  return (
    <div className={`bgw bgw--${tone}`} aria-hidden="true">
      {sun && <div className="bgw__sun" />}
      <div className="bgw__blur">
        <Crown className="bgw__crown bgw__crown--tr" animate={!reduced} />
        <Crown className="bgw__crown bgw__crown--bl" animate={!reduced} />
      </div>
      <div className="bgw__grain" />
    </div>
  );
};

