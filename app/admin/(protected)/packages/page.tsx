"use client";

import { useEffect, useState } from "react";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { Edit, Loader2, Plus, Save, Trash2, X } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { db } from "@/lib/firebase/client";
import { COLLECTIONS, createDoc, deleteDocById, updateDocById } from "@/lib/firebase/collections";
import type { Package } from "@/lib/schemas";

type Row = Package & { id: string };

const empty = (order: number): Package => ({
  name: "",
  tier: "bronze",
  priceUSD: 0,
  perks: [],
  estimatedImpressions: 0,
  highlighted: false,
  ctaLabel: "INQUIRE NOW",
  order,
});

export default function PackagesAdmin() {
  const [items, setItems] = useState<Row[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<(Package & { id?: string }) | null>(null);
  const [open, setOpen] = useState(false);
  const [perkInput, setPerkInput] = useState("");

  const load = async () => {
    setLoading(true);
    try {
      const snap = await getDocs(query(collection(db(), COLLECTIONS.packages), orderBy("order", "asc")));
      setItems(snap.docs.map((d) => ({ id: d.id, ...(d.data() as Package) })));
    } catch {
      toast.error("LOAD FAILED");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const save = async () => {
    if (!editing) return;
    try {
      const { id, ...rest } = editing as Package & { id?: string };
      if (id) await updateDocById(COLLECTIONS.packages, id, rest);
      else await createDoc(COLLECTIONS.packages, rest);
      toast.success("SAVED");
      setOpen(false);
      load();
    } catch (err) {
      toast.error(`SAVE FAILED — ${err instanceof Error ? err.message : "?"}`);
    }
  };

  const remove = async (id: string) => {
    if (!confirm("DELETE PACKAGE?")) return;
    await deleteDocById(COLLECTIONS.packages, id);
    toast.success("DELETED");
    load();
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <header className="flex items-end justify-between gap-4 flex-wrap">
        <div>
          <h1 className="font-display text-4xl md:text-5xl text-white tracking-wider">SPONSORSHIP PACKAGES</h1>
          <p className="font-mono text-xs text-white/60 uppercase tracking-wider mt-2">
            » 4 tiers recommended: Bronze, Silver, Gold, Title.
          </p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button
              onClick={() => { setEditing(empty(items.length)); setOpen(true); }}
              className="rounded-none font-display tracking-wider bg-[#dc143c] hover:bg-[#ff1744]"
            >
              <Plus className="w-4 h-4 mr-2" />
              NEW PACKAGE
            </Button>
          </DialogTrigger>
          <DialogContent className="rounded-none max-h-[90vh] overflow-y-auto bg-black border-[#dc143c]/40 max-w-xl">
            <DialogHeader>
              <DialogTitle className="font-display text-2xl text-white tracking-wider">
                {editing && "id" in editing ? "EDIT PACKAGE" : "NEW PACKAGE"}
              </DialogTitle>
            </DialogHeader>
            {editing && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <Field label="NAME">
                    <Input value={editing.name} onChange={(e) => setEditing({ ...editing, name: e.target.value })} className="bg-black border-white/20 rounded-none font-mono" />
                  </Field>
                  <Field label="TIER">
                    <Select value={editing.tier} onValueChange={(v) => setEditing({ ...editing, tier: v as Package["tier"] })}>
                      <SelectTrigger className="bg-black border-white/20 rounded-none"><SelectValue /></SelectTrigger>
                      <SelectContent className="rounded-none">
                        {["bronze", "silver", "gold", "title"].map((t) => (
                          <SelectItem key={t} value={t}>{t.toUpperCase()}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </Field>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <Field label="PRICE (USD)">
                    <Input type="number" value={editing.priceUSD} onChange={(e) => setEditing({ ...editing, priceUSD: parseInt(e.target.value) || 0 })} className="bg-black border-white/20 rounded-none font-mono" />
                  </Field>
                  <Field label="EST. IMPRESSIONS">
                    <Input type="number" value={editing.estimatedImpressions} onChange={(e) => setEditing({ ...editing, estimatedImpressions: parseInt(e.target.value) || 0 })} className="bg-black border-white/20 rounded-none font-mono" />
                  </Field>
                </div>
                <Field label="CTA LABEL">
                  <Input value={editing.ctaLabel} onChange={(e) => setEditing({ ...editing, ctaLabel: e.target.value })} className="bg-black border-white/20 rounded-none font-mono" />
                </Field>
                <Field label="PERKS">
                  <div className="space-y-2">
                    <div className="flex gap-2">
                      <Input
                        value={perkInput}
                        onChange={(e) => setPerkInput(e.target.value)}
                        placeholder="ADD A PERK"
                        className="bg-black border-white/20 rounded-none font-mono"
                        onKeyDown={(e) => {
                          if (e.key === "Enter" && perkInput.trim()) {
                            e.preventDefault();
                            setEditing({ ...editing, perks: [...editing.perks, perkInput.trim()] });
                            setPerkInput("");
                          }
                        }}
                      />
                      <Button type="button" onClick={() => {
                        if (!perkInput.trim()) return;
                        setEditing({ ...editing, perks: [...editing.perks, perkInput.trim()] });
                        setPerkInput("");
                      }} className="rounded-none bg-[#dc143c] hover:bg-[#ff1744]">ADD</Button>
                    </div>
                    {editing.perks.length > 0 && (
                      <ul className="border border-white/10 divide-y divide-white/10">
                        {editing.perks.map((p, i) => (
                          <li key={i} className="flex items-center justify-between gap-2 p-2 font-mono text-xs text-white/80 uppercase">
                            <span className="flex-1">» {p}</span>
                            <button
                              type="button"
                              onClick={() => setEditing({ ...editing, perks: editing.perks.filter((_, idx) => idx !== i) })}
                              className="text-white/40 hover:text-[#dc143c]"
                            ><X className="w-3 h-3" /></button>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </Field>
                <div className="flex items-center gap-3">
                  <Checkbox
                    checked={editing.highlighted}
                    onCheckedChange={(v) => setEditing({ ...editing, highlighted: Boolean(v) })}
                    className="rounded-none border-white/40 data-[state=checked]:bg-[#dc143c]"
                  />
                  <Label className="font-mono text-xs text-white/80 uppercase tracking-wider">
                    HIGHLIGHTED (MOST POPULAR BADGE)
                  </Label>
                </div>
                <Field label="ORDER">
                  <Input type="number" value={editing.order} onChange={(e) => setEditing({ ...editing, order: parseInt(e.target.value) || 0 })} className="bg-black border-white/20 rounded-none font-mono" />
                </Field>
              </div>
            )}
            <DialogFooter>
              <Button variant="outline" onClick={() => setOpen(false)} className="rounded-none">CANCEL</Button>
              <Button onClick={save} className="rounded-none bg-[#dc143c] hover:bg-[#ff1744]">
                <Save className="w-4 h-4 mr-2" /> SAVE
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </header>

      {loading ? (
        <div className="flex justify-center py-20"><Loader2 className="w-8 h-8 text-[#dc143c] animate-spin" /></div>
      ) : items.length === 0 ? (
        <div className="border border-dashed border-white/20 p-12 text-center font-mono text-sm uppercase tracking-wider text-white/60">
          NO PACKAGES YET. ADD THE FIRST TIER.
        </div>
      ) : (
        <ul className="border border-white/10 divide-y divide-white/10">
          {items.map((it) => (
            <li key={it.id} className="p-4 hover:bg-[#dc143c]/5 flex items-center gap-4">
              <div className="flex-1 min-w-0">
                <div className="font-display text-lg text-white tracking-wider">
                  {it.name} <span className="text-[#dc143c]">${it.priceUSD.toLocaleString()}</span>
                  {it.highlighted && <span className="ml-2 text-[10px] font-mono text-[#dc143c]">★ HIGHLIGHTED</span>}
                </div>
                <div className="font-mono text-xs text-white/60 uppercase tracking-wider truncate">
                  TIER: {it.tier} · {it.perks.length} PERKS · {it.estimatedImpressions.toLocaleString()} IMPRESSIONS
                </div>
              </div>
              <Button variant="outline" size="sm" onClick={() => { setEditing({ ...it }); setOpen(true); }} className="rounded-none border-white/20"><Edit className="w-3 h-3" /></Button>
              <Button variant="outline" size="sm" onClick={() => remove(it.id)} className="rounded-none border-white/20 hover:text-[#dc143c]"><Trash2 className="w-3 h-3" /></Button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-2">
      <Label className="font-mono text-[10px] tracking-[0.3em] uppercase text-white/60">{label}</Label>
      {children}
    </div>
  );
}
