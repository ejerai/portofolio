"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useTheme } from "@/lib/site";

/* icon svg */

function normalizeTechLabel(label: string): string {
  return label.trim().toLowerCase();
}

interface TechIconSvgProps {
  className?: string;
  style?: React.CSSProperties;
}

function AstroIcon({ className, style }: TechIconSvgProps) {
  return (
    <svg className={className} style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2c-2.6 2.8-4 6.6-4 11.5L9.3 15h5.4l1.3-1.5C16 8.6 14.6 4.8 12 2Z" />
      <circle cx="12" cy="9.5" r="1.5" />
      <path d="M9.3 15c-1.8.4-2.6 1.6-2.8 4.2 1.8-.6 3-1.3 3.6-2.4" />
      <path d="M14.7 15c1.8.4 2.6 1.6 2.8 4.2-1.8-.6-3-1.3-3.6-2.4" />
      <path d="M10.3 19.5c.5.8 1 1.3 1.7 1.5.7-.2 1.2-.7 1.7-1.5" />
    </svg>
  );
}

function SatelliteIcon({ className, style }: TechIconSvgProps) {
  return (
    <svg className={className} style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 20v-6" />
      <path d="M8 17a5 5 0 0 1 8 0" />
      <path d="M5 14a9 9 0 0 1 14 0" />
      <circle cx="12" cy="21" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function PythonIcon({ className, style }: TechIconSvgProps) {
  return (
    <svg className={className} style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3.2c-3.3 0-3.6 1.4-3.6 3.2v2.1h7.1v.9H6.4C4.5 9.4 3 10.5 3 13.6s1.5 4.2 3.4 4.2h1.4v-2.4c0-2.1 1.8-3.9 3.9-3.9h4.5c1.4 0 2.5-1.1 2.5-2.5V6.4c0-1.8-.3-3.2-3.6-3.2Z" />
      <path d="M12 20.8c3.3 0 3.6-1.4 3.6-3.2v-2.1H8.5v-.9h9.1c1.9 0 3.4-1.1 3.4-4.2s-1.5-4.2-3.4-4.2h-1.4v2.4c0 2.1-1.8 3.9-3.9 3.9H7.8c-1.4 0-2.5 1.1-2.5 2.5v3.6c0 1.8.3 3.2 3.6 3.2Z" />
      <circle cx="10" cy="6" r="0.5" fill="currentColor" stroke="none" />
      <circle cx="14" cy="18" r="0.5" fill="currentColor" stroke="none" />
    </svg>
  );
}

function BracesIcon({ className, style }: TechIconSvgProps) {
  return (
    <svg className={className} style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 4c-1.5 0-2 .8-2 2v3c0 1-.5 1.5-1.5 1.5v2C5.5 12.5 6 13 6 14v3c0 1.2.5 2 2 2" />
      <path d="M16 4c1.5 0 2 .8 2 2v3c0 1 .5 1.5 1.5 1.5v2c-1 0-1.5.5-1.5 1.5v3c0 1.2-.5 2-2 2" />
    </svg>
  );
}

function TailwindIcon({ className, style }: TechIconSvgProps) {
  return (
    <svg className={className} style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 10c2-2.5 4-2.5 6 0s4 2.5 6 0 4-2.5 6 0" />
      <path d="M3 16c2-2.5 4-2.5 6 0s4 2.5 6 0 4-2.5 6 0" />
    </svg>
  );
}

function AtomIcon({ className, style }: TechIconSvgProps) {
  return (
    <svg className={className} style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <ellipse cx="12" cy="12" rx="9" ry="3.5" transform="rotate(45 12 12)" />
      <ellipse cx="12" cy="12" rx="9" ry="3.5" transform="rotate(-45 12 12)" />
      <circle cx="12" cy="12" r="1.4" fill="currentColor" stroke="none" />
    </svg>
  );
}

function AngleBracketsIcon({ className, style }: TechIconSvgProps) {
  return (
    <svg className={className} style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 8 5 12l4 4" />
      <path d="M15 8l4 4-4 4" />
    </svg>
  );
}

function PaintRollerIcon({ className, style }: TechIconSvgProps) {
  return (
    <svg className={className} style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="14" height="5" rx="2" />
      <path d="M7 9v3h4v8" />
    </svg>
  );
}

function PlugIcon({ className, style }: TechIconSvgProps) {
  return (
    <svg className={className} style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 2v5M15 2v5" />
      <path d="M6 7h12v4a6 6 0 0 1-12 0V7Z" />
      <path d="M12 17v5" />
    </svg>
  );
}

function CoffeeCupIcon({ className, style }: TechIconSvgProps) {
  return (
    <svg className={className} style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 9h13v5a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5V9Z" />
      <path d="M17 10h1.5a2.5 2.5 0 0 1 0 5H17" />
      <path d="M8 4c-.5 1 .5 1.5 0 2.5M12 4c-.5 1 .5 1.5 0 2.5" />
    </svg>
  );
}

function PeaksIcon({ className, style }: TechIconSvgProps) {
  return (
    <svg className={className} style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 18 9 9l4 5 3-4 5 8" />
      <path d="M3 18h18" />
    </svg>
  );
}

function FlameIcon({ className, style }: TechIconSvgProps) {
  return (
    <svg className={className} style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2c-1 4-5 5-5 10a5 5 0 0 0 10 0c0-2-1-3-2-4 .5 2-.5 3-1 3-1 0-1-1-1-2 0-2 1-4-1-7Z" />
    </svg>
  );
}

function DatabaseIcon({ className, style }: TechIconSvgProps) {
  return (
    <svg className={className} style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <ellipse cx="12" cy="5" rx="7" ry="2.5" />
      <path d="M5 5v6c0 1.4 3.1 2.5 7 2.5s7-1.1 7-2.5V5" />
      <path d="M5 11v6c0 1.4 3.1 2.5 7 2.5s7-1.1 7-2.5v-6" />
    </svg>
  );
}

function ExchangeIcon({ className, style }: TechIconSvgProps) {
  return (
    <svg className={className} style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 8h13M17 8l-3-3M17 8l-3 3" />
      <path d="M20 16H7M7 16l3-3M7 16l3 3" />
    </svg>
  );
}

function ElephantIcon({ className, style }: TechIconSvgProps) {
  return (
    <svg className={className} style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 16c-1.2-.9-1.8-2.2-1.5-3.6.3-1.6 1.7-2.4 3-2 .5-2.3 2.7-4.4 6-4.4 3.9 0 6.5 2.7 6.5 6 0 .7-.1 1.3-.3 1.9.9.2 1.3 1 1.3 1.9 0 1.1-.9 2-2 2h-.5" />
      <path d="M6 14v3.5a2 2 0 0 0 2 2h.5" />
      <path d="M9.5 14v3.5a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2V15" />
      <circle cx="8" cy="10" r="0.5" fill="currentColor" stroke="none" />
    </svg>
  );
}

function FlaskIcon({ className, style }: TechIconSvgProps) {
  return (
    <svg className={className} style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 3h6M10 3v5l-5 9a2 2 0 0 0 1.8 3h10.4A2 2 0 0 0 19 17l-5-9V3" />
      <path d="M8 15h8" />
    </svg>
  );
}

function BarChartIcon({ className, style }: TechIconSvgProps) {
  return (
    <svg className={className} style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 20V12M10 20V6M15 20V14M20 20V9" />
      <path d="M3 20h18" />
    </svg>
  );
}

function CardIcon({ className, style }: TechIconSvgProps) {
  return (
    <svg className={className} style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="6" width="18" height="13" rx="2" />
      <path d="M3 10h18" />
      <path d="M6 15h4" />
    </svg>
  );
}

function TagIcon({ className, style }: TechIconSvgProps) {
  return (
    <svg className={className} style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.5 12.6 12 21l-9-9V4h8l9.5 8.6Z" />
      <circle cx="7.5" cy="7.5" r="1.3" fill="currentColor" stroke="none" />
    </svg>
  );
}

const TECH_ICON_MAP: Record<string, (props: TechIconSvgProps) => React.JSX.Element> = {
  astro: AstroIcon,
  "nasa firms api": SatelliteIcon,
  python: PythonIcon,
  javascript: BracesIcon,
  "tailwind css": TailwindIcon,
  jsx: AtomIcon,
  api: PlugIcon,
  html: AngleBracketsIcon,
  css: PaintRollerIcon,
  java: CoffeeCupIcon,
  kotlin: PeaksIcon,
  firebase: FlameIcon,
  "php rest api": ExchangeIcon,
  mysql: DatabaseIcon,
  "google colab": FlaskIcon,
  streamlit: BarChartIcon,
  php: ElephantIcon,
  midtrans: CardIcon,
  "jupyter notebook": FlaskIcon,
};

export function TechIcon({ label, className, style }: { label: string; className?: string; style?: React.CSSProperties }) {
  const Icon = TECH_ICON_MAP[normalizeTechLabel(label)] ?? TagIcon;
  return <Icon className={className} style={style} />;
}

/* =========================================================================
 * ThemeToggle — light/dark switch button (desktop + mobile variants)
 * ========================================================================= */

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

/* nav link dekstop dan mobile */

interface NavHrefs {
  beranda: string;
  tentang: string;
  proyek: string;
  kontak: string;
}

interface HeaderProps {
  navHrefs: NavHrefs;
  activeItem?: keyof NavHrefs;
  enableMobileNavPositioning?: boolean;
  closeMobileNavOnButtonClick?: boolean;
}

function NavArrowIcon() {
  return (
    <svg className="nav-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
      <g transform="translate(12.000000, 12.000000) rotate(-90.000000) translate(-12.000000, -12.000000) translate(5.500000, 4.000000)">
        <line x1="6.7743" y1="15.7501" x2="6.7743" y2="0.7501"></line>
        <path d="M12.7988,9.6998 C12.7988,9.6998 9.5378,15.7498 6.7758,15.7498 C4.0118,15.7498 0.7498,9.6998 0.7498,9.6998"></path>
      </g>
    </svg>
  );
}

function BerandaIcon() {
  return (
    <svg className="nav-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
      <g>
        <line x1="14.71978" y1="15.00368" x2="9.28022" y2="15.00368"></line>
        <path
          d="M100.28571,274.70685h-10a5,5,0,0,1-5-5v-5.00916a5,5,0,0,1,1.601-3.667l5.6798-5.2648a4,4,0,0,1,5.43845,0l5.67981,5.2648a5,5,0,0,1,1.601,3.667v5.00916A5,5,0,0,1,100.28571,274.70685Z"
          transform="translate(-83.28571 -252.70317)"
        ></path>
      </g>
    </svg>
  );
}

function TentangIcon() {
  return (
    <svg className="nav-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
      <g>
        <circle cx="12" cy="8" r="4"></circle>
        <path d="M4,20 C4,16.686 7.582,14 12,14 C16.418,14 20,16.686 20,20"></path>
      </g>
    </svg>
  );
}

function ProyekIcon() {
  return (
    <svg className="nav-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
      <g>
        <rect x="5.54615" y="5.54615" width="16.45385" height="16.45385" rx="4"></rect>
        <path d="M171.33311,181.3216v-8.45385a4,4,0,0,1,4-4H183.787" transform="translate(-169.33311 -166.86775)"></path>
      </g>
    </svg>
  );
}

function KontakIcon() {
  return (
    <svg className="nav-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
      <g transform="translate(2.000000, 2.000000)">
        <line x1="13.9394" y1="10.413" x2="13.9484" y2="10.413"></line>
        <line x1="9.9304" y1="10.413" x2="9.9394" y2="10.413"></line>
        <line x1="5.9214" y1="10.413" x2="5.9304" y2="10.413"></line>
        <path d="M17.0710351,17.0698449 C14.0159481,20.1263505 9.48959549,20.7867004 5.78630747,19.074012 C5.23960769,18.8538953 1.70113357,19.8338667 0.933341969,19.0669763 C0.165550368,18.2990808 1.14639409,14.7601278 0.926307229,14.213354 C-0.787154393,10.5105699 -0.125888852,5.98259958 2.93020311,2.9270991 C6.83146881,-0.9756997 13.1697694,-0.9756997 17.0710351,2.9270991 C20.9803405,6.8359285 20.9723008,13.1680512 17.0710351,17.0698449 Z"></path>
      </g>
    </svg>
  );
}

const NAV_ITEMS: { key: keyof NavHrefs; label: string; Icon: () => React.JSX.Element }[] = [
  { key: "beranda", label: "Beranda", Icon: BerandaIcon },
  { key: "tentang", label: "Tentang", Icon: TentangIcon },
  { key: "proyek", label: "Proyek Terbaru", Icon: ProyekIcon },
  { key: "kontak", label: "Kontak", Icon: KontakIcon },
];

function NavList({ navHrefs, activeItem }: { navHrefs: NavHrefs; activeItem?: keyof NavHrefs }) {
  return (
    <>
      {NAV_ITEMS.map(({ key, label, Icon }) => (
        <li key={key}>
          <a href={navHrefs[key]} style={activeItem === key ? { color: "var(--accent-terracotta)" } : undefined}>
            <span className="nav-icon">
              <Icon />
            </span>
            {label}
            <span className="nav-arrow">
              <NavArrowIcon />
            </span>
          </a>
        </li>
      ))}
    </>
  );
}

export function Header({
  navHrefs,
  activeItem,
  enableMobileNavPositioning = false,
  closeMobileNavOnButtonClick = false,
}: HeaderProps) {
  const headerRef = useRef<HTMLElement>(null);
  const mobileNavRef = useRef<HTMLUListElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    function positionMobileNav(): void {
      if (!enableMobileNavPositioning) return;
      const header = headerRef.current;
      const mobileNav = mobileNavRef.current;
      const navContainer = header?.querySelector<HTMLElement>(".nav-container");
      if (!navContainer || !mobileNav || window.innerWidth > 768) return;
      const rect = navContainer.getBoundingClientRect();
      mobileNav.style.top = `${rect.bottom + 8}px`;
      mobileNav.style.right = "20px";
      mobileNav.style.left = "auto";
    }

    function onScroll(): void {
      const isScrolled = window.scrollY > 50;
      setScrolled(isScrolled);
      document.body.classList.toggle("header-scrolled", isScrolled);
      positionMobileNav();
    }

    let ticking = false;
    function onScrollThrottled(): void {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        onScroll();
        ticking = false;
      });
    }

    positionMobileNav();
    onScroll();
    window.addEventListener("resize", positionMobileNav);
    window.addEventListener("scroll", onScrollThrottled, { passive: true });
    return () => {
      window.removeEventListener("resize", positionMobileNav);
      window.removeEventListener("scroll", onScrollThrottled);
    };
  }, [enableMobileNavPositioning]);

  useEffect(() => {
    function onDocClick(e: MouseEvent): void {
      const header = headerRef.current;
      const mobileNav = mobileNavRef.current;
      const target = e.target as Node;
      if (header && mobileNav && !header.contains(target) && !mobileNav.contains(target)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener("click", onDocClick);
    return () => document.removeEventListener("click", onDocClick);
  }, []);

  return (
    <header id="mainHeader" ref={headerRef} className={scrolled ? "scrolled" : undefined}>
      <div className="nav-container">
        <div className="logo">
          <Link href="/" style={{ textDecoration: "none", color: "inherit" }}>
            Porto<span className="highlight">.</span>
          </Link>
        </div>

        <ul className="nav-links" id="navLinks">
          <NavList navHrefs={navHrefs} activeItem={activeItem} />
        </ul>

        <button
          id="menuToggle"
          className={`menu-toggle${menuOpen ? " open" : ""}`}
          aria-label="Buka Menu"
          onClick={(e) => {
            e.stopPropagation();
            setMenuOpen((open) => !open);
          }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <line className="line line-top" x1="4" y1="6" x2="20" y2="6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
            <line className="line line-mid" x1="4" y1="12" x2="20" y2="12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
            <line className="line line-bottom" x1="4" y1="18" x2="20" y2="18" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
          </svg>
        </button>

        <ThemeToggle id="themeToggle" className="theme-toggle js-theme-toggle" />
      </div>

      <ul
        className={`nav-links-mobile${menuOpen ? " open" : ""}`}
        id="navLinksMobile"
        ref={mobileNavRef}
        style={enableMobileNavPositioning ? undefined : { top: "82px", right: "20px", left: "auto" }}
        onClick={(e) => {
          if (closeMobileNavOnButtonClick || (e.target as HTMLElement).closest("a")) {
            setMenuOpen(false);
          }
        }}
      >
        <NavList navHrefs={navHrefs} activeItem={activeItem} />
        <li className="nav-theme-item">
          <ThemeToggle id="themeToggleMobile" className="theme-toggle-mobile js-theme-toggle" iconWrapperClassName="nav-icon" />
        </li>
      </ul>
    </header>
  );
}

/* backtotop */

export function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function onScroll(): void {
      setVisible(window.scrollY > 400);
    }
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      id="backToTopBtn"
      className={`back-to-top${visible ? " show" : ""}`}
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="18 15 12 9 6 15"></polyline>
      </svg>
    </div>
  );
}

