"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export function KOEasterEgg() {
  const [show, setShow] = useState(false);
  const [keys, setKeys] = useState<string[]>([]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      )
        return;
      const k = e.key.toLowerCase();
      if (k !== "k" && k !== "o") return;
      setKeys((prev) => {
        const next = [...prev, k].slice(-2);
        if (next[0] === "k" && next[1] === "o") {
          setShow(true);
          setTimeout(() => setShow(false), 1400);
          return [];
        }
        return next;
      });
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[9998] pointer-events-none flex items-center justify-center"
        >
          <motion.div
            initial={{ scale: 0.4, rotate: -15 }}
            animate={{ scale: [0.4, 1.3, 1], rotate: [-15, 8, 0] }}
            transition={{ duration: 0.5, ease: "backOut" }}
            className="text-[26vw] font-display blood-text leading-none"
            style={{ textShadow: "0 0 80px #DC143C, 0 0 200px #8B0000" }}
          >
            K.O.
          </motion.div>
          <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: 0 }}
            transition={{ duration: 1.2 }}
            className="absolute inset-0 bg-[#dc143c]/30"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
