"use client";

import { motion } from "framer-motion";
import { Globe, Users } from "lucide-react";

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

function DemographicBar({
  label,
  pct,
  delay = 0,
}: { label: string; pct: number; delay?: number }) {
  return (
    <div>
      <div className="flex justify-between font-mono text-[10px] tracking-[0.2em] uppercase text-white/80 mb-2">
        <span>{label}</span>
        <span className="text-[#dc143c]">{pct}%</span>
      </div>
      <div className="h-2 bg-white/5 border border-white/10 overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${pct}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay, ease: "easeOut" }}
          className="h-full bg-gradient-to-r from-[#8B0000] via-[#dc143c] to-[#ff1744]"
        />
      </div>
    </div>
  );
}

export function AudienceInsights({ regions, demographics }: Props) {
  const ages = demographics.filter((d) => d.category === "age");
  const genders = demographics.filter((d) => d.category === "gender");
  const incomes = demographics.filter((d) => d.category === "income");

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

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Top regions */}
          <Reveal>
            <div className="bg-black border border-[#dc143c]/30 p-6 lg:col-span-2 h-full">
              <div className="flex items-center gap-2 mb-6 font-mono text-[10px] tracking-[0.3em] uppercase text-[#dc143c]">
                <Globe className="w-4 h-4" />
                TOP REGIONS / WHERE EYES WATCH
              </div>
              <div className="space-y-3">
                {regions.map((r, i) => (
                  <Reveal key={r.countryCode} delay={i * 0.05}>
                    <div className="grid grid-cols-12 items-center gap-3">
                      <div className="col-span-1 text-2xl">{flagEmoji(r.countryCode)}</div>
                      <div className="col-span-4 font-mono text-xs uppercase tracking-wider text-white/90">
                        {r.country}
                      </div>
                      <div className="col-span-5">
                        <div className="h-3 bg-white/5 border border-white/10 overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${r.percentage}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 1.4, delay: i * 0.04, ease: "easeOut" }}
                            className="h-full bg-gradient-to-r from-[#8B0000] to-[#dc143c]"
                          />
                        </div>
                      </div>
                      <div className="col-span-2 text-right font-mono text-xs text-white">
                        <span className="text-[#dc143c]">{r.percentage}%</span>
                        <span className="block text-[10px] text-white/40">{compact(r.viewers)}</span>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </Reveal>

          {/* Quick gender + income summary */}
          <Reveal delay={0.1}>
            <div className="bg-black border border-[#dc143c]/30 p-6 h-full">
              <div className="flex items-center gap-2 mb-6 font-mono text-[10px] tracking-[0.3em] uppercase text-[#dc143c]">
                <Users className="w-4 h-4" />
                THE PROFILE
              </div>

              <div className="space-y-5">
                {/* Gender split */}
                <div>
                  <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-white/60 mb-3">
                    GENDER SPLIT
                  </div>
                  <div className="flex h-12 border border-white/10 overflow-hidden">
                    {genders.map((g, i) => (
                      <motion.div
                        key={g.label}
                        initial={{ width: 0 }}
                        whileInView={{ width: `${g.percentage}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className={i === 0 ? "bg-[#dc143c]" : "bg-white/20"}
                        style={{ minWidth: 0 }}
                      >
                        <div className="px-2 py-1 font-mono text-[10px] tracking-wider uppercase text-white truncate">
                          {g.label} {g.percentage}%
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Age */}
                <div>
                  <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-white/60 mb-3">
                    AGE BREAKDOWN
                  </div>
                  <div className="space-y-3">
                    {ages.map((a, i) => (
                      <DemographicBar key={a.label} label={a.label} pct={a.percentage} delay={i * 0.05} />
                    ))}
                  </div>
                </div>

                {/* Income */}
                <div>
                  <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-white/60 mb-3">
                    INCOME LEVEL
                  </div>
                  <div className="space-y-3">
                    {incomes.map((a, i) => (
                      <DemographicBar key={a.label} label={a.label} pct={a.percentage} delay={i * 0.05} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
