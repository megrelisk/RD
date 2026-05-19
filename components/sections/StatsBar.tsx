"use client";

import { useEffect, useState } from "react";
import * as Icons from "lucide-react";
import { LucideProps, Activity } from "lucide-react";

import { CountUp } from "@/components/effects/CountUp";
import { Reveal } from "@/components/effects/Reveal";
import { SectionDivider } from "@/components/effects/SectionDivider";
import type { Site, Stat } from "@/lib/schemas";

type Props = { stats: Stat[]; site: Site };

function CountdownPill({ targetIso }: { targetIso?: string }) {
  const [diff, setDiff] = useState({ d: 0, h: 0, m: 0, s: 0 });

  useEffect(() => {
    if (!targetIso) return;
    const target = new Date(targetIso).getTime();
    const tick = () => {
      const delta = Math.max(0, target - Date.now());
      setDiff({
        d: Math.floor(delta / 86400000),
        h: Math.floor((delta % 86400000) / 3600000),
        m: Math.floor((delta % 3600000) / 60000),
        s: Math.floor((delta % 60000) / 1000),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [targetIso]);

  if (!targetIso) return null;
  return (
    <div className="font-mono text-xs flex items-center gap-2">
      {[
        { v: diff.d, l: "D" },
        { v: diff.h, l: "H" },
        { v: diff.m, l: "M" },
        { v: diff.s, l: "S" },
      ].map((c) => (
        <div key={c.l} className="flex flex-col items-center bg-[#dc143c]/10 border border-[#dc143c]/30 px-2 py-1 min-w-[40px]">
          <span className="text-white text-xl font-display tabular-nums">{String(c.v).padStart(2, "0")}</span>
          <span className="text-[#dc143c] text-[8px] tracking-[0.2em]">{c.l}</span>
        </div>
      ))}
    </div>
  );
}

function getIcon(name: string): React.ComponentType<LucideProps> {
  const Icon = (Icons as unknown as Record<string, React.ComponentType<LucideProps>>)[name];
  return Icon || Activity;
}

export function StatsBar({ stats, site }: Props) {
  return (
    <section className="relative bg-black border-y border-[#dc143c]/30">
      <SectionDivider label={`THE NUMBERS / PROOF OF POWER`} number="// 01" />

      {/* Next fight banner */}
      {site.nextFightOpponent && (
        <div className="bg-gradient-to-r from-black via-[#3a0000]/60 to-black border-b border-[#dc143c]/30 py-3 px-6">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-3">
            <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.2em] text-white/80">
              <span className="inline-block w-2 h-2 bg-[#dc143c] rounded-full animate-pulse" />
              NEXT WAR / <span className="text-[#dc143c]">{site.fighterName}</span> vs <span className="text-white font-display text-lg tracking-wider">{site.nextFightOpponent}</span>
              {site.nextFightVenue && <span className="hidden md:inline text-white/40">@ {site.nextFightVenue}</span>}
            </div>
            <CountdownPill targetIso={site.nextFightDate} />
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-6 py-16 md:py-24">
        <Reveal>
          <div className="mb-12 md:mb-16 flex items-end justify-between gap-6 flex-wrap">
            <h2 className="font-display text-5xl md:text-7xl lg:text-8xl leading-none">
              <span className="text-white">YOUR BRAND.</span>
              <br />
              <span className="text-stroke">OUR <span className="text-[#dc143c] [-webkit-text-stroke:0] [-webkit-text-fill-color:#dc143c]">WEAPON.</span></span>
            </h2>
            <p className="max-w-md font-mono text-sm text-white/60 uppercase tracking-wider">
              » Reach that doesn&apos;t bounce. Engagement that converts. Audience that buys.
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 border border-[#dc143c]/30 divide-x divide-y md:divide-y-0 divide-[#dc143c]/20">
          {stats.map((stat, i) => {
            const Icon = getIcon(stat.icon);
            return (
              <Reveal key={i} delay={i * 0.05}>
                <div className="group relative p-5 md:p-6 hover:bg-[#dc143c]/10 transition-colors duration-300 h-full overflow-hidden">
                  <Icon className="w-5 h-5 text-[#dc143c] mb-4 group-hover:scale-125 transition-transform" />
                  <div className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-4xl xl:text-5xl 2xl:text-6xl text-white leading-none tabular-nums tracking-tight truncate">
                    <CountUp
                      to={stat.value}
                      prefix={stat.prefix}
                      suffix={stat.suffix}
                      duration={2.5}
                    />
                  </div>
                  <div className="mt-3 font-mono text-[10px] tracking-[0.2em] uppercase text-white/60 truncate">
                    {stat.label}
                  </div>
                  <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-[#dc143c] transition-all duration-500 group-hover:w-full" />
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
