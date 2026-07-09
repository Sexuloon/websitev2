import { NextRequest, NextResponse } from "next/server";
import { loginWithPassword, registerCustomer } from "@/lib/shopify-auth";

/** POST /api/auth/login — email + password */
export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();
    if (!email || !password) {
      return NextResponse.json({ error: "Email and password required" }, { status: 400 });
    }

    const token = await loginWithPassword(email.toLowerCase().trim(), password);

    const response = NextResponse.json({ ok: true });
    response.cookies.set("customerAccessToken", token.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 30,
      path: "/",
    });
    return response;
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Login failed" },
      { status: 401 }
    );
  }
}
