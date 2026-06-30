import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Refund Policy | Sexuloon",
  description: "Read the refund and replacement policy for Sexuloon.",
};

export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>;
}
