document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".modal-dossier-stamp").forEach((el, i) => {
    el.textContent = String(i + 1).padStart(2, "0");
  });
  const e = document.querySelectorAll(".js-theme-toggle"),
    t = document.documentElement,
    o = localStorage.getItem("theme"),
    n = window.matchMedia("(prefers-color-scheme: dark)").matches,
    s = o || (n ? "dark" : "light");
  t.setAttribute("data-theme", s);
  const c = window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    r = { dark: "#141010", light: "#f5f0e8" };
  function d(o) {
    (t.setAttribute("data-theme", o),
      localStorage.setItem("theme", o),
      e.forEach((e) => {
        e.setAttribute("aria-checked", "dark" === o ? "true" : "false");
      }),
      (function () {
        let m = document.querySelector('meta[name="theme-color"]:not([media])');
        if (!m) {
          m = document.createElement("meta");
          m.setAttribute("name", "theme-color");
          document.head.appendChild(m);
        }
        m.setAttribute("content", "dark" === o ? "#1e1510" : "#f5f0e8");
      })());
  }
  function a() {
    const e = "dark" === t.getAttribute("data-theme") ? "light" : "dark";
    c
      ? d(e)
      : "function" == typeof document.startViewTransition
        ? document.startViewTransition(() => d(e))
        : (function (e) {
            const t = document.createElement("div");
            ((t.className = "theme-curtain"),
              (t.style.background = r[e] || r.dark),
              document.body.appendChild(t),
              requestAnimationFrame(() => {
                (t.classList.add("is-down"),
                  setTimeout(() => {
                    (d(e),
                      t.classList.add("is-out"),
                      setTimeout(() => t.remove(), 480));
                  }, 380));
              }));
          })(e);
  }
  e.forEach((e) => {
    (e.setAttribute("aria-checked", "dark" === s ? "true" : "false"),
      e.addEventListener("click", a));
  });
  const l = document.getElementById("mainHeader"),
    i = document.getElementById("backToTopBtn"),
    u = document.getElementById("menuToggle"),
    m = l.querySelector(".nav-container"),
    h = document.getElementById("navLinksMobile"),
    f = h ? h.querySelectorAll("a, button") : [];
  function g() {
    if (!m || !h || window.innerWidth > 768) return;
    const e = m.getBoundingClientRect();
    ((h.style.top = e.bottom + 8 + "px"),
      (h.style.right = "20px"),
      (h.style.left = "auto"));
  }
  (g(),
    window.addEventListener("resize", g),
    window.addEventListener("scroll", () => {
      const e = window.scrollY;
      (e > 50
        ? (l.classList.add("scrolled"),
          document.body.classList.add("header-scrolled"))
        : (l.classList.remove("scrolled"),
          document.body.classList.remove("header-scrolled")),
        i.classList.toggle("show", e > 400),
        g());
    }),
    i.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }),
    u &&
      h &&
      (u.addEventListener("click", (e) => {
        e.stopPropagation();
        const t = u.classList.toggle("open");
        (h.classList.toggle("open", t), g());
      }),
      f.forEach((e) => {
        e.addEventListener("click", () => {
          (u.classList.remove("open"), h.classList.remove("open"));
        });
      }),
      document.addEventListener("click", (e) => {
        l.contains(e.target) ||
          h.contains(e.target) ||
          (u.classList.remove("open"), h.classList.remove("open"));
      })));
  let v = null;
  function y(e) {
    const t = document.getElementById("modal-" + e);
    t &&
      (v && v !== t && p(),
      (v = t),
      t.classList.add("open"),
      (document.body.style.overflow = "hidden"),
      t.querySelector(".modal-dossier").focus?.());
  }
  function p() {
    v &&
      (v.classList.remove("open"),
      (document.body.style.overflow = ""),
      (v = null));
  }
  (document.querySelectorAll(".folder-card").forEach((e) => {
    (e.addEventListener("click", () => {
      const t = e.dataset.project;
      t && y(t);
    }),
      e.addEventListener("keydown", (t) => {
        if ("Enter" === t.key || " " === t.key) {
          t.preventDefault();
          const o = e.dataset.project;
          o && y(o);
        }
      }));
  }),
    document.querySelectorAll(".modal-backdrop").forEach((e) => {
      e.addEventListener("click", p);
    }),
    document.querySelectorAll(".modal-close").forEach((e) => {
      e.addEventListener("click", p);
    }),
    document.addEventListener("keydown", (e) => {
      "Escape" === e.key && p();
    }));
  const E = document.querySelectorAll(".reveal");
  if (E.length) {
    const e = new IntersectionObserver(
      (t) => {
        t.forEach((t) => {
          t.isIntersecting &&
            (t.target.classList.add("is-visible"), e.unobserve(t.target));
        });
      },
      { threshold: 0.12 },
    );
    E.forEach((t) => e.observe(t));
  }
  const L = document.querySelector(".projects-container > .section-title");
  if (L) {
    const e = L.textContent.trim();
    ((L.textContent = ""), L.classList.add("typewriter"));
    const t = document.createElement("span");
    ((t.className = "typewriter-cursor"), L.appendChild(t));
    let o = !1;
    const n = new IntersectionObserver(
      (s) => {
        s.forEach((s) => {
          s.isIntersecting &&
            (!(function () {
              if (o) return;
              o = !0;
              let n = 0;
              !(function o() {
                n < e.length
                  ? (t.insertAdjacentText("beforebegin", e.charAt(n)),
                    n++,
                    setTimeout(o, 70))
                  : setTimeout(() => t.classList.add("done"), 600);
              })();
            })(),
            n.unobserve(s.target));
        });
      },
      { threshold: 0.4 },
    );
    n.observe(L);
  }
  document.querySelectorAll(".project-grid .folder-card").forEach((e, t) => {
    e.style.setProperty("--reveal-delay", 0.12 * t + "s");
  });

  /* ===== Animasi salam multibahasa (ala "Hello" screen iPhone) ===== */
  const greetingEl = document.getElementById("heroGreeting");
  if (greetingEl) {
    const greetings = [
      'Hi, I\'m <span class="highlight">Ezra</span>',
      '你好，我是 <span class="highlight">Ezra</span>',
      'こんにちは、<span class="highlight">Ezra</span>です',
      'Bonjour, je suis <span class="highlight">Ezra</span>',
      'Hola, soy <span class="highlight">Ezra</span>',
      'مرحبًا، أنا <span class="highlight">Ezra</span>',
      'Salam, saya <span class="highlight">Ezra</span>',
    ];
    const finalGreeting = 'Halo, aku <span class="highlight">Ezra</span>';
    const span = greetingEl.querySelector(".greeting-fade");
    const alreadyPlayed = sessionStorage.getItem("greetingPlayed");

    const showText = (html) => {
      span.innerHTML = html;
    };
    const showFinal = () => {
      showText(finalGreeting);
      span.classList.add("show");
    };

    if (span && !alreadyPlayed && !c) {
      let idx = 0;
      showText(greetings[0]);
      requestAnimationFrame(() => span.classList.add("show"));

      const step = () => {
        idx++;
        span.classList.remove("show");
        setTimeout(() => {
          if (idx < greetings.length) {
            showText(greetings[idx]);
            requestAnimationFrame(() => span.classList.add("show"));
            setTimeout(step, 550);
          } else {
            showText(finalGreeting);
            requestAnimationFrame(() => span.classList.add("show"));
            sessionStorage.setItem("greetingPlayed", "1");
          }
        }, 350);
      };
      setTimeout(step, 550);
    } else if (span) {
      showFinal();
    }
  }
});