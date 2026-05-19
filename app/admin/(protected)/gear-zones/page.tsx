"use client";

import { CollectionEditor, type FieldDef } from "@/components/admin/CollectionEditor";
import { COLLECTIONS } from "@/lib/firebase/collections";

const fields: FieldDef[] = [
  { name: "name", label: "ZONE NAME", type: "text", required: true, helper: "E.g. CHEST PLATE, LEFT THIGH" },
  { name: "x", label: "X % (0-100)", type: "number", helper: "Horizontal % from left" },
  { name: "y", label: "Y % (0-100)", type: "number", helper: "Vertical % from top" },
  { name: "width", label: "WIDTH %", type: "number" },
  { name: "height", label: "HEIGHT %", type: "number" },
  { name: "impressions", label: "IMPRESSIONS / FIGHT", type: "number", required: true },
  { name: "priceFromUSD", label: "PRICE FROM (USD)", type: "number", required: true },
  { name: "baseImageUrl", label: "BASE FIGHTER IMAGE (FIRST ZONE ONLY)", type: "image", helper: "Optional: 3:4 portrait" },
  { name: "order", label: "ORDER", type: "number" },
];

export default function GearZonesAdmin() {
  return (
    <CollectionEditor
      collectionName={COLLECTIONS.gearZones}
      title="GEAR ZONES"
      description="Clickable logo placement hotspots on fighter image. Use % coords."
      fields={fields}
    />
  );
}
