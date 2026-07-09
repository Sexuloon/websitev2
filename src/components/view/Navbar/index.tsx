"use client";

import { useCartActions } from "@/lib/atoms/cart";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import CartView from "../Cart/CartView";
import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";
import { X, Menu, ChevronDown } from "lucide-react";
import dynamic from "next/dynamic";

// Dynamically import the bottom sheet so it's not in the initial bundle
const AuthBottomSheet = dynamic(
  () => import("@/components/view/Auth/AuthBottomSheet"),
  { ssr: false }
);

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
  const [isMobile, setIsMobile] = useState(false);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [sheetMode, setSheetMode] = useState<"sign-in" | "sign-up">("sign-in");

  useEffect(() => {
    if (!cart?.checkoutUrl) initializeCart();
  }, [cart, initializeCart]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Detect mobile — used to switch between Clerk modal and custom bottom sheet
  useEffect(() => {
    const check = () =>
      setIsMobile(window.innerWidth < 1030 || window.matchMedia("(pointer: coarse)").matches);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const openSheet = (mode: "sign-in" | "sign-up") => {
    setSheetMode(mode);
    setSheetOpen(true);
    setIsMenuOpen(false);
  };

  return (
    <>
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/95 border-b border-gray-200 shadow-md dark:bg-[#080808]/95 dark:border-[#262626] dark:shadow-[0_2px_24px_rgba(0,0,0,0.6)] backdrop-blur-md"
            : "bg-white border-b border-gray-100 dark:bg-[#080808] dark:border-[#1e1e1e]"
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
                className="object-contain dark:brightness-0 dark:invert"
                priority
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
                className="text-[15px] font-medium text-gray-700 hover:text-black hover:bg-gray-100 dark:text-[#B8A99A] dark:hover:text-white dark:hover:bg-[#1a1a1a] px-4 py-2 rounded-full transition-all duration-200"
              >
                {label}
              </Link>
            ))}

            {/* More dropdown */}
            <div className="relative group">
              <button className="flex items-center gap-1.5 text-[15px] font-medium text-gray-700 hover:text-black hover:bg-gray-100 dark:text-[#B8A99A] dark:hover:text-white dark:hover:bg-[#1a1a1a] px-4 py-2 rounded-full transition-all duration-200">
                More <ChevronDown className="w-3.5 h-3.5 transition-transform group-hover:rotate-180 duration-200" />
              </button>
              <div className="absolute top-full left-0 mt-1 hidden group-hover:block w-48 rounded-xl bg-white border border-gray-200 shadow-lg dark:bg-[#111111] dark:border-[#262626] dark:shadow-[0_8px_32px_rgba(0,0,0,0.8)] overflow-hidden z-50">
                {MORE_LINKS.map(({ href, label }) => (
                  <Link
                    prefetch
                    key={label}
                    href={href}
                    className="block px-4 py-3 text-sm text-gray-700 hover:text-black hover:bg-gray-50 dark:text-[#B8A99A] dark:hover:text-white dark:hover:bg-[#1a1a1a] transition-all"
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
              {/* Desktop: use Clerk modal (unchanged) */}
              <SignInButton mode="modal">
                <button className="hidden min-[1030px]:flex items-center justify-center border border-gray-300 text-gray-700 hover:bg-gray-50 dark:border-[#C9A84C]/50 dark:text-[#C9A84C] dark:hover:bg-[#C9A84C]/10 dark:hover:border-[#C9A84C] rounded-full font-semibold text-sm h-10 px-5 transition-all duration-200 cursor-pointer">
                  Sign In
                </button>
              </SignInButton>
              <SignUpButton mode="modal">
                <button className="hidden min-[1030px]:flex items-center justify-center bg-black text-white hover:bg-gray-800 dark:bg-[#1a4731] dark:hover:bg-[#143828] rounded-full font-semibold text-sm h-10 px-5 transition-all duration-200 cursor-pointer">
                  Sign Up
                </button>
              </SignUpButton>

              {/* Mobile: custom bottom sheet with Truecaller */}
              <button
                className="min-[1030px]:hidden flex items-center justify-center border border-gray-300 text-gray-700 hover:bg-gray-50 dark:border-[#C9A84C]/50 dark:text-[#C9A84C] dark:hover:bg-[#C9A84C]/10 dark:hover:border-[#C9A84C] rounded-full font-semibold text-sm h-9 px-4 transition-all duration-200 cursor-pointer"
                onClick={() => openSheet("sign-in")}
                type="button"
              >
                Sign In
              </button>
            </SignedOut>

            <SignedIn>
              <UserButton
                appearance={{
                  elements: {
                    avatarBox: "w-9 h-9 sm:w-10 sm:h-10 ring-2 ring-gray-200 dark:ring-[#C9A84C]/30",
                  },
                }}
              />
            </SignedIn>

            {/* Hamburger */}
            <button
              className="min-[1030px]:hidden p-2 text-gray-600 hover:text-black dark:text-[#B8A99A] dark:hover:text-white focus:outline-none"
              onClick={() => { setIsMenuOpen((p) => !p); setIsMoreOpen(false); }}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="min-[1030px]:hidden bg-white border-t border-gray-100 dark:bg-[#0d0d0d] dark:border-[#1e1e1e] py-4 px-4">
            <div className="flex flex-col gap-1">
              {/* Mobile Auth — opens bottom sheet */}
              <SignedOut>
                <div className="flex gap-3 pb-4 mb-2 border-b border-gray-100 dark:border-[#1e1e1e]">
                  <button
                    className="flex-1 border border-gray-300 text-gray-700 hover:bg-gray-50 dark:border-[#C9A84C]/50 dark:text-[#C9A84C] dark:hover:bg-[#C9A84C]/10 rounded-full font-semibold text-sm h-11 transition-all"
                    onClick={() => openSheet("sign-in")}
                    type="button"
                  >
                    Sign In
                  </button>
                  <button
                    className="flex-1 bg-black text-white hover:bg-gray-800 dark:bg-[#1a4731] dark:hover:bg-[#143828] rounded-full font-semibold text-sm h-11 transition-all"
                    onClick={() => openSheet("sign-up")}
                    type="button"
                  >
                    Sign Up
                  </button>
                </div>
              </SignedOut>

              {NAV_LINKS.map(({ href, label }) => (
                <Link
                  key={label}
                  href={href}
                  onClick={() => setIsMenuOpen(false)}
                  className="text-[16px] font-medium text-gray-700 hover:text-black hover:bg-gray-50 dark:text-[#B8A99A] dark:hover:text-white dark:hover:bg-[#1a1a1a] px-4 py-2.5 rounded-xl transition-all text-left"
                >
                  {label}
                </Link>
              ))}

              <button
                onClick={() => setIsMoreOpen(!isMoreOpen)}
                className="flex items-center justify-between text-[16px] font-medium text-gray-700 hover:text-black hover:bg-gray-50 dark:text-[#B8A99A] dark:hover:text-white dark:hover:bg-[#1a1a1a] px-4 py-2.5 rounded-xl transition-all"
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
                      className="text-[15px] text-gray-500 hover:text-black hover:bg-gray-50 dark:text-[#7A6E62] dark:hover:text-white dark:hover:bg-[#1a1a1a] px-4 py-2 rounded-xl transition-all w-full text-left"
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

      {/* Mobile auth bottom sheet — rendered outside header to avoid z-index issues */}
      <AuthBottomSheet
        open={sheetOpen}
        onClose={() => setSheetOpen(false)}
        defaultMode={sheetMode}
      />
    </>
  );
}

export default Navbar;