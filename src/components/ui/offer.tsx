'use client';
import { useEffect, useRef, useState } from 'react';

const CircularProgress = ({
  percentage,
  strokeWidth = 7,
}: {
  percentage: number;
  strokeWidth?: number;
}) => {
  const size = 110;
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (percentage / 100) * circumference;
  const [animated, setAnimated] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setAnimated(true); },
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="relative" style={{ width: size, height: size }}>
      <svg className="transform -rotate-90" width={size} height={size}>
        {/* Track */}
        <circle
          cx={size / 2} cy={size / 2} r={radius}
          stroke="#262626" strokeWidth={strokeWidth} fill="none"
        />
        {/* Progress */}
        <circle
          cx={size / 2} cy={size / 2} r={radius}
          stroke="url(#goldGrad)" strokeWidth={strokeWidth} fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={animated ? offset : circumference}
          strokeLinecap="round"
          style={{ transition: animated ? 'stroke-dashoffset 1.2s cubic-bezier(0.4,0,0.2,1)' : 'none' }}
        />
        <defs>
          <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#E8C87A" />
            <stop offset="100%" stopColor="#C9A84C" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-2xl font-bold text-[#C9A84C] font-mono-num">
          {percentage}%
        </span>
      </div>
    </div>
  );
};

const OffersAndSatisfaction = ({
  satisfaction,
}: {
  offers: { code: string; description: string }[];
  satisfaction: { percentage: number; title: string }[];
}) => {
  return (
    <div className="w-full rounded-2xl border border-[#262626] bg-[#111111] p-6">
      <div className="flex justify-around items-start gap-6 flex-wrap">
        {satisfaction.map((item, index) => (
          <div
            key={index}
            className="flex flex-col items-center text-center gap-3 flex-1 min-w-[130px]"
          >
            <CircularProgress percentage={item.percentage} />
            <p className="text-[#B8A99A] text-sm leading-relaxed max-w-[160px]">
              {item.title}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OffersAndSatisfaction;