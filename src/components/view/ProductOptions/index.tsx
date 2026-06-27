import { cn } from "@/lib/utils";
import { GetProductByHandleQuery } from "@/types/shopify-graphql";
import Image from "next/image";

type ProductOptionsProps = {
  options: NonNullable<GetProductByHandleQuery["product"]>["options"];
  selectedOptions?: Record<string, string>;
  setSelectedOptions?: (options: Record<string, string>) => void;
  Variants: NonNullable<GetProductByHandleQuery["product"]>["variants"]["edges"];
};

const ProductOptions = ({
  Variants,
  options,
  selectedOptions = {},
  setSelectedOptions,
}: ProductOptionsProps) => {
  const handleOptionChange = (optionName: string, value: string) => {
    setSelectedOptions?.({ ...selectedOptions, [optionName]: value });
  };

  const calculateSavings = (price: string, comparePrice?: string) => {
    if (!comparePrice) return 0;
    return Math.round(
      ((parseFloat(comparePrice) - parseFloat(price)) / parseFloat(comparePrice)) * 100
    );
  };

  // Find the variant with the highest savings to mark as "Most Popular"
  const bestValueIndex = Variants.reduce((best, curr, idx) => {
    const currSavings = calculateSavings(
      curr.node.price.amount,
      curr.node.compareAtPrice?.amount
    );
    const bestSavings = calculateSavings(
      Variants[best].node.price.amount,
      Variants[best].node.compareAtPrice?.amount
    );
    return currSavings > bestSavings ? idx : best;
  }, 0);

  return (
    <div className="flex flex-col gap-3 w-full">
      <p className="text-[11px] font-semibold tracking-widest text-[#7A6E62] uppercase">
        Select a Pack
      </p>

      <div className="grid grid-cols-3 gap-2.5">
        {Variants.map((variant, index) => {
          const isSelected =
            selectedOptions[options[0].name] === options[0].optionValues[index]?.name;

          const savings = calculateSavings(
            variant.node.price.amount,
            variant.node.compareAtPrice?.amount
          );

          const unavailable = !variant?.node?.availableForSale;
          const isBestValue = index === bestValueIndex && savings > 0;

          return (
            <button
              key={variant.node.id}
              onClick={() =>
                !unavailable &&
                handleOptionChange(options[0].name, options[0].optionValues[index]?.name)
              }
              disabled={unavailable}
              className={cn(
                "relative flex flex-col items-center gap-2 rounded-2xl p-3 pt-5 border transition-all duration-200 text-center",
                isSelected
                  ? "border-[#C9A84C] bg-[#1a1500] shadow-[0_0_16px_rgba(201,168,76,0.2)]"
                  : "border-[#262626] bg-[#111111] hover:border-[#C9A84C]/40 hover:bg-[#161100]",
                unavailable && "opacity-40 cursor-not-allowed"
              )}
            >
              {/* Best Value badge */}
              {isBestValue && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#C9A84C] text-[#080808] text-[9px] font-bold px-2 py-0.5 rounded-full whitespace-nowrap tracking-wide uppercase">
                  Best Value
                </span>
              )}

              {/* Save badge */}
              {savings > 0 && !isBestValue && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#1a4731] text-white text-[9px] font-bold px-2 py-0.5 rounded-full whitespace-nowrap tracking-wide">
                  Save {savings}%
                </span>
              )}
              {savings > 0 && isBestValue && (
                <span className="absolute -top-3 right-2 bg-[#1a4731] text-white text-[9px] font-bold px-2 py-0.5 rounded-full whitespace-nowrap tracking-wide hidden">
                  Save {savings}%
                </span>
              )}

              {/* Product image */}
              {variant?.node.image?.url && (
                <div className="w-10 h-12 flex items-center justify-center">
                  <Image
                    height={48}
                    width={40}
                    src={variant.node.image.url}
                    alt={variant.node.title}
                    className="object-contain w-full h-full"
                  />
                </div>
              )}

              {/* Pack name */}
              <span className={cn(
                "text-xs font-semibold leading-tight",
                isSelected ? "text-[#E8C87A]" : "text-[#B8A99A]"
              )}>
                {variant?.node?.title}
              </span>

              {/* Price */}
              <div className="flex flex-col items-center gap-0.5">
                <span className={cn(
                  "text-sm font-bold font-mono-num",
                  isSelected ? "text-white" : "text-[#F5F0E8]"
                )}>
                  ₹{parseFloat(variant.node.price.amount).toFixed(0)}
                </span>
                {variant?.node?.compareAtPrice?.amount && (
                  <span className="text-[10px] text-[#7A6E62] line-through font-mono-num">
                    ₹{parseFloat(variant.node.compareAtPrice.amount).toFixed(0)}
                  </span>
                )}
              </div>

              {unavailable && (
                <span className="text-[10px] text-red-400">Out of stock</span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default ProductOptions;
