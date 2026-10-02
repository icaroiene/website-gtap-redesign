import { useEffect, useLayoutEffect, useRef, useState } from "react";

// Detecta prefers-reduced-motion e reage a mudanças em tempo real.
export function useReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener?.("change", update);
    return () => mq.removeEventListener?.("change", update);
  }, []);

  return reduced;
}

// Revela elementos [data-reveal] dentro do container.
// Regra central: o conteúdo é VISÍVEL por padrão. Só recebe o estado "escondido"
// (.reveal-init) se estiver abaixo da dobra no momento da montagem, e volta a
// aparecer via IntersectionObserver OU via verificação no scroll (fallback).
// Assim nenhuma seção fica vazia se o observer falhar.
export function useReveal({ threshold = 0, stagger = 80, deps = [] } = {}) {
  const ref = useRef(null);
  const depsKey = deps.join("|");

  useLayoutEffect(() => {
    const root = ref.current;
    if (!root) return;

    const targets = Array.from(root.querySelectorAll("[data-reveal]")).filter(
      (el) => !el.classList.contains("is-visible")
    );
    if (targets.length === 0) return;

    const reduced = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduced || typeof IntersectionObserver === "undefined") {
      targets.forEach((el) => el.classList.add("is-visible"));
      return;
    }

    const show = (el) => {
      const delay = Number(el.dataset.revealIndex || 0) * stagger;
      el.style.setProperty("--reveal-delay", `${delay}ms`);
      el.classList.remove("reveal-init");
      el.classList.add("is-visible");
    };

    const pending = new Set();
    const vh = window.innerHeight;
    targets.forEach((el) => {
      const r = el.getBoundingClientRect();
      if (r.top < vh * 1.05) show(el); // já na tela: entra animando agora
      else {
        el.classList.add("reveal-init");
        pending.add(el);
      }
    });
    if (pending.size === 0) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          show(e.target);
          io.unobserve(e.target);
          pending.delete(e.target);
        });
      },
      { threshold, rootMargin: "0px 0px -6% 0px" }
    );
    pending.forEach((el) => io.observe(el));

    return () => {
      io.disconnect();
      pending.forEach((el) => el.classList.remove("reveal-init"));
    };
  }, [threshold, stagger, depsKey]);

  return ref;
}
