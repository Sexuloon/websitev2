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

const TestimonialCarousel = ({ testimonials }) => {
  return (
    <section className="bg-white py-12 px-10 lg:px-6 relative w-full">
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
                          i < t.rating
                            ? "text-yellow-500 fill-yellow-500"
                            : "text-gray-300"
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
