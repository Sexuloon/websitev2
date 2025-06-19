'use client';

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
    <div className="w-full">
      <Slide
        duration={3000}
        autoplay
        transitionDuration={500}
        infinite
        indicators={false}
        arrows={false}
      >
        {slideImages.map((slideImage, index) => (
          <div key={index}>
            <div
              className="
                w-full
                h-[250px]
                sm:h-[350px]
                md:h-[400px]
                lg:h-[460px]
                xl:h-[480px]
                relative
                bg-black
              "
            >
              <Image
                src={slideImage.url}
                alt={`Slide ${index}`}
                fill
                priority
                sizes="100vm"
                className="w-full h-full"
              />
            </div>
          </div>
        ))}
      </Slide>
    </div>
  );
}

export default SlideShow;
