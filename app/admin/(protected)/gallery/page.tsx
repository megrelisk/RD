"use client";

import { CollectionEditor, type FieldDef } from "@/components/admin/CollectionEditor";
import { COLLECTIONS } from "@/lib/firebase/collections";

const fields: FieldDef[] = [
  { name: "imageUrl", label: "PHOTO", type: "image", required: true },
  { name: "alt", label: "ALT TEXT / CAPTION", type: "text" },
  { name: "hoverVideoUrl", label: "HOVER VIDEO (OPTIONAL)", type: "video", helper: "Plays on hover" },
  { name: "cols", label: "COLUMN SPAN (1-4)", type: "number" },
  { name: "rows", label: "ROW SPAN (1-3)", type: "number" },
  { name: "order", label: "ORDER", type: "number" },
];

export default function GalleryAdmin() {
  return (
    <CollectionEditor
      collectionName={COLLECTIONS.gallery}
      title="GALLERY"
      description="Bento-grid photos. Mix cols/rows (1-4 / 1-3) for visual interest. 8-12 items recommended."
      fields={fields}
    />
  );
}
