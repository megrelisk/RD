"use client";

import { CollectionEditor, type FieldDef } from "@/components/admin/CollectionEditor";
import { COLLECTIONS } from "@/lib/firebase/collections";

const regionFields: FieldDef[] = [
  { name: "country", label: "COUNTRY", type: "text", required: true },
  { name: "countryCode", label: "ISO CODE (2 LETTERS)", type: "text", required: true, helper: "E.g. US, GB, BR, GE" },
  { name: "percentage", label: "% OF AUDIENCE", type: "number", step: 0.1 },
  { name: "viewers", label: "VIEWER COUNT", type: "number" },
  { name: "order", label: "ORDER", type: "number" },
];

const demoFields: FieldDef[] = [
  { name: "category", label: "CATEGORY", type: "select", required: true, options: ["age", "gender", "income"] },
  { name: "label", label: "LABEL", type: "text", required: true, helper: "E.g. 25-34, Male, $80-120k" },
  { name: "percentage", label: "% OF AUDIENCE", type: "number", step: 0.1 },
  { name: "order", label: "ORDER (WITHIN CATEGORY)", type: "number" },
];

export default function AudienceAdmin() {
  return (
    <div className="space-y-12">
      <CollectionEditor
        collectionName={COLLECTIONS.audienceRegions}
        title="AUDIENCE / REGIONS"
        description="Top countries where the fighter's content is consumed."
        fields={regionFields}
      />
      <hr className="border-white/10" />
      <CollectionEditor
        collectionName={COLLECTIONS.audienceDemographics}
        title="AUDIENCE / DEMOGRAPHICS"
        description="Age / gender / income breakdowns. Order within category."
        fields={demoFields}
      />
    </div>
  );
}
