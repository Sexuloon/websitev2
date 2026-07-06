import { Metadata } from "next";
import ContactUsClient from "./ContactUsClient";

export const metadata: Metadata = {
  title: "Contact Us | Sexuloon",
  description: "Get in touch with Sexuloon. We are here to assist you with any inquiries or feedback regarding our sexual wellness products.",
  alternates: {
    canonical: "https://www.sexuloon.com/contactus",
  },
  openGraph: {
    title: "Contact Us | Sexuloon",
    description: "Reach out to Sexuloon for product queries, order support, or doctor consultation inquiries.",
    url: "https://www.sexuloon.com/contactus",
    type: "website",
  },
};

const contactJsonLd = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  name: "Contact Sexuloon",
  url: "https://www.sexuloon.com/contactus",
  isPartOf: { "@id": "https://www.sexuloon.com/#website" },
  description: "Contact Sexuloon for product queries, order support, or doctor consultation inquiries.",
  breadcrumb: {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.sexuloon.com" },
      { "@type": "ListItem", position: 2, name: "Contact Us", item: "https://www.sexuloon.com/contactus" },
    ],
  },
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactJsonLd) }}
      />
      <ContactUsClient />
    </>
  );
}
