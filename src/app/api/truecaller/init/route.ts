import { NextResponse } from "next/server";
import { randomBytes } from "crypto";
import { tcSessions, pruneSessions } from "@/lib/truecaller-store";

export async function GET() {
  try {
    pruneSessions(); // Clean up expired entries

    const nonce = randomBytes(16).toString("hex");

    // Register as "pending" so poll endpoint knows it's a valid nonce
    tcSessions.set(nonce, {
      status: "pending",
      createdAt: Date.now(),
    });

    return NextResponse.json({ nonce });
  } catch (error) {
    console.error("[Truecaller init]", error);
    return NextResponse.json({ error: "Failed to init" }, { status: 500 });
  }
}
