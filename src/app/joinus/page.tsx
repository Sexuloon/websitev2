"use client";

import { useState } from "react";
import { CheckCircle, Mail, Phone, Clock } from 'lucide-react';

export default function DoctorRegistrationForm() {
  const [info, setInfo] = useState({
    name: "",
    gender: "",
    phonenumber: "",
    email: "",
    address: "",
    resnumber: "",
    qualification: "",
    yoe: "",
    specailzation: "",
    optional: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true)
  };

  if (submitted) {
    return (
      <>
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center p-4">
          <div className="max-w-2xl w-full">
            <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 text-center border border-blue-100">
              {/* Success Icon */}
              <div className="flex justify-center mb-6">
                <div className="bg-blue-100 rounded-full p-4">
                  <CheckCircle className="w-16 h-16 text-blue-600" />
                </div>
              </div>

              {/* Main Heading */}
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Thank You for Your Interest in Sexuloon!
              </h1>

              {/* Subheading */}
              <p className="text-lg text-gray-600 mb-8">
                We&apso;ve received your request and our team will contact you soon.
              </p>

              {/* Info Cards */}
              <div className="grid md:grid-cols-3 gap-4 mb-8">
                <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                  <Clock className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                  <p className="text-sm font-semibold text-gray-800">
                    Response Time
                  </p>
                  <p className="text-xs text-gray-600 mt-1">
                    Within 24-48 hours
                  </p>
                </div>

                <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                  <Mail className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                  <p className="text-sm font-semibold text-gray-800">
                    Check Your Email
                  </p>
                  <p className="text-xs text-gray-600 mt-1">
                    We&apso;ll reach out via email
                  </p>
                </div>

                <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                  <Phone className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                  <p className="text-sm font-semibold text-gray-800">
                    Phone Call
                  </p>
                  <p className="text-xs text-gray-600 mt-1">
                    Keep your phone handy
                  </p>
                </div>
              </div>

              {/* Additional Info */}
              <div className="bg-blue-50 rounded-lg p-6 mb-6 border border-blue-100">
                <h2 className="text-lg font-semibold text-gray-800 mb-3">
                  What&apos;s Next?
                </h2>
                <ul className="text-left space-y-2 text-gray-600">
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">•</span>
                    <span>Our team is reviewing your information</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">•</span>
                    <span>You&apso;ll receive a confirmation email shortly</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">•</span>
                    <span>
                      A team member will reach out to discuss your needs
                    </span>
                  </li>
                </ul>
              </div>

              {/* CTA Button */}
              <button className="bg-blue-600 text-white font-semibold px-8 py-3 rounded-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 shadow-md">
                Return to Homepage
              </button>

              {/* Footer Text */}
              <p className="text-sm text-gray-500 mt-6">
                Questions? Contact us at{" "}
                <a
                  href="mailto:support@sexuloon.com"
                  className="text-blue-600 hover:underline"
                >
                  support@sexuloon.com
                </a>
              </p>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-2xl mt-6">
      <h2 className="text-2xl font-bold text-center mb-6">
        Doctor Registration Form
      </h2>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* ========== Basic Personal Info ========== */}
        <section>
          <h3 className="text-xl font-semibold mb-4">
            Basic Personal Information
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            <input
              onChange={(e) =>
                setInfo({
                  ...info,
                  name: e.target.value,
                })
              }
              type="text"
              placeholder="Full Name"
              required
              className="border p-2 rounded w-full"
            />
            <select
              onChange={(e) =>
                setInfo({
                  ...info,
                  gender: e.target.value,
                })
              }
              required
              className="border p-2 rounded w-full"
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
            <input
              onChange={(e) =>
                setInfo({
                  ...info,
                  phonenumber: e.target.value,
                })
              }
              type="tel"
              placeholder="Phone Number"
              required
              className="border p-2 rounded w-full"
            />
            <input
              onChange={(e) =>
                setInfo({
                  ...info,
                  email: e.target.value,
                })
              }
              type="email"
              placeholder="Email"
              required
              className="border p-2 rounded w-full"
            />
            <textarea
              onChange={(e) =>
                setInfo({
                  ...info,
                  address: e.target.value,
                })
              }
              placeholder="Residential Address"
              required
              className="border p-2 rounded w-full md:col-span-2"
            ></textarea>
          </div>
        </section>

        {/* ========== Professional Credentials ========== */}
        <section>
          <h3 className="text-xl font-semibold mb-4">
            Professional Credentials
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            <input
              onChange={(e) =>
                setInfo({
                  ...info,
                  resnumber: e.target.value,
                })
              }
              type="text"
              placeholder="Medical Registration Number"
              required
              className="border p-2 rounded w-full"
            />
            <input
              onChange={(e) =>
                setInfo({
                  ...info,
                  qualification: e.target.value,
                })
              }
              type="text"
              placeholder="Qualification"
              required
              className="border p-2 rounded w-full"
            />
            <input
              onChange={(e) =>
                setInfo({
                  ...info,
                  yoe: e.target.value,
                })
              }
              type="number"
              placeholder="Years of Experience"
              required
              className="border p-2 rounded w-full"
            />
            <textarea
              onChange={(e) =>
                setInfo({
                  ...info,
                  specailzation: e.target.value,
                })
              }
              placeholder="Specialization"
              required
              className="border p-2 rounded w-full md:col-span-2"
            ></textarea>
          </div>
        </section>

        {/* ========== Optional Bio ========== */}
        <section>
          <h3 className="text-xl font-semibold mb-4">Optional Introduction</h3>
          <textarea
            onChange={(e) =>
              setInfo({
                ...info,
                optional: e.target.value,
              })
            }
            placeholder="Write a short bio/introduction about yourself..."
            className="border p-2 rounded w-full"
          ></textarea>
        </section>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
