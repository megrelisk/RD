"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowDown, Download, Zap } from "lucide-react";
import Image from "next/image";

import { GlitchText } from "@/components/effects/GlitchText";
import { Button } from "@/components/ui/button";
import type { Site, Social } from "@/lib/schemas";

type Props = { site: Site; socials: Social[] };

type StatCardProps = { label: string; value: number; accent: boolean; delay: number };

function StatCard({ label, value, accent, delay }: StatCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotX = useSpring(useTransform(my, [-0.5, 0.5], [12, -12]), { stiffness: 400, damping: 25 });
  const rotY = useSpring(useTransform(mx, [-0.5, 0.5], [-12, 12]), { stiffness: 400, damping: 25 });

  const handleMouse = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };

  const handleLeave = () => { mx.set(0); my.set(0); };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={handleLeave}
      initial={{ opacity: 0, y: 40, rotateX: 60 }}
      animate={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{ delay, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      style={{ rotateX: rotX, rotateY: rotY, transformStyle: "preserve-3d" }}
      className="relative cursor-default select-none"
    >
      {/* Main face */}
      <div
        className="relative px-5 py-4 overflow-hidden"
        style={{
          background: accent
            ? "linear-gradient(135deg, rgba(139,0,0,0.35) 0%, rgba(10,0,0,0.95) 100%)"
            : "linear-gradient(135deg, rgba(25,25,25,0.95) 0%, rgba(0,0,0,0.98) 100%)",
          boxShadow: accent
            ? "0 0 0 1px rgba(220,20,60,0.4), 0 12px 40px rgba(220,20,60,0.2), 0 4px 16px rgba(0,0,0,0.8)"
            : "0 0 0 1px rgba(255,255,255,0.06), 0 12px 40px rgba(0,0,0,0.6), 0 4px 16px rgba(0,0,0,0.8)",
        }}
      >
        {/* Top shimmer edge */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent" />

        {/* Glint sweep on hover */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.07) 50%, transparent 60%)",
            backgroundSize: "200% 100%",
          }}
          initial={{ backgroundPositionX: "200%" }}
          whileHover={{ backgroundPositionX: "-100%" }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        />

        <div className="font-mono text-[9px] tracking-[0.35em] uppercase text-white/35 mb-2">
          {label}
        </div>
        <div
          className="font-display text-4xl md:text-5xl lg:text-6xl tabular-nums leading-none"
          style={{
            color: accent ? "#dc143c" : "#ffffff",
            textShadow: accent
              ? "0 0 15px rgba(220,20,60,0.9), 0 0 40px rgba(220,20,60,0.5), 0 0 80px rgba(220,20,60,0.25)"
              : "0 0 8px rgba(255,255,255,0.12)",
          }}
        >
          {value}
        </div>

        {/* Bottom glow bar */}
        <div
          className="absolute bottom-0 left-0 right-0 h-[2px]"
          style={{
            background: accent
              ? "linear-gradient(90deg, transparent, rgba(220,20,60,0.8), transparent)"
              : "linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent)",
          }}
        />
      </div>

      {/* 3D depth — bottom face */}
      <div
        className="absolute left-0 right-0 bottom-0 h-[6px]"
        style={{
          background: accent ? "rgba(100,0,0,0.8)" : "rgba(15,15,15,0.9)",
          transform: "rotateX(-90deg) translateZ(3px)",
          transformOrigin: "bottom",
          boxShadow: accent ? "0 4px 20px rgba(220,20,60,0.3)" : "0 4px 20px rgba(0,0,0,0.5)",
        }}
      />

      {/* 3D depth — right face */}
      <div
        className="absolute top-0 right-0 w-[6px] bottom-0"
        style={{
          background: accent ? "rgba(80,0,0,0.7)" : "rgba(10,10,10,0.8)",
          transform: "rotateY(90deg) translateZ(3px)",
          transformOrigin: "right",
        }}
      />
    </motion.div>
  );
}

export function Hero({ site }: Props) {
  const isYoutube = site.heroVideoUrl?.includes("youtube") || site.heroVideoUrl?.includes("youtu.be");

  const stats = [
    { label: "W", value: site.record.wins, accent: false },
    { label: "L", value: site.record.losses, accent: false },
    { label: "D", value: site.record.draws, accent: false },
    { label: "KO", value: site.record.knockouts, accent: true },
    { label: "SUB", value: site.record.submissions, accent: true },
  ];

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

          {/* 3D Record block */}
          <div className="mt-6" style={{ perspective: "1400px" }}>
            <div className="inline-flex gap-[2px]" style={{ transformStyle: "preserve-3d" }}>
              {stats.map((s, i) => (
                <StatCard key={s.label} {...s} delay={0.3 + i * 0.07} />
              ))}
            </div>
          </div>

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
