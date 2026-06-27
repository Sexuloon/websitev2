"use client";

import { Plus, Minus } from "lucide-react";
import { useState } from "react";

export default function ProductFaq({ faqs }: { faqs: { question: string; answer: string }[] }) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setActiveIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section className="bg-[#080808] py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <p className="text-[11px] font-bold tracking-widest text-[#C9A84C] uppercase mb-3">
          Got Questions?
        </p>
        <h2 className="font-display text-3xl sm:text-4xl font-bold text-white mb-10">
          Frequently Asked Questions
        </h2>

        <div className="space-y-2">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                activeIndex === index
                  ? "border-[#C9A84C]/40 bg-[#111111]"
                  : "border-[#262626] bg-[#111111] hover:border-[#C9A84C]/20"
              }`}
            >
              <button
                className="flex justify-between items-center w-full px-5 py-4 text-left"
                onClick={() => toggleFAQ(index)}
              >
                <span className={`font-medium text-base pr-6 transition-colors ${
                  activeIndex === index ? "text-[#E8C87A]" : "text-[#F5F0E8]"
                }`}>
                  {faq?.question}
                </span>
                <span className={`shrink-0 w-7 h-7 rounded-full border flex items-center justify-center transition-all duration-200 ${
                  activeIndex === index
                    ? "border-[#C9A84C] bg-[#C9A84C]/10 text-[#C9A84C]"
                    : "border-[#262626] text-[#7A6E62]"
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
                <p className="px-5 pb-5 text-[#B8A99A] text-sm leading-relaxed pr-12">
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
