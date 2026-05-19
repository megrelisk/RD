"use client";

import { useEffect, useState } from "react";
import { collection, getCountFromServer } from "firebase/firestore";
import {
  Activity,
  AlertCircle,
  Inbox,
  Loader2,
  Mail,
  Star,
} from "lucide-react";
import Link from "next/link";

import { db, isFirebaseConfigured } from "@/lib/firebase/client";
import { COLLECTIONS } from "@/lib/firebase/collections";

const CARDS = [
  { key: COLLECTIONS.leads, label: "INCOMING LEADS", href: "/admin/leads", icon: Inbox, accent: true },
  { key: COLLECTIONS.mediaKitRequests, label: "MEDIA KIT DOWNLOADS", href: "/admin/media-kit", icon: Mail },
  { key: COLLECTIONS.videos, label: "VIDEOS", href: "/admin/videos", icon: Activity },
  { key: COLLECTIONS.gallery, label: "GALLERY ITEMS", href: "/admin/gallery", icon: Activity },
  { key: COLLECTIONS.packages, label: "PACKAGES", href: "/admin/packages", icon: Star },
  { key: COLLECTIONS.sponsors, label: "SPONSORS", href: "/admin/sponsors", icon: Activity },
];

export default function AdminHome() {
  const [counts, setCounts] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      if (!isFirebaseConfigured()) {
        setLoading(false);
        return;
      }
      try {
        const entries = await Promise.all(
          CARDS.map(async (c) => {
            try {
              const snap = await getCountFromServer(collection(db(), c.key));
              return [c.key, snap.data().count] as const;
            } catch {
              return [c.key, 0] as const;
            }
          }),
        );
        if (!cancelled) {
          setCounts(Object.fromEntries(entries));
          setLoading(false);
        }
      } catch (err) {
        console.error(err);
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="space-y-8">
      <header>
        <div className="font-mono text-[10px] tracking-[0.3em] uppercase text-[#dc143c] mb-1">
          ● COMMAND CENTER
        </div>
        <h1 className="font-display text-5xl md:text-6xl text-white tracking-tighter">
          MISSION CONTROL.
        </h1>
        <p className="font-mono text-xs text-white/60 uppercase tracking-wider mt-2">
          » Manage every block on the landing. Track every lead. Run the empire.
        </p>
      </header>

      {!isFirebaseConfigured() && (
        <div className="border border-[#dc143c] bg-[#dc143c]/10 p-6 flex items-start gap-4">
          <AlertCircle className="w-6 h-6 text-[#dc143c] shrink-0" />
          <div>
            <h3 className="font-display text-xl text-white mb-2">FIREBASE NOT CONFIGURED</h3>
            <p className="font-mono text-xs text-white/80 uppercase tracking-wider">
              Copy <code className="text-[#dc143c]">.env.local.example</code> to <code className="text-[#dc143c]">.env.local</code> and fill in credentials. Restart dev server.
            </p>
          </div>
        </div>
      )}

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {CARDS.map((c) => {
          const Icon = c.icon;
          return (
            <Link
              key={c.key}
              href={c.href}
              className={`group relative bg-black border ${c.accent ? "border-[#dc143c]/60 hover:border-[#dc143c]" : "border-white/10 hover:border-[#dc143c]/60"} p-6 transition-colors`}
            >
              <Icon className={`w-6 h-6 ${c.accent ? "text-[#dc143c]" : "text-white/60"} mb-4`} />
              <div className="font-display text-4xl text-white tabular-nums">
                {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : (counts[c.key] ?? 0)}
              </div>
              <div className="mt-2 font-mono text-[10px] tracking-[0.3em] uppercase text-white/60">
                {c.label}
              </div>
              <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-[#dc143c] transition-all group-hover:w-full" />
            </Link>
          );
        })}
      </div>

      <div className="grid lg:grid-cols-2 gap-4">
        <div className="border border-white/10 p-6">
          <h3 className="font-display text-xl text-white tracking-wider mb-4">QUICK TIPS</h3>
          <ul className="space-y-2 font-mono text-xs text-white/70 uppercase tracking-wider">
            <li>» Start with FIGHTER PROFILE — name, record, tagline, hero video.</li>
            <li>» Add 4-8 STATS for the flex bar.</li>
            <li>» Upload 6-12 GALLERY photos in mixed sizes for the bento grid.</li>
            <li>» Add at least 1 featured VIDEO (mark Featured = true).</li>
            <li>» Configure 4 PACKAGES — Bronze, Silver, Gold, Title.</li>
            <li>» Check LEADS daily — that&apos;s the money.</li>
          </ul>
        </div>
        <div className="border border-[#dc143c]/40 bg-[#dc143c]/5 p-6">
          <h3 className="font-display text-xl text-white tracking-wider mb-4">DANGER ZONE</h3>
          <ul className="space-y-2 font-mono text-xs text-white/70 uppercase tracking-wider">
            <li>» All content lives in Firestore. Deleting an item is permanent.</li>
            <li>» Media files uploaded to Firebase Storage — deleting Firestore docs does NOT delete media.</li>
            <li>» Only emails in the &quot;admins&quot; collection can access this panel.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
