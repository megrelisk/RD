"use client";

import { useMemo, useState } from "react";
import { Calculator, Check } from "lucide-react";

import { Reveal } from "@/components/effects/Reveal";
import { SectionDivider } from "@/components/effects/SectionDivider";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Service = {
  id: string;
  name: string;
  description: string;
  price: number;
  impressions: number;
};

const SERVICES: Service[] = [
  { id: "ig-post", name: "INSTAGRAM POST", description: "Permanent post with branded content.", price: 18_000, impressions: 800_000 },
  { id: "ig-story", name: "INSTAGRAM STORY", description: "24h story with swipe-up link.", price: 6_000, impressions: 350_000 },
  { id: "yt-feature", name: "YOUTUBE VLOG FEATURE", description: "30-60s integration in a vlog.", price: 25_000, impressions: 600_000 },
  { id: "tiktok", name: "TIKTOK SHORT", description: "Custom branded TikTok by the fighter.", price: 12_000, impressions: 1_200_000 },
  { id: "walkout-shirt", name: "WALKOUT SHIRT LOGO", description: "Logo on the walkout shirt during fight.", price: 35_000, impressions: 4_200_000 },
  { id: "banner", name: "POST-FIGHT BANNER", description: "Banner held during post-fight interview.", price: 28_000, impressions: 3_800_000 },
  { id: "shorts-logo", name: "FIGHT SHORTS LOGO", description: "Logo on shorts during the fight.", price: 75_000, impressions: 9_500_000 },
  { id: "press-conf", name: "PRESS CONFERENCE BACKDROP", description: "Logo on the press conf backdrop.", price: 18_000, impressions: 2_200_000 },
];

function compact(n: number) {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(0)}K`;
  return n.toLocaleString("en-US");
}

export function PriceCalculator() {
  const [selected, setSelected] = useState<Set<string>>(new Set());

  const toggle = (id: string) =>
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  const total = useMemo(() => {
    const list = SERVICES.filter((s) => selected.has(s.id));
    return {
      price: list.reduce((sum, s) => sum + s.price, 0),
      impressions: list.reduce((sum, s) => sum + s.impressions, 0),
      cpm: list.length
        ? (list.reduce((sum, s) => sum + s.price, 0) /
            list.reduce((sum, s) => sum + s.impressions, 0)) *
          1000
        : 0,
    };
  }, [selected]);

  return (
    <section id="calculator" className="relative bg-black">
      <SectionDivider label="DEAL CALCULATOR / BUILD YOUR ATTACK" number="// 07" />
      <div className="max-w-7xl mx-auto px-6 py-16 md:py-24">
        <Reveal>
          <div className="mb-12 flex items-end justify-between gap-6 flex-wrap">
            <h2 className="font-display text-5xl md:text-7xl lg:text-8xl text-white leading-none">
              BUILD YOUR
              <br />
              <span className="blood-text">CAMPAIGN.</span>
            </h2>
            <p className="font-mono text-xs text-white/60 uppercase tracking-[0.2em] max-w-sm">
              » Mix and match. Pricing is real, not bait. Final deal is custom.
            </p>
          </div>
        </Reveal>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Service grid */}
          <div className="lg:col-span-2 grid sm:grid-cols-2 gap-3">
            {SERVICES.map((s) => {
              const on = selected.has(s.id);
              return (
                <button
                  type="button"
                  key={s.id}
                  onClick={() => toggle(s.id)}
                  className={cn(
                    "group relative text-left p-5 border-2 transition-all",
                    on
                      ? "border-[#dc143c] bg-[#dc143c]/15"
                      : "border-white/10 bg-black hover:border-[#dc143c]/60 hover:bg-[#dc143c]/5",
                  )}
                >
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <div className="font-display text-xl text-white leading-tight">{s.name}</div>
                    <span
                      className={cn(
                        "shrink-0 w-6 h-6 border-2 flex items-center justify-center transition-all",
                        on ? "border-[#dc143c] bg-[#dc143c]" : "border-white/40",
                      )}
                    >
                      {on && <Check className="w-4 h-4 text-white" />}
                    </span>
                  </div>
                  <p className="font-mono text-[10px] uppercase tracking-wider text-white/60 mb-4 min-h-[2.5em]">
                    {s.description}
                  </p>
                  <div className="flex items-center justify-between font-mono text-xs">
                    <span className="text-[#dc143c]">${compact(s.price)}</span>
                    <span className="text-white/40">{compact(s.impressions)} views</span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Totals */}
          <Reveal delay={0.15}>
            <div className="sticky top-6 bg-black border border-[#dc143c]/40 p-6 md:p-8">
              <div className="flex items-center gap-2 mb-6 font-mono text-[10px] tracking-[0.3em] uppercase text-[#dc143c]">
                <Calculator className="w-4 h-4" />
                YOUR DEAL
              </div>

              <div className="space-y-6 mb-8">
                <div>
                  <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-white/40 mb-1">
                    TOTAL INVESTMENT
                  </div>
                  <div className="font-display text-5xl md:text-6xl blood-text leading-none">
                    ${compact(total.price)}
                  </div>
                </div>

                <div>
                  <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-white/40 mb-1">
                    ESTIMATED IMPRESSIONS
                  </div>
                  <div className="font-display text-3xl md:text-4xl text-white">
                    {compact(total.impressions)}
                  </div>
                </div>

                <div className="border-t border-white/10 pt-4">
                  <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-white/40 mb-1">
                    EFFECTIVE CPM
                  </div>
                  <div className="font-mono text-2xl text-white">
                    ${total.cpm ? total.cpm.toFixed(2) : "—"}
                  </div>
                </div>
              </div>

              <Button
                disabled={selected.size === 0}
                asChild
                className="w-full h-12 rounded-none font-display text-lg tracking-wider bg-[#dc143c] hover:bg-[#ff1744] text-white border-2 border-[#dc143c] disabled:opacity-40"
              >
                <a href={`#book?services=${[...selected].join(",")}`}>
                  REQUEST THIS DEAL →
                </a>
              </Button>

              <p className="mt-4 font-mono text-[10px] uppercase tracking-wider text-white/40 leading-relaxed">
                » Pricing is indicative. Final quote based on fight card, exclusivity, and brand fit.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
