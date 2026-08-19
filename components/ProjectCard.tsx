"use client";

import React from "react";
import type { Project } from "@/types/project";

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

export function ProjectCard({ project, onOpen }: { project: Project; onOpen: (id: string) => void }) {
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
