"use client";
import { flushSync } from "react-dom";
import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";

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

  useEffect(() => {
    reducedMotionRef.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  const applyTheme = useCallback((next: Theme) => {
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem("theme", next);
    syncThemeColorMeta(next);
    setTheme(next);
  }, []);

  const toggleTheme = useCallback(() => {
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

    if (typeof startViewTransition === "function") {
      root.setAttribute("data-theme-transition", next === "dark" ? "to-dark" : "to-light");
      const transition = startViewTransition.call(document, () => flushSync(() => applyTheme(next)));
      transition.finished
        .catch(() => {})
        .finally(() => root.removeAttribute("data-theme-transition"));
      return;
    }

    const curtain = document.createElement("div");
    curtain.className = `theme-curtain theme-curtain--${next}`;
    curtain.style.background = CURTAIN_COLOR[next] ?? CURTAIN_COLOR.dark;
    document.body.appendChild(curtain);

    requestAnimationFrame(() => {
      curtain.classList.add("is-down");
      setTimeout(() => {
        applyTheme(next);
        curtain.classList.add("is-out");
        setTimeout(() => curtain.remove(), 700);
      }, 550);
    });
  }, [applyTheme]);

  return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>;
}

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within a ThemeProvider");
  return ctx;
}