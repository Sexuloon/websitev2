"use client";

import { Plus, Minus } from "lucide-react";
import { useState } from "react";

export default function ProductFaq({ faqs }: { faqs: { question: string; answer: string }[] }) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setActiveIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section className="bg-white dark:bg-[#080808] py-16 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <div className="max-w-3xl mx-auto">
        <p className="text-[11px] font-bold tracking-widest text-emerald-700 dark:text-[#C9A84C] uppercase mb-3">
          Got Questions?
        </p>
        <h2 className="font-display text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-10">
          Frequently Asked Questions
        </h2>

        <div className="space-y-2">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                activeIndex === index
                  ? "border-emerald-300 bg-emerald-50 dark:border-[#C9A84C]/40 dark:bg-[#111111]"
                  : "border-gray-200 bg-gray-50 hover:border-emerald-200 dark:border-[#262626] dark:bg-[#111111] dark:hover:border-[#C9A84C]/20"
              }`}
            >
              <button
                className="flex justify-between items-center w-full px-5 py-4 text-left"
                onClick={() => toggleFAQ(index)}
              >
                <span className={`font-medium text-base pr-6 transition-colors ${
                  activeIndex === index ? "text-emerald-800 dark:text-[#E8C87A]" : "text-gray-700 dark:text-[#F5F0E8]"
                }`}>
                  {faq?.question}
                </span>
                <span className={`shrink-0 w-7 h-7 rounded-full border flex items-center justify-center transition-all duration-200 ${
                  activeIndex === index
                    ? "border-emerald-600 bg-emerald-100 text-emerald-700 dark:border-[#C9A84C] dark:bg-[#C9A84C]/10 dark:text-[#C9A84C]"
                    : "border-gray-200 text-gray-500 dark:border-[#262626] dark:text-[#7A6E62]"
                }`}>
                  {activeIndex === index ? (
                    <Minus className="w-3.5 h-3.5" />
                  ) : (
                    <Plus className="w-3.5 h-3.5" />
                  )}
                </span>
              </button>

              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  activeIndex === index ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <p className="px-5 pb-5 text-gray-600 dark:text-[#B8A99A] text-sm leading-relaxed pr-12">
                  {faq?.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
