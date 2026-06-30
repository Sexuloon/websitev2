import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shipping Policy | Sexuloon",
  description: "Shipping and delivery information for Sexuloon products. 100% discreet packaging and delivery.",
};

export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>;
}
