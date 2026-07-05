import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Refund Policy | Sexuloon",
  description: "Read the refund and replacement policy for Sexuloon.",
  robots: { index: true, follow: true },
  alternates: { canonical: "https://www.sexuloon.com/refundpolicy" },
};

export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>;
}
