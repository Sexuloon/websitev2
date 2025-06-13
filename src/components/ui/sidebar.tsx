'use client';

import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";

const slideImages = [
  {
    url: "https://images.unsplash.com/photo-1628771065518-0d82f1938462?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
  },
  {
    url: "https://plus.unsplash.com/premium_photo-1681996336639-ad2b31aeac11?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
  },
  {
    url: "https://plus.unsplash.com/premium_photo-1681995746040-a5f679a3568a?q=80&w=2106&auto=format&fit=crop&ixlib=rb-4.0.3",
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
                h-[450px]
                sm:h-[400px]
                md:h-[410px]
                lg:h-[420px]
                xl:h-[420px]
                bg-cover bg-center bg-no-repeat
              "
              style={{ backgroundImage: `url(${slideImage.url})` }}
            />
          </div>
        ))}
      </Slide>
    </div>
  );
}

export default SlideShow;
