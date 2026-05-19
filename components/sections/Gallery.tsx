"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import Image from "next/image";

import { Reveal } from "@/components/effects/Reveal";
import { SectionDivider } from "@/components/effects/SectionDivider";
import { cn } from "@/lib/utils";
import type { GalleryItem } from "@/lib/schemas";

type Props = { items: GalleryItem[] };

const spanCols: Record<number, string> = {
  1: "md:col-span-1",
  2: "md:col-span-2",
  3: "md:col-span-3",
  4: "md:col-span-4",
};
const spanRows: Record<number, string> = {
  1: "md:row-span-1",
  2: "md:row-span-2",
  3: "md:row-span-3",
};

export function Gallery({ items }: Props) {
  const [open, setOpen] = useState<number | null>(null);
  const close = () => setOpen(null);
  const next = () => setOpen((o) => (o === null ? null : (o + 1) % items.length));
  const prev = () => setOpen((o) => (o === null ? null : (o - 1 + items.length) % items.length));

  return (
    <section id="gallery" className="relative bg-black">
      <SectionDivider label="GALLERY / IN THE BLOOD" number="// 03" />
      <div className="max-w-7xl mx-auto px-6 py-16 md:py-24">
        <Reveal>
          <div className="mb-10 flex items-end justify-between gap-6 flex-wrap">
            <h2 className="font-display text-5xl md:text-7xl lg:text-8xl text-white leading-none">
              CAPTURED <span className="blood-text">IN BATTLE.</span>
            </h2>
            <p className="font-mono text-xs text-white/60 uppercase tracking-[0.2em] max-w-sm">
              » Premium photography ready for your campaigns. Drag, scroll, click — feel it.
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-2 md:grid-cols-4 grid-flow-dense gap-2 md:gap-3 auto-rows-[140px] md:auto-rows-[180px]">
          {items.map((item, i) => (
            <Reveal
              key={i}
              delay={i * 0.04}
              className={cn(
                "group relative overflow-hidden cursor-pointer blood-border bg-black",
                spanCols[Math.min(4, item.cols)],
                spanRows[Math.min(3, item.rows)],
              )}
            >
              <button
                type="button"
                onClick={() => setOpen(i)}
                aria-label={item.alt || `Open photo ${i + 1}`}
                className="absolute inset-0 w-full h-full"
              >
                <Image
                  src={item.imageUrl}
                  alt={item.alt || ""}
                  fill
                  sizes="(max-width: 768px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-110 group-hover:saturate-150"
                />
                {item.hoverVideoUrl && (
                  <video
                    src={item.hoverVideoUrl}
                    muted
                    loop
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity"
                    onMouseEnter={(e) => e.currentTarget.play()}
                    onMouseLeave={(e) => e.currentTarget.pause()}
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-50 group-hover:opacity-30 transition-opacity" />
                <div className="absolute top-2 left-2 font-mono text-[8px] tracking-[0.3em] uppercase text-white/60 bg-black/60 px-2 py-0.5">
                  {String(i + 1).padStart(3, "0")}
                </div>
                <div className="absolute bottom-2 left-2 right-2 font-mono text-[10px] tracking-[0.2em] uppercase text-white/80 opacity-0 group-hover:opacity-100 transition-opacity">
                  {item.alt}
                </div>
              </button>
            </Reveal>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {open !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4"
            onClick={close}
          >
            <button
              onClick={close}
              aria-label="Close"
              className="absolute top-6 right-6 text-white/80 hover:text-[#dc143c] transition-colors z-20"
            >
              <X className="w-8 h-8" />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); prev(); }}
              aria-label="Previous"
              className="absolute left-4 md:left-12 text-white/60 hover:text-[#dc143c] z-20"
            >
              <ChevronLeft className="w-12 h-12" />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); next(); }}
              aria-label="Next"
              className="absolute right-4 md:right-12 text-white/60 hover:text-[#dc143c] z-20"
            >
              <ChevronRight className="w-12 h-12" />
            </button>
            <motion.div
              key={open}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="relative w-full max-w-5xl aspect-[4/5] md:aspect-video"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={items[open].imageUrl}
                alt={items[open].alt || ""}
                fill
                sizes="80vw"
                className="object-contain"
              />
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent">
                <div className="font-mono text-xs text-[#dc143c] tracking-[0.3em] uppercase">
                  {String(open + 1).padStart(3, "0")} / {String(items.length).padStart(3, "0")}
                </div>
                <div className="font-display text-2xl text-white">{items[open].alt}</div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
