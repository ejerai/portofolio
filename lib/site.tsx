"use client";
import { flushSync } from "react-dom";
import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";

/* theme (dark/light mode) */

export type Theme = "dark" | "light";

const CURTAIN_COLOR: Record<Theme, string> = {
  dark: "#141010",
  light: "#f5f0e8",
};

interface ThemeContextValue {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

function readInitialTheme(): Theme {
  if (typeof document === "undefined") return "light";
  const attr = document.documentElement.getAttribute("data-theme");
  return attr === "dark" ? "dark" : "light";
}

function syncThemeColorMeta(theme: Theme): void {
  let meta = document.querySelector<HTMLMetaElement>('meta[name="theme-color"]:not([media])');
  if (!meta) {
    meta = document.createElement("meta");
    meta.setAttribute("name", "theme-color");
    document.head.appendChild(meta);
  }
  meta.setAttribute("content", theme === "dark" ? "#1e1510" : "#f5f0e8");
}

/* dark mode */
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>(readInitialTheme);
  const reducedMotionRef = useRef(false);
  const isTransitioningRef = useRef(false);
  const timersRef = useRef<number[]>([]);

  useEffect(() => {
    reducedMotionRef.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  useEffect(() => {
    return () => {
      timersRef.current.forEach((id) => clearTimeout(id));
    };
  }, []);

  const applyTheme = useCallback((next: Theme) => {
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem("theme", next);
    syncThemeColorMeta(next);
    setTheme(next);
  }, []);

  const toggleTheme = useCallback(() => {
    if (isTransitioningRef.current) return;

    const next: Theme = document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark";

    if (reducedMotionRef.current) {
      applyTheme(next);
      return;
    }

    const root = document.documentElement;
    const startViewTransition = (
      document as unknown as {
        startViewTransition?: (cb: () => void) => { finished: Promise<void> };
      }
    ).startViewTransition;

    const release = () => {
      isTransitioningRef.current = false;
    };

    if (typeof startViewTransition === "function") {
      isTransitioningRef.current = true;
      try {
        root.setAttribute("data-theme-transition", next === "dark" ? "to-dark" : "to-light");
        const transition = startViewTransition.call(document, () => flushSync(() => applyTheme(next)));
        transition.finished
          .catch(() => {})
          .finally(() => {
            root.removeAttribute("data-theme-transition");
            release();
          });
      } catch {
        root.removeAttribute("data-theme-transition");
        applyTheme(next);
        release();
      }
      return;
    }

    timersRef.current.forEach((id) => clearTimeout(id));
    timersRef.current = [];
    document.querySelectorAll(".theme-curtain").forEach((el) => el.remove());

    isTransitioningRef.current = true;
    const curtain = document.createElement("div");
    curtain.className = `theme-curtain theme-curtain--${next}`;
    curtain.style.background = CURTAIN_COLOR[next] ?? CURTAIN_COLOR.dark;
    document.body.appendChild(curtain);

    requestAnimationFrame(() => {
      curtain.classList.add("is-down");
      const t1 = window.setTimeout(() => {
        applyTheme(next);
        curtain.classList.add("is-out");
        const t2 = window.setTimeout(() => {
          curtain.remove();
          release();
        }, 700);
        timersRef.current.push(t2);
      }, 550);
      timersRef.current.push(t1);
    });
  }, [applyTheme]);

  return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>;
}

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within a ThemeProvider");
  return ctx;
}

/* transisi */

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
