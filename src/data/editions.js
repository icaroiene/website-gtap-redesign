// Catálogo único de edições da galeria (I..IX GTAP).
// slug = destino canônico (/galeria/:slug); label = URL legada (/IX%20GTAP).

const CARD = (n) => `https://gtap.com.br/midias/cards/gtap%20${n}.webp`;

export const EDITIONS = [
  { slug: "i-gtap", label: "I GTAP", logo: "/assets/logos/gtapi.svg", card: CARD("i") },
  { slug: "ii-gtap", label: "II GTAP", logo: "/assets/logos/iigtap.svg", card: CARD("ii") },
  { slug: "iii-gtap", label: "III GTAP", logo: "/assets/logos/iiigtap.svg", card: CARD("iii") },
  { slug: "iv-gtap", label: "IV GTAP", logo: "/assets/logos/ivgtap.svg", card: CARD("iv") },
  { slug: "v-gtap", label: "V GTAP", logo: "/assets/logos/vgtap.svg", card: CARD("v") },
  { slug: "vi-gtap", label: "VI GTAP", logo: "/assets/logos/vigtap.svg", card: CARD("vi") },
  { slug: "vii-gtap", label: "VII GTAP", logo: "/assets/logos/viigtap.svg", card: CARD("vii") },
  { slug: "viii-gtap", label: "VIII GTAP", logo: "/assets/logos/viiigtap.svg", card: CARD("viii") },
  { slug: "ix-gtap", label: "IX GTAP", logo: "/assets/logos/ixgtap.svg", card: CARD("ix") },
];

// Edição mais recente cadastrada (para o hero do índice).
export const LATEST_EDITION = EDITIONS[EDITIONS.length - 1];

// Resolve por slug canônico OU por rótulo legado (ex.: "IX GTAP", "IX%20GTAP").
export function findEdition(param) {
  if (!param) return null;
  const decoded = decodeURIComponent(param).trim().toLowerCase();
  return (
    EDITIONS.find((e) => e.slug === decoded) ||
    EDITIONS.find((e) => e.label.toLowerCase() === decoded) ||
    null
  );
}
