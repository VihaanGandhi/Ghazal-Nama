"use client";

import { useEffect, useRef, useState } from "react";
import { classNames } from "@/lib/utils";

/**
 * Scroll reveal. Degrades to plain visible markup when JavaScript or
 * IntersectionObserver is unavailable, and never animates for reduced motion.
 */
export function Reveal({
  children,
  className = "",
  delay = 0,
  as: Tag = "div",
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  as?: any;
}) {
  const ref = useRef<HTMLElement | null>(null);
  const [state, setState] = useState<"pending" | "shown">("pending");

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (typeof IntersectionObserver === "undefined") {
      setState("shown");
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            window.setTimeout(() => setState("shown"), delay);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <Tag
      ref={ref as any}
      data-reveal={state}
      className={classNames(className)}
    >
      {children}
    </Tag>
  );
}
