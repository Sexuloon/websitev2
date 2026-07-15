"use client";

import Image from "next/image";

type DoctorProfileProps = {
  profile: {
    name: string;
    credentials: string;
    regNumber: string;
    quote: string;
    image: string;
  };
};

export default function ProductDoctorProfile({ profile }: DoctorProfileProps) {
  if (!profile) return null;

  return (
    <div className="w-full bg-[#FCF8F2] dark:bg-[#111111] py-12 lg:py-16 border-y border-[#EBE3D5] dark:border-[#262626]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12 bg-white dark:bg-[#1a1a1a] rounded-3xl p-6 md:p-10 shadow-sm border border-[#F5EFE6] dark:border-[#2a2a2a]">
          
          {/* Doctor Image */}
          <div className="w-32 h-32 md:w-48 md:h-48 shrink-0 rounded-full overflow-hidden border-4 border-[#F0E6D2] dark:border-[#2a2a2a] shadow-sm relative bg-slate-200 dark:bg-[#222]">
            <Image
              src={profile.image}
              alt={profile.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 128px, 192px"
            />
          </div>

          {/* Text Content */}
          <div className="flex-1 text-center md:text-left space-y-4">
            <div className="space-y-1">
              <h3 className="font-display text-2xl font-bold text-slate-900 dark:text-white">
                {profile.name}
              </h3>
              <p className="text-sm font-semibold text-[#8b1a30] dark:text-[#C9A84C]">
                {profile.credentials} <span className="text-slate-400 dark:text-slate-500 font-normal ml-1">| {profile.regNumber}</span>
              </p>
            </div>
            
            <blockquote className="relative">
              <span className="absolute -top-4 -left-4 text-4xl text-[#8b1a30]/10 dark:text-[#C9A84C]/20 font-serif leading-none">"</span>
              <p className="text-slate-700 dark:text-slate-300 italic text-base md:text-lg leading-relaxed relative z-10 pl-2">
                {profile.quote}
              </p>
            </blockquote>
          </div>

        </div>
      </div>
    </div>
  );
}
