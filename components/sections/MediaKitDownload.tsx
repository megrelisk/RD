"use client";

import { useState } from "react";
import { FileDown, Loader2 } from "lucide-react";
import { toast } from "sonner";

import { Reveal } from "@/components/effects/Reveal";
import { SectionDivider } from "@/components/effects/SectionDivider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { isFirebaseConfigured } from "@/lib/firebase/client";
import { createMediaKitRequest } from "@/lib/firebase/collections";
import type { Site } from "@/lib/schemas";

type Props = { site: Site };

export function MediaKitDownload({ site }: Props) {
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [loading, setLoading] = useState(false);

  const handle = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !company) {
      toast.error("EMAIL AND COMPANY REQUIRED");
      return;
    }
    setLoading(true);
    try {
      if (isFirebaseConfigured()) {
        await createMediaKitRequest({ email, company });
      }
      if (site.mediaKitUrl) {
        window.open(site.mediaKitUrl, "_blank");
      } else {
        toast.message("MEDIA KIT NOT UPLOADED YET — WE'LL EMAIL IT TO YOU.");
      }
      toast.success("KIT REQUESTED — CHECK YOUR INBOX.");
      setEmail("");
      setCompany("");
    } catch (err) {
      toast.error(`FAILED — ${err instanceof Error ? err.message : "TRY AGAIN"}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="media-kit" className="relative bg-gradient-to-b from-black via-[#1a0000]/40 to-black border-y border-[#dc143c]/30">
      <SectionDivider label="MEDIA KIT / DEEP STATS" number="// 11" />
      <div className="max-w-5xl mx-auto px-6 py-16 md:py-24">
        <Reveal>
          <div className="text-center mb-12">
            <h2 className="font-display text-5xl md:text-7xl lg:text-8xl text-white leading-none mb-6">
              FULL MEDIA KIT.
              <br />
              <span className="blood-text">IN YOUR INBOX.</span>
            </h2>
            <p className="font-mono text-sm text-white/70 uppercase tracking-wider max-w-2xl mx-auto">
              » Audience deep-dive · case studies · per-fight projection · hi-res assets · contract template. Drop your email below.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <form
            onSubmit={handle}
            className="grid sm:grid-cols-[1fr_1fr_auto] gap-3 max-w-3xl mx-auto bg-black border-2 border-[#dc143c]/40 p-3"
          >
            <Input
              type="text"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              placeholder="COMPANY"
              required
              className="h-12 bg-black border-white/20 focus:border-[#dc143c] rounded-none font-mono uppercase tracking-wider"
            />
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="EMAIL@BRAND.COM"
              required
              className="h-12 bg-black border-white/20 focus:border-[#dc143c] rounded-none font-mono lowercase"
            />
            <Button
              type="submit"
              disabled={loading}
              className="h-12 px-6 rounded-none font-display tracking-wider bg-[#dc143c] hover:bg-[#ff1744] text-white"
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <FileDown className="w-5 h-5 mr-2" />}
              {loading ? "" : "DOWNLOAD"}
            </Button>
          </form>
        </Reveal>

        <Reveal delay={0.2}>
          <p className="text-center font-mono text-[10px] tracking-[0.3em] uppercase text-white/40 mt-6">
            » INSTANT DOWNLOAD · NO SPAM · 1-CLICK UNSUBSCRIBE
          </p>
        </Reveal>
      </div>
    </section>
  );
}
