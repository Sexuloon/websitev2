"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import BestPerformingPage from "../view/BestPerforming";
import BestSelling from "../view/BestSelling";
import Collections from "../view/Collections";

export default function Home() {
  const [activeCategory, setActiveCategory] = useState("Erectile Dysfunction");
  const [categoryValue, setCategoryValue] = useState("bettererections");
  // Categories
  const categories = [
    {
      key: "Erectile Dysfunction",
      value: "bettererections",
    },
    {
      key: "Premature Ejaculation",
      value: "lastlonger",
    },
    {
      key: "Low Testosterone",
      value: "lowtestostrone",
    },
    {
      key: "All Products",
      value: "allproduct",
    },
  ];

  return (
    <div className="bg-[#080808] w-full">
      <section id="feature-images">
        <div className="container mx-auto px-4 py-8">
          <div className="overflow-x-auto">
            <div className="grid grid-cols-3 gap-4 min-w-[768px]">
              {/* Card 1 */}
              <Link
                href="/collections/all-products"
                className="bg-white rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300 w-full block"
              >
                <div className="bg-blue-500 relative h-50">
                  <Image
                    src="https://res.cloudinary.com/drw4abclv/image/upload/v1751507104/1_mmc3zw.jpg"
                    width={600} // âœ… example size
                    height={400} // âœ… example size
                    alt="Card image"
                    className="object-fit w-full h-full"
                  />
                </div>
              </Link>

              {/* Card 2 */}
              <Link
                href="/collections/all-products"
                className="bg-white rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300 w-full block"
              >
                <div className="bg-blue-500 relative h-50">
                  <Image
                    src="https://res.cloudinary.com/drw4abclv/image/upload/v1751507269/2_nkai9e.jpg"
                    width={600} // âœ… example size
                    height={400} // âœ… example size
                    alt="Card image"
                    className="object-fit w-full h-full"
                  />
                </div>
              </Link>

              {/* Card 3 */}
              <Link
                href="/collections/all-products"
                className="bg-white rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300 w-full block"
              >
                <div className="bg-blue-500 relative h-50">
                  <Image
                    src="https://res.cloudinary.com/drw4abclv/image/upload/v1751507334/3_ncmmjk.jpg"
                    width={600} // âœ… example size
                    height={400} // âœ… example size
                    alt="Card image"
                    className="object-fit w-full h-full"
                  />
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Best Sellers Section - Enhanced product cards and filtering */}
      <section className="py-16 sm:py-24 bg-[#080808]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-start gap-4">
            {/* Heading */}
            <h2 className="font-display text-3xl font-bold text-white">Bestsellers</h2>

            {/* Category Buttons */}
            <div className="w-full overflow-x-auto scrollbar-hide">
              <div className="flex gap-4 min-w-max pb-2">
                {categories.map((category, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setActiveCategory(category.key);
                      setCategoryValue(category.value);
                    }}
                    className={`px-5 py-2.5 rounded-full border text-sm font-semibold whitespace-nowrap transition-all duration-200
                        ${
                          activeCategory === category.key
                            ? "bg-[#C9A84C] text-[#080808] border-[#C9A84C]"
                            : "bg-transparent text-[#B8A99A] border-[#262626] hover:border-[#C9A84C]/40 hover:text-[#C9A84C]"
                        }`}
                  >
                    {category.key}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="mt-10">
            <BestSelling category={categoryValue} />
          </div>

          {/* View All Button */}
          <div className="mt-12 text-center">
            <a href="/collections/all-products" className="border border-[#C9A84C]/40 text-[#C9A84C] hover:bg-[#C9A84C]/10 font-medium px-8 py-3 rounded-full inline-flex items-center gap-2 transition-all duration-200">
              View All Products →
            </a>
          </div>
        </div>
      </section>

      {/* Collections */}
      <section>
        <Collections />
      </section>

      {/* Best performing Section - Enhanced product cards and filtering */}
      <section className="py-16 sm:py-24 bg-[#080808]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
            <h2 className="font-display text-3xl font-bold text-white mb-4 sm:mb-0">
              Best Performing
            </h2>
          </div>

          {/* Products Grid - Enhanced cards with ratings and hover effects */}
          <section>
            <BestPerformingPage />
          </section>

          {/* View All Products Button */}
          <div className="mt-12 text-center">
            <a href="/collections/all-products" className="border border-[#C9A84C]/40 text-[#C9A84C] hover:bg-[#C9A84C]/10 font-medium px-8 py-3 rounded-full inline-flex items-center gap-2 transition-all duration-200">
              View All Products →
            </a>
          </div>
        </div>
      </section>

      <section className="bg-[#0d0d0d] border-t border-[#1e1e1e] py-12 sm:py-16 lg:py-20">
        <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col-reverse lg:flex-row items-center lg:items-start justify-between gap-10 lg:gap-16">
            {/* Left Content */}
            <div className="w-full lg:w-1/2 space-y-8">
              <div>
                <span className="inline-block bg-blue-100 text-blue-600 font-medium px-4 py-1 rounded-full text-sm mb-4">
                  Certified Doctors
                </span>
                <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight tracking-tight">
                  Empowering Men&apos;s
                  <br className="hidden sm:block" /> Sexual Health
                </h1>
                <p className="mt-4 text-lg text-gray-600 max-w-xl">
                  Get personalized treatments from certified doctors for
                  erectile dysfunction, premature ejaculation, and low
                  testosterone issues.
                </p>
              </div>

              {/* Service Boxes */}
              <div className="grid grid-cols-2 grid-rows-2 gap-4 sm:gap-6 mt-8">
                {[
                  {
                    title: "Free Consultation",
                    desc: "Get expert advice from our certified doctors",
                    icon: (
                      <path
                        fillRule="evenodd"
                        d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z"
                        clipRule="evenodd"
                      />
                    ),
                  },
                  {
                    title: "Custom Treatment",
                    desc: "Personalized plans for your specific needs",
                    icon: (
                      <>
                        <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                        <path
                          fillRule="evenodd"
                          d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z"
                          clipRule="evenodd"
                        />
                      </>
                    ),
                  },
                  {
                    title: "Flexible Scheduling",
                    desc: "Book appointments at your convenience",
                    icon: (
                      <path
                        fillRule="evenodd"
                        d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                        clipRule="evenodd"
                      />
                    ),
                  },
                  {
                    title: "Expert Doctors",
                    desc: "Connect with specialized medical professionals",
                    icon: (
                      <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                    ),
                  },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="flex flex-col justify-start h-full p-4 border border-[#262626] rounded-xl bg-[#111111] hover:border-[#C9A84C]/30 transition duration-300"
                  >
                    <div className="flex flex-col md:flex-row md:items-start items-center text-left gap-3">
                      <div className="bg-[#1a1500] p-3 rounded-lg border border-[#C9A84C]/20">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6 text-[#C9A84C]"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          {item.icon}
                        </svg>
                      </div>
                      <div className="text-center md:text-left">
                        <h4 className="font-semibold text-[#F5F0E8] text-sm sm:text-base">
                          {item.title}
                        </h4>
                        <p className="text-xs sm:text-sm text-[#7A6E62] mt-1 leading-snug">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-6">
                <a href="/consultancy" className="bg-[#1a4731] hover:bg-[#143828] text-white font-medium px-8 py-3 rounded-full inline-flex items-center gap-2 shadow-md transition-all duration-300">
                  Get Started Now →
                </a>
              </div>
            </div>

            {/* Right Content - Image */}
            <div className="w-full lg:w-1/2">
              <div className="rounded-3xl overflow-hidden shadow-xl transition-transform transform hover:-translate-y-2 duration-300">
                <div className="relative w-full h-80 sm:h-[450px] md:h-[500px] ">
                  <Image
                    src="https://images.pexels.com/photos/4173251/pexels-photo-4173251.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                    alt="Doctor"
                    fill
                    className="object-cover object-fit"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process Steps Section - Enhanced with numbered steps and better visuals */}
      <section className="py-16 sm:py-24 bg-[#080808]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block bg-[#1a1500] text-[#C9A84C] font-medium px-4 py-1 rounded-full text-sm mb-4 border border-[#C9A84C]/20">
              Fastest Solution
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-white leading-tight">
              4 Easy Steps To Get Your Solution
            </h2>
            <p className="mt-4 text-[#7A6E62] max-w-2xl mx-auto text-base sm:text-lg">
              Our streamlined process ensures you get the help you need quickly
              and discreetly
            </p>
          </div>

          {/* Step Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative">
            {[
              {
                step: "1",
                title: "Chat With Our A.I. Assistant",
                desc: "Describe your symptoms and concerns privately",
                img: "https://images.pexels.com/photos/6146929/pexels-photo-6146929.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
              },
              {
                step: "2",
                title: "Get Treatment Recommendations",
                desc: "Receive personalized medication suggestions",
                img: "https://images.pexels.com/photos/207601/pexels-photo-207601.jpeg?auto=compress&cs=tinysrgb&w=600",
              },
              {
                step: "3",
                title: "Consult With A Doctor",
                desc: "Have a private consultation with a specialist",
                img: "https://images.pexels.com/photos/5699479/pexels-photo-5699479.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
              },
              {
                step: "4",
                title: "Receive Discreet Delivery",
                desc: "Get your medication delivered in unmarked packaging",
                img: "https://images.pexels.com/photos/4226269/pexels-photo-4226269.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="relative flex flex-col items-center bg-[#111111] border border-[#262626] rounded-2xl p-6 sm:p-8 transition-all hover:border-[#C9A84C]/30"
              >
                <div className="absolute -top-4 -left-4 sm:-top-5 sm:-left-5 bg-[#C9A84C] text-[#080808] w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-sm sm:text-base font-bold z-10">
                  {item.step}
                </div>
                <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden border-4 border-[#C9A84C]/20 mb-6">
                  <Image
                    src={item.img}
                    alt={item.title}
                    width={1000}
                    height={1000}
                    className="object-cover w-full h-full"
                  />
                </div>
                <h3 className="text-center text-base sm:text-lg font-semibold text-[#F5F0E8]">
                  {item.title}
                </h3>
                <p className="text-sm sm:text-base text-[#7A6E62] text-center mt-2">
                  {item.desc}
                </p>
              </div>
            ))}

            {/* Arrows for mobile visual flow (only on small screens) */}
            <div className="col-span-2 sm:hidden mt-4 flex flex-col items-center gap-1 text-blue-500 text-xl font-bold">
              <span>↓</span>
              <div className="w-full flex justify-between px-6">
                <span>↙</span>
                <span>↘</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Doctor Consultation & Expert Q&A Sections - Combined into a features section */}
      <section className="py-16 sm:py-24 bg-[#080808]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Doctor Consultation Section */}
          <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16 mb-24">
            {/* Doctor Image - Left Side */}
            <div className="lg:w-1/2">
              <div className="rounded-2xl overflow-hidden shadow-xl relative">
                <div className="relative h-80 sm:h-[450px] w-full">
                  <Image
                    width={1000}
                    height={1000}
                    src="https://images.pexels.com/photos/356040/pexels-photo-356040.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                    alt="Doctor consulting with patient"
                    className="object-cover"
                  />
                </div>
                {/* Floating card with stats */}
                <div className="absolute -bottom-1 -right-1 bg-white rounded-xl shadow-lg p-4 sm:p-6 max-w-xs">
                  <div className="flex justify-between mb-4">
                    <div className="text-center">
                      <p className="text-2xl sm:text-3xl font-bold text-blue-600">
                        98%
                      </p>
                      <p className="text-xs sm:text-sm text-gray-600">
                        Success Rate
                      </p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl sm:text-3xl font-bold text-[#C9A84C]">
                        24/7
                      </p>
                      <p className="text-xs sm:text-sm text-gray-600">
                        Support
                      </p>
                    </div>
                  </div>
                  <div className="p-2 bg-[#1a1500] rounded-lg border border-[#C9A84C]/20">
                    <p className="text-xs text-center text-[#C9A84C]">
                      &quot;Our doctors are available for virtual consultations
                      whenever you need them&quot;
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Text Content - Right Side */}
            <div className="lg:w-1/2">
              <div className="space-y-6">
                <span className="inline-block bg-[#1a1500] text-[#C9A84C] font-medium px-4 py-1 rounded-full text-sm border border-[#C9A84C]/20">
                  FIND YOUR DOCTOR
                </span>
                <h2 className="font-display text-3xl sm:text-4xl font-bold text-white">
                  Consult With A Specialized Doctor
                </h2>
                <p className="text-[#7A6E62]">
                  Our network of licensed healthcare professionals specializes
                  in men&apos;s health issues. Get expert medical advice and
                  personalized treatment plans from the comfort of your home.
                </p>

                <ul className="space-y-4">
                  <li className="flex items-start">
                    <div className="bg-[#1a1500] p-1 rounded-full mr-3 mt-1 border border-[#C9A84C]/20">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 text-[#C9A84C]"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <span className="text-[#B8A99A]">
                      Private and confidential video consultations
                    </span>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-blue-100 p-1 rounded-full mr-3 mt-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 text-blue-600"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <span className="text-[#B8A99A]">
                      Prescription medications delivered to your door
                    </span>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-blue-100 p-1 rounded-full mr-3 mt-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 text-blue-600"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <span className="text-[#B8A99A]">
                      Follow-up care and ongoing support
                    </span>
                  </li>
                </ul>

                <div className="pt-4">
                  <a href="/consultancy" className="bg-[#1a4731] hover:bg-[#143828] text-white font-medium px-6 py-3 rounded-full inline-flex items-center gap-2 transition-all shadow-md">
                    Book Consultation →
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Expert Q&A Section */}
          <div className="flex flex-col-reverse lg:flex-row items-center gap-8 lg:gap-16">
            {/* Text Content - Left Side */}
            <div className="lg:w-1/2">
              <div className="border border-[#262626] rounded-xl p-6 sm:p-8 bg-[#111111]">
                <span className="inline-block bg-[#1a1500] text-[#C9A84C] font-medium px-4 py-1 rounded-full text-sm mb-4 border border-[#C9A84C]/20">
                  ASK OUR EXPERTS
                </span>
                <h2 className="font-display text-3xl sm:text-4xl font-bold text-white mb-4">
                  Get Answers From Our Medical Experts
                </h2>

                <p className="text-[#7A6E62] mb-6">
                  Have questions about your sexual health? Our team of medical
                  professionals is ready to answer all your questions discreetly
                  and provide personalized guidance.
                </p>

                <ul className="space-y-4 mb-6">
                  <li className="flex items-start">
                    <div className="bg-[#C9A84C] rounded-full p-1 mr-3 mt-1 flex items-center justify-center">
                      <div className="bg-[#080808] rounded-full w-1.5 h-1.5"></div>
                    </div>
                    <span className="text-[#B8A99A]">
                      Get expert medical opinions about symptoms and treatments
                    </span>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-[#C9A84C] rounded-full p-1 mr-3 mt-1 flex items-center justify-center">
                      <div className="bg-[#080808] rounded-full w-1.5 h-1.5"></div>
                    </div>
                    <span className="text-[#B8A99A]">
                      Learn about lifestyle changes that can improve your
                      condition
                    </span>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-[#C9A84C] rounded-full p-1 mr-3 mt-1 flex items-center justify-center">
                      <div className="bg-[#080808] rounded-full w-1.5 h-1.5"></div>
                    </div>
                    <span className="text-[#B8A99A]">
                      Understand the potential benefits and side effects of
                      medications
                    </span>
                  </li>
                </ul>

                <div className="flex flex-col sm:flex-row gap-4">
                  <a href="/consultancy" className="bg-[#1a4731] hover:bg-[#143828] text-white font-medium px-6 py-3 rounded-xl transition-all">
                    Ask a Question
                  </a>
                  <a href="/faq" className="border border-[#C9A84C]/40 text-[#C9A84C] hover:bg-[#C9A84C]/10 font-medium px-6 py-3 rounded-xl transition-all">
                    Browse FAQ
                  </a>
                </div>
              </div>
            </div>

            {/* Expert Image - Right Side */}
            <div className="lg:w-1/2">
              <div className="rounded-2xl overflow-hidden shadow-xl relative">
                <div className="relative h-80 sm:h-[450px] w-full">
                  <Image
                    width={1000}
                    height={1000}
                    src="https://images.pexels.com/photos/2280551/pexels-photo-2280551.jpeg?auto=compress&cs=tinysrgb&w=600"
                    alt="Medical Expert"
                    className="object-cover"
                  />
                </div>
                {/* Testimonial overlay */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                  <p className="text-white italic text-sm mb-2">
                    &quot;The team at Sexuloon helped me address my ED issues
                    with compassion and effective treatments. I couldn&apos;t be
                    happier with the results.&quot;
                  </p>
                  <p className="text-white font-medium text-xs">
                    - James K., 45
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
