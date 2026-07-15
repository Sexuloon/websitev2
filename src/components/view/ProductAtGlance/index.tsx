"use client";

type AtGlanceItem = {
  label: string;
  value: string;
};

type ProductAtGlanceProps = {
  items: AtGlanceItem[];
};

export default function ProductAtGlance({ items }: ProductAtGlanceProps) {
  if (!items || items.length === 0) return null;

  // Filter out any blank items (from removed rows)
  const filteredItems = items.filter((item) => item.label && item.value);

  return (
    <div className="w-full mt-1">
      <p className="text-[10px] font-semibold tracking-widest text-gray-500 dark:text-[#7A6E62] uppercase mb-2">
        At a Glance
      </p>
      <div className="border border-gray-200 dark:border-[#262626] rounded-xl overflow-hidden">
        {filteredItems.map((item, idx) => (
          <div
            key={idx}
            className={`flex items-center min-h-[40px] text-sm ${
              idx % 2 === 0
                ? "bg-gray-50 dark:bg-[#0e0e0e]"
                : "bg-white dark:bg-[#111111]"
            } ${idx !== filteredItems.length - 1 ? "border-b border-gray-100 dark:border-[#1e1e1e]" : ""}`}
          >
            <span className="w-[42%] sm:w-[36%] py-2 px-3 text-[12px] text-gray-500 dark:text-[#7A6E62] font-medium shrink-0 leading-tight">
              {item.label}
            </span>
            <span className="flex-1 py-2 px-3 text-[13px] text-gray-900 dark:text-white font-semibold leading-tight">
              {item.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
