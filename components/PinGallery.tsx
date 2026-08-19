"use client";

import { useEffect, useRef, useState } from "react";

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

export function PinGallery({ onImageClick }: PinGalleryProps) {
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
        /* already released — safe to ignore */
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
