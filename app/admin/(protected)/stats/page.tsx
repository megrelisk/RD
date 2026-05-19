"use client";

import { CollectionEditor, type FieldDef } from "@/components/admin/CollectionEditor";
import { COLLECTIONS } from "@/lib/firebase/collections";

const fields: FieldDef[] = [
  { name: "label", label: "LABEL", type: "text", required: true, helper: "E.g. TOTAL REACH / MONTH" },
  { name: "value", label: "VALUE (NUMBER)", type: "number", required: true },
  { name: "prefix", label: "PREFIX", type: "text", helper: "$ for money" },
  { name: "suffix", label: "SUFFIX", type: "text", helper: "M / + / h etc." },
  { name: "icon", label: "LUCIDE ICON NAME", type: "text", helper: "E.g. Eye, AtSign, Zap, TrendingUp, Globe, Video" },
  { name: "order", label: "ORDER", type: "number" },
];

export default function StatsAdmin() {
  return (
    <CollectionEditor
      collectionName={COLLECTIONS.stats}
      title="STATS BAR"
      description="Big-number flex cards on the landing. Show 4-6 for best layout."
      fields={fields}
    />
  );
}
