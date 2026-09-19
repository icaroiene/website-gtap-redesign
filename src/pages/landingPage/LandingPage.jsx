import { useState, useEffect } from "react";
import { BannerSection } from "../../components/Banner/Banner";
import { Navbar } from "../../components/Navbar/Navbar";
import { Footer } from "../../components/Footer/Footer";
import { SectionVideo } from "./Sections/SectionVideo/SectionVideo";
import { SectionTemas } from "./Sections/SectionTemas/SectionTemas";
import { SectionPalestrantes } from "./Sections/SectionPalestrantes/SectionPalestrantes";
import { SectionGaleria } from "./Sections/SectionGaleria/SectionGaleria";
import { SectionPublico } from "./Sections/SectionPublico/SectionPublico";
import { SectionDepoimentos } from "./Sections/SectionDepoimentos/SectionDepoimentos";
import { SectionInvestimento } from "./Sections/SectionInvestimentos/SectionInvestimento";
import { SectionLocal } from "./Sections/SectionLocal/SectionLocal";
import { SectionForms } from "./Sections/SectionForms/SectionForms";
import { LEGACY_HASH } from "../../data/event";

// Ordem conforme o protótipo Figma; Depoimentos, Local e Contato
// (não desenhados no protótipo) seguem a mesma linguagem visual.
export const LandingPage = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    document.title = "GTAP - Congresso Brasileiro de Gestão Tributária na adm. Pública";
    const controller = new AbortController();
    fetch(`${import.meta.env.BASE_URL}api/landing_page.json`, { signal: controller.signal })
      .then((res) => res.json())
      .then(setData)
      .catch((err) => {
        if (err.name !== "AbortError") console.error("Erro ao carregar dados LP", err);
      });
    return () => controller.abort();
  }, []);

  // Hashes legados (#preços, #investimento) -> #ingressos
  useEffect(() => {
    const normalizeHash = () => {
      const raw = decodeURIComponent(window.location.hash.replace("#", ""));
      const target = LEGACY_HASH[raw];
      if (target) document.getElementById(target)?.scrollIntoView({ behavior: "smooth" });
    };
    normalizeHash();
    window.addEventListener("hashchange", normalizeHash);
    return () => window.removeEventListener("hashchange", normalizeHash);
  }, []);

  return (
    <>
      <Navbar />
      <main id="conteudo">
        <BannerSection />
        <SectionVideo data={data} />
        <SectionTemas data={data} />
        <SectionPalestrantes data={data} />
        <SectionPublico data={data} />
        <SectionGaleria />
        <SectionDepoimentos data={data} />
        <SectionInvestimento />
        <SectionLocal data={data} />
        <SectionForms />
      </main>
      <Footer />
    </>
  );
};
