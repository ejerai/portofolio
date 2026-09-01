"use client";

import { useEffect, useRef, useState } from "react";
import { Header, BackToTop, FooterBar } from "@/components/Shared";
import { useRevealOnScroll } from "@/lib/site";
import type { EspCategory, EspItem } from "@/types/site";
import { espData } from "@/content/site";

/* folder halaman about */

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

function EspFolderCard({ folder, tabLabel, ariaLabel, title, tags, onOpen }: EspFolderCardProps) {
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

/* sertifikat */

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

function EspCloseIcon() {
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

function EspGallery({ category, fileLabel, title, isOpen, onClose }: EspGalleryProps) {
  const items = espData[category];
  const [selected, setSelected] = useState(0);
  const current: EspItem | undefined = items[selected];

  // rebuild pdf
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
            <EspCloseIcon />
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

/* galeriku */

const SLIDES = [
  { src: "/gmi/momen-1.jpg", alt: "Workshop AI Engineer - BlockDev" },
  { src: "/gmi/momen-2.jpg", alt: "Operator Seminar Volunteer" },
  { src: "/gmi/momen-3.jpg", alt: "Lingkungan SEHAT nya Ezra" },
  { src: "/gmi/momen-4.jpg", alt: "Meeting Bersama NOC - UBLV" },
  { src: "/gmi/momen-5.jpg", alt: "Lingkungan SEHAT nya Ezra #2" },
  { src: "/gmi/momen-6.jpg", alt: "Google Developer Group Jakarta 2025" },
];

interface PinGalleryProps {
  onImageClick: (src: string, alt: string) => void;
}

function PinGallery({ onImageClick }: PinGalleryProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const railRef = useRef<HTMLDivElement>(null);
  const [caption, setCaption] = useState(`Momen 1 dari ${SLIDES.length}`);
  const [fillPercent, setFillPercent] = useState(100 / SLIDES.length);
  const [machineTop, setMachineTop] = useState(100 - 100 / SLIDES.length);
  const currentIndexRef = useRef(0);

  useEffect(() => {
    const track = trackRef.current;
    const rail = railRef.current;
    if (!track) return;
    const slideCount = SLIDES.length;
    let autoplayTimer: number | null = null;

    function updateFromScroll(): void {
      const maxScroll = track!.scrollHeight - track!.clientHeight;
      const progress = maxScroll > 0 ? track!.scrollTop / maxScroll : 0;
      const fill = Math.max(100 / slideCount, 100 * progress);
      const top = Math.min(94, Math.max(6, 100 - fill));
      setFillPercent(fill);
      setMachineTop(top);
      const idx = Math.min(slideCount - 1, Math.round(progress * (slideCount - 1)));
      currentIndexRef.current = idx;
      const label = SLIDES[idx]?.alt || `Momen ${idx + 1}`;
      setCaption(label);
      rail?.setAttribute("aria-valuenow", String(idx + 1));
    }

    function goToSlide(index: number): void {
      const slideEl = track!.children[index] as HTMLElement | undefined;
      if (slideEl) track!.scrollTo({ top: slideEl.offsetTop, behavior: "smooth" });
    }

    function stopAutoplay(): void {
      if (autoplayTimer !== null) {
        clearInterval(autoplayTimer);
        autoplayTimer = null;
      }
    }

    track.addEventListener("scroll", updateFromScroll, { passive: true });
    const stopEvents: (keyof HTMLElementEventMap)[] = ["wheel", "touchstart", "pointerdown"];
    stopEvents.forEach((evt) => track.addEventListener(evt, stopAutoplay, { passive: true }));

    let isSeeking = false;
    const seekTo = (clientY: number): void => {
      if (!rail) return;
      const rect = rail.getBoundingClientRect();
      const offset = clientY - rect.top;
      const ratio = Math.min(1, Math.max(0, 1 - offset / rect.height));
      goToSlide(Math.min(slideCount - 1, Math.max(0, Math.round(ratio * (slideCount - 1)))));
    };
    const onPointerDown = (e: PointerEvent) => {
      isSeeking = true;
      stopAutoplay();
      rail?.setPointerCapture(e.pointerId);
      rail?.classList.add("is-seeking");
      seekTo(e.clientY);
    };
    const onPointerMove = (e: PointerEvent) => {
      if (isSeeking) seekTo(e.clientY);
    };
    const endSeek = (e: PointerEvent) => {
      if (!isSeeking) return;
      isSeeking = false;
      rail?.classList.remove("is-seeking");
      try {
        rail?.releasePointerCapture(e.pointerId);
      } catch {
        
      }
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
        e.preventDefault();
        stopAutoplay();
        goToSlide(Math.max(0, currentIndexRef.current - 1));
      } else if (e.key === "ArrowDown" || e.key === "ArrowRight") {
        e.preventDefault();
        stopAutoplay();
        goToSlide(Math.min(slideCount - 1, currentIndexRef.current + 1));
      }
    };

    if (rail) {
      rail.addEventListener("pointerdown", onPointerDown);
      rail.addEventListener("pointermove", onPointerMove);
      rail.addEventListener("pointerup", endSeek);
      rail.addEventListener("pointercancel", endSeek);
      rail.setAttribute("role", "slider");
      rail.setAttribute("tabindex", "0");
      rail.setAttribute("aria-label", "Seret atau klik untuk pindah foto");
      rail.setAttribute("aria-valuemin", "1");
      rail.setAttribute("aria-valuemax", String(slideCount));
      rail.addEventListener("keydown", onKeyDown);
    }

    updateFromScroll();
    stopAutoplay();
    autoplayTimer = window.setInterval(() => {
      goToSlide((currentIndexRef.current + 1) % slideCount);
    }, 2500);

    return () => {
      track.removeEventListener("scroll", updateFromScroll);
      stopEvents.forEach((evt) => track.removeEventListener(evt, stopAutoplay));
      if (rail) {
        rail.removeEventListener("pointerdown", onPointerDown);
        rail.removeEventListener("pointermove", onPointerMove);
        rail.removeEventListener("pointerup", endSeek);
        rail.removeEventListener("pointercancel", endSeek);
        rail.removeEventListener("keydown", onKeyDown);
      }
      stopAutoplay();
    };
  }, []);

  return (
    <div className="pin-gallery reveal reveal-up" style={{ ["--reveal-delay" as string]: "0.35s" }}>
      <h3 className="about-title">
        Galeriku<span className="pin-gallery-dot">.</span>
      </h3>

      <div className="pin-gallery-row" aria-label="Galeri momen — scroll untuk melihat foto lainnya">
        <div className="pin-slider">
          <div className="pin-slider-track" id="pinTrack" ref={trackRef}>
            {SLIDES.map((slide, i) => (
              <figure className="pin-slide" data-index={i} key={slide.src}>
                <img src={slide.src} alt={slide.alt} onClick={() => onImageClick(slide.src, slide.alt)} />
              </figure>
            ))}
          </div>
          <div className="pin-caption" id="pinCaption">
            {caption}
          </div>
        </div>

        <div className="pin-rail" id="pinRail" ref={railRef}>
          <div className="pin-rail-track">
            <div className="pin-rail-fill" id="pinRailFill" style={{ height: `${fillPercent}%` }}></div>
          </div>
          <div className="pin-rail-machine" id="pinRailMachine" style={{ top: `${machineTop}%` }}>
            <div className="pin-rail-steam">
              <span></span>
              <span></span>
              <span></span>
            </div>
            <div className="pin-rail-machine-body"></div>
            <div className="pin-rail-spout"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* image lightbox*/

interface ImageLightboxProps {
  src: string;
  alt: string;
  open: boolean;
  onClose: () => void;
}

function ImageLightbox({ src, alt, open, onClose }: ImageLightboxProps) {
  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    function onKeyDown(e: KeyboardEvent): void {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open, onClose]);

  return (
    <div className={`lightbox${open ? " open" : ""}`} id="lightbox">
      <div className="lightbox-backdrop" id="lightboxBackdrop" onClick={onClose}></div>
      <button type="button" className="lightbox-close" id="lightboxClose" aria-label="Tutup gambar" onClick={onClose}>
        <span className="lightbox-close-ring" aria-hidden="true"></span>
        <svg
          className="lightbox-close-icon"
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>
      <figure className="lightbox-figure">
        <img src={open ? src : ""} alt={open ? alt : ""} id="lightboxImg" />
        <figcaption id="lightboxCaption">{open ? alt : ""}</figcaption>
      </figure>
    </div>
  );
}

/* contact form (web3forms)*/

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const WEB3FORMS_ACCESS_KEY = "2b9c970c-dce7-4673-a4aa-0e42232ae0cf";

interface Web3FormsResponse {
  success: boolean;
  message?: string;
}

function ContactNameIcon() {
  return (
    <svg className="kontak-icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <g>
        <path d="M98.80039,256.86631c-.97137-1.16611-2.19075-2.16707-3.51485-2.16707s-2.54349,1.001-3.51485,2.16707a4.53642,4.53642,0,0,0,.3,6.103h.00006a4.54643,4.54643,0,0,0,6.42959,0h.00006A4.53642,4.53642,0,0,0,98.80039,256.86631Z" transform="translate(-83.28549 -252.69924)"></path>
        <rect x="2" y="15.30177" width="20" height="6.69823" rx="3.34911"></rect>
      </g>
    </svg>
  );
}

function ContactEmailIcon() {
  return (
    <svg className="kontak-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <g transform="translate(2.45208, 2.85198)">
        <path d="M15.0928322,6.167017 C15.0928322,6.167017 11.8828071,10.0196486 9.53493746,10.0196486 C7.18807029,10.0196486 3.941955,6.167017 3.941955,6.167017"></path>
        <path d="M0,9.11679198 C0,2.27869674 2.38095238,0 9.52380952,0 C16.6666667,0 19.047619,2.27869674 19.047619,9.11679198 C19.047619,15.9538847 16.6666667,18.233584 9.52380952,18.233584 C2.38095238,18.233584 0,15.9538847 0,9.11679198 Z"></path>
      </g>
    </svg>
  );
}

function MessageIcon() {
  return (
    <svg className="kontak-icon kontak-icon--top" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <g transform="translate(2, 2)">
        <line x1="13.9394" y1="10.413" x2="13.9484" y2="10.413"></line>
        <line x1="9.9304" y1="10.413" x2="9.9394" y2="10.413"></line>
        <line x1="5.9214" y1="10.413" x2="5.9304" y2="10.413"></line>
        <path d="M17.0710351,17.0698449 C14.0159481,20.1263505 9.48959549,20.7867004 5.78630747,19.074012 C5.23960769,18.8538953 1.70113357,19.8338667 0.933341969,19.0669763 C0.165550368,18.2990808 1.14639409,14.7601278 0.926307229,14.213354 C-0.787154393,10.5105699 -0.125888852,5.98259958 2.93020311,2.9270991 C6.83146881,-0.9756997 13.1697694,-0.9756997 17.0710351,2.9270991 C20.9803405,6.8359285 20.9723008,13.1680512 17.0710351,17.0698449 Z"></path>
      </g>
    </svg>
  );
}

function SendIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="22" y1="2" x2="11" y2="13" />
      <polygon points="22 2 15 22 11 13 2 9 22 2" />
    </svg>
  );
}

function ContactForm() {
  const [status, setStatus] = useState<{ text: string; kind: "error" | "success" | null }>({
    text: "",
    kind: null,
  });
  const [submitting, setSubmitting] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>): Promise<void> {
    e.preventDefault();
    const form = formRef.current;
    if (!form) return;

    const name = (form.elements.namedItem("name") as HTMLInputElement).value.trim();
    const email = (form.elements.namedItem("email") as HTMLInputElement).value.trim();
    const message = (form.elements.namedItem("message") as HTMLTextAreaElement).value.trim();

    setStatus({ text: "", kind: null });

    if (!name || !email || !message) {
      setStatus({ text: "Mohon isi semua kolom sebelum mengirim pesan.", kind: "error" });
      return;
    }
    if (!EMAIL_RE.test(email)) {
      setStatus({ text: "Format email tidak valid.", kind: "error" });
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          subject: `Pesan baru dari Portfolio — ${name}`,
          from_name: name,
          name,
          email,
          message,
        }),
      });
      const data = (await res.json()) as Web3FormsResponse;
      if (!data.success) throw new Error(data.message || "Gagal mengirim");

      setStatus({ text: "Pesan terkirim! Terima kasih, akan aku balas secepatnya.", kind: "success" });
      form.reset();
    } catch {
      setStatus({
        text: "Gagal mengirim otomatis. Silakan email langsung ke ezrarahmadityaa@gmail.com.",
        kind: "error",
      });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="kontak-card reveal reveal-up" style={{ ["--reveal-delay" as string]: "0.2s" }}>
      <div className="kontak-card-head">
        <h3 className="about-title">
          Kontak<span className="kontak-dot">.</span>
        </h3>
      </div>

      <form className="kontak-form" id="kontakForm" noValidate ref={formRef} onSubmit={handleSubmit}>
        <div className="kontak-field kontak-field--icon">
          <ContactNameIcon />
          <label className="kontak-label-sr" htmlFor="kontakName">
            Nama
          </label>
          <input className="kontak-input" id="kontakName" name="name" type="text" placeholder="nama" required autoComplete="name" />
        </div>

        <div className="kontak-field kontak-field--icon">
          <ContactEmailIcon />
          <label className="kontak-label-sr" htmlFor="kontakEmail">
            Email
          </label>
          <input className="kontak-input" id="kontakEmail" name="email" type="email" placeholder="nama@email.com" required autoComplete="email" />
        </div>

        <div className="kontak-field kontak-field--icon kontak-field--textarea">
          <MessageIcon />
          <label className="kontak-label-sr" htmlFor="kontakMsg">
            Pesan
          </label>
          <textarea className="kontak-input kontak-textarea" id="kontakMsg" name="message" placeholder="surat cinta..." required rows={2}></textarea>
        </div>

        <div className="kontak-form-foot">
          <p className={`kontak-status${status.kind ? ` is-${status.kind}` : ""}`} id="kontakStatus" role="status" aria-live="polite">
            {status.text}
          </p>
          <button type="submit" className="kontak-submit" id="kontakSubmit" disabled={submitting}>
            <span>{submitting ? "Mengirim..." : "Kirim Pesan"}</span>
            <SendIcon />
          </button>
        </div>
      </form>
    </div>
  );
}

