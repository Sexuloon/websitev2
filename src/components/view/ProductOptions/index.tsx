import { GetProductByHandleQuery } from "@/types/shopify-graphql";
import React from "react";
import { cn } from "@/lib/utils";
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
}: // isGlass = false,
ProductOptionsProps) => {
  const handleOptionChange = (optionName: string, value: string) => {
    const updatedOptions = {
      ...selectedOptions,
      [optionName]: value,
    };
    setSelectedOptions?.(updatedOptions);
  };

  const calculateSavings = (price, comparePrice) => {
    if (!comparePrice) return 0;
    const savings =
      ((parseFloat(comparePrice) - parseFloat(price)) /
        parseFloat(comparePrice)) *
      100;
    return Math.round(savings);
  };

  // Get badge info
  const getBadgeInfo = (title) => {
    switch (title) {
      case "2 Packs":
        return { text: "Most Popular", color: "bg-orange-500" };
      case "3 Packs":
        return { text: "Best Value", color: "bg-red-500" };
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col gap-6 w-full p-6">
      <div>
        <h3 className="font-semibold text-xl">Value Added Packs Offers</h3>
      </div>

      {/* Variant Display Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {Variants.map((variant, index) => {
          const isSelected =
            selectedOptions[options[0].name] ===
            options[0].optionValues[index].name;

          const savings = calculateSavings(
            variant.node.price.amount,
            variant.node.compareAtPrice?.amount
          );

          const badgeInfo = getBadgeInfo(variant.node.title);

          return (
            <div
              onClick={() =>
                handleOptionChange(
                  options[0].name,
                  options[0].optionValues[index].name
                )
              }
              key={variant.node.id}
              className={cn(
                "relative flex flex-col items-center gap-4 border rounded-lg p-6 transition hover:shadow cursor-pointer",
                {
                  "opacity-50": !variant?.node?.availableForSale,
                  "bg-red-100 text-black ring-2 ring-red-500": isSelected,
                }
              )}
            >
              {/* Discount Badge */}
              {savings > 0 && (
                <div className="absolute -top-3 ">
                  <span className="bg-black text-white px-3 py-1 rounded-full text-sm font-medium">
                    Save {savings}%
                  </span>
                </div>
              )}

              {/* Product Image */}
              {variant?.node.image?.url && (
                <div className="mt-2 mb-2">
                  <div className="w-16 h-20 bg-gray-100 rounded border flex items-center justify-center">
                    <div className="flex gap-1">
                      <Image
                        height={1000}
                        width={1000}
                        src={variant?.node.image?.url}
                        alt="product"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Product Details */}
              <div className="flex flex-col items-center text-center">
                <span className="font-semibold text-lg mb-2">
                  {variant?.node?.title}
                </span>

                <div className="flex flex-col gap-2 items-baseline mb-2">
                  <span className="text-black font-bold text-2xl">
                    ₹{parseFloat(variant?.node?.price?.amount).toFixed(0)}
                  </span>
                  {variant?.node?.compareAtPrice?.amount && (
                    <span className="flex flex-row gap-1">
                      <span>
                      MRP:
                      </span>
                      <span className="line-through text-gray-500 text-sm">
                        ₹
                        {parseFloat(variant.node.compareAtPrice.amount).toFixed(
                          0
                        )}
                      </span>
                    </span>
                  )}
                </div>

                {!variant.node.availableForSale && (
                  <span className="text-xs text-gray-500">Out of Stock</span>
                )}
              </div>

              {/* Bottom Badge */}
              {badgeInfo && (
                <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2">
                  <span
                    className={`${badgeInfo.color} text-white px-4 py-1 rounded-full text-sm font-medium`}
                  >
                    {badgeInfo.text}
                  </span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProductOptions;
