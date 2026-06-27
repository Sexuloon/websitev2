"use client";

import { useCartActions } from "@/lib/atoms/cart";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import CartView from "../Cart/CartView";
import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import { X, Menu, ChevronDown } from "lucide-react";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/collections/all-products", label: "All Products" },
  { href: "/consultancy", label: "Consultation" },
];

const MORE_LINKS = [
  { href: "/contactus", label: "Contact Us" },
  { href: "/faq", label: "FAQ" },
  { href: "/aboutus", label: "About Us" },
];

function Navbar() {
  const { cart, initializeCart } = useCartActions();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    if (!cart?.checkoutUrl) initializeCart();
  }, [cart, initializeCart]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#080808]/95 backdrop-blur-md border-b border-[#262626] shadow-[0_2px_24px_rgba(0,0,0,0.6)]"
          : "bg-[#080808] border-b border-[#1e1e1e]"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link prefetch href="/" className="shrink-0">
          <div className="relative w-[120px] sm:w-[140px] h-[44px] sm:h-[52px]">
            <Image
              src="https://res.cloudinary.com/drw4abclv/image/upload/v1750498548/Sexuloon_o4inzi.png"
              alt="Sexuloon Logo"
              fill
              className="object-contain"
              priority
              style={{ filter: "brightness(0) invert(1)" }}
            />
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden min-[1030px]:flex items-center gap-1">
          {NAV_LINKS.map(({ href, label }) => (
            <Link
              prefetch
              key={label}
              href={href}
              className="text-[15px] font-medium text-[#B8A99A] px-4 py-2 rounded-full transition-all duration-200 hover:text-white hover:bg-[#1a1a1a]"
            >
              {label}
            </Link>
          ))}

          {/* More dropdown */}
          <div className="relative group">
            <button className="flex items-center gap-1.5 text-[15px] font-medium text-[#B8A99A] px-4 py-2 rounded-full transition-all duration-200 hover:text-white hover:bg-[#1a1a1a]">
              More <ChevronDown className="w-3.5 h-3.5 transition-transform group-hover:rotate-180 duration-200" />
            </button>
            <div className="absolute top-full left-0 mt-1 hidden group-hover:block w-48 rounded-xl bg-[#111111] border border-[#262626] shadow-[0_8px_32px_rgba(0,0,0,0.8)] overflow-hidden z-50">
              {MORE_LINKS.map(({ href, label }) => (
                <Link
                  prefetch
                  key={label}
                  href={href}
                  className="block px-4 py-3 text-sm text-[#B8A99A] hover:text-white hover:bg-[#1a1a1a] transition-all"
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <CartView />

          <SignedOut>
            <SignInButton mode="modal">
              <button className="hidden sm:flex items-center justify-center border border-[#C9A84C]/50 text-[#C9A84C] rounded-full font-semibold text-sm h-10 px-5 hover:bg-[#C9A84C]/10 hover:border-[#C9A84C] transition-all duration-200 cursor-pointer">
                Sign In
              </button>
            </SignInButton>
            <SignUpButton mode="modal">
              <button className="flex items-center justify-center bg-[#1a4731] text-white rounded-full font-semibold text-sm h-10 px-5 hover:bg-[#143828] transition-all duration-200 cursor-pointer">
                Sign Up
              </button>
            </SignUpButton>
          </SignedOut>

          <SignedIn>
            <UserButton
              appearance={{
                elements: {
                  avatarBox: "w-9 h-9 sm:w-10 sm:h-10 ring-2 ring-[#C9A84C]/30",
                },
              }}
            />
          </SignedIn>

          {/* Hamburger */}
          <button
            className="min-[1030px]:hidden p-2 text-[#B8A99A] hover:text-white focus:outline-none"
            onClick={() => { setIsMenuOpen((p) => !p); setIsMoreOpen(false); }}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="min-[1030px]:hidden bg-[#0d0d0d] border-t border-[#1e1e1e] py-4 px-4">
          <div className="flex flex-col gap-1">
            {/* Mobile Auth */}
            <SignedOut>
              <div className="flex gap-3 pb-4 mb-2 border-b border-[#1e1e1e]">
                <SignInButton mode="modal">
                  <button className="flex-1 border border-[#C9A84C]/50 text-[#C9A84C] rounded-full font-semibold text-sm h-11 hover:bg-[#C9A84C]/10 transition-all">
                    Sign In
                  </button>
                </SignInButton>
                <SignUpButton mode="modal">
                  <button className="flex-1 bg-[#1a4731] text-white rounded-full font-semibold text-sm h-11 hover:bg-[#143828] transition-all">
                    Sign Up
                  </button>
                </SignUpButton>
              </div>
            </SignedOut>

            {NAV_LINKS.map(({ href, label }) => (
              <Link
                key={label}
                href={href}
                onClick={() => setIsMenuOpen(false)}
                className="text-[16px] font-medium text-[#B8A99A] px-4 py-2.5 rounded-xl hover:text-white hover:bg-[#1a1a1a] transition-all text-left"
              >
                {label}
              </Link>
            ))}

            <button
              onClick={() => setIsMoreOpen(!isMoreOpen)}
              className="flex items-center justify-between text-[16px] font-medium text-[#B8A99A] px-4 py-2.5 rounded-xl hover:text-white hover:bg-[#1a1a1a] transition-all"
            >
              <span>More</span>
              <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isMoreOpen ? "rotate-180" : ""}`} />
            </button>

            {isMoreOpen && (
              <div className="pl-4 flex flex-col gap-1">
                {MORE_LINKS.map(({ href, label }) => (
                  <Link
                    key={label}
                    href={href}
                    onClick={() => setIsMenuOpen(false)}
                    className="text-[15px] text-[#7A6E62] px-4 py-2 rounded-xl hover:text-white hover:bg-[#1a1a1a] transition-all w-full text-left"
                  >
                    {label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}

export default Navbar;