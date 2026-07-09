import { NextRequest, NextResponse } from "next/server";
import { getCustomerProfile } from "@/lib/shopify-auth";

/** GET /api/auth/me — returns the logged-in customer profile from the cookie */
export async function GET(request: NextRequest) {
  const token = request.cookies.get("customerAccessToken")?.value;
  if (!token) {
    return NextResponse.json({ customer: null }, { status: 401 });
  }

  try {
    const customer = await getCustomerProfile(token);
    if (!customer) {
      // Token expired — clear it
      const response = NextResponse.json({ customer: null }, { status: 401 });
      response.cookies.delete("customerAccessToken");
      return response;
    }
    return NextResponse.json({ customer });
  } catch {
    return NextResponse.json({ customer: null }, { status: 401 });
  }
}
