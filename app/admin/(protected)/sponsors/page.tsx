"use client";

import { CollectionEditor, type FieldDef } from "@/components/admin/CollectionEditor";
import { COLLECTIONS } from "@/lib/firebase/collections";

const fields: FieldDef[] = [
  { name: "name", label: "SPONSOR NAME", type: "text", required: true },
  { name: "logoUrl", label: "LOGO IMAGE", type: "image", required: true },
  { name: "websiteUrl", label: "WEBSITE URL", type: "url" },
  { name: "order", label: "ORDER", type: "number" },
];

export default function SponsorsAdmin() {
  return (
    <CollectionEditor
      collectionName={COLLECTIONS.sponsors}
      title="PAST SPONSORS"
      description="Logos for the trust block marquee. PNGs with transparent bg work best."
      fields={fields}
    />
  );
}
