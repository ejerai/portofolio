"use client";

import { useEffect } from "react";

export function useRevealOnScroll(threshold = 0.12): void {
  useEffect(() => {
    const targets = Array.from(document.querySelectorAll<HTMLElement>(".reveal"));
    if (!targets.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold },
    );

    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [threshold]);
}
