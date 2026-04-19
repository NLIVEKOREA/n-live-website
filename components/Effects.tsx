"use client";
import { useEffect, useRef } from "react";

export default function Effects() {
  const progressRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      if (!progressRef.current) return;
      const h = document.documentElement;
      const r = h.scrollTop / (h.scrollHeight - h.clientHeight);
      progressRef.current.style.width = Math.max(0, Math.min(1, r)) * 100 + "%";
    };
    document.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => document.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!matchMedia("(hover:hover)").matches || !dotRef.current) return;
    let x = 0, y = 0, tx = 0, ty = 0;
    const dot = dotRef.current;
    const onMove = (e: MouseEvent) => { tx = e.clientX; ty = e.clientY; dot.style.opacity = ".8"; };
    const onLeave = () => { dot.style.opacity = "0"; };
    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseleave", onLeave);
    let raf: number;
    const loop = () => {
      x += (tx - x) * 0.22; y += (ty - y) * 0.22;
      dot.style.left = x + "px"; dot.style.top = y + "px";
      raf = requestAnimationFrame(loop);
    };
    loop();
    return () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      cancelAnimationFrame(raf);
    };
  }, []);

  useEffect(() => {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("in");
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12 });
    document.querySelectorAll("section > .container > *, .audience-matrix > *, .hero-content > *").forEach((el) => {
      el.classList.add("fade-up");
      io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  return (
    <>
      <div className="scroll-progress" ref={progressRef} />
      <div className="noise" />
      <div className="cursor-dot" ref={dotRef} />
    </>
  );
}
