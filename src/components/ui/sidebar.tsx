"use client";
import Image from "next/image";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";

const slideImages = [
  {
    url: "https://res.cloudinary.com/drw4abclv/image/upload/v1750299163/banner1_fkdtbd.jpg",
  },
  {
    url: "https://res.cloudinary.com/drw4abclv/image/upload/v1750299166/banner2_xla34u.png",
  },
  {
    url: "https://res.cloudinary.com/drw4abclv/image/upload/v1750299164/banner3_unm484.jpg",
  },
];

function SlideShow() {
  return (
    <div className="w-full relative">
      <div className="w-full aspect-[16/9] sm:aspect-[16/9] md:aspect-[21/9] lg:aspect-[5/2] overflow-hidden rounded-md">
        <Slide
          duration={3000}
          autoplay
          transitionDuration={500}
          infinite
          indicators={false}
          arrows={true}
        >
          {slideImages.map((slideImage, index) => (
            <div key={index} className="w-full h-full">
              <div className="relative w-full h-[100rem]">
                <Image
                  suppressHydrationWarning
                  width={10000}
                  height={10000}
                  src={slideImage.url}
                  alt={`Slide ${index + 1}`}
                  className="object-cover"
                  priority={index === 0}
                />
              </div>
            </div>
          ))}
        </Slide>
      </div>
    </div>
  );
}

export default SlideShow;
