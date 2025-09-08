"use client";

import { Instagram, Linkedin } from "lucide-react";
import { useState } from "react";

export default function FAQPage() {
  const [activeTopic, setActiveTopic] = useState("General");
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  // Group questions into topics
  const topics: Record<string, { q: string; a: string }[]> = {
    General: [
      {
        q: "What is Sexuloon?",
        a: "Sexuloon is your trusted partner for men’s sexual wellness. From Ayurveda & Unani solutions to doctor consultations, we’ve got you covered—confidentially.",
      },
      {
        q: "Who can use Sexuloon?",
        a: "Any man aged 18+ who wants to improve his sexual health.",
      },
      {
        q: "Can I use Sexuloon if I’m just curious about my health?",
        a: "Of course! You don’t need to have a “problem” to care about your sexual health. Prevention and awareness are equally important.",
      },
    ],
    Privacy: [
      {
        q: "Will anyone know I ordered?",
        a: "Nope. We respect your privacy. Every product is delivered in 100% discreet packaging with no mention of sexual health.",
      },
      {
        q: "Will my parents find out?",
        a: "No chance! Your orders are completely private—only you will know.",
      },
      {
        q: "Is it awkward to consult online?",
        a: "Not at all. Our doctors are professionals who deal with men’s health daily. You’ll feel comfortable and heard.",
      },
    ],
    "Doctors & Medicines": [
      {
        q: "Are the medicines safe?",
        a: "Absolutely! Our natural remedies are made with certified ingredients. Modern treatments are prescribed only by MBBS doctors.",
      },
      {
        q: "Do I need a prescription?",
        a: "Not always. For Ayurveda & Unani remedies, you don’t. For modern medicines, you’ll need a doctor’s prescription—which you can get right here on our platform.",
      },
      {
        q: "Can I talk to a doctor online?",
        a: "Yes! You can book a private consultation with our MBBS-certified doctors anytime, from the comfort of your home.",
      },
      {
        q: "What problems can Sexuloon help with?",
        a: "We help with issues like premature ejaculation, erectile dysfunction, low testosterone, and overall sexual performance.",
      },
    ],
    "Delivery & Trust": [
      {
        q: "How much does it cost?",
        a: "Doctor consultations start at just ₹350, while natural remedies vary based on your needs.",
      },
      {
        q: "Where do you deliver?",
        a: "Across India 🇮🇳 with safe, discreet, and fast delivery.",
      },
      {
        q: "Why should I trust Sexuloon?",
        a: "Because we’re here to remove the shame around men’s sexual health. We combine science + natural care, all while keeping your privacy first.",
      },
    ],
  };

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="bg-[#fdf6ec]">
      {/* FAQ Section */}
      <section className="min-h-screen py-12 px-4 sm:px-6">
        {/* Header Section */}
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="md:w-1/2 text-center md:text-left">
            <h1 className="text-3xl sm:text-4xl font-bold mb-4">
              Frequently Asked Questions
            </h1>
            <p className="text-gray-600">
              Welcome to our FAQ section, where you will find answers to all
              your burning questions!
            </p>
          </div>
          {/* Right side images */}
          <div className="md:w-1/2 flex gap-4 md:justify-end overflow-x-auto md:overflow-visible">
            <img
              src="/doctor.jpg"
              alt="faq"
              className="w-24 h-24 sm:w-28 sm:h-28 rounded-lg object-cover shadow-md flex-shrink-0"
            />
            <img
              src="/q.jpg"
              alt="faq"
              className="w-24 h-24 sm:w-28 sm:h-28 rounded-lg object-cover shadow-md flex-shrink-0"
            />
            <img
              src="/couple.jpg"
              alt="faq"
              className="w-24 h-24 sm:w-28 sm:h-28 rounded-lg object-cover shadow-md flex-shrink-0"
            />
          </div>
        </div>

        {/* FAQ Section */}
        <div className="max-w-6xl mx-auto mt-12 flex flex-col md:flex-row gap-8">
          {/* Left Side: Topics */}
          <div className="hidden md:block md:w-1/3 border-r pr-6">
            {Object.keys(topics).map((topic) => (
              <div
                key={topic}
                className={`cursor-pointer py-3 font-semibold ${
                  activeTopic === topic
                    ? "text-black border-l-4 border-black pl-2"
                    : "text-gray-500"
                }`}
                onClick={() => {
                  setActiveTopic(topic);
                  setOpenIndex(null);
                }}
              >
                {topic}
              </div>
            ))}
          </div>

          {/* Mobile tabs */}
          <div className="md:hidden flex gap-4 overflow-x-auto pb-2 border-b">
            {Object.keys(topics).map((topic) => (
              <button
                key={topic}
                className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium ${
                  activeTopic === topic
                    ? "bg-black text-white"
                    : "bg-gray-200 text-gray-600"
                }`}
                onClick={() => {
                  setActiveTopic(topic);
                  setOpenIndex(null);
                }}
              >
                {topic}
              </button>
            ))}
          </div>

          {/* Right Side: Questions & Answers */}
          <div className="md:w-2/3 space-y-4">
            {topics[activeTopic].map((faq, index) => (
              <div
                key={index}
                className={`rounded-xl border p-4 ${
                  openIndex === index ? "bg-red-100 shadow-md" : "bg-white"
                }`}
              >
                <button
                  className="w-full flex justify-between items-center text-left font-semibold"
                  onClick={() => toggleFAQ(index)}
                >
                  {faq.q}
                  <span>{openIndex === index ? "−" : "+"}</span>
                </button>
                {openIndex === index && (
                  <p className="mt-2 text-gray-600">{faq.a}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom Section */}
      <section className="w-full bg-[#fdf6ec] text-black px-4 md:px-8 py-12 md:py-20">
        {/* Highlight Box */}
        <div className="max-w-4xl mx-auto bg-orange-200 rounded-xl shadow-lg border-2 border-yellow-400 p-8 md:p-12 text-center relative">
          <h2 className="text-3xl md:text-4xl font-bold text-brown-800">
            Unlock Your Wellness Potential
          </h2>
          <p className="mt-4 text-brown-700 text-base md:text-lg">
            Ready to improve your health and productivity? <br />
            Sexuloon simplifies the process with trusted wellness solutions.
          </p>
          <button className="mt-6 px-6 py-3 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold rounded-lg shadow-md transition">
            Get Started
          </button>
        </div>

        {/* Footer */}
        <div className="max-w-4xl mx-auto mt-12 text-center">
          <h3 className="text-lg font-semibold">Sexuloon</h3>
          <p className="text-gray-400 mt-2">
            A trusted health & wellness medicine platform that makes wellness
            simple.
          </p>

          {/* Social Icons */}
          <div className="flex justify-center gap-6 mt-6">
            <a
              href="#"
              aria-label="LinkedIn"
              className="p-2 rounded-full border border-gray-600 hover:border-white transition"
            >
              <Linkedin className="w-6 h-6" />
            </a>
            <a
              href="#"
              aria-label="Instagram"
              className="p-2 rounded-full border border-gray-600 hover:border-white transition"
            >
              <Instagram className="w-6 h-6" />
            </a>
          </div>

          {/* Copyright */}
          <p className="mt-8 text-gray-500 text-sm">
            Copyright © 2025 Sexuloon
          </p>
        </div>
      </section>
    </div>
  );
}
