import { NextRequest, NextResponse } from "next/server";

const SHOPIFY_URL = process.env.NEXT_PUBLIC_SHOPIFY_STORE_API_URL!;
const SHOPIFY_TOKEN = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN!;

/**
 * POST /api/auth/forgot-password
 * Body: { email: string }
 *
 * Triggers Shopify's built-in password-recovery email.
 * Always returns 200 (security: don't reveal if email exists).
 */
export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();
    if (!email || typeof email !== "string") {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    await fetch(SHOPIFY_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token": SHOPIFY_TOKEN,
      },
      body: JSON.stringify({
        query: `
          mutation customerRecover($email: String!) {
            customerRecover(email: $email) {
              customerUserErrors {
                code
                field
                message
              }
            }
          }
        `,
        variables: { email: email.toLowerCase().trim() },
      }),
      cache: "no-store",
    });

    // Always return success — never reveal whether the email exists
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[forgot-password]", err);
    // Still return 200 to prevent email enumeration
    return NextResponse.json({ ok: true });
  }
}
