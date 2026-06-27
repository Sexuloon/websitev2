import Image from "next/image";

type Promise = {
  icon: string;
  title: string;
  description: string;
};

const OurPromise = ({ promises }: { promises: Promise[] }) => {
  return (
    <section className="bg-[#080808] py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-[11px] font-bold tracking-widest text-[#C9A84C] uppercase mb-3">
            Our Commitment
          </p>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-white">
            The Sexuloon Promise
          </h2>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {promises.map((item, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center gap-4 p-5 sm:p-6 rounded-2xl border border-[#262626] bg-[#111111] hover:border-[#C9A84C]/30 hover:bg-[#141100] transition-all duration-300 group"
            >
              <div className="w-14 h-14 rounded-xl bg-[#1a1500] border border-[#C9A84C]/20 flex items-center justify-center group-hover:border-[#C9A84C]/50 transition-all">
                <Image
                  src={item.icon}
                  alt={item.title}
                  width={36}
                  height={36}
                  className="object-contain"
                  style={{ filter: "brightness(0) saturate(100%) invert(74%) sepia(36%) saturate(631%) hue-rotate(7deg) brightness(95%) contrast(88%)" }}
                />
              </div>
              <div>
                <h3 className="text-sm font-bold text-[#E8C87A] mb-1.5">{item.title}</h3>
                <p className="text-xs text-[#7A6E62] leading-relaxed">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurPromise;