/* footer */

function EmailIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="4" width="20" height="16" rx="3" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

function GithubIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.2c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

function LinkedinIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

export function FooterBar() {
  return (
    <div className="cf-footer-bar">
      <div className="cf-brand">
        <div className="logo">
          Ezra Rahmaditya<span className="highlight">.</span>
        </div>
      </div>

      <div className="cf-socials">
        <a href="mailto:ezrarahmadityaa@gmail.com" className="cf-social-btn" aria-label="Email">
          <EmailIcon />
          Email
        </a>
        <a href="https://github.com/ejerai" target="_blank" rel="noopener" className="cf-social-btn" aria-label="GitHub">
          <GithubIcon />
          GitHub
        </a>
        <a href="https://www.linkedin.com/in/ezra-rahmaditya-16671a328/" target="_blank" rel="noopener" className="cf-social-btn" aria-label="LinkedIn">
          <LinkedinIcon />
          LinkedIn
        </a>
      </div>

      <div className="cf-copy">
        <p>&copy; 2026</p>
      </div>
    </div>
  );
}

/* hero greeting */

const GREETINGS = [
  'Hi, I\'m <span class="highlight">Ezra</span>',
  '你好，我是 <span class="highlight">Ezra</span>',
  'こんにちは、<span class="highlight">Ezra</span>です',
  'Bonjour, je suis <span class="highlight">Ezra</span>',
  'Hola, soy <span class="highlight">Ezra</span>',
  'مرحبًا، أنا <span class="highlight">Ezra</span>',
  'Salam, saya <span class="highlight">Ezra</span>',
];
const FINAL_GREETING = 'Halo, aku <span class="highlight">Ezra</span>';

