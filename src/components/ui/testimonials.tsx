"use client";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Rohit, 28",
    fullText: `I was very nervous about trying anything, but within two weeks I started noticing changes. It gave me a sense of relief that something finally worked.`,
    rating: 5,
  },
  {
    name: "Arjun, 31",
    fullText: `At first I thought it would be like the other things I tried, but this time it was different. My problem actually started improving slowly.`,
    rating: 5,
  },
  {
    name: "Sameer, 27",
    fullText: `The best part for me was that it worked naturally, and I didn’t feel any side effects. I just felt better week by week.`,
    rating: 5,
  },
  {
    name: "Nikhil, 30",
    fullText: `I didn’t talk to anyone about my issue for a long time. Using this made me feel more normal again, and my confidence slowly came back.`,
    rating: 5,
  },
  {
    name: "Faiz, 33",
    fullText: `I saw changes after about 10 days. Small improvements at first, but they kept getting better. That gave me hope.`,
    rating: 5,
  },
  {
    name: "Vikram, 29",
    fullText: `What I liked most is that it was private and easy to use. I didn’t have to explain my problem to anyone face to face, but I still got results.`,
    rating: 5,
  },
];

const TestimonialCarousel = () => {
  return (
    <section className="bg-white py-12 px-10 lg:px-4 relative w-full">
      <h2 className="text-3xl font-bold text-center mb-10">
        Featured Customer Reviews
      </h2>

      {/* Carousel */}
      <Carousel
        opts={{
          align: "start",
        }}
        className="w-full"
      >
        <CarouselContent>
          {testimonials.map((t, index) => (
            <CarouselItem
              key={index}
              className="md:basis-1/2 lg:basis-1/3 px-2"
            >
              <Card className="shadow-lg rounded-2xl border border-gray-200 h-full">
                <CardContent className="flex flex-col items-center justify-between text-center p-6 h-full">
                  {/* Stars */}
                  <div className="flex mb-4">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`h-5 w-5 ${
                          i < t.rating ? "text-yellow-500 fill-yellow-500" : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>

                  {/* Testimonial text */}
                  <p className="text-gray-700 text-base mb-4 leading-relaxed">
                    “{t.fullText}”
                  </p>

                  {/* Name */}
                  <span className="text-sm font-semibold text-gray-900">
                    {t.name}
                  </span>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </section>
  );
};

export default TestimonialCarousel;
