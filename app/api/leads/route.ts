import { NextResponse } from "next/server";

import { adminDb } from "@/lib/firebase/admin";
import { LeadSchema } from "@/lib/schemas";

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = LeadSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed", issues: parsed.error.flatten() },
      { status: 422 },
    );
  }

  try {
    const ref = await adminDb()
      .collection("leads")
      .add({
        ...parsed.data,
        status: "new",
        createdAt: new Date().toISOString(),
      });
    return NextResponse.json({ ok: true, id: ref.id });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Failed to save lead" },
      { status: 500 },
    );
  }
}
