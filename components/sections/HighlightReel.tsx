"use client";

import { useState } from "react";
import { Play } from "lucide-react";
import Image from "next/image";

import { Reveal } from "@/components/effects/Reveal";
import { SectionDivider } from "@/components/effects/SectionDivider";
import { cn } from "@/lib/utils";
import type { Video } from "@/lib/schemas";

type Props = { videos: Video[] };

function youtubeThumb(id: string) {
  return `https://img.youtube.com/vi/${id}/maxresdefault.jpg`;
}

export function HighlightReel({ videos }: Props) {
  const featured = videos.find((v) => v.featured) ?? videos[0];
  const rest = videos.filter((v) => v !== featured).slice(0, 4);
  const [playing, setPlaying] = useState(false);
  const [selected, setSelected] = useState(featured);

  if (!featured) return null;

  const thumb =
    selected?.thumbnailUrl ||
    (selected?.youtubeId ? youtubeThumb(selected.youtubeId) : `https://picsum.photos/seed/reel/1600/900`);

  return (
    <section id="highlights" className="relative bg-black">
      <SectionDivider label="HIGHLIGHT REEL / VIOLENT POETRY" number="// 02" />

      <div className="max-w-7xl mx-auto px-6 py-16 md:py-24">
        <Reveal>
          <div className="mb-10 flex items-end justify-between gap-6 flex-wrap">
            <h2 className="font-display text-5xl md:text-7xl lg:text-8xl text-white leading-none">
              WATCH HIM <span className="blood-text">WORK.</span>
            </h2>
            <p className="font-mono text-xs text-white/60 uppercase tracking-[0.2em] max-w-sm">
              » Every brand needs a story. Doe&apos;s is broadcast in 4K to millions.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="relative aspect-video w-full overflow-hidden blood-border bg-black group">
            {playing && selected?.youtubeId ? (
              <iframe
                src={`https://www.youtube.com/embed/${selected.youtubeId}?autoplay=1&modestbranding=1&rel=0`}
                title={selected.title}
                allow="autoplay; encrypted-media; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 w-full h-full"
              />
            ) : (
              <>
                <Image
                  src={thumb}
                  alt={selected?.title || "Highlight"}
                  fill
                  sizes="(max-width: 1024px) 100vw, 1280px"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
                <button
                  type="button"
                  onClick={() => setPlaying(true)}
                  aria-label="Play highlight"
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <span className="relative inline-flex items-center justify-center w-24 h-24 md:w-32 md:h-32 bg-[#dc143c] text-white animate-pulse-blood group-hover:scale-110 transition-transform">
                    <Play className="w-10 h-10 md:w-14 md:h-14 fill-white" />
                  </span>
                </button>
                <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between gap-4">
                  <div>
                    <div className="font-mono text-[10px] tracking-[0.3em] uppercase text-[#dc143c] mb-1">
                      {selected?.category}
                    </div>
                    <div className="font-display text-2xl md:text-4xl text-white">
                      {selected?.title}
                    </div>
                  </div>
                </div>
                <div className="absolute top-4 right-4 font-mono text-[10px] tracking-[0.3em] uppercase text-white/60 border border-white/20 px-2 py-1 bg-black/60">
                  REC ● {String(rest.length + 1).padStart(2, "0")}
                </div>
              </>
            )}
          </div>
        </Reveal>

        {/* Sub videos */}
        {rest.length > 0 && (
          <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-3">
            {rest.map((v) => {
              const t = v.thumbnailUrl || (v.youtubeId ? youtubeThumb(v.youtubeId) : `https://picsum.photos/seed/${v.title}/600/400`);
              return (
                <button
                  key={v.title}
                  onClick={() => {
                    setSelected(v);
                    setPlaying(false);
                  }}
                  className={cn(
                    "group relative aspect-video overflow-hidden border-2 transition-all",
                    selected === v ? "border-[#dc143c]" : "border-white/10 hover:border-[#dc143c]/60",
                  )}
                >
                  <Image src={t} alt={v.title} fill sizes="25vw" className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                  <div className="absolute bottom-2 left-2 right-2 text-left">
                    <div className="font-mono text-[8px] tracking-[0.3em] uppercase text-[#dc143c]">
                      {v.category}
                    </div>
                    <div className="font-display text-xs md:text-sm text-white truncate uppercase">
                      {v.title}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
