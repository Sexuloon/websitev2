const InfiniteScrollingText = () => {
  const texts = [
    "trusted by over 1 lakh men",
    "free, fast & discreet delivery",
    "india's most trusted sexual wellness brand",
    "up to 95% success rate",
    "cash on delivery available",
  ];

  const formatText = (text: string) =>
    text
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");

  const duplicatedTexts = [...texts, ...texts].flatMap((text, index, array) => {
    const elements = [
      <span
        key={`text-${index}`}
        className="px-2 opacity-90 hover:opacity-100 transition-opacity"
      >
        {formatText(text)}
      </span>,
    ];
    if (index !== array.length - 1) {
      elements.push(
        <span key={`star-${index}`} className="text-white text-sm">
          ✦
        </span>
      );
    }
    return elements;
  });

  return (
    <div className="w-full bg-black text-white py-1 overflow-hidden whitespace-nowrap border-b border-gray-700">
      <div className="animate-marquee flex gap-2 text-[10px] sm:text-xs md:text-sm font-sans font-medium tracking-normal">
        {duplicatedTexts}
      </div>
    </div>
  );
};


export default InfiniteScrollingText