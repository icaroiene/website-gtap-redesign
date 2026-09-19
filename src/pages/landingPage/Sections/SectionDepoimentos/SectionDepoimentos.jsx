import { useEffect, useRef, useState } from "react";
import { adaptLandingData } from "../../../../data/event";
import { useReveal } from "../../../../hooks/useReveal";
import { SplitWords } from "../../../../components/ui/SplitWords";
import { AmbientVideo } from "../../../../components/media/AmbientVideo";
import { AMBIENT } from "../../../../data/media";
import playTriangle from "../../../../assets/figma/play-triangle.svg";
import "./SectionDepoimentos.css";

// Pôster real: busca um frame do vídeo (após o fade de abertura) e o pinta
// num canvas. Os vídeos são carregados UM DE CADA VEZ (fila) — com vários
// <video> cross-origin em paralelo o navegador trava a busca do frame.
// O servidor não atende byte-range: um seek trava (precisa baixar do início).
// Por isso o vídeo é reproduzido mudo, fora da tela, e o frame é capturado
// em ~1,2s (depois do fade de abertura) via timeupdate — carga progressiva.
// A fila só começa depois do `load` da página: elementos de mídia em carga
// atrasam o evento load (e, com ele, a saída da tela de loading).
// (com teto: vídeos ambiente em carga podem segurar o `load` por muito tempo)
const PAGE_LOAD_MAX_WAIT_MS = 2500;
const afterPageLoad = () =>
  document.readyState === "complete"
    ? Promise.resolve()
    : new Promise((r) => {
        const t = setTimeout(r, PAGE_LOAD_MAX_WAIT_MS);
        window.addEventListener(
          "load",
          () => {
            clearTimeout(t);
            r();
          },
          { once: true }
        );
      });
// Em aba oculta o navegador costuma não avançar a reprodução: espera ficar
// visível (com teto — alguns embutidores reportam "hidden" indevidamente;
// nesse caso tenta mesmo assim e o timeout do grabFrame protege).
const VISIBLE_WAIT_MAX_MS = 4000;
const whenVisible = () =>
  !document.hidden
    ? Promise.resolve()
    : new Promise((r) => {
        const done = () => {
          document.removeEventListener("visibilitychange", on);
          clearTimeout(t);
          r();
        };
        const on = () => {
          if (!document.hidden) done();
        };
        const t = setTimeout(done, VISIBLE_WAIT_MAX_MS);
        document.addEventListener("visibilitychange", on);
      });
// Duas filas (2 vídeos em paralelo) que começam logo após o `load` da página —
// assim os pôsteres costumam estar prontos antes de o usuário chegar à seção.
const posterQueues = [afterPageLoad(), afterPageLoad()];
const STATIC_POSTER = (id) => `${import.meta.env.BASE_URL}posters/depoimentos/${id}.webp`;
const POSTER_TIMEOUT_MS = 15000;
const POSTER_AT_S = 1.2;

// O <video> precisa estar no DOM (escondido): play() em elemento solto é
// rejeitado (AbortError) no Chrome.
const grabFrame = (v, src, canvas) =>
  new Promise((resolve) => {
    let done = false;
    let painted = false;
    const cleanup = [];
    const on = (ev, fn) => {
      v.addEventListener(ev, fn);
      cleanup.push(() => v.removeEventListener(ev, fn));
    };
    const finish = () => {
      if (done) return;
      done = true;
      clearTimeout(timer);
      cleanup.forEach((fn) => fn());
      if (v.isConnected) {
        v.pause();
        v.removeAttribute("src");
        v.load();
      }
      resolve(painted);
    };
    const timer = setTimeout(finish, POSTER_TIMEOUT_MS);
    on("loadedmetadata", () => v.play().catch(() => {}));
    on("timeupdate", () => {
      if (v.currentTime < POSTER_AT_S || !v.videoWidth) return;
      if (canvas.isConnected) {
        // Reduz a resolução: pôster não precisa de 2560px
        const scale = Math.min(1, 720 / v.videoWidth);
        canvas.width = Math.round(v.videoWidth * scale);
        canvas.height = Math.round(v.videoHeight * scale);
        canvas.getContext("2d").drawImage(v, 0, 0, canvas.width, canvas.height);
        canvas.classList.add("is-ready");
        painted = true;
      }
      finish();
    });
    on("error", finish);
    v.src = src;
    v.load();
  });

