"use client";

import { motion } from "framer-motion";
import { Globe } from "lucide-react";

import { Reveal } from "@/components/effects/Reveal";
import { SectionDivider } from "@/components/effects/SectionDivider";
import type { AudienceDemographic, AudienceRegion } from "@/lib/schemas";

type Props = {
  regions: AudienceRegion[];
  demographics: AudienceDemographic[];
};

function flagEmoji(code: string) {
  if (code.length !== 2) return "🏴";
  return code
    .toUpperCase()
    .split("")
    .map((c) => String.fromCodePoint(127397 + c.charCodeAt(0)))
    .join("");
}

function compact(n: number) {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(0)}K`;
  return n.toLocaleString("en-US");
}

export function AudienceInsights({ regions }: Props) {
  return (
    <section id="audience" className="relative bg-black">
      <SectionDivider label="AUDIENCE INSIGHTS / WHO BUYS THIS" number="// 06" />
      <div className="max-w-7xl mx-auto px-6 py-16 md:py-24">
        <Reveal>
          <div className="mb-12 flex items-end justify-between gap-6 flex-wrap">
            <h2 className="font-display text-5xl md:text-7xl lg:text-8xl text-white leading-none">
              MEET YOUR
              <br />
              <span className="blood-text">NEW CUSTOMERS.</span>
            </h2>
            <p className="font-mono text-xs text-white/60 uppercase tracking-[0.2em] max-w-sm">
              » 14M+ fight-fan eyeballs / month. Verified buyers. Engaged audience.
            </p>
          </div>
        </Reveal>

        {/* Top regions — full width */}
        <div className="bg-black border border-[#dc143c]/30 p-6 md:p-10">
          <div className="flex items-center gap-2 mb-10 font-mono text-[10px] tracking-[0.3em] uppercase text-[#dc143c]">
            <Globe className="w-4 h-4" />
            TOP REGIONS / WHERE EYES WATCH
          </div>
          <div className="space-y-6">
            {regions.map((r, i) => (
              <Reveal key={r.countryCode} delay={i * 0.05}>
                <div className="space-y-2">
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <span className="text-3xl md:text-4xl leading-none">{flagEmoji(r.countryCode)}</span>
                      <span className="font-display text-2xl md:text-4xl lg:text-5xl text-white tracking-wide">
                        {r.country}
                      </span>
                    </div>
                    <div className="flex items-center gap-6 shrink-0">
                      <span className="hidden sm:block font-mono text-xs text-white/40 tracking-widest uppercase">
                        {compact(r.viewers)} viewers
                      </span>
                      <span className="font-display text-3xl md:text-4xl lg:text-5xl text-[#dc143c]">
                        {r.percentage}%
                      </span>
                    </div>
                  </div>
                  <div className="h-2 md:h-[3px] bg-white/5 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${r.percentage}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.4, delay: i * 0.04, ease: "easeOut" }}
                      className="h-full bg-gradient-to-r from-[#8B0000] to-[#dc143c]"
                    />
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
