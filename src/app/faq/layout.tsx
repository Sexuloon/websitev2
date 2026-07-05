import { Metadata } from "next";

export const metadata: Metadata = {
  title: "FAQ | Sexuloon",
  description: "Frequently asked questions about Sexuloon, doctor consultations, natural remedies, privacy, and delivery.",
  robots: { index: true, follow: true },
  alternates: { canonical: "https://www.sexuloon.com/faq" },
};

export default function FAQLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>;
}
