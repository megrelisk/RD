"use client";

import { CollectionEditor, type FieldDef } from "@/components/admin/CollectionEditor";
import { COLLECTIONS } from "@/lib/firebase/collections";

const fields: FieldDef[] = [
  { name: "title", label: "ACHIEVEMENT TITLE", type: "text", required: true },
  { name: "year", label: "YEAR(S)", type: "text", helper: "E.g. 2025 or 2022-2026" },
  { name: "description", label: "DESCRIPTION", type: "textarea" },
  { name: "iconType", label: "ICON", type: "select", options: ["belt", "trophy", "medal", "ranking"] },
  { name: "order", label: "ORDER", type: "number" },
];

export default function AchievementsAdmin() {
  return (
    <CollectionEditor
      collectionName={COLLECTIONS.achievements}
      title="ACHIEVEMENTS"
      description="Belts, rankings, performance bonuses. Builds authority."
      fields={fields}
    />
  );
}
