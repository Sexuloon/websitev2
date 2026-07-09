"use client";

import { useCartActions } from "@/lib/atoms/cart";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, useCallback } from "react";
import CartView from "../Cart/CartView";
import { X, Menu, ChevronDown, User, LogOut, Package, MapPin } from "lucide-react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";

// Lazy-load so it's never in the initial bundle
const AuthModal = dynamic(() => import("@/components/view/Auth/AuthModal"), { ssr: false });

// ─── Types ────────────────────────────────────────────────────────────────────

interface CustomerSnippet {
  firstName?: string;
  lastName?: string;
  email?: string;
}

// ─── Constants ────────────────────────────────────────────────────────────────

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

// ─── Avatar Button ────────────────────────────────────────────────────────────

function AvatarMenu({ customer, onLogout }: { customer: CustomerSnippet; onLogout: () => void }) {
  const [open, setOpen] = useState(false);
  const initials = `${customer.firstName?.[0] ?? ""}${customer.lastName?.[0] ?? ""}`.toUpperCase() || "U";
  const router = useRouter();

  return (
    <div className="relative" id="user-avatar-menu">
      <button
        onClick={() => setOpen(o => !o)}
        className="flex items-center justify-center w-9 h-9 rounded-full bg-black text-white dark:bg-[#C9A84C] dark:text-black font-bold text-sm ring-2 ring-gray-200 dark:ring-[#C9A84C]/30 hover:ring-4 transition-all"
        aria-label="Account menu"
      >
        {initials}
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className="absolute right-0 top-full mt-2 w-52 rounded-2xl bg-white border border-gray-200 shadow-xl dark:bg-[#111111] dark:border-[#262626] dark:shadow-[0_8px_32px_rgba(0,0,0,0.8)] overflow-hidden z-50">
            <div className="px-4 py-3 border-b border-gray-100 dark:border-[#1e1e1e]">
              <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">
                {customer.firstName} {customer.lastName}
              </p>
              <p className="text-xs text-gray-500 dark:text-[#7A6E62] truncate">{customer.email}</p>
            </div>
            <div className="py-1">
              <button
                onClick={() => { setOpen(false); router.push("/account"); }}
                className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 dark:text-[#B8A99A] dark:hover:bg-[#1a1a1a] transition-all"
              >
                <User size={15} /> My Account
              </button>
              <button
                onClick={() => { setOpen(false); router.push("/account#orders"); }}
                className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 dark:text-[#B8A99A] dark:hover:bg-[#1a1a1a] transition-all"
              >
                <Package size={15} /> My Orders
              </button>
              <button
                onClick={() => { setOpen(false); router.push("/account#addresses"); }}
                className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 dark:text-[#B8A99A] dark:hover:bg-[#1a1a1a] transition-all"
              >
                <MapPin size={15} /> Addresses
              </button>
              <hr className="my-1 border-gray-100 dark:border-[#1e1e1e]" />
              <button
                onClick={() => { setOpen(false); onLogout(); }}
                className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 transition-all"
              >
                <LogOut size={15} /> Sign Out
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

// ─── Main Navbar ──────────────────────────────────────────────────────────────

function Navbar() {
  const { cart, initializeCart } = useCartActions();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"sign-in" | "sign-up">("sign-in");
  const [customer, setCustomer] = useState<CustomerSnippet | null>(null);
  const [authChecked, setAuthChecked] = useState(false);
  const router = useRouter();

  // Initialize cart
  useEffect(() => {
    if (!cart?.checkoutUrl) initializeCart();
  }, [cart, initializeCart]);

  // Scroll detection
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Check auth state
  const checkAuth = useCallback(async () => {
    try {
      const res = await fetch("/api/auth/me", { credentials: "include" });
      if (res.ok) {
        const { customer: c } = await res.json();
        setCustomer(c ?? null);
      } else {
        setCustomer(null);
      }
    } catch {
      setCustomer(null);
    } finally {
      setAuthChecked(true);
    }
  }, []);

  useEffect(() => { checkAuth(); }, [checkAuth]);

  // Re-check after modal closes (auth might have just succeeded)
  const handleAuthSuccess = useCallback(() => {
    checkAuth();
    setModalOpen(false);
  }, [checkAuth]);

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    setCustomer(null);
    router.push("/");
    router.refresh();
  };

  const openModal = (mode: "sign-in" | "sign-up") => {
    setModalMode(mode);
    setModalOpen(true);
    setIsMenuOpen(false);
  };

  const isLoggedIn = !!customer;

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

            {authChecked && (
              isLoggedIn ? (
                <AvatarMenu customer={customer!} onLogout={handleLogout} />
              ) : (
                <>
                  <button
                    onClick={() => openModal("sign-in")}
                    id="navbar-signin-btn"
                    className="hidden min-[1030px]:flex items-center justify-center border border-gray-300 text-gray-700 hover:bg-gray-50 dark:border-[#C9A84C]/50 dark:text-[#C9A84C] dark:hover:bg-[#C9A84C]/10 dark:hover:border-[#C9A84C] rounded-full font-semibold text-sm h-10 px-5 transition-all duration-200 cursor-pointer"
                  >
                    Sign In
                  </button>
                  <button
                    onClick={() => openModal("sign-up")}
                    id="navbar-signup-btn"
                    className="hidden min-[1030px]:flex items-center justify-center bg-black text-white hover:bg-gray-800 dark:bg-[#1a4731] dark:hover:bg-[#143828] rounded-full font-semibold text-sm h-10 px-5 transition-all duration-200 cursor-pointer"
                  >
                    Sign Up
                  </button>
                  {/* Mobile sign in */}
                  <button
                    onClick={() => openModal("sign-in")}
                    className="min-[1030px]:hidden flex items-center justify-center border border-gray-300 text-gray-700 dark:border-[#C9A84C]/50 dark:text-[#C9A84C] rounded-full font-semibold text-sm h-9 px-4 transition-all"
                  >
                    Sign In
                  </button>
                </>
              )
            )}

            {/* Hamburger */}
            <button
              className="min-[1030px]:hidden p-2 text-gray-600 hover:text-black dark:text-[#B8A99A] dark:hover:text-white focus:outline-none"
              onClick={() => { setIsMenuOpen(p => !p); setIsMoreOpen(false); }}
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
              {/* Auth buttons in mobile menu */}
              {!isLoggedIn && (
                <div className="flex gap-3 pb-4 mb-2 border-b border-gray-100 dark:border-[#1e1e1e]">
                  <button
                    onClick={() => openModal("sign-in")}
                    className="flex-1 border border-gray-300 text-gray-700 hover:bg-gray-50 dark:border-[#C9A84C]/50 dark:text-[#C9A84C] dark:hover:bg-[#C9A84C]/10 rounded-full font-semibold text-sm h-11 transition-all"
                  >
                    Sign In
                  </button>
                  <button
                    onClick={() => openModal("sign-up")}
                    className="flex-1 bg-black text-white hover:bg-gray-800 dark:bg-[#1a4731] dark:hover:bg-[#143828] rounded-full font-semibold text-sm h-11 transition-all"
                  >
                    Sign Up
                  </button>
                </div>
              )}
              {isLoggedIn && (
                <div className="pb-4 mb-2 border-b border-gray-100 dark:border-[#1e1e1e]">
                  <p className="px-4 text-sm font-semibold text-gray-900 dark:text-white">
                    {customer?.firstName} {customer?.lastName}
                  </p>
                  <div className="flex gap-2 mt-2">
                    <button onClick={() => { setIsMenuOpen(false); router.push("/account"); }} className="flex-1 border border-gray-200 dark:border-[#262626] text-sm rounded-full h-9 transition-all hover:bg-gray-50 dark:hover:bg-[#1a1a1a]">Account</button>
                    <button onClick={() => { setIsMenuOpen(false); handleLogout(); }} className="flex-1 border border-red-200 text-red-500 dark:border-red-900/50 text-sm rounded-full h-9 transition-all hover:bg-red-50 dark:hover:bg-red-950/20">Sign Out</button>
                  </div>
                </div>
              )}

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

      {/* Auth Modal — no Clerk */}
      <AuthModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        defaultMode={modalMode}
        onAuthSuccess={handleAuthSuccess}
      />
    </>
  );
}

export default Navbar;