function espLightbox(e) {
  const t = document.getElementById("photo-" + e);
  if (!t) return;
  const n = t.querySelector("img");
  if (!n || !n.src || n.src === window.location.href)
    return void alert("Gambar tidak tersedia.");
  const o = document.createElement("div");
  ((o.className = "lightbox-overlay"), (o.id = "lightbox-" + e));
  const i = document.createElement("img");
  ((i.src = n.src),
    o.appendChild(i),
    document.body.appendChild(o),
    o.addEventListener("click", () => document.body.removeChild(o)));
}
function espOpenPdf(e, t) {
  const n = document.getElementById("esp-pdf-viewer");
  n && document.body.removeChild(n);
  const o = document.createElement("div");
  ((o.id = "esp-pdf-viewer"),
    (o.style.cssText =
      "\n    position:fixed;inset:0;z-index:9999;\n    background:rgba(15,10,5,0.88);\n    display:flex;flex-direction:column;align-items:center;justify-content:center;\n    padding:1rem;animation:espFadeIn .2s ease;\n  "));
  const i = document.createElement("div");
  ((i.style.cssText =
    "\n    width:100%;max-width:860px;display:flex;align-items:center;\n    justify-content:space-between;padding:.5rem .75rem;\n    background:#1a1008;border-radius:10px 10px 0 0;\n    border-bottom:1px solid rgba(212,160,23,.25);\n  "),
    (i.innerHTML = `\n    <span style="font-family:'Poppins',sans-serif;font-size:.8rem;\n      color:rgba(245,240,232,.65);letter-spacing:.04em;max-width:60%;\n      overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${t || "Sertifikat"}</span>\n    <div style="display:flex;gap:.5rem;align-items:center;">\n      <a id="esp-pdf-dl" href="${e}" download\n        style="display:inline-flex;align-items:center;gap:.35rem;\n          font-family:'Poppins',sans-serif;font-size:.75rem;font-weight:500;\n          color:#d4a017;text-decoration:none;\n          border:1px solid rgba(212,160,23,.4);border-radius:6px;\n          padding:.3rem .65rem;transition:all .2s;"\n        onmouseover="this.style.background='rgba(212,160,23,.12)'"\n        onmouseout="this.style.background='transparent'">\n        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24"\n          fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">\n          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>\n          <polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>\n        </svg>Download\n      </a>\n      <button id="esp-pdf-close"\n        style="background:none;border:1px solid rgba(245,240,232,.2);border-radius:6px;\n          cursor:pointer;color:rgba(245,240,232,.7);padding:.3rem .5rem;\n          display:flex;align-items:center;transition:all .2s;"\n        onmouseover="this.style.borderColor='rgba(245,240,232,.5)';this.style.color='#f5f0e8'"\n        onmouseout="this.style.borderColor='rgba(245,240,232,.2)';this.style.color='rgba(245,240,232,.7)'"\n        aria-label="Tutup PDF">\n        <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24"\n          fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">\n          <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>\n        </svg>\n      </button>\n    </div>\n  `));
  const s = document.createElement("iframe");
  ((s.src = e),
    (s.style.cssText =
      "\n    width:100%;max-width:860px;height:min(80vh,640px);\n    border:none;background:#fff;border-radius:0 0 10px 10px;display:block;\n  "),
    o.appendChild(i),
    o.appendChild(s),
    document.body.appendChild(o),
    (document.body.style.overflow = "hidden"));
  const r = () => {
    (document.body.removeChild(o), (document.body.style.overflow = ""));
  };
  (document.getElementById("esp-pdf-close").addEventListener("click", r),
    o.addEventListener("click", (e) => {
      e.target === o && r();
    }),
    document.addEventListener("keydown", function e(t) {
      "Escape" === t.key && (r(), document.removeEventListener("keydown", e));
    }));
}
if (!document.getElementById("esp-pdf-style")) {
  const e = document.createElement("style");
  ((e.id = "esp-pdf-style"),
    (e.textContent = "@keyframes espFadeIn{from{opacity:0}to{opacity:1}}"),
    document.head.appendChild(e));
}
const espData = {
    akademik: [],
    prestasi: [
      {
        title: "Taekwondo",
        meta: "Nasional & Internasional",
        img: "gmi/taekwondo.webp",
        desc: "Taekwondo kelas 61 KG<br>GOR Pasar Minggu - Jakarta Timur (JAKTIM).",
      },
      {
        title: "Volunteer Kartini Day 2026",
        meta: "UBL Volunteer",
        img: "gmi/ublvolunteer.webp",
        pdf: "gmi/ublvolunteer.pdf",
        desc: "Divisi Turnamen.",
      },
    ],
  },
  espIconThumb =
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><rect x="3" y="4" width="18" height="16" rx="2"/><line x1="7" y1="9" x2="17" y2="9"/><line x1="7" y1="13" x2="13" y2="13"/></svg>';
function espSelect(e, t) {
  const n = espData[e][t];
  if (!n) return;
  ((document.getElementById("title-" + e).textContent = n.title),
    (document.getElementById("desc-" + e).innerHTML = n.desc || ""),
    (document.getElementById("img-" + e).src = n.img || ""),
    (document.getElementById("img-" + e).alt = n.title));
  const o = document.getElementById("counter-" + e);
  (o && (o.textContent = t + 1 + " / " + espData[e].length),
    document
      .querySelectorAll("#list-" + e + " .esp-list-item")
      .forEach((e, n) => {
        e.classList.toggle("active", n === t);
      }));
  const i = document.getElementById("photo-" + e);
  if (i) {
    const e = i.querySelector(".esp-pdf-btn");
    if ((e && e.remove(), n.pdf)) {
      const e = document.createElement("div");
      ((e.className = "esp-pdf-btn"),
        (e.style.cssText =
          "\n        position:absolute;top:.6rem;right:.6rem;\n        display:flex;gap:.35rem;z-index:5;\n      "),
        (e.innerHTML = `\n        <button class="esp-pdf-view-btn"\n          style="display:inline-flex;align-items:center;gap:.3rem;\n            font-family:'Poppins',sans-serif;font-size:.7rem;font-weight:500;\n            color:#d4a017;background:rgba(15,10,5,.82);\n            border:1px solid rgba(212,160,23,.35);border-radius:6px;\n            padding:.28rem .55rem;cursor:pointer;backdrop-filter:blur(6px);\n            transition:all .2s;white-space:nowrap;"\n          onmouseover="this.style.background='rgba(212,160,23,.18)'"\n          onmouseout="this.style.background='rgba(15,10,5,.82)'"\n          title="Lihat PDF">\n          <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 24 24"\n            fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">\n            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>\n            <polyline points="14 2 14 8 20 8"/>\n          </svg>Lihat PDF\n        </button>\n        <a class="esp-pdf-dl-btn" href="${n.pdf}" download\n          style="display:inline-flex;align-items:center;gap:.3rem;\n            font-family:'Poppins',sans-serif;font-size:.7rem;font-weight:500;\n            color:rgba(245,240,232,.8);background:rgba(15,10,5,.82);\n            border:1px solid rgba(245,240,232,.2);border-radius:6px;\n            padding:.28rem .55rem;text-decoration:none;backdrop-filter:blur(6px);\n            transition:all .2s;white-space:nowrap;"\n          onmouseover="this.style.borderColor='rgba(245,240,232,.5)'"\n          onmouseout="this.style.borderColor='rgba(245,240,232,.2)'"\n          title="Download PDF">\n          <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 24 24"\n            fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">\n            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>\n            <polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>\n          </svg>Download\n        </a>\n      `),
        e.querySelector(".esp-pdf-view-btn").addEventListener("click", () => {
          espOpenPdf(n.pdf, n.title);
        }),
        i.appendChild(e));
    }
  }
}
function espRenderList(e) {
  const t = document.getElementById("list-" + e),
    n = t ? t.parentElement.querySelector(".esp-preview") : null;
  if (!t) return;
  const o = espData[e];
  if (!o.length) {
    ((t.innerHTML =
      '<p style="color:white;padding:1.5rem;opacity:0.5;font-size:0.85rem;">Belum ada sertifikat yang ditambahkan.</p>'),
      n && (n.style.display = "none"));
    const o = document.getElementById("counter-" + e);
    return void (o && (o.textContent = "0 / 0"));
  }
  (n && (n.style.display = ""),
    (t.innerHTML = o
      .map(
        (e, t) =>
          '<div class="esp-list-item' +
          (0 === t ? " active" : "") +
          '" role="button" tabindex="0" data-index="' +
          t +
          '"><div class="esp-list-thumb">' +
          espIconThumb +
          '</div><div class="esp-list-info"><strong>' +
          e.title +
          "</strong><span>" +
          (e.meta || "") +
          "</span></div></div>",
      )
      .join("")),
    t.querySelectorAll(".esp-list-item").forEach((t) => {
      const n = Number(t.dataset.index);
      (t.addEventListener("click", () => espSelect(e, n)),
        t.addEventListener("keydown", (t) => {
          ("Enter" !== t.key && " " !== t.key) ||
            (t.preventDefault(), espSelect(e, n));
        }));
    }),
    espSelect(e, 0));
}
(document.addEventListener("DOMContentLoaded", () => {
  const e = document.querySelectorAll(".js-theme-toggle"),
    t = document.documentElement,
    n = localStorage.getItem("theme"),
    o = window.matchMedia("(prefers-color-scheme: dark)").matches,
    i = n || (o ? "dark" : "light");
  t.setAttribute("data-theme", i);
  const s = window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    r = { dark: "#141010", light: "#f5f0e8" };
  function a(n) {
    (t.setAttribute("data-theme", n),
      localStorage.setItem("theme", n),
      e.forEach((e) => {
        e.setAttribute("aria-checked", "dark" === n ? "true" : "false");
      }));
  }
  function d() {
    const e = "dark" === t.getAttribute("data-theme") ? "light" : "dark";
    s
      ? a(e)
      : "function" == typeof document.startViewTransition
        ? document.startViewTransition(() => a(e))
        : (function (e) {
            const t = document.createElement("div");
            ((t.className = "theme-curtain"),
              (t.style.background = r[e] || r.dark),
              document.body.appendChild(t),
              requestAnimationFrame(() => {
                (t.classList.add("is-down"),
                  setTimeout(() => {
                    (a(e),
                      t.classList.add("is-out"),
                      setTimeout(() => t.remove(), 480));
                  }, 380));
              }));
          })(e);
  }
  (e.forEach((e) => {
    (e.setAttribute("aria-checked", "dark" === i ? "true" : "false"),
      e.addEventListener("click", d));
  }),
    espRenderList("akademik"),
    espRenderList("prestasi"));
  const l = document.getElementById("mainHeader"),
    c = document.getElementById("backToTopBtn"),
    m = document.getElementById("menuToggle"),
    u = document.getElementById("navLinksMobile");
  (l &&
    window.addEventListener("scroll", () =>
      l.classList.toggle("scrolled", window.scrollY > 50),
    ),
    c &&
      (window.addEventListener("scroll", () =>
        c.classList.toggle("show", window.scrollY > 400),
      ),
      c.addEventListener("click", () =>
        window.scrollTo({ top: 0, behavior: "smooth" }),
      )),
    m &&
      u &&
      (m.addEventListener("click", (e) => {
        e.stopPropagation();
        const t = m.classList.toggle("open");
        u.classList.toggle("open", t);
      }),
      u.querySelectorAll("a").forEach((e) =>
        e.addEventListener("click", () => {
          (m.classList.remove("open"), u.classList.remove("open"));
        }),
      ),
      document.addEventListener("click", (e) => {
        l.contains(e.target) ||
          u.contains(e.target) ||
          (m.classList.remove("open"), u.classList.remove("open"));
      })));
  let p = null;
  const g = (e) => {
      const t = document.getElementById("modal-" + e);
      t &&
        (p && p !== t && y(),
        (p = t),
        t.classList.add("open"),
        (document.body.style.overflow = "hidden"));
    },
    y = () => {
      p &&
        (p.classList.remove("open"),
        (document.body.style.overflow = ""),
        (p = null));
    };
  (document.querySelectorAll(".folder-card[data-folder]").forEach((e) => {
    (e.addEventListener("click", () => g(e.dataset.folder)),
      e.addEventListener("keydown", (t) => {
        ("Enter" !== t.key && " " !== t.key) ||
          (t.preventDefault(), g(e.dataset.folder));
      }));
  }),
    document
      .querySelectorAll(".modal-backdrop,.modal-close")
      .forEach((e) => e.addEventListener("click", y)),
    document.addEventListener("keydown", (e) => {
      "Escape" === e.key && y();
    }));
  const h = document.getElementById("kontakForm");
  if (h) {
    const I = document.getElementById("kontakSubmit"),
      B = document.getElementById("kontakStatus"),
      C = I.querySelector("span"),
      A = C.textContent;
    h.addEventListener("submit", async (e) => {
      e.preventDefault();
      const t = document.getElementById("kontakName"),
        n = document.getElementById("kontakEmail"),
        o = document.getElementById("kontakMsg");
      if (!t || !n || !o) return;
      const i = t.value.trim(),
        s = n.value.trim(),
        r = o.value.trim();
      if (
        ((B.textContent = ""), (B.className = "kontak-status"), !i || !s || !r)
      )
        return (
          (B.textContent = "Mohon isi semua kolom sebelum mengirim pesan."),
          void B.classList.add("is-error")
        );
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s))
        return (
          (B.textContent = "Format email tidak valid."),
          void B.classList.add("is-error")
        );
      ((I.disabled = !0), (C.textContent = "Mengirim..."));
      try {
        const e = await fetch("https://api.web3forms.com/submit", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
            body: JSON.stringify({
              access_key: "2b9c970c-dce7-4673-a4aa-0e42232ae0cf",
              subject: "Pesan baru dari Portfolio — " + i,
              from_name: i,
              name: i,
              email: s,
              message: r,
            }),
          }),
          t = await e.json();
        if (!t.success) throw new Error(t.message || "Gagal mengirim");
        ((B.textContent =
          "Pesan terkirim! Terima kasih, akan aku balas secepatnya."),
          B.classList.add("is-success"),
          h.reset());
      } catch (e) {
        ((B.textContent =
          "Gagal mengirim otomatis. Silakan email langsung ke ezrarahmadityaa@gmail.com."),
          B.classList.add("is-error"));
      } finally {
        ((I.disabled = !1), (C.textContent = A));
      }
    });
  }
  const f = document.getElementById("pinTrack");
  if (f) {
    const M = f.querySelectorAll(".pin-slide"),
      S = document.getElementById("pinCaption"),
      T = document.getElementById("pinRailFill"),
      D = document.getElementById("pinRailMachine"),
      P = M.length;
    let q = null,
      F = 0;
    const H = document.getElementById("pinRail");
    function v() {
      const e = f.scrollHeight - f.clientHeight,
        t = e > 0 ? f.scrollTop / e : 0,
        n = Math.max(100 / P, 100 * t),
        o = Math.min(94, Math.max(6, 100 - n));
      ((T.style.height = n + "%"),
        (D.style.top = o + "%"),
        (F = Math.min(P - 1, Math.round(t * (P - 1)))));
      const i = M[F]?.querySelector("img"),
        s = i?.getAttribute("alt") || "Momen " + (F + 1);
      ((S.textContent = s),
        H && H.setAttribute("aria-valuenow", String(F + 1)));
    }
    function b(e) {
      const t = M[e];
      t && f.scrollTo({ top: t.offsetTop, behavior: "smooth" });
    }
    function k() {
      q && (clearInterval(q), (q = null));
    }
    if (
      (f.addEventListener("scroll", v, { passive: !0 }),
      ["wheel", "touchstart", "pointerdown"].forEach((e) => {
        f.addEventListener(e, k, { passive: !0 });
      }),
      H)
    ) {
      let z = !1;
      function w(e) {
        const t = H.getBoundingClientRect(),
          n = e - t.top,
          o = Math.min(1, Math.max(0, 1 - n / t.height));
        b(Math.min(P - 1, Math.max(0, Math.round(o * (P - 1)))));
      }
      function x(e) {
        if (z) {
          ((z = !1), H.classList.remove("is-seeking"));
          try {
            H.releasePointerCapture(e.pointerId);
          } catch (e) {}
        }
      }
      (H.addEventListener("pointerdown", (e) => {
        ((z = !0),
          k(),
          H.setPointerCapture(e.pointerId),
          H.classList.add("is-seeking"),
          w(e.clientY));
      }),
        H.addEventListener("pointermove", (e) => {
          z && w(e.clientY);
        }),
        H.addEventListener("pointerup", x),
        H.addEventListener("pointercancel", x),
        H.setAttribute("role", "slider"),
        H.setAttribute("tabindex", "0"),
        H.setAttribute("aria-label", "Seret atau klik untuk pindah foto"),
        H.setAttribute("aria-valuemin", "1"),
        H.setAttribute("aria-valuemax", String(P)),
        H.addEventListener("keydown", (e) => {
          "ArrowUp" === e.key || "ArrowLeft" === e.key
            ? (e.preventDefault(), k(), b(Math.max(0, F - 1)))
            : ("ArrowDown" !== e.key && "ArrowRight" !== e.key) ||
              (e.preventDefault(), k(), b(Math.min(P - 1, F + 1)));
        }));
    }
    (v(),
      k(),
      (q = setInterval(() => {
        b((F + 1) % P);
      }, 2500)));
  }
  const E = document.getElementById("lightbox");
  if (E) {
    const R = document.getElementById("lightboxImg"),
      j = document.getElementById("lightboxCaption"),
      N = document.getElementById("lightboxBackdrop"),
      O = document.getElementById("lightboxClose");
    function L() {
      (E.classList.remove("open"),
        (document.body.style.overflow = ""),
        (R.src = ""));
    }
    (document.querySelectorAll(".pin-slide img").forEach((e) => {
      e.addEventListener("click", () =>
        (function (e) {
          ((R.src = e.currentSrc || e.src),
            (R.alt = e.getAttribute("alt") || ""),
            (j.textContent = e.getAttribute("alt") || ""),
            E.classList.add("open"),
            (document.body.style.overflow = "hidden"));
        })(e),
      );
    }),
      N.addEventListener("click", L),
      O.addEventListener("click", L),
      document.addEventListener("keydown", (e) => {
        "Escape" === e.key && E.classList.contains("open") && L();
      }));
  }
}),
  (function () {
    function e() {
      const e = document.querySelectorAll(".reveal");
      if (!e.length) return;
      const t = new IntersectionObserver(
        (e) => {
          e.forEach((e) => {
            e.isIntersecting &&
              (e.target.classList.add("is-visible"), t.unobserve(e.target));
          });
        },
        { threshold: 0.12 },
      );
      e.forEach((e) => t.observe(e));
    }
    "loading" === document.readyState
      ? document.addEventListener("DOMContentLoaded", e)
      : requestAnimationFrame(() => setTimeout(e, 60));
  })());