export function HeroGreeting() {
  const spanRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const span = spanRef.current;
    if (!span) return;

    const alreadyPlayed = sessionStorage.getItem("greetingPlayed");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const showText = (html: string): void => {
      span.innerHTML = html;
    };
    const showFinal = (): void => {
      showText(FINAL_GREETING);
      span.classList.add("show");
    };

    if (alreadyPlayed || reducedMotion) {
      showFinal();
      return;
    }

    let idx = 0;
    const timeouts: number[] = [];
    showText(GREETINGS[0]);
    requestAnimationFrame(() => span.classList.add("show"));

    const step = (): void => {
      idx++;
      span.classList.remove("show");
      timeouts.push(
        window.setTimeout(() => {
          if (idx < GREETINGS.length) {
            showText(GREETINGS[idx]);
            requestAnimationFrame(() => span.classList.add("show"));
            timeouts.push(window.setTimeout(step, 550));
          } else {
            showText(FINAL_GREETING);
            requestAnimationFrame(() => span.classList.add("show"));
            sessionStorage.setItem("greetingPlayed", "1");
          }
        }, 350),
      );
    };
    timeouts.push(window.setTimeout(step, 550));

    return () => timeouts.forEach((t) => clearTimeout(t));
  }, []);

  return (
    <h1 id="heroGreeting">
      <span className="greeting-fade" ref={spanRef}>
        Halo, aku <span className="highlight">Ezra</span>
      </span>
    </h1>
  );
}

/* section typewriter */

export function SectionTypewriter({ text }: { text: string }) {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cursorRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const title = titleRef.current;
    const cursor = cursorRef.current;
    if (!title || !cursor) return;

    title.textContent = "";
    title.appendChild(cursor);

    let hasStarted = false;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          if (!hasStarted) {
            hasStarted = true;
            let i = 0;
            const typeNextChar = (): void => {
              if (i < text.length) {
                cursor.insertAdjacentText("beforebegin", text.charAt(i));
                i++;
                setTimeout(typeNextChar, 70);
              } else {
                setTimeout(() => cursor.classList.add("done"), 600);
              }
            };
            typeNextChar();
          }
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.4 },
    );
    observer.observe(title);

    return () => observer.disconnect();
  }, [text]);

  return (
    <h2 className="section-title reveal reveal-up typewriter" ref={titleRef}>
      {text}
      <span className="typewriter-cursor" ref={cursorRef}></span>
    </h2>
  );
}