/* =========================================================================
 * AboutClient — the about page itself
 * ========================================================================= */

export function AboutClient() {
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [lightbox, setLightbox] = useState<{ src: string; alt: string } | null>(null);
  useRevealOnScroll();

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent): void {
      if (e.key === "Escape") setActiveModal(null);
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <>
    <div className="bg-shape shape-1"></div>
    <div className="bg-shape shape-2"></div>
      <Header
        navHrefs={{
          beranda: "/#beranda",
          tentang: "/about",
          proyek: "/#proyek",
          kontak: "/#kontak",
        }}
        activeItem="tentang"
      />

      <main>
        <section className="about-section">
          <div className="about-container">
            <div className="about-left">
              <h1 className="about-name reveal reveal-left">
                Ezra<br />Rahmaditya<em>.</em>
              </h1>

              <div className="about-list reveal reveal-up" style={{ ["--reveal-delay" as string]: "0.15s" }}>
                <div className="about-row">
                  <span className="about-key">Kampus</span>
                  <span className="about-val">Budi Luhur University</span>
                </div>
                <div className="about-row">
                  <span className="about-key">Jurusan</span>
                  <span className="about-val">Teknik Informatika</span>
                </div>
                <div className="about-row">
                  <span className="about-key">Lokasi</span>
                  <span className="about-val">Depok, Indonesia</span>
                </div>
                <div className="about-row">
                  <span className="about-key">Keahlian</span>
                  <span className="about-val">HTML · CSS · JavaScript · Next.js · Python · PHP · Typescript · Astro</span>
                </div>
                <div className="about-row">
                  <span className="about-key">Status</span>
                  <span className="about-val">Aktif Kuliah Semester 4</span>
                </div>
                <div className="about-row">
                  <span className="about-key">Kontak</span>
                  <span className="about-val">
                    <a href="mailto:ezrarahmadityaa@gmail.com">ezrarahmadityaa@gmail.com</a>
                  </span>
                </div>
                <div className="about-row">
                  <span className="about-key">Sosial</span>
                  <span className="about-val">
                    <a href="https://www.blogger.com/profile/17646699077233676938" target="_blank" rel="noopener">
                      Blogger Profile
                    </a>
                    &nbsp;·&nbsp;
                    <a href="https://github.com/ejerai" target="_blank" rel="noopener">
                      GitHub
                    </a>
                    &nbsp;·&nbsp;
                    <a href="https://www.linkedin.com/in/ezra-rahmaditya-16671a328/" target="_blank" rel="noopener">
                      LinkedIn
                    </a>
                    &nbsp;·&nbsp;<br />
                    <a href="https://www.instagram.com/ejeraaiii" target="_blank" rel="noopener">
                      Instagram
                    </a>
                    &nbsp;·&nbsp;
                    <a href="https://www.youtube.com/@ezragenS" target="_blank" rel="noopener">
                      YouTube
                    </a>
                    &nbsp;·&nbsp;
                    <a href="https://www.tiktok.com/@ejerayy" target="_blank" rel="noopener">
                      Tiktok
                    </a>
                  </span>
                </div>
              </div>

              <div className="about-cta reveal reveal-up" style={{ ["--reveal-delay" as string]: "0.3s" }}>
                <a href="/gmi/Ezra-Rahmaditya.pdf" target="_blank" className="btn-ghost">
                  CV Ezra Rahmaditya
                </a>
              </div>

              <PinGallery onImageClick={(src, alt) => setLightbox({ src, alt })} />
            </div>

            <ImageLightbox
              src={lightbox?.src || ""}
              alt={lightbox?.alt || ""}
              open={lightbox !== null}
              onClose={() => setLightbox(null)}
            />

            <div className="about-right reveal reveal-right" style={{ ["--reveal-delay" as string]: "0.1s" }}>
              <div className="folder-grid">
                <EspFolderCard
                  folder="akademik"
                  tabLabel="Akademik"
                  ariaLabel="Buka folder Sertifikat Akademik"
                  title="Sertifikat"
                  tags={["Pemrograman"]}
                  onOpen={setActiveModal}
                />
                <EspFolderCard
                  folder="prestasi"
                  tabLabel="Non-Akademik"
                  ariaLabel="Buka folder Prestasi & Sertifikat"
                  title="Prestasi & Sertif"
                  tags={["Olahraga", "Volunteer"]}
                  onOpen={setActiveModal}
                />
              </div>

              <ContactForm />
            </div>
          </div>
        </section>
      </main>

      <EspGallery
        category="prestasi"
        fileLabel="File 02"
        title="Prestasi & Sertifikat"
        isOpen={activeModal === "prestasi"}
        onClose={() => setActiveModal(null)}
      />
      <EspGallery
        category="akademik"
        fileLabel="File 01"
        title="Sertifikat Akademik"
        isOpen={activeModal === "akademik"}
        onClose={() => setActiveModal(null)}
      />

      <section id="kontak" className="contact-footer-section">
        <FooterBar />
      </section>

      <BackToTop />
    </>
  );
}
