"use client";

import { useEffect, useState } from "react";
import { Header } from "@/components/Header";
import { BackToTop } from "@/components/BackToTop";
import { EspFolderCard } from "@/components/EspFolderCard";
import { EspGallery } from "@/components/EspGallery";
import { PinGallery } from "@/components/PinGallery";
import { ImageLightbox } from "@/components/ImageLightbox";
import { ContactForm } from "@/components/ContactForm";
import { FooterBar } from "@/components/FooterBar";
import { useRevealOnScroll } from "@/lib/reveal";

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
