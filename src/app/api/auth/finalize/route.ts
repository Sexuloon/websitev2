import { NextRequest, NextResponse } from "next/server";
import { findOrCreateCustomer } from "@/lib/shopify-auth";

/**
 * POST /api/auth/finalize
 * Body: { email, firstName?, lastName?, source }
 *
 * Called after any OAuth verification (Truecaller, Google).
 * Finds or creates a Shopify customer and sets the session cookie.
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, firstName, lastName } = body;

    if (!email || typeof email !== "string") {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const token = await findOrCreateCustomer({ email: email.toLowerCase().trim(), firstName, lastName });

    const response = NextResponse.json({ ok: true, firstName, email });
    response.cookies.set("customerAccessToken", token.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 30, // 30 days
      path: "/",
    });

    return response;
  } catch (err) {
    console.error("[auth/finalize]", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Auth failed" },
      { status: 500 }
    );
  }
}
