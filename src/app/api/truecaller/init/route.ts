import { NextResponse } from "next/server";
import { randomBytes } from "crypto";
import { cookies } from "next/headers";

export async function GET() {
  try {
    // Generate a cryptographically random nonce (16 bytes = 32 hex chars, well within 8-64 char limit)
    const nonce = randomBytes(16).toString("hex");

    // Store the nonce in a short-lived HTTP-only cookie (5 minutes)
    const cookieStore = await cookies();
    cookieStore.set("tc_nonce", nonce, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 5, // 5 minutes
      path: "/",
      sameSite: "lax",
    });

    return NextResponse.json({ nonce });
  } catch (error) {
    console.error("[Truecaller init] Error generating nonce:", error);
    return NextResponse.json(
      { error: "Failed to initialize Truecaller flow" },
      { status: 500 }
    );
  }
}
