'use client'
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useEffect, useState } from 'react';



const OffersAndSatisfaction = ({offers,satisfaction}) => {
  const [isOffersExpanded, setIsOffersExpanded] = useState(true);

  

 const CircularProgress = ({ percentage, strokeWidth = 8 }) => {
  const [size, setSize] = useState(120);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setSize(width < 400 ? 70 : width < 640 ? 90 : 120);
    };

    handleResize(); // Set on first render
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDashoffset =
    circumference - (percentage / 100) * circumference;

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg className="transform -rotate-90" width={size} height={size}>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#f3f4f6"
          strokeWidth={strokeWidth}
          fill="none"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#dc6554"
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className="transition-all duration-1000 ease-in-out"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-lg sm:text-xl font-bold text-gray-800">
          {percentage}%
        </span>
      </div>
    </div>
  );
};


  return (
    <div className="w-full max-w-2xl mx-auto p-4 space-y-8">
      {/* Available Offers Section */}
      <div className="bg-red-400 rounded-lg p-6">
        <button
          onClick={() => setIsOffersExpanded(!isOffersExpanded)}
          className="flex items-center justify-between w-full text-white"
        >
          <h2 className="text-xl font-semibold">Available Offers</h2>
          {isOffersExpanded ? (
            <ChevronUp className="w-6 h-6" />
          ) : (
            <ChevronDown className="w-6 h-6" />
          )}
        </button>
        
        {isOffersExpanded && (
          <div className="mt-4 space-y-3">
            {offers.map((offer, index) => (
              <div key={index} className="bg-white rounded-lg p-4">
                <div className="font-bold text-gray-800 mb-1">
                  {offer.code}
                </div>
                <div className="text-gray-700 text-sm">
                  {offer.description}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="text-center">
  <h2 className="text-2xl font-semibold text-gray-800 mb-8">
    Satisfied Customers
  </h2>

  <div className="flex justify-center gap-6 flex-nowrap px-4">
    {satisfaction.map((item, index) => (
      <div
        key={index}
        className="flex flex-col items-center text-center w-[calc(50%-0.75rem)] sm:w-auto"
      >
        <CircularProgress percentage={item.percentage} />
        <div className="mt-4 max-w-48">
          <p className="text-gray-700 font-medium leading-relaxed">
            {item.title}
          </p>
        </div>
      </div>
    ))}
  </div>

  <div className="mt-8">
    <p className="text-gray-500 text-sm italic">
      *Based on at least 6 weeks of consumer usage
    </p>
  </div>
</div>


    </div>
  );
};

export default OffersAndSatisfaction;