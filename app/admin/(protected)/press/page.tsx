"use client";

import { CollectionEditor, type FieldDef } from "@/components/admin/CollectionEditor";
import { COLLECTIONS } from "@/lib/firebase/collections";

const fields: FieldDef[] = [
  { name: "outlet", label: "OUTLET NAME", type: "text", required: true },
  { name: "title", label: "ARTICLE TITLE", type: "text" },
  { name: "url", label: "ARTICLE URL", type: "url", required: true },
  { name: "date", label: "DATE (YYYY-MM-DD)", type: "text" },
  { name: "logoUrl", label: "OUTLET LOGO", type: "image" },
  { name: "order", label: "ORDER", type: "number" },
];

export default function PressAdmin() {
  return (
    <CollectionEditor
      collectionName={COLLECTIONS.press}
      title="PRESS COVERAGE"
      description="Media features. Outlet name + URL minimum. Logo optional but adds credibility."
      fields={fields}
    />
  );
}
