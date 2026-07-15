"use client";

type HowToUseStep = {
  step: string;
  title: string;
  description: string;
};

type ProductHowToUseProps = {
  steps: HowToUseStep[];
  whoItsFor?: string;
};

export default function ProductHowToUse({ steps, whoItsFor }: ProductHowToUseProps) {
  if (!steps || steps.length === 0) return null;

  const stepIcons: Record<string, JSX.Element> = {
    "1": (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="m10.5 20.5 10-10a4.95 4.95 0 1 0-7-7l-10 10a4.95 4.95 0 1 0 7 7Z" />
        <path d="m8.5 8.5 7 7" />
      </svg>
    ),
    "2": (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M8 2v4" /><path d="M16 2v4" />
        <rect width="18" height="18" x="3" y="4" rx="2" />
        <path d="M3 10h18" />
        <path d="m9 16 2 2 4-4" />
      </svg>
    ),
    "3": (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4.8 2.3A.3.3 0 1 0 5 2H4a2 2 0 0 0-2 2v5a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6V4a2 2 0 0 0-2-2h-1a.2.2 0 1 0 .3.3" />
        <path d="M8 15v1a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6v-4" />
        <circle cx="20" cy="10" r="2" />
      </svg>
    ),
  };

  return (
    <div className="w-full bg-[#FCF8F2] dark:bg-[#0c0c0c] py-10 sm:py-14 border-y border-[#EBE3D5] dark:border-[#1e1e1e]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Heading */}
        <div className="text-center mb-7 sm:mb-10">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-1">
            How to Use
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 dark:text-[#7A6E62]">
            Simple daily routine for lasting results
          </p>
        </div>

        {/* Steps — horizontal row on mobile, same on desktop */}
        <div className="flex flex-row gap-3 sm:gap-5">
          {steps.map((s, idx) => (
            <div
              key={idx}
              className="relative flex-1 flex flex-col items-center text-center bg-white dark:bg-[#141414] rounded-2xl px-2.5 py-5 sm:p-6 border border-gray-200 dark:border-[#262626] shadow-sm"
            >
              {/* Step badge */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-[#8b1a30] dark:bg-[#C9A84C] text-white dark:text-[#080808] flex items-center justify-center text-[11px] font-bold">
                {s.step}
              </div>

              {/* Icon */}
              <div className="mt-2 mb-3 text-[#8b1a30] dark:text-[#C9A84C]">
                {stepIcons[s.step] || stepIcons["1"]}
              </div>

              {/* Title */}
              <p className="text-[13px] sm:text-sm font-bold text-gray-900 dark:text-white mb-1 leading-tight">
                {s.title}
              </p>

              {/* Description */}
              <p className="text-[11px] sm:text-xs text-gray-500 dark:text-[#B8A99A] leading-snug">
                {s.description}
              </p>
            </div>
          ))}
        </div>

        {/* Who it's for */}
        {whoItsFor && (
          <div className="mt-7 text-center">
            <p className="text-[10px] font-semibold tracking-widest text-gray-400 dark:text-[#7A6E62] uppercase mb-1.5">
              Who It&apos;s For
            </p>
            <p className="text-xs sm:text-sm text-gray-600 dark:text-[#B8A99A] max-w-lg mx-auto leading-relaxed italic px-2">
              {whoItsFor}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
