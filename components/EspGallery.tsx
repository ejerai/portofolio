"use client";

import { useEffect, useState } from "react";
import type { EspCategory, EspItem } from "@/types/esp";
import { espData } from "@/content/esp";

const espIconThumb =
  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><rect x="3" y="4" width="18" height="16" rx="2"/><line x1="7" y1="9" x2="17" y2="9"/><line x1="7" y1="13" x2="13" y2="13"/></svg>';

function ensurePdfViewerStyles(): void {
  if (document.getElementById("esp-pdf-style")) return;
  const style = document.createElement("style");
  style.id = "esp-pdf-style";
  style.textContent = "@keyframes espFadeIn{from{opacity:0}to{opacity:1}}";
  document.head.appendChild(style);
}

function openPdfViewer(url: string, title?: string): void {
  ensurePdfViewerStyles();
  document.getElementById("esp-pdf-viewer")?.remove();

  const overlay = document.createElement("div");
  overlay.id = "esp-pdf-viewer";
  overlay.style.cssText = `
    position:fixed;inset:0;z-index:9999;
    background:rgba(15,10,5,0.88);
    display:flex;flex-direction:column;align-items:center;justify-content:center;
    padding:1rem;animation:espFadeIn .2s ease;
  `;

  const toolbar = document.createElement("div");
  toolbar.style.cssText = `
    width:100%;max-width:860px;display:flex;align-items:center;
    justify-content:space-between;padding:.5rem .75rem;
    background:#1a1008;border-radius:10px 10px 0 0;
    border-bottom:1px solid rgba(212,160,23,.25);
  `;
  toolbar.innerHTML = `
    <span style="font-family:'Poppins',sans-serif;font-size:.8rem;
      color:rgba(245,240,232,.65);letter-spacing:.04em;max-width:60%;
      overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${title || "Sertifikat"}</span>
    <div style="display:flex;gap:.5rem;align-items:center;">
      <a id="esp-pdf-dl" href="${url}" download
        style="display:inline-flex;align-items:center;gap:.35rem;
          font-family:'Poppins',sans-serif;font-size:.75rem;font-weight:500;
          color:#d4a017;text-decoration:none;
          border:1px solid rgba(212,160,23,.4);border-radius:6px;
          padding:.3rem .65rem;transition:all .2s;"
        onmouseover="this.style.background='rgba(212,160,23,.12)'"
        onmouseout="this.style.background='transparent'">
        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24"
          fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
          <polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
        </svg>Download
      </a>
      <button id="esp-pdf-close"
        style="background:none;border:1px solid rgba(245,240,232,.2);border-radius:6px;
          cursor:pointer;color:rgba(245,240,232,.7);padding:.3rem .5rem;
          display:flex;align-items:center;transition:all .2s;"
        onmouseover="this.style.borderColor='rgba(245,240,232,.5)';this.style.color='#f5f0e8'"
        onmouseout="this.style.borderColor='rgba(245,240,232,.2)';this.style.color='rgba(245,240,232,.7)'"
        aria-label="Tutup PDF">
        <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24"
          fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
          <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
        </svg>
      </button>
    </div>
  `;

  const frame = document.createElement("iframe");
  frame.src = url;
  frame.style.cssText = `
    width:100%;max-width:860px;height:min(80vh,640px);
    border:none;background:#fff;border-radius:0 0 10px 10px;display:block;
  `;

  overlay.appendChild(toolbar);
  overlay.appendChild(frame);
  document.body.appendChild(overlay);
  document.body.style.overflow = "hidden";

  const close = (): void => {
    overlay.remove();
    document.body.style.overflow = "";
  };

  document.getElementById("esp-pdf-close")?.addEventListener("click", close);
  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) close();
  });
  document.addEventListener("keydown", function onKeydown(e: KeyboardEvent) {
    if (e.key === "Escape") {
      close();
      document.removeEventListener("keydown", onKeydown);
    }
  });
}

function openImageLightbox(category: EspCategory): void {
  const photoEl = document.getElementById(`photo-${category}`);
  const img = photoEl?.querySelector<HTMLImageElement>("img");
  if (!img || !img.src || img.src === window.location.href) {
    alert("Gambar tidak tersedia.");
    return;
  }
  const overlay = document.createElement("div");
  overlay.className = "lightbox-overlay";
  overlay.id = `lightbox-${category}`;
  const fullImg = document.createElement("img");
  fullImg.src = img.src;
  overlay.appendChild(fullImg);
  document.body.appendChild(overlay);
  overlay.addEventListener("click", () => overlay.remove());
}

function CloseIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

interface EspGalleryProps {
  category: EspCategory;
  fileLabel: string;
  title: string;
  isOpen: boolean;
  onClose: () => void;
}

