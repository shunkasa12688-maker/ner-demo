import { NextResponse } from "next/server";
import { getSample } from "@/lib/state-store";

export const dynamic = "force-dynamic";

export async function GET() {
  const sample = await getSample();
  return NextResponse.json(sample, {
    headers: { "Cache-Control": "no-store" },
  });
}
