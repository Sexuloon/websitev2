import type { Metadata } from "next";
import FAQClient from "./FAQClient";

export const metadata: Metadata = {
  title: "FAQ – Frequently Asked Questions | Sexuloon",
  description: "Find answers to common questions about Sexuloon's sexual wellness products, doctor consultations, privacy policy, delivery, and more.",
  alternates: {
    canonical: "https://www.sexuloon.com/faq",
  },
  openGraph: {
    title: "FAQ – Frequently Asked Questions | Sexuloon",
    description: "Common questions about Sexuloon's products, doctor consultations, privacy, and delivery.",
    url: "https://www.sexuloon.com/faq",
    type: "website",
  },
};

// FAQPage schema — Google uses this for FAQ rich results in search
const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "@id": "https://www.sexuloon.com/faq#faqpage",
  url: "https://www.sexuloon.com/faq",
  name: "Frequently Asked Questions – Sexuloon",
  isPartOf: { "@id": "https://www.sexuloon.com/#website" },
  mainEntity: [
    {
      "@type": "Question",
      name: "What is Sexuloon?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Sexuloon is your trusted partner for men's sexual wellness. From Ayurveda & Unani solutions to MBBS doctor consultations, we offer confidential, discreet care for men's health.",
      },
    },
    {
      "@type": "Question",
      name: "Who can use Sexuloon?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Any man aged 18+ who wants to improve his sexual health can use Sexuloon.",
      },
    },
    {
      "@type": "Question",
      name: "Will anyone know I ordered from Sexuloon?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. Every product is delivered in 100% discreet packaging with no mention of sexual health on the outside.",
      },
    },
    {
      "@type": "Question",
      name: "Are the medicines safe?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Absolutely. Our natural remedies are made with certified Ayurveda & Unani ingredients. Modern treatments are prescribed only by MBBS-certified doctors.",
      },
    },
    {
      "@type": "Question",
      name: "Do I need a prescription to buy from Sexuloon?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Not always. Ayurveda & Unani remedies are available without a prescription. For modern allopathic medicines, you'll need a doctor's prescription, which you can obtain through our online consultation.",
      },
    },
    {
      "@type": "Question",
      name: "Can I talk to a doctor online on Sexuloon?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes! You can book a private consultation with our MBBS-certified doctors anytime from the comfort of your home. Consultations start at ₹350.",
      },
    },
    {
      "@type": "Question",
      name: "What problems can Sexuloon help with?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Sexuloon helps with premature ejaculation, erectile dysfunction, low testosterone, and overall sexual performance using natural and clinically-backed treatments.",
      },
    },
    {
      "@type": "Question",
      name: "Where does Sexuloon deliver?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Sexuloon delivers across India with safe, discreet, and fast delivery.",
      },
    },
    {
      "@type": "Question",
      name: "How much does a doctor consultation cost on Sexuloon?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Doctor consultations on Sexuloon start at just ₹350.",
      },
    },
  ],
};

export default function FAQPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <FAQClient />
    </>
  );
}