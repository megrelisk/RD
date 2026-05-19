import { NextResponse } from "next/server";

import { adminDb } from "@/lib/firebase/admin";
import { MediaKitRequestSchema } from "@/lib/schemas";

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = MediaKitRequestSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed", issues: parsed.error.flatten() },
      { status: 422 },
    );
  }

  try {
    await adminDb()
      .collection("mediaKitRequests")
      .add({ ...parsed.data, createdAt: new Date().toISOString() });
    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Failed to save request" },
      { status: 500 },
    );
  }
}
