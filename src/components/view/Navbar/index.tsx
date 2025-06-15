"use client";


import { useCartActions } from "@/lib/atoms/cart";
import Link from "next/link";
import { useEffect, useState } from "react";
import CartView from "../Cart/CartView";
import SignIn from "@/components/ui/signin";

function Navbar() {
  const { cart, initializeCart } = useCartActions();

  useEffect(() => {
    if (!cart?.checkoutUrl) {
      initializeCart();
    }
  }, [cart, initializeCart]);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMoreOpen, setIsMoreOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
    setIsMoreOpen(false);
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50 font-geist">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/">
          <h2 className="font-semibold text-2xl sm:text-2xl md:text-2xl lg:text-2xl xl:text-3xl text-blue-600">
            Sexuloon
          </h2>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden min-[1030px]:flex items-center space-x-6">
          {[
            { href: "/", label: "Home" },
            { href: "/collections/all-products", label: "All Products" },
            { href: "/consultation", label: "Consultation" },
          ].map(({ href, label }) => (
            <Link
              key={label}
              href={href}
              className="text-[18px] font-semibold text-black px-4 py-2 rounded-full transition-all duration-200 hover:bg-black hover:text-white"
            >
              {label}
            </Link>
          ))}

          {/* More Dropdown */}
          <div className="relative group">
            <button className="flex items-center gap-1 text-[18px] font-semibold text-black px-4 py-2 rounded-full transition-all duration-200 hover:bg-black hover:text-white">
              More <span className="text-sm">▼</span>
            </button>
            <div className="absolute hidden group-hover:block bg-white border border-gray-200 shadow-lg rounded-lg w-48 z-50">
              {[
                { href: "/contact", label: "Contact Us" },
                { href: "/faq", label: "FAQ" },
                { href: "/aboutus", label: "About Us" },
              ].map(({ href, label }) => (
                <Link
                  key={label}
                  href={href}
                  className="block px-4 py-3 text-[16px] text-black hover:text-blue-800 transition-all rounded-full"
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>
        </nav>

        {/* Actions + Hamburger */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center gap-x-2">
            <CartView />
            <SignIn/>
          </div>

          {/* Hamburger */}
          <button
            className="min-[1030px]:hidden p-2 text-gray-600 focus:outline-none"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-6 h-6"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="min-[1030px]:hidden bg-white py-4 px-4 shadow-md">
          <div className="flex flex-col items-start space-y-4 w-full">
            <Link
              href="/"
              className="w-full text-[18px] font-semibold text-black px-4 py-2 rounded-full hover:bg-black hover:text-white transition-all text-left"
            >
              Home
            </Link>
            <Link
              href="/collections/all-products"
              className="w-full text-[18px] font-semibold text-black px-4 py-2 rounded-full hover:bg-black hover:text-white transition-all text-left"
            >
              All Products
            </Link>
            <Link
              href="/consultation"
              className="w-full text-[18px] font-semibold text-black px-4 py-2 rounded-full hover:bg-black hover:text-white transition-all text-left"
            >
              Consultation
            </Link>

            <button
              onClick={() => setIsMoreOpen(!isMoreOpen)}
              className="w-full flex items-center justify-between text-[18px] font-semibold text-black px-4 py-2 rounded-full hover:bg-black hover:text-white transition-all"
            >
              <span>More</span>
              <span
                className={`transform transition-transform duration-300 ${
                  isMoreOpen ? "rotate-180" : "rotate-0"
                }`}
              >
                ▼
              </span>
            </button>

            {isMoreOpen && (
              <div className="pl-4 flex flex-col space-y-2 w-full">
                <Link
                  href="/contact"
                  className="text-[16px] text-black px-4 py-2 rounded-full hover:bg-black hover:text-white transition-all w-full text-left"
                >
                  Contact Us
                </Link>
                <Link
                  href="/faq"
                  className="text-[16px] text-black px-4 py-2 rounded-full hover:bg-black hover:text-white transition-all w-full text-left"
                >
                  FAQ
                </Link>
                <Link
                  href="/aboutus"
                  className="text-[16px] text-black px-4 py-2 rounded-full hover:bg-black hover:text-white transition-all w-full text-left"
                >
                  About Us
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}

export default Navbar;
