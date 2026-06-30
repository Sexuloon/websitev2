import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms & Conditions | Sexuloon",
  description: "Terms and conditions for using Sexuloon platform and services.",
};

export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>;
}
