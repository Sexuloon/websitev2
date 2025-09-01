import CustomerReview from "@/components/ui/customerreview";
import OffersAndSatisfaction from "@/components/ui/offer";
import OurPromise from "@/components/ui/OurPromise";
import ProductFaq from "@/components/ui/productfaq";
import TestimonialCarousel from "@/components/ui/testimonials";
import {
  offers_Ejacure,
  satisfaction_Ejacure,
  testimonials_Ejacure,
  faqs_Ejacure,
  reviews_Ejacure,
  allReviews_Ejacure,
  promises_Ejacure,
  offers_Electrosure,
  satisfactionData_Electrosure,
  testimonials_Electrosure,
  faqs_Electrosure,
  allReviews_Electrosure,
  promises_Electrosure,
  offers_Staminor,
  offers_Testofix,
  allReviews_Staminor,
  allReviews_Testofix,
  faqs_Staminor,
  faqs_Testofix,
  promises_Staminor,
  promises_Testofix,
  satisfactionData_Staminor,
  satisfactionData_Testofix,
  testimonials_Staminor,
  testimonials_testofix
} from "@/lib/data";

export const dynamicComponent = (key: string) => {
  const componentObject = {
    ejacure: {
      offer: OffersAndSatisfaction,
      offerProps: offers_Ejacure,
      satisfactionProps: satisfaction_Ejacure,
      bannerImg: "/Sexuloon Ejacure web design 2.jpg",
      successStories: TestimonialCarousel,
      successStoriesProps: testimonials_Ejacure,
      faq: ProductFaq,
      faqProps: faqs_Ejacure,
      customerReview: CustomerReview,
      reviewProps: reviews_Ejacure,
      allReviewProps: allReviews_Ejacure,
      featureImg: "/Sexuloon Ejacure web design.jpg",
      cta: OurPromise,
      ctaProps: promises_Ejacure,
    },

    erectossure: {
      offer: OffersAndSatisfaction,
      offerProps: offers_Electrosure,
      satisfactionProps: satisfactionData_Electrosure,
      bannerImg: "/Sexuloon Ejacure web design 2.jpg",
      successStories: TestimonialCarousel,
      successStoriesProps: testimonials_Electrosure,
      faq: ProductFaq,
      faqProps: faqs_Electrosure,
      customerReview: CustomerReview,
      reviewProps: reviews_Ejacure,
      allReviewProps: allReviews_Electrosure,
      featureImg: "/Sexuloon Ejacure web design.jpg",
      cta: OurPromise,
      ctaProps: promises_Electrosure,
    },
    testofix: {
      offer: OffersAndSatisfaction,
      offerProps: offers_Testofix,
      satisfactionProps: satisfactionData_Testofix,
      bannerImg: "/Sexuloon Ejacure web design 2.jpg",
      successStories: TestimonialCarousel,
      successStoriesProps: testimonials_testofix,
      faq: ProductFaq,
      faqProps: faqs_Testofix,
      customerReview: CustomerReview,
      reviewProps: reviews_Ejacure,
      allReviewProps: allReviews_Testofix,
      featureImg: "/Sexuloon Ejacure web design.jpg",
      cta: OurPromise,
      ctaProps: promises_Testofix,
    },
    staminor:{
      offer: OffersAndSatisfaction,
      offerProps: offers_Staminor,
      satisfactionProps: satisfactionData_Staminor,
      bannerImg: "/Sexuloon Ejacure web design 2.jpg",
      successStories: TestimonialCarousel,
      successStoriesProps: testimonials_Staminor,
      faq: ProductFaq,
      faqProps: faqs_Staminor,
      customerReview: CustomerReview,
      reviewProps: reviews_Ejacure,
      allReviewProps: allReviews_Staminor,
      featureImg: "/Sexuloon Ejacure web design.jpg",
      cta: OurPromise,
      ctaProps: promises_Staminor,

    }
  };

  return componentObject[key] || {};
};
