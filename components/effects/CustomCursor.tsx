"use client";

import { useEffect, useState } from "react";

export function CustomCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [pressed, setPressed] = useState(false);
  const [active, setActive] = useState(false);

  useEffect(() => {
    // Disable on touch devices
    if (typeof window !== "undefined" && window.matchMedia("(hover: none)").matches) return;
    setActive(true);

    let raf = 0;
    let next = { x: -100, y: -100 };
    const onMove = (e: MouseEvent) => {
      next = { x: e.clientX, y: e.clientY };
      if (!raf) {
        raf = requestAnimationFrame(() => {
          setPos(next);
          raf = 0;
        });
      }
    };
    const onDown = () => setPressed(true);
    const onUp = () => setPressed(false);

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  if (!active) return null;

  return (
    <>
      <div
        className="pointer-events-none fixed left-0 top-0 z-[9999] hidden md:block mix-blend-difference transition-transform duration-75"
        style={{
          transform: `translate3d(${pos.x - 12}px, ${pos.y - 12}px, 0) scale(${pressed ? 0.7 : 1})`,
        }}
      >
        <div className="h-6 w-6 rounded-full border-2 border-[#dc143c] bg-transparent" />
      </div>
      <div
        className="pointer-events-none fixed left-0 top-0 z-[9999] hidden md:block"
        style={{
          transform: `translate3d(${pos.x - 2}px, ${pos.y - 2}px, 0)`,
        }}
      >
        <div className="h-1 w-1 bg-[#dc143c] rounded-full" />
      </div>
    </>
  );
}
