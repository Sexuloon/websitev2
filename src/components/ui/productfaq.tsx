"use client";

import { Plus, Minus } from "lucide-react";
import { useState } from "react";

export default function ProductFaq({ faqs }: { faqs: { question: string; answer: string }[] }) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setActiveIndex((prev) => (prev === index ? null : index));
  };

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-semibold text-gray-900 mb-8">
          Frequently asked questions
        </h2>
        <div className="divide-y divide-gray-200">
          {faqs.map((faq, index) => (
            <div key={index}>
              <button
                className="flex justify-between items-center w-full py-5 text-left focus:outline-none group"
                onClick={() => toggleFAQ(index)}
              >
                <span className="text-gray-800 font-medium text-base pr-6 group-hover:text-[#1a4731] transition-colors">
                  {faq?.question}
                </span>
                <span className="shrink-0 text-gray-500 group-hover:text-[#1a4731] transition-colors">
                  {activeIndex === index ? (
                    <Minus className="w-5 h-5" />
                  ) : (
                    <Plus className="w-5 h-5" />
                  )}
                </span>
              </button>
              {activeIndex === index && (
                <div className="pb-5 text-gray-600 text-[15px] leading-relaxed pr-8">
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
