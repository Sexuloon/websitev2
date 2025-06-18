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
      <div className="flex items-center justify-center  bg-gray-100">
        <button
          onClick={() => setIsOpen(true)}
          className="p-3 rounded-full bg-blue-500 text-white hover:bg-blue-600 transition-colors shadow-lg"
        >
          <User size={14} />
        </button>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-2 sm:p-4 z-50">
      <div className="bg-white rounded-2xl w-full max-w-6xl max-h-[95vh] sm:max-h-[90vh] overflow-hidden shadow-2xl mx-2 sm:mx-4">
        <div className="flex flex-col lg:flex-row min-h-[500px] sm:min-h-[600px]">
          {/* Left Section - Brand & Offers */}
          <div className="bg-gradient-to-br from-blue-400 to-blue-500 text-white p-4 sm:p-6 lg:p-8 flex-1 relative overflow-y-auto hidden lg:block">
           

            {/* Brand Header */}
            <div className="mb-6 sm:mb-8">
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold">Sexuloon</h1>
                <div className="bg-white text-blue-500 px-2 py-1 rounded text-xs sm:text-sm font-semibold w-fit"></div>
              </div>
              <p className="text-sm sm:text-base lg:text-lg opacity-90 leading-relaxed">
                India&apos;s No. 1 Sexual Health Brand. Trusted by
                <br className="hidden sm:block" />
                <span className="sm:hidden"> </span>
                25 Lakh+ Indian Men
              </p>
            </div>

            {/* Feature Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
              {/* Free Shipping */}
              <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-xl p-4 sm:p-6 text-center border border-white border-opacity-30">
                <div className="flex justify-center mb-2 sm:mb-3">
                  <Star className="text-yellow-300 fill-yellow-300" size={20} />
                </div>
                <h3 className="font-bold text-sm sm:text-base lg:text-lg mb-1 sm:mb-2">Free Shipping</h3>
                <p className="text-xs sm:text-sm opacity-90 leading-relaxed">
                  Enjoy zero shipping on
                  <br className="hidden sm:block" />
                  <span className="sm:hidden"> </span>
                  all orders above Rs.349
                </p>
              </div>

              {/* Flat 10% Off */}
              <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-xl p-4 sm:p-6 text-center border border-white border-opacity-30">
                <div className="flex justify-center mb-2 sm:mb-3">
                  <Star className="text-yellow-300 fill-yellow-300" size={20} />
                </div>
                <h3 className="font-bold text-sm sm:text-base lg:text-lg mb-1 sm:mb-2">Flat 10% Off</h3>
                <p className="text-xs sm:text-sm opacity-90 leading-relaxed">
                  Enjoy an exclusive 10%
                  <br className="hidden sm:block" />
                  <span className="sm:hidden"> </span>
                  discount on your first
                  <br className="hidden sm:block" />
                  <span className="sm:hidden"> </span>
                  purchase
                </p>
              </div>

              {/* 100% Discreet Delivery */}
              <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-xl p-4 sm:p-6 text-center border border-white border-opacity-30 sm:col-span-2 lg:col-span-1">
                <div className="flex justify-center mb-2 sm:mb-3">
                  <Star className="text-yellow-300 fill-yellow-300" size={20} />
                </div>
                <h3 className="font-bold text-sm sm:text-base lg:text-lg mb-1 sm:mb-2">
                  100% Discreet Delivery
                </h3>
                <p className="text-xs sm:text-sm opacity-90 leading-relaxed">
                  All orders are shipped in
                  <br className="hidden sm:block" />
                  <span className="sm:hidden"> </span>
                  confidential packaging
                  <br className="hidden sm:block" />
                  <span className="sm:hidden"> </span>
                  for your privacy
                </p>
              </div>
            </div>
          </div>

          {/* Right Section - Form */}
          <div className="bg-white p-4 sm:p-6 lg:p-8 w-full lg:w-80 xl:w-96 flex flex-col justify-center">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-6 sm:mb-8 text-center leading-tight">
              Take Charge of Your
              <br />
              Health Today
            </h2>

             <button
              onClick={() => setIsOpen(false)}
              className="absolute top-3 right-3 sm:top-4 sm:right-4 text-white hover:text-gray-200 transition-colors z-10"
            >
              <X size={20} className="sm:hidden" />
              <X size={24} className="hidden sm:block" />
            </button>

            {/* Phone Input */}
            <div className="mb-4 sm:mb-6">
              <input
                type="tel"
                placeholder="Enter Mobile Number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="w-full px-3 sm:px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm sm:text-base"
              />
            </div>

            {/* Notifications Checkbox */}
            <div className="mb-4 sm:mb-6">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={notifyOffers}
                  onChange={(e) => setNotifyOffers(e.target.checked)}
                  className="mt-1 w-4 h-4 text-red-500 border-gray-300 rounded focus:ring-red-500 flex-shrink-0"
                />
                <span className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                  Notify me with offers & updates
                </span>
              </label>
            </div>

            {/* Terms Checkbox */}
            <div className="mb-6 sm:mb-8">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={acceptTerms}
                  onChange={(e) => setAcceptTerms(e.target.checked)}
                  className="mt-1 w-4 h-4 text-red-500 border-gray-300 rounded focus:ring-red-500 flex-shrink-0"
                />
                <span className="text-xs leading-relaxed text-gray-500">
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
              className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-red-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
            >
              Get Started
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}