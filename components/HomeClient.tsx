"use client";

import { useEffect, useState } from "react";
import { Header } from "@/components/Header";
import { BackToTop } from "@/components/BackToTop";
import { HeroGreeting } from "@/components/HeroGreeting";
import { SectionTypewriter } from "@/components/SectionTypewriter";
import { ProjectCard } from "@/components/ProjectCard";
import { ProjectModal } from "@/components/ProjectModal";
import { FooterBar } from "@/components/FooterBar";
import { useRevealOnScroll } from "@/lib/reveal";
import { projects } from "@/content/projects";

export function HomeClient() {
  const [activeProject, setActiveProject] = useState<string | null>(null);
  useRevealOnScroll();

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent): void {
      if (e.key === "Escape") setActiveProject(null);
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <>
      <div className="bg-shape shape-1"></div>
      <div className="bg-shape shape-2"></div>

      <Header
        navHrefs={{ beranda: "#beranda", tentang: "/about", proyek: "#proyek", kontak: "#kontak" }}
        enableMobileNavPositioning
        closeMobileNavOnButtonClick
      />

      <section id="beranda" className="hero-section">
        <div className="hero-grid-overlay" aria-hidden="true"></div>
        <div className="hero-content">
          <div className="hero-text reveal reveal-left">
            <HeroGreeting />
            <p>
              Berfokus pada pembelajaran dan pendewasaan diri. Portofolio ini menampilkan proyek dan kontribusi saya
              sebagai anak perkuliahan di dunia teknologi.
            </p>
          </div>

          <div className="hero-photo-wrap reveal reveal-right" style={{ ["--reveal-delay" as string]: "0.15s" }}>
            <div className="hero-photo-ring"></div>
            <div className="hero-photo-inner">
              <img
                src="/gmi/ezra-rahmaditya.webp"
                alt="Foto Ezra Rahmaditya"
                className="hero-photo-img"
                onError={(e) => {
                  const img = e.currentTarget;
                  img.style.display = "none";
                  img.parentElement?.classList.add("hero-photo-placeholder");
                }}
              />
            </div>
          </div>
        </div>
      </section>

      <section id="proyek" className="projects-section">
        <div className="projects-container">
          <SectionTypewriter text="Proyek Terbaru" />

          <div className="project-grid">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} onOpen={setActiveProject} />
            ))}
          </div>

          {projects.map((project, i) => (
            <ProjectModal
              key={project.id}
              project={project}
              stampNumber={i + 1}
              isOpen={activeProject === project.id}
              onClose={() => setActiveProject(null)}
            />
          ))}
        </div>
      </section>

      <section id="kontak" className="contact-footer-section">
        <div className="cf-container">
          <div className="cf-cta reveal reveal-up">
            <h2>
              Kontak<span className="highlight">.</span>
            </h2>
            <a href="mailto:ezrarahmadityaa@gmail.com" className="btn-primary">
              Hubungi Saya
            </a>
          </div>
        </div>

        <div className="cf-divider"></div>

        <FooterBar />
      </section>

      <BackToTop />
    </>
  );
}
