"use client";

import { useState } from "react";
import { MapPin } from "lucide-react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

import { Reveal } from "@/components/effects/Reveal";
import { SectionDivider } from "@/components/effects/SectionDivider";
import { cn } from "@/lib/utils";
import type { GearZone } from "@/lib/schemas";

type Props = { zones: GearZone[]; baseImageUrl?: string };

function compact(n: number) {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(0)}K`;
  return n.toLocaleString("en-US");
}

export function GearVisualizer({ zones, baseImageUrl }: Props) {
  const [active, setActive] = useState<GearZone | null>(zones[0] ?? null);
  const img = baseImageUrl || `https://picsum.photos/seed/fighterbody/800/1200`;

  return (
    <section id="gear" className="relative bg-gradient-to-b from-black via-[#1a0000]/30 to-black">
      <SectionDivider label="LOGO PLACEMENT / TARGET ZONES" number="// 05" />
      <div className="max-w-7xl mx-auto px-6 py-16 md:py-24">
        <Reveal>
          <div className="mb-12 flex items-end justify-between gap-6 flex-wrap">
            <h2 className="font-display text-5xl md:text-7xl lg:text-8xl text-white leading-none">
              MARK YOUR
              <br />
              <span className="text-stroke">TERRITORY.</span>
            </h2>
            <p className="font-mono text-xs text-white/60 uppercase tracking-[0.2em] max-w-sm">
              » Hover the body. Click a zone. Pick where your logo lives during the war.
            </p>
          </div>
        </Reveal>

        <div className="grid lg:grid-cols-2 gap-6 lg:gap-12 items-center">
          {/* Fighter visualizer */}
          <Reveal>
            <div className="relative aspect-[3/4] max-w-md mx-auto blood-border overflow-hidden bg-black">
              <Image src={img} alt="Fighter logo placement" fill sizes="(max-width: 1024px) 90vw, 500px" className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

              {/* Zones */}
              {zones.map((z) => (
                <button
                  key={z.name}
                  onMouseEnter={() => setActive(z)}
                  onClick={() => setActive(z)}
                  className={cn(
                    "absolute group border-2 transition-all",
                    active?.name === z.name
                      ? "border-[#dc143c] bg-[#dc143c]/30 shadow-[0_0_24px_rgba(220,20,60,0.7)]"
                      : "border-white/60 bg-white/10 hover:bg-[#dc143c]/20 hover:border-[#dc143c]",
                  )}
                  style={{
                    left: `${z.x}%`,
                    top: `${z.y}%`,
                    width: `${z.width}%`,
                    height: `${z.height}%`,
                  }}
                  aria-label={z.name}
                >
                  <MapPin className={cn(
                    "absolute -top-3 -right-3 w-5 h-5 transition-transform",
                    active?.name === z.name ? "text-[#dc143c] scale-125" : "text-white/80",
                  )} />
                  <span className="absolute -bottom-6 left-0 font-mono text-[8px] tracking-[0.2em] uppercase text-white/80 whitespace-nowrap bg-black/80 px-1.5 py-0.5">
                    {z.name}
                  </span>
                </button>
              ))}
            </div>
          </Reveal>

          {/* Info panel */}
          <Reveal delay={0.15}>
            <div className="bg-black/60 border border-[#dc143c]/40 p-6 md:p-10 min-h-[440px] flex flex-col">
              <div className="font-mono text-[10px] tracking-[0.3em] uppercase text-[#dc143c] mb-4">
                ZONE DETAILS // {String(zones.findIndex((z) => z.name === active?.name) + 1).padStart(2, "0")}
              </div>

              <AnimatePresence mode="wait">
                {active && (
                  <motion.div
                    key={active.name}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="flex-1 flex flex-col"
                  >
                    <h3 className="font-display text-5xl md:text-6xl text-white leading-none mb-6">
                      {active.name}
                    </h3>

                    <div className="grid grid-cols-2 gap-4 mb-8">
                      <div className="border border-white/10 bg-black p-4">
                        <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-white/40 mb-2">
                          IMPRESSIONS / FIGHT
                        </div>
                        <div className="font-display text-3xl text-white">
                          {compact(active.impressions)}
                        </div>
                      </div>
                      <div className="border border-[#dc143c]/40 bg-[#dc143c]/10 p-4">
                        <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-[#dc143c] mb-2">
                          FROM
                        </div>
                        <div className="font-display text-3xl blood-text">
                          ${compact(active.priceFromUSD)}
                        </div>
                      </div>
                    </div>

                    <p className="font-mono text-xs text-white/60 uppercase tracking-wider leading-relaxed mb-6">
                      » Your logo lives in {active.name.toLowerCase()} zone — visible during walkout,
                      fight broadcast, post-fight interviews, and across all social/PR coverage.
                    </p>

                    <div className="mt-auto flex gap-3">
                      <a
                        href="#book"
                        className="flex-1 inline-flex items-center justify-center px-6 py-3 bg-[#dc143c] hover:bg-[#ff1744] text-white font-display text-lg tracking-wider transition-colors"
                      >
                        CLAIM ZONE →
                      </a>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
