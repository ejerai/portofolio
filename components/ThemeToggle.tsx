"use client";

import { useTheme } from "@/lib/theme";

interface ThemeToggleProps {
  id: string;
  className: string;
  ariaLabel?: string;
  iconWrapperClassName?: string;
}

export function ThemeToggle({
  id,
  className,
  ariaLabel = "Ganti mode terang atau gelap",
  iconWrapperClassName = "theme-toggle-icon",
}: ThemeToggleProps) {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      id={id}
      className={className}
      type="button"
      role="switch"
      aria-checked={theme === "dark"}
      aria-label={ariaLabel}
      onClick={toggleTheme}
    >
      <span className={iconWrapperClassName}>
        <svg className="coffee-icon" viewBox="0 0 48 48" aria-hidden="true">
          <path className="steam-wisp" d="M17 10 Q19 6 17 3" />
          <path className="steam-wisp" d="M24 10 Q26 6 24 3" />
          <path className="steam-wisp" d="M31 10 Q33 6 31 3" />
          <path
            className="cup-body"
            d="M10 16 h22 v14 a11 11 0 0 1 -11 11 h0 a11 11 0 0 1 -11 -11 Z"
          />
          <path className="cup-body" d="M32 20 h5 a4 4 0 0 1 0 8 h-5" />
          <path className="cup-liquid" d="M12 18 h18 v6 h-18 Z" />
        </svg>
      </span>
      <span className="theme-toggle-label" data-light>
        Mode Gelap
      </span>
      <span className="theme-toggle-label" data-dark>
        Mode Terang
      </span>
    </button>
  );
}
