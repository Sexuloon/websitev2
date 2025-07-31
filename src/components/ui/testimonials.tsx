'use client'

import { ChevronLeft, ChevronRight } from 'lucide-react'
import Image from 'next/image'
import React, { useEffect, useRef, useState } from 'react'

type Testimonial = {
  name: string
  role: string
  image: string
  testimonial: string
}

const testimonials: Testimonial[] = [
  // Your testimonials array (same as before)
  {
    name: 'Aditi Sharma',
    role: 'Design Lead, StudentHustle',
    image: '/images/aditi.png',
    testimonial: 'The SkillBattles challenges kept my creativity alive every single day. A total game-changer.',
  },
  {
    name: 'Ravi Singh',
    role: 'Frontend Intern, DevSpark',
    image: '/images/ravi.png',
    testimonial: 'I built habits, improved skills, and had fun. It doesn’t even feel like “learning”.',
  },
  {
    name: 'Sneha Roy',
    role: 'Marketing Intern, ThinkQuotient',
    image: '/images/sneha.png',
    testimonial: 'Finally, an app that rewards effort, not just certificates. This is the future.',
  },
  {
    name: 'Rishabh',
    role: 'Wellness User',
    image: '/banner2.png',
    testimonial: 'Noticed better stress management in just 2 months. Felt calmer and more balanced every day.',
  },
  {
    name: 'Ujjwal',
    role: 'Productivity Enthusiast',
    image: '/banner3.jpg',
    testimonial: 'Experienced elevated focus and mental clarity within 3 months of consistent use.',
  },
  {
    name: 'Pranay',
    role: 'Athlete in Recovery',
    image: '/banner3.jpg',
    testimonial: 'Observed better recovery times and lower fatigue in just 3 months.',
  },
]

const TestimonialCarousel: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [isPaused, setIsPaused] = useState(false)

  // Duplicate testimonials to create loop
  const fullList = [...testimonials, ...testimonials]

  useEffect(() => {
    const scroll = () => {
      if (!scrollRef.current || isPaused) return
      scrollRef.current.scrollLeft += 1
      if (scrollRef.current.scrollLeft >= scrollRef.current.scrollWidth / 2) {
        scrollRef.current.scrollLeft = 0
      }
    }
    const interval = setInterval(scroll, 20)
    return () => clearInterval(interval)
  }, [isPaused])

  const scrollByAmount = (amount: number) => {
    if (!scrollRef.current) return
    scrollRef.current.scrollBy({ left: amount, behavior: 'smooth' })
  }

  return (
    <div className="w-full">
      <h1 className="text-3xl md:text-4xl font-extrabold text-center text-gray-900 mb-8 mt-12">
        Our Community’s Success Stories!
      </h1>
    <div className="relative w-full overflow-hidden">
      {/* Left Arrow */}
      <button
        onClick={() => scrollByAmount(-300)}
        className="absolute left-2 top-1/2 z-10 -translate-y-1/2 bg-white/80 hover:bg-white text-black p-2 rounded-full shadow"
      >
        <ChevronLeft size={24} />
      </button>

      {/* Right Arrow */}
      <button
        onClick={() => scrollByAmount(300)}
        className="absolute right-2 top-1/2 z-10 -translate-y-1/2 bg-white/80 hover:bg-white text-black p-2 rounded-full shadow"
      >
        <ChevronRight size={24} />
      </button>

      {/* Carousel */}
      <div
        ref={scrollRef}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        className="flex w-full space-x-6 px-4 py-6 overflow-hidden"
        style={{ scrollBehavior: 'smooth' }}
      >
        {fullList.map((t, i) => (
          <div
            key={i}
            className="flex-shrink-0 w-80 p-[1px] rounded-2xl bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500"
          >
            <div className="h-full w-full bg-white text-black rounded-2xl p-5 shadow-lg">
              <div className="flex items-center space-x-4 mb-4">
                <Image
                  src={t.image}
                  alt={t.name}
                  width={72}
                  height={72}
                  className="rounded-full object-cover border-2 border-black"
                />
                <div>
                  <h4 className="text-lg font-bold">{t.name}</h4>
                  <p className="text-sm text-gray-700">{t.role}</p>
                </div>
              </div>
              <p className="text-sm">{t.testimonial}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
    </div>
  )
}

export default TestimonialCarousel
