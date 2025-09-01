"use client";

import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

export default function ProductFaq({ faqs }) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setActiveIndex((prev) => (prev === index ? null : index));
  };

  return (
    <div className="bg-[#f9f7f5] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-4xl font-semibold text-center mb-8">FAQs</h2>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="border rounded-md bg-white shadow-sm">
              <button
                className="flex justify-between items-center w-full p-4 text-left font-medium text-black focus:outline-none"
                onClick={() => toggleFAQ(index)}
              >
                <span>{faq?.question}</span>
                {activeIndex === index ? (
                  <ChevronUp className="w-5 h-5 text-orange-500" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-black" />
                )}
              </button>
              {activeIndex === index && (
                <div className="p-4 pt-0 text-gray-700 text-[17px] leading-7">
                  {faq?.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
