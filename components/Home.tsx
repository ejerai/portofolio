"use client";

import React, { useEffect, useState } from "react";
import { Header, BackToTop, HeroGreeting, SectionTypewriter, FooterBar, TechIcon, MailtoLink, SCROLL_TARGET_KEY} from "@/components/Shared";
import { useRevealOnScroll } from "@/lib/site";
import { projects } from "@/content/site";
import type { Project } from "@/types/site";

/* folder project */

function FolderMainIcon() {
  return (
    <svg className="folder-main-icon line" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
      <g>
        <path d="M100.29,260.34082H97.45242a3.9777,3.9777,0,0,1-3.33828-1.81486h0a3.9777,3.9777,0,0,0-3.33829-1.81486H90.29a5,5,0,0,0-5,5v6a5,5,0,0,0,5,5h10a5,5,0,0,0,5-5v-2.37028A5,5,0,0,0,100.29,260.34082Z" transform="translate(-83.28996 -252.7111)"></path>
        <line x1="14.71978" y1="15" x2="9.28022" y2="15"></line>
      </g>
    </svg>
  );
}

function OpenHintChevron() {
  return (
    <svg className="line" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="14" height="14">
      <g transform="translate(12.000000, 12.000000) rotate(-90.000000) translate(-12.000000, -12.000000) translate(5.500000, 4.000000)">
        <line x1="6.7743" y1="15.7501" x2="6.7743" y2="0.7501"></line>
        <path d="M12.7988,9.6998 C12.7988,9.6998 9.5378,15.7498 6.7758,15.7498 C4.0118,15.7498 0.7498,9.6998 0.7498,9.6998"></path>
      </g>
    </svg>
  );
}

function ProjectCard({ project, onOpen }: { project: Project; onOpen: (id: string) => void }) {
  return (
    <div
      className="folder-card reveal reveal-left"
      data-project={project.id}
      role="button"
      tabIndex={0}
      aria-label={project.ariaLabel}
      onClick={() => onOpen(project.id)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onOpen(project.id);
        }
      }}
    >
      <div className="folder-tab">
        <span className="folder-tab-label">{project.tabLabel}</span>
        <span className="folder-tab-dots">
          <span></span>
          <span></span>
          <span></span>
        </span>
      </div>
      <div className="folder-body">
        <div className="folder-content">
          <div className="folder-icon-wrap">
            <FolderMainIcon />
          </div>
          <h3 className="folder-title">
            {project.titleLines.map((line, i) => (
              <React.Fragment key={i}>
                {i > 0 && <br />}
                {line}
              </React.Fragment>
            ))}
          </h3>
          <p className="folder-meta">{project.meta}</p>
          <div className="folder-tags">
            {project.tags.map((tag) => (
              <span className="folder-tag" key={tag}>
                <TechIcon label={tag} className="folder-tag-icon" />
                {tag}
              </span>
            ))}
          </div>
        </div>
        <div className="folder-open-hint">
          <OpenHintChevron />
          Buka Folder
        </div>
      </div>
    </div>
  );
}

/* project modal (lightbox project) */

function CloseIcon() {
  return (
    <svg className="line" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="14" height="14">
      <g transform="translate(12.000000, 12.000000) rotate(-45.000000) translate(-12.000000, -12.000000) translate(6.000000, 6.000000)">
        <line x1="6" y1="0" x2="6" y2="12"></line>
        <line x1="0" y1="6" x2="12" y2="6"></line>
      </g>
    </svg>
  );
}

function ExternalLinkIcon() {
  return (
    <svg className="line" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="14" height="14">
      <g>
        <polyline points="17 13 17 19 5 19 5 7 11 7"></polyline>
        <polyline points="14 5 19 5 19 10"></polyline>
        <line x1="19" y1="5" x2="11" y2="13"></line>
      </g>
    </svg>
  );
}

interface ProjectModalProps {
  project: Project;
  stampNumber: number;
  isOpen: boolean;
  onClose: () => void;
}

function ProjectModal({ project, stampNumber, isOpen, onClose }: ProjectModalProps) {
  return (
    <div
      className={`project-modal${isOpen ? " open" : ""}`}
      id={`modal-${project.id}`}
      role="dialog"
      aria-modal="true"
      aria-label={project.ariaLabel}
    >
      <div className="modal-backdrop" onClick={onClose}></div>
      <div className="modal-dossier">
        <div className="modal-dossier-header">
          <div className="modal-dossier-stamp">{String(stampNumber).padStart(2, "0")}</div>
          <div className="modal-dossier-ref">{project.refYear}</div>
          <button className="modal-close" aria-label="Tutup" onClick={onClose}>
            <CloseIcon />
          </button>
        </div>

        <div className="modal-img-float">
          <div className="modal-img-placeholder">
            <img src={project.img} alt={project.imgAlt} />
          </div>
        </div>

        <div className="modal-info-panel">
          <div className="modal-info-left">
            <h2 className="modal-title">
              {project.modalTitleLines.map((line, i) => (
                <React.Fragment key={i}>
                  {i > 0 && <br />}
                  {line}
                </React.Fragment>
              ))}
            </h2>
            <p className="modal-desc">{project.desc}</p>
          </div>

          <div className="modal-info-right">
            <div className="modal-meta-block">
              <div className="modal-meta-item">
                <span className="modal-meta-val">{project.metaValue}</span>
              </div>
            </div>
            <div className="modal-tech-grid">
              {project.chips.map((chip) => (
                <div className="modal-tech-chip" key={chip.label}>
                  <TechIcon label={chip.label} className="modal-tech-icon" style={{ color: chip.color }} />
                  {chip.label}
                </div>
              ))}
            </div>
            <div className="modal-actions">
              <a href={project.actionHref} target={project.actionTarget ?? undefined} className="modal-btn-primary">
                <ExternalLinkIcon />
                {project.actionLabel}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* beranda ku.*/

export function HomeClient() {
  const [activeProject, setActiveProject] = useState<string | null>(null);
  useRevealOnScroll();
  
  useEffect(() => {
  const target = sessionStorage.getItem(SCROLL_TARGET_KEY);
  if (!target) return;
  sessionStorage.removeItem(SCROLL_TARGET_KEY);
  const el = document.getElementById(target);
  if (el) {
    requestAnimationFrame(() => el.scrollIntoView({ behavior: "smooth" }));
  }
}, []);

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
        navHrefs={{ beranda: "#beranda", tentang: "/about", proyek: "#proyek", kontak: "about#kontak" }}
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
        <div className="cf-divider"></div>

        <FooterBar />
      </section>

      <BackToTop />
    </>
  );
}
