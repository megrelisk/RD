"use client";

import { CollectionEditor, type FieldDef } from "@/components/admin/CollectionEditor";
import { COLLECTIONS } from "@/lib/firebase/collections";

const fields: FieldDef[] = [
  { name: "platform", label: "PLATFORM", type: "select", required: true, options: ["instagram", "tiktok", "youtube", "twitter", "facebook"] },
  { name: "handle", label: "HANDLE", type: "text", required: true, helper: "@username" },
  { name: "url", label: "URL", type: "url", required: true },
  { name: "followers", label: "FOLLOWERS", type: "number", required: true },
  { name: "order", label: "ORDER", type: "number" },
];

export default function SocialsAdmin() {
  return (
    <CollectionEditor
      collectionName={COLLECTIONS.socials}
      title="SOCIAL CHANNELS"
      description="Powers the hero top-bar reach counter & footer links."
      fields={fields}
    />
  );
}
