// =============================================================
// GTAP — Configuração central do evento e adaptação de dados
// Fonte única de: identidade da edição, datas, local, destinos
// comerciais e tradução do JSON legado (public/api/landing_page.json).
// Regras comerciais NÃO são alteradas por decisão estética.
// =============================================================

// ---- Contato / WhatsApp (processo real de inscrição hoje é humano) ----
const WHATSAPP_PHONE = "5571992084907";
const wa = (text) =>
  `https://api.whatsapp.com/send/?phone=${WHATSAPP_PHONE}&text=${encodeURIComponent(
    text
  )}&type=phone_number&app_absent=0`;

export const ACTIONS = {
  registrationUrl: wa("Olá! Quero garantir minha vaga no GTAP 2026."),
  groupsUrl: wa("Olá! Quero saber as condições especiais para grupos no GTAP 2026."),
  contactUrl: wa("Olá! Quero mais informações sobre o GTAP 2026."),
  phone: WHATSAPP_PHONE,
};

// ---- Dados da edição (encontrados no projeto; pendente confirmação comercial) ----
export const EVENT = {
  name: "GTAP",
  fullName: "Congresso Brasileiro de Gestão Tributária na Administração Pública",
  edition: "X", // conforme protótipo Figma e site oficial (X GTAP)
  startsAt: "2026-10-08T08:00:00-03:00",
  endsAt: "2026-10-09T18:00:00-03:00",
  timezone: "America/Bahia",
  dateLabel: "08 e 09 de outubro de 2026",
  dateLabelShort: "08 e 09 de Outubro de 2026",
  dateShort: "08 e 09 · OUT 2026",
  venue: "Centro de Convenções Deville Prime",
  city: "Salvador",
  state: "BA",
  cityState: "Salvador, Bahia",
  address: "Pituba, Salvador — BA",
  mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d87966.15711226991!2d-38.45577891634429!3d-12.99795045296838!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x7161786a7ffff8b%3A0x2fcfe4b59d0dace1!2sHotel%20Deville%20Prime%20Salvador!5e0!3m2!1spt-BR!2sbr!4v1746561724708!5m2!1spt-BR!2sbr",
  mapLink: "https://www.google.com/maps/place/Hotel+Deville+Prime+Salvador",
};

// Contato institucional (rodapé / realização Open)
export const ORG = {
  name: "Open Soluções Tributárias",
  address: "R. Frederico Simões, 125 — Sl. 401, Edf. Liz Empresarial, Caminho das Árvores, Salvador/BA — CEP 41820-774",
  instagram: "https://www.instagram.com/foco.tributario/",
  site: "https://www.opensolucoestributarias.com.br/",
  // Rota antiga da página interna; hoje redireciona para o site oficial
  openPath: "/open-solucoes-tributarias",
};

// ---- Navegação principal ----
export const NAV_ITEMS = [
  { label: "Temas", href: "/#temas", hash: "temas" },
  { label: "Palestrantes", href: "/#palestrantes", hash: "palestrantes" },
  { label: "Galeria", href: "/galeria", route: true },
  { label: "Preços", href: "/#ingressos", hash: "ingressos" },
  { label: "A Open", href: "https://www.opensolucoestributarias.com.br/", external: true },
  { label: "Contato", href: "/#contato", hash: "contato" },
];

// Mapa de hashes legados -> destino atual (compatibilidade)
export const LEGACY_HASH = {
  "preços": "ingressos",
  "precos": "ingressos",
  "investimento": "ingressos",
};

// ---- Adaptador do JSON legado ----
// type: 0 palestrantes | 1 temas | 2 instituições | 3 depoimentos
//       5 clientes (Open) | 6 vídeo hero | 7 imagens de local
const TYPE = {
  SPEAKER: 0,
  THEME: 1,
  INSTITUTION: 2,
  TESTIMONIAL: 3,
  CLIENT: 5,
  HERO_VIDEO: 6,
  LOCAL_IMAGE: 7,
};

export function adaptLandingData(data) {
  const list = Array.isArray(data) ? data : [];
  const byType = (t) => list.filter((item) => item?.type === t);

  const themes = byType(TYPE.THEME)
    .map((t) => ({
      id: t.id,
      order: Number.parseInt(t.title, 10) || 0,
      title: t.title,
      description: t.description || "",
    }))
    .sort((a, b) => a.order - b.order);

  const speakers = byType(TYPE.SPEAKER).map((s) => ({
    id: s.id,
    name: s.title,
    role: s.description || "",
    bio: s.annotation || "",
    portrait: s.mediaUrl || "",
    socials: {
      instagram: s.instagram || "",
      youtube: s.youtube || "",
      linkedin: s.linkedin || "",
    },
  }));

  const testimonials = byType(TYPE.TESTIMONIAL).map((t) => ({
    id: t.id,
    author: t.title,
    institution: t.description || "",
    quote: (t.annotation || "").replace(/^[“”"]+|[“”"]+$/g, ""),
    video: t.mediaUrl || "",
  }));

  const institutions = byType(TYPE.INSTITUTION).map((i) => ({
    id: i.id,
    name: i.title,
    logo: i.mediaUrl || "",
  }));

  const clients = byType(TYPE.CLIENT).map((c) => ({
    id: c.id,
    name: c.title,
    logo: c.mediaUrl || "",
  }));

  const heroVideo = byType(TYPE.HERO_VIDEO)[0]?.mediaUrl || "";
  const localImages = byType(TYPE.LOCAL_IMAGE).map((l) => ({
    id: l.id,
    title: l.title,
    src: l.mediaUrl || "",
  }));

  return { speakers, themes, testimonials, institutions, clients, heroVideo, localImages };
}
