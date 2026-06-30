import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Sexuloon",
  description: "Read Sexuloon's privacy policy. We take your privacy and data security very seriously.",
};

export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>;
}
