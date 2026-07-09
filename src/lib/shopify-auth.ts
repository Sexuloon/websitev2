/**
 * shopify-auth.ts
 * ──────────────────────────────────────────────────────────────────────────────
 * Server-side utility for Shopify customer auth.
 *
 * Strategy: Every OAuth login (Truecaller / Google) maps to ONE Shopify
 * customer by email. The password is deterministic:
 *   HMAC-SHA256(email, SHOPIFY_AUTH_SECRET)
 * This means the same email always gets the same password, across all
 * devices and login methods. No database required.
 */

import { createHmac } from "crypto";

const SHOPIFY_URL = process.env.NEXT_PUBLIC_SHOPIFY_STORE_API_URL!;
const SHOPIFY_TOKEN = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN!;
const AUTH_SECRET = process.env.SHOPIFY_AUTH_SECRET;

// ─── Helpers ──────────────────────────────────────────────────────────────────

/** Deterministic password for OAuth accounts — never shown to user */
export function derivePassword(email: string): string {
  if (!AUTH_SECRET) throw new Error("Auth service not configured. Please contact support.");
  return "Sx!" + createHmac("sha256", AUTH_SECRET).update(email.toLowerCase()).digest("base64url").slice(0, 32);
}

async function shopify<T = unknown>(query: string, variables: Record<string, unknown>): Promise<T> {
  const res = await fetch(SHOPIFY_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": SHOPIFY_TOKEN,
    },
    body: JSON.stringify({ query, variables }),
    cache: "no-store",
  });
  const json = await res.json();
  if (json.errors) throw new Error(json.errors[0].message);
  return json.data as T;
}

// ─── Exported Functions ───────────────────────────────────────────────────────

export interface ShopifyCustomerToken {
  accessToken: string;
  expiresAt: string;
}

/**
 * Find-or-create a Shopify customer for OAuth users (Truecaller, Google).
 * Returns a fresh customerAccessToken.
 */
export async function findOrCreateCustomer(params: {
  email: string;
  firstName?: string;
  lastName?: string;
}): Promise<ShopifyCustomerToken> {
  const { email, firstName = "User", lastName = "" } = params;
  const password = derivePassword(email);

  // 1. Try to log in — account may already exist
  const loginData = await shopify<any>(
    `mutation Login($input: CustomerAccessTokenCreateInput!) {
       customerAccessTokenCreate(input: $input) {
         customerAccessToken { accessToken expiresAt }
         customerUserErrors { code message }
       }
     }`,
    { input: { email, password } }
  );

  const existing = loginData?.customerAccessTokenCreate?.customerAccessToken;
  if (existing?.accessToken) return existing;

  // 2. Account doesn't exist — create it
  const createData = await shopify<any>(
    `mutation CreateCustomer($input: CustomerCreateInput!) {
       customerCreate(input: $input) {
         customer { id email }
         customerUserErrors { code message }
       }
     }`,
    {
      input: {
        firstName,
        lastName,
        email,
        password,
        acceptsMarketing: false,
      },
    }
  );

  const createErrors = createData?.customerCreate?.customerUserErrors ?? [];
  // TAKEN means account exists but password mismatch — shouldn't happen but handle gracefully
  if (createErrors.length > 0 && !createErrors.some((e: any) => e.code === "TAKEN")) {
    throw new Error(createErrors[0].message);
  }

  // 3. Log in with the new (or existing-with-wrong-password) account
  const tokenData = await shopify<any>(
    `mutation Login($input: CustomerAccessTokenCreateInput!) {
       customerAccessTokenCreate(input: $input) {
         customerAccessToken { accessToken expiresAt }
         customerUserErrors { code message }
       }
     }`,
    { input: { email, password } }
  );

  const token = tokenData?.customerAccessTokenCreate?.customerAccessToken;
  if (!token?.accessToken) {
    const errs = tokenData?.customerAccessTokenCreate?.customerUserErrors ?? [];
    throw new Error(errs[0]?.message ?? "Failed to create access token");
  }

  return token;
}

/** Standard email+password login for the manual form */
export async function loginWithPassword(email: string, password: string): Promise<ShopifyCustomerToken> {
  const data = await shopify<any>(
    `mutation Login($input: CustomerAccessTokenCreateInput!) {
       customerAccessTokenCreate(input: $input) {
         customerAccessToken { accessToken expiresAt }
         customerUserErrors { code message }
       }
     }`,
    { input: { email, password } }
  );

  const token = data?.customerAccessTokenCreate?.customerAccessToken;
  const errors = data?.customerAccessTokenCreate?.customerUserErrors ?? [];
  if (!token?.accessToken) throw new Error(errors[0]?.message ?? "Invalid email or password");
  return token;
}

/** Register a new Shopify customer with an explicit password (from the signup form) */
export async function registerCustomer(params: {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
}): Promise<ShopifyCustomerToken> {
  const { email, password, firstName = "", lastName = "" } = params;

  const createData = await shopify<any>(
    `mutation CreateCustomer($input: CustomerCreateInput!) {
       customerCreate(input: $input) {
         customer { id email }
         customerUserErrors { code message }
       }
     }`,
    { input: { firstName, lastName, email, password, acceptsMarketing: false } }
  );

  const errors = createData?.customerCreate?.customerUserErrors ?? [];
  if (errors.length > 0) throw new Error(errors[0].message);

  return loginWithPassword(email, password);
}

/** Fetch full customer profile for account page */
export async function getCustomerProfile(accessToken: string) {
  const data = await shopify<any>(
    `query GetCustomer($token: String!) {
       customer(customerAccessToken: $token) {
         id
         firstName
         lastName
         email
         phone
         createdAt
         orders(first: 20, sortKey: PROCESSED_AT, reverse: true) {
           edges {
             node {
               id
               name
               orderNumber
               processedAt
               fulfillmentStatus
               financialStatus
               currentTotalPrice { amount currencyCode }
               lineItems(first: 5) {
                 edges {
                   node {
                     title
                     quantity
                     variant {
                       image { url altText }
                       price { amount currencyCode }
                       selectedOptions { name value }
                     }
                   }
                 }
               }
             }
           }
         }
         addresses(first: 10) {
           edges {
             node {
               id
               address1
               address2
               city
               province
               country
               zip
               phone
               firstName
               lastName
             }
           }
         }
         defaultAddress {
           id
           address1
           address2
           city
           province
           country
           zip
         }
       }
     }`,
    { token: accessToken }
  );
  return data?.customer ?? null;
}
