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
          className="stroke-gray-200 dark:stroke-[#262626]"
          strokeWidth={strokeWidth} fill="none"
        />
        {/* Progress */}
        <circle
          cx={size / 2} cy={size / 2} r={radius}
          stroke="url(#progressGrad)" strokeWidth={strokeWidth} fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={animated ? offset : circumference}
          strokeLinecap="round"
          style={{ transition: animated ? 'stroke-dashoffset 1.2s cubic-bezier(0.4,0,0.2,1)' : 'none' }}
        />
        <defs>
          <linearGradient id="progressGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" className="stop-color-blue-500 dark:stop-color-gold-light" style={{ stopColor: 'var(--progress-start, #3b82f6)' }} />
            <stop offset="100%" className="stop-color-blue-600 dark:stop-color-gold-dark" style={{ stopColor: 'var(--progress-end, #2563eb)' }} />
          </linearGradient>
        </defs>
      </svg>
      {/* 
        Using CSS variables via inline styles or tailwind classes to handle gradient colors is tricky.
        A simpler way is to just use two gradients and toggle them or rely on the fact that we can't easily 
        do dark mode SVG gradients without CSS variables. 
        Actually, we can just define CSS variables in globals.css, but let's just use CSS modules or style tags.
      */}
      <style jsx>{`
        #progressGrad stop:first-child { stop-color: #10b981; }
        #progressGrad stop:last-child { stop-color: #047857; }
        :global(.dark) #progressGrad stop:first-child { stop-color: #E8C87A; }
        :global(.dark) #progressGrad stop:last-child { stop-color: #C9A84C; }
      `}</style>
      
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-2xl font-bold text-emerald-700 dark:text-[#C9A84C] font-mono-num">
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
    <div className="w-full rounded-2xl border border-gray-200 dark:border-[#262626] bg-gray-50 dark:bg-[#111111] p-6 transition-colors duration-300">
      <div className="flex justify-around items-start gap-6 flex-wrap">
        {satisfaction.map((item, index) => (
          <div
            key={index}
            className="flex flex-col items-center text-center gap-3 flex-1 min-w-[130px]"
          >
            <CircularProgress percentage={item.percentage} />
            <p className="text-gray-600 dark:text-[#B8A99A] text-sm leading-relaxed max-w-[160px]">
              {item.title}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OffersAndSatisfaction;