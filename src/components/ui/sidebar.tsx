"use client";
import Image from "next/image";
import { Slide } from "react-slideshow-image";
import { AspectRatio } from "@/components/ui/aspect-ratio";
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
      <AspectRatio ratio={5 / 3} className="sm:ratio-[16/9] md:ratio-[21/9] lg:ratio-[5/2]">
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
              <Image
                width={1000}
                height={1000}
                src={slideImage.url}
                alt={`Slide ${index}`}
                className="rounded-md object-cover w-full h-full"
              />
            </div>
          ))}
        </Slide>
      </AspectRatio>
    </div>
  );
}

export default SlideShow;