import { Metadata } from "next";

export const metadata: Metadata = {
  title: "FAQ | Sexuloon",
  description: "Frequently asked questions about Sexuloon, doctor consultations, natural remedies, privacy, and delivery.",
};

export default function FAQLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>;
}
