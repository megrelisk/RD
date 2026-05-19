"use client";

import { ExternalLink, Newspaper } from "lucide-react";

import { Marquee } from "@/components/effects/Marquee";
import { Reveal } from "@/components/effects/Reveal";
import { SectionDivider } from "@/components/effects/SectionDivider";
import type { Achievement, PressItem } from "@/lib/schemas";

type Props = { press: PressItem[]; achievements: Achievement[] };

export function PressBlock({ press, achievements }: Props) {
  return (
    <section id="press" className="relative bg-black">
      <SectionDivider label="PRESS / LEGACY / ACHIEVEMENTS" number="// 09" />
      <div className="max-w-7xl mx-auto px-6 py-16 md:py-24">
        <Reveal>
          <div className="mb-12 flex items-end justify-between gap-6 flex-wrap">
            <h2 className="font-display text-5xl md:text-7xl lg:text-8xl text-white leading-none">
              AS SEEN ON.
              <br />
              <span className="text-stroke">AS RANKED BY.</span>
            </h2>
            <p className="font-mono text-xs text-white/60 uppercase tracking-[0.2em] max-w-sm">
              » Free editorial reach worth millions in paid media equivalent.
            </p>
          </div>
        </Reveal>

        {/* Press logos */}
        <div className="mb-16 border-y border-[#dc143c]/30 py-6 bg-black/40">
          <Marquee speed="normal" reverse>
            {press.map((p) => (
              <span
                key={p.outlet}
                className="shrink-0 font-display text-3xl md:text-4xl text-white/60 hover:text-[#dc143c] transition-colors tracking-[0.2em] uppercase whitespace-nowrap"
              >
                {p.outlet}
              </span>
            ))}
          </Marquee>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Press articles */}
          <div>
            <div className="flex items-center gap-2 mb-4 font-mono text-[10px] tracking-[0.3em] uppercase text-[#dc143c]">
              <Newspaper className="w-4 h-4" />
              FEATURED COVERAGE
            </div>
            <ul className="divide-y divide-white/10 border-y border-white/10">
              {press.map((p, i) => (
                <Reveal key={p.url} delay={i * 0.05}>
                  <li>
                    <a
                      href={p.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center justify-between gap-4 py-4 hover:bg-[#dc143c]/5 hover:px-3 transition-all"
                    >
                      <div className="min-w-0">
                        <div className="font-mono text-[10px] tracking-[0.3em] uppercase text-[#dc143c] mb-1">
                          {p.outlet} · {p.date}
                        </div>
                        <div className="font-display text-lg md:text-xl text-white group-hover:text-[#dc143c] transition-colors leading-tight">
                          {p.title}
                        </div>
                      </div>
                      <ExternalLink className="w-5 h-5 shrink-0 text-white/40 group-hover:text-[#dc143c] group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
                    </a>
                  </li>
                </Reveal>
              ))}
            </ul>
          </div>

          {/* Achievements */}
          <div>
            <div className="flex items-center gap-2 mb-4 font-mono text-[10px] tracking-[0.3em] uppercase text-[#dc143c]">
              ◆ ACHIEVEMENTS / TITLES / RECORDS
            </div>
            <div className="grid sm:grid-cols-2 gap-3">
              {achievements.map((a, i) => (
                <Reveal key={a.title} delay={i * 0.08}>
                  <div className="relative h-full bg-gradient-to-br from-[#1a0000] to-black border border-[#dc143c]/30 p-5 hover:border-[#dc143c] transition-colors">
                    <div className="font-mono text-[10px] tracking-[0.3em] uppercase text-[#dc143c] mb-2">
                      {a.year} · {a.iconType.toUpperCase()}
                    </div>
                    <div className="font-display text-xl text-white leading-tight mb-2">
                      {a.title}
                    </div>
                    <p className="font-mono text-[10px] uppercase tracking-wider text-white/60 leading-relaxed">
                      {a.description}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
