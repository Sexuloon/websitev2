import { cn } from "@/lib/utils";
import { GetProductByHandleQuery } from "@/types/shopify-graphql";
import Image from "next/image";

type ProductOptionsProps = {
  options: NonNullable<GetProductByHandleQuery["product"]>["options"];
  selectedOptions?: Record<string, string>;
  setSelectedOptions?: (options: Record<string, string>) => void;
  isGlass?: boolean;
  Variants: NonNullable<
    GetProductByHandleQuery["product"]
  >["variants"]["edges"];
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

  return (
    <div className="flex flex-col gap-2.5 w-full">
      <p className="text-xs font-semibold tracking-widest text-gray-400 uppercase">
        Select a Pack
      </p>

      <div className="grid grid-cols-3 gap-2.5">
        {Variants.map((variant, index) => {
          const isSelected =
            selectedOptions[options[0].name] === options[0].optionValues[index].name;

          const savings = calculateSavings(
            variant.node.price.amount,
            variant.node.compareAtPrice?.amount
          );

          const unavailable = !variant?.node?.availableForSale;

          return (
            <button
              key={variant.node.id}
              onClick={() =>
                !unavailable &&
                handleOptionChange(options[0].name, options[0].optionValues[index].name)
              }
              disabled={unavailable}
              className={cn(
                "relative flex flex-col items-center gap-2 rounded-2xl p-3 pt-4 border transition-all text-left",
                isSelected
                  ? "border-[#1a4731] bg-[#f4f9f6] shadow-sm"
                  : "border-gray-150 bg-gray-50 hover:border-gray-300 hover:bg-white",
                unavailable && "opacity-40 cursor-not-allowed"
              )}
            >
              {/* Save badge */}
              {savings > 0 && (
                <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 bg-[#1a4731] text-white text-[10px] font-semibold px-2.5 py-0.5 rounded-full whitespace-nowrap">
                  Save {savings}%
                </span>
              )}

              {/* Image */}
              {variant?.node.image?.url && (
                <div className="w-12 h-14 flex items-center justify-center">
                  <Image
                    height={56}
                    width={48}
                    src={variant.node.image.url}
                    alt={variant.node.title}
                    className="object-contain w-full h-full"
                  />
                </div>
              )}

              {/* Pack name */}
              <span className="text-xs font-semibold text-gray-800 text-center leading-tight">
                {variant?.node?.title}
              </span>

              {/* Price */}
              <div className="flex flex-col items-center">
                <span className="text-sm font-bold text-gray-900">
                  ₹{parseFloat(variant.node.price.amount).toFixed(0)}
                </span>
                {variant?.node?.compareAtPrice?.amount && (
                  <span className="text-[11px] text-gray-400 line-through">
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
