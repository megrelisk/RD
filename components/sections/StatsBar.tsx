"use client";

import * as Icons from "lucide-react";
import { LucideProps, Activity } from "lucide-react";
import { motion } from "framer-motion";

import { CountUp } from "@/components/effects/CountUp";
import { Reveal } from "@/components/effects/Reveal";
import { SectionDivider } from "@/components/effects/SectionDivider";
import type { Site, Stat } from "@/lib/schemas";

type Props = { stats: Stat[]; site: Site };

function DigitBox({ digit, accent, delay }: { digit: string; accent: boolean; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24, rotateX: -60 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ delay, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className="relative w-12 h-16 md:w-16 md:h-24"
      style={{ transformStyle: "preserve-3d" }}
    >
      <div
        className="absolute inset-0 flex items-center justify-center font-display tabular-nums leading-none text-4xl md:text-6xl overflow-hidden"
        style={{
          background: accent
            ? "linear-gradient(180deg, #2a0000 0%, #0a0000 50%, #1a0000 50%, #000000 100%)"
            : "linear-gradient(180deg, #1f1f1f 0%, #0a0a0a 50%, #141414 50%, #000000 100%)",
          color: accent ? "#ff1744" : "#ffffff",
          boxShadow: accent
            ? "0 0 0 1px rgba(220,20,60,0.5), 0 12px 30px rgba(220,20,60,0.25), inset 0 0 22px rgba(220,20,60,0.18)"
            : "0 0 0 1px rgba(255,255,255,0.08), 0 12px 30px rgba(0,0,0,0.6), inset 0 0 22px rgba(255,255,255,0.04)",
          textShadow: accent
            ? "0 0 14px rgba(255,23,68,0.9), 0 0 36px rgba(220,20,60,0.5)"
            : "0 0 10px rgba(255,255,255,0.18)",
        }}
      >
        {digit}
        {/* horizontal split line — flip-clock seam */}
        <div className="absolute top-1/2 left-0 right-0 h-px bg-black/80 z-10" />
        {/* top shimmer */}
        <div
          className="absolute top-0 left-0 right-0 h-px"
          style={{
            background: accent
              ? "linear-gradient(90deg, transparent, rgba(255,23,68,0.9), transparent)"
              : "linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)",
          }}
        />
      </div>
    </motion.div>
  );
}

function RecordStat({ label, value, accent, baseDelay }: { label: string; value: number; accent: boolean; baseDelay: number }) {
  const digits = String(value).padStart(2, "0").split("");
  return (
    <div className="flex flex-col items-center gap-3 md:gap-4">
      <div className="flex gap-1.5 md:gap-2" style={{ perspective: "800px" }}>
        {digits.map((d, i) => (
          <DigitBox key={i} digit={d} accent={accent} delay={baseDelay + i * 0.08} />
        ))}
      </div>
      <div
        className={`font-mono text-[10px] md:text-xs tracking-[0.35em] uppercase ${
          accent ? "text-[#dc143c]" : "text-white/55"
        }`}
      >
        {label}
      </div>
    </div>
  );
}

function getIcon(name: string): React.ComponentType<LucideProps> {
  const Icon = (Icons as unknown as Record<string, React.ComponentType<LucideProps>>)[name];
  return Icon || Activity;
}

export function StatsBar({ stats, site }: Props) {
  const record = [
    { label: "WINS", value: site.record.wins, accent: false },
    { label: "LOSSES", value: site.record.losses, accent: false },
    { label: "DRAWS", value: site.record.draws, accent: false },
    { label: "KO", value: site.record.knockouts, accent: true },
    { label: "SUB", value: site.record.submissions, accent: true },
  ];

  return (
    <section className="relative bg-black border-y border-[#dc143c]/30">
      <SectionDivider label={`THE NUMBERS / PROOF OF POWER`} number="// 01" />

      {/* Record — scoreboard, each digit in its own box */}
      <div className="relative border-b border-[#dc143c]/30 py-10 md:py-14 px-6 bg-gradient-to-b from-[#0a0000] via-black to-black overflow-hidden">
        {/* Background glow */}
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,_rgba(220,20,60,0.18),_transparent_60%)]" />

        <div className="relative max-w-7xl mx-auto">
          <Reveal>
            <div className="flex items-center gap-3 mb-8 md:mb-10">
              <span className="h-px w-10 bg-[#dc143c]" />
              <span className="font-mono text-[10px] md:text-xs tracking-[0.4em] uppercase text-[#dc143c]">
                FIGHT RECORD / OFFICIAL
              </span>
              <span className="h-px flex-1 max-w-[280px] bg-gradient-to-r from-[#dc143c] to-transparent" />
            </div>
          </Reveal>

          <div className="flex flex-wrap items-start justify-center md:justify-between gap-6 md:gap-4 lg:gap-6">
            {record.map((r, i) => (
              <RecordStat
                key={r.label}
                label={r.label}
                value={r.value}
                accent={r.accent}
                baseDelay={i * 0.1}
              />
            ))}
          </div>
        </div>
      </div>

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
