import AllCollections from "@/components/view/AllCollections";
import SideShow from "@/components/ui/sidebar";
import MainPage from "@/components/ui/mainpage";
import Bot from "@/components/view/bot/bot";
import CleanCartInfo from "@/lib/cleanCartInfo";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sexuloon – India's Most Trusted Sexual Wellness Brand",
  description: "Shop natural Ayurveda & Unani remedies for premature ejaculation, erectile dysfunction, and low testosterone. Trusted by thousands of Indian men. Discreet delivery.",
  alternates: {
    canonical: "https://www.sexuloon.com",
  },
  openGraph: {
    title: "Sexuloon – India's Most Trusted Sexual Wellness Brand",
    description: "Shop natural Ayurveda & Unani remedies for men's sexual health. Discreet delivery across India.",
    url: "https://www.sexuloon.com",
    type: "website",
  },
};

const homePageJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": "https://www.sexuloon.com/#webpage",
  url: "https://www.sexuloon.com",
  name: "Sexuloon – India's Most Trusted Sexual Wellness Brand",
  description: "Natural remedies for men's sexual health. Premature ejaculation, erectile dysfunction, low testosterone. Ayurveda & Unani solutions + MBBS doctor consultations.",
  isPartOf: { "@id": "https://www.sexuloon.com/#website" },
  about: { "@id": "https://www.sexuloon.com/#organization" },
  breadcrumb: {
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://www.sexuloon.com",
      },
    ],
  },
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homePageJsonLd) }}
      />
      <main className="relative">
        <CleanCartInfo />
        <section>
          <AllCollections />
        </section>
        <section className="relative">
          <SideShow />
        </section>
        <section className="relative">
          <MainPage />
        </section>
        <section>
          <Bot />
        </section>
      </main>
    </>
  );
}
