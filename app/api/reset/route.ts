import { NextResponse } from "next/server";
import { resetState } from "@/lib/state-store";

export const dynamic = "force-dynamic";

export async function POST() {
  await resetState();
  return NextResponse.json({ ok: true });
}
