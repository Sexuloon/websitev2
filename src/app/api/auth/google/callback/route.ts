import { NextRequest, NextResponse } from "next/server";
import { findOrCreateCustomer } from "@/lib/shopify-auth";

/**
 * GET /api/auth/google/callback
 * Handles the OAuth code exchange and creates the Shopify session.
 */
export async function GET(request: NextRequest) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL!;

  try {
    const { searchParams } = request.nextUrl;
    const code = searchParams.get("code");
    const state = searchParams.get("state");
    const storedState = request.cookies.get("google_oauth_state")?.value;

    // CSRF check
    if (!state || state !== storedState) {
      return NextResponse.redirect(`${siteUrl}/?auth_error=state_mismatch`);
    }

    if (!code) {
      return NextResponse.redirect(`${siteUrl}/?auth_error=no_code`);
    }

    const clientId = process.env.GOOGLE_CLIENT_ID!;
    const clientSecret = process.env.GOOGLE_CLIENT_SECRET!;
    const redirectUri = `${siteUrl}/api/auth/google/callback`;

    // Exchange code for tokens
    const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        code,
        client_id: clientId,
        client_secret: clientSecret,
        redirect_uri: redirectUri,
        grant_type: "authorization_code",
      }),
    });

    const tokenData = await tokenRes.json();
    if (!tokenData.access_token) {
      console.error("[Google OAuth] Token exchange failed:", tokenData);
      return NextResponse.redirect(`${siteUrl}/?auth_error=token_exchange`);
    }

    // Fetch Google user profile
    const profileRes = await fetch("https://www.googleapis.com/oauth2/v2/userinfo", {
      headers: { Authorization: `Bearer ${tokenData.access_token}` },
    });

    const profile = await profileRes.json();
    if (!profile.email) {
      return NextResponse.redirect(`${siteUrl}/?auth_error=no_email`);
    }

    // Find or create Shopify customer
    const token = await findOrCreateCustomer({
      email: profile.email.toLowerCase(),
      firstName: profile.given_name ?? "",
      lastName: profile.family_name ?? "",
    });

    // Set cookie and redirect home
    const response = NextResponse.redirect(`${siteUrl}/?auth_success=google`);
    response.cookies.set("customerAccessToken", token.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 30,
      path: "/",
    });
    // Clear state cookie
    response.cookies.delete("google_oauth_state");

    return response;
  } catch (err) {
    console.error("[Google OAuth callback]", err);
    return NextResponse.redirect(`${siteUrl}/?auth_error=server_error`);
  }
}
