"use client";

import { motion } from "framer-motion";
import { ArrowDown, Download, Zap } from "lucide-react";
import Image from "next/image";

import { GlitchText } from "@/components/effects/GlitchText";
import { Button } from "@/components/ui/button";
import type { Site, Social } from "@/lib/schemas";

type Props = { site: Site; socials: Social[] };

function compactNumber(n: number) {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(0)}K`;
  return String(n);
}

export function Hero({ site, socials }: Props) {
  const totalReach = socials.reduce((s, x) => s + x.followers, 0);
  const isYoutube = site.heroVideoUrl?.includes("youtube") || site.heroVideoUrl?.includes("youtu.be");

  return (
    <section className="relative min-h-[100svh] w-full overflow-hidden grain-overlay scanlines">
      {/* Video / image background */}
      <div className="absolute inset-0 z-0">
        {site.heroVideoUrl && !isYoutube ? (
          <video
            autoPlay
            muted
            loop
            playsInline
            poster={site.heroPosterUrl || undefined}
            className="h-full w-full object-cover object-[center_20%]"
          >
            <source src={site.heroVideoUrl} />
          </video>
        ) : (
          <Image
            src={site.heroPosterUrl || `https://picsum.photos/seed/herofighter/1920/1080`}
            alt={site.fighterName}
            fill
            priority
            sizes="100vw"
            className="object-cover object-center opacity-70"
          />
        )}
        {/* Vignette + blood wash */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-black/40" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(139,0,0,0.35),_transparent_70%)] mix-blend-overlay" />
      </div>

      {/* Top bar */}
      <div className="relative z-20 flex items-center justify-between px-6 md:px-12 pt-6">
        <div className="font-mono text-xs tracking-[0.3em] uppercase text-[#dc143c] flex items-center gap-2">
          <span className="inline-block w-2 h-2 bg-[#dc143c] animate-pulse-blood rounded-full" />
          LIVE / SPONSORSHIP HUB
        </div>
        <div className="hidden md:flex items-center gap-6 font-mono text-[10px] tracking-[0.3em] uppercase text-white/60">
          <span>EST. {new Date(site.nextFightDate || Date.now()).getFullYear() - 8}</span>
          <span>•</span>
          <span>{site.weightClass}</span>
          <span>•</span>
          <span>{compactNumber(totalReach)} FOLLOWERS</span>
        </div>
      </div>

      {/* Main content */}
      <div className="relative z-10 flex min-h-[90svh] w-full flex-col justify-end pl-5 pr-6 md:pr-12 pb-16 md:pb-24">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="space-y-4"
        >
          <div className="flex items-center gap-3 font-mono text-xs tracking-[0.3em] uppercase text-[#dc143c]">
            <span className="h-px w-12 bg-[#dc143c]" />
            <span>UFC Middleweight — RANKED TOP 15</span>
          </div>

          <h1 className="font-display leading-[0.85] tracking-tighter">
            <GlitchText
              as="div"
              className="block text-[15vw] md:text-[10vw] lg:text-[8.5vw] text-white"
            >
              {site.fighterName.split(" ")[0] || site.fighterName}
            </GlitchText>
            <span className="block text-stroke text-[8vw] md:text-[6vw] lg:text-[5vw] my-4 md:my-6 whitespace-nowrap tracking-[0.25em] text-center w-screen -ml-5">
              &ldquo;{site.nickname}&rdquo;
            </span>
            {site.fighterName.split(" ").slice(1).join(" ") && (
              <span className="block text-white text-[15vw] md:text-[10vw] lg:text-[8.5vw]">
                {site.fighterName.split(" ").slice(1).join(" ")}
              </span>
            )}
          </h1>

          {/* Record bar */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="mt-6 inline-flex divide-x divide-[#dc143c]/30 border border-[#dc143c]/30 bg-black/60 backdrop-blur-sm"
          >
            {[
              { label: "W", value: site.record.wins, color: "text-white" },
              { label: "L", value: site.record.losses, color: "text-white/60" },
              { label: "D", value: site.record.draws, color: "text-white/60" },
              { label: "KO", value: site.record.knockouts, color: "text-[#dc143c]" },
              { label: "SUB", value: site.record.submissions, color: "text-[#dc143c]" },
            ].map((r) => (
              <div key={r.label} className="px-5 py-3">
                <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-white/40">
                  {r.label}
                </div>
                <div className={`font-display text-3xl md:text-4xl ${r.color}`}>{r.value}</div>
              </div>
            ))}
          </motion.div>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="mt-8 max-w-2xl font-mono text-sm md:text-base tracking-wide text-white/80 leading-relaxed uppercase"
          >
            <span className="text-[#dc143c]">»</span> {site.tagline}
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="flex flex-col sm:flex-row gap-3 pt-4"
          >
            <Button
              asChild
              size="lg"
              className="group h-14 px-8 font-display text-xl tracking-wider bg-[#dc143c] hover:bg-[#ff1744] text-white border-2 border-[#dc143c] hover:shadow-[0_0_32px_rgba(220,20,60,0.6)] transition-all rounded-none"
            >
              <a href="#book">
                <Zap className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform" />
                BOOK A SPONSORSHIP
              </a>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="h-14 px-8 font-display text-xl tracking-wider bg-black/40 hover:bg-white hover:text-black text-white border-2 border-white/60 rounded-none backdrop-blur-sm"
            >
              <a href="#media-kit">
                <Download className="w-5 h-5 mr-2" />
                GET MEDIA KIT
              </a>
            </Button>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-white/60">
        <span className="font-mono text-[10px] tracking-[0.3em] uppercase">SCROLL TO STRIKE</span>
        <ArrowDown className="w-4 h-4 animate-bounce" />
      </div>

      {/* Side text */}
      <div className="hidden md:block absolute right-6 top-1/2 -translate-y-1/2 -rotate-90 origin-right font-mono text-[10px] tracking-[0.4em] uppercase text-white/40 whitespace-nowrap">
        FILE: 001 / {site.fighterName} / ACTIVE ROSTER
      </div>
    </section>
  );
}
