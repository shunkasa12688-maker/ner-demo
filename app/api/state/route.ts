import { NextResponse } from "next/server";
import { getState, updateState } from "@/lib/state-store";

export const dynamic = "force-dynamic";

export async function GET() {
  const state = await getState();
  return NextResponse.json(state, {
    headers: { "Cache-Control": "no-store" },
  });
}

export async function POST(req: Request) {
  const body = await req.json();
  const next = await updateState(body);
  return NextResponse.json(next, {
    headers: { "Cache-Control": "no-store" },
  });
}
