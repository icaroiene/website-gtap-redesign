// Vídeos ambiente compartilhados (public/videos, comprimidos com ffmpeg):
// três pontos turísticos de Salvador alternados entre as seções azuis.
// Home: hero = Porto da Barra · Palestrantes = Farol · Depoimentos = Forte · rodapé = Farol.
// Subpáginas: Galeria = Farol · Álbum = Forte · Open = Porto da Barra · 404 = Forte.
const base = import.meta.env.BASE_URL;

export const AMBIENT = {
  praia: `${base}videos/bg-praia.mp4`,
  praiaPoster: `${base}videos/bg-praia.webp`,
  farol: `${base}videos/bg-farol.mp4`,
  farolPoster: `${base}videos/bg-farol.webp`,
  forte: `${base}videos/bg-forte.mp4`,
  fortePoster: `${base}videos/bg-forte.webp`,
  agua: `${base}videos/bg-agua.mp4`,
  aguaPoster: `${base}videos/bg-agua.webp`,
};
