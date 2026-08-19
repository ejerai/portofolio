"use client";

import { useEffect, useRef } from "react";

export function SectionTypewriter({ text }: { text: string }) {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cursorRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const title = titleRef.current;
    const cursor = cursorRef.current;
    if (!title || !cursor) return;

    title.textContent = "";
    title.appendChild(cursor);

    let hasStarted = false;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          if (!hasStarted) {
            hasStarted = true;
            let i = 0;
            const typeNextChar = (): void => {
              if (i < text.length) {
                cursor.insertAdjacentText("beforebegin", text.charAt(i));
                i++;
                setTimeout(typeNextChar, 70);
              } else {
                setTimeout(() => cursor.classList.add("done"), 600);
              }
            };
            typeNextChar();
          }
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.4 },
    );
    observer.observe(title);

    return () => observer.disconnect();
  }, [text]);

  return (
    <h2 className="section-title reveal reveal-up typewriter" ref={titleRef}>
      {text}
      <span className="typewriter-cursor" ref={cursorRef}></span>
    </h2>
  );
}
