"use client";

type Ingredient = {
  name: string;
  amount: string;
  benefit: string;
};

type ProductIngredientsProps = {
  ingredients: Ingredient[];
};

export default function ProductIngredients({ ingredients }: ProductIngredientsProps) {
  if (!ingredients || ingredients.length === 0) return null;

  return (
    <div className="w-full bg-white dark:bg-[#080808] py-10 sm:py-16 border-y border-[#F5EFE6] dark:border-[#262626]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Heading */}
        <div className="text-center mb-6 sm:mb-9">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-1.5">
            What&apos;s Inside?
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-[#B8A99A] max-w-sm mx-auto">
            100% transparent dosing — standardised herbal extracts, no fillers.
          </p>
        </div>

        {/* Table */}
        <div className="border border-[#F5EFE6] dark:border-[#2a2a2a] rounded-xl overflow-hidden shadow-sm">
          {/* Header */}
          <div className="flex bg-[#FCF8F2] dark:bg-[#1a1a1a] border-b border-[#F5EFE6] dark:border-[#2a2a2a]">
            <div className="w-[40%] sm:w-[32%] py-2.5 px-3 sm:px-5 text-[11px] sm:text-xs font-bold text-[#8b1a30] dark:text-[#C9A84C] uppercase tracking-wide">
              Ingredient
            </div>
            <div className="w-[24%] sm:w-[20%] py-2.5 px-2 sm:px-4 text-[11px] sm:text-xs font-bold text-[#8b1a30] dark:text-[#C9A84C] uppercase tracking-wide">
              Per Serving
            </div>
            <div className="flex-1 py-2.5 px-2 sm:px-4 text-[11px] sm:text-xs font-bold text-[#8b1a30] dark:text-[#C9A84C] uppercase tracking-wide hidden xs:block">
              Benefit
            </div>
          </div>

          {/* Rows */}
          {ingredients.map((ingredient, idx) => (
            <div
              key={idx}
              className={`flex items-start ${
                idx % 2 === 0
                  ? "bg-white dark:bg-[#0e0e0e]"
                  : "bg-gray-50/50 dark:bg-[#111111]"
              } ${idx !== ingredients.length - 1 ? "border-b border-slate-100 dark:border-[#1e1e1e]" : ""}`}
            >
              {/* Name */}
              <div className="w-[40%] sm:w-[32%] py-3 px-3 sm:px-5">
                <span className="text-[13px] sm:text-sm font-bold text-slate-900 dark:text-white leading-tight">
                  {ingredient.name}
                </span>
                {/* Mobile-only benefit */}
                <p className="text-[11px] text-slate-500 dark:text-[#7A6E62] mt-0.5 leading-snug xs:hidden">
                  {ingredient.benefit}
                </p>
              </div>

              {/* Amount */}
              <div className="w-[24%] sm:w-[20%] py-3 px-2 sm:px-4">
                <span className="text-[13px] sm:text-sm font-mono font-semibold text-emerald-700 dark:text-[#C9A84C]">
                  {ingredient.amount}
                </span>
              </div>

              {/* Benefit — hidden on mobile, shown on sm+ */}
              <div className="flex-1 py-3 px-2 sm:px-4 hidden xs:block">
                <span className="text-[12px] sm:text-sm text-slate-600 dark:text-[#B8A99A] leading-snug">
                  {ingredient.benefit}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
