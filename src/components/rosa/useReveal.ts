import { useEffect } from "react";

export function useReveal() {
  useEffect(() => {
    const prefersMotion = window.matchMedia?.("(prefers-reduced-motion: no-preference)").matches;
    if (!("IntersectionObserver" in window) || !prefersMotion) return;

    document.documentElement.classList.add("js-reveal");
    const els = Array.from(document.querySelectorAll<HTMLElement>(".reveal"));
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
    );
    els.forEach((el) => io.observe(el));

    return () => {
      io.disconnect();
      document.documentElement.classList.remove("js-reveal");
    };
  }, []);
}
