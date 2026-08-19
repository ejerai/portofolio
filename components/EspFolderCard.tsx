"use client";

function OpenHintArrow() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <path d="M5 12h14M12 5l7 7-7 7"></path>
    </svg>
  );
}

function AkademikIcon() {
  return (
    <svg className="folder-main-icon line" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="16" rx="2"></rect>
      <line x1="7" y1="9" x2="17" y2="9"></line>
      <line x1="7" y1="13" x2="13" y2="13"></line>
      <circle cx="17" cy="16" r="2"></circle>
      <path d="M17 18v3l-1.5-1-1.5 1v-3"></path>
    </svg>
  );
}

function PrestasiIcon() {
  return (
    <svg className="folder-main-icon line" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
    </svg>
  );
}

interface EspFolderCardProps {
  folder: "akademik" | "prestasi";
  tabLabel: string;
  ariaLabel: string;
  title: string;
  tags: string[];
  onOpen: (folder: string) => void;
}

export function EspFolderCard({ folder, tabLabel, ariaLabel, title, tags, onOpen }: EspFolderCardProps) {
  return (
    <div
      className="folder-card"
      data-folder={folder}
      role="button"
      tabIndex={0}
      aria-label={ariaLabel}
      onClick={() => onOpen(folder)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onOpen(folder);
        }
      }}
    >
      <div className="folder-tab">
        <span className="folder-tab-label">{tabLabel}</span>
        <span className="folder-tab-dots">
          <span></span>
          <span></span>
          <span></span>
        </span>
      </div>
      <div className="folder-body">
        <div className="folder-content">
          <div className="folder-icon-wrap">{folder === "akademik" ? <AkademikIcon /> : <PrestasiIcon />}</div>
          <h3 className="folder-title">{title}</h3>
          <div className="folder-tags">
            {tags.map((tag) => (
              <span className="folder-tag" key={tag}>
                {tag}
              </span>
            ))}
          </div>
          <div className="folder-open-hint">
            <OpenHintArrow />
            Buka folder
          </div>
        </div>
      </div>
    </div>
  );
}
