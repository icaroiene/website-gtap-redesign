import { useState, useEffect } from "react";
import { TransitionLink as Link } from "../../components/ui/TransitionLink";
import "./OpenPage.css";
import { Navbar } from "../../components/Navbar/Navbar";
import { SectionOpen } from "./sections/SectionOpen/SectionOpen";
import { SectionAbout } from "./sections/SectionAbout/SectionAbout";
import { Footer } from "../../components/Footer/Footer";
import { CarouselEmpresas } from "./sections/Carousel/CarouselEmpresas";
import { adaptLandingData } from "../../data/event";
import { BgWaves } from "../../components/media/BgWaves";

export const OpenPage = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    document.title = "A Open Soluções Tributárias — GTAP";
    const controller = new AbortController();
    fetch(`${import.meta.env.BASE_URL}api/landing_page.json`, { signal: controller.signal })
      .then((res) => res.json())
      .then(setData)
      .catch((err) => {
        if (err.name !== "AbortError") console.error("Erro ao carregar dados", err);
      });
    return () => controller.abort();
  }, []);

  const { institutions, clients } = adaptLandingData(data);
  const seen = new Set();
  const logos = [...clients, ...institutions].filter((item) => {
    if (!item.logo) return false;
    const key = item.name.trim().toLowerCase();
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });

  return (
    <>
      <Navbar solid />
      <main id="conteudo">
        <SectionOpen />
        <CarouselEmpresas clientes={logos} />
        <SectionAbout />

        <section className="open-to-gtap surface-gold section">
          <BgWaves tone="navy" sun={false} />
          <div className="container open-to-gtap__inner">
            <div>
              <p className="open-to-gtap__pre">Da Open para o setor público</p>
              <h2 className="display open-to-gtap__title">
                O GTAP é a nossa entrega de conhecimento à gestão pública
              </h2>
            </div>
            <Link className="btn btn--navy" to="/">
              Conheça o congresso GTAP
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};