// 1) Pôster estático em public/posters/depoimentos/<id>.webp, se existir (instantâneo).
// 2) Senão, captura um frame do vídeo remoto em fila (2 em paralelo), começando no `load`.
const VideoPoster = ({ src, id }) => {
  const canvasRef = useRef(null);
  const videoRef = useRef(null);
  const [staticState, setStaticState] = useState("pending"); // pending | ok | missing

  useEffect(() => {
    if (staticState !== "missing") return;
    const c = canvasRef.current;
    const v = videoRef.current;
    if (!c || !v || !src) return;
    let cancelled = false;
    const q = Math.abs(Number(id) || 0) % posterQueues.length;
    posterQueues[q] = posterQueues[q].then(whenVisible).then(async () => {
      if (cancelled) return;
      const ok = await grabFrame(v, src, c);
      // Aba em segundo plano: o relógio do vídeo não anda; tenta de novo
      // uma vez quando a visibilidade mudar.
      if (!ok && !cancelled) {
        await new Promise((r) => document.addEventListener("visibilitychange", r, { once: true }));
        if (!cancelled) await grabFrame(v, src, c);
      }
    });
    return () => {
      cancelled = true;
    };
  }, [src, id, staticState]);

  return (
    <>
      {staticState !== "missing" && (
        <img
          className={`voice-card__canvas${staticState === "ok" ? " is-ready" : ""}`}
          src={STATIC_POSTER(id)}
          alt=""
          aria-hidden="true"
          onLoad={() => setStaticState("ok")}
          onError={() => setStaticState("missing")}
        />
      )}
      {staticState === "missing" && (
        <>
          <video ref={videoRef} className="voice-card__preview" muted playsInline preload="none" aria-hidden="true" tabIndex={-1} />
          <canvas ref={canvasRef} className="voice-card__canvas" aria-hidden="true" />
        </>
      )}
    </>
  );
};

// Depoimentos reais do site em carrossel horizontal de uma linha
// (scroll-snap, arrasto com o mouse, setas e teclado).
export const SectionDepoimentos = ({ data }) => {
  const { testimonials } = adaptLandingData(data);
  const [activeId, setActiveId] = useState(null);
  const revealRef = useReveal({ stagger: 90, deps: [testimonials.length] });
  const trackRef = useRef(null);
  const drag = useRef({ on: false, x: 0, left: 0, moved: false });

  const step = () => {
    const track = trackRef.current;
    const card = track?.querySelector(".voice-card");
    return card ? card.getBoundingClientRect().width + parseFloat(getComputedStyle(track).columnGap || 24) : 400;
  };
  const scrollBy = (dir) => trackRef.current?.scrollBy({ left: dir * step(), behavior: "smooth" });

  // Roda/trackpad: o Lenis (vertical) só consome deltaY, então a roda vertical
  // segue rolando a página normalmente; gesto predominantemente horizontal
  // rola o trilho. (Sem data-lenis-prevent — ele travava a rolagem da página.)
  const onWheel = (e) => {
    if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) trackRef.current.scrollLeft += e.deltaX;
  };

  // Arrasto com o mouse (touch já rola nativamente)
  const onPointerDown = (e) => {
    if (e.pointerType !== "mouse") return;
    drag.current = { on: true, x: e.clientX, left: trackRef.current.scrollLeft, moved: false };
    trackRef.current.classList.add("is-dragging");
  };
  const onPointerMove = (e) => {
    if (!drag.current.on) return;
    const dx = e.clientX - drag.current.x;
    if (Math.abs(dx) > 4) drag.current.moved = true;
    trackRef.current.scrollLeft = drag.current.left - dx;
  };
  const endDrag = () => {
    if (!drag.current.on) return;
    drag.current.on = false;
    trackRef.current?.classList.remove("is-dragging");
  };
  const onClickCapture = (e) => {
    if (drag.current.moved) {
      e.stopPropagation();
      e.preventDefault();
      drag.current.moved = false;
    }
  };

  if (testimonials.length === 0) return null;

  return (
    <section className="voices" id="depoimentos" ref={revealRef}>
      {/* Forte de Santo Antônio desfocado, em baixa opacidade sobre o azul */}
      <AmbientVideo src={AMBIENT.forte} className="ambient--sea" mobile={false} />

      <div className="container voices__head">
        <h2 className="display voices__title text-yellow split" data-reveal>
          <SplitWords text="Depoimentos" />
        </h2>
        <div className="voices__nav" data-reveal data-reveal-index="1">
          <button type="button" className="voices__arrow" onClick={() => scrollBy(-1)} aria-label="Depoimentos anteriores">‹</button>
          <button type="button" className="voices__arrow" onClick={() => scrollBy(1)} aria-label="Próximos depoimentos">›</button>
        </div>
      </div>

      <ul
        className="voices__track"
        ref={trackRef}
        onWheel={onWheel}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerLeave={endDrag}
        onClickCapture={onClickCapture}
      >
        {testimonials.map((item, index) => {
          const isActive = activeId === item.id;
          return (
            <li className="voice-card" key={item.id} data-reveal data-reveal-fx="scale" data-reveal-index={index % 4}>
              <div className="voice-card__media">
                {isActive ? (
                  <video className="voice-card__video" src={item.video} controls autoPlay playsInline />
                ) : (
                  <>
                    <VideoPoster src={item.video} id={item.id} />
                    <button
                      type="button"
                      className="voice-card__poster"
                      onClick={() => setActiveId(item.id)}
                      aria-label={`Assistir ao depoimento de ${item.author}`}
                    >
                      <span className="voice-card__play" aria-hidden="true">
                        <img src={playTriangle} alt="" />
                      </span>
                    </button>
                  </>
                )}
              </div>
              <p className="name voice-card__name">{item.author}</p>
              {item.institution && <p className="voice-card__inst">{item.institution}</p>}
              {item.quote && <blockquote className="voice-card__quote">“{item.quote}”</blockquote>}
            </li>
          );
        })}
      </ul>
    </section>
  );
};
