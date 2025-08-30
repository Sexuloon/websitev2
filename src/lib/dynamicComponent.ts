import CustomerReview from "@/components/ui/customerreview";
import OffersAndSatisfaction from "@/components/ui/offer";
import OurPromise from "@/components/ui/OurPromise";
import ProductFaq from "@/components/ui/productfaq";
import TestimonialCarousel from "@/components/ui/testimonials";



export const dynamicComponent = (key: string) => {
  const componentObject = {
    ejacure: {
      offer: OffersAndSatisfaction,
      bannerImg: "/Sexuloon Ejacure web design 2.jpg",
      successStories: TestimonialCarousel,
      faq: ProductFaq,
      customerReview: CustomerReview,
      featureImg: "/Sexuloon Ejacure web design.jpg",
      cta: OurPromise,
    },
    testofix: {
      offer: OffersAndSatisfaction,
      bannerImg: "/Sexuloon Ejacure web design 2.jpg",
      successStories: TestimonialCarousel,
      faq: ProductFaq,
      customerReview: CustomerReview,
      featureImg: "/Sexuloon Ejacure web design.jpg",
      cta: OurPromise,
    },
  };

  return componentObject[key] || {};
};
