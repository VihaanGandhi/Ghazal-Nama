"use client";

import { useEffect, useRef, useState } from "react";

const GLYPHS = "ابتثجحخدذرزسشصضطظعغفقكلمنهوى٭•";

/**
 * Decode-on-reveal headline: letters resolve out of nastaliq-shaped noise.
 * Falls back to the finished text if timers are unavailable.
 */
export function Scramble({
  text,
  className = "",
  speed = 34,
}: {
  text: string;
  className?: string;
  speed?: number;
}) {
  const [output, setOutput] = useState(text);
  const ref = useRef<HTMLSpanElement | null>(null);
  const done = useRef(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;

    setOutput(text.replace(/[^\s]/g, "•"));

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting || done.current) return;
        done.current = true;
        observer.disconnect();
        let frame = 0;
        const chars = text.split("");
        const timer = window.setInterval(() => {
          frame += 1;
          const revealed = Math.floor(frame / 2);
          const next = chars
            .map((char, i) => {
              if (char === " ") return " ";
              if (i < revealed) return char;
              return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
            })
            .join("");
          setOutput(next);
          if (revealed >= chars.length) {
            window.clearInterval(timer);
            setOutput(text);
          }
        }, speed);
      });
    }, { threshold: 0.3 });

    observer.observe(node);
    return () => observer.disconnect();
  }, [text, speed]);

  return (
    <span ref={ref} className={className}>
      {output}
    </span>
  );
}
