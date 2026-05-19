"use client";

import { AtSign, Music2, Play, MessageCircle, Hash } from "lucide-react";
import { motion } from "framer-motion";

import type { Site, Social } from "@/lib/schemas";

type Props = { site: Site; socials: Social[] };

const iconMap = {
  instagram: AtSign,
  tiktok: Music2,
  youtube: Play,
  twitter: Hash,
  facebook: MessageCircle,
} as const;

export function Footer({ site, socials }: Props) {
  return (
    <footer className="relative bg-black border-t-2 border-[#dc143c]/40 overflow-hidden">
      {/* Giant fighter name watermark */}
      <div className="absolute inset-x-0 -bottom-12 md:-bottom-24 pointer-events-none select-none overflow-hidden">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2 }}
          className="font-display text-stroke text-[28vw] leading-[0.8] text-center tracking-tighter"
        >
          {site.fighterName.split(" ").join("")}
        </motion.div>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 py-20">
        <div className="grid lg:grid-cols-3 gap-12 mb-12">
          {/* Pitch */}
          <div>
            <div className="font-mono text-[10px] tracking-[0.3em] uppercase text-[#dc143c] mb-3">
              ◆ OFFICIAL SPONSORSHIP HUB
            </div>
            <div className="font-display text-3xl text-white leading-none mb-4">
              {site.fighterName}
              <br />
              <span className="blood-text">&ldquo;{site.nickname}&rdquo;</span>
            </div>
            <p className="font-mono text-xs text-white/60 uppercase tracking-wider leading-relaxed">
              » {site.bioShort}
            </p>
          </div>

          {/* Contact */}
          <div>
            <div className="font-mono text-[10px] tracking-[0.3em] uppercase text-[#dc143c] mb-3">
              MANAGEMENT
            </div>
            <ul className="space-y-2 font-mono text-sm">
              {site.managerEmail && (
                <li>
                  <a href={`mailto:${site.managerEmail}`} className="text-white hover:text-[#dc143c] transition-colors">
                    {site.managerEmail}
                  </a>
                </li>
              )}
              {site.managerPhone && (
                <li>
                  <a href={`tel:${site.managerPhone}`} className="text-white hover:text-[#dc143c] transition-colors">
                    {site.managerPhone}
                  </a>
                </li>
              )}
              {site.managerWhatsapp && (
                <li>
                  <a
                    href={`https://wa.me/${site.managerWhatsapp.replace(/[^\d]/g, "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white hover:text-[#dc143c] transition-colors"
                  >
                    WhatsApp →
                  </a>
                </li>
              )}
            </ul>
          </div>

          {/* Socials */}
          <div>
            <div className="font-mono text-[10px] tracking-[0.3em] uppercase text-[#dc143c] mb-3">
              FOLLOW THE WAR
            </div>
            <div className="flex flex-wrap gap-3">
              {socials.map((s) => {
                const Icon = iconMap[s.platform] ?? AtSign;
                return (
                  <a
                    key={s.platform}
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-2 border border-white/10 hover:border-[#dc143c] bg-black hover:bg-[#dc143c]/10 px-4 py-2 transition-colors"
                  >
                    <Icon className="w-4 h-4 text-white group-hover:text-[#dc143c]" />
                    <span className="font-mono text-xs uppercase text-white">{s.handle}</span>
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row justify-between items-center gap-4 font-mono text-[10px] tracking-[0.3em] uppercase text-white/40">
          <span>© {new Date().getFullYear()} {site.fighterName}. ALL RIGHTS RESERVED.</span>
          <span className="flex items-center gap-3">
            <span>BUILT FOR BRANDS THAT FIGHT.</span>
            <span className="inline-block w-2 h-2 bg-[#dc143c] rotate-45 animate-pulse" />
          </span>
        </div>
      </div>
    </footer>
  );
}
