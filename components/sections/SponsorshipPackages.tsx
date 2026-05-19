"use client";

import { Check, Crown, Flame, Star, Zap } from "lucide-react";
import { motion } from "framer-motion";

import { Reveal } from "@/components/effects/Reveal";
import { SectionDivider } from "@/components/effects/SectionDivider";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { Package } from "@/lib/schemas";

type Props = { packages: Package[] };

const tierIcon = {
  bronze: Star,
  silver: Flame,
  gold: Zap,
  title: Crown,
};

function compact(n: number) {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(0)}K`;
  return n.toLocaleString("en-US");
}

export function SponsorshipPackages({ packages }: Props) {
  return (
    <section id="packages" className="relative bg-black">
      <SectionDivider label="SPONSORSHIP TIERS / PICK YOUR WEAPON" number="// 04" />
      <div className="max-w-7xl mx-auto px-6 py-16 md:py-24">
        <Reveal>
          <div className="mb-12 flex items-end justify-between gap-6 flex-wrap">
            <h2 className="font-display text-5xl md:text-7xl lg:text-8xl text-white leading-none">
              CHOOSE YOUR
              <br />
              <span className="blood-text">FIGHT PLAN.</span>
            </h2>
            <p className="font-mono text-xs text-white/60 uppercase tracking-[0.2em] max-w-sm">
              » Bronze for testing the waters. Title for owning the cage. Need custom? Talk to us.
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-[#dc143c]/30 border border-[#dc143c]/30">
          {packages.map((pkg, i) => {
            const Icon = tierIcon[pkg.tier];
            const isHighlight = pkg.highlighted;
            return (
              <Reveal key={pkg.tier} delay={i * 0.08}>
                <motion.div
                  whileHover={{ y: -8 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className={cn(
                    "group relative h-full p-6 md:p-8 flex flex-col",
                    isHighlight
                      ? "bg-gradient-to-b from-[#dc143c]/30 to-black"
                      : "bg-black hover:bg-[#dc143c]/5",
                  )}
                >
                  {isHighlight && (
                    <div className="absolute -top-px left-0 right-0 bg-[#dc143c] text-white font-mono text-[10px] tracking-[0.3em] uppercase py-1 text-center">
                      ★ MOST POPULAR ★
                    </div>
                  )}

                  <div className="flex items-center justify-between mb-6">
                    <Icon className={cn("w-8 h-8", isHighlight ? "text-[#dc143c]" : "text-white/60")} />
                    <div className="font-mono text-[10px] tracking-[0.3em] uppercase text-white/40">
                      TIER 0{i + 1}
                    </div>
                  </div>

                  <h3 className="font-display text-4xl md:text-5xl text-white mb-2 leading-none">
                    {pkg.name}
                  </h3>

                  <div className="flex items-baseline gap-2 mb-2">
                    <span className="font-display text-3xl md:text-4xl blood-text">
                      ${compact(pkg.priceUSD)}
                    </span>
                    <span className="font-mono text-[10px] text-white/40 uppercase">/ campaign</span>
                  </div>

                  <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-white/60 mb-6 pb-6 border-b border-white/10">
                    EST. {compact(pkg.estimatedImpressions)} IMPRESSIONS
                  </div>

                  <ul className="space-y-3 mb-8 flex-1">
                    {pkg.perks.map((perk) => (
                      <li key={perk} className="flex gap-3 text-sm">
                        <Check className={cn("w-4 h-4 mt-1 shrink-0", isHighlight ? "text-[#dc143c]" : "text-white/60")} />
                        <span className="text-white/80 leading-tight uppercase tracking-wide text-xs font-mono">
                          {perk}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    asChild
                    className={cn(
                      "h-12 w-full font-display tracking-wider text-lg rounded-none",
                      isHighlight
                        ? "bg-[#dc143c] hover:bg-[#ff1744] text-white border-2 border-[#dc143c] shadow-[0_0_24px_rgba(220,20,60,0.4)]"
                        : "bg-transparent hover:bg-white hover:text-black text-white border-2 border-white/40 hover:border-white",
                    )}
                  >
                    <a href={`#book?package=${pkg.tier}`}>{pkg.ctaLabel}</a>
                  </Button>

                  <div className="absolute inset-0 pointer-events-none border-2 border-transparent group-hover:border-[#dc143c]/40 transition-colors" />
                </motion.div>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={0.4}>
          <div className="mt-8 flex flex-col md:flex-row gap-4 items-center justify-between border border-white/10 bg-black/40 p-6">
            <p className="font-mono text-xs uppercase tracking-wider text-white/60">
              » NEED CUSTOM TERMS? <span className="text-white">PER-FIGHT, ANNUAL, PRODUCT LINE.</span> WE BUILD IT.
            </p>
            <Button
              asChild
              variant="outline"
              className="rounded-none border-2 border-[#dc143c] text-[#dc143c] hover:bg-[#dc143c] hover:text-white font-display tracking-wider"
            >
              <a href="#book">REQUEST A CUSTOM DEAL →</a>
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
