import { NextRequest, NextResponse } from "next/server";
import { tcSessions } from "@/lib/truecaller-store";

/**
 * GET /api/truecaller/poll?nonce=XXX
 *
 * Client polls this every 2s after firing the deep link.
 * Returns:
 *   { status: "pending" }    – callback not received yet
 *   { status: "verified", profile: {...} }  – ready to log in
 *   { status: "failed" }     – profile fetch failed
 *   { status: "unknown" }    – nonce not found (expired or invalid)
 */
export async function GET(request: NextRequest) {
  const nonce = request.nextUrl.searchParams.get("nonce");

  if (!nonce) {
    return NextResponse.json({ status: "unknown" }, { status: 400 });
  }

  const session = tcSessions.get(nonce);

  if (!session) {
    return NextResponse.json({ status: "unknown" });
  }

  if (session.status === "verified") {
    // One-time retrieval — delete after returning
    tcSessions.delete(nonce);
    return NextResponse.json({ status: "verified", profile: session.profile });
  }

  return NextResponse.json({ status: session.status });
}
