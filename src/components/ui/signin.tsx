"use client";
import React, { useState, useEffect } from "react";
import {
  X,
  Star,
  User,
  Phone,
  Shield,
  Truck,
  AlertCircle,
  CheckCircle,
  Loader2,
} from "lucide-react";

import { useSession } from "@/hooks/useSession";
import {
  userSignUp,
  verifyUser,
  userSignIN,
  userSession,
} from "@/handlers/handlers";

export default function SignIn() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLogin, setLoginIn] = useState(true);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [notifyOffers, setNotifyOffers] = useState(false);
  const [otp, setOTP] = useState("");
  const [activeTab, setActiveTab] = useState("signup");
  const [handleOTP, setHandleOTP] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const { info } = useSession();

  useEffect(() => {
    if (info === null) {
      setIsOpen(true);
    }
  }, [info]);

  useEffect(() => {
    const token = window.sessionStorage.getItem("Token");
    console.log(token);
    if (token) {
      setLoginIn(true);
      return;
    }
    setLoginIn(false);
    return;
  }, []);

  const resetForm = () => {
    setPhoneNumber("");
    setOTP("");
    setAcceptTerms(false);
    setNotifyOffers(false);
    setHandleOTP(false);
    setError("");
    setSuccess("");
  };

  const showError = (message) => {
    setError(message);
    setTimeout(() => setError(""), 5000);
  };

  const showSuccess = (message) => {
    setSuccess(message);
    setTimeout(() => setSuccess(""), 3000);
  };

  async function handlerSignup() {
    if (!phoneNumber || phoneNumber.length < 10) {
      showError("Please enter a valid 10-digit phone number");
      return;
    }
    if (!acceptTerms) {
      showError("Please accept the terms and conditions");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const data = await userSignUp(phoneNumber);
      if (data === "OTP sent successfully") {
        setHandleOTP(true);
        showSuccess("OTP sent to your phone number");
      }
    } catch (error) {
      showError(error.message || "Failed to send OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  async function handlerVerifyOTP() {
    if (!otp || otp.length < 4) {
      showError("Please enter a valid OTP");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const data = await verifyUser({
        phonenumber: phoneNumber,
        otp: otp,
      });
      if (data === "success") {
        setActiveTab("signin");
        setHandleOTP(false);
        showSuccess("Account verified successfully! Please login to continue.");
        resetForm();
      }
    } catch (error) {
      showError(error.message || "Invalid OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  async function handlerSignin() {
    if (!phoneNumber || phoneNumber.length < 10) {
      showError("Please enter a valid 10-digit phone number");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const data = await userSignIN({
        phonenumber: phoneNumber,
      });
      if (data === "success") {
        setHandleOTP(true);
        showSuccess("OTP sent to your phone number");
      }
    } catch (error) {
      showError(error.message || "User not found. Please sign up first.");
    } finally {
      setLoading(false);
    }
  }

  async function handleUserSession() {
    if (!otp || otp.length < 4) {
      showError("Please enter a valid OTP");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const data = await userSession({
        phonenumber: phoneNumber,
        otp: otp,
      });
      if (data === "success") {
        setIsOpen(false);
        showSuccess("Successfully logged in!");
        resetForm();
        window.location.reload();
      }
    } catch (error) {
      showError(error.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  const handleLogout = () => {
    window.sessionStorage.removeItem("Token");
    setLoginIn(false);
    showSuccess("Successfully logged out!");
    setIsOpen(false);
    window.location.reload(); // ensure UI resets
  };

  const switchTab = (tab) => {
    setActiveTab(tab);
    setHandleOTP(false);
    setError("");
    setSuccess("");
    setOTP("");
  };

  // User Profile Button (when logged in)
  if (info && !isOpen) {
    return (
      <div className="flex items-center justify-center bg-gray-100">
        <div className="relative group">
          <button className="flex items-center gap-2 p-3 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 transition-all duration-200 shadow-lg">
            <User size={16} />
            <span className="hidden sm:inline text-sm font-medium">
              {isLogin ? (
                <button onClick={handleLogout}>Logout</button>
              ) : (
                <button disabled={isLogin} onClick={() => setIsOpen(true)}>
                  Login
                </button>
              )}
            </span>
          </button>

          {/* Logout tooltip */}
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-3 py-1 bg-black text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
            Click to manage account
          </div>
        </div>
      </div>
    );
  }

  // Login Button (when not logged in)
  if (!isOpen) {
    return (
      <div className="flex items-center justify-center bg-gray-100">
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2 p-3 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 transition-all duration-200 shadow-lg"
        >
          <User size={16} />
          <span className="hidden sm:inline text-sm font-medium">Login</span>
        </button>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 z-50">
      <div className="bg-white rounded-3xl w-full max-w-6xl max-h-[95vh] sm:max-h-[90vh] overflow-hidden shadow-2xl mx-2 sm:mx-4 border border-gray-100">
        <div className="flex flex-col lg:flex-row min-h-[500px] sm:min-h-[600px]">
          {/* Left Section - Brand & Offers */}
          <div className="bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700 text-white p-4 sm:p-6 lg:p-8 flex-1 relative overflow-y-auto hidden lg:block">
            {/* Brand Header */}
            <div className="mb-8">
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-4">
                <h1 className="text-3xl lg:text-4xl font-bold tracking-tight">
                  Sexuloon
                </h1>
                <div className="bg-gradient-to-r from-yellow-400 to-orange-400 text-blue-900 px-3 py-1 rounded-full text-xs font-bold w-fit shadow-lg">
                  TRUSTED
                </div>
              </div>
              <p className="text-lg opacity-95 leading-relaxed font-medium">
                India&apos;s No. 1 Sexual Health Brand
                <br />
                <span className="text-yellow-200 font-semibold">
                  Trusted by 25 Lakh+ Indian Men
                </span>
              </p>
            </div>

            {/* Feature Cards */}
            <div className="grid grid-cols-1 gap-4">
              {/* Free Shipping */}
              <div className="bg-white bg-opacity-15 backdrop-blur-md rounded-2xl p-6 border border-white border-opacity-20 hover:bg-opacity-20 transition-all duration-300">
                <div className="flex items-center gap-4 mb-3">
                  <div className="p-3 bg-white bg-opacity-20 rounded-full">
                    <Truck className="text-yellow-300" size={24} />
                  </div>
                  <h3 className="font-bold text-lg">Free Shipping</h3>
                </div>
                <p className="text-sm opacity-90 leading-relaxed">
                  Enjoy zero shipping charges on all orders above Rs.349
                </p>
              </div>

              {/* Flat 10% Off */}
              <div className="bg-white bg-opacity-15 backdrop-blur-md rounded-2xl p-6 border border-white border-opacity-20 hover:bg-opacity-20 transition-all duration-300">
                <div className="flex items-center gap-4 mb-3">
                  <div className="p-3 bg-white bg-opacity-20 rounded-full">
                    <Star
                      className="text-yellow-300 fill-yellow-300"
                      size={24}
                    />
                  </div>
                  <h3 className="font-bold text-lg">Flat 10% Off</h3>
                </div>
                <p className="text-sm opacity-90 leading-relaxed">
                  Exclusive 10% discount on your first purchase
                </p>
              </div>

              {/* 100% Discreet Delivery */}
              <div className="bg-white bg-opacity-15 backdrop-blur-md rounded-2xl p-6 border border-white border-opacity-20 hover:bg-opacity-20 transition-all duration-300">
                <div className="flex items-center gap-4 mb-3">
                  <div className="p-3 bg-white bg-opacity-20 rounded-full">
                    <Shield className="text-yellow-300" size={24} />
                  </div>
                  <h3 className="font-bold text-lg">100% Discreet Delivery</h3>
                </div>
                <p className="text-sm opacity-90 leading-relaxed">
                  All orders shipped in confidential packaging for your privacy
                </p>
              </div>
            </div>
          </div>

          {/* Right Section - Form */}
          <div className="bg-white p-4 sm:p-6 lg:p-8 w-full lg:w-80 xl:w-96 flex flex-col justify-center relative">
            {/* Close Icon */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition-colors z-10 p-2 rounded-full hover:bg-gray-100"
            >
              <X size={20} />
            </button>

            <>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-6 text-center leading-tight">
                Take Charge of Your
                <br />
                <span className="text-blue-600">Health Today</span>
              </h2>

              {/* Tab Switcher */}
              <div className="flex mb-6 bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => switchTab("signup")}
                  className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all duration-200 ${
                    activeTab === "signup"
                      ? "bg-white text-blue-600 shadow-sm"
                      : "text-gray-600 hover:text-gray-800"
                  }`}
                >
                  Sign Up
                </button>
                <button
                  onClick={() => switchTab("signin")}
                  className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all duration-200 ${
                    activeTab === "signin"
                      ? "bg-white text-blue-600 shadow-sm"
                      : "text-gray-600 hover:text-gray-800"
                  }`}
                >
                  Login
                </button>
              </div>

              {/* Error Message */}
              {error && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 text-red-700 text-sm">
                  <AlertCircle size={16} />
                  {error}
                </div>
              )}

              {/* Success Message */}
              {success && (
                <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg flex items-center gap-2 text-green-700 text-sm">
                  <CheckCircle size={16} />
                  {success}
                </div>
              )}

              {/* Signup Form */}
              {activeTab === "signup" && (
                <div>
                  {handleOTP ? (
                    <>
                      <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Enter OTP sent to {phoneNumber}
                        </label>
                        <input
                          type="text"
                          placeholder="Enter 4-digit OTP"
                          value={otp}
                          onChange={(e) =>
                            setOTP(
                              e.target.value.replace(/\D/g, "").slice(0, 4)
                            )
                          }
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-center text-lg tracking-widest"
                          maxLength={4}
                        />
                      </div>
                      <button
                        onClick={handlerVerifyOTP}
                        disabled={!otp || otp.length < 4 || loading}
                        className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-blue-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                      >
                        {loading && (
                          <Loader2 size={16} className="animate-spin" />
                        )}
                        Verify Account
                      </button>
                    </>
                  ) : (
                    <>
                      <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Mobile Number
                        </label>
                        <div className="relative">
                          <Phone
                            size={16}
                            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                          />
                          <input
                            type="tel"
                            placeholder="Enter 10-digit mobile number"
                            value={phoneNumber}
                            onChange={(e) =>
                              setPhoneNumber(
                                e.target.value.replace(/\D/g, "").slice(0, 10)
                              )
                            }
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            maxLength={10}
                          />
                        </div>
                      </div>

                      <div className="mb-4">
                        <label className="flex items-start gap-3 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={notifyOffers}
                            onChange={(e) => setNotifyOffers(e.target.checked)}
                            className="mt-1 w-4 h-4 text-blue-500 border-gray-300 rounded focus:ring-blue-500"
                          />
                          <span className="text-sm text-gray-600">
                            Notify me with offers & updates
                          </span>
                        </label>
                      </div>

                      <div className="mb-6">
                        <label className="flex items-start gap-3 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={acceptTerms}
                            onChange={(e) => setAcceptTerms(e.target.checked)}
                            className="mt-1 w-4 h-4 text-blue-500 border-gray-300 rounded focus:ring-blue-500"
                          />
                          <span className="text-xs text-gray-600">
                            I accept the{" "}
                            <a
                              href="#"
                              className="text-blue-500 hover:underline"
                            >
                              Privacy Policy and Terms & Conditions
                            </a>
                          </span>
                        </label>
                      </div>

                      <button
                        onClick={handlerSignup}
                        disabled={
                          !phoneNumber ||
                          phoneNumber.length < 10 ||
                          !acceptTerms ||
                          loading
                        }
                        className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-blue-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                      >
                        {loading && (
                          <Loader2 size={16} className="animate-spin" />
                        )}
                        Get Started
                      </button>
                    </>
                  )}
                </div>
              )}

              {/* Signin Form */}
              {activeTab === "signin" && (
                <div>
                  {handleOTP ? (
                    <>
                      <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Enter OTP sent to {phoneNumber}
                        </label>
                        <input
                          type="text"
                          placeholder="Enter 4-digit OTP"
                          value={otp}
                          onChange={(e) =>
                            setOTP(
                              e.target.value.replace(/\D/g, "").slice(0, 4)
                            )
                          }
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-center text-lg tracking-widest"
                          maxLength={4}
                        />
                      </div>
                      <button
                        onClick={handleUserSession}
                        disabled={!otp || otp.length < 4 || loading}
                        className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-blue-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                      >
                        {loading && (
                          <Loader2 size={16} className="animate-spin" />
                        )}
                        Sign In
                      </button>
                    </>
                  ) : (
                    <>
                      <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Mobile Number
                        </label>
                        <div className="relative">
                          <Phone
                            size={16}
                            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                          />
                          <input
                            type="tel"
                            placeholder="Enter registered mobile number"
                            value={phoneNumber}
                            onChange={(e) =>
                              setPhoneNumber(
                                e.target.value.replace(/\D/g, "").slice(0, 10)
                              )
                            }
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            maxLength={10}
                          />
                        </div>
                      </div>

                      <button
                        onClick={handlerSignin}
                        disabled={
                          !phoneNumber || phoneNumber.length < 10 || loading
                        }
                        className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-blue-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                      >
                        {loading && (
                          <Loader2 size={16} className="animate-spin" />
                        )}
                        Send OTP
                      </button>
                    </>
                  )}
                </div>
              )}
            </>
          </div>
        </div>
      </div>
    </div>
  );
}
