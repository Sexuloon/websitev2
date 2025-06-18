"use client";

import React, { useState, useEffect } from "react";

interface PurchaseData {
  customerName: string;
  location: string;
  product: string;
  timeAgo: string;
}

const ActionToast = () => {
  const [currentToast, setCurrentToast] = useState<PurchaseData | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  // Sample data for realistic notifications
  const purchaseData: PurchaseData[] = [
    {
      customerName: "Sarah M.",
      location: "New York, NY",
      product: "Wireless Bluetooth Headphones",
      timeAgo: "2 minutes ago",
    },
    {
      customerName: "Mike R.",
      location: "Los Angeles, CA",
      product: "Smart Watch Series 5",
      timeAgo: "1 minute ago",
    },
    {
      customerName: "Emma L.",
      location: "Chicago, IL",
      product: "Premium Coffee Maker",
      timeAgo: "3 minutes ago",
    },
    {
      customerName: "David K.",
      location: "Houston, TX",
      product: "Gaming Mechanical Keyboard",
      timeAgo: "2 minutes ago",
    },
    {
      customerName: "Lisa P.",
      location: "Phoenix, AZ",
      product: "Fitness Tracker Pro",
      timeAgo: "1 minute ago",
    },
    {
      customerName: "James W.",
      location: "Philadelphia, PA",
      product: "Portable Speaker System",
      timeAgo: "4 minutes ago",
    },
    {
      customerName: "Anna S.",
      location: "San Antonio, TX",
      product: "Wireless Charging Pad",
      timeAgo: "2 minutes ago",
    },
    {
      customerName: "Chris B.",
      location: "San Diego, CA",
      product: "Smart Home Security Camera",
      timeAgo: "3 minutes ago",
    },
    {
      customerName: "Maria G.",
      location: "Dallas, TX",
      product: "Electric Toothbrush",
      timeAgo: "1 minute ago",
    },
    {
      customerName: "Tom H.",
      location: "San Jose, CA",
      product: "Laptop Stand Adjustable",
      timeAgo: "5 minutes ago",
    },
  ];

  useEffect(() => {
    const showToast = () => {
      // Get random purchase data
      const randomIndex = Math.floor(Math.random() * purchaseData.length);
      const randomPurchase = purchaseData[randomIndex];

      setCurrentToast(randomPurchase);
      setIsVisible(true);

      // Hide toast after 5 seconds
      setTimeout(() => {
        setIsVisible(false);
        setTimeout(() => {
          setCurrentToast(null);
        }, 500); // Wait for fade out animation
      }, 3000);
    };

    // Show first toast after 3 seconds
    const initialTimeout = setTimeout(showToast, 3000);

    // Then show every 2 minutes (120000ms)
    const interval = setInterval(showToast, 120000);

    return () => {
      clearTimeout(initialTimeout);
      clearInterval(interval);
    };
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      setCurrentToast(null);
    }, 500);
  };

  if (!currentToast) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 sm:right-auto z-50 max-w-md lg:w-[330px]">
      <div
        className={`
          transform transition-all duration-500 ease-in-out
          ${
            isVisible
              ? "translate-y-0 opacity-100 scale-100"
              : "translate-y-full opacity-0 scale-95"
          }
        `}
      >
        <div className="bg-white rounded-lg shadow-2xl border border-gray-200 p-3 sm:p-4 w-full">
          {/* Purchase Details */}
          <div className="space-y-2">
            <div className="flex items-start justify-between space-x-2">
              <div className="flex items-start space-x-2 flex-1 min-w-0">
                {/* Customer Avatar */}
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-xs font-bold">
                    {currentToast.customerName.charAt(0)}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {currentToast.customerName}
                  </p>
                  <div className="flex items-center space-x-1">
                    <svg
                      className="w-3 h-3 text-gray-400 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    <span className="text-xs text-gray-500 truncate">
                      {currentToast.location}
                    </span>
                  </div>
                </div>
              </div>
              <button
                onClick={handleClose}
                className="text-gray-400 hover:text-gray-600 transition-colors duration-200 flex-shrink-0 p-1"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Product Info */}
            <div className="bg-gray-50 rounded-lg p-2 sm:p-3 mt-2 sm:mt-3">
              <p className="text-xs sm:text-sm text-gray-900 font-medium mb-1">
                Just purchased:
              </p>
              <p className="text-xs text-gray-600 leading-relaxed break-words">
                {currentToast.product}
              </p>
            </div>
          </div>

          {/* Social Proof Footer */}
          <div className="flex items-center justify-between mt-2 sm:mt-3 pt-2 sm:pt-3 border-t border-gray-100">
            <div className="flex items-center space-x-1 flex-1 min-w-0">
              <div className="flex -space-x-1">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="w-4 h-4 sm:w-5 sm:h-5 bg-gradient-to-r from-green-400 to-blue-500 rounded-full border-2 border-white"
                  />
                ))}
              </div>
              <span className="text-xs text-gray-500 ml-2 truncate">
                +47 others today
              </span>
            </div>

            {/* Verified Badge */}
            <div className="flex items-center space-x-1 flex-shrink-0">
              <svg
                className="w-3 h-3 text-green-500"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="text-xs text-green-600 font-medium">
                Verified
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActionToast;