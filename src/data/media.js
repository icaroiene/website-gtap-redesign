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
  // Loop leve (22 s, 960×540, 1,6 MB) do vídeo de abertura do GTAP para a moldura
  // da seção Vídeo; o original remoto (122 MB) só toca no play com som.
  gtapLoop: `${base}videos/bg-gtap-abertura.mp4`,
};
