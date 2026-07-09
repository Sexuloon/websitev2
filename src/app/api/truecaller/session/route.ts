import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

/**
 * GET /api/truecaller/session
 * Returns the pending Truecaller session (if any) and immediately clears it.
 * Called by the client after redirect from /auth?tc_success=1
 */
export async function GET(request: NextRequest) {
  const cookieStore = await cookies();
  const raw = cookieStore.get("tc_session")?.value;

  if (!raw) {
    return NextResponse.json({ session: null });
  }

  try {
    const session = JSON.parse(raw);

    // Clear the session cookie immediately (one-time use)
    const response = NextResponse.json({ session });
    response.cookies.delete("tc_session");
    return response;
  } catch {
    return NextResponse.json({ session: null });
  }
}
