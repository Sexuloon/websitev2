'use client';

import { useEffect, useRef, useState } from 'react';

/* ─────────────────────────────────────────────────────────────────────────
   AnimatedStat
   A single stat card: count-up number + slim animated arc + label.
   Triggers when the card enters the viewport.
───────────────────────────────────────────────────────────────────────── */
function AnimatedStat({
  percentage,
  title,
  index,
}: {
  percentage: number;
  title: string;
  index: number;
}) {
  const [active, setActive] = useState(false);
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  /* Intersection observer — fires once */
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActive(true);
          io.disconnect();
        }
      },
      { threshold: 0.35 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  /* Count-up animation */
  useEffect(() => {
    if (!active) return;
    const start = Date.now();
    const duration = 1400 + index * 200;
    const raf = () => {
      const elapsed = Date.now() - start;
      const progress = Math.min(elapsed / duration, 1);
      // ease-out-cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * percentage));
      if (progress < 1) requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);
  }, [active, percentage, index]);

  /* SVG arc */
  const size = 100;
  const stroke = 5;
  const r = (size - stroke) / 2;
  const circ = 2 * Math.PI * r;
  const offset = active ? circ - (percentage / 100) * circ : circ;

  return (
    <div
      ref={ref}
      className="flex flex-col items-center gap-3 flex-1 min-w-[130px]"
      style={{
        animationDelay: `${index * 120}ms`,
        opacity: active ? 1 : 0,
        transform: active ? 'translateY(0)' : 'translateY(14px)',
        transitionProperty: 'opacity, transform',
        transitionDuration: '0.55s',
        transitionTimingFunction: 'ease',
        transitionDelay: `${index * 100}ms`,
      }}
    >
      {/* Arc + number */}
      <div className="relative" style={{ width: size, height: size }}>
        <svg
          width={size}
          height={size}
          className="-rotate-90"
          aria-hidden="true"
        >
          {/* Track */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={r}
            fill="none"
            stroke="currentColor"
            strokeWidth={stroke}
            className="text-gray-100 dark:text-[#1e1e1e]"
          />
          {/* Progress arc */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={r}
            fill="none"
            stroke="url(#arcGrad)"
            strokeWidth={stroke}
            strokeLinecap="round"
            strokeDasharray={circ}
            strokeDashoffset={offset}
            style={{
              transitionProperty: 'stroke-dashoffset',
              transitionDuration: active ? '1.4s' : '0s',
              transitionTimingFunction: 'cubic-bezier(0.16,1,0.3,1)',
              transitionDelay: active ? `${index * 150}ms` : '0ms',
            }}
          />
          <defs>
            <linearGradient id="arcGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#10b981" />
              <stop offset="100%" stopColor="#047857" />
            </linearGradient>
          </defs>
        </svg>

        {/* Number */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white tabular-nums">
            {count}
            <span className="text-lg text-emerald-600 dark:text-[#C9A84C]">%</span>
          </span>
        </div>
      </div>

      {/* Label */}
      <p className="text-center text-xs font-medium text-gray-500 dark:text-[#7A6E62] leading-relaxed max-w-[140px]">
        {title}
      </p>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   OffersAndSatisfaction
   The section displayed inside the product panel below the CTA buttons.
───────────────────────────────────────────────────────────────────────── */
const OffersAndSatisfaction = ({
  satisfaction,
}: {
  offers: { code: string; description: string }[];
  satisfaction: { percentage: number; title: string }[];
}) => {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [wrapVisible, setWrapVisible] = useState(false);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { setWrapVisible(true); io.disconnect(); }
      },
      { threshold: 0.2 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={wrapRef}
      className="w-full rounded-2xl overflow-hidden"
      style={{
        opacity: wrapVisible ? 1 : 0,
        transform: wrapVisible ? 'translateY(0)' : 'translateY(20px)',
        transition: 'opacity 0.6s ease, transform 0.6s ease',
      }}
    >
      {/* Header strip */}
      <div className="bg-gray-50 dark:bg-[#0f0f0f] border border-gray-100 dark:border-[#1e1e1e] rounded-2xl p-5">
        {/* Label */}
        <p className="text-[0.65rem] font-bold tracking-[0.14em] uppercase text-gray-400 dark:text-[#4b5563] mb-4">
          Clinically Reported Results
        </p>

        {/* Stats row */}
        <div className="flex justify-around items-start gap-4 flex-wrap">
          {satisfaction.map((item, i) => (
            <AnimatedStat
              key={i}
              index={i}
              percentage={item.percentage}
              title={item.title}
            />
          ))}
        </div>

        {/* Bottom footnote */}
        <p className="mt-4 text-center text-[0.65rem] text-gray-300 dark:text-[#2a2a2a] tracking-wide">
          Based on user surveys · Individual results may vary
        </p>
      </div>
    </div>
  );
};

export default OffersAndSatisfaction;