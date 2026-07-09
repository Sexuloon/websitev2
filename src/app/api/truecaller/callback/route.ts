import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

// Truecaller profile API endpoint
const TC_PROFILE_URL = "https://profile4.truecaller.com/v1/default";

interface TruecallerCallbackPayload {
  accessToken?: string;
  requestId?: string;
  endpoint?: string;
  status?: string;
}

interface TruecallerProfile {
  name?: { first?: string; last?: string };
  onlineIdentities?: { email?: string };
  phones?: Array<{ e164Format?: string; countryCode?: string; dialingCode?: string }>;
}

async function shopifyRequest(query: string, variables: Record<string, unknown>) {
  const res = await fetch(process.env.NEXT_PUBLIC_SHOPIFY_STORE_API_URL!, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token":
        process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN!,
    },
    body: JSON.stringify({ query, variables }),
  });
  const json = await res.json();
  return json.data;
}

async function findCustomerByEmail(email: string) {
  const data = await shopifyRequest(
    `query GetCustomer($email: String!) {
       customers(first: 1, query: $email) {
         edges { node { id email firstName lastName } }
       }
     }`,
    { email }
  );
  return data?.customers?.edges?.[0]?.node ?? null;
}

async function createShopifyCustomer(
  firstName: string,
  lastName: string,
  email: string,
  phone: string
) {
  // Generate a strong random password the user never needs to know
  // (they authenticate via Truecaller, not password)
  const randomPassword =
    Math.random().toString(36).slice(-10) +
    Math.random().toString(36).toUpperCase().slice(-4) +
    "!1";

  const data = await shopifyRequest(
    `mutation CreateCustomer($input: CustomerCreateInput!) {
       customerCreate(input: $input) {
         customer { id email firstName lastName }
         customerUserErrors { code message }
       }
     }`,
    {
      input: {
        firstName: firstName || "Truecaller",
        lastName: lastName || "User",
        email,
        password: randomPassword,
        phone,
        acceptsMarketing: false,
      },
    }
  );
  return data?.customerCreate;
}

async function createCustomerToken(email: string, password: string) {
  // We can't create a token without knowing the password for Truecaller-created accounts.
  // Instead we use a session cookie approach — set a "tc_verified" cookie with user info
  // and handle session server-side. Return a synthetic token placeholder.
  // In production, use Shopify Admin API multipass or a custom token strategy.
  return null;
}

export async function POST(request: NextRequest) {
  try {
    const cookieStore = await cookies();
    const storedNonce = cookieStore.get("tc_nonce")?.value;

    const body: TruecallerCallbackPayload = await request.json().catch(() => ({}));

    // Also handle form-encoded POST (Truecaller sends application/x-www-form-urlencoded)
    let accessToken = body.accessToken;
    let requestId = body.requestId;
    let endpoint = body.endpoint;

    if (!accessToken) {
      // Try form-encoded body
      const text = await request.text().catch(() => "");
      const params = new URLSearchParams(text);
      accessToken = params.get("accessToken") ?? undefined;
      requestId = params.get("requestId") ?? undefined;
      endpoint = params.get("endpoint") ?? undefined;
    }

    if (!accessToken) {
      return NextResponse.json({ error: "No access token received" }, { status: 400 });
    }

    // Clear the nonce cookie
    cookieStore.delete("tc_nonce");

    // Fetch the user's Truecaller profile
    const profileUrl = endpoint || TC_PROFILE_URL;
    const profileRes = await fetch(profileUrl, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });

    if (!profileRes.ok) {
      console.error("[Truecaller callback] Profile fetch failed:", profileRes.status);
      return NextResponse.redirect(new URL("/auth?tc_error=profile_failed", request.url));
    }

    const profile: TruecallerProfile = await profileRes.json();

    const firstName = profile.name?.first ?? "";
    const lastName = profile.name?.last ?? "";
    const email = profile.onlineIdentities?.email ?? "";
    const phoneRaw = profile.phones?.[0]?.e164Format ?? "";
    const phone = phoneRaw.startsWith("+") ? phoneRaw : `+${phoneRaw}`;

    if (!email && !phone) {
      return NextResponse.redirect(new URL("/auth?tc_error=no_identity", request.url));
    }

    // Store verified profile in a secure session cookie so the client can finalize login
    const sessionPayload = JSON.stringify({
      firstName,
      lastName,
      email,
      phone,
      verified: true,
      ts: Date.now(),
    });

    const response = NextResponse.redirect(new URL("/auth?tc_success=1", request.url));
    response.cookies.set("tc_session", sessionPayload, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 10, // 10 minutes to complete login
      path: "/",
      sameSite: "lax",
    });

    return response;
  } catch (error) {
    console.error("[Truecaller callback] Unexpected error:", error);
    return NextResponse.redirect(new URL("/auth?tc_error=server_error", request.url));
  }
}

// Handle GET for Truecaller's verification ping
export async function GET(request: NextRequest) {
  return NextResponse.json({ status: "ok", service: "truecaller-callback" });
}
