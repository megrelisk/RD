"use client";

import { useEffect, useState } from "react";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { Loader2 } from "lucide-react";

import { db } from "@/lib/firebase/client";
import { COLLECTIONS } from "@/lib/firebase/collections";

type Row = {
  id: string;
  email: string;
  company: string;
  createdAt?: { toDate?: () => Date };
};

export default function MediaKitRequestsAdmin() {
  const [items, setItems] = useState<Row[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const snap = await getDocs(query(collection(db(), COLLECTIONS.mediaKitRequests), orderBy("createdAt", "desc")));
        setItems(snap.docs.map((d) => ({ id: d.id, ...(d.data() as Omit<Row, "id">) })));
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <div className="space-y-6">
      <header>
        <h1 className="font-display text-4xl md:text-5xl text-white tracking-wider">MEDIA KIT DOWNLOADS</h1>
        <p className="font-mono text-xs text-white/60 uppercase tracking-wider mt-2">
          » Email-gated PDF download requests. Warm leads.
        </p>
      </header>

      {loading ? (
        <div className="flex justify-center py-20"><Loader2 className="w-8 h-8 text-[#dc143c] animate-spin" /></div>
      ) : items.length === 0 ? (
        <div className="border border-dashed border-white/20 p-12 text-center font-mono text-sm uppercase tracking-wider text-white/60">
          NO DOWNLOADS YET.
        </div>
      ) : (
        <ul className="border border-white/10 divide-y divide-white/10 font-mono text-sm">
          {items.map((r) => (
            <li key={r.id} className="flex items-center justify-between gap-4 p-4">
              <div>
                <div className="text-white">{r.company}</div>
                <div className="text-white/60 text-xs uppercase tracking-wider">
                  <a href={`mailto:${r.email}`} className="hover:text-[#dc143c]">{r.email}</a>
                </div>
              </div>
              <div className="text-[10px] text-white/40 tracking-wider uppercase">
                {r.createdAt?.toDate?.()?.toISOString().slice(0, 10) ?? "—"}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
