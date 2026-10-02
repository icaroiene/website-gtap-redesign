import { adaptLandingData, EVENT } from "../../../../data/event";
import { useReveal } from "../../../../hooks/useReveal";
import { SplitWords } from "../../../../components/ui/SplitWords";
import fallbackImg from "../../../../assets/faroldabarra.webp";
import { AmbientVideo } from "../../../../components/media/AmbientVideo";
import { AMBIENT } from "../../../../data/media";
import "./SectionLocal.css";

// Pontos turísticos em vídeo (clipes fornecidos pelo cliente, comprimidos em
// public/videos: recorte 4:5 a 720p, mudos, ~1–2 MB; pôster WebP do 1º segundo)
const media = (name) => `${import.meta.env.BASE_URL}videos/${name}`;
const SPOTS = [
  { video: media("spot-farol-a.mp4"), poster: media("spot-farol-a.webp"), name: "Farol da Barra", note: "Cartão-postal da orla de Salvador" },
  { video: media("spot-pelourinho.mp4"), poster: media("spot-pelourinho.webp"), name: "Pelourinho", note: "Centro Histórico, coração da cidade" },
  { video: media("spot-mercado.mp4"), poster: media("spot-mercado.webp"), name: "Mercado Modelo", note: "Cidade Baixa, em frente ao Elevador Lacerda" },
];

// Localização no padrão da seção Vídeo: moldura r80 com foto de Salvador e o
// lettering; um "mapinha" embutido no canto (carregado sob demanda);
// abaixo, uma faixa de pontos turísticos da cidade.
export const SectionLocal = ({ data }) => {
  const { localImages } = adaptLandingData(data);
  const revealRef = useReveal({ deps: [localImages.length] });
  const photo = localImages[0]?.src || fallbackImg;

  return (
    <section className="venue" id="localizacao" ref={revealRef}>
      <AmbientVideo src={AMBIENT.farol} className="ambient--sea" mobile={false} />
      <div className="venue__frame" data-reveal data-reveal-fx="scale">
        <img className="venue__photo" src={photo} alt="Salvador, Bahia — cidade-sede do GTAP" loading="lazy" />

        <p className="display venue__title split" aria-hidden="true" data-reveal data-reveal-index="1">
          <SplitWords text="Mais uma vez" />
          <br />
          <SplitWords text="em Salvador" start={3} />
        </p>

        <div className="venue__mapcard" data-reveal data-reveal-index="2">
          <iframe
            className="venue__map"
            title="Mapa do local do evento"
            src={EVENT.mapUrl}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
          <span className="venue__mapcard-label">
            {EVENT.venue}
            <span className="venue__mapcard-city">{EVENT.city}/{EVENT.state}</span>
          </span>
        </div>
      </div>

      <h2 className="visually-hidden">Localização: mais uma vez em Salvador</h2>

      <div className="container venue__spots-wrap">
        <p className="venue__spots-title" data-reveal data-reveal-index="4">
          Aproveite <em>Salvador</em>
        </p>
        <ul className="venue__spots">
          {SPOTS.map((spot, i) => (
            <li className="venue__spot" key={spot.name}>
              <div data-reveal data-reveal-fx="scale" data-reveal-index={4 + i}>
                <figure className="venue__spot-fig">
                  <AmbientVideo src={spot.video} poster={spot.poster} className="venue__spot-video" />
                </figure>
                <p className="name venue__spot-name">{spot.name}</p>
                <p className="venue__spot-note">{spot.note}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};
