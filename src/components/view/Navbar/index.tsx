"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import CartView from "../Cart/CartView";
import { Button } from "@/components/ui/button";
import { useCartActions } from "@/lib/atoms/cart";
import { useRouter } from "next/navigation";

function Navbar() {
  const router = useRouter();

  const { cart, initializeCart } = useCartActions();

  useEffect(() => {
    if (!cart?.checkoutUrl) {
      initializeCart();
    }
  }, [cart, initializeCart]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // Toggle mobile menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-5 flex items-center justify-between">
        <div className="flex items-center">
          <Image
            src="/logo.png"
            alt="Sexuloon Logo"
            width={130}
            height={40}
            className="object-contain"
          />
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link
            href="/"
            className="font-medium text-gray-800 hover:text-blue-600 transition-colors duration-200"
          >
            Home
          </Link>
          <Link
            href="/products"
            className="font-medium text-gray-800 hover:text-blue-600 transition-colors duration-200"
          >
            Products
          </Link>
          <Link
            href="/"
            className="font-medium text-gray-800 hover:text-blue-600 transition-colors duration-200"
          >
            Consultation
          </Link>
          <Link
            href="/aboutus"
            className="font-medium text-gray-800 hover:text-blue-600 transition-colors duration-200"
          >
            About Us
          </Link>
        </nav>

        {/* Action Buttons */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center gap-x-2">
            <div className="relative">
              <CartView/>
              {/* <Button
                size="icon"
                variant="ghost"
                onClick={() => router.push(cart?.checkoutUrl || "/")}
              >
                <ShoppingCart />
              </Button>
              {cart?.lines.edges.length > 0 && (
                <Badge variant="default" className="absolute -top-2 right-0">
                  {cart.lines.edges.length}
                </Badge>
              )} */}
            </div>
            <Button onClick={() => router.push("/auth")} size="sm">
              Login
            </Button>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 text-gray-600 focus:outline-none"
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
        <div className="md:hidden bg-white py-4 px-4 shadow-lg">
          <div className="flex flex-col space-y-4">
            <Link
              href="/"
              className="font-medium text-gray-800 hover:text-blue-600 py-2 border-b border-gray-100"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/products"
              className="font-medium text-gray-800 hover:text-blue-600 py-2 border-b border-gray-100"
              onClick={() => setIsMenuOpen(false)}
            >
              Products
            </Link>
            <Link
              href="/"
              className="font-medium text-gray-800 hover:text-blue-600 py-2 border-b border-gray-100"
              onClick={() => setIsMenuOpen(false)}
            >
              Consultation
            </Link>
            <Link
              href="/aboutus"
              className="font-medium text-gray-800 hover:text-blue-600 py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              About Us
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

export default Navbar;
