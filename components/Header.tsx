"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ThemeToggle } from "./ThemeToggle";

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