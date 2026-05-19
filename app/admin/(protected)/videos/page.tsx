"use client";

import { CollectionEditor, type FieldDef } from "@/components/admin/CollectionEditor";
import { COLLECTIONS } from "@/lib/firebase/collections";

const fields: FieldDef[] = [
  { name: "title", label: "TITLE", type: "text", required: true },
  { name: "category", label: "CATEGORY", type: "select", required: true, options: ["highlight", "training", "walkout", "lifestyle", "interview"] },
  { name: "youtubeId", label: "YOUTUBE VIDEO ID", type: "text", helper: "Only the ID, e.g. dQw4w9WgXcQ" },
  { name: "videoUrl", label: "OR UPLOAD VIDEO", type: "video" },
  { name: "thumbnailUrl", label: "CUSTOM THUMBNAIL", type: "image" },
  { name: "featured", label: "FEATURED", type: "checkbox", helper: "Top of Highlight Reel section" },
  { name: "order", label: "ORDER", type: "number" },
];

export default function VideosAdmin() {
  return (
    <CollectionEditor
      collectionName={COLLECTIONS.videos}
      title="VIDEOS / REEL"
      description="Highlights, walkouts, training, lifestyle. Mark one as Featured for the hero reel."
      fields={fields}
    />
  );
}
