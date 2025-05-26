import React from 'react';

const InfiniteScrollingText = ({ text = "🚀 Build with React. Learn. Iterate. Grow." }) => {
  return (
    <div className="relative w-full overflow-hidden bg-black py-4 h-14">
      <div className="absolute whitespace-nowrap animate-marquee text-white text-2xl font-semibold">
        {text}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      </div>
    </div>
  );
};

export default InfiniteScrollingText;
