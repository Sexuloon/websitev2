'use client'

import { ChevronDown, ChevronUp } from 'lucide-react'
import { useState } from 'react'

const faqs = [
  {
    question: 'How long does Ejacure take to show results?',
    answer:
      // 'Dive+ is fully app-enabled—so all its live-control and custom pattern features come to life in MyMuse Sync App. Flick, on the other hand, is designed as a standalone tongue massager and doesn’t require an app to deliver those fluttery, toe-curling sensations. It’s so intuitive that you can simply power it on and start exploring—no app needed!',
      'Most users begin noticing improvements within 2–3 weeks of consistent use. However, results may vary depending on individual body response and lifestyle habits.',
  },
  {
    question: 'Is Ejacure made with natural ingredients?',
    answer:
      'Yes, Ejacure is formulated with 100% natural Unani ingredients, traditionally used to support men’s sexual wellness without harmful side effects.',
  },
  {
    question: 'Can I take Ejacure with other supplements or medications?',
    answer:
      'While Ejacure is generally safe, we recommend consulting a qualified healthcare professional if you are already on other medications or supplements.',
  },
  {
    question: ' Is Ejacure a one-time fix or do I need to take it regularly?',
    answer:
      'Ejacure supports long-term improvement through consistent use. It’s not a temporary or instant solution, but a natural way to restore performance over time.',
  },
]

export default function ProductFaq() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  const toggleFAQ = (index: number) => {
    setActiveIndex(prev => (prev === index ? null : index))
  }

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
                <span>{faq.question}</span>
                {activeIndex === index ? (
                  <ChevronUp className="w-5 h-5 text-orange-500" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-black" />
                )}
              </button>
              {activeIndex === index && (
                <div className="p-4 pt-0 text-gray-700 text-[17px] leading-7">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
