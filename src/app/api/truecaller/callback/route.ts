import { NextRequest, NextResponse } from "next/server";
import { tcSessions } from "@/lib/truecaller-store";

const TC_PROFILE_URL = "https://profile4.truecaller.com/v1/default";

interface TruecallerProfile {
  name?: { first?: string; last?: string };
  onlineIdentities?: { email?: string };
  phones?: Array<{ e164Format?: string }>;
}

export async function POST(request: NextRequest) {
  try {
    // Truecaller sends application/x-www-form-urlencoded
    const contentType = request.headers.get("content-type") ?? "";
    let accessToken = "";
    let requestId = "";
    let endpoint = "";

    if (contentType.includes("application/x-www-form-urlencoded")) {
      const text = await request.text();
      const params = new URLSearchParams(text);
      accessToken = params.get("accessToken") ?? "";
      requestId = params.get("requestId") ?? "";
      endpoint = params.get("endpoint") ?? "";
    } else {
      // Try JSON fallback
      const body = await request.json().catch(() => ({}));
      accessToken = body.accessToken ?? "";
      requestId = body.requestId ?? "";
      endpoint = body.endpoint ?? "";
    }

    if (!accessToken || !requestId) {
      console.error("[TC callback] Missing accessToken or requestId");
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    // Fetch verified profile from Truecaller
    const profileUrl = endpoint || TC_PROFILE_URL;
    const profileRes = await fetch(profileUrl, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    if (!profileRes.ok) {
      console.error("[TC callback] Profile fetch failed:", profileRes.status);
      // Mark as failed
      if (tcSessions.has(requestId)) {
        tcSessions.set(requestId, {
          status: "failed",
          createdAt: tcSessions.get(requestId)!.createdAt,
        });
      }
      return NextResponse.json({ error: "Profile fetch failed" }, { status: 502 });
    }

    const profile: TruecallerProfile = await profileRes.json();

    const firstName = profile.name?.first ?? "";
    const lastName = profile.name?.last ?? "";
    const email = profile.onlineIdentities?.email ?? "";
    const rawPhone = profile.phones?.[0]?.e164Format ?? "";
    const phone = rawPhone.startsWith("+") ? rawPhone : `+${rawPhone}`;

    // Store verified profile — the client is polling for this
    tcSessions.set(requestId, {
      status: "verified",
      createdAt: Date.now(),
      profile: { firstName, lastName, email, phone },
    });

    console.log(`[TC callback] Verified: ${firstName} ${lastName} (${phone})`);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[TC callback] Error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

// Truecaller may also send a GET to verify the endpoint is live
export async function GET() {
  return NextResponse.json({ status: "ok" });
}
