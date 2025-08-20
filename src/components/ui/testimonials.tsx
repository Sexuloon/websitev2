"use client";

import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";

const testimonials = [
  { 
    name: "Rohit, 28", 
    shortText: `I was very nervous about trying anything, but within two weeks I started noticing changes...`, 
    fullText: `I was very nervous about trying anything, but within two weeks I started noticing changes. It gave me a sense of relief that something finally worked.` 
  },
  { 
    name: "Arjun, 31", 
    shortText: `At first I thought it would be like the other things I tried, but this time it was different...`, 
    fullText: `At first I thought it would be like the other things I tried, but this time it was different. My problem actually started improving slowly.` 
  },
  { 
    name: "Sameer, 27", 
    shortText: `The best part for me was that it worked naturally, and I didn’t feel any side effects...`, 
    fullText: `The best part for me was that it worked naturally, and I didn’t feel any side effects. I just felt better week by week.` 
  },
  { 
    name: "Nikhil, 30", 
    shortText: `I didn’t talk to anyone about my issue for a long time. Using this made me feel more normal again...`, 
    fullText: `I didn’t talk to anyone about my issue for a long time. Using this made me feel more normal again, and my confidence slowly came back.` 
  },
  { 
    name: "Faiz, 33", 
    shortText: `I saw changes after about 10 days. Small improvements at first, but they kept getting better...`, 
    fullText: `I saw changes after about 10 days. Small improvements at first, but they kept getting better. That gave me hope.` 
  },
  { 
    name: "Vikram, 29", 
    shortText: `What I liked most is that it was private and easy to use. I didn’t have to explain my problem...`, 
    fullText: `What I liked most is that it was private and easy to use. I didn’t have to explain my problem to anyone face to face, but I still got results.` 
  },
];


const TestimonialCarousel = () => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardsPerView, setCardsPerView] = useState(3);

  // ✅ Responsive logic for cards per view
  useEffect(() => {
    const updateCardsPerView = () => {
      if (window.innerWidth < 640) {
        setCardsPerView(1); // Mobile
      } else if (window.innerWidth < 1024) {
        setCardsPerView(2); // Tablet
      } else {
        setCardsPerView(3); // Desktop
      }
    };

    updateCardsPerView();
    window.addEventListener("resize", updateCardsPerView);
    return () => window.removeEventListener("resize", updateCardsPerView);
  }, []);

  const maxIndex = testimonials.length - cardsPerView;

  const toggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : maxIndex));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev < maxIndex ? prev + 1 : 0));
  };

  return (
    <section className="bg-white py-12 px-4 relative">
      <h2 className="text-3xl font-semibold text-center mb-8">
        Featured Customer Reviews
      </h2>

      {/* Carousel Container */}
      <div className="flex items-center justify-center max-w-[1400px] mx-auto relative">
        {/* Left Arrow */}
        <button
          onClick={handlePrev}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white rounded-full shadow-md p-2 hover:bg-gray-100 z-10"
        >
          <ChevronLeftIcon className="h-6 w-6 text-gray-700" />
        </button>

        {/* Cards Wrapper */}
        <div className="overflow-hidden w-full">
          <div
            className="flex gap-6 transition-transform duration-500"
            style={{
              transform: `translateX(-${currentIndex * (100 / cardsPerView)}%)`,
              width: `${(testimonials.length / cardsPerView) * 100}%`,
            }}
          >
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-[#FFF4DC] rounded-2xl p-6 text-center shadow-md flex-shrink-0"
                style={{
                  flex: `0 0 ${100 / cardsPerView}%`,
                }}
              >
                {/* Star Rating */}
                <div className="flex justify-center mb-4">
                  {Array(5)
                    .fill(0)
                    .map((_, i) => (
                      <svg
                        key={i}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-6 h-6 text-orange-500"
                      >
                        <path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.879 1.486 8.315L12 18.897l-7.422 4.603 1.486-8.315L0 9.306l8.332-1.151z" />
                      </svg>
                    ))}
                </div>

                {/* Testimonial Text */}
                <p className="text-gray-700 text-base mb-4 leading-relaxed">
                  {expandedIndex === index
                    ? `"${testimonial.fullText}"`
                    : `"${testimonial.shortText}"`}{" "}
                  <span
                    className="text-orange-500 font-semibold cursor-pointer hover:underline"
                    onClick={() => toggleExpand(index)}
                  >
                    {expandedIndex === index ? "less" : "more"}
                  </span>
                </p>

                {/* Customer Name */}
                <p className="text-gray-800 font-medium">{testimonial.name}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Right Arrow */}
        <button
          onClick={handleNext}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white rounded-full shadow-md p-2 hover:bg-gray-100 z-10"
        >
          <ChevronRightIcon className="h-6 w-6 text-gray-700" />
        </button>
      </div>
    </section>
  );
};

export default TestimonialCarousel;