export function EspGallery({ category, fileLabel, title, isOpen, onClose }: EspGalleryProps) {
  const items = espData[category];
  const [selected, setSelected] = useState(0);
  const current: EspItem | undefined = items[selected];

  // Rebuild the PDF chip on the photo panel imperatively (matches the
  // original's direct DOM injection so hover/style behavior is identical).
  useEffect(() => {
    const photoEl = document.getElementById(`photo-${category}`);
    if (!photoEl) return;
    photoEl.querySelector(".esp-pdf-btn")?.remove();
    if (!current?.pdf) return;

    const chip = document.createElement("div");
    chip.className = "esp-pdf-btn";
    chip.style.cssText = "position:absolute;top:.6rem;right:.6rem;display:flex;gap:.35rem;z-index:5;";
    chip.innerHTML = `
      <button class="esp-pdf-view-btn"
        style="display:inline-flex;align-items:center;gap:.3rem;
          font-family:'Poppins',sans-serif;font-size:.7rem;font-weight:500;
          color:#d4a017;background:rgba(15,10,5,.82);
          border:1px solid rgba(212,160,23,.35);border-radius:6px;
          padding:.28rem .55rem;cursor:pointer;backdrop-filter:blur(6px);
          transition:all .2s;white-space:nowrap;"
        onmouseover="this.style.background='rgba(212,160,23,.18)'"
        onmouseout="this.style.background='rgba(15,10,5,.82)'"
        title="Lihat PDF">
        <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 24 24"
          fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
          <polyline points="14 2 14 8 20 8"/>
        </svg>Lihat PDF
      </button>
      <a class="esp-pdf-dl-btn" href="${current.pdf}" download
        style="display:inline-flex;align-items:center;gap:.3rem;
          font-family:'Poppins',sans-serif;font-size:.7rem;font-weight:500;
          color:rgba(245,240,232,.8);background:rgba(15,10,5,.82);
          border:1px solid rgba(245,240,232,.2);border-radius:6px;
          padding:.28rem .55rem;text-decoration:none;backdrop-filter:blur(6px);
          transition:all .2s;white-space:nowrap;"
        onmouseover="this.style.borderColor='rgba(245,240,232,.5)'"
        onmouseout="this.style.borderColor='rgba(245,240,232,.2)'"
        title="Download PDF">
        <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 24 24"
          fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
          <polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
        </svg>Download
      </a>
    `;
    chip.querySelector(".esp-pdf-view-btn")?.addEventListener("click", () => {
      openPdfViewer(current.pdf!, current.title);
    });
    photoEl.appendChild(chip);
  }, [category, current, selected]);

  return (
    <div className={`project-modal${isOpen ? " open" : ""}`} id={`modal-${category}`} role="dialog" aria-modal="true" aria-label={title}>
      <div className="modal-backdrop" onClick={onClose}></div>
      <div className="modal-dossier dossier-espresso" tabIndex={-1}>
        <div className="dossier-esp-hdr">
          <span className="esp-stamp">{fileLabel}</span>
          <span className="esp-hdr-title">{title}</span>
          <span className="esp-counter" id={`counter-${category}`}>
            {items.length ? `${selected + 1} / ${items.length}` : "0 / 0"}
          </span>
          <button className="modal-close" aria-label="Tutup" onClick={onClose}>
            <CloseIcon />
          </button>
        </div>
        <div className="dossier-esp-body">
          <div className="esp-list-wrap" id={`list-${category}`}>
            {!items.length ? (
              <p style={{ color: "white", padding: "1.5rem", opacity: 0.5, fontSize: "0.85rem" }}>
                Belum ada sertifikat yang ditambahkan.
              </p>
            ) : (
              items.map((item, i) => (
                <div
                  key={item.title}
                  className={`esp-list-item${i === selected ? " active" : ""}`}
                  role="button"
                  tabIndex={0}
                  onClick={() => setSelected(i)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setSelected(i);
                    }
                  }}
                >
                  <div className="esp-list-thumb" dangerouslySetInnerHTML={{ __html: espIconThumb }} />
                  <div className="esp-list-info">
                    <strong>{item.title}</strong>
                    <span>{item.meta || ""}</span>
                  </div>
                </div>
              ))
            )}
          </div>

          {items.length > 0 && (
            <div className="esp-preview">
              <div className="esp-photo-wrap">
                <div className="esp-photo" id={`photo-${category}`}>
                  <img src={current?.img || ""} alt={current?.title || ""} id={`img-${category}`} className="esp-photo-img" />
                </div>
                <button className="esp-view-overlay" onClick={() => openImageLightbox(category)}>
                  Lihat Penuh
                </button>
              </div>
              <div className="esp-info">
                <div className="esp-gold-divider"></div>
                <div className="esp-preview-title" id={`title-${category}`}>
                  {current?.title}
                </div>
                <div
                  className="esp-preview-desc"
                  id={`desc-${category}`}
                  dangerouslySetInnerHTML={{ __html: current?.desc || "" }}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
