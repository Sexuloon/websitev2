"use client";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";

const slideImages = [
  {
    url: "./header1.png",
  },
  {
    url: "./header2.jpg",
  },
  {
    url: "./header3.jpg",
  },
  {
    url: "./header4.jpg",
  },
];

function SlideShow() {
  return (
    <div className="w-full relative">
      <div className="w-full  overflow-hidden rounded-md">
        <Slide
          duration={3000}
          autoplay
          transitionDuration={500}
          infinite
          indicators={false}
          arrows={true}
        >
          {slideImages.map((slideImage, index) => (
            <div key={index} className="w-full">
              <div className="relative w-full">
                <img
                  className="w-full h-full object-cover"
                  src={slideImage.url}
                  alt={`Slide ${index + 1}`}
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
