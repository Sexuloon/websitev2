import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getCustomerProfile } from "@/lib/shopify-auth";
import AccountClient from "./AccountClient";

export const metadata = {
  title: "My Account | Sexuloon",
  description: "View your orders, manage addresses, and update your profile.",
};

export default async function AccountPage() {
  const cookieStore = cookies();
  const token = cookieStore.get("customerAccessToken")?.value;

  if (!token) redirect("/?auth_required=1");

  const customer = await getCustomerProfile(token);
  if (!customer) redirect("/?auth_required=1");

  return <AccountClient customer={customer} />;
}
