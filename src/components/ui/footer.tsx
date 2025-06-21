"use client";

import Image from "next/image";
import { useState } from "react";

const Footer = () => {
  const [openMenu, setOpenMenu] = useState({
    quick: false,
    conditions: false,
    support: false,
  });

  const toggleMenu = (key: string) => {
    setOpenMenu((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="w-full">
      <footer className="bg-gray-900 text-white w-full py-12 sm:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* -------- MOBILE ONLY Accordion Footer -------- */}
          <div className="md:hidden space-y-6 text-center">
            <div className="flex flex-col items-center">
              <p className="text-gray-400 text-sm max-w-xs">
                Empowering men&apos;s sexual health with medically proven
                solutions and personalized care.
              </p>
            </div>

            {/* Quick Links Accordion */}
            <div className="bg-gray-800 border border-gray-700 rounded-md overflow-hidden">
              <button
                onClick={() => toggleMenu("quick")}
                className="w-full flex items-center justify-between px-4 py-3 font-semibold text-white"
              >
                Quick Links
                <span
                  className={`transform transition-transform ${
                    openMenu.quick ? "rotate-180" : ""
                  }`}
                >
                  ▼
                </span>
              </button>
              <ul
                className={`px-4 pb-3 space-y-2 text-gray-400 text-lg transition-all duration-300 ${
                  openMenu.quick ? "block" : "hidden"
                }`}
              >
                <li>
                  <a href="#" className="hover:text-white block">
                    Home
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white block">
                    Products
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white block">
                    Consultations
                  </a>
                </li>
                <li>
                  <a href="/aboutus" className="hover:text-white block">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="/contactus" className="hover:text-white block">
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            {/* Conditions Accordion */}
            <div className="bg-gray-800 border border-gray-700 rounded-md overflow-hidden">
              <button
                onClick={() => toggleMenu("conditions")}
                className="w-full flex items-center justify-between px-4 py-3 font-semibold text-white"
              >
                Conditions
                <span
                  className={`transform transition-transform ${
                    openMenu.conditions ? "rotate-180" : ""
                  }`}
                >
                  ▼
                </span>
              </button>
              <ul
                className={`px-4 pb-3 space-y-2 text-gray-400 text-lg transition-all duration-300 ${
                  openMenu.conditions ? "block" : "hidden"
                }`}
              >
                <li>
                  <a href="#" className="hover:text-white block">
                    Erectile Dysfunction
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white block">
                    Premature Ejaculation
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white block">
                    Low Testosterone
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white block">
                    Hair Loss
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white block">
                    Performance Anxiety
                  </a>
                </li>
              </ul>
            </div>

            {/* Support Accordion */}
            <div className="bg-gray-800 border border-gray-700 rounded-md overflow-hidden">
              <button
                onClick={() => toggleMenu("support")}
                className="w-full flex items-center justify-between px-4 py-3 font-semibold text-white"
              >
                Support
                <span
                  className={`transform transition-transform ${
                    openMenu.support ? "rotate-180" : ""
                  }`}
                >
                  ▼
                </span>
              </button>
              <ul
                className={`px-4 pb-3 space-y-2 text-gray-400 text-lg transition-all duration-300 ${
                  openMenu.support ? "block" : "hidden"
                }`}
              >
                <li>
                  <a href="/privacy&policy" className="hover:text-white block">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a
                    href="/terms&conditions"
                    className="hover:text-white block"
                  >
                    Terms & Conditions
                  </a>
                </li>
                <li>
                  <a href="/refundpolicy" className="hover:text-white block">
                    Refund Policy
                  </a>
                </li>
                <li>
                  <a
                    href="/Refund&ReplacementPolicy"
                    className="hover:text-white block"
                  >
                    Refund & Replacement Policy
                  </a>
                </li>
                <li>
                  <a href="/ShippingPolicy" className="hover:text-white block">
                    Shipping Policy
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* -------- DESKTOP Footer Layout -------- */}
          <div className="hidden md:grid grid-cols-2 lg:grid-cols-4 gap-8 mt-8 text-center md:text-left">
            {/* Logo + Description */}
            <div>
              <Image
                src="/logo-white.png"
                alt="Sexuloon Logo"
                width={150}
                height={50}
                className="object-contain mb-4"
              />
              <p className="text-gray-400 text-sm max-w-xs">
                Empowering men&apos;s sexual health with medically proven
                solutions and personalized care.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-semibold mb-2">Quick Links</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <a href="#" className="hover:text-white">
                    Home
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Products
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Consultations
                  </a>
                </li>
                <li>
                  <a href="/aboutus" className="hover:text-white">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="/contactus" className="hover:text-white">
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            {/* Conditions */}
            <div>
              <h3 className="text-lg font-semibold mb-2">Conditions</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <a href="#" className="hover:text-white">
                    Erectile Dysfunction
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Premature Ejaculation
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Low Testosterone
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Hair Loss
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Performance Anxiety
                  </a>
                </li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h3 className="text-lg font-semibold mb-2">Support</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <a href="/privacy&policy" className="hover:text-white">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="/terms&conditions" className="hover:text-white">
                    Terms & Conditions
                  </a>
                </li>
                <li>
                  <a href="/refundpolicy" className="hover:text-white">
                    Refund Policy
                  </a>
                </li>
                <li>
                  <a
                    href="/Refund&ReplacementPolicy"
                    className="hover:text-white"
                  >
                    Refund & Replacement Policy
                  </a>
                </li>
                <li>
                  <a href="/ShippingPolicy" className="hover:text-white">
                    Shipping Policy
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Footer Bottom */}
          <div className="mt-12 border-t border-gray-700 pt-6 text-center text-sm text-gray-500">
            © {new Date().getFullYear()} Sexuloon. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
