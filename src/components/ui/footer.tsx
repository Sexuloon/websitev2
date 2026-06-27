"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

type FooterSection = {
  key: "quick" | "conditions" | "support";
  title: string;
  links: { href: string; label: string }[];
};

const sections: FooterSection[] = [
  {
    key: "quick",
    title: "Quick Links",
    links: [
      { href: "/", label: "Home" },
      { href: "/collections/all-products", label: "Products" },
      { href: "/consultancy", label: "Consultations" },
      { href: "/aboutus", label: "About Us" },
      { href: "/contactus", label: "Contact" },
    ],
  },
  {
    key: "conditions",
    title: "Conditions",
    links: [
      { href: "/collections/all-products", label: "Erectile Dysfunction" },
      { href: "/collections/all-products", label: "Premature Ejaculation" },
      { href: "/collections/all-products", label: "Low Testosterone" },
      { href: "/collections/all-products", label: "Performance Anxiety" },
    ],
  },
  {
    key: "support",
    title: "Support",
    links: [
      { href: "/privacy&policy", label: "Privacy Policy" },
      { href: "/terms&conditions", label: "Terms & Conditions" },
      { href: "/refundpolicy", label: "Refund Policy" },
      { href: "/Refund&ReplacementPolicy", label: "Refund & Replacement" },
      { href: "/ShippingPolicy", label: "Shipping Policy" },
    ],
  },
];

const Footer = () => {
  const [openMenu, setOpenMenu] = useState<Record<string, boolean>>({});
  const toggle = (key: string) =>
    setOpenMenu((prev) => ({ ...prev, [key]: !prev[key] }));

  return (
    <footer className="bg-gray-50 dark:bg-[#080808] border-t border-gray-200 dark:border-[#1e1e1e] text-gray-900 dark:text-[#F5F0E8] w-full transition-colors duration-300">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16">

        {/* ── Mobile accordion ────────────────────────────── */}
        <div className="md:hidden space-y-5">
          {/* Logo */}
          <div className="flex flex-col gap-3 pb-6 border-b border-gray-200 dark:border-[#1e1e1e]">
            <div className="relative w-28 h-10">
              <Image
                src="/Web_Icon-removebg-preview.png"
                alt="Sexuloon Logo"
                fill
                className="object-contain dark:brightness-0 dark:invert"
              />
            </div>
            <p className="text-gray-600 dark:text-[#7A6E62] text-sm leading-relaxed max-w-xs">
              Empowering men&apos;s sexual health with natural Unani formulations
              and personalized care.
            </p>
          </div>

          {sections.map(({ key, title, links }) => (
            <div
              key={key}
              className="border border-gray-200 dark:border-[#1e1e1e] rounded-xl overflow-hidden shadow-sm dark:shadow-none"
            >
              <button
                onClick={() => toggle(key)}
                className="w-full flex items-center justify-between px-4 py-3.5 font-semibold text-gray-900 dark:text-[#F5F0E8] text-sm bg-white dark:bg-[#111111] hover:bg-gray-100 dark:hover:bg-[#181818] transition-colors"
              >
                {title}
                <ChevronDown
                  className={`w-4 h-4 text-[#C9A84C] transition-transform duration-300 ${
                    openMenu[key] ? "rotate-180" : ""
                  }`}
                />
              </button>
              {openMenu[key] && (
                <ul className="px-4 py-3 space-y-2.5 bg-gray-50 dark:bg-[#0d0d0d]">
                  {links.map(({ href, label }) => (
                    <li key={label}>
                      <Link
                        href={href}
                        className="text-gray-600 dark:text-[#7A6E62] text-sm hover:text-black dark:hover:text-[#C9A84C] transition-colors block"
                      >
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>

        {/* ── Desktop grid ─────────────────────────────────── */}
        <div className="hidden md:grid grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Logo + Description */}
          <div className="flex flex-col gap-4">
            <div className="relative w-32 h-10">
              <Image
                src="/Web_Icon-removebg-preview.png"
                alt="Sexuloon Logo"
                fill
                className="object-contain dark:brightness-0 dark:invert"
              />
            </div>
            <p className="text-gray-600 dark:text-[#7A6E62] text-sm leading-relaxed">
              Empowering men&apos;s sexual health with natural Unani
              formulations and personalized care.
            </p>
            {/* Gold divider */}
            <div className="w-10 h-0.5 bg-gradient-to-r from-[#C9A84C] to-transparent" />
          </div>

          {sections.map(({ key, title, links }) => (
            <div key={key}>
              <h3 className="text-sm font-bold tracking-wider text-black dark:text-[#C9A84C] uppercase mb-5">
                {title}
              </h3>
              <ul className="space-y-3">
                {links.map(({ href, label }) => (
                  <li key={label}>
                    <Link
                      href={href}
                      className="text-sm text-gray-600 dark:text-[#7A6E62] hover:text-black dark:hover:text-[#E8C87A] transition-colors"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* ── Bottom bar ───────────────────────────────────── */}
        <div className="mt-12 pt-6 border-t border-gray-200 dark:border-[#1e1e1e] flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-gray-500 dark:text-[#7A6E62]">
            © {new Date().getFullYear()} Sexuloon. All rights reserved.
          </p>
          <p className="text-xs text-gray-500 dark:text-[#7A6E62]">
            Made with ❤️ for men&apos;s wellness
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
