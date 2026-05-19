"use client";

import { useEffect, useState } from "react";
import { collection, doc, getDocs, orderBy, query, updateDoc } from "firebase/firestore";
import { Loader2, Mail, Phone } from "lucide-react";
import { toast } from "sonner";

import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { db } from "@/lib/firebase/client";
import { COLLECTIONS } from "@/lib/firebase/collections";
import type { Lead } from "@/lib/schemas";

type Row = Lead & { id: string };

const STATUS_COLOR: Record<string, string> = {
  new: "bg-[#dc143c] text-white",
  contacted: "bg-yellow-500 text-black",
  negotiating: "bg-blue-500 text-white",
  won: "bg-emerald-500 text-white",
  lost: "bg-white/30 text-white",
};

export default function LeadsAdmin() {
  const [items, setItems] = useState<Row[]>([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    try {
      const snap = await getDocs(query(collection(db(), COLLECTIONS.leads), orderBy("createdAt", "desc")));
      setItems(snap.docs.map((d) => ({ id: d.id, ...(d.data() as Lead) })));
    } catch {
      toast.error("LOAD FAILED");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const updateStatus = async (id: string, status: NonNullable<Lead["status"]>) => {
    try {
      await updateDoc(doc(db(), COLLECTIONS.leads, id), { status });
      toast.success(`STATUS → ${status.toUpperCase()}`);
      load();
    } catch (err) {
      toast.error(`FAILED — ${err instanceof Error ? err.message : "?"}`);
    }
  };

  return (
    <div className="space-y-6">
      <header>
        <h1 className="font-display text-4xl md:text-5xl text-white tracking-wider">INCOMING LEADS</h1>
        <p className="font-mono text-xs text-white/60 uppercase tracking-wider mt-2">
          » Sponsorship form submissions. Update status as you progress through the funnel.
        </p>
      </header>

      {loading ? (
        <div className="flex justify-center py-20"><Loader2 className="w-8 h-8 text-[#dc143c] animate-spin" /></div>
      ) : items.length === 0 ? (
        <div className="border border-dashed border-white/20 p-12 text-center font-mono text-sm uppercase tracking-wider text-white/60">
          NO LEADS YET. SHARE THE LANDING LINK.
        </div>
      ) : (
        <div className="space-y-3">
          {items.map((lead) => (
            <article key={lead.id} className="bg-black border border-white/10 hover:border-[#dc143c]/60 p-6 transition-colors">
              <div className="flex items-start justify-between gap-4 mb-4 flex-wrap">
                <div>
                  <div className="font-display text-2xl text-white tracking-wider">{lead.company}</div>
                  <div className="font-mono text-xs text-white/60 uppercase tracking-wider">
                    {lead.contactName} · {lead.budget}{lead.packageInterest && ` · ${lead.packageInterest.toUpperCase()}`}
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Badge className={`${STATUS_COLOR[lead.status ?? "new"] ?? ""} rounded-none font-mono text-[10px] tracking-[0.2em] uppercase px-3 py-1`}>
                    {lead.status ?? "new"}
                  </Badge>
                  <Select value={lead.status ?? "new"} onValueChange={(v) => updateStatus(lead.id, v as NonNullable<Lead["status"]>)}>
                    <SelectTrigger className="bg-black border-white/20 rounded-none w-36 h-8 font-mono text-xs uppercase">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="rounded-none">
                      {["new", "contacted", "negotiating", "won", "lost"].map((s) => (
                        <SelectItem key={s} value={s}>{s.toUpperCase()}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <p className="font-mono text-sm text-white/80 leading-relaxed mb-4">{lead.message}</p>
              <div className="flex flex-wrap gap-3 text-xs font-mono">
                <a href={`mailto:${lead.email}`} className="text-[#dc143c] hover:underline flex items-center gap-1">
                  <Mail className="w-3 h-3" /> {lead.email}
                </a>
                {lead.phone && (
                  <a href={`tel:${lead.phone}`} className="text-white/80 hover:text-[#dc143c] flex items-center gap-1">
                    <Phone className="w-3 h-3" /> {lead.phone}
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
