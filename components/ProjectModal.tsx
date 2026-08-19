"use client";

import React from "react";
import type { Project } from "@/types/project";

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

export function ProjectModal({ project, stampNumber, isOpen, onClose }: ProjectModalProps) {
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
                  <span className="modal-tech-dot" style={{ background: chip.color }}></span>
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
