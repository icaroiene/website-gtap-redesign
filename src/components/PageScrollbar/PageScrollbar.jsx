import { useEffect, useRef } from "react";
import "./PageScrollbar.css";

export const PageScrollbar = () => {
  const trackRef = useRef(null);
  const thumbRef = useRef(null);
  const dragRef = useRef(null);

  useEffect(() => {
    const track = trackRef.current;
    let timer;
    let frame = 0;
    let max = 0;
    let travel = 0;
    const update = () => {
      track.hidden = max <= 0;
      const progress = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      thumbRef.current.style.transform = `translateY(${progress * travel}px)`;
      track.setAttribute("aria-valuenow", Math.round(progress * 100));
    };
    const measure = () => {
      max = document.documentElement.scrollHeight - window.innerHeight;
      travel = track.clientHeight - thumbRef.current.offsetHeight;
      update();
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(() => { frame = 0; update(); });
      track.classList.add("is-active");
      clearTimeout(timer);
      timer = setTimeout(() => track.classList.remove("is-active"), 1000);
    };
    const resize = new ResizeObserver(measure);
    resize.observe(document.body);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", measure);
    document.documentElement.classList.add("has-page-scrollbar");
    measure();
    return () => {
      cancelAnimationFrame(frame);
      clearTimeout(timer);
      resize.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", measure);
      document.documentElement.classList.remove("has-page-scrollbar");
    };
  }, []);

  const scrollTo = (top) => {
    if (document.body.classList.contains("no-scroll")) return;
    const max = Math.max(0, document.documentElement.scrollHeight - innerHeight);
    const target = Math.min(max, Math.max(0, top));
    if (window.__lenis) window.__lenis.scrollTo(target, { immediate: true });
    else window.scrollTo({ top: target, behavior: "instant" });
  };
  const moveTo = (y, offset) => {
    const track = trackRef.current;
    const travel = track.clientHeight - thumbRef.current.offsetHeight;
    scrollTo(((y - track.getBoundingClientRect().top - offset) / travel)
      * (document.documentElement.scrollHeight - innerHeight));
  };
  const endDrag = (e) => {
    dragRef.current = null;
    e.currentTarget.classList.remove("is-dragging");
    if (e.currentTarget.hasPointerCapture(e.pointerId)) e.currentTarget.releasePointerCapture(e.pointerId);
  };

  return (
    <div ref={trackRef} className="page-scrollbar" role="scrollbar" tabIndex={0}
      aria-label="Rolagem da página" aria-controls="root" aria-orientation="vertical"
      aria-valuemin={0} aria-valuemax={100} aria-valuenow={0}
      onPointerDown={(e) => {
        if (e.button !== 0 || document.body.classList.contains("no-scroll")) return;
        e.preventDefault();
        const thumb = thumbRef.current.getBoundingClientRect();
        const offset = e.target === thumbRef.current ? e.clientY - thumb.top : thumb.height / 2;
        dragRef.current = { offset };
        e.currentTarget.setPointerCapture(e.pointerId);
        e.currentTarget.classList.add("is-dragging");
        moveTo(e.clientY, offset);
      }}
      onPointerMove={(e) => { if (dragRef.current) moveTo(e.clientY, dragRef.current.offset); }}
      onPointerUp={endDrag} onPointerCancel={endDrag} onLostPointerCapture={endDrag}
      onKeyDown={(e) => {
        const targets = { ArrowDown: scrollY + 80, ArrowUp: scrollY - 80,
          PageDown: scrollY + innerHeight * 0.9, PageUp: scrollY - innerHeight * 0.9,
          Home: 0, End: document.documentElement.scrollHeight };
        if (e.key in targets) { e.preventDefault(); scrollTo(targets[e.key]); }
      }}>
      <div ref={thumbRef} className="page-scrollbar__thumb" />
    </div>
  );
};
