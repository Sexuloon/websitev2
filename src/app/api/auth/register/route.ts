import { NextRequest, NextResponse } from "next/server";
import { registerCustomer } from "@/lib/shopify-auth";

/** POST /api/auth/register — email + password + name */
export async function POST(request: NextRequest) {
  try {
    const { email, password, firstName, lastName } = await request.json();
    if (!email || !password) {
      return NextResponse.json({ error: "Email and password required" }, { status: 400 });
    }

    const token = await registerCustomer({
      email: email.toLowerCase().trim(),
      password,
      firstName: firstName ?? "",
      lastName: lastName ?? "",
    });

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
      { error: err instanceof Error ? err.message : "Registration failed" },
      { status: 400 }
    );
  }
}
