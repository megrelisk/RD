"use client";

import { Quote, Star } from "lucide-react";
import Image from "next/image";

import { Marquee } from "@/components/effects/Marquee";
import { Reveal } from "@/components/effects/Reveal";
import { SectionDivider } from "@/components/effects/SectionDivider";
import type { Sponsor, Testimonial } from "@/lib/schemas";

type Props = { sponsors: Sponsor[]; testimonials: Testimonial[] };

export function TrustBlock({ sponsors, testimonials }: Props) {
  return (
    <section id="trust" className="relative bg-black">
      <SectionDivider label="TRUST / PROOF / ROI" number="// 08" />
      <div className="max-w-7xl mx-auto px-6 py-16 md:py-24">
        <Reveal>
          <div className="mb-12 flex items-end justify-between gap-6 flex-wrap">
            <h2 className="font-display text-5xl md:text-7xl lg:text-8xl text-white leading-none">
              BRANDS WHO
              <br />
              <span className="blood-text">SURVIVED THE CAGE.</span>
            </h2>
            <p className="font-mono text-xs text-white/60 uppercase tracking-[0.2em] max-w-sm">
              » Tested by the brave. Endorsed by the smart.
            </p>
          </div>
        </Reveal>

        {/* Sponsor logos marquee */}
        <div className="mb-12">
          <div className="font-mono text-[10px] tracking-[0.3em] uppercase text-white/40 mb-4">
            PAST & CURRENT PARTNERS
          </div>
          <div className="border-y border-[#dc143c]/30 py-6 bg-black/40">
            <Marquee speed="slow">
              {sponsors.map((s) => (
                <div
                  key={s.name}
                  className="shrink-0 flex items-center justify-center h-16 w-44 grayscale hover:grayscale-0 transition-all opacity-70 hover:opacity-100"
                >
                  {s.logoUrl ? (
                    <Image
                      src={s.logoUrl}
                      alt={s.name}
                      width={160}
                      height={56}
                      className="object-contain max-h-full"
                    />
                  ) : (
                    <span className="font-display text-3xl text-white/70 tracking-widest">
                      {s.name}
                    </span>
                  )}
                </div>
              ))}
            </Marquee>
          </div>
        </div>

        {/* Testimonials */}
        <div className="grid md:grid-cols-3 gap-4">
          {testimonials.map((t, i) => (
            <Reveal key={t.author} delay={i * 0.1}>
              <article className="group relative h-full bg-gradient-to-b from-[#3a0000]/30 to-black border border-[#dc143c]/30 p-6 md:p-8 hover:border-[#dc143c] transition-colors">
                <Quote className="w-8 h-8 text-[#dc143c]/50 mb-4" />
                <div className="flex items-center gap-1 mb-4">
                  {Array.from({ length: t.rating }).map((_, idx) => (
                    <Star key={idx} className="w-4 h-4 fill-[#dc143c] text-[#dc143c]" />
                  ))}
                </div>
                <p className="font-mono text-base md:text-lg text-white/90 leading-relaxed mb-8 italic">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="flex items-center gap-3 pt-4 border-t border-white/10">
                  {t.photoUrl && (
                    <Image
                      src={t.photoUrl}
                      alt={t.author}
                      width={48}
                      height={48}
                      className="rounded-full object-cover border-2 border-[#dc143c]"
                    />
                  )}
                  <div>
                    <div className="font-display text-lg text-white tracking-wider">
                      {t.author}
                    </div>
                    <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-[#dc143c]">
                      {t.role && `${t.role} · `}{t.company}
                    </div>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
