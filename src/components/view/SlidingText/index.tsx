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
        <span key={`star-${index}`} className="text-gray-900 dark:text-white text-sm">
          ✦
        </span>
      );
    }
    return elements;
  });

  return (
    <div className="w-full bg-white dark:bg-[#0d0d0d] text-gray-700 dark:text-[#B8A99A] py-1.5 overflow-hidden whitespace-nowrap border-b border-gray-100 dark:border-[#1e1e1e] transition-colors duration-300">
      <div className="animate-marquee flex gap-2 text-[10px] sm:text-xs font-medium tracking-wide">
        {duplicatedTexts}
      </div>
    </div>
  );
};


export default InfiniteScrollingText