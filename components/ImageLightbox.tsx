"use client";

import { useEffect } from "react";

interface ImageLightboxProps {
  src: string;
  alt: string;
  open: boolean;
  onClose: () => void;
}

export function ImageLightbox({ src, alt, open, onClose }: ImageLightboxProps) {
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
