"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import BestPerformingPage from "../view/BestPerforming";
import BestSelling from "../view/BestSelling";
import Collections from "../view/Collections";

export default function Home() {
  const [activeCategory, setActiveCategory] = useState("All Products");
  const [categoryValue, setCategoryValue] = useState("allproduct");
  // Categories
  const categories = [
    {
      key: "All Products",
      value: "allproduct",
    },
    {
      key: "Premature Ejaculation",
      value: "lastlonger",
    },
    {
      key: "Erectile Dysfunction",
      value: "bettererections",
    },
    {
      key: "Low Testosterone",
      value: "lowtestostrone",
    },
  ];

  return (
    <div className="bg-gray-50 dark:bg-[#080808] w-full transition-colors duration-300">
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
      <section className="py-16 sm:py-24 bg-gray-50 dark:bg-[#080808] transition-colors duration-300">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-start gap-4">
            {/* Heading */}
            <h2 className="font-display text-3xl font-bold text-gray-900 dark:text-white">Bestsellers</h2>

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
                            ? "bg-black text-white border-black dark:bg-[#C9A84C] dark:text-[#080808] dark:border-[#C9A84C]"
                            : "bg-transparent text-gray-600 border-gray-300 hover:border-black hover:text-black dark:text-[#B8A99A] dark:border-[#262626] dark:hover:border-[#C9A84C]/40 dark:hover:text-[#C9A84C]"
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
            <a href="/collections/all-products" className="border border-black text-black hover:bg-gray-100 dark:border-[#C9A84C]/40 dark:text-[#C9A84C] dark:hover:bg-[#C9A84C]/10 font-medium px-8 py-3 rounded-full inline-flex items-center gap-2 transition-all duration-200">
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
      <section className="py-16 sm:py-24 bg-gray-50 dark:bg-[#080808] transition-colors duration-300">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
            <h2 className="font-display text-3xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-0">
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



      {/* Process Steps Section - Hyper Premium Design */}
      <section className="py-20 sm:py-32 bg-white dark:bg-[#080808] relative overflow-hidden">
        {/* Background Accents */}
        <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-gray-50 to-transparent dark:from-[#0d0d0d]"></div>
        <div className="absolute -left-40 top-40 w-96 h-96 bg-blue-100/40 rounded-full blur-3xl opacity-50 dark:bg-[#C9A84C]/5"></div>
        <div className="absolute -right-40 bottom-40 w-96 h-96 bg-blue-50/50 rounded-full blur-3xl opacity-50 dark:bg-transparent"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-20">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-sm font-bold tracking-widest uppercase mb-6 dark:bg-[#1a1500] dark:text-[#C9A84C] dark:border dark:border-[#C9A84C]/20 shadow-sm border border-blue-100">
              The Process
            </span>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white leading-tight tracking-tight">
              4 Easy Steps To <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-[#C9A84C] dark:to-[#E8D5A5]">Your Solution</span>
            </h2>
            <p className="mt-6 text-gray-500 dark:text-[#7A6E62] max-w-2xl mx-auto text-lg sm:text-xl">
              Experience a streamlined, discreet, and highly professional journey to better sexual health.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
            {[
              {
                step: "01",
                title: "Know Your Problem",
                desc: "Describe your symptoms privately using our AI assistant.",
                img: "https://images.pexels.com/photos/6146929/pexels-photo-6146929.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
              },
              {
                step: "02",
                title: "Get Recommendations",
                desc: "Receive personalized and effective treatment suggestions.",
                img: "https://images.pexels.com/photos/207601/pexels-photo-207601.jpeg?auto=compress&cs=tinysrgb&w=600",
              },
              {
                step: "03",
                title: "Consult With A Doctor",
                desc: "Have a private consultation with a board-certified specialist.",
                img: "https://images.pexels.com/photos/5699479/pexels-photo-5699479.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
              },
              {
                step: "04",
                title: "Receive Discreet Delivery",
                desc: "Get your medication delivered in unmarked packaging directly to you.",
                img: "https://images.pexels.com/photos/4226269/pexels-photo-4226269.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="group relative flex flex-col bg-white dark:bg-[#111111] rounded-3xl p-8 transition-all duration-500 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_40px_-10px_rgba(0,0,0,0.1)] border border-gray-100 hover:border-blue-100 dark:border-[#262626] dark:hover:border-[#C9A84C]/30 hover:-translate-y-2 overflow-hidden z-10"
              >
                {/* Large Background Number */}
                <div className="absolute -top-6 -right-4 text-9xl font-black text-gray-50/80 dark:text-white/[0.02] group-hover:text-blue-50/80 dark:group-hover:text-[#C9A84C]/5 transition-colors duration-500 z-0 select-none">
                  {item.step}
                </div>
                
                <div className="relative z-10">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden mb-8 ring-4 ring-gray-50 dark:ring-[#1a1a1a] shadow-lg group-hover:scale-105 transition-transform duration-500">
                    <Image
                      src={item.img}
                      alt={item.title}
                      width={400}
                      height={400}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-[#F5F0E8] mb-3 group-hover:text-blue-600 dark:group-hover:text-[#C9A84C] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-gray-500 dark:text-[#7A6E62] leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Premium Bento Box Consultation Section */}
      <section className="py-20 sm:py-32 bg-gray-50 dark:bg-[#080808] transition-colors duration-300">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[90rem]">
          <div className="bg-white dark:bg-[#111111] rounded-[2.5rem] shadow-[0_8px_40px_-12px_rgba(0,0,0,0.1)] border border-gray-100 dark:border-[#262626] p-6 sm:p-12 lg:p-16 overflow-hidden relative">
            
            <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-bl from-blue-100/50 to-transparent dark:from-[#C9A84C]/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 z-0 pointer-events-none"></div>

            <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20 relative z-10">
              
              {/* Left Side - Text & CTA */}
              <div className="w-full lg:w-1/2 space-y-8">
                <div>
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-600 text-white text-sm font-bold tracking-widest uppercase mb-6 shadow-md dark:bg-[#C9A84C] dark:text-[#080808]">
                    <span className="w-2 h-2 rounded-full bg-white animate-pulse"></span>
                    Verified Specialists
                  </div>
                  <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white leading-[1.1] tracking-tight">
                    Consult With A <br className="hidden lg:block"/>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-[#C9A84C] dark:to-[#E8D5A5]">Specialized Doctor</span>
                  </h2>
                  <p className="mt-6 text-lg sm:text-xl text-gray-500 dark:text-[#7A6E62] leading-relaxed max-w-lg">
                    Our network of licensed healthcare professionals specializes in men&apos;s health. Get expert medical advice, personalized treatment plans, and prescription medications delivered securely.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    "Private Video Consultations",
                    "Discreet Prescription Delivery",
                    "Ongoing Medical Support",
                    "Expert Lifestyle Guidance"
                  ].map((benefit, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-50 dark:bg-[#1a1500] flex items-center justify-center border border-blue-100 dark:border-[#C9A84C]/20">
                        <svg className="w-4 h-4 text-blue-600 dark:text-[#C9A84C]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                      </div>
                      <span className="text-gray-700 dark:text-[#B8A99A] font-medium">{benefit}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-6">
                  <a href="/consultancy" className="group relative inline-flex items-center justify-center px-8 py-4 text-base font-bold text-white transition-all duration-200 bg-gray-900 border border-transparent rounded-full hover:bg-gray-800 dark:bg-[#C9A84C] dark:text-[#080808] dark:hover:bg-[#E8D5A5] shadow-[0_10px_20px_-10px_rgba(0,0,0,0.3)] hover:-translate-y-1">
                    Book Your Consultation
                    <svg className="w-5 h-5 ml-2 -mr-1 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                    </svg>
                  </a>
                </div>
              </div>

              {/* Right Side - Image Bento */}
              <div className="w-full lg:w-1/2 relative">
                <div className="relative rounded-[2rem] overflow-hidden shadow-2xl ring-1 ring-gray-900/5 aspect-[4/5] sm:aspect-square lg:aspect-[4/5] w-full max-w-lg mx-auto">
                  <Image
                    width={1000}
                    height={1000}
                    src="https://images.pexels.com/photos/356040/pexels-photo-356040.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                    alt="Doctor consulting with patient"
                    className="object-cover w-full h-full transform hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 via-transparent to-transparent"></div>
                  
                  {/* Floating Glassmorphism Cards */}
                  <div className="absolute bottom-6 left-6 right-6 sm:bottom-10 sm:left-10 sm:right-auto bg-white/90 dark:bg-[#111111]/90 backdrop-blur-md p-5 rounded-2xl shadow-xl border border-white/20 dark:border-[#262626] flex items-center gap-4 max-w-xs transform hover:-translate-y-1 transition-transform">
                    <div className="flex -space-x-3">
                      {[1,2,3].map(i => (
                        <div key={i} className="w-10 h-10 rounded-full border-2 border-white dark:border-[#111111] bg-gray-200 overflow-hidden">
                          <img src={`https://i.pravatar.cc/100?img=${i+10}`} alt="Patient" className="w-full h-full object-cover"/>
                        </div>
                      ))}
                    </div>
                    <div>
                      <div className="flex text-yellow-400 text-sm">
                        {"★★★★★"}
                      </div>
                      <p className="text-xs font-bold text-gray-900 dark:text-white mt-1">Trusted by 10,000+ men</p>
                    </div>
                  </div>
                  
                  <div className="hidden sm:flex absolute top-10 right-10 bg-white/90 dark:bg-[#111111]/90 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-white/20 dark:border-[#262626] flex-col items-center justify-center min-w-[120px] transform hover:-translate-y-1 transition-transform">
                    <span className="text-3xl font-black text-blue-600 dark:text-[#C9A84C]">98%</span>
                    <span className="text-xs font-semibold text-gray-500 dark:text-[#7A6E62] uppercase tracking-wider mt-1">Success Rate</span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
