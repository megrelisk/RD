"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowDown, Download, Zap } from "lucide-react";
import Image from "next/image";

import { GlitchText } from "@/components/effects/GlitchText";
import { Button } from "@/components/ui/button";
import type { Site, Social } from "@/lib/schemas";

type Props = { site: Site; socials: Social[] };

function HeroCountdown({ targetIso }: { targetIso?: string }) {
  const [target] = useState<number>(() => {
    if (targetIso) {
      const t = new Date(targetIso).getTime();
      if (!Number.isNaN(t)) return t;
    }
    return Date.now() + 60 * 86400000;
  });
  const [diff, setDiff] = useState({ d: 60, h: 0, m: 0, s: 0 });

  useEffect(() => {
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
  }, [target]);

  return (
    <div className="flex items-center gap-2 md:gap-3 font-mono">
      {[
        { v: diff.d, l: "DAYS" },
        { v: diff.h, l: "HRS" },
        { v: diff.m, l: "MIN" },
        { v: diff.s, l: "SEC" },
      ].map((c) => (
        <div
          key={c.l}
          className="relative flex flex-col items-center bg-black/70 border border-[#dc143c]/50 px-3 py-2 md:px-4 md:py-3 min-w-[58px] md:min-w-[72px] backdrop-blur-sm"
          style={{ boxShadow: "0 0 24px rgba(220,20,60,0.25), inset 0 0 12px rgba(220,20,60,0.08)" }}
        >
          <span className="font-display text-2xl md:text-4xl tabular-nums text-white leading-none">
            {String(c.v).padStart(2, "0")}
          </span>
          <span className="mt-1 text-[#dc143c] text-[9px] tracking-[0.25em]">{c.l}</span>
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#dc143c]/80 to-transparent" />
        </div>
      ))}
    </div>
  );
}

export function Hero({ site }: Props) {
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
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-black/40" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(139,0,0,0.35),_transparent_70%)] mix-blend-overlay" />
      </div>

      {/* Top bar */}
      <div className="relative z-20 flex items-center px-6 md:px-12 pt-6">
        <div className="font-mono text-xs tracking-[0.3em] uppercase text-[#dc143c] flex items-center gap-2">
          <span className="inline-block w-2 h-2 bg-[#dc143c] animate-pulse-blood rounded-full" />
          LIVE / SPONSORSHIP HUB
        </div>
      </div>

      {/* Main content */}
      <div className="relative z-10 flex min-h-[90svh] w-full flex-col justify-end pl-5 pr-6 md:pr-12 pt-16 md:pt-24 pb-16 md:pb-24">
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

          {/* ROMAN + DOLIDZE — slightly more breathing room */}
          <h1 className="font-display leading-[0.95] tracking-tighter">
            <GlitchText
              as="div"
              className="block text-[15vw] md:text-[10vw] lg:text-[8.5vw] text-white"
            >
              {site.fighterName.split(" ")[0] || site.fighterName}
            </GlitchText>
            {site.fighterName.split(" ").slice(1).join(" ") && (
              <span className="block text-white text-[15vw] md:text-[10vw] lg:text-[8.5vw] mt-1">
                {site.fighterName.split(" ").slice(1).join(" ")}
              </span>
            )}
          </h1>

          {/* THE CAUCASIAN — UFC walkout style pulse */}
          <div className="w-screen -ml-5 text-center mt-8 md:mt-12">
            <motion.span
              className="block text-stroke text-[8vw] md:text-[6vw] lg:text-[5vw] whitespace-nowrap tracking-[0.25em]"
              initial={{ opacity: 0, scale: 1.15, filter: "blur(8px)" }}
              animate={{
                opacity: [0.25, 0.8, 0.45, 0.8, 0.25],
                scale: [1, 1.015, 1, 1.015, 1],
                filter: [
                  "blur(0px) drop-shadow(0 0 6px rgba(220,20,60,0.25))",
                  "blur(0px) drop-shadow(0 0 28px rgba(220,20,60,0.95)) drop-shadow(0 0 60px rgba(220,20,60,0.5))",
                  "blur(0px) drop-shadow(0 0 14px rgba(220,20,60,0.55))",
                  "blur(0px) drop-shadow(0 0 28px rgba(220,20,60,0.95)) drop-shadow(0 0 60px rgba(220,20,60,0.5))",
                  "blur(0px) drop-shadow(0 0 6px rgba(220,20,60,0.25))",
                ],
              }}
              transition={{
                duration: 4.5,
                repeat: Infinity,
                ease: "easeInOut",
                times: [0, 0.25, 0.5, 0.75, 1],
              }}
            >
              &ldquo;{site.nickname}&rdquo;
            </motion.span>
          </div>

          {/* NEXT WAR — emphasized banner */}
          {site.nextFightOpponent && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="mt-8 relative"
            >
              {/* Top label */}
              <div className="flex items-center gap-3 mb-5">
                <span className="inline-block w-2.5 h-2.5 bg-[#dc143c] rounded-full animate-pulse" style={{ boxShadow: "0 0 12px rgba(220,20,60,0.9)" }} />
                <span className="font-mono text-[11px] md:text-xs tracking-[0.45em] uppercase text-[#dc143c]">NEXT WAR</span>
                <span className="h-px w-16 md:w-24 bg-gradient-to-r from-[#dc143c]/80 to-transparent" />
              </div>

              {/* Fighter vs Opponent — both same size */}
              <div className="flex flex-wrap items-center gap-x-5 gap-y-3 mb-6">
                <span
                  className="font-display text-3xl md:text-5xl lg:text-6xl tracking-wider text-[#dc143c] leading-none"
                  style={{ textShadow: "0 0 24px rgba(220,20,60,0.7), 0 0 60px rgba(220,20,60,0.35)" }}
                >
                  {site.fighterName.toUpperCase()}
                </span>
                <span className="font-mono text-xs md:text-sm tracking-[0.4em] uppercase text-white/40">VS</span>
                <span
                  className="font-display text-3xl md:text-5xl lg:text-6xl tracking-wider text-white leading-none"
                  style={{ textShadow: "0 0 16px rgba(255,255,255,0.2)" }}
                >
                  {site.nextFightOpponent.toUpperCase()}
                </span>
              </div>

              {/* Venue + Countdown */}
              <div className="flex flex-wrap items-center gap-4 md:gap-6">
                <HeroCountdown targetIso={site.nextFightDate} />
                {site.nextFightVenue && (
                  <div className="font-mono text-[10px] md:text-xs tracking-[0.3em] uppercase text-white/50">
                    @ <span className="text-white/80">{site.nextFightVenue}</span>
                  </div>
                )}
              </div>
            </motion.div>
          )}

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
