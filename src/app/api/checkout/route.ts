import { NextRequest, NextResponse } from "next/server";

const SHOPIFY_URL = process.env.NEXT_PUBLIC_SHOPIFY_STORE_API_URL!;
const SHOPIFY_TOKEN = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN!;

/**
 * POST /api/checkout
 * Body: { cartId: string }
 *
 * Associates the cart with the logged-in customer so Shopify's hosted
 * checkout pre-fills their details and skips the "sign in" prompt.
 * Returns the final checkout URL to redirect to.
 */
export async function POST(request: NextRequest) {
  try {
    const { cartId } = await request.json();
    if (!cartId) {
      return NextResponse.json({ error: "cartId required" }, { status: 400 });
    }

    const customerAccessToken = request.cookies.get("customerAccessToken")?.value;

    // If not logged in, just return the standard checkout URL
    if (!customerAccessToken) {
      const url = await getCheckoutUrl(cartId);
      return NextResponse.json({ checkoutUrl: url });
    }

    // Associate the cart with the customer — this makes Shopify's checkout
    // pre-fill their email/address and skip the sign-in prompt
    const res = await fetch(SHOPIFY_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token": SHOPIFY_TOKEN,
      },
      body: JSON.stringify({
        query: `
          mutation UpdateBuyer($cartId: ID!, $buyerIdentity: CartBuyerIdentityInput!) {
            cartBuyerIdentityUpdate(cartId: $cartId, buyerIdentity: $buyerIdentity) {
              cart {
                id
                checkoutUrl
              }
              userErrors {
                field
                message
              }
            }
          }
        `,
        variables: {
          cartId,
          buyerIdentity: {
            customerAccessToken,
          },
        },
      }),
      cache: "no-store",
    });

    const data = await res.json();
    const cart = data?.data?.cartBuyerIdentityUpdate?.cart;
    const errors = data?.data?.cartBuyerIdentityUpdate?.userErrors ?? [];

    if (errors.length > 0) {
      console.warn("[checkout] cartBuyerIdentityUpdate errors:", errors);
    }

    const checkoutUrl = cart?.checkoutUrl ?? (await getCheckoutUrl(cartId));

    return NextResponse.json({ checkoutUrl });
  } catch (err) {
    console.error("[checkout]", err);
    return NextResponse.json({ error: "Failed to prepare checkout" }, { status: 500 });
  }
}

// Fallback: just fetch the checkout URL from the cart
async function getCheckoutUrl(cartId: string): Promise<string> {
  const res = await fetch(SHOPIFY_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": SHOPIFY_TOKEN,
    },
    body: JSON.stringify({
      query: `query GetCart($id: ID!) { cart(id: $id) { checkoutUrl } }`,
      variables: { id: cartId },
    }),
    cache: "no-store",
  });
  const data = await res.json();
  return data?.data?.cart?.checkoutUrl ?? "";
}
