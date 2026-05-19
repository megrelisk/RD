"use client";

import { CollectionEditor, type FieldDef } from "@/components/admin/CollectionEditor";
import { COLLECTIONS } from "@/lib/firebase/collections";

const fields: FieldDef[] = [
  { name: "author", label: "AUTHOR NAME", type: "text", required: true },
  { name: "company", label: "COMPANY", type: "text", required: true },
  { name: "role", label: "ROLE / TITLE", type: "text" },
  { name: "quote", label: "QUOTE", type: "textarea", required: true },
  { name: "photoUrl", label: "AUTHOR PHOTO", type: "image" },
  { name: "videoUrl", label: "VIDEO TESTIMONIAL", type: "video" },
  { name: "rating", label: "RATING (1-5)", type: "number" },
  { name: "order", label: "ORDER", type: "number" },
];

export default function TestimonialsAdmin() {
  return (
    <CollectionEditor
      collectionName={COLLECTIONS.testimonials}
      title="TESTIMONIALS"
      description="Sponsor testimonials. Concrete numbers (e.g. ROI %, sales spike) sell."
      fields={fields}
    />
  );
}
