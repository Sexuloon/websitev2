import { GetProductByHandleQuery } from "@/types/shopify-graphql";
import React from "react";
// import { Button } from "../../ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";

type ProductOptionsProps = {
  options: NonNullable<GetProductByHandleQuery["product"]>["options"];
  selectedOptions?: Record<string, string>;
  setSelectedOptions?: (options: Record<string, string>) => void;
  isGlass?: boolean;
  Variants:NonNullable<GetProductByHandleQuery["product"]>["variants"]["edges"];
};

const ProductOptions = ({
  Variants,
  options,
  selectedOptions = {},
  setSelectedOptions,
  // isGlass = false,
}: ProductOptionsProps) => {
  const handleOptionChange = (optionName: string, value: string) => {
    const updatedOptions = {
      ...selectedOptions,
      [optionName]: value,
    };
    setSelectedOptions?.(updatedOptions);
  };

  // const renderOptionUI = (
  //   option: NonNullable<GetProductByHandleQuery["product"]>["options"][0],
  //   isGlass: boolean
  // ) => {
  //   switch (option.name.toLowerCase()) {
  //     case "color":
  //       return (
  //         <div className="flex items-center gap-2">
  //           {option.optionValues.map((value) => (
  //             <Button
  //               key={value.id}
  //               className={cn(
  //                 "p-0 transition-all duration-300 ease-in-out hover:scale-[1.05]",
  //                 {
  //                   "ring-1 ring-black":
  //                     selectedOptions[option.name] === value.name,
  //                 }
  //               )}
  //               onClick={() => handleOptionChange(option.name, value.name)}
  //               style={{
  //                 backgroundColor: value.name,
  //                 width: "24px",
  //                 height: "24px",
  //                 borderRadius: "100%",
  //               }}
  //             />
  //           ))}
  //         </div>
  //       );

  //     case "size":
  //       return (
  //         <div className="flex flex-wrap gap-2">
  //           {option.optionValues.map((value) => (
  //             <Button
  //               key={value.id}
  //               size="sm"
  //               variant={
  //                 selectedOptions[option.name] === value.name
  //                   ? "default"
  //                   : "outline"
  //               }
  //               className={cn(
  //                 "transition-all duration-300 ease-in-out hover:scale-[1.05]",
  //                 {
  //                   "ring-1 ring-black":
  //                     selectedOptions[option.name] === value.name,
  //                 }
  //               )}
  //               onClick={() => handleOptionChange(option.name, value.name)}
  //             >
  //               {value.name}
  //             </Button>
  //           ))}
  //         </div>
  //       );

  //     default:
  //       return (
  //         <div className="flex flex-wrap gap-2">
  //           {option.optionValues.map((value) => (
  //             <Button
  //               key={value.id}
  //               variant={
  //                 selectedOptions[option.name] === value.name
  //                   ? "default"
  //                   : isGlass
  //                   ? "ghost"
  //                   : "outline"
  //               }
  //               className={cn("transition-all duration-300 ease-in-out", {
  //                 "ring-1 ring-black":
  //                   selectedOptions[option.name] === value.name,
  //               })}
  //               onClick={() => handleOptionChange(option.name, value.name)}
  //             >
  //               {value.name}
  //             </Button>
  //           ))}
  //         </div>
  //       );
  //   }
  // };

  return (
    <div className="flex flex-col gap-6 w-full">
      <div>
        <h3 className="font-semibold text-xl">Value Added Packs Offers</h3>
      </div>
      {/* Variant Display Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {Variants.map((variant, index) => {
          const isSelected =
            selectedOptions[options[0].name] ===
            options[0].optionValues[index].name;

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
                "flex items-center gap-4 border rounded-lg p-4 transition hover:shadow cursor-pointer",
                {
                  "opacity-50": !variant?.node?.availableForSale,
                  "bg-red-100 text-red-800 ring-2 ring-red-500": isSelected,
                }
              )}
            >
              {variant?.node.image?.url && (
                <Image
                  height={1000}
                  width={1000}
                  src={variant?.node?.image?.url}
                  alt={variant?.node?.image?.altText || "Product"}
                  className="w-16 h-16 object-cover rounded"
                />
              )}
              <div className="flex flex-col">
                <span className="font-semibold">{variant?.node?.title}</span>
                <div className="flex gap-2 items-baseline">
                  <span className="text-red-600 font-bold">
                    ₹{parseFloat(variant?.node?.price?.amount).toFixed(0)}
                  </span>
                  {variant?.node?.compareAtPrice?.amount && (
                    <span className="line-through text-gray-500 text-sm">
                      ₹
                      {parseFloat(variant.node.compareAtPrice.amount).toFixed(
                        0
                      )}
                    </span>
                  )}
                </div>
                {!variant.node.availableForSale && (
                  <span className="text-xs text-gray-500">Out of Stock</span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProductOptions;