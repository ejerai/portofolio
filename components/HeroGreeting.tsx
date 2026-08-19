"use client";

import { useEffect, useRef } from "react";

const GREETINGS = [
  'Hi, I\'m <span class="highlight">Ezra</span>',
  '你好，我是 <span class="highlight">Ezra</span>',
  'こんにちは、<span class="highlight">Ezra</span>です',
  'Bonjour, je suis <span class="highlight">Ezra</span>',
  'Hola, soy <span class="highlight">Ezra</span>',
  'مرحبًا، أنا <span class="highlight">Ezra</span>',
  'Salam, saya <span class="highlight">Ezra</span>',
];
const FINAL_GREETING = 'Halo, aku <span class="highlight">Ezra</span>';

export function HeroGreeting() {
  const spanRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const span = spanRef.current;
    if (!span) return;

    const alreadyPlayed = sessionStorage.getItem("greetingPlayed");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const showText = (html: string): void => {
      span.innerHTML = html;
    };
    const showFinal = (): void => {
      showText(FINAL_GREETING);
      span.classList.add("show");
    };

    if (alreadyPlayed || reducedMotion) {
      showFinal();
      return;
    }

    let idx = 0;
    const timeouts: number[] = [];
    showText(GREETINGS[0]);
    requestAnimationFrame(() => span.classList.add("show"));

    const step = (): void => {
      idx++;
      span.classList.remove("show");
      timeouts.push(
        window.setTimeout(() => {
          if (idx < GREETINGS.length) {
            showText(GREETINGS[idx]);
            requestAnimationFrame(() => span.classList.add("show"));
            timeouts.push(window.setTimeout(step, 550));
          } else {
            showText(FINAL_GREETING);
            requestAnimationFrame(() => span.classList.add("show"));
            sessionStorage.setItem("greetingPlayed", "1");
          }
        }, 350),
      );
    };
    timeouts.push(window.setTimeout(step, 550));

    return () => timeouts.forEach((t) => clearTimeout(t));
  }, []);

  return (
    <h1 id="heroGreeting">
      <span className="greeting-fade" ref={spanRef}>
        Halo, aku <span className="highlight">Ezra</span>
      </span>
    </h1>
  );
}
