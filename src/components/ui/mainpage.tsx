"use client";
import Image from "next/image";
import { useState } from "react";
import BestSelling from "../view/BestSelling";

export default function Home() {
  const [activeCategory, setActiveCategory] = useState("Erectile Dysfunction");

  const products = [
    {
      id: 1,
      image: "/product1.jpg",
      price: 49.99,
      originalPrice: 80,
      title: "Wireless Headphones",
      description:
        "Lorem ipsum dolor sit amet consectetur adipiscing elit. Labore nobis iure obcaecati pariatur.",
      rating: 4.5,
      reviewCount: 128,
    },
    {
      id: 2,
      image: "/product2.jpg",
      price: 49.99,
      originalPrice: 80,
      title: "Wireless Headphones",
      description:
        "Lorem ipsum dolor sit amet consectetur adipiscing elit. Labore nobis iure obcaecati pariatur.",
      rating: 4.7,
      reviewCount: 94,
    },
    {
      id: 3,
      image: "/product3.jpg",
      price: 49.99,
      originalPrice: 80,
      title: "Wireless Headphones",
      description:
        "Lorem ipsum dolor sit amet consectetur adipiscing elit. Labore nobis iure obcaecati pariatur.",
      rating: 4.2,
      reviewCount: 156,
    },
  ];

  // Categories
  const categories = [
    "Erectile Dysfunction",
    "Premature Ejaculation",
    "Low Testosterone",
  ];

  return (
    <div className="bg-gray-50 w-full">
      <section id="feature-images">
        <div className="container mx-auto px-4 py-8">
          {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            <div className="bg-white rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <div className="bg-blue-500 relative h-64">
                <img
                  src="https://images.pexels.com/photos/360622/pexels-photo-360622.jpeg?auto=compress&cs=tinysrgb&w=600"
                  alt="Card image"
                  className="object-cover"
                />
              </div>
            </div>
            
            <div className="bg-white rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <div className="bg-blue-500 relative h-64">
                <img
                  src="https://images.pexels.com/photos/360622/pexels-photo-360622.jpeg?auto=compress&cs=tinysrgb&w=600"
                  alt="Card image"
                  className="object-cover"
                />
              </div>
            </div>
            
            <div className="bg-white rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <div className="bg-blue-500 relative h-64">
                <img
                  src="https://images.pexels.com/photos/360622/pexels-photo-360622.jpeg?auto=compress&cs=tinysrgb&w=600"
                  alt="Card image"
                  className="object-cover"
                />
              </div>
            </div>
          </div> */}
          <div className="overflow-x-auto">
  <div className="grid grid-cols-3 gap-4 min-w-[768px]">
    {/* Card 1 */}
    <div className="bg-white rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300 w-full">
      <div className="bg-blue-500 relative h-40">
        <img
          src="https://images.pexels.com/photos/360622/pexels-photo-360622.jpeg?auto=compress&cs=tinysrgb&w=600"
          alt="Card image"
          className="object-cover w-full h-full"
        />
      </div>
    </div>

    {/* Card 2 */}
    <div className="bg-white rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300 w-full">
      <div className="bg-blue-500 relative h-40">
        <img
          src="https://images.pexels.com/photos/360622/pexels-photo-360622.jpeg?auto=compress&cs=tinysrgb&w=600"
          alt="Card image"
          className="object-cover w-full h-full"
        />
      </div>
    </div>

    {/* Card 3 */}
    <div className="bg-white rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300 w-full">
      <div className="bg-blue-500 relative h-40">
        <img
          src="https://images.pexels.com/photos/360622/pexels-photo-360622.jpeg?auto=compress&cs=tinysrgb&w=600"
          alt="Card image"
          className="object-cover w-full h-full"
        />
      </div>
    </div>
  </div>
</div>

        </div>
      </section>

      {/* Best Sellers Section - Enhanced product cards and filtering */}
      <section className="py-16 sm:py-24 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4 sm:mb-0">
              Best Sellers
            </h2>

            {/* Categories - Improved filter buttons */}
            <div className="flex flex-wrap gap-3">
              {categories.map((category, index) => (
                <button
                  key={index}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
                    activeCategory === category
                      ? "bg-blue-600 text-white"
                      : "bg-blue-100 text-blue-800 hover:bg-blue-200"
                  }`}
                  onClick={() => setActiveCategory(category)}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Products Grid - Enhanced cards with ratings and hover effects */}
          <BestSelling/>

          {/* View All Products Button */}
          <div className="mt-12 text-center">
            <button className="bg-white border border-blue-600 text-blue-600 hover:bg-blue-50 font-medium px-8 py-3 rounded-full inline-flex items-center transition-colors duration-200">
              View All Products
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 ml-2"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* Best performing Section - Enhanced product cards and filtering */}
      <section className="py-16 sm:py-24 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4 sm:mb-0">
              Best Performing
            </h2>
          </div>

          {/* Products Grid - Enhanced cards with ratings and hover effects */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <div
                key={product.id}
                className="border border-gray-200 rounded-xl overflow-hidden bg-white shadow-sm hover:shadow-lg transition-shadow duration-300"
              >
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={product.image}
                    alt={product.title}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-0 right-0 bg-blue-600 text-white font-medium px-3 py-1 rounded-bl-lg">
                    {Math.round(
                      ((product.originalPrice - product.price) /
                        product.originalPrice) *
                        100
                    )}
                    % OFF
                  </div>
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-bold text-lg text-gray-900">
                      ${product.price.toFixed(2)}
                    </span>
                    <span className="text-gray-500 line-through text-sm">
                      ${product.originalPrice.toFixed(2)}
                    </span>
                  </div>
                  <h3 className="font-medium text-xl mb-2">{product.title}</h3>
                  <p className="text-gray-600 mb-4 text-sm">
                    {product.description}
                  </p>

                  {/* Rating Stars */}
                  <div className="flex items-center mb-4">
                    <div className="flex items-center mr-2">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          xmlns="http://www.w3.org/2000/svg"
                          className={`h-4 w-4 ${
                            i < Math.floor(product.rating)
                              ? "text-yellow-400"
                              : i < product.rating
                              ? "text-yellow-400"
                              : "text-gray-300"
                          }`}
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <span className="text-sm text-gray-600">
                      ({product.reviewCount} reviews)
                    </span>
                  </div>

                  <div className="flex gap-3">
                    <button className="flex-1 py-2.5 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors duration-200 flex items-center justify-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 mr-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                        />
                      </svg>
                      Add to Cart
                    </button>
                    <button className="flex-1 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors duration-200 flex items-center justify-center shadow-sm">
                      Buy Now
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 ml-1"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* View All Products Button */}
          <div className="mt-12 text-center">
            <button className="bg-white border border-blue-600 text-blue-600 hover:bg-blue-50 font-medium px-8 py-3 rounded-full inline-flex items-center transition-colors duration-200">
              View All Products
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 ml-2"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-br from-blue-50 to-white flex flex-col items-center justify-center py-12 sm:py-16 lg:py-20 ">
        <div className="container mx-auto">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            <div className="lg:w-1/2 space-y-8">
              <div>
                <span className="inline-block bg-blue-100 text-blue-600 font-medium px-4 py-1 rounded-full text-sm mb-4">
                  Certified Doctors
                </span>
                <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight">
                  Empowering Men&apos;s
                  <br className="hidden sm:block" /> Sexual Health
                </h1>
                <p className="mt-4 text-lg text-gray-600 max-w-lg">
                  Get personalized treatments from certified doctors for
                  erectile dysfunction, premature ejaculation, and low
                  testosterone issues.
                </p>
              </div>

              {/* Service Boxes - Improved grid layout */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-10">
                {/* Service Box 1 - Added subtle shadow and hover effect */}
                <div className="p-5 border border-gray-200 rounded-lg flex items-start bg-white shadow-sm hover:shadow-md transition-shadow duration-300">
                  <div className="bg-blue-100 p-2 rounded-md mr-4 flex-shrink-0">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-blue-600"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">
                      Free Consultation
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">
                      Get expert advice from our certified doctors
                    </p>
                  </div>
                </div>

                {/* Service Box 2 */}
                <div className="p-5 border border-gray-200 rounded-lg flex items-start bg-white shadow-sm hover:shadow-md transition-shadow duration-300">
                  <div className="bg-blue-100 p-2 rounded-md mr-4 flex-shrink-0">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-blue-600"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                      <path
                        fillRule="evenodd"
                        d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">
                      Custom Treatment
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">
                      Personalized plans for your specific needs
                    </p>
                  </div>
                </div>

                {/* Service Box 3 */}
                <div className="p-5 border border-gray-200 rounded-lg flex items-start bg-white shadow-sm hover:shadow-md transition-shadow duration-300">
                  <div className="bg-blue-100 p-2 rounded-md mr-4 flex-shrink-0">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-blue-600"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">
                      Flexible Scheduling
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">
                      Book appointments at your convenience
                    </p>
                  </div>
                </div>

                {/* Service Box 4 */}
                <div className="p-5 border border-gray-200 rounded-lg flex items-start bg-white shadow-sm hover:shadow-md transition-shadow duration-300">
                  <div className="bg-blue-100 p-2 rounded-md mr-4 flex-shrink-0">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-blue-600"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">
                      Expert Doctors
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">
                      Connect with specialized medical professionals
                    </p>
                  </div>
                </div>
              </div>

              {/* CTA Button - Improved with shadow and animation */}
              <div className="mt-8">
                <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-10 py-4 rounded-full flex items-center shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300">
                  Get Started Now
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 ml-2"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
            </div>

            {/* Right Content - Doctor Image with improved styling */}
            <div className="lg:w-1/2 mt-8 lg:mt-0">
              <div className="rounded-3xl overflow-hidden shadow-xl transform hover:-translate-y-2 transition-transform duration-300">
                <div className="relative h-96 sm:h-[500px] w-full">
                  <img
                    src="https://images.pexels.com/photos/4173251/pexels-photo-4173251.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                    alt="Doctor"
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process Steps Section - Enhanced with numbered steps and better visuals */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block bg-blue-100 text-blue-600 font-medium px-4 py-1 rounded-full text-sm mb-4">
              Fastest Solution
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
              4 Easy Steps To Get Your Solution
            </h2>
            <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
              Our streamlined process ensures you get the help you need quickly
              and discreetly
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-8 sm:gap-12 mt-10">
            {/* Step 1 - Added step number and improved layout */}
            <div className="flex flex-col items-center max-w-xs relative">
              <div className="absolute -top-4 -left-4 bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold shadow-md">
                1
              </div>
              <div className="w-28 h-28 rounded-full overflow-hidden mb-6 border-4 border-blue-100 shadow-md">
                <img
                  src="https://images.pexels.com/photos/6146929/pexels-photo-6146929.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                  alt="Chat with AI"
                  width={112}
                  height={112}
                  className="object-cover w-full h-full"
                />
              </div>
              <h3 className="font-semibold text-lg text-center">
                Chat With Our A.I. Assistant
              </h3>
              <p className="text-gray-600 text-sm text-center mt-2">
                Describe your symptoms and concerns privately
              </p>
            </div>

            {/* Step 2 */}
            <div className="flex flex-col items-center max-w-xs relative">
              <div className="absolute -top-4 -left-4 bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold shadow-md">
                2
              </div>
              <div className="w-28 h-28 rounded-full overflow-hidden mb-6 border-4 border-blue-100 shadow-md">
                <img
                  src="https://images.pexels.com/photos/207601/pexels-photo-207601.jpeg?auto=compress&cs=tinysrgb&w=600"
                  alt="Recommended Medicine"
                  width={112}
                  height={112}
                  className="object-cover w-full h-full"
                />
              </div>
              <h3 className="font-semibold text-lg text-center">
                Get Treatment Recommendations
              </h3>
              <p className="text-gray-600 text-sm text-center mt-2">
                Receive personalized medication suggestions
              </p>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col items-center max-w-xs relative">
              <div className="absolute -top-4 -left-4 bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold shadow-md">
                3
              </div>
              <div className="w-28 h-28 rounded-full overflow-hidden mb-6 border-4 border-blue-100 shadow-md">
                <img
                  src="https://images.pexels.com/photos/5699479/pexels-photo-5699479.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                  alt="Consult The Doctor"
                  width={112}
                  height={112}
                  className="object-cover w-full h-full"
                />
              </div>
              <h3 className="font-semibold text-lg text-center">
                Consult With A Doctor
              </h3>
              <p className="text-gray-600 text-sm text-center mt-2">
                Have a private consultation with a specialist
              </p>
            </div>

            {/* Step 4 - Made visible on all screen sizes */}
            <div className="flex flex-col items-center max-w-xs relative">
              <div className="absolute -top-4 -left-4 bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold shadow-md">
                4
              </div>
              <div className="w-28 h-28 rounded-full overflow-hidden mb-6 border-4 border-blue-100 shadow-md">
                <img
                  src="https://images.pexels.com/photos/4226269/pexels-photo-4226269.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                  alt="Get Delivery"
                  width={112}
                  height={112}
                  className="object-cover w-full h-full"
                />
              </div>
              <h3 className="font-semibold text-lg text-center">
                Receive Discreet Delivery
              </h3>
              <p className="text-gray-600 text-sm text-center mt-2">
                Get your medication delivered in unmarked packaging
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Doctor Consultation & Expert Q&A Sections - Combined into a features section */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Doctor Consultation Section */}
          <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16 mb-24">
            {/* Doctor Image - Left Side */}
            <div className="lg:w-1/2">
              <div className="rounded-2xl overflow-hidden shadow-xl relative">
                <div className="relative h-80 sm:h-[450px] w-full">
                  <img
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
                      <p className="text-2xl sm:text-3xl font-bold text-blue-600">
                        24/7
                      </p>
                      <p className="text-xs sm:text-sm text-gray-600">
                        Support
                      </p>
                    </div>
                  </div>
                  <div className="p-2 bg-blue-50 rounded-lg">
                    <p className="text-xs text-center text-blue-700">
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
                <span className="inline-block bg-blue-100 text-blue-600 font-medium px-4 py-1 rounded-full text-sm">
                  FIND YOUR DOCTOR
                </span>
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
                  Consult With A Specialized Doctor
                </h2>
                <p className="text-gray-600">
                  Our network of licensed healthcare professionals specializes
                  in men&apos;s health issues. Get expert medical advice and
                  personalized treatment plans from the comfort of your home.
                </p>

                <ul className="space-y-4">
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
                    <span className="text-gray-700">
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
                    <span className="text-gray-700">
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
                    <span className="text-gray-700">
                      Follow-up care and ongoing support
                    </span>
                  </li>
                </ul>

                <div className="pt-4">
                  <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-full flex items-center transition-colors duration-200 shadow-md">
                    Book Consultation
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 ml-2"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Expert Q&A Section */}
          <div className="flex flex-col-reverse lg:flex-row items-center gap-8 lg:gap-16">
            {/* Text Content - Left Side */}
            <div className="lg:w-1/2">
              <div className="border border-blue-100 rounded-xl p-6 sm:p-8 bg-gradient-to-br from-white to-blue-50">
                <span className="inline-block bg-blue-100 text-blue-600 font-medium px-4 py-1 rounded-full text-sm mb-4">
                  ASK OUR EXPERTS
                </span>
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                  Get Answers From Our Medical Experts
                </h2>

                <p className="text-gray-600 mb-6">
                  Have questions about your sexual health? Our team of medical
                  professionals is ready to answer all your questions discreetly
                  and provide personalized guidance.
                </p>

                <ul className="space-y-4 mb-6">
                  <li className="flex items-start">
                    <div className="bg-blue-600 rounded-full p-1 mr-3 mt-1 flex items-center justify-center">
                      <div className="bg-white rounded-full w-1.5 h-1.5"></div>
                    </div>
                    <span className="text-gray-700">
                      Get expert medical opinions about symptoms and treatments
                    </span>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-blue-600 rounded-full p-1 mr-3 mt-1 flex items-center justify-center">
                      <div className="bg-white rounded-full w-1.5 h-1.5"></div>
                    </div>
                    <span className="text-gray-700">
                      Learn about lifestyle changes that can improve your
                      condition
                    </span>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-blue-600 rounded-full p-1 mr-3 mt-1 flex items-center justify-center">
                      <div className="bg-white rounded-full w-1.5 h-1.5"></div>
                    </div>
                    <span className="text-gray-700">
                      Understand the potential benefits and side effects of
                      medications
                    </span>
                  </li>
                </ul>

                <div className="flex flex-col sm:flex-row gap-4">
                  <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-lg shadow-md transition-colors duration-200">
                    Ask a Question
                  </button>
                  <button className="border border-blue-600 text-blue-600 hover:bg-blue-50 font-medium px-6 py-3 rounded-lg transition-colors duration-200">
                    Browse FAQ
                  </button>
                </div>
              </div>
            </div>

            {/* Expert Image - Right Side */}
            <div className="lg:w-1/2">
              <div className="rounded-2xl overflow-hidden shadow-xl relative">
                <div className="relative h-80 sm:h-[450px] w-full">
                  <img
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
