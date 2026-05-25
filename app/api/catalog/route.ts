import { NextResponse } from "next/server";
import { getCatalog, updateCatalogEntry } from "@/lib/state-store";
import type { InterventionKind } from "@/lib/types";

export const dynamic = "force-dynamic";

export async function GET() {
  const catalog = await getCatalog();
  return NextResponse.json(catalog, {
    headers: { "Cache-Control": "no-store" },
  });
}

export async function POST(req: Request) {
  const body = (await req.json()) as {
    kind: InterventionKind;
    title?: string;
    blurb?: string;
    whyDefault?: string;
  };
  if (!body?.kind) {
    return NextResponse.json({ error: "kind required" }, { status: 400 });
  }
  const { kind, ...patch } = body;
  const updated = await updateCatalogEntry(kind, patch);
  return NextResponse.json(updated, {
    headers: { "Cache-Control": "no-store" },
  });
}
