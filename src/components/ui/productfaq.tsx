'use client'

import { ChevronDown, ChevronUp } from 'lucide-react'
import { useState } from 'react'

const faqs = [
  {
    question: 'Can I use both Dive+ and Flick with the MyMuse Sync app?',
    answer:
      'Dive+ is fully app-enabled—so all its live-control and custom pattern features come to life in MyMuse Sync App. Flick, on the other hand, is designed as a standalone tongue massager and doesn’t require an app to deliver those fluttery, toe-curling sensations. It’s so intuitive that you can simply power it on and start exploring—no app needed!',
  },
  {
    question: 'Is gift-wrapping an option?',
    answer:
      'Yes! Select the option at checkout and leave a note for your recipient. We’ll take care of the rest :)',
  },
  {
    question: 'Will the products be shipped together in one box?',
    answer:
      'Yes, all products in a single order will be shipped together in one discreet, sturdy box for your convenience.',
  },
  {
    question: 'What kind of occasions can I gift this for?',
    answer:
      'Perfect for birthdays, anniversaries, weddings, bachelorette parties, Valentine’s Day, or just because!',
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
