"use client";
import React, { useState } from "react";
import { X, Star, User } from "lucide-react";

export default function SignIn() {
  const [isOpen, setIsOpen] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [notifyOffers, setNotifyOffers] = useState(false);

  if (!isOpen) {
    return (
      <div className="flex items-center justify-center bg-gray-100">
        <button
          onClick={() => setIsOpen(true)}
          className="p-2 rounded-full bg-blue-500 text-white  hover:bg-blue-600 transition-colors"
        >
          <User />
        </button>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl">
        <div className="flex">
          {/* Left Section - Brand & Offers */}
          <div className="bg-gradient-to-br from-blue-400 to-blue-500 text-white p-8 flex-1 relative">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-white hover:text-gray-200 transition-colors"
            >
              <X size={24} />
            </button>

            {/* Brand Header */}
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <h1 className="text-4xl font-bold">Sexuloon</h1>
                <div className="bg-white text-blue-500 px-3 py-1 rounded text-sm font-semibold"></div>
              </div>
              <p className="text-lg opacity-90 leading-relaxed">
                India&apos;s No. 1 Sexual Health Brand. Trusted by
                <br />
                25 Lakh+ Indian Men
              </p>
            </div>

            {/* Feature Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Free Shipping */}
              <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-xl p-6 text-center border border-white border-opacity-30">
                <div className="flex justify-center mb-3">
                  <Star className="text-yellow-300 fill-yellow-300" size={24} />
                </div>
                <h3 className="font-bold text-lg mb-2">Free Shipping</h3>
                <p className="text-sm opacity-90 leading-relaxed">
                  Enjoy zero shipping on
                  <br />
                  all orders above Rs.349
                </p>
              </div>

              {/* Flat 10% Off */}
              <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-xl p-6 text-center border border-white border-opacity-30">
                <div className="flex justify-center mb-3">
                  <Star className="text-yellow-300 fill-yellow-300" size={24} />
                </div>
                <h3 className="font-bold text-lg mb-2">Flat 10% Off</h3>
                <p className="text-sm opacity-90 leading-relaxed">
                  Enjoy an exclusive 10%
                  <br />
                  discount on your first
                  <br />
                  purchase
                </p>
              </div>

              {/* 100% Discreet Delivery */}
              <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-xl p-6 text-center border border-white border-opacity-30">
                <div className="flex justify-center mb-3">
                  <Star className="text-yellow-300 fill-yellow-300" size={24} />
                </div>
                <h3 className="font-bold text-lg mb-2">
                  100% Discreet Delivery
                </h3>
                <p className="text-sm opacity-90 leading-relaxed">
                  All orders are shipped in
                  <br />
                  confidential packaging
                  <br />
                  for your privacy
                </p>
              </div>
            </div>
          </div>

          {/* Right Section - Form */}
          <div className="bg-white p-8 w-80 flex flex-col justify-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">
              Take Charge of Your
              <br />
              Health Today
            </h2>

            {/* Phone Input */}
            <div className="mb-6">
              <input
                type="tel"
                placeholder="Enter Mobile Number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
            </div>

            {/* Notifications Checkbox */}
            <div className="mb-6">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={notifyOffers}
                  onChange={(e) => setNotifyOffers(e.target.checked)}
                  className="mt-1 w-4 h-4 text-red-500 border-gray-300 rounded focus:ring-red-500"
                />
                <span className="text-sm text-gray-600">
                  Notify me with offers & updates
                </span>
              </label>
            </div>

            {/* Terms Checkbox */}
            <div className="mb-8">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={acceptTerms}
                  onChange={(e) => setAcceptTerms(e.target.checked)}
                  className="mt-1 w-4 h-4 text-red-500 border-gray-300 rounded focus:ring-red-500"
                />
                <span className="text-xs text-gray-500 leading-relaxed">
                  I accept that I have read & understood your{" "}
                  <a href="#" className="text-red-500 hover:underline">
                    Privacy Policy and T&Cs
                  </a>
                </span>
              </label>
            </div>

            {/* Submit Button */}
            <button
              disabled={!phoneNumber || !acceptTerms}
              className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-red-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Get Started
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
