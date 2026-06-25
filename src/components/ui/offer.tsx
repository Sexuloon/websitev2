'use client'
import { useEffect, useState } from 'react';

const CircularProgress = ({ percentage, strokeWidth = 8 }: { percentage: number; strokeWidth?: number }) => {
  const [size, setSize] = useState(120);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setSize(width < 400 ? 80 : width < 640 ? 100 : 120);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg className="transform -rotate-90" width={size} height={size}>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#e5e7eb"
          strokeWidth={strokeWidth}
          fill="none"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#1a4731"
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className="transition-all duration-1000 ease-in-out"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-xl sm:text-2xl font-bold text-[#1a4731]">
          {percentage}%
        </span>
      </div>
    </div>
  );
};

const SatisfactionStats = ({ satisfaction }: { satisfaction: { percentage: number; title: string }[] }) => {
  return (
    <div className="w-full bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
      <div className="flex justify-around items-start gap-4 flex-wrap">
        {satisfaction.map((item, index) => (
          <div
            key={index}
            className="flex flex-col items-center text-center gap-3 flex-1 min-w-[120px]"
          >
            <CircularProgress percentage={item.percentage} />
            <p className="text-gray-700 font-medium text-sm leading-relaxed max-w-[140px]">
              {item.title}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

const OffersAndSatisfaction = ({
  offers,
  satisfaction,
}: {
  offers: { code: string; description: string }[];
  satisfaction: { percentage: number; title: string }[];
}) => {
  return (
    <div className="w-full space-y-4">
      <SatisfactionStats satisfaction={satisfaction} />
    </div>
  );
};

export default OffersAndSatisfaction;