import { Metadata } from "next";
import ContactUsClient from "./ContactUsClient";

export const metadata: Metadata = {
  title: "Contact Us | Sexuloon",
  description: "Get in touch with Sexuloon. We are here to assist you with any inquiries or feedback regarding our sexual wellness products.",
};

export default function Page() {
  return <ContactUsClient />;
}
